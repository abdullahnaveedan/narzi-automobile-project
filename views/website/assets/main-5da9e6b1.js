(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r);
    new MutationObserver(r => {
        for (const s of r)
            if (s.type === "childList")
                for (const a of s.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && n(a)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function i(r) {
        const s = {};
        return r.integrity && (s.integrity = r.integrity), r.referrerpolicy && (s.referrerPolicy = r.referrerpolicy), r.crossorigin === "use-credentials" ? s.credentials = "include" : r.crossorigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s
    }

    function n(r) {
        if (r.ep) return;
        r.ep = !0;
        const s = i(r);
        fetch(r.href, s)
    }
})();
const Ho = Object.freeze({
        left: 0,
        top: 0,
        width: 16,
        height: 16
    }),
    fr = Object.freeze({
        rotate: 0,
        vFlip: !1,
        hFlip: !1
    }),
    In = Object.freeze({ ...Ho,
        ...fr
    }),
    Ss = Object.freeze({ ...In,
        body: "",
        hidden: !1
    });

function nd(t, e) {
    const i = {};
    !t.hFlip != !e.hFlip && (i.hFlip = !0), !t.vFlip != !e.vFlip && (i.vFlip = !0);
    const n = ((t.rotate || 0) + (e.rotate || 0)) % 4;
    return n && (i.rotate = n), i
}

function Na(t, e) {
    const i = nd(t, e);
    for (const n in Ss) n in fr ? n in t && !(n in i) && (i[n] = fr[n]) : n in e ? i[n] = e[n] : n in t && (i[n] = t[n]);
    return i
}

function rd(t, e) {
    const i = t.icons,
        n = t.aliases || Object.create(null),
        r = Object.create(null);

    function s(a) {
        if (i[a]) return r[a] = [];
        if (!(a in r)) {
            r[a] = null;
            const o = n[a] && n[a].parent,
                l = o && s(o);
            l && (r[a] = [o].concat(l))
        }
        return r[a]
    }
    return (e || Object.keys(i).concat(Object.keys(n))).forEach(s), r
}

function sd(t, e, i) {
    const n = t.icons,
        r = t.aliases || Object.create(null);
    let s = {};

    function a(o) {
        s = Na(n[o] || r[o], s)
    }
    return a(e), i.forEach(a), Na(t, s)
}

function zo(t, e) {
    const i = [];
    if (typeof t != "object" || typeof t.icons != "object") return i;
    t.not_found instanceof Array && t.not_found.forEach(r => {
        e(r, null), i.push(r)
    });
    const n = rd(t);
    for (const r in n) {
        const s = n[r];
        s && (e(r, sd(t, r, s)), i.push(r))
    }
    return i
}
const _n = /^[a-z0-9]+(-[a-z0-9]+)*$/,
    Qi = (t, e, i, n = "") => {
        const r = t.split(":");
        if (t.slice(0, 1) === "@") {
            if (r.length < 2 || r.length > 3) return null;
            n = r.shift().slice(1)
        }
        if (r.length > 3 || !r.length) return null;
        if (r.length > 1) {
            const o = r.pop(),
                l = r.pop(),
                c = {
                    provider: r.length > 0 ? r[0] : n,
                    prefix: l,
                    name: o
                };
            return e && !sr(c) ? null : c
        }
        const s = r[0],
            a = s.split("-");
        if (a.length > 1) {
            const o = {
                provider: n,
                prefix: a.shift(),
                name: a.join("-")
            };
            return e && !sr(o) ? null : o
        }
        if (i && n === "") {
            const o = {
                provider: n,
                prefix: "",
                name: s
            };
            return e && !sr(o, i) ? null : o
        }
        return null
    },
    sr = (t, e) => t ? !!((t.provider === "" || t.provider.match(_n)) && (e && t.prefix === "" || t.prefix.match(_n)) && t.name.match(_n)) : !1,
    ad = {
        provider: "",
        aliases: {},
        not_found: {},
        ...Ho
    };

function ss(t, e) {
    for (const i in e)
        if (i in t && typeof t[i] != typeof e[i]) return !1;
    return !0
}

function No(t) {
    if (typeof t != "object" || t === null) return null;
    const e = t;
    if (typeof e.prefix != "string" || !t.icons || typeof t.icons != "object" || !ss(t, ad)) return null;
    const i = e.icons;
    for (const r in i) {
        const s = i[r];
        if (!r.match(_n) || typeof s.body != "string" || !ss(s, Ss)) return null
    }
    const n = e.aliases || Object.create(null);
    for (const r in n) {
        const s = n[r],
            a = s.parent;
        if (!r.match(_n) || typeof a != "string" || !i[a] && !n[a] || !ss(s, Ss)) return null
    }
    return e
}
const pr = Object.create(null);

function od(t, e) {
    return {
        provider: t,
        prefix: e,
        icons: Object.create(null),
        missing: new Set
    }
}

function Rt(t, e) {
    const i = pr[t] || (pr[t] = Object.create(null));
    return i[e] || (i[e] = od(t, e))
}

function aa(t, e) {
    return No(e) ? zo(e, (i, n) => {
        n ? t.icons[i] = n : t.missing.add(i)
    }) : []
}

function ld(t, e, i) {
    try {
        if (typeof i.body == "string") return t.icons[e] = { ...i
        }, !0
    } catch {}
    return !1
}

function cd(t, e) {
    let i = [];
    return (typeof t == "string" ? [t] : Object.keys(pr)).forEach(r => {
        (typeof r == "string" && typeof e == "string" ? [e] : Object.keys(pr[r] || {})).forEach(a => {
            const o = Rt(r, a);
            i = i.concat(Object.keys(o.icons).map(l => (r !== "" ? "@" + r + ":" : "") + a + ":" + l))
        })
    }), i
}
let Mn = !1;

function dd(t) {
    return typeof t == "boolean" && (Mn = t), Mn
}

function Dn(t) {
    const e = typeof t == "string" ? Qi(t, !0, Mn) : t;
    if (e) {
        const i = Rt(e.provider, e.prefix),
            n = e.name;
        return i.icons[n] || (i.missing.has(n) ? null : void 0)
    }
}

function Fo(t, e) {
    const i = Qi(t, !0, Mn);
    if (!i) return !1;
    const n = Rt(i.provider, i.prefix);
    return ld(n, i.name, e)
}

function qo(t, e) {
    if (typeof t != "object") return !1;
    if (typeof e != "string" && (e = t.provider || ""), Mn && !e && !t.prefix) {
        let r = !1;
        return No(t) && (t.prefix = "", zo(t, (s, a) => {
            a && Fo(s, a) && (r = !0)
        })), r
    }
    const i = t.prefix;
    if (!sr({
            provider: e,
            prefix: i,
            name: "a"
        })) return !1;
    const n = Rt(e, i);
    return !!aa(n, t)
}

function ud(t) {
    return !!Dn(t)
}

function fd(t) {
    const e = Dn(t);
    return e ? { ...In,
        ...e
    } : null
}
const Vo = Object.freeze({
        width: null,
        height: null
    }),
    jo = Object.freeze({ ...Vo,
        ...fr
    }),
    pd = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
    hd = /^-?[0-9.]*[0-9]+[0-9.]*$/g;

function Ts(t, e, i) {
    if (e === 1) return t;
    if (i = i || 100, typeof t == "number") return Math.ceil(t * e * i) / i;
    if (typeof t != "string") return t;
    const n = t.split(pd);
    if (n === null || !n.length) return t;
    const r = [];
    let s = n.shift(),
        a = hd.test(s);
    for (;;) {
        if (a) {
            const o = parseFloat(s);
            isNaN(o) ? r.push(s) : r.push(Math.ceil(o * e * i) / i)
        } else r.push(s);
        if (s = n.shift(), s === void 0) return r.join("");
        a = !a
    }
}
const md = t => t === "unset" || t === "undefined" || t === "none";

function Sr(t, e) {
    const i = { ...In,
            ...t
        },
        n = { ...jo,
            ...e
        },
        r = {
            left: i.left,
            top: i.top,
            width: i.width,
            height: i.height
        };
    let s = i.body;
    [i, n].forEach(v => {
        const b = [],
            p = v.hFlip,
            g = v.vFlip;
        let _ = v.rotate;
        p ? g ? _ += 2 : (b.push("translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"), b.push("scale(-1 1)"), r.top = r.left = 0) : g && (b.push("translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"), b.push("scale(1 -1)"), r.top = r.left = 0);
        let y;
        switch (_ < 0 && (_ -= Math.floor(_ / 4) * 4), _ = _ % 4, _) {
            case 1:
                y = r.height / 2 + r.top, b.unshift("rotate(90 " + y.toString() + " " + y.toString() + ")");
                break;
            case 2:
                b.unshift("rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")");
                break;
            case 3:
                y = r.width / 2 + r.left, b.unshift("rotate(-90 " + y.toString() + " " + y.toString() + ")");
                break
        }
        _ % 2 === 1 && (r.left !== r.top && (y = r.left, r.left = r.top, r.top = y), r.width !== r.height && (y = r.width, r.width = r.height, r.height = y)), b.length && (s = '<g transform="' + b.join(" ") + '">' + s + "</g>")
    });
    const a = n.width,
        o = n.height,
        l = r.width,
        c = r.height;
    let d, u;
    a === null ? (u = o === null ? "1em" : o === "auto" ? c : o, d = Ts(u, l / c)) : (d = a === "auto" ? l : a, u = o === null ? Ts(d, c / l) : o === "auto" ? c : o);
    const f = {},
        h = (v, b) => {
            md(b) || (f[v] = b.toString())
        };
    return h("width", d), h("height", u), f.viewBox = r.left.toString() + " " + r.top.toString() + " " + l.toString() + " " + c.toString(), {
        attributes: f,
        body: s
    }
}
const gd = /\sid="(\S+)"/g,
    vd = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let yd = 0;

function Bo(t, e = vd) {
    const i = [];
    let n;
    for (; n = gd.exec(t);) i.push(n[1]);
    if (!i.length) return t;
    const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
    return i.forEach(s => {
        const a = typeof e == "function" ? e(s) : e + (yd++).toString(),
            o = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        t = t.replace(new RegExp('([#;"])(' + o + ')([")]|\\.[a-z])', "g"), "$1" + a + r + "$3")
    }), t = t.replace(new RegExp(r, "g"), ""), t
}
const xi = {
        local: !0,
        session: !0
    },
    Zo = {
        local: new Set,
        session: new Set
    };
let oa = !1;

function bd(t) {
    oa = t
}
const Fa = "iconify2",
    $n = "iconify",
    Wo = $n + "-count",
    qa = $n + "-version",
    Uo = 36e5,
    wd = 168;

function Ms(t, e) {
    try {
        return t.getItem(e)
    } catch {}
}

function la(t, e, i) {
    try {
        return t.setItem(e, i), !0
    } catch {}
}

function Va(t, e) {
    try {
        t.removeItem(e)
    } catch {}
}

function $s(t, e) {
    return la(t, Wo, e.toString())
}

function As(t) {
    return parseInt(Ms(t, Wo)) || 0
}
let ir = typeof window > "u" ? {} : window;

function Go(t) {
    const e = t + "Storage";
    try {
        if (ir && ir[e] && typeof ir[e].length == "number") return ir[e]
    } catch {}
    xi[t] = !1
}

function Yo(t, e) {
    const i = Go(t);
    if (!i) return;
    const n = Ms(i, qa);
    if (n !== Fa) {
        if (n) {
            const o = As(i);
            for (let l = 0; l < o; l++) Va(i, $n + l.toString())
        }
        la(i, qa, Fa), $s(i, 0);
        return
    }
    const r = Math.floor(Date.now() / Uo) - wd,
        s = o => {
            const l = $n + o.toString(),
                c = Ms(i, l);
            if (typeof c == "string") {
                try {
                    const d = JSON.parse(c);
                    if (typeof d == "object" && typeof d.cached == "number" && d.cached > r && typeof d.provider == "string" && typeof d.data == "object" && typeof d.data.prefix == "string" && e(d, o)) return !0
                } catch {}
                Va(i, l)
            }
        };
    let a = As(i);
    for (let o = a - 1; o >= 0; o--) s(o) || (o === a - 1 ? (a--, $s(i, a)) : Zo[t].add(o))
}

function Xo() {
    if (!oa) {
        bd(!0);
        for (const t in xi) Yo(t, e => {
            const i = e.data,
                n = e.provider,
                r = i.prefix,
                s = Rt(n, r);
            if (!aa(s, i).length) return !1;
            const a = i.lastModified || -1;
            return s.lastModifiedCached = s.lastModifiedCached ? Math.min(s.lastModifiedCached, a) : a, !0
        })
    }
}

function Ko(t, e) {
    switch (t) {
        case "local":
        case "session":
            xi[t] = e;
            break;
        case "all":
            for (const i in xi) xi[i] = e;
            break
    }
}
const Ps = Object.create(null);

function Qo(t, e) {
    Ps[t] = e
}

function Os(t) {
    return Ps[t] || Ps[""]
}

function ca(t) {
    let e;
    if (typeof t.resources == "string") e = [t.resources];
    else if (e = t.resources, !(e instanceof Array) || !e.length) return null;
    return {
        resources: e,
        path: t.path || "/",
        maxURL: t.maxURL || 500,
        rotate: t.rotate || 750,
        timeout: t.timeout || 5e3,
        random: t.random === !0,
        index: t.index || 0,
        dataAfterTimeout: t.dataAfterTimeout !== !1
    }
}
const Tr = Object.create(null),
    pn = ["https://api.simplesvg.com", "https://api.unisvg.com"],
    ar = [];
for (; pn.length > 0;) pn.length === 1 || Math.random() > .5 ? ar.push(pn.shift()) : ar.push(pn.pop());
Tr[""] = ca({
    resources: ["https://api.iconify.design"].concat(ar)
});

function Jo(t, e) {
    const i = ca(e);
    return i === null ? !1 : (Tr[t] = i, !0)
}

function Mr(t) {
    return Tr[t]
}

function _d() {
    return Object.keys(Tr)
}
const Ed = () => {
    let t;
    try {
        if (t = fetch, typeof t == "function") return t
    } catch {}
};
let hr = Ed();

function xd(t) {
    hr = t
}

function Cd() {
    return hr
}

function Sd(t, e) {
    const i = Mr(t);
    if (!i) return 0;
    let n;
    if (!i.maxURL) n = 0;
    else {
        let r = 0;
        i.resources.forEach(a => {
            r = Math.max(r, a.length)
        });
        const s = e + ".json?icons=";
        n = i.maxURL - r - i.path.length - s.length
    }
    return n
}

function Td(t) {
    return t === 404
}
const Md = (t, e, i) => {
    const n = [],
        r = Sd(t, e),
        s = "icons";
    let a = {
            type: s,
            provider: t,
            prefix: e,
            icons: []
        },
        o = 0;
    return i.forEach((l, c) => {
        o += l.length + 1, o >= r && c > 0 && (n.push(a), a = {
            type: s,
            provider: t,
            prefix: e,
            icons: []
        }, o = l.length), a.icons.push(l)
    }), n.push(a), n
};

function $d(t) {
    if (typeof t == "string") {
        const e = Mr(t);
        if (e) return e.path
    }
    return "/"
}
const Ad = (t, e, i) => {
        if (!hr) {
            i("abort", 424);
            return
        }
        let n = $d(e.provider);
        switch (e.type) {
            case "icons":
                {
                    const s = e.prefix,
                        o = e.icons.join(","),
                        l = new URLSearchParams({
                            icons: o
                        });n += s + ".json?" + l.toString();
                    break
                }
            case "custom":
                {
                    const s = e.uri;n += s.slice(0, 1) === "/" ? s.slice(1) : s;
                    break
                }
            default:
                i("abort", 400);
                return
        }
        let r = 503;
        hr(t + n).then(s => {
            const a = s.status;
            if (a !== 200) {
                setTimeout(() => {
                    i(Td(a) ? "abort" : "next", a)
                });
                return
            }
            return r = 501, s.json()
        }).then(s => {
            if (typeof s != "object" || s === null) {
                setTimeout(() => {
                    s === 404 ? i("abort", s) : i("next", r)
                });
                return
            }
            setTimeout(() => {
                i("success", s)
            })
        }).catch(() => {
            i("next", r)
        })
    },
    Pd = {
        prepare: Md,
        send: Ad
    };

function Od(t) {
    const e = {
            loaded: [],
            missing: [],
            pending: []
        },
        i = Object.create(null);
    t.sort((r, s) => r.provider !== s.provider ? r.provider.localeCompare(s.provider) : r.prefix !== s.prefix ? r.prefix.localeCompare(s.prefix) : r.name.localeCompare(s.name));
    let n = {
        provider: "",
        prefix: "",
        name: ""
    };
    return t.forEach(r => {
        if (n.name === r.name && n.prefix === r.prefix && n.provider === r.provider) return;
        n = r;
        const s = r.provider,
            a = r.prefix,
            o = r.name,
            l = i[s] || (i[s] = Object.create(null)),
            c = l[a] || (l[a] = Rt(s, a));
        let d;
        o in c.icons ? d = e.loaded : a === "" || c.missing.has(o) ? d = e.missing : d = e.pending;
        const u = {
            provider: s,
            prefix: a,
            name: o
        };
        d.push(u)
    }), e
}

function el(t, e) {
    t.forEach(i => {
        const n = i.loaderCallbacks;
        n && (i.loaderCallbacks = n.filter(r => r.id !== e))
    })
}

function kd(t) {
    t.pendingCallbacksFlag || (t.pendingCallbacksFlag = !0, setTimeout(() => {
        t.pendingCallbacksFlag = !1;
        const e = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : [];
        if (!e.length) return;
        let i = !1;
        const n = t.provider,
            r = t.prefix;
        e.forEach(s => {
            const a = s.icons,
                o = a.pending.length;
            a.pending = a.pending.filter(l => {
                if (l.prefix !== r) return !0;
                const c = l.name;
                if (t.icons[c]) a.loaded.push({
                    provider: n,
                    prefix: r,
                    name: c
                });
                else if (t.missing.has(c)) a.missing.push({
                    provider: n,
                    prefix: r,
                    name: c
                });
                else return i = !0, !0;
                return !1
            }), a.pending.length !== o && (i || el([t], s.id), s.callback(a.loaded.slice(0), a.missing.slice(0), a.pending.slice(0), s.abort))
        })
    }))
}
let Ld = 0;

function Id(t, e, i) {
    const n = Ld++,
        r = el.bind(null, i, n);
    if (!e.pending.length) return r;
    const s = {
        id: n,
        icons: e,
        callback: t,
        abort: r
    };
    return i.forEach(a => {
        (a.loaderCallbacks || (a.loaderCallbacks = [])).push(s)
    }), r
}

function Dd(t, e = !0, i = !1) {
    const n = [];
    return t.forEach(r => {
        const s = typeof r == "string" ? Qi(r, e, i) : r;
        s && n.push(s)
    }), n
}
var Rd = {
    resources: [],
    index: 0,
    timeout: 2e3,
    rotate: 750,
    random: !1,
    dataAfterTimeout: !1
};

function Hd(t, e, i, n) {
    const r = t.resources.length,
        s = t.random ? Math.floor(Math.random() * r) : t.index;
    let a;
    if (t.random) {
        let P = t.resources.slice(0);
        for (a = []; P.length > 1;) {
            const z = Math.floor(Math.random() * P.length);
            a.push(P[z]), P = P.slice(0, z).concat(P.slice(z + 1))
        }
        a = a.concat(P)
    } else a = t.resources.slice(s).concat(t.resources.slice(0, s));
    const o = Date.now();
    let l = "pending",
        c = 0,
        d, u = null,
        f = [],
        h = [];
    typeof n == "function" && h.push(n);

    function v() {
        u && (clearTimeout(u), u = null)
    }

    function b() {
        l === "pending" && (l = "aborted"), v(), f.forEach(P => {
            P.status === "pending" && (P.status = "aborted")
        }), f = []
    }

    function p(P, z) {
        z && (h = []), typeof P == "function" && h.push(P)
    }

    function g() {
        return {
            startTime: o,
            payload: e,
            status: l,
            queriesSent: c,
            queriesPending: f.length,
            subscribe: p,
            abort: b
        }
    }

    function _() {
        l = "failed", h.forEach(P => {
            P(void 0, d)
        })
    }

    function y() {
        f.forEach(P => {
            P.status === "pending" && (P.status = "aborted")
        }), f = []
    }

    function E(P, z, k) {
        const V = z !== "success";
        switch (f = f.filter(L => L !== P), l) {
            case "pending":
                break;
            case "failed":
                if (V || !t.dataAfterTimeout) return;
                break;
            default:
                return
        }
        if (z === "abort") {
            d = k, _();
            return
        }
        if (V) {
            d = k, f.length || (a.length ? q() : _());
            return
        }
        if (v(), y(), !t.random) {
            const L = t.resources.indexOf(P.resource);
            L !== -1 && L !== t.index && (t.index = L)
        }
        l = "completed", h.forEach(L => {
            L(k)
        })
    }

    function q() {
        if (l !== "pending") return;
        v();
        const P = a.shift();
        if (P === void 0) {
            if (f.length) {
                u = setTimeout(() => {
                    v(), l === "pending" && (y(), _())
                }, t.timeout);
                return
            }
            _();
            return
        }
        const z = {
            status: "pending",
            resource: P,
            callback: (k, V) => {
                E(z, k, V)
            }
        };
        f.push(z), c++, u = setTimeout(q, t.rotate), i(P, e, z.callback)
    }
    return setTimeout(q), g
}

function tl(t) {
    const e = { ...Rd,
        ...t
    };
    let i = [];

    function n() {
        i = i.filter(o => o().status === "pending")
    }

    function r(o, l, c) {
        const d = Hd(e, o, l, (u, f) => {
            n(), c && c(u, f)
        });
        return i.push(d), d
    }

    function s(o) {
        return i.find(l => o(l)) || null
    }
    return {
        query: r,
        find: s,
        setIndex: o => {
            e.index = o
        },
        getIndex: () => e.index,
        cleanup: n
    }
}

function ja() {}
const as = Object.create(null);

function zd(t) {
    if (!as[t]) {
        const e = Mr(t);
        if (!e) return;
        const i = tl(e),
            n = {
                config: e,
                redundancy: i
            };
        as[t] = n
    }
    return as[t]
}

function il(t, e, i) {
    let n, r;
    if (typeof t == "string") {
        const s = Os(t);
        if (!s) return i(void 0, 424), ja;
        r = s.send;
        const a = zd(t);
        a && (n = a.redundancy)
    } else {
        const s = ca(t);
        if (s) {
            n = tl(s);
            const a = t.resources ? t.resources[0] : "",
                o = Os(a);
            o && (r = o.send)
        }
    }
    return !n || !r ? (i(void 0, 424), ja) : n.query(e, r, i)().abort
}

function Nd(t, e) {
    const i = t.lastModifiedCached;
    if (i && i >= e) return i === e;
    if (t.lastModifiedCached = e, i)
        for (const n in xi) Yo(n, r => {
            const s = r.data;
            return r.provider !== t.provider || s.prefix !== t.prefix || s.lastModified === e
        });
    return !0
}

function Fd(t, e) {
    oa || Xo();

    function i(n) {
        let r;
        if (!xi[n] || !(r = Go(n))) return;
        const s = Zo[n];
        let a;
        if (s.size) s.delete(a = Array.from(s).shift());
        else if (a = As(r), !$s(r, a + 1)) return;
        const o = {
            cached: Math.floor(Date.now() / Uo),
            provider: t.provider,
            data: e
        };
        return la(r, $n + a.toString(), JSON.stringify(o))
    }
    e.lastModified && !Nd(t, e.lastModified) || Object.keys(e.icons).length && (e.not_found && (e = Object.assign({}, e), delete e.not_found), i("local") || i("session"))
}

function Ba() {}

function qd(t) {
    t.iconsLoaderFlag || (t.iconsLoaderFlag = !0, setTimeout(() => {
        t.iconsLoaderFlag = !1, kd(t)
    }))
}

function Vd(t, e) {
    t.iconsToLoad ? t.iconsToLoad = t.iconsToLoad.concat(e).sort() : t.iconsToLoad = e, t.iconsQueueFlag || (t.iconsQueueFlag = !0, setTimeout(() => {
        t.iconsQueueFlag = !1;
        const {
            provider: i,
            prefix: n
        } = t, r = t.iconsToLoad;
        delete t.iconsToLoad;
        let s;
        if (!r || !(s = Os(i))) return;
        s.prepare(i, n, r).forEach(o => {
            il(i, o, l => {
                if (typeof l != "object") o.icons.forEach(c => {
                    t.missing.add(c)
                });
                else try {
                    const c = aa(t, l);
                    if (!c.length) return;
                    const d = t.pendingIcons;
                    d && c.forEach(u => {
                        d.delete(u)
                    }), Fd(t, l)
                } catch (c) {
                    console.error(c)
                }
                qd(t)
            })
        })
    }))
}
const jd = t => {
        const i = Rt(t.provider, t.prefix).pendingIcons;
        return !!(i && i.has(t.name))
    },
    da = (t, e) => {
        const i = Dd(t, !0, dd()),
            n = Od(i);
        if (!n.pending.length) {
            let l = !0;
            return e && setTimeout(() => {
                l && e(n.loaded, n.missing, n.pending, Ba)
            }), () => {
                l = !1
            }
        }
        const r = Object.create(null),
            s = [];
        let a, o;
        return n.pending.forEach(l => {
            const {
                provider: c,
                prefix: d
            } = l;
            if (d === o && c === a) return;
            a = c, o = d, s.push(Rt(c, d));
            const u = r[c] || (r[c] = Object.create(null));
            u[d] || (u[d] = [])
        }), n.pending.forEach(l => {
            const {
                provider: c,
                prefix: d,
                name: u
            } = l, f = Rt(c, d), h = f.pendingIcons || (f.pendingIcons = new Set);
            h.has(u) || (h.add(u), r[c][d].push(u))
        }), s.forEach(l => {
            const {
                provider: c,
                prefix: d
            } = l;
            r[c][d].length && Vd(l, r[c][d])
        }), e ? Id(e, n, s) : Ba
    },
    Bd = t => new Promise((e, i) => {
        const n = typeof t == "string" ? Qi(t, !0) : t;
        if (!n) {
            i(t);
            return
        }
        da([n || t], r => {
            if (r.length && n) {
                const s = Dn(n);
                if (s) {
                    e({ ...In,
                        ...s
                    });
                    return
                }
            }
            i(t)
        })
    });

function nl(t, e) {
    const i = { ...t
    };
    for (const n in e) {
        const r = e[n],
            s = typeof r;
        n in Vo ? (r === null || r && (s === "string" || s === "number")) && (i[n] = r) : s === typeof i[n] && (i[n] = n === "rotate" ? r % 4 : r)
    }
    return i
}
const $r = { ...jo,
        inline: !1
    },
    os = "iconify",
    ks = "iconify-inline",
    si = "iconifyData" + Date.now();
let $i = [];

function Rn(t) {
    for (let e = 0; e < $i.length; e++) {
        const i = $i[e];
        if ((typeof i.node == "function" ? i.node() : i.node) === t) return i
    }
}

function rl(t, e = !1) {
    let i = Rn(t);
    return i ? (i.temporary && (i.temporary = e), i) : (i = {
        node: t,
        temporary: e
    }, $i.push(i), i)
}

function Zd() {
    if (document.documentElement) return rl(document.documentElement);
    $i.push({
        node: () => document.documentElement
    })
}

function Wd(t) {
    $i = $i.filter(e => t !== e && t !== (typeof e.node == "function" ? e.node() : e.node))
}

function Hn() {
    return $i
}

function Ud(t) {
    const e = document;
    e.readyState && e.readyState !== "loading" ? t() : e.addEventListener("DOMContentLoaded", t)
}
let En = null;
const Gd = {
    childList: !0,
    subtree: !0,
    attributes: !0
};

function sl(t) {
    if (!t.observer) return;
    const e = t.observer;
    e.pendingScan || (e.pendingScan = setTimeout(() => {
        delete e.pendingScan, En && En(t)
    }))
}

function Yd(t, e) {
    if (!t.observer) return;
    const i = t.observer;
    if (!i.pendingScan)
        for (let n = 0; n < e.length; n++) {
            const r = e[n];
            if (r.addedNodes && r.addedNodes.length > 0 || r.type === "attributes" && r.target[si] !== void 0) {
                i.paused || sl(t);
                return
            }
        }
}

function al(t, e) {
    t.observer.instance.observe(e, Gd)
}

function mr(t) {
    let e = t.observer;
    if (e && e.instance) return;
    const i = typeof t.node == "function" ? t.node() : t.node;
    !i || !window || (e || (e = {
        paused: 0
    }, t.observer = e), e.instance = new window.MutationObserver(Yd.bind(null, t)), al(t, i), e.paused || sl(t))
}

function Za() {
    Hn().forEach(mr)
}

function ol(t) {
    if (!t.observer) return;
    const e = t.observer;
    e.pendingScan && (clearTimeout(e.pendingScan), delete e.pendingScan), e.instance && (e.instance.disconnect(), delete e.instance)
}

function Xd(t) {
    const e = En !== null;
    if (En !== t && (En = t, e && Hn().forEach(ol)), e) {
        Za();
        return
    }
    Ud(Za)
}

function Ls(t) {
    (t ? [t] : Hn()).forEach(e => {
        if (!e.observer) {
            e.observer = {
                paused: 1
            };
            return
        }
        const i = e.observer;
        if (i.paused++, i.paused > 1 || !i.instance) return;
        i.instance.disconnect()
    })
}

function Kd(t) {
    if (t) {
        const e = Rn(t);
        e && Ls(e)
    } else Ls()
}

function Is(t) {
    (t ? [t] : Hn()).forEach(e => {
        if (!e.observer) {
            mr(e);
            return
        }
        const i = e.observer;
        if (i.paused && (i.paused--, !i.paused)) {
            const n = typeof e.node == "function" ? e.node() : e.node;
            if (n) i.instance ? al(e, n) : mr(e);
            else return
        }
    })
}

function Qd(t) {
    if (t) {
        const e = Rn(t);
        e && Is(e)
    } else Is()
}

function ll(t, e = !1) {
    const i = rl(t, e);
    return mr(i), i
}

function cl(t) {
    const e = Rn(t);
    e && (ol(e), Wd(t))
}

function Jd(t, e) {
    if (t.name !== e.name || t.mode !== e.mode) return !0;
    const i = t.customisations,
        n = e.customisations;
    for (const r in $r)
        if (i[r] !== n[r]) return !0;
    return !1
}

function eu(t, e = 0) {
    const i = t.replace(/^-?[0-9.]*/, "");

    function n(r) {
        for (; r < 0;) r += 4;
        return r % 4
    }
    if (i === "") {
        const r = parseInt(t);
        return isNaN(r) ? 0 : n(r)
    } else if (i !== t) {
        let r = 0;
        switch (i) {
            case "%":
                r = 25;
                break;
            case "deg":
                r = 90
        }
        if (r) {
            let s = parseFloat(t.slice(0, t.length - i.length));
            return isNaN(s) ? 0 : (s = s / r, s % 1 === 0 ? n(s) : 0)
        }
    }
    return e
}
const tu = /[\s,]+/;

function iu(t, e) {
    e.split(tu).forEach(i => {
        switch (i.trim()) {
            case "horizontal":
                t.hFlip = !0;
                break;
            case "vertical":
                t.vFlip = !0;
                break
        }
    })
}
const nu = ["width", "height"],
    ru = ["inline", "hFlip", "vFlip"];

function su(t, e) {
    return t === e || t === "true" ? !0 : t === "" || t === "false" ? !1 : null
}

function au(t) {
    const e = t.getAttribute("data-icon"),
        i = typeof e == "string" && Qi(e, !0);
    if (!i) return null;
    const n = { ...$r,
        inline: t.classList && t.classList.contains(ks)
    };
    nu.forEach(o => {
        const l = t.getAttribute("data-" + o);
        l && (n[o] = l)
    });
    const r = t.getAttribute("data-rotate");
    typeof r == "string" && (n.rotate = eu(r));
    const s = t.getAttribute("data-flip");
    typeof s == "string" && iu(n, s), ru.forEach(o => {
        const l = "data-" + o,
            c = su(t.getAttribute(l), l);
        typeof c == "boolean" && (n[o] = c)
    });
    const a = t.getAttribute("data-mode");
    return {
        name: e,
        icon: i,
        customisations: n,
        mode: a
    }
}
const ou = "svg." + os + ", i." + os + ", span." + os + ", i." + ks + ", span." + ks;

function lu(t) {
    const e = [];
    return t.querySelectorAll(ou).forEach(i => {
        const n = i[si] || i.tagName.toLowerCase() !== "svg" ? au(i) : null;
        n && e.push({
            node: i,
            props: n
        })
    }), e
}

function dl(t, e) {
    let i = t.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
    for (const n in e) i += " " + n + '="' + e[n] + '"';
    return '<svg xmlns="http://www.w3.org/2000/svg"' + i + ">" + t + "</svg>"
}

function ul(t) {
    const e = new Set(["iconify"]);
    return ["provider", "prefix"].forEach(i => {
        t[i] && e.add("iconify--" + t[i])
    }), e
}

function fl(t, e, i, n) {
    const r = t.classList;
    if (n) {
        const a = n.classList;
        Array.from(a).forEach(o => {
            r.add(o)
        })
    }
    const s = [];
    return e.forEach(a => {
        r.contains(a) ? i.has(a) && s.push(a) : (r.add(a), s.push(a))
    }), i.forEach(a => {
        e.has(a) || r.remove(a)
    }), s
}

function pl(t, e, i) {
    const n = t.style;
    (i || []).forEach(s => {
        n.removeProperty(s)
    });
    const r = [];
    for (const s in e) n.getPropertyValue(s) || (r.push(s), n.setProperty(s, e[s]));
    return r
}

function hl(t, e, i) {
    let n;
    try {
        n = document.createElement("span")
    } catch {
        return t
    }
    const r = e.customisations,
        s = Sr(i, r),
        a = t[si],
        o = dl(Bo(s.body), {
            "aria-hidden": "true",
            role: "img",
            ...s.attributes
        });
    n.innerHTML = o;
    const l = n.childNodes[0],
        c = t.attributes;
    for (let v = 0; v < c.length; v++) {
        const b = c.item(v),
            p = b.name;
        p !== "class" && !l.hasAttribute(p) && l.setAttribute(p, b.value)
    }
    const d = ul(e.icon),
        u = fl(l, d, new Set(a && a.addedClasses), t),
        f = pl(l, r.inline ? {
            "vertical-align": "-0.125em"
        } : {}, a && a.addedStyles),
        h = { ...e,
            status: "loaded",
            addedClasses: u,
            addedStyles: f
        };
    return l[si] = h, t.parentNode && t.parentNode.replaceChild(l, t), l
}

function cu(t) {
    return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ")
}

function du(t) {
    return 'url("data:image/svg+xml,' + cu(t) + '")'
}
const uu = {
        display: "inline-block"
    },
    Ds = {
        "background-color": "currentColor"
    },
    ml = {
        "background-color": "transparent"
    },
    Wa = {
        image: "var(--svg)",
        repeat: "no-repeat",
        size: "100% 100%"
    },
    Ua = {
        "-webkit-mask": Ds,
        mask: Ds,
        background: ml
    };
for (const t in Ua) {
    const e = Ua[t];
    for (const i in Wa) e[t + "-" + i] = Wa[i]
}

function Ga(t) {
    return t + (t.match(/^[-0-9.]+$/) ? "px" : "")
}

function fu(t, e, i, n) {
    const r = e.customisations,
        s = Sr(i, r),
        a = s.attributes,
        o = t[si],
        l = dl(s.body, { ...a,
            width: i.width + "",
            height: i.height + ""
        }),
        c = ul(e.icon),
        d = fl(t, c, new Set(o && o.addedClasses)),
        f = {
            "--svg": du(l),
            width: Ga(a.width),
            height: Ga(a.height),
            ...uu,
            ...n ? Ds : ml
        };
    r.inline && (f["vertical-align"] = "-0.125em");
    const h = pl(t, f, o && o.addedStyles),
        v = { ...e,
            status: "loaded",
            addedClasses: d,
            addedStyles: h
        };
    return t[si] = v, t
}
let nr = !1;

function pu() {
    nr || (nr = !0, setTimeout(() => {
        nr && (nr = !1, Bi())
    }))
}

function Bi(t, e = !1) {
    const i = Object.create(null);

    function n(r, s) {
        const {
            provider: a,
            prefix: o,
            name: l
        } = r, c = Rt(a, o), d = c.icons[l];
        if (d) return {
            status: "loaded",
            icon: d
        };
        if (c.missing.has(l)) return {
            status: "missing"
        };
        if (s && !jd(r)) {
            const u = i[a] || (i[a] = Object.create(null));
            (u[o] || (u[o] = new Set)).add(l)
        }
        return {
            status: "loading"
        }
    }(t ? [t] : Hn()).forEach(r => {
        const s = typeof r.node == "function" ? r.node() : r.node;
        if (!s || !s.querySelectorAll) return;
        let a = !1,
            o = !1;

        function l(c, d, u) {
            if (o || (o = !0, Ls(r)), c.tagName.toUpperCase() !== "SVG") {
                const f = d.mode,
                    h = f === "mask" || (f === "bg" ? !1 : f === "style" ? u.body.indexOf("currentColor") !== -1 : null);
                if (typeof h == "boolean") {
                    fu(c, d, { ...In,
                        ...u
                    }, h);
                    return
                }
            }
            hl(c, d, u)
        }
        lu(s).forEach(({
            node: c,
            props: d
        }) => {
            const u = c[si];
            if (!u) {
                const {
                    status: h,
                    icon: v
                } = n(d.icon, !0);
                if (v) {
                    l(c, d, v);
                    return
                }
                a = a || h === "loading", c[si] = { ...d,
                    status: h
                };
                return
            }
            let f;
            if (Jd(u, d)) {
                if (f = n(d.icon, u.name !== d.name), !f.icon) {
                    a = a || f.status === "loading", Object.assign(u, { ...d,
                        status: f.status
                    });
                    return
                }
            } else {
                if (u.status !== "loading") return;
                if (f = n(d.icon, !1), !f.icon) {
                    u.status = f.status;
                    return
                }
            }
            l(c, d, f.icon)
        }), r.temporary && !a ? cl(s) : e && a ? ll(s, !0) : o && r.observer && Is(r)
    });
    for (const r in i) {
        const s = i[r];
        for (const a in s) {
            const o = s[a];
            da(Array.from(o).map(l => ({
                provider: r,
                prefix: a,
                name: l
            })), pu)
        }
    }
}

function hu(t) {
    const e = Rn(t);
    e ? Bi(e) : Bi({
        node: t,
        temporary: !0
    }, !0)
}

function gl(t, e, i = !1) {
    const n = Dn(t);
    if (!n) return null;
    const r = Qi(t),
        s = nl($r, e || {}),
        a = hl(document.createElement("span"), {
            name: t,
            icon: r,
            customisations: s
        }, n);
    return i ? a.outerHTML : a
}

function mu() {
    return "3.1.0"
}

function gu(t, e) {
    return gl(t, e, !1)
}

function vu(t, e) {
    return gl(t, e, !0)
}

function yu(t, e) {
    const i = Dn(t);
    if (!i) return null;
    const n = nl($r, e || {});
    return Sr(i, n)
}

function bu(t) {
    t ? hu(t) : Bi()
}
if (typeof document < "u" && typeof window < "u") {
    Zd();
    const t = window;
    if (t.IconifyPreload !== void 0) {
        const e = t.IconifyPreload,
            i = "Invalid IconifyPreload syntax.";
        typeof e == "object" && e !== null && (e instanceof Array ? e : [e]).forEach(n => {
            try {
                (typeof n != "object" || n === null || n instanceof Array || typeof n.icons != "object" || typeof n.prefix != "string" || !qo(n)) && console.error(i)
            } catch {
                console.error(i)
            }
        })
    }
    setTimeout(() => {
        Xd(Bi), Bi()
    })
}

function wu(t, e) {
    Ko(t, e !== !1)
}

function _u(t) {
    Ko(t, !0)
}
Qo("", Pd);
if (typeof document < "u" && typeof window < "u") {
    Xo();
    const t = window;
    if (t.IconifyProviders !== void 0) {
        const e = t.IconifyProviders;
        if (typeof e == "object" && e !== null)
            for (const i in e) {
                const n = "IconifyProviders[" + i + "] is invalid.";
                try {
                    const r = e[i];
                    if (typeof r != "object" || !r || r.resources === void 0) continue;
                    Jo(i, r) || console.error(n)
                } catch {
                    console.error(n)
                }
            }
    }
}
const Eu = {
        getAPIConfig: Mr,
        setAPIModule: Qo,
        sendAPIQuery: il,
        setFetch: xd,
        getFetch: Cd,
        listAPIProviders: _d
    },
    Rs = {
        _api: Eu,
        addAPIProvider: Jo,
        loadIcons: da,
        loadIcon: Bd,
        iconExists: ud,
        getIcon: fd,
        listIcons: cd,
        addIcon: Fo,
        addCollection: qo,
        replaceIDs: Bo,
        calculateSize: Ts,
        buildIcon: Sr,
        getVersion: mu,
        renderSVG: gu,
        renderHTML: vu,
        renderIcon: yu,
        scan: bu,
        observe: ll,
        stopObserving: cl,
        pauseObserver: Kd,
        resumeObserver: Qd,
        enableCache: wu,
        disableCache: _u
    };
try {
    self.Iconify === void 0 && (self.Iconify = Rs)
} catch {}
const xu = Rs.default || Rs,
    Cu = JSON.parse('[{"prefix":"et","width":32,"height":32,"icons":{"grid":{"body":"<g fill=\\"currentColor\\"><path d=\\"M28.5 11a.5.5 0 0 0 0-1H21V2.5a.5.5 0 0 0-1 0V10h-9V2.5a.5.5 0 0 0-1 0V10H2.5a.5.5 0 0 0 0 1H10v9H2.5a.5.5 0 0 0 0 1H10v8.5a.5.5 0 0 0 1 0V21h9v8.5a.5.5 0 0 0 1 0V21h7.5a.5.5 0 0 0 0-1H21v-9h7.5zM20 20h-9v-9h9v9z\\"/><path d=\\"M31 30.5v-29c0-.827-.673-1.5-1.5-1.5h-28C.673 0 0 .673 0 1.5v29c0 .827.673 1.5 1.5 1.5h28c.827 0 1.5-.673 1.5-1.5zm-30 0v-29a.5.5 0 0 1 .5-.5h28a.5.5 0 0 1 .5.5v29a.5.5 0 0 1-.5.5h-28a.5.5 0 0 1-.5-.5z\\"/></g>","width":31}}},{"prefix":"lucide","width":24,"height":24,"icons":{"arrow-left":{"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M19 12H5m7 7l-7-7l7-7\\"/>"},"arrow-right":{"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M5 12h14m-7-7l7 7l-7 7\\"/>"},"calendar-heart":{"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7m4-20v4M8 2v4m-5 4h18\\"/><path d=\\"M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34l-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53c-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z\\"/></g>"},"check":{"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M20 6L9 17l-5-5\\"/>"},"chevron-down":{"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"m6 9l6 6l6-6\\"/>"},"dollar-sign":{"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M12 2v20m5-17H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\\"/>"},"edit-2":{"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5L2 22l1.5-5.5L17 3z\\"/>"},"heart":{"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78l-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8l8-8c2.67-2.72 2.54-6.3.42-8.42z\\"/>"},"lock":{"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><rect width=\\"18\\" height=\\"11\\" x=\\"3\\" y=\\"11\\" rx=\\"2\\" ry=\\"2\\"/><path d=\\"M7 11V7a5 5 0 0 1 10 0v4\\"/></g>"},"mail":{"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><rect width=\\"20\\" height=\\"16\\" x=\\"2\\" y=\\"4\\" rx=\\"2\\"/><path d=\\"m22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\\"/></g>"},"menu":{"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M4 12h16M4 6h16M4 18h16\\"/>"},"percent":{"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M19 5L5 19\\"/><circle cx=\\"6.5\\" cy=\\"6.5\\" r=\\"2.5\\"/><circle cx=\\"17.5\\" cy=\\"17.5\\" r=\\"2.5\\"/></g>"},"plus":{"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M12 5v14m-7-7h14\\"/>"},"search":{"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><circle cx=\\"11\\" cy=\\"11\\" r=\\"8\\"/><path d=\\"m21 21l-4.35-4.35\\"/></g>"},"user":{"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\\"/><circle cx=\\"12\\" cy=\\"7\\" r=\\"4\\"/></g>"},"x":{"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M18 6L6 18M6 6l12 12\\"/>"}}},{"prefix":"gg","width":24,"height":24,"icons":{"arrow-long-left":{"body":"<path fill=\\"currentColor\\" d=\\"m1.027 11.993l4.235 4.25L6.68 14.83l-1.821-1.828L22.974 13v-2l-18.12.002L6.69 9.174L5.277 7.757l-4.25 4.236Z\\"/>"}}},{"prefix":"logos","width":256,"height":256,"icons":{"alpinejs-icon":{"body":"<path fill=\\"#77C1D2\\" d=\\"M199.111 0L256 56.639l-56.889 56.64l-56.889-56.64z\\"/><path fill=\\"#2D3441\\" d=\\"m56.889 0l117.938 117.421H61.049L0 56.639z\\"/>","height":118},"google-icon":{"body":"<path fill=\\"#4285F4\\" d=\\"M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027\\"/><path fill=\\"#34A853\\" d=\\"M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1\\"/><path fill=\\"#FBBC05\\" d=\\"M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782\\"/><path fill=\\"#EB4335\\" d=\\"M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251\\"/>","height":262},"html-5":{"body":"<path fill=\\"#E44D26\\" d=\\"m255.555 70.766l-23.241 260.36l-104.47 28.962l-104.182-28.922L.445 70.766h255.11Z\\"/><path fill=\\"#F16529\\" d=\\"m128 337.95l84.417-23.403l19.86-222.49H128V337.95Z\\"/><path fill=\\"#EBEBEB\\" d=\\"M82.82 155.932H128v-31.937H47.917l.764 8.568l7.85 88.01H128v-31.937H85.739l-2.919-32.704Zm7.198 80.61h-32.06l4.474 50.146l65.421 18.16l.147-.04V271.58l-.14.037l-35.568-9.604l-2.274-25.471Z\\"/><path d=\\"M24.18 0h16.23v16.035h14.847V0h16.231v48.558h-16.23v-16.26H40.411v16.26h-16.23V0Zm68.65 16.103H78.544V0h44.814v16.103h-14.295v32.455h-16.23V16.103h-.001ZM130.47 0h16.923l10.41 17.062L168.203 0h16.93v48.558h-16.164V24.49l-11.166 17.265h-.28L146.35 24.49v24.068h-15.88V0Zm62.74 0h16.235v32.508h22.824v16.05h-39.06V0Z\\"/><path fill=\\"#FFF\\" d=\\"M127.89 220.573h39.327l-3.708 41.42l-35.62 9.614v33.226l65.473-18.145l.48-5.396l7.506-84.08l.779-8.576H127.89v31.937Zm0-64.719v.078h77.143l.64-7.178l1.456-16.191l.763-8.568H127.89v31.86Z\\"/>","height":361},"tailwindcss-icon":{"body":"<defs><linearGradient id=\\"logosTailwindcssIcon0\\" x1=\\"-2.778%\\" x2=\\"100%\\" y1=\\"32%\\" y2=\\"67.556%\\"><stop offset=\\"0%\\" stop-color=\\"#2298BD\\"/><stop offset=\\"100%\\" stop-color=\\"#0ED7B5\\"/></linearGradient></defs><path fill=\\"url(#logosTailwindcssIcon0)\\" d=\\"M128 0C93.867 0 72.533 17.067 64 51.2C76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2c-12.8 17.067-27.733 23.467-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2c9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2c-12.8 17.067-27.733 23.467-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z\\"/>","height":154},"vitejs":{"body":"<defs><linearGradient id=\\"logosVitejs0\\" x1=\\"-.828%\\" x2=\\"57.636%\\" y1=\\"7.652%\\" y2=\\"78.411%\\"><stop offset=\\"0%\\" stop-color=\\"#41D1FF\\"/><stop offset=\\"100%\\" stop-color=\\"#BD34FE\\"/></linearGradient><linearGradient id=\\"logosVitejs1\\" x1=\\"43.376%\\" x2=\\"50.316%\\" y1=\\"2.242%\\" y2=\\"89.03%\\"><stop offset=\\"0%\\" stop-color=\\"#FFEA83\\"/><stop offset=\\"8.333%\\" stop-color=\\"#FFDD35\\"/><stop offset=\\"100%\\" stop-color=\\"#FFA800\\"/></linearGradient></defs><path fill=\\"url(#logosVitejs0)\\" d=\\"M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z\\"/><path fill=\\"url(#logosVitejs1)\\" d=\\"M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z\\"/>","height":257}}},{"prefix":"fa6-brands","width":448,"height":512,"icons":{"dribbble":{"body":"<path fill=\\"currentColor\\" d=\\"M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248s248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955c-6.984-1.477-77.018-15.682-147.502-6.818c-5.752-14.041-11.181-26.393-18.617-41.614c78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519c-34.712-63.776-73.185-116.168-79.04-124.008c67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509c-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473c9.268.19 111.92 1.513 217.706-30.146c6.064 11.868 11.857 23.915 17.174 35.949c-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756c29.74 77.283 42.039 142.053 45.189 160.638c-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033c66.38-10.626 124.7 6.768 131.947 9.055c-9.442 58.941-43.273 109.844-90.795 141.978z\\"/>","width":512},"facebook-f":{"body":"<path fill=\\"currentColor\\" d=\\"m279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z\\"/>","width":320},"github":{"body":"<path fill=\\"currentColor\\" d=\\"M165.9 397.4c0 2-2.3 3.6-5.2 3.6c-3.3.3-5.6-1.3-5.6-3.6c0-2 2.3-3.6 5.2-3.6c3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9c2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9c.3 2 2.9 3.3 5.9 2.6c2.9-.7 4.9-2.6 4.6-4.6c-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2c12.8 2.3 17.3-5.6 17.3-12.1c0-6.2-.3-40.4-.3-61.4c0 0-70 15-84.7-29.8c0 0-11.4-29.1-27.8-36.6c0 0-22.9-15.7 1.6-15.4c0 0 24.9 2 38.6 25.8c21.9 38.6 58.6 27.5 72.9 20.9c2.3-16 8.8-27.1 16-33.7c-55.9-6.2-112.3-14.3-112.3-110.5c0-27.5 7.6-41.3 23.6-58.9c-2.6-6.5-11.1-33.3 2.6-67.9c20.9-6.5 69 27 69 27c20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27c13.7 34.7 5.2 61.4 2.6 67.9c16 17.7 25.8 31.5 25.8 58.9c0 96.5-58.9 104.2-114.8 110.5c9.2 7.9 17 22.9 17 46.4c0 33.7-.3 75.4-.3 83.6c0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252C496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2c1.6 1.6 3.9 2.3 5.2 1c1.3-1 1-3.3-.7-5.2c-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9c1.6 1 3.6.7 4.3-.7c.7-1.3-.3-2.9-2.3-3.9c-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2c2.3 2.3 5.2 2.6 6.5 1c1.3-1.3.7-4.3-1.3-6.2c-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9c1.6 2.3 4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2c-1.4-2.3-4-3.3-5.6-2z\\"/>","width":496},"google":{"body":"<path fill=\\"currentColor\\" d=\\"M488 261.8C488 403.3 391.1 504 248 504C110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z\\"/>","width":488},"instagram":{"body":"<path fill=\\"currentColor\\" d=\\"M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9S287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7s74.7 33.5 74.7 74.7s-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8c-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8s26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9c-26.2-26.2-58-34.4-93.9-36.2c-37-2.1-147.9-2.1-184.9 0c-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9c1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0c35.9-1.7 67.7-9.9 93.9-36.2c26.2-26.2 34.4-58 36.2-93.9c2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6c-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6c-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6c29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6c11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z\\"/>"},"linkedin-in":{"body":"<path fill=\\"currentColor\\" d=\\"M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2c-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3c94 0 111.28 61.9 111.28 142.3V448z\\"/>"},"twitter":{"body":"<path fill=\\"currentColor\\" d=\\"M459.37 151.716c.325 4.548.325 9.097.325 13.645c0 138.72-105.583 298.558-298.558 298.558c-59.452 0-114.68-17.219-161.137-47.106c8.447.974 16.568 1.299 25.34 1.299c49.055 0 94.213-16.568 130.274-44.832c-46.132-.975-84.792-31.188-98.112-72.772c6.498.974 12.995 1.624 19.818 1.624c9.421 0 18.843-1.3 27.614-3.573c-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319c-28.264-18.843-46.781-51.005-46.781-87.391c0-19.492 5.197-37.36 14.294-52.954c51.655 63.675 129.3 105.258 216.365 109.807c-1.624-7.797-2.599-15.918-2.599-24.04c0-57.828 46.782-104.934 104.934-104.934c30.213 0 57.502 12.67 76.67 33.137c23.715-4.548 46.456-13.32 66.599-25.34c-7.798 24.366-24.366 44.833-46.132 57.827c21.117-2.273 41.584-8.122 60.426-16.243c-14.292 20.791-32.161 39.308-52.628 54.253z\\"/>","width":512}}},{"prefix":"ph","width":256,"height":256,"icons":{"arrow-right-bold":{"body":"<path fill=\\"currentColor\\" d=\\"m224.5 136.5l-72 72a12.1 12.1 0 0 1-17 0a12 12 0 0 1 0-17L187 140H40a12 12 0 0 1 0-24h147l-51.5-51.5a12 12 0 0 1 17-17l72 72a12 12 0 0 1 0 17Z\\"/>"},"bell-simple-ringing-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M207 192H49a8 8 0 0 1-6.9-12c6.6-11.4 14.1-32.2 14.1-68a71.8 71.8 0 1 1 143.6 0c0 35.8 7.5 56.6 14.1 68a8 8 0 0 1-6.9 12Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M168 224a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm52.8-48.1a16.2 16.2 0 0 1 .1 16.1a15.9 15.9 0 0 1-13.9 8H49a15.9 15.9 0 0 1-13.9-8a16.2 16.2 0 0 1 .1-16.1c5.9-10.2 13-29.6 13-63.9a79.8 79.8 0 1 1 159.6 0c0 34.3 7.1 53.7 13 63.9ZM207 184c-6.9-11.9-15.2-34.1-15.2-72a63.6 63.6 0 0 0-18.5-45.1A62.9 62.9 0 0 0 128.5 48h-.5a63.8 63.8 0 0 0-63.8 64c0 37.9-8.3 60.1-15.2 72Zm21.5-121.4a111.7 111.7 0 0 0-40.8-45.4a8 8 0 0 0-8.5 13.6a97 97 0 0 1 35 38.8a7.9 7.9 0 0 0 7.2 4.5a9.3 9.3 0 0 0 3.5-.8a8 8 0 0 0 3.6-10.7Zm-186.7 7a97 97 0 0 1 35-38.8a8 8 0 0 0-8.5-13.6a111.7 111.7 0 0 0-40.8 45.4a8 8 0 0 0 3.6 10.7a9.3 9.3 0 0 0 3.5.8a7.9 7.9 0 0 0 7.2-4.5Z\\"/>"},"books-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M136 48v128H88V80H40V48a8 8 0 0 1 8-8h32a8 8 0 0 1 8 8a8 8 0 0 1 8-8h32a8 8 0 0 1 8 8Zm89.9 149.6l-8.3-30.9l-46.4 12.5l8.3 30.9a8 8 0 0 0 9.8 5.6l30.9-8.3a8 8 0 0 0 5.7-9.8ZM184.5 43.1a8.1 8.1 0 0 0-9.8-5.7l-30.9 8.3a8.1 8.1 0 0 0-5.7 9.8l8.3 30.9L192.8 74Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M233.6 195.6L192.2 41a16 16 0 0 0-19.6-11.3L141.7 38l-1 .3A16 16 0 0 0 128 32H96a15.8 15.8 0 0 0-8 2.2a15.8 15.8 0 0 0-8-2.2H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h32a15.8 15.8 0 0 0 8-2.2a15.8 15.8 0 0 0 8 2.2h32a16 16 0 0 0 16-16v-99.6l27.8 103.7a16 16 0 0 0 15.5 11.9a19.9 19.9 0 0 0 4.1-.5l30.9-8.3a16 16 0 0 0 11.3-19.6ZM156.2 92.1l30.9-8.3l20.7 77.3l-30.9 8.3Zm20.5-46.9l6.3 23.1l-30.9 8.3l-6.3-23.1ZM128 48v120H96V48Zm-48 0v24H48V48ZM48 208V88h32v120Zm80 0H96v-24h32v24Zm90.2-8.3l-30.9 8.3l-6.3-23.2l31-8.3l6.2 23.2Z\\"/>"},"broadcast-duotone":{"body":"<circle cx=\\"128\\" cy=\\"128\\" r=\\"32\\" fill=\\"currentColor\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M128 88a40 40 0 1 0 40 40a40 40 0 0 0-40-40Zm0 64a24 24 0 1 1 24-24a24.1 24.1 0 0 1-24 24Z\\"/><path fill=\\"currentColor\\" d=\\"M82.7 82.7a7.9 7.9 0 0 0 0-11.3a8 8 0 0 0-11.3 0a80 80 0 0 0-17.1 25.5a79.9 79.9 0 0 0 0 62.2a80 80 0 0 0 17.1 25.5a8.3 8.3 0 0 0 5.7 2.3a8 8 0 0 0 5.6-2.3a7.9 7.9 0 0 0 0-11.3A65.4 65.4 0 0 1 69 152.9a64.5 64.5 0 0 1 0-49.8a65.4 65.4 0 0 1 13.7-20.4ZM208 128a78.6 78.6 0 0 0-6.3-31.1a80 80 0 0 0-17.1-25.5a8 8 0 0 0-11.3 0a7.9 7.9 0 0 0 0 11.3a65.4 65.4 0 0 1 13.7 20.4a64.5 64.5 0 0 1 0 49.8a65.4 65.4 0 0 1-13.7 20.4a7.9 7.9 0 0 0 0 11.3a8 8 0 0 0 5.6 2.3a8.3 8.3 0 0 0 5.7-2.3a80 80 0 0 0 17.1-25.5A78.6 78.6 0 0 0 208 128Z\\"/><path fill=\\"currentColor\\" d=\\"M32.2 168.5a104.1 104.1 0 0 1 0-81a101.3 101.3 0 0 1 22.3-33a8.1 8.1 0 0 0-11.4-11.4a121.8 121.8 0 0 0-25.7 38.2a120.7 120.7 0 0 0 0 93.4a121.8 121.8 0 0 0 25.7 38.2a8.5 8.5 0 0 0 5.7 2.3a8.3 8.3 0 0 0 5.7-2.3a8.1 8.1 0 0 0 0-11.4a101.3 101.3 0 0 1-22.3-33Zm206.4-87.2a121.8 121.8 0 0 0-25.7-38.2a8.1 8.1 0 1 0-11.4 11.4A103.5 103.5 0 0 1 232 128a103.5 103.5 0 0 1-30.5 73.5a8.1 8.1 0 0 0 0 11.4a8.3 8.3 0 0 0 5.7 2.3a8.5 8.5 0 0 0 5.7-2.3a121.8 121.8 0 0 0 25.7-38.2a120.7 120.7 0 0 0 0-93.4Z\\"/>"},"calendar-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M40 88h176V48a8 8 0 0 0-8-8H48a8 8 0 0 0-8 8Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M208 32h-24v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM72 48v8a8 8 0 0 0 16 0v-8h80v8a8 8 0 0 0 16 0v-8h24v32H48V48Zm136 160H48V96h160v112Z\\"/><path fill=\\"currentColor\\" d=\\"m117.4 144.1l8.8-11.1a8 8 0 0 0-6.2-13H92a8 8 0 0 0 0 16h11.4l-5.6 7a8 8 0 0 0 6.2 13a8 8 0 0 1 0 16a8.3 8.3 0 0 1-5.7-2.3a7.9 7.9 0 0 0-11.3 0a8 8 0 0 0 0 11.3a24 24 0 0 0 41-17a23.9 23.9 0 0 0-10.6-19.9Zm46.2-23.3a8.2 8.2 0 0 0-8.4.8l-16 12a8 8 0 0 0-1.6 11.2a8.1 8.1 0 0 0 11.2 1.6l3.2-2.4v36a8 8 0 0 0 16 0v-52a8.2 8.2 0 0 0-4.4-7.2Z\\"/>"},"car-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M224 184v24a8 8 0 0 1-8 8h-24a8 8 0 0 1-8-8v-24Zm-152 0v24a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-24Zm152-64l-29.9-67.2a8 8 0 0 0-7.3-4.8H69.2a8 8 0 0 0-7.3 4.8L32 120Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M240 112h-10.8l-27.8-62.5a15.9 15.9 0 0 0-14.6-9.5H69.2a15.9 15.9 0 0 0-14.6 9.5L26.8 112H16a8 8 0 0 0 0 16h8v80a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-16h96v16a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-80h8a8 8 0 0 0 0-16ZM69.2 56h117.6l24.9 56H44.3ZM64 208H40v-16h24Zm128 0v-16h24v16Zm24-32H40v-48h176Z\\"/><path fill=\\"currentColor\\" d=\\"M64 160h16a8 8 0 0 0 0-16H64a8 8 0 0 0 0 16Zm112 0h16a8 8 0 0 0 0-16h-16a8 8 0 0 0 0 16Z\\"/>"},"car-simple-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"m32 120l29.9-67.2a8 8 0 0 1 7.3-4.8h117.6a8 8 0 0 1 7.3 4.8L224 120Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M240 112h-10.8l-27.8-62.5a15.9 15.9 0 0 0-14.6-9.5H69.2a15.9 15.9 0 0 0-14.6 9.5L26.8 112H16a8 8 0 0 0 0 16h8v80a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-16h96v16a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-80h8a8 8 0 0 0 0-16ZM69.2 56h117.6l24.9 56H44.3ZM216 208h-24v-24a8 8 0 0 0-8-8H72a8 8 0 0 0-8 8v24H40v-80h176Z\\"/>"},"cell-signal-full-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M200 43.3V208a8 8 0 0 1-8 8H27.3a8 8 0 0 1-5.6-13.7L186.3 37.6a8.1 8.1 0 0 1 13.7 5.7Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M192 224H27.3A16 16 0 0 1 16 196.7L180.7 32A16 16 0 0 1 208 43.3V208a16 16 0 0 1-16 16ZM27.3 208H192V43.3L27.3 208Z\\"/>"},"chart-line-up-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M232 208a8 8 0 0 1-8 8H32a8 8 0 0 1-8-8V48a8 8 0 0 1 16 0v108.7l50.3-50.4a8.1 8.1 0 0 1 11.4 0l26.3 26.4L188.7 72H168a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8v40a8 8 0 0 1-16 0V83.3l-66.3 66.4a8.1 8.1 0 0 1-11.4 0L96 123.3l-56 56V200h184a8 8 0 0 1 8 8Z\\"/>"},"circles-four-duotone":{"body":"<circle cx=\\"76\\" cy=\\"180\\" r=\\"36\\" fill=\\"currentColor\\" opacity=\\".2\\"/><circle cx=\\"76\\" cy=\\"76\\" r=\\"36\\" fill=\\"currentColor\\" opacity=\\".2\\"/><circle cx=\\"180\\" cy=\\"76\\" r=\\"36\\" fill=\\"currentColor\\" opacity=\\".2\\"/><circle cx=\\"180\\" cy=\\"180\\" r=\\"36\\" fill=\\"currentColor\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M76 32a44 44 0 1 0 44 44a44 44 0 0 0-44-44Zm0 72a28 28 0 1 1 28-28a28.1 28.1 0 0 1-28 28Zm104 16a44 44 0 1 0-44-44a44 44 0 0 0 44 44Zm0-72a28 28 0 1 1-28 28a28.1 28.1 0 0 1 28-28Zm0 88a44 44 0 1 0 44 44a44 44 0 0 0-44-44Zm0 72a28 28 0 1 1 28-28a28.1 28.1 0 0 1-28 28ZM76 136a44 44 0 1 0 44 44a44 44 0 0 0-44-44Zm0 72a28 28 0 1 1 28-28a28.1 28.1 0 0 1-28 28Z\\"/>"},"circles-three-duotone":{"body":"<circle cx=\\"128\\" cy=\\"68\\" r=\\"40\\" fill=\\"currentColor\\" opacity=\\".2\\"/><circle cx=\\"188\\" cy=\\"172\\" r=\\"40\\" fill=\\"currentColor\\" opacity=\\".2\\"/><circle cx=\\"68\\" cy=\\"172\\" r=\\"40\\" fill=\\"currentColor\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M176 68a48 48 0 1 0-48 48a48 48 0 0 0 48-48Zm-48 32a32 32 0 1 1 32-32a32.1 32.1 0 0 1-32 32Zm60 24a48 48 0 1 0 48 48a48 48 0 0 0-48-48Zm0 80a32 32 0 1 1 32-32a32.1 32.1 0 0 1-32 32ZM68 124a48 48 0 1 0 48 48a48 48 0 0 0-48-48Zm0 80a32 32 0 1 1 32-32a32.1 32.1 0 0 1-32 32Z\\"/>"},"clock-clockwise-duotone":{"body":"<circle cx=\\"128\\" cy=\\"128\\" r=\\"88\\" fill=\\"currentColor\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M128 72a8 8 0 0 0-8 8v48.7c0 .1.1.2.1.4v.4c.1.1.1.2.1.4a.4.4 0 0 1 .1.3l.2.4a.4.4 0 0 0 .1.3c0 .2.1.3.1.4l.2.3a.5.5 0 0 0 .2.4l.2.3l.2.3l.2.4l.2.2c.1.1.2.3.4.4l.2.2l.3.3l.3.2l.3.3l.4.2h.2l41.6 24a7.1 7.1 0 0 0 4 1.1a8 8 0 0 0 4-14.9L136 123.4V80a8 8 0 0 0-8-8Z\\"/><path fill=\\"currentColor\\" d=\\"M230.8 104.2c.1-.2.2-.3.2-.4l.2-.3c.1-.1.1-.3.2-.4l.2-.3a.6.6 0 0 1 .1-.4c0-.1.1-.2.1-.4a.4.4 0 0 0 .1-.3c0-.2.1-.3.1-.4s.1-.3.1-.4v-.4a2.2 2.2 0 0 0 .1-.8v-40a8 8 0 1 0-16 0v20.7l-20.3-20.3a96 96 0 1 0 0 135.8a8 8 0 0 0 0-11.3a7.9 7.9 0 0 0-11.3 0a80 80 0 1 1 0-113.2l20.3 20.3h-20.7a8 8 0 0 0 0 16h42.3l.4-.2h.3l.4-.2h.3l.4-.2l.3-.2l.4-.3l.2-.2l1.2-1.1l.2-.3Z\\"/>"},"clock-duotone":{"body":"<circle cx=\\"128\\" cy=\\"128\\" r=\\"96\\" fill=\\"currentColor\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M128 24a104 104 0 1 0 104 104A104.2 104.2 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z\\"/><path fill=\\"currentColor\\" d=\\"M184 120h-48V72a8 8 0 0 0-16 0v56a8 8 0 0 0 8 8h56a8 8 0 0 0 0-16Z\\"/>"},"crown-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M236.3 87.7L210.8 196a8.1 8.1 0 0 1-10 5.9a273 273 0 0 0-145.7 0a8.1 8.1 0 0 1-10-5.9L19.7 87.7a8 8 0 0 1 11-9.2L81.3 101a8.1 8.1 0 0 0 10.3-3.4l29.4-53a8 8 0 0 1 14 0l29.4 53a8.1 8.1 0 0 0 10.3 3.4l50.6-22.5a8 8 0 0 1 11 9.2Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M238.7 73.5a15.9 15.9 0 0 0-16.7-2.3l-50.6 22.5l-29.4-53a16.1 16.1 0 0 0-28 0l-29.4 53L34 71.2a16 16 0 0 0-22.1 18.3l25.4 108.3a15.9 15.9 0 0 0 7.4 10.1a16.2 16.2 0 0 0 8.3 2.3a15.2 15.2 0 0 0 4.2-.6a265.5 265.5 0 0 1 141.5 0a16.5 16.5 0 0 0 12.5-1.7a15.6 15.6 0 0 0 7.4-10.1l25.5-108.3a16 16 0 0 0-5.4-16ZM203 194.2a281.2 281.2 0 0 0-150.1 0L27.5 85.9l50.6 22.4a15.8 15.8 0 0 0 20.4-6.8l29.5-53l29.5 53a15.8 15.8 0 0 0 20.4 6.8l50.6-22.4Zm-35-31.7a8.1 8.1 0 0 1-8 7.2h-.8a309.8 309.8 0 0 0-62.4 0a8 8 0 0 1-8.8-7.1a8.1 8.1 0 0 1 7.2-8.8a312.7 312.7 0 0 1 65.6 0a8.1 8.1 0 0 1 7.2 8.7Z\\"/>"},"drop-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M128 224a80 80 0 0 1-80-80c0-72 80-128 80-128s80 56 80 128a80 80 0 0 1-80 80Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M174 47.8a259.4 259.4 0 0 0-41.4-38.4a8.1 8.1 0 0 0-9.2 0A259.4 259.4 0 0 0 82 47.8C54.5 79.3 40 112.6 40 144a88 88 0 0 0 176 0c0-31.4-14.5-64.7-42-96.2ZM128 216a72.1 72.1 0 0 1-72-72c0-57.2 55.5-105 72-118c16.5 13 72 60.8 72 118a72.1 72.1 0 0 1-72 72Zm55.2-62.6a55.8 55.8 0 0 1-45.8 45.7h-1.3a8 8 0 0 1-1.3-15.9a39.7 39.7 0 0 0 32.6-32.6a8 8 0 0 1 9.3-6.5a7.9 7.9 0 0 1 6.5 9.3Z\\"/>"},"figma-logo-duotone":{"body":"<g fill=\\"currentColor\\" opacity=\\".2\\"><circle cx=\\"162\\" cy=\\"128\\" r=\\"34\\"/><path d=\\"M94 94h34V26H94a34 34 0 0 0 0 68ZM60 196a34 34 0 0 0 68 0v-34H94a34 34 0 0 0-34 34Z\\"/></g><path fill=\\"currentColor\\" d=\\"M186.6 94A42 42 0 0 0 162 18H94a42 42 0 0 0-24.6 76a41.9 41.9 0 0 0 0 68a42 42 0 1 0 66.6 34v-35.1A42 42 0 1 0 186.6 94Zm1.4-34a26.1 26.1 0 0 1-26 26h-26V34h26a26.1 26.1 0 0 1 26 26ZM68 60a26.1 26.1 0 0 1 26-26h26v52H94a26.1 26.1 0 0 1-26-26Zm0 68a26.1 26.1 0 0 1 26-26h26v52H94a26.1 26.1 0 0 1-26-26Zm26 94a26 26 0 0 1 0-52h26v26a26.1 26.1 0 0 1-26 26Zm68-68a26 26 0 0 1 0-52a26 26 0 0 1 0 52Z\\"/>"},"gauge-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M232 160v24a8 8 0 0 1-8 8H32a8 8 0 0 1-8-8v-22.9C24 103.6 70.2 56.2 127.6 56A104 104 0 0 1 232 160Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M207.1 80.7A111.3 111.3 0 0 0 128 48h-.4c-50.6.2-93.4 34.5-107 81.2a7.1 7.1 0 0 0-.8 1.8a11 11 0 0 0-.2 1.8a110.9 110.9 0 0 0-3.6 28.3V184a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-24a111.2 111.2 0 0 0-32.9-79.3ZM224 184H119.7l58.5-76.3a8 8 0 0 0-12.7-9.7l-66 86H32v-22.9a98.3 98.3 0 0 1 1.7-18.1l22.7 6.1a7.6 7.6 0 0 0 2.1.3a8 8 0 0 0 2-15.8l-22.6-6C50.6 93 82.2 67.5 120 64.3V88a8 8 0 0 0 16 0V64.3A95.6 95.6 0 0 1 195.8 92a96.9 96.9 0 0 1 22.6 35.5l-22.9 6.1a8 8 0 0 0 2 15.8a7.6 7.6 0 0 0 2.1-.3l22.9-6.1a95.1 95.1 0 0 1 1.5 17Z\\"/>"},"gear-six-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"m229.6 106l-25.9-14.4a80.1 80.1 0 0 0-6.3-11l.5-29.6a102.6 102.6 0 0 0-38.2-22l-25.4 15.2a88.3 88.3 0 0 0-12.6 0L96.2 28.9A104 104 0 0 0 58.1 51l.5 29.7a73.6 73.6 0 0 0-6.3 10.9l-26 14.4a102 102 0 0 0 .1 44l25.9 14.4a80.1 80.1 0 0 0 6.3 11l-.5 29.6a102.6 102.6 0 0 0 38.2 22l25.4-15.2a88.3 88.3 0 0 0 12.6 0l25.5 15.3a104 104 0 0 0 38.1-22.1l-.5-29.7a73.6 73.6 0 0 0 6.3-10.9l26-14.4a102 102 0 0 0-.1-44ZM128 176a48 48 0 1 1 48-48a48 48 0 0 1-48 48Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M128 72a56 56 0 1 0 56 56a56 56 0 0 0-56-56Zm0 96a40 40 0 1 1 40-40a40 40 0 0 1-40 40Zm109.5-63.7a8 8 0 0 0-4-5.3l-23.8-13.2a69.3 69.3 0 0 0-4.3-7.5l.5-27.2a8.3 8.3 0 0 0-2.6-6.1a112 112 0 0 0-41.1-23.7a8.1 8.1 0 0 0-6.6.8l-23.3 14c-2.9-.1-5.7-.1-8.6 0l-23.3-14a8.1 8.1 0 0 0-6.6-.8a111.1 111.1 0 0 0-41.1 23.8a7.9 7.9 0 0 0-2.6 6l.5 27.2c-1.6 2.4-3 4.9-4.4 7.5L22.4 99a7.9 7.9 0 0 0-3.9 5.3a111.4 111.4 0 0 0 0 47.4a8 8 0 0 0 4 5.3l23.8 13.2a69.3 69.3 0 0 0 4.3 7.5l-.5 27.2a8.3 8.3 0 0 0 2.6 6.1a112 112 0 0 0 41.1 23.7a8.1 8.1 0 0 0 6.6-.8l23.3-14h8.6l23.4 14a7.3 7.3 0 0 0 4.1 1.2a10 10 0 0 0 2.4-.4a111.1 111.1 0 0 0 41.1-23.8a7.9 7.9 0 0 0 2.6-6l-.5-27.2c1.6-2.4 3-4.9 4.4-7.5l23.8-13.2a7.9 7.9 0 0 0 3.9-5.3a111.4 111.4 0 0 0 0-47.4Zm-15 40.5l-22.7 12.6a8.2 8.2 0 0 0-3.3 3.6a73.6 73.6 0 0 1-5.7 9.8a8.6 8.6 0 0 0-1.4 4.7l.4 25.9a94.4 94.4 0 0 1-29.1 16.9l-22.3-13.4a8.1 8.1 0 0 0-4.1-1.1h-.6a72.3 72.3 0 0 1-11.4 0a8.6 8.6 0 0 0-4.7 1.1l-22.3 13.4a95 95 0 0 1-29.1-16.8l.4-26a8.6 8.6 0 0 0-1.4-4.7a86.4 86.4 0 0 1-5.7-9.8a8.8 8.8 0 0 0-3.3-3.6l-22.7-12.6a94.8 94.8 0 0 1 0-33.6l22.7-12.6a8.2 8.2 0 0 0 3.3-3.6a73.6 73.6 0 0 1 5.7-9.8a8.6 8.6 0 0 0 1.4-4.7l-.4-25.9a94.4 94.4 0 0 1 29.1-16.9l22.3 13.4a8.4 8.4 0 0 0 4.7 1.1a72.3 72.3 0 0 1 11.4 0a8.6 8.6 0 0 0 4.7-1.1l22.3-13.4a95 95 0 0 1 29.1 16.8l-.4 26a8.6 8.6 0 0 0 1.4 4.7a86.4 86.4 0 0 1 5.7 9.8a8.8 8.8 0 0 0 3.3 3.6l22.7 12.6a94.8 94.8 0 0 1 0 33.6Z\\"/>"},"github-logo-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M200 112v8a48 48 0 0 1-48 48h-48a48 48 0 0 1-48-48v-8a49.3 49.3 0 0 1 8.5-27.3A52 52 0 0 1 68 40a52 52 0 0 1 43.8 24h32.4A52 52 0 0 1 188 40a52 52 0 0 1 3.5 44.7A49.3 49.3 0 0 1 200 112Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M216 216a16 16 0 0 1-16-16v-8a32.1 32.1 0 0 0-14.8-27a55.8 55.8 0 0 0 22.8-45v-8a58 58 0 0 0-7.7-28.3a59.9 59.9 0 0 0-5.4-47.7a7.8 7.8 0 0 0-6.9-4a59.7 59.7 0 0 0-48 24h-24a59.7 59.7 0 0 0-48-24a7.8 7.8 0 0 0-6.9 4a59.9 59.9 0 0 0-5.4 47.7A58 58 0 0 0 48 112v8a55.8 55.8 0 0 0 22.8 45A32.1 32.1 0 0 0 56 192v8a16 16 0 0 1-16 16a8 8 0 0 0 0 16a32.1 32.1 0 0 0 32-32v-8a16 16 0 0 1 16-16h12v40a16 16 0 0 1-16 16a8 8 0 0 0 0 16a32.1 32.1 0 0 0 32-32v-40h24v40a32.1 32.1 0 0 0 32 32a8 8 0 0 0 0-16a16 16 0 0 1-16-16v-40h12a16 16 0 0 1 16 16v8a32.1 32.1 0 0 0 32 32a8 8 0 0 0 0-16ZM64 120v-8a42.7 42.7 0 0 1 6.9-22.5a7.9 7.9 0 0 0 1.1-7.7a43.7 43.7 0 0 1 .8-33.5a43.6 43.6 0 0 1 32.3 20a8 8 0 0 0 6.7 3.7h32.4a8 8 0 0 0 6.7-3.7a43.6 43.6 0 0 1 32.3-20a43.7 43.7 0 0 1 .8 33.5a8.2 8.2 0 0 0 1.1 7.7A42.7 42.7 0 0 1 192 112v8a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40Z\\"/>"},"globe-hemisphere-west-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M130.3 224a96.3 96.3 0 0 0 83.9-53.6L159.9 137a7.2 7.2 0 0 0-3.1-1.1l-22.9-3.1a7.8 7.8 0 0 0-8.3 4.7l-13.7 30.7a8 8 0 0 0 1.4 8.7l18.8 20.3a8.2 8.2 0 0 1 2 7l-3.8 19.8ZM65 55.6l-9 21.2a8 8 0 0 0-.1 5.9l11.5 30.6a7.9 7.9 0 0 0 5.8 5.1l5.4 1.1l8.3-19.7a8.1 8.1 0 0 1 7.4-4.9h21.4a8.6 8.6 0 0 0 3.8-1l12.3-6.8a7.2 7.2 0 0 0 1.5-1.1l26.9-24.3a8.1 8.1 0 0 0 1.6-9.8l-9.3-16.8A98.5 98.5 0 0 0 128 32a95.4 95.4 0 0 0-63 23.6Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M221.6 173.3A102.9 102.9 0 0 0 232 128a104.2 104.2 0 0 0-77.2-100.5h-.5A103.8 103.8 0 0 0 60.4 49l-1.3 1.2A103.9 103.9 0 0 0 128 232h2.4a104.3 104.3 0 0 0 90.6-57.4ZM216 128a89.3 89.3 0 0 1-5.5 30.7l-46.4-28.5a15.4 15.4 0 0 0-6.3-2.3l-22.8-3a16.1 16.1 0 0 0-15.3 6.8h-8.6l-3.8-7.9a15.7 15.7 0 0 0-11-8.7l-6.6-1.4l4.6-10.8h21.4a16.1 16.1 0 0 0 7.7-2l12.2-6.8a16.1 16.1 0 0 0 3-2.1l26.9-24.4a15.7 15.7 0 0 0 4.5-16.9a88 88 0 0 1 46 77.3Zm-68.8-85.9l7.6 13.7l-26.9 24.3l-12.2 6.8H94.3a15.9 15.9 0 0 0-14.7 9.8l-5.3 12.4l-10.9-29.2l8.2-19.3a87.8 87.8 0 0 1 75.6-18.5ZM40 128a87.1 87.1 0 0 1 9.5-39.7l10.4 27.9a16.1 16.1 0 0 0 11.6 10l5.5 1.2h.1l15.8 3.4l3.8 7.9a16.4 16.4 0 0 0 14.4 9h1.2l-7.7 17.2a16.1 16.1 0 0 0 2.8 17.4l18.8 20.4l-2.5 13.2A88.1 88.1 0 0 1 40 128Zm100.1 87.2l1.8-9.5a16 16 0 0 0-3.9-13.9l-18.8-20.3l12.7-28.7h.1l.9-2.1l22.8 3.1l47.8 29.4a88.5 88.5 0 0 1-63.4 42Z\\"/>"},"grid-four-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M128 128H44V52a8 8 0 0 1 8-8h76Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M204 36H52a16 16 0 0 0-16 16v152a16 16 0 0 0 16 16h152a16 16 0 0 0 16-16V52a16 16 0 0 0-16-16Zm0 84h-68V52h68Zm-84-68v68H52V52Zm-68 84h68v68H52Zm152 68h-68v-68h68v68Z\\"/>"},"headlights-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M136 64v128a8 8 0 0 1-8 8H88a72 72 0 0 1-72-72.5C16.3 87.8 49.2 56 88.9 56H128a8 8 0 0 1 8 8Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M160 80a8 8 0 0 1 8-8h72a8 8 0 0 1 0 16h-72a8 8 0 0 1-8-8Zm80 88h-72a8 8 0 0 0 0 16h72a8 8 0 0 0 0-16Zm0-64h-72a8 8 0 0 0 0 16h72a8 8 0 0 0 0-16Zm0 32h-72a8 8 0 0 0 0 16h72a8 8 0 0 0 0-16Zm-96-72v128a16 16 0 0 1-16 16H88a79.9 79.9 0 0 1-80-80.6C8.3 83.6 44.6 48 88.9 48H128a16 16 0 0 1 16 16Zm-16 0H88.9C53.4 64 24.3 92.5 24 127.5A64 64 0 0 0 88 192h40Z\\"/>"},"heartbeat-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M128 216S28 160 28 92a52 52 0 0 1 100-20a52 52 0 0 1 100 20c0 68-100 124-100 124Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"m78.7 132.4l9.3-14l25.3 38a8 8 0 0 0 13.4 0l13.6-20.4H160a8 8 0 0 0 0-16h-24a7.9 7.9 0 0 0-6.7 3.6l-9.3 14l-25.3-38a8 8 0 0 0-13.4 0L67.7 120H32a8 8 0 0 0 0 16h40a7.9 7.9 0 0 0 6.7-3.6Z\\"/><path fill=\\"currentColor\\" d=\\"M176 32a60 60 0 0 0-48 24A60 60 0 0 0 20 92c0 1.5 0 3 .1 4.4a8.1 8.1 0 0 0 8.5 7.6a8 8 0 0 0 7.5-8.5c-.1-1.1-.1-2.3-.1-3.5a44 44 0 0 1 84.6-17a8 8 0 0 0 14.8 0A44 44 0 0 1 220 92c0 55.2-74 103.7-92 114.7c-10.6-6.4-40.5-25.8-63.3-52a8 8 0 0 0-12.1 10.6c30 34.2 69.8 56.7 71.5 57.7a8.1 8.1 0 0 0 7.8 0a314.3 314.3 0 0 0 51.5-37.6C218.3 154 236 122.6 236 92a60 60 0 0 0-60-60Z\\"/>"},"house-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M152 208v-48a8 8 0 0 0-8-8h-32a8 8 0 0 0-8 8v48a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8v-92.5a8.3 8.3 0 0 1 2.6-5.9l80-72.7a8 8 0 0 1 10.8 0l80 72.7a7.9 7.9 0 0 1 2.6 5.9V208a8 8 0 0 1-8 8h-48a8 8 0 0 1-8-8Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M208 224h-48a16 16 0 0 1-16-16v-48h-32v48a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-92.5a16 16 0 0 1 5.2-11.8l80-72.7a16 16 0 0 1 21.6 0l80 72.7a16 16 0 0 1 5.2 11.8V208a16 16 0 0 1-16 16Zm-96-80h32a16 16 0 0 1 16 16v48h48v-92.5l-80-72.7l-80 72.7V208h48v-48a16 16 0 0 1 16-16Z\\"/>"},"lightbulb-filament-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M208 104a79.9 79.9 0 0 1-30.6 62.9A24.2 24.2 0 0 0 168 186v6a8 8 0 0 1-8 8H96a8 8 0 0 1-8-8v-6a24.4 24.4 0 0 0-9.3-19A79.5 79.5 0 0 1 48 104.5C47.8 61.1 82.7 25 126.1 24a80.1 80.1 0 0 1 81.9 80Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M176 232a8 8 0 0 1-8 8H88a8 8 0 0 1 0-16h80a8 8 0 0 1 8 8Zm40-128a87.7 87.7 0 0 1-33.6 69.2A16.1 16.1 0 0 0 176 186v6a16 16 0 0 1-16 16H96a16 16 0 0 1-16-16v-6a16.2 16.2 0 0 0-6.2-12.7A87.8 87.8 0 0 1 40 104.5c-.3-47.7 38.3-87.4 85.9-88.5a87.9 87.9 0 0 1 90.1 88Zm-16 0a72.1 72.1 0 0 0-73.7-72c-39 .9-70.5 33.4-70.3 72.4a71.7 71.7 0 0 0 27.6 56.3A32 32 0 0 1 96 186v6h24v-44.7l-29.7-29.6a8.1 8.1 0 0 1 11.4-11.4l26.3 26.4l26.3-26.4a8.1 8.1 0 0 1 11.4 11.4L136 147.3V192h24v-6a32.1 32.1 0 0 1 12.5-25.4A71.5 71.5 0 0 0 200 104Z\\"/>"},"map-pin-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M128.1 24a80 80 0 0 0-80 80c0 72 80 128 80 128s80-56 80-128a80 80 0 0 0-80-80Zm0 112a32 32 0 1 1 32-32a32 32 0 0 1-32 32Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M128.1 64a40 40 0 1 0 40 40a40.1 40.1 0 0 0-40-40Zm0 64a24 24 0 1 1 24-24a24.1 24.1 0 0 1-24 24Z\\"/><path fill=\\"currentColor\\" d=\\"M128.1 16a88.1 88.1 0 0 0-88 88c0 31.4 14.5 64.7 42 96.2a259.4 259.4 0 0 0 41.4 38.4a8.3 8.3 0 0 0 9.2 0a257.6 257.6 0 0 0 41.5-38.4c27.4-31.5 41.9-64.8 41.9-96.2a88.1 88.1 0 0 0-88-88Zm0 206c-16.5-13-72-60.8-72-118a72 72 0 0 1 144 0c0 57.2-55.5 105-72 118Z\\"/>"},"megaphone-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M152 160h40a40 40 0 0 0 0-80h-40Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M240 120a48 48 0 0 0-48-48h-40c-.5 0-52.4-.7-101.7-42.1a15.9 15.9 0 0 0-17.1-2.2A15.7 15.7 0 0 0 24 42.2v155.6a15.7 15.7 0 0 0 9.2 14.5a16.4 16.4 0 0 0 6.8 1.5a15.9 15.9 0 0 0 10.3-3.7c37.9-31.8 77.2-39.6 93.7-41.5v35.1a15.9 15.9 0 0 0 7.1 13.3l11 7.4a16.8 16.8 0 0 0 14.7 1.6a15.9 15.9 0 0 0 9.7-11.1l11.9-47.3A48.2 48.2 0 0 0 240 120ZM40 197.8V42.2C82.7 78 126.4 85.8 144 87.5v65c-17.6 1.7-61.3 9.5-104 45.3ZM171 211l-11-7.3V168h21.8Zm21-59h-32V88h32a32 32 0 0 1 0 64Z\\"/>"},"moon-stars-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M216.7 152.6A91.9 91.9 0 0 1 103.4 39.3a92 92 0 1 0 113.3 113.3Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M248 88a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0V96h-16a8 8 0 0 1 0-16h16V64a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8Zm-96-40h8v8a8 8 0 0 0 16 0v-8h8a8 8 0 0 0 0-16h-8v-8a8 8 0 0 0-16 0v8h-8a8 8 0 0 0 0 16Zm72.3 102.1a7.9 7.9 0 0 1 0 4.8A100 100 0 1 1 101.1 31.7a7.8 7.8 0 0 1 5.2.2a8 8 0 0 1 5 7.9a5.7 5.7 0 0 1-.3 1.8A84 84 0 0 0 214.3 145l2.2-.4a8.2 8.2 0 0 1 7.8 5.5Zm-20 13.1A99.9 99.9 0 0 1 92.8 51.7a84 84 0 1 0 111.5 111.5Z\\"/>"},"note-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M216 160h-56v56l56-56z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M96 104h64a8 8 0 0 0 0-16H96a8 8 0 0 0 0 16Zm0 32h64a8 8 0 0 0 0-16H96a8 8 0 0 0 0 16Zm32 16H96a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16Z\\"/><path fill=\\"currentColor\\" d=\\"M224 156.7V48a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h108.7a15.9 15.9 0 0 0 11.3-4.7l51.3-51.3a16.3 16.3 0 0 0 3.3-4.9h.1a17.4 17.4 0 0 0 1.3-6.4ZM48 48h160v104h-48a8 8 0 0 0-8 8v48H48Zm148.7 120L168 196.7V168Z\\"/>"},"paint-roller-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M208 64v64a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V64a8 8 0 0 1 8-8h152a8 8 0 0 1 8 8Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M232 88h-16V64a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16v24H16a8 8 0 0 0 0 16h16v24a16 16 0 0 0 16 16h152a16 16 0 0 0 16-16v-24h16v50l-100.4 28.6A16.2 16.2 0 0 0 120 198v34a8 8 0 0 0 16 0v-34l100.4-28.6A16.2 16.2 0 0 0 248 154v-50a16 16 0 0 0-16-16Zm-32 40H48V64h152v64Z\\"/>"},"parachute-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M128 24s-40 24-40 96H32a96 96 0 0 1 96-96Zm0 0s40 24 40 96h56a96 96 0 0 0-96-96Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M232 120A104.2 104.2 0 0 0 128 16A104.2 104.2 0 0 0 24 120a8.2 8.2 0 0 0 3.2 6.4L120 196v20h-8a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16h-8v-20l92.8-69.6a8.2 8.2 0 0 0 3.2-6.4Zm-16.4-8h-39.8c-1.5-37.9-13.9-62.4-25.1-77a88.1 88.1 0 0 1 64.9 77ZM128 34a79.2 79.2 0 0 1 13.9 16.3c7.6 11.6 16.5 31.6 17.9 61.7H96.2c1.4-30.1 10.3-50.1 17.9-61.7A76.5 76.5 0 0 1 128 34Zm26.4 94L128 175.5L101.6 128Zm-71.1 0l19.5 35.1L56 128Zm89.4 0H200l-46.8 35.1Zm-67.4-93c-11.2 14.6-23.6 39.1-25.1 77H40.4a88.1 88.1 0 0 1 64.9-77Z\\"/>"},"robot-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M200 56H56a23.9 23.9 0 0 0-24 24v112a23.9 23.9 0 0 0 24 24h144a23.9 23.9 0 0 0 24-24V80a23.9 23.9 0 0 0-24-24Zm-36 128H92a20 20 0 0 1 0-40h72a20 20 0 0 1 0 40Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M200 48h-64V16a8 8 0 0 0-16 0v32H56a32.1 32.1 0 0 0-32 32v112a32.1 32.1 0 0 0 32 32h144a32.1 32.1 0 0 0 32-32V80a32.1 32.1 0 0 0-32-32Zm16 144a16 16 0 0 1-16 16H56a16 16 0 0 1-16-16V80a16 16 0 0 1 16-16h144a16 16 0 0 1 16 16Zm-52-56H92a28 28 0 0 0 0 56h72a28 28 0 0 0 0-56Zm-24 16v24h-24v-24Zm-60 12a12 12 0 0 1 12-12h8v24h-8a12 12 0 0 1-12-12Zm84 12h-8v-24h8a12 12 0 0 1 0 24Zm-92-68a12 12 0 1 1 12 12a12 12 0 0 1-12-12Zm88 0a12 12 0 1 1 12 12a12 12 0 0 1-12-12Z\\"/>"},"sign-out-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"m221.7 133.7l-42 42a8.3 8.3 0 0 1-5.7 2.3a8 8 0 0 1-5.6-13.7l28.3-28.3H104a8 8 0 0 1 0-16h92.7l-28.3-28.3a8 8 0 0 1 11.3-11.4l42 42a8.1 8.1 0 0 1 0 11.4ZM104 208H48V48h56a8 8 0 0 0 0-16H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h56a8 8 0 0 0 0-16Z\\"/>"},"terminal-window-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M224 56.5v143a8.5 8.5 0 0 1-8.5 8.5h-175a8.5 8.5 0 0 1-8.5-8.5v-143a8.5 8.5 0 0 1 8.5-8.5h175a8.5 8.5 0 0 1 8.5 8.5Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M128 128a7.9 7.9 0 0 1-3 6.2l-40 32a7.9 7.9 0 0 1-5 1.8a7.8 7.8 0 0 1-6.2-3a7.9 7.9 0 0 1 1.2-11.2l32.2-25.8L75 102.2a8 8 0 1 1 10-12.4l40 32a7.9 7.9 0 0 1 3 6.2Zm48 24h-40a8 8 0 0 0 0 16h40a8 8 0 0 0 0-16Zm56.5-95.5v143a17 17 0 0 1-17 17h-175a17 17 0 0 1-17-17v-143a17 17 0 0 1 17-17h175a17 17 0 0 1 17 17Zm-17 143v-143h-175v143Z\\"/>"},"tree-evergreen-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"m32 192l56-72H48l80-104l80 104h-40l56 72Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M230.3 187.1L184.4 128H208a8 8 0 0 0 6.3-12.9l-80-104a8 8 0 0 0-12.6 0l-80 104A8 8 0 0 0 48 128h23.6l-45.9 59.1A8 8 0 0 0 32 200h88v40a8 8 0 0 0 16 0v-40h88a8 8 0 0 0 6.3-12.9ZM48.4 184l45.9-59.1A8 8 0 0 0 88 112H64.2L128 29.1l63.8 82.9H168a8 8 0 0 0-6.3 12.9l45.9 59.1Z\\"/>"},"user-duotone":{"body":"<circle cx=\\"128\\" cy=\\"96\\" r=\\"64\\" fill=\\"currentColor\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M231.9 212a120.7 120.7 0 0 0-67.1-54.2a72 72 0 1 0-73.6 0A120.7 120.7 0 0 0 24.1 212a8 8 0 1 0 13.8 8a104.1 104.1 0 0 1 180.2 0a8 8 0 1 0 13.8-8ZM72 96a56 56 0 1 1 56 56a56 56 0 0 1-56-56Z\\"/>"},"users-three-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M168 140a40 40 0 1 1-40-40a40 40 0 0 1 40 40ZM60 52a32 32 0 1 0 32 32a32 32 0 0 0-32-32Zm136 0a32 32 0 1 0 32 32a32 32 0 0 0-32-32Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M248.8 146.4a7.7 7.7 0 0 1-4.8 1.6a8 8 0 0 1-6.4-3.2A51.6 51.6 0 0 0 196 124a8 8 0 0 1 0-16a24 24 0 1 0-23.6-28.5a8 8 0 1 1-15.7-3a40 40 0 1 1 66.3 37a67.8 67.8 0 0 1 27.4 21.7a8 8 0 0 1-1.6 11.2Zm-56 66.1a8.1 8.1 0 0 1-3.7 10.7a9.3 9.3 0 0 1-3.5.8a8.1 8.1 0 0 1-7.2-4.5a56.1 56.1 0 0 0-100.8 0a8 8 0 0 1-10.7 3.7a8.1 8.1 0 0 1-3.7-10.7a72.1 72.1 0 0 1 35.6-34.4a48 48 0 1 1 58.4 0a72.1 72.1 0 0 1 35.6 34.4ZM128 172a32 32 0 1 0-32-32a32.1 32.1 0 0 0 32 32Zm-60-56a8 8 0 0 0-8-8a24 24 0 1 1 23.6-28.5a8 8 0 1 0 15.7-3a40 40 0 1 0-66.3 37a67.8 67.8 0 0 0-27.4 21.7a8 8 0 0 0 1.6 11.2A7.7 7.7 0 0 0 12 148a8 8 0 0 0 6.4-3.2A51.6 51.6 0 0 1 60 124a8 8 0 0 0 8-8Z\\"/>"},"wave-square-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M128 72v56H24V72Zm0 56v56h104v-56Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M240 128v56a8 8 0 0 1-8 8H128a8 8 0 0 1-8-8V80H32v48a8 8 0 0 1-16 0V72a8 8 0 0 1 8-8h104a8 8 0 0 1 8 8v104h88v-48a8 8 0 0 1 16 0Z\\"/>"},"waves-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M33.7 77A8 8 0 0 1 35 65.8a81.8 81.8 0 0 1 29.1-13.6c16.1-4 41.1-5 68.3 13.1c42.4 28.3 77.2 1.6 78.6.4a8.2 8.2 0 0 1 11.3 1.3a8 8 0 0 1-1.3 11.2a81.8 81.8 0 0 1-29.1 13.6a81 81 0 0 1-19.7 2.4c-14 0-30.8-3.7-48.6-15.5c-42.4-28.3-77.2-1.6-78.6-.4A8.2 8.2 0 0 1 33.7 77ZM211 121.7c-1.4 1.2-36.2 27.9-78.6-.4c-27.2-18.1-52.2-17.1-68.3-13.1A81.8 81.8 0 0 0 35 121.8a8 8 0 0 0-1.3 11.2a8.2 8.2 0 0 0 11.3 1.3c1.4-1.2 36.2-27.9 78.6.4c17.8 11.8 34.6 15.5 48.6 15.5a81 81 0 0 0 19.7-2.4a81.8 81.8 0 0 0 29.1-13.6a8 8 0 0 0 1.3-11.2a8.2 8.2 0 0 0-11.3-1.3Zm0 56c-1.4 1.2-36.2 27.9-78.6-.4c-27.2-18.1-52.2-17.1-68.3-13.1A81.8 81.8 0 0 0 35 177.8a8 8 0 0 0-1.3 11.2a8.2 8.2 0 0 0 11.3 1.3c1.4-1.2 36.2-27.9 78.6.4c17.8 11.8 34.6 15.5 48.6 15.5a82.6 82.6 0 0 0 48.8-16a8 8 0 0 0 1.3-11.2a8.2 8.2 0 0 0-11.3-1.3Z\\"/>"},"wrench-duotone":{"body":"<path fill=\\"currentColor\\" d=\\"M185 37.1L143 79l5.7 28.3L177 113l41.9-42a63.9 63.9 0 0 1-89.8 81L73 217a24 24 0 0 1-34-34l65-56.1a63.9 63.9 0 0 1 81-89.8Z\\" opacity=\\".2\\"/><path fill=\\"currentColor\\" d=\\"M226.3 67.9a8.3 8.3 0 0 0-4.6-4.4a7.7 7.7 0 0 0-6.3.4a5.1 5.1 0 0 0-2.1 1.5l-39 38.9l-18.8-3.8l-3.8-18.8l38.9-39a5.1 5.1 0 0 0 1.5-2.1a7.7 7.7 0 0 0 .4-6.3a8.3 8.3 0 0 0-4.4-4.6a72 72 0 0 0-94 95.2L33.8 177c-.1.1-.3.2-.4.4a31.9 31.9 0 0 0 0 45.2a31.9 31.9 0 0 0 45.2 0c.2-.1.3-.3.4-.4l52.1-60.3a72 72 0 0 0 95.2-94Zm-26.7 67.7a56.2 56.2 0 0 1-66.5 9.5a8.1 8.1 0 0 0-10.1 1.7l-55.9 64.7a16 16 0 0 1-22.6-22.6l64.7-55.9a8 8 0 0 0 1.8-9.9a56.1 56.1 0 0 1 58.9-82.3l-32.5 32.6a8 8 0 0 0-2.2 7.2l5.6 28.3a8.4 8.4 0 0 0 6.3 6.3l28.3 5.6a8 8 0 0 0 7.2-2.2l32.6-32.5a55.9 55.9 0 0 1-15.6 49.5Z\\"/>"}}},{"prefix":"ion","width":512,"height":512,"icons":{"play":{"body":"<path fill=\\"currentColor\\" d=\\"M133 440a35.37 35.37 0 0 1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0 1 35.77.45l247.85 148.36a36 36 0 0 1 0 61l-247.89 148.4A35.5 35.5 0 0 1 133 440Z\\"/>"}}}]');
Cu.forEach(t => xu.addCollection(t));
var ls;
const gr = window,
    Zi = gr.trustedTypes,
    Ya = Zi ? Zi.createPolicy("lit-html", {
        createHTML: t => t
    }) : void 0,
    ti = `lit$${(Math.random()+"").slice(9)}$`,
    vl = "?" + ti,
    Su = `<${vl}>`,
    Wi = document,
    An = (t = "") => Wi.createComment(t),
    Pn = t => t === null || typeof t != "object" && typeof t != "function",
    yl = Array.isArray,
    Tu = t => yl(t) || typeof(t == null ? void 0 : t[Symbol.iterator]) == "function",
    hn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    Xa = /-->/g,
    Ka = />/g,
    bi = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"),
    Qa = /'/g,
    Ja = /"/g,
    bl = /^(?:script|style|textarea|title)$/i,
    Mu = t => (e, ...i) => ({
        _$litType$: t,
        strings: e,
        values: i
    }),
    Ar = Mu(1),
    Ai = Symbol.for("lit-noChange"),
    Ke = Symbol.for("lit-nothing"),
    eo = new WeakMap,
    Vi = Wi.createTreeWalker(Wi, 129, null, !1),
    $u = (t, e) => {
        const i = t.length - 1,
            n = [];
        let r, s = e === 2 ? "<svg>" : "",
            a = hn;
        for (let l = 0; l < i; l++) {
            const c = t[l];
            let d, u, f = -1,
                h = 0;
            for (; h < c.length && (a.lastIndex = h, u = a.exec(c), u !== null);) h = a.lastIndex, a === hn ? u[1] === "!--" ? a = Xa : u[1] !== void 0 ? a = Ka : u[2] !== void 0 ? (bl.test(u[2]) && (r = RegExp("</" + u[2], "g")), a = bi) : u[3] !== void 0 && (a = bi) : a === bi ? u[0] === ">" ? (a = r ? ? hn, f = -1) : u[1] === void 0 ? f = -2 : (f = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? bi : u[3] === '"' ? Ja : Qa) : a === Ja || a === Qa ? a = bi : a === Xa || a === Ka ? a = hn : (a = bi, r = void 0);
            const v = a === bi && t[l + 1].startsWith("/>") ? " " : "";
            s += a === hn ? c + Su : f >= 0 ? (n.push(d), c.slice(0, f) + "$lit$" + c.slice(f) + ti + v) : c + ti + (f === -2 ? (n.push(void 0), l) : v)
        }
        const o = s + (t[i] || "<?>") + (e === 2 ? "</svg>" : "");
        if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
        return [Ya !== void 0 ? Ya.createHTML(o) : o, n]
    };
class On {
    constructor({
        strings: e,
        _$litType$: i
    }, n) {
        let r;
        this.parts = [];
        let s = 0,
            a = 0;
        const o = e.length - 1,
            l = this.parts,
            [c, d] = $u(e, i);
        if (this.el = On.createElement(c, n), Vi.currentNode = this.el.content, i === 2) {
            const u = this.el.content,
                f = u.firstChild;
            f.remove(), u.append(...f.childNodes)
        }
        for (;
            (r = Vi.nextNode()) !== null && l.length < o;) {
            if (r.nodeType === 1) {
                if (r.hasAttributes()) {
                    const u = [];
                    for (const f of r.getAttributeNames())
                        if (f.endsWith("$lit$") || f.startsWith(ti)) {
                            const h = d[a++];
                            if (u.push(f), h !== void 0) {
                                const v = r.getAttribute(h.toLowerCase() + "$lit$").split(ti),
                                    b = /([.?@])?(.*)/.exec(h);
                                l.push({
                                    type: 1,
                                    index: s,
                                    name: b[2],
                                    strings: v,
                                    ctor: b[1] === "." ? Pu : b[1] === "?" ? ku : b[1] === "@" ? Lu : Pr
                                })
                            } else l.push({
                                type: 6,
                                index: s
                            })
                        }
                    for (const f of u) r.removeAttribute(f)
                }
                if (bl.test(r.tagName)) {
                    const u = r.textContent.split(ti),
                        f = u.length - 1;
                    if (f > 0) {
                        r.textContent = Zi ? Zi.emptyScript : "";
                        for (let h = 0; h < f; h++) r.append(u[h], An()), Vi.nextNode(), l.push({
                            type: 2,
                            index: ++s
                        });
                        r.append(u[f], An())
                    }
                }
            } else if (r.nodeType === 8)
                if (r.data === vl) l.push({
                    type: 2,
                    index: s
                });
                else {
                    let u = -1;
                    for (;
                        (u = r.data.indexOf(ti, u + 1)) !== -1;) l.push({
                        type: 7,
                        index: s
                    }), u += ti.length - 1
                }
            s++
        }
    }
    static createElement(e, i) {
        const n = Wi.createElement("template");
        return n.innerHTML = e, n
    }
}

function Ui(t, e, i = t, n) {
    var r, s, a, o;
    if (e === Ai) return e;
    let l = n !== void 0 ? (r = i._$Co) === null || r === void 0 ? void 0 : r[n] : i._$Cl;
    const c = Pn(e) ? void 0 : e._$litDirective$;
    return (l == null ? void 0 : l.constructor) !== c && ((s = l == null ? void 0 : l._$AO) === null || s === void 0 || s.call(l, !1), c === void 0 ? l = void 0 : (l = new c(t), l._$AT(t, i, n)), n !== void 0 ? ((a = (o = i)._$Co) !== null && a !== void 0 ? a : o._$Co = [])[n] = l : i._$Cl = l), l !== void 0 && (e = Ui(t, l._$AS(t, e.values), l, n)), e
}
class Au {
    constructor(e, i) {
        this.u = [], this._$AN = void 0, this._$AD = e, this._$AM = i
    }
    get parentNode() {
        return this._$AM.parentNode
    }
    get _$AU() {
        return this._$AM._$AU
    }
    v(e) {
        var i;
        const {
            el: {
                content: n
            },
            parts: r
        } = this._$AD, s = ((i = e == null ? void 0 : e.creationScope) !== null && i !== void 0 ? i : Wi).importNode(n, !0);
        Vi.currentNode = s;
        let a = Vi.nextNode(),
            o = 0,
            l = 0,
            c = r[0];
        for (; c !== void 0;) {
            if (o === c.index) {
                let d;
                c.type === 2 ? d = new zn(a, a.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(a, c.name, c.strings, this, e) : c.type === 6 && (d = new Iu(a, this, e)), this.u.push(d), c = r[++l]
            }
            o !== (c == null ? void 0 : c.index) && (a = Vi.nextNode(), o++)
        }
        return s
    }
    p(e) {
        let i = 0;
        for (const n of this.u) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++
    }
}
class zn {
    constructor(e, i, n, r) {
        var s;
        this.type = 2, this._$AH = Ke, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = r, this._$Cm = (s = r == null ? void 0 : r.isConnected) === null || s === void 0 || s
    }
    get _$AU() {
        var e, i;
        return (i = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && i !== void 0 ? i : this._$Cm
    }
    get parentNode() {
        let e = this._$AA.parentNode;
        const i = this._$AM;
        return i !== void 0 && e.nodeType === 11 && (e = i.parentNode), e
    }
    get startNode() {
        return this._$AA
    }
    get endNode() {
        return this._$AB
    }
    _$AI(e, i = this) {
        e = Ui(this, e, i), Pn(e) ? e === Ke || e == null || e === "" ? (this._$AH !== Ke && this._$AR(), this._$AH = Ke) : e !== this._$AH && e !== Ai && this.g(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Tu(e) ? this.k(e) : this.g(e)
    }
    O(e, i = this._$AB) {
        return this._$AA.parentNode.insertBefore(e, i)
    }
    T(e) {
        this._$AH !== e && (this._$AR(), this._$AH = this.O(e))
    }
    g(e) {
        this._$AH !== Ke && Pn(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Wi.createTextNode(e)), this._$AH = e
    }
    $(e) {
        var i;
        const {
            values: n,
            _$litType$: r
        } = e, s = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = On.createElement(r.h, this.options)), r);
        if (((i = this._$AH) === null || i === void 0 ? void 0 : i._$AD) === s) this._$AH.p(n);
        else {
            const a = new Au(s, this),
                o = a.v(this.options);
            a.p(n), this.T(o), this._$AH = a
        }
    }
    _$AC(e) {
        let i = eo.get(e.strings);
        return i === void 0 && eo.set(e.strings, i = new On(e)), i
    }
    k(e) {
        yl(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let n, r = 0;
        for (const s of e) r === i.length ? i.push(n = new zn(this.O(An()), this.O(An()), this, this.options)) : n = i[r], n._$AI(s), r++;
        r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r)
    }
    _$AR(e = this._$AA.nextSibling, i) {
        var n;
        for ((n = this._$AP) === null || n === void 0 || n.call(this, !1, !0, i); e && e !== this._$AB;) {
            const r = e.nextSibling;
            e.remove(), e = r
        }
    }
    setConnected(e) {
        var i;
        this._$AM === void 0 && (this._$Cm = e, (i = this._$AP) === null || i === void 0 || i.call(this, e))
    }
}
let Pr = class {
    constructor(e, i, n, r, s) {
        this.type = 1, this._$AH = Ke, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String), this.strings = n) : this._$AH = Ke
    }
    get tagName() {
        return this.element.tagName
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(e, i = this, n, r) {
        const s = this.strings;
        let a = !1;
        if (s === void 0) e = Ui(this, e, i, 0), a = !Pn(e) || e !== this._$AH && e !== Ai, a && (this._$AH = e);
        else {
            const o = e;
            let l, c;
            for (e = s[0], l = 0; l < s.length - 1; l++) c = Ui(this, o[n + l], i, l), c === Ai && (c = this._$AH[l]), a || (a = !Pn(c) || c !== this._$AH[l]), c === Ke ? e = Ke : e !== Ke && (e += (c ? ? "") + s[l + 1]), this._$AH[l] = c
        }
        a && !r && this.j(e)
    }
    j(e) {
        e === Ke ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ? ? "")
    }
};
class Pu extends Pr {
    constructor() {
        super(...arguments), this.type = 3
    }
    j(e) {
        this.element[this.name] = e === Ke ? void 0 : e
    }
}
const Ou = Zi ? Zi.emptyScript : "";
class ku extends Pr {
    constructor() {
        super(...arguments), this.type = 4
    }
    j(e) {
        e && e !== Ke ? this.element.setAttribute(this.name, Ou) : this.element.removeAttribute(this.name)
    }
}
class Lu extends Pr {
    constructor(e, i, n, r, s) {
        super(e, i, n, r, s), this.type = 5
    }
    _$AI(e, i = this) {
        var n;
        if ((e = (n = Ui(this, e, i, 0)) !== null && n !== void 0 ? n : Ke) === Ai) return;
        const r = this._$AH,
            s = e === Ke && r !== Ke || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive,
            a = e !== Ke && (r === Ke || s);
        s && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e
    }
    handleEvent(e) {
        var i, n;
        typeof this._$AH == "function" ? this._$AH.call((n = (i = this.options) === null || i === void 0 ? void 0 : i.host) !== null && n !== void 0 ? n : this.element, e) : this._$AH.handleEvent(e)
    }
}
class Iu {
    constructor(e, i, n) {
        this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(e) {
        Ui(this, e)
    }
}
const to = gr.litHtmlPolyfillSupport;
to == null || to(On, zn), ((ls = gr.litHtmlVersions) !== null && ls !== void 0 ? ls : gr.litHtmlVersions = []).push("2.6.1");
const Du = (t, e, i) => {
    var n, r;
    const s = (n = i == null ? void 0 : i.renderBefore) !== null && n !== void 0 ? n : e;
    let a = s._$litPart$;
    if (a === void 0) {
        const o = (r = i == null ? void 0 : i.renderBefore) !== null && r !== void 0 ? r : null;
        s._$litPart$ = a = new zn(e.insertBefore(An(), o), o, void 0, i ? ? {})
    }
    return a._$AI(t), a
};
const io = t => t ? ? Ke;

function Ht(t, e, i, n) {
    return t.addEventListener(e, i, n), () => {
        t.removeEventListener(e, i, n)
    }
}
var Mt = class {
    constructor() {
        this._disposal = this._disposal ? ? []
    }
    add(...t) {
        t && t.forEach(e => {
            this._disposal.push(e)
        })
    }
    empty() {
        this._disposal.forEach(t => t()), this._disposal = []
    }
};

function it(t, e, i, n) {
    let r;

    function s() {
        r || (r = Ht((n == null ? void 0 : n.target) ? ? t, e, i, n))
    }
    s(), t.addController({
        hostConnected() {
            s()
        },
        hostDisconnected() {
            r == null || r(), r = void 0
        }
    })
}
var wl = class extends CustomEvent {
    constructor(t, e = {}) {
        super(t, e), this.triggerEvent = e.triggerEvent, this.hasOwnProperty("originEvent") || Object.defineProperties(this, {
            originEvent: {
                get() {
                    return or(this) ? ? this
                }
            },
            isOriginTrusted: {
                get() {
                    var i;
                    return ((i = or(this)) == null ? void 0 : i.isTrusted) ? ? !1
                }
            }
        })
    }
    get originEvent() {
        return or(this) ? ? this
    }
    get isOriginTrusted() {
        var t;
        return ((t = this.originEvent) == null ? void 0 : t.isTrusted) ? ? !1
    }
};

function ie(t, e = {}) {
    return new wl(t, e)
}

function or(t) {
    let e = t.triggerEvent;
    for (; e && e.triggerEvent;) e = e.triggerEvent;
    return e
}

function Xe(t, e) {
    (or(t) ? ? t).triggerEvent = e
}

function Ru(t, e) {
    if (e.bubbles && e.composed) return;
    const i = new wl(e.type, {
        triggerEvent: e.triggerEvent ? ? e,
        detail: e.detail,
        bubbles: e.bubbles,
        cancelable: e.cancelable,
        composed: e.composed
    });
    t.dispatchEvent(i)
}
var vr = new Map,
    Hu = class {
        constructor(t, e, i) {
            this._host = t, this.initialValue = e, this._options = i, this._registrationCallbacks = [], t.addController({
                hostConnected: () => {
                    this._connect()
                },
                hostDisconnected: () => {
                    delete this._host[this.id]
                }
            })
        }
        get id() {
            return this._options.id
        }
        get value() {
            return this._host[this.id] ? ? this.initialValue
        }
        get registered() {
            return this.id in this._host
        }
        _connect() {
            if (this.id in this._host) return;
            const t = e => {
                var i;
                this._host[this.id] = e, (i = this._registrationCallbacks) == null || i.forEach(n => n(e)), this._registrationCallbacks = void 0
            };
            if (this._host.dispatchEvent(ie("vds-context-consumer-connect", {
                    bubbles: !0,
                    composed: !0,
                    detail: {
                        id: this.id,
                        setValue: t
                    }
                })), !this.registered) {
                const e = vr.get(this.id) ? ? [];
                e.push({
                    host: this._host,
                    setValue: t
                }), vr.set(this.id, e)
            }
        }
        whenRegistered(t) {
            var e;
            if (this.registered) {
                t(this.value);
                return
            }(e = this._registrationCallbacks) == null || e.push(t)
        }
    };

function zu(t, e) {
    const i = vr.get(t) ? ? [],
        n = i.filter(({
            host: r
        }) => e.contains(r));
    return vr.set(t, i.filter(({
        host: r
    }) => !e.contains(r))), n
}
var Nu = class {
    constructor(t, e, i) {
        this._host = t, this._initValue = e, this._options = i, this._stopDisposal = new Mt, this._value = e(), t.addController({
            hostConnected: this.start.bind(this),
            hostDisconnected: this.stop.bind(this)
        })
    }
    get id() {
        return this._options.id
    }
    get value() {
        return this._value
    }
    start() {
        const t = Ht(this._host, "vds-context-consumer-connect", this._handleConsumerConnect.bind(this));
        for (const e of zu(this.id, this._host)) e.setValue(this._value);
        this._stopDisposal.add(t)
    }
    stop() {
        this._stopDisposal.empty()
    }
    _handleConsumerConnect(t) {
        const e = t.detail;
        e.id === this.id && (t.stopImmediatePropagation(), e.setValue(this._value))
    }
};

function _l(t) {
    const e = Symbol("@vidstack/context");
    return {
        id: e,
        consume(i) {
            return new Hu(i, t(), {
                id: e
            })
        },
        provide(i) {
            return new Nu(i, t, {
                id: e
            })
        }
    }
}

function Hs(t) {
    return typeof(t == null ? void 0 : t.id) == "symbol" && t.id.description === "@vidstack/context"
}

function It(...t) {}

function Fu(t, e) {
    return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function"
}

function El(t) {
    return t === null
}

function Et(t) {
    return typeof t > "u"
}

function Ci(t) {
    return El(t) || Et(t)
}

function Or(t) {
    return typeof t == "number" && !Number.isNaN(t)
}

function kr(t) {
    return typeof t == "string"
}

function zs(t) {
    return typeof t == "function"
}

function qu(t) {
    return Array.isArray(t)
}
var lr = new Map,
    cr = new Map;

function Vu(t, e, i) {
    for (const {
            host: n,
            callback: r
        } of Array.from(lr.get(e) ? ? [])) n !== t && n.contains(t) && r(t, i)
}

function ju(t, e) {
    return Array.from(cr.get(e) ? ? []).filter(({
        element: i
    }) => t !== i && t.contains(i))
}

function Bu(t, e, i) {
    const n = {
        host: t,
        callback: i
    };
    t.addController({
        hostConnected: () => {
            for (const {
                    element: r,
                    onDisconnect: s
                } of ju(t, e)) i(r, s);
            lr.set(e, (lr.get(e) ? ? new Set).add(n))
        },
        hostDisconnected: () => {
            var r;
            (r = lr.get(e)) == null || r.delete(n)
        }
    })
}

function xl(t, e, i = {}) {
    const n = i.register,
        r = new Mt,
        s = o => {
            r.add(o)
        },
        a = {
            element: t,
            onDisconnect: s
        };
    t.addController({
        hostConnected() {
            const o = ie(e, {
                bubbles: !0,
                composed: !0,
                detail: a
            });
            t.dispatchEvent(o), n && (cr.set(n, (cr.get(n) ? ? new Set).add(a)), Vu(t, n, s))
        },
        hostDisconnected() {
            var o;
            r.empty(), n && ((o = cr.get(n)) == null || o.delete(a))
        }
    })
}
var Ji = typeof window < "u",
    Ro, Zu = Ji ? (Ro = window.navigator) == null ? void 0 : Ro.userAgent.toLowerCase() : "",
    Wu = /iphone|ipad|ipod|ios|CriOS|FxiOS/.test(Zu);

function Uu() {
    return Ji && !Et(screen.orientation) && zs(screen.orientation.lock) && zs(screen.orientation.unlock)
}
var mt = {
        fullscreenEnabled: 0,
        fullscreenElement: 1,
        requestFullscreen: 2,
        exitFullscreen: 3,
        fullscreenchange: 4,
        fullscreenerror: 5,
        fullscreen: 6
    },
    no = ["webkitFullscreenEnabled", "webkitFullscreenElement", "webkitRequestFullscreen", "webkitExitFullscreen", "webkitfullscreenchange", "webkitfullscreenerror", "-webkit-full-screen"],
    ro = ["mozFullScreenEnabled", "mozFullScreenElement", "mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozfullscreenerror", "-moz-full-screen"],
    so = ["msFullscreenEnabled", "msFullscreenElement", "msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "MSFullscreenError", "-ms-fullscreen"],
    dt = typeof window < "u" && typeof window.document < "u" ? window.document : {},
    _t = "fullscreenEnabled" in dt && Object.keys(mt) || no[0] in dt && no || ro[0] in dt && ro || so[0] in dt && so || [],
    Gu = {
        requestFullscreen: function(t) {
            return t[_t[mt.requestFullscreen]]()
        },
        requestFullscreenFunction: function(t) {
            return t[_t[mt.requestFullscreen]]
        },
        get exitFullscreen() {
            return dt[_t[mt.exitFullscreen]].bind(dt)
        },
        get fullscreenPseudoClass() {
            return ":" + _t[mt.fullscreen]
        },
        addEventListener: function(t, e, i) {
            return dt.addEventListener(_t[mt[t]], e, i)
        },
        removeEventListener: function(t, e, i) {
            return dt.removeEventListener(_t[mt[t]], e, i)
        },
        get fullscreenEnabled() {
            return Boolean(dt[_t[mt.fullscreenEnabled]])
        },
        set fullscreenEnabled(t) {},
        get fullscreenElement() {
            return dt[_t[mt.fullscreenElement]]
        },
        set fullscreenElement(t) {},
        get onfullscreenchange() {
            return dt[("on" + _t[mt.fullscreenchange]).toLowerCase()]
        },
        set onfullscreenchange(t) {
            return dt[("on" + _t[mt.fullscreenchange]).toLowerCase()] = t
        },
        get onfullscreenerror() {
            return dt[("on" + _t[mt.fullscreenerror]).toLowerCase()]
        },
        set onfullscreenerror(t) {
            return dt[("on" + _t[mt.fullscreenerror]).toLowerCase()] = t
        }
    },
    wi = Gu,
    Yu = "@vidstack/log-colors";
Xu();

function Xu() {
    if (Ji && !Et(window.localStorage)) {
        let t = {};
        try {
            t = JSON.parse(localStorage.getItem(Yu) ? ? "")
        } catch {}
        return new Map(Object.entries(t))
    }
    return new Map
}

function Ku(t, e, i) {
    return Math.max(t, Math.min(i, e))
}

function ao(t) {
    var e;
    return ((e = String(t).split(".")[1]) == null ? void 0 : e.length) ? ? 0
}
var ua = class {
        constructor(t, e) {
            this._host = t, this._screenOrientationController = e, this._logger = void 0, this._listenerDisposal = new Mt, t.addController({
                hostDisconnected: this._handleHostDisconnected.bind(this)
            })
        }
        async _handleHostDisconnected() {
            this.isFullscreen && await this.exitFullscreen(), this._listenerDisposal.empty()
        }
        get isSupported() {
            return this.isSupportedNatively
        }
        get isSupportedNatively() {
            return wi.fullscreenEnabled
        }
        get isFullscreen() {
            return this.isNativeFullscreen
        }
        get isNativeFullscreen() {
            if (wi.fullscreenElement === this._host) return !0;
            try {
                return this._host.matches(wi.fullscreenPseudoClass)
            } catch {
                return !1
            }
        }
        _addFullscreenChangeEventListener(t) {
            if (!this.isSupported) return It;
            const e = Ht(wi, "fullscreenchange", t);
            return () => {
                e()
            }
        }
        _addFullscreenErrorEventListener(t) {
            if (!this.isSupported) return It;
            const e = Ht(wi, "fullscreenerror", t);
            return () => {
                e()
            }
        }
        async enterFullscreen() {
            if (this.isFullscreen) return;
            this._throwIfNoFullscreenSupport(), this._listenerDisposal.add(this._addFullscreenChangeEventListener(this._handleFullscreenChange.bind(this))), this._listenerDisposal.add(this._addFullscreenErrorEventListener(this._handleFullscreenError.bind(this)));
            const t = await this._makeEnterFullscreenRequest();
            return await this._lockScreenOrientation(), t
        }
        async _makeEnterFullscreenRequest() {
            return wi.requestFullscreen(this._host)
        }
        _handleFullscreenChange(t) {
            this.isFullscreen || this._listenerDisposal.empty(), this._host.dispatchEvent(ie("vds-fullscreen-change", {
                bubbles: !0,
                composed: !0,
                detail: this.isFullscreen,
                triggerEvent: t
            }))
        }
        _handleFullscreenError(t) {
            this._host.dispatchEvent(ie("vds-fullscreen-error", {
                bubbles: !0,
                composed: !0,
                triggerEvent: t
            }))
        }
        async exitFullscreen() {
            if (!this.isFullscreen) return;
            this._throwIfNoFullscreenSupport();
            const t = await this._makeExitFullscreenRequest();
            return await this._unlockScreenOrientation(), t
        }
        async _makeExitFullscreenRequest() {
            return wi.exitFullscreen()
        }
        _shouldOrientScreen() {
            return this._screenOrientationController.canOrient && !Et(this.screenOrientationLock)
        }
        async _lockScreenOrientation() {
            Et(this.screenOrientationLock) || !this._shouldOrientScreen() || await this._screenOrientationController.lock(this.screenOrientationLock)
        }
        async _unlockScreenOrientation() {
            this._shouldOrientScreen() && await this._screenOrientationController.unlock()
        }
        _throwIfNoFullscreenSupport() {
            if (!this.isSupported) throw Error("Fullscreen API is not enabled or supported in this environment.")
        }
    },
    Qu = class {
        constructor(t, e = {}, i = () => !0, n = void 0) {
            this._host = t, this._callback = i, this._logger = n, this._skipInitial = !1, this._unobservedUpdate = !1;
            const {
                target: r,
                skipInitial: s,
                ...a
            } = e;
            this._target = r ? ? void 0, this._skipInitial = s ? ? this._skipInitial, window.IntersectionObserver && (this._observer = new IntersectionObserver(o => {
                const l = this._unobservedUpdate;
                this._unobservedUpdate = !1, !(this._skipInitial && l) && (this.handleChanges(o), this._host.requestUpdate())
            }, a), t.addController(this))
        }
        handleChanges(t) {
            this.value = this._callback(t, this._observer)
        }
        hostConnected() {
            this._target && this.observe(this._target)
        }
        hostDisconnected() {
            this._disconnect()
        }
        async hostUpdated() {
            const t = this._observer.takeRecords();
            t.length && this.handleChanges(t)
        }
        observe(t) {
            return this._observer.observe(t), this._unobservedUpdate = !0, () => {
                this._observer.unobserve(t)
            }
        }
        _disconnect() {
            this._observer.disconnect()
        }
    };

function Ju(...t) {
    return new Qu(...t)
}
typeof window < "u" && typeof window.safari == "object" && (window == null || window.safari.pushNotification);

function oo() {
    let t = It,
        e = It;
    return {
        promise: new Promise((n, r) => {
            t = n, e = r
        }),
        resolve: t,
        reject: e
    }
}
var kn = class {
    constructor() {
        this._requestQueue = new Map, this._requestKeys = [], this._pendingFlush = oo(), this._isServing = !1
    }
    get isServing() {
        return this._isServing
    }
    get size() {
        return this._requestQueue.size
    }
    async waitForFlush() {
        this._isServing || await this._pendingFlush.promise
    }
    queue(t, e) {
        if (this._isServing) {
            e();
            return
        }
        this._requestKeys = [...this._requestKeys.filter(i => i !== t), t], this._requestQueue.set(t, e)
    }
    serve(t) {
        var e;
        (e = this._requestQueue.get(t)) == null || e(), this._requestQueue.delete(t)
    }
    start() {
        this._flush(), this._isServing = !0, this._requestQueue.size > 0 && this._flush()
    }
    _flush() {
        for (const t of this._requestKeys) this.serve(t);
        this._requestKeys = [], this._release()
    }
    _empty() {
        this._requestQueue.clear()
    }
    _release() {
        this._pendingFlush.resolve(), this._pendingFlush = oo()
    }
    stop() {
        this._isServing = !1
    }
    destroy() {
        this.stop(), this._empty(), this._release()
    }
};

function Cl(t) {
    const e = new kn;
    return t.addController({
        hostConnected: e.start.bind(e),
        hostDisconnected: e.destroy.bind(e)
    }), e
}
var Sl = class {
    constructor(t) {
        this._host = t, this._isScreenOrientationLocked = !1, this._logger = void 0, this._updateScreenOrientation(), this._listenerDisposal = new Mt, t.addController({
            hostConnected: this._handleHostConnected.bind(this),
            hostDisconnected: this._handleHostDisconnected.bind(this)
        })
    }
    async _handleHostConnected() {
        this._updateScreenOrientation(), this._addScreenOrientationEventListeners()
    }
    async _handleHostDisconnected() {
        this.canOrient && this._isScreenOrientationLocked && await this.unlock(), this._listenerDisposal.empty()
    }
    get currentOrientation() {
        return this._screenOrientation
    }
    get canOrient() {
        return Uu()
    }
    get isLocked() {
        return this._isScreenOrientationLocked
    }
    async lock(t) {
        this._throwIfScreenOrientationUnavailable(), await screen.orientation.lock(t), this._isScreenOrientationLocked = !0, this._host.dispatchEvent(ie("vds-screen-orientation-lock-change", {
            bubbles: !0,
            composed: !0,
            detail: t
        }))
    }
    async unlock() {
        this._throwIfScreenOrientationUnavailable(), await screen.orientation.unlock(), this._isScreenOrientationLocked = !1, this._host.dispatchEvent(ie("vds-screen-orientation-lock-change", {
            bubbles: !0,
            composed: !0,
            detail: screen.orientation.type
        }))
    }
    _addScreenOrientationEventListeners() {
        this.canOrient && this._listenerDisposal.add(this._addScreenOrientationChangeEventListener())
    }
    _addScreenOrientationChangeEventListener() {
        return Ht(screen.orientation, "change", this._handleOrientationChange.bind(this))
    }
    _handleOrientationChange(t) {
        this._screenOrientation = window.screen.orientation.type, this._host.dispatchEvent(ie("vds-screen-orientation-change", {
            bubbles: !0,
            composed: !0,
            detail: this._screenOrientation,
            triggerEvent: t
        }))
    }
    _updateScreenOrientation() {
        var t, e;
        this._screenOrientation = Ji ? (e = (t = window.screen) == null ? void 0 : t.orientation) == null ? void 0 : e.type : void 0
    }
    _throwIfScreenOrientationUnavailable() {
        if (!this.canOrient) throw Error("Screen orientation API is not available.")
    }
};

function Pi(t) {
    return Object.keys(t)
}

function ef(t, e, i) {
    let n, r;
    const s = () => {
        r = ((n == null ? void 0 : n.value) ? ? e).subscribe(i)
    };
    Hs(e) && (n = e.consume(t)), t.addController({
        hostConnected() {
            Hs(e) ? n.whenRegistered(s) : s()
        },
        hostDisconnected() {
            r == null || r()
        }
    })
}
var Fi = [];

function Tl(t, e = It) {
    let i;
    const n = new Set;

    function r(o) {
        if (Fu(t, o) && (t = o, i)) {
            const l = !Fi.length;
            for (const c of n) c[1](), Fi.push(c, t);
            if (l) {
                for (let c = 0; c < Fi.length; c += 2) Fi[c][0](Fi[c + 1]);
                Fi.length = 0
            }
        }
    }

    function s(o) {
        r(o(t))
    }

    function a(o, l = It) {
        const c = [o, l];
        return n.add(c), n.size === 1 && (i = e(r) || It), o(t), () => {
            n.delete(c), n.size === 0 && (i == null || i(), i = null)
        }
    }
    return {
        initialValue: t,
        set: r,
        update: s,
        subscribe: a
    }
}

function Ns(t) {
    let e;
    return t.subscribe(i => e = i)(), e
}

function tf(t, e, i, n) {
    if (Hs(e)) {
        const r = e.consume(t);
        let s;
        const a = () => {
            s = r.value[i].subscribe(n)
        };
        t.addController({
            hostConnected: () => {
                r.whenRegistered(a)
            },
            hostDisconnected: () => {
                s == null || s()
            }
        })
    } else return ef(t, e[i], n)
}

function Ml(t, e) {
    for (const i of Pi(t)) {
        const n = t[i],
            r = e[i];
        if (!n || !r) continue;
        const s = Ns(n),
            a = Ns(r);
        s !== a && r.set(s)
    }
}

function Fs(t) {
    return new Proxy(t, {
        get(e, i) {
            return Ns(e[i])
        },
        has(e, i) {
            return Reflect.has(e, i)
        },
        ownKeys(e) {
            return Reflect.ownKeys(e)
        },
        getOwnPropertyDescriptor(e, i) {
            return Reflect.getOwnPropertyDescriptor(e, i)
        }
    })
}

function nf(t, e) {
    return t.length === e.length && t.every((i, n) => i === e[n])
}

function lo(t) {
    return new Promise(e => {
        const i = window.requestAnimationFrame(async () => {
            await (t == null ? void 0 : t()), e(i)
        })
    })
}

function Lr(t, e, i = Ji) {
    const n = i && !Et(window.customElements.get(t));
    !i || n || window.customElements.define(t, e)
}

function fa(t, e, i) {
    if (Ci(i) || i === !1) t.removeAttribute(e);
    else {
        const n = kr(i) ? i : "";
        t.setAttribute(e, n)
    }
}

function rf(t, e) {
    var s;
    const i = e ? `slot[name="${e}"]` : "slot:not([name])",
        n = (s = t.shadowRoot) == null ? void 0 : s.querySelector(i),
        r = (n == null ? void 0 : n.assignedNodes({
            flatten: !0
        })) ? ? [];
    return Array.prototype.filter.call(r, a => a.nodeType == Node.ELEMENT_NODE)
}

function $l(t) {
    const e = window.requestIdleCallback ? ? (i => i());
    document.readyState === "complete" ? e(t) : window.addEventListener("load", () => {
        e(t)
    }, {
        once: !0
    })
}

function sf(t, e = "preconnect", i = Ji) {
    if (!i) return !1;
    const n = document.querySelector(`link[href="${t}"]`);
    if (!El(n)) return !0;
    const r = document.createElement("link");
    return r.rel = e, r.href = t, r.crossOrigin = "true", document.head.append(r), !0
}

function af(t) {
    return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}
var of = lf;

function lf(t, e, i) {
    var n = null,
        r = null,
        s = function() {
            n && (clearTimeout(n), r = null, n = null)
        },
        a = function() {
            var l = r;
            s(), l && l()
        },
        o = function() {
            if (!e) return t.apply(this, arguments);
            var l = this,
                c = arguments,
                d = i && !n;
            if (s(), r = function() {
                    t.apply(l, c)
                }, n = setTimeout(function() {
                    if (n = null, !d) {
                        var u = r;
                        return r = null, u()
                    }
                }, e), d) return r()
        };
    return o.cancel = s, o.flush = a, o
}
var cf = df;

function df(t, e, i) {
    var n = null,
        r = null,
        s = i && i.leading,
        a = i && i.trailing;
    s == null && (s = !0), a == null && (a = !s), s == !0 && (a = !1);
    var o = function() {
            n && (clearTimeout(n), n = null)
        },
        l = function() {
            var d = r;
            o(), d && d()
        },
        c = function() {
            var d = s && !n,
                u = this,
                f = arguments;
            if (r = function() {
                    return t.apply(u, f)
                }, n || (n = setTimeout(function() {
                    if (n = null, a) return r()
                }, e)), d) return d = !1, r()
        };
    return c.cancel = o, c.flush = l, c
}
var uf = _l(() => Tl(void 0));

function ff(t, e, i) {
    if (!Or(e) || e < 0 || e > i) throw new Error(`Failed to execute '${t}' on 'TimeRanges': The index provided (${e}) is non-numeric or out of bounds (0-${i}).`)
}

function co(t, e, i, n) {
    return ff(t, n, i.length - 1), i[n][e]
}

function cs(t) {
    if (Et(t) || t.length === 0) {
        const e = () => {
            throw new Error("This TimeRanges object is empty")
        };
        return {
            length: 0,
            start: e,
            end: e
        }
    }
    return {
        length: t.length,
        start: co.bind(null, "start", 0, t),
        end: co.bind(null, "end", 1, t)
    }
}

function ds(t, e) {
    return qu(t) ? cs(t) : Et(t) || Et(e) ? cs() : cs([
        [t, e]
    ])
}
var yr = {
    autoplay: !1,
    autoplayError: void 0,
    buffered: ds(),
    duration: 0,
    bufferedAmount: 0,
    canLoad: !1,
    canPlay: !1,
    canFullscreen: !1,
    controls: !1,
    poster: "",
    currentSrc: "",
    currentTime: 0,
    ended: !1,
    error: void 0,
    fullscreen: !1,
    userIdle: !1,
    loop: !1,
    mediaType: "unknown",
    muted: !1,
    paused: !0,
    played: ds(),
    playing: !1,
    playsinline: !1,
    seekable: ds(),
    seekableAmount: 0,
    seeking: !1,
    src: [],
    started: !1,
    viewType: "unknown",
    volume: 1,
    waiting: !1
};

function qs() {
    const t = {};
    for (const e of Pi(yr)) t[e] = Tl(yr[e]);
    return t
}
var pf = new Set(["autoplay", "canFullscreen", "canLoad", "controls", "currentSrc", "loop", "muted", "playsinline", "poster", "src", "viewType", "volume"]);

function hf(t) {
    Pi(t).forEach(e => {
        pf.has(e) || t[e].set(t[e].initialValue)
    })
}

function mf(t) {
    for (const e of Pi(yr)) t[e].set(yr[e])
}
var Al = _l(qs);

function xn(t, e, i) {
    return tf(t, Al, e, i)
}
var gf = Object.defineProperty,
    vf = Object.getOwnPropertyDescriptor,
    He = (t, e, i, n) => {
        for (var r = n > 1 ? void 0 : n ? vf(e, i) : e, s = t.length - 1, a; s >= 0; s--)(a = t[s]) && (r = (n ? a(e, i, r) : a(r)) || r);
        return n && r && gf(e, i, r), r
    };
const dr = window,
    pa = dr.ShadowRoot && (dr.ShadyCSS === void 0 || dr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
    ha = Symbol(),
    uo = new WeakMap;
let Pl = class {
    constructor(e, i, n) {
        if (this._$cssResult$ = !0, n !== ha) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = e, this.t = i
    }
    get styleSheet() {
        let e = this.o;
        const i = this.t;
        if (pa && e === void 0) {
            const n = i !== void 0 && i.length === 1;
            n && (e = uo.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet).replaceSync(this.cssText), n && uo.set(i, e))
        }
        return e
    }
    toString() {
        return this.cssText
    }
};
const yf = t => new Pl(typeof t == "string" ? t : t + "", void 0, ha),
    Ir = (t, ...e) => {
        const i = t.length === 1 ? t[0] : e.reduce((n, r, s) => n + (a => {
            if (a._$cssResult$ === !0) return a.cssText;
            if (typeof a == "number") return a;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
        })(r) + t[s + 1], t[0]);
        return new Pl(i, t, ha)
    },
    bf = (t, e) => {
        pa ? t.adoptedStyleSheets = e.map(i => i instanceof CSSStyleSheet ? i : i.styleSheet) : e.forEach(i => {
            const n = document.createElement("style"),
                r = dr.litNonce;
            r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, t.appendChild(n)
        })
    },
    fo = pa ? t => t : t => t instanceof CSSStyleSheet ? (e => {
        let i = "";
        for (const n of e.cssRules) i += n.cssText;
        return yf(i)
    })(t) : t;
var us;
const br = window,
    po = br.trustedTypes,
    wf = po ? po.emptyScript : "",
    ho = br.reactiveElementPolyfillSupport,
    Vs = {
        toAttribute(t, e) {
            switch (e) {
                case Boolean:
                    t = t ? wf : null;
                    break;
                case Object:
                case Array:
                    t = t == null ? t : JSON.stringify(t)
            }
            return t
        },
        fromAttribute(t, e) {
            let i = t;
            switch (e) {
                case Boolean:
                    i = t !== null;
                    break;
                case Number:
                    i = t === null ? null : Number(t);
                    break;
                case Object:
                case Array:
                    try {
                        i = JSON.parse(t)
                    } catch {
                        i = null
                    }
            }
            return i
        }
    },
    Ol = (t, e) => e !== t && (e == e || t == t),
    fs = {
        attribute: !0,
        type: String,
        converter: Vs,
        reflect: !1,
        hasChanged: Ol
    };
class qi extends HTMLElement {
    constructor() {
        super(), this._$Ei = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u()
    }
    static addInitializer(e) {
        var i;
        this.finalize(), ((i = this.h) !== null && i !== void 0 ? i : this.h = []).push(e)
    }
    static get observedAttributes() {
        this.finalize();
        const e = [];
        return this.elementProperties.forEach((i, n) => {
            const r = this._$Ep(n, i);
            r !== void 0 && (this._$Ev.set(r, n), e.push(r))
        }), e
    }
    static createProperty(e, i = fs) {
        if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(e, i), !i.noAccessor && !this.prototype.hasOwnProperty(e)) {
            const n = typeof e == "symbol" ? Symbol() : "__" + e,
                r = this.getPropertyDescriptor(e, n, i);
            r !== void 0 && Object.defineProperty(this.prototype, e, r)
        }
    }
    static getPropertyDescriptor(e, i, n) {
        return {
            get() {
                return this[i]
            },
            set(r) {
                const s = this[e];
                this[i] = r, this.requestUpdate(e, s, n)
            },
            configurable: !0,
            enumerable: !0
        }
    }
    static getPropertyOptions(e) {
        return this.elementProperties.get(e) || fs
    }
    static finalize() {
        if (this.hasOwnProperty("finalized")) return !1;
        this.finalized = !0;
        const e = Object.getPrototypeOf(this);
        if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = new Map, this.hasOwnProperty("properties")) {
            const i = this.properties,
                n = [...Object.getOwnPropertyNames(i), ...Object.getOwnPropertySymbols(i)];
            for (const r of n) this.createProperty(r, i[r])
        }
        return this.elementStyles = this.finalizeStyles(this.styles), !0
    }
    static finalizeStyles(e) {
        const i = [];
        if (Array.isArray(e)) {
            const n = new Set(e.flat(1 / 0).reverse());
            for (const r of n) i.unshift(fo(r))
        } else e !== void 0 && i.push(fo(e));
        return i
    }
    static _$Ep(e, i) {
        const n = i.attribute;
        return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0
    }
    u() {
        var e;
        this._$E_ = new Promise(i => this.enableUpdating = i), this._$AL = new Map, this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach(i => i(this))
    }
    addController(e) {
        var i, n;
        ((i = this._$ES) !== null && i !== void 0 ? i : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((n = e.hostConnected) === null || n === void 0 || n.call(e))
    }
    removeController(e) {
        var i;
        (i = this._$ES) === null || i === void 0 || i.splice(this._$ES.indexOf(e) >>> 0, 1)
    }
    _$Eg() {
        this.constructor.elementProperties.forEach((e, i) => {
            this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i])
        })
    }
    createRenderRoot() {
        var e;
        const i = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
        return bf(i, this.constructor.elementStyles), i
    }
    connectedCallback() {
        var e;
        this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach(i => {
            var n;
            return (n = i.hostConnected) === null || n === void 0 ? void 0 : n.call(i)
        })
    }
    enableUpdating(e) {}
    disconnectedCallback() {
        var e;
        (e = this._$ES) === null || e === void 0 || e.forEach(i => {
            var n;
            return (n = i.hostDisconnected) === null || n === void 0 ? void 0 : n.call(i)
        })
    }
    attributeChangedCallback(e, i, n) {
        this._$AK(e, n)
    }
    _$EO(e, i, n = fs) {
        var r;
        const s = this.constructor._$Ep(e, n);
        if (s !== void 0 && n.reflect === !0) {
            const a = (((r = n.converter) === null || r === void 0 ? void 0 : r.toAttribute) !== void 0 ? n.converter : Vs).toAttribute(i, n.type);
            this._$El = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$El = null
        }
    }
    _$AK(e, i) {
        var n;
        const r = this.constructor,
            s = r._$Ev.get(e);
        if (s !== void 0 && this._$El !== s) {
            const a = r.getPropertyOptions(s),
                o = typeof a.converter == "function" ? {
                    fromAttribute: a.converter
                } : ((n = a.converter) === null || n === void 0 ? void 0 : n.fromAttribute) !== void 0 ? a.converter : Vs;
            this._$El = s, this[s] = o.fromAttribute(i, a.type), this._$El = null
        }
    }
    requestUpdate(e, i, n) {
        let r = !0;
        e !== void 0 && (((n = n || this.constructor.getPropertyOptions(e)).hasChanged || Ol)(this[e], i) ? (this._$AL.has(e) || this._$AL.set(e, i), n.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = new Map), this._$EC.set(e, n))) : r = !1), !this.isUpdatePending && r && (this._$E_ = this._$Ej())
    }
    async _$Ej() {
        this.isUpdatePending = !0;
        try {
            await this._$E_
        } catch (i) {
            Promise.reject(i)
        }
        const e = this.scheduleUpdate();
        return e != null && await e, !this.isUpdatePending
    }
    scheduleUpdate() {
        return this.performUpdate()
    }
    performUpdate() {
        var e;
        if (!this.isUpdatePending) return;
        this.hasUpdated, this._$Ei && (this._$Ei.forEach((r, s) => this[s] = r), this._$Ei = void 0);
        let i = !1;
        const n = this._$AL;
        try {
            i = this.shouldUpdate(n), i ? (this.willUpdate(n), (e = this._$ES) === null || e === void 0 || e.forEach(r => {
                var s;
                return (s = r.hostUpdate) === null || s === void 0 ? void 0 : s.call(r)
            }), this.update(n)) : this._$Ek()
        } catch (r) {
            throw i = !1, this._$Ek(), r
        }
        i && this._$AE(n)
    }
    willUpdate(e) {}
    _$AE(e) {
        var i;
        (i = this._$ES) === null || i === void 0 || i.forEach(n => {
            var r;
            return (r = n.hostUpdated) === null || r === void 0 ? void 0 : r.call(n)
        }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e)
    }
    _$Ek() {
        this._$AL = new Map, this.isUpdatePending = !1
    }
    get updateComplete() {
        return this.getUpdateComplete()
    }
    getUpdateComplete() {
        return this._$E_
    }
    shouldUpdate(e) {
        return !0
    }
    update(e) {
        this._$EC !== void 0 && (this._$EC.forEach((i, n) => this._$EO(n, this[n], i)), this._$EC = void 0), this._$Ek()
    }
    updated(e) {}
    firstUpdated(e) {}
}
qi.finalized = !0, qi.elementProperties = new Map, qi.elementStyles = [], qi.shadowRootOptions = {
    mode: "open"
}, ho == null || ho({
    ReactiveElement: qi
}), ((us = br.reactiveElementVersions) !== null && us !== void 0 ? us : br.reactiveElementVersions = []).push("1.6.1");
var ps, hs;
class ri extends qi {
    constructor() {
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0
    }
    createRenderRoot() {
        var e, i;
        const n = super.createRenderRoot();
        return (e = (i = this.renderOptions).renderBefore) !== null && e !== void 0 || (i.renderBefore = n.firstChild), n
    }
    update(e) {
        const i = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Du(i, this.renderRoot, this.renderOptions)
    }
    connectedCallback() {
        var e;
        super.connectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!0)
    }
    disconnectedCallback() {
        var e;
        super.disconnectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!1)
    }
    render() {
        return Ai
    }
}
ri.finalized = !0, ri._$litElement$ = !0, (ps = globalThis.litElementHydrateSupport) === null || ps === void 0 || ps.call(globalThis, {
    LitElement: ri
});
const mo = globalThis.litElementPolyfillSupport;
mo == null || mo({
    LitElement: ri
});
((hs = globalThis.litElementVersions) !== null && hs !== void 0 ? hs : globalThis.litElementVersions = []).push("3.2.2");
const _f = (t, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e,
    finisher(i) {
        i.createProperty(e.key, t)
    }
} : {
    kind: "field",
    key: Symbol(),
    placement: "own",
    descriptor: {},
    originalKey: e.key,
    initializer() {
        typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this))
    },
    finisher(i) {
        i.createProperty(e.key, t)
    }
};

function Qe(t) {
    return (e, i) => i !== void 0 ? ((n, r, s) => {
        r.constructor.createProperty(s, n)
    })(t, e, i) : _f(t, e)
}

function en(t) {
    return Qe({ ...t,
        state: !0
    })
}
var ms;
((ms = window.HTMLSlotElement) === null || ms === void 0 ? void 0 : ms.prototype.assignedElements) != null;
var kl = Symbol("@vidstack/media-provider-discovery"),
    ft = class extends ri {
        constructor() {
            super(), this._disconnectDisposal = new Mt, this._logger = void 0, this.loading = "visible", this._attemptingAutoplay = !1, this.controllerQueue = new kn, this._store = qs(), this._state = Fs(this._store), this.connectedQueue = Cl(this), this.mediaQueue = new kn, this.screenOrientationController = new Sl(this), this.fullscreenController = new ua(this, this.screenOrientationController), xl(this, "vds-media-provider-connect", {
                register: kl
            });
            const t = Ju(this, {
                target: this,
                threshold: 0
            }, e => {
                var i;
                if (!/(visible|lazy)/.test(this.loading)) {
                    t.hostDisconnected();
                    return
                }(i = e[0]) != null && i.isIntersecting && (this.startLoadingMedia(), t.hostDisconnected())
            })
        }
        connectedCallback() {
            super.connectedCallback(), this._logMediaEvents(), window.requestAnimationFrame(() => {
                Et(this.canLoadPoster) && (this.canLoadPoster = !0)
            })
        }
        firstUpdated(t) {
            super.firstUpdated(t), this.dispatchEvent(ie("vds-fullscreen-support-change", {
                detail: this.canFullscreen
            })), this.canLoad || this.loading === "eager" ? window == null || window.requestAnimationFrame(() => {
                this.startLoadingMedia()
            }) : this.loading === "idle" && $l(() => {
                this.startLoadingMedia()
            })
        }
        render() {
            return Ar `<slot @slotchange="${this.handleDefaultSlotChange}"></slot>`
        }
        disconnectedCallback() {
            this._updateMediaStoreOnDisconnect(this._store), this.mediaQueue.destroy(), this._disconnectDisposal.empty(), super.disconnectedCallback(), lo(() => {
                lo(() => {
                    this.isConnected || this.destroy()
                })
            })
        }
        _updateMediaStoreOnDisconnect(t) {
            t.paused.set(!0), t.playing.set(!1), t.seeking.set(!1), t.waiting.set(!1), t.fullscreen.set(!1)
        }
        destroy() {
            this.isConnected && this.disconnectedCallback(), this.dispatchEvent(ie("vds-destroy"))
        }
        _logMediaEvents() {}
        get volume() {
            return this._getVolume()
        }
        set volume(t) {
            this.mediaQueue.queue("volume", () => {
                const e = this.volume,
                    i = Ku(0, t, 1);
                e !== i && (this._setVolume(i), this.requestUpdate("volume", e))
            })
        }
        get paused() {
            return this._getPaused()
        }
        set paused(t) {
            this.mediaQueue.queue("paused", () => {
                var e;
                if (this.paused !== t) try {
                    t ? this.pause() : this.play(), this.requestUpdate("paused", !t)
                } catch (i) {
                    (e = this._logger) == null || e.error("paused-change-fail", i)
                }
            })
        }
        get currentTime() {
            return this._getCurrentTime()
        }
        set currentTime(t) {
            this.mediaQueue.queue("current-time", () => {
                const e = this.currentTime;
                e !== t && (this._setCurrentTime(t), this.requestUpdate("currentTime", e))
            })
        }
        get muted() {
            return this._getMuted()
        }
        set muted(t) {
            this.mediaQueue.queue("muted", () => {
                const e = this.muted;
                e !== t && (this._setMuted(t), this.requestUpdate("muted", e))
            })
        }
        get poster() {
            return this.state.poster
        }
        set poster(t) {
            const e = this.poster;
            e !== t && (this.dispatchEvent(ie("vds-poster-change", {
                detail: t
            })), this.requestUpdate("poster", e))
        }
        get loop() {
            return this.state.loop
        }
        set loop(t) {
            const e = this.loop;
            e !== t && (this.dispatchEvent(ie("vds-loop-change", {
                detail: t
            })), this.requestUpdate("loop", e))
        }
        get controls() {
            return this.state.controls
        }
        set controls(t) {
            const e = this.controls;
            e !== t && (this.dispatchEvent(ie("vds-controls-change", {
                detail: t
            })), this.requestUpdate("controls", e))
        }
        get canLoad() {
            return this.state.canLoad
        }
        startLoadingMedia() {
            this.state.canPlay || this.dispatchEvent(ie("vds-can-load"))
        }
        _throwIfNotReadyForPlayback() {
            if (!this.state.canPlay) throw Error("Media is not ready - wait for `vds-can-play` event.")
        }
        async _resetPlaybackIfEnded() {
            if (!(!this.state.ended || this.state.currentTime === 0)) return this._setCurrentTime(0)
        }
        _throwIfNotVideoView() {
            if (this.state.viewType !== "video") throw Error("Player is currently not in a video view.")
        }
        async _handleMediaReady({
            event: t,
            duration: e
        }) {
            this.state.canPlay || (this.dispatchEvent(ie("vds-can-play", {
                triggerEvent: t,
                detail: {
                    duration: e
                }
            })), this.mediaQueue.start(), await this._attemptAutoplay())
        }
        _handleCurrentSrcChange(t, e) {
            this.state.currentSrc !== t && (this.mediaQueue.stop(), this.dispatchEvent(ie("vds-current-src-change", {
                detail: t,
                triggerEvent: e
            })))
        }
        get autoplay() {
            return this.state.autoplay
        }
        set autoplay(t) {
            this.autoplay !== t && (this.dispatchEvent(ie("vds-autoplay-change", {
                detail: t
            })), this.requestUpdate("autoplay", !t)), this._attemptAutoplay()
        }
        get _canAttemptAutoplay() {
            return this.state.canPlay && this.state.autoplay && !this.state.started
        }
        async _attemptAutoplay() {
            if (this._canAttemptAutoplay) {
                this._attemptingAutoplay = !0;
                try {
                    await this.play(), this.dispatchEvent(ie("vds-autoplay", {
                        detail: {
                            muted: this.muted
                        }
                    }))
                } catch (t) {
                    this.dispatchEvent(ie("vds-autoplay-fail", {
                        detail: {
                            muted: this.muted,
                            error: t
                        }
                    })), this.requestUpdate()
                }
                this._attemptingAutoplay = !1
            }
        }
        get controller() {
            return this._controller
        }
        get logLevel() {
            var t;
            return ((t = this._controller) == null ? void 0 : t.logLevel) ? ? "silent"
        }
        set logLevel(t) {}
        get idleDelay() {
            var t;
            return ((t = this._controller) == null ? void 0 : t.idleDelay) ? ? 0
        }
        set idleDelay(t) {
            this.controllerQueue.queue("idle-delay", () => {
                this._controller.idleDelay = t
            })
        }
        attachMediaController(t, e) {
            this._controller = t, this._store = t._store, this._state = t.state, this.controllerQueue.start(), e(() => {
                this.controllerQueue.destroy(), this._store = qs(), this._state = Fs(this._store), this._controller && (Ml(this._controller._store, this._store), this._updateMediaStoreOnDisconnect(this._controller._store)), this._controller = void 0
            })
        }
        dispatchEvent(t) {
            return !this._controller && t.type.startsWith("vds-") && t.type !== "vds-destroy" ? (this.controllerQueue.queue(t.type, () => {
                super.dispatchEvent(t)
            }), !1) : super.dispatchEvent(t)
        }
        store() {
            return this._store
        }
        get state() {
            return this._state
        }
        get canFullscreen() {
            return this.fullscreenController.isSupported
        }
        get fullscreen() {
            return this.fullscreenController.isFullscreen
        }
        get fullscreenOrientation() {
            return this.fullscreenController.screenOrientationLock
        }
        set fullscreenOrientation(t) {
            const e = this.fullscreenController.screenOrientationLock;
            e !== t && (this.fullscreenController.screenOrientationLock = t, this.requestUpdate("fullscreen-orientation", e))
        }
        enterFullscreen() {
            return this.fullscreenController.enterFullscreen()
        }
        exitFullscreen() {
            return this.fullscreenController.exitFullscreen()
        }
    };
He([Qe({
    type: Number
})], ft.prototype, "volume", 1);
He([Qe({
    type: Boolean
})], ft.prototype, "paused", 1);
He([Qe({
    type: Number
})], ft.prototype, "currentTime", 1);
He([Qe({
    type: Boolean
})], ft.prototype, "muted", 1);
He([Qe()], ft.prototype, "poster", 1);
He([Qe({
    type: Boolean
})], ft.prototype, "loop", 1);
He([Qe({
    type: Boolean
})], ft.prototype, "controls", 1);
He([en()], ft.prototype, "canLoadPoster", 2);
He([Qe({
    attribute: "loading"
})], ft.prototype, "loading", 2);
He([Qe({
    type: Boolean
})], ft.prototype, "autoplay", 1);
He([Qe({
    attribute: "log-level"
})], ft.prototype, "logLevel", 1);
He([Qe({
    attribute: "idle-delay",
    type: Number
})], ft.prototype, "idleDelay", 1);
He([Qe({
    attribute: "fullscreen-orientation"
})], ft.prototype, "fullscreenOrientation", 1);
var Ef = class {
        constructor(t, e) {
            this._host = t, this._mediaStore = e, this._idle = !1, this._mediaPaused = !1, this._idlingPaused = !1, this._disposal = new Mt, this.delay = 2e3, t.addController(this)
        }
        get paused() {
            return this._idlingPaused || this._mediaPaused
        }
        set paused(t) {
            this._idlingPaused = t, this._handleIdleChange()
        }
        hostConnected() {
            this._disposal.add(this._mediaStore.paused.subscribe(e => {
                this._mediaPaused = e, this._handleIdleChange()
            })), ["pointerdown", "pointermove", "focus", "keydown"].forEach(e => {
                const i = Ht(this._host, e, this._handleIdleChange.bind(this));
                this._disposal.add(i)
            })
        }
        hostDisconnected() {
            this._disposal.empty(), this._stopIdleTimer()
        }
        _handleIdleChange() {
            this.paused ? this._stopIdleTimer() : this._startIdleTimer()
        }
        _startIdleTimer() {
            this._stopIdleTimer(), this._idleTimeout = window.setTimeout(() => {
                this._dispatchIdleChange(!this.paused)
            }, this.delay)
        }
        _stopIdleTimer() {
            window.clearTimeout(this._idleTimeout), this._dispatchIdleChange(!1)
        }
        _dispatchIdleChange(t) {
            this._idle !== t && (this._host.dispatchEvent(ie("vds-user-idle-change", {
                detail: t
            })), this._idle = t)
        }
    },
    xf = class {
        constructor(t) {
            this._host = t, this._disconnectDisposal = new Mt, this.providerQueue = new kn, this.providerDisposal = new Mt, this._logController = void 0, this._logger = void 0, this._providerContext = uf.provide(this._host), this._mediaStoreProvider = Al.provide(this._host), this.state = Fs(this._store), this._userIdleController = new Ef(this._host, this._store), this._handleIdleChange = it(this._host, "vds-user-idle-change", e => {
                this._store.userIdle.set(e.detail), this._satisfyMediaRequest("userIdle", e)
            }), this._pendingMediaRequests = {
                loading: [],
                play: [],
                pause: [],
                volume: [],
                fullscreen: [],
                seeked: [],
                seeking: [],
                userIdle: []
            }, this._handleStartLoadingRequest = it(this._host, "vds-start-loading", this._createMediaRequestHandler("loading", e => {
                this.state.canLoad || (this._pendingMediaRequests.loading.push(e), this._provider.startLoadingMedia())
            })), this._handleMuteRequest = it(this._host, "vds-mute-request", this._createMediaRequestHandler("muted", e => {
                this.state.muted || (this._pendingMediaRequests.volume.push(e), this.provider.muted = !0)
            })), this._handleUnmuteRequest = it(this._host, "vds-unmute-request", this._createMediaRequestHandler("muted", e => {
                this.state.muted && (this._pendingMediaRequests.volume.push(e), this.provider.muted = !1, this.state.volume === 0 && (this._pendingMediaRequests.volume.push(e), this.provider.volume = .25))
            })), this._handlePlayRequest = it(this._host, "vds-play-request", this._createMediaRequestHandler("paused", e => {
                this.state.paused && (this._pendingMediaRequests.play.push(e), this.provider.paused = !1)
            })), this._handlePauseRequest = it(this._host, "vds-pause-request", this._createMediaRequestHandler("paused", e => {
                this.state.paused || (this._pendingMediaRequests.pause.push(e), this.provider.paused = !0)
            })), this._isSeekingRequestPending = !1, this._handleSeekingRequest = it(this._host, "vds-seeking-request", this._createMediaRequestHandler("seeking", e => {
                this._stopWaiting(), this._pendingMediaRequests.seeking.push(e), this._isSeekingRequestPending = !0, this._store.seeking.set(!0)
            })), this._handleSeekRequest = it(this._host, "vds-seek-request", this._createMediaRequestHandler("seeking", e => {
                this.store.ended && (this._isReplay = !0), this._pendingMediaRequests.seeked.push(e), this._isSeekingRequestPending = !1;
                let i = e.detail;
                this.state.duration - e.detail < .25 && (i = this.state.duration), this.provider.currentTime = i
            })), this._handleVolumeChangeRequest = it(this._host, "vds-volume-change-request", this._createMediaRequestHandler("volume", e => {
                const i = e.detail;
                this.state.volume !== i && (this._pendingMediaRequests.volume.push(e), this.provider.volume = i, i > 0 && this.state.muted && (this._pendingMediaRequests.volume.push(e), this.provider.muted = !1))
            })), this._handleEnterFullscreenRequest = it(this._host, "vds-enter-fullscreen-request", this._createMediaRequestHandler("fullscreen", async e => {
                var n, r;
                if (this.state.fullscreen) return;
                (e.detail ? ? "media") === "media" && this._host.canFullscreen ? (this._pendingMediaRequests.fullscreen.push(e), await ((r = (n = this._host).enterFullscreen) == null ? void 0 : r.call(n))) : this.provider && (this._pendingMediaRequests.fullscreen.push(e), await this.provider.enterFullscreen())
            })), this._handleExitFullscreenRequest = it(this._host, "vds-exit-fullscreen-request", this._createMediaRequestHandler("fullscreen", async e => {
                var n, r;
                if (!this.state.fullscreen) return;
                (e.detail ? ? "media") === "media" && this._host.canFullscreen ? (this._pendingMediaRequests.fullscreen.push(e), await ((r = (n = this._host).exitFullscreen) == null ? void 0 : r.call(n))) : this.provider && (this._pendingMediaRequests.fullscreen.push(e), await this.provider.exitFullscreen())
            })), this._handleResumeIdlingRequest = it(this._host, "vds-resume-user-idle-request", e => {
                this._mediaRequestEventGateway(e) && (this._pendingMediaRequests.userIdle.push(e), this._userIdleController.paused = !1)
            }), this._handlePauseIdlingRequest = it(this._host, "vds-pause-user-idle-request", e => {
                this._mediaRequestEventGateway(e) && (this._pendingMediaRequests.userIdle.push(e), this._userIdleController.paused = !0)
            }), this._handleShowPosterRequest = it(this._host, "vds-show-poster-request", this._createMediaRequestHandler("poster", () => {
                this._provider.canLoadPoster = !0
            })), this._handleHidePosterRequest = it(this._host, "vds-hide-poster-request", this._createMediaRequestHandler("poster", () => {
                this._provider.canLoadPoster = !1
            })), this._handleLoopRequest = this._createMediaRequestHandler("loop", () => {
                window.requestAnimationFrame(async () => {
                    try {
                        this._isLooping = !0, this._isReplay = !0, await this._provider.play()
                    } catch {
                        this._isReplay = !1, this._isLooping = !1
                    }
                })
            }), this._handleFullscreenChange = it(this._host, "vds-fullscreen-change", e => {
                var i;
                this._store.fullscreen.set(e.detail), e.target === this._host && (this._satisfyMediaRequest("fullscreen", e), (i = this._provider) == null || i.dispatchEvent(ie("vds-fullscreen-change", {
                    detail: e.detail,
                    triggerEvent: e
                })))
            }), this._handleFullscreenError = it(this._host, "vds-fullscreen-error", e => {
                var i;
                e.target === this._host && (this._satisfyMediaRequest("fullscreen", e), (i = this._provider) == null || i.dispatchEvent(ie("vds-fullscreen-error", {
                    detail: e.detail,
                    triggerEvent: e
                })))
            }), this._isReplay = !1, this._isLooping = !1, this._firingWaiting = !1, this._mediaEvents = [], this._handleSeeking = cf(e => {
                this._mediaEvents.push(e), this._store.seeking.set(!0), this._store.currentTime.set(e.detail), this._satisfyMediaRequest("seeking", e)
            }, 150, {
                leading: !0
            }), this._fireWaiting = of (() => {
                var i;
                if (!this._originalWaitingEvent) return;
                this._firingWaiting = !0;
                const e = ie("vds-waiting", this._originalWaitingEvent);
                this._mediaEvents.push(e), this._store.waiting.set(!0), this._store.playing.set(!1), (i = this._provider) == null || i.dispatchEvent(e), this._originalWaitingEvent = void 0, this._firingWaiting = !1
            }, 300), this._skipInitialSrcChange = !0, Bu(t, kl, (e, i) => {
                this.attachMediaProvider(e, i)
            }), t.addController({
                hostConnected: () => {
                    this.state.canPlay || this._host.setAttribute("aria-busy", "true")
                },
                hostDisconnected: () => {
                    this._clearMediaStateTracking(), this._clearPendingMediaRequests(), this.providerQueue.destroy(), this.providerDisposal.empty(), this._skipInitialSrcChange = !0, this._disconnectDisposal.empty()
                }
            })
        }
        get logLevel() {
            var t;
            return ((t = this._logController) == null ? void 0 : t.logLevel) ? ? "silent"
        }
        set logLevel(t) {}
        get provider() {
            return this._provider
        }
        attachMediaProvider(t, e) {
            !Ci(this.provider) || this.provider === t || (this._handleMediaProviderDisconnect(), this._provider = t, this._providerContext.value.set(t), Ml(this._provider._store, this._store), this._attachMediaEventListeners(), t.attachMediaController(this, i => this._disconnectDisposal.add(i)), this._flushMediaProviderConnectedQueue(), e(this._handleMediaProviderDisconnect.bind(this)))
        }
        _handleMediaProviderDisconnect() {
            Ci(this.provider) || (this._stopWaiting(), this.providerQueue.destroy(), this.providerDisposal.empty(), this._provider = void 0, this._providerContext.value.set(void 0), mf(this._store), this._store.viewType.set("unknown"))
        }
        _flushMediaProviderConnectedQueue() {
            this.providerQueue.start(), this.providerDisposal.add(() => {
                this.providerQueue.stop()
            })
        }
        get store() {
            return this._mediaStoreProvider.value
        }
        get _store() {
            return this._mediaStoreProvider.value
        }
        get idleDelay() {
            return this._userIdleController.delay
        }
        set idleDelay(t) {
            this._userIdleController.delay = t
        }
        _clearPendingMediaRequests() {
            Pi(this._pendingMediaRequests).forEach(t => {
                this._pendingMediaRequests[t] = []
            })
        }
        _satisfyMediaRequest(t, e) {
            const i = this._pendingMediaRequests[t].shift();
            i && (e.requestEvent = i, Xe(e, i))
        }
        _mediaRequestEventGateway(t) {
            return t.stopPropagation(), !0
        }
        _createMediaRequestHandler(t, e) {
            return i => {
                if (this._mediaRequestEventGateway(i)) {
                    if (this._provider) {
                        e(i);
                        return
                    }
                    this.providerQueue.queue(t, () => {
                        e(i)
                    })
                }
            }
        }
        _attachMediaEventListeners() {
            if (!this._provider) return;
            const t = {
                "vds-can-load": this._handleCanLoad,
                "vds-load-start": this._handleLoadStart,
                "vds-loaded-data": this._handleLoadedData,
                "vds-loaded-metadata": this._handleLoadedMetadata,
                "vds-can-play": this._handleCanPlay,
                "vds-can-play-through": this._handleCanPlayThrough,
                "vds-current-src-change": this._handleCurrentSrcChange,
                "vds-autoplay": this._handleAutoplay,
                "vds-autoplay-fail": this._handleAutoplayFail,
                "vds-loop-request": this._handleLoopRequest,
                "vds-play": this._handlePlay,
                "vds-play-fail": this._handlePlayFail,
                "vds-playing": this._handlePlaying,
                "vds-pause": this._handlePause,
                "vds-time-update": this._handleTimeUpdate,
                "vds-volume-change": this._handleVolumeChange,
                "vds-seeking": this._handleSeeking,
                "vds-seeked": this._handleSeeked,
                "vds-waiting": this._handleWaiting,
                "vds-ended": this._handleEnded,
                "vds-autoplay-change": this._handleAutoplayChange,
                "vds-error": this._handleError,
                "vds-fullscreen-support-change": this._handleFullscreenSupportChange,
                "vds-poster-change": this._handlePosterChange,
                "vds-loop-change": this._handleLoopChange,
                "vds-playsinline-change": this._handlePlaysinlineChange,
                "vds-controls-change": this._handleControlsChange,
                "vds-media-type-change": this._handleMediaTypeChange,
                "vds-view-type-change": this._handleViewTypeChange,
                "vds-duration-change": this._handleDurationChange,
                "vds-progress": this._handleProgress,
                "vds-src-change": this._handleSrcChange
            };
            for (const e of Pi(t)) {
                const i = t[e].bind(this);
                this.providerDisposal.add(Ht(this._provider, e, i))
            }
        }
        _clearMediaStateTracking() {
            this._isReplay = !1, this._isLooping = !1, this._firingWaiting = !1, this._originalWaitingEvent = void 0, this._mediaEvents = []
        }
        _findLastMediaEvent(t) {
            return this._mediaEvents[this._mediaEvents.map(e => e.type).lastIndexOf(t)]
        }
        _handleCanLoad(t) {
            this._store.canLoad.set(!0), this._mediaEvents.push(t), this._satisfyMediaRequest("loading", t)
        }
        _updateMetadata(t) {
            this._store.currentSrc.set(t.currentSrc), this._store.mediaType.set(t.mediaType), this._store.viewType.set(t.viewType)
        }
        _handleLoadStart(t) {
            this._updateMetadata(t.detail), this._mediaEvents.push(t), Xe(t, this._findLastMediaEvent("vds-src-change")), Xe(t, this._findLastMediaEvent("vds-can-load"))
        }
        _handleLoadedData(t) {
            this._mediaEvents.push(t), Xe(t, this._findLastMediaEvent("vds-load-start"))
        }
        _handleLoadedMetadata(t) {
            this._updateMetadata(t.detail), this._mediaEvents.push(t), Xe(t, this._findLastMediaEvent("vds-load-start"))
        }
        _handleCanPlay(t) {
            var e;
            this._mediaEvents.push(t), ((e = t.triggerEvent) == null ? void 0 : e.type) !== "loadedmetadata" && Xe(t, this._findLastMediaEvent("vds-loaded-metadata")), this._store.canPlay.set(!0), this._store.duration.set(t.detail.duration), this._host.setAttribute("aria-busy", "false")
        }
        _handleCanPlayThrough(t) {
            this._store.canPlay.set(!0), this._store.duration.set(t.detail.duration), Xe(t, this._findLastMediaEvent("vds-can-play"))
        }
        _handleAutoplay(t) {
            this._mediaEvents.push(t), Xe(t, this._findLastMediaEvent("vds-play")), Xe(t, this._findLastMediaEvent("vds-can-play")), this._store.autoplayError.set(void 0)
        }
        _handleAutoplayFail(t) {
            Xe(t, this._findLastMediaEvent("vds-play-fail")), Xe(t, this._findLastMediaEvent("vds-can-play")), this._store.autoplayError.set(t.detail), this._clearMediaStateTracking()
        }
        _handlePlay(t) {
            var e;
            if (this._isLooping || !this.state.paused) {
                t.stopImmediatePropagation();
                return
            }
            if (this._mediaEvents.push(t), Xe(t, this._findLastMediaEvent("vds-waiting")), this._satisfyMediaRequest("play", t), this._store.paused.set(!1), this._store.autoplayError.set(void 0), this.state.ended || this._isReplay) {
                this._isReplay = !1, this._store.ended.set(!1);
                const i = ie("vds-replay", {
                    triggerEvent: t
                });
                (e = this._provider) == null || e.dispatchEvent(i)
            }
        }
        _handlePlayFail(t) {
            this._mediaEvents.push(t), this._stopWaiting(), Xe(t, this._findLastMediaEvent("vds-play")), this._store.paused.set(!0), this._store.playing.set(!1), this._satisfyMediaRequest("play", t), this._clearMediaStateTracking()
        }
        _handlePlaying(t) {
            var i;
            this._mediaEvents.push(t);
            const e = this._findLastMediaEvent("vds-play");
            if (e ? (Xe(t, this._findLastMediaEvent("vds-waiting")), Xe(t, e)) : Xe(t, this._findLastMediaEvent("vds-seeked")), this._stopWaiting(), this._clearMediaStateTracking(), this._store.paused.set(!1), this._store.playing.set(!0), this._store.seeking.set(!1), this._store.ended.set(!1), this._isLooping) {
                t.stopImmediatePropagation(), this._isLooping = !1;
                return
            }
            this.state.started || (this._store.started.set(!0), (i = this._provider) == null || i.dispatchEvent(ie("vds-started", {
                triggerEvent: t
            })))
        }
        _handlePause(t) {
            if (this._isLooping) {
                t.stopImmediatePropagation();
                return
            }
            Xe(t, this._findLastMediaEvent("vds-seeked")), this._satisfyMediaRequest("pause", t), this._store.paused.set(!0), this._store.playing.set(!1), this._store.seeking.set(!1), this._stopWaiting(), this._clearMediaStateTracking()
        }
        _handleTimeUpdate(t) {
            const {
                currentTime: e,
                played: i
            } = t.detail;
            this._store.currentTime.set(e), this._store.played.set(i), this._store.waiting.set(!1)
        }
        _handleVolumeChange(t) {
            this._store.volume.set(t.detail.volume), this._store.muted.set(t.detail.muted || t.detail.volume === 0), this._satisfyMediaRequest("volume", t)
        }
        _handleSeeked(t) {
            this._isSeekingRequestPending ? (this._store.seeking.set(!0), t.stopImmediatePropagation()) : this.state.seeking && (this._mediaEvents.push(t), Xe(t, this._findLastMediaEvent("vds-waiting")), Xe(t, this._findLastMediaEvent("vds-seeking")), this.state.paused && this._stopWaiting(), this._store.seeking.set(!1), t.detail !== this.state.duration && this._store.ended.set(!1), this._store.currentTime.set(t.detail), this._satisfyMediaRequest("seeked", t))
        }
        _stopWaiting() {
            this._fireWaiting.cancel(), this._store.waiting.set(!1)
        }
        _handleWaiting(t) {
            this._firingWaiting || (t.stopImmediatePropagation(), this._originalWaitingEvent = t, this._fireWaiting())
        }
        _handleEnded(t) {
            if (this._isLooping) {
                t.stopImmediatePropagation();
                return
            }
            this._stopWaiting(), this._store.paused.set(!0), this._store.playing.set(!1), this._store.seeking.set(!1), this._store.ended.set(!0), this._clearMediaStateTracking()
        }
        _handleAutoplayChange(t) {
            this._store.autoplay.set(t.detail)
        }
        _handleCurrentSrcChange(t) {
            if (this._store.currentSrc.set(t.detail), this._skipInitialSrcChange) {
                this._skipInitialSrcChange = !1;
                return
            }
            this._clearMediaStateTracking(), hf(this._store), this._host.setAttribute("aria-busy", "true")
        }
        _handleError(t) {
            this._store.error.set(t.detail)
        }
        _handleFullscreenSupportChange(t) {
            this._store.canFullscreen.set(t.detail)
        }
        _handlePosterChange(t) {
            this._store.poster.set(t.detail)
        }
        _handleLoopChange(t) {
            this._store.loop.set(t.detail)
        }
        _handlePlaysinlineChange(t) {
            this._store.playsinline.set(t.detail)
        }
        _handleControlsChange(t) {
            this._store.controls.set(t.detail)
        }
        _handleMediaTypeChange(t) {
            this._store.mediaType.set(t.detail)
        }
        _handleDurationChange(t) {
            const e = t.detail;
            this._store.duration.set(isNaN(e) ? 0 : e)
        }
        _handleProgress(t) {
            const {
                buffered: e,
                seekable: i
            } = t.detail, n = e.length === 0 ? 0 : e.end(e.length - 1), r = i.length === 0 ? 0 : i.end(i.length - 1);
            this._store.buffered.set(e), this._store.bufferedAmount.set(n), this._store.seekable.set(i), this._store.seekableAmount.set(r)
        }
        _handleSrcChange(t) {
            this._store.src.set(t.detail)
        }
        _handleViewTypeChange(t) {
            this._store.viewType.set(t.detail)
        }
    },
    Ll = class {
        constructor(t, e, i) {
            this._host = t, this._store = e, this._mediaProps = i, this._disposal = new Mt, this._host.addController({
                hostConnected: this._hostConnected.bind(this),
                hostDisconnected: this._hostDisconnected.bind(this)
            })
        }
        _hostConnected() {
            $l(() => {
                for (const t of this._mediaProps) {
                    const e = this._store[t];
                    if (e) {
                        const i = this._getMediaAttrName(t),
                            n = e.subscribe(r => {
                                window == null || window.requestAnimationFrame(() => {
                                    this._handleValueChange(t, i, r)
                                })
                            });
                        this._disposal.add(n)
                    }
                }
            })
        }
        _hostDisconnected() {
            for (const t of this._mediaProps) this._handleDisconnect(t, this._getMediaAttrName(t));
            this._disposal.empty()
        }
        _getMediaAttrName(t) {
            return af(t)
        }
    },
    Cf = class extends Ll {
        _handleValueChange(t, e, i) {
            window.requestAnimationFrame(() => {
                fa(this._host, e, kr(i) || Or(i) ? String(i) : !!i)
            })
        }
        _handleDisconnect(t, e) {
            this._host.removeAttribute(e)
        }
    };

function Sf(...t) {
    return new Cf(...t)
}
var Tf = class extends Ll {
    _handleValueChange(t, e, i) {
        window.requestAnimationFrame(() => {
            this._host.style.setProperty(this._getCssPropName(e), kr(i) || Or(i) ? String(i) : null)
        })
    }
    _getCssPropName(t) {
        return `--vds-${t}`
    }
    _handleDisconnect(t, e) {
        this._host.style.setProperty(this._getCssPropName(e), null)
    }
};

function Mf(...t) {
    return new Tf(...t)
}
var $f = Symbol("@vidstack/media-discovery"),
    Nn = class extends ri {
        constructor() {
            super(), this.controller = new xf(this), this.__mediaFullscreen = !1, this.__mediaIsVideoView = !1, this.__mediaPlaysinline = !1, this.screenOrientationController = new Sl(this), this.fullscreenController = new ua(this, this.screenOrientationController), xl(this, "vds-media-connect", {
                register: $f
            }), xn(this, "fullscreen", t => {
                this.__mediaFullscreen = t
            }), xn(this, "viewType", t => {
                this.__mediaIsVideoView = t === "video"
            }), xn(this, "playsinline", t => {
                this.__mediaPlaysinline = t
            }), this._bindMediaAttributes(), this._bindMediaCSSProperties()
        }
        static get styles() {
            return [Ir `:host{display:inline-block;position:relative;contain:content}:host([hidden]){display:none}`]
        }
        get provider() {
            return this.controller.provider
        }
        update(t) {
            fa(this, "hide-ui", this._shouldHideMediaUI()), super.update(t)
        }
        render() {
            return Ar `<slot></slot>`
        }
        get canFullscreen() {
            return this.fullscreenController.isSupported
        }
        get fullscreen() {
            return this.fullscreenController.isFullscreen
        }
        get fullscreenOrientation() {
            return this.fullscreenController.screenOrientationLock
        }
        set fullscreenOrientation(t) {
            const e = this.fullscreenController.screenOrientationLock;
            e !== t && (this.fullscreenController.screenOrientationLock = t, this.requestUpdate("fullscreen-orientation", e))
        }
        enterFullscreen() {
            return this.fullscreenController.enterFullscreen()
        }
        exitFullscreen() {
            return this.fullscreenController.exitFullscreen()
        }
        _bindMediaAttributes() {
            Sf(this, this.controller.store, ["autoplay", "autoplayError", "canLoad", "canPlay", "canFullscreen", "ended", "error", "fullscreen", "userIdle", "loop", "mediaType", "muted", "paused", "playing", "playsinline", "seeking", "started", "viewType", "waiting"])
        }
        _bindMediaCSSProperties() {
            Mf(this, this.controller.store, ["bufferedAmount", "currentTime", "duration", "seekableAmount"])
        }
        _shouldHideMediaUI() {
            return Wu && this.__mediaIsVideoView && (!this.__mediaPlaysinline || this.__mediaFullscreen)
        }
    };
He([en()], Nn.prototype, "__mediaFullscreen", 2);
He([en()], Nn.prototype, "__mediaIsVideoView", 2);
He([en()], Nn.prototype, "__mediaPlaysinline", 2);
He([Qe({
    attribute: "fullscreen-orientation"
})], Nn.prototype, "fullscreenOrientation", 1);
Lr("vds-media", Nn);
var Af = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i,
    Pf = /\.(mp4|og[gv]|webm|mov|m4v|avi)($|\?)/i;

function Of(t) {
    return Af.test(t) ? "audio" : Pf.test(t) ? "video" : "unknown"
}
var Il = class extends ft {
    constructor() {
        super(...arguments), this.preload = "metadata", this._timeRAF = void 0, this._hasMediaElementConnected = !1, this._mediaElementDisposal = new Mt, this._isMediaWaiting = !1, this._ignoreNextAbortEvent = !1, this._ignoreNextEmptiedEvent = !1
    }
    get mediaElement() {
        return this._mediaElement
    }
    disconnectedCallback() {
        this._isMediaWaiting = !1, super.disconnectedCallback(), this._cancelTimeUpdates()
    }
    destroy() {
        this.mediaElement && (this.mediaElement.pause(), this.mediaElement.src = "", this.mediaElement.innerHTML = "", this.mediaElement.load()), super.destroy()
    }
    _cancelTimeUpdates() {
        Or(this._timeRAF) && window.cancelAnimationFrame(this._timeRAF), this._timeRAF = void 0
    }
    _requestTimeUpdates() {
        Et(this._timeRAF) && this._requestTimeUpdate()
    }
    _requestTimeUpdate() {
        var e;
        const t = ((e = this.mediaElement) == null ? void 0 : e.currentTime) ? ? 0;
        this.state.currentTime !== t && this._updateCurrentTime(t), this._timeRAF = window.requestAnimationFrame(() => {
            Et(this._timeRAF) || this._requestTimeUpdate()
        })
    }
    _updateCurrentTime(t, e) {
        var i;
        this.dispatchEvent(ie("vds-time-update", {
            detail: {
                currentTime: Math.min(t, ((i = this.mediaElement) == null ? void 0 : i.duration) ? ? 0),
                played: this.mediaElement.played
            },
            triggerEvent: e
        }))
    }
    handleDefaultSlotChange() {
        this._handleMediaElementDisconnect(), this._handleMediaElementConnect()
    }
    get _canMediaElementConnect() {
        return this.canLoad && !Ci(this.mediaElement) && !this._hasMediaElementConnected
    }
    _findSlottedMediaElement() {
        const t = rf(this)[0];
        t == null || t.tagName, this._mediaElement = t ? ? void 0
    }
    _handleMediaElementConnect() {
        window.requestAnimationFrame(() => {
            if (this._findSlottedMediaElement(), !this._canMediaElementConnect) return;
            const t = this.mediaElement;
            t.hasAttribute("loop") && (this.loop = !0), t.removeAttribute("loop"), t.removeAttribute("poster"), fa(t, "controls", this.controls), !this.state.canFullscreen && this.fullscreenController.isSupported && this.dispatchEvent(ie("vds-fullscreen-support-change", {
                detail: this.canFullscreen
            })), this._attachMediaEventListeners(), this._observePlaysinline(), this._observeMediaSources(), this.canLoadPoster && this.poster.length > 0 && t.getAttribute("poster") !== this.poster && t.setAttribute("poster", this.poster), this._startPreloadingMedia(), this._hasMediaElementConnected = !0, this._disconnectDisposal.add(this._handleMediaElementDisconnect.bind(this))
        })
    }
    _handleMediaElementDisconnect() {
        this._cancelTimeUpdates(), window.requestAnimationFrame(() => {
            this._mediaElementDisposal.empty(), this._mediaElement = void 0
        }), this._hasMediaElementConnected, this._hasMediaElementConnected = !1
    }
    startLoadingMedia() {
        super.startLoadingMedia(), this._handleMediaElementConnect()
    }
    _startPreloadingMedia() {
        if (this.state.canPlay) return;
        this.mediaElement.setAttribute("preload", this.preload);
        const t = this.mediaElement.networkState >= 1;
        this._ignoreNextAbortEvent = t, this._ignoreNextEmptiedEvent = t, this.mediaElement.load(), setTimeout(() => {
            this._ignoreNextAbortEvent = !1, this._ignoreNextEmptiedEvent = !1
        }, 0)
    }
    _observePlaysinline() {
        const t = () => this.mediaElement.hasAttribute("playsinline");
        this._handlePlaysinlineChange(t());
        const e = new MutationObserver(() => this._handlePlaysinlineChange(t()));
        e.observe(this.mediaElement, {
            attributeFilter: ["playsinline"]
        }), this._mediaElementDisposal.add(() => e.disconnect())
    }
    _handlePlaysinlineChange(t) {
        this.dispatchEvent(ie("vds-playsinline-change", {
            detail: t
        }))
    }
    _observeMediaSources() {
        this._handleSrcChange(this._getMediaSources());
        const t = new MutationObserver(() => this._handleSrcChange(this._getMediaSources()));
        t.observe(this.mediaElement, {
            attributeFilter: ["src"],
            subtree: !0
        }), this._mediaElementDisposal.add(() => t.disconnect())
    }
    _handleSrcChange(t) {
        const e = this.state.src;
        nf(e, t) || this.dispatchEvent(ie("vds-src-change", {
            detail: t
        }))
    }
    _getMediaSources() {
        var e, i;
        const t = [(e = this.mediaElement) == null ? void 0 : e.src, ...Array.from(((i = this.mediaElement) == null ? void 0 : i.querySelectorAll("source")) ? ? []).map(n => n.src)].filter(Boolean);
        return Array.from(new Set(t))
    }
    _getMediaMetadata() {
        return {
            src: this.state.src,
            currentSrc: this.mediaElement.currentSrc,
            duration: this.mediaElement.duration || 0,
            poster: this.mediaElement.poster,
            mediaType: this._getMediaType(),
            viewType: this.state.viewType
        }
    }
    _attachMediaEventListeners() {
        if (Ci(this.mediaElement)) return;
        const t = {
            abort: this._handleAbort,
            canplay: this._handleCanPlay,
            canplaythrough: this._handleCanPlayThrough,
            durationchange: this._handleDurationChange,
            emptied: this._handleEmptied,
            ended: this._handleEnded,
            error: this._handleError,
            loadeddata: this._handleLoadedData,
            loadedmetadata: this._handleLoadedMetadata,
            loadstart: this._handleLoadStart,
            pause: this._handlePause,
            play: this._handlePlay,
            playing: this._handlePlaying,
            progress: this._handleProgress,
            ratechange: this._handleRateChange,
            seeked: this._handleSeeked,
            seeking: this._handleSeeking,
            stalled: this._handleStalled,
            suspend: this._handleSuspend,
            volumechange: this._handleVolumeChange,
            waiting: this._handleWaiting
        };
        Pi(t).forEach(e => {
            const i = t[e].bind(this),
                n = Ht(this.mediaElement, e, async r => {
                    await i(r)
                });
            this._mediaElementDisposal.add(n)
        })
    }
    _handleAbort(t) {
        this._ignoreNextAbortEvent || (this.dispatchEvent(ie("vds-abort", {
            triggerEvent: t
        })), this._handleCurrentSrcChange("", t))
    }
    _handleCanPlay(t) {
        this._handleMediaReady({
            event: t,
            duration: this.mediaElement.duration
        })
    }
    _handleCanPlayThrough(t) {
        this.state.started || this.dispatchEvent(ie("vds-can-play-through", {
            triggerEvent: t,
            detail: {
                duration: this.mediaElement.duration
            }
        }))
    }
    _handleLoadStart(t) {
        if (this._handleCurrentSrcChange(this.mediaElement.currentSrc, t), this.mediaElement.currentSrc === "") {
            this._handleAbort();
            return
        }
        this.dispatchEvent(ie("vds-load-start", {
            triggerEvent: t,
            detail: this._getMediaMetadata()
        }))
    }
    _handleEmptied(t) {
        this._ignoreNextEmptiedEvent || this.dispatchEvent(ie("vds-emptied", {
            triggerEvent: t
        }))
    }
    _handleLoadedData(t) {
        this.dispatchEvent(ie("vds-loaded-data", {
            triggerEvent: t
        }))
    }
    _handleLoadedMetadata(t) {
        this.dispatchEvent(ie("vds-volume-change", {
            detail: {
                volume: this.mediaElement.volume,
                muted: this.mediaElement.muted
            }
        })), this.dispatchEvent(ie("vds-loaded-metadata", {
            triggerEvent: t,
            detail: this._getMediaMetadata()
        }))
    }
    _determineMediaType(t) {
        this.dispatchEvent(ie("vds-media-type-change", {
            detail: this._getMediaType(),
            triggerEvent: t
        }))
    }
    _handlePlay(t) {
        const e = ie("vds-play", {
            triggerEvent: t
        });
        e.autoplay = this._attemptingAutoplay, this.dispatchEvent(e)
    }
    _handlePause(t) {
        this.mediaElement.readyState === 1 && !this._isMediaWaiting || (this._isMediaWaiting = !1, this._cancelTimeUpdates(), this.dispatchEvent(ie("vds-pause", {
            triggerEvent: t
        })))
    }
    _handlePlaying(t) {
        this._isMediaWaiting = !1;
        const e = ie("vds-playing", {
            triggerEvent: t
        });
        this.dispatchEvent(e), this._requestTimeUpdates()
    }
    _handleDurationChange(t) {
        this.mediaElement.ended && this._updateCurrentTime(this.mediaElement.duration, t), this.dispatchEvent(ie("vds-duration-change", {
            detail: this.mediaElement.duration,
            triggerEvent: t
        }))
    }
    _handleProgress(t) {
        this.dispatchEvent(ie("vds-progress", {
            triggerEvent: t,
            detail: {
                buffered: this.mediaElement.buffered,
                seekable: this.mediaElement.seekable
            }
        }))
    }
    _handleRateChange(t) {
        throw Error("Not implemented")
    }
    _handleSeeking(t) {
        this.dispatchEvent(ie("vds-seeking", {
            detail: this.mediaElement.currentTime,
            triggerEvent: t
        }))
    }
    _handleSeeked(t) {
        const e = ie("vds-seeked", {
            detail: this.mediaElement.currentTime,
            triggerEvent: t
        });
        this.dispatchEvent(e);
        const i = this.mediaElement.currentTime;
        if (Math.trunc(i) === Math.trunc(this.mediaElement.duration) && ao(this.mediaElement.duration) > ao(i) && (this._updateCurrentTime(this.mediaElement.duration, t), !this.mediaElement.ended)) try {
            this.play()
        } catch {}
    }
    _handleStalled(t) {
        this.dispatchEvent(ie("vds-stalled", {
            triggerEvent: t
        })), this.mediaElement.readyState < 3 && (this._isMediaWaiting = !0, this.dispatchEvent(ie("vds-waiting", {
            triggerEvent: t
        })))
    }
    _handleVolumeChange(t) {
        this.dispatchEvent(ie("vds-volume-change", {
            detail: {
                volume: this.mediaElement.volume,
                muted: this.mediaElement.muted
            },
            triggerEvent: t
        }))
    }
    _handleWaiting(t) {
        this.mediaElement.readyState < 3 && (this._isMediaWaiting = !0, this.dispatchEvent(ie("vds-waiting", {
            triggerEvent: t
        })))
    }
    _handleSuspend(t) {
        const e = ie("vds-suspend", {
            triggerEvent: t
        });
        this.dispatchEvent(e)
    }
    _handleEnded(t) {
        this._cancelTimeUpdates(), this._updateCurrentTime(this.mediaElement.duration, t);
        const e = ie("vds-end", {
            triggerEvent: t
        });
        this.dispatchEvent(e), this.state.loop ? this._handleLoop() : this.dispatchEvent(ie("vds-ended", {
            triggerEvent: t
        }))
    }
    _handleLoop() {
        Ci(this.controls) && (this.mediaElement.controls = !1), this.dispatchEvent(ie("vds-loop-request"))
    }
    _handleError(t) {
        const e = this.mediaElement.error;
        e && this.dispatchEvent(ie("vds-error", {
            detail: {
                message: e.message,
                code: e.code,
                mediaError: e
            },
            triggerEvent: t
        }))
    }
    _getPaused() {
        var t;
        return ((t = this.mediaElement) == null ? void 0 : t.paused) ? ? !0
    }
    _getVolume() {
        var t;
        return ((t = this.mediaElement) == null ? void 0 : t.volume) ? ? 1
    }
    _setVolume(t) {
        this.mediaElement.volume = t
    }
    _getCurrentTime() {
        var t;
        return ((t = this.mediaElement) == null ? void 0 : t.currentTime) ? ? 0
    }
    _setCurrentTime(t) {
        this.mediaElement.currentTime !== t && (this.mediaElement.currentTime = t)
    }
    _getMuted() {
        var t;
        return ((t = this.mediaElement) == null ? void 0 : t.muted) ? ? !1
    }
    _setMuted(t) {
        this.mediaElement.muted = t
    }
    async play() {
        var t;
        try {
            return this._throwIfNotReadyForPlayback(), await this._resetPlaybackIfEnded(), (t = this.mediaElement) == null ? void 0 : t.play()
        } catch (e) {
            const i = ie("vds-play-fail");
            throw i.autoplay = this._attemptingAutoplay, i.error = e, e
        }
    }
    async pause() {
        var t;
        return (t = this.mediaElement) == null ? void 0 : t.pause()
    }
    _getMediaType() {
        return Of(this.state.currentSrc)
    }
};
He([Qe()], Il.prototype, "preload", 2);
var kf = class extends ua {
        constructor(t, e, i) {
            super(t, e), this._presentationController = i
        }
        get isFullscreen() {
            return this.isSupportedNatively ? this.isNativeFullscreen : this._presentationController.isFullscreenMode
        }
        get isSupported() {
            return this.isSupportedNatively || this.isSupportedOnSafari
        }
        get isSupportedOnSafari() {
            return this._presentationController.isSupported
        }
        async _makeEnterFullscreenRequest() {
            return this.isSupportedNatively ? super._makeEnterFullscreenRequest() : this._makeFullscreenRequestOnSafari()
        }
        async _makeFullscreenRequestOnSafari() {
            return this._presentationController.setPresentationMode("fullscreen")
        }
        async _makeExitFullscreenRequest() {
            return this.isSupportedNatively ? super._makeExitFullscreenRequest() : this._makeExitFullscreenRequestOnSafari()
        }
        async _makeExitFullscreenRequestOnSafari() {
            return this._presentationController.setPresentationMode("inline")
        }
        _addFullscreenChangeEventListener(t) {
            return this.isSupportedNatively ? super._addFullscreenChangeEventListener(t) : this.isSupportedOnSafari ? Ht(this._host, "vds-video-presentation-change", this._handlePresentationModeChange.bind(this)) : It
        }
        _handlePresentationModeChange(t) {
            this._handleFullscreenChange(t)
        }
        _addFullscreenErrorEventListener(t) {
            return this.isSupportedNatively ? super._addFullscreenErrorEventListener(t) : It
        }
    },
    Lf = class {
        constructor(t) {
            this._host = t, this._logger = void 0, this._listenerDisposal = new Mt;
            const e = t.firstUpdated;
            t.firstUpdated = i => {
                e == null || e.call(t, i), this._listenerDisposal.add(this._addPresentationModeChangeEventListener())
            }, t.addController({
                hostDisconnected: this._handleHostDisconnected.bind(this)
            })
        }
        _handleHostDisconnected() {
            this.setPresentationMode("inline"), this._listenerDisposal.empty()
        }
        get presentationMode() {
            var t;
            return (t = this._host.videoElement) == null ? void 0 : t.webkitPresentationMode
        }
        get isInlineMode() {
            return this.presentationMode === "inline"
        }
        get isPictureInPictureMode() {
            return this.presentationMode === "inline"
        }
        get isFullscreenMode() {
            return this.presentationMode === "fullscreen"
        }
        get isSupported() {
            var t;
            return zs((t = this._host.videoElement) == null ? void 0 : t.webkitSetPresentationMode)
        }
        setPresentationMode(t) {
            var e, i;
            (i = (e = this._host.videoElement) == null ? void 0 : e.webkitSetPresentationMode) == null || i.call(e, t)
        }
        _addPresentationModeChangeEventListener() {
            return !this.isSupported || Ci(this._host.videoElement) ? It : Ht(this._host.videoElement, "webkitpresentationmodechanged", this._handlePresentationModeChange.bind(this))
        }
        _handlePresentationModeChange(t) {
            Ru(this._host, t), this._host.dispatchEvent(ie("vds-video-presentation-change", {
                detail: this.presentationMode,
                triggerEvent: t
            }))
        }
    },
    If = class extends Il {
        constructor() {
            super(...arguments), this.presentationController = new Lf(this), this.fullscreenController = new kf(this, this.screenOrientationController, this.presentationController)
        }
        static get styles() {
            return [Ir `:host{display:inline-block;background-color:var(--vds-video-bg-color,#000)}:host([hidden]){display:none}::slotted(video:not([width])){width:var(--vds-video-width,100%)}::slotted(video:not([height])){height:var(--vds-video-height,auto)}`]
        }
        connectedCallback() {
            super.connectedCallback(), this.dispatchEvent(ie("vds-view-type-change", {
                detail: "video"
            }))
        }
        get videoElement() {
            return this.mediaElement
        }
    };
Lr("vds-video", If);
const Df = {
        ATTRIBUTE: 1,
        CHILD: 2,
        PROPERTY: 3,
        BOOLEAN_ATTRIBUTE: 4,
        EVENT: 5,
        ELEMENT: 6
    },
    Rf = t => (...e) => ({
        _$litDirective$: t,
        values: e
    });
let Hf = class {
    constructor(e) {}
    get _$AU() {
        return this._$AM._$AU
    }
    _$AT(e, i, n) {
        this._$Ct = e, this._$AM = i, this._$Ci = n
    }
    _$AS(e, i) {
        return this.update(e, i)
    }
    update(e, i) {
        return this.render(...i)
    }
};
const zf = Rf(class extends Hf {
    constructor(t) {
        var e;
        if (super(t), t.type !== Df.ATTRIBUTE || t.name !== "style" || ((e = t.strings) === null || e === void 0 ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")
    }
    render(t) {
        return Object.keys(t).reduce((e, i) => {
            const n = t[i];
            return n == null ? e : e + `${i=i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`
        }, "")
    }
    update(t, [e]) {
        const {
            style: i
        } = t.element;
        if (this.vt === void 0) {
            this.vt = new Set;
            for (const n in e) this.vt.add(n);
            return this.render(e)
        }
        this.vt.forEach(n => {
            e[n] == null && (this.vt.delete(n), n.includes("-") ? i.removeProperty(n) : i[n] = "")
        });
        for (const n in e) {
            const r = e[n];
            r != null && (this.vt.add(n), n.includes("-") ? i.setProperty(n, r) : i[n] = r)
        }
        return Ai
    }
});
var Nf = Ir `:host{display:block}:host([hidden]){display:none}.container{position:relative;width:100%;height:0;padding-bottom:min(max(var(--vds-aspect-ratio-min-height),var(--vds-aspect-ratio-percent)),var(--vds-aspect-ratio-max-height))}slot{display:block;position:absolute;top:0;left:0;width:100%;height:100%}::slotted(*){--vds-video-width:100%;--vds-video-height:100%;width:100%;height:100%}`,
    Dr = class extends ri {
        constructor() {
            super(...arguments), this.minHeight = "150px", this.maxHeight = "100vh", this.ratio = "2/1"
        }
        static get styles() {
            return [Nf]
        }
        get isValidRatio() {
            return kr(this.ratio) ? /\d{1,2}\s*?(?:\/|:)\s*?\d{1,2}/.test(this.ratio) : !1
        }
        render() {
            return Ar `<div class="container" style="${zf({"--vds-aspect-ratio-percent":this._getAspectRatioPercent(),"--vds-aspect-ratio-min-height":this.minHeight??"150px","--vds-aspect-ratio-max-height":this.maxHeight??"100vh"})}"><slot></slot></div>`
        }
        _getAspectRatioPercent() {
            if (this.isValidRatio) {
                const [t, e] = this._parseAspectRatio();
                return `${e/t*100}%`
            }
            return "50%"
        }
        _parseAspectRatio() {
            return this.ratio.split(/\s*?(?:\/|:)\s*?/).map(Number)
        }
    };
He([Qe({
    attribute: "min-height"
})], Dr.prototype, "minHeight", 2);
He([Qe({
    attribute: "max-height"
})], Dr.prototype, "maxHeight", 2);
He([Qe()], Dr.prototype, "ratio", 2);
Lr("vds-aspect-ratio", Dr);
var Ff = class {
        constructor(t) {
            t ? (this._target = t, this._createLogger(t), this._requests = Cl(t)) : this._requests = new kn
        }
        startLoading(t) {
            this._dispatchRequest("vds-start-loading", {
                triggerEvent: t
            })
        }
        play(t) {
            this._dispatchRequest("vds-play-request", {
                triggerEvent: t
            })
        }
        pause(t) {
            this._dispatchRequest("vds-pause-request", {
                triggerEvent: t
            })
        }
        mute(t) {
            this._dispatchRequest("vds-mute-request", {
                triggerEvent: t
            })
        }
        unmute(t) {
            this._dispatchRequest("vds-unmute-request", {
                triggerEvent: t
            })
        }
        enterFullscreen(t, e) {
            this._dispatchRequest("vds-enter-fullscreen-request", {
                triggerEvent: e,
                detail: t
            })
        }
        exitFullscreen(t, e) {
            this._dispatchRequest("vds-exit-fullscreen-request", {
                triggerEvent: e,
                detail: t
            })
        }
        seeking(t, e) {
            this._dispatchRequest("vds-seeking-request", {
                detail: t,
                triggerEvent: e
            })
        }
        seek(t, e) {
            this._dispatchRequest("vds-seek-request", {
                detail: t,
                triggerEvent: e
            })
        }
        changeVolume(t, e) {
            this._dispatchRequest("vds-volume-change-request", {
                detail: t,
                triggerEvent: e
            })
        }
        resumeUserIdle(t) {
            this._dispatchRequest("vds-resume-user-idle-request", {
                triggerEvent: t
            })
        }
        pauseUserIdle(t) {
            this._dispatchRequest("vds-pause-user-idle-request", {
                triggerEvent: t
            })
        }
        showPoster(t) {
            this._dispatchRequest("vds-show-poster-request", {
                triggerEvent: t
            })
        }
        hidePoster(t) {
            this._dispatchRequest("vds-hide-poster-request", {
                triggerEvent: t
            })
        }
        setTarget(t) {
            this._target !== t && (this._target = t, t ? (this._createLogger(t), this._requests.start()) : this._requests.stop())
        }
        _dispatchRequest(t, e) {
            this._requests.queue(t, () => {
                var n;
                const i = ie(t, { ...e,
                    bubbles: !0,
                    composed: !0
                });
                (n = this._target) == null || n.dispatchEvent(i)
            })
        }
        _createLogger(t) {}
    },
    go = new Set,
    Rr = class extends ri {
        constructor() {
            super(), this.__canLoad = !1, this._mediaRemoteControl = new Ff(this), xn(this, "poster", t => {
                window.requestAnimationFrame(() => {
                    !this.__canLoad && !go.has(t) && (sf(t, "prefetch"), go.add(t))
                }), this.__src = t
            }), xn(this, "canLoad", t => {
                this._handleCanLoadChange(t), this.__canLoad = t
            })
        }
        static get styles() {
            return [Ir `:host{display:block;contain:content;pointer-events:none;object-fit:cover;box-sizing:border-box}:host([hidden]){display:none}img{display:block;width:100%;height:100%;pointer-events:none;object-fit:inherit;object-position:inherit;user-select:none;-webkit-user-select:none;box-sizing:border-box}`]
        }
        get src() {
            return this.__src
        }
        connectedCallback() {
            super.connectedCallback(), this._mediaRemoteControl.hidePoster()
        }
        disconnectedCallback() {
            this._mediaRemoteControl.showPoster(), super.disconnectedCallback(), this._handleCanLoadChange(!1)
        }
        render() {
            return Ar `<img part="img" src="${io(this.__canLoad?this.src:null)}" alt="${io(this.alt)}" @load="${this._handleImgLoad}" @error="${this._handleImgError}">`
        }
        _setImgLoadingAttr() {
            this.removeAttribute("img-error"), this.removeAttribute("img-loaded"), this.src && this.src.length > 0 && this.setAttribute("img-loading", "")
        }
        _handleImgLoad() {
            this.removeAttribute("img-loading"), this.setAttribute("img-loaded", "")
        }
        _handleImgError() {
            this.removeAttribute("img-loading"), this.setAttribute("img-error", "")
        }
        _handleCanLoadChange(t) {
            t ? this._setImgLoadingAttr() : (this.removeAttribute("img-error"), this.removeAttribute("img-loaded"), this.removeAttribute("img-loading"))
        }
    };
He([en()], Rr.prototype, "__src", 2);
He([en()], Rr.prototype, "__canLoad", 2);
He([Qe()], Rr.prototype, "alt", 2);
Lr("vds-poster", Rr);
var js = !1,
    Bs = !1,
    Si = [];

function qf(t) {
    Vf(t)
}

function Vf(t) {
    Si.includes(t) || Si.push(t), jf()
}

function Dl(t) {
    let e = Si.indexOf(t);
    e !== -1 && Si.splice(e, 1)
}

function jf() {
    !Bs && !js && (js = !0, queueMicrotask(Bf))
}

function Bf() {
    js = !1, Bs = !0;
    for (let t = 0; t < Si.length; t++) Si[t]();
    Si.length = 0, Bs = !1
}
var tn, nn, Fn, Rl, Zs = !0;

function Zf(t) {
    Zs = !1, t(), Zs = !0
}

function Wf(t) {
    tn = t.reactive, Fn = t.release, nn = e => t.effect(e, {
        scheduler: i => {
            Zs ? qf(i) : i()
        }
    }), Rl = t.raw
}

function vo(t) {
    nn = t
}

function Uf(t) {
    let e = () => {};
    return [n => {
        let r = nn(n);
        return t._x_effects || (t._x_effects = new Set, t._x_runEffects = () => {
            t._x_effects.forEach(s => s())
        }), t._x_effects.add(r), e = () => {
            r !== void 0 && (t._x_effects.delete(r), Fn(r))
        }, r
    }, () => {
        e()
    }]
}
var Hl = [],
    zl = [],
    Nl = [];

function Gf(t) {
    Nl.push(t)
}

function Fl(t, e) {
    typeof e == "function" ? (t._x_cleanups || (t._x_cleanups = []), t._x_cleanups.push(e)) : (e = t, zl.push(e))
}

function Yf(t) {
    Hl.push(t)
}

function Xf(t, e, i) {
    t._x_attributeCleanups || (t._x_attributeCleanups = {}), t._x_attributeCleanups[e] || (t._x_attributeCleanups[e] = []), t._x_attributeCleanups[e].push(i)
}

function ql(t, e) {
    t._x_attributeCleanups && Object.entries(t._x_attributeCleanups).forEach(([i, n]) => {
        (e === void 0 || e.includes(i)) && (n.forEach(r => r()), delete t._x_attributeCleanups[i])
    })
}
var ma = new MutationObserver(ba),
    ga = !1;

function va() {
    ma.observe(document, {
        subtree: !0,
        childList: !0,
        attributes: !0,
        attributeOldValue: !0
    }), ga = !0
}

function Vl() {
    Kf(), ma.disconnect(), ga = !1
}
var Cn = [],
    gs = !1;

function Kf() {
    Cn = Cn.concat(ma.takeRecords()), Cn.length && !gs && (gs = !0, queueMicrotask(() => {
        Qf(), gs = !1
    }))
}

function Qf() {
    ba(Cn), Cn.length = 0
}

function tt(t) {
    if (!ga) return t();
    Vl();
    let e = t();
    return va(), e
}
var ya = !1,
    wr = [];

function Jf() {
    ya = !0
}

function ep() {
    ya = !1, ba(wr), wr = []
}

function ba(t) {
    if (ya) {
        wr = wr.concat(t);
        return
    }
    let e = [],
        i = [],
        n = new Map,
        r = new Map;
    for (let s = 0; s < t.length; s++)
        if (!t[s].target._x_ignoreMutationObserver && (t[s].type === "childList" && (t[s].addedNodes.forEach(a => a.nodeType === 1 && e.push(a)), t[s].removedNodes.forEach(a => a.nodeType === 1 && i.push(a))), t[s].type === "attributes")) {
            let a = t[s].target,
                o = t[s].attributeName,
                l = t[s].oldValue,
                c = () => {
                    n.has(a) || n.set(a, []), n.get(a).push({
                        name: o,
                        value: a.getAttribute(o)
                    })
                },
                d = () => {
                    r.has(a) || r.set(a, []), r.get(a).push(o)
                };
            a.hasAttribute(o) && l === null ? c() : a.hasAttribute(o) ? (d(), c()) : d()
        }
    r.forEach((s, a) => {
        ql(a, s)
    }), n.forEach((s, a) => {
        Hl.forEach(o => o(a, s))
    });
    for (let s of i)
        if (!e.includes(s) && (zl.forEach(a => a(s)), s._x_cleanups))
            for (; s._x_cleanups.length;) s._x_cleanups.pop()();
    e.forEach(s => {
        s._x_ignoreSelf = !0, s._x_ignore = !0
    });
    for (let s of e) i.includes(s) || s.isConnected && (delete s._x_ignoreSelf, delete s._x_ignore, Nl.forEach(a => a(s)), s._x_ignore = !0, s._x_ignoreSelf = !0);
    e.forEach(s => {
        delete s._x_ignoreSelf, delete s._x_ignore
    }), e = null, i = null, n = null, r = null
}

function jl(t) {
    return Vn(Gi(t))
}

function qn(t, e, i) {
    return t._x_dataStack = [e, ...Gi(i || t)], () => {
        t._x_dataStack = t._x_dataStack.filter(n => n !== e)
    }
}

function yo(t, e) {
    let i = t._x_dataStack[0];
    Object.entries(e).forEach(([n, r]) => {
        i[n] = r
    })
}

function Gi(t) {
    return t._x_dataStack ? t._x_dataStack : typeof ShadowRoot == "function" && t instanceof ShadowRoot ? Gi(t.host) : t.parentNode ? Gi(t.parentNode) : []
}

function Vn(t) {
    let e = new Proxy({}, {
        ownKeys: () => Array.from(new Set(t.flatMap(i => Object.keys(i)))),
        has: (i, n) => t.some(r => r.hasOwnProperty(n)),
        get: (i, n) => (t.find(r => {
            if (r.hasOwnProperty(n)) {
                let s = Object.getOwnPropertyDescriptor(r, n);
                if (s.get && s.get._x_alreadyBound || s.set && s.set._x_alreadyBound) return !0;
                if ((s.get || s.set) && s.enumerable) {
                    let a = s.get,
                        o = s.set,
                        l = s;
                    a = a && a.bind(e), o = o && o.bind(e), a && (a._x_alreadyBound = !0), o && (o._x_alreadyBound = !0), Object.defineProperty(r, n, { ...l,
                        get: a,
                        set: o
                    })
                }
                return !0
            }
            return !1
        }) || {})[n],
        set: (i, n, r) => {
            let s = t.find(a => a.hasOwnProperty(n));
            return s ? s[n] = r : t[t.length - 1][n] = r, !0
        }
    });
    return e
}

function Bl(t) {
    let e = n => typeof n == "object" && !Array.isArray(n) && n !== null,
        i = (n, r = "") => {
            Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([s, {
                value: a,
                enumerable: o
            }]) => {
                if (o === !1 || a === void 0) return;
                let l = r === "" ? s : `${r}.${s}`;
                typeof a == "object" && a !== null && a._x_interceptor ? n[s] = a.initialize(t, l, s) : e(a) && a !== n && !(a instanceof Element) && i(a, l)
            })
        };
    return i(t)
}

function Zl(t, e = () => {}) {
    let i = {
        initialValue: void 0,
        _x_interceptor: !0,
        initialize(n, r, s) {
            return t(this.initialValue, () => tp(n, r), a => Ws(n, r, a), r, s)
        }
    };
    return e(i), n => {
        if (typeof n == "object" && n !== null && n._x_interceptor) {
            let r = i.initialize.bind(i);
            i.initialize = (s, a, o) => {
                let l = n.initialize(s, a, o);
                return i.initialValue = l, r(s, a, o)
            }
        } else i.initialValue = n;
        return i
    }
}

function tp(t, e) {
    return e.split(".").reduce((i, n) => i[n], t)
}

function Ws(t, e, i) {
    if (typeof e == "string" && (e = e.split(".")), e.length === 1) t[e[0]] = i;
    else {
        if (e.length === 0) throw error;
        return t[e[0]] || (t[e[0]] = {}), Ws(t[e[0]], e.slice(1), i)
    }
}
var Wl = {};

function At(t, e) {
    Wl[t] = e
}

function Us(t, e) {
    return Object.entries(Wl).forEach(([i, n]) => {
        Object.defineProperty(t, `$${i}`, {
            get() {
                let [r, s] = Kl(e);
                return r = {
                    interceptor: Zl,
                    ...r
                }, Fl(e, s), n(e, r)
            },
            enumerable: !1
        })
    }), t
}

function ip(t, e, i, ...n) {
    try {
        return i(...n)
    } catch (r) {
        Ln(r, t, e)
    }
}

function Ln(t, e, i = void 0) {
    Object.assign(t, {
        el: e,
        expression: i
    }), console.warn(`Alpine Expression Error: ${t.message}

${i?'Expression: "'+i+`"

`:""}`, e), setTimeout(() => {
        throw t
    }, 0)
}
var ur = !0;

function np(t) {
    let e = ur;
    ur = !1, t(), ur = e
}

function ji(t, e, i = {}) {
    let n;
    return at(t, e)(r => n = r, i), n
}

function at(...t) {
    return Ul(...t)
}
var Ul = Gl;

function rp(t) {
    Ul = t
}

function Gl(t, e) {
    let i = {};
    Us(i, t);
    let n = [i, ...Gi(t)];
    if (typeof e == "function") return sp(n, e);
    let r = op(n, e, t);
    return ip.bind(null, t, e, r)
}

function sp(t, e) {
    return (i = () => {}, {
        scope: n = {},
        params: r = []
    } = {}) => {
        let s = e.apply(Vn([n, ...t]), r);
        _r(i, s)
    }
}
var vs = {};

function ap(t, e) {
    if (vs[t]) return vs[t];
    let i = Object.getPrototypeOf(async function() {}).constructor,
        n = /^[\n\s]*if.*\(.*\)/.test(t) || /^(let|const)\s/.test(t) ? `(async()=>{ ${t} })()` : t,
        s = (() => {
            try {
                return new i(["__self", "scope"], `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`)
            } catch (a) {
                return Ln(a, e, t), Promise.resolve()
            }
        })();
    return vs[t] = s, s
}

function op(t, e, i) {
    let n = ap(e, i);
    return (r = () => {}, {
        scope: s = {},
        params: a = []
    } = {}) => {
        n.result = void 0, n.finished = !1;
        let o = Vn([s, ...t]);
        if (typeof n == "function") {
            let l = n(n, o).catch(c => Ln(c, i, e));
            n.finished ? (_r(r, n.result, o, a, i), n.result = void 0) : l.then(c => {
                _r(r, c, o, a, i)
            }).catch(c => Ln(c, i, e)).finally(() => n.result = void 0)
        }
    }
}

function _r(t, e, i, n, r) {
    if (ur && typeof e == "function") {
        let s = e.apply(i, n);
        s instanceof Promise ? s.then(a => _r(t, a, i, n)).catch(a => Ln(a, r, e)) : t(s)
    } else typeof e == "object" && e instanceof Promise ? e.then(s => t(s)) : t(e)
}
var wa = "x-";

function rn(t = "") {
    return wa + t
}

function lp(t) {
    wa = t
}
var Gs = {};

function We(t, e) {
    return Gs[t] = e, {
        before(i) {
            if (!Gs[i]) {
                console.warn("Cannot find directive `${directive}`. `${name}` will use the default order of execution");
                return
            }
            const n = Ei.indexOf(i) ? ? Ei.indexOf("DEFAULT");
            n >= 0 && Ei.splice(n, 0, t)
        }
    }
}

function _a(t, e, i) {
    if (e = Array.from(e), t._x_virtualDirectives) {
        let s = Object.entries(t._x_virtualDirectives).map(([o, l]) => ({
                name: o,
                value: l
            })),
            a = Yl(s);
        s = s.map(o => a.find(l => l.name === o.name) ? {
            name: `x-bind:${o.name}`,
            value: `"${o.value}"`
        } : o), e = e.concat(s)
    }
    let n = {};
    return e.map(ec((s, a) => n[s] = a)).filter(ic).map(up(n, i)).sort(fp).map(s => dp(t, s))
}

function Yl(t) {
    return Array.from(t).map(ec()).filter(e => !ic(e))
}
var Ys = !1,
    yn = new Map,
    Xl = Symbol();

function cp(t) {
    Ys = !0;
    let e = Symbol();
    Xl = e, yn.set(e, []);
    let i = () => {
            for (; yn.get(e).length;) yn.get(e).shift()();
            yn.delete(e)
        },
        n = () => {
            Ys = !1, i()
        };
    t(i), n()
}

function Kl(t) {
    let e = [],
        i = o => e.push(o),
        [n, r] = Uf(t);
    return e.push(r), [{
        Alpine: Bn,
        effect: n,
        cleanup: i,
        evaluateLater: at.bind(at, t),
        evaluate: ji.bind(ji, t)
    }, () => e.forEach(o => o())]
}

function dp(t, e) {
    let i = () => {},
        n = Gs[e.type] || i,
        [r, s] = Kl(t);
    Xf(t, e.original, s);
    let a = () => {
        t._x_ignore || t._x_ignoreSelf || (n.inline && n.inline(t, e, r), n = n.bind(n, t, e, r), Ys ? yn.get(Xl).push(n) : n())
    };
    return a.runCleanups = s, a
}
var Ql = (t, e) => ({
        name: i,
        value: n
    }) => (i.startsWith(t) && (i = i.replace(t, e)), {
        name: i,
        value: n
    }),
    Jl = t => t;

function ec(t = () => {}) {
    return ({
        name: e,
        value: i
    }) => {
        let {
            name: n,
            value: r
        } = tc.reduce((s, a) => a(s), {
            name: e,
            value: i
        });
        return n !== e && t(n, e), {
            name: n,
            value: r
        }
    }
}
var tc = [];

function Ea(t) {
    tc.push(t)
}

function ic({
    name: t
}) {
    return nc().test(t)
}
var nc = () => new RegExp(`^${wa}([^:^.]+)\\b`);

function up(t, e) {
    return ({
        name: i,
        value: n
    }) => {
        let r = i.match(nc()),
            s = i.match(/:([a-zA-Z0-9\-:]+)/),
            a = i.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
            o = e || t[i] || i;
        return {
            type: r ? r[1] : null,
            value: s ? s[1] : null,
            modifiers: a.map(l => l.replace(".", "")),
            expression: n,
            original: o
        }
    }
}
var Xs = "DEFAULT",
    Ei = ["ignore", "ref", "data", "id", "radio", "tabs", "switch", "disclosure", "menu", "listbox", "combobox", "bind", "init", "for", "mask", "model", "modelable", "transition", "show", "if", Xs, "teleport"];

function fp(t, e) {
    let i = Ei.indexOf(t.type) === -1 ? Xs : t.type,
        n = Ei.indexOf(e.type) === -1 ? Xs : e.type;
    return Ei.indexOf(i) - Ei.indexOf(n)
}

function Sn(t, e, i = {}) {
    t.dispatchEvent(new CustomEvent(e, {
        detail: i,
        bubbles: !0,
        composed: !0,
        cancelable: !0
    }))
}

function ai(t, e) {
    if (typeof ShadowRoot == "function" && t instanceof ShadowRoot) {
        Array.from(t.children).forEach(r => ai(r, e));
        return
    }
    let i = !1;
    if (e(t, () => i = !0), i) return;
    let n = t.firstElementChild;
    for (; n;) ai(n, e), n = n.nextElementSibling
}

function Yi(t, ...e) {
    console.warn(`Alpine Warning: ${t}`, ...e)
}

function pp() {
    document.body || Yi("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), Sn(document, "alpine:init"), Sn(document, "alpine:initializing"), va(), Gf(e => oi(e, ai)), Fl(e => dc(e)), Yf((e, i) => {
        _a(e, i).forEach(n => n())
    });
    let t = e => !Hr(e.parentElement, !0);
    Array.from(document.querySelectorAll(ac())).filter(t).forEach(e => {
        oi(e)
    }), Sn(document, "alpine:initialized")
}
var xa = [],
    rc = [];

function sc() {
    return xa.map(t => t())
}

function ac() {
    return xa.concat(rc).map(t => t())
}

function oc(t) {
    xa.push(t)
}

function lc(t) {
    rc.push(t)
}

function Hr(t, e = !1) {
    return zr(t, i => {
        if ((e ? ac() : sc()).some(r => i.matches(r))) return !0
    })
}

function zr(t, e) {
    if (t) {
        if (e(t)) return t;
        if (t._x_teleportBack && (t = t._x_teleportBack), !!t.parentElement) return zr(t.parentElement, e)
    }
}

function hp(t) {
    return sc().some(e => t.matches(e))
}
var cc = [];

function mp(t) {
    cc.push(t)
}

function oi(t, e = ai, i = () => {}) {
    cp(() => {
        e(t, (n, r) => {
            i(n, r), cc.forEach(s => s(n, r)), _a(n, n.attributes).forEach(s => s()), n._x_ignore && r()
        })
    })
}

function dc(t) {
    ai(t, e => ql(e))
}
var Ks = [],
    Ca = !1;

function Sa(t = () => {}) {
    return queueMicrotask(() => {
        Ca || setTimeout(() => {
            Qs()
        })
    }), new Promise(e => {
        Ks.push(() => {
            t(), e()
        })
    })
}

function Qs() {
    for (Ca = !1; Ks.length;) Ks.shift()()
}

function gp() {
    Ca = !0
}

function Ta(t, e) {
    return Array.isArray(e) ? bo(t, e.join(" ")) : typeof e == "object" && e !== null ? vp(t, e) : typeof e == "function" ? Ta(t, e()) : bo(t, e)
}

function bo(t, e) {
    let i = r => r.split(" ").filter(s => !t.classList.contains(s)).filter(Boolean),
        n = r => (t.classList.add(...r), () => {
            t.classList.remove(...r)
        });
    return e = e === !0 ? e = "" : e || "", n(i(e))
}

function vp(t, e) {
    let i = o => o.split(" ").filter(Boolean),
        n = Object.entries(e).flatMap(([o, l]) => l ? i(o) : !1).filter(Boolean),
        r = Object.entries(e).flatMap(([o, l]) => l ? !1 : i(o)).filter(Boolean),
        s = [],
        a = [];
    return r.forEach(o => {
        t.classList.contains(o) && (t.classList.remove(o), a.push(o))
    }), n.forEach(o => {
        t.classList.contains(o) || (t.classList.add(o), s.push(o))
    }), () => {
        a.forEach(o => t.classList.add(o)), s.forEach(o => t.classList.remove(o))
    }
}

function Nr(t, e) {
    return typeof e == "object" && e !== null ? yp(t, e) : bp(t, e)
}

function yp(t, e) {
    let i = {};
    return Object.entries(e).forEach(([n, r]) => {
        i[n] = t.style[n], n.startsWith("--") || (n = wp(n)), t.style.setProperty(n, r)
    }), setTimeout(() => {
        t.style.length === 0 && t.removeAttribute("style")
    }), () => {
        Nr(t, i)
    }
}

function bp(t, e) {
    let i = t.getAttribute("style", e);
    return t.setAttribute("style", e), () => {
        t.setAttribute("style", i || "")
    }
}

function wp(t) {
    return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

function Js(t, e = () => {}) {
    let i = !1;
    return function() {
        i ? e.apply(this, arguments) : (i = !0, t.apply(this, arguments))
    }
}
We("transition", (t, {
    value: e,
    modifiers: i,
    expression: n
}, {
    evaluate: r
}) => {
    typeof n == "function" && (n = r(n)), n ? _p(t, n, e) : Ep(t, i, e)
});

function _p(t, e, i) {
    uc(t, Ta, ""), {
        enter: r => {
            t._x_transition.enter.during = r
        },
        "enter-start": r => {
            t._x_transition.enter.start = r
        },
        "enter-end": r => {
            t._x_transition.enter.end = r
        },
        leave: r => {
            t._x_transition.leave.during = r
        },
        "leave-start": r => {
            t._x_transition.leave.start = r
        },
        "leave-end": r => {
            t._x_transition.leave.end = r
        }
    }[i](e)
}

function Ep(t, e, i) {
    uc(t, Nr);
    let n = !e.includes("in") && !e.includes("out") && !i,
        r = n || e.includes("in") || ["enter"].includes(i),
        s = n || e.includes("out") || ["leave"].includes(i);
    e.includes("in") && !n && (e = e.filter((g, _) => _ < e.indexOf("out"))), e.includes("out") && !n && (e = e.filter((g, _) => _ > e.indexOf("out")));
    let a = !e.includes("opacity") && !e.includes("scale"),
        o = a || e.includes("opacity"),
        l = a || e.includes("scale"),
        c = o ? 0 : 1,
        d = l ? mn(e, "scale", 95) / 100 : 1,
        u = mn(e, "delay", 0),
        f = mn(e, "origin", "center"),
        h = "opacity, transform",
        v = mn(e, "duration", 150) / 1e3,
        b = mn(e, "duration", 75) / 1e3,
        p = "cubic-bezier(0.4, 0.0, 0.2, 1)";
    r && (t._x_transition.enter.during = {
        transformOrigin: f,
        transitionDelay: u,
        transitionProperty: h,
        transitionDuration: `${v}s`,
        transitionTimingFunction: p
    }, t._x_transition.enter.start = {
        opacity: c,
        transform: `scale(${d})`
    }, t._x_transition.enter.end = {
        opacity: 1,
        transform: "scale(1)"
    }), s && (t._x_transition.leave.during = {
        transformOrigin: f,
        transitionDelay: u,
        transitionProperty: h,
        transitionDuration: `${b}s`,
        transitionTimingFunction: p
    }, t._x_transition.leave.start = {
        opacity: 1,
        transform: "scale(1)"
    }, t._x_transition.leave.end = {
        opacity: c,
        transform: `scale(${d})`
    })
}

function uc(t, e, i = {}) {
    t._x_transition || (t._x_transition = {
        enter: {
            during: i,
            start: i,
            end: i
        },
        leave: {
            during: i,
            start: i,
            end: i
        },
        in (n = () => {}, r = () => {}) {
            ea(t, e, {
                during: this.enter.during,
                start: this.enter.start,
                end: this.enter.end
            }, n, r)
        },
        out(n = () => {}, r = () => {}) {
            ea(t, e, {
                during: this.leave.during,
                start: this.leave.start,
                end: this.leave.end
            }, n, r)
        }
    })
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(t, e, i, n) {
    const r = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let s = () => r(i);
    if (e) {
        t._x_transition && (t._x_transition.enter || t._x_transition.leave) ? t._x_transition.enter && (Object.entries(t._x_transition.enter.during).length || Object.entries(t._x_transition.enter.start).length || Object.entries(t._x_transition.enter.end).length) ? t._x_transition.in(i) : s() : t._x_transition ? t._x_transition.in(i) : s();
        return
    }
    t._x_hidePromise = t._x_transition ? new Promise((a, o) => {
        t._x_transition.out(() => {}, () => a(n)), t._x_transitioning.beforeCancel(() => o({
            isFromCancelledTransition: !0
        }))
    }) : Promise.resolve(n), queueMicrotask(() => {
        let a = fc(t);
        a ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(t)) : r(() => {
            let o = l => {
                let c = Promise.all([l._x_hidePromise, ...(l._x_hideChildren || []).map(o)]).then(([d]) => d());
                return delete l._x_hidePromise, delete l._x_hideChildren, c
            };
            o(t).catch(l => {
                if (!l.isFromCancelledTransition) throw l
            })
        })
    })
};

function fc(t) {
    let e = t.parentNode;
    if (e) return e._x_hidePromise ? e : fc(e)
}

function ea(t, e, {
    during: i,
    start: n,
    end: r
} = {}, s = () => {}, a = () => {}) {
    if (t._x_transitioning && t._x_transitioning.cancel(), Object.keys(i).length === 0 && Object.keys(n).length === 0 && Object.keys(r).length === 0) {
        s(), a();
        return
    }
    let o, l, c;
    xp(t, {
        start() {
            o = e(t, n)
        },
        during() {
            l = e(t, i)
        },
        before: s,
        end() {
            o(), c = e(t, r)
        },
        after: a,
        cleanup() {
            l(), c()
        }
    })
}

function xp(t, e) {
    let i, n, r, s = Js(() => {
        tt(() => {
            i = !0, n || e.before(), r || (e.end(), Qs()), e.after(), t.isConnected && e.cleanup(), delete t._x_transitioning
        })
    });
    t._x_transitioning = {
        beforeCancels: [],
        beforeCancel(a) {
            this.beforeCancels.push(a)
        },
        cancel: Js(function() {
            for (; this.beforeCancels.length;) this.beforeCancels.shift()();
            s()
        }),
        finish: s
    }, tt(() => {
        e.start(), e.during()
    }), gp(), requestAnimationFrame(() => {
        if (i) return;
        let a = Number(getComputedStyle(t).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3,
            o = Number(getComputedStyle(t).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
        a === 0 && (a = Number(getComputedStyle(t).animationDuration.replace("s", "")) * 1e3), tt(() => {
            e.before()
        }), n = !0, requestAnimationFrame(() => {
            i || (tt(() => {
                e.end()
            }), Qs(), setTimeout(t._x_transitioning.finish, a + o), r = !0)
        })
    })
}

function mn(t, e, i) {
    if (t.indexOf(e) === -1) return i;
    const n = t[t.indexOf(e) + 1];
    if (!n || e === "scale" && isNaN(n)) return i;
    if (e === "duration") {
        let r = n.match(/([0-9]+)ms/);
        if (r) return r[1]
    }
    return e === "origin" && ["top", "right", "left", "center", "bottom"].includes(t[t.indexOf(e) + 2]) ? [n, t[t.indexOf(e) + 2]].join(" ") : n
}
var Er = !1;

function jn(t, e = () => {}) {
    return (...i) => Er ? e(...i) : t(...i)
}

function Cp(t) {
    return (...e) => Er && t(...e)
}

function Sp(t, e) {
    e._x_dataStack || (e._x_dataStack = t._x_dataStack), Er = !0, Mp(() => {
        Tp(e)
    }), Er = !1
}

function Tp(t) {
    let e = !1;
    oi(t, (n, r) => {
        ai(n, (s, a) => {
            if (e && hp(s)) return a();
            e = !0, r(s, a)
        })
    })
}

function Mp(t) {
    let e = nn;
    vo((i, n) => {
        let r = e(i);
        return Fn(r), () => {}
    }), t(), vo(e)
}

function pc(t, e, i, n = []) {
    switch (t._x_bindings || (t._x_bindings = tn({})), t._x_bindings[e] = i, e = n.includes("camel") ? Ip(e) : e, e) {
        case "value":
            $p(t, i);
            break;
        case "style":
            Pp(t, i);
            break;
        case "class":
            Ap(t, i);
            break;
        default:
            Op(t, e, i);
            break
    }
}

function $p(t, e) {
    if (t.type === "radio") t.attributes.value === void 0 && (t.value = e), window.fromModel && (t.checked = wo(t.value, e));
    else if (t.type === "checkbox") Number.isInteger(e) ? t.value = e : !Number.isInteger(e) && !Array.isArray(e) && typeof e != "boolean" && ![null, void 0].includes(e) ? t.value = String(e) : Array.isArray(e) ? t.checked = e.some(i => wo(i, t.value)) : t.checked = !!e;
    else if (t.tagName === "SELECT") Lp(t, e);
    else {
        if (t.value === e) return;
        t.value = e
    }
}

function Ap(t, e) {
    t._x_undoAddedClasses && t._x_undoAddedClasses(), t._x_undoAddedClasses = Ta(t, e)
}

function Pp(t, e) {
    t._x_undoAddedStyles && t._x_undoAddedStyles(), t._x_undoAddedStyles = Nr(t, e)
}

function Op(t, e, i) {
    [null, void 0, !1].includes(i) && Dp(e) ? t.removeAttribute(e) : (hc(e) && (i = e), kp(t, e, i))
}

function kp(t, e, i) {
    t.getAttribute(e) != i && t.setAttribute(e, i)
}

function Lp(t, e) {
    const i = [].concat(e).map(n => n + "");
    Array.from(t.options).forEach(n => {
        n.selected = i.includes(n.value)
    })
}

function Ip(t) {
    return t.toLowerCase().replace(/-(\w)/g, (e, i) => i.toUpperCase())
}

function wo(t, e) {
    return t == e
}

function hc(t) {
    return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(t)
}

function Dp(t) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(t)
}

function Rp(t, e, i) {
    if (t._x_bindings && t._x_bindings[e] !== void 0) return t._x_bindings[e];
    let n = t.getAttribute(e);
    return n === null ? typeof i == "function" ? i() : i : n === "" ? !0 : hc(e) ? !![e, "true"].includes(n) : n
}

function mc(t, e) {
    var i;
    return function() {
        var n = this,
            r = arguments,
            s = function() {
                i = null, t.apply(n, r)
            };
        clearTimeout(i), i = setTimeout(s, e)
    }
}

function gc(t, e) {
    let i;
    return function() {
        let n = this,
            r = arguments;
        i || (t.apply(n, r), i = !0, setTimeout(() => i = !1, e))
    }
}

function Hp(t) {
    t(Bn)
}
var _i = {},
    _o = !1;

function zp(t, e) {
    if (_o || (_i = tn(_i), _o = !0), e === void 0) return _i[t];
    _i[t] = e, typeof e == "object" && e !== null && e.hasOwnProperty("init") && typeof e.init == "function" && _i[t].init(), Bl(_i[t])
}

function Np() {
    return _i
}
var vc = {};

function Fp(t, e) {
    let i = typeof e != "function" ? () => e : e;
    t instanceof Element ? yc(t, i()) : vc[t] = i
}

function qp(t) {
    return Object.entries(vc).forEach(([e, i]) => {
        Object.defineProperty(t, e, {
            get() {
                return (...n) => i(...n)
            }
        })
    }), t
}

function yc(t, e, i) {
    let n = [];
    for (; n.length;) n.pop()();
    let r = Object.entries(e).map(([a, o]) => ({
            name: a,
            value: o
        })),
        s = Yl(r);
    r = r.map(a => s.find(o => o.name === a.name) ? {
        name: `x-bind:${a.name}`,
        value: `"${a.value}"`
    } : a), _a(t, r, i).map(a => {
        n.push(a.runCleanups), a()
    })
}
var bc = {};

function Vp(t, e) {
    bc[t] = e
}

function jp(t, e) {
    return Object.entries(bc).forEach(([i, n]) => {
        Object.defineProperty(t, i, {
            get() {
                return (...r) => n.bind(e)(...r)
            },
            enumerable: !1
        })
    }), t
}
var Bp = {
        get reactive() {
            return tn
        },
        get release() {
            return Fn
        },
        get effect() {
            return nn
        },
        get raw() {
            return Rl
        },
        version: "3.11.1",
        flushAndStopDeferringMutations: ep,
        dontAutoEvaluateFunctions: np,
        disableEffectScheduling: Zf,
        startObservingMutations: va,
        stopObservingMutations: Vl,
        setReactivityEngine: Wf,
        closestDataStack: Gi,
        skipDuringClone: jn,
        onlyDuringClone: Cp,
        addRootSelector: oc,
        addInitSelector: lc,
        addScopeToNode: qn,
        deferMutations: Jf,
        mapAttributes: Ea,
        evaluateLater: at,
        interceptInit: mp,
        setEvaluator: rp,
        mergeProxies: Vn,
        findClosest: zr,
        closestRoot: Hr,
        destroyTree: dc,
        interceptor: Zl,
        transition: ea,
        setStyles: Nr,
        mutateDom: tt,
        directive: We,
        throttle: gc,
        debounce: mc,
        evaluate: ji,
        initTree: oi,
        nextTick: Sa,
        prefixed: rn,
        prefix: lp,
        plugin: Hp,
        magic: At,
        store: zp,
        start: pp,
        clone: Sp,
        bound: Rp,
        $data: jl,
        walk: ai,
        data: Vp,
        bind: Fp
    },
    Bn = Bp;

function Zp(t, e) {
    const i = Object.create(null),
        n = t.split(",");
    for (let r = 0; r < n.length; r++) i[n[r]] = !0;
    return e ? r => !!i[r.toLowerCase()] : r => !!i[r]
}
var Wp = Object.freeze({}),
    wc = Object.assign,
    Up = Object.prototype.hasOwnProperty,
    Fr = (t, e) => Up.call(t, e),
    Ti = Array.isArray,
    Tn = t => _c(t) === "[object Map]",
    Gp = t => typeof t == "string",
    Ma = t => typeof t == "symbol",
    qr = t => t !== null && typeof t == "object",
    Yp = Object.prototype.toString,
    _c = t => Yp.call(t),
    Ec = t => _c(t).slice(8, -1),
    $a = t => Gp(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t,
    Xp = t => {
        const e = Object.create(null);
        return i => e[i] || (e[i] = t(i))
    },
    Kp = Xp(t => t.charAt(0).toUpperCase() + t.slice(1)),
    xc = (t, e) => t !== e && (t === t || e === e),
    ta = new WeakMap,
    gn = [],
    Lt, Mi = Symbol("iterate"),
    ia = Symbol("Map key iterate");

function Qp(t) {
    return t && t._isEffect === !0
}

function Jp(t, e = Wp) {
    Qp(t) && (t = t.raw);
    const i = ih(t, e);
    return e.lazy || i(), i
}

function eh(t) {
    t.active && (Cc(t), t.options.onStop && t.options.onStop(), t.active = !1)
}
var th = 0;

function ih(t, e) {
    const i = function() {
        if (!i.active) return t();
        if (!gn.includes(i)) {
            Cc(i);
            try {
                return rh(), gn.push(i), Lt = i, t()
            } finally {
                gn.pop(), Sc(), Lt = gn[gn.length - 1]
            }
        }
    };
    return i.id = th++, i.allowRecurse = !!e.allowRecurse, i._isEffect = !0, i.active = !0, i.raw = t, i.deps = [], i.options = e, i
}

function Cc(t) {
    const {
        deps: e
    } = t;
    if (e.length) {
        for (let i = 0; i < e.length; i++) e[i].delete(t);
        e.length = 0
    }
}
var Xi = !0,
    Aa = [];

function nh() {
    Aa.push(Xi), Xi = !1
}

function rh() {
    Aa.push(Xi), Xi = !0
}

function Sc() {
    const t = Aa.pop();
    Xi = t === void 0 ? !0 : t
}

function $t(t, e, i) {
    if (!Xi || Lt === void 0) return;
    let n = ta.get(t);
    n || ta.set(t, n = new Map);
    let r = n.get(i);
    r || n.set(i, r = new Set), r.has(Lt) || (r.add(Lt), Lt.deps.push(r), Lt.options.onTrack && Lt.options.onTrack({
        effect: Lt,
        target: t,
        type: e,
        key: i
    }))
}

function li(t, e, i, n, r, s) {
    const a = ta.get(t);
    if (!a) return;
    const o = new Set,
        l = d => {
            d && d.forEach(u => {
                (u !== Lt || u.allowRecurse) && o.add(u)
            })
        };
    if (e === "clear") a.forEach(l);
    else if (i === "length" && Ti(t)) a.forEach((d, u) => {
        (u === "length" || u >= n) && l(d)
    });
    else switch (i !== void 0 && l(a.get(i)), e) {
        case "add":
            Ti(t) ? $a(i) && l(a.get("length")) : (l(a.get(Mi)), Tn(t) && l(a.get(ia)));
            break;
        case "delete":
            Ti(t) || (l(a.get(Mi)), Tn(t) && l(a.get(ia)));
            break;
        case "set":
            Tn(t) && l(a.get(Mi));
            break
    }
    const c = d => {
        d.options.onTrigger && d.options.onTrigger({
            effect: d,
            target: t,
            key: i,
            type: e,
            newValue: n,
            oldValue: r,
            oldTarget: s
        }), d.options.scheduler ? d.options.scheduler(d) : d()
    };
    o.forEach(c)
}
var sh = Zp("__proto__,__v_isRef,__isVue"),
    Tc = new Set(Object.getOwnPropertyNames(Symbol).map(t => Symbol[t]).filter(Ma)),
    ah = Vr(),
    oh = Vr(!1, !0),
    lh = Vr(!0),
    ch = Vr(!0, !0),
    xr = {};
["includes", "indexOf", "lastIndexOf"].forEach(t => {
    const e = Array.prototype[t];
    xr[t] = function(...i) {
        const n = Re(this);
        for (let s = 0, a = this.length; s < a; s++) $t(n, "get", s + "");
        const r = e.apply(n, i);
        return r === -1 || r === !1 ? e.apply(n, i.map(Re)) : r
    }
});
["push", "pop", "shift", "unshift", "splice"].forEach(t => {
    const e = Array.prototype[t];
    xr[t] = function(...i) {
        nh();
        const n = e.apply(this, i);
        return Sc(), n
    }
});

function Vr(t = !1, e = !1) {
    return function(n, r, s) {
        if (r === "__v_isReactive") return !t;
        if (r === "__v_isReadonly") return t;
        if (r === "__v_raw" && s === (t ? e ? bh : qc : e ? yh : Fc).get(n)) return n;
        const a = Ti(n);
        if (!t && a && Fr(xr, r)) return Reflect.get(xr, r, s);
        const o = Reflect.get(n, r, s);
        return (Ma(r) ? Tc.has(r) : sh(r)) || (t || $t(n, "get", r), e) ? o : na(o) ? !a || !$a(r) ? o.value : o : qr(o) ? t ? Vc(o) : La(o) : o
    }
}
var dh = Mc(),
    uh = Mc(!0);

function Mc(t = !1) {
    return function(i, n, r, s) {
        let a = i[n];
        if (!t && (r = Re(r), a = Re(a), !Ti(i) && na(a) && !na(r))) return a.value = r, !0;
        const o = Ti(i) && $a(n) ? Number(n) < i.length : Fr(i, n),
            l = Reflect.set(i, n, r, s);
        return i === Re(s) && (o ? xc(r, a) && li(i, "set", n, r, a) : li(i, "add", n, r)), l
    }
}

function fh(t, e) {
    const i = Fr(t, e),
        n = t[e],
        r = Reflect.deleteProperty(t, e);
    return r && i && li(t, "delete", e, void 0, n), r
}

function ph(t, e) {
    const i = Reflect.has(t, e);
    return (!Ma(e) || !Tc.has(e)) && $t(t, "has", e), i
}

function hh(t) {
    return $t(t, "iterate", Ti(t) ? "length" : Mi), Reflect.ownKeys(t)
}
var $c = {
        get: ah,
        set: dh,
        deleteProperty: fh,
        has: ph,
        ownKeys: hh
    },
    Ac = {
        get: lh,
        set(t, e) {
            return console.warn(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0
        },
        deleteProperty(t, e) {
            return console.warn(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0
        }
    };
wc({}, $c, {
    get: oh,
    set: uh
});
wc({}, Ac, {
    get: ch
});
var Pa = t => qr(t) ? La(t) : t,
    Oa = t => qr(t) ? Vc(t) : t,
    ka = t => t,
    jr = t => Reflect.getPrototypeOf(t);

function Br(t, e, i = !1, n = !1) {
    t = t.__v_raw;
    const r = Re(t),
        s = Re(e);
    e !== s && !i && $t(r, "get", e), !i && $t(r, "get", s);
    const {
        has: a
    } = jr(r), o = n ? ka : i ? Oa : Pa;
    if (a.call(r, e)) return o(t.get(e));
    if (a.call(r, s)) return o(t.get(s));
    t !== r && t.get(e)
}

function Zr(t, e = !1) {
    const i = this.__v_raw,
        n = Re(i),
        r = Re(t);
    return t !== r && !e && $t(n, "has", t), !e && $t(n, "has", r), t === r ? i.has(t) : i.has(t) || i.has(r)
}

function Wr(t, e = !1) {
    return t = t.__v_raw, !e && $t(Re(t), "iterate", Mi), Reflect.get(t, "size", t)
}

function Pc(t) {
    t = Re(t);
    const e = Re(this);
    return jr(e).has.call(e, t) || (e.add(t), li(e, "add", t, t)), this
}

function Oc(t, e) {
    e = Re(e);
    const i = Re(this),
        {
            has: n,
            get: r
        } = jr(i);
    let s = n.call(i, t);
    s ? Nc(i, n, t) : (t = Re(t), s = n.call(i, t));
    const a = r.call(i, t);
    return i.set(t, e), s ? xc(e, a) && li(i, "set", t, e, a) : li(i, "add", t, e), this
}

function kc(t) {
    const e = Re(this),
        {
            has: i,
            get: n
        } = jr(e);
    let r = i.call(e, t);
    r ? Nc(e, i, t) : (t = Re(t), r = i.call(e, t));
    const s = n ? n.call(e, t) : void 0,
        a = e.delete(t);
    return r && li(e, "delete", t, void 0, s), a
}

function Lc() {
    const t = Re(this),
        e = t.size !== 0,
        i = Tn(t) ? new Map(t) : new Set(t),
        n = t.clear();
    return e && li(t, "clear", void 0, void 0, i), n
}

function Ur(t, e) {
    return function(n, r) {
        const s = this,
            a = s.__v_raw,
            o = Re(a),
            l = e ? ka : t ? Oa : Pa;
        return !t && $t(o, "iterate", Mi), a.forEach((c, d) => n.call(r, l(c), l(d), s))
    }
}

function rr(t, e, i) {
    return function(...n) {
        const r = this.__v_raw,
            s = Re(r),
            a = Tn(s),
            o = t === "entries" || t === Symbol.iterator && a,
            l = t === "keys" && a,
            c = r[t](...n),
            d = i ? ka : e ? Oa : Pa;
        return !e && $t(s, "iterate", l ? ia : Mi), {
            next() {
                const {
                    value: u,
                    done: f
                } = c.next();
                return f ? {
                    value: u,
                    done: f
                } : {
                    value: o ? [d(u[0]), d(u[1])] : d(u),
                    done: f
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function ii(t) {
    return function(...e) {
        {
            const i = e[0] ? `on key "${e[0]}" ` : "";
            console.warn(`${Kp(t)} operation ${i}failed: target is readonly.`, Re(this))
        }
        return t === "delete" ? !1 : this
    }
}
var Ic = {
        get(t) {
            return Br(this, t)
        },
        get size() {
            return Wr(this)
        },
        has: Zr,
        add: Pc,
        set: Oc,
        delete: kc,
        clear: Lc,
        forEach: Ur(!1, !1)
    },
    Dc = {
        get(t) {
            return Br(this, t, !1, !0)
        },
        get size() {
            return Wr(this)
        },
        has: Zr,
        add: Pc,
        set: Oc,
        delete: kc,
        clear: Lc,
        forEach: Ur(!1, !0)
    },
    Rc = {
        get(t) {
            return Br(this, t, !0)
        },
        get size() {
            return Wr(this, !0)
        },
        has(t) {
            return Zr.call(this, t, !0)
        },
        add: ii("add"),
        set: ii("set"),
        delete: ii("delete"),
        clear: ii("clear"),
        forEach: Ur(!0, !1)
    },
    Hc = {
        get(t) {
            return Br(this, t, !0, !0)
        },
        get size() {
            return Wr(this, !0)
        },
        has(t) {
            return Zr.call(this, t, !0)
        },
        add: ii("add"),
        set: ii("set"),
        delete: ii("delete"),
        clear: ii("clear"),
        forEach: Ur(!0, !0)
    },
    mh = ["keys", "values", "entries", Symbol.iterator];
mh.forEach(t => {
    Ic[t] = rr(t, !1, !1), Rc[t] = rr(t, !0, !1), Dc[t] = rr(t, !1, !0), Hc[t] = rr(t, !0, !0)
});

function zc(t, e) {
    const i = e ? t ? Hc : Dc : t ? Rc : Ic;
    return (n, r, s) => r === "__v_isReactive" ? !t : r === "__v_isReadonly" ? t : r === "__v_raw" ? n : Reflect.get(Fr(i, r) && r in n ? i : n, r, s)
}
var gh = {
        get: zc(!1, !1)
    },
    vh = {
        get: zc(!0, !1)
    };

function Nc(t, e, i) {
    const n = Re(i);
    if (n !== i && e.call(t, n)) {
        const r = Ec(t);
        console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)
    }
}
var Fc = new WeakMap,
    yh = new WeakMap,
    qc = new WeakMap,
    bh = new WeakMap;

function wh(t) {
    switch (t) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0
    }
}

function _h(t) {
    return t.__v_skip || !Object.isExtensible(t) ? 0 : wh(Ec(t))
}

function La(t) {
    return t && t.__v_isReadonly ? t : jc(t, !1, $c, gh, Fc)
}

function Vc(t) {
    return jc(t, !0, Ac, vh, qc)
}

function jc(t, e, i, n, r) {
    if (!qr(t)) return console.warn(`value cannot be made reactive: ${String(t)}`), t;
    if (t.__v_raw && !(e && t.__v_isReactive)) return t;
    const s = r.get(t);
    if (s) return s;
    const a = _h(t);
    if (a === 0) return t;
    const o = new Proxy(t, a === 2 ? n : i);
    return r.set(t, o), o
}

function Re(t) {
    return t && Re(t.__v_raw) || t
}

function na(t) {
    return Boolean(t && t.__v_isRef === !0)
}
At("nextTick", () => Sa);
At("dispatch", t => Sn.bind(Sn, t));
At("watch", (t, {
    evaluateLater: e,
    effect: i
}) => (n, r) => {
    let s = e(n),
        a = !0,
        o, l = i(() => s(c => {
            JSON.stringify(c), a ? o = c : queueMicrotask(() => {
                r(c, o), o = c
            }), a = !1
        }));
    t._x_effects.delete(l)
});
At("store", Np);
At("data", t => jl(t));
At("root", t => Hr(t));
At("refs", t => (t._x_refs_proxy || (t._x_refs_proxy = Vn(Eh(t))), t._x_refs_proxy));

function Eh(t) {
    let e = [],
        i = t;
    for (; i;) i._x_refs && e.push(i._x_refs), i = i.parentNode;
    return e
}
var ys = {};

function Bc(t) {
    return ys[t] || (ys[t] = 0), ++ys[t]
}

function xh(t, e) {
    return zr(t, i => {
        if (i._x_ids && i._x_ids[e]) return !0
    })
}

function Ch(t, e) {
    t._x_ids || (t._x_ids = {}), t._x_ids[e] || (t._x_ids[e] = Bc(e))
}
At("id", t => (e, i = null) => {
    let n = xh(t, e),
        r = n ? n._x_ids[e] : Bc(e);
    return i ? `${e}-${r}-${i}` : `${e}-${r}`
});
At("el", t => t);
Zc("Focus", "focus", "focus");
Zc("Persist", "persist", "persist");

function Zc(t, e, i) {
    At(e, n => Yi(`You can't use [$${directiveName}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${i}`, n))
}

function Sh({
    get: t,
    set: e
}, {
    get: i,
    set: n
}) {
    let r = !0,
        s, a, o = nn(() => {
            let l, c;
            r ? (l = t(), n(l), c = i(), r = !1) : (l = t(), c = i(), a = JSON.stringify(l), JSON.stringify(c), a !== s ? (c = i(), n(l), c = l) : (e(c), l = c)), s = JSON.stringify(l), JSON.stringify(c)
        });
    return () => {
        Fn(o)
    }
}
We("modelable", (t, {
    expression: e
}, {
    effect: i,
    evaluateLater: n,
    cleanup: r
}) => {
    let s = n(e),
        a = () => {
            let d;
            return s(u => d = u), d
        },
        o = n(`${e} = __placeholder`),
        l = d => o(() => {}, {
            scope: {
                __placeholder: d
            }
        }),
        c = a();
    l(c), queueMicrotask(() => {
        if (!t._x_model) return;
        t._x_removeModelListeners.default();
        let d = t._x_model.get,
            u = t._x_model.set,
            f = Sh({
                get() {
                    return d()
                },
                set(h) {
                    u(h)
                }
            }, {
                get() {
                    return a()
                },
                set(h) {
                    l(h)
                }
            });
        r(f)
    })
});
var Th = document.createElement("div");
We("teleport", (t, {
    modifiers: e,
    expression: i
}, {
    cleanup: n
}) => {
    t.tagName.toLowerCase() !== "template" && Yi("x-teleport can only be used on a <template> tag", t);
    let r = jn(() => document.querySelector(i), () => Th)();
    r || Yi(`Cannot find x-teleport element for selector: "${i}"`);
    let s = t.content.cloneNode(!0).firstElementChild;
    t._x_teleport = s, s._x_teleportBack = t, t._x_forwardEvents && t._x_forwardEvents.forEach(a => {
        s.addEventListener(a, o => {
            o.stopPropagation(), t.dispatchEvent(new o.constructor(o.type, o))
        })
    }), qn(s, {}, t), tt(() => {
        e.includes("prepend") ? r.parentNode.insertBefore(s, r) : e.includes("append") ? r.parentNode.insertBefore(s, r.nextSibling) : r.appendChild(s), oi(s), s._x_ignore = !0
    }), n(() => s.remove())
});
var Wc = () => {};
Wc.inline = (t, {
    modifiers: e
}, {
    cleanup: i
}) => {
    e.includes("self") ? t._x_ignoreSelf = !0 : t._x_ignore = !0, i(() => {
        e.includes("self") ? delete t._x_ignoreSelf : delete t._x_ignore
    })
};
We("ignore", Wc);
We("effect", (t, {
    expression: e
}, {
    effect: i
}) => i(at(t, e)));

function ra(t, e, i, n) {
    let r = t,
        s = l => n(l),
        a = {},
        o = (l, c) => d => c(l, d);
    if (i.includes("dot") && (e = Mh(e)), i.includes("camel") && (e = $h(e)), i.includes("passive") && (a.passive = !0), i.includes("capture") && (a.capture = !0), i.includes("window") && (r = window), i.includes("document") && (r = document), i.includes("prevent") && (s = o(s, (l, c) => {
            c.preventDefault(), l(c)
        })), i.includes("stop") && (s = o(s, (l, c) => {
            c.stopPropagation(), l(c)
        })), i.includes("self") && (s = o(s, (l, c) => {
            c.target === t && l(c)
        })), (i.includes("away") || i.includes("outside")) && (r = document, s = o(s, (l, c) => {
            t.contains(c.target) || c.target.isConnected !== !1 && (t.offsetWidth < 1 && t.offsetHeight < 1 || t._x_isShown !== !1 && l(c))
        })), i.includes("once") && (s = o(s, (l, c) => {
            l(c), r.removeEventListener(e, s, a)
        })), s = o(s, (l, c) => {
            Ph(e) && Oh(c, i) || l(c)
        }), i.includes("debounce")) {
        let l = i[i.indexOf("debounce") + 1] || "invalid-wait",
            c = Cr(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
        s = mc(s, c)
    }
    if (i.includes("throttle")) {
        let l = i[i.indexOf("throttle") + 1] || "invalid-wait",
            c = Cr(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
        s = gc(s, c)
    }
    return r.addEventListener(e, s, a), () => {
        r.removeEventListener(e, s, a)
    }
}

function Mh(t) {
    return t.replace(/-/g, ".")
}

function $h(t) {
    return t.toLowerCase().replace(/-(\w)/g, (e, i) => i.toUpperCase())
}

function Cr(t) {
    return !Array.isArray(t) && !isNaN(t)
}

function Ah(t) {
    return [" ", "_"].includes(t) ? t : t.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase()
}

function Ph(t) {
    return ["keydown", "keyup"].includes(t)
}

function Oh(t, e) {
    let i = e.filter(s => !["window", "document", "prevent", "stop", "once"].includes(s));
    if (i.includes("debounce")) {
        let s = i.indexOf("debounce");
        i.splice(s, Cr((i[s + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
    }
    if (i.includes("throttle")) {
        let s = i.indexOf("throttle");
        i.splice(s, Cr((i[s + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
    }
    if (i.length === 0 || i.length === 1 && Eo(t.key).includes(i[0])) return !1;
    const r = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter(s => i.includes(s));
    return i = i.filter(s => !r.includes(s)), !(r.length > 0 && r.filter(a => ((a === "cmd" || a === "super") && (a = "meta"), t[`${a}Key`])).length === r.length && Eo(t.key).includes(i[0]))
}

function Eo(t) {
    if (!t) return [];
    t = Ah(t);
    let e = {
        ctrl: "control",
        slash: "/",
        space: " ",
        spacebar: " ",
        cmd: "meta",
        esc: "escape",
        up: "arrow-up",
        down: "arrow-down",
        left: "arrow-left",
        right: "arrow-right",
        period: ".",
        equal: "=",
        minus: "-",
        underscore: "_"
    };
    return e[t] = t, Object.keys(e).map(i => {
        if (e[i] === t) return i
    }).filter(i => i)
}
We("model", (t, {
    modifiers: e,
    expression: i
}, {
    effect: n,
    cleanup: r
}) => {
    let s = t;
    e.includes("parent") && (s = t.parentNode);
    let a = at(s, i),
        o;
    typeof i == "string" ? o = at(s, `${i} = __placeholder`) : typeof i == "function" && typeof i() == "string" ? o = at(s, `${i()} = __placeholder`) : o = () => {};
    let l = () => {
            let f;
            return a(h => f = h), xo(f) ? f.get() : f
        },
        c = f => {
            let h;
            a(v => h = v), xo(h) ? h.set(f) : o(() => {}, {
                scope: {
                    __placeholder: f
                }
            })
        };
    typeof i == "string" && t.type === "radio" && tt(() => {
        t.hasAttribute("name") || t.setAttribute("name", i)
    });
    var d = t.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(t.type) || e.includes("lazy") ? "change" : "input";
    let u = ra(t, d, e, f => {
        c(kh(t, e, f, l()))
    });
    if (t._x_removeModelListeners || (t._x_removeModelListeners = {}), t._x_removeModelListeners.default = u, r(() => t._x_removeModelListeners.default()), t.form) {
        let f = ra(t.form, "reset", [], h => {
            Sa(() => t._x_model && t._x_model.set(t.value))
        });
        r(() => f())
    }
    t._x_model = {
        get() {
            return l()
        },
        set(f) {
            c(f)
        }
    }, t._x_forceModelUpdate = f => {
        f = f === void 0 ? l() : f, f === void 0 && typeof i == "string" && i.match(/\./) && (f = ""), window.fromModel = !0, tt(() => pc(t, "value", f)), delete window.fromModel
    }, n(() => {
        let f = l();
        e.includes("unintrusive") && document.activeElement.isSameNode(t) || t._x_forceModelUpdate(f)
    })
});

function kh(t, e, i, n) {
    return tt(() => {
        if (i instanceof CustomEvent && i.detail !== void 0) return typeof i.detail < "u" ? i.detail : i.target.value;
        if (t.type === "checkbox")
            if (Array.isArray(n)) {
                let r = e.includes("number") ? bs(i.target.value) : i.target.value;
                return i.target.checked ? n.concat([r]) : n.filter(s => !Lh(s, r))
            } else return i.target.checked;
        else {
            if (t.tagName.toLowerCase() === "select" && t.multiple) return e.includes("number") ? Array.from(i.target.selectedOptions).map(r => {
                let s = r.value || r.text;
                return bs(s)
            }) : Array.from(i.target.selectedOptions).map(r => r.value || r.text); {
                let r = i.target.value;
                return e.includes("number") ? bs(r) : e.includes("trim") ? r.trim() : r
            }
        }
    })
}

function bs(t) {
    let e = t ? parseFloat(t) : null;
    return Ih(e) ? e : t
}

function Lh(t, e) {
    return t == e
}

function Ih(t) {
    return !Array.isArray(t) && !isNaN(t)
}

function xo(t) {
    return t !== null && typeof t == "object" && typeof t.get == "function" && typeof t.set == "function"
}
We("cloak", t => queueMicrotask(() => tt(() => t.removeAttribute(rn("cloak")))));
lc(() => `[${rn("init")}]`);
We("init", jn((t, {
    expression: e
}, {
    evaluate: i
}) => typeof e == "string" ? !!e.trim() && i(e, {}, !1) : i(e, {}, !1)));
We("text", (t, {
    expression: e
}, {
    effect: i,
    evaluateLater: n
}) => {
    let r = n(e);
    i(() => {
        r(s => {
            tt(() => {
                t.textContent = s
            })
        })
    })
});
We("html", (t, {
    expression: e
}, {
    effect: i,
    evaluateLater: n
}) => {
    let r = n(e);
    i(() => {
        r(s => {
            tt(() => {
                t.innerHTML = s, t._x_ignoreSelf = !0, oi(t), delete t._x_ignoreSelf
            })
        })
    })
});
Ea(Ql(":", Jl(rn("bind:"))));
We("bind", (t, {
    value: e,
    modifiers: i,
    expression: n,
    original: r
}, {
    effect: s
}) => {
    if (!e) {
        let o = {};
        qp(o), at(t, n)(c => {
            yc(t, c, r)
        }, {
            scope: o
        });
        return
    }
    if (e === "key") return Dh(t, n);
    let a = at(t, n);
    s(() => a(o => {
        o === void 0 && typeof n == "string" && n.match(/\./) && (o = ""), tt(() => pc(t, e, o, i))
    }))
});

function Dh(t, e) {
    t._x_keyExpression = e
}
oc(() => `[${rn("data")}]`);
We("data", jn((t, {
    expression: e
}, {
    cleanup: i
}) => {
    e = e === "" ? "{}" : e;
    let n = {};
    Us(n, t);
    let r = {};
    jp(r, n);
    let s = ji(t, e, {
        scope: r
    });
    s === void 0 && (s = {}), Us(s, t);
    let a = tn(s);
    Bl(a);
    let o = qn(t, a);
    a.init && ji(t, a.init), i(() => {
        a.destroy && ji(t, a.destroy), o()
    })
}));
We("show", (t, {
    modifiers: e,
    expression: i
}, {
    effect: n
}) => {
    let r = at(t, i);
    t._x_doHide || (t._x_doHide = () => {
        tt(() => {
            t.style.setProperty("display", "none", e.includes("important") ? "important" : void 0)
        })
    }), t._x_doShow || (t._x_doShow = () => {
        tt(() => {
            t.style.length === 1 && t.style.display === "none" ? t.removeAttribute("style") : t.style.removeProperty("display")
        })
    });
    let s = () => {
            t._x_doHide(), t._x_isShown = !1
        },
        a = () => {
            t._x_doShow(), t._x_isShown = !0
        },
        o = () => setTimeout(a),
        l = Js(u => u ? a() : s(), u => {
            typeof t._x_toggleAndCascadeWithTransitions == "function" ? t._x_toggleAndCascadeWithTransitions(t, u, a, s) : u ? o() : s()
        }),
        c, d = !0;
    n(() => r(u => {
        !d && u === c || (e.includes("immediate") && (u ? o() : s()), l(u), c = u, d = !1)
    }))
});
We("for", (t, {
    expression: e
}, {
    effect: i,
    cleanup: n
}) => {
    let r = Hh(e),
        s = at(t, r.items),
        a = at(t, t._x_keyExpression || "index");
    t._x_prevKeys = [], t._x_lookup = {}, i(() => Rh(t, r, s, a)), n(() => {
        Object.values(t._x_lookup).forEach(o => o.remove()), delete t._x_prevKeys, delete t._x_lookup
    })
});

function Rh(t, e, i, n) {
    let r = a => typeof a == "object" && !Array.isArray(a),
        s = t;
    i(a => {
        zh(a) && a >= 0 && (a = Array.from(Array(a).keys(), p => p + 1)), a === void 0 && (a = []);
        let o = t._x_lookup,
            l = t._x_prevKeys,
            c = [],
            d = [];
        if (r(a)) a = Object.entries(a).map(([p, g]) => {
            let _ = Co(e, g, p, a);
            n(y => d.push(y), {
                scope: {
                    index: p,
                    ..._
                }
            }), c.push(_)
        });
        else
            for (let p = 0; p < a.length; p++) {
                let g = Co(e, a[p], p, a);
                n(_ => d.push(_), {
                    scope: {
                        index: p,
                        ...g
                    }
                }), c.push(g)
            }
        let u = [],
            f = [],
            h = [],
            v = [];
        for (let p = 0; p < l.length; p++) {
            let g = l[p];
            d.indexOf(g) === -1 && h.push(g)
        }
        l = l.filter(p => !h.includes(p));
        let b = "template";
        for (let p = 0; p < d.length; p++) {
            let g = d[p],
                _ = l.indexOf(g);
            if (_ === -1) l.splice(p, 0, g), u.push([b, p]);
            else if (_ !== p) {
                let y = l.splice(p, 1)[0],
                    E = l.splice(_ - 1, 1)[0];
                l.splice(p, 0, E), l.splice(_, 0, y), f.push([y, E])
            } else v.push(g);
            b = g
        }
        for (let p = 0; p < h.length; p++) {
            let g = h[p];
            o[g]._x_effects && o[g]._x_effects.forEach(Dl), o[g].remove(), o[g] = null, delete o[g]
        }
        for (let p = 0; p < f.length; p++) {
            let [g, _] = f[p], y = o[g], E = o[_], q = document.createElement("div");
            tt(() => {
                E.after(q), y.after(E), E._x_currentIfEl && E.after(E._x_currentIfEl), q.before(y), y._x_currentIfEl && y.after(y._x_currentIfEl), q.remove()
            }), yo(E, c[d.indexOf(_)])
        }
        for (let p = 0; p < u.length; p++) {
            let [g, _] = u[p], y = g === "template" ? s : o[g];
            y._x_currentIfEl && (y = y._x_currentIfEl);
            let E = c[_],
                q = d[_],
                P = document.importNode(s.content, !0).firstElementChild;
            qn(P, tn(E), s), tt(() => {
                y.after(P), oi(P)
            }), typeof q == "object" && Yi("x-for key cannot be an object, it must be a string or an integer", s), o[q] = P
        }
        for (let p = 0; p < v.length; p++) yo(o[v[p]], c[d.indexOf(v[p])]);
        s._x_prevKeys = d
    })
}

function Hh(t) {
    let e = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
        i = /^\s*\(|\)\s*$/g,
        n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
        r = t.match(n);
    if (!r) return;
    let s = {};
    s.items = r[2].trim();
    let a = r[1].replace(i, "").trim(),
        o = a.match(e);
    return o ? (s.item = a.replace(e, "").trim(), s.index = o[1].trim(), o[2] && (s.collection = o[2].trim())) : s.item = a, s
}

function Co(t, e, i, n) {
    let r = {};
    return /^\[.*\]$/.test(t.item) && Array.isArray(e) ? t.item.replace("[", "").replace("]", "").split(",").map(a => a.trim()).forEach((a, o) => {
        r[a] = e[o]
    }) : /^\{.*\}$/.test(t.item) && !Array.isArray(e) && typeof e == "object" ? t.item.replace("{", "").replace("}", "").split(",").map(a => a.trim()).forEach(a => {
        r[a] = e[a]
    }) : r[t.item] = e, t.index && (r[t.index] = i), t.collection && (r[t.collection] = n), r
}

function zh(t) {
    return !Array.isArray(t) && !isNaN(t)
}

function Uc() {}
Uc.inline = (t, {
    expression: e
}, {
    cleanup: i
}) => {
    let n = Hr(t);
    n._x_refs || (n._x_refs = {}), n._x_refs[e] = t, i(() => delete n._x_refs[e])
};
We("ref", Uc);
We("if", (t, {
    expression: e
}, {
    effect: i,
    cleanup: n
}) => {
    let r = at(t, e),
        s = () => {
            if (t._x_currentIfEl) return t._x_currentIfEl;
            let o = t.content.cloneNode(!0).firstElementChild;
            return qn(o, {}, t), tt(() => {
                t.after(o), oi(o)
            }), t._x_currentIfEl = o, t._x_undoIf = () => {
                ai(o, l => {
                    l._x_effects && l._x_effects.forEach(Dl)
                }), o.remove(), delete t._x_currentIfEl
            }, o
        },
        a = () => {
            t._x_undoIf && (t._x_undoIf(), delete t._x_undoIf)
        };
    i(() => r(o => {
        o ? s() : a()
    })), n(() => t._x_undoIf && t._x_undoIf())
});
We("id", (t, {
    expression: e
}, {
    evaluate: i
}) => {
    i(e).forEach(r => Ch(t, r))
});
Ea(Ql("@", Jl(rn("on:"))));
We("on", jn((t, {
    value: e,
    modifiers: i,
    expression: n
}, {
    cleanup: r
}) => {
    let s = n ? at(t, n) : () => {};
    t.tagName.toLowerCase() === "template" && (t._x_forwardEvents || (t._x_forwardEvents = []), t._x_forwardEvents.includes(e) || t._x_forwardEvents.push(e));
    let a = ra(t, e, i, o => {
        s(() => {}, {
            scope: {
                $event: o
            },
            params: [o]
        })
    });
    r(() => a())
}));
Gr("Collapse", "collapse", "collapse");
Gr("Intersect", "intersect", "intersect");
Gr("Focus", "trap", "focus");
Gr("Mask", "mask", "mask");

function Gr(t, e, i) {
    We(e, n => Yi(`You can't use [x-${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${i}`, n))
}
Bn.setEvaluator(Gl);
Bn.setReactivityEngine({
    reactive: La,
    effect: Jp,
    release: eh,
    raw: Re
});
var Nh = Bn,
    Dt = Nh;

function Fh(t) {
    t.directive("intersect", (e, {
        value: i,
        expression: n,
        modifiers: r
    }, {
        evaluateLater: s,
        cleanup: a
    }) => {
        let o = s(n),
            l = {
                rootMargin: jh(r),
                threshold: qh(r)
            },
            c = new IntersectionObserver(d => {
                d.forEach(u => {
                    u.isIntersecting !== (i === "leave") && (o(), r.includes("once") && c.disconnect())
                })
            }, l);
        c.observe(e), a(() => {
            c.disconnect()
        })
    })
}

function qh(t) {
    if (t.includes("full")) return .99;
    if (t.includes("half")) return .5;
    if (!t.includes("threshold")) return 0;
    let e = t[t.indexOf("threshold") + 1];
    return e === "100" ? 1 : e === "0" ? 0 : Number(`.${e}`)
}

function Vh(t) {
    let e = t.match(/^(-?[0-9]+)(px|%)?$/);
    return e ? e[1] + (e[2] || "px") : void 0
}

function jh(t) {
    const e = "margin",
        i = "0px 0px 0px 0px",
        n = t.indexOf(e);
    if (n === -1) return i;
    let r = [];
    for (let s = 1; s < 5; s++) r.push(Vh(t[n + s] || ""));
    return r = r.filter(s => s !== void 0), r.length ? r.join(" ").trim() : i
}
var Bh = Fh;

function Zh(t) {
    t.directive("collapse", e), e.inline = (i, {
        modifiers: n
    }) => {
        n.includes("min") && (i._x_doShow = () => {}, i._x_doHide = () => {})
    };

    function e(i, {
        modifiers: n
    }) {
        let r = So(n, "duration", 250) / 1e3,
            s = So(n, "min", 0),
            a = !n.includes("min");
        i._x_isShown || (i.style.height = `${s}px`), !i._x_isShown && a && (i.hidden = !0), i._x_isShown || (i.style.overflow = "hidden");
        let o = (c, d) => {
                let u = t.setStyles(c, d);
                return d.height ? () => {} : u
            },
            l = {
                transitionProperty: "height",
                transitionDuration: `${r}s`,
                transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)"
            };
        i._x_transition = { in (c = () => {}, d = () => {}) {
                a && (i.hidden = !1), a && (i.style.display = null);
                let u = i.getBoundingClientRect().height;
                i.style.height = "auto";
                let f = i.getBoundingClientRect().height;
                u === f && (u = s), t.transition(i, t.setStyles, {
                    during: l,
                    start: {
                        height: u + "px"
                    },
                    end: {
                        height: f + "px"
                    }
                }, () => i._x_isShown = !0, () => {
                    i.getBoundingClientRect().height == f && (i.style.overflow = null)
                })
            },
            out(c = () => {}, d = () => {}) {
                let u = i.getBoundingClientRect().height;
                t.transition(i, o, {
                    during: l,
                    start: {
                        height: u + "px"
                    },
                    end: {
                        height: s + "px"
                    }
                }, () => i.style.overflow = "hidden", () => {
                    i._x_isShown = !1, i.style.height == `${s}px` && a && (i.style.display = "none", i.hidden = !0)
                })
            }
        }
    }
}

function So(t, e, i) {
    if (t.indexOf(e) === -1) return i;
    const n = t[t.indexOf(e) + 1];
    if (!n) return i;
    if (e === "duration") {
        let r = n.match(/([0-9]+)ms/);
        if (r) return r[1]
    }
    if (e === "min") {
        let r = n.match(/([0-9]+)px/);
        if (r) return r[1]
    }
    return n
}
var Wh = Zh;

function Uh(t) {
    let e = () => {
        let i, n = localStorage;
        return t.interceptor((r, s, a, o, l) => {
            let c = i || `_x_${o}`,
                d = To(c, n) ? Mo(c, n) : r;
            return a(d), t.effect(() => {
                let u = s();
                $o(c, u, n), a(u)
            }), d
        }, r => {
            r.as = s => (i = s, r), r.using = s => (n = s, r)
        })
    };
    Object.defineProperty(t, "$persist", {
        get: () => e()
    }), t.magic("persist", e), t.persist = (i, {
        get: n,
        set: r
    }, s = localStorage) => {
        let a = To(i, s) ? Mo(i, s) : n();
        r(a), t.effect(() => {
            let o = n();
            $o(i, o, s), r(o)
        })
    }
}

function To(t, e) {
    return e.getItem(t) !== null
}

function Mo(t, e) {
    return JSON.parse(e.getItem(t, e))
}

function $o(t, e, i) {
    i.setItem(t, JSON.stringify(e))
}
var Gh = Uh,
    Yh = Object.create,
    Ia = Object.defineProperty,
    Xh = Object.getPrototypeOf,
    Kh = Object.prototype.hasOwnProperty,
    Qh = Object.getOwnPropertyNames,
    Jh = Object.getOwnPropertyDescriptor,
    e0 = t => Ia(t, "__esModule", {
        value: !0
    }),
    Gc = (t, e) => () => (e || (e = {
        exports: {}
    }, t(e.exports, e)), e.exports),
    t0 = (t, e, i) => {
        if (e && typeof e == "object" || typeof e == "function")
            for (let n of Qh(e)) !Kh.call(t, n) && n !== "default" && Ia(t, n, {
                get: () => e[n],
                enumerable: !(i = Jh(e, n)) || i.enumerable
            });
        return t
    },
    Yc = t => t0(e0(Ia(t != null ? Yh(Xh(t)) : {}, "default", t && t.__esModule && "default" in t ? {
        get: () => t.default,
        enumerable: !0
    } : {
        value: t,
        enumerable: !0
    })), t),
    i0 = Gc(t => {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });

        function e(w) {
            var m = w.getBoundingClientRect();
            return {
                width: m.width,
                height: m.height,
                top: m.top,
                right: m.right,
                bottom: m.bottom,
                left: m.left,
                x: m.left,
                y: m.top
            }
        }

        function i(w) {
            if (w == null) return window;
            if (w.toString() !== "[object Window]") {
                var m = w.ownerDocument;
                return m && m.defaultView || window
            }
            return w
        }

        function n(w) {
            var m = i(w),
                S = m.pageXOffset,
                R = m.pageYOffset;
            return {
                scrollLeft: S,
                scrollTop: R
            }
        }

        function r(w) {
            var m = i(w).Element;
            return w instanceof m || w instanceof Element
        }

        function s(w) {
            var m = i(w).HTMLElement;
            return w instanceof m || w instanceof HTMLElement
        }

        function a(w) {
            if (typeof ShadowRoot > "u") return !1;
            var m = i(w).ShadowRoot;
            return w instanceof m || w instanceof ShadowRoot
        }

        function o(w) {
            return {
                scrollLeft: w.scrollLeft,
                scrollTop: w.scrollTop
            }
        }

        function l(w) {
            return w === i(w) || !s(w) ? n(w) : o(w)
        }

        function c(w) {
            return w ? (w.nodeName || "").toLowerCase() : null
        }

        function d(w) {
            return ((r(w) ? w.ownerDocument : w.document) || window.document).documentElement
        }

        function u(w) {
            return e(d(w)).left + n(w).scrollLeft
        }

        function f(w) {
            return i(w).getComputedStyle(w)
        }

        function h(w) {
            var m = f(w),
                S = m.overflow,
                R = m.overflowX,
                H = m.overflowY;
            return /auto|scroll|overlay|hidden/.test(S + H + R)
        }

        function v(w, m, S) {
            S === void 0 && (S = !1);
            var R = d(m),
                H = e(w),
                B = s(m),
                X = {
                    scrollLeft: 0,
                    scrollTop: 0
                },
                U = {
                    x: 0,
                    y: 0
                };
            return (B || !B && !S) && ((c(m) !== "body" || h(R)) && (X = l(m)), s(m) ? (U = e(m), U.x += m.clientLeft, U.y += m.clientTop) : R && (U.x = u(R))), {
                x: H.left + X.scrollLeft - U.x,
                y: H.top + X.scrollTop - U.y,
                width: H.width,
                height: H.height
            }
        }

        function b(w) {
            var m = e(w),
                S = w.offsetWidth,
                R = w.offsetHeight;
            return Math.abs(m.width - S) <= 1 && (S = m.width), Math.abs(m.height - R) <= 1 && (R = m.height), {
                x: w.offsetLeft,
                y: w.offsetTop,
                width: S,
                height: R
            }
        }

        function p(w) {
            return c(w) === "html" ? w : w.assignedSlot || w.parentNode || (a(w) ? w.host : null) || d(w)
        }

        function g(w) {
            return ["html", "body", "#document"].indexOf(c(w)) >= 0 ? w.ownerDocument.body : s(w) && h(w) ? w : g(p(w))
        }

        function _(w, m) {
            var S;
            m === void 0 && (m = []);
            var R = g(w),
                H = R === ((S = w.ownerDocument) == null ? void 0 : S.body),
                B = i(R),
                X = H ? [B].concat(B.visualViewport || [], h(R) ? R : []) : R,
                U = m.concat(X);
            return H ? U : U.concat(_(p(X)))
        }

        function y(w) {
            return ["table", "td", "th"].indexOf(c(w)) >= 0
        }

        function E(w) {
            return !s(w) || f(w).position === "fixed" ? null : w.offsetParent
        }

        function q(w) {
            var m = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1,
                S = navigator.userAgent.indexOf("Trident") !== -1;
            if (S && s(w)) {
                var R = f(w);
                if (R.position === "fixed") return null
            }
            for (var H = p(w); s(H) && ["html", "body"].indexOf(c(H)) < 0;) {
                var B = f(H);
                if (B.transform !== "none" || B.perspective !== "none" || B.contain === "paint" || ["transform", "perspective"].indexOf(B.willChange) !== -1 || m && B.willChange === "filter" || m && B.filter && B.filter !== "none") return H;
                H = H.parentNode
            }
            return null
        }

        function P(w) {
            for (var m = i(w), S = E(w); S && y(S) && f(S).position === "static";) S = E(S);
            return S && (c(S) === "html" || c(S) === "body" && f(S).position === "static") ? m : S || q(w) || m
        }
        var z = "top",
            k = "bottom",
            V = "right",
            L = "left",
            M = "auto",
            x = [z, k, V, L],
            D = "start",
            F = "end",
            se = "clippingParents",
            te = "viewport",
            A = "popper",
            G = "reference",
            Z = x.reduce(function(w, m) {
                return w.concat([m + "-" + D, m + "-" + F])
            }, []),
            me = [].concat(x, [M]).reduce(function(w, m) {
                return w.concat([m, m + "-" + D, m + "-" + F])
            }, []),
            _e = "beforeRead",
            Je = "read",
            zt = "afterRead",
            jt = "beforeMain",
            Bt = "main",
            et = "afterMain",
            yt = "beforeWrite",
            Oi = "write",
            di = "afterWrite",
            bt = [_e, Je, zt, jt, Bt, et, yt, Oi, di];

        function ki(w) {
            var m = new Map,
                S = new Set,
                R = [];
            w.forEach(function(B) {
                m.set(B.name, B)
            });

            function H(B) {
                S.add(B.name);
                var X = [].concat(B.requires || [], B.requiresIfExists || []);
                X.forEach(function(U) {
                    if (!S.has(U)) {
                        var J = m.get(U);
                        J && H(J)
                    }
                }), R.push(B)
            }
            return w.forEach(function(B) {
                S.has(B.name) || H(B)
            }), R
        }

        function nt(w) {
            var m = ki(w);
            return bt.reduce(function(S, R) {
                return S.concat(m.filter(function(H) {
                    return H.phase === R
                }))
            }, [])
        }

        function pt(w) {
            var m;
            return function() {
                return m || (m = new Promise(function(S) {
                    Promise.resolve().then(function() {
                        m = void 0, S(w())
                    })
                })), m
            }
        }

        function ot(w) {
            for (var m = arguments.length, S = new Array(m > 1 ? m - 1 : 0), R = 1; R < m; R++) S[R - 1] = arguments[R];
            return [].concat(S).reduce(function(H, B) {
                return H.replace(/%s/, B)
            }, w)
        }
        var lt = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
            ui = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
            Be = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];

        function Xr(w) {
            w.forEach(function(m) {
                Object.keys(m).forEach(function(S) {
                    switch (S) {
                        case "name":
                            typeof m.name != "string" && console.error(ot(lt, String(m.name), '"name"', '"string"', '"' + String(m.name) + '"'));
                            break;
                        case "enabled":
                            typeof m.enabled != "boolean" && console.error(ot(lt, m.name, '"enabled"', '"boolean"', '"' + String(m.enabled) + '"'));
                        case "phase":
                            bt.indexOf(m.phase) < 0 && console.error(ot(lt, m.name, '"phase"', "either " + bt.join(", "), '"' + String(m.phase) + '"'));
                            break;
                        case "fn":
                            typeof m.fn != "function" && console.error(ot(lt, m.name, '"fn"', '"function"', '"' + String(m.fn) + '"'));
                            break;
                        case "effect":
                            typeof m.effect != "function" && console.error(ot(lt, m.name, '"effect"', '"function"', '"' + String(m.fn) + '"'));
                            break;
                        case "requires":
                            Array.isArray(m.requires) || console.error(ot(lt, m.name, '"requires"', '"array"', '"' + String(m.requires) + '"'));
                            break;
                        case "requiresIfExists":
                            Array.isArray(m.requiresIfExists) || console.error(ot(lt, m.name, '"requiresIfExists"', '"array"', '"' + String(m.requiresIfExists) + '"'));
                            break;
                        case "options":
                        case "data":
                            break;
                        default:
                            console.error('PopperJS: an invalid property has been provided to the "' + m.name + '" modifier, valid properties are ' + Be.map(function(R) {
                                return '"' + R + '"'
                            }).join(", ") + '; but "' + S + '" was provided.')
                    }
                    m.requires && m.requires.forEach(function(R) {
                        w.find(function(H) {
                            return H.name === R
                        }) == null && console.error(ot(ui, String(m.name), R, R))
                    })
                })
            })
        }

        function Kr(w, m) {
            var S = new Set;
            return w.filter(function(R) {
                var H = m(R);
                if (!S.has(H)) return S.add(H), !0
            })
        }

        function ct(w) {
            return w.split("-")[0]
        }

        function Qr(w) {
            var m = w.reduce(function(S, R) {
                var H = S[R.name];
                return S[R.name] = H ? Object.assign({}, H, R, {
                    options: Object.assign({}, H.options, R.options),
                    data: Object.assign({}, H.data, R.data)
                }) : R, S
            }, {});
            return Object.keys(m).map(function(S) {
                return m[S]
            })
        }

        function Un(w) {
            var m = i(w),
                S = d(w),
                R = m.visualViewport,
                H = S.clientWidth,
                B = S.clientHeight,
                X = 0,
                U = 0;
            return R && (H = R.width, B = R.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (X = R.offsetLeft, U = R.offsetTop)), {
                width: H,
                height: B,
                x: X + u(w),
                y: U
            }
        }
        var xt = Math.max,
            fi = Math.min,
            Zt = Math.round;

        function Gn(w) {
            var m, S = d(w),
                R = n(w),
                H = (m = w.ownerDocument) == null ? void 0 : m.body,
                B = xt(S.scrollWidth, S.clientWidth, H ? H.scrollWidth : 0, H ? H.clientWidth : 0),
                X = xt(S.scrollHeight, S.clientHeight, H ? H.scrollHeight : 0, H ? H.clientHeight : 0),
                U = -R.scrollLeft + u(w),
                J = -R.scrollTop;
            return f(H || S).direction === "rtl" && (U += xt(S.clientWidth, H ? H.clientWidth : 0) - B), {
                width: B,
                height: X,
                x: U,
                y: J
            }
        }

        function an(w, m) {
            var S = m.getRootNode && m.getRootNode();
            if (w.contains(m)) return !0;
            if (S && a(S)) {
                var R = m;
                do {
                    if (R && w.isSameNode(R)) return !0;
                    R = R.parentNode || R.host
                } while (R)
            }
            return !1
        }

        function Wt(w) {
            return Object.assign({}, w, {
                left: w.x,
                top: w.y,
                right: w.x + w.width,
                bottom: w.y + w.height
            })
        }

        function Yn(w) {
            var m = e(w);
            return m.top = m.top + w.clientTop, m.left = m.left + w.clientLeft, m.bottom = m.top + w.clientHeight, m.right = m.left + w.clientWidth, m.width = w.clientWidth, m.height = w.clientHeight, m.x = m.left, m.y = m.top, m
        }

        function Xn(w, m) {
            return m === te ? Wt(Un(w)) : s(m) ? Yn(m) : Wt(Gn(d(w)))
        }

        function Li(w) {
            var m = _(p(w)),
                S = ["absolute", "fixed"].indexOf(f(w).position) >= 0,
                R = S && s(w) ? P(w) : w;
            return r(R) ? m.filter(function(H) {
                return r(H) && an(H, R) && c(H) !== "body"
            }) : []
        }

        function Ii(w, m, S) {
            var R = m === "clippingParents" ? Li(w) : [].concat(m),
                H = [].concat(R, [S]),
                B = H[0],
                X = H.reduce(function(U, J) {
                    var le = Xn(w, J);
                    return U.top = xt(le.top, U.top), U.right = fi(le.right, U.right), U.bottom = fi(le.bottom, U.bottom), U.left = xt(le.left, U.left), U
                }, Xn(w, B));
            return X.width = X.right - X.left, X.height = X.bottom - X.top, X.x = X.left, X.y = X.top, X
        }

        function pi(w) {
            return w.split("-")[1]
        }

        function wt(w) {
            return ["top", "bottom"].indexOf(w) >= 0 ? "x" : "y"
        }

        function Kn(w) {
            var m = w.reference,
                S = w.element,
                R = w.placement,
                H = R ? ct(R) : null,
                B = R ? pi(R) : null,
                X = m.x + m.width / 2 - S.width / 2,
                U = m.y + m.height / 2 - S.height / 2,
                J;
            switch (H) {
                case z:
                    J = {
                        x: X,
                        y: m.y - S.height
                    };
                    break;
                case k:
                    J = {
                        x: X,
                        y: m.y + m.height
                    };
                    break;
                case V:
                    J = {
                        x: m.x + m.width,
                        y: U
                    };
                    break;
                case L:
                    J = {
                        x: m.x - S.width,
                        y: U
                    };
                    break;
                default:
                    J = {
                        x: m.x,
                        y: m.y
                    }
            }
            var le = H ? wt(H) : null;
            if (le != null) {
                var K = le === "y" ? "height" : "width";
                switch (B) {
                    case D:
                        J[le] = J[le] - (m[K] / 2 - S[K] / 2);
                        break;
                    case F:
                        J[le] = J[le] + (m[K] / 2 - S[K] / 2);
                        break
                }
            }
            return J
        }

        function Qn() {
            return {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }

        function Jn(w) {
            return Object.assign({}, Qn(), w)
        }

        function er(w, m) {
            return m.reduce(function(S, R) {
                return S[R] = w, S
            }, {})
        }

        function Ut(w, m) {
            m === void 0 && (m = {});
            var S = m,
                R = S.placement,
                H = R === void 0 ? w.placement : R,
                B = S.boundary,
                X = B === void 0 ? se : B,
                U = S.rootBoundary,
                J = U === void 0 ? te : U,
                le = S.elementContext,
                K = le === void 0 ? A : le,
                Se = S.altBoundary,
                Ie = Se === void 0 ? !1 : Se,
                Ce = S.padding,
                we = Ce === void 0 ? 0 : Ce,
                Ae = Jn(typeof we != "number" ? we : er(we, x)),
                Ee = K === A ? G : A,
                Ne = w.elements.reference,
                Pe = w.rects.popper,
                Fe = w.elements[Ie ? Ee : K],
                de = Ii(r(Fe) ? Fe : Fe.contextElement || d(w.elements.popper), X, J),
                $e = e(Ne),
                Te = Kn({
                    reference: $e,
                    element: Pe,
                    strategy: "absolute",
                    placement: H
                }),
                De = Wt(Object.assign({}, Pe, Te)),
                Le = K === A ? De : $e,
                je = {
                    top: de.top - Le.top + Ae.top,
                    bottom: Le.bottom - de.bottom + Ae.bottom,
                    left: de.left - Le.left + Ae.left,
                    right: Le.right - de.right + Ae.right
                },
                qe = w.modifiersData.offset;
            if (K === A && qe) {
                var Ve = qe[H];
                Object.keys(je).forEach(function(Tt) {
                    var rt = [V, k].indexOf(Tt) >= 0 ? 1 : -1,
                        Ft = [z, k].indexOf(Tt) >= 0 ? "y" : "x";
                    je[Tt] += Ve[Ft] * rt
                })
            }
            return je
        }
        var tr = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.",
            Jr = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.",
            Di = {
                placement: "bottom",
                modifiers: [],
                strategy: "absolute"
            };

        function hi() {
            for (var w = arguments.length, m = new Array(w), S = 0; S < w; S++) m[S] = arguments[S];
            return !m.some(function(R) {
                return !(R && typeof R.getBoundingClientRect == "function")
            })
        }

        function Ri(w) {
            w === void 0 && (w = {});
            var m = w,
                S = m.defaultModifiers,
                R = S === void 0 ? [] : S,
                H = m.defaultOptions,
                B = H === void 0 ? Di : H;
            return function(U, J, le) {
                le === void 0 && (le = B);
                var K = {
                        placement: "bottom",
                        orderedModifiers: [],
                        options: Object.assign({}, Di, B),
                        modifiersData: {},
                        elements: {
                            reference: U,
                            popper: J
                        },
                        attributes: {},
                        styles: {}
                    },
                    Se = [],
                    Ie = !1,
                    Ce = {
                        state: K,
                        setOptions: function(Ne) {
                            Ae(), K.options = Object.assign({}, B, K.options, Ne), K.scrollParents = {
                                reference: r(U) ? _(U) : U.contextElement ? _(U.contextElement) : [],
                                popper: _(J)
                            };
                            var Pe = nt(Qr([].concat(R, K.options.modifiers)));
                            K.orderedModifiers = Pe.filter(function(qe) {
                                return qe.enabled
                            }); {
                                var Fe = Kr([].concat(Pe, K.options.modifiers), function(qe) {
                                    var Ve = qe.name;
                                    return Ve
                                });
                                if (Xr(Fe), ct(K.options.placement) === M) {
                                    var de = K.orderedModifiers.find(function(qe) {
                                        var Ve = qe.name;
                                        return Ve === "flip"
                                    });
                                    de || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "))
                                }
                                var $e = f(J),
                                    Te = $e.marginTop,
                                    De = $e.marginRight,
                                    Le = $e.marginBottom,
                                    je = $e.marginLeft;
                                [Te, De, Le, je].some(function(qe) {
                                    return parseFloat(qe)
                                }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "))
                            }
                            return we(), Ce.update()
                        },
                        forceUpdate: function() {
                            if (!Ie) {
                                var Ne = K.elements,
                                    Pe = Ne.reference,
                                    Fe = Ne.popper;
                                if (!hi(Pe, Fe)) {
                                    console.error(tr);
                                    return
                                }
                                K.rects = {
                                    reference: v(Pe, P(Fe), K.options.strategy === "fixed"),
                                    popper: b(Fe)
                                }, K.reset = !1, K.placement = K.options.placement, K.orderedModifiers.forEach(function(Ve) {
                                    return K.modifiersData[Ve.name] = Object.assign({}, Ve.data)
                                });
                                for (var de = 0, $e = 0; $e < K.orderedModifiers.length; $e++) {
                                    if (de += 1, de > 100) {
                                        console.error(Jr);
                                        break
                                    }
                                    if (K.reset === !0) {
                                        K.reset = !1, $e = -1;
                                        continue
                                    }
                                    var Te = K.orderedModifiers[$e],
                                        De = Te.fn,
                                        Le = Te.options,
                                        je = Le === void 0 ? {} : Le,
                                        qe = Te.name;
                                    typeof De == "function" && (K = De({
                                        state: K,
                                        options: je,
                                        name: qe,
                                        instance: Ce
                                    }) || K)
                                }
                            }
                        },
                        update: pt(function() {
                            return new Promise(function(Ee) {
                                Ce.forceUpdate(), Ee(K)
                            })
                        }),
                        destroy: function() {
                            Ae(), Ie = !0
                        }
                    };
                if (!hi(U, J)) return console.error(tr), Ce;
                Ce.setOptions(le).then(function(Ee) {
                    !Ie && le.onFirstUpdate && le.onFirstUpdate(Ee)
                });

                function we() {
                    K.orderedModifiers.forEach(function(Ee) {
                        var Ne = Ee.name,
                            Pe = Ee.options,
                            Fe = Pe === void 0 ? {} : Pe,
                            de = Ee.effect;
                        if (typeof de == "function") {
                            var $e = de({
                                    state: K,
                                    name: Ne,
                                    instance: Ce,
                                    options: Fe
                                }),
                                Te = function() {};
                            Se.push($e || Te)
                        }
                    })
                }

                function Ae() {
                    Se.forEach(function(Ee) {
                        return Ee()
                    }), Se = []
                }
                return Ce
            }
        }
        var Hi = {
            passive: !0
        };

        function es(w) {
            var m = w.state,
                S = w.instance,
                R = w.options,
                H = R.scroll,
                B = H === void 0 ? !0 : H,
                X = R.resize,
                U = X === void 0 ? !0 : X,
                J = i(m.elements.popper),
                le = [].concat(m.scrollParents.reference, m.scrollParents.popper);
            return B && le.forEach(function(K) {
                    K.addEventListener("scroll", S.update, Hi)
                }), U && J.addEventListener("resize", S.update, Hi),
                function() {
                    B && le.forEach(function(K) {
                        K.removeEventListener("scroll", S.update, Hi)
                    }), U && J.removeEventListener("resize", S.update, Hi)
                }
        }
        var on = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: es,
            data: {}
        };

        function ts(w) {
            var m = w.state,
                S = w.name;
            m.modifiersData[S] = Kn({
                reference: m.rects.reference,
                element: m.rects.popper,
                strategy: "absolute",
                placement: m.placement
            })
        }
        var ln = {
                name: "popperOffsets",
                enabled: !0,
                phase: "read",
                fn: ts,
                data: {}
            },
            is = {
                top: "auto",
                right: "auto",
                bottom: "auto",
                left: "auto"
            };

        function ns(w) {
            var m = w.x,
                S = w.y,
                R = window,
                H = R.devicePixelRatio || 1;
            return {
                x: Zt(Zt(m * H) / H) || 0,
                y: Zt(Zt(S * H) / H) || 0
            }
        }

        function cn(w) {
            var m, S = w.popper,
                R = w.popperRect,
                H = w.placement,
                B = w.offsets,
                X = w.position,
                U = w.gpuAcceleration,
                J = w.adaptive,
                le = w.roundOffsets,
                K = le === !0 ? ns(B) : typeof le == "function" ? le(B) : B,
                Se = K.x,
                Ie = Se === void 0 ? 0 : Se,
                Ce = K.y,
                we = Ce === void 0 ? 0 : Ce,
                Ae = B.hasOwnProperty("x"),
                Ee = B.hasOwnProperty("y"),
                Ne = L,
                Pe = z,
                Fe = window;
            if (J) {
                var de = P(S),
                    $e = "clientHeight",
                    Te = "clientWidth";
                de === i(S) && (de = d(S), f(de).position !== "static" && ($e = "scrollHeight", Te = "scrollWidth")), de = de, H === z && (Pe = k, we -= de[$e] - R.height, we *= U ? 1 : -1), H === L && (Ne = V, Ie -= de[Te] - R.width, Ie *= U ? 1 : -1)
            }
            var De = Object.assign({
                position: X
            }, J && is);
            if (U) {
                var Le;
                return Object.assign({}, De, (Le = {}, Le[Pe] = Ee ? "0" : "", Le[Ne] = Ae ? "0" : "", Le.transform = (Fe.devicePixelRatio || 1) < 2 ? "translate(" + Ie + "px, " + we + "px)" : "translate3d(" + Ie + "px, " + we + "px, 0)", Le))
            }
            return Object.assign({}, De, (m = {}, m[Pe] = Ee ? we + "px" : "", m[Ne] = Ae ? Ie + "px" : "", m.transform = "", m))
        }

        function C(w) {
            var m = w.state,
                S = w.options,
                R = S.gpuAcceleration,
                H = R === void 0 ? !0 : R,
                B = S.adaptive,
                X = B === void 0 ? !0 : B,
                U = S.roundOffsets,
                J = U === void 0 ? !0 : U; {
                var le = f(m.elements.popper).transitionProperty || "";
                X && ["transform", "top", "right", "bottom", "left"].some(function(Se) {
                    return le.indexOf(Se) >= 0
                }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "))
            }
            var K = {
                placement: ct(m.placement),
                popper: m.elements.popper,
                popperRect: m.rects.popper,
                gpuAcceleration: H
            };
            m.modifiersData.popperOffsets != null && (m.styles.popper = Object.assign({}, m.styles.popper, cn(Object.assign({}, K, {
                offsets: m.modifiersData.popperOffsets,
                position: m.options.strategy,
                adaptive: X,
                roundOffsets: J
            })))), m.modifiersData.arrow != null && (m.styles.arrow = Object.assign({}, m.styles.arrow, cn(Object.assign({}, K, {
                offsets: m.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: J
            })))), m.attributes.popper = Object.assign({}, m.attributes.popper, {
                "data-popper-placement": m.placement
            })
        }
        var T = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: C,
            data: {}
        };

        function O(w) {
            var m = w.state;
            Object.keys(m.elements).forEach(function(S) {
                var R = m.styles[S] || {},
                    H = m.attributes[S] || {},
                    B = m.elements[S];
                !s(B) || !c(B) || (Object.assign(B.style, R), Object.keys(H).forEach(function(X) {
                    var U = H[X];
                    U === !1 ? B.removeAttribute(X) : B.setAttribute(X, U === !0 ? "" : U)
                }))
            })
        }

        function j(w) {
            var m = w.state,
                S = {
                    popper: {
                        position: m.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
            return Object.assign(m.elements.popper.style, S.popper), m.styles = S, m.elements.arrow && Object.assign(m.elements.arrow.style, S.arrow),
                function() {
                    Object.keys(m.elements).forEach(function(R) {
                        var H = m.elements[R],
                            B = m.attributes[R] || {},
                            X = Object.keys(m.styles.hasOwnProperty(R) ? m.styles[R] : S[R]),
                            U = X.reduce(function(J, le) {
                                return J[le] = "", J
                            }, {});
                        !s(H) || !c(H) || (Object.assign(H.style, U), Object.keys(B).forEach(function(J) {
                            H.removeAttribute(J)
                        }))
                    })
                }
        }
        var Q = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: O,
            effect: j,
            requires: ["computeStyles"]
        };

        function Y(w, m, S) {
            var R = ct(w),
                H = [L, z].indexOf(R) >= 0 ? -1 : 1,
                B = typeof S == "function" ? S(Object.assign({}, m, {
                    placement: w
                })) : S,
                X = B[0],
                U = B[1];
            return X = X || 0, U = (U || 0) * H, [L, V].indexOf(R) >= 0 ? {
                x: U,
                y: X
            } : {
                x: X,
                y: U
            }
        }

        function W(w) {
            var m = w.state,
                S = w.options,
                R = w.name,
                H = S.offset,
                B = H === void 0 ? [0, 0] : H,
                X = me.reduce(function(K, Se) {
                    return K[Se] = Y(Se, m.rects, B), K
                }, {}),
                U = X[m.placement],
                J = U.x,
                le = U.y;
            m.modifiersData.popperOffsets != null && (m.modifiersData.popperOffsets.x += J, m.modifiersData.popperOffsets.y += le), m.modifiersData[R] = X
        }
        var ve = {
                name: "offset",
                enabled: !0,
                phase: "main",
                requires: ["popperOffsets"],
                fn: W
            },
            ce = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            };

        function fe(w) {
            return w.replace(/left|right|bottom|top/g, function(m) {
                return ce[m]
            })
        }
        var ye = {
            start: "end",
            end: "start"
        };

        function Me(w) {
            return w.replace(/start|end/g, function(m) {
                return ye[m]
            })
        }

        function ze(w, m) {
            m === void 0 && (m = {});
            var S = m,
                R = S.placement,
                H = S.boundary,
                B = S.rootBoundary,
                X = S.padding,
                U = S.flipVariations,
                J = S.allowedAutoPlacements,
                le = J === void 0 ? me : J,
                K = pi(R),
                Se = K ? U ? Z : Z.filter(function(we) {
                    return pi(we) === K
                }) : x,
                Ie = Se.filter(function(we) {
                    return le.indexOf(we) >= 0
                });
            Ie.length === 0 && (Ie = Se, console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
            var Ce = Ie.reduce(function(we, Ae) {
                return we[Ae] = Ut(w, {
                    placement: Ae,
                    boundary: H,
                    rootBoundary: B,
                    padding: X
                })[ct(Ae)], we
            }, {});
            return Object.keys(Ce).sort(function(we, Ae) {
                return Ce[we] - Ce[Ae]
            })
        }

        function xe(w) {
            if (ct(w) === M) return [];
            var m = fe(w);
            return [Me(w), m, Me(m)]
        }

        function ke(w) {
            var m = w.state,
                S = w.options,
                R = w.name;
            if (!m.modifiersData[R]._skip) {
                for (var H = S.mainAxis, B = H === void 0 ? !0 : H, X = S.altAxis, U = X === void 0 ? !0 : X, J = S.fallbackPlacements, le = S.padding, K = S.boundary, Se = S.rootBoundary, Ie = S.altBoundary, Ce = S.flipVariations, we = Ce === void 0 ? !0 : Ce, Ae = S.allowedAutoPlacements, Ee = m.options.placement, Ne = ct(Ee), Pe = Ne === Ee, Fe = J || (Pe || !we ? [fe(Ee)] : xe(Ee)), de = [Ee].concat(Fe).reduce(function(re, ge) {
                        return re.concat(ct(ge) === M ? ze(m, {
                            placement: ge,
                            boundary: K,
                            rootBoundary: Se,
                            padding: le,
                            flipVariations: we,
                            allowedAutoPlacements: Ae
                        }) : ge)
                    }, []), $e = m.rects.reference, Te = m.rects.popper, De = new Map, Le = !0, je = de[0], qe = 0; qe < de.length; qe++) {
                    var Ve = de[qe],
                        Tt = ct(Ve),
                        rt = pi(Ve) === D,
                        Ft = [z, k].indexOf(Tt) >= 0,
                        gi = Ft ? "width" : "height",
                        Kt = Ut(m, {
                            placement: Ve,
                            boundary: K,
                            rootBoundary: Se,
                            altBoundary: Ie,
                            padding: le
                        }),
                        qt = Ft ? rt ? V : L : rt ? k : z;
                    $e[gi] > Te[gi] && (qt = fe(qt));
                    var dn = fe(qt),
                        Qt = [];
                    if (B && Qt.push(Kt[Tt] <= 0), U && Qt.push(Kt[qt] <= 0, Kt[dn] <= 0), Qt.every(function(re) {
                            return re
                        })) {
                        je = Ve, Le = !1;
                        break
                    }
                    De.set(Ve, Qt)
                }
                if (Le)
                    for (var zi = we ? 3 : 1, un = function(ge) {
                            var be = de.find(function(Ge) {
                                var Ye = De.get(Ge);
                                if (Ye) return Ye.slice(0, ge).every(function(Pt) {
                                    return Pt
                                })
                            });
                            if (be) return je = be, "break"
                        }, I = zi; I > 0; I--) {
                        var ee = un(I);
                        if (ee === "break") break
                    }
                m.placement !== je && (m.modifiersData[R]._skip = !0, m.placement = je, m.reset = !0)
            }
        }
        var ae = {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: ke,
            requiresIfExists: ["offset"],
            data: {
                _skip: !1
            }
        };

        function pe(w) {
            return w === "x" ? "y" : "x"
        }

        function he(w, m, S) {
            return xt(w, fi(m, S))
        }

        function ne(w) {
            var m = w.state,
                S = w.options,
                R = w.name,
                H = S.mainAxis,
                B = H === void 0 ? !0 : H,
                X = S.altAxis,
                U = X === void 0 ? !1 : X,
                J = S.boundary,
                le = S.rootBoundary,
                K = S.altBoundary,
                Se = S.padding,
                Ie = S.tether,
                Ce = Ie === void 0 ? !0 : Ie,
                we = S.tetherOffset,
                Ae = we === void 0 ? 0 : we,
                Ee = Ut(m, {
                    boundary: J,
                    rootBoundary: le,
                    padding: Se,
                    altBoundary: K
                }),
                Ne = ct(m.placement),
                Pe = pi(m.placement),
                Fe = !Pe,
                de = wt(Ne),
                $e = pe(de),
                Te = m.modifiersData.popperOffsets,
                De = m.rects.reference,
                Le = m.rects.popper,
                je = typeof Ae == "function" ? Ae(Object.assign({}, m.rects, {
                    placement: m.placement
                })) : Ae,
                qe = {
                    x: 0,
                    y: 0
                };
            if (Te) {
                if (B || U) {
                    var Ve = de === "y" ? z : L,
                        Tt = de === "y" ? k : V,
                        rt = de === "y" ? "height" : "width",
                        Ft = Te[de],
                        gi = Te[de] + Ee[Ve],
                        Kt = Te[de] - Ee[Tt],
                        qt = Ce ? -Le[rt] / 2 : 0,
                        dn = Pe === D ? De[rt] : Le[rt],
                        Qt = Pe === D ? -Le[rt] : -De[rt],
                        zi = m.elements.arrow,
                        un = Ce && zi ? b(zi) : {
                            width: 0,
                            height: 0
                        },
                        I = m.modifiersData["arrow#persistent"] ? m.modifiersData["arrow#persistent"].padding : Qn(),
                        ee = I[Ve],
                        re = I[Tt],
                        ge = he(0, De[rt], un[rt]),
                        be = Fe ? De[rt] / 2 - qt - ge - ee - je : dn - ge - ee - je,
                        Ge = Fe ? -De[rt] / 2 + qt + ge + re + je : Qt + ge + re + je,
                        Ye = m.elements.arrow && P(m.elements.arrow),
                        Pt = Ye ? de === "y" ? Ye.clientTop || 0 : Ye.clientLeft || 0 : 0,
                        fn = m.modifiersData.offset ? m.modifiersData.offset[m.placement][de] : 0,
                        Ot = Te[de] + be - fn - Pt,
                        Ni = Te[de] + Ge - fn;
                    if (B) {
                        var vi = he(Ce ? fi(gi, Ot) : gi, Ft, Ce ? xt(Kt, Ni) : Kt);
                        Te[de] = vi, qe[de] = vi - Ft
                    }
                    if (U) {
                        var Jt = de === "x" ? z : L,
                            rs = de === "x" ? k : V,
                            ei = Te[$e],
                            yi = ei + Ee[Jt],
                            Ha = ei - Ee[rs],
                            za = he(Ce ? fi(yi, Ot) : yi, ei, Ce ? xt(Ha, Ni) : Ha);
                        Te[$e] = za, qe[$e] = za - ei
                    }
                }
                m.modifiersData[R] = qe
            }
        }
        var oe = {
                name: "preventOverflow",
                enabled: !0,
                phase: "main",
                fn: ne,
                requiresIfExists: ["offset"]
            },
            $ = function(m, S) {
                return m = typeof m == "function" ? m(Object.assign({}, S.rects, {
                    placement: S.placement
                })) : m, Jn(typeof m != "number" ? m : er(m, x))
            };

        function Ue(w) {
            var m, S = w.state,
                R = w.name,
                H = w.options,
                B = S.elements.arrow,
                X = S.modifiersData.popperOffsets,
                U = ct(S.placement),
                J = wt(U),
                le = [L, V].indexOf(U) >= 0,
                K = le ? "height" : "width";
            if (!(!B || !X)) {
                var Se = $(H.padding, S),
                    Ie = b(B),
                    Ce = J === "y" ? z : L,
                    we = J === "y" ? k : V,
                    Ae = S.rects.reference[K] + S.rects.reference[J] - X[J] - S.rects.popper[K],
                    Ee = X[J] - S.rects.reference[J],
                    Ne = P(B),
                    Pe = Ne ? J === "y" ? Ne.clientHeight || 0 : Ne.clientWidth || 0 : 0,
                    Fe = Ae / 2 - Ee / 2,
                    de = Se[Ce],
                    $e = Pe - Ie[K] - Se[we],
                    Te = Pe / 2 - Ie[K] / 2 + Fe,
                    De = he(de, Te, $e),
                    Le = J;
                S.modifiersData[R] = (m = {}, m[Le] = De, m.centerOffset = De - Te, m)
            }
        }

        function ue(w) {
            var m = w.state,
                S = w.options,
                R = S.element,
                H = R === void 0 ? "[data-popper-arrow]" : R;
            if (H != null && !(typeof H == "string" && (H = m.elements.popper.querySelector(H), !H))) {
                if (s(H) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" ")), !an(m.elements.popper, H)) {
                    console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
                    return
                }
                m.elements.arrow = H
            }
        }
        var Nt = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: Ue,
            effect: ue,
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        };

        function Ct(w, m, S) {
            return S === void 0 && (S = {
                x: 0,
                y: 0
            }), {
                top: w.top - m.height - S.y,
                right: w.right - m.width + S.x,
                bottom: w.bottom - m.height + S.y,
                left: w.left - m.width - S.x
            }
        }

        function Gt(w) {
            return [z, V, k, L].some(function(m) {
                return w[m] >= 0
            })
        }

        function Yt(w) {
            var m = w.state,
                S = w.name,
                R = m.rects.reference,
                H = m.rects.popper,
                B = m.modifiersData.preventOverflow,
                X = Ut(m, {
                    elementContext: "reference"
                }),
                U = Ut(m, {
                    altBoundary: !0
                }),
                J = Ct(X, R),
                le = Ct(U, H, B),
                K = Gt(J),
                Se = Gt(le);
            m.modifiersData[S] = {
                referenceClippingOffsets: J,
                popperEscapeOffsets: le,
                isReferenceHidden: K,
                hasPopperEscaped: Se
            }, m.attributes.popper = Object.assign({}, m.attributes.popper, {
                "data-popper-reference-hidden": K,
                "data-popper-escaped": Se
            })
        }
        var Xt = {
                name: "hide",
                enabled: !0,
                phase: "main",
                requiresIfExists: ["preventOverflow"],
                fn: Yt
            },
            st = [on, ln, T, Q],
            ht = Ri({
                defaultModifiers: st
            }),
            St = [on, ln, T, Q, ve, ae, oe, Nt, Xt],
            mi = Ri({
                defaultModifiers: St
            });
        t.applyStyles = Q, t.arrow = Nt, t.computeStyles = T, t.createPopper = mi, t.createPopperLite = ht, t.defaultModifiers = St, t.detectOverflow = Ut, t.eventListeners = on, t.flip = ae, t.hide = Xt, t.offset = ve, t.popperGenerator = Ri, t.popperOffsets = ln, t.preventOverflow = oe
    }),
    Xc = Gc(t => {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var e = i0(),
            i = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>',
            n = "tippy-box",
            r = "tippy-content",
            s = "tippy-backdrop",
            a = "tippy-arrow",
            o = "tippy-svg-arrow",
            l = {
                passive: !0,
                capture: !0
            };

        function c(C, T) {
            return {}.hasOwnProperty.call(C, T)
        }

        function d(C, T, O) {
            if (Array.isArray(C)) {
                var j = C[T];
                return j ? ? (Array.isArray(O) ? O[T] : O)
            }
            return C
        }

        function u(C, T) {
            var O = {}.toString.call(C);
            return O.indexOf("[object") === 0 && O.indexOf(T + "]") > -1
        }

        function f(C, T) {
            return typeof C == "function" ? C.apply(void 0, T) : C
        }

        function h(C, T) {
            if (T === 0) return C;
            var O;
            return function(j) {
                clearTimeout(O), O = setTimeout(function() {
                    C(j)
                }, T)
            }
        }

        function v(C, T) {
            var O = Object.assign({}, C);
            return T.forEach(function(j) {
                delete O[j]
            }), O
        }

        function b(C) {
            return C.split(/\s+/).filter(Boolean)
        }

        function p(C) {
            return [].concat(C)
        }

        function g(C, T) {
            C.indexOf(T) === -1 && C.push(T)
        }

        function _(C) {
            return C.filter(function(T, O) {
                return C.indexOf(T) === O
            })
        }

        function y(C) {
            return C.split("-")[0]
        }

        function E(C) {
            return [].slice.call(C)
        }

        function q(C) {
            return Object.keys(C).reduce(function(T, O) {
                return C[O] !== void 0 && (T[O] = C[O]), T
            }, {})
        }

        function P() {
            return document.createElement("div")
        }

        function z(C) {
            return ["Element", "Fragment"].some(function(T) {
                return u(C, T)
            })
        }

        function k(C) {
            return u(C, "NodeList")
        }

        function V(C) {
            return u(C, "MouseEvent")
        }

        function L(C) {
            return !!(C && C._tippy && C._tippy.reference === C)
        }

        function M(C) {
            return z(C) ? [C] : k(C) ? E(C) : Array.isArray(C) ? C : E(document.querySelectorAll(C))
        }

        function x(C, T) {
            C.forEach(function(O) {
                O && (O.style.transitionDuration = T + "ms")
            })
        }

        function D(C, T) {
            C.forEach(function(O) {
                O && O.setAttribute("data-state", T)
            })
        }

        function F(C) {
            var T, O = p(C),
                j = O[0];
            return !(j == null || (T = j.ownerDocument) == null) && T.body ? j.ownerDocument : document
        }

        function se(C, T) {
            var O = T.clientX,
                j = T.clientY;
            return C.every(function(Q) {
                var Y = Q.popperRect,
                    W = Q.popperState,
                    ve = Q.props,
                    ce = ve.interactiveBorder,
                    fe = y(W.placement),
                    ye = W.modifiersData.offset;
                if (!ye) return !0;
                var Me = fe === "bottom" ? ye.top.y : 0,
                    ze = fe === "top" ? ye.bottom.y : 0,
                    xe = fe === "right" ? ye.left.x : 0,
                    ke = fe === "left" ? ye.right.x : 0,
                    ae = Y.top - j + Me > ce,
                    pe = j - Y.bottom - ze > ce,
                    he = Y.left - O + xe > ce,
                    ne = O - Y.right - ke > ce;
                return ae || pe || he || ne
            })
        }

        function te(C, T, O) {
            var j = T + "EventListener";
            ["transitionend", "webkitTransitionEnd"].forEach(function(Q) {
                C[j](Q, O)
            })
        }
        var A = {
                isTouch: !1
            },
            G = 0;

        function Z() {
            A.isTouch || (A.isTouch = !0, window.performance && document.addEventListener("mousemove", me))
        }

        function me() {
            var C = performance.now();
            C - G < 20 && (A.isTouch = !1, document.removeEventListener("mousemove", me)), G = C
        }

        function _e() {
            var C = document.activeElement;
            if (L(C)) {
                var T = C._tippy;
                C.blur && !T.state.isVisible && C.blur()
            }
        }

        function Je() {
            document.addEventListener("touchstart", Z, l), window.addEventListener("blur", _e)
        }
        var zt = typeof window < "u" && typeof document < "u",
            jt = zt ? navigator.userAgent : "",
            Bt = /MSIE |Trident\//.test(jt);

        function et(C) {
            var T = C === "destroy" ? "n already-" : " ";
            return [C + "() was called on a" + T + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ")
        }

        function yt(C) {
            var T = /[ \t]{2,}/g,
                O = /^[ \t]*/gm;
            return C.replace(T, " ").replace(O, "").trim()
        }

        function Oi(C) {
            return yt(`
  %ctippy.js

  %c` + yt(C) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `)
        }

        function di(C) {
            return [Oi(C), "color: #00C584; font-size: 1.3em; font-weight: bold;", "line-height: 1.5", "color: #a6a095;"]
        }
        var bt;
        ki();

        function ki() {
            bt = new Set
        }

        function nt(C, T) {
            if (C && !bt.has(T)) {
                var O;
                bt.add(T), (O = console).warn.apply(O, di(T))
            }
        }

        function pt(C, T) {
            if (C && !bt.has(T)) {
                var O;
                bt.add(T), (O = console).error.apply(O, di(T))
            }
        }

        function ot(C) {
            var T = !C,
                O = Object.prototype.toString.call(C) === "[object Object]" && !C.addEventListener;
            pt(T, ["tippy() was passed", "`" + String(C) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), pt(O, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "))
        }
        var lt = {
                animateFill: !1,
                followCursor: !1,
                inlinePositioning: !1,
                sticky: !1
            },
            ui = {
                allowHTML: !1,
                animation: "fade",
                arrow: !0,
                content: "",
                inertia: !1,
                maxWidth: 350,
                role: "tooltip",
                theme: "",
                zIndex: 9999
            },
            Be = Object.assign({
                appendTo: function() {
                    return document.body
                },
                aria: {
                    content: "auto",
                    expanded: "auto"
                },
                delay: 0,
                duration: [300, 250],
                getReferenceClientRect: null,
                hideOnClick: !0,
                ignoreAttributes: !1,
                interactive: !1,
                interactiveBorder: 2,
                interactiveDebounce: 0,
                moveTransition: "",
                offset: [0, 10],
                onAfterUpdate: function() {},
                onBeforeUpdate: function() {},
                onCreate: function() {},
                onDestroy: function() {},
                onHidden: function() {},
                onHide: function() {},
                onMount: function() {},
                onShow: function() {},
                onShown: function() {},
                onTrigger: function() {},
                onUntrigger: function() {},
                onClickOutside: function() {},
                placement: "top",
                plugins: [],
                popperOptions: {},
                render: null,
                showOnCreate: !1,
                touch: !0,
                trigger: "mouseenter focus",
                triggerTarget: null
            }, lt, {}, ui),
            Xr = Object.keys(Be),
            Kr = function(T) {
                xt(T, []);
                var O = Object.keys(T);
                O.forEach(function(j) {
                    Be[j] = T[j]
                })
            };

        function ct(C) {
            var T = C.plugins || [],
                O = T.reduce(function(j, Q) {
                    var Y = Q.name,
                        W = Q.defaultValue;
                    return Y && (j[Y] = C[Y] !== void 0 ? C[Y] : W), j
                }, {});
            return Object.assign({}, C, {}, O)
        }

        function Qr(C, T) {
            var O = T ? Object.keys(ct(Object.assign({}, Be, {
                    plugins: T
                }))) : Xr,
                j = O.reduce(function(Q, Y) {
                    var W = (C.getAttribute("data-tippy-" + Y) || "").trim();
                    if (!W) return Q;
                    if (Y === "content") Q[Y] = W;
                    else try {
                        Q[Y] = JSON.parse(W)
                    } catch {
                        Q[Y] = W
                    }
                    return Q
                }, {});
            return j
        }

        function Un(C, T) {
            var O = Object.assign({}, T, {
                content: f(T.content, [C])
            }, T.ignoreAttributes ? {} : Qr(C, T.plugins));
            return O.aria = Object.assign({}, Be.aria, {}, O.aria), O.aria = {
                expanded: O.aria.expanded === "auto" ? T.interactive : O.aria.expanded,
                content: O.aria.content === "auto" ? T.interactive ? null : "describedby" : O.aria.content
            }, O
        }

        function xt(C, T) {
            C === void 0 && (C = {}), T === void 0 && (T = []);
            var O = Object.keys(C);
            O.forEach(function(j) {
                var Q = v(Be, Object.keys(lt)),
                    Y = !c(Q, j);
                Y && (Y = T.filter(function(W) {
                    return W.name === j
                }).length === 0), nt(Y, ["`" + j + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "))
            })
        }
        var fi = function() {
            return "innerHTML"
        };

        function Zt(C, T) {
            C[fi()] = T
        }

        function Gn(C) {
            var T = P();
            return C === !0 ? T.className = a : (T.className = o, z(C) ? T.appendChild(C) : Zt(T, C)), T
        }

        function an(C, T) {
            z(T.content) ? (Zt(C, ""), C.appendChild(T.content)) : typeof T.content != "function" && (T.allowHTML ? Zt(C, T.content) : C.textContent = T.content)
        }

        function Wt(C) {
            var T = C.firstElementChild,
                O = E(T.children);
            return {
                box: T,
                content: O.find(function(j) {
                    return j.classList.contains(r)
                }),
                arrow: O.find(function(j) {
                    return j.classList.contains(a) || j.classList.contains(o)
                }),
                backdrop: O.find(function(j) {
                    return j.classList.contains(s)
                })
            }
        }

        function Yn(C) {
            var T = P(),
                O = P();
            O.className = n, O.setAttribute("data-state", "hidden"), O.setAttribute("tabindex", "-1");
            var j = P();
            j.className = r, j.setAttribute("data-state", "hidden"), an(j, C.props), T.appendChild(O), O.appendChild(j), Q(C.props, C.props);

            function Q(Y, W) {
                var ve = Wt(T),
                    ce = ve.box,
                    fe = ve.content,
                    ye = ve.arrow;
                W.theme ? ce.setAttribute("data-theme", W.theme) : ce.removeAttribute("data-theme"), typeof W.animation == "string" ? ce.setAttribute("data-animation", W.animation) : ce.removeAttribute("data-animation"), W.inertia ? ce.setAttribute("data-inertia", "") : ce.removeAttribute("data-inertia"), ce.style.maxWidth = typeof W.maxWidth == "number" ? W.maxWidth + "px" : W.maxWidth, W.role ? ce.setAttribute("role", W.role) : ce.removeAttribute("role"), (Y.content !== W.content || Y.allowHTML !== W.allowHTML) && an(fe, C.props), W.arrow ? ye ? Y.arrow !== W.arrow && (ce.removeChild(ye), ce.appendChild(Gn(W.arrow))) : ce.appendChild(Gn(W.arrow)) : ye && ce.removeChild(ye)
            }
            return {
                popper: T,
                onUpdate: Q
            }
        }
        Yn.$$tippy = !0;
        var Xn = 1,
            Li = [],
            Ii = [];

        function pi(C, T) {
            var O = Un(C, Object.assign({}, Be, {}, ct(q(T)))),
                j, Q, Y, W = !1,
                ve = !1,
                ce = !1,
                fe = !1,
                ye, Me, ze, xe = [],
                ke = h(Pe, O.interactiveDebounce),
                ae, pe = Xn++,
                he = null,
                ne = _(O.plugins),
                oe = {
                    isEnabled: !0,
                    isVisible: !1,
                    isDestroyed: !1,
                    isMounted: !1,
                    isShown: !1
                },
                $ = {
                    id: pe,
                    reference: C,
                    popper: P(),
                    popperInstance: he,
                    props: O,
                    state: oe,
                    plugins: ne,
                    clearDelayTimeouts: Ft,
                    setProps: gi,
                    setContent: Kt,
                    show: qt,
                    hide: dn,
                    hideWithInteractivity: Qt,
                    enable: Tt,
                    disable: rt,
                    unmount: zi,
                    destroy: un
                };
            if (!O.render) return pt(!0, "render() function has not been supplied."), $;
            var Ue = O.render($),
                ue = Ue.popper,
                Nt = Ue.onUpdate;
            ue.setAttribute("data-tippy-root", ""), ue.id = "tippy-" + $.id, $.popper = ue, C._tippy = $, ue._tippy = $;
            var Ct = ne.map(function(I) {
                    return I.fn($)
                }),
                Gt = C.hasAttribute("aria-expanded");
            return Ae(), H(), m(), S("onCreate", [$]), O.showOnCreate && qe(), ue.addEventListener("mouseenter", function() {
                $.props.interactive && $.state.isVisible && $.clearDelayTimeouts()
            }), ue.addEventListener("mouseleave", function(I) {
                $.props.interactive && $.props.trigger.indexOf("mouseenter") >= 0 && (St().addEventListener("mousemove", ke), ke(I))
            }), $;

            function Yt() {
                var I = $.props.touch;
                return Array.isArray(I) ? I : [I, 0]
            }

            function Xt() {
                return Yt()[0] === "hold"
            }

            function st() {
                var I;
                return !!((I = $.props.render) != null && I.$$tippy)
            }

            function ht() {
                return ae || C
            }

            function St() {
                var I = ht().parentNode;
                return I ? F(I) : document
            }

            function mi() {
                return Wt(ue)
            }

            function w(I) {
                return $.state.isMounted && !$.state.isVisible || A.isTouch || ye && ye.type === "focus" ? 0 : d($.props.delay, I ? 0 : 1, Be.delay)
            }

            function m() {
                ue.style.pointerEvents = $.props.interactive && $.state.isVisible ? "" : "none", ue.style.zIndex = "" + $.props.zIndex
            }

            function S(I, ee, re) {
                if (re === void 0 && (re = !0), Ct.forEach(function(be) {
                        be[I] && be[I].apply(void 0, ee)
                    }), re) {
                    var ge;
                    (ge = $.props)[I].apply(ge, ee)
                }
            }

            function R() {
                var I = $.props.aria;
                if (I.content) {
                    var ee = "aria-" + I.content,
                        re = ue.id,
                        ge = p($.props.triggerTarget || C);
                    ge.forEach(function(be) {
                        var Ge = be.getAttribute(ee);
                        if ($.state.isVisible) be.setAttribute(ee, Ge ? Ge + " " + re : re);
                        else {
                            var Ye = Ge && Ge.replace(re, "").trim();
                            Ye ? be.setAttribute(ee, Ye) : be.removeAttribute(ee)
                        }
                    })
                }
            }

            function H() {
                if (!(Gt || !$.props.aria.expanded)) {
                    var I = p($.props.triggerTarget || C);
                    I.forEach(function(ee) {
                        $.props.interactive ? ee.setAttribute("aria-expanded", $.state.isVisible && ee === ht() ? "true" : "false") : ee.removeAttribute("aria-expanded")
                    })
                }
            }

            function B() {
                St().removeEventListener("mousemove", ke), Li = Li.filter(function(I) {
                    return I !== ke
                })
            }

            function X(I) {
                if (!(A.isTouch && (ce || I.type === "mousedown")) && !($.props.interactive && ue.contains(I.target))) {
                    if (ht().contains(I.target)) {
                        if (A.isTouch || $.state.isVisible && $.props.trigger.indexOf("click") >= 0) return
                    } else S("onClickOutside", [$, I]);
                    $.props.hideOnClick === !0 && ($.clearDelayTimeouts(), $.hide(), ve = !0, setTimeout(function() {
                        ve = !1
                    }), $.state.isMounted || K())
                }
            }

            function U() {
                ce = !0
            }

            function J() {
                ce = !1
            }

            function le() {
                var I = St();
                I.addEventListener("mousedown", X, !0), I.addEventListener("touchend", X, l), I.addEventListener("touchstart", J, l), I.addEventListener("touchmove", U, l)
            }

            function K() {
                var I = St();
                I.removeEventListener("mousedown", X, !0), I.removeEventListener("touchend", X, l), I.removeEventListener("touchstart", J, l), I.removeEventListener("touchmove", U, l)
            }

            function Se(I, ee) {
                Ce(I, function() {
                    !$.state.isVisible && ue.parentNode && ue.parentNode.contains(ue) && ee()
                })
            }

            function Ie(I, ee) {
                Ce(I, ee)
            }

            function Ce(I, ee) {
                var re = mi().box;

                function ge(be) {
                    be.target === re && (te(re, "remove", ge), ee())
                }
                if (I === 0) return ee();
                te(re, "remove", Me), te(re, "add", ge), Me = ge
            }

            function we(I, ee, re) {
                re === void 0 && (re = !1);
                var ge = p($.props.triggerTarget || C);
                ge.forEach(function(be) {
                    be.addEventListener(I, ee, re), xe.push({
                        node: be,
                        eventType: I,
                        handler: ee,
                        options: re
                    })
                })
            }

            function Ae() {
                Xt() && (we("touchstart", Ne, {
                    passive: !0
                }), we("touchend", Fe, {
                    passive: !0
                })), b($.props.trigger).forEach(function(I) {
                    if (I !== "manual") switch (we(I, Ne), I) {
                        case "mouseenter":
                            we("mouseleave", Fe);
                            break;
                        case "focus":
                            we(Bt ? "focusout" : "blur", de);
                            break;
                        case "focusin":
                            we("focusout", de);
                            break
                    }
                })
            }

            function Ee() {
                xe.forEach(function(I) {
                    var ee = I.node,
                        re = I.eventType,
                        ge = I.handler,
                        be = I.options;
                    ee.removeEventListener(re, ge, be)
                }), xe = []
            }

            function Ne(I) {
                var ee, re = !1;
                if (!(!$.state.isEnabled || $e(I) || ve)) {
                    var ge = ((ee = ye) == null ? void 0 : ee.type) === "focus";
                    ye = I, ae = I.currentTarget, H(), !$.state.isVisible && V(I) && Li.forEach(function(be) {
                        return be(I)
                    }), I.type === "click" && ($.props.trigger.indexOf("mouseenter") < 0 || W) && $.props.hideOnClick !== !1 && $.state.isVisible ? re = !0 : qe(I), I.type === "click" && (W = !re), re && !ge && Ve(I)
                }
            }

            function Pe(I) {
                var ee = I.target,
                    re = ht().contains(ee) || ue.contains(ee);
                if (!(I.type === "mousemove" && re)) {
                    var ge = je().concat(ue).map(function(be) {
                        var Ge, Ye = be._tippy,
                            Pt = (Ge = Ye.popperInstance) == null ? void 0 : Ge.state;
                        return Pt ? {
                            popperRect: be.getBoundingClientRect(),
                            popperState: Pt,
                            props: O
                        } : null
                    }).filter(Boolean);
                    se(ge, I) && (B(), Ve(I))
                }
            }

            function Fe(I) {
                var ee = $e(I) || $.props.trigger.indexOf("click") >= 0 && W;
                if (!ee) {
                    if ($.props.interactive) {
                        $.hideWithInteractivity(I);
                        return
                    }
                    Ve(I)
                }
            }

            function de(I) {
                $.props.trigger.indexOf("focusin") < 0 && I.target !== ht() || $.props.interactive && I.relatedTarget && ue.contains(I.relatedTarget) || Ve(I)
            }

            function $e(I) {
                return A.isTouch ? Xt() !== I.type.indexOf("touch") >= 0 : !1
            }

            function Te() {
                De();
                var I = $.props,
                    ee = I.popperOptions,
                    re = I.placement,
                    ge = I.offset,
                    be = I.getReferenceClientRect,
                    Ge = I.moveTransition,
                    Ye = st() ? Wt(ue).arrow : null,
                    Pt = be ? {
                        getBoundingClientRect: be,
                        contextElement: be.contextElement || ht()
                    } : C,
                    fn = {
                        name: "$$tippy",
                        enabled: !0,
                        phase: "beforeWrite",
                        requires: ["computeStyles"],
                        fn: function(vi) {
                            var Jt = vi.state;
                            if (st()) {
                                var rs = mi(),
                                    ei = rs.box;
                                ["placement", "reference-hidden", "escaped"].forEach(function(yi) {
                                    yi === "placement" ? ei.setAttribute("data-placement", Jt.placement) : Jt.attributes.popper["data-popper-" + yi] ? ei.setAttribute("data-" + yi, "") : ei.removeAttribute("data-" + yi)
                                }), Jt.attributes.popper = {}
                            }
                        }
                    },
                    Ot = [{
                        name: "offset",
                        options: {
                            offset: ge
                        }
                    }, {
                        name: "preventOverflow",
                        options: {
                            padding: {
                                top: 2,
                                bottom: 2,
                                left: 5,
                                right: 5
                            }
                        }
                    }, {
                        name: "flip",
                        options: {
                            padding: 5
                        }
                    }, {
                        name: "computeStyles",
                        options: {
                            adaptive: !Ge
                        }
                    }, fn];
                st() && Ye && Ot.push({
                    name: "arrow",
                    options: {
                        element: Ye,
                        padding: 3
                    }
                }), Ot.push.apply(Ot, (ee == null ? void 0 : ee.modifiers) || []), $.popperInstance = e.createPopper(Pt, ue, Object.assign({}, ee, {
                    placement: re,
                    onFirstUpdate: ze,
                    modifiers: Ot
                }))
            }

            function De() {
                $.popperInstance && ($.popperInstance.destroy(), $.popperInstance = null)
            }

            function Le() {
                var I = $.props.appendTo,
                    ee, re = ht();
                $.props.interactive && I === Be.appendTo || I === "parent" ? ee = re.parentNode : ee = f(I, [re]), ee.contains(ue) || ee.appendChild(ue), Te(), nt($.props.interactive && I === Be.appendTo && re.nextElementSibling !== ue, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "))
            }

            function je() {
                return E(ue.querySelectorAll("[data-tippy-root]"))
            }

            function qe(I) {
                $.clearDelayTimeouts(), I && S("onTrigger", [$, I]), le();
                var ee = w(!0),
                    re = Yt(),
                    ge = re[0],
                    be = re[1];
                A.isTouch && ge === "hold" && be && (ee = be), ee ? j = setTimeout(function() {
                    $.show()
                }, ee) : $.show()
            }

            function Ve(I) {
                if ($.clearDelayTimeouts(), S("onUntrigger", [$, I]), !$.state.isVisible) {
                    K();
                    return
                }
                if (!($.props.trigger.indexOf("mouseenter") >= 0 && $.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(I.type) >= 0 && W)) {
                    var ee = w(!1);
                    ee ? Q = setTimeout(function() {
                        $.state.isVisible && $.hide()
                    }, ee) : Y = requestAnimationFrame(function() {
                        $.hide()
                    })
                }
            }

            function Tt() {
                $.state.isEnabled = !0
            }

            function rt() {
                $.hide(), $.state.isEnabled = !1
            }

            function Ft() {
                clearTimeout(j), clearTimeout(Q), cancelAnimationFrame(Y)
            }

            function gi(I) {
                if (nt($.state.isDestroyed, et("setProps")), !$.state.isDestroyed) {
                    S("onBeforeUpdate", [$, I]), Ee();
                    var ee = $.props,
                        re = Un(C, Object.assign({}, $.props, {}, I, {
                            ignoreAttributes: !0
                        }));
                    $.props = re, Ae(), ee.interactiveDebounce !== re.interactiveDebounce && (B(), ke = h(Pe, re.interactiveDebounce)), ee.triggerTarget && !re.triggerTarget ? p(ee.triggerTarget).forEach(function(ge) {
                        ge.removeAttribute("aria-expanded")
                    }) : re.triggerTarget && C.removeAttribute("aria-expanded"), H(), m(), Nt && Nt(ee, re), $.popperInstance && (Te(), je().forEach(function(ge) {
                        requestAnimationFrame(ge._tippy.popperInstance.forceUpdate)
                    })), S("onAfterUpdate", [$, I])
                }
            }

            function Kt(I) {
                $.setProps({
                    content: I
                })
            }

            function qt() {
                nt($.state.isDestroyed, et("show"));
                var I = $.state.isVisible,
                    ee = $.state.isDestroyed,
                    re = !$.state.isEnabled,
                    ge = A.isTouch && !$.props.touch,
                    be = d($.props.duration, 0, Be.duration);
                if (!(I || ee || re || ge) && !ht().hasAttribute("disabled") && (S("onShow", [$], !1), $.props.onShow($) !== !1)) {
                    if ($.state.isVisible = !0, st() && (ue.style.visibility = "visible"), m(), le(), $.state.isMounted || (ue.style.transition = "none"), st()) {
                        var Ge = mi(),
                            Ye = Ge.box,
                            Pt = Ge.content;
                        x([Ye, Pt], 0)
                    }
                    ze = function() {
                        var Ot;
                        if (!(!$.state.isVisible || fe)) {
                            if (fe = !0, ue.offsetHeight, ue.style.transition = $.props.moveTransition, st() && $.props.animation) {
                                var Ni = mi(),
                                    vi = Ni.box,
                                    Jt = Ni.content;
                                x([vi, Jt], be), D([vi, Jt], "visible")
                            }
                            R(), H(), g(Ii, $), (Ot = $.popperInstance) == null || Ot.forceUpdate(), $.state.isMounted = !0, S("onMount", [$]), $.props.animation && st() && Ie(be, function() {
                                $.state.isShown = !0, S("onShown", [$])
                            })
                        }
                    }, Le()
                }
            }

            function dn() {
                nt($.state.isDestroyed, et("hide"));
                var I = !$.state.isVisible,
                    ee = $.state.isDestroyed,
                    re = !$.state.isEnabled,
                    ge = d($.props.duration, 1, Be.duration);
                if (!(I || ee || re) && (S("onHide", [$], !1), $.props.onHide($) !== !1)) {
                    if ($.state.isVisible = !1, $.state.isShown = !1, fe = !1, W = !1, st() && (ue.style.visibility = "hidden"), B(), K(), m(), st()) {
                        var be = mi(),
                            Ge = be.box,
                            Ye = be.content;
                        $.props.animation && (x([Ge, Ye], ge), D([Ge, Ye], "hidden"))
                    }
                    R(), H(), $.props.animation ? st() && Se(ge, $.unmount) : $.unmount()
                }
            }

            function Qt(I) {
                nt($.state.isDestroyed, et("hideWithInteractivity")), St().addEventListener("mousemove", ke), g(Li, ke), ke(I)
            }

            function zi() {
                nt($.state.isDestroyed, et("unmount")), $.state.isVisible && $.hide(), $.state.isMounted && (De(), je().forEach(function(I) {
                    I._tippy.unmount()
                }), ue.parentNode && ue.parentNode.removeChild(ue), Ii = Ii.filter(function(I) {
                    return I !== $
                }), $.state.isMounted = !1, S("onHidden", [$]))
            }

            function un() {
                nt($.state.isDestroyed, et("destroy")), !$.state.isDestroyed && ($.clearDelayTimeouts(), $.unmount(), Ee(), delete C._tippy, $.state.isDestroyed = !0, S("onDestroy", [$]))
            }
        }

        function wt(C, T) {
            T === void 0 && (T = {});
            var O = Be.plugins.concat(T.plugins || []);
            ot(C), xt(T, O), Je();
            var j = Object.assign({}, T, {
                    plugins: O
                }),
                Q = M(C); {
                var Y = z(j.content),
                    W = Q.length > 1;
                nt(Y && W, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "))
            }
            var ve = Q.reduce(function(ce, fe) {
                var ye = fe && pi(fe, j);
                return ye && ce.push(ye), ce
            }, []);
            return z(C) ? ve[0] : ve
        }
        wt.defaultProps = Be, wt.setDefaultProps = Kr, wt.currentInput = A;
        var Kn = function(T) {
                var O = T === void 0 ? {} : T,
                    j = O.exclude,
                    Q = O.duration;
                Ii.forEach(function(Y) {
                    var W = !1;
                    if (j && (W = L(j) ? Y.reference === j : Y.popper === j.popper), !W) {
                        var ve = Y.props.duration;
                        Y.setProps({
                            duration: Q
                        }), Y.hide(), Y.state.isDestroyed || Y.setProps({
                            duration: ve
                        })
                    }
                })
            },
            Qn = Object.assign({}, e.applyStyles, {
                effect: function(T) {
                    var O = T.state,
                        j = {
                            popper: {
                                position: O.options.strategy,
                                left: "0",
                                top: "0",
                                margin: "0"
                            },
                            arrow: {
                                position: "absolute"
                            },
                            reference: {}
                        };
                    Object.assign(O.elements.popper.style, j.popper), O.styles = j, O.elements.arrow && Object.assign(O.elements.arrow.style, j.arrow)
                }
            }),
            Jn = function(T, O) {
                var j;
                O === void 0 && (O = {}), pt(!Array.isArray(T), ["The first argument passed to createSingleton() must be an array of", "tippy instances. The passed value was", String(T)].join(" "));
                var Q = T,
                    Y = [],
                    W, ve = O.overrides,
                    ce = [],
                    fe = !1;

                function ye() {
                    Y = Q.map(function(ne) {
                        return ne.reference
                    })
                }

                function Me(ne) {
                    Q.forEach(function(oe) {
                        ne ? oe.enable() : oe.disable()
                    })
                }

                function ze(ne) {
                    return Q.map(function(oe) {
                        var $ = oe.setProps;
                        return oe.setProps = function(Ue) {
                                $(Ue), oe.reference === W && ne.setProps(Ue)
                            },
                            function() {
                                oe.setProps = $
                            }
                    })
                }

                function xe(ne, oe) {
                    var $ = Y.indexOf(oe);
                    if (oe !== W) {
                        W = oe;
                        var Ue = (ve || []).concat("content").reduce(function(ue, Nt) {
                            return ue[Nt] = Q[$].props[Nt], ue
                        }, {});
                        ne.setProps(Object.assign({}, Ue, {
                            getReferenceClientRect: typeof Ue.getReferenceClientRect == "function" ? Ue.getReferenceClientRect : function() {
                                return oe.getBoundingClientRect()
                            }
                        }))
                    }
                }
                Me(!1), ye();
                var ke = {
                        fn: function() {
                            return {
                                onDestroy: function() {
                                    Me(!0)
                                },
                                onHidden: function() {
                                    W = null
                                },
                                onClickOutside: function($) {
                                    $.props.showOnCreate && !fe && (fe = !0, W = null)
                                },
                                onShow: function($) {
                                    $.props.showOnCreate && !fe && (fe = !0, xe($, Y[0]))
                                },
                                onTrigger: function($, Ue) {
                                    xe($, Ue.currentTarget)
                                }
                            }
                        }
                    },
                    ae = wt(P(), Object.assign({}, v(O, ["overrides"]), {
                        plugins: [ke].concat(O.plugins || []),
                        triggerTarget: Y,
                        popperOptions: Object.assign({}, O.popperOptions, {
                            modifiers: [].concat(((j = O.popperOptions) == null ? void 0 : j.modifiers) || [], [Qn])
                        })
                    })),
                    pe = ae.show;
                ae.show = function(ne) {
                    if (pe(), !W && ne == null) return xe(ae, Y[0]);
                    if (!(W && ne == null)) {
                        if (typeof ne == "number") return Y[ne] && xe(ae, Y[ne]);
                        if (Q.includes(ne)) {
                            var oe = ne.reference;
                            return xe(ae, oe)
                        }
                        if (Y.includes(ne)) return xe(ae, ne)
                    }
                }, ae.showNext = function() {
                    var ne = Y[0];
                    if (!W) return ae.show(0);
                    var oe = Y.indexOf(W);
                    ae.show(Y[oe + 1] || ne)
                }, ae.showPrevious = function() {
                    var ne = Y[Y.length - 1];
                    if (!W) return ae.show(ne);
                    var oe = Y.indexOf(W),
                        $ = Y[oe - 1] || ne;
                    ae.show($)
                };
                var he = ae.setProps;
                return ae.setProps = function(ne) {
                    ve = ne.overrides || ve, he(ne)
                }, ae.setInstances = function(ne) {
                    Me(!0), ce.forEach(function(oe) {
                        return oe()
                    }), Q = ne, Me(!1), ye(), ze(ae), ae.setProps({
                        triggerTarget: Y
                    })
                }, ce = ze(ae), ae
            },
            er = {
                mouseover: "mouseenter",
                focusin: "focus",
                click: "click"
            };

        function Ut(C, T) {
            pt(!(T && T.target), ["You must specity a `target` prop indicating a CSS selector string matching", "the target elements that should receive a tippy."].join(" "));
            var O = [],
                j = [],
                Q = !1,
                Y = T.target,
                W = v(T, ["target"]),
                ve = Object.assign({}, W, {
                    trigger: "manual",
                    touch: !1
                }),
                ce = Object.assign({}, W, {
                    showOnCreate: !0
                }),
                fe = wt(C, ve),
                ye = p(fe);

            function Me(pe) {
                if (!(!pe.target || Q)) {
                    var he = pe.target.closest(Y);
                    if (he) {
                        var ne = he.getAttribute("data-tippy-trigger") || T.trigger || Be.trigger;
                        if (!he._tippy && !(pe.type === "touchstart" && typeof ce.touch == "boolean") && !(pe.type !== "touchstart" && ne.indexOf(er[pe.type]) < 0)) {
                            var oe = wt(he, ce);
                            oe && (j = j.concat(oe))
                        }
                    }
                }
            }

            function ze(pe, he, ne, oe) {
                oe === void 0 && (oe = !1), pe.addEventListener(he, ne, oe), O.push({
                    node: pe,
                    eventType: he,
                    handler: ne,
                    options: oe
                })
            }

            function xe(pe) {
                var he = pe.reference;
                ze(he, "touchstart", Me, l), ze(he, "mouseover", Me), ze(he, "focusin", Me), ze(he, "click", Me)
            }

            function ke() {
                O.forEach(function(pe) {
                    var he = pe.node,
                        ne = pe.eventType,
                        oe = pe.handler,
                        $ = pe.options;
                    he.removeEventListener(ne, oe, $)
                }), O = []
            }

            function ae(pe) {
                var he = pe.destroy,
                    ne = pe.enable,
                    oe = pe.disable;
                pe.destroy = function($) {
                    $ === void 0 && ($ = !0), $ && j.forEach(function(Ue) {
                        Ue.destroy()
                    }), j = [], ke(), he()
                }, pe.enable = function() {
                    ne(), j.forEach(function($) {
                        return $.enable()
                    }), Q = !1
                }, pe.disable = function() {
                    oe(), j.forEach(function($) {
                        return $.disable()
                    }), Q = !0
                }, xe(pe)
            }
            return ye.forEach(ae), fe
        }
        var tr = {
            name: "animateFill",
            defaultValue: !1,
            fn: function(T) {
                var O;
                if (!((O = T.props.render) != null && O.$$tippy)) return pt(T.props.animateFill, "The `animateFill` plugin requires the default render function."), {};
                var j = Wt(T.popper),
                    Q = j.box,
                    Y = j.content,
                    W = T.props.animateFill ? Jr() : null;
                return {
                    onCreate: function() {
                        W && (Q.insertBefore(W, Q.firstElementChild), Q.setAttribute("data-animatefill", ""), Q.style.overflow = "hidden", T.setProps({
                            arrow: !1,
                            animation: "shift-away"
                        }))
                    },
                    onMount: function() {
                        if (W) {
                            var ce = Q.style.transitionDuration,
                                fe = Number(ce.replace("ms", ""));
                            Y.style.transitionDelay = Math.round(fe / 10) + "ms", W.style.transitionDuration = ce, D([W], "visible")
                        }
                    },
                    onShow: function() {
                        W && (W.style.transitionDuration = "0ms")
                    },
                    onHide: function() {
                        W && D([W], "hidden")
                    }
                }
            }
        };

        function Jr() {
            var C = P();
            return C.className = s, D([C], "hidden"), C
        }
        var Di = {
                clientX: 0,
                clientY: 0
            },
            hi = [];

        function Ri(C) {
            var T = C.clientX,
                O = C.clientY;
            Di = {
                clientX: T,
                clientY: O
            }
        }

        function Hi(C) {
            C.addEventListener("mousemove", Ri)
        }

        function es(C) {
            C.removeEventListener("mousemove", Ri)
        }
        var on = {
            name: "followCursor",
            defaultValue: !1,
            fn: function(T) {
                var O = T.reference,
                    j = F(T.props.triggerTarget || O),
                    Q = !1,
                    Y = !1,
                    W = !0,
                    ve = T.props;

                function ce() {
                    return T.props.followCursor === "initial" && T.state.isVisible
                }

                function fe() {
                    j.addEventListener("mousemove", ze)
                }

                function ye() {
                    j.removeEventListener("mousemove", ze)
                }

                function Me() {
                    Q = !0, T.setProps({
                        getReferenceClientRect: null
                    }), Q = !1
                }

                function ze(ae) {
                    var pe = ae.target ? O.contains(ae.target) : !0,
                        he = T.props.followCursor,
                        ne = ae.clientX,
                        oe = ae.clientY,
                        $ = O.getBoundingClientRect(),
                        Ue = ne - $.left,
                        ue = oe - $.top;
                    (pe || !T.props.interactive) && T.setProps({
                        getReferenceClientRect: function() {
                            var Ct = O.getBoundingClientRect(),
                                Gt = ne,
                                Yt = oe;
                            he === "initial" && (Gt = Ct.left + Ue, Yt = Ct.top + ue);
                            var Xt = he === "horizontal" ? Ct.top : Yt,
                                st = he === "vertical" ? Ct.right : Gt,
                                ht = he === "horizontal" ? Ct.bottom : Yt,
                                St = he === "vertical" ? Ct.left : Gt;
                            return {
                                width: st - St,
                                height: ht - Xt,
                                top: Xt,
                                right: st,
                                bottom: ht,
                                left: St
                            }
                        }
                    })
                }

                function xe() {
                    T.props.followCursor && (hi.push({
                        instance: T,
                        doc: j
                    }), Hi(j))
                }

                function ke() {
                    hi = hi.filter(function(ae) {
                        return ae.instance !== T
                    }), hi.filter(function(ae) {
                        return ae.doc === j
                    }).length === 0 && es(j)
                }
                return {
                    onCreate: xe,
                    onDestroy: ke,
                    onBeforeUpdate: function() {
                        ve = T.props
                    },
                    onAfterUpdate: function(pe, he) {
                        var ne = he.followCursor;
                        Q || ne !== void 0 && ve.followCursor !== ne && (ke(), ne ? (xe(), T.state.isMounted && !Y && !ce() && fe()) : (ye(), Me()))
                    },
                    onMount: function() {
                        T.props.followCursor && !Y && (W && (ze(Di), W = !1), ce() || fe())
                    },
                    onTrigger: function(pe, he) {
                        V(he) && (Di = {
                            clientX: he.clientX,
                            clientY: he.clientY
                        }), Y = he.type === "focus"
                    },
                    onHidden: function() {
                        T.props.followCursor && (Me(), ye(), W = !0)
                    }
                }
            }
        };

        function ts(C, T) {
            var O;
            return {
                popperOptions: Object.assign({}, C.popperOptions, {
                    modifiers: [].concat((((O = C.popperOptions) == null ? void 0 : O.modifiers) || []).filter(function(j) {
                        var Q = j.name;
                        return Q !== T.name
                    }), [T])
                })
            }
        }
        var ln = {
            name: "inlinePositioning",
            defaultValue: !1,
            fn: function(T) {
                var O = T.reference;

                function j() {
                    return !!T.props.inlinePositioning
                }
                var Q, Y = -1,
                    W = !1,
                    ve = {
                        name: "tippyInlinePositioning",
                        enabled: !0,
                        phase: "afterWrite",
                        fn: function(ze) {
                            var xe = ze.state;
                            j() && (Q !== xe.placement && T.setProps({
                                getReferenceClientRect: function() {
                                    return ce(xe.placement)
                                }
                            }), Q = xe.placement)
                        }
                    };

                function ce(Me) {
                    return is(y(Me), O.getBoundingClientRect(), E(O.getClientRects()), Y)
                }

                function fe(Me) {
                    W = !0, T.setProps(Me), W = !1
                }

                function ye() {
                    W || fe(ts(T.props, ve))
                }
                return {
                    onCreate: ye,
                    onAfterUpdate: ye,
                    onTrigger: function(ze, xe) {
                        if (V(xe)) {
                            var ke = E(T.reference.getClientRects()),
                                ae = ke.find(function(pe) {
                                    return pe.left - 2 <= xe.clientX && pe.right + 2 >= xe.clientX && pe.top - 2 <= xe.clientY && pe.bottom + 2 >= xe.clientY
                                });
                            Y = ke.indexOf(ae)
                        }
                    },
                    onUntrigger: function() {
                        Y = -1
                    }
                }
            }
        };

        function is(C, T, O, j) {
            if (O.length < 2 || C === null) return T;
            if (O.length === 2 && j >= 0 && O[0].left > O[1].right) return O[j] || T;
            switch (C) {
                case "top":
                case "bottom":
                    {
                        var Q = O[0],
                            Y = O[O.length - 1],
                            W = C === "top",
                            ve = Q.top,
                            ce = Y.bottom,
                            fe = W ? Q.left : Y.left,
                            ye = W ? Q.right : Y.right,
                            Me = ye - fe,
                            ze = ce - ve;
                        return {
                            top: ve,
                            bottom: ce,
                            left: fe,
                            right: ye,
                            width: Me,
                            height: ze
                        }
                    }
                case "left":
                case "right":
                    {
                        var xe = Math.min.apply(Math, O.map(function(ue) {
                                return ue.left
                            })),
                            ke = Math.max.apply(Math, O.map(function(ue) {
                                return ue.right
                            })),
                            ae = O.filter(function(ue) {
                                return C === "left" ? ue.left === xe : ue.right === ke
                            }),
                            pe = ae[0].top,
                            he = ae[ae.length - 1].bottom,
                            ne = xe,
                            oe = ke,
                            $ = oe - ne,
                            Ue = he - pe;
                        return {
                            top: pe,
                            bottom: he,
                            left: ne,
                            right: oe,
                            width: $,
                            height: Ue
                        }
                    }
                default:
                    return T
            }
        }
        var ns = {
            name: "sticky",
            defaultValue: !1,
            fn: function(T) {
                var O = T.reference,
                    j = T.popper;

                function Q() {
                    return T.popperInstance ? T.popperInstance.state.elements.reference : O
                }

                function Y(fe) {
                    return T.props.sticky === !0 || T.props.sticky === fe
                }
                var W = null,
                    ve = null;

                function ce() {
                    var fe = Y("reference") ? Q().getBoundingClientRect() : null,
                        ye = Y("popper") ? j.getBoundingClientRect() : null;
                    (fe && cn(W, fe) || ye && cn(ve, ye)) && T.popperInstance && T.popperInstance.update(), W = fe, ve = ye, T.state.isMounted && requestAnimationFrame(ce)
                }
                return {
                    onMount: function() {
                        T.props.sticky && ce()
                    }
                }
            }
        };

        function cn(C, T) {
            return C && T ? C.top !== T.top || C.right !== T.right || C.bottom !== T.bottom || C.left !== T.left : !0
        }
        wt.setDefaultProps({
            render: Yn
        }), t.animateFill = tr, t.createSingleton = Jn, t.default = wt, t.delegate = Ut, t.followCursor = on, t.hideAll = Kn, t.inlinePositioning = ln, t.roundArrow = i, t.sticky = ns
    }),
    Ao = Yc(Xc()),
    n0 = Yc(Xc()),
    r0 = t => {
        const e = {
                plugins: []
            },
            i = n => t[t.indexOf(n) + 1];
        if (t.includes("animation") && (e.animation = i("animation")), t.includes("duration") && (e.duration = parseInt(i("duration"))), t.includes("delay")) {
            const n = i("delay");
            e.delay = n.includes("-") ? n.split("-").map(r => parseInt(r)) : parseInt(n)
        }
        if (t.includes("cursor")) {
            e.plugins.push(n0.followCursor);
            const n = i("cursor");
            ["x", "initial"].includes(n) ? e.followCursor = n === "x" ? "horizontal" : "initial" : e.followCursor = !0
        }
        return t.includes("on") && (e.trigger = i("on")), t.includes("arrowless") && (e.arrow = !1), t.includes("html") && (e.allowHTML = !0), t.includes("interactive") && (e.interactive = !0), t.includes("border") && e.interactive && (e.interactiveBorder = parseInt(i("border"))), t.includes("debounce") && e.interactive && (e.interactiveDebounce = parseInt(i("debounce"))), t.includes("max-width") && (e.maxWidth = parseInt(i("max-width"))), t.includes("theme") && (e.theme = i("theme")), t.includes("placement") && (e.placement = i("placement")), e
    };

function s0(t) {
    t.magic("tooltip", e => (i, n = {}) => {
        const r = (0, Ao.default)(e, {
            content: i,
            trigger: "manual",
            ...n
        });
        r.show(), setTimeout(() => {
            r.hide(), setTimeout(() => r.destroy(), n.duration || 300)
        }, n.timeout || 2e3)
    }), t.directive("tooltip", (e, {
        modifiers: i,
        expression: n
    }, {
        evaluateLater: r,
        effect: s
    }) => {
        const a = i.length > 0 ? r0(i) : {};
        e.__x_tippy || (e.__x_tippy = (0, Ao.default)(e, a));
        const o = () => e.__x_tippy.enable(),
            l = () => e.__x_tippy.disable(),
            c = d => {
                d ? (o(), e.__x_tippy.setContent(d)) : l()
            };
        if (i.includes("raw")) c(n);
        else {
            const d = r(n);
            s(() => {
                d(u => {
                    typeof u == "object" ? (e.__x_tippy.setProps(u), o()) : c(u)
                })
            })
        }
    })
}
var a0 = s0;
const o0 = [{
    name: "Home",
    screenshotLight: "/img/screenshots/home.png",
    screenshotDark: "/img/screenshots/home-dark.png",
    link: "/home.html",
    new: !1
}, {
    name: "Home 2",
    screenshotLight: "/img/screenshots/home-2.png",
    screenshotDark: "/img/screenshots/home-2-dark.png",
    link: "/home-2.html",
    new: !1
}, {
    name: "Home 3",
    screenshotLight: "/img/screenshots/home-3.png",
    screenshotDark: "/img/screenshots/home-3-dark.png",
    link: "/home-3.html",
    new: !1
}, {
    name: "Inventory",
    screenshotLight: "/img/screenshots/inventory.png",
    screenshotDark: "/img/screenshots/inventory-dark.png",
    link: "/inventory.html",
    new: !1
}, {
    name: "Vehicle",
    screenshotLight: "/img/screenshots/vehicle.png",
    screenshotDark: "/img/screenshots/vehicle-dark.png",
    link: "/vehicle.html",
    new: !1
}, {
    name: "Services",
    screenshotLight: "/img/screenshots/services.png",
    screenshotDark: "/img/screenshots/services-dark.png",
    link: "/services.html",
    new: !1
}, {
    name: "About Us",
    screenshotLight: "/img/screenshots/about.png",
    screenshotDark: "/img/screenshots/about-dark.png",
    link: "/about.html",
    new: !1
}, {
    name: "Contact",
    screenshotLight: "/img/screenshots/contact.png",
    screenshotDark: "/img/screenshots/contact-dark.png",
    link: "/contact.html",
    new: !1
}, {
    name: "Dashboard",
    screenshotLight: "/img/screenshots/dashboard.png",
    screenshotDark: "/img/screenshots/dashboard-dark.png",
    link: "/dashboard.html",
    new: !1
}, {
    name: "Account",
    screenshotLight: "/img/screenshots/dashboard-account.png",
    screenshotDark: "/img/screenshots/dashboard-account-dark.png",
    link: "/dashboard-account.html",
    new: !1
}, {
    name: "Schedule",
    screenshotLight: "/img/screenshots/dashboard-schedule.png",
    screenshotDark: "/img/screenshots/dashboard-schedule-dark.png",
    link: "/dashboard-schedule.html",
    new: !1
}, {
    name: "Favorites",
    screenshotLight: "/img/screenshots/dashboard-bookmarks.png",
    screenshotDark: "/img/screenshots/dashboard-bookmarks-dark.png",
    link: "/dashboard-bookmarks.html",
    new: !1
}, {
    name: "Error 404",
    screenshotLight: "/img/screenshots/404.png",
    screenshotDark: "/img/screenshots/404-dark.png",
    link: "/404.html",
    new: !1
}, {
    name: "Login",
    screenshotLight: "/img/screenshots/login.png",
    screenshotDark: "/img/screenshots/login-dark.png",
    link: "/login.html",
    new: !1
}, {
    name: "Signup",
    screenshotLight: "/img/screenshots/signup.png",
    screenshotDark: "/img/screenshots/signup-dark.png",
    link: "/signup.html",
    new: !1
}];

function l0() {
    return {
        screenshots: o0
    }
}

function c0() {
    return {
        activeTab: "starter",
        toggleTabs(t) {
            const e = t.target.getAttribute("data-tab");
            this.activeTab = e
        }
    }
}
window.renderScreenshots = l0;
window.purchase = c0;

function d0() {
    return {
        dark: !1,
        initTheme() {
            this.$store.app.isDark ? (document.documentElement.classList.add("dark"), this.dark = !0) : (document.documentElement.classList.remove("dark"), this.dark = !1)
        },
        toggleTheme() {
            this.$store.app.isDark = !this.$store.app.isDark, this.dark = !this.dark
        }
    }
}

function u0() {
    return {
        scrolled: !1,
        height: 60,
        mobileOpen: !1,
        isChecked: !1,
        megamenuOpened: !1,
        openedMegamenu: "",
        scroll() {
            window.scrollY >= this.height ? this.scrolled = !0 : this.scrolled = !1
        },
        openSearch() {
            const t = document.getElementById("navbar-search-field");
            this.$store.app.searchOpened = !0, t.focus()
        },
        initScrollAnchors() {
            document.querySelectorAll('.scroll-link[href^="#"]').forEach(t => {
                t.onclick = function(e) {
                    e.preventDefault();
                    let i = this.getAttribute("href"),
                        n = document.querySelector(i),
                        r = 100,
                        a = n.offsetTop - r;
                    window.scrollTo({
                        top: a,
                        behavior: "smooth"
                    })
                }
            })
        }
    }
}

function f0() {
    return {
        init() {
            const e = document.getElementById("sidebar-menu").querySelectorAll("li a");
            let i = 0;
            for (var n = 0; n < e.length; n++) e[n].href === document.URL && (i = n);
            e[i].className = "flex items-center gap-4 py-3 rounded-lg bg-primary-200 dark:bg-primary-600/20 text-primary-600 dark:text-primary-500"
        },
        foldSidebar() {
            Dt.store("app").isLayoutCompact = !0
        }
    }
}

function p0(t, e) {
    const i = document.getElementById("search-results"),
        n = new RegExp(t, "i");
    i.innerHTML = "", i.classList.remove("hidden"), t.length > 0 ? fetch(e).then(r => r.json()).then(function(r) {
        if (console.log(r), r.length > 0 && (r.forEach(function(a) {
                if (a.title.search(n) != -1 || a.content.search(n) != -1) {
                    let o = `
                  <a href="${a.url}" class="search-result group flex items-center gap-2 p-2 rounded-lg hover:bg-muted-50 dark:hover:bg-muted-800">
                      <div class="w-10 h-10 flex items-center justify-center mask mask-blob bg-transparent group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 text-primary-500 transition-colors duration-300">
                        <i class="iconify w-5 h-5 block" data-icon="${a.icon}"></i>
                      </div>
                      <div class="meta font-sans leading-tight">
                          <h4 class="text-sm text-muted-600 dark:text-muted-100">${a.title}</h4 >
                          <span class="text-xs text-muted-400">${a.content}</span>
                      </div>
                  </a>
              `;
                    console.log(o), i.innerHTML += o
                }
            }), i.querySelectorAll(".search-result").length === 0)) {
            let a = `
                <div class="w-full p-6">
                    <div class="text-center">
                        <i class="iconify w-8 h-8 mx-auto text-muted-400" data-icon="ph:robot-duotone"></i>
                        <h3 class="font-heading font-medium text-muted-800 dark:text-muted-100">No Matching Results</h3>
                        <p class="font-heading text-xs max-w-[240px] mx-auto text-muted-400">Sorry, we couldn't find any matching records. Please try different search terms.</p>
                    </div>
                </div>
            `;
            i.innerHTML += a
        }
    }).catch(function(r) {
        console.log(r)
    }) : i.classList.add("hidden")
}

function h0() {
    return {
        searchTerms: "",
        closeSearch() {
            const t = document.getElementById("search-results");
            this.$store.app.searchOpened = !this.$store.app.searchOpened, this.searchTerms = "", t.classList.add("hidden")
        },
        searchData() {
            let t = this.searchTerms;
            p0(t, "/data/search.json")
        }
    }
}
const kt = document.querySelector(".backtotop path"),
    vn = kt ? kt.getTotalLength() : 0;

function m0() {
    return {
        scrolled: !1,
        height: 60,
        mobileOpen: !1,
        setup() {
            kt.style.transition = kt.style.WebkitTransition = "none", kt.style.strokeDasharray = vn + " " + vn, kt.style.strokeDashoffset = vn, kt.getBoundingClientRect(), kt.style.transition = kt.style.WebkitTransition = "stroke-dashoffset 10ms linear"
        },
        updateProgress() {
            let t = window.scrollY,
                e = document.body.scrollHeight - window.innerHeight,
                i = vn - t * vn / e;
            kt.style.strokeDashoffset = i
        },
        scroll() {
            this.updateProgress(), window.scrollY >= this.height ? this.scrolled = !0 : this.scrolled = !1
        },
        scrollTop() {
            return window.scrollTo({
                top: 0,
                behavior: "smooth"
            }), !1
        }
    }
}

function Po(t) {
    return t !== null && typeof t == "object" && "constructor" in t && t.constructor === Object
}

function Da(t = {}, e = {}) {
    Object.keys(e).forEach(i => {
        typeof t[i] > "u" ? t[i] = e[i] : Po(e[i]) && Po(t[i]) && Object.keys(e[i]).length > 0 && Da(t[i], e[i])
    })
}
const Kc = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
        blur() {},
        nodeName: ""
    },
    querySelector() {
        return null
    },
    querySelectorAll() {
        return []
    },
    getElementById() {
        return null
    },
    createEvent() {
        return {
            initEvent() {}
        }
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName() {
                return []
            }
        }
    },
    createElementNS() {
        return {}
    },
    importNode() {
        return null
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};

function Ze() {
    const t = typeof document < "u" ? document : {};
    return Da(t, Kc), t
}
const g0 = {
    document: Kc,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() {},
        pushState() {},
        go() {},
        back() {}
    },
    CustomEvent: function() {
        return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
        return {
            getPropertyValue() {
                return ""
            }
        }
    },
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia() {
        return {}
    },
    requestAnimationFrame(t) {
        return typeof setTimeout > "u" ? (t(), null) : setTimeout(t, 0)
    },
    cancelAnimationFrame(t) {
        typeof setTimeout > "u" || clearTimeout(t)
    }
};

function Oe() {
    const t = typeof window < "u" ? window : {};
    return Da(t, g0), t
}

function v0(t) {
    const e = t.__proto__;
    Object.defineProperty(t, "__proto__", {
        get() {
            return e
        },
        set(i) {
            e.__proto__ = i
        }
    })
}
class ni extends Array {
    constructor(e) {
        typeof e == "number" ? super(e) : (super(...e || []), v0(this))
    }
}

function Zn(t = []) {
    const e = [];
    return t.forEach(i => {
        Array.isArray(i) ? e.push(...Zn(i)) : e.push(i)
    }), e
}

function Qc(t, e) {
    return Array.prototype.filter.call(t, e)
}

function y0(t) {
    const e = [];
    for (let i = 0; i < t.length; i += 1) e.indexOf(t[i]) === -1 && e.push(t[i]);
    return e
}

function b0(t, e) {
    if (typeof t != "string") return [t];
    const i = [],
        n = e.querySelectorAll(t);
    for (let r = 0; r < n.length; r += 1) i.push(n[r]);
    return i
}

function N(t, e) {
    const i = Oe(),
        n = Ze();
    let r = [];
    if (!e && t instanceof ni) return t;
    if (!t) return new ni(r);
    if (typeof t == "string") {
        const s = t.trim();
        if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
            let a = "div";
            s.indexOf("<li") === 0 && (a = "ul"), s.indexOf("<tr") === 0 && (a = "tbody"), (s.indexOf("<td") === 0 || s.indexOf("<th") === 0) && (a = "tr"), s.indexOf("<tbody") === 0 && (a = "table"), s.indexOf("<option") === 0 && (a = "select");
            const o = n.createElement(a);
            o.innerHTML = s;
            for (let l = 0; l < o.childNodes.length; l += 1) r.push(o.childNodes[l])
        } else r = b0(t.trim(), e || n)
    } else if (t.nodeType || t === i || t === n) r.push(t);
    else if (Array.isArray(t)) {
        if (t instanceof ni) return t;
        r = t
    }
    return new ni(y0(r))
}
N.fn = ni.prototype;

function w0(...t) {
    const e = Zn(t.map(i => i.split(" ")));
    return this.forEach(i => {
        i.classList.add(...e)
    }), this
}

function _0(...t) {
    const e = Zn(t.map(i => i.split(" ")));
    return this.forEach(i => {
        i.classList.remove(...e)
    }), this
}

function E0(...t) {
    const e = Zn(t.map(i => i.split(" ")));
    this.forEach(i => {
        e.forEach(n => {
            i.classList.toggle(n)
        })
    })
}

function x0(...t) {
    const e = Zn(t.map(i => i.split(" ")));
    return Qc(this, i => e.filter(n => i.classList.contains(n)).length > 0).length > 0
}

function C0(t, e) {
    if (arguments.length === 1 && typeof t == "string") return this[0] ? this[0].getAttribute(t) : void 0;
    for (let i = 0; i < this.length; i += 1)
        if (arguments.length === 2) this[i].setAttribute(t, e);
        else
            for (const n in t) this[i][n] = t[n], this[i].setAttribute(n, t[n]);
    return this
}

function S0(t) {
    for (let e = 0; e < this.length; e += 1) this[e].removeAttribute(t);
    return this
}

function T0(t) {
    for (let e = 0; e < this.length; e += 1) this[e].style.transform = t;
    return this
}

function M0(t) {
    for (let e = 0; e < this.length; e += 1) this[e].style.transitionDuration = typeof t != "string" ? `${t}ms` : t;
    return this
}

function $0(...t) {
    let [e, i, n, r] = t;
    typeof t[1] == "function" && ([e, n, r] = t, i = void 0), r || (r = !1);

    function s(c) {
        const d = c.target;
        if (!d) return;
        const u = c.target.dom7EventData || [];
        if (u.indexOf(c) < 0 && u.unshift(c), N(d).is(i)) n.apply(d, u);
        else {
            const f = N(d).parents();
            for (let h = 0; h < f.length; h += 1) N(f[h]).is(i) && n.apply(f[h], u)
        }
    }

    function a(c) {
        const d = c && c.target ? c.target.dom7EventData || [] : [];
        d.indexOf(c) < 0 && d.unshift(c), n.apply(this, d)
    }
    const o = e.split(" ");
    let l;
    for (let c = 0; c < this.length; c += 1) {
        const d = this[c];
        if (i)
            for (l = 0; l < o.length; l += 1) {
                const u = o[l];
                d.dom7LiveListeners || (d.dom7LiveListeners = {}), d.dom7LiveListeners[u] || (d.dom7LiveListeners[u] = []), d.dom7LiveListeners[u].push({
                    listener: n,
                    proxyListener: s
                }), d.addEventListener(u, s, r)
            } else
                for (l = 0; l < o.length; l += 1) {
                    const u = o[l];
                    d.dom7Listeners || (d.dom7Listeners = {}), d.dom7Listeners[u] || (d.dom7Listeners[u] = []), d.dom7Listeners[u].push({
                        listener: n,
                        proxyListener: a
                    }), d.addEventListener(u, a, r)
                }
    }
    return this
}

function A0(...t) {
    let [e, i, n, r] = t;
    typeof t[1] == "function" && ([e, n, r] = t, i = void 0), r || (r = !1);
    const s = e.split(" ");
    for (let a = 0; a < s.length; a += 1) {
        const o = s[a];
        for (let l = 0; l < this.length; l += 1) {
            const c = this[l];
            let d;
            if (!i && c.dom7Listeners ? d = c.dom7Listeners[o] : i && c.dom7LiveListeners && (d = c.dom7LiveListeners[o]), d && d.length)
                for (let u = d.length - 1; u >= 0; u -= 1) {
                    const f = d[u];
                    n && f.listener === n || n && f.listener && f.listener.dom7proxy && f.listener.dom7proxy === n ? (c.removeEventListener(o, f.proxyListener, r), d.splice(u, 1)) : n || (c.removeEventListener(o, f.proxyListener, r), d.splice(u, 1))
                }
        }
    }
    return this
}

function P0(...t) {
    const e = Oe(),
        i = t[0].split(" "),
        n = t[1];
    for (let r = 0; r < i.length; r += 1) {
        const s = i[r];
        for (let a = 0; a < this.length; a += 1) {
            const o = this[a];
            if (e.CustomEvent) {
                const l = new e.CustomEvent(s, {
                    detail: n,
                    bubbles: !0,
                    cancelable: !0
                });
                o.dom7EventData = t.filter((c, d) => d > 0), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData
            }
        }
    }
    return this
}

function O0(t) {
    const e = this;

    function i(n) {
        n.target === this && (t.call(this, n), e.off("transitionend", i))
    }
    return t && e.on("transitionend", i), this
}

function k0(t) {
    if (this.length > 0) {
        if (t) {
            const e = this.styles();
            return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
        }
        return this[0].offsetWidth
    }
    return null
}

function L0(t) {
    if (this.length > 0) {
        if (t) {
            const e = this.styles();
            return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
        }
        return this[0].offsetHeight
    }
    return null
}

function I0() {
    if (this.length > 0) {
        const t = Oe(),
            e = Ze(),
            i = this[0],
            n = i.getBoundingClientRect(),
            r = e.body,
            s = i.clientTop || r.clientTop || 0,
            a = i.clientLeft || r.clientLeft || 0,
            o = i === t ? t.scrollY : i.scrollTop,
            l = i === t ? t.scrollX : i.scrollLeft;
        return {
            top: n.top + o - s,
            left: n.left + l - a
        }
    }
    return null
}

function D0() {
    const t = Oe();
    return this[0] ? t.getComputedStyle(this[0], null) : {}
}

function R0(t, e) {
    const i = Oe();
    let n;
    if (arguments.length === 1)
        if (typeof t == "string") {
            if (this[0]) return i.getComputedStyle(this[0], null).getPropertyValue(t)
        } else {
            for (n = 0; n < this.length; n += 1)
                for (const r in t) this[n].style[r] = t[r];
            return this
        }
    if (arguments.length === 2 && typeof t == "string") {
        for (n = 0; n < this.length; n += 1) this[n].style[t] = e;
        return this
    }
    return this
}

function H0(t) {
    return t ? (this.forEach((e, i) => {
        t.apply(e, [e, i])
    }), this) : this
}

function z0(t) {
    const e = Qc(this, t);
    return N(e)
}

function N0(t) {
    if (typeof t > "u") return this[0] ? this[0].innerHTML : null;
    for (let e = 0; e < this.length; e += 1) this[e].innerHTML = t;
    return this
}

function F0(t) {
    if (typeof t > "u") return this[0] ? this[0].textContent.trim() : null;
    for (let e = 0; e < this.length; e += 1) this[e].textContent = t;
    return this
}

function q0(t) {
    const e = Oe(),
        i = Ze(),
        n = this[0];
    let r, s;
    if (!n || typeof t > "u") return !1;
    if (typeof t == "string") {
        if (n.matches) return n.matches(t);
        if (n.webkitMatchesSelector) return n.webkitMatchesSelector(t);
        if (n.msMatchesSelector) return n.msMatchesSelector(t);
        for (r = N(t), s = 0; s < r.length; s += 1)
            if (r[s] === n) return !0;
        return !1
    }
    if (t === i) return n === i;
    if (t === e) return n === e;
    if (t.nodeType || t instanceof ni) {
        for (r = t.nodeType ? [t] : t, s = 0; s < r.length; s += 1)
            if (r[s] === n) return !0;
        return !1
    }
    return !1
}

function V0() {
    let t = this[0],
        e;
    if (t) {
        for (e = 0;
            (t = t.previousSibling) !== null;) t.nodeType === 1 && (e += 1);
        return e
    }
}

function j0(t) {
    if (typeof t > "u") return this;
    const e = this.length;
    if (t > e - 1) return N([]);
    if (t < 0) {
        const i = e + t;
        return i < 0 ? N([]) : N([this[i]])
    }
    return N([this[t]])
}

function B0(...t) {
    let e;
    const i = Ze();
    for (let n = 0; n < t.length; n += 1) {
        e = t[n];
        for (let r = 0; r < this.length; r += 1)
            if (typeof e == "string") {
                const s = i.createElement("div");
                for (s.innerHTML = e; s.firstChild;) this[r].appendChild(s.firstChild)
            } else if (e instanceof ni)
            for (let s = 0; s < e.length; s += 1) this[r].appendChild(e[s]);
        else this[r].appendChild(e)
    }
    return this
}

function Z0(t) {
    const e = Ze();
    let i, n;
    for (i = 0; i < this.length; i += 1)
        if (typeof t == "string") {
            const r = e.createElement("div");
            for (r.innerHTML = t, n = r.childNodes.length - 1; n >= 0; n -= 1) this[i].insertBefore(r.childNodes[n], this[i].childNodes[0])
        } else if (t instanceof ni)
        for (n = 0; n < t.length; n += 1) this[i].insertBefore(t[n], this[i].childNodes[0]);
    else this[i].insertBefore(t, this[i].childNodes[0]);
    return this
}

function W0(t) {
    return this.length > 0 ? t ? this[0].nextElementSibling && N(this[0].nextElementSibling).is(t) ? N([this[0].nextElementSibling]) : N([]) : this[0].nextElementSibling ? N([this[0].nextElementSibling]) : N([]) : N([])
}

function U0(t) {
    const e = [];
    let i = this[0];
    if (!i) return N([]);
    for (; i.nextElementSibling;) {
        const n = i.nextElementSibling;
        t ? N(n).is(t) && e.push(n) : e.push(n), i = n
    }
    return N(e)
}

function G0(t) {
    if (this.length > 0) {
        const e = this[0];
        return t ? e.previousElementSibling && N(e.previousElementSibling).is(t) ? N([e.previousElementSibling]) : N([]) : e.previousElementSibling ? N([e.previousElementSibling]) : N([])
    }
    return N([])
}

function Y0(t) {
    const e = [];
    let i = this[0];
    if (!i) return N([]);
    for (; i.previousElementSibling;) {
        const n = i.previousElementSibling;
        t ? N(n).is(t) && e.push(n) : e.push(n), i = n
    }
    return N(e)
}

function X0(t) {
    const e = [];
    for (let i = 0; i < this.length; i += 1) this[i].parentNode !== null && (t ? N(this[i].parentNode).is(t) && e.push(this[i].parentNode) : e.push(this[i].parentNode));
    return N(e)
}

function K0(t) {
    const e = [];
    for (let i = 0; i < this.length; i += 1) {
        let n = this[i].parentNode;
        for (; n;) t ? N(n).is(t) && e.push(n) : e.push(n), n = n.parentNode
    }
    return N(e)
}

function Q0(t) {
    let e = this;
    return typeof t > "u" ? N([]) : (e.is(t) || (e = e.parents(t).eq(0)), e)
}

function J0(t) {
    const e = [];
    for (let i = 0; i < this.length; i += 1) {
        const n = this[i].querySelectorAll(t);
        for (let r = 0; r < n.length; r += 1) e.push(n[r])
    }
    return N(e)
}

function em(t) {
    const e = [];
    for (let i = 0; i < this.length; i += 1) {
        const n = this[i].children;
        for (let r = 0; r < n.length; r += 1)(!t || N(n[r]).is(t)) && e.push(n[r])
    }
    return N(e)
}

function tm() {
    for (let t = 0; t < this.length; t += 1) this[t].parentNode && this[t].parentNode.removeChild(this[t]);
    return this
}
const Oo = {
    addClass: w0,
    removeClass: _0,
    hasClass: x0,
    toggleClass: E0,
    attr: C0,
    removeAttr: S0,
    transform: T0,
    transition: M0,
    on: $0,
    off: A0,
    trigger: P0,
    transitionEnd: O0,
    outerWidth: k0,
    outerHeight: L0,
    styles: D0,
    offset: I0,
    css: R0,
    each: H0,
    html: N0,
    text: F0,
    is: q0,
    index: V0,
    eq: j0,
    append: B0,
    prepend: Z0,
    next: W0,
    nextAll: U0,
    prev: G0,
    prevAll: Y0,
    parent: X0,
    parents: K0,
    closest: Q0,
    find: J0,
    children: em,
    filter: z0,
    remove: tm
};
Object.keys(Oo).forEach(t => {
    Object.defineProperty(N.fn, t, {
        value: Oo[t],
        writable: !0
    })
});

function im(t) {
    const e = t;
    Object.keys(e).forEach(i => {
        try {
            e[i] = null
        } catch {}
        try {
            delete e[i]
        } catch {}
    })
}

function ci(t, e) {
    return e === void 0 && (e = 0), setTimeout(t, e)
}

function vt() {
    return Date.now()
}

function nm(t) {
    const e = Oe();
    let i;
    return e.getComputedStyle && (i = e.getComputedStyle(t, null)), !i && t.currentStyle && (i = t.currentStyle), i || (i = t.style), i
}

function sa(t, e) {
    e === void 0 && (e = "x");
    const i = Oe();
    let n, r, s;
    const a = nm(t);
    return i.WebKitCSSMatrix ? (r = a.transform || a.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(o => o.replace(",", ".")).join(", ")), s = new i.WebKitCSSMatrix(r === "none" ? "" : r)) : (s = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), n = s.toString().split(",")), e === "x" && (i.WebKitCSSMatrix ? r = s.m41 : n.length === 16 ? r = parseFloat(n[12]) : r = parseFloat(n[4])), e === "y" && (i.WebKitCSSMatrix ? r = s.m42 : n.length === 16 ? r = parseFloat(n[13]) : r = parseFloat(n[5])), r || 0
}

function bn(t) {
    return typeof t == "object" && t !== null && t.constructor && Object.prototype.toString.call(t).slice(8, -1) === "Object"
}

function rm(t) {
    return typeof window < "u" && typeof window.HTMLElement < "u" ? t instanceof HTMLElement : t && (t.nodeType === 1 || t.nodeType === 11)
}

function gt() {
    const t = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        e = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
        const n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        if (n != null && !rm(n)) {
            const r = Object.keys(Object(n)).filter(s => e.indexOf(s) < 0);
            for (let s = 0, a = r.length; s < a; s += 1) {
                const o = r[s],
                    l = Object.getOwnPropertyDescriptor(n, o);
                l !== void 0 && l.enumerable && (bn(t[o]) && bn(n[o]) ? n[o].__swiper__ ? t[o] = n[o] : gt(t[o], n[o]) : !bn(t[o]) && bn(n[o]) ? (t[o] = {}, n[o].__swiper__ ? t[o] = n[o] : gt(t[o], n[o])) : t[o] = n[o])
            }
        }
    }
    return t
}

function wn(t, e, i) {
    t.style.setProperty(e, i)
}

function Jc(t) {
    let {
        swiper: e,
        targetPosition: i,
        side: n
    } = t;
    const r = Oe(),
        s = -e.translate;
    let a = null,
        o;
    const l = e.params.speed;
    e.wrapperEl.style.scrollSnapType = "none", r.cancelAnimationFrame(e.cssModeFrameID);
    const c = i > s ? "next" : "prev",
        d = (f, h) => c === "next" && f >= h || c === "prev" && f <= h,
        u = () => {
            o = new Date().getTime(), a === null && (a = o);
            const f = Math.max(Math.min((o - a) / l, 1), 0),
                h = .5 - Math.cos(f * Math.PI) / 2;
            let v = s + h * (i - s);
            if (d(v, i) && (v = i), e.wrapperEl.scrollTo({
                    [n]: v
                }), d(v, i)) {
                e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
                    e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
                        [n]: v
                    })
                }), r.cancelAnimationFrame(e.cssModeFrameID);
                return
            }
            e.cssModeFrameID = r.requestAnimationFrame(u)
        };
    u()
}
let ws;

function sm() {
    const t = Oe(),
        e = Ze();
    return {
        smoothScroll: e.documentElement && "scrollBehavior" in e.documentElement.style,
        touch: !!("ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch),
        passiveListener: function() {
            let n = !1;
            try {
                const r = Object.defineProperty({}, "passive", {
                    get() {
                        n = !0
                    }
                });
                t.addEventListener("testPassiveListener", null, r)
            } catch {}
            return n
        }(),
        gestures: function() {
            return "ongesturestart" in t
        }()
    }
}

function ed() {
    return ws || (ws = sm()), ws
}
let _s;

function am(t) {
    let {
        userAgent: e
    } = t === void 0 ? {} : t;
    const i = ed(),
        n = Oe(),
        r = n.navigator.platform,
        s = e || n.navigator.userAgent,
        a = {
            ios: !1,
            android: !1
        },
        o = n.screen.width,
        l = n.screen.height,
        c = s.match(/(Android);?[\s\/]+([\d.]+)?/);
    let d = s.match(/(iPad).*OS\s([\d_]+)/);
    const u = s.match(/(iPod)(.*OS\s([\d_]+))?/),
        f = !d && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
        h = r === "Win32";
    let v = r === "MacIntel";
    const b = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    return !d && v && i.touch && b.indexOf(`${o}x${l}`) >= 0 && (d = s.match(/(Version)\/([\d.]+)/), d || (d = [0, 1, "13_0_0"]), v = !1), c && !h && (a.os = "android", a.android = !0), (d || f || u) && (a.os = "ios", a.ios = !0), a
}

function om(t) {
    return t === void 0 && (t = {}), _s || (_s = am(t)), _s
}
let Es;

function lm() {
    const t = Oe();

    function e() {
        const i = t.navigator.userAgent.toLowerCase();
        return i.indexOf("safari") >= 0 && i.indexOf("chrome") < 0 && i.indexOf("android") < 0
    }
    return {
        isSafari: e(),
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
    }
}

function cm() {
    return Es || (Es = lm()), Es
}

function dm(t) {
    let {
        swiper: e,
        on: i,
        emit: n
    } = t;
    const r = Oe();
    let s = null,
        a = null;
    const o = () => {
            !e || e.destroyed || !e.initialized || (n("beforeResize"), n("resize"))
        },
        l = () => {
            !e || e.destroyed || !e.initialized || (s = new ResizeObserver(u => {
                a = r.requestAnimationFrame(() => {
                    const {
                        width: f,
                        height: h
                    } = e;
                    let v = f,
                        b = h;
                    u.forEach(p => {
                        let {
                            contentBoxSize: g,
                            contentRect: _,
                            target: y
                        } = p;
                        y && y !== e.el || (v = _ ? _.width : (g[0] || g).inlineSize, b = _ ? _.height : (g[0] || g).blockSize)
                    }), (v !== f || b !== h) && o()
                })
            }), s.observe(e.el))
        },
        c = () => {
            a && r.cancelAnimationFrame(a), s && s.unobserve && e.el && (s.unobserve(e.el), s = null)
        },
        d = () => {
            !e || e.destroyed || !e.initialized || n("orientationchange")
        };
    i("init", () => {
        if (e.params.resizeObserver && typeof r.ResizeObserver < "u") {
            l();
            return
        }
        r.addEventListener("resize", o), r.addEventListener("orientationchange", d)
    }), i("destroy", () => {
        c(), r.removeEventListener("resize", o), r.removeEventListener("orientationchange", d)
    })
}

function um(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n,
        emit: r
    } = t;
    const s = [],
        a = Oe(),
        o = function(d, u) {
            u === void 0 && (u = {});
            const f = a.MutationObserver || a.WebkitMutationObserver,
                h = new f(v => {
                    if (v.length === 1) {
                        r("observerUpdate", v[0]);
                        return
                    }
                    const b = function() {
                        r("observerUpdate", v[0])
                    };
                    a.requestAnimationFrame ? a.requestAnimationFrame(b) : a.setTimeout(b, 0)
                });
            h.observe(d, {
                attributes: typeof u.attributes > "u" ? !0 : u.attributes,
                childList: typeof u.childList > "u" ? !0 : u.childList,
                characterData: typeof u.characterData > "u" ? !0 : u.characterData
            }), s.push(h)
        },
        l = () => {
            if (e.params.observer) {
                if (e.params.observeParents) {
                    const d = e.$el.parents();
                    for (let u = 0; u < d.length; u += 1) o(d[u])
                }
                o(e.$el[0], {
                    childList: e.params.observeSlideChildren
                }), o(e.$wrapperEl[0], {
                    attributes: !1
                })
            }
        },
        c = () => {
            s.forEach(d => {
                d.disconnect()
            }), s.splice(0, s.length)
        };
    i({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
    }), n("init", l), n("destroy", c)
}
const fm = {
    on(t, e, i) {
        const n = this;
        if (!n.eventsListeners || n.destroyed || typeof e != "function") return n;
        const r = i ? "unshift" : "push";
        return t.split(" ").forEach(s => {
            n.eventsListeners[s] || (n.eventsListeners[s] = []), n.eventsListeners[s][r](e)
        }), n
    },
    once(t, e, i) {
        const n = this;
        if (!n.eventsListeners || n.destroyed || typeof e != "function") return n;

        function r() {
            n.off(t, r), r.__emitterProxy && delete r.__emitterProxy;
            for (var s = arguments.length, a = new Array(s), o = 0; o < s; o++) a[o] = arguments[o];
            e.apply(n, a)
        }
        return r.__emitterProxy = e, n.on(t, r, i)
    },
    onAny(t, e) {
        const i = this;
        if (!i.eventsListeners || i.destroyed || typeof t != "function") return i;
        const n = e ? "unshift" : "push";
        return i.eventsAnyListeners.indexOf(t) < 0 && i.eventsAnyListeners[n](t), i
    },
    offAny(t) {
        const e = this;
        if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
        const i = e.eventsAnyListeners.indexOf(t);
        return i >= 0 && e.eventsAnyListeners.splice(i, 1), e
    },
    off(t, e) {
        const i = this;
        return !i.eventsListeners || i.destroyed || !i.eventsListeners || t.split(" ").forEach(n => {
            typeof e > "u" ? i.eventsListeners[n] = [] : i.eventsListeners[n] && i.eventsListeners[n].forEach((r, s) => {
                (r === e || r.__emitterProxy && r.__emitterProxy === e) && i.eventsListeners[n].splice(s, 1)
            })
        }), i
    },
    emit() {
        const t = this;
        if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
        let e, i, n;
        for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++) s[a] = arguments[a];
        return typeof s[0] == "string" || Array.isArray(s[0]) ? (e = s[0], i = s.slice(1, s.length), n = t) : (e = s[0].events, i = s[0].data, n = s[0].context || t), i.unshift(n), (Array.isArray(e) ? e : e.split(" ")).forEach(l => {
            t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach(c => {
                c.apply(n, [l, ...i])
            }), t.eventsListeners && t.eventsListeners[l] && t.eventsListeners[l].forEach(c => {
                c.apply(n, i)
            })
        }), t
    }
};

function pm() {
    const t = this;
    let e, i;
    const n = t.$el;
    typeof t.params.width < "u" && t.params.width !== null ? e = t.params.width : e = n[0].clientWidth, typeof t.params.height < "u" && t.params.height !== null ? i = t.params.height : i = n[0].clientHeight, !(e === 0 && t.isHorizontal() || i === 0 && t.isVertical()) && (e = e - parseInt(n.css("padding-left") || 0, 10) - parseInt(n.css("padding-right") || 0, 10), i = i - parseInt(n.css("padding-top") || 0, 10) - parseInt(n.css("padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(i) && (i = 0), Object.assign(t, {
        width: e,
        height: i,
        size: t.isHorizontal() ? e : i
    }))
}

function hm() {
    const t = this;

    function e(L) {
        return t.isHorizontal() ? L : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom"
        }[L]
    }

    function i(L, M) {
        return parseFloat(L.getPropertyValue(e(M)) || 0)
    }
    const n = t.params,
        {
            $wrapperEl: r,
            size: s,
            rtlTranslate: a,
            wrongRTL: o
        } = t,
        l = t.virtual && n.virtual.enabled,
        c = l ? t.virtual.slides.length : t.slides.length,
        d = r.children(`.${t.params.slideClass}`),
        u = l ? t.virtual.slides.length : d.length;
    let f = [];
    const h = [],
        v = [];
    let b = n.slidesOffsetBefore;
    typeof b == "function" && (b = n.slidesOffsetBefore.call(t));
    let p = n.slidesOffsetAfter;
    typeof p == "function" && (p = n.slidesOffsetAfter.call(t));
    const g = t.snapGrid.length,
        _ = t.slidesGrid.length;
    let y = n.spaceBetween,
        E = -b,
        q = 0,
        P = 0;
    if (typeof s > "u") return;
    typeof y == "string" && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * s), t.virtualSize = -y, a ? d.css({
        marginLeft: "",
        marginBottom: "",
        marginTop: ""
    }) : d.css({
        marginRight: "",
        marginBottom: "",
        marginTop: ""
    }), n.centeredSlides && n.cssMode && (wn(t.wrapperEl, "--swiper-centered-offset-before", ""), wn(t.wrapperEl, "--swiper-centered-offset-after", ""));
    const z = n.grid && n.grid.rows > 1 && t.grid;
    z && t.grid.initSlides(u);
    let k;
    const V = n.slidesPerView === "auto" && n.breakpoints && Object.keys(n.breakpoints).filter(L => typeof n.breakpoints[L].slidesPerView < "u").length > 0;
    for (let L = 0; L < u; L += 1) {
        k = 0;
        const M = d.eq(L);
        if (z && t.grid.updateSlide(L, M, u, e), M.css("display") !== "none") {
            if (n.slidesPerView === "auto") {
                V && (d[L].style[e("width")] = "");
                const x = getComputedStyle(M[0]),
                    D = M[0].style.transform,
                    F = M[0].style.webkitTransform;
                if (D && (M[0].style.transform = "none"), F && (M[0].style.webkitTransform = "none"), n.roundLengths) k = t.isHorizontal() ? M.outerWidth(!0) : M.outerHeight(!0);
                else {
                    const se = i(x, "width"),
                        te = i(x, "padding-left"),
                        A = i(x, "padding-right"),
                        G = i(x, "margin-left"),
                        Z = i(x, "margin-right"),
                        me = x.getPropertyValue("box-sizing");
                    if (me && me === "border-box") k = se + G + Z;
                    else {
                        const {
                            clientWidth: _e,
                            offsetWidth: Je
                        } = M[0];
                        k = se + te + A + G + Z + (Je - _e)
                    }
                }
                D && (M[0].style.transform = D), F && (M[0].style.webkitTransform = F), n.roundLengths && (k = Math.floor(k))
            } else k = (s - (n.slidesPerView - 1) * y) / n.slidesPerView, n.roundLengths && (k = Math.floor(k)), d[L] && (d[L].style[e("width")] = `${k}px`);
            d[L] && (d[L].swiperSlideSize = k), v.push(k), n.centeredSlides ? (E = E + k / 2 + q / 2 + y, q === 0 && L !== 0 && (E = E - s / 2 - y), L === 0 && (E = E - s / 2 - y), Math.abs(E) < 1 / 1e3 && (E = 0), n.roundLengths && (E = Math.floor(E)), P % n.slidesPerGroup === 0 && f.push(E), h.push(E)) : (n.roundLengths && (E = Math.floor(E)), (P - Math.min(t.params.slidesPerGroupSkip, P)) % t.params.slidesPerGroup === 0 && f.push(E), h.push(E), E = E + k + y), t.virtualSize += k + y, q = k, P += 1
        }
    }
    if (t.virtualSize = Math.max(t.virtualSize, s) + p, a && o && (n.effect === "slide" || n.effect === "coverflow") && r.css({
            width: `${t.virtualSize+n.spaceBetween}px`
        }), n.setWrapperSize && r.css({
            [e("width")]: `${t.virtualSize+n.spaceBetween}px`
        }), z && t.grid.updateWrapperSize(k, f, e), !n.centeredSlides) {
        const L = [];
        for (let M = 0; M < f.length; M += 1) {
            let x = f[M];
            n.roundLengths && (x = Math.floor(x)), f[M] <= t.virtualSize - s && L.push(x)
        }
        f = L, Math.floor(t.virtualSize - s) - Math.floor(f[f.length - 1]) > 1 && f.push(t.virtualSize - s)
    }
    if (f.length === 0 && (f = [0]), n.spaceBetween !== 0) {
        const L = t.isHorizontal() && a ? "marginLeft" : e("marginRight");
        d.filter((M, x) => n.cssMode ? x !== d.length - 1 : !0).css({
            [L]: `${y}px`
        })
    }
    if (n.centeredSlides && n.centeredSlidesBounds) {
        let L = 0;
        v.forEach(x => {
            L += x + (n.spaceBetween ? n.spaceBetween : 0)
        }), L -= n.spaceBetween;
        const M = L - s;
        f = f.map(x => x < 0 ? -b : x > M ? M + p : x)
    }
    if (n.centerInsufficientSlides) {
        let L = 0;
        if (v.forEach(M => {
                L += M + (n.spaceBetween ? n.spaceBetween : 0)
            }), L -= n.spaceBetween, L < s) {
            const M = (s - L) / 2;
            f.forEach((x, D) => {
                f[D] = x - M
            }), h.forEach((x, D) => {
                h[D] = x + M
            })
        }
    }
    if (Object.assign(t, {
            slides: d,
            snapGrid: f,
            slidesGrid: h,
            slidesSizesGrid: v
        }), n.centeredSlides && n.cssMode && !n.centeredSlidesBounds) {
        wn(t.wrapperEl, "--swiper-centered-offset-before", `${-f[0]}px`), wn(t.wrapperEl, "--swiper-centered-offset-after", `${t.size/2-v[v.length-1]/2}px`);
        const L = -t.snapGrid[0],
            M = -t.slidesGrid[0];
        t.snapGrid = t.snapGrid.map(x => x + L), t.slidesGrid = t.slidesGrid.map(x => x + M)
    }
    if (u !== c && t.emit("slidesLengthChange"), f.length !== g && (t.params.watchOverflow && t.checkOverflow(), t.emit("snapGridLengthChange")), h.length !== _ && t.emit("slidesGridLengthChange"), n.watchSlidesProgress && t.updateSlidesOffset(), !l && !n.cssMode && (n.effect === "slide" || n.effect === "fade")) {
        const L = `${n.containerModifierClass}backface-hidden`,
            M = t.$el.hasClass(L);
        u <= n.maxBackfaceHiddenSlides ? M || t.$el.addClass(L) : M && t.$el.removeClass(L)
    }
}

function mm(t) {
    const e = this,
        i = [],
        n = e.virtual && e.params.virtual.enabled;
    let r = 0,
        s;
    typeof t == "number" ? e.setTransition(t) : t === !0 && e.setTransition(e.params.speed);
    const a = o => n ? e.slides.filter(l => parseInt(l.getAttribute("data-swiper-slide-index"), 10) === o)[0] : e.slides.eq(o)[0];
    if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
        if (e.params.centeredSlides)(e.visibleSlides || N([])).each(o => {
            i.push(o)
        });
        else
            for (s = 0; s < Math.ceil(e.params.slidesPerView); s += 1) {
                const o = e.activeIndex + s;
                if (o > e.slides.length && !n) break;
                i.push(a(o))
            } else i.push(a(e.activeIndex));
    for (s = 0; s < i.length; s += 1)
        if (typeof i[s] < "u") {
            const o = i[s].offsetHeight;
            r = o > r ? o : r
        }(r || r === 0) && e.$wrapperEl.css("height", `${r}px`)
}

function gm() {
    const t = this,
        e = t.slides;
    for (let i = 0; i < e.length; i += 1) e[i].swiperSlideOffset = t.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop
}

function vm(t) {
    t === void 0 && (t = this && this.translate || 0);
    const e = this,
        i = e.params,
        {
            slides: n,
            rtlTranslate: r,
            snapGrid: s
        } = e;
    if (n.length === 0) return;
    typeof n[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
    let a = -t;
    r && (a = t), n.removeClass(i.slideVisibleClass), e.visibleSlidesIndexes = [], e.visibleSlides = [];
    for (let o = 0; o < n.length; o += 1) {
        const l = n[o];
        let c = l.swiperSlideOffset;
        i.cssMode && i.centeredSlides && (c -= n[0].swiperSlideOffset);
        const d = (a + (i.centeredSlides ? e.minTranslate() : 0) - c) / (l.swiperSlideSize + i.spaceBetween),
            u = (a - s[0] + (i.centeredSlides ? e.minTranslate() : 0) - c) / (l.swiperSlideSize + i.spaceBetween),
            f = -(a - c),
            h = f + e.slidesSizesGrid[o];
        (f >= 0 && f < e.size - 1 || h > 1 && h <= e.size || f <= 0 && h >= e.size) && (e.visibleSlides.push(l), e.visibleSlidesIndexes.push(o), n.eq(o).addClass(i.slideVisibleClass)), l.progress = r ? -d : d, l.originalProgress = r ? -u : u
    }
    e.visibleSlides = N(e.visibleSlides)
}

function ym(t) {
    const e = this;
    if (typeof t > "u") {
        const c = e.rtlTranslate ? -1 : 1;
        t = e && e.translate && e.translate * c || 0
    }
    const i = e.params,
        n = e.maxTranslate() - e.minTranslate();
    let {
        progress: r,
        isBeginning: s,
        isEnd: a
    } = e;
    const o = s,
        l = a;
    n === 0 ? (r = 0, s = !0, a = !0) : (r = (t - e.minTranslate()) / n, s = r <= 0, a = r >= 1), Object.assign(e, {
        progress: r,
        isBeginning: s,
        isEnd: a
    }), (i.watchSlidesProgress || i.centeredSlides && i.autoHeight) && e.updateSlidesProgress(t), s && !o && e.emit("reachBeginning toEdge"), a && !l && e.emit("reachEnd toEdge"), (o && !s || l && !a) && e.emit("fromEdge"), e.emit("progress", r)
}

function bm() {
    const t = this,
        {
            slides: e,
            params: i,
            $wrapperEl: n,
            activeIndex: r,
            realIndex: s
        } = t,
        a = t.virtual && i.virtual.enabled;
    e.removeClass(`${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`);
    let o;
    a ? o = t.$wrapperEl.find(`.${i.slideClass}[data-swiper-slide-index="${r}"]`) : o = e.eq(r), o.addClass(i.slideActiveClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? n.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${s}"]`).addClass(i.slideDuplicateActiveClass) : n.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${s}"]`).addClass(i.slideDuplicateActiveClass));
    let l = o.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
    i.loop && l.length === 0 && (l = e.eq(0), l.addClass(i.slideNextClass));
    let c = o.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
    i.loop && c.length === 0 && (c = e.eq(-1), c.addClass(i.slidePrevClass)), i.loop && (l.hasClass(i.slideDuplicateClass) ? n.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicateNextClass) : n.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicateNextClass), c.hasClass(i.slideDuplicateClass) ? n.children(`.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicatePrevClass) : n.children(`.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(i.slideDuplicatePrevClass)), t.emitSlidesClasses()
}

function wm(t) {
    const e = this,
        i = e.rtlTranslate ? e.translate : -e.translate,
        {
            slidesGrid: n,
            snapGrid: r,
            params: s,
            activeIndex: a,
            realIndex: o,
            snapIndex: l
        } = e;
    let c = t,
        d;
    if (typeof c > "u") {
        for (let f = 0; f < n.length; f += 1) typeof n[f + 1] < "u" ? i >= n[f] && i < n[f + 1] - (n[f + 1] - n[f]) / 2 ? c = f : i >= n[f] && i < n[f + 1] && (c = f + 1) : i >= n[f] && (c = f);
        s.normalizeSlideIndex && (c < 0 || typeof c > "u") && (c = 0)
    }
    if (r.indexOf(i) >= 0) d = r.indexOf(i);
    else {
        const f = Math.min(s.slidesPerGroupSkip, c);
        d = f + Math.floor((c - f) / s.slidesPerGroup)
    }
    if (d >= r.length && (d = r.length - 1), c === a) {
        d !== l && (e.snapIndex = d, e.emit("snapIndexChange"));
        return
    }
    const u = parseInt(e.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
    Object.assign(e, {
        snapIndex: d,
        realIndex: u,
        previousIndex: a,
        activeIndex: c
    }), e.emit("activeIndexChange"), e.emit("snapIndexChange"), o !== u && e.emit("realIndexChange"), (e.initialized || e.params.runCallbacksOnInit) && e.emit("slideChange")
}

function _m(t) {
    const e = this,
        i = e.params,
        n = N(t).closest(`.${i.slideClass}`)[0];
    let r = !1,
        s;
    if (n) {
        for (let a = 0; a < e.slides.length; a += 1)
            if (e.slides[a] === n) {
                r = !0, s = a;
                break
            }
    }
    if (n && r) e.clickedSlide = n, e.virtual && e.params.virtual.enabled ? e.clickedIndex = parseInt(N(n).attr("data-swiper-slide-index"), 10) : e.clickedIndex = s;
    else {
        e.clickedSlide = void 0, e.clickedIndex = void 0;
        return
    }
    i.slideToClickedSlide && e.clickedIndex !== void 0 && e.clickedIndex !== e.activeIndex && e.slideToClickedSlide()
}
const Em = {
    updateSize: pm,
    updateSlides: hm,
    updateAutoHeight: mm,
    updateSlidesOffset: gm,
    updateSlidesProgress: vm,
    updateProgress: ym,
    updateSlidesClasses: bm,
    updateActiveIndex: wm,
    updateClickedSlide: _m
};

function xm(t) {
    t === void 0 && (t = this.isHorizontal() ? "x" : "y");
    const e = this,
        {
            params: i,
            rtlTranslate: n,
            translate: r,
            $wrapperEl: s
        } = e;
    if (i.virtualTranslate) return n ? -r : r;
    if (i.cssMode) return r;
    let a = sa(s[0], t);
    return n && (a = -a), a || 0
}

function Cm(t, e) {
    const i = this,
        {
            rtlTranslate: n,
            params: r,
            $wrapperEl: s,
            wrapperEl: a,
            progress: o
        } = i;
    let l = 0,
        c = 0;
    const d = 0;
    i.isHorizontal() ? l = n ? -t : t : c = t, r.roundLengths && (l = Math.floor(l), c = Math.floor(c)), r.cssMode ? a[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -l : -c : r.virtualTranslate || s.transform(`translate3d(${l}px, ${c}px, ${d}px)`), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? l : c;
    let u;
    const f = i.maxTranslate() - i.minTranslate();
    f === 0 ? u = 0 : u = (t - i.minTranslate()) / f, u !== o && i.updateProgress(t), i.emit("setTranslate", i.translate, e)
}

function Sm() {
    return -this.snapGrid[0]
}

function Tm() {
    return -this.snapGrid[this.snapGrid.length - 1]
}

function Mm(t, e, i, n, r) {
    t === void 0 && (t = 0), e === void 0 && (e = this.params.speed), i === void 0 && (i = !0), n === void 0 && (n = !0);
    const s = this,
        {
            params: a,
            wrapperEl: o
        } = s;
    if (s.animating && a.preventInteractionOnTransition) return !1;
    const l = s.minTranslate(),
        c = s.maxTranslate();
    let d;
    if (n && t > l ? d = l : n && t < c ? d = c : d = t, s.updateProgress(d), a.cssMode) {
        const u = s.isHorizontal();
        if (e === 0) o[u ? "scrollLeft" : "scrollTop"] = -d;
        else {
            if (!s.support.smoothScroll) return Jc({
                swiper: s,
                targetPosition: -d,
                side: u ? "left" : "top"
            }), !0;
            o.scrollTo({
                [u ? "left" : "top"]: -d,
                behavior: "smooth"
            })
        }
        return !0
    }
    return e === 0 ? (s.setTransition(0), s.setTranslate(d), i && (s.emit("beforeTransitionStart", e, r), s.emit("transitionEnd"))) : (s.setTransition(e), s.setTranslate(d), i && (s.emit("beforeTransitionStart", e, r), s.emit("transitionStart")), s.animating || (s.animating = !0, s.onTranslateToWrapperTransitionEnd || (s.onTranslateToWrapperTransitionEnd = function(f) {
        !s || s.destroyed || f.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onTranslateToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onTranslateToWrapperTransitionEnd), s.onTranslateToWrapperTransitionEnd = null, delete s.onTranslateToWrapperTransitionEnd, i && s.emit("transitionEnd"))
    }), s.$wrapperEl[0].addEventListener("transitionend", s.onTranslateToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onTranslateToWrapperTransitionEnd))), !0
}
const $m = {
    getTranslate: xm,
    setTranslate: Cm,
    minTranslate: Sm,
    maxTranslate: Tm,
    translateTo: Mm
};

function Am(t, e) {
    const i = this;
    i.params.cssMode || i.$wrapperEl.transition(t), i.emit("setTransition", t, e)
}

function td(t) {
    let {
        swiper: e,
        runCallbacks: i,
        direction: n,
        step: r
    } = t;
    const {
        activeIndex: s,
        previousIndex: a
    } = e;
    let o = n;
    if (o || (s > a ? o = "next" : s < a ? o = "prev" : o = "reset"), e.emit(`transition${r}`), i && s !== a) {
        if (o === "reset") {
            e.emit(`slideResetTransition${r}`);
            return
        }
        e.emit(`slideChangeTransition${r}`), o === "next" ? e.emit(`slideNextTransition${r}`) : e.emit(`slidePrevTransition${r}`)
    }
}

function Pm(t, e) {
    t === void 0 && (t = !0);
    const i = this,
        {
            params: n
        } = i;
    n.cssMode || (n.autoHeight && i.updateAutoHeight(), td({
        swiper: i,
        runCallbacks: t,
        direction: e,
        step: "Start"
    }))
}

function Om(t, e) {
    t === void 0 && (t = !0);
    const i = this,
        {
            params: n
        } = i;
    i.animating = !1, !n.cssMode && (i.setTransition(0), td({
        swiper: i,
        runCallbacks: t,
        direction: e,
        step: "End"
    }))
}
const km = {
    setTransition: Am,
    transitionStart: Pm,
    transitionEnd: Om
};

function Lm(t, e, i, n, r) {
    if (t === void 0 && (t = 0), e === void 0 && (e = this.params.speed), i === void 0 && (i = !0), typeof t != "number" && typeof t != "string") throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof t}] given.`);
    if (typeof t == "string") {
        const y = parseInt(t, 10);
        if (!isFinite(y)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${t}] given.`);
        t = y
    }
    const s = this;
    let a = t;
    a < 0 && (a = 0);
    const {
        params: o,
        snapGrid: l,
        slidesGrid: c,
        previousIndex: d,
        activeIndex: u,
        rtlTranslate: f,
        wrapperEl: h,
        enabled: v
    } = s;
    if (s.animating && o.preventInteractionOnTransition || !v && !n && !r) return !1;
    const b = Math.min(s.params.slidesPerGroupSkip, a);
    let p = b + Math.floor((a - b) / s.params.slidesPerGroup);
    p >= l.length && (p = l.length - 1), (u || o.initialSlide || 0) === (d || 0) && i && s.emit("beforeSlideChangeStart");
    const g = -l[p];
    if (s.updateProgress(g), o.normalizeSlideIndex)
        for (let y = 0; y < c.length; y += 1) {
            const E = -Math.floor(g * 100),
                q = Math.floor(c[y] * 100),
                P = Math.floor(c[y + 1] * 100);
            typeof c[y + 1] < "u" ? E >= q && E < P - (P - q) / 2 ? a = y : E >= q && E < P && (a = y + 1) : E >= q && (a = y)
        }
    if (s.initialized && a !== u && (!s.allowSlideNext && g < s.translate && g < s.minTranslate() || !s.allowSlidePrev && g > s.translate && g > s.maxTranslate() && (u || 0) !== a)) return !1;
    let _;
    if (a > u ? _ = "next" : a < u ? _ = "prev" : _ = "reset", f && -g === s.translate || !f && g === s.translate) return s.updateActiveIndex(a), o.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), o.effect !== "slide" && s.setTranslate(g), _ !== "reset" && (s.transitionStart(i, _), s.transitionEnd(i, _)), !1;
    if (o.cssMode) {
        const y = s.isHorizontal(),
            E = f ? g : -g;
        if (e === 0) {
            const q = s.virtual && s.params.virtual.enabled;
            q && (s.wrapperEl.style.scrollSnapType = "none", s._immediateVirtual = !0), h[y ? "scrollLeft" : "scrollTop"] = E, q && requestAnimationFrame(() => {
                s.wrapperEl.style.scrollSnapType = "", s._swiperImmediateVirtual = !1
            })
        } else {
            if (!s.support.smoothScroll) return Jc({
                swiper: s,
                targetPosition: E,
                side: y ? "left" : "top"
            }), !0;
            h.scrollTo({
                [y ? "left" : "top"]: E,
                behavior: "smooth"
            })
        }
        return !0
    }
    return s.setTransition(e), s.setTranslate(g), s.updateActiveIndex(a), s.updateSlidesClasses(), s.emit("beforeTransitionStart", e, n), s.transitionStart(i, _), e === 0 ? s.transitionEnd(i, _) : s.animating || (s.animating = !0, s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function(E) {
        !s || s.destroyed || E.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd), s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, s.transitionEnd(i, _))
    }), s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd)), !0
}

function Im(t, e, i, n) {
    if (t === void 0 && (t = 0), e === void 0 && (e = this.params.speed), i === void 0 && (i = !0), typeof t == "string") {
        const a = parseInt(t, 10);
        if (!isFinite(a)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${t}] given.`);
        t = a
    }
    const r = this;
    let s = t;
    return r.params.loop && (s += r.loopedSlides), r.slideTo(s, e, i, n)
}

function Dm(t, e, i) {
    t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
    const n = this,
        {
            animating: r,
            enabled: s,
            params: a
        } = n;
    if (!s) return n;
    let o = a.slidesPerGroup;
    a.slidesPerView === "auto" && a.slidesPerGroup === 1 && a.slidesPerGroupAuto && (o = Math.max(n.slidesPerViewDynamic("current", !0), 1));
    const l = n.activeIndex < a.slidesPerGroupSkip ? 1 : o;
    if (a.loop) {
        if (r && a.loopPreventsSlide) return !1;
        n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft
    }
    return a.rewind && n.isEnd ? n.slideTo(0, t, e, i) : n.slideTo(n.activeIndex + l, t, e, i)
}

function Rm(t, e, i) {
    t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
    const n = this,
        {
            params: r,
            animating: s,
            snapGrid: a,
            slidesGrid: o,
            rtlTranslate: l,
            enabled: c
        } = n;
    if (!c) return n;
    if (r.loop) {
        if (s && r.loopPreventsSlide) return !1;
        n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft
    }
    const d = l ? n.translate : -n.translate;

    function u(p) {
        return p < 0 ? -Math.floor(Math.abs(p)) : Math.floor(p)
    }
    const f = u(d),
        h = a.map(p => u(p));
    let v = a[h.indexOf(f) - 1];
    if (typeof v > "u" && r.cssMode) {
        let p;
        a.forEach((g, _) => {
            f >= g && (p = _)
        }), typeof p < "u" && (v = a[p > 0 ? p - 1 : p])
    }
    let b = 0;
    if (typeof v < "u" && (b = o.indexOf(v), b < 0 && (b = n.activeIndex - 1), r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (b = b - n.slidesPerViewDynamic("previous", !0) + 1, b = Math.max(b, 0))), r.rewind && n.isBeginning) {
        const p = n.params.virtual && n.params.virtual.enabled && n.virtual ? n.virtual.slides.length - 1 : n.slides.length - 1;
        return n.slideTo(p, t, e, i)
    }
    return n.slideTo(b, t, e, i)
}

function Hm(t, e, i) {
    t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
    const n = this;
    return n.slideTo(n.activeIndex, t, e, i)
}

function zm(t, e, i, n) {
    t === void 0 && (t = this.params.speed), e === void 0 && (e = !0), n === void 0 && (n = .5);
    const r = this;
    let s = r.activeIndex;
    const a = Math.min(r.params.slidesPerGroupSkip, s),
        o = a + Math.floor((s - a) / r.params.slidesPerGroup),
        l = r.rtlTranslate ? r.translate : -r.translate;
    if (l >= r.snapGrid[o]) {
        const c = r.snapGrid[o],
            d = r.snapGrid[o + 1];
        l - c > (d - c) * n && (s += r.params.slidesPerGroup)
    } else {
        const c = r.snapGrid[o - 1],
            d = r.snapGrid[o];
        l - c <= (d - c) * n && (s -= r.params.slidesPerGroup)
    }
    return s = Math.max(s, 0), s = Math.min(s, r.slidesGrid.length - 1), r.slideTo(s, t, e, i)
}

function Nm() {
    const t = this,
        {
            params: e,
            $wrapperEl: i
        } = t,
        n = e.slidesPerView === "auto" ? t.slidesPerViewDynamic() : e.slidesPerView;
    let r = t.clickedIndex,
        s;
    if (e.loop) {
        if (t.animating) return;
        s = parseInt(N(t.clickedSlide).attr("data-swiper-slide-index"), 10), e.centeredSlides ? r < t.loopedSlides - n / 2 || r > t.slides.length - t.loopedSlides + n / 2 ? (t.loopFix(), r = i.children(`.${e.slideClass}[data-swiper-slide-index="${s}"]:not(.${e.slideDuplicateClass})`).eq(0).index(), ci(() => {
            t.slideTo(r)
        })) : t.slideTo(r) : r > t.slides.length - n ? (t.loopFix(), r = i.children(`.${e.slideClass}[data-swiper-slide-index="${s}"]:not(.${e.slideDuplicateClass})`).eq(0).index(), ci(() => {
            t.slideTo(r)
        })) : t.slideTo(r)
    } else t.slideTo(r)
}
const Fm = {
    slideTo: Lm,
    slideToLoop: Im,
    slideNext: Dm,
    slidePrev: Rm,
    slideReset: Hm,
    slideToClosest: zm,
    slideToClickedSlide: Nm
};

function qm() {
    const t = this,
        e = Ze(),
        {
            params: i,
            $wrapperEl: n
        } = t,
        r = n.children().length > 0 ? N(n.children()[0].parentNode) : n;
    r.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
    let s = r.children(`.${i.slideClass}`);
    if (i.loopFillGroupWithBlank) {
        const l = i.slidesPerGroup - s.length % i.slidesPerGroup;
        if (l !== i.slidesPerGroup) {
            for (let c = 0; c < l; c += 1) {
                const d = N(e.createElement("div")).addClass(`${i.slideClass} ${i.slideBlankClass}`);
                r.append(d)
            }
            s = r.children(`.${i.slideClass}`)
        }
    }
    i.slidesPerView === "auto" && !i.loopedSlides && (i.loopedSlides = s.length), t.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10)), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > s.length && t.params.loopedSlidesLimit && (t.loopedSlides = s.length);
    const a = [],
        o = [];
    s.each((l, c) => {
        N(l).attr("data-swiper-slide-index", c)
    });
    for (let l = 0; l < t.loopedSlides; l += 1) {
        const c = l - Math.floor(l / s.length) * s.length;
        o.push(s.eq(c)[0]), a.unshift(s.eq(s.length - c - 1)[0])
    }
    for (let l = 0; l < o.length; l += 1) r.append(N(o[l].cloneNode(!0)).addClass(i.slideDuplicateClass));
    for (let l = a.length - 1; l >= 0; l -= 1) r.prepend(N(a[l].cloneNode(!0)).addClass(i.slideDuplicateClass))
}

function Vm() {
    const t = this;
    t.emit("beforeLoopFix");
    const {
        activeIndex: e,
        slides: i,
        loopedSlides: n,
        allowSlidePrev: r,
        allowSlideNext: s,
        snapGrid: a,
        rtlTranslate: o
    } = t;
    let l;
    t.allowSlidePrev = !0, t.allowSlideNext = !0;
    const d = -a[e] - t.getTranslate();
    e < n ? (l = i.length - n * 3 + e, l += n, t.slideTo(l, 0, !1, !0) && d !== 0 && t.setTranslate((o ? -t.translate : t.translate) - d)) : e >= i.length - n && (l = -i.length + e + n, l += n, t.slideTo(l, 0, !1, !0) && d !== 0 && t.setTranslate((o ? -t.translate : t.translate) - d)), t.allowSlidePrev = r, t.allowSlideNext = s, t.emit("loopFix")
}

function jm() {
    const t = this,
        {
            $wrapperEl: e,
            params: i,
            slides: n
        } = t;
    e.children(`.${i.slideClass}.${i.slideDuplicateClass},.${i.slideClass}.${i.slideBlankClass}`).remove(), n.removeAttr("data-swiper-slide-index")
}
const Bm = {
    loopCreate: qm,
    loopFix: Vm,
    loopDestroy: jm
};

function Zm(t) {
    const e = this;
    if (e.support.touch || !e.params.simulateTouch || e.params.watchOverflow && e.isLocked || e.params.cssMode) return;
    const i = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
    i.style.cursor = "move", i.style.cursor = t ? "grabbing" : "grab"
}

function Wm() {
    const t = this;
    t.support.touch || t.params.watchOverflow && t.isLocked || t.params.cssMode || (t[t.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "")
}
const Um = {
    setGrabCursor: Zm,
    unsetGrabCursor: Wm
};

function Gm(t, e) {
    e === void 0 && (e = this);

    function i(n) {
        if (!n || n === Ze() || n === Oe()) return null;
        n.assignedSlot && (n = n.assignedSlot);
        const r = n.closest(t);
        return !r && !n.getRootNode ? null : r || i(n.getRootNode().host)
    }
    return i(e)
}

function Ym(t) {
    const e = this,
        i = Ze(),
        n = Oe(),
        r = e.touchEventsData,
        {
            params: s,
            touches: a,
            enabled: o
        } = e;
    if (!o || e.animating && s.preventInteractionOnTransition) return;
    !e.animating && s.cssMode && s.loop && e.loopFix();
    let l = t;
    l.originalEvent && (l = l.originalEvent);
    let c = N(l.target);
    if (s.touchEventsTarget === "wrapper" && !c.closest(e.wrapperEl).length || (r.isTouchEvent = l.type === "touchstart", !r.isTouchEvent && "which" in l && l.which === 3) || !r.isTouchEvent && "button" in l && l.button > 0 || r.isTouched && r.isMoved) return;
    !!s.noSwipingClass && s.noSwipingClass !== "" && l.target && l.target.shadowRoot && t.path && t.path[0] && (c = N(t.path[0]));
    const u = s.noSwipingSelector ? s.noSwipingSelector : `.${s.noSwipingClass}`,
        f = !!(l.target && l.target.shadowRoot);
    if (s.noSwiping && (f ? Gm(u, c[0]) : c.closest(u)[0])) {
        e.allowClick = !0;
        return
    }
    if (s.swipeHandler && !c.closest(s.swipeHandler)[0]) return;
    a.currentX = l.type === "touchstart" ? l.targetTouches[0].pageX : l.pageX, a.currentY = l.type === "touchstart" ? l.targetTouches[0].pageY : l.pageY;
    const h = a.currentX,
        v = a.currentY,
        b = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
        p = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
    if (b && (h <= p || h >= n.innerWidth - p))
        if (b === "prevent") t.preventDefault();
        else return;
    if (Object.assign(r, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0
        }), a.startX = h, a.startY = v, r.touchStartTime = vt(), e.allowClick = !0, e.updateSize(), e.swipeDirection = void 0, s.threshold > 0 && (r.allowThresholdMove = !1), l.type !== "touchstart") {
        let g = !0;
        c.is(r.focusableElements) && (g = !1, c[0].nodeName === "SELECT" && (r.isTouched = !1)), i.activeElement && N(i.activeElement).is(r.focusableElements) && i.activeElement !== c[0] && i.activeElement.blur();
        const _ = g && e.allowTouchMove && s.touchStartPreventDefault;
        (s.touchStartForcePreventDefault || _) && !c[0].isContentEditable && l.preventDefault()
    }
    e.params.freeMode && e.params.freeMode.enabled && e.freeMode && e.animating && !s.cssMode && e.freeMode.onTouchStart(), e.emit("touchStart", l)
}

function Xm(t) {
    const e = Ze(),
        i = this,
        n = i.touchEventsData,
        {
            params: r,
            touches: s,
            rtlTranslate: a,
            enabled: o
        } = i;
    if (!o) return;
    let l = t;
    if (l.originalEvent && (l = l.originalEvent), !n.isTouched) {
        n.startMoving && n.isScrolling && i.emit("touchMoveOpposite", l);
        return
    }
    if (n.isTouchEvent && l.type !== "touchmove") return;
    const c = l.type === "touchmove" && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0]),
        d = l.type === "touchmove" ? c.pageX : l.pageX,
        u = l.type === "touchmove" ? c.pageY : l.pageY;
    if (l.preventedByNestedSwiper) {
        s.startX = d, s.startY = u;
        return
    }
    if (!i.allowTouchMove) {
        N(l.target).is(n.focusableElements) || (i.allowClick = !1), n.isTouched && (Object.assign(s, {
            startX: d,
            startY: u,
            currentX: d,
            currentY: u
        }), n.touchStartTime = vt());
        return
    }
    if (n.isTouchEvent && r.touchReleaseOnEdges && !r.loop) {
        if (i.isVertical()) {
            if (u < s.startY && i.translate <= i.maxTranslate() || u > s.startY && i.translate >= i.minTranslate()) {
                n.isTouched = !1, n.isMoved = !1;
                return
            }
        } else if (d < s.startX && i.translate <= i.maxTranslate() || d > s.startX && i.translate >= i.minTranslate()) return
    }
    if (n.isTouchEvent && e.activeElement && l.target === e.activeElement && N(l.target).is(n.focusableElements)) {
        n.isMoved = !0, i.allowClick = !1;
        return
    }
    if (n.allowTouchCallbacks && i.emit("touchMove", l), l.targetTouches && l.targetTouches.length > 1) return;
    s.currentX = d, s.currentY = u;
    const f = s.currentX - s.startX,
        h = s.currentY - s.startY;
    if (i.params.threshold && Math.sqrt(f ** 2 + h ** 2) < i.params.threshold) return;
    if (typeof n.isScrolling > "u") {
        let g;
        i.isHorizontal() && s.currentY === s.startY || i.isVertical() && s.currentX === s.startX ? n.isScrolling = !1 : f * f + h * h >= 25 && (g = Math.atan2(Math.abs(h), Math.abs(f)) * 180 / Math.PI, n.isScrolling = i.isHorizontal() ? g > r.touchAngle : 90 - g > r.touchAngle)
    }
    if (n.isScrolling && i.emit("touchMoveOpposite", l), typeof n.startMoving > "u" && (s.currentX !== s.startX || s.currentY !== s.startY) && (n.startMoving = !0), n.isScrolling) {
        n.isTouched = !1;
        return
    }
    if (!n.startMoving) return;
    i.allowClick = !1, !r.cssMode && l.cancelable && l.preventDefault(), r.touchMoveStopPropagation && !r.nested && l.stopPropagation(), n.isMoved || (r.loop && !r.cssMode && i.loopFix(), n.startTranslate = i.getTranslate(), i.setTransition(0), i.animating && i.$wrapperEl.trigger("webkitTransitionEnd transitionend"), n.allowMomentumBounce = !1, r.grabCursor && (i.allowSlideNext === !0 || i.allowSlidePrev === !0) && i.setGrabCursor(!0), i.emit("sliderFirstMove", l)), i.emit("sliderMove", l), n.isMoved = !0;
    let v = i.isHorizontal() ? f : h;
    s.diff = v, v *= r.touchRatio, a && (v = -v), i.swipeDirection = v > 0 ? "prev" : "next", n.currentTranslate = v + n.startTranslate;
    let b = !0,
        p = r.resistanceRatio;
    if (r.touchReleaseOnEdges && (p = 0), v > 0 && n.currentTranslate > i.minTranslate() ? (b = !1, r.resistance && (n.currentTranslate = i.minTranslate() - 1 + (-i.minTranslate() + n.startTranslate + v) ** p)) : v < 0 && n.currentTranslate < i.maxTranslate() && (b = !1, r.resistance && (n.currentTranslate = i.maxTranslate() + 1 - (i.maxTranslate() - n.startTranslate - v) ** p)), b && (l.preventedByNestedSwiper = !0), !i.allowSlideNext && i.swipeDirection === "next" && n.currentTranslate < n.startTranslate && (n.currentTranslate = n.startTranslate), !i.allowSlidePrev && i.swipeDirection === "prev" && n.currentTranslate > n.startTranslate && (n.currentTranslate = n.startTranslate), !i.allowSlidePrev && !i.allowSlideNext && (n.currentTranslate = n.startTranslate), r.threshold > 0)
        if (Math.abs(v) > r.threshold || n.allowThresholdMove) {
            if (!n.allowThresholdMove) {
                n.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, n.currentTranslate = n.startTranslate, s.diff = i.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY;
                return
            }
        } else {
            n.currentTranslate = n.startTranslate;
            return
        }!r.followFinger || r.cssMode || ((r.freeMode && r.freeMode.enabled && i.freeMode || r.watchSlidesProgress) && (i.updateActiveIndex(), i.updateSlidesClasses()), i.params.freeMode && r.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(), i.updateProgress(n.currentTranslate), i.setTranslate(n.currentTranslate))
}

function Km(t) {
    const e = this,
        i = e.touchEventsData,
        {
            params: n,
            touches: r,
            rtlTranslate: s,
            slidesGrid: a,
            enabled: o
        } = e;
    if (!o) return;
    let l = t;
    if (l.originalEvent && (l = l.originalEvent), i.allowTouchCallbacks && e.emit("touchEnd", l), i.allowTouchCallbacks = !1, !i.isTouched) {
        i.isMoved && n.grabCursor && e.setGrabCursor(!1), i.isMoved = !1, i.startMoving = !1;
        return
    }
    n.grabCursor && i.isMoved && i.isTouched && (e.allowSlideNext === !0 || e.allowSlidePrev === !0) && e.setGrabCursor(!1);
    const c = vt(),
        d = c - i.touchStartTime;
    if (e.allowClick) {
        const _ = l.path || l.composedPath && l.composedPath();
        e.updateClickedSlide(_ && _[0] || l.target), e.emit("tap click", l), d < 300 && c - i.lastClickTime < 300 && e.emit("doubleTap doubleClick", l)
    }
    if (i.lastClickTime = vt(), ci(() => {
            e.destroyed || (e.allowClick = !0)
        }), !i.isTouched || !i.isMoved || !e.swipeDirection || r.diff === 0 || i.currentTranslate === i.startTranslate) {
        i.isTouched = !1, i.isMoved = !1, i.startMoving = !1;
        return
    }
    i.isTouched = !1, i.isMoved = !1, i.startMoving = !1;
    let u;
    if (n.followFinger ? u = s ? e.translate : -e.translate : u = -i.currentTranslate, n.cssMode) return;
    if (e.params.freeMode && n.freeMode.enabled) {
        e.freeMode.onTouchEnd({
            currentPos: u
        });
        return
    }
    let f = 0,
        h = e.slidesSizesGrid[0];
    for (let _ = 0; _ < a.length; _ += _ < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup) {
        const y = _ < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        typeof a[_ + y] < "u" ? u >= a[_] && u < a[_ + y] && (f = _, h = a[_ + y] - a[_]) : u >= a[_] && (f = _, h = a[a.length - 1] - a[a.length - 2])
    }
    let v = null,
        b = null;
    n.rewind && (e.isBeginning ? b = e.params.virtual && e.params.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (v = 0));
    const p = (u - a[f]) / h,
        g = f < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (d > n.longSwipesMs) {
        if (!n.longSwipes) {
            e.slideTo(e.activeIndex);
            return
        }
        e.swipeDirection === "next" && (p >= n.longSwipesRatio ? e.slideTo(n.rewind && e.isEnd ? v : f + g) : e.slideTo(f)), e.swipeDirection === "prev" && (p > 1 - n.longSwipesRatio ? e.slideTo(f + g) : b !== null && p < 0 && Math.abs(p) > n.longSwipesRatio ? e.slideTo(b) : e.slideTo(f))
    } else {
        if (!n.shortSwipes) {
            e.slideTo(e.activeIndex);
            return
        }
        e.navigation && (l.target === e.navigation.nextEl || l.target === e.navigation.prevEl) ? l.target === e.navigation.nextEl ? e.slideTo(f + g) : e.slideTo(f) : (e.swipeDirection === "next" && e.slideTo(v !== null ? v : f + g), e.swipeDirection === "prev" && e.slideTo(b !== null ? b : f))
    }
}

function ko() {
    const t = this,
        {
            params: e,
            el: i
        } = t;
    if (i && i.offsetWidth === 0) return;
    e.breakpoints && t.setBreakpoint();
    const {
        allowSlideNext: n,
        allowSlidePrev: r,
        snapGrid: s
    } = t;
    t.allowSlideNext = !0, t.allowSlidePrev = !0, t.updateSize(), t.updateSlides(), t.updateSlidesClasses(), (e.slidesPerView === "auto" || e.slidesPerView > 1) && t.isEnd && !t.isBeginning && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0), t.autoplay && t.autoplay.running && t.autoplay.paused && t.autoplay.run(), t.allowSlidePrev = r, t.allowSlideNext = n, t.params.watchOverflow && s !== t.snapGrid && t.checkOverflow()
}

function Qm(t) {
    const e = this;
    e.enabled && (e.allowClick || (e.params.preventClicks && t.preventDefault(), e.params.preventClicksPropagation && e.animating && (t.stopPropagation(), t.stopImmediatePropagation())))
}

function Jm() {
    const t = this,
        {
            wrapperEl: e,
            rtlTranslate: i,
            enabled: n
        } = t;
    if (!n) return;
    t.previousTranslate = t.translate, t.isHorizontal() ? t.translate = -e.scrollLeft : t.translate = -e.scrollTop, t.translate === 0 && (t.translate = 0), t.updateActiveIndex(), t.updateSlidesClasses();
    let r;
    const s = t.maxTranslate() - t.minTranslate();
    s === 0 ? r = 0 : r = (t.translate - t.minTranslate()) / s, r !== t.progress && t.updateProgress(i ? -t.translate : t.translate), t.emit("setTranslate", t.translate, !1)
}
let Lo = !1;

function e1() {}
const id = (t, e) => {
    const i = Ze(),
        {
            params: n,
            touchEvents: r,
            el: s,
            wrapperEl: a,
            device: o,
            support: l
        } = t,
        c = !!n.nested,
        d = e === "on" ? "addEventListener" : "removeEventListener",
        u = e;
    if (!l.touch) s[d](r.start, t.onTouchStart, !1), i[d](r.move, t.onTouchMove, c), i[d](r.end, t.onTouchEnd, !1);
    else {
        const f = r.start === "touchstart" && l.passiveListener && n.passiveListeners ? {
            passive: !0,
            capture: !1
        } : !1;
        s[d](r.start, t.onTouchStart, f), s[d](r.move, t.onTouchMove, l.passiveListener ? {
            passive: !1,
            capture: c
        } : c), s[d](r.end, t.onTouchEnd, f), r.cancel && s[d](r.cancel, t.onTouchEnd, f)
    }(n.preventClicks || n.preventClicksPropagation) && s[d]("click", t.onClick, !0), n.cssMode && a[d]("scroll", t.onScroll), n.updateOnWindowResize ? t[u](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", ko, !0) : t[u]("observerUpdate", ko, !0)
};

function t1() {
    const t = this,
        e = Ze(),
        {
            params: i,
            support: n
        } = t;
    t.onTouchStart = Ym.bind(t), t.onTouchMove = Xm.bind(t), t.onTouchEnd = Km.bind(t), i.cssMode && (t.onScroll = Jm.bind(t)), t.onClick = Qm.bind(t), n.touch && !Lo && (e.addEventListener("touchstart", e1), Lo = !0), id(t, "on")
}

function i1() {
    id(this, "off")
}
const n1 = {
        attachEvents: t1,
        detachEvents: i1
    },
    Io = (t, e) => t.grid && e.grid && e.grid.rows > 1;

function r1() {
    const t = this,
        {
            activeIndex: e,
            initialized: i,
            loopedSlides: n = 0,
            params: r,
            $el: s
        } = t,
        a = r.breakpoints;
    if (!a || a && Object.keys(a).length === 0) return;
    const o = t.getBreakpoint(a, t.params.breakpointsBase, t.el);
    if (!o || t.currentBreakpoint === o) return;
    const c = (o in a ? a[o] : void 0) || t.originalParams,
        d = Io(t, r),
        u = Io(t, c),
        f = r.enabled;
    d && !u ? (s.removeClass(`${r.containerModifierClass}grid ${r.containerModifierClass}grid-column`), t.emitContainerClasses()) : !d && u && (s.addClass(`${r.containerModifierClass}grid`), (c.grid.fill && c.grid.fill === "column" || !c.grid.fill && r.grid.fill === "column") && s.addClass(`${r.containerModifierClass}grid-column`), t.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach(p => {
        const g = r[p] && r[p].enabled,
            _ = c[p] && c[p].enabled;
        g && !_ && t[p].disable(), !g && _ && t[p].enable()
    });
    const h = c.direction && c.direction !== r.direction,
        v = r.loop && (c.slidesPerView !== r.slidesPerView || h);
    h && i && t.changeDirection(), gt(t.params, c);
    const b = t.params.enabled;
    Object.assign(t, {
        allowTouchMove: t.params.allowTouchMove,
        allowSlideNext: t.params.allowSlideNext,
        allowSlidePrev: t.params.allowSlidePrev
    }), f && !b ? t.disable() : !f && b && t.enable(), t.currentBreakpoint = o, t.emit("_beforeBreakpoint", c), v && i && (t.loopDestroy(), t.loopCreate(), t.updateSlides(), t.slideTo(e - n + t.loopedSlides, 0, !1)), t.emit("breakpoint", c)
}

function s1(t, e, i) {
    if (e === void 0 && (e = "window"), !t || e === "container" && !i) return;
    let n = !1;
    const r = Oe(),
        s = e === "window" ? r.innerHeight : i.clientHeight,
        a = Object.keys(t).map(o => {
            if (typeof o == "string" && o.indexOf("@") === 0) {
                const l = parseFloat(o.substr(1));
                return {
                    value: s * l,
                    point: o
                }
            }
            return {
                value: o,
                point: o
            }
        });
    a.sort((o, l) => parseInt(o.value, 10) - parseInt(l.value, 10));
    for (let o = 0; o < a.length; o += 1) {
        const {
            point: l,
            value: c
        } = a[o];
        e === "window" ? r.matchMedia(`(min-width: ${c}px)`).matches && (n = l) : c <= i.clientWidth && (n = l)
    }
    return n || "max"
}
const a1 = {
    setBreakpoint: r1,
    getBreakpoint: s1
};

function o1(t, e) {
    const i = [];
    return t.forEach(n => {
        typeof n == "object" ? Object.keys(n).forEach(r => {
            n[r] && i.push(e + r)
        }) : typeof n == "string" && i.push(e + n)
    }), i
}

function l1() {
    const t = this,
        {
            classNames: e,
            params: i,
            rtl: n,
            $el: r,
            device: s,
            support: a
        } = t,
        o = o1(["initialized", i.direction, {
            "pointer-events": !a.touch
        }, {
            "free-mode": t.params.freeMode && i.freeMode.enabled
        }, {
            autoheight: i.autoHeight
        }, {
            rtl: n
        }, {
            grid: i.grid && i.grid.rows > 1
        }, {
            "grid-column": i.grid && i.grid.rows > 1 && i.grid.fill === "column"
        }, {
            android: s.android
        }, {
            ios: s.ios
        }, {
            "css-mode": i.cssMode
        }, {
            centered: i.cssMode && i.centeredSlides
        }, {
            "watch-progress": i.watchSlidesProgress
        }], i.containerModifierClass);
    e.push(...o), r.addClass([...e].join(" ")), t.emitContainerClasses()
}

function c1() {
    const t = this,
        {
            $el: e,
            classNames: i
        } = t;
    e.removeClass(i.join(" ")), t.emitContainerClasses()
}
const d1 = {
    addClasses: l1,
    removeClasses: c1
};

function u1(t, e, i, n, r, s) {
    const a = Oe();
    let o;

    function l() {
        s && s()
    }!N(t).parent("picture")[0] && (!t.complete || !r) && e ? (o = new a.Image, o.onload = l, o.onerror = l, n && (o.sizes = n), i && (o.srcset = i), e && (o.src = e)) : l()
}

function f1() {
    const t = this;
    t.imagesToLoad = t.$el.find("img");

    function e() {
        typeof t > "u" || t === null || !t || t.destroyed || (t.imagesLoaded !== void 0 && (t.imagesLoaded += 1), t.imagesLoaded === t.imagesToLoad.length && (t.params.updateOnImagesReady && t.update(), t.emit("imagesReady")))
    }
    for (let i = 0; i < t.imagesToLoad.length; i += 1) {
        const n = t.imagesToLoad[i];
        t.loadImage(n, n.currentSrc || n.getAttribute("src"), n.srcset || n.getAttribute("srcset"), n.sizes || n.getAttribute("sizes"), !0, e)
    }
}
const p1 = {
    loadImage: u1,
    preloadImages: f1
};

function h1() {
    const t = this,
        {
            isLocked: e,
            params: i
        } = t,
        {
            slidesOffsetBefore: n
        } = i;
    if (n) {
        const r = t.slides.length - 1,
            s = t.slidesGrid[r] + t.slidesSizesGrid[r] + n * 2;
        t.isLocked = t.size > s
    } else t.isLocked = t.snapGrid.length === 1;
    i.allowSlideNext === !0 && (t.allowSlideNext = !t.isLocked), i.allowSlidePrev === !0 && (t.allowSlidePrev = !t.isLocked), e && e !== t.isLocked && (t.isEnd = !1), e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock")
}
const m1 = {
        checkOverflow: h1
    },
    Do = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopedSlidesLimit: !0,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };

function g1(t, e) {
    return function(n) {
        n === void 0 && (n = {});
        const r = Object.keys(n)[0],
            s = n[r];
        if (typeof s != "object" || s === null) {
            gt(e, n);
            return
        }
        if (["navigation", "pagination", "scrollbar"].indexOf(r) >= 0 && t[r] === !0 && (t[r] = {
                auto: !0
            }), !(r in t && "enabled" in s)) {
            gt(e, n);
            return
        }
        t[r] === !0 && (t[r] = {
            enabled: !0
        }), typeof t[r] == "object" && !("enabled" in t[r]) && (t[r].enabled = !0), t[r] || (t[r] = {
            enabled: !1
        }), gt(e, n)
    }
}
const xs = {
        eventsEmitter: fm,
        update: Em,
        translate: $m,
        transition: km,
        slide: Fm,
        loop: Bm,
        grabCursor: Um,
        events: n1,
        breakpoints: a1,
        checkOverflow: m1,
        classes: d1,
        images: p1
    },
    Cs = {};
class ut {
    constructor() {
        let e, i;
        for (var n = arguments.length, r = new Array(n), s = 0; s < n; s++) r[s] = arguments[s];
        if (r.length === 1 && r[0].constructor && Object.prototype.toString.call(r[0]).slice(8, -1) === "Object" ? i = r[0] : [e, i] = r, i || (i = {}), i = gt({}, i), e && !i.el && (i.el = e), i.el && N(i.el).length > 1) {
            const c = [];
            return N(i.el).each(d => {
                const u = gt({}, i, {
                    el: d
                });
                c.push(new ut(u))
            }), c
        }
        const a = this;
        a.__swiper__ = !0, a.support = ed(), a.device = om({
            userAgent: i.userAgent
        }), a.browser = cm(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], i.modules && Array.isArray(i.modules) && a.modules.push(...i.modules);
        const o = {};
        a.modules.forEach(c => {
            c({
                swiper: a,
                extendParams: g1(i, o),
                on: a.on.bind(a),
                once: a.once.bind(a),
                off: a.off.bind(a),
                emit: a.emit.bind(a)
            })
        });
        const l = gt({}, Do, o);
        return a.params = gt({}, l, Cs, i), a.originalParams = gt({}, a.params), a.passedParams = gt({}, i), a.params && a.params.on && Object.keys(a.params.on).forEach(c => {
            a.on(c, a.params.on[c])
        }), a.params && a.params.onAny && a.onAny(a.params.onAny), a.$ = N, Object.assign(a, {
            enabled: a.params.enabled,
            el: e,
            classNames: [],
            slides: N(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal() {
                return a.params.direction === "horizontal"
            },
            isVertical() {
                return a.params.direction === "vertical"
            },
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: a.params.allowSlideNext,
            allowSlidePrev: a.params.allowSlidePrev,
            touchEvents: function() {
                const d = ["touchstart", "touchmove", "touchend", "touchcancel"],
                    u = ["pointerdown", "pointermove", "pointerup"];
                return a.touchEventsTouch = {
                    start: d[0],
                    move: d[1],
                    end: d[2],
                    cancel: d[3]
                }, a.touchEventsDesktop = {
                    start: u[0],
                    move: u[1],
                    end: u[2]
                }, a.support.touch || !a.params.simulateTouch ? a.touchEventsTouch : a.touchEventsDesktop
            }(),
            touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: a.params.focusableElements,
                lastClickTime: vt(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0
            },
            allowClick: !0,
            allowTouchMove: a.params.allowTouchMove,
            touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            },
            imagesToLoad: [],
            imagesLoaded: 0
        }), a.emit("_swiper"), a.params.init && a.init(), a
    }
    enable() {
        const e = this;
        e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
    }
    disable() {
        const e = this;
        e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
    }
    setProgress(e, i) {
        const n = this;
        e = Math.min(Math.max(e, 0), 1);
        const r = n.minTranslate(),
            a = (n.maxTranslate() - r) * e + r;
        n.translateTo(a, typeof i > "u" ? 0 : i), n.updateActiveIndex(), n.updateSlidesClasses()
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const i = e.el.className.split(" ").filter(n => n.indexOf("swiper") === 0 || n.indexOf(e.params.containerModifierClass) === 0);
        e.emit("_containerClasses", i.join(" "))
    }
    getSlideClasses(e) {
        const i = this;
        return i.destroyed ? "" : e.className.split(" ").filter(n => n.indexOf("swiper-slide") === 0 || n.indexOf(i.params.slideClass) === 0).join(" ")
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const i = [];
        e.slides.each(n => {
            const r = e.getSlideClasses(n);
            i.push({
                slideEl: n,
                classNames: r
            }), e.emit("_slideClass", n, r)
        }), e.emit("_slideClasses", i)
    }
    slidesPerViewDynamic(e, i) {
        e === void 0 && (e = "current"), i === void 0 && (i = !1);
        const n = this,
            {
                params: r,
                slides: s,
                slidesGrid: a,
                slidesSizesGrid: o,
                size: l,
                activeIndex: c
            } = n;
        let d = 1;
        if (r.centeredSlides) {
            let u = s[c].swiperSlideSize,
                f;
            for (let h = c + 1; h < s.length; h += 1) s[h] && !f && (u += s[h].swiperSlideSize, d += 1, u > l && (f = !0));
            for (let h = c - 1; h >= 0; h -= 1) s[h] && !f && (u += s[h].swiperSlideSize, d += 1, u > l && (f = !0))
        } else if (e === "current")
            for (let u = c + 1; u < s.length; u += 1)(i ? a[u] + o[u] - a[c] < l : a[u] - a[c] < l) && (d += 1);
        else
            for (let u = c - 1; u >= 0; u -= 1) a[c] - a[u] < l && (d += 1);
        return d
    }
    update() {
        const e = this;
        if (!e || e.destroyed) return;
        const {
            snapGrid: i,
            params: n
        } = e;
        n.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses();

        function r() {
            const a = e.rtlTranslate ? e.translate * -1 : e.translate,
                o = Math.min(Math.max(a, e.maxTranslate()), e.minTranslate());
            e.setTranslate(o), e.updateActiveIndex(), e.updateSlidesClasses()
        }
        let s;
        e.params.freeMode && e.params.freeMode.enabled ? (r(), e.params.autoHeight && e.updateAutoHeight()) : ((e.params.slidesPerView === "auto" || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? s = e.slideTo(e.slides.length - 1, 0, !1, !0) : s = e.slideTo(e.activeIndex, 0, !1, !0), s || r()), n.watchOverflow && i !== e.snapGrid && e.checkOverflow(), e.emit("update")
    }
    changeDirection(e, i) {
        i === void 0 && (i = !0);
        const n = this,
            r = n.params.direction;
        return e || (e = r === "horizontal" ? "vertical" : "horizontal"), e === r || e !== "horizontal" && e !== "vertical" || (n.$el.removeClass(`${n.params.containerModifierClass}${r}`).addClass(`${n.params.containerModifierClass}${e}`), n.emitContainerClasses(), n.params.direction = e, n.slides.each(s => {
            e === "vertical" ? s.style.width = "" : s.style.height = ""
        }), n.emit("changeDirection"), i && n.update()), n
    }
    changeLanguageDirection(e) {
        const i = this;
        i.rtl && e === "rtl" || !i.rtl && e === "ltr" || (i.rtl = e === "rtl", i.rtlTranslate = i.params.direction === "horizontal" && i.rtl, i.rtl ? (i.$el.addClass(`${i.params.containerModifierClass}rtl`), i.el.dir = "rtl") : (i.$el.removeClass(`${i.params.containerModifierClass}rtl`), i.el.dir = "ltr"), i.update())
    }
    mount(e) {
        const i = this;
        if (i.mounted) return !0;
        const n = N(e || i.params.el);
        if (e = n[0], !e) return !1;
        e.swiper = i;
        const r = () => `.${(i.params.wrapperClass||"").trim().split(" ").join(".")}`;
        let a = (() => {
            if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                const o = N(e.shadowRoot.querySelector(r()));
                return o.children = l => n.children(l), o
            }
            return n.children ? n.children(r()) : N(n).children(r())
        })();
        if (a.length === 0 && i.params.createElements) {
            const l = Ze().createElement("div");
            a = N(l), l.className = i.params.wrapperClass, n.append(l), n.children(`.${i.params.slideClass}`).each(c => {
                a.append(c)
            })
        }
        return Object.assign(i, {
            $el: n,
            el: e,
            $wrapperEl: a,
            wrapperEl: a[0],
            mounted: !0,
            rtl: e.dir.toLowerCase() === "rtl" || n.css("direction") === "rtl",
            rtlTranslate: i.params.direction === "horizontal" && (e.dir.toLowerCase() === "rtl" || n.css("direction") === "rtl"),
            wrongRTL: a.css("display") === "-webkit-box"
        }), !0
    }
    init(e) {
        const i = this;
        return i.initialized || i.mount(e) === !1 || (i.emit("beforeInit"), i.params.breakpoints && i.setBreakpoint(), i.addClasses(), i.params.loop && i.loopCreate(), i.updateSize(), i.updateSlides(), i.params.watchOverflow && i.checkOverflow(), i.params.grabCursor && i.enabled && i.setGrabCursor(), i.params.preloadImages && i.preloadImages(), i.params.loop ? i.slideTo(i.params.initialSlide + i.loopedSlides, 0, i.params.runCallbacksOnInit, !1, !0) : i.slideTo(i.params.initialSlide, 0, i.params.runCallbacksOnInit, !1, !0), i.attachEvents(), i.initialized = !0, i.emit("init"), i.emit("afterInit")), i
    }
    destroy(e, i) {
        e === void 0 && (e = !0), i === void 0 && (i = !0);
        const n = this,
            {
                params: r,
                $el: s,
                $wrapperEl: a,
                slides: o
            } = n;
        return typeof n.params > "u" || n.destroyed || (n.emit("beforeDestroy"), n.initialized = !1, n.detachEvents(), r.loop && n.loopDestroy(), i && (n.removeClasses(), s.removeAttr("style"), a.removeAttr("style"), o && o.length && o.removeClass([r.slideVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), n.emit("destroy"), Object.keys(n.eventsListeners).forEach(l => {
            n.off(l)
        }), e !== !1 && (n.$el[0].swiper = null, im(n)), n.destroyed = !0), null
    }
    static extendDefaults(e) {
        gt(Cs, e)
    }
    static get extendedDefaults() {
        return Cs
    }
    static get defaults() {
        return Do
    }
    static installModule(e) {
        ut.prototype.__modules__ || (ut.prototype.__modules__ = []);
        const i = ut.prototype.__modules__;
        typeof e == "function" && i.indexOf(e) < 0 && i.push(e)
    }
    static use(e) {
        return Array.isArray(e) ? (e.forEach(i => ut.installModule(i)), ut) : (ut.installModule(e), ut)
    }
}
Object.keys(xs).forEach(t => {
    Object.keys(xs[t]).forEach(e => {
        ut.prototype[e] = xs[t][e]
    })
});
ut.use([dm, um]);

function v1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n,
        emit: r
    } = t;
    i({
        virtual: {
            enabled: !1,
            slides: [],
            cache: !0,
            renderSlide: null,
            renderExternal: null,
            renderExternalUpdate: !0,
            addSlidesBefore: 0,
            addSlidesAfter: 0
        }
    });
    let s;
    e.virtual = {
        cache: {},
        from: void 0,
        to: void 0,
        slides: [],
        offset: 0,
        slidesGrid: []
    };

    function a(f, h) {
        const v = e.params.virtual;
        if (v.cache && e.virtual.cache[h]) return e.virtual.cache[h];
        const b = v.renderSlide ? N(v.renderSlide.call(e, f, h)) : N(`<div class="${e.params.slideClass}" data-swiper-slide-index="${h}">${f}</div>`);
        return b.attr("data-swiper-slide-index") || b.attr("data-swiper-slide-index", h), v.cache && (e.virtual.cache[h] = b), b
    }

    function o(f) {
        const {
            slidesPerView: h,
            slidesPerGroup: v,
            centeredSlides: b
        } = e.params, {
            addSlidesBefore: p,
            addSlidesAfter: g
        } = e.params.virtual, {
            from: _,
            to: y,
            slides: E,
            slidesGrid: q,
            offset: P
        } = e.virtual;
        e.params.cssMode || e.updateActiveIndex();
        const z = e.activeIndex || 0;
        let k;
        e.rtlTranslate ? k = "right" : k = e.isHorizontal() ? "left" : "top";
        let V, L;
        b ? (V = Math.floor(h / 2) + v + g, L = Math.floor(h / 2) + v + p) : (V = h + (v - 1) + g, L = v + p);
        const M = Math.max((z || 0) - L, 0),
            x = Math.min((z || 0) + V, E.length - 1),
            D = (e.slidesGrid[M] || 0) - (e.slidesGrid[0] || 0);
        Object.assign(e.virtual, {
            from: M,
            to: x,
            offset: D,
            slidesGrid: e.slidesGrid
        });

        function F() {
            e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.lazy && e.params.lazy.enabled && e.lazy.load(), r("virtualUpdate")
        }
        if (_ === M && y === x && !f) {
            e.slidesGrid !== q && D !== P && e.slides.css(k, `${D}px`), e.updateProgress(), r("virtualUpdate");
            return
        }
        if (e.params.virtual.renderExternal) {
            e.params.virtual.renderExternal.call(e, {
                offset: D,
                from: M,
                to: x,
                slides: function() {
                    const G = [];
                    for (let Z = M; Z <= x; Z += 1) G.push(E[Z]);
                    return G
                }()
            }), e.params.virtual.renderExternalUpdate ? F() : r("virtualUpdate");
            return
        }
        const se = [],
            te = [];
        if (f) e.$wrapperEl.find(`.${e.params.slideClass}`).remove();
        else
            for (let A = _; A <= y; A += 1)(A < M || A > x) && e.$wrapperEl.find(`.${e.params.slideClass}[data-swiper-slide-index="${A}"]`).remove();
        for (let A = 0; A < E.length; A += 1) A >= M && A <= x && (typeof y > "u" || f ? te.push(A) : (A > y && te.push(A), A < _ && se.push(A)));
        te.forEach(A => {
            e.$wrapperEl.append(a(E[A], A))
        }), se.sort((A, G) => G - A).forEach(A => {
            e.$wrapperEl.prepend(a(E[A], A))
        }), e.$wrapperEl.children(".swiper-slide").css(k, `${D}px`), F()
    }

    function l(f) {
        if (typeof f == "object" && "length" in f)
            for (let h = 0; h < f.length; h += 1) f[h] && e.virtual.slides.push(f[h]);
        else e.virtual.slides.push(f);
        o(!0)
    }

    function c(f) {
        const h = e.activeIndex;
        let v = h + 1,
            b = 1;
        if (Array.isArray(f)) {
            for (let p = 0; p < f.length; p += 1) f[p] && e.virtual.slides.unshift(f[p]);
            v = h + f.length, b = f.length
        } else e.virtual.slides.unshift(f);
        if (e.params.virtual.cache) {
            const p = e.virtual.cache,
                g = {};
            Object.keys(p).forEach(_ => {
                const y = p[_],
                    E = y.attr("data-swiper-slide-index");
                E && y.attr("data-swiper-slide-index", parseInt(E, 10) + b), g[parseInt(_, 10) + b] = y
            }), e.virtual.cache = g
        }
        o(!0), e.slideTo(v, 0)
    }

    function d(f) {
        if (typeof f > "u" || f === null) return;
        let h = e.activeIndex;
        if (Array.isArray(f))
            for (let v = f.length - 1; v >= 0; v -= 1) e.virtual.slides.splice(f[v], 1), e.params.virtual.cache && delete e.virtual.cache[f[v]], f[v] < h && (h -= 1), h = Math.max(h, 0);
        else e.virtual.slides.splice(f, 1), e.params.virtual.cache && delete e.virtual.cache[f], f < h && (h -= 1), h = Math.max(h, 0);
        o(!0), e.slideTo(h, 0)
    }

    function u() {
        e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), o(!0), e.slideTo(0, 0)
    }
    n("beforeInit", () => {
        e.params.virtual.enabled && (e.virtual.slides = e.params.virtual.slides, e.classNames.push(`${e.params.containerModifierClass}virtual`), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0, e.params.initialSlide || o())
    }), n("setTranslate", () => {
        e.params.virtual.enabled && (e.params.cssMode && !e._immediateVirtual ? (clearTimeout(s), s = setTimeout(() => {
            o()
        }, 100)) : o())
    }), n("init update resize", () => {
        e.params.virtual.enabled && e.params.cssMode && wn(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`)
    }), Object.assign(e.virtual, {
        appendSlide: l,
        prependSlide: c,
        removeSlide: d,
        removeAllSlides: u,
        update: o
    })
}

function y1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n,
        emit: r
    } = t;
    const s = Ze(),
        a = Oe();
    e.keyboard = {
        enabled: !1
    }, i({
        keyboard: {
            enabled: !1,
            onlyInViewport: !0,
            pageUpDown: !0
        }
    });

    function o(d) {
        if (!e.enabled) return;
        const {
            rtlTranslate: u
        } = e;
        let f = d;
        f.originalEvent && (f = f.originalEvent);
        const h = f.keyCode || f.charCode,
            v = e.params.keyboard.pageUpDown,
            b = v && h === 33,
            p = v && h === 34,
            g = h === 37,
            _ = h === 39,
            y = h === 38,
            E = h === 40;
        if (!e.allowSlideNext && (e.isHorizontal() && _ || e.isVertical() && E || p) || !e.allowSlidePrev && (e.isHorizontal() && g || e.isVertical() && y || b)) return !1;
        if (!(f.shiftKey || f.altKey || f.ctrlKey || f.metaKey) && !(s.activeElement && s.activeElement.nodeName && (s.activeElement.nodeName.toLowerCase() === "input" || s.activeElement.nodeName.toLowerCase() === "textarea"))) {
            if (e.params.keyboard.onlyInViewport && (b || p || g || _ || y || E)) {
                let q = !1;
                if (e.$el.parents(`.${e.params.slideClass}`).length > 0 && e.$el.parents(`.${e.params.slideActiveClass}`).length === 0) return;
                const P = e.$el,
                    z = P[0].clientWidth,
                    k = P[0].clientHeight,
                    V = a.innerWidth,
                    L = a.innerHeight,
                    M = e.$el.offset();
                u && (M.left -= e.$el[0].scrollLeft);
                const x = [
                    [M.left, M.top],
                    [M.left + z, M.top],
                    [M.left, M.top + k],
                    [M.left + z, M.top + k]
                ];
                for (let D = 0; D < x.length; D += 1) {
                    const F = x[D];
                    if (F[0] >= 0 && F[0] <= V && F[1] >= 0 && F[1] <= L) {
                        if (F[0] === 0 && F[1] === 0) continue;
                        q = !0
                    }
                }
                if (!q) return
            }
            e.isHorizontal() ? ((b || p || g || _) && (f.preventDefault ? f.preventDefault() : f.returnValue = !1), ((p || _) && !u || (b || g) && u) && e.slideNext(), ((b || g) && !u || (p || _) && u) && e.slidePrev()) : ((b || p || y || E) && (f.preventDefault ? f.preventDefault() : f.returnValue = !1), (p || E) && e.slideNext(), (b || y) && e.slidePrev()), r("keyPress", h)
        }
    }

    function l() {
        e.keyboard.enabled || (N(s).on("keydown", o), e.keyboard.enabled = !0)
    }

    function c() {
        e.keyboard.enabled && (N(s).off("keydown", o), e.keyboard.enabled = !1)
    }
    n("init", () => {
        e.params.keyboard.enabled && l()
    }), n("destroy", () => {
        e.keyboard.enabled && c()
    }), Object.assign(e.keyboard, {
        enable: l,
        disable: c
    })
}

function b1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n,
        emit: r
    } = t;
    const s = Oe();
    i({
        mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarget: "container",
            thresholdDelta: null,
            thresholdTime: null
        }
    }), e.mousewheel = {
        enabled: !1
    };
    let a, o = vt(),
        l;
    const c = [];

    function d(y) {
        let z = 0,
            k = 0,
            V = 0,
            L = 0;
        return "detail" in y && (k = y.detail), "wheelDelta" in y && (k = -y.wheelDelta / 120), "wheelDeltaY" in y && (k = -y.wheelDeltaY / 120), "wheelDeltaX" in y && (z = -y.wheelDeltaX / 120), "axis" in y && y.axis === y.HORIZONTAL_AXIS && (z = k, k = 0), V = z * 10, L = k * 10, "deltaY" in y && (L = y.deltaY), "deltaX" in y && (V = y.deltaX), y.shiftKey && !V && (V = L, L = 0), (V || L) && y.deltaMode && (y.deltaMode === 1 ? (V *= 40, L *= 40) : (V *= 800, L *= 800)), V && !z && (z = V < 1 ? -1 : 1), L && !k && (k = L < 1 ? -1 : 1), {
            spinX: z,
            spinY: k,
            pixelX: V,
            pixelY: L
        }
    }

    function u() {
        e.enabled && (e.mouseEntered = !0)
    }

    function f() {
        e.enabled && (e.mouseEntered = !1)
    }

    function h(y) {
        return e.params.mousewheel.thresholdDelta && y.delta < e.params.mousewheel.thresholdDelta || e.params.mousewheel.thresholdTime && vt() - o < e.params.mousewheel.thresholdTime ? !1 : y.delta >= 6 && vt() - o < 60 ? !0 : (y.direction < 0 ? (!e.isEnd || e.params.loop) && !e.animating && (e.slideNext(), r("scroll", y.raw)) : (!e.isBeginning || e.params.loop) && !e.animating && (e.slidePrev(), r("scroll", y.raw)), o = new s.Date().getTime(), !1)
    }

    function v(y) {
        const E = e.params.mousewheel;
        if (y.direction < 0) {
            if (e.isEnd && !e.params.loop && E.releaseOnEdges) return !0
        } else if (e.isBeginning && !e.params.loop && E.releaseOnEdges) return !0;
        return !1
    }

    function b(y) {
        let E = y,
            q = !0;
        if (!e.enabled) return;
        const P = e.params.mousewheel;
        e.params.cssMode && E.preventDefault();
        let z = e.$el;
        if (e.params.mousewheel.eventsTarget !== "container" && (z = N(e.params.mousewheel.eventsTarget)), !e.mouseEntered && !z[0].contains(E.target) && !P.releaseOnEdges) return !0;
        E.originalEvent && (E = E.originalEvent);
        let k = 0;
        const V = e.rtlTranslate ? -1 : 1,
            L = d(E);
        if (P.forceToAxis)
            if (e.isHorizontal())
                if (Math.abs(L.pixelX) > Math.abs(L.pixelY)) k = -L.pixelX * V;
                else return !0;
        else if (Math.abs(L.pixelY) > Math.abs(L.pixelX)) k = -L.pixelY;
        else return !0;
        else k = Math.abs(L.pixelX) > Math.abs(L.pixelY) ? -L.pixelX * V : -L.pixelY;
        if (k === 0) return !0;
        P.invert && (k = -k);
        let M = e.getTranslate() + k * P.sensitivity;
        if (M >= e.minTranslate() && (M = e.minTranslate()), M <= e.maxTranslate() && (M = e.maxTranslate()), q = e.params.loop ? !0 : !(M === e.minTranslate() || M === e.maxTranslate()), q && e.params.nested && E.stopPropagation(), !e.params.freeMode || !e.params.freeMode.enabled) {
            const x = {
                time: vt(),
                delta: Math.abs(k),
                direction: Math.sign(k),
                raw: y
            };
            c.length >= 2 && c.shift();
            const D = c.length ? c[c.length - 1] : void 0;
            if (c.push(x), D ? (x.direction !== D.direction || x.delta > D.delta || x.time > D.time + 150) && h(x) : h(x), v(x)) return !0
        } else {
            const x = {
                    time: vt(),
                    delta: Math.abs(k),
                    direction: Math.sign(k)
                },
                D = l && x.time < l.time + 500 && x.delta <= l.delta && x.direction === l.direction;
            if (!D) {
                l = void 0, e.params.loop && e.loopFix();
                let F = e.getTranslate() + k * P.sensitivity;
                const se = e.isBeginning,
                    te = e.isEnd;
                if (F >= e.minTranslate() && (F = e.minTranslate()), F <= e.maxTranslate() && (F = e.maxTranslate()), e.setTransition(0), e.setTranslate(F), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!se && e.isBeginning || !te && e.isEnd) && e.updateSlidesClasses(), e.params.freeMode.sticky) {
                    clearTimeout(a), a = void 0, c.length >= 15 && c.shift();
                    const A = c.length ? c[c.length - 1] : void 0,
                        G = c[0];
                    if (c.push(x), A && (x.delta > A.delta || x.direction !== A.direction)) c.splice(0);
                    else if (c.length >= 15 && x.time - G.time < 500 && G.delta - x.delta >= 1 && x.delta <= 6) {
                        const Z = k > 0 ? .8 : .2;
                        l = x, c.splice(0), a = ci(() => {
                            e.slideToClosest(e.params.speed, !0, void 0, Z)
                        }, 0)
                    }
                    a || (a = ci(() => {
                        l = x, c.splice(0), e.slideToClosest(e.params.speed, !0, void 0, .5)
                    }, 500))
                }
                if (D || r("scroll", E), e.params.autoplay && e.params.autoplayDisableOnInteraction && e.autoplay.stop(), F === e.minTranslate() || F === e.maxTranslate()) return !0
            }
        }
        return E.preventDefault ? E.preventDefault() : E.returnValue = !1, !1
    }

    function p(y) {
        let E = e.$el;
        e.params.mousewheel.eventsTarget !== "container" && (E = N(e.params.mousewheel.eventsTarget)), E[y]("mouseenter", u), E[y]("mouseleave", f), E[y]("wheel", b)
    }

    function g() {
        return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", b), !0) : e.mousewheel.enabled ? !1 : (p("on"), e.mousewheel.enabled = !0, !0)
    }

    function _() {
        return e.params.cssMode ? (e.wrapperEl.addEventListener(event, b), !0) : e.mousewheel.enabled ? (p("off"), e.mousewheel.enabled = !1, !0) : !1
    }
    n("init", () => {
        !e.params.mousewheel.enabled && e.params.cssMode && _(), e.params.mousewheel.enabled && g()
    }), n("destroy", () => {
        e.params.cssMode && g(), e.mousewheel.enabled && _()
    }), Object.assign(e.mousewheel, {
        enable: g,
        disable: _
    })
}

function Ra(t, e, i, n) {
    const r = Ze();
    return t.params.createElements && Object.keys(n).forEach(s => {
        if (!i[s] && i.auto === !0) {
            let a = t.$el.children(`.${n[s]}`)[0];
            a || (a = r.createElement("div"), a.className = n[s], t.$el.append(a)), i[s] = a, e[s] = a
        }
    }), i
}

function w1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n,
        emit: r
    } = t;
    i({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled"
        }
    }), e.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null
    };

    function s(v) {
        let b;
        return v && (b = N(v), e.params.uniqueNavElements && typeof v == "string" && b.length > 1 && e.$el.find(v).length === 1 && (b = e.$el.find(v))), b
    }

    function a(v, b) {
        const p = e.params.navigation;
        v && v.length > 0 && (v[b ? "addClass" : "removeClass"](p.disabledClass), v[0] && v[0].tagName === "BUTTON" && (v[0].disabled = b), e.params.watchOverflow && e.enabled && v[e.isLocked ? "addClass" : "removeClass"](p.lockClass))
    }

    function o() {
        if (e.params.loop) return;
        const {
            $nextEl: v,
            $prevEl: b
        } = e.navigation;
        a(b, e.isBeginning && !e.params.rewind), a(v, e.isEnd && !e.params.rewind)
    }

    function l(v) {
        v.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), r("navigationPrev"))
    }

    function c(v) {
        v.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), r("navigationNext"))
    }

    function d() {
        const v = e.params.navigation;
        if (e.params.navigation = Ra(e, e.originalParams.navigation, e.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            }), !(v.nextEl || v.prevEl)) return;
        const b = s(v.nextEl),
            p = s(v.prevEl);
        b && b.length > 0 && b.on("click", c), p && p.length > 0 && p.on("click", l), Object.assign(e.navigation, {
            $nextEl: b,
            nextEl: b && b[0],
            $prevEl: p,
            prevEl: p && p[0]
        }), e.enabled || (b && b.addClass(v.lockClass), p && p.addClass(v.lockClass))
    }

    function u() {
        const {
            $nextEl: v,
            $prevEl: b
        } = e.navigation;
        v && v.length && (v.off("click", c), v.removeClass(e.params.navigation.disabledClass)), b && b.length && (b.off("click", l), b.removeClass(e.params.navigation.disabledClass))
    }
    n("init", () => {
        e.params.navigation.enabled === !1 ? h() : (d(), o())
    }), n("toEdge fromEdge lock unlock", () => {
        o()
    }), n("destroy", () => {
        u()
    }), n("enable disable", () => {
        const {
            $nextEl: v,
            $prevEl: b
        } = e.navigation;
        v && v[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass), b && b[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass)
    }), n("click", (v, b) => {
        const {
            $nextEl: p,
            $prevEl: g
        } = e.navigation, _ = b.target;
        if (e.params.navigation.hideOnClick && !N(_).is(g) && !N(_).is(p)) {
            if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === _ || e.pagination.el.contains(_))) return;
            let y;
            p ? y = p.hasClass(e.params.navigation.hiddenClass) : g && (y = g.hasClass(e.params.navigation.hiddenClass)), r(y === !0 ? "navigationShow" : "navigationHide"), p && p.toggleClass(e.params.navigation.hiddenClass), g && g.toggleClass(e.params.navigation.hiddenClass)
        }
    });
    const f = () => {
            e.$el.removeClass(e.params.navigation.navigationDisabledClass), d(), o()
        },
        h = () => {
            e.$el.addClass(e.params.navigation.navigationDisabledClass), u()
        };
    Object.assign(e.navigation, {
        enable: f,
        disable: h,
        update: o,
        init: d,
        destroy: u
    })
}

function Vt(t) {
    return t === void 0 && (t = ""), `.${t.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`
}

function _1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n,
        emit: r
    } = t;
    const s = "swiper-pagination";
    i({
        pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: p => p,
            formatFractionTotal: p => p,
            bulletClass: `${s}-bullet`,
            bulletActiveClass: `${s}-bullet-active`,
            modifierClass: `${s}-`,
            currentClass: `${s}-current`,
            totalClass: `${s}-total`,
            hiddenClass: `${s}-hidden`,
            progressbarFillClass: `${s}-progressbar-fill`,
            progressbarOppositeClass: `${s}-progressbar-opposite`,
            clickableClass: `${s}-clickable`,
            lockClass: `${s}-lock`,
            horizontalClass: `${s}-horizontal`,
            verticalClass: `${s}-vertical`,
            paginationDisabledClass: `${s}-disabled`
        }
    }), e.pagination = {
        el: null,
        $el: null,
        bullets: []
    };
    let a, o = 0;

    function l() {
        return !e.params.pagination.el || !e.pagination.el || !e.pagination.$el || e.pagination.$el.length === 0
    }

    function c(p, g) {
        const {
            bulletActiveClass: _
        } = e.params.pagination;
        p[g]().addClass(`${_}-${g}`)[g]().addClass(`${_}-${g}-${g}`)
    }

    function d() {
        const p = e.rtl,
            g = e.params.pagination;
        if (l()) return;
        const _ = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            y = e.pagination.$el;
        let E;
        const q = e.params.loop ? Math.ceil((_ - e.loopedSlides * 2) / e.params.slidesPerGroup) : e.snapGrid.length;
        if (e.params.loop ? (E = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup), E > _ - 1 - e.loopedSlides * 2 && (E -= _ - e.loopedSlides * 2), E > q - 1 && (E -= q), E < 0 && e.params.paginationType !== "bullets" && (E = q + E)) : typeof e.snapIndex < "u" ? E = e.snapIndex : E = e.activeIndex || 0, g.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
            const P = e.pagination.bullets;
            let z, k, V;
            if (g.dynamicBullets && (a = P.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), y.css(e.isHorizontal() ? "width" : "height", `${a*(g.dynamicMainBullets+4)}px`), g.dynamicMainBullets > 1 && e.previousIndex !== void 0 && (o += E - (e.previousIndex - e.loopedSlides || 0), o > g.dynamicMainBullets - 1 ? o = g.dynamicMainBullets - 1 : o < 0 && (o = 0)), z = Math.max(E - o, 0), k = z + (Math.min(P.length, g.dynamicMainBullets) - 1), V = (k + z) / 2), P.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(L => `${g.bulletActiveClass}${L}`).join(" ")), y.length > 1) P.each(L => {
                const M = N(L),
                    x = M.index();
                x === E && M.addClass(g.bulletActiveClass), g.dynamicBullets && (x >= z && x <= k && M.addClass(`${g.bulletActiveClass}-main`), x === z && c(M, "prev"), x === k && c(M, "next"))
            });
            else {
                const L = P.eq(E),
                    M = L.index();
                if (L.addClass(g.bulletActiveClass), g.dynamicBullets) {
                    const x = P.eq(z),
                        D = P.eq(k);
                    for (let F = z; F <= k; F += 1) P.eq(F).addClass(`${g.bulletActiveClass}-main`);
                    if (e.params.loop)
                        if (M >= P.length) {
                            for (let F = g.dynamicMainBullets; F >= 0; F -= 1) P.eq(P.length - F).addClass(`${g.bulletActiveClass}-main`);
                            P.eq(P.length - g.dynamicMainBullets - 1).addClass(`${g.bulletActiveClass}-prev`)
                        } else c(x, "prev"), c(D, "next");
                    else c(x, "prev"), c(D, "next")
                }
            }
            if (g.dynamicBullets) {
                const L = Math.min(P.length, g.dynamicMainBullets + 4),
                    M = (a * L - a) / 2 - V * a,
                    x = p ? "right" : "left";
                P.css(e.isHorizontal() ? x : "top", `${M}px`)
            }
        }
        if (g.type === "fraction" && (y.find(Vt(g.currentClass)).text(g.formatFractionCurrent(E + 1)), y.find(Vt(g.totalClass)).text(g.formatFractionTotal(q))), g.type === "progressbar") {
            let P;
            g.progressbarOpposite ? P = e.isHorizontal() ? "vertical" : "horizontal" : P = e.isHorizontal() ? "horizontal" : "vertical";
            const z = (E + 1) / q;
            let k = 1,
                V = 1;
            P === "horizontal" ? k = z : V = z, y.find(Vt(g.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${k}) scaleY(${V})`).transition(e.params.speed)
        }
        g.type === "custom" && g.renderCustom ? (y.html(g.renderCustom(e, E + 1, q)), r("paginationRender", y[0])) : r("paginationUpdate", y[0]), e.params.watchOverflow && e.enabled && y[e.isLocked ? "addClass" : "removeClass"](g.lockClass)
    }

    function u() {
        const p = e.params.pagination;
        if (l()) return;
        const g = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            _ = e.pagination.$el;
        let y = "";
        if (p.type === "bullets") {
            let E = e.params.loop ? Math.ceil((g - e.loopedSlides * 2) / e.params.slidesPerGroup) : e.snapGrid.length;
            e.params.freeMode && e.params.freeMode.enabled && !e.params.loop && E > g && (E = g);
            for (let q = 0; q < E; q += 1) p.renderBullet ? y += p.renderBullet.call(e, q, p.bulletClass) : y += `<${p.bulletElement} class="${p.bulletClass}"></${p.bulletElement}>`;
            _.html(y), e.pagination.bullets = _.find(Vt(p.bulletClass))
        }
        p.type === "fraction" && (p.renderFraction ? y = p.renderFraction.call(e, p.currentClass, p.totalClass) : y = `<span class="${p.currentClass}"></span> / <span class="${p.totalClass}"></span>`, _.html(y)), p.type === "progressbar" && (p.renderProgressbar ? y = p.renderProgressbar.call(e, p.progressbarFillClass) : y = `<span class="${p.progressbarFillClass}"></span>`, _.html(y)), p.type !== "custom" && r("paginationRender", e.pagination.$el[0])
    }

    function f() {
        e.params.pagination = Ra(e, e.originalParams.pagination, e.params.pagination, {
            el: "swiper-pagination"
        });
        const p = e.params.pagination;
        if (!p.el) return;
        let g = N(p.el);
        g.length !== 0 && (e.params.uniqueNavElements && typeof p.el == "string" && g.length > 1 && (g = e.$el.find(p.el), g.length > 1 && (g = g.filter(_ => N(_).parents(".swiper")[0] === e.el))), p.type === "bullets" && p.clickable && g.addClass(p.clickableClass), g.addClass(p.modifierClass + p.type), g.addClass(e.isHorizontal() ? p.horizontalClass : p.verticalClass), p.type === "bullets" && p.dynamicBullets && (g.addClass(`${p.modifierClass}${p.type}-dynamic`), o = 0, p.dynamicMainBullets < 1 && (p.dynamicMainBullets = 1)), p.type === "progressbar" && p.progressbarOpposite && g.addClass(p.progressbarOppositeClass), p.clickable && g.on("click", Vt(p.bulletClass), function(y) {
            y.preventDefault();
            let E = N(this).index() * e.params.slidesPerGroup;
            e.params.loop && (E += e.loopedSlides), e.slideTo(E)
        }), Object.assign(e.pagination, {
            $el: g,
            el: g[0]
        }), e.enabled || g.addClass(p.lockClass))
    }

    function h() {
        const p = e.params.pagination;
        if (l()) return;
        const g = e.pagination.$el;
        g.removeClass(p.hiddenClass), g.removeClass(p.modifierClass + p.type), g.removeClass(e.isHorizontal() ? p.horizontalClass : p.verticalClass), e.pagination.bullets && e.pagination.bullets.removeClass && e.pagination.bullets.removeClass(p.bulletActiveClass), p.clickable && g.off("click", Vt(p.bulletClass))
    }
    n("init", () => {
        e.params.pagination.enabled === !1 ? b() : (f(), u(), d())
    }), n("activeIndexChange", () => {
        (e.params.loop || typeof e.snapIndex > "u") && d()
    }), n("snapIndexChange", () => {
        e.params.loop || d()
    }), n("slidesLengthChange", () => {
        e.params.loop && (u(), d())
    }), n("snapGridLengthChange", () => {
        e.params.loop || (u(), d())
    }), n("destroy", () => {
        h()
    }), n("enable disable", () => {
        const {
            $el: p
        } = e.pagination;
        p && p[e.enabled ? "removeClass" : "addClass"](e.params.pagination.lockClass)
    }), n("lock unlock", () => {
        d()
    }), n("click", (p, g) => {
        const _ = g.target,
            {
                $el: y
            } = e.pagination;
        if (e.params.pagination.el && e.params.pagination.hideOnClick && y && y.length > 0 && !N(_).hasClass(e.params.pagination.bulletClass)) {
            if (e.navigation && (e.navigation.nextEl && _ === e.navigation.nextEl || e.navigation.prevEl && _ === e.navigation.prevEl)) return;
            const E = y.hasClass(e.params.pagination.hiddenClass);
            r(E === !0 ? "paginationShow" : "paginationHide"), y.toggleClass(e.params.pagination.hiddenClass)
        }
    });
    const v = () => {
            e.$el.removeClass(e.params.pagination.paginationDisabledClass), e.pagination.$el && e.pagination.$el.removeClass(e.params.pagination.paginationDisabledClass), f(), u(), d()
        },
        b = () => {
            e.$el.addClass(e.params.pagination.paginationDisabledClass), e.pagination.$el && e.pagination.$el.addClass(e.params.pagination.paginationDisabledClass), h()
        };
    Object.assign(e.pagination, {
        enable: v,
        disable: b,
        render: u,
        update: d,
        init: f,
        destroy: h
    })
}

function E1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n,
        emit: r
    } = t;
    const s = Ze();
    let a = !1,
        o = null,
        l = null,
        c, d, u, f;
    i({
        scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag",
            scrollbarDisabledClass: "swiper-scrollbar-disabled",
            horizontalClass: "swiper-scrollbar-horizontal",
            verticalClass: "swiper-scrollbar-vertical"
        }
    }), e.scrollbar = {
        el: null,
        dragEl: null,
        $el: null,
        $dragEl: null
    };

    function h() {
        if (!e.params.scrollbar.el || !e.scrollbar.el) return;
        const {
            scrollbar: x,
            rtlTranslate: D,
            progress: F
        } = e, {
            $dragEl: se,
            $el: te
        } = x, A = e.params.scrollbar;
        let G = d,
            Z = (u - d) * F;
        D ? (Z = -Z, Z > 0 ? (G = d - Z, Z = 0) : -Z + d > u && (G = u + Z)) : Z < 0 ? (G = d + Z, Z = 0) : Z + d > u && (G = u - Z), e.isHorizontal() ? (se.transform(`translate3d(${Z}px, 0, 0)`), se[0].style.width = `${G}px`) : (se.transform(`translate3d(0px, ${Z}px, 0)`), se[0].style.height = `${G}px`), A.hide && (clearTimeout(o), te[0].style.opacity = 1, o = setTimeout(() => {
            te[0].style.opacity = 0, te.transition(400)
        }, 1e3))
    }

    function v(x) {
        !e.params.scrollbar.el || !e.scrollbar.el || e.scrollbar.$dragEl.transition(x)
    }

    function b() {
        if (!e.params.scrollbar.el || !e.scrollbar.el) return;
        const {
            scrollbar: x
        } = e, {
            $dragEl: D,
            $el: F
        } = x;
        D[0].style.width = "", D[0].style.height = "", u = e.isHorizontal() ? F[0].offsetWidth : F[0].offsetHeight, f = e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0)), e.params.scrollbar.dragSize === "auto" ? d = u * f : d = parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? D[0].style.width = `${d}px` : D[0].style.height = `${d}px`, f >= 1 ? F[0].style.display = "none" : F[0].style.display = "", e.params.scrollbar.hide && (F[0].style.opacity = 0), e.params.watchOverflow && e.enabled && x.$el[e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
    }

    function p(x) {
        return e.isHorizontal() ? x.type === "touchstart" || x.type === "touchmove" ? x.targetTouches[0].clientX : x.clientX : x.type === "touchstart" || x.type === "touchmove" ? x.targetTouches[0].clientY : x.clientY
    }

    function g(x) {
        const {
            scrollbar: D,
            rtlTranslate: F
        } = e, {
            $el: se
        } = D;
        let te;
        te = (p(x) - se.offset()[e.isHorizontal() ? "left" : "top"] - (c !== null ? c : d / 2)) / (u - d), te = Math.max(Math.min(te, 1), 0), F && (te = 1 - te);
        const A = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * te;
        e.updateProgress(A), e.setTranslate(A), e.updateActiveIndex(), e.updateSlidesClasses()
    }

    function _(x) {
        const D = e.params.scrollbar,
            {
                scrollbar: F,
                $wrapperEl: se
            } = e,
            {
                $el: te,
                $dragEl: A
            } = F;
        a = !0, c = x.target === A[0] || x.target === A ? p(x) - x.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"] : null, x.preventDefault(), x.stopPropagation(), se.transition(100), A.transition(100), g(x), clearTimeout(l), te.transition(0), D.hide && te.css("opacity", 1), e.params.cssMode && e.$wrapperEl.css("scroll-snap-type", "none"), r("scrollbarDragStart", x)
    }

    function y(x) {
        const {
            scrollbar: D,
            $wrapperEl: F
        } = e, {
            $el: se,
            $dragEl: te
        } = D;
        a && (x.preventDefault ? x.preventDefault() : x.returnValue = !1, g(x), F.transition(0), se.transition(0), te.transition(0), r("scrollbarDragMove", x))
    }

    function E(x) {
        const D = e.params.scrollbar,
            {
                scrollbar: F,
                $wrapperEl: se
            } = e,
            {
                $el: te
            } = F;
        a && (a = !1, e.params.cssMode && (e.$wrapperEl.css("scroll-snap-type", ""), se.transition("")), D.hide && (clearTimeout(l), l = ci(() => {
            te.css("opacity", 0), te.transition(400)
        }, 1e3)), r("scrollbarDragEnd", x), D.snapOnRelease && e.slideToClosest())
    }

    function q(x) {
        const {
            scrollbar: D,
            touchEventsTouch: F,
            touchEventsDesktop: se,
            params: te,
            support: A
        } = e, G = D.$el;
        if (!G) return;
        const Z = G[0],
            me = A.passiveListener && te.passiveListeners ? {
                passive: !1,
                capture: !1
            } : !1,
            _e = A.passiveListener && te.passiveListeners ? {
                passive: !0,
                capture: !1
            } : !1;
        if (!Z) return;
        const Je = x === "on" ? "addEventListener" : "removeEventListener";
        A.touch ? (Z[Je](F.start, _, me), Z[Je](F.move, y, me), Z[Je](F.end, E, _e)) : (Z[Je](se.start, _, me), s[Je](se.move, y, me), s[Je](se.end, E, _e))
    }

    function P() {
        !e.params.scrollbar.el || !e.scrollbar.el || q("on")
    }

    function z() {
        !e.params.scrollbar.el || !e.scrollbar.el || q("off")
    }

    function k() {
        const {
            scrollbar: x,
            $el: D
        } = e;
        e.params.scrollbar = Ra(e, e.originalParams.scrollbar, e.params.scrollbar, {
            el: "swiper-scrollbar"
        });
        const F = e.params.scrollbar;
        if (!F.el) return;
        let se = N(F.el);
        e.params.uniqueNavElements && typeof F.el == "string" && se.length > 1 && D.find(F.el).length === 1 && (se = D.find(F.el)), se.addClass(e.isHorizontal() ? F.horizontalClass : F.verticalClass);
        let te = se.find(`.${e.params.scrollbar.dragClass}`);
        te.length === 0 && (te = N(`<div class="${e.params.scrollbar.dragClass}"></div>`), se.append(te)), Object.assign(x, {
            $el: se,
            el: se[0],
            $dragEl: te,
            dragEl: te[0]
        }), F.draggable && P(), se && se[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass)
    }

    function V() {
        const x = e.params.scrollbar,
            D = e.scrollbar.$el;
        D && D.removeClass(e.isHorizontal() ? x.horizontalClass : x.verticalClass), z()
    }
    n("init", () => {
        e.params.scrollbar.enabled === !1 ? M() : (k(), b(), h())
    }), n("update resize observerUpdate lock unlock", () => {
        b()
    }), n("setTranslate", () => {
        h()
    }), n("setTransition", (x, D) => {
        v(D)
    }), n("enable disable", () => {
        const {
            $el: x
        } = e.scrollbar;
        x && x[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass)
    }), n("destroy", () => {
        V()
    });
    const L = () => {
            e.$el.removeClass(e.params.scrollbar.scrollbarDisabledClass), e.scrollbar.$el && e.scrollbar.$el.removeClass(e.params.scrollbar.scrollbarDisabledClass), k(), b(), h()
        },
        M = () => {
            e.$el.addClass(e.params.scrollbar.scrollbarDisabledClass), e.scrollbar.$el && e.scrollbar.$el.addClass(e.params.scrollbar.scrollbarDisabledClass), V()
        };
    Object.assign(e.scrollbar, {
        enable: L,
        disable: M,
        updateSize: b,
        setTranslate: h,
        init: k,
        destroy: V
    })
}

function x1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n
    } = t;
    i({
        parallax: {
            enabled: !1
        }
    });
    const r = (o, l) => {
            const {
                rtl: c
            } = e, d = N(o), u = c ? -1 : 1, f = d.attr("data-swiper-parallax") || "0";
            let h = d.attr("data-swiper-parallax-x"),
                v = d.attr("data-swiper-parallax-y");
            const b = d.attr("data-swiper-parallax-scale"),
                p = d.attr("data-swiper-parallax-opacity");
            if (h || v ? (h = h || "0", v = v || "0") : e.isHorizontal() ? (h = f, v = "0") : (v = f, h = "0"), h.indexOf("%") >= 0 ? h = `${parseInt(h,10)*l*u}%` : h = `${h*l*u}px`, v.indexOf("%") >= 0 ? v = `${parseInt(v,10)*l}%` : v = `${v*l}px`, typeof p < "u" && p !== null) {
                const g = p - (p - 1) * (1 - Math.abs(l));
                d[0].style.opacity = g
            }
            if (typeof b > "u" || b === null) d.transform(`translate3d(${h}, ${v}, 0px)`);
            else {
                const g = b - (b - 1) * (1 - Math.abs(l));
                d.transform(`translate3d(${h}, ${v}, 0px) scale(${g})`)
            }
        },
        s = () => {
            const {
                $el: o,
                slides: l,
                progress: c,
                snapGrid: d
            } = e;
            o.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(u => {
                r(u, c)
            }), l.each((u, f) => {
                let h = u.progress;
                e.params.slidesPerGroup > 1 && e.params.slidesPerView !== "auto" && (h += Math.ceil(f / 2) - c * (d.length - 1)), h = Math.min(Math.max(h, -1), 1), N(u).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(v => {
                    r(v, h)
                })
            })
        },
        a = function(o) {
            o === void 0 && (o = e.params.speed);
            const {
                $el: l
            } = e;
            l.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(c => {
                const d = N(c);
                let u = parseInt(d.attr("data-swiper-parallax-duration"), 10) || o;
                o === 0 && (u = 0), d.transition(u)
            })
        };
    n("beforeInit", () => {
        e.params.parallax.enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
    }), n("init", () => {
        e.params.parallax.enabled && s()
    }), n("setTranslate", () => {
        e.params.parallax.enabled && s()
    }), n("setTransition", (o, l) => {
        e.params.parallax.enabled && a(l)
    })
}

function C1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n,
        emit: r
    } = t;
    const s = Oe();
    i({
        zoom: {
            enabled: !1,
            maxRatio: 3,
            minRatio: 1,
            toggle: !0,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed"
        }
    }), e.zoom = {
        enabled: !1
    };
    let a = 1,
        o = !1,
        l, c, d;
    const u = {
            $slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            $imageEl: void 0,
            $imageWrapEl: void 0,
            maxRatio: 3
        },
        f = {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {}
        },
        h = {
            x: void 0,
            y: void 0,
            prevPositionX: void 0,
            prevPositionY: void 0,
            prevTime: void 0
        };
    let v = 1;
    Object.defineProperty(e.zoom, "scale", {
        get() {
            return v
        },
        set(A) {
            if (v !== A) {
                const G = u.$imageEl ? u.$imageEl[0] : void 0,
                    Z = u.$slideEl ? u.$slideEl[0] : void 0;
                r("zoomChange", A, G, Z)
            }
            v = A
        }
    });

    function b(A) {
        if (A.targetTouches.length < 2) return 1;
        const G = A.targetTouches[0].pageX,
            Z = A.targetTouches[0].pageY,
            me = A.targetTouches[1].pageX,
            _e = A.targetTouches[1].pageY;
        return Math.sqrt((me - G) ** 2 + (_e - Z) ** 2)
    }

    function p(A) {
        const G = e.support,
            Z = e.params.zoom;
        if (c = !1, d = !1, !G.gestures) {
            if (A.type !== "touchstart" || A.type === "touchstart" && A.targetTouches.length < 2) return;
            c = !0, u.scaleStart = b(A)
        }
        if ((!u.$slideEl || !u.$slideEl.length) && (u.$slideEl = N(A.target).closest(`.${e.params.slideClass}`), u.$slideEl.length === 0 && (u.$slideEl = e.slides.eq(e.activeIndex)), u.$imageEl = u.$slideEl.find(`.${Z.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), u.$imageWrapEl = u.$imageEl.parent(`.${Z.containerClass}`), u.maxRatio = u.$imageWrapEl.attr("data-swiper-zoom") || Z.maxRatio, u.$imageWrapEl.length === 0)) {
            u.$imageEl = void 0;
            return
        }
        u.$imageEl && u.$imageEl.transition(0), o = !0
    }

    function g(A) {
        const G = e.support,
            Z = e.params.zoom,
            me = e.zoom;
        if (!G.gestures) {
            if (A.type !== "touchmove" || A.type === "touchmove" && A.targetTouches.length < 2) return;
            d = !0, u.scaleMove = b(A)
        }
        if (!u.$imageEl || u.$imageEl.length === 0) {
            A.type === "gesturechange" && p(A);
            return
        }
        G.gestures ? me.scale = A.scale * a : me.scale = u.scaleMove / u.scaleStart * a, me.scale > u.maxRatio && (me.scale = u.maxRatio - 1 + (me.scale - u.maxRatio + 1) ** .5), me.scale < Z.minRatio && (me.scale = Z.minRatio + 1 - (Z.minRatio - me.scale + 1) ** .5), u.$imageEl.transform(`translate3d(0,0,0) scale(${me.scale})`)
    }

    function _(A) {
        const G = e.device,
            Z = e.support,
            me = e.params.zoom,
            _e = e.zoom;
        if (!Z.gestures) {
            if (!c || !d || A.type !== "touchend" || A.type === "touchend" && A.changedTouches.length < 2 && !G.android) return;
            c = !1, d = !1
        }!u.$imageEl || u.$imageEl.length === 0 || (_e.scale = Math.max(Math.min(_e.scale, u.maxRatio), me.minRatio), u.$imageEl.transition(e.params.speed).transform(`translate3d(0,0,0) scale(${_e.scale})`), a = _e.scale, o = !1, _e.scale === 1 && (u.$slideEl = void 0))
    }

    function y(A) {
        const G = e.device;
        !u.$imageEl || u.$imageEl.length === 0 || f.isTouched || (G.android && A.cancelable && A.preventDefault(), f.isTouched = !0, f.touchesStart.x = A.type === "touchstart" ? A.targetTouches[0].pageX : A.pageX, f.touchesStart.y = A.type === "touchstart" ? A.targetTouches[0].pageY : A.pageY)
    }

    function E(A) {
        const G = e.zoom;
        if (!u.$imageEl || u.$imageEl.length === 0 || (e.allowClick = !1, !f.isTouched || !u.$slideEl)) return;
        f.isMoved || (f.width = u.$imageEl[0].offsetWidth, f.height = u.$imageEl[0].offsetHeight, f.startX = sa(u.$imageWrapEl[0], "x") || 0, f.startY = sa(u.$imageWrapEl[0], "y") || 0, u.slideWidth = u.$slideEl[0].offsetWidth, u.slideHeight = u.$slideEl[0].offsetHeight, u.$imageWrapEl.transition(0));
        const Z = f.width * G.scale,
            me = f.height * G.scale;
        if (!(Z < u.slideWidth && me < u.slideHeight)) {
            if (f.minX = Math.min(u.slideWidth / 2 - Z / 2, 0), f.maxX = -f.minX, f.minY = Math.min(u.slideHeight / 2 - me / 2, 0), f.maxY = -f.minY, f.touchesCurrent.x = A.type === "touchmove" ? A.targetTouches[0].pageX : A.pageX, f.touchesCurrent.y = A.type === "touchmove" ? A.targetTouches[0].pageY : A.pageY, !f.isMoved && !o) {
                if (e.isHorizontal() && (Math.floor(f.minX) === Math.floor(f.startX) && f.touchesCurrent.x < f.touchesStart.x || Math.floor(f.maxX) === Math.floor(f.startX) && f.touchesCurrent.x > f.touchesStart.x)) {
                    f.isTouched = !1;
                    return
                }
                if (!e.isHorizontal() && (Math.floor(f.minY) === Math.floor(f.startY) && f.touchesCurrent.y < f.touchesStart.y || Math.floor(f.maxY) === Math.floor(f.startY) && f.touchesCurrent.y > f.touchesStart.y)) {
                    f.isTouched = !1;
                    return
                }
            }
            A.cancelable && A.preventDefault(), A.stopPropagation(), f.isMoved = !0, f.currentX = f.touchesCurrent.x - f.touchesStart.x + f.startX, f.currentY = f.touchesCurrent.y - f.touchesStart.y + f.startY, f.currentX < f.minX && (f.currentX = f.minX + 1 - (f.minX - f.currentX + 1) ** .8), f.currentX > f.maxX && (f.currentX = f.maxX - 1 + (f.currentX - f.maxX + 1) ** .8), f.currentY < f.minY && (f.currentY = f.minY + 1 - (f.minY - f.currentY + 1) ** .8), f.currentY > f.maxY && (f.currentY = f.maxY - 1 + (f.currentY - f.maxY + 1) ** .8), h.prevPositionX || (h.prevPositionX = f.touchesCurrent.x), h.prevPositionY || (h.prevPositionY = f.touchesCurrent.y), h.prevTime || (h.prevTime = Date.now()), h.x = (f.touchesCurrent.x - h.prevPositionX) / (Date.now() - h.prevTime) / 2, h.y = (f.touchesCurrent.y - h.prevPositionY) / (Date.now() - h.prevTime) / 2, Math.abs(f.touchesCurrent.x - h.prevPositionX) < 2 && (h.x = 0), Math.abs(f.touchesCurrent.y - h.prevPositionY) < 2 && (h.y = 0), h.prevPositionX = f.touchesCurrent.x, h.prevPositionY = f.touchesCurrent.y, h.prevTime = Date.now(), u.$imageWrapEl.transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`)
        }
    }

    function q() {
        const A = e.zoom;
        if (!u.$imageEl || u.$imageEl.length === 0) return;
        if (!f.isTouched || !f.isMoved) {
            f.isTouched = !1, f.isMoved = !1;
            return
        }
        f.isTouched = !1, f.isMoved = !1;
        let G = 300,
            Z = 300;
        const me = h.x * G,
            _e = f.currentX + me,
            Je = h.y * Z,
            zt = f.currentY + Je;
        h.x !== 0 && (G = Math.abs((_e - f.currentX) / h.x)), h.y !== 0 && (Z = Math.abs((zt - f.currentY) / h.y));
        const jt = Math.max(G, Z);
        f.currentX = _e, f.currentY = zt;
        const Bt = f.width * A.scale,
            et = f.height * A.scale;
        f.minX = Math.min(u.slideWidth / 2 - Bt / 2, 0), f.maxX = -f.minX, f.minY = Math.min(u.slideHeight / 2 - et / 2, 0), f.maxY = -f.minY, f.currentX = Math.max(Math.min(f.currentX, f.maxX), f.minX), f.currentY = Math.max(Math.min(f.currentY, f.maxY), f.minY), u.$imageWrapEl.transition(jt).transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`)
    }

    function P() {
        const A = e.zoom;
        u.$slideEl && e.previousIndex !== e.activeIndex && (u.$imageEl && u.$imageEl.transform("translate3d(0,0,0) scale(1)"), u.$imageWrapEl && u.$imageWrapEl.transform("translate3d(0,0,0)"), A.scale = 1, a = 1, u.$slideEl = void 0, u.$imageEl = void 0, u.$imageWrapEl = void 0)
    }

    function z(A) {
        const G = e.zoom,
            Z = e.params.zoom;
        if (u.$slideEl || (A && A.target && (u.$slideEl = N(A.target).closest(`.${e.params.slideClass}`)), u.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? u.$slideEl = e.$wrapperEl.children(`.${e.params.slideActiveClass}`) : u.$slideEl = e.slides.eq(e.activeIndex)), u.$imageEl = u.$slideEl.find(`.${Z.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), u.$imageWrapEl = u.$imageEl.parent(`.${Z.containerClass}`)), !u.$imageEl || u.$imageEl.length === 0 || !u.$imageWrapEl || u.$imageWrapEl.length === 0) return;
        e.params.cssMode && (e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.touchAction = "none"), u.$slideEl.addClass(`${Z.zoomedSlideClass}`);
        let me, _e, Je, zt, jt, Bt, et, yt, Oi, di, bt, ki, nt, pt, ot, lt, ui, Be;
        typeof f.touchesStart.x > "u" && A ? (me = A.type === "touchend" ? A.changedTouches[0].pageX : A.pageX, _e = A.type === "touchend" ? A.changedTouches[0].pageY : A.pageY) : (me = f.touchesStart.x, _e = f.touchesStart.y), G.scale = u.$imageWrapEl.attr("data-swiper-zoom") || Z.maxRatio, a = u.$imageWrapEl.attr("data-swiper-zoom") || Z.maxRatio, A ? (ui = u.$slideEl[0].offsetWidth, Be = u.$slideEl[0].offsetHeight, Je = u.$slideEl.offset().left + s.scrollX, zt = u.$slideEl.offset().top + s.scrollY, jt = Je + ui / 2 - me, Bt = zt + Be / 2 - _e, Oi = u.$imageEl[0].offsetWidth, di = u.$imageEl[0].offsetHeight, bt = Oi * G.scale, ki = di * G.scale, nt = Math.min(ui / 2 - bt / 2, 0), pt = Math.min(Be / 2 - ki / 2, 0), ot = -nt, lt = -pt, et = jt * G.scale, yt = Bt * G.scale, et < nt && (et = nt), et > ot && (et = ot), yt < pt && (yt = pt), yt > lt && (yt = lt)) : (et = 0, yt = 0), u.$imageWrapEl.transition(300).transform(`translate3d(${et}px, ${yt}px,0)`), u.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${G.scale})`)
    }

    function k() {
        const A = e.zoom,
            G = e.params.zoom;
        u.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? u.$slideEl = e.$wrapperEl.children(`.${e.params.slideActiveClass}`) : u.$slideEl = e.slides.eq(e.activeIndex), u.$imageEl = u.$slideEl.find(`.${G.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), u.$imageWrapEl = u.$imageEl.parent(`.${G.containerClass}`)), !(!u.$imageEl || u.$imageEl.length === 0 || !u.$imageWrapEl || u.$imageWrapEl.length === 0) && (e.params.cssMode && (e.wrapperEl.style.overflow = "", e.wrapperEl.style.touchAction = ""), A.scale = 1, a = 1, u.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), u.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), u.$slideEl.removeClass(`${G.zoomedSlideClass}`), u.$slideEl = void 0)
    }

    function V(A) {
        const G = e.zoom;
        G.scale && G.scale !== 1 ? k() : z(A)
    }

    function L() {
        const A = e.support,
            G = e.touchEvents.start === "touchstart" && A.passiveListener && e.params.passiveListeners ? {
                passive: !0,
                capture: !1
            } : !1,
            Z = A.passiveListener ? {
                passive: !1,
                capture: !0
            } : !0;
        return {
            passiveListener: G,
            activeListenerWithCapture: Z
        }
    }

    function M() {
        return `.${e.params.slideClass}`
    }

    function x(A) {
        const {
            passiveListener: G
        } = L(), Z = M();
        e.$wrapperEl[A]("gesturestart", Z, p, G), e.$wrapperEl[A]("gesturechange", Z, g, G), e.$wrapperEl[A]("gestureend", Z, _, G)
    }

    function D() {
        l || (l = !0, x("on"))
    }

    function F() {
        l && (l = !1, x("off"))
    }

    function se() {
        const A = e.zoom;
        if (A.enabled) return;
        A.enabled = !0;
        const G = e.support,
            {
                passiveListener: Z,
                activeListenerWithCapture: me
            } = L(),
            _e = M();
        G.gestures ? (e.$wrapperEl.on(e.touchEvents.start, D, Z), e.$wrapperEl.on(e.touchEvents.end, F, Z)) : e.touchEvents.start === "touchstart" && (e.$wrapperEl.on(e.touchEvents.start, _e, p, Z), e.$wrapperEl.on(e.touchEvents.move, _e, g, me), e.$wrapperEl.on(e.touchEvents.end, _e, _, Z), e.touchEvents.cancel && e.$wrapperEl.on(e.touchEvents.cancel, _e, _, Z)), e.$wrapperEl.on(e.touchEvents.move, `.${e.params.zoom.containerClass}`, E, me)
    }

    function te() {
        const A = e.zoom;
        if (!A.enabled) return;
        const G = e.support;
        A.enabled = !1;
        const {
            passiveListener: Z,
            activeListenerWithCapture: me
        } = L(), _e = M();
        G.gestures ? (e.$wrapperEl.off(e.touchEvents.start, D, Z), e.$wrapperEl.off(e.touchEvents.end, F, Z)) : e.touchEvents.start === "touchstart" && (e.$wrapperEl.off(e.touchEvents.start, _e, p, Z), e.$wrapperEl.off(e.touchEvents.move, _e, g, me), e.$wrapperEl.off(e.touchEvents.end, _e, _, Z), e.touchEvents.cancel && e.$wrapperEl.off(e.touchEvents.cancel, _e, _, Z)), e.$wrapperEl.off(e.touchEvents.move, `.${e.params.zoom.containerClass}`, E, me)
    }
    n("init", () => {
        e.params.zoom.enabled && se()
    }), n("destroy", () => {
        te()
    }), n("touchStart", (A, G) => {
        e.zoom.enabled && y(G)
    }), n("touchEnd", (A, G) => {
        e.zoom.enabled && q()
    }), n("doubleTap", (A, G) => {
        !e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && V(G)
    }), n("transitionEnd", () => {
        e.zoom.enabled && e.params.zoom.enabled && P()
    }), n("slideChange", () => {
        e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && P()
    }), Object.assign(e.zoom, {
        enable: se,
        disable: te,
        in: z,
        out: k,
        toggle: V
    })
}

function S1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n,
        emit: r
    } = t;
    i({
        lazy: {
            checkInView: !1,
            enabled: !1,
            loadPrevNext: !1,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: !1,
            scrollingElement: "",
            elementClass: "swiper-lazy",
            loadingClass: "swiper-lazy-loading",
            loadedClass: "swiper-lazy-loaded",
            preloaderClass: "swiper-lazy-preloader"
        }
    }), e.lazy = {};
    let s = !1,
        a = !1;

    function o(d, u) {
        u === void 0 && (u = !0);
        const f = e.params.lazy;
        if (typeof d > "u" || e.slides.length === 0) return;
        const v = e.virtual && e.params.virtual.enabled ? e.$wrapperEl.children(`.${e.params.slideClass}[data-swiper-slide-index="${d}"]`) : e.slides.eq(d),
            b = v.find(`.${f.elementClass}:not(.${f.loadedClass}):not(.${f.loadingClass})`);
        v.hasClass(f.elementClass) && !v.hasClass(f.loadedClass) && !v.hasClass(f.loadingClass) && b.push(v[0]), b.length !== 0 && b.each(p => {
            const g = N(p);
            g.addClass(f.loadingClass);
            const _ = g.attr("data-background"),
                y = g.attr("data-src"),
                E = g.attr("data-srcset"),
                q = g.attr("data-sizes"),
                P = g.parent("picture");
            e.loadImage(g[0], y || _, E, q, !1, () => {
                if (!(typeof e > "u" || e === null || !e || e && !e.params || e.destroyed)) {
                    if (_ ? (g.css("background-image", `url("${_}")`), g.removeAttr("data-background")) : (E && (g.attr("srcset", E), g.removeAttr("data-srcset")), q && (g.attr("sizes", q), g.removeAttr("data-sizes")), P.length && P.children("source").each(z => {
                            const k = N(z);
                            k.attr("data-srcset") && (k.attr("srcset", k.attr("data-srcset")), k.removeAttr("data-srcset"))
                        }), y && (g.attr("src", y), g.removeAttr("data-src"))), g.addClass(f.loadedClass).removeClass(f.loadingClass), v.find(`.${f.preloaderClass}`).remove(), e.params.loop && u) {
                        const z = v.attr("data-swiper-slide-index");
                        if (v.hasClass(e.params.slideDuplicateClass)) {
                            const k = e.$wrapperEl.children(`[data-swiper-slide-index="${z}"]:not(.${e.params.slideDuplicateClass})`);
                            o(k.index(), !1)
                        } else {
                            const k = e.$wrapperEl.children(`.${e.params.slideDuplicateClass}[data-swiper-slide-index="${z}"]`);
                            o(k.index(), !1)
                        }
                    }
                    r("lazyImageReady", v[0], g[0]), e.params.autoHeight && e.updateAutoHeight()
                }
            }), r("lazyImageLoad", v[0], g[0])
        })
    }

    function l() {
        const {
            $wrapperEl: d,
            params: u,
            slides: f,
            activeIndex: h
        } = e, v = e.virtual && u.virtual.enabled, b = u.lazy;
        let p = u.slidesPerView;
        p === "auto" && (p = 0);

        function g(y) {
            if (v) {
                if (d.children(`.${u.slideClass}[data-swiper-slide-index="${y}"]`).length) return !0
            } else if (f[y]) return !0;
            return !1
        }

        function _(y) {
            return v ? N(y).attr("data-swiper-slide-index") : N(y).index()
        }
        if (a || (a = !0), e.params.watchSlidesProgress) d.children(`.${u.slideVisibleClass}`).each(y => {
            const E = v ? N(y).attr("data-swiper-slide-index") : N(y).index();
            o(E)
        });
        else if (p > 1)
            for (let y = h; y < h + p; y += 1) g(y) && o(y);
        else o(h);
        if (b.loadPrevNext)
            if (p > 1 || b.loadPrevNextAmount && b.loadPrevNextAmount > 1) {
                const y = b.loadPrevNextAmount,
                    E = Math.ceil(p),
                    q = Math.min(h + E + Math.max(y, E), f.length),
                    P = Math.max(h - Math.max(E, y), 0);
                for (let z = h + E; z < q; z += 1) g(z) && o(z);
                for (let z = P; z < h; z += 1) g(z) && o(z)
            } else {
                const y = d.children(`.${u.slideNextClass}`);
                y.length > 0 && o(_(y));
                const E = d.children(`.${u.slidePrevClass}`);
                E.length > 0 && o(_(E))
            }
    }

    function c() {
        const d = Oe();
        if (!e || e.destroyed) return;
        const u = e.params.lazy.scrollingElement ? N(e.params.lazy.scrollingElement) : N(d),
            f = u[0] === d,
            h = f ? d.innerWidth : u[0].offsetWidth,
            v = f ? d.innerHeight : u[0].offsetHeight,
            b = e.$el.offset(),
            {
                rtlTranslate: p
            } = e;
        let g = !1;
        p && (b.left -= e.$el[0].scrollLeft);
        const _ = [
            [b.left, b.top],
            [b.left + e.width, b.top],
            [b.left, b.top + e.height],
            [b.left + e.width, b.top + e.height]
        ];
        for (let E = 0; E < _.length; E += 1) {
            const q = _[E];
            if (q[0] >= 0 && q[0] <= h && q[1] >= 0 && q[1] <= v) {
                if (q[0] === 0 && q[1] === 0) continue;
                g = !0
            }
        }
        const y = e.touchEvents.start === "touchstart" && e.support.passiveListener && e.params.passiveListeners ? {
            passive: !0,
            capture: !1
        } : !1;
        g ? (l(), u.off("scroll", c, y)) : s || (s = !0, u.on("scroll", c, y))
    }
    n("beforeInit", () => {
        e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
    }), n("init", () => {
        e.params.lazy.enabled && (e.params.lazy.checkInView ? c() : l())
    }), n("scroll", () => {
        e.params.freeMode && e.params.freeMode.enabled && !e.params.freeMode.sticky && l()
    }), n("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
        e.params.lazy.enabled && (e.params.lazy.checkInView ? c() : l())
    }), n("transitionStart", () => {
        e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !a) && (e.params.lazy.checkInView ? c() : l())
    }), n("transitionEnd", () => {
        e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && (e.params.lazy.checkInView ? c() : l())
    }), n("slideChange", () => {
        const {
            lazy: d,
            cssMode: u,
            watchSlidesProgress: f,
            touchReleaseOnEdges: h,
            resistanceRatio: v
        } = e.params;
        d.enabled && (u || f && (h || v === 0)) && l()
    }), n("destroy", () => {
        e.$el && e.$el.find(`.${e.params.lazy.loadingClass}`).removeClass(e.params.lazy.loadingClass)
    }), Object.assign(e.lazy, {
        load: l,
        loadInSlide: o
    })
}

function T1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n
    } = t;
    i({
        controller: {
            control: void 0,
            inverse: !1,
            by: "slide"
        }
    }), e.controller = {
        control: void 0
    };

    function r(c, d) {
        const u = function() {
            let b, p, g;
            return (_, y) => {
                for (p = -1, b = _.length; b - p > 1;) g = b + p >> 1, _[g] <= y ? p = g : b = g;
                return b
            }
        }();
        this.x = c, this.y = d, this.lastIndex = c.length - 1;
        let f, h;
        return this.interpolate = function(b) {
            return b ? (h = u(this.x, b), f = h - 1, (b - this.x[f]) * (this.y[h] - this.y[f]) / (this.x[h] - this.x[f]) + this.y[f]) : 0
        }, this
    }

    function s(c) {
        e.controller.spline || (e.controller.spline = e.params.loop ? new r(e.slidesGrid, c.slidesGrid) : new r(e.snapGrid, c.snapGrid))
    }

    function a(c, d) {
        const u = e.controller.control;
        let f, h;
        const v = e.constructor;

        function b(p) {
            const g = e.rtlTranslate ? -e.translate : e.translate;
            e.params.controller.by === "slide" && (s(p), h = -e.controller.spline.interpolate(-g)), (!h || e.params.controller.by === "container") && (f = (p.maxTranslate() - p.minTranslate()) / (e.maxTranslate() - e.minTranslate()), h = (g - e.minTranslate()) * f + p.minTranslate()), e.params.controller.inverse && (h = p.maxTranslate() - h), p.updateProgress(h), p.setTranslate(h, e), p.updateActiveIndex(), p.updateSlidesClasses()
        }
        if (Array.isArray(u))
            for (let p = 0; p < u.length; p += 1) u[p] !== d && u[p] instanceof v && b(u[p]);
        else u instanceof v && d !== u && b(u)
    }

    function o(c, d) {
        const u = e.constructor,
            f = e.controller.control;
        let h;

        function v(b) {
            b.setTransition(c, e), c !== 0 && (b.transitionStart(), b.params.autoHeight && ci(() => {
                b.updateAutoHeight()
            }), b.$wrapperEl.transitionEnd(() => {
                f && (b.params.loop && e.params.controller.by === "slide" && b.loopFix(), b.transitionEnd())
            }))
        }
        if (Array.isArray(f))
            for (h = 0; h < f.length; h += 1) f[h] !== d && f[h] instanceof u && v(f[h]);
        else f instanceof u && d !== f && v(f)
    }

    function l() {
        e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
    }
    n("beforeInit", () => {
        e.controller.control = e.params.controller.control
    }), n("update", () => {
        l()
    }), n("resize", () => {
        l()
    }), n("observerUpdate", () => {
        l()
    }), n("setTranslate", (c, d, u) => {
        e.controller.control && e.controller.setTranslate(d, u)
    }), n("setTransition", (c, d, u) => {
        e.controller.control && e.controller.setTransition(d, u)
    }), Object.assign(e.controller, {
        setTranslate: a,
        setTransition: o
    })
}

function M1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n
    } = t;
    i({
        a11y: {
            enabled: !0,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            slideLabelMessage: "{{index}} / {{slidesLength}}",
            containerMessage: null,
            containerRoleDescriptionMessage: null,
            itemRoleDescriptionMessage: null,
            slideRole: "group",
            id: null
        }
    });
    let r = null;

    function s(M) {
        const x = r;
        x.length !== 0 && (x.html(""), x.html(M))
    }

    function a(M) {
        M === void 0 && (M = 16);
        const x = () => Math.round(16 * Math.random()).toString(16);
        return "x".repeat(M).replace(/x/g, x)
    }

    function o(M) {
        M.attr("tabIndex", "0")
    }

    function l(M) {
        M.attr("tabIndex", "-1")
    }

    function c(M, x) {
        M.attr("role", x)
    }

    function d(M, x) {
        M.attr("aria-roledescription", x)
    }

    function u(M, x) {
        M.attr("aria-controls", x)
    }

    function f(M, x) {
        M.attr("aria-label", x)
    }

    function h(M, x) {
        M.attr("id", x)
    }

    function v(M, x) {
        M.attr("aria-live", x)
    }

    function b(M) {
        M.attr("aria-disabled", !0)
    }

    function p(M) {
        M.attr("aria-disabled", !1)
    }

    function g(M) {
        if (M.keyCode !== 13 && M.keyCode !== 32) return;
        const x = e.params.a11y,
            D = N(M.target);
        e.navigation && e.navigation.$nextEl && D.is(e.navigation.$nextEl) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? s(x.lastSlideMessage) : s(x.nextSlideMessage)), e.navigation && e.navigation.$prevEl && D.is(e.navigation.$prevEl) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? s(x.firstSlideMessage) : s(x.prevSlideMessage)), e.pagination && D.is(Vt(e.params.pagination.bulletClass)) && D[0].click()
    }

    function _() {
        if (e.params.loop || e.params.rewind || !e.navigation) return;
        const {
            $nextEl: M,
            $prevEl: x
        } = e.navigation;
        x && x.length > 0 && (e.isBeginning ? (b(x), l(x)) : (p(x), o(x))), M && M.length > 0 && (e.isEnd ? (b(M), l(M)) : (p(M), o(M)))
    }

    function y() {
        return e.pagination && e.pagination.bullets && e.pagination.bullets.length
    }

    function E() {
        return y() && e.params.pagination.clickable
    }

    function q() {
        const M = e.params.a11y;
        y() && e.pagination.bullets.each(x => {
            const D = N(x);
            e.params.pagination.clickable && (o(D), e.params.pagination.renderBullet || (c(D, "button"), f(D, M.paginationBulletMessage.replace(/\{\{index\}\}/, D.index() + 1)))), D.is(`.${e.params.pagination.bulletActiveClass}`) ? D.attr("aria-current", "true") : D.removeAttr("aria-current")
        })
    }
    const P = (M, x, D) => {
            o(M), M[0].tagName !== "BUTTON" && (c(M, "button"), M.on("keydown", g)), f(M, D), u(M, x)
        },
        z = M => {
            const x = M.target.closest(`.${e.params.slideClass}`);
            if (!x || !e.slides.includes(x)) return;
            const D = e.slides.indexOf(x) === e.activeIndex,
                F = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(x);
            D || F || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0, e.slideTo(e.slides.indexOf(x), 0))
        },
        k = () => {
            const M = e.params.a11y;
            M.itemRoleDescriptionMessage && d(N(e.slides), M.itemRoleDescriptionMessage), M.slideRole && c(N(e.slides), M.slideRole);
            const x = e.params.loop ? e.slides.filter(D => !D.classList.contains(e.params.slideDuplicateClass)).length : e.slides.length;
            M.slideLabelMessage && e.slides.each((D, F) => {
                const se = N(D),
                    te = e.params.loop ? parseInt(se.attr("data-swiper-slide-index"), 10) : F,
                    A = M.slideLabelMessage.replace(/\{\{index\}\}/, te + 1).replace(/\{\{slidesLength\}\}/, x);
                f(se, A)
            })
        },
        V = () => {
            const M = e.params.a11y;
            e.$el.append(r);
            const x = e.$el;
            M.containerRoleDescriptionMessage && d(x, M.containerRoleDescriptionMessage), M.containerMessage && f(x, M.containerMessage);
            const D = e.$wrapperEl,
                F = M.id || D.attr("id") || `swiper-wrapper-${a(16)}`,
                se = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
            h(D, F), v(D, se), k();
            let te, A;
            e.navigation && e.navigation.$nextEl && (te = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (A = e.navigation.$prevEl), te && te.length && P(te, F, M.nextSlideMessage), A && A.length && P(A, F, M.prevSlideMessage), E() && e.pagination.$el.on("keydown", Vt(e.params.pagination.bulletClass), g), e.$el.on("focus", z, !0)
        };

    function L() {
        r && r.length > 0 && r.remove();
        let M, x;
        e.navigation && e.navigation.$nextEl && (M = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (x = e.navigation.$prevEl), M && M.off("keydown", g), x && x.off("keydown", g), E() && e.pagination.$el.off("keydown", Vt(e.params.pagination.bulletClass), g), e.$el.off("focus", z, !0)
    }
    n("beforeInit", () => {
        r = N(`<span class="${e.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)
    }), n("afterInit", () => {
        e.params.a11y.enabled && V()
    }), n("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
        e.params.a11y.enabled && k()
    }), n("fromEdge toEdge afterInit lock unlock", () => {
        e.params.a11y.enabled && _()
    }), n("paginationUpdate", () => {
        e.params.a11y.enabled && q()
    }), n("destroy", () => {
        e.params.a11y.enabled && L()
    })
}

function $1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n
    } = t;
    i({
        history: {
            enabled: !1,
            root: "",
            replaceState: !1,
            key: "slides",
            keepQuery: !1
        }
    });
    let r = !1,
        s = {};
    const a = h => h.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
        o = h => {
            const v = Oe();
            let b;
            h ? b = new URL(h) : b = v.location;
            const p = b.pathname.slice(1).split("/").filter(E => E !== ""),
                g = p.length,
                _ = p[g - 2],
                y = p[g - 1];
            return {
                key: _,
                value: y
            }
        },
        l = (h, v) => {
            const b = Oe();
            if (!r || !e.params.history.enabled) return;
            let p;
            e.params.url ? p = new URL(e.params.url) : p = b.location;
            const g = e.slides.eq(v);
            let _ = a(g.attr("data-history"));
            if (e.params.history.root.length > 0) {
                let E = e.params.history.root;
                E[E.length - 1] === "/" && (E = E.slice(0, E.length - 1)), _ = `${E}/${h}/${_}`
            } else p.pathname.includes(h) || (_ = `${h}/${_}`);
            e.params.history.keepQuery && (_ += p.search);
            const y = b.history.state;
            y && y.value === _ || (e.params.history.replaceState ? b.history.replaceState({
                value: _
            }, null, _) : b.history.pushState({
                value: _
            }, null, _))
        },
        c = (h, v, b) => {
            if (v)
                for (let p = 0, g = e.slides.length; p < g; p += 1) {
                    const _ = e.slides.eq(p);
                    if (a(_.attr("data-history")) === v && !_.hasClass(e.params.slideDuplicateClass)) {
                        const E = _.index();
                        e.slideTo(E, h, b)
                    }
                } else e.slideTo(0, h, b)
        },
        d = () => {
            s = o(e.params.url), c(e.params.speed, s.value, !1)
        },
        u = () => {
            const h = Oe();
            if (e.params.history) {
                if (!h.history || !h.history.pushState) {
                    e.params.history.enabled = !1, e.params.hashNavigation.enabled = !0;
                    return
                }
                r = !0, s = o(e.params.url), !(!s.key && !s.value) && (c(0, s.value, e.params.runCallbacksOnInit), e.params.history.replaceState || h.addEventListener("popstate", d))
            }
        },
        f = () => {
            const h = Oe();
            e.params.history.replaceState || h.removeEventListener("popstate", d)
        };
    n("init", () => {
        e.params.history.enabled && u()
    }), n("destroy", () => {
        e.params.history.enabled && f()
    }), n("transitionEnd _freeModeNoMomentumRelease", () => {
        r && l(e.params.history.key, e.activeIndex)
    }), n("slideChange", () => {
        r && e.params.cssMode && l(e.params.history.key, e.activeIndex)
    })
}

function A1(t) {
    let {
        swiper: e,
        extendParams: i,
        emit: n,
        on: r
    } = t, s = !1;
    const a = Ze(),
        o = Oe();
    i({
        hashNavigation: {
            enabled: !1,
            replaceState: !1,
            watchState: !1
        }
    });
    const l = () => {
            n("hashChange");
            const f = a.location.hash.replace("#", ""),
                h = e.slides.eq(e.activeIndex).attr("data-hash");
            if (f !== h) {
                const v = e.$wrapperEl.children(`.${e.params.slideClass}[data-hash="${f}"]`).index();
                if (typeof v > "u") return;
                e.slideTo(v)
            }
        },
        c = () => {
            if (!(!s || !e.params.hashNavigation.enabled))
                if (e.params.hashNavigation.replaceState && o.history && o.history.replaceState) o.history.replaceState(null, null, `#${e.slides.eq(e.activeIndex).attr("data-hash")}` || ""), n("hashSet");
                else {
                    const f = e.slides.eq(e.activeIndex),
                        h = f.attr("data-hash") || f.attr("data-history");
                    a.location.hash = h || "", n("hashSet")
                }
        },
        d = () => {
            if (!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled) return;
            s = !0;
            const f = a.location.hash.replace("#", "");
            if (f)
                for (let v = 0, b = e.slides.length; v < b; v += 1) {
                    const p = e.slides.eq(v);
                    if ((p.attr("data-hash") || p.attr("data-history")) === f && !p.hasClass(e.params.slideDuplicateClass)) {
                        const _ = p.index();
                        e.slideTo(_, 0, e.params.runCallbacksOnInit, !0)
                    }
                }
            e.params.hashNavigation.watchState && N(o).on("hashchange", l)
        },
        u = () => {
            e.params.hashNavigation.watchState && N(o).off("hashchange", l)
        };
    r("init", () => {
        e.params.hashNavigation.enabled && d()
    }), r("destroy", () => {
        e.params.hashNavigation.enabled && u()
    }), r("transitionEnd _freeModeNoMomentumRelease", () => {
        s && c()
    }), r("slideChange", () => {
        s && e.params.cssMode && c()
    })
}

function P1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n,
        emit: r
    } = t, s;
    e.autoplay = {
        running: !1,
        paused: !1
    }, i({
        autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1
        }
    });

    function a() {
        if (!e.size) {
            e.autoplay.running = !1, e.autoplay.paused = !1;
            return
        }
        const p = e.slides.eq(e.activeIndex);
        let g = e.params.autoplay.delay;
        p.attr("data-swiper-autoplay") && (g = p.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(s), s = ci(() => {
            let _;
            e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), _ = e.slidePrev(e.params.speed, !0, !0), r("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? l() : (_ = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), r("autoplay")) : (_ = e.slidePrev(e.params.speed, !0, !0), r("autoplay")) : e.params.loop ? (e.loopFix(), _ = e.slideNext(e.params.speed, !0, !0), r("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? l() : (_ = e.slideTo(0, e.params.speed, !0, !0), r("autoplay")) : (_ = e.slideNext(e.params.speed, !0, !0), r("autoplay")), (e.params.cssMode && e.autoplay.running || _ === !1) && a()
        }, g)
    }

    function o() {
        return typeof s < "u" || e.autoplay.running ? !1 : (e.autoplay.running = !0, r("autoplayStart"), a(), !0)
    }

    function l() {
        return !e.autoplay.running || typeof s > "u" ? !1 : (s && (clearTimeout(s), s = void 0), e.autoplay.running = !1, r("autoplayStop"), !0)
    }

    function c(p) {
        e.autoplay.running && (e.autoplay.paused || (s && clearTimeout(s), e.autoplay.paused = !0, p === 0 || !e.params.autoplay.waitForTransition ? (e.autoplay.paused = !1, a()) : ["transitionend", "webkitTransitionEnd"].forEach(g => {
            e.$wrapperEl[0].addEventListener(g, u)
        })))
    }

    function d() {
        const p = Ze();
        p.visibilityState === "hidden" && e.autoplay.running && c(), p.visibilityState === "visible" && e.autoplay.paused && (a(), e.autoplay.paused = !1)
    }

    function u(p) {
        !e || e.destroyed || !e.$wrapperEl || p.target === e.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach(g => {
            e.$wrapperEl[0].removeEventListener(g, u)
        }), e.autoplay.paused = !1, e.autoplay.running ? a() : l())
    }

    function f() {
        e.params.autoplay.disableOnInteraction ? l() : (r("autoplayPause"), c()), ["transitionend", "webkitTransitionEnd"].forEach(p => {
            e.$wrapperEl[0].removeEventListener(p, u)
        })
    }

    function h() {
        e.params.autoplay.disableOnInteraction || (e.autoplay.paused = !1, r("autoplayResume"), a())
    }

    function v() {
        e.params.autoplay.pauseOnMouseEnter && (e.$el.on("mouseenter", f), e.$el.on("mouseleave", h))
    }

    function b() {
        e.$el.off("mouseenter", f), e.$el.off("mouseleave", h)
    }
    n("init", () => {
        e.params.autoplay.enabled && (o(), Ze().addEventListener("visibilitychange", d), v())
    }), n("beforeTransitionStart", (p, g, _) => {
        e.autoplay.running && (_ || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(g) : l())
    }), n("sliderFirstMove", () => {
        e.autoplay.running && (e.params.autoplay.disableOnInteraction ? l() : c())
    }), n("touchEnd", () => {
        e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && a()
    }), n("destroy", () => {
        b(), e.autoplay.running && l(), Ze().removeEventListener("visibilitychange", d)
    }), Object.assign(e.autoplay, {
        pause: c,
        run: a,
        start: o,
        stop: l
    })
}

function O1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n
    } = t;
    i({
        thumbs: {
            swiper: null,
            multipleActiveThumbs: !0,
            autoScrollOffset: 0,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-thumbs"
        }
    });
    let r = !1,
        s = !1;
    e.thumbs = {
        swiper: null
    };

    function a() {
        const c = e.thumbs.swiper;
        if (!c || c.destroyed) return;
        const d = c.clickedIndex,
            u = c.clickedSlide;
        if (u && N(u).hasClass(e.params.thumbs.slideThumbActiveClass) || typeof d > "u" || d === null) return;
        let f;
        if (c.params.loop ? f = parseInt(N(c.clickedSlide).attr("data-swiper-slide-index"), 10) : f = d, e.params.loop) {
            let h = e.activeIndex;
            e.slides.eq(h).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, h = e.activeIndex);
            const v = e.slides.eq(h).prevAll(`[data-swiper-slide-index="${f}"]`).eq(0).index(),
                b = e.slides.eq(h).nextAll(`[data-swiper-slide-index="${f}"]`).eq(0).index();
            typeof v > "u" ? f = b : typeof b > "u" ? f = v : b - h < h - v ? f = b : f = v
        }
        e.slideTo(f)
    }

    function o() {
        const {
            thumbs: c
        } = e.params;
        if (r) return !1;
        r = !0;
        const d = e.constructor;
        if (c.swiper instanceof d) e.thumbs.swiper = c.swiper, Object.assign(e.thumbs.swiper.originalParams, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1
        }), Object.assign(e.thumbs.swiper.params, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1
        });
        else if (bn(c.swiper)) {
            const u = Object.assign({}, c.swiper);
            Object.assign(u, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }), e.thumbs.swiper = new d(u), s = !0
        }
        return e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", a), !0
    }

    function l(c) {
        const d = e.thumbs.swiper;
        if (!d || d.destroyed) return;
        const u = d.params.slidesPerView === "auto" ? d.slidesPerViewDynamic() : d.params.slidesPerView;
        let f = 1;
        const h = e.params.thumbs.slideThumbActiveClass;
        if (e.params.slidesPerView > 1 && !e.params.centeredSlides && (f = e.params.slidesPerView), e.params.thumbs.multipleActiveThumbs || (f = 1), f = Math.floor(f), d.slides.removeClass(h), d.params.loop || d.params.virtual && d.params.virtual.enabled)
            for (let p = 0; p < f; p += 1) d.$wrapperEl.children(`[data-swiper-slide-index="${e.realIndex+p}"]`).addClass(h);
        else
            for (let p = 0; p < f; p += 1) d.slides.eq(e.realIndex + p).addClass(h);
        const v = e.params.thumbs.autoScrollOffset,
            b = v && !d.params.loop;
        if (e.realIndex !== d.realIndex || b) {
            let p = d.activeIndex,
                g, _;
            if (d.params.loop) {
                d.slides.eq(p).hasClass(d.params.slideDuplicateClass) && (d.loopFix(), d._clientLeft = d.$wrapperEl[0].clientLeft, p = d.activeIndex);
                const y = d.slides.eq(p).prevAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index(),
                    E = d.slides.eq(p).nextAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index();
                typeof y > "u" ? g = E : typeof E > "u" ? g = y : E - p === p - y ? g = d.params.slidesPerGroup > 1 ? E : p : E - p < p - y ? g = E : g = y, _ = e.activeIndex > e.previousIndex ? "next" : "prev"
            } else g = e.realIndex, _ = g > e.previousIndex ? "next" : "prev";
            b && (g += _ === "next" ? v : -1 * v), d.visibleSlidesIndexes && d.visibleSlidesIndexes.indexOf(g) < 0 && (d.params.centeredSlides ? g > p ? g = g - Math.floor(u / 2) + 1 : g = g + Math.floor(u / 2) - 1 : g > p && d.params.slidesPerGroup, d.slideTo(g, c ? 0 : void 0))
        }
    }
    n("beforeInit", () => {
        const {
            thumbs: c
        } = e.params;
        !c || !c.swiper || (o(), l(!0))
    }), n("slideChange update resize observerUpdate", () => {
        l()
    }), n("setTransition", (c, d) => {
        const u = e.thumbs.swiper;
        !u || u.destroyed || u.setTransition(d)
    }), n("beforeDestroy", () => {
        const c = e.thumbs.swiper;
        !c || c.destroyed || s && c.destroy()
    }), Object.assign(e.thumbs, {
        init: o,
        update: l
    })
}

function k1(t) {
    let {
        swiper: e,
        extendParams: i,
        emit: n,
        once: r
    } = t;
    i({
        freeMode: {
            enabled: !1,
            momentum: !0,
            momentumRatio: 1,
            momentumBounce: !0,
            momentumBounceRatio: 1,
            momentumVelocityRatio: 1,
            sticky: !1,
            minimumVelocity: .02
        }
    });

    function s() {
        const l = e.getTranslate();
        e.setTranslate(l), e.setTransition(0), e.touchEventsData.velocities.length = 0, e.freeMode.onTouchEnd({
            currentPos: e.rtl ? e.translate : -e.translate
        })
    }

    function a() {
        const {
            touchEventsData: l,
            touches: c
        } = e;
        l.velocities.length === 0 && l.velocities.push({
            position: c[e.isHorizontal() ? "startX" : "startY"],
            time: l.touchStartTime
        }), l.velocities.push({
            position: c[e.isHorizontal() ? "currentX" : "currentY"],
            time: vt()
        })
    }

    function o(l) {
        let {
            currentPos: c
        } = l;
        const {
            params: d,
            $wrapperEl: u,
            rtlTranslate: f,
            snapGrid: h,
            touchEventsData: v
        } = e, p = vt() - v.touchStartTime;
        if (c < -e.minTranslate()) {
            e.slideTo(e.activeIndex);
            return
        }
        if (c > -e.maxTranslate()) {
            e.slides.length < h.length ? e.slideTo(h.length - 1) : e.slideTo(e.slides.length - 1);
            return
        }
        if (d.freeMode.momentum) {
            if (v.velocities.length > 1) {
                const k = v.velocities.pop(),
                    V = v.velocities.pop(),
                    L = k.position - V.position,
                    M = k.time - V.time;
                e.velocity = L / M, e.velocity /= 2, Math.abs(e.velocity) < d.freeMode.minimumVelocity && (e.velocity = 0), (M > 150 || vt() - k.time > 300) && (e.velocity = 0)
            } else e.velocity = 0;
            e.velocity *= d.freeMode.momentumVelocityRatio, v.velocities.length = 0;
            let g = 1e3 * d.freeMode.momentumRatio;
            const _ = e.velocity * g;
            let y = e.translate + _;
            f && (y = -y);
            let E = !1,
                q;
            const P = Math.abs(e.velocity) * 20 * d.freeMode.momentumBounceRatio;
            let z;
            if (y < e.maxTranslate()) d.freeMode.momentumBounce ? (y + e.maxTranslate() < -P && (y = e.maxTranslate() - P), q = e.maxTranslate(), E = !0, v.allowMomentumBounce = !0) : y = e.maxTranslate(), d.loop && d.centeredSlides && (z = !0);
            else if (y > e.minTranslate()) d.freeMode.momentumBounce ? (y - e.minTranslate() > P && (y = e.minTranslate() + P), q = e.minTranslate(), E = !0, v.allowMomentumBounce = !0) : y = e.minTranslate(), d.loop && d.centeredSlides && (z = !0);
            else if (d.freeMode.sticky) {
                let k;
                for (let V = 0; V < h.length; V += 1)
                    if (h[V] > -y) {
                        k = V;
                        break
                    }
                Math.abs(h[k] - y) < Math.abs(h[k - 1] - y) || e.swipeDirection === "next" ? y = h[k] : y = h[k - 1], y = -y
            }
            if (z && r("transitionEnd", () => {
                    e.loopFix()
                }), e.velocity !== 0) {
                if (f ? g = Math.abs((-y - e.translate) / e.velocity) : g = Math.abs((y - e.translate) / e.velocity), d.freeMode.sticky) {
                    const k = Math.abs((f ? -y : y) - e.translate),
                        V = e.slidesSizesGrid[e.activeIndex];
                    k < V ? g = d.speed : k < 2 * V ? g = d.speed * 1.5 : g = d.speed * 2.5
                }
            } else if (d.freeMode.sticky) {
                e.slideToClosest();
                return
            }
            d.freeMode.momentumBounce && E ? (e.updateProgress(q), e.setTransition(g), e.setTranslate(y), e.transitionStart(!0, e.swipeDirection), e.animating = !0, u.transitionEnd(() => {
                !e || e.destroyed || !v.allowMomentumBounce || (n("momentumBounce"), e.setTransition(d.speed), setTimeout(() => {
                    e.setTranslate(q), u.transitionEnd(() => {
                        !e || e.destroyed || e.transitionEnd()
                    })
                }, 0))
            })) : e.velocity ? (n("_freeModeNoMomentumRelease"), e.updateProgress(y), e.setTransition(g), e.setTranslate(y), e.transitionStart(!0, e.swipeDirection), e.animating || (e.animating = !0, u.transitionEnd(() => {
                !e || e.destroyed || e.transitionEnd()
            }))) : e.updateProgress(y), e.updateActiveIndex(), e.updateSlidesClasses()
        } else if (d.freeMode.sticky) {
            e.slideToClosest();
            return
        } else d.freeMode && n("_freeModeNoMomentumRelease");
        (!d.freeMode.momentum || p >= d.longSwipesMs) && (e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses())
    }
    Object.assign(e, {
        freeMode: {
            onTouchStart: s,
            onTouchMove: a,
            onTouchEnd: o
        }
    })
}

function L1(t) {
    let {
        swiper: e,
        extendParams: i
    } = t;
    i({
        grid: {
            rows: 1,
            fill: "column"
        }
    });
    let n, r, s;
    const a = c => {
            const {
                slidesPerView: d
            } = e.params, {
                rows: u,
                fill: f
            } = e.params.grid;
            r = n / u, s = Math.floor(c / u), Math.floor(c / u) === c / u ? n = c : n = Math.ceil(c / u) * u, d !== "auto" && f === "row" && (n = Math.max(n, d * u))
        },
        o = (c, d, u, f) => {
            const {
                slidesPerGroup: h,
                spaceBetween: v
            } = e.params, {
                rows: b,
                fill: p
            } = e.params.grid;
            let g, _, y;
            if (p === "row" && h > 1) {
                const E = Math.floor(c / (h * b)),
                    q = c - b * h * E,
                    P = E === 0 ? h : Math.min(Math.ceil((u - E * b * h) / b), h);
                y = Math.floor(q / P), _ = q - y * P + E * h, g = _ + y * n / b, d.css({
                    "-webkit-order": g,
                    order: g
                })
            } else p === "column" ? (_ = Math.floor(c / b), y = c - _ * b, (_ > s || _ === s && y === b - 1) && (y += 1, y >= b && (y = 0, _ += 1))) : (y = Math.floor(c / r), _ = c - y * r);
            d.css(f("margin-top"), y !== 0 ? v && `${v}px` : "")
        },
        l = (c, d, u) => {
            const {
                spaceBetween: f,
                centeredSlides: h,
                roundLengths: v
            } = e.params, {
                rows: b
            } = e.params.grid;
            if (e.virtualSize = (c + f) * n, e.virtualSize = Math.ceil(e.virtualSize / b) - f, e.$wrapperEl.css({
                    [u("width")]: `${e.virtualSize+f}px`
                }), h) {
                d.splice(0, d.length);
                const p = [];
                for (let g = 0; g < d.length; g += 1) {
                    let _ = d[g];
                    v && (_ = Math.floor(_)), d[g] < e.virtualSize + d[0] && p.push(_)
                }
                d.push(...p)
            }
        };
    e.grid = {
        initSlides: a,
        updateSlide: o,
        updateWrapperSize: l
    }
}

function I1(t) {
    const e = this,
        {
            $wrapperEl: i,
            params: n
        } = e;
    if (n.loop && e.loopDestroy(), typeof t == "object" && "length" in t)
        for (let r = 0; r < t.length; r += 1) t[r] && i.append(t[r]);
    else i.append(t);
    n.loop && e.loopCreate(), n.observer || e.update()
}

function D1(t) {
    const e = this,
        {
            params: i,
            $wrapperEl: n,
            activeIndex: r
        } = e;
    i.loop && e.loopDestroy();
    let s = r + 1;
    if (typeof t == "object" && "length" in t) {
        for (let a = 0; a < t.length; a += 1) t[a] && n.prepend(t[a]);
        s = r + t.length
    } else n.prepend(t);
    i.loop && e.loopCreate(), i.observer || e.update(), e.slideTo(s, 0, !1)
}

function R1(t, e) {
    const i = this,
        {
            $wrapperEl: n,
            params: r,
            activeIndex: s
        } = i;
    let a = s;
    r.loop && (a -= i.loopedSlides, i.loopDestroy(), i.slides = n.children(`.${r.slideClass}`));
    const o = i.slides.length;
    if (t <= 0) {
        i.prependSlide(e);
        return
    }
    if (t >= o) {
        i.appendSlide(e);
        return
    }
    let l = a > t ? a + 1 : a;
    const c = [];
    for (let d = o - 1; d >= t; d -= 1) {
        const u = i.slides.eq(d);
        u.remove(), c.unshift(u)
    }
    if (typeof e == "object" && "length" in e) {
        for (let d = 0; d < e.length; d += 1) e[d] && n.append(e[d]);
        l = a > t ? a + e.length : a
    } else n.append(e);
    for (let d = 0; d < c.length; d += 1) n.append(c[d]);
    r.loop && i.loopCreate(), r.observer || i.update(), r.loop ? i.slideTo(l + i.loopedSlides, 0, !1) : i.slideTo(l, 0, !1)
}

function H1(t) {
    const e = this,
        {
            params: i,
            $wrapperEl: n,
            activeIndex: r
        } = e;
    let s = r;
    i.loop && (s -= e.loopedSlides, e.loopDestroy(), e.slides = n.children(`.${i.slideClass}`));
    let a = s,
        o;
    if (typeof t == "object" && "length" in t) {
        for (let l = 0; l < t.length; l += 1) o = t[l], e.slides[o] && e.slides.eq(o).remove(), o < a && (a -= 1);
        a = Math.max(a, 0)
    } else o = t, e.slides[o] && e.slides.eq(o).remove(), o < a && (a -= 1), a = Math.max(a, 0);
    i.loop && e.loopCreate(), i.observer || e.update(), i.loop ? e.slideTo(a + e.loopedSlides, 0, !1) : e.slideTo(a, 0, !1)
}

function z1() {
    const t = this,
        e = [];
    for (let i = 0; i < t.slides.length; i += 1) e.push(i);
    t.removeSlide(e)
}

function N1(t) {
    let {
        swiper: e
    } = t;
    Object.assign(e, {
        appendSlide: I1.bind(e),
        prependSlide: D1.bind(e),
        addSlide: R1.bind(e),
        removeSlide: H1.bind(e),
        removeAllSlides: z1.bind(e)
    })
}

function sn(t) {
    const {
        effect: e,
        swiper: i,
        on: n,
        setTranslate: r,
        setTransition: s,
        overwriteParams: a,
        perspective: o,
        recreateShadows: l,
        getEffectParams: c
    } = t;
    n("beforeInit", () => {
        if (i.params.effect !== e) return;
        i.classNames.push(`${i.params.containerModifierClass}${e}`), o && o() && i.classNames.push(`${i.params.containerModifierClass}3d`);
        const u = a ? a() : {};
        Object.assign(i.params, u), Object.assign(i.originalParams, u)
    }), n("setTranslate", () => {
        i.params.effect === e && r()
    }), n("setTransition", (u, f) => {
        i.params.effect === e && s(f)
    }), n("transitionEnd", () => {
        if (i.params.effect === e && l) {
            if (!c || !c().slideShadows) return;
            i.slides.each(u => {
                i.$(u).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove()
            }), l()
        }
    });
    let d;
    n("virtualUpdate", () => {
        i.params.effect === e && (i.slides.length || (d = !0), requestAnimationFrame(() => {
            d && i.slides && i.slides.length && (r(), d = !1)
        }))
    })
}

function Wn(t, e) {
    return t.transformEl ? e.find(t.transformEl).css({
        "backface-visibility": "hidden",
        "-webkit-backface-visibility": "hidden"
    }) : e
}

function Yr(t) {
    let {
        swiper: e,
        duration: i,
        transformEl: n,
        allSlides: r
    } = t;
    const {
        slides: s,
        activeIndex: a,
        $wrapperEl: o
    } = e;
    if (e.params.virtualTranslate && i !== 0) {
        let l = !1,
            c;
        r ? c = n ? s.find(n) : s : c = n ? s.eq(a).find(n) : s.eq(a), c.transitionEnd(() => {
            if (l || !e || e.destroyed) return;
            l = !0, e.animating = !1;
            const d = ["webkitTransitionEnd", "transitionend"];
            for (let u = 0; u < d.length; u += 1) o.trigger(d[u])
        })
    }
}

function F1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n
    } = t;
    i({
        fadeEffect: {
            crossFade: !1,
            transformEl: null
        }
    }), sn({
        effect: "fade",
        swiper: e,
        on: n,
        setTranslate: () => {
            const {
                slides: a
            } = e, o = e.params.fadeEffect;
            for (let l = 0; l < a.length; l += 1) {
                const c = e.slides.eq(l);
                let u = -c[0].swiperSlideOffset;
                e.params.virtualTranslate || (u -= e.translate);
                let f = 0;
                e.isHorizontal() || (f = u, u = 0);
                const h = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(c[0].progress), 0) : 1 + Math.min(Math.max(c[0].progress, -1), 0);
                Wn(o, c).css({
                    opacity: h
                }).transform(`translate3d(${u}px, ${f}px, 0px)`)
            }
        },
        setTransition: a => {
            const {
                transformEl: o
            } = e.params.fadeEffect;
            (o ? e.slides.find(o) : e.slides).transition(a), Yr({
                swiper: e,
                duration: a,
                transformEl: o,
                allSlides: !0
            })
        },
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode
        })
    })
}

function q1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n
    } = t;
    i({
        cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: .94
        }
    });
    const r = (l, c, d) => {
        let u = d ? l.find(".swiper-slide-shadow-left") : l.find(".swiper-slide-shadow-top"),
            f = d ? l.find(".swiper-slide-shadow-right") : l.find(".swiper-slide-shadow-bottom");
        u.length === 0 && (u = N(`<div class="swiper-slide-shadow-${d?"left":"top"}"></div>`), l.append(u)), f.length === 0 && (f = N(`<div class="swiper-slide-shadow-${d?"right":"bottom"}"></div>`), l.append(f)), u.length && (u[0].style.opacity = Math.max(-c, 0)), f.length && (f[0].style.opacity = Math.max(c, 0))
    };
    sn({
        effect: "cube",
        swiper: e,
        on: n,
        setTranslate: () => {
            const {
                $el: l,
                $wrapperEl: c,
                slides: d,
                width: u,
                height: f,
                rtlTranslate: h,
                size: v,
                browser: b
            } = e, p = e.params.cubeEffect, g = e.isHorizontal(), _ = e.virtual && e.params.virtual.enabled;
            let y = 0,
                E;
            p.shadow && (g ? (E = c.find(".swiper-cube-shadow"), E.length === 0 && (E = N('<div class="swiper-cube-shadow"></div>'), c.append(E)), E.css({
                height: `${u}px`
            })) : (E = l.find(".swiper-cube-shadow"), E.length === 0 && (E = N('<div class="swiper-cube-shadow"></div>'), l.append(E))));
            for (let P = 0; P < d.length; P += 1) {
                const z = d.eq(P);
                let k = P;
                _ && (k = parseInt(z.attr("data-swiper-slide-index"), 10));
                let V = k * 90,
                    L = Math.floor(V / 360);
                h && (V = -V, L = Math.floor(-V / 360));
                const M = Math.max(Math.min(z[0].progress, 1), -1);
                let x = 0,
                    D = 0,
                    F = 0;
                k % 4 === 0 ? (x = -L * 4 * v, F = 0) : (k - 1) % 4 === 0 ? (x = 0, F = -L * 4 * v) : (k - 2) % 4 === 0 ? (x = v + L * 4 * v, F = v) : (k - 3) % 4 === 0 && (x = -v, F = 3 * v + v * 4 * L), h && (x = -x), g || (D = x, x = 0);
                const se = `rotateX(${g?0:-V}deg) rotateY(${g?V:0}deg) translate3d(${x}px, ${D}px, ${F}px)`;
                M <= 1 && M > -1 && (y = k * 90 + M * 90, h && (y = -k * 90 - M * 90)), z.transform(se), p.slideShadows && r(z, M, g)
            }
            if (c.css({
                    "-webkit-transform-origin": `50% 50% -${v/2}px`,
                    "transform-origin": `50% 50% -${v/2}px`
                }), p.shadow)
                if (g) E.transform(`translate3d(0px, ${u/2+p.shadowOffset}px, ${-u/2}px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`);
                else {
                    const P = Math.abs(y) - Math.floor(Math.abs(y) / 90) * 90,
                        z = 1.5 - (Math.sin(P * 2 * Math.PI / 360) / 2 + Math.cos(P * 2 * Math.PI / 360) / 2),
                        k = p.shadowScale,
                        V = p.shadowScale / z,
                        L = p.shadowOffset;
                    E.transform(`scale3d(${k}, 1, ${V}) translate3d(0px, ${f/2+L}px, ${-f/2/V}px) rotateX(-90deg)`)
                }
            const q = b.isSafari || b.isWebView ? -v / 2 : 0;
            c.transform(`translate3d(0px,0,${q}px) rotateX(${e.isHorizontal()?0:y}deg) rotateY(${e.isHorizontal()?-y:0}deg)`), c[0].style.setProperty("--swiper-cube-translate-z", `${q}px`)
        },
        setTransition: l => {
            const {
                $el: c,
                slides: d
            } = e;
            d.transition(l).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(l), e.params.cubeEffect.shadow && !e.isHorizontal() && c.find(".swiper-cube-shadow").transition(l)
        },
        recreateShadows: () => {
            const l = e.isHorizontal();
            e.slides.each(c => {
                const d = Math.max(Math.min(c.progress, 1), -1);
                r(N(c), d, l)
            })
        },
        getEffectParams: () => e.params.cubeEffect,
        perspective: () => !0,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: !1,
            virtualTranslate: !0
        })
    })
}

function Ki(t, e, i) {
    const n = `swiper-slide-shadow${i?`-${i}`:""}`,
        r = t.transformEl ? e.find(t.transformEl) : e;
    let s = r.children(`.${n}`);
    return s.length || (s = N(`<div class="swiper-slide-shadow${i?`-${i}`:""}"></div>`), r.append(s)), s
}

function V1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n
    } = t;
    i({
        flipEffect: {
            slideShadows: !0,
            limitRotation: !0,
            transformEl: null
        }
    });
    const r = (l, c, d) => {
        let u = e.isHorizontal() ? l.find(".swiper-slide-shadow-left") : l.find(".swiper-slide-shadow-top"),
            f = e.isHorizontal() ? l.find(".swiper-slide-shadow-right") : l.find(".swiper-slide-shadow-bottom");
        u.length === 0 && (u = Ki(d, l, e.isHorizontal() ? "left" : "top")), f.length === 0 && (f = Ki(d, l, e.isHorizontal() ? "right" : "bottom")), u.length && (u[0].style.opacity = Math.max(-c, 0)), f.length && (f[0].style.opacity = Math.max(c, 0))
    };
    sn({
        effect: "flip",
        swiper: e,
        on: n,
        setTranslate: () => {
            const {
                slides: l,
                rtlTranslate: c
            } = e, d = e.params.flipEffect;
            for (let u = 0; u < l.length; u += 1) {
                const f = l.eq(u);
                let h = f[0].progress;
                e.params.flipEffect.limitRotation && (h = Math.max(Math.min(f[0].progress, 1), -1));
                const v = f[0].swiperSlideOffset;
                let p = -180 * h,
                    g = 0,
                    _ = e.params.cssMode ? -v - e.translate : -v,
                    y = 0;
                e.isHorizontal() ? c && (p = -p) : (y = _, _ = 0, g = -p, p = 0), f[0].style.zIndex = -Math.abs(Math.round(h)) + l.length, d.slideShadows && r(f, h, d);
                const E = `translate3d(${_}px, ${y}px, 0px) rotateX(${g}deg) rotateY(${p}deg)`;
                Wn(d, f).transform(E)
            }
        },
        setTransition: l => {
            const {
                transformEl: c
            } = e.params.flipEffect;
            (c ? e.slides.find(c) : e.slides).transition(l).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(l), Yr({
                swiper: e,
                duration: l,
                transformEl: c
            })
        },
        recreateShadows: () => {
            const l = e.params.flipEffect;
            e.slides.each(c => {
                const d = N(c);
                let u = d[0].progress;
                e.params.flipEffect.limitRotation && (u = Math.max(Math.min(c.progress, 1), -1)), r(d, u, l)
            })
        },
        getEffectParams: () => e.params.flipEffect,
        perspective: () => !0,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode
        })
    })
}

function j1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n
    } = t;
    i({
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            scale: 1,
            modifier: 1,
            slideShadows: !0,
            transformEl: null
        }
    }), sn({
        effect: "coverflow",
        swiper: e,
        on: n,
        setTranslate: () => {
            const {
                width: a,
                height: o,
                slides: l,
                slidesSizesGrid: c
            } = e, d = e.params.coverflowEffect, u = e.isHorizontal(), f = e.translate, h = u ? -f + a / 2 : -f + o / 2, v = u ? d.rotate : -d.rotate, b = d.depth;
            for (let p = 0, g = l.length; p < g; p += 1) {
                const _ = l.eq(p),
                    y = c[p],
                    E = _[0].swiperSlideOffset,
                    q = (h - E - y / 2) / y,
                    P = typeof d.modifier == "function" ? d.modifier(q) : q * d.modifier;
                let z = u ? v * P : 0,
                    k = u ? 0 : v * P,
                    V = -b * Math.abs(P),
                    L = d.stretch;
                typeof L == "string" && L.indexOf("%") !== -1 && (L = parseFloat(d.stretch) / 100 * y);
                let M = u ? 0 : L * P,
                    x = u ? L * P : 0,
                    D = 1 - (1 - d.scale) * Math.abs(P);
                Math.abs(x) < .001 && (x = 0), Math.abs(M) < .001 && (M = 0), Math.abs(V) < .001 && (V = 0), Math.abs(z) < .001 && (z = 0), Math.abs(k) < .001 && (k = 0), Math.abs(D) < .001 && (D = 0);
                const F = `translate3d(${x}px,${M}px,${V}px)  rotateX(${k}deg) rotateY(${z}deg) scale(${D})`;
                if (Wn(d, _).transform(F), _[0].style.zIndex = -Math.abs(Math.round(P)) + 1, d.slideShadows) {
                    let te = u ? _.find(".swiper-slide-shadow-left") : _.find(".swiper-slide-shadow-top"),
                        A = u ? _.find(".swiper-slide-shadow-right") : _.find(".swiper-slide-shadow-bottom");
                    te.length === 0 && (te = Ki(d, _, u ? "left" : "top")), A.length === 0 && (A = Ki(d, _, u ? "right" : "bottom")), te.length && (te[0].style.opacity = P > 0 ? P : 0), A.length && (A[0].style.opacity = -P > 0 ? -P : 0)
                }
            }
        },
        setTransition: a => {
            const {
                transformEl: o
            } = e.params.coverflowEffect;
            (o ? e.slides.find(o) : e.slides).transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a)
        },
        perspective: () => !0,
        overwriteParams: () => ({
            watchSlidesProgress: !0
        })
    })
}

function B1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n
    } = t;
    i({
        creativeEffect: {
            transformEl: null,
            limitProgress: 1,
            shadowPerProgress: !1,
            progressMultiplier: 1,
            perspective: !0,
            prev: {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                opacity: 1,
                scale: 1
            },
            next: {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                opacity: 1,
                scale: 1
            }
        }
    });
    const r = o => typeof o == "string" ? o : `${o}px`;
    sn({
        effect: "creative",
        swiper: e,
        on: n,
        setTranslate: () => {
            const {
                slides: o,
                $wrapperEl: l,
                slidesSizesGrid: c
            } = e, d = e.params.creativeEffect, {
                progressMultiplier: u
            } = d, f = e.params.centeredSlides;
            if (f) {
                const h = c[0] / 2 - e.params.slidesOffsetBefore || 0;
                l.transform(`translateX(calc(50% - ${h}px))`)
            }
            for (let h = 0; h < o.length; h += 1) {
                const v = o.eq(h),
                    b = v[0].progress,
                    p = Math.min(Math.max(v[0].progress, -d.limitProgress), d.limitProgress);
                let g = p;
                f || (g = Math.min(Math.max(v[0].originalProgress, -d.limitProgress), d.limitProgress));
                const _ = v[0].swiperSlideOffset,
                    y = [e.params.cssMode ? -_ - e.translate : -_, 0, 0],
                    E = [0, 0, 0];
                let q = !1;
                e.isHorizontal() || (y[1] = y[0], y[0] = 0);
                let P = {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    scale: 1,
                    opacity: 1
                };
                p < 0 ? (P = d.next, q = !0) : p > 0 && (P = d.prev, q = !0), y.forEach((D, F) => {
                    y[F] = `calc(${D}px + (${r(P.translate[F])} * ${Math.abs(p*u)}))`
                }), E.forEach((D, F) => {
                    E[F] = P.rotate[F] * Math.abs(p * u)
                }), v[0].style.zIndex = -Math.abs(Math.round(b)) + o.length;
                const z = y.join(", "),
                    k = `rotateX(${E[0]}deg) rotateY(${E[1]}deg) rotateZ(${E[2]}deg)`,
                    V = g < 0 ? `scale(${1+(1-P.scale)*g*u})` : `scale(${1-(1-P.scale)*g*u})`,
                    L = g < 0 ? 1 + (1 - P.opacity) * g * u : 1 - (1 - P.opacity) * g * u,
                    M = `translate3d(${z}) ${k} ${V}`;
                if (q && P.shadow || !q) {
                    let D = v.children(".swiper-slide-shadow");
                    if (D.length === 0 && P.shadow && (D = Ki(d, v)), D.length) {
                        const F = d.shadowPerProgress ? p * (1 / d.limitProgress) : p;
                        D[0].style.opacity = Math.min(Math.max(Math.abs(F), 0), 1)
                    }
                }
                const x = Wn(d, v);
                x.transform(M).css({
                    opacity: L
                }), P.origin && x.css("transform-origin", P.origin)
            }
        },
        setTransition: o => {
            const {
                transformEl: l
            } = e.params.creativeEffect;
            (l ? e.slides.find(l) : e.slides).transition(o).find(".swiper-slide-shadow").transition(o), Yr({
                swiper: e,
                duration: o,
                transformEl: l,
                allSlides: !0
            })
        },
        perspective: () => e.params.creativeEffect.perspective,
        overwriteParams: () => ({
            watchSlidesProgress: !0,
            virtualTranslate: !e.params.cssMode
        })
    })
}

function Z1(t) {
    let {
        swiper: e,
        extendParams: i,
        on: n
    } = t;
    i({
        cardsEffect: {
            slideShadows: !0,
            transformEl: null,
            rotate: !0
        }
    }), sn({
        effect: "cards",
        swiper: e,
        on: n,
        setTranslate: () => {
            const {
                slides: a,
                activeIndex: o
            } = e, l = e.params.cardsEffect, {
                startTranslate: c,
                isTouched: d
            } = e.touchEventsData, u = e.translate;
            for (let f = 0; f < a.length; f += 1) {
                const h = a.eq(f),
                    v = h[0].progress,
                    b = Math.min(Math.max(v, -4), 4);
                let p = h[0].swiperSlideOffset;
                e.params.centeredSlides && !e.params.cssMode && e.$wrapperEl.transform(`translateX(${e.minTranslate()}px)`), e.params.centeredSlides && e.params.cssMode && (p -= a[0].swiperSlideOffset);
                let g = e.params.cssMode ? -p - e.translate : -p,
                    _ = 0;
                const y = -100 * Math.abs(b);
                let E = 1,
                    q = -2 * b,
                    P = 8 - Math.abs(b) * .75;
                const z = e.virtual && e.params.virtual.enabled ? e.virtual.from + f : f,
                    k = (z === o || z === o - 1) && b > 0 && b < 1 && (d || e.params.cssMode) && u < c,
                    V = (z === o || z === o + 1) && b < 0 && b > -1 && (d || e.params.cssMode) && u > c;
                if (k || V) {
                    const D = (1 - Math.abs((Math.abs(b) - .5) / .5)) ** .5;
                    q += -28 * b * D, E += -.5 * D, P += 96 * D, _ = `${-25*D*Math.abs(b)}%`
                }
                if (b < 0 ? g = `calc(${g}px + (${P*Math.abs(b)}%))` : b > 0 ? g = `calc(${g}px + (-${P*Math.abs(b)}%))` : g = `${g}px`, !e.isHorizontal()) {
                    const D = _;
                    _ = g, g = D
                }
                const L = b < 0 ? `${1+(1-E)*b}` : `${1-(1-E)*b}`,
                    M = `
        translate3d(${g}, ${_}, ${y}px)
        rotateZ(${l.rotate?q:0}deg)
        scale(${L})
      `;
                if (l.slideShadows) {
                    let D = h.find(".swiper-slide-shadow");
                    D.length === 0 && (D = Ki(l, h)), D.length && (D[0].style.opacity = Math.min(Math.max((Math.abs(b) - .5) / .5, 0), 1))
                }
                h[0].style.zIndex = -Math.abs(Math.round(v)) + a.length, Wn(l, h).transform(M)
            }
        },
        setTransition: a => {
            const {
                transformEl: o
            } = e.params.cardsEffect;
            (o ? e.slides.find(o) : e.slides).transition(a).find(".swiper-slide-shadow").transition(a), Yr({
                swiper: e,
                duration: a,
                transformEl: o
            })
        },
        perspective: () => !0,
        overwriteParams: () => ({
            watchSlidesProgress: !0,
            virtualTranslate: !e.params.cssMode
        })
    })
}
const W1 = [v1, y1, b1, w1, _1, E1, x1, C1, S1, T1, M1, $1, A1, P1, O1, k1, L1, N1, F1, q1, V1, j1, B1, Z1];
ut.use(W1);

function U1() {
    return {
        init() {
            new ut(".swiper-box", {
                slidesPerView: 6,
                spaceBetween: 10,
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 10
                    }
                },
                loop: !0,
                autoplay: {
                    delay: 3e3
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            })
        }
    }
}

function G1() {
    return {}
}

function Y1() {
    return {
        isOpen: !1,
        open() {
            this.isOpen = !0
        },
        close() {
            this.isOpen = !1
        }
    }
}

function X1() {
    return {
        isOpen: !1,
        open() {
            this.isOpen = !0
        },
        close() {
            this.isOpen = !1
        }
    }
}

function K1() {
    return {
        isOpen: !1,
        activeTab: "tab-1",
        selectFilter(t) {
            const e = t.target.getAttribute("data-tab");
            this.activeTab = e
        },
        open() {
            this.isOpen = !0
        },
        close() {
            this.isOpen = !1
        }
    }
}

function Q1() {
    return {
        show: !1,
        activeImageUrl: null,
        isOpen() {
            return this.show
        },
        open(t) {
            this.activeImageUrl = t.target.parentNode.href, this.show = !0
        },
        close() {
            this.show = !1, setTimeout(() => this.activeImageUrl = null, 300)
        }
    }
}

function J1() {
    return {
        activeTab: "tab-1",
        toggle(t) {
            const e = t.target.getAttribute("data-tab");
            this.activeTab = e
        }
    }
}

function eg(t) {
    return {
        currentStep: 0,
        currentProgress: 0,
        maxSteps: t,
        nextStep() {
            this.currentStep < this.maxSteps && (this.currentStep = this.currentStep + 1, this.currentProgress = this.currentStep / this.maxSteps * 100, console.log("Progress: ", this.currentProgress))
        },
        prevStep() {
            this.currentStep > 0 && (this.currentStep = this.currentStep - 1, this.currentProgress = this.currentStep / this.maxSteps * 100, console.log("Progress: ", this.currentProgress))
        }
    }
}

function tg(t) {
    var e = t.activeIndex,
        i = t.slides.length;
    if (t.params.loop) switch (t.activeIndex) {
        case 0:
            e = i - 3;
            break;
        case i - 1:
            e = 0;
            break;
        default:
            --e
    }
    return e
}

function ig() {
    return {
        swiper: null,
        currentSlide: null,
        init() {
            this.swiper = new ut(".swiper", {
                loop: !0,
                autoplay: {
                    delay: 5e3
                },
                slidesPerView: 1,
                spaceBetween: 0,
                effect: "fade",
                fadeEffect: {
                    crossFade: !0
                },
                pagination: {
                    el: ".carousel-pagination",
                    type: "bullets"
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    }
                },
                onSlideChangeEnd: function(t) {
                    console.log(tg(t))
                }
            })
        },
        swiperNext() {
            this.swiper !== void 0 && this.swiper.slideNext()
        },
        swiperPrev() {
            this.swiper !== void 0 && this.swiper.slidePrev()
        }
    }
}

function ng() {
    return {
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthShortNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        showDatepicker: !1,
        datepickerValue: "",
        selectedDate: "",
        dateFormat: "DD-MM-YYYY",
        month: "",
        year: "",
        no_of_days: [],
        blankdays: [],
        initDate() {
            let t;
            this.selectedDate ? t = new Date(Date.parse(this.selectedDate)) : t = new Date, this.month = t.getMonth(), this.year = t.getFullYear(), this.datepickerValue = this.formatDateForDisplay(t)
        },
        formatDateForDisplay(t) {
            let e = this.dayNames[t.getDay()],
                i = ("0" + t.getDate()).slice(-2),
                n = this.monthNames[t.getMonth()],
                r = this.monthShortNames[t.getMonth()],
                s = ("0" + (parseInt(t.getMonth()) + 1)).slice(-2),
                a = t.getFullYear();
            return this.dateFormat === "DD-MM-YYYY" ? `${i}-${s}-${a}` : this.dateFormat === "YYYY-MM-DD" ? `${a}-${s}-${i}` : this.dateFormat === "D d M, Y" ? `${e} ${i} ${r} ${a}` : `${e} ${i} ${n} ${a}`
        },
        isSelectedDate(t) {
            const e = new Date(this.year, this.month, t);
            return this.datepickerValue === this.formatDateForDisplay(e)
        },
        isToday(t) {
            const e = new Date,
                i = new Date(this.year, this.month, t);
            return e.toDateString() === i.toDateString()
        },
        getDateValue(t) {
            let e = new Date(this.year, this.month, t);
            this.datepickerValue = this.formatDateForDisplay(e), this.isSelectedDate(t), this.showDatepicker = !1
        },
        getNoOfDays() {
            let t = new Date(this.year, this.month + 1, 0).getDate(),
                e = new Date(this.year, this.month).getDay(),
                i = [];
            for (let r = 1; r <= e; r++) i.push(r);
            let n = [];
            for (let r = 1; r <= t; r++) n.push(r);
            this.blankdays = i, this.no_of_days = n
        }
    }
}
window.layout = d0;
window.navbar = u0;
window.sidebar = f0;
window.search = h0;
window.backtotop = m0;
window.boxCarousel = U1;
window.video = G1;
window.collapse = Y1;
window.gallery = Q1;
window.dropdown = X1;
window.dropFilter = K1;
window.tabs = J1;
window.wizard = eg;
window.swiperHero = ig;
window.calendar = ng;

function rg() {
    return {
        activeBrand: "all",
        resetScroll() {
            return window.scrollTo({
                top: 350,
                behavior: "smooth"
            }), !1
        }
    }
}

function sg() {
    return {
        activeSection: "overview",
        activeTab: "cash",
        activeOption: "standard",
        toggleTabs(t) {
            const e = t.target.getAttribute("data-tab");
            this.activeTab = e
        },
        initScrollAnchors() {
            document.querySelectorAll('.scroll-link[href^="#"]').forEach(t => {
                t.onclick = function(e) {
                    e.preventDefault();
                    let i = this.getAttribute("href"),
                        n = document.querySelector(i),
                        r = 100,
                        a = n.offsetTop - r;
                    window.scrollTo({
                        top: a + 50,
                        behavior: "smooth"
                    })
                }
            })
        }
    }
}
window.inventory = rg;
window.vehicle = sg;

function ag() {
    const t = document.querySelectorAll("[data-background]");
    if (typeof t < "u" && t != null)
        for (var e = 0, i = t.length; e < i; e++) {
            let n = t[e].getAttribute("data-background");
            t[e].style.backgroundSize = "cover", t[e].style.backgroundRepeat = "no-repeat", t[e].style.backgroundImage = `url(${n})`
        }
}
window.Alpine = Dt;
Dt.plugin(Bh);
Dt.plugin(Wh);
Dt.plugin(Gh);
Dt.plugin(a0);
Dt.store("app", {
    init() {
        this.isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    },
    isDark: Dt.$persist(!1),
    activeApp: Dt.$persist("dashboard"),
    isSidebarActive: !1,
    isSidebarMobileActive: !1
});
Dt.start();
document.onreadystatechange = function() {
    document.readyState == "complete" && ag()
};