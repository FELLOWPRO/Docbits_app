function e(t){return t.startsWith("/")?t.slice(1):t}function c(t){if(!t)return t;for(const[n,r]of Object.entries(t))r.path=e(r.path);return t}export{c as a,e as c};
