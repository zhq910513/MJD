!function (e) {
    var t = {};

    function i(r) {
        if (t[r])
            return t[r].exports;
        var n = t[r] = {
            i: r,
            l: !1,
            exports: {
                __esModule: undefined
            }
        };
        return e[r].call(n.exports, n, n.exports, i),
            n.l = !0,
            n.exports
    }

    i.m = e,
        i.c = t,
        i.d = function (e, t, r) {
            i.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        }
        ,
        i.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
        }
        ,
        i.t = function (e, t) {
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
                for (var n in e)
                    i.d(r, n, function (t) {
                        return e[t]
                    }
                        .bind(null, n));
            return r
        }
        ,
        i.n = function (e) {
            var t = e && e.__esModule ? function () {
                        return e["default"]
                    }
                    : function () {
                        return e
                    }
            ;
            return i.d(t, "a", t),
                t
        }
        ,
        i.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        i.p = "",
        i(i.s = 21)
}([function (e, t, i) {
    "use strict";
    var r = this && this.__createBinding || (Object.create ? function (e, t, i, r) {
                    r === undefined && (r = i),
                        Object.defineProperty(e, r, {
                            enumerable: !0,
                            get: function () {
                                return t[i]
                            }
                        })
                }
                : function (e, t, i, r) {
                    r === undefined && (r = i),
                        e[r] = t[i]
                }
        )
        , n = this && this.__exportStar || function (e, t) {
            for (var i in e)
                "default" === i || Object.prototype.hasOwnProperty.call(t, i) || r(t, e, i)
        }
    ;
    t.__esModule = !0,
        n(i(1), t),
        n(i(4), t),
        n(i(3), t),
        n(i(13), t),
        n(i(14), t),
        n(i(15), t),
        n(i(2), t)
}
    , function (e, t, i) {
        "use strict";
        var r = this && this.__importDefault || function (e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
        ;
        t.__esModule = !0,
            t.setVoiceOverFocus = t.bodyAriaHidden = t.addAriaModel = t.isTouchEventSupported = t.get$EventPosition = t.test$TouchEvent = t.supportsPassive = t.isWindow = t.getWindow = t.getOffset = t.isDarkMode = t.shakeEl = t.addOnceAnimationClass = t.animationEndName = t.removeClass = t.addMyClass = t.setCss = t.getCSS = t.supportsCSS = t.createGeneralIframe = void 0;
        var n = i(0)
            , a = r(i(9));
        t.createGeneralIframe = function (e) {
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
        t.supportsCSS = function (e, t) {
            var i = document.createElement("div");
            return e in i.style && "length" !== e && "parentRule" !== e && (i.style[e] = t,
            i.style[e] === t)
        }
        ;
        t.getCSS = function (e, t) {
            return e.currentStyle ? e.currentStyle[t] : window.getComputedStyle(e, null)[t]
        }
        ;
        t.setCss = function (e, t) {
            if (e && t && n.isObject(t)) {
                for (var i in t)
                    try {
                        e.style[i] = t[i]
                    } catch (r) {
                    }
                return t
            }
        }
        ;
        t.addMyClass = function (e, t) {
            if (e.classList)
                e.classList.add(t);
            else {
                var i = e.className
                    , r = i + ("" !== i ? " " : "") + t;
                e.className = r
            }
        }
        ;
        t.removeClass = function (e, t) {
            if (e.classList)
                return e.classList.remove(t);
            var i = " " + e.className + " "
                , r = (i = i.replace(/(\s+)/gi, " ")).replace(" " + t + " ", " ");
            r = r.replace(/(^\s+)|(\s+$)/g, ""),
                e.className = r
        }
            ,
            t.animationEndName = function () {
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
        t.addOnceAnimationClass = function (e) {
            var i = e.el
                , r = e.className
                , o = e.callback
                , s = e.duration;
            s || (s = 400),
            n.isArray(i) || (i = [i]);
            for (var c = 0; c < i.length; c++) {
                var u = i[c];
                t.addMyClass(u, r)
            }
            var d = function () {
                n.isArray(i) || (i = [i]);
                for (var e = 0; e < i.length; e++) {
                    var s = i[e];
                    t.removeClass(s, r)
                }
                o(),
                t.animationEndName && a["default"].remove(i[0], t.animationEndName, d)
            };
            t.animationEndName ? a["default"].add(i[0], t.animationEndName, d) : setTimeout(d, s)
        }
        ;
        t.shakeEl = function (e, i) {
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

        function c(e) {
            return /^touch/.test(e.type)
        }

        t.isDarkMode = function () {
            var e;
            return null === (e = window.matchMedia) || void 0 === e ? void 0 : e.call(window, "(prefers-color-scheme: dark)").matches
        }
            ,
            t.getOffset = function (e) {
                var t, i, r = {
                    top: 0,
                    left: 0
                }, n = null === e || void 0 === e ? void 0 : e.ownerDocument;
                if (n) {
                    t = n.documentElement,
                    "undefined" != typeof e.getBoundingClientRect && (r = e.getBoundingClientRect());
                    var a = 0
                        , s = 0;
                    return (i = o(n)) && (a = (i.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                        s = (i.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)),
                        {
                            top: r.top + a,
                            left: r.left + s
                        }
                }
            }
            ,
            t.getWindow = o,
            t.isWindow = s,
            t.supportsPassive = function () {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function () {
                            e = !0
                        }
                    });
                    window.addEventListener("testPassive", null, t),
                        window.removeEventListener("testPassive", null, t)
                } catch (i) {
                }
                return e
            }(),
            t.test$TouchEvent = c,
            t.get$EventPosition = function (e) {
                if (c(e)) {
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
            t.isTouchEventSupported = function () {
                return "ontouchstart" in document.createElement("div")
            }
            ,
            t.addAriaModel = function (e) {
                try {
                    e.setAttribute("role", "dialog"),
                        e.setAttribute("aria-modal", "true"),
                        e.setAttribute("aria-label", "\u9a8c\u8bc1\u7801")
                } catch (t) {
                }
            }
            ,
            t.bodyAriaHidden = {
                hide: function () {
                    try {
                        document.body.setAttribute("aria-hidden", "true")
                    } catch (e) {
                    }
                },
                unhide: function () {
                    try {
                        document.body.setAttribute("aria-hidden", "false")
                    } catch (e) {
                    }
                }
            },
            t.setVoiceOverFocus = function (e) {
                e.setAttribute("tabindex", "0"),
                    e.blur();
                var t = 0
                    , i = window.setInterval(function () {
                    e.focus(),
                    (t += 1) >= 10 && window.clearInterval(i)
                }, 10)
            }
    }
    , function (e, t, i) {
        "use strict";
        var r = this && this.__values || function (e) {
                var t = "function" == typeof Symbol && Symbol.iterator
                    , i = t && e[t]
                    , r = 0;
                if (i)
                    return i.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function () {
                            return e && r >= e.length && (e = void 0),
                                {
                                    value: e && e[r++],
                                    done: !e
                                }
                        }
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }
            , n = this && this.__importDefault || function (e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
        ;
        t.__esModule = !0,
            t.getHostname = t.checkLowAndroidQQ = t.checkWrongCspSrc = t.getCspSrc = t.checkWechatMiniProgram = t.checkCaptchaDomain = t.isSupportRem = t.camelToUnderscoreKeys = t.debounce = t.getPerformance = t.getLogCommonParams = t.getDeviceInfo = t.getTokenID = void 0;
        var a = n(i(16))
            , o = i(4);

        function s() {
            var e = function (e) {
                var t, i = document.cookie, r = encodeURIComponent(e), n = i.indexOf(r), a = null;
                if (n > -1) {
                    var o = i.indexOf(";", n);
                    -1 === o && (o = i.length),
                        a = decodeURIComponent(i.substring(n + r.length + 1, o))
                }
                try {
                    window.localStorage && (t = localStorage.getItem(e)),
                    window.sessionStorage && (t = t || sessionStorage.getItem(e))
                } catch (s) {
                }
                return t || a
            }("TDC_itoken");
            return e ? e.split(":")[0] : undefined
        }

        function c() {
            var e = new a["default"](navigator.userAgent);
            return {
                platform: e.getOS().name,
                client: e.getBrowser().name
            }
        }

        t.getTokenID = s,
            t.getDeviceInfo = c,
            t.getLogCommonParams = function () {
                try {
                    var e = document.referrer || "unknown"
                        , t = location.href || document.URL
                        , i = navigator.userAgent;
                    e = e.length > 512 ? e.substr(0, 512) : e,
                        t = t.length > 1024 ? t.substr(0, 1024) : t;
                    var r = c()
                        , n = r.client
                        , a = r.platform;
                    return ["referer=" + encodeURIComponent(e), "href=" + encodeURIComponent(t), "token_id=" + s(), "ua=" + i, "client=" + n, "platform=" + a]
                } catch (o) {
                    return t = (t = o.message).length > 1024 ? t.substr(0, 1024) : t,
                        ["href=" + encodeURIComponent(t)]
                }
            }
        ;
        t.getPerformance = function (e) {
            var t, i;
            if (window.performance && "function" == typeof window.performance.getEntriesByType) {
                var n = []
                    , a = window.performance.getEntriesByType("resource")
                    , o = ["xmlhttprequest", "script", "iframe", "img"];
                try {
                    for (var s = r(a), c = s.next(); !c.done; c = s.next()) {
                        var u = c.value;
                        if (-1 !== o.indexOf(u.initiatorType) && !/cap_monitor/.test(u.name) && e.test(u.name)) {
                            var d = u.name.split("://")[1].split("?")[0];
                            n.push({
                                name: d,
                                duration: Math.floor(u.duration)
                            })
                        }
                    }
                } catch (l) {
                    t = {
                        error: l
                    }
                } finally {
                    try {
                        c && !c.done && (i = s["return"]) && i.call(s)
                    } finally {
                        if (t)
                            throw t.error
                    }
                }
                return n
            }
            return []
        }
        ;
        t.debounce = function (e, t) {
            var i;
            return function () {
                for (var r = this, n = [], a = 0; a < arguments.length; a++)
                    n[a] = arguments[a];
                clearTimeout(i),
                    i = setTimeout(function () {
                        e.apply(r, n)
                    }, t)
            }
        }
        ;
        t.camelToUnderscoreKeys = function (e) {
            var t = {};
            for (var i in e)
                e.hasOwnProperty(i) && (t[i.replace(/([A-Z])/g, "_$1").toLowerCase()] = e[i]);
            return t
        }
        ;
        t.isSupportRem = function () {
            return window.addEventListener && document.querySelector
        }
        ;
        t.checkCaptchaDomain = function (e) {
            var t, i, n = !1;
            try {
                for (var a = r([/localhost:8302/, /captcha\.qq\.com/, /\.captcha\.qcloud\.com/, /captcha\.myqcloud\.com/, /captcha\.253\.com/, /t-captcha\.gjacky\.com/, /captcha\.gtimg\.com/, /captcha\.cloudcachetci\.com/]), o = a.next(); !o.done; o = a.next()) {
                    var s = o.value;
                    if (e.match(s)) {
                        n = !0;
                        break
                    }
                }
            } catch (c) {
                t = {
                    error: c
                }
            } finally {
                try {
                    o && !o.done && (i = a["return"]) && i.call(a)
                } finally {
                    if (t)
                        throw t.error
                }
            }
            return n
        }
        ;
        t.checkWechatMiniProgram = function () {
            return navigator.userAgent.match(/miniprogram/i) || "miniprogram" === window.__wxjs_environment
        }
        ;
        t.getCspSrc = function () {
            var e, t, i = document.querySelectorAll("meta");
            try {
                for (var n = r(i), a = n.next(); !a.done; a = n.next()) {
                    var s = a.value;
                    if (s.httpEquiv.match(/content-security-policy/i)) {
                        var c = s.content.match(/frame-src.*;/i);
                        if (o.isArray(c))
                            return c[0];
                        if (c = s.content.match(/child-src.*;/i),
                            o.isArray(c))
                            return c[0];
                        if (c = s.content.match(/default-src.*;/i),
                            o.isArray(c))
                            return c[0]
                    }
                }
            } catch (u) {
                e = {
                    error: u
                }
            } finally {
                try {
                    a && !a.done && (t = n["return"]) && t.call(n)
                } finally {
                    if (e)
                        throw e.error
                }
            }
            return ""
        }
        ;
        t.checkWrongCspSrc = function (e) {
            return !e.match(/https:\/\/captcha.gtimg.com/i) && !e.match(/\*.gtimg.com/i)
        }
        ;
        t.checkLowAndroidQQ = function () {
            var e = window.navigator.userAgent;
            if (e.match(/android/i)) {
                var t = e.match(/QQ\/(\d+\.\d+\.\d+)/);
                if (t && 2 === t.length) {
                    var i = t[1]
                        , r = function (e, t, i) {
                        return e[i] || t[i] ? e[i] === t[i] ? r(e, t, i + 1) : Number(e[i]) - Number(t[i]) : 0
                    };
                    if (r(i.split("."), "8.9.28".split("."), 0) <= 0)
                        return !0
                }
            }
            return !1
        }
            ,
            t.getHostname = function (e) {
                var t = document.createElement("a");
                return t.href = e,
                    t.hostname
            }
    }
    , function (e, t, i) {
        "use strict";
        t.__esModule = !0,
            t.addUrlParam = t.getQueryParam = t.getQueryMap = t.getQuery = t.cutUrl = t.getEntryUrl = t.getReferrer = t.getHref = void 0;
        t.getHref = function () {
            var e = location.href || document.URL || "";
            return e.length > 256 ? e.substr(0, 255) + "*" : e
        }
        ;
        t.getReferrer = function () {
            var e = document.referrer || "";
            return e.length > 256 ? e.substr(0, 255) + "*" : e
        }
        ;
        t.getEntryUrl = function () {
            var e = t.getHref();
            try {
                if (e.indexOf("xui.ptlogin2.qq.com") > -1) {
                    var i = e.match(/s_url=(.*?)&/);
                    i && (e = decodeURIComponent(i[1]))
                }
            } catch (r) {
            }
            return e
        }
        ;
        t.cutUrl = function (e) {
            if (e) {
                var t = e.indexOf("?");
                if (t > 0)
                    return e.substring(0, t)
            }
            return e
        }
        ;
        t.getQuery = function (e) {
            var t = e ? 1 : 0;
            try {
                return location.search.substr(t)
            } catch (n) {
                try {
                    var i = document.URL
                        , r = i.indexOf("?");
                    if (r >= 0)
                        return i.substr(r + t)
                } catch (n) {
                }
            }
            return ""
        }
        ;
        t.getQueryMap = function () {
            for (var e = {}, i = t.getQuery(!0).split("&"), r = 0; r < i.length; r++) {
                var n = /(.*?)=(.*)/.exec(i[r]);
                n && (e[n[1]] = n[2])
            }
            return e
        }
        ;
        t.getQueryParam = function (e) {
            return t.getQueryMap()[e]
        }
        ;
        var r = function (e, t, i) {
            if (-1 != e.indexOf("?")) {
                var r = new RegExp("(\\?|&" + t + ")=[^&]*");
                e = r.test(e) ? e.replace(r, "$1=" + i) : e + "&" + t + "=" + i
            } else
                e = e + "?" + t + "=" + i;
            return e
        };
        t.addUrlParam = function (e, t) {
            var i;
            for (i in t)
                "undefined" != typeof t[i] && (e = r(e, encodeURIComponent(i), encodeURIComponent("" + t[i])));
            return e
        }
    }
    , function (e, t, i) {
        "use strict";
        t.__esModule = !0,
            t.isArray = t.isObject = void 0;
        var r = function (e) {
            return function (t) {
                return Object.prototype.toString.call(t) === "[object " + e + "]"
            }
        };
        t.isObject = r("Object"),
            t.isArray = r("Array")
    }
    , function (e, t) {
        (function (t) {
                e.exports = t
            }
        ).call(this, {})
    }
    , function (e, t, i) {
        "use strict";
        var r = Object.prototype.hasOwnProperty
            , n = Object.prototype.toString
            , a = Object.defineProperty
            , o = Object.getOwnPropertyDescriptor
            , s = function (e) {
            return "function" == typeof Array.isArray ? Array.isArray(e) : "[object Array]" === n.call(e)
        }
            , c = function (e) {
            if (!e || "[object Object]" !== n.call(e))
                return !1;
            var t, i = r.call(e, "constructor"),
                a = e.constructor && e.constructor.prototype && r.call(e.constructor.prototype, "isPrototypeOf");
            if (e.constructor && !i && !a)
                return !1;
            for (t in e)
                ;
            return void 0 === t || r.call(e, t)
        }
            , u = function (e, t) {
            a && "__proto__" === t.name ? a(e, t.name, {
                enumerable: !0,
                configurable: !0,
                value: t.newValue,
                writable: !0
            }) : e[t.name] = t.newValue
        }
            , d = function (e, t) {
            if ("__proto__" === t) {
                if (!r.call(e, t))
                    return;
                if (o)
                    return o(e, t).value
            }
            return e[t]
        };
        e.exports = function l() {
            var e, t, i, r, n, a, o = arguments[0], p = 1, f = arguments.length, h = !1;
            for ("boolean" == typeof o && (h = o,
                o = arguments[1] || {},
                p = 2),
                 (null == o || "object" != typeof o && "function" != typeof o) && (o = {}); p < f; ++p)
                if (null != (e = arguments[p]))
                    for (t in e)
                        i = d(o, t),
                        o !== (r = d(e, t)) && (h && r && (c(r) || (n = s(r))) ? (n ? (n = !1,
                            a = i && s(i) ? i : []) : a = i && c(i) ? i : {},
                            u(o, {
                                name: t,
                                newValue: l(h, a, r)
                            })) : void 0 !== r && u(o, {
                            name: t,
                            newValue: r
                        }));
            return o
        }
    }
    , function (e, t, i) {
        "use strict";
        var r = this && this.__assign || function () {
                return (r = Object.assign || function (e) {
                        for (var t, i = 1, r = arguments.length; i < r; i++)
                            for (var n in t = arguments[i])
                                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                        return e
                    }
                ).apply(this, arguments)
            }
        ;
        t.__esModule = !0,
            t.isIos = t.getIEVersion = t.isLowIE = t.hexToRgb = t.setImageUrl = t.getSpriteEl = t.setSpriteUrl = t.getSpriteStyleStr = t.getSpriteStyle = void 0;
        var n = i(1);

        function a(e, t) {
            var i = e.size_2d
                , r = e.sprite_pos
                , n = e.init_pos
                , a = e.spriteSize
                , o = 0
                , s = 0;
            return n && (s = n[0] * t,
                o = n[1] * t),
                {
                    bgPosLeft: -r[0] * t,
                    bgPosTop: -r[1] * t,
                    bgWidth: a[0] * t,
                    bgHeight: a[1] * t,
                    width: i[0] * t,
                    height: i[1] * t,
                    left: s,
                    top: o
                }
        }

        function o(e, t) {
            var i = a(e, t);
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
                , c = e.zIndex
                , u = e.isPureGet
                , d = void 0 !== u && u
                , l = e.el || document.createElement("div");
            if ($(l).children().remove(),
            !n.supportsCSS("backgroundSize", "10px 10px") || d) {
                var p = document.createElement("img");
                p.src = "" + window.TCaptchaApiDomain + s;
                var f = a(t, i);
                return $(p).on("dragstart", function () {
                    return !1
                }),
                    n.setCss(l, {
                        overflow: "hidden",
                        width: f.width + "px",
                        height: f.height + "px"
                    }),
                d || (n.setCss(l, {
                    position: "absolute",
                    top: f.top + "px",
                    left: f.left + "px"
                }),
                c !== undefined && n.setCss(l, {
                    zIndex: "" + c
                })),
                    n.setCss(p, {
                        position: "absolute",
                        width: f.bgWidth + "px",
                        height: f.bgHeight + "px",
                        top: f.bgPosTop + "px",
                        left: f.bgPosLeft + "px"
                    }),
                    l.appendChild(p),
                    l
            }
            return n.setCss(l, r({
                position: "absolute",
                backgroundImage: "url(" + window.TCaptchaApiDomain + s + ")"
            }, o(t, i))),
            c !== undefined && n.setCss(l, {
                zIndex: "" + c
            }),
                l
        }

        t.getSpriteStyle = a,
            t.getSpriteStyleStr = o,
            t.setSpriteUrl = s,
            t.getSpriteEl = s,
            t.setImageUrl = function (e, t, i, r) {
                $(e).children().remove();
                var a = n.supportsCSS("backgroundSize", "10px 10px")
                    , o = "" + window.TCaptchaApiDomain + i;
                if (-1 !== i.indexOf("http") && (o = i),
                    !a) {
                    var s = document.createElement("img");
                    return s.src = o,
                        $(s).on("dragstart", function () {
                            return !1
                        }),
                        n.setCss(e, {
                            position: "absolute",
                            zIndex: "1",
                            overflow: "hidden",
                            width: t[0] * r + "px",
                            height: t[1] * r + "px",
                            top: "0px",
                            left: "0px"
                        }),
                        n.setCss(s, {
                            position: "absolute",
                            width: "100%",
                            height: "auto",
                            top: "0px",
                            left: "0px"
                        }),
                        void e.appendChild(s)
                }
                n.setCss(e, {
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
            t.hexToRgb = function (e) {
                return parseInt("0x" + e.slice(1, 3), 16) + " " + parseInt("0x" + e.slice(3, 5), 16) + " " + parseInt("0x" + e.slice(5, 7), 16)
            }
        ;
        t.isLowIE = function () {
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
        t.getIEVersion = function () {
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
        t.isIos = function () {
            return !!/iphone|ipad|ipod/gi.test(navigator.userAgent)
        }
    }
    , function (e, t, i) {
        "use strict";
        t.__esModule = !0,
            t.isIframeSupportCdnDomain = t.getScriptUrl = t.getScript = void 0;
        var r = i(7)
            , n = i(2);
        t.getScript = function a(e, t) {
            var i = 3
                , r = e.src
                , n = e.successCheck
                , o = e.success
                , s = e.error
                , c = e.crossOrigin
                , u = e.timeout
                , d = void 0 === u ? 15e3 : u
                ,
                l = Boolean(e.inHead) ? document.getElementsByTagName("head").item(0) : document.getElementsByTagName("body").item(0)
                , p = !1
                , f = document.createElement("script");

            function h(e) {
                if (!p) {
                    var t = !1;
                    e && "type" in e && (t = "load" === e.type),
                    "readyState" in this && /^(loaded|complete)$/.test(this.readyState) && (t = !0),
                    t && (!n || n() ? (b(),
                        p = !0,
                    null === o || void 0 === o || o()) : m())
                }
            }

            function m(e) {
                void 0 === e && (e = !1),
                p || (b(),
                    p = !0,
                    (t = t || 1) >= i ? null === s || void 0 === s || s(e) : a({
                        src: r,
                        successCheck: n,
                        success: o,
                        error: s
                    }, t + 1))
            }

            function b() {
                try {
                    l && f && l.removeChild(f)
                } catch (s) {
                }
            }

            f.type = "text/javascript",
                f.async = !0,
                f.src = r,
            c && f.setAttribute("crossorigin", c),
                "onload" in f ? f.onload = h : f.onreadystatechange = h,
                f.onerror = function () {
                    m(!1)
                }
                ,
            null === l || void 0 === l || l.appendChild(f),
                setTimeout(function () {
                    m(!0)
                }, d)
        }
            ,
            t.getScriptUrl = function () {
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
        t.isIframeSupportCdnDomain = function () {
            var e = r.getIEVersion();
            if (-1 !== e && e <= 9)
                return !1;
            if (n.checkWechatMiniProgram())
                return !1;
            var t = n.getCspSrc();
            return !(t && n.checkWrongCspSrc(t) || n.checkLowAndroidQQ())
        }
    }
    , function (e, t, i) {
        "use strict";
        t.__esModule = !0;
        t["default"] = {
            add: function (e, t, i) {
                e && (e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent ? e.attachEvent("on" + t, i) : e["on" + t] = i)
            },
            remove: function (e, t, i) {
                e && (e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent ? e.detachEvent("on" + t, i) : e["on" + t] = null)
            }
        }
    }
    , function (e, t, i) {
        "use strict";

        function r(e, i, r) {
            return "terror_" + t.ErrorCode[e] + "_" + i + "_" + Math.floor((new Date).getTime() / 1e3) + (r ? "_" + r : "")
        }

        function n() {
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
            t.getErrorRes = function (e, i, a) {
                return {
                    ret: 0,
                    randstr: n(),
                    ticket: r(e, i || "", a),
                    errorCode: t.ErrorCode[e],
                    errorMessage: e.toLowerCase()
                }
            }
            ,
            t.getRandStr = n
    }
    , function (e, t, i) {
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
    , function (e, t) {
        var i = this && this.__read || function (e, t) {
                var i = "function" == typeof Symbol && e[Symbol.iterator];
                if (!i)
                    return e;
                var r, n, a = i.call(e), o = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(r = a.next()).done;)
                        o.push(r.value)
                } catch (s) {
                    n = {
                        error: s
                    }
                } finally {
                    try {
                        r && !r.done && (i = a["return"]) && i.call(a)
                    } finally {
                        if (n)
                            throw n.error
                    }
                }
                return o
            }
            , r = this && this.__spreadArray || function (e, t) {
                for (var i = 0, r = t.length, n = e.length; i < r; i++,
                    n++)
                    e[n] = t[i];
                return e
            }
        ;

        function n(e, t) {
            var n = null;
            return function () {
                for (var a = [], o = 0; o < arguments.length; o++)
                    a[o] = arguments[o];
                n || (e.apply(void 0, r([], i(a))),
                    n = setTimeout(function () {
                        return n = null
                    }, t))
            }
        }

        var a = function () {
            function e() {
                var e = this;
                this.mouseMoveLimit = 80,
                    this.otherEventLimit = 20,
                    this.throttleLimit = 30,
                    this.version = 4,
                    this.mouseMoveCount = 0,
                    this.otherEventCount = 0,
                    this.previousX = 0,
                    this.previousY = 0,
                    this.isReady = !1,
                    this._eventHandler = function (t, i) {
                        var r = t || window.event;
                        if (1 === i && e.mouseMoveCount < e.mouseMoveLimit || 1 !== i && e.otherEventCount < e.otherEventLimit) {
                            var n = (new Date).getTime()
                                , a = e._getPointerPosByEvent(r)
                                , o = a.x
                                , s = a.y
                                , c = o - e.previousX
                                , u = s - e.previousY
                                , d = n - e.previousTime;
                            e.previousX = o,
                                e.previousY = s,
                                e.previousTime = n;
                            var l = 0;
                            r.isTrusted !== undefined && (l = r.isTrusted ? 0 : 1),
                                e.behavioralDataList.push([i, c, u, d, l]),
                                1 === i ? e.mouseMoveCount += 1 : e.otherEventCount += 1
                        }
                    }
                    ,
                    this._addEventListener = function (e, t) {
                        document.addEventListener ? document.addEventListener(e, t, !0) : document["on" + e] = t
                    }
                    ,
                    this._getPointerPosByEvent = function (e) {
                        var t = 0
                            , i = 0
                            , r = e.type;
                        return "mousemove" === r || "mousedown" === r || "mouseup" === r ? (t = e.clientX,
                            i = e.clientY) : "touchmove" !== r && "touchstart" !== r && "touchend" !== r || e.changedTouches && e.changedTouches.length > 0 && (t = e.changedTouches[0].clientX,
                            i = e.changedTouches[0].clientY),
                            {
                                x: Math.floor(t),
                                y: Math.floor(i)
                            }
                    }
                    ,
                    this.previousTime = (new Date).getTime(),
                    this.behavioralDataList = [[this.version, 0, 0, this.previousTime, 0]],
                    this.isReady = !1
            }

            return e.prototype.start = function () {
                var e = this;
                this.isReady = !0,
                    this._addEventListener("mousemove", n(function (t) {
                        e._eventHandler(t, 1)
                    }, this.throttleLimit)),
                    this._addEventListener("mousedown", n(function (t) {
                        e._eventHandler(t, 2)
                    }, this.throttleLimit)),
                    this._addEventListener("mouseup", n(function (t) {
                        e._eventHandler(t, 3)
                    }, this.throttleLimit)),
                    this._addEventListener("touchmove", n(function (t) {
                        e._eventHandler(t, 1)
                    }, this.throttleLimit)),
                    this._addEventListener("touchstart", n(function (t) {
                        e._eventHandler(t, 2)
                    }, this.throttleLimit)),
                    this._addEventListener("touchend", n(function (t) {
                        e._eventHandler(t, 3)
                    }, this.throttleLimit))
            }
                ,
                e.prototype.getData = function () {
                    var e = this.behavioralDataList;
                    return this.mouseMoveCount = 0,
                        this.otherEventCount = 0,
                        this.previousX = 0,
                        this.previousY = 0,
                        this.previousTime = (new Date).getTime(),
                        this.behavioralDataList = [[this.version, 0, 0, this.previousTime, 0]],
                        e
                }
                ,
                e.prototype.getIsReady = function () {
                    return this.isReady
                }
                ,
                e
        }();
        e.exports = a
    }
    , function (e, t, i) {
        "use strict";
        var r = this && this.__importDefault || function (e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
        ;
        t.__esModule = !0,
            t.shrinkArraySizeFromRuisun = t.shrinkArraySize = t.extend = void 0;
        var n = r(i(6));
        t.extend = Object.assign || n["default"],
            t.shrinkArraySize = function (e, t, i) {
                var r = e.length;
                if (r <= t)
                    return e;
                var n = [];
                (i = i || {}).keepStart && (t -= 1,
                    r -= 1,
                    n.push(e[0])),
                i.keepLast && (r -= 1,
                    t -= 1);
                for (var a = t / r, o = 0, s = 0; s < r; s++)
                    (o += a) >= 1 && (n.push(e[s]),
                        o -= 1);
                return i.keepLast && n.push(e[e.length - 1]),
                    n
            }
            ,
            t.shrinkArraySizeFromRuisun = function (e, t, i) {
                var r = e.length;
                if (r <= t)
                    return e;
                (i = i || {}).keepStart && (r -= 1),
                i.keepLast && (r -= 1,
                    t -= 1);
                for (var n = Math.floor(r / (t - 1)), a = 0, o = []; o.length < t;)
                    o.push(e[a]),
                        a += n;
                return i.keepLast && o.push(e[e.length - 1]),
                    o
            }
    }
    , function (e, t, i) {
        "use strict";
        t.__esModule = !0,
            t.isWebWorkerSupport = t.setWebworkerSupportCache = t.getWebworkerSupportCache = void 0;
        var r = "captcha_webworker_supported";
        t.getWebworkerSupportCache = function () {
            try {
                return localStorage.getItem(r)
            } catch (e) {
            }
            return !1
        }
            ,
            t.setWebworkerSupportCache = function (e) {
                try {
                    localStorage.setItem(r, e)
                } catch (t) {
                }
            }
            ,
            t.isWebWorkerSupport = function () {
                var e = self || window;
                try {
                    try {
                        var t = void 0;
                        try {
                            t = new e.Blob([""])
                        } catch (a) {
                            (t = new (e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder)).append(""),
                                t = t.getBlob()
                        }
                        var i = e.URL || e.webkitURL
                            , r = i.createObjectURL(t)
                            , n = new e.Worker(r);
                        return i.revokeObjectURL(r),
                            n
                    } catch (a) {
                        return new e.Worker("data:application/javascript,".concat(encodeURIComponent("")))
                    }
                } catch (a) {
                    return null
                }
            }
    }
    , function (e, t, i) {
        "use strict";
        t.__esModule = !0,
            t.langTransform = t.getWxLang = t.getBrowserLang = void 0;
        var r = i(3)
            , n = i(11);

        function a() {
            var e = r.getQuery()
                , t = /(wehcat_real_lang|wechat_real_lang)=([a-zA-Z_-]+)/.exec(e);
            if (t)
                return t[2];
            for (var i = document.getElementsByTagName("script"), n = 0; n < i.length; n++) {
                var a = i[n].src;
                if (a && /TCapIframeApi/i.test(a)) {
                    var o = /lang=([a-zA-Z_-]+)/.exec(a);
                    if (o)
                        return o[1].toLowerCase()
                }
            }
            return r.getQueryParam("wxLang") || ""
        }

        t.getBrowserLang = function () {
            var e = navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage || "";
            if (/MicroMessenger/.test(navigator.userAgent)) {
                var t = a();
                t && (e = t)
            }
            return e
        }
            ,
            t.getWxLang = a,
            t.langTransform = function (e) {
                var t = e.toLowerCase().replace(/_/, "-")
                    , i = t;
                return /-/.test(i) && (i = i.split("-")[0]),
                    n.all[t] ? t : i
            }
    }
    , function (e, t, i) {
        var r;
        !function (n, a) {
            "use strict";
            var o = "model"
                , s = "name"
                , c = "type"
                , u = "vendor"
                , d = "version"
                , l = "mobile"
                , p = "tablet"
                , f = "smarttv"
                , h = function (e) {
                for (var t = {}, i = 0; i < e.length; i++)
                    t[e[i].toUpperCase()] = e[i];
                return t
            }
                , m = function (e, t) {
                return "string" == typeof e && -1 !== b(t).indexOf(b(e))
            }
                , b = function (e) {
                return e.toLowerCase()
            }
                , g = function (e, t) {
                if ("string" == typeof e)
                    return e = e.replace(/^\s\s*/, ""),
                        void 0 === t ? e : e.substring(0, 350)
            }
                , v = function (e, t) {
                for (var i, r, n, a, o, s, c = 0; c < t.length && !o;) {
                    var u = t[c]
                        , d = t[c + 1];
                    for (i = r = 0; i < u.length && !o && u[i];)
                        if (o = u[i++].exec(e))
                            for (n = 0; n < d.length; n++)
                                s = o[++r],
                                    "object" == typeof (a = d[n]) && a.length > 0 ? 2 === a.length ? "function" == typeof a[1] ? this[a[0]] = a[1].call(this, s) : this[a[0]] = a[1] : 3 === a.length ? "function" != typeof a[1] || a[1].exec && a[1].test ? this[a[0]] = s ? s.replace(a[1], a[2]) : void 0 : this[a[0]] = s ? a[1].call(this, s, a[2]) : void 0 : 4 === a.length && (this[a[0]] = s ? a[3].call(this, s.replace(a[1], a[2])) : void 0) : this[a] = s || void 0;
                    c += 2
                }
            }
                , w = function (e, t) {
                for (var i in t)
                    if ("object" == typeof t[i] && t[i].length > 0) {
                        for (var r = 0; r < t[i].length; r++)
                            if (m(t[i][r], e))
                                return "?" === i ? void 0 : i
                    } else if (m(t[i], e))
                        return "?" === i ? void 0 : i;
                return e
            }
                , y = {
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
                browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [d, [s, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [d, [s, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [s, d], [/opios[\/ ]+([\w\.]+)/i], [d, [s, "Opera Mini"]], [/\bopr\/([\w\.]+)/i], [d, [s, "Opera"]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i], [s, d], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [d, [s, "UCBrowser"]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [d, [s, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [d, [s, "WeChat"]], [/konqueror\/([\w\.]+)/i], [d, [s, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [d, [s, "IE"]], [/yabrowser\/([\w\.]+)/i], [d, [s, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[s, /(.+)/, "$1 Secure Browser"], d], [/\bfocus\/([\w\.]+)/i], [d, [s, "Firefox Focus"]], [/\bopt\/([\w\.]+)/i], [d, [s, "Opera Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [d, [s, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [d, [s, "Dolphin"]], [/coast\/([\w\.]+)/i], [d, [s, "Opera Coast"]], [/miuibrowser\/([\w\.]+)/i], [d, [s, "MIUI Browser"]], [/fxios\/([-\w\.]+)/i], [d, [s, "Firefox"]], [/\bqihu|(qi?ho?o?|360)browser/i], [[s, "360 Browser"]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[s, /(.+)/, "$1 Browser"], d], [/(comodo_dragon)\/([\w\.]+)/i], [[s, /_/g, " "], d], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [s, d], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [s], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[s, "Facebook"], d], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [s, d], [/\bgsa\/([\w\.]+) .*safari\//i], [d, [s, "GSA"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [d, [s, "Chrome Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[s, "Chrome WebView"], d], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [d, [s, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [s, d], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [d, [s, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [d, s], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [s, [d, w, {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                }]], [/(webkit|khtml)\/([\w\.]+)/i], [s, d], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[s, "Netscape"], d], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [d, [s, "Firefox Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [s, d], [/(cobalt)\/([\w\.]+)/i], [s, [d, /master.|lts./, ""]]],
                cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [["architecture", "amd64"]], [/(ia32(?=;))/i], [["architecture", b]], [/((?:i[346]|x)86)[;\)]/i], [["architecture", "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [["architecture", "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [["architecture", "armhf"]], [/windows (ce|mobile); ppc;/i], [["architecture", "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [["architecture", /ower/, "", b]], [/(sun4\w)[;\)]/i], [["architecture", "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [["architecture", b]]],
                device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [o, [u, "Samsung"], [c, p]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [o, [u, "Samsung"], [c, l]], [/\((ip(?:hone|od)[\w ]*);/i], [o, [u, "Apple"], [c, l]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [o, [u, "Apple"], [c, p]], [/(macintosh);/i], [o, [u, "Apple"]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [o, [u, "Sharp"], [c, l]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [o, [u, "Huawei"], [c, p]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [o, [u, "Huawei"], [c, l]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[o, /_/g, " "], [u, "Xiaomi"], [c, l]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[o, /_/g, " "], [u, "Xiaomi"], [c, p]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [o, [u, "OPPO"], [c, l]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [o, [u, "Vivo"], [c, l]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [o, [u, "Realme"], [c, l]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [o, [u, "Motorola"], [c, l]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [o, [u, "Motorola"], [c, p]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [o, [u, "LG"], [c, p]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [o, [u, "LG"], [c, l]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [o, [u, "Lenovo"], [c, p]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[o, /_/g, " "], [u, "Nokia"], [c, l]], [/(pixel c)\b/i], [o, [u, "Google"], [c, p]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [o, [u, "Google"], [c, l]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [o, [u, "Sony"], [c, l]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[o, "Xperia Tablet"], [u, "Sony"], [c, p]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [o, [u, "OnePlus"], [c, l]], [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [o, [u, "Amazon"], [c, p]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[o, /(.+)/g, "Fire Phone $1"], [u, "Amazon"], [c, l]], [/(playbook);[-\w\),; ]+(rim)/i], [o, u, [c, p]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [o, [u, "BlackBerry"], [c, l]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [o, [u, "ASUS"], [c, p]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [o, [u, "ASUS"], [c, l]], [/(nexus 9)/i], [o, [u, "HTC"], [c, p]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [u, [o, /_/g, " "], [c, l]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [o, [u, "Acer"], [c, p]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [o, [u, "Meizu"], [c, l]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [u, o, [c, l]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [u, o, [c, p]], [/(surface duo)/i], [o, [u, "Microsoft"], [c, p]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [o, [u, "Fairphone"], [c, l]], [/(u304aa)/i], [o, [u, "AT&T"], [c, l]], [/\bsie-(\w*)/i], [o, [u, "Siemens"], [c, l]], [/\b(rct\w+) b/i], [o, [u, "RCA"], [c, p]], [/\b(venue[\d ]{2,7}) b/i], [o, [u, "Dell"], [c, p]], [/\b(q(?:mv|ta)\w+) b/i], [o, [u, "Verizon"], [c, p]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [o, [u, "Barnes & Noble"], [c, p]], [/\b(tm\d{3}\w+) b/i], [o, [u, "NuVision"], [c, p]], [/\b(k88) b/i], [o, [u, "ZTE"], [c, p]], [/\b(nx\d{3}j) b/i], [o, [u, "ZTE"], [c, l]], [/\b(gen\d{3}) b.+49h/i], [o, [u, "Swiss"], [c, l]], [/\b(zur\d{3}) b/i], [o, [u, "Swiss"], [c, p]], [/\b((zeki)?tb.*\b) b/i], [o, [u, "Zeki"], [c, p]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[u, "Dragon Touch"], o, [c, p]], [/\b(ns-?\w{0,9}) b/i], [o, [u, "Insignia"], [c, p]], [/\b((nxa|next)-?\w{0,9}) b/i], [o, [u, "NextBook"], [c, p]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[u, "Voice"], o, [c, l]], [/\b(lvtel\-)?(v1[12]) b/i], [[u, "LvTel"], o, [c, l]], [/\b(ph-1) /i], [o, [u, "Essential"], [c, l]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [o, [u, "Envizen"], [c, p]], [/\b(trio[-\w\. ]+) b/i], [o, [u, "MachSpeed"], [c, p]], [/\btu_(1491) b/i], [o, [u, "Rotor"], [c, p]], [/(shield[\w ]+) b/i], [o, [u, "Nvidia"], [c, p]], [/(sprint) (\w+)/i], [u, o, [c, l]], [/(kin\.[onetw]{3})/i], [[o, /\./g, " "], [u, "Microsoft"], [c, l]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [o, [u, "Zebra"], [c, p]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [o, [u, "Zebra"], [c, l]], [/smart-tv.+(samsung)/i], [u, [c, f]], [/hbbtv.+maple;(\d+)/i], [[o, /^/, "SmartTV"], [u, "Samsung"], [c, f]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[u, "LG"], [c, f]], [/(apple) ?tv/i], [u, [o, "Apple TV"], [c, f]], [/crkey/i], [[o, "Chromecast"], [u, "Google"], [c, f]], [/droid.+aft(\w)( bui|\))/i], [o, [u, "Amazon"], [c, f]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [o, [u, "Sharp"], [c, f]], [/(bravia[\w ]+)( bui|\))/i], [o, [u, "Sony"], [c, f]], [/(mitv-\w{5}) bui/i], [o, [u, "Xiaomi"], [c, f]], [/Hbbtv.*(technisat) (.*);/i], [u, o, [c, f]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[u, g], [o, g], [c, f]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[c, f]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [u, o, [c, "console"]], [/droid.+; (shield) bui/i], [o, [u, "Nvidia"], [c, "console"]], [/(playstation [345portablevi]+)/i], [o, [u, "Sony"], [c, "console"]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [o, [u, "Microsoft"], [c, "console"]], [/((pebble))app/i], [u, o, [c, "wearable"]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [o, [u, "Apple"], [c, "wearable"]], [/droid.+; (glass) \d/i], [o, [u, "Google"], [c, "wearable"]], [/droid.+; (wt63?0{2,3})\)/i], [o, [u, "Zebra"], [c, "wearable"]], [/(quest( 2| pro)?)/i], [o, [u, "Facebook"], [c, "wearable"]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [u, [c, "embedded"]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [o, [c, l]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [o, [c, p]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[c, p]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[c, l]], [/(android[-\w\. ]{0,9});.+buil/i], [o, [u, "Generic"]]],
                engine: [[/windows.+ edge\/([\w\.]+)/i], [d, [s, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [d, [s, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i], [s, d], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [d, s]],
                os: [[/microsoft (windows) (vista|xp)/i], [s, d], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [s, [d, w, y]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[s, "Windows"], [d, w, y]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i], [[d, /_/g, "."], [s, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[s, "Mac OS"], [d, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [d, s], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [s, d], [/\(bb(10);/i], [d, [s, "BlackBerry"]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [d, [s, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [d, [s, "Firefox OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [d, [s, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [d, [s, "watchOS"]], [/crkey\/([\d\.]+)/i], [d, [s, "Chromecast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[s, "Chromium OS"], d], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [s, d], [/(sunos) ?([\w\.\d]*)/i], [[s, "Solaris"], d], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i], [s, d]]
            }
                , k = function (e, t) {
                if ("object" == typeof e && (t = e,
                    e = void 0),
                    !(this instanceof k))
                    return new k(e, t).getResult();
                var i = void 0 !== n && n.navigator ? n.navigator : void 0
                    , r = e || (i && i.userAgent ? i.userAgent : "")
                    , a = i && i.userAgentData ? i.userAgentData : void 0
                    , o = t ? function (e, t) {
                    var i = {};
                    for (var r in e)
                        t[r] && t[r].length % 2 == 0 ? i[r] = t[r].concat(e[r]) : i[r] = e[r];
                    return i
                }(_, t) : _;
                return this.getBrowser = function () {
                    var e, t = {};
                    return t.name = void 0,
                        t.version = void 0,
                        v.call(t, r, o.browser),
                        t.major = "string" == typeof (e = t.version) ? e.replace(/[^\d\.]/g, "").split(".")[0] : void 0,
                    i && i.brave && "function" == typeof i.brave.isBrave && (t.name = "Brave"),
                        t
                }
                    ,
                    this.getCPU = function () {
                        var e = {
                            architecture: void 0
                        };
                        return v.call(e, r, o.cpu),
                            e
                    }
                    ,
                    this.getDevice = function () {
                        var e = {
                            vendor: void 0,
                            model: void 0,
                            type: void 0
                        };
                        return v.call(e, r, o.device),
                        !e.type && a && a.mobile && (e.type = l),
                        "Macintosh" == e.model && i && "undefined" != typeof i.standalone && i.maxTouchPoints && i.maxTouchPoints > 2 && (e.model = "iPad",
                            e.type = p),
                            e
                    }
                    ,
                    this.getEngine = function () {
                        var e = {
                            name: void 0,
                            version: void 0
                        };
                        return v.call(e, r, o.engine),
                            e
                    }
                    ,
                    this.getOS = function () {
                        var e = {
                            name: void 0,
                            version: void 0
                        };
                        return v.call(e, r, o.os),
                        !e.name && a && "Unknown" != a.platform && (e.name = a.platform.replace(/chrome os/i, "Chromium OS").replace(/macos/i, "Mac OS")),
                            e
                    }
                    ,
                    this.getResult = function () {
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
                    this.getUA = function () {
                        return r
                    }
                    ,
                    this.setUA = function (e) {
                        return r = "string" == typeof e && e.length > 350 ? g(e, 350) : e,
                            this
                    }
                    ,
                    this.setUA(r),
                    this
            };
            k.VERSION = "1.0.34",
                k.BROWSER = h([s, d, "major"]),
                k.CPU = h(["architecture"]),
                k.DEVICE = h([o, u, c, "console", l, f, p, "wearable", "embedded"]),
                k.ENGINE = k.OS = h([s, d]),
                void 0 !== t ? (void 0 !== e && e.exports && (t = e.exports = k),
                    t.UAParser = k) : i(5) ? void 0 === (r = function () {
                    return k
                }
                    .call(t, i, t, e)) || (e.exports = r) : void 0 !== n && (n.UAParser = k);
            var E = void 0 !== n && (n.jQuery || n.Zepto);
            if (E && !E.ua) {
                var S = new k;
                E.ua = S.getResult(),
                    E.ua.get = function () {
                        return S.getUA()
                    }
                    ,
                    E.ua.set = function (e) {
                        S.setUA(e);
                        var t = S.getResult();
                        for (var i in t)
                            E.ua[i] = t[i]
                    }
            }
        }("object" == typeof window ? window : this)
    }
    , function (module, exports, __webpack_require__) {
        "use strict";
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
        ;
        "object" !== ("undefined" == typeof JSON ? "undefined" : _typeof(JSON)) && (JSON = {}),
            function () {
                var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    rx_four = /(?:^|:|,)(?:\s*\[)+/g,
                    rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    gap, indent, meta, rep;

                function f(e) {
                    return e < 10 ? "0" + e : e
                }

                function this_value() {
                    return this.valueOf()
                }

                function quote(e) {
                    return rx_escapable.lastIndex = 0,
                        rx_escapable.test(e) ? '"' + e.replace(rx_escapable, function (e) {
                            var t = meta[e];
                            return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                        }) + '"' : '"' + e + '"'
                }

                function str(e, t) {
                    var i, r, n, a, o, s = gap, c = t[e];
                    switch (c && "object" === (void 0 === c ? "undefined" : _typeof(c)) && "function" == typeof c.toJSON && (c = c.toJSON(e)),
                    "function" == typeof rep && (c = rep.call(t, e, c)),
                        void 0 === c ? "undefined" : _typeof(c)) {
                        case "string":
                            return quote(c);
                        case "number":
                            return isFinite(c) ? String(c) : "null";
                        case "boolean":
                        case "null":
                            return String(c);
                        case "object":
                            if (!c)
                                return "null";
                            if (gap += indent,
                                o = [],
                            "[object Array]" === Object.prototype.toString.apply(c)) {
                                for (a = c.length,
                                         i = 0; i < a; i += 1)
                                    o[i] = str(i, c) || "null";
                                return n = 0 === o.length ? "[]" : gap ? "[\n" + gap + o.join(",\n" + gap) + "\n" + s + "]" : "[" + o.join(",") + "]",
                                    gap = s,
                                    n
                            }
                            if (rep && "object" === (void 0 === rep ? "undefined" : _typeof(rep)))
                                for (a = rep.length,
                                         i = 0; i < a; i += 1)
                                    "string" == typeof rep[i] && (n = str(r = rep[i], c)) && o.push(quote(r) + (gap ? ": " : ":") + n);
                            else
                                for (r in c)
                                    Object.prototype.hasOwnProperty.call(c, r) && (n = str(r, c)) && o.push(quote(r) + (gap ? ": " : ":") + n);
                            return n = 0 === o.length ? "{}" : gap ? "{\n" + gap + o.join(",\n" + gap) + "\n" + s + "}" : "{" + o.join(",") + "}",
                                gap = s,
                                n
                    }
                }

                "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
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
                        JSON.stringify = function (e, t, i) {
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
                "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
                        var j;

                        function walk(e, t) {
                            var i, r, n = e[t];
                            if (n && "object" === (void 0 === n ? "undefined" : _typeof(n)))
                                for (i in n)
                                    Object.prototype.hasOwnProperty.call(n, i) && ((r = walk(n, i)) !== undefined ? n[i] = r : delete n[i]);
                            return reviver.call(e, t, n)
                        }

                        if (text = String(text),
                            rx_dangerous.lastIndex = 0,
                        rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (e) {
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
    , function (e, t, i) {
        "use strict";
        var r = i(0);
        e.exports = function (e) {
            var t = window.document.getElementsByTagName("script")[0]
                , i = window.document.createElement("script")
                , n = e.callback || "callback"
                , a = "_aq_" + Math.floor(1e6 * Math.random());
            window[a] = function () {
                try {
                    delete window[a]
                } catch (t) {
                }
                e.success && e.success.apply(null, Array.prototype.slice.call(arguments))
            }
            ;
            var o = e.url
                , s = {};
            s[n] = a,
            e.data && (s = (0,
                r.extend)(s, e.data)),
                o = (0,
                    r.addUrlParam)(o, s),
                i.async = !!e.async,
                i.src = o;
            var c = null;
            e.timeout && (c = setTimeout(function () {
                i && t.parentNode && t.parentNode.contains(i) && t.parentNode.removeChild(i),
                    window[a] = function () {
                    }
                    ,
                e.error && e.error(!0)
            }, e.timeout)),
                i.onload = function () {
                    c && clearTimeout(c),
                    i && t.parentNode && t.parentNode.contains(i) && t.parentNode.removeChild(i)
                }
                ,
                i.onerror = function () {
                    c && clearTimeout(c),
                    e.error && e.error()
                }
                ,
                t.parentNode.insertBefore(i, t)
        }
    }
    , function (e, t, i) {
        "use strict";

        function r(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++)
                    i[t] = e[t];
                return i
            }
            return Array.from(e)
        }

        var n = i(0).getLogCommonParams
            , a = {
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
            , c = [];

        function u(e, t, i) {
            var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "0";
            try {
                if (void 0 === s)
                    return void c.push([e, t, i]);
                if (s)
                    return;
                (i = i || o[e]).length > 1024 && i.substr(0, 1024);
                var u = ["type=" + (e = a[e]), "appid=" + t, "reason=" + encodeURIComponent(i), "dyeid=" + r];
                if (window.__TencentCaptchaOpts__) {
                    var d = window.__TencentCaptchaOpts__.dyeid;
                    d && "0" !== d && (u[3] = "dyeid=" + d)
                }
                (new Image).src = (window.AqSCodeCapDomain || "") + "/cap_monitor?" + n().join("&") + "&" + u.join("&")
            } catch (l) {
            }
        }

        e.exports = {
            type: a,
            send: u,
            perfectStack: function (e) {
                var t = "";
                e && e.stack && (t = e.stack.replace(/\n/gi, "").split(/\bat\b/).join("\n").replace(/\?[^:]+/gi, ""));
                try {
                    var i = e.toString();
                    t.indexOf(i) < 0 && (t = i + "@" + t)
                } catch (r) {
                }
                return t
            },
            setGlobalStatus: function (e) {
                if (!(s = e))
                    for (var t = 0; t < c.length; t++) {
                        var i = c[t];
                        u.apply(undefined, r(i))
                    }
            }
        }
    }
    , , function (module, exports, __webpack_require__) {
        "use strict";
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
        ;
        if (!0 === window.__TencentCaptchaExists__)
            throw new Error("\u8bf7\u52ff\u591a\u6b21\u5f15\u7528\u817e\u8baf\u9a8c\u8bc1\u7801\u7684\u63a5\u5165js");
        window.__TencentCaptchaExists__ = !0;
        var _require = __webpack_require__(10)
            , getErrorRes = _require.getErrorRes
            , Executor = __webpack_require__(22)
            , _require2 = __webpack_require__(8)
            , getScript = _require2.getScript
            , getScriptUrl = _require2.getScriptUrl;
        __webpack_require__(17);
        var domReady = __webpack_require__(23)
            , btoa = window.btoa || __webpack_require__(24)
            , extend = Object.assign || __webpack_require__(6)
            , eventListener = __webpack_require__(25)
            , isIEVar = __webpack_require__(26)
            , isElement = __webpack_require__(27)
            , getScriptDomain = __webpack_require__(28)
            , Jsonp = __webpack_require__(18)
            , CaptchaTracker = __webpack_require__(12)
            , scriptDomain = getScriptDomain() || ""
            , isWechatDevtools = navigator.userAgent && /wechatdevtools/.test(navigator.userAgent)
            , isWindows = /windows/i.test(navigator.userAgent)
            ,
            isMobile = !isWindows && ("ontouchstart" in window || "ontouchstart" in document.createElement("div") || isWechatDevtools)
            , capDomain = "https://t.captcha.qq.com";
        capDomain || (capDomain = scriptDomain),
            window.TCaptchaGlobal = false,
        "https://t-captcha.gjacky.com" !== scriptDomain && "https://sg.captcha.qcloud.com" !== scriptDomain || (window.TCaptchaGlobal = !0);
        var cdnDomain = window.TCaptchaGlobal ? "https://global.captcha.gtimg.com/static" : "https://captcha.gtimg.com/static"
            , canarySwitch = !1;
        window.AqSCodeCapDomain = capDomain,
            window.AqSCodeCdnDomain = cdnDomain;
        var frameJsPath = "/tcaptcha-frame.70f42bb2.js"
            , capError = __webpack_require__(19)
            , _require3 = __webpack_require__(0)
            , checkCaptchaDomain = _require3.checkCaptchaDomain
            , getCspSrc = _require3.getCspSrc
            , checkWrongCspSrc = _require3.checkWrongCspSrc
            , capObj = void 0
            , initQueue = []
            , initQueueCount = 0
            , tracker = new CaptchaTracker;
        tracker.start();
        var defaultOpt = {
            type: "popup",
            pos: isIEVar(6) ? "absolute" : "fixed",
            lang: 2052,
            showHeader: isMobile,
            needFeedBack: true,
            themeColor: "",
            tcaptchaFlag: !0,
            gettype: "cap_union_prehandle",
            domain: capDomain,
            htdoc_path: capDomain,
            global: window.TCaptchaGlobal,
            dyeid: "0",
            tracker: tracker
        }
            , noop = function () {
        }
            , callbackWrap = function (e, t) {
            return function (i) {
                "object" === (void 0 === i ? "undefined" : _typeof(i)) && (i = extend({
                    bizState: e.options.bizState,
                    appid: e.options.appid
                }, i)),
                t && t(i)
            }
        }
            , executor = new Executor(function () {
                if (initQueue.length > 0) {
                    for (var e = 0; e < initQueue.length; e++)
                        initQueue[e].instance.show();
                    initQueue.length = 0
                }
            }
            , 0)
            , Captcha = function Captcha($btn, appid, _tcallback_, opts) {
            var _this2 = this
                , bizState = void 0;
            if (isElement($btn))
                if (appid && "object" === (void 0 === appid ? "undefined" : _typeof(appid)))
                    opts = appid,
                        appid = null,
                        _tcallback_ = null;
                else {
                    if (appid = appid || $btn.getAttribute("data-appid"),
                        !_tcallback_) {
                        var callbackName = $btn.getAttribute("data-cbfn");
                        try {
                            _tcallback_ = eval("window." + callbackName)
                        } catch (e) {
                            throw new Error("Lost `callback`")
                        }
                    }
                    bizState = $btn.getAttribute("data-biz-state")
                }
            else {
                if ("string" != typeof $btn || "function" != typeof appid)
                    throw new Error("The parameter of the constructor of the Captcha is passed incorrectly, please refer to the documentation to see the specification of passing parameters");
                opts = _tcallback_,
                    _tcallback_ = appid,
                    appid = $btn,
                    $btn = null
            }
            opts = opts || {},
                opts.callback = _tcallback_ || opts.callback,
                opts.start = opts.start || noop,
                opts.end = opts.end || noop;
            var readyCallback = "function" == typeof opts.ready ? opts.ready : noop;
            if (opts.ready = function (e) {
                readyCallback.call(this, e)
            }
                ,
                opts.appid = appid || opts.appid,
                opts.bizState = bizState || opts.bizState,
                opts.fwidth = parseFloat(opts.fwidth) || 0,
                opts.sdkOpts = opts.sdkOpts || null,
                opts.ele = $btn,
                this.options = opts,
            "function" != typeof opts.callback)
                throw new Error("Lost `callback`");
            if (this.initOpts = extend({}, defaultOpt, opts),
                window.__TencentCaptchaOpts__ = this.initOpts,
                this.langFun(),
                $btn) {
                var that = this;
                eventListener.add($btn, "click", function () {
                    that.show()
                })
            }
            this.checkStandardIntegrate(appid),
                capError.setGlobalStatus(!0 === opts.global),
            "undefined" == typeof window.AqSCode && executor.exec(function (e) {
                var t = _this2
                    , i = function (i) {
                    var r = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
                    t.initOpts.frameJs = i,
                    r || (t.initOpts.dyeid = "0"),
                        e()
                };
                if (canarySwitch) {
                    var r = window.AqSCodeCapDomain + "/cap_union_preload";
                    Jsonp({
                        url: r,
                        data: {
                            aid: _this2.initOpts.appid,
                            showtype: _this2.initOpts.type,
                            clienttype: isMobile ? 1 : 2
                        },
                        timeout: 200,
                        success: function (e) {
                            try {
                                var t = e.content
                                    , r = e.dyeid;
                                if ("0" === e.retcode && t && "" !== t && r && "0" !== r) {
                                    var n = JSON.parse(t).grayHash;
                                    n && (_this2.initOpts.grayFrameJsPath = "/tcaptcha-frame." + n + ".js",
                                        _this2.initOpts.dyeid = r)
                                }
                            } catch (a) {
                                capError.send("PRELOAD_RESPONSE_WRONG", _this2.initOpts.appid, "Preload response parse error | domain:" + window.AqSCodeCapDomain + ", error:" + a)
                            }
                            loadFrameJs(i, _this2.initOpts)
                        },
                        error: function () {
                            var e = arguments.length > 0 && arguments[0] !== undefined && arguments[0]
                                , t = e ? "PRELOAD_REQUEST_TIMEOUT" : "PRELOAD_REQUEST_ERROR"
                                ,
                                r = "Preload request " + (e ? "timeout" : "error") + " | domain:" + window.AqSCodeCapDomain;
                            capError.send(t, _this2.initOpts.appid, r),
                                loadFrameJs(i, _this2.initOpts)
                        }
                    })
                } else
                    loadFrameJs(i, _this2.initOpts)
            })
        }
            , showTimeout = null
            , onceSwitch = !0;
        Captcha.prototype = {
            show: function () {
                var e = this;
                onceSwitch && (this.initOpts.captchaShowStart = (new Date).getTime(),
                    onceSwitch = !1);
                if (executor.isDone)
                    this.__show__(),
                    null !== showTimeout && (clearTimeout(showTimeout),
                        showTimeout = null);
                else {
                    for (var t = 0; t < initQueue.length; t++)
                        if (initQueue[t].instance === this)
                            return;
                    var i = initQueueCount += 1;
                    initQueue.push({
                        instance: this,
                        index: i
                    }),
                    null === showTimeout && (showTimeout = setTimeout(function () {
                        showTimeout = null;
                        for (var t = 0; t < initQueue.length; t++) {
                            if (initQueue[t].index === i)
                                return initQueue.splice(t, 1),
                                    e.initOpts.callback(getErrorRes("CAPTCHA_SHOW_TIMEOUT", e.initOpts.appid))
                        }
                    }, 2e4))
                }
            },
            __show__: function () {
                var e = this.initOpts;
                if ("undefined" == typeof window.AqSCode)
                    return e.callback(getErrorRes("FRAMEJS_LOAD_ERROR", e.appid));
                this.destroy();
                var t = [];
                t.push("aid=" + e.appid),
                    t.push("protocol=https"),
                    t.push("accver=1"),
                    t.push("showtype=" + e.type),
                    t.push("ua=" + encodeURIComponent(btoa((navigator.userAgent || "").replace(/[\u00ff-\uffff]+/g, "")))),
                    t.push("noheader=" + ("" + e.showHeader == "false" ? "1" : "0"));
                var i = e.needFeedBack;
                "string" == typeof i && t.push("fbUrl=" + i),
                    t.push("fb=" + (i ? "1" : "0"));
                var r = e.enableDarkMode;
                "force" !== r && (r = r ? "1" : "0");
                var n = e.enableAged;
                t.push("aged=" + ("force" === n ? "1" : "0")),
                    t.push("enableAged=" + (n ? "1" : "0")),
                    t.push("enableDarkMode=" + r),
                e.deviceID && t.push("deviceID=" + e.deviceID),
                e.sid && t.push("sid=" + e.sid),
                    e.uid = "" + (e.uin || ""),
                    t.push("grayscale=1"),
                    e.grayscale = 1,
                    t.push("dyeid=" + e.dyeid),
                    isMobile && "point" !== e.type ? (t.push("clientype=1"),
                        e.clientype = 1,
                    e.forceLang && t.push("lang=" + e.forceLang),
                        e.params = "?" + t.join("&")) : (t.push("clientype=2"),
                        e.clientype = 2,
                    e.forceLang && t.push("lang=" + e.forceLang),
                        e.params = "?" + t.join("&"),
                        e.s_type_suffix = "?" + t.join("&"),
                        e.src = capDomain + "/template/placeholder_v2.html" + e.s_type_suffix,
                        e.s_type = capDomain + "/cap_union_prehandle" + e.s_type_suffix,
                        e.slide_src = capDomain + "/template/new_slide_placeholder.html" + e.s_type_suffix),
                    e.fb = "" + e.needFeedBack == "false" ? "0" : "1",
                    e.fbUrl = "string" == typeof e.needFeedBack && encodeURIComponent(e.needFeedBack),
                    e.isNewEntry = !0,
                    window.__TencentCaptchaOpts__ = e;
                try {
                    (capObj = new AqSCode(e)).listen(callbackWrap(this, e.callback), callbackWrap(this, e.ready)),
                        capObj.create()
                } catch (a) {
                    capError.send("ERROR_TYPE_FRAMEJS_CODE_ERROR", e.appid, "entry create err: " + a.message)
                }
            },
            langFun: function () {
                if (this.initOpts.forceLang) {
                    var e = {
                        "zh-cn": "2052",
                        "zh-hk": "1028",
                        en: "1033"
                    }
                        , t = this.initOpts.forceLang;
                    e[t] ? (this.initOpts.lang = e[t],
                        this.initOpts.forceLang = e[t],
                        this.initOpts.forcestyle = 1) : this.initOpts.forceLang = ""
                }
            },
            destroy: function () {
                capObj && capObj.destroy && capObj.destroy()
            },
            refresh: function () {
                capObj && capObj.refresh && capObj.refresh()
            },
            getTicket: function () {
                if (capObj && capObj.getTicket) {
                    var e = null;
                    return callbackWrap(this, function (t) {
                        e = t
                    })(capObj.getTicket()),
                        e
                }
                return null
            },
            checkStandardIntegrate: function (e) {
                try {
                    var t = getScriptUrl();
                    if (!t)
                        return;
                    var i = t.stack;
                    checkCaptchaDomain(i) || capError.send("STANDARD_INTEGRATE_MONITOR", e, "NonStandardDomain | stack:" + i);
                    var r = getCspSrc();
                    r && checkWrongCspSrc(r) && capError.send("STANDARD_INTEGRATE_MONITOR", e, "CdnDomainNotInCspSrc | cspSrc:" + r)
                } catch (n) {
                }
            }
        };
        var autoBindBtn = function () {
            var e = document.getElementById("TencentCaptcha");
            e && new Captcha(e)
        }
            , domReadyCb = function () {
            try {
                autoBindBtn()
            } catch (e) {
            }
        };

        function loadFrameJs(e, t) {
            var i = "0" !== t.dyeid
                , r = i ? t.grayFrameJsPath : frameJsPath
                , n = "" + cdnDomain + r
                , a = function () {
                return "undefined" != typeof window.AqSCode
            };
            getScript({
                src: n,
                successCheck: a,
                success: function () {
                    e(r, i)
                },
                error: function (o) {
                    var s = {
                        type: o ? "FRAME_JS_LOAD_TIMEOUT" : "FRAME_JS_LOAD_ERROR",
                        appid: t.appid,
                        msg: (o ? "Load timeout" : "Load error") + ": " + n
                    };
                    capError.send(s.type, s.appid, s.msg),
                        i = !1,
                        getScript({
                            src: n = "" + capDomain + r,
                            successCheck: a,
                            success: function () {
                                e(r, i)
                            },
                            error: function (t) {
                                s.msg = (t ? "Load timeout" : "Load error") + ": " + n,
                                    capError.send(s.type, s.appid, s.msg),
                                    e(r, i)
                            }
                        })
                },
                inHead: !0
            })
        }

        executor.exec(function (e) {
            var t = !1;
            domReady(function () {
                t || (t = !0,
                    domReadyCb(),
                    e())
            })
        }),
            window.TencentCaptcha = Captcha
    }
    , function (e, t, i) {
        "use strict";
        var r = function (e, t) {
            this.i = 0,
                this.doneCallback = e,
                this.isDone = !1,
                this.timeout = t || 0;
            var i = this;
            this.immediateExec = setTimeout(function () {
                i.doneCheck()
            }, 0)
        };
        r.prototype = {
            doneCheck: function (e, t) {
                try {
                    e && e(t)
                } catch (i) {
                }
                if (this.i--,
                this.i <= 0)
                    try {
                        this.isDone = !0,
                            this.doneCallback()
                    } catch (i) {
                    }
            },
            exec: function (e, t, i) {
                clearTimeout(this.immediateExec);
                var r = !1
                    , n = ""
                    , a = this;
                this.i++,
                this.i > 0 && (this.isDone = !1);
                try {
                    (n = e(function (e) {
                        r || (r = !0,
                            setTimeout(function () {
                                a.doneCheck(t, e)
                            }, 0))
                    })) && (r = !0,
                        setTimeout(function () {
                            a.doneCheck(t, n)
                        }, 0))
                } catch (o) {
                }
                (i = i || this.timeout || 0) > 0 && setTimeout(function () {
                    r || (r = !0,
                        a.doneCheck(t, ""))
                }, i)
            }
        },
            e.exports = r
    }
    , function (e, t, i) {
        e.exports = function (e) {
            var t, i = [], r = document, n = r.documentElement, a = n.doScroll,
                o = (a ? /^loaded|^c/ : /^loaded|c/).test(r.readyState);

            function s(e) {
                for (o = 1; e = i.shift();)
                    e()
            }

            return r.addEventListener && r.addEventListener("DOMContentLoaded", t = function () {
                    r.removeEventListener("DOMContentLoaded", t, !1),
                        s()
                }
                , !1),
            a && r.attachEvent("onreadystatechange", t = function () {
                    /^c/.test(r.readyState) && (r.detachEvent("onreadystatechange", t),
                        s())
                }
            ),
                e = a ? function (t) {
                        self != top ? o ? t() : i.push(t) : function () {
                            try {
                                n.doScroll("left")
                            } catch (i) {
                                return setTimeout(function () {
                                    e(t)
                                }, 50)
                            }
                            t()
                        }()
                    }
                    : function (e) {
                        o ? e() : i.push(e)
                    }
        }()
    }
    , function (e, t, i) {
        "use strict";
        var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
            , n = function (e) {
            var t = [0, 2, 1][e.length % 3]
                ,
                i = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
            return [r.charAt(i >>> 18), r.charAt(i >>> 12 & 63), t >= 2 ? "=" : r.charAt(i >>> 6 & 63), t >= 1 ? "=" : r.charAt(63 & i)].join("")
        };
        e.exports = function (e) {
            return e.replace(/[\s\S]{1,3}/g, n)
        }
    }
    , function (e, t, i) {
        "use strict";
        e.exports = {
            add: function (e, t, i) {
                e && (e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent ? e.attachEvent("on" + t, i) : e["on" + t] = i)
            },
            remove: function (e, t, i) {
                e && (e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent ? e.detachEvent("on" + t, i) : e["on" + t] = null)
            }
        }
    }
    , function (e, t, i) {
        "use strict";
        e.exports = function (e) {
            var t = document.createElement("b");
            return t.innerHTML = "\x3c!--[if IE " + e + "]><i></i><![endif]--\x3e",
            t.getElementsByTagName("i") && 1 === t.getElementsByTagName("i").length
        }
    }
    , function (e, t, i) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
        ;
        e.exports = function (e) {
            try {
                return e instanceof HTMLElement
            } catch (t) {
                return "object" === (void 0 === e ? "undefined" : r(e)) && 1 === e.nodeType && "object" === r(e.style) && "object" === r(e.ownerDocument)
            }
        }
    }
    , function (e, t, i) {
        "use strict";
        var r = i(0).getHref
            , n = function (e) {
            var t = e.split("?");
            if (2 !== t.length)
                return {};
            for (var i = t[1] && t[1].split("&"), r = {}, n = 0; n < i.length; n++) {
                var a = i[n].split("=");
                a[1] && (r[a[0]] = decodeURIComponent(a[1]))
            }
            return r
        }
            , a = function () {
            for (var e = document.getElementsByTagName("script"), t = 0; t < e.length; t++) {
                var i = e[t];
                if (i.src.match(/captcha\.js/i))
                    return i
            }
        };
        e.exports = function () {
            try {
                var e = document.getElementById("CaptchaScript") || a() || "";
                if (!e)
                    return "";
                var t = e.src
                    , i = n(t).domain;
                if (i)
                    return i;
                var o = /(https?\:\/\/[0-9a-zA-Z-:\.]+)\//i
                    , s = t.match(o) || r().match(o);
                return s ? s[1] : ""
            } catch (c) {
                return ""
            }
        }
    }
]);
