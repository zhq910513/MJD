# -*- coding: utf-8 -*-
import base64
import json
import pprint
import random
from pathlib import Path

import cv2
import execjs
import numpy as np
from curl_cffi import requests


class CaptchaBase(object):
    def __init__(self, proxies=None):
        self.proxies = proxies
        self.js_code = '''function r(t, n) {
        var e = (65535 & t) + (65535 & n);
        return (t >> 16) + (n >> 16) + (e >> 16) << 16 | 65535 & e
    }
    function o(t, n, e, o, u, f) {
        return r(function(t, n) {
            return t << n | t >>> 32 - n
        }(r(r(n, t), r(o, f)), u), e)
    }
    function u(t, n, e, r, u, f, a) {
        return o(n & e | ~n & r, t, n, u, f, a)
    }
    function f(t, n, e, r, u, f, a) {
        return o(n & r | e & ~r, t, n, u, f, a)
    }
    function a(t, n, e, r, u, f, a) {
        return o(n ^ e ^ r, t, n, u, f, a)
    }
    function i(t, n, e, r, u, f, a) {
        return o(e ^ (n | ~r), t, n, u, f, a)
    }
    function c(t, n) {
        var e, o, c, l, s;
        t[n >> 5] |= 128 << n % 32,
        t[14 + (n + 64 >>> 9 << 4)] = n;
        var d = 1732584193
          , p = -271733879
          , g = -1732584194
          , _ = 271733878;
        for (e = 0; e < t.length; e += 16)
            o = d,
            c = p,
            l = g,
            s = _,
            p = i(p = i(p = i(p = i(p = a(p = a(p = a(p = a(p = f(p = f(p = f(p = f(p = u(p = u(p = u(p = u(p, g = u(g, _ = u(_, d = u(d, p, g, _, t[e], 7, -680876936), p, g, t[e + 1], 12, -389564586), d, p, t[e + 2], 17, 606105819), _, d, t[e + 3], 22, -1044525330), g = u(g, _ = u(_, d = u(d, p, g, _, t[e + 4], 7, -176418897), p, g, t[e + 5], 12, 1200080426), d, p, t[e + 6], 17, -1473231341), _, d, t[e + 7], 22, -45705983), g = u(g, _ = u(_, d = u(d, p, g, _, t[e + 8], 7, 1770035416), p, g, t[e + 9], 12, -1958414417), d, p, t[e + 10], 17, -42063), _, d, t[e + 11], 22, -1990404162), g = u(g, _ = u(_, d = u(d, p, g, _, t[e + 12], 7, 1804603682), p, g, t[e + 13], 12, -40341101), d, p, t[e + 14], 17, -1502002290), _, d, t[e + 15], 22, 1236535329), g = f(g, _ = f(_, d = f(d, p, g, _, t[e + 1], 5, -165796510), p, g, t[e + 6], 9, -1069501632), d, p, t[e + 11], 14, 643717713), _, d, t[e], 20, -373897302), g = f(g, _ = f(_, d = f(d, p, g, _, t[e + 5], 5, -701558691), p, g, t[e + 10], 9, 38016083), d, p, t[e + 15], 14, -660478335), _, d, t[e + 4], 20, -405537848), g = f(g, _ = f(_, d = f(d, p, g, _, t[e + 9], 5, 568446438), p, g, t[e + 14], 9, -1019803690), d, p, t[e + 3], 14, -187363961), _, d, t[e + 8], 20, 1163531501), g = f(g, _ = f(_, d = f(d, p, g, _, t[e + 13], 5, -1444681467), p, g, t[e + 2], 9, -51403784), d, p, t[e + 7], 14, 1735328473), _, d, t[e + 12], 20, -1926607734), g = a(g, _ = a(_, d = a(d, p, g, _, t[e + 5], 4, -378558), p, g, t[e + 8], 11, -2022574463), d, p, t[e + 11], 16, 1839030562), _, d, t[e + 14], 23, -35309556), g = a(g, _ = a(_, d = a(d, p, g, _, t[e + 1], 4, -1530992060), p, g, t[e + 4], 11, 1272893353), d, p, t[e + 7], 16, -155497632), _, d, t[e + 10], 23, -1094730640), g = a(g, _ = a(_, d = a(d, p, g, _, t[e + 13], 4, 681279174), p, g, t[e], 11, -358537222), d, p, t[e + 3], 16, -722521979), _, d, t[e + 6], 23, 76029189), g = a(g, _ = a(_, d = a(d, p, g, _, t[e + 9], 4, -640364487), p, g, t[e + 12], 11, -421815835), d, p, t[e + 15], 16, 530742520), _, d, t[e + 2], 23, -995338651), g = i(g, _ = i(_, d = i(d, p, g, _, t[e], 6, -198630844), p, g, t[e + 7], 10, 1126891415), d, p, t[e + 14], 15, -1416354905), _, d, t[e + 5], 21, -57434055), g = i(g, _ = i(_, d = i(d, p, g, _, t[e + 12], 6, 1700485571), p, g, t[e + 3], 10, -1894986606), d, p, t[e + 10], 15, -1051523), _, d, t[e + 1], 21, -2054922799), g = i(g, _ = i(_, d = i(d, p, g, _, t[e + 8], 6, 1873313359), p, g, t[e + 15], 10, -30611744), d, p, t[e + 6], 15, -1560198380), _, d, t[e + 13], 21, 1309151649), g = i(g, _ = i(_, d = i(d, p, g, _, t[e + 4], 6, -145523070), p, g, t[e + 11], 10, -1120210379), d, p, t[e + 2], 15, 718787259), _, d, t[e + 9], 21, -343485551),
            d = r(d, o),
            p = r(p, c),
            g = r(g, l),
            _ = r(_, s);
        return [d, p, g, _]
    }
    function l(t) {
        var n, e = "";
        for (n = 0; n < 32 * t.length; n += 8)
            e += String.fromCharCode(t[n >> 5] >>> n % 32 & 255);
        return e
    }
    function s(t) {
        var n, e = [];
        for (e[(t.length >> 2) - 1] = void 0,
        n = 0; n < e.length; n += 1)
            e[n] = 0;
        for (n = 0; n < 8 * t.length; n += 8)
            e[n >> 5] |= (255 & t.charCodeAt(n / 8)) << n % 32;
        return e
    }
    function d(t) {
        var n, e, r = "0123456789abcdef", o = "";
        for (e = 0; e < t.length; e += 1)
            n = t.charCodeAt(e),
            o += r.charAt(n >>> 4 & 15) + r.charAt(15 & n);
        return o
    }
    function p(t) {
        return unescape(encodeURIComponent(t))
    }
    function g(t) {
        return function(t) {
            return l(c(s(t), 8 * t.length))
        }(p(t))
    }
    function _(t, n) {
        return function(t, n) {
            var e, r, o = s(t), u = [], f = [];
            for (u[15] = f[15] = void 0,
            o.length > 16 && (o = c(o, 8 * t.length)),
            e = 0; e < 16; e += 1)
                u[e] = 909522486 ^ o[e],
                f[e] = 1549556828 ^ o[e];
            return r = c(u.concat(s(n)), 512 + 8 * n.length),
            l(c(f.concat(r), 640))
        }(p(t), p(n))
    }
function v(t, n, e) {
        return n ? e ? _(n, t) : function(t, n) {
            return d(_(t, n))
        }(n, t) : e ? g(t) : function(t) {
            return d(g(t))
        }(t)
    }
function getWorkloadResult(t, n) {
        for (var e = t.nonce, r = t.target, o = +new Date, u = 0, f = "number" == typeof n ? n : 3e4; v("" + e + u) !== r && (u += 1,
        !(+new Date - o > f)); )
            ;
        return {
            ans: u,
            duration: +new Date - o
        }
    };delete Buffer;
delete require;
var global_opts = {
    ip: "",
    screen: {
        width: 1792,
        height: 1120,
        colorDepth: 30,
        pixelDepth: 30,
    },
    location: {
        href: "https://global.captcha.gtimg.com/template/drag_ele_global.html",
    },
    navigator: {
        hardwareConcurrency: 12,
        platform: "MacIntel",
        userAgent: window.ua,
    },
    document: {
        documentElement: {
            clientWidth: 300,
            clientHeight: 230,
        },
        referrer: "https://security.wechat.com/security/",
    },
};
var BASE64_ENCODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function btoa(str) {
    var c1,
        c2,
        c3,
        i = 0,
        len = str.length,
        out = [];
    while (i < len) {
        c1 = str.charCodeAt(i++) & 255;
        if (i == len) {
            out.push(BASE64_ENCODE_CHARS.charAt(c1 >> 2));
            out.push(BASE64_ENCODE_CHARS.charAt((c1 & 3) << 4));
            out.push("==");
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out.push(BASE64_ENCODE_CHARS.charAt(c1 >> 2));
            out.push(BASE64_ENCODE_CHARS.charAt(((c1 & 3) << 4) | ((c2 & 240) >> 4)));
            out.push(BASE64_ENCODE_CHARS.charAt((c2 & 15) << 2));
            out.push("=");
            break;
        }
        c3 = str.charCodeAt(i++);
        out.push(BASE64_ENCODE_CHARS.charAt(c1 >> 2));
        out.push(BASE64_ENCODE_CHARS.charAt(((c1 & 3) << 4) | ((c2 & 240) >> 4)));
        out.push(BASE64_ENCODE_CHARS.charAt(((c2 & 15) << 2) | ((c3 & 192) >> 6)));
        out.push(BASE64_ENCODE_CHARS.charAt(c3 & 63));
    }
    return out.join("");
}
window.btoa = btoa;
window.totalDelayMs = 0;
var _Date = Date;
window.Date = new Proxy(_Date, {
    construct(target, argArray, newTarget) {
        let value = new _Date(...argArray);
        value = new _Date(value.valueOf() + totalDelayMs);
        if (newTarget !== Date) value.constructor = newTarget;
        return value;
    },
});
const _now = Date.now;
Date.now = function now() {
    return _now.call(this, ...arguments) + window.totalDelayMs;
};
let _getTime = Date.prototype.getTime;
Date.prototype.getTime = function () {
    return _getTime.call(this, ...arguments) + window.totalDelayMs;
};
window.addTime = function addTime(ms) {
    if (ms !== 0) window.totalDelayMs += ms;
};
var _parseInt = window.parseInt;
window.parseInt = function () {
    if (arguments[0] == "0111100011") return 731;
    return _parseInt.apply(this, arguments);
};
window.setTimeout = window.setInterval = function (a, b) {
    return typeof a == "function" ? a() : eval(a);
};
const m = {
    "[23,": "[0,",
    ",23,": ",0,",
    ",23]": ",23]",
};
var _slice = String.prototype.slice;
String.prototype.slice = function () {
    let s = this;
    Object.entries(m).map(([k, v]) => {
        if (this.includes(k)) {
            s = this.replace(k, v) + " ";
        };
    });
    return _slice.apply(s, arguments);
};
window.top = window.self = window.window = window.parent = window;
window.innerWidth = 360;
window.innerHeight = 360;
window.getComputedStyle = function () {};
window.SyncManager = function () {};
window.customElements = {};
window.matchMedia = function matchMedia(v) {
    return {
        media: v,
        matches: true,
        onchange: null,
    };
};
window.eventsMap = {};
window.EventTarget = class EventTarget {
    constructor() {}
    addEventListener(t, f) {
        if (t == "load") f();
        eventsMap[t] = f;
    }
    removeEventListener(t, f) {}
    dispatchEvent() {}
};
window.addEventListener = EventTarget.prototype.addEventListener;
window.removeEventListener = EventTarget.prototype.removeEventListener;
class Element extends EventTarget {
    constructor(opts) {
        super(opts);
        this.$children = [];
        this.$innerHTML = "";
        this.$outerHTML = "";
        if (opts) Object.keys(opts).forEach((e) => (this[e] = opts[e]));
    }
    get className() {
        return this.class;
    }
    set tagName(v) {
        this.$tagName = v;
    }
    get tagName() {
        return this.$tagName.toUpperCase();
    }
    set id(v) {
        this.$id = v;
    }
    get id() {
        return this.$id || "";
    }
    set outerHTML(v) {
        this.$outerHTML = v;
    }
    get outerHTML() {
        let ret;
        if (this.tagName == "A") {
            ret = "<a></a>";
        }
        ret = this.$outerHTML || `<${this.$tagName}>${this.children.map((e) => `<${e.$tagName}></${e.$tagName}>`).join("")}</${this.$tagName}>`;
        return ret;
    }
    set innerHTML(v) {
        this.$innerHTML = v;
        function generateElement(args) {
            let elOption = {
                tagName: args[0],
            };
            for (let i = 1; i < args.length; i++) {
                let arg = args[i].split("=");
                if (arg.length > 1) {
                    let k = arg[0],
                        v = arg[1].replace(/"/g, "").replace(/\'/g, "");
                    elOption[k] = v;
                    elOption.$innerHTML = v;
                }
            }
            return new Element(elOption);
        }
        let idx = 0,
            els = v.match(/<.*?>/g);
        while (idx < els.length) {
            let idx1 = els[idx];
            let args = idx1.replace("<", "").replace(">", "").split(" ");
            let idx2 = els.indexOf(`</${args[0]}>`);
            if (!args[0].startsWith("/")) {
                let el = generateElement(args);
                for (let i = idx + 1; i < idx2 - 1; i++) {
                    if (!els[i].startsWith("/")) {
                        let idx3 = els[i];
                        let _args = idx3.replace("<", "").replace(">", "").split(" ");
                        let idx4 = els.indexOf(`</${_args[0]}>`);
                        idx = idx4 + 1;
                        i = idx4 + 1;
                        el.appendChild(generateElement(_args));
                    }
                }
                this.appendChild(el);
            }
            idx++;
        }
    }
    get innerHTML() {
        return this.$innerHTML;
    }
    get children() {
        return this.$children;
    }
    remove() {
        document.children.splice(document.children.indexOf(this), 1);
    }
    appendChild(el) {
        this.$children.push(el);
        document.children.push(el);
    }
    removeChild(el) {
        let index = this.$children.includes(el);
        if (index > -1) this.$children.splice(index, 1);
    }
    replaceChild(a, b) {
        this.children[this.children.indexOf(a)] = b;
    }
    setAttribute(k, v) {
        this[k] = v;
    }
    removeAttribute(k) {
        delete this[k];
    }
    getElementById(id) {
        for (let e of this.children) {
            if (e.id && e.id == id) {
                return e;
            }
        }
    }
    getElementsByTagName(tagName) {
        return this.children.filter((e) => {
            return tagName.toUpperCase() == e.tagName;
        });
    }
    cloneNode() {
        return new Element({
            tagName: this.$tagName,
        });
    }
    insertBefore(a, b) {
        let c1 = this.children.indexOf(a),
            d1 = this.children.indexOf(b);
        [this.children[c1], this.children[d1]] = [this.children[d1], this.children[c1]];
    }
}
window.Element = Element;
window.screen = new (class Screen {
    constructor() {}
    get width() {
        return global_opts.screen.width;
    }
    get height() {
        return global_opts.screen.height;
    }
    get colorDepth() {
        return global_opts.screen.colorDepth;
    }
    get pixelDepth() {
        return global_opts.screen.pixelDepth;
    }
    get availWidth() {
        return global_opts.screen.width;
    }
    get availHeight() {
        return global_opts.screen.height;
    }
})();
window.navigator = new (class Navigator {
    constructor() {}
    get platform() {
        return global_opts.navigator.platform;
    }
    get cookieEnabled() {
        return true;
    }
    get hardwareConcurrency() {
        return global_opts.navigator.hardwareConcurrency;
    }
    get languages() {
        //return ["en-US"]
        return ["zh-CN", "en", "zh","en-US"];
    }
    get vendor() {
        return "Apple Inc.";
        //return "Google Inc.";
    }
    get appName() {
        return "Netscape";
    }
    get webdriver() {
        return false;
    }
    get appVersion() {
        return global_opts.navigator.userAgent.replace("Mozilla/", "");
    }
    get userAgent() {
        return global_opts.navigator.userAgent;
    }
    serviceWorker() {}
    requestMIDIAccess() {}
})();
class CanvasRenderingContext2D {
    set textBaseline(v) {}
    set font(v) {}
    set top(v) {}
    set fillStyle(v) {}
    fillText() {}
    fillRect() {}
};
class WebGLRenderingContext {
    constructor() {}
    getSupportedExtensions() {
        return ["WEBGL_debug_renderer_info"];
    }
    getExtension() {
        return {
            UNMASKED_VENDOR_WEBGL: 37445,
            UNMASKED_RENDERER_WEBGL: 37446,
        };
    }
    getParameter(param) {
        return {
            //37445: "Google Inc. (ATI Technologies Inc.)",
            37445: "Apple Inc.",
            //37446: "ANGLE (ATI Technologies Inc., AMD Radeon Pro 5300M OpenGL Engine, OpenGL 4.1)",
            37446: "Apple GPU",
        }[param];
    }
};
class HTMLCanvasElement extends Element {
    constructor() {
        super();
    }
    getContext(ctx) {
        switch (ctx) {
            case "2d":
                return new CanvasRenderingContext2D();
            case "webgl":
            case "experimental-webgl":
                return new WebGLRenderingContext();
        }
    }
    toDataURL() {
                  // GgoAAAANSUhEUgAAASwAAACWCAYAAAcNZVY+ny93sjNvrwqK3eHU1mp+cNBu4XkRD4kLm+2Q4AAAAASUVORK5CYII=
    var rand_canvas="GgoAAAANSUhEUgAAASwAAACWCAYAAAcNZVY+ny93sjNvrwqK3eHU1mp+cNBu4XkRD4kLm+2Q4AAAAASUVORK5CYII="
    //var r_canvas = rand_canvas.substring(0, 31) + Array.from({ length: 40 }, () => Math.random().toString(36).charAt(2)).join('') + rand_canvas.substring(71);

        return rand_canvas;
    }
}
window.CSS = {
    supports: (_) => true,
};
class Document extends Element {
    constructor() {
        super();
        this.$cookie = [];
        this.$head = new Element({
            tagName: "head",
        });
        this.$body = new Element({
            tagName: "body",
        });
        this.$children = [this.$head, this.$body];
    }
    get cookie() {
        return this.$cookie.join("; ");
    }
    set cookie(v) {
        this.$cookie.push(v);
    }
    get charset() {
        return "UTF-8";
    }
    get referrer() {
        return global_opts.document.referrer;
    }
    get head() {
        return this.$head;
    }
    get body() {
        return this.$body;
    }
    get documentElement() {
        return {
            clientWidth: global_opts.document.documentElement.clientWidth,
            clientHeight: global_opts.document.documentElement.clientHeight,
        };
    }
    addEventListener(t, f) {
        eventsMap[t] = f;
    }
    createElement(elName) {
        switch (elName) {
            case "iframe":
                return new Element({
                    tagName: "iframe",
                    $id: "tcaptcha_iframe",
                    contentWindow: {
                        top: {},
                    },
                    style: {
                        display: "",
                    },
                });
            case "canvas":
                return new HTMLCanvasElement();
            default:
                return new Element({
                    tagName: elName,
                });
        }
    }
}
window.Document = Document;
var document = new Document();
window.document = document;
class RTCSessionDescription {
    get sdp() {
        return `v=0\n        o=- 6423796990691880702 2 IN IP4 127.0.0.1\n        s=-\n        t=0 0\n        a=group:BUNDLE 0\n        a=extmap-allow-mixed\n        a=msid-semantic: WMS\n        m=application 9 UDP/DTLS/SCTP webrtc-datachannel\n        c=IN IP4 0.0.0.0\n        a=candidate:1905205848 1 udp 2113937151 b391c975-76d9-4534-b3e2-e97829a6909d.local 55486 typ host generation 0 network-cost 999\n        a=ice-ufrag:WGb8\n        a=ice-pwd:CCwTQrlXUBwCoIFyfGO/MB67\n        a=ice-options:trickle\n        a=fingerprint:sha-256 7C:2B:93:75:4B:EE:85:56:85:5C:B2:F8:15:35:69:41:1C:8D:B6:9D:BA:BB:E2:5C:E8:FB:2D:22:3F:66:49:B4\n        a=setup:actpass\n        a=mid:0\n        a=sctp-port:5000\n        a=max-message-size:262144`;
    }
    get type() {
        return "offer";
    }
};
class RTCDataChannel {
    constructor(label) {
        this.$label = label;
    }
    get label() {
        return this.$label;
    }
    get id() {
        return null;
    }
    get binaryType() {
        return "arraybuffer";
    }
    get bufferedAmount() {
        return 0;
    }
    get bufferedAmountLowThreshold() {
        return 0;
    }
    get readyState() {
        return "connecting";
    }
    get protocol() {
        return "";
    }
    get negotiated() {
        return false;
    }
    get maxPacketLifeTime() {
        return null;
    }
    get maxRetransmits() {
        return null;
    }
    get ordered() {
        return true;
    }
    get reliable() {
        return true;
    }
    close() {}
    send() {}
};
class RTCPeerConnection {
    constructor() {
        this.$localDescription = new RTCSessionDescription();
        this.$onicecandidate = null;
    }
    get localDescription() {
        return this.$localDescription;
    }
    createDataChannel() {
        return new RTCDataChannel();
    }
    createOffer() {
        return Promise.resolve(new RTCSessionDescription());
    }
    setLocalDescription() {
        return Promise.resolve();
    }
    get onicecandidate() {
        return this.$onicecandidate;
    }
    set onicecandidate(e) {
        e({
            candidate: {
                address: global_opts.ip,
                candidate: "candidate:1550304506 1 udp 2113937151 " + global_opts.ip + " 61090 typ host generation 0 ufrag m88D network-cost 999",
                component: "rtp",
                foundation: "1550304506",
                port: 61090,
                priority: 2113937151,
                protocol: "udp",
                relatedAddress: null,
                relatedPort: null,
                sdpMLineIndex: 0,
                sdpMid: "data",
                tcpType: "",
                type: "host",
                usernameFragment: "m88D",
            },
        });
        this.$onicecandidate = e;
    }
};
window.RTCPeerConnection = RTCPeerConnection;
class Storage {
    constructor() {
        this.data = {};
    }
    setItem(k, v) {
        this.data[k] = v;
        Object.defineProperty(this, k, {
            get: (_) => v,
        });
    }
    getItem(k) {
        return this[k] || null;
    }
    removeItem(k) {
        delete this.data[k];
    }
    key(index) {
        Object.keys(this.data)[index];
    }
    clear() {
        this.data = {};
    }
    get length() {
        return Object.keys(this.data).length;
    }
    get [Symbol.toStringTag]() {
        return "Storage";
    }
}
window.localStorage = new Proxy(new Storage(), {
    set(target, k, v) {
        return target.setItem(k, v);
    },
});
window.sessionStorage = new Proxy(new Storage(), {
    set(target, k, v) {
        return target.setItem(k, v);
    },
});
window.location = document.location = new (class Location {
    get href() {
        return global_opts.location.href;
    }
    toString() {
        return this.href;
    }
})();
function randomNum(minNum, maxNum, decimalNum) {
    var max = 0,
        min = 0;
    minNum <= maxNum ? ((min = minNum), (max = maxNum)) : ((min = maxNum), (max = minNum));
    switch (arguments.length) {
        case 1:
            return Math.floor(Math.random() * (max + 1));
        case 2:
            return Math.floor(Math.random() * (max - min + 1) + min);
        case 3:
            return parseFloat((Math.random() * (max - min) + min).toFixed(decimalNum));
        default:
            return Math.random();
    }
};
function generateTracks(points, sp1 = 1, st = 0) {
    for (let i = 1; i < points.length; i++) {
        if (points[i].x == points[i - 1].x) {
            points[0].x += randomNum(20, 30);
        }
    }
    var move = [];
    (function () {
        function sp(p, p2, pp) {
            var sump = Math.abs(p - p2);
            var x3 = Math.floor((Math.abs(pp - p) / sump) * 100);
            if (sump > 200) {
                if (x3 < 5 || x3 > 95) return 1;
                if (x3 < 10 || x3 > 90) return 2;
                if (x3 < 50 || x3 > 50) return 4;
            } else if (sump > 150) {
                if (x3 <= 10 || x3 >= 90) return 1;
                if (x3 <= 25 || x3 >= 75) return 2;
                if (x3 <= 40 || x3 >= 70) return 3;
                if (x3 <= 50 || x3 >= 50) return 4;
            } else if (sump > 100) {
                if (x3 <= 10 || x3 >= 90) return 1;
                if (x3 <= 15 || x3 >= 70) return 2;
                if (x3 <= 25 || x3 >= 60) return 3;
                if (x3 <= 50 || x3 >= 50) return 4;
            } else if (sump > 70) {
                if (x3 <= 15 || x3 >= 95) return 1;
                if (x3 <= 20 || x3 >= 80) return 2;
                if (x3 <= 25 || x3 >= 70) return 3;
                if (x3 <= 50 || x3 >= 50) return 4;
            } else {
                if (x3 <= 15 || x3 >= 80) return 0;
                if (x3 <= 25 || x3 >= 65) return 1;
                if (x3 <= 50 || x3 >= 50) return 2;
            }
        }
        function computeTime(distance) {
            var t;
            switch (distance) {
                case 0:
                    t = randomNum(35, 79);
                    break;
                case 1:
                    t = randomNum(23, 37);
                    break;
                case 2:
                    t = randomNum(18, 25);
                    break;
                case 3:
                    t = randomNum(17, 19);
                    break;
                case 4:
                    t = randomNum(16, randomNum(16, 19));
                    break;
            }
            return t;
        }
        var x = 0,
            y = 0;
        var distanceX = 3;
        var s0 = [0 + sp1, 1 + sp1, 1 + sp1, 1 + sp1];
        var s1 = [1 + sp1, 1 + sp1, 2 + sp1, 2 + sp1];
        var s2 = [2 + sp1, 2 + sp1, 3 + sp1, 3 + sp1];
        var s3 = [2 + sp1, 3 + sp1, 4 + sp1, 4 + sp1];
        var s4 = [3 + sp1, 4 + sp1, 4 + sp1, 4 + sp1];
        var speed = [s0, s1, s2, s3, s4];
        x = points[0].x;
        y = points[0].y;
        move.push([x, y, st]);
        for (var i = 1; i < points.length; i++) {
            var x2 = points[i].x;
            var y2 = points[i].y;
            var o = Math.abs(points[i - 1].x - x2) / Math.abs(points[i - 1].y - y2);
            while (x - x2 !== 0 || y - y2 !== 0) {
                var xx = x - x2;
                distanceX = sp(points[i - 1].x, x2, x);
                if (!distanceX) {
                    distanceX = randomNum(2, 4);
                }
                var addX = speed[distanceX][randomNum(0, speed[distanceX].length - 1)];
                if (xx !== 0) {
                    addX = xx > 0 ? -(addX > xx ? xx : addX) : addX > Math.abs(xx) ? Math.abs(xx) : addX;
                    x += addX;
                }
                var ss = Math.round(Math.abs(points[i - 1].x - x) / o);
                ss = points[i - 1].y > y2 ? -ss : ss;
                y = ss + points[i - 1].y;
                move.push([x, y, computeTime(distanceX)]);
            }
        }
    })();
    return move;
};
function initEnv({ referer, ip, userAgent, frameSize, href, points }) {
    ip && (global_opts.ip = ip);
    referer && (global_opts.document.referrer = referer);
    if (userAgent) {
        global_opts.navigator.userAgent = userAgent;
        if (userAgent.includes("iPhone")) {
            global_opts.navigator.platform = "iPhone";
        } else if (userAgent.includes("Linux")) {
            global_opts.navigator.platform = "Linux aarch64";
        } else if (userAgent.includes("Mac")) {
            global_opts.navigator.platform = "MacIntel";
        } else {
            //global_opts.navigator.platform = "Win32";
            global_opts.navigator.platform = "iPhone";
        }
    }
    if (frameSize) {
        global_opts.document.documentElement.clientWidth = frameSize[0];
        global_opts.document.documentElement.clientHeight = frameSize[1];
        window.innerWidth = frameSize[0];
        window.innerHeight = frameSize[1];
    }
    //let depth = Math.random() > 0.5 ? 24 : 30;
    let depth = 24;
    global_opts.screen.colorDepth = depth;
    global_opts.screen.pixelDepth = depth;
    let screenSize = [
        {
            width: 320,
            height: 430,
        },
        {
            width: 375,
            height: 440,
        },
        {
            width: 425,
            height: 440,
        },
        {
            width: 360,
            height: 460,
        },
        {
            width: 680,
            height: 490,
        },
        {
            width: 360,
            height: 430,
        },
        {
            width: 320,
            height: 440,
        },{
            width: 932,
            height: 430,
        }
    ][Math.floor(Math.random() * 8)];
    global_opts.screen.width = screenSize.width;
    global_opts.screen.height = screenSize.height;
    //global_opts.navigator.hardwareConcurrency = [6, 8, 12][Math.round(Math.random() * 3)];
    global_opts.navigator.hardwareConcurrency = 2;//手机cpu核心数2-8之间
    let riskData = {
        ft: "q3b7L7-_H",
    };
    if (href) {
        let st = randomNum(100, 500);
        let tracks = generateTracks(points, 1, st);
        let xt = [];
        tracks.reduce((e, i) => {
            xt.push(e.length ? [i[0] - e[0], i[1] - e[1], randomNum(10, 13)] : i);
            return i;
        }, []);
        xt.push([0, 0, 0]);
        riskData = {
            // clientType: "",
            // coordinate: [10, 24, .4118],
            // trycnt: 1,
            // refreshcnt: 0,
            slideValue: xt,
            // dragobj: 1,
            // ft: "qf_7Pf__H"
        };
        global_opts.location.href = href;
    }
    return riskData;
};

window.calculate_collect = function calculate_collect(riskData, pows) {
    let sx = randomNum(200, 320),
        sy = randomNum(150, 180);
    let tracks = generateTracks(
        [
            {
                x: sx,
                y: sy,
            },
            {
                x: randomNum(500, 1e3),
                y: sy + randomNum(50, 150),
            },
        ],
        0,
        randomNum(40, 200)
    );
    for (let p of tracks) {
        addTime((p[2] / 2) | 0);
        eventsMap.mousemove({
            pageX: p[0],
            pageY: p[1],
        });
    }
    window.TDC.setData({
        slideValue: [[3,0,0,new Date().getTime(),0]]
    });
    window.TDC.setData({
        ft: "q3b7L7-_H",
    });
    return {
        collect: decodeURIComponent(window.TDC.getData(!0)),
        eks: window.TDC.getInfo(),pow:getWorkloadResult(pows)
    };
};
'''
        self.ua_init = f'Mozilla/5.0 (iPhone; CPU iPhone OS {random.randint(6, 18)}_{random.randint(1, 10)}_{random.randint(1, 10)} like Mac OS X) AppleWebKit/{random.randint(111, 999)}.{random.randint(1, 10)}.{random.randint(13, 18)} (KHTML, like Gecko) Mobile/15E148 MicroMessenger/{random.randint(5, 8)}.0.{random.randint(12, 99)}(0x1800{random.randint(20, 80)}2c) NetType/{random.choice(["WIFI", "4G", "3G", "2G"])} Language/{random.choice(["en-US", "en"])}'
        self.session = self.get_session()

    def get_session(self):
        session = requests.Session()
        headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Referer': 'https://global.captcha.gtimg.com/',
            'Sec-Fetch-Dest': 'script',
            'Sec-Fetch-Mode': 'no-cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': self.ua_init,
            # 'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            # 'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        session.headers.update(headers)
        return session

    @staticmethod
    def pil_to_cv2(img):
        """
        pil转cv2图片
        :param img: pil图像, <type 'PIL.JpegImagePlugin.JpegImageFile'>
        :return: cv2图像, <type 'numpy.ndarray'>
        """
        img = cv2.cvtColor(np.asarray(img), cv2.COLOR_RGB2BGR)
        return img

    @staticmethod
    def bytes_to_cv2(img):
        """
        二进制图片转cv2
        :param img: 二进制图片数据, <type 'bytes'>
        :return: cv2图像, <type 'numpy.ndarray'>
        """
        # 将图片字节码bytes, 转换成一维的numpy数组到缓存中
        img_buffer_np = np.frombuffer(img, dtype=np.uint8)
        # 从指定的内存缓存中读取一维numpy数据, 并把数据转换(解码)成图像矩阵格式
        img_np = cv2.imdecode(img_buffer_np, 1)
        return img_np

    def cv2_open(self, img, flag=None):
        """
        统一输出图片格式为cv2图像, <type 'numpy.ndarray'>
        :param img: <type 'bytes'/'numpy.ndarray'/'str'/'Path'/'PIL.JpegImagePlugin.JpegImageFile'>
        :param flag: 颜色空间转换类型, default: None
            eg: cv2.COLOR_BGR2GRAY（灰度图）
        :return: cv2图像, <numpy.ndarray>
        """
        if isinstance(img, bytes):
            img = self.bytes_to_cv2(img)
        elif isinstance(img, (str, Path)):
            img = cv2.imread(str(img))
        elif isinstance(img, np.ndarray):
            img = img
        # elif isinstance(img, PIL.Image):
        #     img = self.pil_to_cv2(img)
        else:
            raise ValueError(f'输入的图片类型无法解析: {type(img)}')
        if flag is not None:
            img = cv2.cvtColor(img, flag)
        return img

    def get_distance(self, bg, tp):
        # 读取图片
        bg_img = self.cv2_open(bg)
        tp_gray = self.cv2_open(tp, flag=cv2.COLOR_BGR2GRAY)[490:610, 140:260]
        cv2.imwrite('image_cropped_tp2.png', tp_gray)
        # print("图片已裁剪并保存为 image_cropped_tp.png")
        # 金字塔均值漂移
        bg_shift = cv2.pyrMeanShiftFiltering(bg_img, 5, 50)

        # 边缘检测
        tp_gray = cv2.Canny(tp_gray, 255, 255)
        bg_gray = cv2.Canny(bg_shift, 255, 255)

        # 目标匹配
        result = cv2.matchTemplate(bg_gray, tp_gray, cv2.TM_CCOEFF_NORMED)
        # 解析匹配结果
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
        return max_loc

    def get_ticket(self, sess, aid, host):
        # ua='Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.47(0x18002f2b) NetType/WIFI Language/zh_CN'
        # ua_init='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        # ua_init='Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x18003225) NetType/4G Language/zh_CN'
        ua_b64 = base64.b64encode(self.ua_init.encode()).decode()
        params = (
            ('aid', aid),
            ('protocol', 'https'),
            ('accver', '1'),
            ('showtype', 'popup'),
            ('ua', ua_b64),
            ('noheader', '1'),
            ('fb', '1'),
            ('aged', '0'),
            ('enableAged', '0'),
            ('enableDarkMode', '0'),
            ('grayscale', '1'),
            ('clientype', '1'),
            ('cap_cd', ''),
            ('uid', ''),
            ('lang', 'zh-cn'),
            ('entry_url', 'https://security.wechat.com/security/newreadtemplate'),
            ('elder_captcha', '0'),
            ('js', '/tcaptcha-frame.8f61d9f6.js'),
            ('login_appid', ''),
            # ('wb', '2'),
            ('wb', '1'),
            ('subsid', '1'),
            ('callback', '_aq_320841'),
            ('sess', sess),
        )

        response = self.session.get(f'{host}/cap_union_prehandle', params=params, proxies=self.proxies)
        # print(response.text)
        response = response.text[11:-1]
        response = json.loads(response)
        sess = response['sess']
        sid = response['sid']
        img_url = response['data']['dyn_show_info']['bg_elem_cfg']['img_url']
        txt = response['data']['dyn_show_info']['instruction']
        # print(txt)
        if '滑块' in response['data']['dyn_show_info']['instruction'] or 'Slide to' in \
                response['data']['dyn_show_info']['instruction'] or '滑塊' in response['data']['dyn_show_info']['instruction']:
            sprite_url = response['data']['dyn_show_info']['sprite_url']
            pow_answer_prefix = response['data']['comm_captcha_cfg']['pow_cfg']['prefix']
            pow_answer_md5 = response['data']['comm_captcha_cfg']['pow_cfg']['md5']
            tdc = response['data']['comm_captcha_cfg']['tdc_path']
            init_pos = response['data']['dyn_show_info']['fg_elem_list'][1]['init_pos'][1]
            # print(init_pos)
            response1 = self.session.get(host + img_url)
            response1 = response1.content
            with open("image_bg2.png", "wb") as f:
                f.write(response1)
            response2 = self.session.get(host + sprite_url)
            response2 = response2.content
            with open("image_tp2.png", "wb") as f:
                f.write(response2)
            x = self.get_distance(bg=response1, tp=response2)
            # print(x)
            response111 = self.session.get(host + tdc)
            response111 = response111.text

            dd = 'window=global;window.TCaptchaReferrer ="https://security.wechat.com/security/newreadtemplate?t=signup/index&regcc=63&regmobile=9626535701&regid=9_0019dfb7894436c070f251dc176b555cfd29535214a92f810f7a6b13cc2427fe3c0487cf2dfbc669c6cdf55b95cd7744&scene=get_reg_verify_code&wechat_real_lang=en#/";window.ua= ' + f'"{self.ua_init}"' + ';' + self.js_code + response111 + 'var riskData = initEnv({href: "https://global.captcha.gtimg.com/template/drag_ele_global.html",referer:"https://security.wechat.com/security/newreadtemplate?t=signup/index&regcc=63&regmobile=9626535701&regid=9_0019dfb7894436c070f251dc176b555cfd29535214a92f810f7a6b13cc2427fe3c0487cf2dfbc669c6cdf55b95cd7744&scene=get_reg_verify_code&wechat_real_lang=en#/",ip: "",frameSize: [314,314],userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",points: [{x: 150,y: 33,},{x: 280,y: 55}]});function get_collect(pows){return window.calculate_collect(JSON.stringify(riskData),pows)};'
            en_aes = execjs.compile(dd)
            datas = en_aes.call('get_collect', {"target": f"{pow_answer_md5}", "nonce": f"{pow_answer_prefix}"})
            eks = datas['eks']['info']
            collect = datas['collect']
            pow_answerjiami = datas['pow']['ans']
            data = {
                'collect': collect,
                'tlg': len(collect),
                'eks': eks,
                'sess': sess,
                'ans': '[{"elem_id":1,"type":"DynAnswerType_POS","data":"' + str(x[0] + 10) + ',' + str(
                    init_pos) + '"}]',
                'pow_answer': f'{pow_answer_prefix}{pow_answerjiami}',
                'pow_calc_time': '888',
            }
        else:
            # txt=quote(txt.encode('utf8'))
            # print(txt)
            pow_answer_prefix = response['data']['comm_captcha_cfg']['pow_cfg']['prefix']
            pow_answer_md5 = response['data']['comm_captcha_cfg']['pow_cfg']['md5']
            params = (
                ('app_data', sid),
                ('t', f'799892{random.randint(111, 999)}'),
            )
            response111 = self.session.get(f'{host}/tdc.js', params=params, proxies=self.proxies)
            response111 = response111.text
            ref = f'https://security.wechat.com/security/'
            dd = 'window=global;window.TCaptchaReferrer =' + f'"{ref}"' + ';window.ua= ' + f'"{self.ua_init}"' + ';' + self.js_code + response111 + 'var riskData = initEnv({href: "https://global.captcha.gtimg.com/template/drag_ele_global.html",referer: ' + f'"{ref}"' + ',ip: "",frameSize: [' + f'360, 360' + '],userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",points: [{x: 150,y: 33,},{x: 180,y: 55}]});function get_collect(pows){return window.calculate_collect(JSON.stringify(riskData),pows)};'
            en_aes = execjs.compile(dd)
            datas = en_aes.call('get_collect', {"target": f"{pow_answer_md5}", "nonce": f"{pow_answer_prefix}"})
            eks = datas['eks']['info']
            collect = datas['collect']
            pow_answerjiami = datas['pow']['ans']
            data = {
                'collect': collect,
                'tlg': len(collect),
                'eks': eks,
                'sess': sess,
                'ans': '[{"elem_id":1,"type":"DynAnswerType_UC","data":' + f'"3"' + '}]',
                'pow_answer': f'{pow_answer_prefix}{pow_answerjiami}',
                'pow_calc_time': '321'
            }

        response = self.session.post(f'{host}/cap_union_new_verify', data=data)
        response = response.json()
        if response['errorCode'] == '0':
            return {'ticket': response['ticket'], 'randstr': response['randstr'], 'txt': txt, 'sid': sid}
        elif response['errorCode'] == '50':
            return 'wrong distance!'
        elif response['errorCode'] == '9':
            result = self.get_ticket(response['sess'], aid, host)
            return result
        elif response['errorCode'] == '51':
            result = self.get_ticket(response['sess'], aid, host)
            return result
        elif response['errorCode'] == '12':
            return 'error,change your IP please!'

    def index20(self, aid: str, host: str):
        return self.get_ticket('', aid, host)

    def tecent(self, aid):
        return self.index20(aid=aid, host="https://t.captcha.qcloud.com")

    def handle(self, aid):
        return self.tecent(aid=aid)


if __name__ == '__main__':
    ch = CaptchaBase()
    pprint.pp(ch.handle("2093769752"))
