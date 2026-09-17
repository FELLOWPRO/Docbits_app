#!/bin/sh
# Write env-config.js from the container's environment, at container start.
#
# The bundle carries no environment values, so this file is what tells a
# running container which environment it is. Values come from App Platform
# environment variables (secrets among them), never from the deploy
# repository — that repository is public, and anything committed to it is
# readable by anyone, forever.
#
# The nginx image runs every executable /docker-entrypoint.d/*.sh in name
# order before starting nginx, so this runs once per container start.
#
# Only keys listed in env-config.keys.json are ever emitted. A build-time
# secret that happens to be present in the environment (a Tolgee key, a Sentry
# auth token) can therefore never leak into a file served to browsers.

set -eu

KEYS_FILE=/etc/docbits/env-config.keys.json
HTML_ROOT=/usr/share/nginx/html

if [ ! -f "$KEYS_FILE" ]; then
    echo "env-config: $KEYS_FILE is missing — cannot tell which keys are public. Refusing to start." >&2
    exit 1
fi

config=$(jq -nc '{}')
written=''
for key in $(jq -r '.[].key' "$KEYS_FILE"); do
    value=$(printenv "$key" || true)
    [ -n "$value" ] || continue
    config=$(printf '%s' "$config" | jq -c --arg k "$key" --arg v "$value" '. + {($k): $v}')
    written="$written $key"
done

# APP_VUE_BRANCH and APP_VUE_STAGE decide which backend the app talks to, and
# a missing one has no safe default — an absent value used to resolve to the
# same host prefix production uses. Refuse to start instead: the health check
# never passes, App Platform keeps the previous revision serving, and no
# traffic reaches a container that does not know where it is.
missing=''
for required in APP_VUE_BRANCH APP_VUE_STAGE; do
    case " $written " in
        *" $required "*) ;;
        *) missing="$missing $required" ;;
    esac
done

if [ -n "$missing" ]; then
    echo "env-config: FATAL — no value for:$missing" >&2
    echo "env-config: this container does not know which environment it is." >&2
    echo "env-config: set them as RUN_TIME variables on the App Platform app" >&2
    echo "env-config: (see deploy/README.md). Refusing to start." >&2
    exit 1
fi

# nginx.conf enables gzip_static, brotli_static and zstd_static, so a request
# that accepts any of those encodings is served the PRE-COMPRESSED sibling in
# preference to the file itself — and Cloudflare always accepts one, then
# decompresses for the browser. A rewritten env-config.js whose .gz/.br/.zst
# still hold the build's placeholder is therefore invisible: the container is
# configured and every visitor still gets {}. Drop the siblings for any file
# written here; these are ~200 bytes, so serving them uncompressed costs
# nothing next to serving them WRONG.
drop_precompressed() {
    for encoding in gz br zst; do
        [ -f "$1.$encoding" ] || continue
        rm -f "$1.$encoding"
        echo "env-config: removed stale $1.$encoding"
    done
}

# The root bundle and the nova bundle are separate SPAs on the same origin and
# the same environment, so both get the same config.
for dir in "$HTML_ROOT" "$HTML_ROOT/nova"; do
    [ -d "$dir" ] || continue
    printf 'window.__DOCBITS_ENV__ = %s;\n' "$config" > "$dir/env-config.js"
    drop_precompressed "$dir/env-config.js"
    echo "env-config: wrote $dir/env-config.js"
done

# The PWA name is the label an installed app carries on a home screen, and it
# is compiled into manifest.json by the build — which now happens once, on a
# machine configured for dev. Left alone, every environment would install as
# "DocBits Dev". Rewrite it here from the same APP_VUE_STAGE that decides the
# backend, so the one artifact still names itself correctly per environment.
# Keep this map in step with getEnvironmentTitle() in quasar.config.cjs.
case "$APP_VUE_STAGE" in
    dev)     app_name='DocBits Dev' ;;
    stage)   app_name='DocBits Stage' ;;
    sandbox) app_name='DocBits Sandbox' ;;
    demo)    app_name='DocBits Demo' ;;
    prod)    app_name='DocBits App' ;;
    local)   app_name='DocBits Local' ;;
    *)       app_name='DocBits' ;;
esac

for dir in "$HTML_ROOT" "$HTML_ROOT/nova"; do
    [ -f "$dir/manifest.json" ] || continue
    tmp="$dir/manifest.json.tmp"
    if jq --arg n "$app_name" '.name = $n' "$dir/manifest.json" > "$tmp"; then
        mv "$tmp" "$dir/manifest.json"
        drop_precompressed "$dir/manifest.json"
        echo "env-config: $dir/manifest.json name set to $app_name"
    else
        rm -f "$tmp"
        echo "env-config: FATAL - could not rewrite $dir/manifest.json" >&2
        exit 1
    fi
done

# Key names only. The values are public to every browser that loads the app,
# but there is no reason to copy them into container logs as well.
echo "env-config: keys set:${written:- none}"
