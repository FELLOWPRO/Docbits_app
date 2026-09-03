# DocBits web app served by nginx so we control Cache-Control headers per path.
# Run as a DO App Platform Service (not a static site): static sites hard-code
# s-maxage=86400 on index.html/sw.js/version.json with no header override, which
# is the root cause of users getting stranded on a stale build after a deploy.
# This Dockerfile + nginx.conf are generated into the deploy repo on every CI
# deploy (see .github/workflows), so they always stay in sync with the build.
#
# Pins (review-required to bump): the base image is pinned by digest so BOTH
# stages resolve to the SAME nginx patch (drift would mismatch the dynamic-module
# ABI and kill the deploy), and the two third-party modules are pinned to a
# commit/tag so builds are reproducible — this image ships to every environment.

# ── Stage 1: compile ngx_brotli + zstd-nginx-module as dynamic modules ───────
# (DPT-252) The stock nginx:alpine image ships neither brotli nor zstd, so
# brotli_static / zstd_static could not serve the .br/.zst files
# scripts/compress.js already produces — users got gzip. Compiled against the
# EXACT nginx version of the base image (derived at build time) with
# --with-compat so the dynamic-module ABI matches the runtime binary.
FROM nginx:1.31.1-alpine@sha256:8b1e78743a03dbb2c95171cc58639fef29abc8816598e27fb910ed2e621e589a AS module-builder
ARG NGX_BROTLI_SHA=a71f9312c2deb28875acc7bacfdd5695a111aa53
ARG ZSTD_MODULE_TAG=0.1.1
RUN set -eux; \
    NGINX_VERSION="$(nginx -v 2>&1 | sed 's|.*nginx/||')"; \
    apk add --no-cache --virtual .module-build-deps \
        git gcc g++ make libc-dev pcre-dev zlib-dev openssl-dev linux-headers \
        brotli-dev zstd-dev; \
    # ngx_brotli pinned to a specific commit (no reliable release tags upstream)
    mkdir -p /usr/src/ngx_brotli; cd /usr/src/ngx_brotli; \
    git init -q; git remote add origin https://github.com/google/ngx_brotli.git; \
    git fetch -q --depth=1 origin "${NGX_BROTLI_SHA}"; \
    git checkout -q FETCH_HEAD; \
    git submodule update --init --recursive --depth=1; \
    # zstd-nginx-module pinned to a release tag
    git clone --depth=1 --branch "${ZSTD_MODULE_TAG}" \
        https://github.com/tokers/zstd-nginx-module.git /usr/src/zstd-nginx-module; \
    wget -O /tmp/nginx.tar.gz "https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz"; \
    mkdir -p /usr/src/nginx; \
    tar -xzf /tmp/nginx.tar.gz -C /usr/src/nginx --strip-components=1; \
    cd /usr/src/nginx; \
    ./configure --with-compat \
        --add-dynamic-module=/usr/src/ngx_brotli \
        --add-dynamic-module=/usr/src/zstd-nginx-module; \
    make -j"$(nproc)" modules; \
    mkdir -p /modules; \
    cp objs/ngx_http_brotli_filter_module.so \
       objs/ngx_http_brotli_static_module.so \
       objs/ngx_http_zstd_filter_module.so \
       objs/ngx_http_zstd_static_module.so /modules/

# ── Stage 2: runtime (same pinned base → module ABI matches) ─────────────────
FROM nginx:1.31.1-alpine@sha256:8b1e78743a03dbb2c95171cc58639fef29abc8816598e27fb910ed2e621e589a
# Runtime shared libs the modules link against (brotli + zstd).
RUN apk add --no-cache brotli-libs zstd-libs
# Dynamic modules, compiled in stage 1 against this exact nginx version.
COPY --from=module-builder /modules/ /etc/nginx/modules/
# load_module must live in the MAIN context (before events/http), so it cannot
# go in conf.d/default.conf — prepend it to the main nginx.conf instead.
# ORDER MATTERS: nginx runs the LAST-loaded content-encoding filter FIRST, so
# whichever *_static module is loaded last wins when a client accepts several
# encodings. zstd is loaded last so it is preferred over brotli (verified: a
# request with `Accept-Encoding: zstd, br, gzip` returns Content-Encoding: zstd).
RUN sed -i '1i load_module /etc/nginx/modules/ngx_http_brotli_filter_module.so;\nload_module /etc/nginx/modules/ngx_http_brotli_static_module.so;\nload_module /etc/nginx/modules/ngx_http_zstd_filter_module.so;\nload_module /etc/nginx/modules/ngx_http_zstd_static_module.so;' /etc/nginx/nginx.conf

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Fail the BUILD (not the deploy) if the modules don't load against this runtime
# (ABI mismatch) or the load_module insertion / config is malformed.
RUN nginx -t
COPY . /usr/share/nginx/html
# These config files live in the repo root (build context) but must not be
# served as part of the site.
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/.dockerignore
EXPOSE 8080
