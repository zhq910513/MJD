!function(e) {
    var t = {};
    function i(r) {
        if (t[r])
            return t[r].exports;
        var a = t[r] = {
            i: r,
            l: !1,
            exports: {
                __esModule: undefined
            }
        };
        return e[r].call(a.exports, a, a.exports, i),
        a.l = !0,
        a.exports
    }
    i.m = e,
    i.c = t,
    i.d = function(e, t, r) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }
    ,
    i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    i.t = function(e, t) {
        if (1 & t && (e = i(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var r = Object.create(null);
        if (i.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var a in e)
                i.d(r, a, function(t) {
                    return e[t]
                }
                .bind(null, a));
        return r
    }
    ,
    i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e["default"]
        }
        : function() {
            return e
        }
        ;
        return i.d(t, "a", t),
        t
    }
    ,
    i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    i.p = "",
    i(i.s = 77)
}([function(e, t, i) {
    "use strict";
    var r = this && this.__createBinding || (Object.create ? function(e, t, i, r) {
        r === undefined && (r = i),
        Object.defineProperty(e, r, {
            enumerable: !0,
            get: function() {
                return t[i]
            }
        })
    }
    : function(e, t, i, r) {
        r === undefined && (r = i),
        e[r] = t[i]
    }
    )
      , a = this && this.__exportStar || function(e, t) {
        for (var i in e)
            "default" === i || Object.prototype.hasOwnProperty.call(t, i) || r(t, e, i)
    }
    ;
    t.__esModule = !0,
    a(i(1), t),
    a(i(4), t),
    a(i(3), t),
    a(i(13), t),
    a(i(14), t),
    a(i(15), t),
    a(i(2), t)
}
, function(e, t, i) {
    "use strict";
    var r = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0,
    t.setVoiceOverFocus = t.bodyAriaHidden = t.addAriaModel = t.isTouchEventSupported = t.get$EventPosition = t.test$TouchEvent = t.supportsPassive = t.isWindow = t.getWindow = t.getOffset = t.isDarkMode = t.shakeEl = t.addOnceAnimationClass = t.animationEndName = t.removeClass = t.addMyClass = t.setCss = t.getCSS = t.supportsCSS = t.createGeneralIframe = void 0;
    var a = i(0)
      , n = r(i(9));
    t.createGeneralIframe = function(e) {
        var t = document.createElement("div");
        (null === e || void 0 === e ? void 0 : e.name) ? t.innerHTML = '<iframe name="' + (null === e || void 0 === e ? void 0 : e.name) + '" />' : t.innerHTML = "<iframe />";
        var i = t.childNodes[0];
        return (null === e || void 0 === e ? void 0 : e.id) && (i.id = e.id),
        (null === e || void 0 === e ? void 0 : e.className) && (i.className = e.className),
        i.setAttribute("frameborder", "0"),
        i.setAttribute("border", "0"),
        i.setAttribute("marginheight", "0"),
        i.setAttribute("marginwidth", "0"),
        i.setAttribute("scrolling", "no"),
        i
    }
    ;
    t.supportsCSS = function(e, t) {
        var i = document.createElement("div");
        return e in i.style && "length" !== e && "parentRule" !== e && (i.style[e] = t,
        i.style[e] === t)
    }
    ;
    t.getCSS = function(e, t) {
        return e.currentStyle ? e.currentStyle[t] : window.getComputedStyle(e, null)[t]
    }
    ;
    t.setCss = function(e, t) {
        if (e && t && a.isObject(t)) {
            for (var i in t)
                try {
                    e.style[i] = t[i]
                } catch (r) {}
            return t
        }
    }
    ;
    t.addMyClass = function(e, t) {
        if (e.classList)
            e.classList.add(t);
        else {
            var i = e.className
              , r = i + ("" !== i ? " " : "") + t;
            e.className = r
        }
    }
    ;
    t.removeClass = function(e, t) {
        if (e.classList)
            return e.classList.remove(t);
        var i = " " + e.className + " "
          , r = (i = i.replace(/(\s+)/gi, " ")).replace(" " + t + " ", " ");
        r = r.replace(/(^\s+)|(\s+$)/g, ""),
        e.className = r
    }
    ,
    t.animationEndName = function() {
        var e, t = document.createElement("fake"), i = {
            animation: "animationend",
            mozAnimation: "mozAnimationEnd",
            webkitAnimation: "webkitAnimationEnd"
        };
        for (e in i)
            if (t.style[e] !== undefined)
                return i[e];
        return !1
    }();
    t.addOnceAnimationClass = function(e) {
        var i = e.el
          , r = e.className
          , o = e.callback
          , s = e.duration;
        s || (s = 400),
        a.isArray(i) || (i = [i]);
        for (var d = 0; d < i.length; d++) {
            var l = i[d];
            t.addMyClass(l, r)
        }
        var c = function() {
            a.isArray(i) || (i = [i]);
            for (var e = 0; e < i.length; e++) {
                var s = i[e];
                t.removeClass(s, r)
            }
            o(),
            t.animationEndName && n["default"].remove(i[0], t.animationEndName, c)
        };
        t.animationEndName ? n["default"].add(i[0], t.animationEndName, c) : setTimeout(c, s)
    }
    ;
    t.shakeEl = function(e, i) {
        t.addOnceAnimationClass({
            el: e,
            className: "shake",
            callback: i
        })
    }
    ;
    function o(e) {
        return s(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }
    function s(e) {
        return null != e && e == e.window
    }
    function d(e) {
        return /^touch/.test(e.type)
    }
    t.isDarkMode = function() {
        var e;
        return null === (e = window.matchMedia) || void 0 === e ? void 0 : e.call(window, "(prefers-color-scheme: dark)").matches
    }
    ,
    t.getOffset = function(e) {
        var t, i, r = {
            top: 0,
            left: 0
        }, a = null === e || void 0 === e ? void 0 : e.ownerDocument;
        if (a) {
            t = a.documentElement,
            "undefined" != typeof e.getBoundingClientRect && (r = e.getBoundingClientRect());
            var n = 0
              , s = 0;
            return (i = o(a)) && (n = (i.pageYOffset || t.scrollTop) - (t.clientTop || 0),
            s = (i.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)),
            {
                top: r.top + n,
                left: r.left + s
            }
        }
    }
    ,
    t.getWindow = o,
    t.isWindow = s,
    t.supportsPassive = function() {
        var e = !1;
        try {
            var t = Object.defineProperty({}, "passive", {
                get: function() {
                    e = !0
                }
            });
            window.addEventListener("testPassive", null, t),
            window.removeEventListener("testPassive", null, t)
        } catch (i) {}
        return e
    }(),
    t.test$TouchEvent = d,
    t.get$EventPosition = function(e) {
        if (d(e)) {
            var t;
            e.originalEvent && (t = e.originalEvent);
            var i = ((null === t || void 0 === t ? void 0 : t.touches) || [])[0];
            return i ? {
                x: i.clientX,
                y: i.clientY
            } : null
        }
        return {
            x: e.pageX,
            y: e.pageY
        }
    }
    ,
    t.isTouchEventSupported = function() {
        return "ontouchstart"in document.createElement("div")
    }
    ,
    t.addAriaModel = function(e) {
        try {
            e.setAttribute("role", "dialog"),
            e.setAttribute("aria-modal", "true"),
            e.setAttribute("aria-label", "\u9a8c\u8bc1\u7801")
        } catch (t) {}
    }
    ,
    t.bodyAriaHidden = {
        hide: function() {
            try {
                document.body.setAttribute("aria-hidden", "true")
            } catch (e) {}
        },
        unhide: function() {
            try {
                document.body.setAttribute("aria-hidden", "false")
            } catch (e) {}
        }
    },
    t.setVoiceOverFocus = function(e) {
        e.setAttribute("tabindex", "0"),
        e.blur();
        var t = 0
          , i = window.setInterval(function() {
            e.focus(),
            (t += 1) >= 10 && window.clearInterval(i)
        }, 10)
    }
}
, function(e, t, i) {
    "use strict";
    var r = this && this.__values || function(e) {
        var t = "function" == typeof Symbol && Symbol.iterator
          , i = t && e[t]
          , r = 0;
        if (i)
            return i.call(e);
        if (e && "number" == typeof e.length)
            return {
                next: function() {
                    return e && r >= e.length && (e = void 0),
                    {
                        value: e && e[r++],
                        done: !e
                    }
                }
            };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }
      , a = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0,
    t.getHostname = t.checkLowAndroidQQ = t.checkWrongCspSrc = t.getCspSrc = t.checkWechatMiniProgram = t.checkCaptchaDomain = t.isSupportRem = t.camelToUnderscoreKeys = t.debounce = t.getPerformance = t.getLogCommonParams = t.getDeviceInfo = t.getTokenID = void 0;
    var n = a(i(16))
      , o = i(4);
    function s() {
        var e = function(e) {
            var t, i = document.cookie, r = encodeURIComponent(e), a = i.indexOf(r), n = null;
            if (a > -1) {
                var o = i.indexOf(";", a);
                -1 === o && (o = i.length),
                n = decodeURIComponent(i.substring(a + r.length + 1, o))
            }
            try {
                window.localStorage && (t = localStorage.getItem(e)),
                window.sessionStorage && (t = t || sessionStorage.getItem(e))
            } catch (s) {}
            return t || n
        }("TDC_itoken");
        return e ? e.split(":")[0] : undefined
    }
    function d() {
        var e = new n["default"](navigator.userAgent);
        return {
            platform: e.getOS().name,
            client: e.getBrowser().name
        }
    }
    t.getTokenID = s,
    t.getDeviceInfo = d,
    t.getLogCommonParams = function() {
        try {
            var e = document.referrer || "unknown"
              , t = location.href || document.URL
              , i = navigator.userAgent;
            e = e.length > 512 ? e.substr(0, 512) : e,
            t = t.length > 1024 ? t.substr(0, 1024) : t;
            var r = d()
              , a = r.client
              , n = r.platform;
            return ["referer=" + encodeURIComponent(e), "href=" + encodeURIComponent(t), "token_id=" + s(), "ua=" + i, "client=" + a, "platform=" + n]
        } catch (o) {
            return t = (t = o.message).length > 1024 ? t.substr(0, 1024) : t,
            ["href=" + encodeURIComponent(t)]
        }
    }
    ;
    t.getPerformance = function(e) {
        var t, i;
        if (window.performance && "function" == typeof window.performance.getEntriesByType) {
            var a = []
              , n = window.performance.getEntriesByType("resource")
              , o = ["xmlhttprequest", "script", "iframe", "img"];
            try {
                for (var s = r(n), d = s.next(); !d.done; d = s.next()) {
                    var l = d.value;
                    if (-1 !== o.indexOf(l.initiatorType) && !/cap_monitor/.test(l.name) && e.test(l.name)) {
                        var c = l.name.split("://")[1].split("?")[0];
                        a.push({
                            name: c,
                            duration: Math.floor(l.duration)
                        })
                    }
                }
            } catch (p) {
                t = {
                    error: p
                }
            } finally {
                try {
                    d && !d.done && (i = s["return"]) && i.call(s)
                } finally {
                    if (t)
                        throw t.error
                }
            }
            return a
        }
        return []
    }
    ;
    t.debounce = function(e, t) {
        var i;
        return function() {
            for (var r = this, a = [], n = 0; n < arguments.length; n++)
                a[n] = arguments[n];
            clearTimeout(i),
            i = setTimeout(function() {
                e.apply(r, a)
            }, t)
        }
    }
    ;
    t.camelToUnderscoreKeys = function(e) {
        var t = {};
        for (var i in e)
            e.hasOwnProperty(i) && (t[i.replace(/([A-Z])/g, "_$1").toLowerCase()] = e[i]);
        return t
    }
    ;
    t.isSupportRem = function() {
        return window.addEventListener && document.querySelector
    }
    ;
    t.checkCaptchaDomain = function(e) {
        var t, i, a = !1;
        try {
            for (var n = r([/localhost:8302/, /captcha\.qq\.com/, /\.captcha\.qcloud\.com/, /captcha\.myqcloud\.com/, /captcha\.253\.com/, /t-captcha\.gjacky\.com/, /captcha\.gtimg\.com/, /captcha\.cloudcachetci\.com/]), o = n.next(); !o.done; o = n.next()) {
                var s = o.value;
                if (e.match(s)) {
                    a = !0;
                    break
                }
            }
        } catch (d) {
            t = {
                error: d
            }
        } finally {
            try {
                o && !o.done && (i = n["return"]) && i.call(n)
            } finally {
                if (t)
                    throw t.error
            }
        }
        return a
    }
    ;
    t.checkWechatMiniProgram = function() {
        return navigator.userAgent.match(/miniprogram/i) || "miniprogram" === window.__wxjs_environment
    }
    ;
    t.getCspSrc = function() {
        var e, t, i = document.querySelectorAll("meta");
        try {
            for (var a = r(i), n = a.next(); !n.done; n = a.next()) {
                var s = n.value;
                if (s.httpEquiv.match(/content-security-policy/i)) {
                    var d = s.content.match(/frame-src.*;/i);
                    if (o.isArray(d))
                        return d[0];
                    if (d = s.content.match(/child-src.*;/i),
                    o.isArray(d))
                        return d[0];
                    if (d = s.content.match(/default-src.*;/i),
                    o.isArray(d))
                        return d[0]
                }
            }
        } catch (l) {
            e = {
                error: l
            }
        } finally {
            try {
                n && !n.done && (t = a["return"]) && t.call(a)
            } finally {
                if (e)
                    throw e.error
            }
        }
        return ""
    }
    ;
    t.checkWrongCspSrc = function(e) {
        return !e.match(/https:\/\/captcha.gtimg.com/i) && !e.match(/\*.gtimg.com/i)
    }
    ;
    t.checkLowAndroidQQ = function() {
        var e = window.navigator.userAgent;
        if (e.match(/android/i)) {
            var t = e.match(/QQ\/(\d+\.\d+\.\d+)/);
            if (t && 2 === t.length) {
                var i = t[1]
                  , r = function(e, t, i) {
                    return e[i] || t[i] ? e[i] === t[i] ? r(e, t, i + 1) : Number(e[i]) - Number(t[i]) : 0
                };
                if (r(i.split("."), "8.9.28".split("."), 0) <= 0)
                    return !0
            }
        }
        return !1
    }
    ,
    t.getHostname = function(e) {
        var t = document.createElement("a");
        return t.href = e,
        t.hostname
    }
}
, function(e, t, i) {
    "use strict";
    t.__esModule = !0,
    t.addUrlParam = t.getQueryParam = t.getQueryMap = t.getQuery = t.cutUrl = t.getEntryUrl = t.getReferrer = t.getHref = void 0;
    t.getHref = function() {
        var e = location.href || document.URL || "";
        return e.length > 256 ? e.substr(0, 255) + "*" : e
    }
    ;
    t.getReferrer = function() {
        var e = document.referrer || "";
        return e.length > 256 ? e.substr(0, 255) + "*" : e
    }
    ;
    t.getEntryUrl = function() {
        var e = t.getHref();
        try {
            if (e.indexOf("xui.ptlogin2.qq.com") > -1) {
                var i = e.match(/s_url=(.*?)&/);
                i && (e = decodeURIComponent(i[1]))
            }
        } catch (r) {}
        return e
    }
    ;
    t.cutUrl = function(e) {
        if (e) {
            var t = e.indexOf("?");
            if (t > 0)
                return e.substring(0, t)
        }
        return e
    }
    ;
    t.getQuery = function(e) {
        var t = e ? 1 : 0;
        try {
            return location.search.substr(t)
        } catch (a) {
            try {
                var i = document.URL
                  , r = i.indexOf("?");
                if (r >= 0)
                    return i.substr(r + t)
            } catch (a) {}
        }
        return ""
    }
    ;
    t.getQueryMap = function() {
        for (var e = {}, i = t.getQuery(!0).split("&"), r = 0; r < i.length; r++) {
            var a = /(.*?)=(.*)/.exec(i[r]);
            a && (e[a[1]] = a[2])
        }
        return e
    }
    ;
    t.getQueryParam = function(e) {
        return t.getQueryMap()[e]
    }
    ;
    var r = function(e, t, i) {
        if (-1 != e.indexOf("?")) {
            var r = new RegExp("(\\?|&" + t + ")=[^&]*");
            e = r.test(e) ? e.replace(r, "$1=" + i) : e + "&" + t + "=" + i
        } else
            e = e + "?" + t + "=" + i;
        return e
    };
    t.addUrlParam = function(e, t) {
        var i;
        for (i in t)
            "undefined" != typeof t[i] && (e = r(e, encodeURIComponent(i), encodeURIComponent("" + t[i])));
        return e
    }
}
, function(e, t, i) {
    "use strict";
    t.__esModule = !0,
    t.isArray = t.isObject = void 0;
    var r = function(e) {
        return function(t) {
            return Object.prototype.toString.call(t) === "[object " + e + "]"
        }
    };
    t.isObject = r("Object"),
    t.isArray = r("Array")
}
, function(e, t) {
    (function(t) {
        e.exports = t
    }
    ).call(this, {})
}
, function(e, t, i) {
    "use strict";
    var r = Object.prototype.hasOwnProperty
      , a = Object.prototype.toString
      , n = Object.defineProperty
      , o = Object.getOwnPropertyDescriptor
      , s = function(e) {
        return "function" == typeof Array.isArray ? Array.isArray(e) : "[object Array]" === a.call(e)
    }
      , d = function(e) {
        if (!e || "[object Object]" !== a.call(e))
            return !1;
        var t, i = r.call(e, "constructor"), n = e.constructor && e.constructor.prototype && r.call(e.constructor.prototype, "isPrototypeOf");
        if (e.constructor && !i && !n)
            return !1;
        for (t in e)
            ;
        return void 0 === t || r.call(e, t)
    }
      , l = function(e, t) {
        n && "__proto__" === t.name ? n(e, t.name, {
            enumerable: !0,
            configurable: !0,
            value: t.newValue,
            writable: !0
        }) : e[t.name] = t.newValue
    }
      , c = function(e, t) {
        if ("__proto__" === t) {
            if (!r.call(e, t))
                return;
            if (o)
                return o(e, t).value
        }
        return e[t]
    };
    e.exports = function p() {
        var e, t, i, r, a, n, o = arguments[0], u = 1, f = arguments.length, h = !1;
        for ("boolean" == typeof o && (h = o,
        o = arguments[1] || {},
        u = 2),
        (null == o || "object" != typeof o && "function" != typeof o) && (o = {}); u < f; ++u)
            if (null != (e = arguments[u]))
                for (t in e)
                    i = c(o, t),
                    o !== (r = c(e, t)) && (h && r && (d(r) || (a = s(r))) ? (a ? (a = !1,
                    n = i && s(i) ? i : []) : n = i && d(i) ? i : {},
                    l(o, {
                        name: t,
                        newValue: p(h, n, r)
                    })) : void 0 !== r && l(o, {
                        name: t,
                        newValue: r
                    }));
        return o
    }
}
, function(e, t, i) {
    "use strict";
    var r = this && this.__assign || function() {
        return (r = Object.assign || function(e) {
            for (var t, i = 1, r = arguments.length; i < r; i++)
                for (var a in t = arguments[i])
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e
        }
        ).apply(this, arguments)
    }
    ;
    t.__esModule = !0,
    t.isIos = t.getIEVersion = t.isLowIE = t.hexToRgb = t.setImageUrl = t.getSpriteEl = t.setSpriteUrl = t.getSpriteStyleStr = t.getSpriteStyle = void 0;
    var a = i(1);
    function n(e, t) {
        var i = e.size_2d
          , r = e.sprite_pos
          , a = e.init_pos
          , n = e.spriteSize
          , o = 0
          , s = 0;
        return a && (s = a[0] * t,
        o = a[1] * t),
        {
            bgPosLeft: -r[0] * t,
            bgPosTop: -r[1] * t,
            bgWidth: n[0] * t,
            bgHeight: n[1] * t,
            width: i[0] * t,
            height: i[1] * t,
            left: s,
            top: o
        }
    }
    function o(e, t) {
        var i = n(e, t);
        return {
            backgroundPosition: i.bgPosLeft + "px " + i.bgPosTop + "px",
            backgroundSize: i.bgWidth + "px " + i.bgHeight + "px",
            width: i.width + "px",
            height: i.height + "px",
            left: i.left + "px",
            top: i.top + "px"
        }
    }
    function s(e) {
        var t = e.data
          , i = e.rate
          , s = e.spriteUrl
          , d = e.zIndex
          , l = e.isPureGet
          , c = void 0 !== l && l
          , p = e.el || document.createElement("div");
        if ($(p).children().remove(),
        !a.supportsCSS("backgroundSize", "10px 10px") || c) {
            var u = document.createElement("img");
            u.src = "" + window.TCaptchaApiDomain + s;
            var f = n(t, i);
            return $(u).on("dragstart", function() {
                return !1
            }),
            a.setCss(p, {
                overflow: "hidden",
                width: f.width + "px",
                height: f.height + "px"
            }),
            c || (a.setCss(p, {
                position: "absolute",
                top: f.top + "px",
                left: f.left + "px"
            }),
            d !== undefined && a.setCss(p, {
                zIndex: "" + d
            })),
            a.setCss(u, {
                position: "absolute",
                width: f.bgWidth + "px",
                height: f.bgHeight + "px",
                top: f.bgPosTop + "px",
                left: f.bgPosLeft + "px"
            }),
            p.appendChild(u),
            p
        }
        return a.setCss(p, r({
            position: "absolute",
            backgroundImage: "url(" + window.TCaptchaApiDomain + s + ")"
        }, o(t, i))),
        d !== undefined && a.setCss(p, {
            zIndex: "" + d
        }),
        p
    }
    t.getSpriteStyle = n,
    t.getSpriteStyleStr = o,
    t.setSpriteUrl = s,
    t.getSpriteEl = s,
    t.setImageUrl = function(e, t, i, r) {
        $(e).children().remove();
        var n = a.supportsCSS("backgroundSize", "10px 10px")
          , o = "" + window.TCaptchaApiDomain + i;
        if (-1 !== i.indexOf("http") && (o = i),
        !n) {
            var s = document.createElement("img");
            return s.src = o,
            $(s).on("dragstart", function() {
                return !1
            }),
            a.setCss(e, {
                position: "absolute",
                zIndex: "1",
                overflow: "hidden",
                width: t[0] * r + "px",
                height: t[1] * r + "px",
                top: "0px",
                left: "0px"
            }),
            a.setCss(s, {
                position: "absolute",
                width: "100%",
                height: "auto",
                top: "0px",
                left: "0px"
            }),
            void e.appendChild(s)
        }
        a.setCss(e, {
            width: t[0] * r + "px",
            height: t[1] * r + "px",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundImage: "url(" + o + ")",
            backgroundSize: "100% auto",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            zIndex: "1"
        })
    }
    ,
    t.hexToRgb = function(e) {
        return parseInt("0x" + e.slice(1, 3), 16) + " " + parseInt("0x" + e.slice(3, 5), 16) + " " + parseInt("0x" + e.slice(5, 7), 16)
    }
    ;
    t.isLowIE = function() {
        var e, t, i = navigator.userAgent.toLowerCase();
        if (i.indexOf("msie") > -1) {
            if (e = parseInt(i.match(/msie ([\d.]+)/)[1], 10),
            t = document.documentMode,
            e && e <= 8)
                return !0;
            if (t && t < 9)
                return !0
        }
        return !1
    }
    ;
    t.getIEVersion = function() {
        var e = navigator.userAgent
          , t = e.indexOf("compatible") > -1 && e.indexOf("MSIE") > -1
          , i = e.indexOf("Trident") > -1 && e.indexOf("rv:11.0") > -1;
        if (t) {
            new RegExp("MSIE (\\d+\\.\\d+);").test(e);
            var r = parseFloat(RegExp.$1);
            return 7 === r ? 7 : 8 === r ? 8 : 9 === r ? 9 : 10 === r ? 10 : 6
        }
        return i ? 11 : -1
    }
    ;
    t.isIos = function() {
        return !!/iphone|ipad|ipod/gi.test(navigator.userAgent)
    }
}
, function(e, t, i) {
    "use strict";
    t.__esModule = !0,
    t.isIframeSupportCdnDomain = t.getScriptUrl = t.getScript = void 0;
    var r = i(7)
      , a = i(2);
    t.getScript = function n(e, t) {
        var i = 3
          , r = e.src
          , a = e.successCheck
          , o = e.success
          , s = e.error
          , d = e.crossOrigin
          , l = e.timeout
          , c = void 0 === l ? 15e3 : l
          , p = Boolean(e.inHead) ? document.getElementsByTagName("head").item(0) : document.getElementsByTagName("body").item(0)
          , u = !1
          , f = document.createElement("script");
        function h(e) {
            if (!u) {
                var t = !1;
                e && "type"in e && (t = "load" === e.type),
                "readyState"in this && /^(loaded|complete)$/.test(this.readyState) && (t = !0),
                t && (!a || a() ? (g(),
                u = !0,
                null === o || void 0 === o || o()) : m())
            }
        }
        function m(e) {
            void 0 === e && (e = !1),
            u || (g(),
            u = !0,
            (t = t || 1) >= i ? null === s || void 0 === s || s(e) : n({
                src: r,
                successCheck: a,
                success: o,
                error: s
            }, t + 1))
        }
        function g() {
            try {
                p && f && p.removeChild(f)
            } catch (s) {}
        }
        f.type = "text/javascript",
        f.async = !0,
        f.src = r,
        d && f.setAttribute("crossorigin", d),
        "onload"in f ? f.onload = h : f.onreadystatechange = h,
        f.onerror = function() {
            m(!1)
        }
        ,
        null === p || void 0 === p || p.appendChild(f),
        setTimeout(function() {
            m(!0)
        }, c)
    }
    ,
    t.getScriptUrl = function() {
        try {
            throw new Error("check own domain")
        } catch (i) {
            var e = null === i || void 0 === i ? void 0 : i.stack;
            if (!e)
                return;
            var t = ("" + e).match(/(https?:\/\/.*\.js)/);
            return {
                url: null === t || void 0 === t ? void 0 : t[1],
                stack: e
            }
        }
    }
    ;
    t.isIframeSupportCdnDomain = function() {
        var e = r.getIEVersion();
        if (-1 !== e && e <= 9)
            return !1;
        if (a.checkWechatMiniProgram())
            return !1;
        var t = a.getCspSrc();
        return !(t && a.checkWrongCspSrc(t) || a.checkLowAndroidQQ())
    }
}
, function(e, t, i) {
    "use strict";
    t.__esModule = !0;
    t["default"] = {
        add: function(e, t, i) {
            e && (e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent ? e.attachEvent("on" + t, i) : e["on" + t] = i)
        },
        remove: function(e, t, i) {
            e && (e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent ? e.detachEvent("on" + t, i) : e["on" + t] = null)
        }
    }
}
, function(e, t, i) {
    "use strict";
    function r(e, i, r) {
        return "terror_" + t.ErrorCode[e] + "_" + i + "_" + Math.floor((new Date).getTime() / 1e3) + (r ? "_" + r : "")
    }
    function a() {
        return "@" + Math.random().toString(36).substr(2)
    }
    t.__esModule = !0,
    t.getRandStr = t.getErrorRes = t.getErrorTicket = t.ErrorCode = void 0,
    t.ErrorCode = {
        ENTRYJS_LOAD_ERROR: 1001,
        CAPTCHA_SHOW_TIMEOUT: 1002,
        FRAMEJS_LOAD_ERROR: 1004,
        FRAMEJS_RUN_ERROR: 1005,
        GET_CAPTCHA_CONFIG_REQUEST_ERROR: 1006,
        PRE_TEMPLATE_LOAD_TIMEOUT: 1007,
        IFRAME_LOAD_TIMEOUT: 1008,
        LIB_JQ_LOAD_ERROR: 1009,
        CAPTCHA_JS_LOAD_ERROR: 1010,
        CAPTCHA_JS_RUN_ERROR: 1011,
        REFRESH_ERROR: 1012,
        VERIFY_ERROR: 1013,
        RATE_LIMIT: 1014
    },
    t.getErrorTicket = r,
    t.getErrorRes = function(e, i, n) {
        return {
            ret: 0,
            randstr: a(),
            ticket: r(e, i || "", n),
            errorCode: t.ErrorCode[e],
            errorMessage: e.toLowerCase()
        }
    }
    ,
    t.getRandStr = a
}
, function(e, t, i) {
    "use strict";
    t.__esModule = !0,
    t.all = t.keys = void 0;
    t.keys = ["frame-verification", "frame-back", "frame-simple", "frame-standard", "frame-ok", "aria-verification-simple", "aria-verification-standard", "aria-close", "aria-standard", "aria-simple", "aria-feedback", "aria-refresh", "note-img-load-failed", "note-verify-success", "note-verify-timeout", "note-verify-failed", "note-verify-error", "note-verify-failed-max", "note-verify-default", "note-appid-region-wrong"];
    var r = {
        "zh-cn": ["\u5b89\u5168\u9a8c\u8bc1", "\u8fd4\u56de", "\u6211\u4e0d\u4f1a", "\u5e38\u89c4\u9a8c\u8bc1", "\u786e\u5b9a", "\u65e0\u969c\u788d\u9a8c\u8bc1", "\u5e38\u89c4\u9a8c\u8bc1", "\u5173\u95ed\u9a8c\u8bc1", "\u5207\u6362\u4e3a\u5e38\u89c4\u9a8c\u8bc1\u65b9\u5f0f", "\u6211\u4e0d\u4f1a\uff0c\u6362\u4e00\u79cd\u9a8c\u8bc1\u65b9\u5f0f", "\u95ee\u9898\u53cd\u9988", "\u5237\u65b0\u9a8c\u8bc1", "\u56fe\u7247\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u70b9\u51fb\u5237\u65b0", "\u9a8c\u8bc1\u6210\u529f\uff01", "\u7f51\u7edc\u8d85\u65f6\uff0c\u8bf7\u91cd\u8bd5", "\u9a8c\u8bc1\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5", "\u60a8\u7684\u64cd\u4f5c\u8fc7\u4e8e\u9891\u7e41\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", "\u8fd9\u9898\u6709\u70b9\u96be\u5462\uff0c\u5df2\u4e3a\u60a8\u66f4\u6362\u9898\u76ee", "\u7f51\u7edc\u604d\u60da\u4e86\u4e00\u4e0b(+)\uff0c\u518d\u8bd5\u4e00\u6b21\u5427", "appid\u6240\u5c5e\u5730\u57df\u4e0e\u5b9e\u9645\u4f7f\u7528\u5730\u57df\u4e0d\u7b26\uff0c\u8bf7\u8054\u7cfb\u9a8c\u8bc1\u7801\u56e2\u961f\u5904\u7406"],
        "zh-hk": ["\u5b89\u5168\u9a57\u8b49", "\u8fd4\u56de", "\u7121\u969c\u7919\u65b9\u5f0f", "\u5e38\u898f\u9a57\u8b49", "\u78ba\u5b9a", "\u7121\u969c\u7919\u9a57\u8b49", "\u5e38\u898f\u9a57\u8b49", "\u95dc\u9589\u9a57\u8b49", "\u5207\u63db\u70ba\u5e38\u898f\u9a57\u8b49\u65b9\u5f0f", "\u6211\u4e0d\u6703\uff0c\u63db\u4e00\u7a2e\u9a57\u8b49\u65b9\u5f0f", "\u610f\u898b\u53cd\u6620", "\u5237\u65b0\u9a57\u8b49", "\u7121\u6cd5\u52a0\u8f09\u5716\u7247\uff0c\u8acb\u9ede\u64ca\u5237\u65b0", "\u9a57\u8b49\u6210\u529f\uff01", "\u7db2\u7d61\u903e\u6642\uff0c\u8acb\u91cd\u8a66", "\u9a57\u8b49\u932f\u8aa4\uff0c\u8acb\u91cd\u8a66", "\u60a8\u7684\u64cd\u4f5c\u904e\u65bc\u983b\u7e41\uff0c\u8acb\u7a0d\u5f8c\u518d\u8a66", "\u9019\u984c\u6709\u9ede\u96e3\uff0c\u5df2\u70ba\u4f60\u66f4\u63db\u984c\u76ee", "\u7db2\u7d61\u505c\u9813\u4e86\u4e00\u4e0b(+)\uff0c\u518d\u8a66\u4e00\u6b21\u5427", "appid\u6240\u5c6c\u5730\u57df\u8207\u5be6\u969b\u4f7f\u7528\u5730\u57df\u4e0d\u7b26\uff0c\u8acb\u806f\u7cfb\u9a57\u8b49\u78bc\u5718\u968a\u8655\u7406"],
        "zh-tw": ["\u5b89\u5168\u9a57\u8b49", "\u8fd4\u56de", "\u7121\u969c\u7919\u65b9\u5f0f", "\u5e38\u898f\u9a57\u8b49", "\u78ba\u5b9a", "\u7121\u969c\u7919\u9a57\u8b49", "\u5e38\u898f\u9a57\u8b49", "\u95dc\u9589\u9a57\u8b49", "\u5207\u63db\u70ba\u5e38\u898f\u9a57\u8b49\u65b9\u5f0f", "\u6211\u4e0d\u6703\uff0c\u63db\u4e00\u7a2e\u9a57\u8b49\u65b9\u5f0f", "\u53cd\u6620\u610f\u898b", "\u5237\u65b0\u9a57\u8b49", "\u5716\u7247\u8f09\u5165\u5931\u6557\uff0c\u8acb\u9ede\u64ca\u91cd\u65b0\u6574\u7406", "\u9a57\u8b49\u6210\u529f\uff01", "\u7db2\u7d61\u903e\u6642\uff0c\u8acb\u91cd\u8a66", "\u9a57\u8b49\u932f\u8aa4\uff0c\u8acb\u91cd\u8a66", "\u60a8\u7684\u64cd\u4f5c\u904e\u65bc\u983b\u7e41\uff0c\u8acb\u7a0d\u5f8c\u518d\u8a66", "\u9019\u984c\u6709\u9ede\u96e3\uff0c\u5df2\u70ba\u4f60\u66f4\u63db\u984c\u76ee", "\u7db2\u8def\u4e2d\u65b7\u4e86\u4e00\u4e0b(+)\uff0c\u518d\u8a66\u4e00\u6b21\u5427", "appid\u6240\u5c6c\u5730\u57df\u8207\u5be6\u969b\u4f7f\u7528\u5730\u57df\u4e0d\u7b26\uff0c\u8acb\u806f\u7cfb\u9a57\u8b49\u78bc\u5718\u968a\u8655\u7406"],
        en: ["Verification", "Back", "Simple mode", "Standard mode", "OK", "Simple mode", "Standard mode", "Quit verification", "Switch to Standard mode", "Too difficult? Switch to Simple mode", "Feedback", "Try a new captcha", "Image loading failed. Click to refresh", "Verification passed", "Network timed out. Please try again.", "Verification failed. Try again.", "Operation too often. Please retry later.", "Too hard? Try a new one", "Network error (+). Please try again.", "The AppID does not match the actual location. Please contact the Captcha team."],
        ja: ["\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u8a8d\u8a3c", "\u623b\u308b", "\u30b7\u30f3\u30d7\u30eb\u30e2\u30fc\u30c9", "\u4e00\u822c\u30e2\u30fc\u30c9", "OK", "\u30b7\u30f3\u30d7\u30eb\u30e2\u30fc\u30c9", "\u4e00\u822c\u30e2\u30fc\u30c9", "\u9589\u3058\u308b", "\u4e00\u822c\u30e2\u30fc\u30c9\u3078\u5207\u308a\u66ff\u3048\u308b", "\u30b7\u30f3\u30d7\u30eb\u30e2\u30fc\u30c9\u306b\u5207\u308a\u66ff\u3048\u307e\u3059", "\u30d5\u30a3\u30fc\u30c9\u30d0\u30c3\u30af", "\u518d\u8aad\u307f\u8fbc\u307f", "\u753b\u50cf\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u30af\u30ea\u30c3\u30af\u3057\u3066\u66f4\u65b0\u3057\u3066\u304f\u3060\u3055\u3044", "\u8a8d\u8a3c\u306b\u6210\u529f\u3057\u307e\u3057\u305f", "\u30a4\u30f3\u30bf\u30fc\u30cd\u30c3\u30c8\u63a5\u7d9a\u304c\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8\u3057\u307e\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044", "\u8a8d\u8a3c\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044", "\u64cd\u4f5c\u304c\u983b\u5ea6\u306b\u884c\u308f\u308c\u3066\u3044\u307e\u3059\u306e\u3067\u3001\u5f8c\u3067\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044", "\u3053\u306e\u30af\u30a4\u30ba\u306f\u96e3\u3057\u3044\u306e\u3067\u3001\u5225\u306e\u30af\u30a4\u30ba\u306b\u30c1\u30e3\u30ec\u30f3\u30b8\u3057\u307e\u3057\u3087\u3046", "\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u306b\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f(+)\u3002\u3082\u3046\u4e00\u5ea6\u3084\u308a\u76f4\u3057\u3066\u304f\u3060\u3055\u3044", "appid\u306e\u6240\u5c5e\u30ea\u30fc\u30b8\u30e7\u30f3\u306f\u5b9f\u969b\u306e\u5229\u7528\u30ea\u30fc\u30b8\u30e7\u30f3\u3068\u4e00\u81f4\u3057\u307e\u305b\u3093\u3002Captcha\u30c1\u30fc\u30e0\u306b\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044"],
        ko: ["\ubcf4\uc548 \uc778\uc99d", "\ub3cc\uc544\uac00\uae30", "\ub108\ubb34 \uc5b4\ub835\uc2b5\ub2c8\ub2e4.", "\uc77c\ubc18 \uc778\uc99d", "\ud655\uc778", "\ub108\ubb34 \uc5b4\ub835\uc2b5\ub2c8\ub2e4.", "\uc77c\ubc18 \uc778\uc99d", "\uc778\uc99d \ub05d\ub0b4\uae30", "\uc77c\ubc18 \uc778\uc99d \ubc29\uc2dd\uc73c\ub85c \uc804\ud658\ud558\uae30", "\uc77c\ubc18 \uc778\uc99d \ubc29\uc2dd\uc73c\ub85c \uc804\ud658\ud558\uae30", "\ud53c\ub4dc\ubc31", "\uc774\ubbf8\uc9c0 \uc0c8\ub85c\uace0\uce68", "\uc774\ubbf8\uc9c0 \ub85c\ub529\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4. \uc0c8\ub85c\uace0\uce68\ud558\uc138\uc694.", "\uc778\uc99d \uc131\uacf5", "\ub124\ud2b8\uc6cc\ud06c \uc2dc\uac04\uc774 \ucd08\uacfc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc138\uc694.", "\uc778\uc99d \uc624\ub958\uc785\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc138\uc694.", "\uc2dc\ub3c4 \ud69f\uc218\uac00 \ub108\ubb34 \ub9ce\uc2b5\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc138\uc694.", "\uc880 \ub354 \uc26c\uc6b4 \ubb38\uc81c\ub85c \uc2dc\ub3c4\ud574\ubcf4\uc138\uc694.", "\ub124\ud2b8\uc6cc\ud06c \uc624\ub958\uc785\ub2c8\ub2e4(+). \ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc138\uc694.", "AppID \ub9ac\uc804\uacfc \uc2e4\uc81c \uc704\uce58\uc640 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. Captcha\ud300\uc5d0 \ubb38\uc758\ud558\uc138\uc694."],
        pt: ["Verifica\xe7\xe3o", "Voltar", "Modo simples", "Modo padr\xe3o", "OK", "Modo simples", "Modo padr\xe3o", "Sair da verifica\xe7\xe3o", "Mudar para o modo padr\xe3o", "Muito dif\xedcil? Mude para o modo simples", "Feedback", "Tentar outro captcha", "Falha no carregamento da imagem. Clique para atualizar", "Verifica\xe7\xe3o conclu\xedda", "A rede expirou. Tente novamente.", "Falha na verifica\xe7\xe3o. Tente novamente.", "Opera\xe7\xe3o realizada com muita frequ\xeancia. Tente novamente mais tarde.", "Muito dif\xedcil? Tente outro", "Erro de rede (+). Tente novamente.", "O AppID n\xe3o corresponde ao local real. Entre em contato com a equipe do Captcha."],
        id: ["Verifikasi", "Kembali", "Mode sederhana", "Mode standar", "Oke", "Mode sederhana", "Mode standar", "Keluar verifikasi", "Beralih ke mode Standar", "Terlalu sulit? Beralih ke mode Sederhana", "Masukan", "Coba captcha baru", "Gambar gagal dimuat. Klik untuk merefresh", "Verifikasi berhasil", "Jaringan kehabisan waktu. Coba lagi.", "Verifikasi gagal. Coba lagi.", "Operasi terlalu sering. Coba lagi nanti.", "Terlalu sulit? Coba yang baru", "Kesalahan jaringan (+). Coba lagi.", "AppID tidak cocok dengan lokasi aktual. Harap hubungi tim Captcha."],
        ar: ["\u0627\u0644\u062a\u062d\u0642\u0642", "\u0631\u062c\u0648\u0639", "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0628\u0633\u064a\u0637", "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0642\u064a\u0627\u0633\u064a", "\u062d\u0633\u0646\u064b\u0627", "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0628\u0633\u064a\u0637", "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0642\u064a\u0627\u0633\u064a", "\u0645\u063a\u0627\u062f\u0631\u0629 \u0627\u0644\u062a\u062d\u0642\u0642", "\u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0625\u0644\u0649 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0642\u064a\u0627\u0633\u064a", "\u0635\u0639\u0628\u0629 \u0644\u0644\u063a\u0627\u064a\u0629\u061f \u0642\u0645 \u0628\u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0625\u0644\u0649 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0628\u0633\u064a\u0637", "\u0627\u0644\u062a\u0639\u0644\u064a\u0642\u0627\u062a", "\u062c\u0631\u0651\u0628 captcha \u062c\u062f\u064a\u062f\u0629", "\u0641\u0634\u0644 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0635\u0648\u0631\u0629. \u0627\u0646\u0642\u0631 \u0644\u0644\u062a\u062d\u062f\u064a\u062b", "\u0646\u062c\u062d \u0627\u0644\u062a\u062d\u0642\u0642", "\u0627\u0646\u062a\u0647\u062a \u0645\u0647\u0644\u0629 \u0627\u0644\u0634\u0628\u0643\u0629. \u0623\u0639\u062f \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "\u0641\u0634\u0644 \u0627\u0644\u062a\u062d\u0642\u0642. \u0623\u0639\u062f \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "\u0645\u0631\u0627\u062a \u0627\u0644\u062a\u0634\u063a\u064a\u0644 \u0643\u062b\u064a\u0631\u0629 \u062c\u062f\u064b\u0627. \u062d\u0627\u0648\u0644 \u0644\u0627\u062d\u0642\u064b\u0627.", "\u0635\u0639\u0628\u0629 \u0644\u0644\u063a\u0627\u064a\u0629\u061f \u062c\u0631\u0628 \u0648\u0627\u062d\u062f\u0629 \u0623\u062e\u0631\u0649", "\u062e\u0637\u0623 \u0641\u064a \u0627\u0644\u0634\u0628\u0643\u0629 (+). \u0623\u0639\u062f \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", "\u0644\u0627 \u064a\u062a\u0637\u0627\u0628\u0642 \u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u062a\u0637\u0628\u064a\u0642 \u0645\u0639 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0639\u0644\u064a. \u064a\u064f\u0631\u062c\u0649 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064a\u0642 Captcha."],
        my: ["\u1021\u1010\u100a\u103a\u1015\u103c\u102f\u1001\u103c\u1004\u103a\u1038", "\u1014\u1031\u102c\u1000\u103a\u2026", "\u101b\u102d\u102f\u1038\u101b\u103e\u1004\u103a\u1038\u1019\u102f\u1012\u103a", "\u1015\u102f\u1036\u1019\u103e\u1014\u103a\u1019\u102f\u1012\u103a", "\u1021\u102d\u102f\u1000\u1031", "\u101b\u102d\u102f\u1038\u101b\u103e\u1004\u103a\u1038\u1019\u102f\u1012\u103a", "\u1015\u102f\u1036\u1019\u103e\u1014\u103a\u1019\u102f\u1012\u103a", "\u1021\u1010\u100a\u103a\u1015\u103c\u102f\u1001\u103c\u1004\u103a\u1038\u1019\u103e\u1011\u103d\u1000\u103a\u1015\u102b", "\u1015\u102f\u1036\u1019\u103e\u1014\u103a\u1019\u102f\u1012\u103a\u101e\u102d\u102f\u1037 \u1015\u103c\u1031\u102c\u1004\u103a\u1038\u1015\u102b", "\u1001\u1000\u103a\u1001\u1032\u101c\u103d\u1014\u103a\u1038\u101e\u101c\u102c\u1038\u104b \u101b\u102d\u102f\u1038\u101b\u103e\u1004\u103a\u1038\u1019\u102f\u1012\u103a\u101e\u102d\u102f\u1037 \u1015\u103c\u1031\u102c\u1004\u103a\u1038\u1015\u102b\u104b", "\u1010\u102f\u1036\u1037\u1015\u103c\u1014\u103a\u1019\u103e\u102f", "\u1000\u1000\u103a\u1015\u103a\u1001\u103b\u102c\u1021\u101e\u1005\u103a\u1016\u103c\u1004\u1037\u103a \u1000\u103c\u102d\u102f\u1038\u1005\u102c\u1038\u1015\u102b", "\u1015\u102f\u1036\u1019\u1010\u1004\u103a\u1014\u102d\u102f\u1004\u103a\u1015\u102b\u104b \u101b\u102e\u1016\u101b\u1000\u103a\u101b\u103e\u103a\u101c\u102f\u1015\u103a\u101b\u1014\u103a\u1014\u103e\u102d\u1015\u103a", "\u1021\u1010\u100a\u103a\u1015\u103c\u102f\u1001\u103c\u1004\u103a\u1038\u1021\u1031\u102c\u1004\u103a", "\u1000\u103d\u1014\u103a\u101b\u1000\u103a\u1021\u1001\u103b\u102d\u1014\u103a\u101c\u103d\u1014\u103a\u1015\u103c\u102e\u104b \u1011\u1015\u103a\u101c\u102f\u1015\u103a\u1015\u102b\u104b", "\u1021\u1010\u100a\u103a\u1019\u1015\u103c\u102f\u1014\u102d\u102f\u1004\u103a\u1015\u102b\u104b \u1011\u1015\u103a\u1000\u103c\u102d\u102f\u1038\u1005\u102c\u1038\u1015\u102b\u104b", "\u101c\u102f\u1015\u103a\u1006\u1031\u102c\u1004\u103a\u1001\u103b\u1000\u103a\u1019\u103b\u102c\u1038\u101c\u103d\u1014\u103a\u1038\u101e\u100a\u103a\u104b \u1014\u1031\u102c\u1000\u103a\u1019\u103e\u101c\u102f\u1015\u103a\u1015\u102b\u104b", "\u1001\u1000\u103a\u1001\u1032\u101c\u103d\u1014\u103a\u1038\u101e\u101c\u102c\u1038\u104b \u1021\u101e\u1005\u103a\u1015\u103c\u1031\u102c\u1004\u103a\u1038\u1015\u102b", "\u1000\u103d\u1014\u103a\u101b\u1000\u103a\u1015\u103c\u103f\u1014\u102c (+)\u104b \u1011\u1015\u103a\u1000\u103c\u102d\u102f\u1038\u1005\u102c\u1038\u1015\u102b\u104b", "AppID \u101e\u100a\u103a \u1021\u1019\u103e\u1014\u103a\u1010\u1000\u101a\u103a\u101b\u103e\u102d\u101e\u1031\u102c\u1014\u1031\u101b\u102c\u1014\u103e\u1004\u1037\u103a \u1019\u1000\u102d\u102f\u1000\u103a\u100a\u102e\u1015\u102b\u104b \u1000\u1000\u103a\u1015\u103a\u1001\u103b\u102c \u1021\u1016\u103d\u1032\u1037\u1000\u102d\u102f \u1006\u1000\u103a\u101e\u103d\u101a\u103a\u1015\u102b\u104b"],
        fr: ["V\xe9rification", "Retour", "Mode simple", "Mode standard", "OK", "Mode simple", "Mode standard", "Arr\xeater la v\xe9rification", "Passez en mode standard", "Trop difficile\xa0? Passez en mode simple", "Commentaires", "Essayez un nouveau captcha", "Image non charg\xe9e. Actualisez", "V\xe9rification faite", "R\xe9seau interrompu. R\xe9essayez.", "V\xe9rification \xe9chou\xe9e. R\xe9essayez", "Op\xe9ration trop fr\xe9quente. R\xe9essayez apr\xe8s.", "Trop dur\xa0? Essayez-en un autre", "Erreur r\xe9seau (+). R\xe9essayez.", "L'AppID ne correspond pas \xe0 l'emplacement r\xe9el. Contactez l'\xe9quipe Captcha."],
        de: ["\xdcberpr\xfcfung", "Zur\xfcck", "Leichtmodus", "Standardmodus", "OK", "Leichtmodus", "Standardmodus", "\xdcberpr\xfcfung beenden", "In Standardmodus wechseln", "Zu schwer? In Leichtmodus wechseln", "R\xfcckmeldung", "Versuchen Sie ein neues Captcha", "Bild n. geladen. F\xfcr Aktual. klicken", "\xdcberpr\xfcfung okay", "Netzw-Timeout. Erneut versuchen.", "\xdcberpr\xfcf. n. OK. Neu versuchen.", "Vorgang zu oft. Sp\xe4ter erneut versuchen.", "Zu schwer? Neuer Versuch", "Netzwerkfehler (+). Neu versuchen.", "AppID passt nicht zum aktuellen Standort. Wenden Sie sich an das Captcha-Team."],
        he: ["\u05d0\u05d9\u05de\u05d5\u05ea", "\u05d7\u05d6\u05e8\u05d4", "\u05de\u05e6\u05d1 \u05e4\u05e9\u05d5\u05d8", "\u05de\u05e6\u05d1 \u05e8\u05d2\u05d9\u05dc", "\u05d0\u05d9\u05e9\u05d5\u05e8", "\u05de\u05e6\u05d1 \u05e4\u05e9\u05d5\u05d8", "\u05de\u05e6\u05d1 \u05e8\u05d2\u05d9\u05dc", "\u05d9\u05e6\u05d9\u05d0\u05d4 \u05de\u05d0\u05d9\u05de\u05d5\u05ea", "\u05de\u05e2\u05d1\u05e8 \u05dc\u05de\u05e6\u05d1 \u05e8\u05d2\u05d9\u05dc", "\u05e7\u05e9\u05d4 \u05de\u05d3\u05d9? \u05e0\u05d9\u05ea\u05df \u05dc\u05e2\u05d1\u05d5\u05e8 \u05dc\u05de\u05e6\u05d1 \u05e4\u05e9\u05d5\u05d8", "\u05de\u05e9\u05d5\u05d1", "\u05d9\u05e9 \u05dc\u05e0\u05e1\u05d5\u05ea \u05d0\u05d9\u05de\u05d5\u05ea \u05d0\u05e0\u05d5\u05e9 \u05d7\u05d3\u05e9", "\u05e0\u05db\u05e9\u05dc\u05d4 \u05d8\u05e2\u05d9\u05e0\u05ea \u05d4\u05ea\u05de\u05d5\u05e0\u05d4. \u05d9\u05e9 \u05dc\u05dc\u05d7\u05d5\u05e5 \u05db\u05d3\u05d9 \u05dc\u05e8\u05e2\u05e0\u05df", "\u05d4\u05d0\u05d9\u05de\u05d5\u05ea \u05d4\u05e6\u05dc\u05d9\u05d7", "\u05e4\u05d2 \u05d6\u05de\u05df \u05d4\u05e8\u05e9\u05ea \u05d4\u05e7\u05e6\u05d5\u05d1. \u05e0\u05d0 \u05dc\u05e0\u05e1\u05d5\u05ea \u05e9\u05d5\u05d1.", "\u05d4\u05d0\u05d9\u05de\u05d5\u05ea \u05e0\u05db\u05e9\u05dc. \u05d9\u05e9 \u05dc\u05e0\u05e1\u05d5\u05ea \u05e9\u05d5\u05d1.", "\u05d4\u05e4\u05e2\u05dc\u05d4 \u05ea\u05d3\u05d9\u05e8\u05d4 \u05de\u05d3\u05d9. \u05e0\u05d0 \u05dc\u05e0\u05e1\u05d5\u05ea \u05e9\u05d5\u05d1 \u05de\u05d0\u05d5\u05d7\u05e8 \u05d9\u05d5\u05ea\u05e8.", "\u05e7\u05e9\u05d4 \u05de\u05d3\u05d9? \u05e0\u05d9\u05ea\u05df \u05dc\u05e0\u05e1\u05d5\u05ea \u05d7\u05d3\u05e9", "\u05e9\u05d2\u05d9\u05d0\u05ea \u05e8\u05e9\u05ea (+). \u05e0\u05d0 \u05dc\u05e0\u05e1\u05d5\u05ea \u05e9\u05d5\u05d1.", "\u05d4\u05de\u05d6\u05d4\u05d4 AppID \u05dc\u05d0 \u05de\u05ea\u05d0\u05d9\u05dd \u05dc\u05de\u05d9\u05e7\u05d5\u05dd \u05d4\u05de\u05de\u05e9\u05d9. \u05e0\u05d0 \u05dc\u05e4\u05e0\u05d5\u05ea \u05dc\u05e6\u05d5\u05d5\u05ea \u05d0\u05d9\u05de\u05d5\u05ea \u05d0\u05e0\u05d5\u05e9."],
        hi: ["\u0938\u0924\u094d\u092f\u093e\u092a\u0928", "\u092a\u0940\u091b\u0947", "\u0906\u0938\u093e\u0928 \u092e\u094b\u0921", "\u092e\u093e\u0928\u0915 \u092e\u094b\u0921", "\u0920\u0940\u0915", "\u0906\u0938\u093e\u0928 \u092e\u094b\u0921", "\u092e\u093e\u0928\u0915 \u092e\u094b\u0921", "\u0938\u0924\u094d\u092f\u093e\u092a\u0928 \u091b\u094b\u0921\u093c \u0926\u0947\u0902", "\u092e\u093e\u0928\u0915 \u092e\u094b\u0921 \u0915\u0947 \u0932\u093f\u090f \u0938\u094d\u0935\u093f\u091a \u0915\u0930\u0947\u0902", "\u0915\u093e\u092b\u093c\u0940 \u0915\u0920\u093f\u0928? \u0906\u0938\u093e\u0928 \u092e\u094b\u0921 \u0915\u0947 \u0932\u093f\u090f \u0938\u094d\u0935\u093f\u091a \u0915\u0930\u0947\u0902", "\u092b\u0940\u0921\u092c\u0948\u0915", "\u090f\u0915 \u0928\u092f\u093e \u0915\u0948\u092a\u094d\u091a\u093e \u0906\u091c\u092e\u093e\u090f\u0902", "\u091b\u0935\u093f \u0932\u094b\u0921 \u0928\u0939\u0940\u0902\u0964 \u0915\u094d\u0932\u093f\u0915 \u0915\u0930\u0915\u0947 \u0930\u093f\u092b\u094d\u0930\u0947\u0936  \u0915\u0930\u0947\u0902", "\u0938\u0924\u094d\u092f\u093e\u092a\u0928 \u092a\u093e\u0930\u093f\u0924", "\u0928\u0947\u091f\u0935\u0930\u094d\u0915 \u0938\u092e\u092f \u0938\u092e\u093e\u092a\u094d\u0924\u0964 \u092b\u093f\u0930 \u0938\u0947 \u0915\u0930\u0947\u0902\u0964", "\u0938\u0924\u094d\u092f\u093e\u092a\u0928 \u0935\u093f\u092b\u0932\u0964 \u092b\u093f\u0930 \u0915\u094b\u0936\u093f\u0936 \u0915\u0930\u0947\u0902\u0964", "\u092a\u094d\u0930\u091a\u093e\u0932\u0928 \u0915\u093e \u0905\u0915\u094d\u0938\u0930 \u0939\u094b\u0928\u093e\u0964 \u092c\u093e\u0926 \u092e\u0947\u0902 \u0915\u094b\u0936\u093f\u0936 \u0915\u0930\u0947\u0902\u0964", "\u0915\u093e\u092b\u093c\u0940 \u0915\u0920\u094b\u0930? \u090f\u0915 \u0928\u092f\u093e \u0906\u091c\u092e\u093e\u090f\u0902", "\u0928\u0947\u091f\u0935\u0930\u094d\u0915 \u0924\u094d\u0930\u0941\u091f\u093f (+)\u0964 \u092b\u093f\u0930 \u0915\u094b\u0936\u093f\u0936 \u0915\u0930\u0947\u0902\u0964", "\u0935\u093e\u0938\u094d\u0924\u0935\u093f\u0915 \u0938\u094d\u0925\u093e\u0928 \u0915\u0940 \u0910\u092a \u0906\u0908\u0921\u0940 \u0938\u0947 \u092e\u0947\u0932 \u0928\u0939\u0940\u0902 \u0916\u093e\u0924\u0940\u0964 \u0915\u0943\u092a\u092f\u093e \u0915\u0948\u092a\u094d\u091a\u093e \u091f\u0940\u092e \u0938\u0947 \u0938\u0902\u092a\u0930\u094d\u0915 \u0915\u0930\u0947\u0902\u0964"],
        it: ["Verifica", "Indietro", "Mod. semplice", "Mod. standard", "OK", "Mod. semplice", "Mod. standard", "Esci dalla verifica", "Passa alla mod. standard", "Troppo diffic.? Passa alla mod. semplice", "Feedback", "Prova un altro captcha", "Imp. caric. imm. Clicc. per aggiorn.", "Verifica superata", "Timeout rete. Riprovare.", "Verif. non riusc. Riprovare.", "Oper. ripet. troppe volte. Riprovare dopo.", "Troppo diffic.? Prova un altro", "Errore rete ({{errore}}). Riprovare.", "L'ID dell'app non corrisp. alla posiz. corr. Contattare il team dei captcha."],
        lo: ["\u0e81\u0eb2\u0e99\u0e81\u0ea7\u0e94\u0eaa\u0ead\u0e9a", "\u0e81\u0eb1\u0e9a\u0e84\u0eb7\u0e99", "\u0ec2\u0edd\u0e94\u0e87\u0ec8\u0eb2\u0e8d", "\u0ec2\u0edd\u0e94\u0ea1\u0eb2\u0e94\u0e95\u0eb0\u0e96\u0eb2\u0e99", "\u0e95\u0ebb\u0e81\u0ea5\u0ebb\u0e87", "\u0ec2\u0edd\u0e94\u0e87\u0ec8\u0eb2\u0e8d", "\u0ec2\u0edd\u0e94\u0ea1\u0eb2\u0e94\u0e95\u0eb0\u0e96\u0eb2\u0e99", "\u0ead\u0ead\u0e81\u0e81\u0eb2\u0e99\u0e81\u0ea7\u0e94\u0eaa\u0ead\u0e9a", "\u0eaa\u0eb1\u0e9a\u0e9b\u0ec8\u0ebd\u0e99\u0ec0\u0e9b\u0eb1\u0e99\u0ec2\u0edd\u0e94\u0ea1\u0eb2\u0e94\u0e95\u0eb0\u0e96\u0eb2\u0e99", "\u0e8d\u0eb2\u0e81\u0ec0\u0e81\u0eb5\u0e99\u0ec4\u0e9b\u0e9a\u0ecd? \u0eaa\u0eb1\u0e9a\u0e9b\u0ec8\u0ebd\u0e99\u0ec0\u0e9b\u0eb1\u0e99\u0ec2\u0edd\u0e94\u0e87\u0ec8\u0eb2\u0e8d", "\u0e84\u0eb3\u0ec0\u0eab\u0eb1\u0e99\u0e95\u0eb4\u0e8a\u0ebb\u0ea1", "\u0ea5\u0ead\u0e87\u0ec3\u0e8a\u0ec9\u0ec1\u0e84\u0eb1\u0e9a\u0e88\u0eb2\u0ec3\u0edd\u0ec8", "\u0e81\u0eb2\u0e99\u0ec2\u0eab\u0ebc\u0e94\u0eae\u0eb9\u0e9a\u0e9a\u0ecd\u0ec8\u0eaa\u0eb3\u0ec0\u0ea5\u0eb1\u0e94. \u0e84\u0ea5\u0eb4\u0e81\u0ec0\u0e9e\u0eb7\u0ec8\u0ead\u0ea3\u0eb5\u0ec0\u0e9f\u0ea3\u0e8a", "\u0e9c\u0ec8\u0eb2\u0e99\u0e81\u0eb2\u0e99\u0e81\u0ea7\u0e94\u0eaa\u0ead\u0e9a\u0ec1\u0ea5\u0ec9\u0ea7", "\u0edd\u0ebb\u0e94\u0ec0\u0ea7\u0ea5\u0eb2\u0ec0\u0e84\u0eb7\u0ead\u0e82\u0ec8\u0eb2\u0e8d. \u0e81\u0eb0\u0ea5\u0eb8\u0e99\u0eb2\u0ea5\u0ead\u0e87\u0ec3\u0edd\u0ec8.", "\u0e81\u0eb2\u0e99\u0e81\u0ea7\u0e94\u0eaa\u0ead\u0e9a\u0e9a\u0ecd\u0ec8\u0eaa\u0eb3\u0ec0\u0ea5\u0eb1\u0e94. \u0ea5\u0ead\u0e87\u0ec3\u0edd\u0ec8\u0ead\u0eb5\u0e81.", "\u0e81\u0eb2\u0e99\u0e94\u0eb3\u0ec0\u0e99\u0eb5\u0e99\u0e81\u0eb2\u0e99\u0ec0\u0ea5\u0eb7\u0ec9\u0ead\u0ec6\u0ec0\u0e81\u0eb5\u0e99\u0ec4\u0e9b. \u0ea5\u0ead\u0e87\u0ec3\u0edd\u0ec8\u0e9e\u0eb2\u0e8d\u0eab\u0ebc\u0eb1\u0e87.", "\u0e8d\u0eb2\u0e81\u0ec0\u0e81\u0eb5\u0e99\u0ec4\u0e9b\u0e9a\u0ecd? \u0ea5\u0ead\u0e87\u0ead\u0eb1\u0e99\u0ec3\u0edd\u0ec8", "\u0ec0\u0e84\u0eb7\u0ead\u0e82\u0ec8\u0eb2\u0e8d\u0e82\u0eb1\u0e94\u0e82\u0ec9\u0ead\u0e87 (+). \u0e81\u0eb0\u0ea5\u0eb8\u0e99\u0eb2\u0ea5\u0ead\u0e87\u0ec3\u0edd\u0ec8.", "AppID \u0e9a\u0ecd\u0ec8\u0e81\u0ebb\u0e87\u0e81\u0eb1\u0e9a\u0e88\u0eb8\u0e94\u0e97\u0eb5\u0ec8\u0e95\u0eb1\u0ec9\u0e87\u0e95\u0ebb\u0ea7\u0e88\u0eb4\u0e87. \u0e81\u0eb0\u0ea5\u0eb8\u0e99\u0eb2\u0e95\u0eb4\u0e94\u0e95\u0ecd\u0ec8\u0e97\u0eb5\u0ea1\u0ec1\u0e84\u0eb1\u0e9a\u0e88\u0eb2."],
        ms: ["Pengesahan", "Kembali", "Mod mudah", "mod standard", "OK", "Mod mudah", "mod standard", "Hentikan pengesahan", "Tukar ke mod Standard", "Terlalu sukar? Tukar ke mod Mudah", "Maklum balas", "Cuba captcha baharu", "Imej gagal dimuat. Klik utk disegarkan", "Lulus pengesahan", "Rangkaian tamat masa. Cuba lagi.", "Pengesahan gagal. Cuba lagi", "Operasi terlalu kerap. Cuba lagi kemudian.", "Terlalu sukar? Cuba yang baharu", "Ralat rangkaian (+). Sila cuba lagi.", "AppID tidak sepadan dengan lokasi sebenar. Sila hubungi pasukan Captcha."],
        pl: ["Weryfikacja", "Wstecz", "Tryb prosty", "Tryb standar.", "OK", "Tryb prosty", "Tryb standar.", "Zako\u0144cz weryfikacj\u0119", "Prze\u0142\u0105cz do trybu standardowego", "Zbyt trudne? Prze\u0142\u0105cz do trybu prostego.", "Opinie", "Spr\xf3buj nowe captcha", "Nie pobrano obrazu. Od\u015bwie\u017c (kliknij).", "Zweryfikowano", "Limit czasu sieci. Pon\xf3w.", "Nie zweryfikowano. Pon\xf3w.", "Zbyt cz\u0119ste operacje. Spr\xf3buj p\xf3\u017aniej.", "Zbyt trudne? Spr\xf3buj ponownie.", "B\u0142\u0105d sieciowy (+). Spr\xf3buj ponownie.", "AppID nie pasuje do faktycznej lokalizacji. Skontaktuj si\u0119 z zespo\u0142em Captcha."],
        ru: ["\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430", "\u041d\u0430\u0437\u0430\u0434", "\u041f\u0440\u043e\u0441\u0442\u043e\u0439 \u0440\u0435\u0436\u0438\u043c", "\u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442", "OK", "\u041f\u0440\u043e\u0441\u0442\u043e\u0439 \u0440\u0435\u0436\u0438\u043c", "\u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442", "\u0412\u044b\u0439\u0442\u0438 \u0438\u0437 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438", "\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u0442\u044c\u0441\u044f \u0432 \u0440\u0435\u0436\u0438\u043c \u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442", "\u0421\u043b\u0438\u0448\u043a\u043e\u043c \u0441\u043b\u043e\u0436\u043d\u043e? \u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u0441\u044c \u0432 \u043f\u0440\u043e\u0441\u0442\u043e\u0439 \u0440\u0435\u0436\u0438\u043c", "\u041e\u0431\u0440\u0430\u0442\u043d\u0430\u044f \u0441\u0432\u044f\u0437\u044c", "\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u043a\u0430\u043f\u0447\u0443", "\u0421\u0431\u043e\u0439 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f. \u041e\u0431\u043d\u043e\u0432\u0438\u0442\u0435.", "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0430", "\u0412\u0440\u0435\u043c\u044f \u0438\u0441\u0442\u0435\u043a\u043b\u043e. \u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443.", "\u0421\u0431\u043e\u0439 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438. \u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435.", "\u0421\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u043d\u043e\u0433\u043e \u043f\u043e\u0432\u0442\u043e\u0440\u043e\u0432. \u0412\u0435\u0440\u043d\u0438\u0442\u0435\u0441\u044c \u043f\u043e\u0437\u0436\u0435.", "\u0421\u043b\u0438\u0448\u043a\u043e\u043c \u0441\u043b\u043e\u0436\u043d\u043e? \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0440\u0443\u0433\u043e\u0439", "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0442\u0438 (+). \u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u0437\u0436\u0435.", "AppID \u043d\u0435 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043c\u0435\u0441\u0442\u043e\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u044e. \u0421\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0441 \u043a\u043e\u043c\u0430\u043d\u0434\u043e\u0439 Captcha."],
        es: ["Verificaci\xf3n", "Atr\xe1s", "Modo sencillo", "Modo normal", "Aceptar", "Modo sencillo", "Modo normal", "Verificaci\xf3n r\xe1pida", "Cambiar a modo normal", "\xbfDemasiado dif\xedcil? Cambiar a modo sencillo", "Comentarios", "Probar nuevo captcha", "Fallo al cargar imagen. Clic para actualizar", "Verificaci\xf3n aprobada", "Red caducada. Pruebe de nuevo.", "Fall\xf3 verificaci\xf3n. Pruebe de nuevo.", "Operaci\xf3n muy repetida. Pruebe m\xe1s tarde.", "\xbfDemasiado dif\xedcil? Pruebe otro", "Erro de la red (+). Pruebe de nuevo.", "El AppID no coincide con la posici\xf3n actual. Contacte con el equipo Captcha."],
        th: ["\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19", "\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a", "\u0e42\u0e2b\u0e21\u0e14\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e07\u0e48\u0e32\u0e22", "\u0e42\u0e2b\u0e21\u0e14\u0e21\u0e32\u0e15\u0e23\u0e10\u0e32\u0e19", "\u0e15\u0e01\u0e25\u0e07", "\u0e42\u0e2b\u0e21\u0e14\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e07\u0e48\u0e32\u0e22", "\u0e42\u0e2b\u0e21\u0e14\u0e21\u0e32\u0e15\u0e23\u0e10\u0e32\u0e19", "\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19", "\u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e40\u0e1b\u0e47\u0e19\u0e42\u0e2b\u0e21\u0e14\u0e21\u0e32\u0e15\u0e23\u0e10\u0e32\u0e19", "\u0e22\u0e32\u0e01\u0e40\u0e01\u0e34\u0e19\u0e44\u0e1b\u0e43\u0e0a\u0e48\u0e44\u0e2b\u0e21 \u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e40\u0e1b\u0e47\u0e19\u0e42\u0e2b\u0e21\u0e14\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e07\u0e48\u0e32\u0e22", "\u0e02\u0e49\u0e2d\u0e40\u0e2a\u0e19\u0e2d\u0e41\u0e19\u0e30", "\u0e25\u0e2d\u0e07 Captcha \u0e43\u0e2b\u0e21\u0e48", "\u0e42\u0e2b\u0e25\u0e14\u0e20\u0e32\u0e1e\u0e44\u0e21\u0e48\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08 \u0e04\u0e25\u0e34\u0e01\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e23\u0e35\u0e40\u0e1f\u0e23\u0e0a", "\u0e1c\u0e48\u0e32\u0e19\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19", "\u0e40\u0e04\u0e23\u0e37\u0e2d\u0e02\u0e48\u0e32\u0e22\u0e2b\u0e21\u0e14\u0e40\u0e27\u0e25\u0e32 \u0e42\u0e1b\u0e23\u0e14\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07", "\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e44\u0e21\u0e48\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08 \u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07", "\u0e14\u0e33\u0e40\u0e19\u0e34\u0e19\u0e01\u0e32\u0e23\u0e1a\u0e48\u0e2d\u0e22\u0e40\u0e01\u0e34\u0e19\u0e44\u0e1b \u0e42\u0e1b\u0e23\u0e14\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07\u0e20\u0e32\u0e22\u0e2b\u0e25\u0e31\u0e07", "\u0e22\u0e32\u0e01\u0e40\u0e01\u0e34\u0e19\u0e44\u0e1b\u0e43\u0e0a\u0e48\u0e44\u0e2b\u0e21 \u0e25\u0e2d\u0e07\u0e20\u0e32\u0e1e\u0e43\u0e2b\u0e21\u0e48", "\u0e40\u0e04\u0e23\u0e37\u0e2d\u0e02\u0e48\u0e32\u0e22\u0e21\u0e35\u0e02\u0e49\u0e2d\u0e1c\u0e34\u0e14\u0e1e\u0e25\u0e32\u0e14 (+) \u0e42\u0e1b\u0e23\u0e14\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07", "AppID \u0e44\u0e21\u0e48\u0e15\u0e23\u0e07\u0e01\u0e31\u0e1a\u0e15\u0e33\u0e41\u0e2b\u0e19\u0e48\u0e07\u0e17\u0e35\u0e48\u0e15\u0e31\u0e49\u0e07\u0e08\u0e23\u0e34\u0e07 \u0e42\u0e1b\u0e23\u0e14\u0e15\u0e34\u0e14\u0e15\u0e48\u0e2d\u0e17\u0e35\u0e21 Captcha"],
        tr: ["Do\u011frulama", "Geri", "Basit mod", "Standart mod", "Tamam", "Basit mod", "Standart mod", "Do\u011frulamadan \xe7\u0131k", "Standart moda ge\xe7", "\xc7ok mu zor? Basit moda ge\xe7in", "Geri bildirim", "Yeni bir captcha deneyin", "G\xf6r\xfcnt\xfc y\xfcklenmedi. T\u0131klay\u0131p yenileyin", "Do\u011frulama ba\u015far\u0131l\u0131", "A\u011f zaman a\u015f\u0131m\u0131. Tekrar deneyin.", "Do\u011frulanamad\u0131. Tekrar deneyin.", "\xc7ok s\u0131k i\u015flem yap\u0131ld\u0131. Daha sonra deneyin.", "\xc7ok mu zar? Yeni birini deneyin", "A\u011f hatas\u0131 (+). Tekrar deneyin.", "Uygulama kimli\u011fi ger\xe7ek konumla e\u015fle\u015fmiyor. L\xfctfen Captcha ekibine ula\u015f\u0131n."],
        vi: ["X\xe1c th\u1ef1c", "Quay l\u1ea1i", "Ch\u1ebf \u0111\u1ed9 \u0111\u01a1n gi\u1ea3n", "Ch\u1ebf \u0111\u1ed9 chu\u1ea9n", "OK", "Ch\u1ebf \u0111\u1ed9 \u0111\u01a1n gi\u1ea3n", "Ch\u1ebf \u0111\u1ed9 chu\u1ea9n", "H\u1ee7y x\xe1c th\u1ef1c", "Chuy\u1ec3n sang Ch\u1ebf \u0111\u1ed9 chu\u1ea9n", "G\u1eb7p kh\xf3 \u01b0? H\xe3y chuy\u1ec3n sang Ch\u1ebf \u0111\u1ed9 \u0111\u01a1n gi\u1ea3n xem", "G\xf3p \xfd", "Th\u1eed captcha m\u1edbi", "Kh\xf4ng th\u1ec3 t\u1ea3i \u1ea3nh. Nh\u1ea5n \u0111\u1ec3 l\xe0m m\u1edbi", "X\xe1c th\u1ef1c th\xe0nh c\xf4ng", "H\u1ebft phi\xean k\u1ebft n\u1ed1i. H\xe3y th\u1eed l\u1ea1i.", "Ch\u01b0a th\u1ec3 x\xe1c th\u1ef1c. H\xe3y th\u1eed l\u1ea1i.", "Thao t\xe1c qu\xe1 nhi\u1ec1u l\u1ea7n. Vui l\xf2ng th\u1eed l\u1ea1i.", "G\u1eb7p kh\xf3 \u01b0? H\xe3y th\u1eed c\xe1i m\u1edbi xem", "L\u1ed7i m\u1ea1ng (+). Vui l\xf2ng th\u1eed l\u1ea1i.", "AppID kh\xf4ng tr\xf9ng kh\u1edbp v\u1edbi v\u1ecb tr\xed th\u1ef1c t\u1ebf. Vui l\xf2ng li\xean h\u1ec7 \u0111\u1ed9i ng\u0169 Captcha."],
        fil: ["Pag-verify", "Bumalik", "Simple mode", "Standard mode", "OK", "Simple mode", "Standard mode", "Tapusin ang pagpapatunay", "Lumipat sa Standard mode", "Napakahirap? Lumipat sa Simpleng mode", "Feedback", "Subukan ang bagong captcha", "Hindi nag-load. I-click para i-refresh", "Na-verify", "Huminto ang network. Pakiulit.", "Hindi na-verify. Pakiulit.", "Madalas na operasyon.\nSubukan ulit mamaya.", "Napakahirap? Sumubok ng bago", "Network error (+). Pakiulit.", "Di tugma ang AppID sa tunay na lugar. Pakikontak ang Captcha team."],
        ur: ["\u062a\u0635\u062f\u06cc\u0642", "\u067e\u06cc\u0686\u06be\u06d2", "\u0633\u0627\u062f\u06c1 \u0645\u0648\u0688", "\u0645\u0639\u06cc\u0627\u0631\u06cc \u0645\u0648\u0688", "\u0679\u06be\u064a\u06a9\u06c1\u06d2", "\u0633\u0627\u062f\u06c1 \u0645\u0648\u0688", "\u0645\u0639\u06cc\u0627\u0631\u06cc \u0645\u0648\u0688", "\u062a\u0635\u062f\u06cc\u0642 \u0633\u06d2 \u062a\u0631\u06a9 \u06a9\u0631\u06cc\u06ba", "\u0645\u0639\u06cc\u0627\u0631\u06cc \u0645\u0648\u0688 \u067e\u0631 \u062c\u0627\u0626\u06cc\u06ba", "\u0645\u0634\u06a9\u0644 \u06c1\u06d2\u061f \u0633\u0627\u062f\u06c1 \u0645\u0648\u0688 \u067e\u0631 \u062c\u0627\u0626\u06cc\u06ba", "\u062a\u0627\u062b\u0631\u0627\u062a \u062f\u06cc\u06ba", "\u0646\u06cc\u0627 \u06a9\u06cc\u067e\u0686\u0627 \u062f\u0627\u062e\u0644 \u06a9\u0631\u06cc\u06ba", "\u062a\u0635\u0648\u06cc\u0631\u0644\u0648\u0688\u0646\u06c1\u06cc \u06c1\u0648\u0626\u06cc \u0631\u0641\u0631\u06cc\u0634 \u06a9\u0644\u06a9 \u06a9\u0631\u06cc\u06ba", "\u062a\u0635\u062f\u06cc\u0642 \u06c1\u0648 \u06af\u0626\u06cc", "\u0646\u06cc\u0679 \u0648\u0631\u06a9 \u06a9\u0627 \u0648\u0642\u062a \u062e\u062a\u0645 \u067e\u06be\u0631\u06a9\u0648\u0634\u0634 \u06a9\u0631\u06cc\u06d2", "\u062a\u0635\u062f\u06cc\u0642 \u0646\u0627\u06a9\u0627\u0645 \u067e\u06be\u0631\u0633\u06d2 \u06a9\u0648\u0634\u0634 \u06a9\u0631\u06cc\u06ba", "\u062a\u062c\u0627\u0648\u0632 \u06c1\u0648 \u06af\u06cc\u0627. \u0628\u0639\u062f\u0645\u06cc\u06ba \u062f\u0648\u0628\u0627\u0631\u06c1 \u06a9\u0648\u0634\u0634 \u06a9\u0631\u06cc\u06ba.", "\u0645\u0634\u06a9\u0644 \u06c1\u06d2\u061f\u067e\u06be\u0631 \u06a9\u0648\u0634\u0634 \u06a9\u0631\u06cc\u06ba", "\u0646\u06cc\u0679 \u0648\u0631\u06a9 \u0641\u06cc\u0644 (+). \u062f\u0648\u0628\u0627\u0631\u06c1 \u06a9\u0648\u0634\u0634 \u06a9\u0631\u06cc\u06ba.", "\u0627\u06cc\u067e \u0622\u0626\u06cc \u0688\u06cc \u0627\u0635\u0644 \u0645\u062d\u0644 \u0648\u0642\u0648\u0639 \u0633\u06d2 \u0645\u06cc\u0644 \u0646\u06c1\u06cc\u06ba \u06a9\u06be\u0627\u062a\u0627.\u0628\u0631\u0627\u06c1 \u06a9\u0631\u0645 \u06a9\u06cc\u067e\u0686\u0627 \u0679\u06cc\u0645 \u0633\u06d2 \u0631\u0627\u0628\u0637\u06c1 \u06a9\u0631\u06cc\u06ba"]
    };
    t.all = r,
    r.iw = r.he,
    r["in"] = r.id,
    r.zh = r["zh-cn"]
}
, , function(e, t, i) {
    "use strict";
    var r = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0,
    t.shrinkArraySizeFromRuisun = t.shrinkArraySize = t.extend = void 0;
    var a = r(i(6));
    t.extend = Object.assign || a["default"],
    t.shrinkArraySize = function(e, t, i) {
        var r = e.length;
        if (r <= t)
            return e;
        var a = [];
        (i = i || {}).keepStart && (t -= 1,
        r -= 1,
        a.push(e[0])),
        i.keepLast && (r -= 1,
        t -= 1);
        for (var n = t / r, o = 0, s = 0; s < r; s++)
            (o += n) >= 1 && (a.push(e[s]),
            o -= 1);
        return i.keepLast && a.push(e[e.length - 1]),
        a
    }
    ,
    t.shrinkArraySizeFromRuisun = function(e, t, i) {
        var r = e.length;
        if (r <= t)
            return e;
        (i = i || {}).keepStart && (r -= 1),
        i.keepLast && (r -= 1,
        t -= 1);
        for (var a = Math.floor(r / (t - 1)), n = 0, o = []; o.length < t; )
            o.push(e[n]),
            n += a;
        return i.keepLast && o.push(e[e.length - 1]),
        o
    }
}
, function(e, t, i) {
    "use strict";
    t.__esModule = !0,
    t.isWebWorkerSupport = t.setWebworkerSupportCache = t.getWebworkerSupportCache = void 0;
    var r = "captcha_webworker_supported";
    t.getWebworkerSupportCache = function() {
        try {
            return localStorage.getItem(r)
        } catch (e) {}
        return !1
    }
    ,
    t.setWebworkerSupportCache = function(e) {
        try {
            localStorage.setItem(r, e)
        } catch (t) {}
    }
    ,
    t.isWebWorkerSupport = function() {
        var e = self || window;
        try {
            try {
                var t = void 0;
                try {
                    t = new e.Blob([""])
                } catch (n) {
                    (t = new (e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder)).append(""),
                    t = t.getBlob()
                }
                var i = e.URL || e.webkitURL
                  , r = i.createObjectURL(t)
                  , a = new e.Worker(r);
                return i.revokeObjectURL(r),
                a
            } catch (n) {
                return new e.Worker("data:application/javascript,".concat(encodeURIComponent("")))
            }
        } catch (n) {
            return null
        }
    }
}
, function(e, t, i) {
    "use strict";
    t.__esModule = !0,
    t.langTransform = t.getWxLang = t.getBrowserLang = void 0;
    var r = i(3)
      , a = i(11);
    function n() {
        var e = r.getQuery()
          , t = /(wehcat_real_lang|wechat_real_lang)=([a-zA-Z_-]+)/.exec(e);
        if (t)
            return t[2];
        for (var i = document.getElementsByTagName("script"), a = 0; a < i.length; a++) {
            var n = i[a].src;
            if (n && /TCapIframeApi/i.test(n)) {
                var o = /lang=([a-zA-Z_-]+)/.exec(n);
                if (o)
                    return o[1].toLowerCase()
            }
        }
        return r.getQueryParam("wxLang") || ""
    }
    t.getBrowserLang = function() {
        var e = navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage || "";
        if (/MicroMessenger/.test(navigator.userAgent)) {
            var t = n();
            t && (e = t)
        }
        return e
    }
    ,
    t.getWxLang = n,
    t.langTransform = function(e) {
        var t = e.toLowerCase().replace(/_/, "-")
          , i = t;
        return /-/.test(i) && (i = i.split("-")[0]),
        a.all[t] ? t : i
    }
}
, function(e, t, i) {
    var r;
    !function(a, n) {
        "use strict";
        var o = "model"
          , s = "name"
          , d = "type"
          , l = "vendor"
          , c = "version"
          , p = "mobile"
          , u = "tablet"
          , f = "smarttv"
          , h = function(e) {
            for (var t = {}, i = 0; i < e.length; i++)
                t[e[i].toUpperCase()] = e[i];
            return t
        }
          , m = function(e, t) {
            return "string" == typeof e && -1 !== g(t).indexOf(g(e))
        }
          , g = function(e) {
            return e.toLowerCase()
        }
          , y = function(e, t) {
            if ("string" == typeof e)
                return e = e.replace(/^\s\s*/, ""),
                void 0 === t ? e : e.substring(0, 350)
        }
          , v = function(e, t) {
            for (var i, r, a, n, o, s, d = 0; d < t.length && !o; ) {
                var l = t[d]
                  , c = t[d + 1];
                for (i = r = 0; i < l.length && !o && l[i]; )
                    if (o = l[i++].exec(e))
                        for (a = 0; a < c.length; a++)
                            s = o[++r],
                            "object" == typeof (n = c[a]) && n.length > 0 ? 2 === n.length ? "function" == typeof n[1] ? this[n[0]] = n[1].call(this, s) : this[n[0]] = n[1] : 3 === n.length ? "function" != typeof n[1] || n[1].exec && n[1].test ? this[n[0]] = s ? s.replace(n[1], n[2]) : void 0 : this[n[0]] = s ? n[1].call(this, s, n[2]) : void 0 : 4 === n.length && (this[n[0]] = s ? n[3].call(this, s.replace(n[1], n[2])) : void 0) : this[n] = s || void 0;
                d += 2
            }
        }
          , b = function(e, t) {
            for (var i in t)
                if ("object" == typeof t[i] && t[i].length > 0) {
                    for (var r = 0; r < t[i].length; r++)
                        if (m(t[i][r], e))
                            return "?" === i ? void 0 : i
                } else if (m(t[i], e))
                    return "?" === i ? void 0 : i;
            return e
        }
          , w = {
            ME: "4.90",
            "NT 3.11": "NT3.51",
            "NT 4.0": "NT4.0",
            2000: "NT 5.0",
            XP: ["NT 5.1", "NT 5.2"],
            Vista: "NT 6.0",
            7: "NT 6.1",
            8: "NT 6.2",
            8.1: "NT 6.3",
            10: ["NT 6.4", "NT 10.0"],
            RT: "ARM"
        }
          , _ = {
            browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [c, [s, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [c, [s, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [s, c], [/opios[\/ ]+([\w\.]+)/i], [c, [s, "Opera Mini"]], [/\bopr\/([\w\.]+)/i], [c, [s, "Opera"]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i], [s, c], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [c, [s, "UCBrowser"]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [c, [s, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [c, [s, "WeChat"]], [/konqueror\/([\w\.]+)/i], [c, [s, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [c, [s, "IE"]], [/yabrowser\/([\w\.]+)/i], [c, [s, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[s, /(.+)/, "$1 Secure Browser"], c], [/\bfocus\/([\w\.]+)/i], [c, [s, "Firefox Focus"]], [/\bopt\/([\w\.]+)/i], [c, [s, "Opera Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [c, [s, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [c, [s, "Dolphin"]], [/coast\/([\w\.]+)/i], [c, [s, "Opera Coast"]], [/miuibrowser\/([\w\.]+)/i], [c, [s, "MIUI Browser"]], [/fxios\/([-\w\.]+)/i], [c, [s, "Firefox"]], [/\bqihu|(qi?ho?o?|360)browser/i], [[s, "360 Browser"]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[s, /(.+)/, "$1 Browser"], c], [/(comodo_dragon)\/([\w\.]+)/i], [[s, /_/g, " "], c], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [s, c], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [s], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[s, "Facebook"], c], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [s, c], [/\bgsa\/([\w\.]+) .*safari\//i], [c, [s, "GSA"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [c, [s, "Chrome Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[s, "Chrome WebView"], c], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [c, [s, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [s, c], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [c, [s, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [c, s], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [s, [c, b, {
                "1.0": "/8",
                1.2: "/1",
                1.3: "/3",
                "2.0": "/412",
                "2.0.2": "/416",
                "2.0.3": "/417",
                "2.0.4": "/419",
                "?": "/"
            }]], [/(webkit|khtml)\/([\w\.]+)/i], [s, c], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[s, "Netscape"], c], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [c, [s, "Firefox Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [s, c], [/(cobalt)\/([\w\.]+)/i], [s, [c, /master.|lts./, ""]]],
            cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [["architecture", "amd64"]], [/(ia32(?=;))/i], [["architecture", g]], [/((?:i[346]|x)86)[;\)]/i], [["architecture", "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [["architecture", "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [["architecture", "armhf"]], [/windows (ce|mobile); ppc;/i], [["architecture", "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [["architecture", /ower/, "", g]], [/(sun4\w)[;\)]/i], [["architecture", "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [["architecture", g]]],
            device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [o, [l, "Samsung"], [d, u]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [o, [l, "Samsung"], [d, p]], [/\((ip(?:hone|od)[\w ]*);/i], [o, [l, "Apple"], [d, p]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [o, [l, "Apple"], [d, u]], [/(macintosh);/i], [o, [l, "Apple"]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [o, [l, "Sharp"], [d, p]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [o, [l, "Huawei"], [d, u]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [o, [l, "Huawei"], [d, p]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[o, /_/g, " "], [l, "Xiaomi"], [d, p]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[o, /_/g, " "], [l, "Xiaomi"], [d, u]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [o, [l, "OPPO"], [d, p]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [o, [l, "Vivo"], [d, p]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [o, [l, "Realme"], [d, p]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [o, [l, "Motorola"], [d, p]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [o, [l, "Motorola"], [d, u]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [o, [l, "LG"], [d, u]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [o, [l, "LG"], [d, p]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [o, [l, "Lenovo"], [d, u]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[o, /_/g, " "], [l, "Nokia"], [d, p]], [/(pixel c)\b/i], [o, [l, "Google"], [d, u]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [o, [l, "Google"], [d, p]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [o, [l, "Sony"], [d, p]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[o, "Xperia Tablet"], [l, "Sony"], [d, u]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [o, [l, "OnePlus"], [d, p]], [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [o, [l, "Amazon"], [d, u]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[o, /(.+)/g, "Fire Phone $1"], [l, "Amazon"], [d, p]], [/(playbook);[-\w\),; ]+(rim)/i], [o, l, [d, u]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [o, [l, "BlackBerry"], [d, p]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [o, [l, "ASUS"], [d, u]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [o, [l, "ASUS"], [d, p]], [/(nexus 9)/i], [o, [l, "HTC"], [d, u]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [l, [o, /_/g, " "], [d, p]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [o, [l, "Acer"], [d, u]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [o, [l, "Meizu"], [d, p]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [l, o, [d, p]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [l, o, [d, u]], [/(surface duo)/i], [o, [l, "Microsoft"], [d, u]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [o, [l, "Fairphone"], [d, p]], [/(u304aa)/i], [o, [l, "AT&T"], [d, p]], [/\bsie-(\w*)/i], [o, [l, "Siemens"], [d, p]], [/\b(rct\w+) b/i], [o, [l, "RCA"], [d, u]], [/\b(venue[\d ]{2,7}) b/i], [o, [l, "Dell"], [d, u]], [/\b(q(?:mv|ta)\w+) b/i], [o, [l, "Verizon"], [d, u]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [o, [l, "Barnes & Noble"], [d, u]], [/\b(tm\d{3}\w+) b/i], [o, [l, "NuVision"], [d, u]], [/\b(k88) b/i], [o, [l, "ZTE"], [d, u]], [/\b(nx\d{3}j) b/i], [o, [l, "ZTE"], [d, p]], [/\b(gen\d{3}) b.+49h/i], [o, [l, "Swiss"], [d, p]], [/\b(zur\d{3}) b/i], [o, [l, "Swiss"], [d, u]], [/\b((zeki)?tb.*\b) b/i], [o, [l, "Zeki"], [d, u]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[l, "Dragon Touch"], o, [d, u]], [/\b(ns-?\w{0,9}) b/i], [o, [l, "Insignia"], [d, u]], [/\b((nxa|next)-?\w{0,9}) b/i], [o, [l, "NextBook"], [d, u]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[l, "Voice"], o, [d, p]], [/\b(lvtel\-)?(v1[12]) b/i], [[l, "LvTel"], o, [d, p]], [/\b(ph-1) /i], [o, [l, "Essential"], [d, p]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [o, [l, "Envizen"], [d, u]], [/\b(trio[-\w\. ]+) b/i], [o, [l, "MachSpeed"], [d, u]], [/\btu_(1491) b/i], [o, [l, "Rotor"], [d, u]], [/(shield[\w ]+) b/i], [o, [l, "Nvidia"], [d, u]], [/(sprint) (\w+)/i], [l, o, [d, p]], [/(kin\.[onetw]{3})/i], [[o, /\./g, " "], [l, "Microsoft"], [d, p]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [o, [l, "Zebra"], [d, u]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [o, [l, "Zebra"], [d, p]], [/smart-tv.+(samsung)/i], [l, [d, f]], [/hbbtv.+maple;(\d+)/i], [[o, /^/, "SmartTV"], [l, "Samsung"], [d, f]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[l, "LG"], [d, f]], [/(apple) ?tv/i], [l, [o, "Apple TV"], [d, f]], [/crkey/i], [[o, "Chromecast"], [l, "Google"], [d, f]], [/droid.+aft(\w)( bui|\))/i], [o, [l, "Amazon"], [d, f]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [o, [l, "Sharp"], [d, f]], [/(bravia[\w ]+)( bui|\))/i], [o, [l, "Sony"], [d, f]], [/(mitv-\w{5}) bui/i], [o, [l, "Xiaomi"], [d, f]], [/Hbbtv.*(technisat) (.*);/i], [l, o, [d, f]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[l, y], [o, y], [d, f]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, f]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [l, o, [d, "console"]], [/droid.+; (shield) bui/i], [o, [l, "Nvidia"], [d, "console"]], [/(playstation [345portablevi]+)/i], [o, [l, "Sony"], [d, "console"]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [o, [l, "Microsoft"], [d, "console"]], [/((pebble))app/i], [l, o, [d, "wearable"]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [o, [l, "Apple"], [d, "wearable"]], [/droid.+; (glass) \d/i], [o, [l, "Google"], [d, "wearable"]], [/droid.+; (wt63?0{2,3})\)/i], [o, [l, "Zebra"], [d, "wearable"]], [/(quest( 2| pro)?)/i], [o, [l, "Facebook"], [d, "wearable"]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [l, [d, "embedded"]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [o, [d, p]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [o, [d, u]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, u]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, p]], [/(android[-\w\. ]{0,9});.+buil/i], [o, [l, "Generic"]]],
            engine: [[/windows.+ edge\/([\w\.]+)/i], [c, [s, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [c, [s, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i], [s, c], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [c, s]],
            os: [[/microsoft (windows) (vista|xp)/i], [s, c], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [s, [c, b, w]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[s, "Windows"], [c, b, w]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i], [[c, /_/g, "."], [s, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[s, "Mac OS"], [c, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [c, s], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [s, c], [/\(bb(10);/i], [c, [s, "BlackBerry"]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [c, [s, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [c, [s, "Firefox OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [c, [s, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [c, [s, "watchOS"]], [/crkey\/([\d\.]+)/i], [c, [s, "Chromecast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[s, "Chromium OS"], c], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [s, c], [/(sunos) ?([\w\.\d]*)/i], [[s, "Solaris"], c], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i], [s, c]]
        }
          , T = function(e, t) {
            if ("object" == typeof e && (t = e,
            e = void 0),
            !(this instanceof T))
                return new T(e,t).getResult();
            var i = void 0 !== a && a.navigator ? a.navigator : void 0
              , r = e || (i && i.userAgent ? i.userAgent : "")
              , n = i && i.userAgentData ? i.userAgentData : void 0
              , o = t ? function(e, t) {
                var i = {};
                for (var r in e)
                    t[r] && t[r].length % 2 == 0 ? i[r] = t[r].concat(e[r]) : i[r] = e[r];
                return i
            }(_, t) : _;
            return this.getBrowser = function() {
                var e, t = {};
                return t.name = void 0,
                t.version = void 0,
                v.call(t, r, o.browser),
                t.major = "string" == typeof (e = t.version) ? e.replace(/[^\d\.]/g, "").split(".")[0] : void 0,
                i && i.brave && "function" == typeof i.brave.isBrave && (t.name = "Brave"),
                t
            }
            ,
            this.getCPU = function() {
                var e = {
                    architecture: void 0
                };
                return v.call(e, r, o.cpu),
                e
            }
            ,
            this.getDevice = function() {
                var e = {
                    vendor: void 0,
                    model: void 0,
                    type: void 0
                };
                return v.call(e, r, o.device),
                !e.type && n && n.mobile && (e.type = p),
                "Macintosh" == e.model && i && "undefined" != typeof i.standalone && i.maxTouchPoints && i.maxTouchPoints > 2 && (e.model = "iPad",
                e.type = u),
                e
            }
            ,
            this.getEngine = function() {
                var e = {
                    name: void 0,
                    version: void 0
                };
                return v.call(e, r, o.engine),
                e
            }
            ,
            this.getOS = function() {
                var e = {
                    name: void 0,
                    version: void 0
                };
                return v.call(e, r, o.os),
                !e.name && n && "Unknown" != n.platform && (e.name = n.platform.replace(/chrome os/i, "Chromium OS").replace(/macos/i, "Mac OS")),
                e
            }
            ,
            this.getResult = function() {
                return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU()
                }
            }
            ,
            this.getUA = function() {
                return r
            }
            ,
            this.setUA = function(e) {
                return r = "string" == typeof e && e.length > 350 ? y(e, 350) : e,
                this
            }
            ,
            this.setUA(r),
            this
        };
        T.VERSION = "1.0.34",
        T.BROWSER = h([s, c, "major"]),
        T.CPU = h(["architecture"]),
        T.DEVICE = h([o, l, d, "console", p, f, u, "wearable", "embedded"]),
        T.ENGINE = T.OS = h([s, c]),
        void 0 !== t ? (void 0 !== e && e.exports && (t = e.exports = T),
        t.UAParser = T) : i(5) ? void 0 === (r = function() {
            return T
        }
        .call(t, i, t, e)) || (e.exports = r) : void 0 !== a && (a.UAParser = T);
        var S = void 0 !== a && (a.jQuery || a.Zepto);
        if (S && !S.ua) {
            var C = new T;
            S.ua = C.getResult(),
            S.ua.get = function() {
                return C.getUA()
            }
            ,
            S.ua.set = function(e) {
                C.setUA(e);
                var t = C.getResult();
                for (var i in t)
                    S.ua[i] = t[i]
            }
        }
    }("object" == typeof window ? window : this)
}
, function(module, exports, __webpack_require__) {
    "use strict";
    var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    ;
    "object" !== ("undefined" == typeof JSON ? "undefined" : _typeof(JSON)) && (JSON = {}),
    function() {
        var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta, rep;
        function f(e) {
            return e < 10 ? "0" + e : e
        }
        function this_value() {
            return this.valueOf()
        }
        function quote(e) {
            return rx_escapable.lastIndex = 0,
            rx_escapable.test(e) ? '"' + e.replace(rx_escapable, function(e) {
                var t = meta[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }
        function str(e, t) {
            var i, r, a, n, o, s = gap, d = t[e];
            switch (d && "object" === (void 0 === d ? "undefined" : _typeof(d)) && "function" == typeof d.toJSON && (d = d.toJSON(e)),
            "function" == typeof rep && (d = rep.call(t, e, d)),
            void 0 === d ? "undefined" : _typeof(d)) {
            case "string":
                return quote(d);
            case "number":
                return isFinite(d) ? String(d) : "null";
            case "boolean":
            case "null":
                return String(d);
            case "object":
                if (!d)
                    return "null";
                if (gap += indent,
                o = [],
                "[object Array]" === Object.prototype.toString.apply(d)) {
                    for (n = d.length,
                    i = 0; i < n; i += 1)
                        o[i] = str(i, d) || "null";
                    return a = 0 === o.length ? "[]" : gap ? "[\n" + gap + o.join(",\n" + gap) + "\n" + s + "]" : "[" + o.join(",") + "]",
                    gap = s,
                    a
                }
                if (rep && "object" === (void 0 === rep ? "undefined" : _typeof(rep)))
                    for (n = rep.length,
                    i = 0; i < n; i += 1)
                        "string" == typeof rep[i] && (a = str(r = rep[i], d)) && o.push(quote(r) + (gap ? ": " : ":") + a);
                else
                    for (r in d)
                        Object.prototype.hasOwnProperty.call(d, r) && (a = str(r, d)) && o.push(quote(r) + (gap ? ": " : ":") + a);
                return a = 0 === o.length ? "{}" : gap ? "{\n" + gap + o.join(",\n" + gap) + "\n" + s + "}" : "{" + o.join(",") + "}",
                gap = s,
                a
            }
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }
        ,
        Boolean.prototype.toJSON = this_value,
        Number.prototype.toJSON = this_value,
        String.prototype.toJSON = this_value),
        "function" != typeof JSON.stringify && (meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        JSON.stringify = function(e, t, i) {
            var r;
            if (gap = "",
            indent = "",
            "number" == typeof i)
                for (r = 0; r < i; r += 1)
                    indent += " ";
            else
                "string" == typeof i && (indent = i);
            if (rep = t,
            t && "function" != typeof t && ("object" !== (void 0 === t ? "undefined" : _typeof(t)) || "number" != typeof t.length))
                throw new Error("JSON.stringify");
            return str("", {
                "": e
            })
        }
        ),
        "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
            var j;
            function walk(e, t) {
                var i, r, a = e[t];
                if (a && "object" === (void 0 === a ? "undefined" : _typeof(a)))
                    for (i in a)
                        Object.prototype.hasOwnProperty.call(a, i) && ((r = walk(a, i)) !== undefined ? a[i] = r : delete a[i]);
                return reviver.call(e, t, a)
            }
            if (text = String(text),
            rx_dangerous.lastIndex = 0,
            rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            })),
            rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")))
                return j = eval("(" + text + ")"),
                "function" == typeof reviver ? walk({
                    "": j
                }, "") : j;
            throw new SyntaxError("JSON.parse")
        }
        )
    }()
}
, function(e, t, i) {
    "use strict";
    var r = i(0);
    e.exports = function(e) {
        var t = window.document.getElementsByTagName("script")[0]
          , i = window.document.createElement("script")
          , a = e.callback || "callback"
          , n = "_aq_" + Math.floor(1e6 * Math.random());
        window[n] = function() {
            try {
                delete window[n]
            } catch (t) {}
            e.success && e.success.apply(null, Array.prototype.slice.call(arguments))
        }
        ;
        var o = e.url
          , s = {};
        s[a] = n,
        e.data && (s = (0,
        r.extend)(s, e.data)),
        o = (0,
        r.addUrlParam)(o, s),
        i.async = !!e.async,
        i.src = o;
        var d = null;
        e.timeout && (d = setTimeout(function() {
            i && t.parentNode && t.parentNode.contains(i) && t.parentNode.removeChild(i),
            window[n] = function() {}
            ,
            e.error && e.error(!0)
        }, e.timeout)),
        i.onload = function() {
            d && clearTimeout(d),
            i && t.parentNode && t.parentNode.contains(i) && t.parentNode.removeChild(i)
        }
        ,
        i.onerror = function() {
            d && clearTimeout(d),
            e.error && e.error()
        }
        ,
        t.parentNode.insertBefore(i, t)
    }
}
, function(e, t, i) {
    "use strict";
    function r(e) {
        if (Array.isArray(e)) {
            for (var t = 0, i = Array(e.length); t < e.length; t++)
                i[t] = e[t];
            return i
        }
        return Array.from(e)
    }
    var a = i(0).getLogCommonParams
      , n = {
        ERROR_TYPE_FRAMEJS_DOWNLOAD_FAIL: 16,
        ERROR_TYPE_JSONP_PREHANDLE: 17,
        ERROR_TYPE_FRAMEJS_CODE_ERROR: 18,
        CALLBACK_NAME: 19,
        IFRAME_CREATE_ERROR: 25,
        IFRAME_POPUP_CREATE_ERROR: 26,
        IFRAME_FULL_CREATE_ERROR: 27,
        STANDARD_INTEGRATE_MONITOR: 38,
        FRAME_JS_LOAD_TIMEOUT: 40,
        FRAME_JS_LOAD_ERROR: 41,
        PRELOAD_REQUEST_TIMEOUT: 50,
        PRELOAD_REQUEST_ERROR: 51,
        PRELOAD_RESPONSE_WRONG: 52,
        IFRAME_PRELOAD_FAIL: 60,
        PREHANDLE_RATE_LIMIT: 70,
        REFRESH_RATE_LIMIT: 71,
        VERIFY_RATE_LIMIT: 72
    }
      , o = {
        ERROR_TYPE_FRAMEJS_DOWNLOAD_FAIL: "ERROR_TYPE_FRAMEJS_DOWNLOAD_FAIL",
        ERROR_TYPE_JSONP_PREHANDLE: "ERROR_TYPE_JSONP_PREHANDLE",
        ERROR_TYPE_FRAMEJS_CODE_ERROR: "ERROR_TYPE_FRAMEJS_CODE_ERROR",
        CALLBACK_NAME: "CALLBACK_NAME"
    }
      , s = void 0
      , d = [];
    function l(e, t, i) {
        var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "0";
        try {
            if (void 0 === s)
                return void d.push([e, t, i]);
            if (s)
                return;
            (i = i || o[e]).length > 1024 && i.substr(0, 1024);
            var l = ["type=" + (e = n[e]), "appid=" + t, "reason=" + encodeURIComponent(i), "dyeid=" + r];
            if (window.__TencentCaptchaOpts__) {
                var c = window.__TencentCaptchaOpts__.dyeid;
                c && "0" !== c && (l[3] = "dyeid=" + c)
            }
            (new Image).src = (window.AqSCodeCapDomain || "") + "/cap_monitor?" + a().join("&") + "&" + l.join("&")
        } catch (p) {}
    }
    e.exports = {
        type: n,
        send: l,
        perfectStack: function(e) {
            var t = "";
            e && e.stack && (t = e.stack.replace(/\n/gi, "").split(/\bat\b/).join("\n").replace(/\?[^:]+/gi, ""));
            try {
                var i = e.toString();
                t.indexOf(i) < 0 && (t = i + "@" + t)
            } catch (r) {}
            return t
        },
        setGlobalStatus: function(e) {
            if (!(s = e))
                for (var t = 0; t < d.length; t++) {
                    var i = d[t];
                    l.apply(undefined, r(i))
                }
        }
    }
}
, function(e, t, i) {
    "use strict";
    t.__esModule = !0,
    t["default"] = {
        loadState: {
            ready: 0,
            fail: 1,
            mixing: 2
        },
        messageType: {
            hybridVerify: 8,
            loadReady: 10,
            preloadReady: 30,
            checkPreLoadReady: 31,
            sendPreloadData: 32,
            goAged: 36,
            goNormalVerify: 37,
            windowChanged: 38,
            readyConfirm: 39
        },
        preloadMsgType: {
            capClose: 33,
            verifySuccess: 34,
            sessionTimeout: 35,
            verifyStart: 40,
            sendTrackerData: 41
        },
        templateKeys: ["drag", "dy"],
        retCode: {
            success: 0,
            errorWithTicket: 0,
            close: 2
        },
        defaultColorScheme: "#007AFF"
    }
}
, , , , , , , , , function(e, t, i) {
    "use strict";
    var r = this && this.__values || function(e) {
        var t = "function" == typeof Symbol && Symbol.iterator
          , i = t && e[t]
          , r = 0;
        if (i)
            return i.call(e);
        if (e && "number" == typeof e.length)
            return {
                next: function() {
                    return e && r >= e.length && (e = void 0),
                    {
                        value: e && e[r++],
                        done: !e
                    }
                }
            };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }
      , a = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0,
    t.includeInPreoloadTemplate = t.injectTemplate = t.removeTemplateWrapper = t.markTypeTemplateUnloaded = t.markTypeTemplateLoaded = t.styledTypeTemplate = t.getHtmlTemplateGroup = t.htmlTemplateGroup = t.getTemplateDomain = void 0;
    var n = i(1)
      , o = a(i(20))
      , s = i(8)
      , d = o["default"].templateKeys
      , l = {
        drag: {
            url: "template/drag_ele.html",
            id: "tcaptcha_iframe_drag",
            wrapId: "tcaptcha_transform_drag"
        },
        dy: {
            url: "template/drag_ele.html",
            id: "tcaptcha_iframe_dy",
            wrapId: "tcaptcha_transform_dy"
        }
    };
    t.getTemplateDomain = function() {
        return s.isIframeSupportCdnDomain() ? window.AqSCodeCdnDomain : window.AqSCodeCapDomain
    }
    ,
    t.htmlTemplateGroup = {};
    t.getHtmlTemplateGroup = function() {
        return t.htmlTemplateGroup
    }
    ;
    t.styledTypeTemplate = function(e, i) {
        var r = null === t.htmlTemplateGroup || void 0 === t.htmlTemplateGroup ? void 0 : t.htmlTemplateGroup[e];
        r && (r.styled = !0,
        r.showType = i || "")
    }
    ;
    t.markTypeTemplateLoaded = function(e) {
        var i = null === t.htmlTemplateGroup || void 0 === t.htmlTemplateGroup ? void 0 : t.htmlTemplateGroup[e];
        i && (i.load = !0)
    }
    ;
    t.markTypeTemplateUnloaded = function(e) {
        var i = null === t.htmlTemplateGroup || void 0 === t.htmlTemplateGroup ? void 0 : t.htmlTemplateGroup[e];
        i && (i.load = !1,
        i.styled = !1,
        i.showType = undefined)
    }
    ;
    t.removeTemplateWrapper = function(e) {
        var t = l[e].wrapId
          , i = document.getElementById(t);
        (null === i || void 0 === i ? void 0 : i.parentNode) && i.parentNode.removeChild(i)
    }
    ;
    t.injectTemplate = function(e, i, r) {
        if (!document.body)
            return t.htmlTemplateGroup;
        var a = function(e, i, r) {
            t.removeTemplateWrapper(e);
            var a = document.createElement("div")
              , o = l[e]
              , s = o.id
              , d = o.wrapId;
            a.id = d;
            var c = n.createGeneralIframe({
                id: s,
                name: window.AqSCodeCapDomain
            });
            return window.TCaptchaGlobal ? c.src = i + "/template/drag_ele_global.52745fe0.html" : c.src = i + "/template/drag_ele.52745fe0.html",
            n.setCss(a, {
                opacity: "0",
                position: "absolute",
                transition: "opacity 0.3s linear 0s",
                top: "-1000000px"
            }),
            a.appendChild(c),
            r ? r.appendChild(a) : document.body.appendChild(a),
            {
                wrapper: a,
                iframe: c
            }
        }(e, i, r)
          , o = a.wrapper
          , s = a.iframe;
        return t.htmlTemplateGroup[e] = {
            ele: r || document.body,
            type: e,
            wrapper: o,
            iframe: s,
            load: !1,
            styled: !1
        },
        t.htmlTemplateGroup
    }
    ,
    t.includeInPreoloadTemplate = function(e) {
        var t, i;
        try {
            for (var a = r(d), n = a.next(); !n.done; n = a.next())
                if (n.value === e)
                    return !0
        } catch (o) {
            t = {
                error: o
            }
        } finally {
            try {
                n && !n.done && (i = a["return"]) && i.call(a)
            } finally {
                if (t)
                    throw t.error
            }
        }
        return !1
    }
}
, , function(e, t, i) {
    "use strict";
    var r = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0;
    var a = r(i(6))
      , n = Object.assign || a["default"]
      , o = function(e) {
        return function(t) {
            return Object.prototype.toString.call(t) == "[object " + e + "]"
        }
    }
      , s = o("Object")
      , d = o("Function")
      , l = function() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    }
      , c = function() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
      , p = function(e, t, i) {
        if (-1 != e.indexOf("?")) {
            var r = new RegExp("(\\?|&" + t + ")=[^&]*");
            e = r.test(e) ? e.replace(r, "$1=" + i) : e + "&" + t + "=" + i
        } else
            e = e + "?" + t + "=" + i;
        return e
    }
      , u = function(e, t) {
        return e.currentStyle ? e.currentStyle[t] : document.defaultView.getComputedStyle(e, null)[t]
    }
      , f = function(e, t) {
        if (e && t) {
            if (s(t)) {
                for (var i in t)
                    e.style[i] = t[i];
                return t
            }
            return u(e, t)
        }
    }
      , h = /(iPhone|iPad|iPod|Android|ios|SymbianOS|Mobile)/i.test(navigator.userAgent)
      , m = /chrome\/7[567]/i.test(navigator.userAgent)
      , g = function() {
        var e, t, i = 1;
        if (document.querySelector)
            t = document.querySelector('meta[name="viewport"]');
        else
            for (var r = document.getElementsByTagName("meta"), a = 0, n = r.length; a < n; a++) {
                "viewport" == r[a].getAttribute("name") && (t = r[a])
            }
        if (t) {
            var o = null === (e = t.getAttribute("content")) || void 0 === e ? void 0 : e.match(/initial-scale=([\d\.]+)/);
            o && (i = parseFloat(o[1]))
        }
        return i
    }
      , y = ["absolute", "fixed", "static", "relative"]
      , v = !!window.ActiveXObject && 8 == document.documentMode;
    t["default"] = {
        extend: n,
        isObject: s,
        isFunction: d,
        isHorizontal: function(e, t) {
            if ("number" == typeof window.orientation && "object" == typeof window.onorientationchange && (-90 == window.orientation || 90 == window.orientation))
                return !0;
            if (e) {
                if (t.windowHeight < t.windowWidth)
                    return !0
            } else if (window.innerHeight < window.innerWidth)
                return !0;
            return !1
        },
        isHorizontalNew: function() {
            return "number" == typeof window.orientation && "object" == typeof window.onorientationchange && (-90 == window.orientation || 90 == window.orientation) || window.innerHeight < window.innerWidth
        },
        callbackExecutor: function(e, t) {
            e.closeSecurityCode(),
            setTimeout(function() {
                for (var i = 0, r = e.listenFunc.length; i < r; i++)
                    try {
                        e.listenFunc[i](t)
                    } catch (a) {}
            }, 0)
        },
        addUrlParam: function(e, t) {
            for (var i in t)
                e = p(e, encodeURIComponent(i), encodeURIComponent(t[i]));
            return e
        },
        removeIfExist: function(e) {
            for (var t = window.document.getElementById(e); t; )
                t.parentNode.removeChild(t),
                t = window.document.getElementById(e)
        },
        createElement: function(e) {
            return document.createElement(e)
        },
        CSS: f,
        computeBaseFontSize: function() {
            var e = l()
              , t = c()
              , i = 0;
            "orientation"in window ? i = "string" == typeof window.orientation ? parseInt(window.orientation, 10) : window.orientation : screen && screen.orientation && (i = screen.orientation.angle);
            var r, a = (90 === Math.abs(i) ? t : e) / 375, n = g();
            return a = (a = 0 == n || 1 == n ? a > 1.3 ? 1.3 : a : n >= .5 ? a > 2 ? 2 : a : a > 3 ? 3 : a) < .85 ? .85 : a,
            r = Math.floor(1e4 * a) / 1e4 * 16,
            r = h ? r : 16
        },
        isMobileUa: h,
        getWindowWidth: l,
        getWindowHeight: c,
        getParentScale: g,
        getPosStyle: function(e) {
            var t = "embed" == e.type ? "relative" : "absolute";
            if ("popup" == e.type && e.pos && e.pos.length > 0)
                for (var i = 0; i < y.length; i++)
                    if (e.pos === y[i]) {
                        t = e.pos;
                        break
                    }
            return t
        },
        getPosStyleNew: function(e, t) {
            var i = "embed" == e ? "relative" : "absolute";
            if ("popup" == e && t && t.length > 0)
                for (var r = 0; r < y.length; r++)
                    if (t === y[r]) {
                        i = t;
                        break
                    }
            return i
        },
        initColor: function(e) {
            var t = "#4886ff";
            if (e) {
                var i = decodeURIComponent(e);
                i && -1 == i.indexOf("#") && 6 == i.length && /^[0-9a-fA-F]{6}$/g.test(i) && (t = "#" + i)
            }
            return t
        },
        getCSS: u,
        isIEVer: function(e) {
            var t = document.createElement("b");
            return t.innerHTML = "\x3c!--[if IE " + e + "]><i></i><![endif]--\x3e",
            t.getElementsByTagName("i") && 1 === t.getElementsByTagName("i").length
        },
        getPos: function(e) {
            if ("undefined" != typeof e.offsetParent) {
                for (var t = 0, i = 0; e; e = e.offsetParent) {
                    var r = u(e, "borderLeftWidth");
                    r = r && r.indexOf("px") > -1 ? parseInt(r, 10) : 0;
                    var a = u(e, "borderTopWidth");
                    a = a && a.indexOf("px") > -1 ? parseInt(a, 10) : 0,
                    v && (r = a = 0),
                    t += e.offsetLeft + r,
                    i += e.offsetTop + a
                }
                return [t, i]
            }
            return [e.x, e.y]
        },
        getSize: function(e) {
            var t = f(e, "width")
              , i = f(e, "height");
            return [parseInt(t, 10), parseInt(i, 10)]
        },
        getScrollTop: function() {
            return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        },
        isLowIE: function() {
            var e, t, i = navigator.userAgent.toLowerCase(), r = i.indexOf("msie") > -1;
            if (r) {
                if (e = i.match(/msie ([\d.]+)/)[1],
                t = r && document.documentMode,
                e && e <= 8)
                    return !0;
                if (t && t < 9)
                    return !0
            }
            return !1
        },
        getCapType: function(e, t) {
            e = parseInt(e, 10),
            t = parseInt(t, 10);
            var i = "defaultSize";
            if (0 != e && 1 != e || 0 != t) {
                if (1 == e || 2 == e)
                    switch (t) {
                    case 1:
                        i = "click";
                        break;
                    case 4:
                        i = "piece";
                        break;
                    case 7:
                        i = "coordinate";
                        break;
                    case 8:
                        i = "slide";
                        break;
                    case 9:
                        i = "slidepuzzle";
                        break;
                    case 11:
                        i = "vtt";
                        break;
                    case 12:
                        i = "f_limit";
                        break;
                    case 10:
                    case 13:
                    case 14:
                        i = "slidepuzzle_new";
                        break;
                    case 15:
                        i = "slidepuzzle_opt";
                        break;
                    default:
                        i = "defaultSize"
                    }
            } else
                i = "char";
            return i
        },
        getCaptchaType: function(e) {
            var t = parseInt(e, 10);
            if (t >= 1e3)
                return "dy";
            var i = "slidepuzzle_new";
            switch (t) {
            case 11:
                i = "vtt";
                break;
            case 10:
            case 13:
            case 14:
                i = "slidepuzzle_new";
                break;
            case 15:
                i = "slidepuzzle_opt";
                break;
            case 26:
                i = "drag";
                break;
            case 28:
                i = "dy"
            }
            return i
        },
        setPopPosition: function(e, t, i, r) {
            var a = 0
              , n = 0
              , o = l()
              , s = c();
            return r && r.width || (a = Math.floor((s - i - 2) / 2),
            n = Math.floor((o - t - 2) / 2)),
            f(e, {
                top: a + "px",
                left: n + "px",
                width: t + "px",
                height: i + "px"
            })
        },
        addClass: function(e, t) {
            var i = e.className
              , r = i + ("" != i ? " " : "") + t;
            e.className = r
        },
        removeClass: function(e, t) {
            var i = " " + e.className + " "
              , r = (i = i.replace(/(\s+)/gi, " ")).replace(" " + t + " ", " ");
            r = r.replace(/(^\s+)|(\s+$)/g, ""),
            e.className = r
        },
        isChrome75: m,
        isDarkMode: function() {
            return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        },
        isHighSafari: function() {
            var e = navigator.userAgent
              , t = /(iPod|iPhone|iPad)/.test(e)
              , i = /Mobile/.test(e)
              , r = /Safari/.test(e);
            if (t && i && r && /AppleWebKit/.test(e) && !/CriOS/.test(e)) {
                var a = e.match(/Version\/(\d+)\./);
                if (null === a || void 0 === a ? void 0 : a[1])
                    return parseInt(a[1], 10) > 15
            }
            return !1
        }
    }
}
, function(e, t, i) {
    "use strict";
    t.__esModule = !0,
    t.Topics = t.DragTopics = void 0;
    var r = function() {
        function e() {
            this.topics = {},
            this.subUid = -1
        }
        return e.prototype.subscribe = function(e, t) {
            this.topics[e] || (this.topics[e] = []);
            var i = (++this.subUid).toString();
            return this.topics[e].push({
                token: i,
                func: t
            }),
            i
        }
        ,
        e.prototype.publish = function(e, t) {
            if (!this.topics[e])
                return !1;
            for (var i = this.topics[e], r = i ? i.length : 0; r--; )
                i[r].func(e, t);
            return this
        }
        ,
        e.prototype.unsubscribe = function(e) {
            var t = this.topics;
            for (var i in t)
                if (t[i])
                    for (var r = 0, a = t[i].length; r < a; r++)
                        if (t[i][r].token === e)
                            return this.topics[i].splice(r, 1),
                            e;
            return this
        }
        ,
        e
    }();
    t["default"] = r,
    t.DragTopics = {
        OnPosChanged: "OnPosChanged"
    },
    t.Topics = {
        GetPrehandle: "GetPrehandle",
        HybridVerify: "HybridVerify",
        ReadyFunc: "ReadyFunc",
        Callback: "Callback",
        Refresh: "Refresh",
        RefreshMax: "RefreshMax",
        LimitCLose: "LimitCLose",
        IframeError: "IframeError",
        ExchangeAged: "ExchangeAged"
    }
}
, function(e, t, i) {
    "use strict";
    t.__esModule = !0;
    var r = "[CODE_VERIFY]"
      , a = "postMessage"in window
      , n = function() {
        function e(e, t, i) {
            var r = "";
            if (arguments.length < 2 ? r = "[Msger] error 1" : "object" != typeof e ? r = "[Msger] error 2" : "string" != typeof t && (r = "[Msger] error 3"),
            r)
                throw new Error(r);
            this.target = e,
            this.name = t,
            this.domain = i || "*"
        }
        return e.prototype.send = function(e) {
            if (a)
                this.target.postMessage(e, this.domain);
            else {
                var t = window.navigator[r + this.name];
                if ("function" != typeof t)
                    throw new Error("target callback function is not defined");
                t(e, window)
            }
        }
        ,
        e
    }()
      , o = function() {
        function e(e, t, i) {
            this.targets = {},
            this.name = e,
            this.listenFunc = [],
            this.domain = i || "",
            r = t || r,
            this.listenCb = this.initListen()
        }
        return e.prototype.addTarget = function(e, t, i) {
            var r = new n(e,t,i);
            this.targets[t] = r
        }
        ,
        e.prototype.initListen = function() {
            var e = this
              , t = function(t) {
                if (!e.domain || !t.origin || -1 !== t.origin.indexOf(e.domain) || "https://captcha.gtimg.com" === t.origin || "https://global.captcha.gtimg.com" === t.origin) {
                    "object" == typeof t && t.data && (t = t.data);
                    for (var i = 0; i < e.listenFunc.length; i++)
                        e.listenFunc[i](t)
                }
            };
            return a ? "addEventListener"in document ? window.addEventListener("message", t, !1) : "attachEvent"in document && window.attachEvent("onmessage", t) : window.navigator[r + this.name] = t,
            t
        }
        ,
        e.prototype.unlisten = function() {
            this.listenCb && (a ? "addEventListener"in document ? window.removeEventListener("message", this.listenCb) : "attachEvent"in document && window.detachEvent("onmessage", this.listenCb) : window.navigator[r + this.name] = null)
        }
        ,
        e.prototype.listen = function(e) {
            this.listenFunc.push(e)
        }
        ,
        e.prototype.clear = function() {
            this.listenFunc = []
        }
        ,
        e.prototype.send = function(e) {
            var t, i = this.targets;
            for (t in i)
                i.hasOwnProperty(t) && i[t].send(e)
        }
        ,
        e
    }();
    window.TCapMsg = o,
    t["default"] = o
}
, function(e, t, i) {
    "use strict";
    var r = this && this.__values || function(e) {
        var t = "function" == typeof Symbol && Symbol.iterator
          , i = t && e[t]
          , r = 0;
        if (i)
            return i.call(e);
        if (e && "number" == typeof e.length)
            return {
                next: function() {
                    return e && r >= e.length && (e = void 0),
                    {
                        value: e && e[r++],
                        done: !e
                    }
                }
            };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }
    ;
    t.__esModule = !0,
    t.ErrorHandler = t.ErrorTypes = void 0;
    var a = i(2);
    t.ErrorTypes = {
        RAINBOW_PARSE_ERROR: 101,
        PREHANDLE_RATE_LIMIT: 70,
        REFRESH_RATE_LIMIT: 71,
        VERIFY_RATE_LIMIT: 72,
        DY_LOAD_FAIL: 39,
        DRAG_JQUERY_FAIL: 37,
        DY_JQUERY_FAIL: 37,
        DRAG_WEBSERVER_JS_LOAD: 36,
        DY_WEBSERVER_JS_LOAD: 36,
        IFRAME_FULL_CREATE_ERROR: 35,
        NOT_NUMBER_TYPE: 34,
        IFRAME_CREATE_TIMEOUT: 33,
        PRELOAD_TEMPLATE_LOAD_ERROR: 32,
        DRAG_REFRESH_ERROR: 31,
        DY_REFRESH_ERROR: 31,
        DRAG_VERIFY_ERROR: 30,
        DY_VERIFY_ERROR: 30,
        DRAG_IMG_ERROR: 29,
        DY_IMG_ERROR: 29,
        DRAG_JS_ERROR: 28,
        DY_JS_ERROR: 28,
        DRAG_JS_DOWNLOAD_ERROR: 27,
        DY_JS_DOWNLOAD_ERROR: 27,
        IFRAME_POPUP_CREATE_ERROR: 26,
        IFRAME_CREATE_ERROR: 25,
        ERROR_TYPE_TDC_RUN_RETRY_SUCCESS: 23,
        ERROR_TYPE_TDC_DOWNLOAD_RETRY_SUCCESS: 22,
        ERROR_TYPE_TDC_RUN_FAIL: 21,
        ERROR_TYPE_TDC_DOWNLOAD_FAIL: 20,
        CALLBACK_NAME: 19,
        ERROR_TYPE_FRAMEJS_CODE_ERROR: 18,
        ERROR_TYPE_JSONP_PREHANDLE: 17,
        ERROR_TYPE_FRAMEJS_DOWNLOAD_FAIL: 16,
        ERROR_SLIDE_JS_DOWNLOAD_ERROR: 15,
        ERROR_TYPE_TOUCH_CANCEL: 14,
        ERROR_TYPE_TWICE_IMAGE_ONERROR: 13,
        ERROR_TYPE_CGI_IMAGE_ONERROR: 12,
        ERROR_TYPE_IMAGE_ONERROR: 11,
        ERROR_TYPE_AJAX_GETSIG: 9,
        ERROR_TYPE_AJAX_VERIFY: 8,
        ERROR_TYPE_IMAGE_BEYONDSIZE: 7,
        ERROR_TYPE_MB_FP_REGISTER_TIMEOUT: 6,
        ERROR_TYPE_MB_FPJS_DOWNLOAD_FAIL: 5,
        ERROR_TYPE_PC_FP_REGISTER_TIMEOUT: 4,
        ERROR_TYPE_PC_FPJS_DOWNLOAD_FAIL: 3,
        ERROR_TYPE_BADJS_DOWNLOAD_FAIL: 2,
        ERROR_TYPE_BADJS_REPORT: 1
    };
    var n = function() {
        function e() {
            this.sentMsg = {},
            this.sendQueue = [],
            this.initParam = "",
            this.isAllowToReport = !1
        }
        return e.prototype.init = function(e) {
            var t = a.getLogCommonParams()
              , i = ["appid=" + e.appid, "sid=" + (e.sid || ""), "uid=" + (e.uid || ""), "err_type=" + (e.errType || ""), "dyeid=" + (e.dyeid || "0")];
            this.initParam = t.join("&") + "&" + i.join("&")
        }
        ,
        e.prototype.openReport = function() {
            var e, t;
            if (this.isAllowToReport = !0,
            this.isAllowToReport)
                try {
                    for (var i = r(this.sendQueue), a = i.next(); !a.done; a = i.next()) {
                        var n = a.value;
                        this.send(n)
                    }
                } catch (o) {
                    e = {
                        error: o
                    }
                } finally {
                    try {
                        a && !a.done && (t = i["return"]) && t.call(i)
                    } finally {
                        if (e)
                            throw e.error
                    }
                }
        }
        ,
        e.prototype.sendError = function(e, i) {
            if (this.isAllowToReport) {
                i = i || t.ErrorTypes.ERROR_TYPE_BADJS_REPORT;
                var r = this.getErrorMsg(e);
                this.sentMsg[r] || (this.sentMsg[r] = !0,
                this.send({
                    errorType: i,
                    reason: r
                }))
            }
        }
        ,
        e.prototype.send = function(e) {
            if (this.isAllowToReport) {
                var i = (e = e || {
                    errorType: t.ErrorTypes.NOT_NUMBER_TYPE
                }).reason && e.reason.length > 1024 ? e.reason.substr(0, 1024) : e.reason;
                i = encodeURIComponent(i || ""),
                "number" != typeof e.errorType && (i += "err origin type " + e.errorType,
                e.errorType = t.ErrorTypes.NOT_NUMBER_TYPE);
                var r = (window.AqSCodeCapDomain || window.TCaptchaApiDomain || "") + "/cap_monitor?type=" + e.errorType + "&reason=" + i + "&" + this.initParam;
                (new Image).src = r
            } else
                this.sendQueue.push(e)
        }
        ,
        e.prototype.getErrorMsg = function(e) {
            var t = "";
            (null === e || void 0 === e ? void 0 : e.stack) && (t = e.stack.replace(/\n/gi, "").split(/\bat\b/).join("\n").replace(/\?[^:]+/gi, ""));
            try {
                var i = e.toString();
                t.indexOf(i) < 0 && (t = i + "@" + t)
            } catch (r) {}
            return t
        }
        ,
        e.prototype.initGlobalListener = function(e) {
            var i = this;
            e = e || t.ErrorTypes.ERROR_TYPE_BADJS_REPORT,
            "function" == typeof window.addEventListener ? addEventListener("error", function(t) {
                i.sendError(t.error, e)
            }) : window.onerror = function(t, r, a, n, o) {
                if (null !== o && void 0 !== o && o.stack)
                    i.sendError(o, e);
                else if ("string" != typeof t) {
                    var s = (t.target || {
                        src: ""
                    }).src || "";
                    i.send({
                        errorType: e,
                        reason: s
                    })
                } else
                    i.send({
                        errorType: e,
                        reason: t
                    })
            }
        }
        ,
        e
    }();
    t.ErrorHandler = n
}
, , , , , , , , function(e, t, i) {
    "use strict";
    e.exports = {
        SMART_VERIFY_SZ: {
            height: 8,
            width: 8
        },
        CONST_DEFAULT_SIZE: {
            width: 360,
            height: 360
        },
        CONST_SC_PS: {
            top: "0%",
            left: "0%"
        },
        threshold: 10,
        baseWidth: 320,
        CONST_PTR: {
            minHeight: 40,
            minWidth: 230
        },
        CONST_SLIDE_PTR: {
            height: 40,
            width: 300
        }
    }
}
, function(e, t, i) {
    "use strict";
    var r = function(e) {
        e = e;
        return function() {
            return window.document.getElementById(e)
        }
    }
      , a = function(e) {
        e = e;
        return function() {
            return function(e) {
                if (document.getElementsByClassName)
                    return document.getElementsByClassName(e);
                for (var t = document.getElementsByTagName("*"), i = /(^\s*)|(\s*$)/g, r = [], a = new RegExp("(^" + e + "\\s+|\\s+" + e + "\\s+|\\s+" + e + "$|^" + e + "$)"), n = 0; n < t.length; n++) {
                    var o = t[n].className.replace(i, "");
                    o && a.test(o) && r.push(t[n])
                }
                return r
            }(e)
        }
    }
      , n = r("tcaptcha_transform")
      , o = r("tcaptcha_container")
      , s = r("ticon_refresh")
      , d = r("transform_header")
      , l = r("transform_text")
      , c = r("transform_close")
      , p = r("transform_eicon")
      , u = r("transform_eb")
      , f = r("transform_eh")
      , h = a("dots_item")
      , m = r("t_verify")
      , g = r("verify_text")
      , y = r("verify_icon")
      , v = r("tcaptcha_iframe")
      , b = a("ticons");
    t.dom = {
        border: n,
        refIcon: s,
        ref1Text: d,
        ref2Text: l,
        popClose: c,
        fullBackIcon: p,
        fullBackText: u,
        fullHeader: f,
        dots: h,
        tVerify: m,
        verifyText: g,
        verifyIcon: y,
        tIframe: v,
        tIcons: b,
        container: o
    }
}
, , , , , , , , , , function(e, t, i) {
    "use strict";
    var r = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0,
    t.isGray = t.includeInPreoloadTemplate = t.addPopupStyle = t.getPopupIframeSizeAndPos = void 0;
    var a, n = r(i(80)), o = r(i(42)), s = r(i(31)), d = r(i(20))["default"].templateKeys;
    t.getPopupIframeSizeAndPos = function(e, t) {
        var i = n["default"][e].size[0]
          , r = n["default"][e].size[1]
          , a = s["default"].getWindowWidth()
          , d = s["default"].getWindowHeight()
          , l = t ? parseFloat(t) : 0;
        if (l > 0 && l <= 2 * i * 16) {
            var c = l / (16 * i)
              , p = Math.floor(1e4 * c) / 1e4;
            return i = i * p * 16 + 3,
            r = r * p * 16 + 3,
            {
                callReady: !0,
                windowWidth: a,
                windowHeight: d,
                sizeSC: {
                    width: Math.floor(i),
                    height: Math.floor(r)
                },
                posSC: {
                    top: "0px",
                    left: "0px"
                }
            }
        }
        var u = Math.min(a / o["default"].baseWidth)
          , f = Math.min(d / o["default"].baseWidth)
          , h = s["default"].isHorizontalNew() ? .85 * f : u
          , m = s["default"].getParentScale();
        h = (h = 0 === m || 1 === m ? h > 1.3 ? 1.3 : h : h > 2 ? 2 : h) < .85 ? .85 : h;
        var g = Math.floor(1e4 * h) / 1e4;
        if (i = i * g * 16 + 3,
        r = r * g * 16 + 3,
        !s["default"].isMobileUa) {
            var y = e + "_pc";
            i = n["default"][y].width,
            r = n["default"][y].height
        }
        var v = {
            width: 0,
            height: 0
        }
          , b = {
            left: "0",
            top: "0"
        };
        v.width = Math.floor(i),
        v.height = Math.floor(r);
        var w = d - r;
        b.top = w < 0 ? "0px" : Math.floor(w / 2) + "px";
        var _ = a - i;
        return b.left = n["default"][e].hasBorder ? Math.floor((_ - 2) / 2) + "px" : Math.floor(_ / 2) + "px",
        {
            windowWidth: a,
            windowHeight: d,
            sizeSC: v,
            posSC: b
        }
    }
    ,
    t.addPopupStyle = function() {
        var e, t, i = s["default"].computeBaseFontSize(), r = ".tcaptcha-transform{font-family:\"Helvtical,microsoft yahei,sans-serif\";-webkit-background-size:20% 20%;-o-background-size:20%;background-size:20%;background-position:50% 32%;background-color:#fff;-webkit-border-radius:.08rem;border-radius:.08rem;visibility:visible;z-index:2000000002;overflow:hidden}.tcaptcha-transform.chrome-75{overflow:auto!important;-webkit-border-radius:0!important;border-radius:0!important}.tcaptcha-transform.dark-mode{background-color:#232323}.tcaptcha-transform.dark-mode .ticons.show-icon{color:#fff}.tcaptcha-transform .ticons{position:absolute;visibility:hidden;z-index:-1}.tcaptcha-transform .ticons.show-icon{z-index:0;visibility:visible}.tcaptcha-transform .transform-eh.show-icon{z-index:-1}.tcaptcha-transform .ticon-refresh{height:rem2px(4);width:rem2px(4);left:0;right:0;margin:rem2px(6) auto;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAB4CAMAAAANIQqNAAABm1BMVEUAAAA9pf8Zif8chf8chf8dhv8chf8chf8chv8chf8chf8chf8chf8chf8fiP8chf8bhP8ehf8chf8Vif8chv8bhf8bhf8chf8bhf8chv8bhf8ah/8bhP8chf8chf8chf8dhf8chf8chf8bhf8dhv8chf8chf////8chf8chf8chv8dg/////8chf8chf8chv////8dhP8lhv8chv8chf////////8ahv9Xpf8bhf8bhf8bhv8bhf////////8bhP8giv////////8chP8bhf8chf////8bhv8chf////8chf////////8chP////////////////////////8chv/////////////7/f/J4v////////////////8fhf8chf/////6/P8miv9Amf+Gvv/x+P/j8P+o0f91tf9Knv8gh//q9P+z1//E3/++3f+Mwf9ssP9HnP85lf8zkv/2+v9jq/9apv9Qof8tj//9/v/O5f/I4v+72/+32P+w1f+Wx/99uv9xsv/d7f/X6f/S5/+q0v+gzP+ayf+jzv+pdUB1AAAAX3RSTlMAAgn9ZRHxxUi9+fLjrw6qNyDfBFI7hEXq0oocnm3003NqPk005tCMzcqkK8l3m2IgFgaTWVNBMf3XoF1UTGJBGNDFuZV+WyXtiVzbvLQnDgru4aWRbi8W9OzptJNnGRL7ICoAAAiSSURBVGjevJj5W5JBEMeHK0QOQUQLtZDK0kqz1LRS08zyqKye7nrmVbzAvNIsNbPL6s/O/b6yK8iZS59f2H2fgdl39jszu1DROKKt1c2uRs89N7P7nqfR1VzdGnXQf+FKKOL1cEY83kjoCpWUNnuFm3Pi9trbqET47C4bF4DNZfeRfvzXT3LBnLzuJ61YqpypL1l5+2pD2ZmAw0fkcwTOlDVcvV2ZGh5nlUWj+xOsOOaN+K2UAas/4j3GihO6ltB3niWV4WiQchCMhitZcr6Pjk5ts3r3QX9BahlUcaioPWr062XaddutVCBWe7dMy/q0fRjv7Bmnggk45Ya2B6kIgu1SNs4AKc5dNPboP0eFMZKMZSP0VKRyG5M7N0L7PBDuwcUHhRTdFjY5bv8nOVvsx9mkxSzQz/sNSf/z/OprYmCr++cu46izMWiCFvH+MgaUh2tnGXhq6AjUeBicvUZ0Do4nFhYnMMijgzI3g4ojNllHBQN3WQfcTq8wx6cx7KAcVJWzoLyejky9+VOxF3j/LjHuQgwe5RBiu81UX4g0EIIWNw3BHIO5PDKoMv13B0gLgW7m33A5y/vM5pRBmRk0p4M04XCuwuGPSd5n8gceXKZMXDD157KSNqwvIYAVlqxABq8z5r9Hu3/qNARLLPjwDR9LeNSZof41mfG3kkb6sQEJ3uP99FpMfCawCf10iBZTfz7SiFmC1lmwYBg/sZL1zDocMfPvLulkVLhaZMFXtReLYjianjHHUH9CpJMOKBCBX13D+D1K08Themgx+389aWVMOHrHgl0DmJN3YjiWWjbN+k9auQyfSMH4hmHyEal4qBbUutH/HETaJbgptx1sYbqZLkN0LlsN6eWibAJxA8gQzKV1hChaQB3p5SFk90kpAHwR80+Q4UOpwPPIQAfppUc4WUADWDOAWtGCGPbIHsgCO2lmWDiZ4j2WjQOgIE+J0XAyADhINwZJMwNyy78YJioTP4rRAJmcZkEZacYifGygD88bB5jHpmBoIeBEDyKguwrMoA0ZKayKZzOqEvj1BwB0Sg12GSl0QYWqJ9eJ+SkLAd2NYFtqULEsnm3LduDD/x+tpJ1e4WJXlh3FnDwb9go7O25xVtLOEMpOtgggMYaEnUtMB0k/HTLn1o0U1tEQk1twC1XYT/qBCLdkJ1DExbMtiDC5A5VSgtrTUCa9YjIlDb1iFqbsWGsaLjX4g6TIb5leiL5L53JNG/uFKIiTWIiy4QvDgD32IIEiLPOVYvTjEHIg649fUP98OdsIFG45LI+h3w5l4VTyRBIRMy9lofY4K074CBRsiXb8EwE/0AymJ+WRqCcpgUi2dtLEB2khULDlOBzG0koRQhIzkgcST64kvMmC8ubwfeSq7S5RUZZj6l68KxWAu8mfZDd24HvZyqAXKXqBiPpQr+8QFWU5pK4F/HUe8V9KyIsBziNRNKJscYWsazC+hGsrFWn5CsfiBIP48nLcHCZQhR4Ji9ZctwGEx20xRY5XpCIs1dXwF6exoy6H1WJena2wlAtFp4yLtRyAqx1OYenA3zTNOU+jYWbbjZRxsZbPzAvR4ipLVrcN8AwGrtyHodOXzqSOi7OEDsHaToxBbGfNAG8J4EIA81LRK1vA59nZxZnk7CkBswwEqJRgBQrlHyB9fFRSOkeNNL53URJ3iRcALG8gRcmvhJuSsIBKz9CTxwZ4/AQ3s/+8AHD5b/fm1pNGEMXxAQQWipI1FmpFNogYtFFrIKFeQ9KaPvXN5x7agpfQmxesqZoYY/RrF2aaGTPTmTNbN1vq722zgWHYnXP5n3M2t7Y2X/IlpUcQHmPUaPLLxL/5AQl+WWHHMERcWsXgl3PMEIXILJUCCEWY4hBxuLeWnFFY0DxkgVCEO0aJOrlayfSo8rlUprqGVPnkFUVAguBkgZJ+l5twicKKk6OP0kpqzd77z5GQjLMN90kkC9sbs80IIVG3MbFdSImA3Ebr86DPDKHog1JVxVVJp0FBpHnG2AnihIGF5ZQ8+KRMDFA9KMMvkcSEsgMDjtq3+4dg4GBv96aNKN5KJoalZsJYXrGs6rLdOwKFs9P2RUdEn8+IjHbDSHJKceUEv3O+1+4dnA3C++PDXnvvvNsS0J/3gmhQk3EkPecqZq+lcnLSUjkVCYpA3u8TsV8LgSLPhD5LfiDbeS49cS7RGPJ+lsxaQpVwg5Awrpr+ZgxxiPTgduzW/0p3g7jCWJNwEJlO3L9rWXEFfdaIljdqiosLlYtcbkb5AAPqejOYUJ8ALtW+B64oYFBDVCRalul9KQLExeosMHUb5QLMzj3iKd7KSq53gMmtGNfUCqWRYEh1PHjBIgdMajOz+woGlIgEvg5esmHNWd87xhP4CfNEjtZXRjykaOUA5fizfv1vQJmP693AnPZdw8t2JWD0Lv68/O0xMPJINAoTRMKycDnN3f5dV3n5rz4CwzOsH6eRW1Vz2GbQcK6cEV0o+3eXP6+73e7uzZe+Zz7jN0abRE8BWDCoAS9ejy0AwqIxsIvpXlH78n3dAwNrDjEQz9BAYIpI+GxgqKd0XdU1B8kGkKTBuoWjOf26CBKrSxuEgp2ipM7c+2xiaYzsjM6vViqV8blUIVdeIShP09TjIjLAOm/jCZq3LHdaJwhLvNoRLGOTyCFXW7kCJZpkRlqaPwirmY1E2cnJyCcwlHY+sX5RTlbCa2hkmbRsJrCWTi+olk5mPGOKoUCbWivBNLVW2Pp1ooC39ZbIgyn9/ipl/2E3NhOJ0Fu7ZUJvbvdPNLj2fsSk4AMO1TLxTbkKjATif+xGPJJOxNfuHfFJN6Ahl8ll+yGX5UndkIt/prJCHa3ZjfnUpDGf/3zQiQ7MeH8z6uVtSP9+4MNuDTce7a8bdxvGYbdHMe43DAOPQzDyOQxDr2Lsd4SN/RYBimzsd+QBY7+/AL2t7PuyoWBRAAAAAElFTkSuQmCC) no-repeat;-webkit-background-size:contain;-o-background-size:contain;background-size:contain}.tcaptcha-transform .transform-eicon{top:rem2px(1.375);left:rem2px(.5);width:rem2px(.625);height:rem2px(.625);border-style:solid;border-width:rem2px(.125) rem2px(.125) 0 0;border-color:#1a79ff;-webkit-transform-origin:75% 25% 0;-moz-transform-origin:75% 25% 0;-ms-transform-origin:75% 25% 0;-o-transform-origin:75% 25% 0;transform-origin:75% 25% 0;-webkit-transform:rotate(225deg);-moz-transform:rotate(225deg);-ms-transform:rotate(225deg);-o-transform:rotate(225deg);transform:rotate(225deg);-webkit-transition:.1s ease-in .1s;-o-transition:.1s ease-in .1s;-moz-transition:.1s ease-in .1s;transition:.1s ease-in .1s}.tcaptcha-transform .transform-eb{width:rem2px(3.2);height:rem2px(3.2);line-height:rem2px(3.2);font-size:rem2px(1);text-align:left;left:rem2px(1.9);color:#1a79ff}.tcaptcha-transform .transform-eb.middle-fontsize{font-size:rem2px(1.6)}.tcaptcha-transform .transform-eb.small-fontsize{font-size:rem2px(1.2)}.tcaptcha-transform .transform-eh{width:100%;height:rem2px(3.2);line-height:rem2px(3.2);margin:0;font-size:rem2px(1.3);text-align:center;font-weight:700;color:#333;border-bottom:.026667rem solid #e6e6e6;z-index:-2}.tcaptcha-transform .transform-eh.middle-fontsize{font-size:rem2px(1.1)}.tcaptcha-transform .transform-eh.small-fontsize{font-size:rem2px(1)}.tcaptcha-transform .transform-header{width:100%;font-size:rem2px(1.2);text-align:center;margin-top:rem2px(11)}.tcaptcha-transform .transform-text{width:100%;font-size:rem2px(1);text-align:center;padding-left:5%;padding-right:5%;margin-top:rem2px(13);word-break:break-all;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.tcaptcha-transform .transform-close{height:rem2px(1.5);width:rem2px(1.5);bottom:rem2px(1);right:rem2px(1);background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUiSURBVHgBxVrbbeM4FKUV5/HpDlZTwXgrGKeDTAUTA3kgyEfiCqJUsJ6PIE/AngoyHYxTQZwKVtOBv4Igzz0noQzqSqQkSus5gCCLpKh7yEveB91SDWA0GnUeHh42Wq1WF9dfKOri6ugrQYy6+PX19Q73W9xv9vb2YlUTLeUJCv38/Hzw9vbW46U8ACJTvDusQ6YygURwfPRQpUe4FkBm/PLyclyVSCUCl5eXR00LLhEEQbS9vX1ctn0pAqenp+HS0tI1prtra4O6CW7U7wlITtfW1mb9fn/GOs7a/f192G63Q9RxnXzB1XN8kmtlvcxsFBK4urr6hqkdqvxRn+FD3yHsMBG2LDgouPUw4ke4h3l94+rv7u7+dPXjJKBVJrJ0fozOh6oBgMymjUiRSlkJ2ISHqnxfXV2Nqo54EfSMRBD4m6xzkcglcH5+voHbdU7VoKlRtwHf5ibxjyzHGtzc2tr6IcszBDgSYHyr0jpPXf+KRTVRC8DJyUkXC/5Xjgx/y4UdyJchvHxRYd9fX5TwxP7+/pQDJoo73All2xQB6r3KLqQBO1QLhh6wgVnGbRwaEpllcxXSqvNvqhLWcWdnp6/+IM7OzoaQ48Aomq2srHxKNpG2URGJd2OadmUBCPdw62Faf4Kk1wwlfeAa24wWd7zHx0fuTIla03E8TORt6Y4yow9sYsf5Yflwqr1th3BBG8hx8qwt7ySvbc7ONJ+FZA30xDuxTXiNTfOBglAgVRJSeIsMc+it27Q7ySx8LGKM5oF4J1JuTGRBWRIW4TmLTpeBLoto/4X3QFvArmh84+qMU402mcVdRMImPPsqWkf0t8xnxiB0EjkDPVExKeMFos24CgmX8OxLFYD6Tk/XLGMUGDAMVGkCN6okypKoK7zR/s58puxt6P9nCG0W3qoKoABQQ66jkVmuScx/q5rCa9kmuJnrNQwgfGg2giC/VUW4ZqIp4fV7qXUCQp+5BkKzcHl5OVYesJHIEcJLeIJRnijqZJy5On5+EYk6whM5smUJ1AVm8M2nzhckkGLFvVV5wrbbJKhqsSXyZMsQwN7qRaBI+AR1SDw9PYWiKCaBzMpWFeHa530stg1yx8RzzG1UbpvrqgKKjFRVi+0Cc0qi6I4EUjNAw6ZKoqyFbYpE4sAloNENsLemvMDESSrqrKp7UJcEnU6ZRKbTGVicpENXZ8wa+FhYFwkdnbkg66d0OgPdQcqBy4kPlKjfkGVljZTD2PWU+5tHoujdvX4noH3tVMSjwzgbJuZDVQtrITG2tWfqUQmXJ4lZzKxEJFimov+cTkP1EVpOfHNGFxcXVMUNVx86/v5lEjCzJfOsBGcB0T9VZx7945mEBnkd66AnUjWgo7CijEakxOib2ZK5L8SRlnEncFigSv8rMEMHMtkLGVOnOJncKARmQCNj5IWmFgmdH5XBFbMln8yCjDeqc5IpvccoXFNf1YLALVUnd01QQzJeQoYApwcNpd53YERuF6FOWm0yCWagn5dssB5w5OxKHy94niYWgdZfbxqZQdJ6H+W95zxispEAYlxRQfauNDjqmOFI5ZzDuYQnCg/59GnNSOUf8sW4Ip+D6hLnzdT5QZGBLH3MKo1JpiP4U3RJ0G7KvxQwOWAeszJQQl2XDplO5fQcfU3R19dGjlkFEZtKNYV3W+RSGYnKfzVwnSbWgPd5s/efPYyDarofXjaCeVimMn0ET+BNwERCRudZGdGF+B0aTWYQlALS7/nNKJCBVBNnzf8BAIyvDgpbKEMAAAAASUVORK5CYII=) no-repeat;-webkit-background-size:contain;-o-background-size:contain;background-size:contain}.tcaptcha-iframe{z-index:2000000002;margin:auto}.tcaptcha-iframe.hide-iframe{visibility:hidden}.t-verify{z-index:2000000002;width:rem2px(8);height:rem2px(8);background:#fff;-webkit-border-radius:.08rem;border-radius:.08rem;left:0;top:0}.verify-icon{position:absolute;margin-top:rem2px(3.5)}.verify-icon.success-icon{width:rem2px(2.5);height:rem2px(2.5);left:0;right:0;margin:rem2px(2) auto;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAzFBMVEUAAAAs0AAu1AAs0AAr0AAq1QAs0AAt0AAs0AAs0AAr0AAq0wAs0AAq0QAs0AAs0AAs0AAs0AAr0AAs0AAr0AAs0AAr0QAs0QAs0AApygAs0AAs0AAs0AAs0AAs0QAr0QAt0gAs0AAt0QAtzwAq0QArzwAs0AAqzQAs0QAs0AAs0AAs0AD////l+d/8/vty4FVG1iCI5W/X989G1h881BNy31My0gd34Vr5/vjt++qk65Gd6omO5naB42Za2jdL1ybR9cjA8bNp3kpZ2jY9PuX7AAAAK3RSTlMA/APuFwfUZln0OxLIVEbr49vZzsKxmW1MDvmsqIxpXiGejlA3NGgk1pyDVbbBQAAAArxJREFUaN7Nmody2kAURZ9QQRIyTTTRDDauV3GsFNzjlP//p8CQjAZLwLY3w/mAc9EWZvftIzGS8HIyitp2AAR2OxpNLsOETFHzex5K8Hp+Td/u9DsWdmJ1+o6OvTLoWjiA1R1UFPVutQ0h2lVX5ddXmxCmWZX+ijCGFHEot3BuIM1cYkmd21DAPhcd/TMociY0E7MIysQzgdltQIPGxSH/yRBaBPX9/lMLmgz9vX4Y4HTP+FgwgHWyy78IYIThYsf6bMAQjasyvxvDGLFLRW5gkHnJBMMohYl2bBjFdmibMQwz3vbXYZz61j+0B+N4FcqpgoFq7nebYKDpFj6A6xMqLbDQ+j8LAzAxoA1dMNH9t4kt6PL+/Ov5DwpYm+3chy7fH9M0vctQoE9rOtr+u3TN3Ts+0ln7a5a+f8NrcYzWx0nflD99QQF/FdAz5U8fUKC3CvCgw+fc/2WJAh5RYsr/6R4lJHTB6kdIPqsfU7pl9WNCY1Y/RhSx+hFRCzv4/fPx6Xmp6UeLbJTzsFnb3/T8sClAKcunNE9Q9yMglPMjTfMEdT+wOyBP0PFjzxDlCRr+YN8k5wnKfti7l2lWSFDwo0URhBIU/YhoDLEENT9GdAvBhIL/KwSYkA/RBBU/pnQB4QQFP0JKIJzwJu9HQuQJJ6Tyfk/g2JJp+NETOXhl6n74QkfHTNlv1cQOv5miHx3R43um5kdf+AKSKfktR/wKlSn40ZW5BL49rvealB8DqWvs/evLwxIytCrMF/FL9lICdzGEvZzDXZBiLqmN2IuC7GXNAnMYZM5cWvZcKuGKqTiesxjCCMGC94FiWGd+YvG5H4m4n7nYH+oOMouhTDwjAVz1x1L3OJ57VzhjSDN2SIa6Bym8+rE1Daxwp6JtD1P3OBs3+FtP8uaZa5RwnTfP6JOE0+32n6lo+89fOWa8/GcTqREAAAAASUVORK5CYII=);-webkit-background-size:contain;-o-background-size:contain;background-size:contain}.dots_item{width:rem2px(.75);height:rem2px(.75);margin-right:rem2px(.375)}.dots_item.show-none{display:none!important}.verify-text{position:absolute;width:100%;font-size:rem2px(1);text-align:center;line-height:rem2px(1.375);margin-top:rem2px(5.25);z-index:-1}.verify-text.little-fontsize{font-size:rem2px(.8)}".replace(/rem2px\((.*?)\)/g, function(e, t) {
            return i * parseFloat(t) + "px"
        });
        window.addEventListener && document.querySelector || (r += ".tcaptcha-transform .ticon-refresh{background: url(https://captcha.gtimg.com/public/res/tcaptcha-icons-merge.34d219bf.png) no-repeat;background-position: 0px 0px;*left:148px;}.tcaptcha-transform .transform-close{background: url(https://captcha.gtimg.com/public/res/tcaptcha-icons-merge.34d219bf.png) no-repeat;background-position: -51px -75px;}");
        var n = "style-" + Math.floor(1e7 * Math.random())
          , o = document.createElement("style");
        o.id = n,
        o.type = "text/css",
        o.setAttribute("ignore", "true");
        var d = document.getElementsByTagName("head");
        null === (e = null === d || void 0 === d ? void 0 : d.item(0)) || void 0 === e || e.appendChild(o),
        a && (null === (t = null === d || void 0 === d ? void 0 : d.item(0)) || void 0 === t || t.removeChild(a)),
        a = o,
        o.styleSheet ? o.styleSheet.cssText = r : o.innerHTML = r
    }
    ,
    t.includeInPreoloadTemplate = function(e) {
        for (var t = 0; t < d.length; t++)
            if (d[t] === e)
                return !0;
        return !1
    }
    ,
    t.isGray = function() {
        if (window.__TencentCaptchaOpts__) {
            var e = window.__TencentCaptchaOpts__.dyeid;
            if (e && "0" !== e)
                return !0
        }
        return !1
    }
}
, , , , function(e, t) {
    e.exports = function(e) {
        var t = [];
        return t.toString = function() {
            return this.map(function(t) {
                var i = function(e, t) {
                    var i = e[1] || ""
                      , r = e[3];
                    if (!r)
                        return i;
                    if (t && "function" == typeof btoa) {
                        var a = (o = r,
                        "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */")
                          , n = r.sources.map(function(e) {
                            return "/*# sourceURL=" + r.sourceRoot + e + " */"
                        });
                        return [i].concat(n).concat([a]).join("\n")
                    }
                    var o;
                    return [i].join("\n")
                }(t, e);
                return t[2] ? "@media " + t[2] + "{" + i + "}" : i
            }).join("")
        }
        ,
        t.i = function(e, i) {
            "string" == typeof e && (e = [[null, e, ""]]);
            for (var r = {}, a = 0; a < this.length; a++) {
                var n = this[a][0];
                "number" == typeof n && (r[n] = !0)
            }
            for (a = 0; a < e.length; a++) {
                var o = e[a];
                "number" == typeof o[0] && r[o[0]] || (i && !o[2] ? o[2] = i : i && (o[2] = "(" + o[2] + ") and (" + i + ")"),
                t.push(o))
            }
        }
        ,
        t
    }
}
, , , function(e, t) {
    var i = {}
      , r = function(e) {
        var t;
        return function() {
            return void 0 === t && (t = e.apply(this, arguments)),
            t
        }
    }
      , a = r(function() {
        return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
    })
      , n = r(function() {
        return document.head || document.getElementsByTagName("head")[0]
    })
      , o = null
      , s = 0;
    function d(e, t) {
        for (var r = 0; r < e.length; r++) {
            var a = e[r]
              , n = i[a.id];
            if (n) {
                n.refs++;
                for (var o = 0; o < n.parts.length; o++)
                    n.parts[o](a.parts[o]);
                for (; o < a.parts.length; o++)
                    n.parts.push(u(a.parts[o], t))
            } else {
                var s = [];
                for (o = 0; o < a.parts.length; o++)
                    s.push(u(a.parts[o], t));
                i[a.id] = {
                    id: a.id,
                    refs: 1,
                    parts: s
                }
            }
        }
    }
    function l(e) {
        for (var t = [], i = {}, r = 0; r < e.length; r++) {
            var a = e[r]
              , n = a[0]
              , o = {
                css: a[1],
                media: a[2],
                sourceMap: a[3]
            };
            i[n] ? i[n].parts.push(o) : t.push(i[n] = {
                id: n,
                parts: [o]
            })
        }
        return t
    }
    function c(e, t) {
        var i = Array.prototype.slice.call(arguments, 2);
        return function() {
            var r = Array.prototype.slice.call(arguments);
            e.apply(t, i.concat(r))
        }
    }
    function p() {
        var e = document.createElement("style")
          , t = n();
        return e.type = "text/css",
        t.appendChild(e),
        e
    }
    function u(e, t) {
        var i, r, a, d, l;
        if (t.singleton) {
            var u = s++;
            i = o || (o = p()),
            r = c(m, null, i, u, !1),
            a = c(m, null, i, u, !0)
        } else
            e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (d = document.createElement("link"),
            l = n(),
            d.rel = "stylesheet",
            l.appendChild(d),
            r = c(y, null, i = d),
            a = function() {
                i.parentNode.removeChild(i),
                i.href && URL.revokeObjectURL(i.href)
            }
            ) : (i = p(),
            r = c(g, null, i),
            a = function() {
                i.parentNode.removeChild(i)
            }
            );
        return r(e),
        function(t) {
            if (t) {
                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap)
                    return;
                r(e = t)
            } else
                a()
        }
    }
    e.exports = function(e, t) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document)
            throw new Error("The style-loader cannot be used in a non-browser environment");
        "undefined" == typeof (t = t || {}).singleton && (t.singleton = a());
        var r = l(e);
        return d(r, t),
        function(e) {
            for (var a = [], n = 0; n < r.length; n++) {
                var o = r[n];
                (s = i[o.id]).refs--,
                a.push(s)
            }
            e && d(l(e), t);
            for (n = 0; n < a.length; n++) {
                var s;
                if (0 === (s = a[n]).refs) {
                    for (var c = 0; c < s.parts.length; c++)
                        s.parts[c]();
                    delete i[s.id]
                }
            }
        }
    }
    ;
    var f, h = (f = [],
    function(e, t) {
        var i = [];
        f[e] = t;
        for (var r = 0; r < f.length; r++)
            f[r] && i.push(f[r]);
        return i.join("\n")
    }
    );
    function m(e, t, i, r) {
        var a = i ? "" : r.css;
        if (e.styleSheet)
            e.styleSheet.cssText = h(t, a);
        else {
            var n = document.createTextNode(a)
              , o = e.childNodes;
            o[t] && e.removeChild(o[t]),
            o.length ? e.insertBefore(n, o[t]) : e.appendChild(n)
        }
    }
    function g(e, t) {
        var i = t.css
          , r = t.media;
        t.sourceMap;
        if (r && e.setAttribute("media", r),
        e.styleSheet)
            e.styleSheet.cssText = i;
        else {
            for (; e.firstChild; )
                e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(i))
        }
    }
    function y(e, t) {
        var i = t.css
          , r = (t.media,
        t.sourceMap);
        r && (i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
        var a = new Blob([i],{
            type: "text/css"
        })
          , n = e.href;
        e.href = URL.createObjectURL(a),
        n && URL.revokeObjectURL(n)
    }
}
, , , , , , , , , , , , , , , , , function(e, t, i) {
    "use strict";
    var r = this && this.__createBinding || (Object.create ? function(e, t, i, r) {
        r === undefined && (r = i),
        Object.defineProperty(e, r, {
            enumerable: !0,
            get: function() {
                return t[i]
            }
        })
    }
    : function(e, t, i, r) {
        r === undefined && (r = i),
        e[r] = t[i]
    }
    )
      , a = this && this.__setModuleDefault || (Object.create ? function(e, t) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: t
        })
    }
    : function(e, t) {
        e["default"] = t
    }
    )
      , n = this && this.__importStar || function(e) {
        if (e && e.__esModule)
            return e;
        var t = {};
        if (null != e)
            for (var i in e)
                "default" !== i && Object.prototype.hasOwnProperty.call(e, i) && r(t, e, i);
        return a(t, e),
        t
    }
      , o = this && this.__values || function(e) {
        var t = "function" == typeof Symbol && Symbol.iterator
          , i = t && e[t]
          , r = 0;
        if (i)
            return i.call(e);
        if (e && "number" == typeof e.length)
            return {
                next: function() {
                    return e && r >= e.length && (e = void 0),
                    {
                        value: e && e[r++],
                        done: !e
                    }
                }
            };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }
      , s = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0;
    var d = s(i(31))
      , l = s(i(78))
      , c = n(i(32))
      , p = i(29)
      , u = i(0);
    i(17),
    i(90);
    var f = i(42)
      , h = i(18)
      , m = i(92)
      , g = u.getWxLang()
      , y = i(19)
      , v = null
      , b = !1;
    window.AqSCode || (v = window.setTimeout(function() {
        var e = window.__TencentCaptchaOpts__ || {}
          , t = e.appid
          , i = void 0 === t ? "" : t
          , r = e.type
          , a = void 0 === r ? "" : r
          , n = e.ele
          , o = void 0 === n ? undefined : n;
        try {
            var s = p.getTemplateDomain();
            s !== undefined && ("inline" === a && o ? p.injectTemplate("dy", s, o) : p.injectTemplate("dy", s),
            b = !0)
        } catch (l) {
            var d = y.perfectStack(l);
            y.send("IFRAME_PRELOAD_FAIL", i, d)
        }
    }, 200));
    var w, _ = null, T = function() {
        function e(e) {
            this.capDomain = "",
            this.ticket = "",
            this.randstr = "",
            this.listenFunc = [],
            this.preHandleLoadTime = 0,
            this.createIframeStart = 0,
            this.calledCallback = !1,
            this.destroyed = !1,
            this.aged = !1,
            this.enableAged = !1,
            this.version = "1.1.0",
            this.readyFunc = function() {}
            ;
            var t = {
                ele: document.body,
                src: "",
                uid: "",
                capcd: "",
                startFn: function() {},
                endFn: function() {}
            };
            this.opts = u.extend({}, t, e),
            this.enableAged = !!this.opts.enableAged,
            this.aged = "force" === this.opts.enableAged,
            this.extendOptionParam(),
            this.listenFunc = [],
            this.ticket = "",
            this.randstr = "",
            this.readyFunc = function() {}
            ;
            var i = this.initIframeSubscription()
              , r = this.getInitOptions();
            this.iframeManager = new l["default"](u.extend({}, r, {
                appid: this.opts.appid,
                sdkOpts: this.opts.sdkOpts,
                type: this.opts.type,
                src: this.opts.src,
                inDarkMode: "force" === this.opts.enableDarkMode || this.opts.enableDarkMode && u.isDarkMode() || !1,
                themeColor: this.opts.themeColor,
                domain: this.opts.domain,
                lang: this.opts.lang,
                fwidth: this.opts.fwidth,
                pos: this.opts.pos,
                params: this.opts.params,
                showHeader: !1 !== this.opts.showHeader,
                clientype: "" + this.opts.clientype,
                showLoading: !1 !== this.opts.loading,
                global: !!this.opts.global,
                captchaWidth: this.opts.captchaWidth
            }),i,this.opts.tracker),
            _ = this,
            y.setGlobalStatus(!!this.opts.global)
        }
        return e.prototype.create = function() {
            "number" == typeof v && clearTimeout(v),
            _ && (this.calledCallback = !1,
            this.iframeManager.preCreate())
        }
        ,
        e.prototype.destroy = function() {
            this.iframeManager.destroy(),
            this.destroyed = !0,
            _ && (this.listenFunc = [],
            this.listenFunc.length = 0,
            this.readyFunc = function() {}
            ,
            _ = null)
        }
        ,
        e.prototype.refresh = function(e) {
            this.iframeManager.clearContainerAndEl(),
            _ && (this.ticket = "",
            this.randstr = "",
            e && u.isObject(e) && ("undefined" != typeof e.uin && (this.opts.uid = e.uin),
            "undefined" != typeof e.uid && (this.opts.uid = e.uid),
            "undefined" != typeof e.capcd && (this.opts.capcd = e.capcd)),
            this.create())
        }
        ,
        e.prototype.listen = function(e, t) {
            this.listenFunc = [],
            this.listenFunc.push(e),
            this.readyFunc = function() {}
            ,
            t && (this.readyFunc = t)
        }
        ,
        e.prototype.getTicket = function() {
            return {
                ticket: this.ticket,
                randstr: this.randstr
            }
        }
        ,
        e.prototype.start = function(e) {
            this.opts.startFn = e
        }
        ,
        e.prototype.end = function(e) {
            this.opts.endFn = e
        }
        ,
        e.prototype.setAged = function(e) {
            this.aged = e
        }
        ,
        e.prototype.initIframeSubscription = function() {
            var e = this
              , t = new c["default"];
            return t.subscribe(c.Topics.GetPrehandle, function(t, i) {
                e.handlePreHandleMsg(i)
            }),
            t.subscribe(c.Topics.HybridVerify, function(t, i) {
                e.startPreHandle(i)
            }),
            t.subscribe(c.Topics.ReadyFunc, function(t, i) {
                e.readyFunc && e.readyFunc(i)
            }),
            t.subscribe(c.Topics.Callback, function(t, i) {
                e.calledCallback || (e.calledCallback = !0,
                0 === i.ret && e.opts.startFn(),
                "ticket"in i && (e.ticket = i.ticket,
                e.randstr = i.randstr),
                e.executeCallback(i))
            }),
            t.subscribe(c.Topics.Refresh, function() {
                e.refresh()
            }),
            t.subscribe(c.Topics.ExchangeAged, function(t, i) {
                e.setAged(i),
                e.create()
            }),
            t
        }
        ,
        e.prototype.extendOptionParam = function() {
            var e, t = this.opts, i = t.userLanguage, r = t.forceLang;
            r && (e = {
                2052: "zh-cn",
                1028: "zh-hk",
                1033: "en"
            }[r]),
            i && "string" == typeof i ? this.opts.params = u.addUrlParam(this.opts.params, {
                userLanguage: u.langTransform(i)
            }) : e && "string" == typeof e && (this.opts.params = u.addUrlParam(this.opts.params, {
                userLanguage: u.langTransform(e)
            }))
        }
        ,
        e.prototype.handlePreHandleMsg = function(e) {
            var t = this;
            switch (e) {
            case "init":
                this.startPreHandle();
                break;
            case "refreshMax":
                this.getPreHandleNew({
                    success: function(e) {
                        if (e.ticket)
                            t.iframeManager.onSuccess({
                                ticket: e.ticket,
                                randstr: e.randstr
                            });
                        else {
                            var i = t.getIframeSrcNew(e)
                              , r = d["default"].getCaptchaType(e.subcapclass);
                            t.iframeManager.frequencyLimit({
                                sid: e.sid,
                                src: i,
                                captype: r,
                                fwidth: t.opts.fwidth
                            })
                        }
                    }
                });
                break;
            case "sessionTimeout":
                this.refresh()
            }
        }
        ,
        e.prototype.getInitOptions = function() {
            var e = u.extend({}, f.CONST_DEFAULT_SIZE)
              , t = u.extend({}, f.CONST_SC_PS)
              , i = this.opts.ele
              , r = document.body;
            return i && i !== document && (r = i),
            "popup" === this.opts.type && (r = document.body),
            {
                ele: r,
                sizeSC: e,
                posSC: t
            }
        }
        ,
        e.prototype.executeCallback = function(e) {
            var t = this;
            try {
                this.opts.endFn()
            } catch (i) {}
            window.CollectGarbage && window.CollectGarbage();
            try {
                delete e.type
            } catch (r) {}
            setTimeout(function() {
                var r, a;
                try {
                    for (var n = o(t.listenFunc), s = n.next(); !s.done; s = n.next()) {
                        var d = s.value;
                        try {
                            d(e)
                        } catch (i) {}
                    }
                } catch (l) {
                    r = {
                        error: l
                    }
                } finally {
                    try {
                        s && !s.done && (a = n["return"]) && a.call(n)
                    } finally {
                        if (r)
                            throw r.error
                    }
                }
            }, 0)
        }
        ,
        e.prototype.startPreHandle = function(e) {
            var t = this;
            this.getPreHandleNew({
                sess: e,
                success: function(e) {
                    var i;
                    if (!t.destroyed)
                        if (e.ticket)
                            t.iframeManager.onSuccess({
                                ticket: e.ticket,
                                randstr: e.randstr
                            });
                        else {
                            t.createIframeStart = (new Date).getTime(),
                            t.opts.appid;
                            var r = t.getIframeSrcNew(e)
                              , a = d["default"].getCaptchaType(e.subcapclass);
                            t.iframeManager.create({
                                preloadOption: {
                                    inDarkMode: "force" === t.opts.enableDarkMode || t.opts.enableDarkMode && u.isDarkMode(),
                                    aged: !!t.aged,
                                    enableAged: t.enableAged,
                                    noHeader: !1 === t.opts.showHeader,
                                    sess: e.sess,
                                    sid: e.sid,
                                    uip: e.uip || "",
                                    subcapclass: e.subcapclass,
                                    clientype: "" + t.opts.clientype,
                                    aid: t.opts.appid,
                                    fb: "" + t.opts.fb == "1",
                                    fbUrl: t.opts.fbUrl,
                                    type: t.opts.type,
                                    global: !!t.opts.global,
                                    deviceID: t.opts.deviceID ? t.opts.deviceID : undefined,
                                    apiDomain: window.AqSCodeCapDomain,
                                    isPreload: b,
                                    captchaShowStart: t.opts.captchaShowStart,
                                    trackerReady: null === (i = t.opts.tracker) || void 0 === i ? void 0 : i.getIsReady(),
                                    referrer: u.getEntryUrl(),
                                    dyeid: t.opts.dyeid ? t.opts.dyeid : "0",
                                    isNewEntry: !!t.opts.isNewEntry
                                },
                                preloadData: e.data,
                                preloadExtra: e.extra,
                                src: r,
                                captype: a,
                                fwidth: t.opts.fwidth,
                                sid: e.sid
                            })
                        }
                }
            })
        }
        ,
        e.prototype.getPreHandleNew = function(e) {
            var t = this
              , i = this.getType()
              , r = m(i)
              , a = e.triedTimes || 0
              , n = (new Date).getTime()
              , o = setTimeout(function() {
                y.send("ERROR_TYPE_JSONP_PREHANDLE", t.opts.appid, r),
                t.iframeManager.preHandleError()
            }, 2e4);
            h({
                url: r,
                data: {
                    sess: e.sess || ""
                },
                success: function(i) {
                    if (217 === i.state)
                        return y.send("PREHANDLE_RATE_LIMIT", t.opts.appid, "prehandle rate limit"),
                        t.iframeManager.initSid(i.sid),
                        void t.iframeManager.preHandleRateLimit();
                    t.preHandleLoadTime = (new Date).getTime() - n,
                    clearTimeout(o),
                    e.success(i)
                },
                error: function() {
                    y.send("ERROR_TYPE_JSONP_PREHANDLE", t.opts.appid, r),
                    (a += 1) < 3 ? (e.triedTimes = a,
                    t.getPreHandleNew(e)) : t.iframeManager.preHandleError()
                }
            })
        }
        ,
        e.prototype.getType = function() {
            var e, t = this.opts.domain + "/" + this.opts.gettype + this.opts.params, i = u.getBrowserLang(), r = u.getWebworkerSupportCache();
            r && (e = r),
            e || (e = this.checkWebWorker(),
            u.setWebworkerSupportCache(e));
            var a = {
                aged: this.aged ? "1" : "0",
                cap_cd: this.opts.capcd,
                uid: this.opts.uid,
                lang: u.langTransform(i || (this.opts.global ? "en" : "zh-cn")),
                entry_url: u.cutUrl(u.getEntryUrl()),
                elder_captcha: this.aged ? "1" : "0",
                js: this.opts.frameJs || "",
                login_appid: this.opts.login_appid || "",
                wb: e,
                version: this.version
            };
            return t = u.addUrlParam(t, a)
        }
        ,
        e.prototype.checkWebWorker = function() {
            if (void 0 !== w)
                return w;
            w = "2";
            try {
                var e = u.isWebWorkerSupport();
                return (null === e || void 0 === e ? void 0 : e.terminate) && !window.setImmediate ? (null === e || void 0 === e || e.terminate(),
                w = "1",
                "1") : (null === e || void 0 === e || e.terminate(),
                "2")
            } catch (t) {
                return "2"
            }
        }
        ,
        e.prototype.getIframeSrcNew = function(e) {
            if (!e.src_1)
                return "";
            var t = "";
            t = this.opts.domain + "/" + e.src_1 + this.opts.params;
            var i = {
                sess: e.sess,
                fwidth: this.opts.fwidth,
                sid: e.sid,
                forcestyle: this.opts.forcestyle,
                wxLang: g,
                tcScale: d["default"].getParentScale(),
                uid: this.opts.uid,
                cap_cd: this.opts.capcd,
                rnd: Math.floor(1e6 * Math.random()),
                TCapIframeLoadTime: this.opts.TCapIframeLoadTime,
                prehandleLoadTime: this.preHandleLoadTime,
                createIframeStart: this.createIframeStart,
                aged: this.aged ? "1" : "0",
                global: this.opts.global ? "1" : "0"
            };
            return t = u.addUrlParam(t, i),
            m(t)
        }
        ,
        e
    }();
    window.AqSCode = T
}
, function(e, t, i) {
    "use strict";
    var r = this && this.__assign || function() {
        return (r = Object.assign || function(e) {
            for (var t, i = 1, r = arguments.length; i < r; i++)
                for (var a in t = arguments[i])
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e
        }
        ).apply(this, arguments)
    }
      , a = this && this.__createBinding || (Object.create ? function(e, t, i, r) {
        r === undefined && (r = i),
        Object.defineProperty(e, r, {
            enumerable: !0,
            get: function() {
                return t[i]
            }
        })
    }
    : function(e, t, i, r) {
        r === undefined && (r = i),
        e[r] = t[i]
    }
    )
      , n = this && this.__setModuleDefault || (Object.create ? function(e, t) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: t
        })
    }
    : function(e, t) {
        e["default"] = t
    }
    )
      , o = this && this.__importStar || function(e) {
        if (e && e.__esModule)
            return e;
        var t = {};
        if (null != e)
            for (var i in e)
                "default" !== i && Object.prototype.hasOwnProperty.call(e, i) && a(t, e, i);
        return n(t, e),
        t
    }
      , s = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0;
    var d = s(i(79))
      , l = s(i(81))
      , c = s(i(82))
      , p = s(i(83))
      , u = s(i(86))
      , f = o(i(32))
      , h = s(i(31))
      , m = i(1)
      , g = i(10)
      , y = i(34)
      , v = i(53)
      , b = s(i(33))
      , w = s(i(87))
      , _ = i(43)
      , T = s(i(20))
      , S = i(29)
      , C = i(89)
      , E = i(2)
      , k = w["default"].langPack
      , R = w["default"].detectWxLang()
      , x = function() {
        function e(e, t, i) {
            this.capType = "defaultSize",
            this.createTimeoutTimer = null,
            this.sid = "",
            this.checkPreloadStatusTimeout = null;
            var r = new y.ErrorHandler;
            r.init({
                appid: e.appid,
                dyeid: window.__TencentCaptchaOpts__.dyeid || "0"
            }),
            r.openReport(),
            this.errorHandler = r;
            try {
                this.msgChannel = t,
                this.tracker = i,
                this.type = e.type,
                this.option = e,
                this.IframeMsg = new b["default"]("parent","",this.option.domain),
                this.langPack = this.initLang(e.params);
                var a = this.initIframeChildSubscription();
                switch (this.appid = e.appid,
                this.initPreloadTemplateTarget(),
                this.waitingShowQueue = null,
                e.type) {
                case "embed":
                    this.iframeTypeManager = new l["default"](e,a);
                    break;
                case "popup":
                    this.iframeTypeManager = new d["default"](e,a);
                    break;
                case "point":
                    this.iframeTypeManager = new p["default"](e,a);
                    break;
                case "inline":
                    this.iframeTypeManager = new u["default"](e,a);
                    break;
                default:
                    this.iframeTypeManager = new c["default"](e,a)
                }
            } catch (n) {
                this.onErrorTicket("FRAMEJS_RUN_ERROR", n)
            }
        }
        return e.prototype.preCreate = function(e) {
            var t, i = this;
            try {
                this.initListener(),
                this.preloadCheck(),
                null === (t = this.iframeTypeManager) || void 0 === t || t.preCreate(function() {
                    e ? i.msgChannel.publish(f.Topics.HybridVerify, e) : i.msgChannel.publish(f.Topics.GetPrehandle, "init")
                })
            } catch (r) {
                this.onErrorTicket("FRAMEJS_RUN_ERROR", r)
            }
        }
        ,
        e.prototype.create = function(e) {
            var t, i;
            (this.sid = e.sid,
            e.preloadData && v.includeInPreoloadTemplate(e.captype)) ? (this.isPreloadSameShowTypeAsLast(e.captype) && "embed" !== this.type || this.reloadTemplate(e.captype, this.type, this.option),
            "inline" === this.type && ((null === (t = S.getHtmlTemplateGroup().dy) || void 0 === t ? void 0 : t.ele) === (null === (i = window.__TCaptchaConfig__) || void 0 === i ? void 0 : i.ele) || this.reloadTemplate(e.captype, this.type, this.option)),
            this.preloadReady(e.captype) ? this.createIframe(e) : (this.checkTemplateStatus(e),
            this.pushPreloadQueue(e))) : this.createIframe(e)
        }
        ,
        e.prototype.destroy = function() {
            var e;
            this.clearContainerAndEl(),
            this.IframeMsg.clear(),
            this.clearCreateTimeout(),
            null === (e = this.iframeTypeManager) || void 0 === e || e.destroy()
        }
        ,
        e.prototype.onSuccess = function(e) {
            (null === e || void 0 === e ? void 0 : e.ticket) && (this.removeAllEl(),
            this.callbackExecutor(r({
                ret: 0
            }, e)),
            "point" === this.type && this.iframeTypeManager.success())
        }
        ,
        e.prototype.preHandleError = function() {
            this.onErrorTicket("GET_CAPTCHA_CONFIG_REQUEST_ERROR")
        }
        ,
        e.prototype.preHandleRateLimit = function() {
            this.onErrorTicket("RATE_LIMIT")
        }
        ,
        e.prototype.clearContainerAndEl = function() {
            this.removeAllEl(),
            "embed" !== this.type && "point" !== this.type || this.iframeTypeManager && (this.iframeTypeManager.ele.innerHTML = "")
        }
        ,
        e.prototype.frequencyLimit = function(e) {
            if ("popup" === this.type) {
                var t = v.getPopupIframeSizeAndPos(e.captype, "popup" === this.type && e.fwidth || "").sizeSC;
                this.iframeTypeManager.setSizeSc(t)
            }
            this.showRefreshDom(e.src)
        }
        ,
        e.prototype.initSid = function(e) {
            this.sid = e
        }
        ,
        e.prototype.initIframeChildSubscription = function() {
            var e = this
              , t = new f["default"];
            return t.subscribe(f.Topics.LimitCLose, function() {
                h["default"].removeIfExist("tcaptcha_transform"),
                h["default"].removeIfExist("t_mask"),
                e.callbackExecutor({
                    ret: T["default"].retCode.close,
                    ticket: "",
                    randstr: ""
                })
            }),
            t.subscribe(f.Topics.IframeError, function(t, i) {
                e.onErrorTicket("FRAMEJS_RUN_ERROR", i)
            }),
            t
        }
        ,
        e.prototype.onErrorTicket = function(e, t) {
            if (t) {
                var i = this.errorHandler.getErrorMsg(t) || "";
                this.errorHandler.send({
                    errorType: y.ErrorTypes.ERROR_TYPE_FRAMEJS_CODE_ERROR,
                    reason: i
                })
            }
            this.onSuccess(g.getErrorRes(e, this.option.appid, this.sid))
        }
        ,
        e.prototype.initPreloadTemplateTarget = function() {
            var e, t, i = S.getHtmlTemplateGroup();
            for (t in i)
                if (Object.prototype.hasOwnProperty.call(i, t)) {
                    var r = null === (e = i[t]) || void 0 === e ? void 0 : e.iframe.contentWindow;
                    r && this.IframeMsg.addTarget(r, t)
                }
        }
        ,
        e.prototype.preloadCheck = function() {
            var e, t = S.getHtmlTemplateGroup();
            for (e in t)
                if (Object.prototype.hasOwnProperty.call(t, e)) {
                    var i = this.IframeMsg.targets;
                    e in i && i[e].send(JSON.stringify({
                        message: {
                            type: T["default"].messageType.checkPreLoadReady
                        }
                    }))
                }
        }
        ,
        e.prototype.preloadReady = function(e) {
            var t = S.getHtmlTemplateGroup()[e];
            return !(null === t || void 0 === t || !t.load) && ("number" == typeof this.checkPreloadStatusTimeout && (clearTimeout(this.checkPreloadStatusTimeout),
            this.checkPreloadStatusTimeout = null),
            !0)
        }
        ,
        e.prototype.isPreloadSameShowTypeAsLast = function(e) {
            var t = S.getHtmlTemplateGroup()[e];
            return !t || "undefined" == typeof t.showType || this.type === (null === t || void 0 === t ? void 0 : t.showType)
        }
        ,
        e.prototype.pushPreloadQueue = function(e) {
            if (v.includeInPreoloadTemplate(e.captype)) {
                var t = e.captype;
                this.waitingShowQueue = {
                    type: t,
                    data: e
                }
            }
        }
        ,
        e.prototype.checkTemplateStatus = function(e, t) {
            var i = this;
            void 0 === t && (t = !1);
            var r = S.getHtmlTemplateGroup()
              , a = e.captype;
            if (!r[a]) {
                var n = S.getTemplateDomain();
                S.injectTemplate(a, n, ("embed" === this.type || "inline" === this.type) && this.option.ele || void 0)
            }
            this.checkPreloadStatusTimeout = window.setTimeout(function() {
                if (i.checkPreloadStatusTimeout = null,
                !i.preloadReady(a)) {
                    var r = window.AqSCodeCapDomain;
                    if (t || r === undefined)
                        return i.waitingShowQueue = null,
                        i.errorHandler.send({
                            errorType: y.ErrorTypes.IFRAME_CREATE_TIMEOUT,
                            reason: "iframe api domain load failed,tried:" + t + ",domain:" + r
                        }),
                        void i.onErrorTicket("PRE_TEMPLATE_LOAD_TIMEOUT");
                    try {
                        S.injectTemplate(a, r, ("embed" === i.type || "inline" === i.type) && i.option.ele || void 0)
                    } catch (n) {}
                    i.errorHandler.send({
                        errorType: y.ErrorTypes.IFRAME_CREATE_TIMEOUT,
                        reason: "iframe cdn domain load failed,tried:" + t + ",domain:" + r
                    }),
                    i.checkTemplateStatus(e, !0)
                }
            }, window.TCaptchaGlobal ? 15e3 : 1e4)
        }
        ,
        e.prototype.createIframe = function(e) {
            var t, i, a = this;
            try {
                var n = e.captype;
                this.capType = n,
                this.errorHandler.init({
                    appid: this.appid,
                    errType: null === (t = e.preloadOption) || void 0 === t ? void 0 : t.subcapclass,
                    dyeid: window.__TencentCaptchaOpts__.dyeid || "0"
                });
                var o = v.getPopupIframeSizeAndPos(e.captype, "popup" === this.type && e.fwidth || undefined)
                  , s = o.sizeSC
                  , d = o.posSC
                  , l = o.callReady
                  , c = r({
                    langPack: this.langPack,
                    sizeSC: s,
                    posSC: d
                }, e);
                if (e.preloadData && v.includeInPreoloadTemplate(n)) {
                    var p = S.getHtmlTemplateGroup();
                    c.preloadTemplate = p[n]
                }
                if (l) {
                    var u = s.width - 3
                      , m = s.height - 3;
                    this.msgChannel.publish(f.Topics.ReadyFunc, {
                        state: 2,
                        info: "",
                        fwidth: u,
                        fheight: m
                    })
                }
                null === (i = this.iframeTypeManager) || void 0 === i || i.create(c, function() {
                    var t, i, r, o, s;
                    if (c.preloadTemplate && c.preloadData && a.isInvisibleVerify(c.preloadData) && (c.preloadTemplate.wrapper.style.top = "-10000px"),
                    a.createTimeoutTimer = window.setTimeout(function() {
                        a.createTimeoutTimer = null,
                        a.onErrorTicket("IFRAME_LOAD_TIMEOUT")
                    }, 2e4),
                    e.preloadData) {
                        a.onReady({
                            type: 10,
                            loadstate: 0,
                            info: ""
                        }),
                        "popup" === a.type && a.iframeTypeManager.removePopupBorder(),
                        "embed" !== a.type && "inline" !== a.type || a.iframeTypeManager.removeLoading(),
                        c.preloadOption && (c.preloadOption.captchaShowStart = null === (t = e.preloadOption) || void 0 === t ? void 0 : t.captchaShowStart);
                        var d = null === (i = document.getElementById("tcaptcha_transform_dy")) || void 0 === i ? void 0 : i.getBoundingClientRect()
                          , l = [];
                        d && (l[0] = d.x !== undefined ? d.x : d.left,
                        l[1] = d.y !== undefined ? d.y : d.top),
                        null === (r = a.IframeMsg.targets[a.capType]) || void 0 === r || r.send(JSON.stringify({
                            message: {
                                type: T["default"].messageType.sendPreloadData,
                                data: e.preloadData,
                                extra: e.preloadExtra,
                                option: c.preloadOption,
                                speedList: E.getPerformance(/tcaptcha-frame\.[a-z0-9]{8}.js$|Captcha\.js$|TCapIframeApi\.js|cap_union_preload|cap_union_prehandle/),
                                iframeClientPos: l,
                                parentScale: h["default"].getParentScale()
                            }
                        }))
                    } else
                        (null === (s = null === (o = a.iframeTypeManager) || void 0 === o ? void 0 : o.securityIframe) || void 0 === s ? void 0 : s.contentWindow) && a.IframeMsg.addTarget(a.iframeTypeManager.securityIframe.contentWindow, n),
                        "embed" !== a.type && "inline" !== a.type || a.iframeTypeManager.removeLoading()
                }),
                this.type
            } catch (g) {
                this.onErrorTicket("FRAMEJS_RUN_ERROR", g)
            }
        }
        ,
        e.prototype.isInvisibleVerify = function(e) {
            return !e.dyn_show_info.instruction
        }
        ,
        e.prototype.initLang = function(e) {
            if (R)
                k.init(R);
            else {
                var t = /lang=([\d]{4})/.exec(e);
                t && k.init(t[1])
            }
            return k
        }
        ,
        e.prototype.initListener = function() {
            var e = this;
            this.IframeMsg.clear(),
            this.IframeMsg.listen(function(t) {
                var i, r;
                try {
                    r = JSON.parse(t)
                } catch (n) {
                    return
                }
                if (null === (i = null === r || void 0 === r ? void 0 : r.message) || void 0 === i ? void 0 : i.type) {
                    var a = r.message;
                    switch (a.type) {
                    case 3:
                        e.onSuccess(a);
                        break;
                    case 4:
                        e.onBack();
                        break;
                    case 7:
                        "popup" === e.type && e.iframeTypeManager.removePopupBorder();
                        break;
                    case 13:
                    case 6:
                        e.onClose();
                        break;
                    case 15:
                    case 11:
                        e.onRefreshMax(a);
                        break;
                    case 16:
                    case 12:
                        e.onSessionTiemout();
                        break;
                    case 8:
                        e.onHybridVerify(a.sess);
                        break;
                    case 10:
                        e.onReady(a);
                        break;
                    case 14:
                        e.onPointLoadDown();
                        break;
                    case T["default"].messageType.goAged:
                        e.clearContainerAndEl(),
                        e.msgChannel.publish(f.Topics.ExchangeAged, !0);
                        break;
                    case T["default"].messageType.goNormalVerify:
                        e.clearContainerAndEl(),
                        e.msgChannel.publish(f.Topics.ExchangeAged, !1);
                        break;
                    default:
                        e.preloadTemplateListener(a)
                    }
                }
            })
        }
        ,
        e.prototype.preloadTemplateListener = function(e) {
            var t, i, r;
            switch (e.type) {
            case T["default"].messageType.preloadReady:
                if (r = e.captype,
                S.getHtmlTemplateGroup()[r]) {
                    if (S.markTypeTemplateLoaded(r),
                    this.initPreloadTemplateTarget(),
                    !this.waitingShowQueue)
                        break;
                    this.waitingShowQueue.type === r && (this.createIframe(this.waitingShowQueue.data),
                    this.waitingShowQueue = null)
                }
                break;
            case T["default"].preloadMsgType.capClose:
                this.onClose();
                break;
            case T["default"].preloadMsgType.verifySuccess:
                this.onSuccess(e);
                break;
            case T["default"].preloadMsgType.sessionTimeout:
                this.onSessionTiemout();
                break;
            case T["default"].preloadMsgType.verifyStart:
                null === (t = this.IframeMsg.targets[this.capType]) || void 0 === t || t.send(JSON.stringify({
                    message: {
                        type: T["default"].preloadMsgType.sendTrackerData,
                        data: {
                            trackData: null === (i = this.tracker) || void 0 === i ? void 0 : i.getData(),
                            clientSize: [document.documentElement.clientWidth, document.documentElement.clientHeight]
                        }
                    }
                }))
            }
        }
        ,
        e.prototype.hidePreloadTemplate = function() {
            if (v.includeInPreoloadTemplate(this.capType)) {
                var e = S.getHtmlTemplateGroup()[this.capType];
                if (h["default"].removeIfExist("t_mask"),
                "embed" === this.type) {
                    var t = void 0
                      , i = S.getHtmlTemplateGroup();
                    for (t in i)
                        S.removeTemplateWrapper(t),
                        delete i[t]
                }
                e && ("inline" !== this.type ? m.setCss(e.wrapper, {
                    top: "-10000px",
                    left: "-10000px",
                    opacity: "0"
                }) : m.setCss(e.wrapper, {
                    display: "none"
                }))
            }
        }
        ,
        e.prototype.onPreloadSuccess = function(e) {
            (null === e || void 0 === e ? void 0 : e.ticket) && (this.hidePreloadTemplate(),
            this.callbackExecutor({
                ret: T["default"].retCode.success,
                ticket: e.ticket,
                randstr: e.randstr
            }))
        }
        ,
        e.prototype.onReady = function(e) {
            var t, i, r, a = this;
            if (this.iframeTypeManager) {
                null === (i = (t = this.iframeTypeManager).onReadyShow) || void 0 === i || i.call(t),
                this.clearCreateTimeout();
                var n = this.iframeTypeManager.sizeSC;
                this.msgChannel.publish(f.Topics.ReadyFunc, {
                    sdkView: {
                        width: null === n || void 0 === n ? void 0 : n.width,
                        height: null === n || void 0 === n ? void 0 : n.height
                    },
                    state: e.loadstate,
                    info: e.info,
                    fwidth: e.fwidth ? e.fwidth : 0,
                    fheight: e.fheight ? e.fheight : 0
                }),
                "point" === this.type && this.iframeTypeManager.loadDone(),
                C.WindowChanged.subscribe(function(e) {
                    var t;
                    null === (t = a.IframeMsg.targets[a.capType]) || void 0 === t || t.send(JSON.stringify({
                        message: {
                            type: T["default"].messageType.windowChanged,
                            data: e
                        }
                    }))
                }),
                null === (r = this.IframeMsg.targets[this.capType]) || void 0 === r || r.send(JSON.stringify({
                    message: {
                        type: T["default"].messageType.readyConfirm,
                        data: {}
                    }
                }))
            }
        }
        ,
        e.prototype.onBack = function() {
            h["default"].removeIfExist("tcaptcha_transform"),
            this.callbackExecutor({
                ret: T["default"].retCode.close,
                ticket: "",
                randstr: ""
            })
        }
        ,
        e.prototype.onClose = function() {
            h["default"].removeIfExist("tcaptcha_transform"),
            h["default"].removeIfExist("t_mask"),
            this.hidePreloadTemplate(),
            this.callbackExecutor({
                ret: T["default"].retCode.close,
                ticket: "",
                randstr: ""
            }),
            "point" === this.type && this.iframeTypeManager.closeIframe()
        }
        ,
        e.prototype.onRefreshMax = function(e) {
            11 == e.type && "vtt" === this.capType && "2" === this.option.clientype || ("point" == this.type ? (h["default"].removeIfExist("tcaptcha_container"),
            this.iframeTypeManager.frequnceLimit(),
            this.callbackExecutor({
                ret: T["default"].retCode.close,
                ticket: "",
                randstr: ""
            })) : "popup" === this.type || "" === this.type ? this.msgChannel.publish(f.Topics.GetPrehandle, "refreshMax") : this.msgChannel.publish(f.Topics.Refresh))
        }
        ,
        e.prototype.onHybridVerify = function(e) {
            this.clearContainerAndEl(),
            this.preCreate(e)
        }
        ,
        e.prototype.onSessionTiemout = function() {
            this.msgChannel.publish(f.Topics.GetPrehandle, "sessionTimeout")
        }
        ,
        e.prototype.updateIframeSrc = function(e) {
            var t;
            null === (t = this.iframeTypeManager) || void 0 === t || t.updateIframeSrc(e)
        }
        ,
        e.prototype.onPointLoadDown = function() {
            h["default"].removeIfExist("t_verify"),
            "point" === this.type && this.iframeTypeManager.loadDone()
        }
        ,
        e.prototype.showRefreshDom = function(e) {
            for (var t = _.dom.tIframe(), i = _.dom.ref2Text(), r = _.dom.tIcons(), a = r.length, n = 0; n < a; n++)
                r[n] && h["default"].addClass(r[n], "show-icon");
            t.src = e,
            t.style.visibility = "hidden",
            setTimeout(function() {
                i && (i.innerHTML = i.innerHTML.replace(/2/, "1"))
            }, 1e3),
            setTimeout(function() {
                t.style.visibility = "visible",
                i && (i.innerHTML = i.innerHTML.replace(/1/, "2"));
                for (var e = 0; e < a; e++)
                    r[e] && h["default"].removeClass(r[e], "show-icon")
            }, 2e3)
        }
        ,
        e.prototype.callbackExecutor = function(e) {
            var t;
            this.clearCreateTimeout(),
            this.removeIframe(),
            this.msgChannel.publish(f.Topics.Callback, e),
            null === (t = this.iframeTypeManager) || void 0 === t || t.destroy()
        }
        ,
        e.prototype.clearCreateTimeout = function() {
            this.createTimeoutTimer && (clearTimeout(this.createTimeoutTimer),
            this.createTimeoutTimer = null),
            this.checkPreloadStatusTimeout && (clearTimeout(this.checkPreloadStatusTimeout),
            this.checkPreloadStatusTimeout = null)
        }
        ,
        e.prototype.removeIframe = function() {
            var e;
            (null === (e = this.iframeTypeManager) || void 0 === e ? void 0 : e.securityIframe) && (this.iframeTypeManager.securityIframe.parentNode && this.iframeTypeManager.securityIframe.parentNode.removeChild(this.iframeTypeManager.securityIframe),
            this.iframeTypeManager.securityIframe = null)
        }
        ,
        e.prototype.removeAllEl = function() {
            h["default"].removeIfExist("tcaptcha_container"),
            h["default"].removeIfExist("tcaptcha_transform"),
            h["default"].removeIfExist("t_verify"),
            h["default"].removeIfExist("t_mask"),
            h["default"].removeIfExist("t-embed-loading"),
            h["default"].removeIfExist("inlineLoading"),
            this.removeIframe(),
            this.hidePreloadTemplate()
        }
        ,
        e.prototype.reloadTemplate = function(e, t, i) {
            var r = S.getTemplateDomain();
            r !== undefined && S.injectTemplate(e, r, ("embed" === t || "inline" === t) && i.ele || void 0)
        }
        ,
        e
    }();
    t["default"] = x
}
, function(e, t, i) {
    "use strict";
    var r = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0;
    var a = r(i(31))
      , n = i(53)
      , o = r(i(42))
      , s = i(43)
      , d = i(32)
      , l = r(i(9))
      , c = i(1)
      , p = i(29)
      , u = a["default"].isIEVer(6)
      , f = function() {
        function e(e, t) {
            this.loadingSize = {
                height: 30,
                width: 30
            },
            this.securityIframe = null,
            this.capType = "defaultSize",
            this.preloadTemplate = null,
            this.preloadMode = !1,
            this.transformEl = null,
            this.showLoading = !0,
            n.addPopupStyle(),
            this.pos = e.pos,
            this.inDarkMode = e.inDarkMode,
            this.themeColor = e.themeColor,
            this.ele = e.ele,
            this.sdkOpts = e.sdkOpts,
            this.msgChannel = t,
            this.showLoading = e.showLoading
        }
        return e.prototype.preCreate = function(e) {
            this.showLoading && this.createLoading(),
            e()
        }
        ,
        e.prototype.create = function(e, t) {
            var i, r = e.sizeSC, a = e.posSC, n = e.captype, o = e.preloadTemplate, s = e.preloadData, l = e.fwidth, c = e.src, u = e.langPack;
            this.sizeSC = r,
            this.posSC = a,
            this.capType = n,
            this.preloadTemplate = o || null,
            this.preloadMode = Boolean(s);
            try {
                this.preloadMode && o && (null === (i = p.getHtmlTemplateGroup()[o.type]) || void 0 === i ? void 0 : i.styled) ? this.dyTransformReStyle() : this.createIframe(c, u, o),
                this.popupResize(n, l),
                t()
            } catch (f) {
                this.msgChannel.publish(d.Topics.IframeError, f)
            }
        }
        ,
        e.prototype.updateIframeSrc = function(e) {
            this.securityIframe && (this.securityIframe.src = e)
        }
        ,
        e.prototype.setSizeSc = function(e) {
            this.sizeSC = e
        }
        ,
        e.prototype.createIframe = function(e, t, i) {
            var r, n, o = i ? i.iframe : null;
            null === o && (o = c.createGeneralIframe({
                id: "tcaptcha_iframe",
                className: "tcaptcha-iframe"
            }),
            this.securityIframe = o),
            a["default"].CSS(o, {
                opacity: "1"
            });
            var s = {
                position: "static",
                height: (null === (r = this.sizeSC) || void 0 === r ? void 0 : r.height) + "px",
                width: (null === (n = this.sizeSC) || void 0 === n ? void 0 : n.width) + "px",
                background: this.inDarkMode ? "#232323" : "#fff"
            };
            a["default"].CSS(o, s);
            var d = this.createIframeWrapper(o, t, i);
            this.transformEl = d,
            i ? (p.styledTypeTemplate(i.type, "popup"),
            a["default"].CSS(i.wrapper, {
                display: "block"
            })) : (d.appendChild(o),
            this.ele.appendChild(d),
            o.src = e)
        }
        ,
        e.prototype.createIframeWrapper = function(e, t, i) {
            var r, n, o, s, c, p, f, h, m = this, g = a["default"].getPosStyleNew("popup", this.pos), y = (null === i || void 0 === i ? void 0 : i.wrapper) || a["default"].createElement("div");
            y.className = "tcaptcha-transform" + (a["default"].isChrome75 && a["default"].isMobileUa ? " chrome-75" : "");
            var v = this.inDarkMode;
            v && (y.className = y.className + " dark-mode"),
            i || (y.id = "tcaptcha_transform");
            var b = {
                position: g,
                width: (null === (r = this.sizeSC) || void 0 === r ? void 0 : r.width) + "px",
                height: (null === (n = this.sizeSC) || void 0 === n ? void 0 : n.height) + "px",
                top: null === (o = this.posSC) || void 0 === o ? void 0 : o.top,
                left: null === (s = this.posSC) || void 0 === s ? void 0 : s.left,
                transition: "opacity 0.3s",
                opacity: "0"
            };
            if ((null === (c = this.sdkOpts) || void 0 === c ? void 0 : c.width) || (b.border = v ? "1px solid #999" : "1px solid #e5e5e5",
            b.borderRadius = "3px"),
            u && (b.position = "absolute"),
            a["default"].isHighSafari()) {
                if (b.position = "absolute",
                b.top && window.scrollY > 0) {
                    var w = parseInt(b.top, 10);
                    isNaN(w) || (b.top = w + window.scrollY + "px")
                }
                setTimeout(function() {
                    var e;
                    a["default"].CSS(y, {
                        top: null === (e = m.posSC) || void 0 === e ? void 0 : e.top,
                        position: "fixed"
                    })
                }, 1e3)
            }
            a["default"].CSS(y, b),
            (null === (p = this.sdkOpts) || void 0 === p ? void 0 : p.width) && a["default"].setPopPosition(y, null === (f = this.sizeSC) || void 0 === f ? void 0 : f.width, null === (h = this.sizeSC) || void 0 === h ? void 0 : h.height, this.sdkOpts);
            var _ = a["default"].createElement("div");
            _.className = "ticons ticon-refresh",
            _.id = "ticon_refresh";
            var T = a["default"].createElement("p");
            T.className = "ticons transform-header",
            T.id = "transform_header",
            T.innerText = t.c22;
            var S = a["default"].createElement("p");
            S.className = "ticons transform-text",
            S.id = "transform_text",
            S.innerText = t.c23,
            y.appendChild(_),
            y.appendChild(T),
            y.appendChild(S);
            var C = a["default"].createElement("div");
            return C.id = "transform_close",
            C.className = "ticons transform-close",
            y.appendChild(C),
            l["default"].add(C, "click", function() {
                m.msgChannel.publish(d.Topics.LimitCLose, "popup")
            }),
            y
        }
        ,
        e.prototype.onReadyShow = function() {
            var e = this.preloadTemplate;
            e ? a["default"].CSS(e.wrapper, {
                opacity: "1"
            }) : a["default"].CSS(this.transformEl, {
                opacity: "1"
            })
        }
        ,
        e.prototype.popupResize = function(e, t) {
            var i, r = this, d = 0, c = 0;
            d = window.innerWidth,
            c = window.innerHeight,
            this.unlistenResize(),
            this.onResizeCb = function() {
                clearTimeout(i),
                i = window.setTimeout(function() {
                    var i;
                    if (!(null !== (i = r.sdkOpts) && void 0 !== i && i.width || Math.abs(window.innerWidth - d) < o["default"].threshold && Math.abs(window.innerHeight - c) < o["default"].threshold)) {
                        var l = r.preloadMode ? r.preloadTemplate : null;
                        d = window.innerWidth,
                        c = window.innerHeight;
                        var p = n.getPopupIframeSizeAndPos(e, t)
                          , u = p.sizeSC
                          , f = p.posSC;
                        r.sizeSC = u,
                        r.posSC = f;
                        var h = {
                            height: u.height + "px",
                            width: u.width + "px",
                            top: f.top,
                            left: f.left
                        }
                          , m = (null === l || void 0 === l ? void 0 : l.wrapper) || s.dom.border();
                        m && a["default"].CSS(m, h),
                        a["default"].CSS((null === l || void 0 === l ? void 0 : l.iframe) || r.securityIframe, h)
                    }
                }, 50)
            }
            ,
            this.onPreloadResizeCb = this.onResizeCb,
            l["default"].add(window, "resize", this.onResizeCb)
        }
        ,
        e.prototype.dyTransformReStyle = function() {
            var e, t, i, r = null === (e = this.preloadTemplate) || void 0 === e ? void 0 : e.wrapper;
            if (r) {
                var n = this.inDarkMode
                  , o = this.sizeSC
                  , s = this.posSC;
                a["default"].CSS(r, {
                    width: (null === o || void 0 === o ? void 0 : o.width) + "px",
                    height: (null === o || void 0 === o ? void 0 : o.height) + "px",
                    top: null === s || void 0 === s ? void 0 : s.top,
                    left: null === s || void 0 === s ? void 0 : s.left
                }),
                a["default"].CSS(null === (t = this.preloadTemplate) || void 0 === t ? void 0 : t.iframe, {
                    background: this.inDarkMode ? "#232323" : "#fff"
                }),
                n ? a["default"].addClass(r, "dark-mode") : a["default"].removeClass(r, "dark-mode"),
                (null === (i = this.sdkOpts) || void 0 === i ? void 0 : i.width) || a["default"].CSS(r, {
                    border: n ? "1px solid #999" : "1px solid #e5e5e5"
                })
            }
        }
        ,
        e.prototype.unlistenResize = function() {
            this.onPreloadResizeCb && l["default"].remove(window, "resize", this.onPreloadResizeCb),
            this.onResizeCb && l["default"].remove(window, "resize", this.onResizeCb)
        }
        ,
        e.prototype.removePopupBorder = function() {
            var e, t, i, r = this.securityIframe;
            if (!r && n.includeInPreoloadTemplate(this.capType) && (r = (null === (e = this.preloadTemplate) || void 0 === e ? void 0 : e.iframe) || null),
            r) {
                a["default"].removeIfExist("t_verify"),
                a["default"].setPopPosition(r, null === (t = this.sizeSC) || void 0 === t ? void 0 : t.width, null === (i = this.sizeSC) || void 0 === i ? void 0 : i.height, this.sdkOpts);
                var o = {
                    opacity: "1"
                };
                a["default"].isChrome75 || (o["border-radius"] = "3px"),
                a["default"].CSS(r, o)
            }
        }
        ,
        e.prototype.enlargeLoading = function(e, t, i, r) {
            var n = s.dom.verifyIcon();
            n && a["default"].CSS(n, {
                marginTop: i / 2 + "px"
            }),
            a["default"].CSS(e, {
                width: t + "px",
                height: i + "px"
            }),
            a["default"].setPopPosition(e, t, i, r)
        }
        ,
        e.prototype.destroy = function() {
            this.unlistenResize()
        }
        ,
        e.prototype.createLoading = function() {
            var e, t, i = this, r = this.inDarkMode, n = a["default"].createElement("div");
            n.className = "t-mask",
            n.id = "t_mask",
            window.document.body.appendChild(n);
            var d = a["default"].createElement("div");
            d.id = "t_verify",
            d.className = "t-verify";
            var l = a["default"].createElement("div");
            l.className = "verify-icon",
            l.id = "verify_icon",
            d.appendChild(l);
            var c = a["default"].createElement("span");
            c.className = "dots_item";
            var p = a["default"].createElement("span");
            p.className = "dots_item";
            var u = a["default"].createElement("span");
            u.className = "dots_item";
            var f = {
                background: a["default"].initColor(this.themeColor)
            };
            a["default"].CSS(c, f),
            a["default"].CSS(p, f),
            a["default"].CSS(u, f),
            l.appendChild(c),
            l.appendChild(p),
            l.appendChild(u);
            var h = a["default"].createElement("p");
            h.className = "verify-text",
            h.id = "verify_text",
            h.style.color = r ? "#ffffff" : "",
            d.appendChild(h);
            var m = a["default"].getPosStyleNew("popup", this.pos)
              , g = a["default"].computeBaseFontSize();
            (null === (e = this.sdkOpts) || void 0 === e ? void 0 : e.width) && this.sdkOpts.height && (g *= this.sdkOpts.width / (o["default"].SMART_VERIFY_SZ.width * g));
            var y = {
                border: (null === (t = this.sdkOpts) || void 0 === t ? void 0 : t.width) ? "0" : r ? "1px solid #999" : "1px solid #e5e5e5",
                position: m,
                background: r ? "#232323" : "#fff"
            };
            a["default"].CSS(d, y),
            this.ele.appendChild(d),
            this.loadingSize = {
                height: o["default"].SMART_VERIFY_SZ.height * g,
                width: o["default"].SMART_VERIFY_SZ.width * g
            },
            a["default"].setPopPosition(d, this.loadingSize.width, this.loadingSize.height, this.sdkOpts),
            window.onresize = function() {
                s.dom.tVerify() && a["default"].setPopPosition(s.dom.tVerify(), i.loadingSize.width, i.loadingSize.height)
            }
        }
        ,
        e
    }();
    t["default"] = f
}
, function(e, t, i) {
    "use strict";
    t.__esModule = !0,
    t["default"] = {
        slidepuzzle_new: {
            size: [19, 19],
            hasBorder: !0,
            unionSizeType: !0,
            isOpt: !0
        },
        slidepuzzle_opt: {
            size: [19, 19],
            hasBorder: !0,
            unionSizeType: !0,
            isOpt: !0
        },
        slidepuzzle_new_pc: {
            height: 360,
            width: 360,
            btn_width: 298
        },
        slidepuzzle_opt_pc: {
            height: 360,
            width: 360,
            btn_width: 298
        },
        vtt: {
            size: [19, 19],
            hasBorder: !0,
            unionSizeType: !0,
            isOpt: !0
        },
        vtt_pc: {
            height: 360,
            width: 360,
            btn_width: 298
        },
        drag: {
            size: [19, 19],
            hasBorder: !0,
            unionSizeType: !0,
            isOpt: !0
        },
        drag_pc: {
            height: 360,
            width: 360,
            btn_width: 298
        },
        dy: {
            size: [19, 19],
            hasBorder: !0,
            unionSizeType: !0,
            isOpt: !0
        },
        dy_pc: {
            height: 360,
            width: 360,
            btn_width: 298
        },
        defaultSize: {
            hasBorder: !1,
            size: ["100%", "100%"]
        }
    }
}
, function(e, t, i) {
    "use strict";
    var r = this && this.__assign || function() {
        return (r = Object.assign || function(e) {
            for (var t, i = 1, r = arguments.length; i < r; i++)
                for (var a in t = arguments[i])
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e
        }
        ).apply(this, arguments)
    }
      , a = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0;
    var n = i(1)
      , o = i(29)
      , s = i(32)
      , d = a(i(31))
      , l = function() {
        function e(e, t) {
            this.pos = "",
            this.themeColor = "",
            this.sdkOpts = {
                height: 230,
                width: 300
            },
            this.securityIframe = null,
            this.ele = e.ele,
            this.inDarkMode = e.inDarkMode,
            this.msgChannel = t
        }
        return e.prototype.preCreate = function(e) {
            this.crateLoading(),
            e()
        }
        ,
        e.prototype.create = function(e, t) {
            try {
                var i = null
                  , a = this.getContainerStyles(e)
                  , d = e.preloadTemplate;
                if (e.preloadData && d) {
                    var l = d.wrapper
                      , c = r({}, a);
                    c.display = "block",
                    n.setCss(l, c);
                    n.setCss(d.iframe, {
                        height: "100%",
                        width: "100%"
                    }),
                    o.styledTypeTemplate(d.type, "embed")
                } else
                    (i = n.createGeneralIframe({
                        id: "tcaptcha_iframe"
                    })).src = e.src;
                this.securityIframe = i,
                i && (n.setCss(i, a),
                this.ele.appendChild(i)),
                t()
            } catch (p) {
                this.msgChannel.publish(s.Topics.IframeError, p)
            }
        }
        ,
        e.prototype.getContainerStyles = function(e) {
            this.sizeSC = e.sizeSC,
            "slidepuzzle_new" !== e.captype && "slidepuzzle_opt" !== e.captype && "drag" !== e.captype && "dy" !== e.captype || (this.sizeSC = {
                width: 300,
                height: 230
            }),
            this.posSC = e.posSC;
            var t = this.inDarkMode;
            return {
                display: "",
                width: this.sizeSC.width + "px",
                height: this.sizeSC.height + "px",
                border: "0px",
                position: "relative",
                left: "0px",
                top: "0px",
                zIndex: "2000000002",
                opacity: "1",
                background: t ? "#232323" : "#fff"
            }
        }
        ,
        e.prototype.updateIframeSrc = function(e) {
            this.securityIframe && (this.securityIframe.src = e)
        }
        ,
        e.prototype.crateLoading = function() {
            var e = document.createElement("div");
            e.id = "t-embed-loading",
            e.className = "t-embed-loading";
            var t = d["default"].createElement("div");
            t.className = "t-embed-dots";
            var i = d["default"].createElement("div");
            i.className = "t-embed-dot";
            var r = d["default"].createElement("div");
            r.className = "t-embed-dot";
            var a = d["default"].createElement("div");
            a.className = "t-embed-dot",
            t.appendChild(i),
            t.appendChild(r),
            t.appendChild(a),
            e.appendChild(t),
            this.ele.appendChild(e)
        }
        ,
        e.prototype.removeLoading = function() {
            d["default"].removeIfExist("t-embed-loading")
        }
        ,
        e.prototype.destroy = function() {}
        ,
        e
    }();
    t["default"] = l
}
, function(e, t, i) {
    "use strict";
    var r = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0;
    var a = r(i(31))
      , n = i(43)
      , o = i(53)
      , s = i(32)
      , d = r(i(9))
      , l = i(1)
      , c = i(29)
      , p = !1
      , u = a["default"].isIEVer(6)
      , f = function() {
        function e(e, t) {
            this.pos = "",
            this.themeColor = "",
            this.securityIframe = null,
            this.preloadMode = !1,
            this.preloadTemplate = null,
            p || (o.addPopupStyle(),
            p = !0),
            this.ele = e.ele,
            this.inDarkMode = e.inDarkMode,
            this.sdkOpts = e.sdkOpts,
            this.showHeader = e.showHeader;
            var i = a["default"].getWindowWidth()
              , r = a["default"].getWindowHeight();
            this.sizeSC = {
                height: r,
                width: i
            },
            this.windowWidth = i,
            this.windowHeight = r,
            this.posSC = e.posSC,
            this.msgChannel = t
        }
        return e.prototype.preCreate = function(e) {
            e()
        }
        ,
        e.prototype.create = function(e, t) {
            var i = this;
            this.preloadMode = Boolean(e.preloadData),
            this.preloadTemplate = e.preloadTemplate || null,
            setTimeout(function() {
                try {
                    i.pre_onlyChangePos(e) || i.createIframe(e.src, e.langPack, e.preloadTemplate),
                    t()
                } catch (r) {
                    i.msgChannel.publish(s.Topics.IframeError, r)
                }
                window.onresize = function() {
                    setTimeout(function() {
                        var e = a["default"].getWindowHeight()
                          , t = a["default"].getWindowWidth();
                        if (!(Math.abs(i.windowWidth - t) < 30 && Math.abs(i.windowHeight - e) < 30)) {
                            i.sizeSC.height = e,
                            i.sizeSC.width = t,
                            i.windowWidth = t;
                            var r = {
                                height: i.sizeSC.height + "px",
                                width: i.sizeSC.width + "px"
                            }
                              , o = i.preloadMode ? i.preloadTemplate : null
                              , s = (null === o || void 0 === o ? void 0 : o.wrapper) || n.dom.border();
                            s && a["default"].CSS(s, r),
                            a["default"].CSS((null === o || void 0 === o ? void 0 : o.iframe) || i.securityIframe, r)
                        }
                    }, 200)
                }
            }, 100)
        }
        ,
        e.prototype.pre_onlyChangePos = function(e) {
            var t, i = e.preloadTemplate;
            return !!(e.preloadData && i && (null === (t = c.getHtmlTemplateGroup()[i.type]) || void 0 === t ? void 0 : t.styled)) && (a["default"].CSS(i.wrapper, {
                width: this.sizeSC.width + "px",
                height: this.sizeSC.height + "px",
                top: this.posSC.top,
                left: this.posSC.left,
                opacity: "1"
            }),
            this.inDarkMode ? a["default"].addClass(i.wrapper, "dark-mode") : a["default"].removeClass(i.wrapper, "dark-mode"),
            !0)
        }
        ,
        e.prototype.createIframe = function(e, t, i) {
            var r = this.inDarkMode;
            if (this.securityIframe) {
                var n = {
                    height: this.sizeSC.height + "px",
                    width: this.sizeSC.width + "px",
                    top: this.posSC.top,
                    left: this.posSC.left
                };
                return a["default"].CSS(this.securityIframe, n),
                void (this.securityIframe.src = e)
            }
            var o = null === i || void 0 === i ? void 0 : i.iframe;
            o || (o = l.createGeneralIframe({
                id: "tcaptcha_iframe",
                className: "tcaptcha-iframe"
            }),
            this.securityIframe = o),
            a["default"].CSS(o, {
                border: "0px"
            });
            var s = {
                position: "static",
                height: this.sizeSC.height + "px",
                width: this.sizeSC.width + "px",
                background: r ? "#232323" : "#ffffff"
            };
            a["default"].CSS(o, s);
            var d = this.createIframeWrapper(t, i);
            i ? (c.styledTypeTemplate(i.type, "full"),
            a["default"].CSS(i.wrapper, {
                display: "block"
            })) : (d.appendChild(o),
            this.ele.appendChild(d),
            o.src = e)
        }
        ,
        e.prototype.createIframeWrapper = function(e, t) {
            var i = this
              , r = (null === t || void 0 === t ? void 0 : t.wrapper) || a["default"].createElement("div");
            r.className = "tcaptcha-transform" + (a["default"].isChrome75 && a["default"].isMobileUa ? " chrome-75" : ""),
            this.inDarkMode && (r.className = r.className + " dark-mode"),
            t || (r.id = "tcaptcha_transform");
            var n = {
                position: "absolute",
                width: this.sizeSC.width + "px",
                height: this.sizeSC.height + "px",
                top: this.posSC.top,
                left: this.posSC.left,
                opacity: "1"
            };
            u && (n.position = "absolute"),
            a["default"].CSS(r, n),
            this.sdkOpts && this.sdkOpts.width && a["default"].setPopPosition(r, this.sizeSC.width, this.sizeSC.height, this.sdkOpts);
            var o = a["default"].createElement("div");
            o.className = "ticons ticon-refresh",
            o.id = "ticon_refresh";
            var l = a["default"].createElement("p");
            l.className = "ticons transform-header",
            l.id = "transform_header",
            l.innerText = e.c22;
            var c = a["default"].createElement("p");
            if (c.className = "ticons transform-text",
            c.id = "transform_text",
            c.innerText = e.c23,
            r.appendChild(o),
            r.appendChild(l),
            r.appendChild(c),
            1 == this.showHeader) {
                var p = a["default"].createElement("span");
                p.className = "ticons tback transform-eicon",
                p.id = "transform_eicon";
                var f = a["default"].createElement("div");
                f.className = "ticons tback transform-eb",
                f.id = "transform_eb",
                f.innerText = e.c11;
                var h = a["default"].createElement("p");
                h.className = "ticons transform-eh",
                h.id = "transform_eh",
                e.c2.length > 20 ? (a["default"].addClass(h, "middle-fontsize"),
                a["default"].addClass(f, "middle-fontsize")) : e.c2.length > 15 && (a["default"].addClass(h, "small-fontsize"),
                a["default"].addClass(f, "small-fontsize")),
                h.innerText = e.c2,
                r.appendChild(p),
                r.appendChild(f),
                r.appendChild(h),
                d["default"].add(f, "click", function() {
                    i.msgChannel.publish(s.Topics.LimitCLose, "full")
                })
            }
            return r
        }
        ,
        e.prototype.updateIframeSrc = function(e) {
            this.securityIframe && (this.securityIframe.src = e)
        }
        ,
        e.prototype.destroy = function() {}
        ,
        e
    }();
    t["default"] = f
}
, function(e, t, i) {
    "use strict";
    var r = this && this.__read || function(e, t) {
        var i = "function" == typeof Symbol && e[Symbol.iterator];
        if (!i)
            return e;
        var r, a, n = i.call(e), o = [];
        try {
            for (; (void 0 === t || t-- > 0) && !(r = n.next()).done; )
                o.push(r.value)
        } catch (s) {
            a = {
                error: s
            }
        } finally {
            try {
                r && !r.done && (i = n["return"]) && i.call(n)
            } finally {
                if (a)
                    throw a.error
            }
        }
        return o
    }
      , a = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0;
    var n = a(i(31))
      , o = a(i(42))
      , s = a(i(33))
      , d = i(1)
      , l = i(43)
      , c = i(32)
      , p = i(29)
      , u = !1
      , f = function() {
        function e(e, t) {
            this.pos = "",
            this.themeColor = "",
            this.sdkOpts = {
                height: 230,
                width: 300
            },
            this.preTrigerPoint = null,
            this.securityIframe = null,
            this._div = null,
            this.inDarkMode = e.inDarkMode,
            this.preIframeSrc = e.src,
            this.domain = e.domain,
            this.ele = e.ele,
            this.preIframeMsg = new s["default"]("parent","",this.domain),
            this.lang = e.lang,
            this.sizeSC = e.sizeSC,
            this.posSC = e.posSC,
            this.msgChannel = t,
            this.initPreIframeListener()
        }
        return e.prototype.initPreIframeListener = function() {
            var e = this;
            this.preIframeMsg.clear(),
            this.preIframeMsg.listen(function(t) {
                var i, r, a;
                try {
                    a = JSON.parse(t)
                } catch (o) {
                    return
                }
                if (null === (i = null === a || void 0 === a ? void 0 : a.message) || void 0 === i ? void 0 : i.type)
                    switch (a.message.type) {
                    case 9:
                        var n = window.document.getElementById("loading_animation");
                        n && setTimeout(function() {
                            n && (n.style.background = "none")
                        }, 100);
                        break;
                    case 20:
                        null === (r = e.prehandleInitCb) || void 0 === r || r.call(e)
                    }
            })
        }
        ,
        e.prototype.destroy = function() {
            this.closeIframe()
        }
        ,
        e.prototype.updateIframeSrc = function(e) {
            this.securityIframe && (this.securityIframe.src = e)
        }
        ,
        e.prototype.preCreate = function(e) {
            var t;
            this.preTrigerPoint && this.nullIframe(),
            u || (i(84),
            u = !0);
            var r = document.createElement("div");
            r.id = "loading_animation";
            var a = this.domain + "/loading_grey.gif"
              , s = document.createElement("iframe");
            s.setAttribute("frameborder", "0"),
            s.setAttribute("border", "0"),
            s.marginheight = 0,
            s.marginwidth = 0,
            s.setAttribute("marginheight", "0"),
            s.setAttribute("marginwidth", "0"),
            s.scrolling = "no";
            var d, l, c = n["default"].getCSS(this.ele, "width"), p = n["default"].getCSS(this.ele, "height"), f = "0", h = !!window.ActiveXObject && 8 == document.documentMode;
            c && "auto" != c ? parseInt(c, 10) < o["default"].CONST_PTR.minWidth ? (d = o["default"].CONST_PTR.minWidth + "px",
            f = o["default"].CONST_PTR.minWidth - 2 + "px") : (d = c,
            f = parseInt(c, 10) - 2 + "px") : (d = "100%",
            f = h ? "99%" : "100%");
            var m = {
                width: d,
                height: l = !p || "auto" == p || parseInt(p, 10) < o["default"].CONST_PTR.minHeight ? o["default"].CONST_PTR.minHeight + "px" : p,
                border: "1px solid #e7e7e7",
                position: "relative",
                borderRadius: "2px",
                lineHeight: l,
                boxSizing: "border-box",
                background: "url(" + a + ") center no-repeat"
            };
            n["default"].CSS(r, m);
            var g = {
                width: f,
                height: parseInt(l, 10) - 2 + "px",
                border: "none",
                position: "relative",
                minHeight: o["default"].CONST_PTR.minHeight - 2 + "px",
                minWidth: o["default"].CONST_PTR.minWidth - 2 + "px",
                zIndex: 10
            };
            if (n["default"].CSS(s, g),
            this.preIframeSrc) {
                this.themeColor && (this.preIframeSrc = n["default"].addUrlParam(this.preIframeSrc, {
                    color: this.themeColor
                }));
                var y = "0";
                l.length > 2 && (y = l.substr(0, l.length - 2)),
                this.preIframeSrc = n["default"].addUrlParam(this.preIframeSrc, {
                    height: y,
                    rnd: Math.floor(1e6 * Math.random()),
                    lang: this.lang
                }),
                s.src = this.preIframeSrc
            }
            this.preTrigerPoint = s,
            (t = r).appendChild(this.preTrigerPoint),
            this.ele.appendChild(t),
            this.initPreTriggerPointTarget(),
            this.prehandleInitCb = e
        }
        ,
        e.prototype.create = function(e, t) {
            try {
                var i = e.preloadTemplate || null
                  , r = e.sizeSC;
                this.sizeSC = e.sizeSC;
                var a = (null === i || void 0 === i ? void 0 : i.wrapper) || document.createElement("div");
                i ? d.addMyClass(a, "tcaptcha-container") : (a.className = "tcaptcha-container",
                a.id = "tcaptcha_container",
                this._div = a);
                var o = {
                    width: r.width + "px",
                    height: r.height + "px",
                    opacity: "1"
                };
                n["default"].CSS(a, o);
                var s = null === i || void 0 === i ? void 0 : i.iframe;
                s ? d.addMyClass(s, "tcaptcha-container-iframe") : (s = d.createGeneralIframe({
                    id: "tcaptcha_iframe",
                    className: "tcaptcha-container-iframe"
                }),
                this.securityIframe = s),
                i ? (p.styledTypeTemplate(i.type, "point"),
                n["default"].CSS(i.wrapper, {})) : (a.appendChild(s),
                document.body.appendChild(a),
                s.src = e.src),
                this.setDivPosition(a),
                t()
            } catch (l) {
                this.msgChannel.publish(c.Topics.IframeError, l)
            }
        }
        ,
        e.prototype.setDivPosition = function(e) {
            var t = this
              , i = this.changePos()
              , a = r(i, 2)
              , o = a[0]
              , s = void 0 === o ? 0 : o
              , d = a[1]
              , l = void 0 === d ? 0 : d
              , c = i[2]
              , p = i[3]
              , u = document.createElement("style");
            return u.type = "text/css",
            document.getElementsByTagName("body")[0].appendChild(u),
            setTimeout(function() {
                t.insertRule(document.styleSheets[document.styleSheets.length - 1], ".tcaptcha-container:before", c, 0),
                t.insertRule(document.styleSheets[document.styleSheets.length - 1], ".tcaptcha-container:after", p, 0)
            }, 1),
            n["default"].CSS(e, {
                top: s + "px",
                left: l + "px"
            })
        }
        ,
        e.prototype.pre_onlyChangePos = function() {}
        ,
        e.prototype.changePos = function() {
            var e, t, i, r = 0, a = 0, o = n["default"].getPos(this.preTrigerPoint), s = n["default"].getSize(this.preTrigerPoint), d = n["default"].getWindowHeight(), l = n["default"].getWindowWidth(), c = n["default"].getScrollTop(), p = this.sizeSC;
            return (i = o[1] - c) >= p.height / 2 && d - i - s[1] / 2 >= p.height / 2 ? (r = o[1] + s[1] / 2 - p.height / 2,
            a = o[0] + 45,
            e = "top: 50%;",
            t = "top: 50%;") : i <= p.height / 2 ? (r = o[1] - i,
            a = o[0] + 45,
            t = e = "top: " + (i + s[1] / 2) / p.height * 100 + "%;") : d - i >= s[1] && d - i - s[1] / 2 <= p.height / 2 ? (r = d - p.height + c,
            a = o[0] + 45,
            t = e = "top: " + (p.height - (d - i - s[1] / 2)) / p.height * 100 + "%;") : d - i <= s[1] ? (r = o[1] + s[1] - p.height,
            a = o[0] + 45,
            t = e = "top: " + (p.height - s[1] / 2) / p.height * 100 + "%;") : (r = o[1] + s[1] / 2 - p.height / 2,
            a = o[0] + 45,
            e = "top: 50%;",
            t = "top: 50%;"),
            l < a + p.width && (a = l - p.width),
            [r, a, e, t]
        }
        ,
        e.prototype.insertRule = function(e, t, i, r) {
            try {
                return e.insertRule ? e.insertRule(t + "{" + i + "}", r) : e.addRule(t, i, r)
            } catch (a) {}
        }
        ,
        e.prototype.frequnceLimit = function() {
            this.send2preTriggerPoint(JSON.stringify({
                message: {
                    type: "fLimit"
                }
            }))
        }
        ,
        e.prototype.closeIframe = function() {
            n["default"].removeIfExist("tcaptcha_container"),
            this.send2preTriggerPoint(JSON.stringify({
                message: {
                    type: "closePopup"
                }
            }))
        }
        ,
        e.prototype.loadDone = function() {
            var e = this;
            this.send2preTriggerPoint(JSON.stringify({
                message: {
                    type: "loadDone"
                }
            }));
            var t = l.dom.container();
            t && setTimeout(function() {
                n["default"].CSS(t, {
                    display: "block",
                    zoom: 1
                }),
                n["default"].CSS(e.securityIframe, {
                    zoom: 1
                })
            }, 16),
            n["default"].removeIfExist("t_verify")
        }
        ,
        e.prototype.success = function() {
            n["default"].CSS(window.document.getElementById("loading_animation"), {
                border: "1px solid #42dd18"
            }),
            this.send2preTriggerPoint(JSON.stringify({
                message: {
                    type: "success"
                }
            }))
        }
        ,
        e.prototype.initPreTriggerPointTarget = function() {
            var e;
            (null === (e = this.preTrigerPoint) || void 0 === e ? void 0 : e.contentWindow) && this.preIframeMsg.addTarget(this.preTrigerPoint.contentWindow, "preTrigerPoint")
        }
        ,
        e.prototype.send2preTriggerPoint = function(e) {
            var t;
            null === (t = this.preIframeMsg.targets.preTrigerPoint) || void 0 === t || t.send(e)
        }
        ,
        e.prototype.nullIframe = function() {
            this.removeIframe(),
            this.preTrigerPoint = null
        }
        ,
        e.prototype.removeIframe = function() {
            var e = this.preTrigerPoint;
            e && (e.src = "about:blank",
            e.parentNode && e.parentNode.removeChild(e),
            e.onload = null)
        }
        ,
        e
    }();
    t["default"] = f
}
, function(e, t, i) {
    var r = i(85);
    "string" == typeof r && (r = [[e.i, r, ""]]);
    i(60)(r, {});
    r.locals && (e.exports = r.locals)
}
, function(e, t, i) {
    (e.exports = i(57)(!1)).push([e.i, '.tcaptcha-container{border:1px solid #e5e5e5;position:absolute;left:0;top:0;z-index:2000000002}.tcaptcha-container:after,.tcaptcha-container:before{content:"";height:0;width:0;position:absolute;left:-17px;top:50%;margin-top:-9.5px;border-left:9px solid transparent;border-top:9px solid transparent;border-bottom:9px solid transparent;border-right:9px solid rgba(63,63,63,.1);z-index:0}.tcaptcha-container:after{border-right:9px solid #fff;z-index:1}.tcaptcha-container-iframe{display:block;width:100%;height:100%;border:0;background:#fff;visibility:visible}', ""])
}
, function(e, t, i) {
    "use strict";
    var r = this && this.__assign || function() {
        return (r = Object.assign || function(e) {
            for (var t, i = 1, r = arguments.length; i < r; i++)
                for (var a in t = arguments[i])
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e
        }
        ).apply(this, arguments)
    }
      , a = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    ;
    t.__esModule = !0;
    var n = i(1)
      , o = i(29)
      , s = i(32)
      , d = a(i(31))
      , l = i(2)
      , c = function() {
        function e(e, t) {
            this.pos = "",
            this.themeColor = "",
            this.sdkOpts = {
                height: 300,
                width: 300
            },
            this.securityIframe = null,
            this.ele = e.ele,
            this.inDarkMode = e.inDarkMode,
            this.msgChannel = t,
            this.captchaWidth = 300,
            e.captchaWidth && l.isSupportRem() && (this.captchaWidth = e.captchaWidth)
        }
        return e.prototype.preCreate = function(e) {
            this.crateLoading(),
            e()
        }
        ,
        e.prototype.create = function(e, t) {
            try {
                var i = null
                  , a = this.getContainerStyles(e)
                  , d = e.preloadTemplate;
                if (e.preloadData && d) {
                    var l = d.wrapper
                      , c = r({}, a);
                    c.display = "block",
                    n.setCss(l, c);
                    n.setCss(d.iframe, {
                        height: "100%",
                        width: "100%"
                    }),
                    o.styledTypeTemplate(d.type, "inline")
                } else
                    (i = n.createGeneralIframe({
                        id: "tcaptcha_iframe"
                    })).src = e.src;
                this.securityIframe = i,
                i && (n.setCss(i, a),
                this.ele.appendChild(i)),
                t()
            } catch (p) {
                this.msgChannel.publish(s.Topics.IframeError, p)
            }
        }
        ,
        e.prototype.getContainerStyles = function(e) {
            this.sizeSC = e.sizeSC,
            "slidepuzzle_new" !== e.captype && "slidepuzzle_opt" !== e.captype && "drag" !== e.captype && "dy" !== e.captype || (this.sizeSC = {
                width: this.captchaWidth,
                height: this.captchaWidth
            }),
            this.posSC = e.posSC;
            var t = this.inDarkMode;
            return {
                display: "",
                width: this.sizeSC.width + "px",
                height: this.sizeSC.height + "px",
                border: "0px",
                position: "relative",
                left: "0px",
                top: "0px",
                zIndex: "2000000002",
                opacity: "1",
                background: t ? "#232323" : "#fff"
            }
        }
        ,
        e.prototype.updateIframeSrc = function(e) {
            this.securityIframe && (this.securityIframe.src = e)
        }
        ,
        e.prototype.crateLoading = function() {
            var e = document.createElement("div");
            e.id = "inlineLoading",
            e.className = "t-inline-loading";
            var t = d["default"].createElement("div");
            t.className = "t-inline-dots";
            var i = d["default"].createElement("div");
            i.className = "t-inline-dot";
            var r = d["default"].createElement("div");
            r.className = "t-inline-dot";
            var a = d["default"].createElement("div");
            a.className = "t-inline-dot",
            t.appendChild(i),
            t.appendChild(r),
            t.appendChild(a),
            e.appendChild(t),
            n.setCss(e, {
                width: this.captchaWidth + "px",
                height: this.captchaWidth + "px"
            }),
            this.ele.firstChild ? this.ele.insertBefore(e, this.ele.firstChild) : this.ele.appendChild(e)
        }
        ,
        e.prototype.removeLoading = function() {
            d["default"].removeIfExist("inlineLoading")
        }
        ,
        e.prototype.destroy = function() {}
        ,
        e
    }();
    t["default"] = c
}
, function(e, t, i) {
    "use strict";
    var r = i(88);
    e.exports = {
        langPack: r,
        detectWxLang: function() {
            var e = location.search
              , t = /(wehcat_real_lang|wechat_real_lang)=([a-zA-Z_\-]+)/.exec(e);
            if (t)
                return t[2];
            for (var i = document.getElementsByTagName("script"), r = 0; r < i.length; r++) {
                var a = i[r].src;
                if (a && /TCapIframeApi/i.test(a)) {
                    var n = /lang=([a-zA-Z_\-]+)/.exec(a);
                    if (n)
                        return n[1].toLowerCase()
                }
            }
            return ""
        }
    }
}
, function(e, t, i) {
    "use strict";
    var r = ["c2", "c3", "c11", "c12", "c21", "c22", "c23"]
      , a = {
        "zh-cn": ["\u5b89\u5168\u9a8c\u8bc1", "\u9a8c\u8bc1\u6210\u529f", "\u8fd4\u56de", "\u9a8c\u8bc1\u4e2d...", "\u9a8c\u8bc1\u6210\u529f", "\u5c1d\u8bd5\u592a\u591a\u4e86", "2s\u540e\u81ea\u52a8\u4e3a\u60a8\u5237\u65b0\u9a8c\u8bc1\u7801"],
        "zh-hk": ["\u5b89\u5168\u9a57\u8b49", "\u9a57\u8b49\u6210\u529f", "\u8fd4\u56de", "\u9a57\u8b49\u4e2d\u22ef", "\u9a57\u8b49\u6210\u529f", "\u932f\u8aa4\u6b21\u6578\u592a\u591a", "\u9a57\u8b49\u78bc\u5c07\u65bc 2 \u79d2\u5f8c\u81ea\u52d5\u66f4\u65b0"],
        "zh-tw": ["\u5b89\u5168\u9a57\u8b49", "\u9a57\u8b49\u6210\u529f", "\u8fd4\u56de", "\u9a57\u8b49\u4e2d...", "\u9a57\u8b49\u6210\u529f", "\u5617\u8a66\u6b21\u6578\u592a\u591a", "2\u79d2\u5f8c\u81ea\u52d5\u70ba\u60a8\u91cd\u65b0\u6574\u7406\u9a57\u8b49\u78bc"],
        en: ["Security Verification", "Verification is successful", "Back", "Verifying...", "Verification is successful", "Refreshing too often", "Verification Code will refresh in 2 sec."],
        ar: ["\u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062d\u0645\u0627\u064a\u0629", "\u0646\u062c\u0627\u062d \u0627\u0644\u062a\u062d\u0642\u0642", "\u0639\u0648\u062f\u0629", "\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0642\u0642...", "\u0646\u062c\u0627\u062d \u0627\u0644\u062a\u062d\u0642\u0642", "\u0643\u062b\u0631\u0629 \u0627\u0644\u062a\u062d\u062f\u064a\u062b", "\u0633\u064a\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0643\u0648\u062f \u0627\u0644\u062a\u062d\u0642\u0642 \u062e\u0644\u0627\u0644 2 \u062b\u0627\u0646\u064a\u0629."],
        my: ["\u101c\u1036\u102f\u107f\u1001\u1036\u1033\u1031\u101b\u1038\u1021\u1010\u100a\u1039\u103b\u1015\u1033\u103b\u1001\u1004\u1039\u1038", "\u1021\u1010\u100a\u1039\u103b\u1015\u1033\u1019\u1088 \u1031\u1021\u102c\u1004\u1039\u103b\u1019\u1004\u1039\u1015\u102b\u101e\u100a\u1039", "\u1031\u1014\u102c\u1000\u1039\u101e\u102d\u102f\u1094", "\u1021\u1010\u100a\u1039\u103b\u1015\u1033\u1031\u1014\u101e\u100a\u1039...", "\u1021\u1010\u100a\u1039\u103b\u1015\u1033\u1019\u1088 \u1031\u1021\u102c\u1004\u1039\u103b\u1019\u1004\u1039\u1015\u102b\u101e\u100a\u1039", "\u1019\u107e\u1000\u102c\u1001\u1014\u103b\u1015\u1014\u1039\u1016\u103c\u1004\u1039\u1037\u1031\u1014\u101b\u101e\u100a\u1039\u104b", "2 \u1005\u1000\u1060\u1014\u1039\u1094\u1021\u1010\u103c\u1004\u1039\u1038 \u1021\u1010\u100a\u1039\u103b\u1015\u1033\u101b\u1014\u1039Code \u1021\u101e\u1005\u1039\u1031\u1015\u105a\u1015\u102b\u1019\u100a\u1039"],
        fr: ["V\xe9rification de s\xe9curit\xe9", "La v\xe9rification est r\xe9ussie", "Retour", "V\xe9rification...", "La v\xe9rification est r\xe9ussie", "Trop actualis\xe9", "Le code de v\xe9rification s'actualisera dans 2 sec."],
        de: ["Sicherheitsbest\xe4tigung", "Verifizierung erfolgreich", "Zur\xfcck", "Wird verifziert\xa0\u2026", "Verifizierung erfolgreich", "Zu oft aktualisiert", "Verifizierungscode wird in 2 Sekunden aktualisiert."],
        he: ["\u05d0\u05d9\u05de\u05d5\u05ea \u05d0\u05d1\u05d8\u05d7\u05d4", "\u05d4\u05d0\u05d9\u05de\u05d5\u05ea \u05e2\u05d1\u05e8 \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4", "\u05d7\u05d6\u05e8\u05d4", "\u05de\u05d0\u05de\u05ea", "\u05d4\u05d0\u05d9\u05de\u05d5\u05ea \u05e2\u05d1\u05e8 \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4", "\u05de\u05e8\u05e2\u05e0\u05df \u05dc\u05e2\u05ea\u05d9\u05dd \u05e7\u05e8\u05d5\u05d1\u05d5\u05ea \u05de\u05d9\u05d3\u05d9", "\u05e7\u05d5\u05d3 \u05d4\u05d0\u05d9\u05de\u05d5\u05ea \u05d9\u05ea\u05d7\u05d3\u05e9 \u05d1\u05ea\u05d5\u05da 2 \u05e9\u05e0\u05d9\u05d5\u05ea"],
        hi: ["\u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0938\u0924\u094d\u092f\u093e\u092a\u0928", "\u0938\u0924\u094d\u092f\u093e\u092a\u0928 \u0938\u092b\u0932", "\u092a\u0940\u091b\u0947", "\u0938\u0924\u094d\u092f\u093e\u092a\u0928 \u091c\u093e\u0930\u0940...", "\u0938\u0924\u094d\u092f\u093e\u092a\u0928 \u0938\u092b\u0932", "\u0905\u0915\u094d\u0938\u0930 \u0930\u0940\u092b\u094d\u0930\u0947\u0936 \u0939\u094b \u0930\u0939\u093e \u0939\u0948\u0964", "\u0938\u0924\u094d\u092f\u093e\u092a\u0928 \u0915\u094b\u0921 2 \u0938\u0947\u0915. \u092e\u0947\u0902 \u0930\u0940\u092b\u094d\u0930\u0947\u0936 \u0939\u094b\u0917\u093e"],
        id: ["Verifikasi Keamanan", "Verifikasi berhasil", "Kembali", "Memverifikasi...", "Verifikasi berhasil", "Terlalu sering merefresh.", "Kode Verifikasi akan di-refresh dalam 2 detik."],
        it: ["Verifica di sicurezza", "Verifica completata", "Indietro", "Verifica in corso", "Verifica completata", "Troppo frequente", "Il codice di verifica sar\xe0 aggiornato tra 2 secondi"],
        ja: ["\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u8a8d\u8a3c", "\u8a8d\u8a3c\u304c\u6b63\u5e38\u306b\u5b8c\u4e86", "\u623b\u308b", "\u8a8d\u8a3c\u4e2d\u2026", "\u8a8d\u8a3c\u304c\u6b63\u5e38\u306b\u5b8c\u4e86", "\u66f4\u65b0\u983b\u5ea6\u304c\u9ad8\u3059\u304e\u307e\u3059", "\u8a8d\u8a3c\u30b3\u30fc\u30c9\u306f2\u79d2\u5f8c\u306b\u30ea\u30d5\u30ec\u30c3\u30b7\u30e5\u3055\u308c\u307e\u3059\u3002"],
        ko: ["\ubcf4\uc548 \uc778\uc99d", "\uc778\uc99d \uc131\uacf5", "\ub4a4\ub85c\uac00\uae30", "\uc778\uc99d \uc911...", "\uc778\uc99d \uc131\uacf5", "\uc0c8\ub85c\uace0\uce68\uc774 \ub108\ubb34 \uc7a6\uc2b5\ub2c8\ub2e4", "\uc778\uc99d \ucf54\ub4dc\uac00 2\ucd08 \ud6c4\uc5d0 \uc0c8\ub85c\uace0\uce68 \ub429\ub2c8\ub2e4."],
        lo: ["\u0e81\u0eb2\u0e99\u0ea2\u0eb7\u0e99\u0ea2\u0eb1\u0e99\u0e84\u0ea7\u0eb2\u0ea1\u0e9b\u0ead\u0e94\u0ec4\u0e9e", "\u0e81\u0eb2\u0e99\u0ea2\u0eb7\u0e99\u0ea2\u0eb1\u0e99\u0ec4\u0e94\u0ec9\u0eaa\u0eb3\u0ec0\u0ea5\u0eb1\u0e94\u0ec1\u0ea5\u0ec9\u0ea7", "\u0e81\u0eb1\u0e9a\u0e84\u0eb7\u0e99", "\u0e81\u0eb3\u0ea5\u0eb1\u0e87\u0ea2\u0eb7\u0e99\u0ea2\u0eb1\u0e99...", "\u0e81\u0eb2\u0e99\u0ea2\u0eb7\u0e99\u0ea2\u0eb1\u0e99\u0ec4\u0e94\u0ec9\u0eaa\u0eb3\u0ec0\u0ea5\u0eb1\u0e94\u0ec1\u0ea5\u0ec9\u0ea7", "\u0e9f\u0eb7\u0ec9\u0e99\u0e9f\u0eb9\u0e84\u0eb7\u0e99\u0ec0\u0ea5\u0eb7\u0ec9\u0ead\u0e8d\u0ec6", "\u0ea5\u0eb0\u0eab\u0eb1\u0e94\u0ea2\u0eb7\u0e99\u0ea2\u0eb1\u0e99\u0e88\u0eb0\u0ea1\u0eb5\u0e81\u0eb2\u0e99\u0e9f\u0eb7\u0ec9\u0e99\u0e9f\u0eb9\u0e84\u0eb7\u0e99\u0ec3\u0eab\u0ea1\u0ec8\u0e9e\u0eb2\u0e8d\u0ec3\u0e99 2 \u0ea7\u0eb4\u0e99\u0eb2\u0e97\u0eb5"],
        ms: ["Pengesahan Keselamatan", "Pengesahan berjaya", "Kembali", "Mengesahkan...", "Pengesahan berjaya", "Terlalu kerap segar semula", "Kod Pengesahan akan disegar semula dalam 2 saat"],
        pl: ["Weryfikacja bezpiecze\u0144stwa", "Weryfikacja powiod\u0142a si\u0119", "Wstecz", "Weryfikowanie...", "Weryfikacja powiod\u0142a si\u0119", "Za cz\u0119sto od\u015bwie\u017casz", "Kod weryfikacyjny zostanie od\u015bwie\u017cony za 2 s."],
        pt: ["Verifica\xe7\xe3o de Seguran\xe7a", "Verificado com sucesso", "Voltar", "Verificando...", "Verificado com sucesso", "Atualizando muito", "C\xf3digo de Verifica\xe7\xe3o ser\xe1 atualizado em 2 seg."],
        ru: ["\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0432 \u0446\u0435\u043b\u044f\u0445 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438", "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043f\u0440\u043e\u0439\u0434\u0435\u043d\u0430", "\u041d\u0430\u0437\u0430\u0434", "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430...", "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043f\u0440\u043e\u0439\u0434\u0435\u043d\u0430", "\u0421\u043b\u0438\u0448\u043a\u043e\u043c \u0447\u0430\u0441\u0442\u043e\u0435 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435", "\u041f\u0440\u043e\u0432\u0435\u0440\u043e\u0447\u043d\u044b\u0439 \u043a\u043e\u0434 \u0431\u0443\u0434\u0435\u0442 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d \u0447\u0435\u0440\u0435\u0437 2 \u0441\u0435\u043a."],
        es: ["Verificaci\xf3n de seguridad", "Verificaci\xf3n correcta", "Atr\xe1s", "Verificando...", "Verificaci\xf3n correcta", "Actualizaci\xf3n muy frecuente", "El c\xf3digo se actualizar\xe1 en 2 segundos."],
        th: ["\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e04\u0e27\u0e32\u0e21\u0e1b\u0e25\u0e2d\u0e14\u0e20\u0e31\u0e22", "\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08\u0e41\u0e25\u0e49\u0e27", "\u0e01\u0e25\u0e31\u0e1a", "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19...", "\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08\u0e41\u0e25\u0e49\u0e27", "\u0e23\u0e35\u0e40\u0e1f\u0e23\u0e0a\u0e1a\u0e48\u0e2d\u0e22\u0e40\u0e01\u0e34\u0e19\u0e44\u0e1b", "\u0e23\u0e2b\u0e31\u0e2a\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e08\u0e30\u0e23\u0e35\u0e40\u0e1f\u0e23\u0e0a\u0e20\u0e32\u0e22\u0e43\u0e19 2 \u0e27\u0e34\u0e19\u0e32\u0e17\u0e35"],
        tr: ["G\xfcvenlik Do\u011frulamas\u0131", "Do\u011frulama ba\u015far\u0131l\u0131", "Geri", "Do\u011frulan\u0131yor", "Do\u011frulama ba\u015far\u0131l\u0131", "Yenilemeler \xe7ok s\u0131k", "Do\u011frulama Kodu 2 sn. sonra yenilenecek."],
        vi: ["X\xe1c minh b\u1ea3o m\u1eadt", "X\xe1c minh th\xe0nh c\xf4ng", "Quay l\u1ea1i", "\u0110ang x\xe1c minh...", "X\xe1c minh th\xe0nh c\xf4ng", "L\xe0m m\u1edbi qu\xe1 th\u01b0\u1eddng xuy\xean", "M\xe3 x\xe1c minh s\u1ebd \u0111\u01b0\u1ee3c l\xe0m m\u1edbi sau 2 gi\xe2y."]
    };
    a.zh = a["zh-cn"],
    a.iw = a.he,
    a["in"] = a.id;
    var n = {
        2052: "zh-cn",
        1028: "zh-hk",
        1033: "en"
    }
      , o = "zh";
    /MicroMessenger/.test(navigator.userAgent) && (o = "en");
    var s = navigator.languages && navigator.languages[0] ? navigator.languages[0] : navigator.language || navigator.userLanguage || ""
      , d = {
        rightToLeft: !1
    };
    d.browserLang = s,
    d.total = a,
    d.langExist = function(e) {
        var t = e;
        return /-/.test(e) && (t = e.split("-")[0]),
        a[e] ? e : !!a[t] && t
    }
    ,
    d.init = function(e) {
        /^\d+$/.test(e) && (e = n[e]);
        var t = (e || s || o).toLowerCase().replace(/_/, "-")
          , i = d.langExist(t);
        i || (i = "en");
        for (var l = a[i], c = 0; c < r.length; c++)
            d[r[c]] = l[c] || a[o][c];
        "ar" !== i && "he" !== i && "iw" !== i || (d.rightToLeft = !0),
        d.currentLanguage = i
    }
    ,
    d.init(),
    e.exports = d
}
, function(e, t, i) {
    "use strict";
    var r = this && this.__values || function(e) {
        var t = "function" == typeof Symbol && Symbol.iterator
          , i = t && e[t]
          , r = 0;
        if (i)
            return i.call(e);
        if (e && "number" == typeof e.length)
            return {
                next: function() {
                    return e && r >= e.length && (e = void 0),
                    {
                        value: e && e[r++],
                        done: !e
                    }
                }
            };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }
      , a = this && this.__read || function(e, t) {
        var i = "function" == typeof Symbol && e[Symbol.iterator];
        if (!i)
            return e;
        var r, a, n = i.call(e), o = [];
        try {
            for (; (void 0 === t || t-- > 0) && !(r = n.next()).done; )
                o.push(r.value)
        } catch (s) {
            a = {
                error: s
            }
        } finally {
            try {
                r && !r.done && (i = n["return"]) && i.call(n)
            } finally {
                if (a)
                    throw a.error
            }
        }
        return o
    }
    ;
    t.__esModule = !0,
    t.WindowChanged = void 0;
    var n = !1;
    t.WindowChanged = {
        listeners: [],
        lastSizes: [window.innerHeight, window.innerWidth],
        subscribe: function(e) {
            var i, a;
            try {
                for (var n = r(t.WindowChanged.listeners), o = n.next(); !o.done; o = n.next()) {
                    if (o.value === e)
                        return
                }
            } catch (s) {
                i = {
                    error: s
                }
            } finally {
                try {
                    o && !o.done && (a = n["return"]) && a.call(n)
                } finally {
                    if (i)
                        throw i.error
                }
            }
            t.WindowChanged.listeners.push(e),
            t.WindowChanged.opened4 && e(4),
            t.WindowChanged.opened6 && e(6)
        },
        opened4: !1,
        opened6: !1,
        bind: function() {
            try {
                if (n)
                    return;
                window.addEventListener("resize", function() {
                    var e, i, n = a(t.WindowChanged.lastSizes, 2), o = n[0], s = n[1], d = o - window.innerHeight, l = s - window.innerWidth;
                    if (t.WindowChanged.lastSizes = [window.innerHeight, window.innerWidth],
                    0 === d || 0 === l) {
                        var c = Math.max(d, l);
                        if (c > 250) {
                            t.WindowChanged.opened4 = !0;
                            try {
                                for (var p = r(t.WindowChanged.listeners), u = p.next(); !u.done; u = p.next()) {
                                    (0,
                                    u.value)(4)
                                }
                            } catch (f) {
                                e = {
                                    error: f
                                }
                            } finally {
                                try {
                                    u && !u.done && (i = p["return"]) && i.call(p)
                                } finally {
                                    if (e)
                                        throw e.error
                                }
                            }
                        }
                    }
                }),
                window.addEventListener("keydown", function(e) {
                    var i, a;
                    if (!0 === e.metaKey && !0 === e.altKey && 73 === e.keyCode || !0 === e.metaKey && !0 === e.altKey && 74 === e.keyCode || !0 === e.metaKey && !0 === e.altKey && 67 === e.keyCode || !0 === e.metaKey && !0 === e.shiftKey && 67 === e.keyCode || !0 === e.ctrlKey && !0 === e.shiftKey && 73 === e.keyCode || !0 === e.ctrlKey && !0 === e.shiftKey && 74 === e.keyCode || !0 === e.ctrlKey && !0 === e.shiftKey && 67 === e.keyCode || 123 === e.keyCode || !0 === e.metaKey && !0 === e.altKey && 85 === e.keyCode || !0 === e.ctrlKey && 85 === e.keyCode) {
                        t.WindowChanged.opened6 = !0;
                        try {
                            for (var n = r(t.WindowChanged.listeners), o = n.next(); !o.done; o = n.next()) {
                                (0,
                                o.value)(6)
                            }
                        } catch (s) {
                            i = {
                                error: s
                            }
                        } finally {
                            try {
                                o && !o.done && (a = n["return"]) && a.call(n)
                            } finally {
                                if (i)
                                    throw i.error
                            }
                        }
                    }
                }),
                n = !0
            } catch (e) {}
        }
    },
    t.WindowChanged.bind()
}
, function(e, t, i) {
    var r = i(91);
    "string" == typeof r && (r = [[e.i, r, ""]]);
    i(60)(r, {});
    r.locals && (e.exports = r.locals)
}
, function(e, t, i) {
    (e.exports = i(57)(!1)).push([e.i, "@keyframes animate_dots{0%{opacity:1}to{opacity:0}}@-webkit-keyframes animate_dots{0%{opacity:1}to{opacity:0}}.dot0,.dot1{animation:animate_dots .9s infinite;-moz-animation:animate_dots .9s infinite;-webkit-animation:animate_dots .9s infinite;-o-animation:animate_dots .9s infinite}.dot1{animation-delay:.2s;-webkit-animation-delay:.2s}.dot2{animation:animate_dots .9s infinite;-moz-animation:animate_dots .9s infinite;-webkit-animation:animate_dots .9s infinite;-o-animation:animate_dots .9s infinite;animation-delay:.4s;-webkit-animation-delay:.4s}.dots_item{display:inline-block;margin-right:5px;width:10px;height:10px;border-radius:50%;background:#4886ff}.verify-icon{position:absolute;width:100%;margin-top:70px;text-align:center}.t-embed-loading{width:300px;height:230px}.t-embed-loading,.t-inline-loading{position:relative;background-color:#fff}.t-embed-dots,.t-inline-dots{position:absolute;left:50%;top:50%;margin-left:-22.5px;margin-top:-5px}.t-embed-dot,.t-inline-dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;background:#4886ff}.t-mask{width:100%;width:100vw;height:100%;height:100vh;position:fixed;_position:absolute;left:0;top:0;background:#000;opacity:.5;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);z-index:2000000000}", ""])
}
, function(e, t, i) {
    "use strict";
    var r, a, n = (r = 1,
    (a = function(e) {
        return e = /subsid=\d+/.test(e) ? e.replace(/subsid=\d+/g, "subsid=" + r) : e.indexOf("?") >= 0 ? e + "&subsid=" + r : e + "?subsid=" + r,
        r++,
        e
    }
    ).reset = function() {
        r = 1
    }
    ,
    a.set = function(e) {
        e && (r = e)
    }
    ,
    a);
    e.exports = n
}
]);
