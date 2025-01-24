var window = window;


const navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    platform: "Win32",
    product: "Gecko",
    productSub: "20030107",
    vendor: "Google Inc.",
    vendorSub: "",

    // 硬件与设备信息
    deviceMemory: 8,
    hardwareConcurrency: 20,
    maxTouchPoints: 0,

    // 语言与地区
    language: "zh-CN",
    languages: ["zh-CN", "zh", "en", "ko"],

    // 网络信息
    onLine: true,
    connection: {
        effectiveType: "4g",
        rtt: 50,
        downlink: 7.95,
        saveData: false,
    },

    // 存储相关
    cookieEnabled: true,
    storage: {},
    storageBuckets: {},
    webkitPersistentStorage: {},
    webkitTemporaryStorage: {},

    // 交互相关
    clipboard: {},
    keyboard: {},
    virtualKeyboard: {
        boundingRect: {},
        overlaysContent: false,
    },
    mediaDevices: {},
    mediaSession: {
        metadata: null,
        playbackState: "none",
    },
    permissions: {},

    // API 支持
    bluetooth: {},
    credentials: {},
    hid: {
        onconnect: null,
        ondisconnect: null,
    },
    usb: {
        onconnect: null,
        ondisconnect: null,
    },
    serial: {
        onconnect: null,
        ondisconnect: null,
    },
    wakeLock: {},
    xr: {
        ondevicechange: null,
    },
    geolocation: {},

    // 插件与 MIME 类型
    plugins: [
        {name: "PDF Viewer", description: "Chrome PDF Viewer", filename: "internal-pdf-viewer"},
        {name: "Microsoft Edge PDF Viewer", description: "Edge PDF Viewer", filename: "edge-pdf-viewer"},
    ],
    mimeTypes: [
        {type: "application/pdf", description: "PDF file", suffixes: "pdf"},
        {type: "text/pdf", description: "Text PDF file", suffixes: "pdf"},
    ],

    // 安全与权限
    doNotTrack: null,
    serviceWorker: {
        controller: null,
        ready: Promise.resolve(),
    },
    managed: {},
    userActivation: {
        hasBeenActive: false,
        isActive: false,
    },

    // 其他信息
    gpu: {
        wgslLanguageFeatures: {},
    },
    mediaCapabilities: {},
    windowControlsOverlay: {
        visible: false,
    },
    presentation: {
        defaultRequest: null,
        receiver: null,
    },
    scheduler: {},
    protectedAudience: {},

    // 方法模拟
    getBattery: () => Promise.resolve({
        charging: true,
        level: 0.8,
        chargingTime: 120,
        dischargingTime: Infinity,
    }),
    vibrate: pattern => console.log("Vibrating with pattern:", pattern),
};
// 模拟 document 对象
const document = {
    // 文档节点属性
    URL: "https://recharge.m.jd.com/orderDetail?orderId=307843863375&serviceType=3&source=41",
    documentURI: "https://recharge.m.jd.com/orderDetail?orderId=307843863375&serviceType=3&source=41",
    origin: undefined,
    compatMode: "CSS1Compat",
    characterSet: "UTF-8",
    contentType: "text/html",
    title: "",
    referrer: "",
    domain: "recharge.m.jd.com",
    lastModified: "12/17/2024 20:07:40",

    // 交互相关
    visibilityState: "hidden",
    hidden: true,
    onvisibilitychange: null,

    // 样式和布局
    styleSheets: [],
    currentScript: '<script src="https://gias.jd.com/js/m-tk.js"></script>',

    // 元素节点集合
    body: null,
    head: null,
    documentElement: {
        clientWidth: 1024,
        clientHeight: 768,
    },

    // 节点与事件
    children: [],
    childNodes: [],
    activeElement: null,

    // Cookie 相关
    cookie: "retina=0; cid=9; webp=1; __jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1736842420918; mba_muid=1736842420917134647434; visitkey=6493294373963103261; 3AB9D23F7A4B3C9B=6GW2Z3HU2M3GXJOWMDRZJG5OASMRDUS3MHOPOX6AIX6N7R2PH4MYVOHA2OK2MS3CDPEWHKTDG6K6Q6TR4IX4PVYMNQ; sc_width=1536; shshshfpa=9ee2cd02-57f9-72c5-f778-0351f1e1997b-1735542848; shshshfpx=9ee2cd02-57f9-72c5-f778-0351f1e1997b-1735542848; jcap_dvzw_fp=BBa_tQvhLIA1_N6io9arxprmrEgwD4yO3js6hJx_BwYhiKMLmUQGL48plfjERVlfbko3rOnLW4KZd2LmUAmdpQ==; pt_token=9z7etm7i; pwdt_id=zhq91513; sbx_hot_h=null; autoOpenApp_downCloseDate_auto=1736853246417_1800000; qid_uid=d82616db-c741-4508-a015-ff54b5174625; qid_fs=1736912630541; qid_ls=1736912630541; qid_ts=1736912630568; qid_vis=1; warehistory=\"10022039398507,10022039398507,10022039398507,10022039398507,10022039398507,10022039398507,10022039398507,\"; autoOpenApp_downCloseDate_autoOpenApp_autoPromptly=1737450123022_1; __wga=1737450124469.1737450124469.1737360611916.1736853185915.1.4; PPRD_P=UUID.1736842420917134647434-LOGID.1737450124485.695775773; shshshfpb=BApXSJdcSi_FAFGMSpb6ccUWxaiZKJyihBncVL2dt9xJ1OsZTbN-Hx0u4ZQPoNOY; wxa_level=1; jxsid=17376182440200560780; autoOpenApp_downCloseDate_jd_homePage=1737618418878_1; jxsid_s_t=1737618874074; jxsid_s_u=https%3A//trade.m.jd.com/order/orderlist_jdm.shtml; __jda=122270672.1736842420917134647434.1736842420.1737623553.1737700749.21; __jdb=122270672.1.1736842420917134647434|21.1737700749; __jdc=122270672; 3AB9D23F7A4B3CSS=jdd036GW2Z3HU2M3GXJOWMDRZJG5OASMRDUS3MHOPOX6AIX6N7R2PH4MYVOHA2OK2MS3CDPEWHKTDG6K6Q6TR4IX4PVYMNQAAAAMUS4ETB2YAAAAADDZ5WVNDF33AJMX; mba_sid=17377007491773695294294833129.2",

    location: {
        "ancestorOrigins": {},
        "href": "https://recharge.m.jd.com/orderDetail?orderId=307843863375&serviceType=3&source=41",
        "origin": "https://recharge.m.jd.com",
        "protocol": "https:",
        "host": "recharge.m.jd.com",
        "hostname": "recharge.m.jd.com",
        "port": "",
        "pathname": "/orderDetail",
        "search": "?orderId=307843863375&serviceType=3&source=41",
        "hash": ""
    },

    // 模拟方法
    createElement: (tagName) => {
        console.log(`Creating element: ${tagName}`);
        if (tagName === "canvas") {
            return {
                tagName: tagName.toUpperCase(),
                src: "",
                async: false,
                onload: null,
                onerror: null,
                width: 300,
                height: 150,
                getContext: function (contextType) {
                    if (contextType === "2d") {
                        return {
                            fillRect: function (x, y, width, height) {
                                console.log(`fillRect called with x=${x}, y=${y}, width=${width}, height=${height}`);
                            },
                            strokeRect: function (x, y, width, height) {
                                console.log(`strokeRect called with x=${x}, y=${y}, width=${width}, height=${height}`);
                            },
                            fillText: function (text, x, y) {
                                console.log(`fillText called with text='${text}', x=${x}, y=${y}`);
                            },
                            strokeText: function (text, x, y) {
                                console.log(`strokeText called with text='${text}', x=${x}, y=${y}`);
                            },
                            moveTo: function (x, y) {
                                console.log(`moveTo called with x=${x}, y=${y}`);
                            },
                            lineTo: function (x, y) {
                                console.log(`lineTo called with x=${x}, y=${y}`);
                            },
                            arc: function (x, y, radius, startAngle, endAngle, anticlockwise) {
                                console.log(`arc called with x=${x}, y=${y}, radius=${radius}, startAngle=${startAngle}, endAngle=${endAngle}, anticlockwise=${anticlockwise}`);
                            },
                            fill: function () {
                                console.log(`fill called`);
                            },
                            stroke: function () {
                                console.log(`stroke called`);
                            },
                            beginPath: function () {
                                console.log(`beginPath called`);
                            },
                            closePath: function () {
                                console.log(`closePath called`);
                            },
                            toDataURL: function () {
                                console.log(`toDataURL called`);
                                return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="; // 返回一个简单的 base64 图像数据
                            }
                        };
                    } else if (contextType === "webgl" || contextType === "experimental-webgl") {
                        return {
                            // WebGL 上下文的方法和属性
                            getParameter: function (parameter) {
                                switch (parameter) {
                                    case this.RENDERER:
                                        return "WebGL Renderer";
                                    case this.VERSION:
                                        return "WebGL 1.0";
                                    case this.VENDOR:
                                        return "WebGL Vendor";
                                    case this.SHADING_LANGUAGE_VERSION:
                                        return "WebGL GLSL ES 1.0";
                                    case this.MAX_TEXTURE_SIZE:
                                        return 4096;
                                    case this.MAX_RENDERBUFFER_SIZE:
                                        return 4096;
                                    case this.MAX_VIEWPORT_DIMS:
                                        return [4096, 4096];
                                    case this.MAX_VERTEX_ATTRIBS:
                                        return 16;
                                    case this.MAX_VERTEX_UNIFORM_VECTORS:
                                        return 128;
                                    case this.MAX_VARYING_VECTORS:
                                        return 8;
                                    case this.MAX_FRAGMENT_UNIFORM_VECTORS:
                                        return 16;
                                    case this.MAX_COMBINED_TEXTURE_IMAGE_UNITS:
                                        return 16;
                                    case this.MAX_TEXTURE_IMAGE_UNITS:
                                        return 16;
                                    case this.MAX_CUBE_MAP_TEXTURE_SIZE:
                                        return 4096;
                                    case this.MAX_TEXTURE_MAX_ANISOTROPY_EXT:
                                        return 16;
                                    case this.ALPHA_BITS:
                                        return 8;
                                    case this.RED_BITS:
                                        return 8;
                                    case this.GREEN_BITS:
                                        return 8;
                                    case this.BLUE_BITS:
                                        return 8;
                                    case this.DEPTH_BITS:
                                        return 24;
                                    case this.STENCIL_BITS:
                                        return 8;
                                    case this.SUBPIXEL_BITS:
                                        return 8;
                                    case this.MAX_DRAW_BUFFERS_WEBGL:
                                        return 1;
                                    case this.MAX_COLOR_ATTACHMENTS_WEBGL:
                                        return 1;
                                    case this.MAX_SAMPLES:
                                        return 4;
                                    case this.MAX_VERTEX_TEXTURE_IMAGE_UNITS:
                                        return 16;
                                    case this.MAX_COMBINED_VERTEX_TEXTURE_IMAGE_UNITS:
                                        return 16;
                                    default:
                                        return null;
                                }
                            },
                            clear: function (mask) {
                                console.log(`clear called with mask=${mask}`);
                            },
                            createBuffer: function () {
                                console.log("createBuffer called");
                                return {
                                    bindBuffer: function (target, buffer) {
                                        console.log(`bindBuffer called with target=${target}, buffer=${buffer}`);
                                    },
                                    bufferData: function (target, data, usage) {
                                        console.log(`bufferData called with target=${target}, data=${data}, usage=${usage}`);
                                    }
                                };
                            },
                            createShader: function (type) {
                                console.log(`createShader called with type=${type}`);
                                return {
                                    shaderSource: function (shader, source) {
                                        console.log(`shaderSource called with shader=${shader}, source=${source}`);
                                    },
                                    compileShader: function (shader) {
                                        console.log(`compileShader called with shader=${shader}`);
                                    }
                                };
                            },
                            createProgram: function () {
                                console.log("createProgram called");
                                return {
                                    attachShader: function (program, shader) {
                                        console.log(`attachShader called with program=${program}, shader=${shader}`);
                                    },
                                    linkProgram: function (program) {
                                        console.log(`linkProgram called with program=${program}`);
                                    },
                                    useProgram: function (program) {
                                        console.log(`useProgram called with program=${program}`);
                                    }
                                };
                            },
                            getExtension: function (name) {
                                console.log(`getExtension called with name=${name}`);
                                if (name === "WEBGL_debug_renderer_info") {
                                    return {
                                        UNMASKED_VENDOR_WEBGL: "WebGL Vendor",
                                        UNMASKED_RENDERER_WEBGL: "WebGL Renderer"
                                    };
                                }
                                return null;
                            },
                            bindBuffer: function (target, buffer) {
                                console.log(`bindBuffer called with target=${target}, buffer=${buffer}`);
                            },
                            bufferData: function (target, data, usage) {
                                console.log(`bufferData called with target=${target}, data=${data}, usage=${usage}`);
                            },
                            enableVertexAttribArray: function (index) {
                                console.log(`enableVertexAttribArray called with index=${index}`);
                            },
                            vertexAttribPointer: function (index, size, type, normalized, stride, offset) {
                                console.log(`vertexAttribPointer called with index=${index}, size=${size}, type=${type}, normalized=${normalized}, stride=${stride}, offset=${offset}`);
                            },
                            getAttribLocation: function (program, name) {
                                console.log(`getAttribLocation called with program=${program}, name=${name}`);
                                return 0; // 返回一个示例位置
                            },
                            getUniformLocation: function (program, name) {
                                console.log(`getUniformLocation called with program=${program}, name=${name}`);
                                return {uniformLocation: 0}; // 返回一个示例位置对象
                            },
                            uniform2f: function (location, x, y) {
                                console.log(`uniform2f called with location=${location}, x=${x}, y=${y}`);
                            },
                            drawArrays: function (mode, first, count) {
                                console.log(`drawArrays called with mode=${mode}, first=${first}, count=${count}`);
                            },
                            shaderSource: function (shader, source) {
                                console.log(`shaderSource called with shader=${shader}, source=${source}`);
                            },
                            compileShader: function (shader) {
                                console.log(`compileShader called with shader=${shader}`);
                            },
                            attachShader: function (program, shader) {
                                console.log(`attachShader called with program=${program}, shader=${shader}`);
                            },
                            linkProgram: function (program) {
                                console.log(`linkProgram called with program=${program}`);
                            },
                            useProgram: function (program) {
                                console.log(`useProgram called with program=${program}`);
                            },
                            getSupportedExtensions: function () {
                                console.log("getSupportedExtensions called");
                                return [
                                    "WEBGL_debug_renderer_info",
                                    "OES_texture_float",
                                    "OES_texture_half_float",
                                    "OES_standard_derivatives",
                                    "OES_vertex_array_object",
                                    "WEBGL_lose_context",
                                    "EXT_blend_minmax",
                                    "EXT_texture_filter_anisotropic",
                                    "EXT_frag_depth",
                                    "EXT_shader_texture_lod",
                                    "EXT_sRGB",
                                    "OES_element_index_uint",
                                    "WEBGL_depth_texture",
                                    "WEBGL_draw_buffers"
                                ];
                            },
                            enable: function (cap) {
                                console.log(`enable called with cap=${cap}`);
                            },
                            depthFunc: function (func) {
                                console.log(`depthFunc called with func=${func}`);
                            },
                            clearColor: function (red, green, blue, alpha) {
                                console.log(`clearColor called with red=${red}, green=${green}, blue=${blue}, alpha=${alpha}`);
                            },
                            getContextAttributes: function () {
                                console.log("getContextAttributes called");
                                return {
                                    alpha: true,
                                    depth: true,
                                    stencil: true,
                                    antialias: true,
                                    premultipliedAlpha: true,
                                    preserveDrawingBuffer: false,
                                    powerPreference: "default",
                                    failIfMajorPerformanceCaveat: false
                                };
                            },
                            toDataURL: function () {
                                console.log(`toDataURL called on WebGL context`);
                                return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="; // 返回一个简单的 base64 图像数据
                            }
                        };
                    }
                    return null;
                },
                toDataURL: function () {
                    console.log(`toDataURL called on canvas`);
                    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="; // 返回一个简单的 base64 图像数据
                }
            };
        }
        // 其他标签的处理
        return {
            tagName: tagName.toUpperCase(),
            src: "",
            async: false,
            onload: null,
            onerror: null,
        };
    },
    createTextNode: (text) => {
        console.log(`Creating text node: ${text}`);
        return {nodeType: 3, data: text};
    },
    querySelector: (selector) => {
        console.log(`Querying selector: ${selector}`);
        return null; // 模拟查询返回 null
    },
    querySelectorAll: (selector) => {
        console.log(`Querying selector all: ${selector}`);
        return []; // 模拟查询返回空数组
    },
    getElementById: (id) => {
        console.log(`Getting element by ID: ${id}`);
        return null; // 模拟查询返回 null
    },
    getElementsByClassName: (className) => {
        console.log(`Getting elements by class name: ${className}`);
        return []; // 模拟查询返回空数组
    },
    getElementsByTagName: (tagName) => {
        console.log(`Getting elements by tag name: ${tagName}`);
        return []; // 模拟查询返回空数组
    },

    // 事件处理
    addEventListener: (type, listener, options) => {
        console.log(`Adding event listener: ${type}`);
    },
    removeEventListener: (type, listener, options) => {
        console.log(`Removing event listener: ${type}`);
    },

    // Range 模拟
    createRange: () => {
        console.log("Creating range");
        return {
            setStart: () => {
            },
            setEnd: () => {
            },
            commonAncestorContainer: null,
        };
    },

    // Selection 模拟
    getSelection: () => {
        console.log("Getting selection");
        return {
            removeAllRanges: () => {
            },
            addRange: () => {
            },
        };
    },

    // DOM 修改模拟
    appendChild: (child) => {
        console.log("Appending child to document");
    },
    removeChild: (child) => {
        console.log("Removing child from document");
    },

    // 其他接口模拟
    execCommand: (command, showUI, value) => {
        console.log(`Executing command: ${command}`);
        return true; // 模拟返回成功
    },
    write: (htmlString) => {
        console.log(`Writing HTML: ${htmlString}`);
    },
    close: () => {
        console.log("Closing document");
    },
};

var _0x3f5411 = _0x35fb;
(() => {
        for (var e = _0x35fb, t = _0x1f7d(); ;)
            try {
                if (801318 == +parseInt(e(724)) * (-parseInt(e(876)) / 2) + parseInt(e(810)) / 3 + -parseInt(e(793)) / 4 + parseInt(e(404)) / 5 + -parseInt(e(752)) / 6 + parseInt(e(439)) / 7 * (parseInt(e(613)) / 8) + -parseInt(e(377)) / 9 * (-parseInt(e(707)) / 10))
                    break;
                t.push(t.shift())
            } catch (e) {
                t.push(t.shift())
            }
    }
)();
var JDHAppBridge, JMAppBridge, SFreshAppBridge, JXTJAppBridge, YHDAppBridge, DJAppBridge, JdDoctorAppBridge,
    JDBMallAppBridge, YJCAppBridge, _riskFpMode = _riskFpMode || _0x3f5411(472),
    jdtRiskContext = (_0x3f5411(744) != _riskFpMode && (_riskFpMode = _0x3f5411(472)),
    _0x3f5411(680) != typeof String[_0x3f5411(892)][_0x3f5411(917)] && (String[_0x3f5411(892)].startsWith = function (e) {
            var t = _0x3f5411;
            return this[t(904)](0, e[t(875)]) === e
        }
    ),
    _0x3f5411(680) != typeof String[_0x3f5411(892)][_0x3f5411(592)] && (String[_0x3f5411(892)][_0x3f5411(592)] = function (e) {
            var t = _0x3f5411;
            return -1 !== this[t(489)](e, this[t(875)] - e[t(875)])
        }
    ),
    jdtRiskContext || {
        d: !1,
        canvas_fp_md5: "",
        isRpTok: !1,
        isSdkTokenFinished: !1,
        isJsTokenFinished: !1,
        isSupportApp: !1,
        version: _0x3f5411(910),
        deviceInfo: {
            jsToken: "",
            eid: "",
            sdkToken: "",
            clientVersion: "",
            fp: ""
        },
        isReady: function () {
            var e = _0x3f5411;
            return this.isJsTokenFinished && this[e(476)]
        }
    });

function _AppBridge(e, t) {
    var a = _0x3f5411;
    this[a(670)] = e,
        this.supportVersion = t || "0",
        this[a(764)] = this[a(832)].split("."),
        this.parseUa = function (e) {
            var t = a
                , i = e[t(831)](";");
            return {
                appName: i[0][t(474)](),
                version: 2 < i[t(875)] ? i[2].trim() : "",
                isIos: this.isIOS(e)
            }
        }
        ,
        this[a(467)] = function (e) {
            var t = a;
            if (this.supportVersion == e)
                return 0;
            for (var i = e[t(831)]("."), n = 0; n < Math.min(this[t(764)][t(875)], i[t(875)]); n++) {
                if (!i[n])
                    return -1;
                if (!this[t(764)][n])
                    return 1;
                if (parseInt(i[n]) > parseInt(this.subVers[n]))
                    return 1
            }
            return i.length > this[t(764)][t(875)] ? 1 : -1
        }
        ,
        this[a(850)] = function (e, t) {
            var i = a;
            try {
                return !(!(t = t || this[i(372)](e)) || this.appName !== t[i(670)]) && 0 <= this.compareVersion(t[i(742)])
            } catch (e) {
            }
            return !1
        }
        ,
        this.isIOS = function (e) {
            return /(iPhone|iPad|iPod|iOS)/i[a(617)](e)
        }
        ,
        this.callBridge = function (e, t, n) {
            var r = a;
            try {
                var o = this[r(372)](e);
                this[r(850)](null, o) && this.doCallBridge(t, o, function (e, t, i) {
                    (i = i || {})[r(723)] = o.appName,
                        n(e, t, i)
                })
            } catch (e) {
                jdtRiskContext && jdtRiskContext.d && console[r(914)]("call bridge error : ", e)
            }
        }
        ,
        this[a(527)] = function () {
            var e = a;
            return "global_" + this.appName + e(447)
        }
        ,
        this[a(889)] = function (e, t, i) {
            var n = a;
            throw "App : " + this[n(670)] + n(894)
        }
}

function _0x1f7d() {
    var e = ["callBridge", "canvas_fp_md5", "fonts", "fontSize", "type", "getLocalStorageSupport", "iphone", "withCredentials", "https://mllog.jd.com/mlog/unite.do", "RED_BITS", "getComputedStyle", "compareVersion", "strokeStyle", "sessionStorageKey", "white", "cookieEnabled", "strict", "https://", "trim", "ipad", "isSdkTokenFinished", "7.0.2", "shadingLV", "external", "devicePixelRatio,screenTop,screenLeft", "DJ App Bridge CALL ERROR", "isJsTokenFinished", "getItem", "TDEncrypt", "jdjr", "SymbianOS/", "globalStorage", "reportCnt", "indexOf", "documentMode", "each", "jsTokenKey", "WebKitBlobBuilder", "suffixes", "set", "object", "YHD App Bridge CALL ERROR", "getTimezoneOffset", "BLUE_BITS", "navigator", "getLanguage", "timezoneOffset", "unix", "https:", "getCanvasFp", "hardwareConcurrency", "__fxdriver_unwrapped", "getFeature", "expires=", "text/javascript", "browserVersion", "giaDKey", "createObjectURL", "TRIANGLE_STRIP", "undefined", "getPlugins", "send", "getAddBehaviorSupport", "osf1", "compileShader", "jdjr-app", "getWebglCanvas", "shadowOffsetX", "JS-M", "resp parse error", "biometricForJS", "getCallbackName", "NetBSD", "JD APP VERSION NOT SUPPORT", "appBridgeMap", "openDatabase", "4.6.0", "Opera", "firefox", "parse", "cookie", "navigator/", "env collect error", "addBehavior", "depthFunc", "floor", "enable", "match", "02_mt_5LXK_60653970589", "MAX_VERTEX_UNIFORM_VECTORS", "SHADING_LANGUAGE_VERSION", "width", "setItem", "reportWorker", "] Cost time :", "iapDeviceCallback", "createShader", "IRIX", "initFunc", "TSA9D23F7A4B3CSS", "webgl,experimental-webgl,moz-webgl,webkit-3d", "yhd", "deviceTime", "w13", "getUserAgent", "appversion/", "getOpenDatabaseSupport", "6.0", "YJC App Bridge CALL ERROR", "language", "_selenium", "push", "UNMASKED_RENDERER_WEBGL", "callPhantom", "Msxml2.DOMDocument", "callSelenium", "__webdriver_script_func", "sdkBizId", "onBiometricFinish", "__selenium_unwrapped", "AcroPDF.PDF,Adodb.Stream,AgControl.AgControl,DevalVRXCtrl.DevalVRXCtrl.1,MacromediaFlashPaper.MacromediaFlashPaper,Msxml2.DOMDocument,Msxml2.XMLHTTP,PDF.PdfCtrl,QuickTime.QuickTime,QuickTimeCheckObject.QuickTimeCheck.1,RealPlayer,RealPlayer.RealPlayer(tm) ActiveX Control (32-bit),RealVideo.RealVideo(tm) ActiveX Control (32-bit),rmocx.RealPlayer G2 Control,Scripting.Dictionary,Shell.UIHelper,ShockwaveFlash.ShockwaveFlash,SWCtl.SWCtl,TDCCtl.TDCCtl,WMPlayer.OCX", "~~~", "hash128", "tencenttraveler", "fp keys:", "getCurrentRootDomain", "JS BRIDGE CALL ERROR", "join", "JDAppUnite", "gia_d", "COLOR_BUFFER_BIT", "substring", "safari/", "shaderSource", "map", "useProgram", "endsWith", ".localdomain", "RENDERER", "taintEnabled", "STATIC_DRAW", "QQ???", "message", "getSupportFonts", "FLOAT", "fp collect error", "getCookie", "open", "MAX_VERTEX_ATTRIBS", "wuv:", "OSF1", "statusText", "w21", "innerHTML", "djJava", "ActiveBorder,ActiveCaption,AppWorkspace,Background,ButtonFace,ButtonHighlight,ButtonShadow,ButtonText,CaptionText,GrayText,Highlight,HighlightText,InactiveBorder,InactiveCaption,InactiveCaptionText,InfoBackground,InfoText,Menu,MenuText,Scrollbar,ThreeDDarkShadow,ThreeDFace,ThreeDHighlight,ThreeDLightShadow,ThreeDShadow,Window,WindowFrame,WindowText", "nativeForEach", "924232QdonJN", "XMLHttpRequest", "bizTimeout", "indexedDb", "test", "UC???", "height", "01234567", "fpKey", "indexedDB", "jsToken", "QuickTimeCheckObject.QuickTimeCheck.1", "60px 'Not a real font'", "token", "UNSUPPORTED APP", "forEach", "JD JS SDK Callback ERROR", "responseText", "deMap", "notifyMessageToNative", "netbsd", "feature", "onreadystatechange", "BlobBuilder", "worker", "callNative", "round", "getFpExcludeOptions", "nt 6.0", "ALIASED_POINT_SIZE_RANGE", "JDTRiskBridgeUtil", "stack", "createElement", "offsetWidth", "linkProgram", "w17", "uniformOffset", "stk", "msie ", "getStoreCheck", "FROM LOCAL CACHE", "jdd03", "isSupportApp", "Content-Type", "load", "offsetHeight", "getBrowserInfo", "FINISHED", "plugins", "respText", "timeout_", "mac", "wuv", "offsetUniform", "style", "uniform2f", "clientVersion", "appName", "72px", "lil", "callAppBridge", "bsd", "4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako", "UNMASKED_VENDOR_WEBGL", "success", "3.1.2", "userAgent", "function", "isValidSdkToken", "LEQUAL", "JR BRIDGE CALL ERROR", "cleanAndPushDeS", "clientVersion=([^&]*)(&|$)", "postMessage", "compatMode", "getEnvExcludeOptions", "Microsoft.XMLHTTP", "antialias", "VENDOR", "7freshapp", "clearColor", "5.0.1", "startTime", "lineCap", "extensions:", "http://", "HASH", "toString", "w16", "MozBlobBuilder", "doNotTrack", "MobileNavi", "_Selenium_IDE_Recorder", "wur:", "10yRIYMu", "MAX_VERTEX_TEXTURE_IMAGE_UNITS", "duraTime", "setTime", "cpuClass", "hidden", "JDH App Bridge CALL ERROR", "attrVertex", "toUTCString", "collect env data :", "ontimeout", "6.5.0", "indexedDbKey", "innerWidth", "getContext", "_*_UYBN6YGTNO6DHPVB", "app", "5FkNzFH", "experimental-webgl", "JR JS Bridge Result :", "deviceInfo", "error", "WEBKIT_EXT_texture_filter_anisotropic", "VERSION", "jdltapp", "localStorage", "javaEnabled", "JR BRIDGE NOT SUPPORT", "rmocx.RealPlayer G2 Control.1", "createWorker", "WebGLRenderingContext", "createBuffer", "sogoumobilebrowser", "EXT_texture_filter_anisotropic", "platform", "version", "webgl", "fast", "MAX_VIEWPORT_DIMS", "call", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "mmmmmmmmmmlli", "Skype.Detection", "#42e1a2", "BATQW722QTLYVCRD", "9539760GLukeg", "__fp_domain", "randomStr", "JXTJ App Bridge CALL ERROR", "div", "colorDepth", "code", "getParameter", "jsDefault", "nt 6.1", "protocol", "vertexAttribPointer", "subVers", "red", "setRequestHeader", "location", "XWebView", "ActiveXObject", "fontFamily", "data", "MAX_TEXTURE_IMAGE_UNITS", "__webdriver_unwrapped", "getOsInfo", "execute", "fillRect", "MacromediaFlashPaper.MacromediaFlashPaper", "availHeight,availWidth,colorDepth,bufferDepth,deviceXDPI,deviceYDPI,height,width,logicalXDPI,logicalYDPI,pixelDepth,updateInterval", "getTime", "webglversion", "getPropertyValue", "interval", "getBlob", "GIA_LDE_MAP_KEY", "getDoNotTrack", "onerror", "getSessionStorageSupport", "getSupportApp", "isRpTok", "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-", "FROM REGX", "registerAppBridge", "6186664UtTfbI", "msie", "store", "CA1AN5BV0CA8DS2E3F", "canvasFpKey", "getJdEid", "getBizId", "browserMode", "fpTsKey", "top", "getUrlQueryStr", "addBehaviorKey", "sun os", "opera", "irix", "numItems", "src", "2165043hiuUKV", "nt 5.1", "linux", "async", "getScreenInfo", "WMPlayer.OCX", "w15", "messageHandlers", "jddoctor", "__global_jdt_risk_fp_exec", "global_", "getCurrentPageUrl", "removeChild", "???????", "hasOwnProperty", "toLowerCase", "ShockwaveFlash.ShockwaveFlash", "JR SDK call ERROR", "#1a3bc1", "00000000", "FP function : [", "split", "supportVersion", "bufferData", "drawArrays", "localStorageKey", "fillStyle", "SUCCESS", "screenResolution", "eid", "bizId", "string", "JR CALLBACK ERROR", "_gia_d", "ibm os/2", "jdd", "MAX_TEXTURE_MAX_ANISOTROPY_EXT", "win", "applewebkit_chrome", "canvas", "isSupportBioBridge", "callMethod", "itemSize", "onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, data.async);\n            httpRequest['withCredentials'] = true;\n            httpRequest['setRequestHeader']('Content-Type', data.isJson ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};", "jmapp", "?????", "status", "isReady", "errTrace", "getIEPluginsString", "__webdriver_evaluate", "webkit", "getScreenResolution", "etn", "getCanvasInfo", "UNSUPPORTED APP.", "w10", "MAX_FRAGMENT_UNIFORM_VECTORS", "MAX_RENDERBUFFER_SIZE", "BiometricApi", "/jsTk.do", "appendChild", "storeCheck", "Scripting.Dictionary", "__driver_evaluate", "length", "183422cJwBpE", "bp_bizid", "position", "callBiological", "getEncryptedCollectInfo", "eidKey", "GetVersions", "charAt", "ibm", "onabort", "osVersion", "name", "isDegrade", "doCallBridge", "extensions", "getColorRgb", "prototype", "DevalVRXCtrl.DevalVRXCtrl.1", " Bridge Method not implemented", "MAX_COMBINED_TEXTURE_IMAGE_UNITS", "bridgeBiologicalProbe", "nt 5.0", "obtainPin", "aix", "_bioDeviceSdkTokenCb", "ldeKey", "span", "QuickTime.QuickTime", "slice", "tdHash", "fillText", "visibility", "screen", "__driver_unwrapped", "4.2.8.0", "//gias.jd.com/dy/js/mom.js?bizId=", "jdbmall", "ARRAY_BUFFER", "log", "abort_", "applewebkit/", "startsWith", "4.1.8", "getRegularPluginsString", "&d=", "Microsoft Internet Explorer", "ALIASED_LINE_WIDTH_RANGE", "metasr", "createProgram", "w24", "chrome/", "reportTime", "Msxml2.XMLHTTP", "3AB9D23F7A4B3CSS", "append", "FreeBSD", "body", "jsToIOS", "WEBGL_debug_renderer_info", "AcroPDF.PDF", "vertexPosAttrib", "harmony", "MD5", "env", "4.90", "getWebglFp", "wur", "w19", "TSA9D23F7A4B3CFF", "shadowColor", "FRAGMENT_SHADER", "xhr", "rgba(0, 0, 200, 0.5)", "parseUa", "enableVertexAttribArray", "getFpServerDomain", "self", "powerPC", "26112069mFthDf", "stroke", "toDataURL", "getSdkToken", "stringify", "__selenium_evaluate", "ucbrowser", "Msxml3.XMLHTTP", "_version", "color", "application/x-www-form-urlencoded;charset=UTF-8", "sendRequest error : ", "jdhapp", "jdd01", "alphabetic", "innerHeight", "attachShader", "report log error :", "get", "DeviceFingerprintBridge", "script", "font", "TDCCtl.TDCCtl", "freshApp", "getJsToken", "PR flacks quiz gym: TV DJ box when? ☠", "freebsd", "2712095FEPJlV", "getCurrentPageProtocol", "getPositionInfo", "MAX_VARYING_VECTORS", "SymbianOS", "sendRequest", "getSupportedExtensions", "href", "getHardwareConcurrency", "2.0.0", "ceil", "windows", "isIos", "powerpc", "getNavigatorPlatform", "the world", "FFA9D23F7A4B3CSS", "sdkToken", "MOZ_EXT_texture_filter_anisotropic", "getBrowserMode", "_is_jdsh_wkwebview", "yjcapp", "isIOS", "DEPTH_TEST", "jra.jd.com", "nativeMap", "JDDoctor App Bridge CALL ERROR", "callTime", "jdapp", "IvepNative", "contextName", "getExtension", "yes", "charCodeAt", "responseTime", "14vPZEal", "apply", "serif", "timeout", "sun", "safari", "SWCtl.SWCtl", "isValidJsToken", "_AppBridgeCallback", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "yhdapp", "sessionStorage", "Adodb.Stream", "Worker", "MAX_CUBE_MAP_TEXTURE_SIZE", "sdkTokenKey", "getAttribLocation"];
    return (_0x1f7d = function () {
            return e
        }
    )()
}

_globalState = {
    uuid: null,
    reportCnt: 0,
    loadTime: (new Date).getTime(),
    callTime: null,
    callMethod: "",
    responseTime: null,
    bizTimeout: null,
    step: "init",
    errTrace: [],
    reportTime: null,
    xhr: {
        startTime: null,
        responseTime: null,
        status: -1,
        statusText: "",
        respText: ""
    }
},
window[_0x3f5411(643)] || (window[_0x3f5411(643)] = (o => (o[_0x3f5411(530)] = {},
    o[_0x3f5411(792)] = function (e) {
        var t = _0x3f5411;
        o[t(530)][e[t(670)]] = e
    }
    ,
    o.getSupportApp = function (e) {
        var t = _0x3f5411;
        try {
            for (var i in o[t(530)]) {
                var n = o[t(530)][i];
                if (n.isSupportBioBridge(e))
                    return n
            }
        } catch (e) {
        }
        return null
    }
    ,
    o[_0x3f5411(673)] = function (e, t, i) {
        var n = _0x3f5411
            , r = (e = e.toLowerCase(),
            o[n(788)](e));
        r ? (jdtRiskContext && (jdtRiskContext[n(655)] = !0),
            r[n(456)](e, t, i)) : i(!1, n(865))
    }
    ,
    o))(window[_0x3f5411(643)] || {}),
    JDTRiskBridgeUtil[_0x3f5411(792)](new (JDHAppBridge = function () {
            var r = _0x3f5411;
            _AppBridge[r(440)](this, [r(389), r(694)]),
                this[r(889)] = function (e, t, i) {
                    var n = r;
                    e = {
                        operation: 5,
                        biometricData: {
                            bizId: e[n(840)]
                        }
                    },
                        window[this[n(527)]()] = function (e) {
                            var t = n;
                            (e = t(496) == typeof e ? e : JSON.parse(e))[t(677)] ? i(!0, t(837), {
                                sdkToken: e[t(626)]
                            }) : i(!1, t(713))
                        }
                        ,
                        t[n(416)] ? window.webkit[n(817)][n(396)].postMessage({
                            callBackName: this[n(527)](),
                            method: n(526),
                            params: e
                        }) : window[n(396)][n(526)](JSON[n(381)](e), this[n(527)]())
                }
        }
    )),
    JDTRiskBridgeUtil[_0x3f5411(792)](new (JMAppBridge = function () {
            var r = _0x3f5411;
            _AppBridge[r(440)](this, [r(854)]),
                this[r(372)] = function (e) {
                    var t = r
                        , i = {
                        appName: "",
                        version: "",
                        isIos: !1
                    }
                        , e = (/JM_IOS|JM_ANDROID/i[t(617)](e) && (i.appName = t(854)),
                    /JM_IOS/i[t(617)](e) && (i[t(416)] = !0),
                        e[t(543)](/(JM_IOS|JM_ANDROID)\/([\d\.]+)/i));
                    return i[t(742)] = e ? e[2] : "0",
                        i
                }
                ,
                this[r(527)] = function () {
                    return r(551)
                }
                ,
                this.doCallBridge = function (e, t, i) {
                    var n = r;
                    e = {
                        operation: 5,
                        biometricData: {
                            bizId: e[n(840)]
                        }
                    },
                        window[this[n(527)]()] = function (e) {
                            var t = n;
                            (e = "object" == typeof e ? e : JSON[t(535)](e))[t(626)] ? i(!0, "SUCCESS", {
                                sdkToken: e[t(626)]
                            }) : i(!1, "JM App Bridge CALL ERROR")
                        }
                        ,
                        t.isIos ? window.webkit.messageHandlers[n(879)].postMessage({
                            callbackFunction: this[n(527)](),
                            routerParams: JSON[n(381)](e)
                        }) : window[n(433)][n(879)](JSON.stringify(e), this[n(527)]())
                }
        }
    )),
    JDTRiskBridgeUtil[_0x3f5411(792)](new (SFreshAppBridge = function () {
            var r = _0x3f5411;
            _AppBridge.apply(this, [r(692), r(918)]),
                this[r(372)] = function (e) {
                    var t = r
                        , i = e[t(831)](";");
                    return {
                        appName: i[0].trim(),
                        version: 3 < i[t(875)] ? i[3][t(474)]() : "",
                        isIos: this[t(426)](e)
                    }
                }
                ,
                this[r(889)] = function (e, t, i) {
                    var n = r;
                    e = {
                        operation: 5,
                        biometricData: {
                            bizId: e[n(840)]
                        }
                    },
                        this[n(527)] = function () {
                            var e = n;
                            return t[e(416)] ? e(574) : e(820) + this[e(670)] + e(447)
                        }
                        ,
                        window[this[n(527)]()] = function (e) {
                            var t = n;
                            (e = "object" == typeof e ? e : JSON[t(535)](e))[t(677)] ? i(!0, t(837), {
                                sdkToken: e[t(626)]
                            }) : i(!1, "7Fresh App Bridge CALL ERROR")
                        }
                        ,
                        t.isIos ? window.webkit.messageHandlers[n(400)][n(686)]({
                            callbackFunction: "biometricForJS",
                            routerParams: JSON[n(381)](e)
                        }) : window.freshApp && window.freshApp[n(526)](JSON[n(381)](e), this[n(527)]())
                }
        }
    )),
    JDTRiskBridgeUtil[_0x3f5411(792)](new (JXTJAppBridge = function () {
            var r = _0x3f5411;
            _AppBridge[r(440)](this, [r(731), r(718)]),
                this[r(850)] = function (e, t) {
                    var i = r;
                    try {
                        return !(!(t = t || this[i(372)](e)) || this[i(670)] !== t[i(670)]) && (!t.isIos || 0 <= this[i(467)](t[i(742)]))
                    } catch (e) {
                    }
                    return !1
                }
                ,
                this[r(889)] = function (e, t, i) {
                    var n = r;
                    window[this[n(527)]()] = function (e) {
                        var t = n;
                        (e = "object" == typeof e ? e : JSON[t(535)](e)) && "0" == e.status && e[t(771)][t(677)] ? i(!0, t(837), {
                            sdkToken: e[t(771)][t(626)]
                        }) : i(!1, t(755))
                    }
                        ,
                        e = {
                            businessType: n(896),
                            callBackName: this[n(527)](),
                            params: {
                                jsonData: {
                                    operation: 5,
                                    biometricData: {
                                        bizId: e[n(840)]
                                    }
                                }
                            }
                        },
                        t[n(416)] ? window[n(861)].messageHandlers[n(584)].postMessage({
                            method: n(632),
                            params: JSON[n(381)](e)
                        }) : window[n(584)] && window[n(584)][n(632)](JSON[n(381)](e))
                }
        }
    )),
    JDTRiskBridgeUtil.registerAppBridge(new (YHDAppBridge = function () {
            var r = _0x3f5411;
            _AppBridge[r(440)](this, [r(449), "8.5.8"]),
                this[r(889)] = function (e, t, i) {
                    var n = r;
                    window[this[n(527)]()] = function (e) {
                        var t = n;
                        (e = t(496) == typeof e ? e : JSON[t(535)](e)) && e[t(677)] ? i(!0, t(837), {
                            sdkToken: e[t(626)]
                        }) : i(!1, t(497))
                    }
                        ,
                        e = {
                            operation: 5,
                            biometricData: {
                                bizId: e[n(840)]
                            }
                        },
                        t.isIos ? window[n(861)][n(817)][n(356)][n(686)]({
                            method: n(526),
                            params: JSON[n(381)](e),
                            callBackId: this[n(527)]()
                        }) : window.yhd && window[n(557)][n(526)](JSON[n(381)](e), this[n(527)]())
                }
        }
    )),
    JDTRiskBridgeUtil[_0x3f5411(792)](new (DJAppBridge = function () {
            var r = _0x3f5411;
            _AppBridge[r(440)](this, ["jdlocal", "8.37.0"]),
                this.parseUa = function (e) {
                    var t = e[r(543)](/appName=([^&]+)/i)
                        , i = e.match(/djAppVersion=([^&]+)/i);
                    return {
                        appName: t ? t[1] : "",
                        version: i ? i[1] : "",
                        isIos: this.isIOS(e)
                    }
                }
                ,
                this[r(889)] = function (e, t, i) {
                    var n = r;
                    e = {
                        operation: 5,
                        biometricData: {
                            bizId: e.bizId
                        }
                    },
                        window[this.getCallbackName()] = function (e) {
                            var t = _0x35fb;
                            (e = t(496) == typeof e ? e : JSON[t(535)](e))[t(677)] ? i(!0, t(837), {
                                sdkToken: e[t(626)]
                            }) : i(!1, t(481))
                        }
                        ,
                        t[n(416)] ? window[n(861)][n(817)][n(704)][n(686)]({
                            method: n(526),
                            callBackName: this[n(527)](),
                            data: JSON.stringify(e)
                        }) : window[n(610)] && window[n(610)][n(526)](JSON.stringify(e), this.getCallbackName())
                }
        }
    )),
    JDTRiskBridgeUtil.registerAppBridge(new (JdDoctorAppBridge = function () {
            var a = _0x3f5411;
            _AppBridge.apply(this, [a(818), a(678)]),
                this.parseUa = function (e) {
                    var t, i = a, n = this.isIOS(e), r = "", o = "";
                    return n ? (r = (t = e.split(";"))[0][i(474)](),
                        o = 2 < t[i(875)] ? t[2][i(474)]() : "") : 3 <= (t = e[i(831)]("/")).length && -1 !== t[t[i(875)] - 3][i(489)]("jddoctor") && (o = t[t[i(875)] - 2].replace(r = "jddoctor", "")),
                        {
                            appName: r,
                            version: o,
                            isIos: n
                        }
                }
                ,
                this.doCallBridge = function (e, t, i) {
                    var n = a;
                    e = {
                        operation: 5,
                        biometricData: {
                            bizId: e[n(840)]
                        }
                    },
                        window[this[n(527)]()] = function (e) {
                            var t = n;
                            (e = "object" == typeof e ? e : JSON[t(535)](e)).success ? i(!0, t(837), {
                                sdkToken: e.token
                            }) : i(!1, t(430))
                        }
                        ,
                        t[n(416)] ? window[n(861)][n(817)].callBiological[n(686)]({
                            callbackFunction: this[n(527)](),
                            routerParams: JSON[n(381)](e)
                        }) : window[n(433)] && window[n(433)][n(879)](JSON.stringify(e), this[n(527)]())
                }
        }
    )),
    JDTRiskBridgeUtil[_0x3f5411(792)](new (JDBMallAppBridge = function () {
            var a = _0x3f5411;
            _AppBridge[a(440)](this, ["jdbmall"]),
                this[a(372)] = function (e) {
                    for (var t = a, i = "", n = "", r = e[t(831)](";"), o = 0; o < r[t(875)]; o++)
                        "jdbmall" == r[o] && (i = t(912)),
                        0 <= r[o][t(489)](t(561)) && (n = r[o][t(831)]("/")[1]);
                    return {
                        appName: i,
                        version: n,
                        isIos: this[t(426)](e)
                    }
                }
                ,
                this[a(889)] = function (e, t, i) {
                    var n = a;
                    e = {
                        operation: 5,
                        biometricData: {
                            bizId: e[n(840)]
                        }
                    },
                        this[n(527)] = function () {
                            var e = n;
                            return t[e(416)] ? e(551) : e(820) + this[e(670)] + e(447)
                        }
                        ,
                        window[this[n(527)]()] = function (e) {
                            var t = n;
                            (e = t(496) == typeof e ? e : JSON[t(535)](e)).success ? i(!0, "SUCCESS", {
                                sdkToken: e[t(626)]
                            }) : i(!1, "JDBMall App Bridge CALL ERROR")
                        }
                        ,
                        t.isIos ? window[n(861)].messageHandlers[n(879)][n(686)]({
                            callbackFunction: this[n(527)](),
                            routerParams: JSON[n(381)](e)
                        }) : window[n(433)] && window[n(433)][n(879)](JSON[n(381)](e), this[n(527)]())
                }
        }
    )),
    JDTRiskBridgeUtil[_0x3f5411(792)](new (YJCAppBridge = function () {
            var r = _0x3f5411;
            _AppBridge[r(440)](this, [r(425)]),
                this[r(372)] = function (e) {
                    var t = r
                        , i = e[t(831)](";");
                    return {
                        appName: i[0][t(474)](),
                        version: 3 < i.length ? i[3][t(474)]() : "",
                        isIos: this[t(426)](e)
                    }
                }
                ,
                this[r(889)] = function (e, t, i) {
                    var n = r;
                    e = {
                        operation: 5,
                        biometricData: {
                            bizId: e[n(840)]
                        }
                    },
                        window[this[n(527)]()] = function (e) {
                            var t = n;
                            (e = "object" == typeof e ? e : JSON[t(535)](e))[t(677)] ? i(!0, t(837), {
                                sdkToken: e[t(626)]
                            }) : i(!1, t(564))
                        }
                        ,
                        t[n(416)] ? window[n(861)][n(817)][n(879)][n(686)]({
                            callbackFunction: this[n(527)](),
                            routerParams: JSON[n(381)](e)
                        }) : window[n(433)] && window[n(433)].callBiological(JSON[n(381)](e), this[n(527)]())
                }
        }
    )));
var collectConfig = collectConfig || {
    fp: {
        language: "language",
        userAgent: _0x3f5411(679),
        colorDepth: "colorDepth",
        screenResolution: _0x3f5411(838),
        timezoneOffset: _0x3f5411(502),
        sessionStorage: _0x3f5411(450),
        localStorage: _0x3f5411(732),
        indexedDb: _0x3f5411(616),
        addBehavior: "addBehavior",
        openDatabase: _0x3f5411(531),
        cpuClass: "cpuClass",
        platform: _0x3f5411(741),
        hardwareConcurrency: _0x3f5411(506),
        doNotTrack: _0x3f5411(703),
        plugins: _0x3f5411(661),
        canvas: _0x3f5411(849),
        webgl: "webgl"
    },
    env: {
        color: "color",
        canvas: _0x3f5411(849),
        browserMode: _0x3f5411(800),
        fonts: _0x3f5411(458),
        feature: "feature",
        plugins: _0x3f5411(661),
        screen: "screen",
        position: "position",
        storeCheck: _0x3f5411(872)
    },
    store: {
        sdkTokenKey: _0x3f5411(751),
        giaDKey: _0x3f5411(843),
        canvasFpKey: _0x3f5411(796),
        ldeKey: _0x3f5411(784),
        strict: {
            jsTokenKey: _0x3f5411(352),
            fpKey: _0x3f5411(420),
            fpTsKey: _0x3f5411(555),
            eidKey: "3AB9D23F7A4B3C9B"
        },
        fast: {
            jsTokenKey: "3AB9D23F7A4B3CFF",
            fpKey: "FFA9D23F7A4B3CFF",
            fpTsKey: _0x3f5411(367),
            eidKey: "3AB9D23F7A4B3CFF"
        }
    },
    getEnvExcludeOptions: function (e) {
        var t, i = _0x3f5411;
        return i(472) == e ? ((t = {})[this.env[i(458)]] = !0,
            t) : i(744) == e ? ((t = {})[this[i(362)].color] = !0,
            t[this[i(362)][i(458)]] = !0,
            t) : void 0
    },
    getFpExcludeOptions: function (e) {
        var t = _0x3f5411;
        return t(472) == e ? {} : t(744) == e ? ((e = {})[this.fp[t(743)]] = !0,
            e[this.fp[t(661)]] = !0,
            e[this.fp[t(679)]] = !0,
            e[this.fp.doNotTrack] = !0,
            e) : void 0
    }
}
    , jdtRiskUtil = (a => {
        var c = _0x3f5411
            , e = "https:" == document[c(767)].protocol ? c(473) : c(698)
            , t = window[c(753)] || c(428)
            , i = ""
            , n = ""
            , r = ""
            , o = document.location[c(411)][c(700)]();
        try {
            var s = /^https?:\/\/(?:\w+\.)*?(\w*\.(?:com\.cn|cn|com|net|id))[\\\/]*/.exec(o)
                , l = (n = s && 1 < s[c(875)] ? s[1] : document.domain[c(831)](".").slice(-2)[c(583)]("."),
                o[c(489)]("?"));
            0 < l && (500 < (i = o[c(587)](l + 1)).length && (i = i.substring(0, 499)),
                o = o[c(587)](0, l)),
                r = o[c(587)](e[c(875)])
        } catch (e) {
        }
        return a[c(821)] = function () {
            return r
        }
            ,
            a[c(405)] = function () {
                return e
            }
            ,
            a.getCurrentRootDomain = function () {
                return n
            }
            ,
            a[c(374)] = function () {
                return t
            }
            ,
            a[c(803)] = function () {
                return i
            }
            ,
            a[c(799)] = function () {
                return c(515) == typeof bp_bizid ? "" : bp_bizid
            }
            ,
            a[c(736)] = function () {
                var t = c;
                if (window[t(452)] && !a[t(637)]) {
                    var i, n = t(853);
                    try {
                        i = new Blob([n], {
                            type: "application/javascript"
                        })
                    } catch (e) {
                        window.BlobBuilder = window[t(636)] || window[t(493)] || window[t(702)],
                            (i = new BlobBuilder)[t(353)](n),
                            i = i[t(783)]()
                    }
                    try {
                        a[t(637)] = new Worker(URL[t(513)](i))
                    } catch (e) {
                    }
                }
            }
            ,
            a[c(549)] = function (e, t, i = !0, n = !1) {
                var r, o = c;
                try {
                    a[o(637)] && (r = {
                            url: e,
                            data: t,
                            async: i,
                            isJson: n
                        },
                            this[o(637)][o(686)](JSON.stringify(r)),
                            this[o(637)].onmessage = function (e) {
                            }
                    )
                } catch (e) {
                }
            }
            ,
            a[c(467)] = function (e, t) {
                var i = c;
                try {
                    if (e === t)
                        return 0;
                    for (var n = e[i(831)]("."), r = t[i(831)]("."), o = 0; o < n[i(875)]; o++) {
                        var a = parseInt(n[o]);
                        if (!r[o])
                            return 1;
                        var s = parseInt(r[o]);
                        if (a < s)
                            return -1;
                        if (s < a)
                            return 1
                    }
                } catch (e) {
                }
                return -1
            }
            ,
            a[c(898)] = function (e) {
                var t = c
                    , i = "";
                return "string" == typeof jd_jr_td_risk_pin && 1 == e ? i = jd_jr_td_risk_pin : t(841) == typeof pin ? i = pin : t(496) == typeof pin && "string" == typeof jd_jr_td_risk_pin && (i = jd_jr_td_risk_pin),
                    i
            }
            ,
            a.sendRequest = function (e, t, i) {
                var n, r = c;
                try {
                    _globalState[r(370)][r(695)] = (new Date)[r(779)]();
                    try {
                        n = new window[r(614)]
                    } catch (e) {
                    }
                    if (!n)
                        try {
                            n = new window[r(769)](r(689))
                        } catch (e) {
                        }
                    if (!n)
                        try {
                            n = new window[r(769)](r(928))
                        } catch (e) {
                        }
                    if (!n)
                        try {
                            n = new window[r(769)](r(384))
                        } catch (e) {
                        }
                    n[r(603)]("POST", e, !0),
                        n[r(442)] = 15e3,
                        n[r(463)] = !0,
                        n[r(766)](r(656), r(387)),
                        n[r(635)] = function () {
                            var e = r;
                            _globalState[e(370)].status = n[e(856)],
                            4 === n.readyState && (_globalState[e(370)][e(438)] = (new Date).getTime(),
                                _globalState[e(370)][e(662)] = n.responseText,
                            200 === n[e(856)]) && i && i(n[e(630)])
                        }
                        ,
                        n[r(786)] = function () {
                            var e = r;
                            _globalState[e(370)][e(856)] = n.status,
                                _globalState.xhr[e(607)] = "networkError_" + n.statusText
                        }
                        ,
                        n[r(717)] = function () {
                            var e = r;
                            _globalState[e(370)][e(856)] = n[e(856)],
                                _globalState[e(370)][e(607)] = e(663) + n[e(607)]
                        }
                        ,
                        n[r(885)] = function () {
                            var e = r;
                            _globalState[e(370)][e(856)] = n[e(856)],
                                _globalState[e(370)][e(607)] = e(915) + n[e(607)]
                        }
                        ,
                        n[r(517)](t)
                } catch (e) {
                    _globalState[r(858)][r(567)]({
                        code: "sendRequest",
                        msg: e.message,
                        stack: e[r(644)]
                    }),
                    jdtRiskContext.d && console[r(728)](r(388), e)
                }
            }
            ,
            a[c(888)] = function () {
                var e = c
                    , t = jdtRiskCookieManager[e(602)](collectConfig.store[e(512)]);
                if (t && 1 == t)
                    return !0;
                if (t = jdtLocalStorageManager[e(395)](collectConfig[e(795)].ldeKey))
                    try {
                        var i = JSON.parse(t)[jdtRiskUtil[e(799)]()];
                        return !!i && i >= (new Date).getTime()
                    } catch (e) {
                    }
                return !1
            }
            ,
            a[c(681)] = function (e) {
                var t = c;
                return !!e && e[t(917)](t(390)) && e[t(592)](t(620))
            }
            ,
            a[c(446)] = function (e) {
                var t = c;
                return !!e && e[t(917)](t(654)) && e[t(592)]("X")
            }
            ,
            a[c(684)] = function (e, t) {
                var i = c;
                try {
                    if (e && t) {
                        var n, r = jdtLocalStorageManager[i(395)](collectConfig[i(795)][i(901)]), o = {},
                            a = (r && (o = JSON[i(535)](r)),
                                (new Date)[i(779)]());
                        for (n in o)
                            o[n] < a && delete o[n];
                        o[e] = a + 1e3 * t,
                            jdtLocalStorageManager[i(495)](collectConfig[i(795)][i(901)], JSON.stringify(o))
                    }
                } catch (e) {
                }
            }
            ,
            a[c(754)] = function (e) {
                var t = c
                    , i = "";
                try {
                    for (var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz", r = n[t(875)], o = 0; o < e; o++)
                        i += n[t(883)](Math[t(541)](Math.random() * r))
                } catch (e) {
                }
                return i
            }
            ,
            a
    }
)(jdtRiskUtil || {})
    , jdtRiskEncryptUtil = (e => {
        var u, p = _0x3f5411;

        function s(e, t, i, n, r, o) {
            return w((t = w(w(t, e), w(n, o))) << r | t >>> 32 - r, i)
        }

        function g(e, t, i, n, r, o, a) {
            return s(t & i | ~t & n, e, t, r, o, a)
        }

        function f(e, t, i, n, r, o, a) {
            return s(t & n | i & ~n, e, t, r, o, a)
        }

        function h(e, t, i, n, r, o, a) {
            return s(t ^ i ^ n, e, t, r, o, a)
        }

        function v(e, t, i, n, r, o, a) {
            return s(i ^ (t | ~n), e, t, r, o, a)
        }

        function w(e, t) {
            var i = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (i >> 16) << 16 | 65535 & i
        }

        function _(e, t) {
            e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
                t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
            var i = [0, 0, 0, 0];
            return i[3] += e[3] + t[3],
                i[2] += i[3] >>> 16,
                i[3] &= 65535,
                i[2] += e[2] + t[2],
                i[1] += i[2] >>> 16,
                i[2] &= 65535,
                i[1] += e[1] + t[1],
                i[0] += i[1] >>> 16,
                i[1] &= 65535,
                i[0] += e[0] + t[0],
                i[0] &= 65535,
                [i[0] << 16 | i[1], i[2] << 16 | i[3]]
        }

        function k(e, t) {
            e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
                t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
            var i = [0, 0, 0, 0];
            return i[3] += e[3] * t[3],
                i[2] += i[3] >>> 16,
                i[3] &= 65535,
                i[2] += e[2] * t[3],
                i[1] += i[2] >>> 16,
                i[2] &= 65535,
                i[2] += e[3] * t[2],
                i[1] += i[2] >>> 16,
                i[2] &= 65535,
                i[1] += e[1] * t[3],
                i[0] += i[1] >>> 16,
                i[1] &= 65535,
                i[1] += e[2] * t[2],
                i[0] += i[1] >>> 16,
                i[1] &= 65535,
                i[1] += e[3] * t[1],
                i[0] += i[1] >>> 16,
                i[1] &= 65535,
                i[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0],
                i[0] &= 65535,
                [i[0] << 16 | i[1], i[2] << 16 | i[3]]
        }

        function S(e, t) {
            return 32 == (t %= 64) ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : [e[1] << (t -= 32) | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t]
        }

        function R(e, t) {
            return 0 == (t %= 64) ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
        }

        function C(e, t) {
            return [e[0] ^ t[0], e[1] ^ t[1]]
        }

        function m(e) {
            return e = C(e, [0, e[0] >>> 1]),
                e = C(e = k(e, [4283543511, 3981806797]), [0, e[0] >>> 1]),
                C(e = k(e, [3301882366, 444984403]), [0, e[0] >>> 1])
        }

        return e[p(361)] = {
            hex_md5: function (e) {
                var t = p;
                if (null == e || "" == e)
                    return "";
                for (var i = ((e, t) => {
                        var i = _0x35fb;
                        e[t >> 5] |= 128 << t % 32,
                            e[14 + (64 + t >>> 9 << 4)] = t;
                        for (var n = 1732584193, r = -271733879, o = -1732584194, a = 271733878, s = 0; s < e[i(875)]; s += 16) {
                            var c = n
                                , l = r
                                , d = o
                                , u = a
                                , n = g(n, r, o, a, e[s + 0], 7, -680876936)
                                , a = g(a, n, r, o, e[s + 1], 12, -389564586)
                                , o = g(o, a, n, r, e[s + 2], 17, 606105819)
                                , r = g(r, o, a, n, e[s + 3], 22, -1044525330);
                            n = g(n, r, o, a, e[s + 4], 7, -176418897),
                                a = g(a, n, r, o, e[s + 5], 12, 1200080426),
                                o = g(o, a, n, r, e[s + 6], 17, -1473231341),
                                r = g(r, o, a, n, e[s + 7], 22, -45705983),
                                n = g(n, r, o, a, e[s + 8], 7, 1770035416),
                                a = g(a, n, r, o, e[s + 9], 12, -1958414417),
                                o = g(o, a, n, r, e[s + 10], 17, -42063),
                                r = g(r, o, a, n, e[s + 11], 22, -1990404162),
                                n = g(n, r, o, a, e[s + 12], 7, 1804603682),
                                a = g(a, n, r, o, e[s + 13], 12, -40341101),
                                o = g(o, a, n, r, e[s + 14], 17, -1502002290),
                                n = f(n, r = g(r, o, a, n, e[s + 15], 22, 1236535329), o, a, e[s + 1], 5, -165796510),
                                a = f(a, n, r, o, e[s + 6], 9, -1069501632),
                                o = f(o, a, n, r, e[s + 11], 14, 643717713),
                                r = f(r, o, a, n, e[s + 0], 20, -373897302),
                                n = f(n, r, o, a, e[s + 5], 5, -701558691),
                                a = f(a, n, r, o, e[s + 10], 9, 38016083),
                                o = f(o, a, n, r, e[s + 15], 14, -660478335),
                                r = f(r, o, a, n, e[s + 4], 20, -405537848),
                                n = f(n, r, o, a, e[s + 9], 5, 568446438),
                                a = f(a, n, r, o, e[s + 14], 9, -1019803690),
                                o = f(o, a, n, r, e[s + 3], 14, -187363961),
                                r = f(r, o, a, n, e[s + 8], 20, 1163531501),
                                n = f(n, r, o, a, e[s + 13], 5, -1444681467),
                                a = f(a, n, r, o, e[s + 2], 9, -51403784),
                                o = f(o, a, n, r, e[s + 7], 14, 1735328473),
                                n = h(n, r = f(r, o, a, n, e[s + 12], 20, -1926607734), o, a, e[s + 5], 4, -378558),
                                a = h(a, n, r, o, e[s + 8], 11, -2022574463),
                                o = h(o, a, n, r, e[s + 11], 16, 1839030562),
                                r = h(r, o, a, n, e[s + 14], 23, -35309556),
                                n = h(n, r, o, a, e[s + 1], 4, -1530992060),
                                a = h(a, n, r, o, e[s + 4], 11, 1272893353),
                                o = h(o, a, n, r, e[s + 7], 16, -155497632),
                                r = h(r, o, a, n, e[s + 10], 23, -1094730640),
                                n = h(n, r, o, a, e[s + 13], 4, 681279174),
                                a = h(a, n, r, o, e[s + 0], 11, -358537222),
                                o = h(o, a, n, r, e[s + 3], 16, -722521979),
                                r = h(r, o, a, n, e[s + 6], 23, 76029189),
                                n = h(n, r, o, a, e[s + 9], 4, -640364487),
                                a = h(a, n, r, o, e[s + 12], 11, -421815835),
                                o = h(o, a, n, r, e[s + 15], 16, 530742520),
                                n = v(n, r = h(r, o, a, n, e[s + 2], 23, -995338651), o, a, e[s + 0], 6, -198630844),
                                a = v(a, n, r, o, e[s + 7], 10, 1126891415),
                                o = v(o, a, n, r, e[s + 14], 15, -1416354905),
                                r = v(r, o, a, n, e[s + 5], 21, -57434055),
                                n = v(n, r, o, a, e[s + 12], 6, 1700485571),
                                a = v(a, n, r, o, e[s + 3], 10, -1894986606),
                                o = v(o, a, n, r, e[s + 10], 15, -1051523),
                                r = v(r, o, a, n, e[s + 1], 21, -2054922799),
                                n = v(n, r, o, a, e[s + 8], 6, 1873313359),
                                a = v(a, n, r, o, e[s + 15], 10, -30611744),
                                o = v(o, a, n, r, e[s + 6], 15, -1560198380),
                                r = v(r, o, a, n, e[s + 13], 21, 1309151649),
                                n = v(n, r, o, a, e[s + 4], 6, -145523070),
                                a = v(a, n, r, o, e[s + 11], 10, -1120210379),
                                o = v(o, a, n, r, e[s + 2], 15, 718787259),
                                r = v(r, o, a, n, e[s + 9], 21, -343485551),
                                n = w(n, c),
                                r = w(r, l),
                                o = w(o, d),
                                a = w(a, u)
                        }
                        return Array(n, r, o, a)
                    }
                )((e => {
                        var t = _0x35fb;
                        if (null == e || "" == e)
                            return "";
                        for (var i = Array(), n = 0; n < 8 * e[t(875)]; n += 8)
                            i[n >> 5] |= (255 & e[t(437)](n / 8)) << n % 32;
                        return i
                    }
                )(e), 8 * e[t(875)]), n = "0123456789abcdef", r = "", o = 0; o < 4 * i[t(875)]; o++)
                    r += n[t(883)](i[o >> 2] >> o % 4 * 8 + 4 & 15) + n[t(883)](i[o >> 2] >> o % 4 * 8 & 15);
                return r
            }
        },
            e[p(699)] = {
                hash128: function (e, t) {
                    for (var i = p, n = e, e = t, t = (n = n || "")[i(875)] % 16, r = n[i(875)] - t, o = [0, e = e || 0], a = [0, e], s = [0, 0], c = [0, 0], l = [2277735313, 289559509], d = [1291169091, 658871167], u = 0; u < r; u += 16)
                        s = [255 & n[i(437)](u + 4) | (255 & n.charCodeAt(u + 5)) << 8 | (255 & n[i(437)](u + 6)) << 16 | (255 & n[i(437)](u + 7)) << 24, 255 & n[i(437)](u) | (255 & n[i(437)](u + 1)) << 8 | (255 & n[i(437)](u + 2)) << 16 | (255 & n.charCodeAt(u + 3)) << 24],
                            c = [255 & n[i(437)](u + 12) | (255 & n[i(437)](u + 13)) << 8 | (255 & n[i(437)](u + 14)) << 16 | (255 & n[i(437)](u + 15)) << 24, 255 & n[i(437)](u + 8) | (255 & n.charCodeAt(u + 9)) << 8 | (255 & n[i(437)](u + 10)) << 16 | (255 & n[i(437)](u + 11)) << 24],
                            s = S(s = k(s, l), 31),
                            o = _(o = S(o = C(o, s = k(s, d)), 27), a),
                            o = _(k(o, [0, 5]), [0, 1390208809]),
                            c = S(c = k(c, d), 33),
                            a = _(a = S(a = C(a, c = k(c, l)), 31), o),
                            a = _(k(a, [0, 5]), [0, 944331445]);
                    switch (s = [0, 0],
                        c = [0, 0],
                        t) {
                        case 15:
                            c = C(c, R([0, n.charCodeAt(u + 14)], 48));
                        case 14:
                            c = C(c, R([0, n[i(437)](u + 13)], 40));
                        case 13:
                            c = C(c, R([0, n[i(437)](u + 12)], 32));
                        case 12:
                            c = C(c, R([0, n[i(437)](u + 11)], 24));
                        case 11:
                            c = C(c, R([0, n[i(437)](u + 10)], 16));
                        case 10:
                            c = C(c, R([0, n.charCodeAt(u + 9)], 8));
                        case 9:
                            c = k(c = C(c, [0, n[i(437)](u + 8)]), d),
                                a = C(a, c = k(c = S(c, 33), l));
                        case 8:
                            s = C(s, R([0, n[i(437)](u + 7)], 56));
                        case 7:
                            s = C(s, R([0, n[i(437)](u + 6)], 48));
                        case 6:
                            s = C(s, R([0, n.charCodeAt(u + 5)], 40));
                        case 5:
                            s = C(s, R([0, n[i(437)](u + 4)], 32));
                        case 4:
                            s = C(s, R([0, n[i(437)](u + 3)], 24));
                        case 3:
                            s = C(s, R([0, n[i(437)](u + 2)], 16));
                        case 2:
                            s = C(s, R([0, n[i(437)](u + 1)], 8));
                        case 1:
                            s = k(s = C(s, [0, n.charCodeAt(u)]), l),
                                o = C(o, s = k(s = S(s, 31), d))
                    }
                    return o = _(o = C(o, [0, n.length]), a = C(a, [0, n.length])),
                        a = _(a, o),
                        o = _(o = m(o), a = m(a)),
                        a = _(a, o),
                    ("00000000" + (o[0] >>> 0)[i(700)](16)).slice(-8) + (i(829) + (o[1] >>> 0).toString(16))[i(904)](-8) + (i(829) + (a[0] >>> 0)[i(700)](16)).slice(-8) + (i(829) + (a[1] >>> 0)[i(700)](16))[i(904)](-8)
                }
            },
            e[p(484)] = (u = p(790),
                    function (e) {
                        for (var t, i, n, r, o, a = p, s = JSON[a(381)](e), s = encodeURIComponent(s), c = "", l = "", d = 0; n = (t = s[a(437)](d++)) >> 2,
                            r = (3 & t) << 4 | (t = s[a(437)](d++)) >> 4,
                            o = (15 & t) << 2 | (i = s.charCodeAt(d++)) >> 6,
                            l = 63 & i,
                            isNaN(t) ? o = l = 64 : isNaN(i) && (l = 64),
                            c = c + u[a(883)](n) + u.charAt(r) + u[a(883)](o) + u[a(883)](l),
                            o = l = "",
                        d < s[a(875)];)
                            ;
                        return c + "/"
                    }
            ),
            e
    }
)(jdtRiskEncryptUtil || {})
    , JdtRiskFingerPrint = function (l) {
    var d, u = _0x3f5411, l = l || {}, p = "", g = ((d = {})[u(612)] = Array[u(892)][u(628)],
        d[u(429)] = Array[u(892)][u(590)],
        d[u(491)] = function (e, t, i) {
            var n = u;
            if (null !== e)
                if (d.nativeForEach && e[n(628)] === d[n(612)])
                    e.forEach(t, i);
                else if (e[n(875)] === +e[n(875)]) {
                    for (var r = 0, o = e[n(875)]; r < o; r++)
                        if (t[n(746)](i, e[r], r, e) === {})
                            return
                } else
                    for (var a in e)
                        if (e[n(824)](a) && t.call(i, e[a], a, e) === {})
                            return
        }
        ,
        d[u(590)] = function (e, r, o) {
            var a = u
                , s = [];
            if (null != e) {
                if (d[a(429)] && e[a(590)] === d[a(429)])
                    return e[a(590)](r, o);
                d[a(491)](e, function (e, t, i) {
                    var n = a;
                    s[s[n(875)]] = r[n(746)](o, e, t, i)
                })
            }
            return s
        }
        ,
        d[u(775)] = function (e) {
            var t, i, n = u;
            try {
                if (this[e])
                    return t = (new Date).getTime(),
                        i = this[e](),
                    jdtRiskContext.d && console[n(914)](n(830) + e + "] Cost time :", (new Date)[n(779)]() - t),
                        i
            } catch (e) {
                return jdtRiskContext.d && console[n(914)](n(601), e),
                    ""
            }
        }
        ,
        d[u(501)] = function () {
            return navigator[u(565)]
        }
        ,
        d.getUserAgent = function () {
            var e = u
                , t = navigator[e(679)].toLowerCase();
            return t[e(489)]("jdapp") ? t[e(587)](0, 90) : t
        }
        ,
        d[u(774)] = function () {
            var e = u
                , t = d.getUserAgent()
                , i = "NA"
                , n = "NA";
            try {
                -1 != t[e(489)](e(847)) && -1 != t.indexOf("95") && (i = e(415),
                    n = "95"),
                -1 != t.indexOf(e(847)) && -1 != t[e(489)]("98") && (i = "windows",
                    n = "98"),
                -1 != t.indexOf("win 9x") && -1 != t[e(489)](e(363)) && (i = e(415),
                    n = "me"),
                -1 != t.indexOf(e(847)) && -1 != t.indexOf(e(897)) && (i = e(415),
                    n = "2000"),
                -1 != t[e(489)](e(847)) && -1 != t.indexOf("nt") && (i = e(415),
                    n = "NT"),
                -1 != t[e(489)](e(847)) && -1 != t[e(489)](e(811)) && (i = e(415),
                    n = "xp"),
                -1 != t[e(489)](e(847)) && -1 != t.indexOf("32") && (i = "windows",
                    n = "32"),
                -1 != t[e(489)](e(847)) && -1 != t[e(489)](e(811)) && (i = e(415),
                    n = "7"),
                -1 != t[e(489)](e(847)) && -1 != t.indexOf(e(563)) && (i = e(415),
                    n = "8"),
                -1 == t[e(489)](e(847)) || -1 == t[e(489)](e(641)) && -1 == t[e(489)](e(761)) || (i = e(415),
                    n = "9"),
                -1 != t[e(489)](e(847)) && -1 != t.indexOf("nt 6.2") && (i = e(415),
                    n = "10"),
                -1 != t[e(489)](e(812)) && (i = e(812)),
                -1 != t[e(489)](e(503)) && (i = "unix"),
                -1 != t[e(489)](e(443)) && -1 != t[e(489)]("os") && (i = e(805)),
                -1 != t[e(489)](e(884)) && -1 != t[e(489)]("os") && (i = e(844)),
                -1 != t[e(489)](e(664)) && -1 != t[e(489)]("pc") && (i = e(664)),
                -1 != t[e(489)](e(899)) && (i = e(899)),
                -1 != t[e(489)](e(417)) && (i = e(376)),
                -1 != t[e(489)]("hpux") && (i = "hpux"),
                -1 != t[e(489)](e(633)) && (i = e(528)),
                -1 != t[e(489)](e(674)) && (i = "BSD"),
                -1 != t[e(489)](e(519)) && (i = e(606)),
                -1 != t[e(489)](e(807)) && (i = e(553),
                    n = ""),
                -1 != t[e(489)](e(403)) && (i = e(354)),
                -1 != t[e(489)]("symbianos") && (i = e(408),
                    n = t[e(587)](t[e(489)](e(486)) + 10, 3))
            } catch (e) {
            }
            return {
                os: i,
                osVersion: n
            }
        }
        ,
        d[u(659)] = function () {
            var e = u
                , t = d[e(560)]()
                , i = "NA"
                , n = "NA";
            try {
                -1 != t[e(489)](e(794)) && (i = "ie",
                    (n = t.substring(t[e(489)](e(651)) + 5))[e(489)](";")) && (n = n[e(587)](0, n.indexOf(";"))),
                -1 != t.indexOf(e(534)) && (i = "Firefox",
                    n = t[e(587)](t.indexOf("firefox/") + 8)),
                -1 != t.indexOf(e(806)) && (i = e(533),
                    n = t.substring(t.indexOf("opera/") + 6, 4)),
                -1 != t[e(489)](e(444)) && (i = e(444),
                    n = t[e(587)](t[e(489)](e(588)) + 7)),
                -1 != t[e(489)]("chrome") && (i = "chrome",
                    (n = t[e(587)](t[e(489)](e(926)) + 7))[e(489)](" ")) && (n = n[e(587)](0, n[e(489)](" "))),
                -1 != t[e(489)](e(500)) && (i = e(500),
                    n = t[e(587)](t.indexOf(e(537)) + 10)),
                -1 != t.indexOf("applewebkit") && (i = e(848),
                    (n = t[e(587)](t[e(489)](e(916)) + 12)).indexOf(" ")) && (n = n.substring(0, n[e(489)](" "))),
                -1 != t[e(489)](e(739)) && (i = e(823)),
                -1 == t[e(489)](e(383)) && -1 == t[e(489)]("ucweb") || (i = e(618)),
                -1 == t[e(489)]("qqbrowser") && -1 == t[e(489)](e(579)) || (i = e(597)),
                -1 != t[e(489)](e(923)) && (i = e(855)),
                -1 != t[e(489)]("360se") && (i = "360???"),
                -1 != t[e(489)](e(419)) && (i = e(823)),
                -1 != t[e(489)]("maxthon") && (i = e(855))
            } catch (e) {
            }
            return {
                browser: i,
                browserVersion: n
            }
        }
        ,
        d.getColorDepth = function () {
            return screen[u(757)]
        }
        ,
        d[u(862)] = function () {
            var e = u;
            return [screen[e(619)], screen[e(547)]][e(583)]("x")
        }
        ,
        d[u(498)] = function () {
            var e = u;
            return (new Date)[e(498)]()
        }
        ,
        d[u(787)] = function () {
            var e = u;
            try {
                return !!window[e(450)]
            } catch (e) {
                return !0
            }
        }
        ,
        d[u(461)] = function () {
            var e = u;
            try {
                return !!window[e(732)]
            } catch (e) {
                return !0
            }
        }
        ,
        d.getIndexedDBSupport = function () {
            return !!window[u(622)]
        }
        ,
        d.getAddBehaviorSupport = function () {
            var e = u;
            return document[e(355)] && !!document[e(355)][e(539)]
        }
        ,
        d.getOpenDatabaseSupport = function () {
            return !!window.openDatabase
        }
        ,
        d.getNavigatorCpuClass = function () {
            return navigator.cpuClass || "NA"
        }
        ,
        d[u(418)] = function () {
            return navigator[u(741)] || "NA"
        }
        ,
        d[u(412)] = function () {
            return navigator[u(506)] || "NA"
        }
        ,
        d.getDoNotTrack = function () {
            return navigator[u(703)] || "NA"
        }
        ,
        d[u(859)] = function () {
            var e = u;
            return window[e(769)] ? d.map([e(358), e(451), "AgControl.AgControl", e(893), e(777), e(570), "Msxml2.XMLHTTP", "PDF.PdfCtrl", e(903), e(624), "RealPlayer", e(448), e(747), e(873), e(445), "Shell.UIHelper", e(826), e(749), e(399), e(815), "rmocx.RealPlayer G2 Control", e(735)], function (e) {
                try {
                    return new ActiveXObject(e),
                        e
                } catch (e) {
                    return null
                }
            })[e(583)](";") : ""
        }
        ,
        d[u(919)] = function () {
            var n = u;
            return d[n(590)](navigator[n(661)], function (e) {
                var i = n
                    , t = d[i(590)](e, function (e) {
                    var t = i;
                    return [e.type, e[t(494)]].join("~")
                }).join(",");
                return [e.name, e.description, t][i(583)]("::")
            }, this)[n(583)](";")
        }
        ,
        d.getCanvasFp = function () {
            var e, t = u, i = navigator[t(679)][t(825)]();
            return (0 < i[t(489)](t(521)) || 0 <= i[t(489)](t(432))) && (0 < i[t(489)]("iphone") || 0 < i[t(489)](t(475))) ? null : ((e = (i = document[t(645)]("canvas")).getContext("2d"))[t(836)] = t(765),
                e[t(776)](30, 10, 200, 100),
                e[t(468)] = t(828),
                e.lineWidth = 6,
                e[t(696)] = t(639),
                e.arc(50, 50, 20, 0, Math.PI, !1),
                e[t(378)](),
                e[t(836)] = t(750),
                e[t(398)] = "15.4px 'Arial'",
                e.textBaseline = t(391),
                e[t(906)](t(402), 15, 60),
                e[t(523)] = 1,
                e.shadowOffsetY = 2,
                e[t(368)] = t(470),
                e[t(836)] = t(371),
                e[t(398)] = t(625),
                e[t(906)]("No骗", 40, 80),
                i.toDataURL())
        }
        ,
        d.getWebglFp = function () {
            var i, n = u;
            if ((0 < (t = (t = navigator[n(679)]).toLowerCase())[n(489)](n(521)) || 0 <= t[n(489)](n(432))) && (0 < t[n(489)](n(462)) || 0 < t[n(489)]("ipad")))
                return null;

            function e(e) {
                var t = n;
                return i[t(693)](0, 0, 0, 1),
                    i[t(542)](i[t(427)]),
                    i[t(540)](i[t(682)]),
                    i.clear(i[t(586)] | i.DEPTH_BUFFER_BIT),
                "[" + e[0] + ", " + e[1] + "]"
            }

            if (!(i = d[n(522)]()))
                return null;
            var t = []
                , r = i[n(738)]()
                , o = (i.bindBuffer(i.ARRAY_BUFFER, r),
                    new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]))
                , o = (i[n(833)](i[n(913)], o, i[n(596)]),
                    r[n(852)] = 3,
                    r.numItems = 3,
                    i[n(924)]())
                , a = i[n(552)](i.VERTEX_SHADER)
                ,
                s = (i[n(589)](a, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"),
                    i[n(520)](a),
                    i.createShader(i[n(369)]));
            i.shaderSource(s, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"),
                i[n(520)](s),
                i[n(393)](o, a),
                i[n(393)](o, s),
                i[n(647)](o),
                i[n(591)](o),
                o[n(359)] = i[n(455)](o, n(714)),
                o[n(666)] = i.getUniformLocation(o, n(649)),
                i[n(373)](o.vertexPosArray),
                i[n(763)](o[n(359)], r.itemSize, i[n(600)], !1, 0, 0),
                i[n(668)](o[n(666)], 1, 1),
                i[n(834)](i[n(514)], 0, r[n(808)]),
            null != i.canvas && t[n(567)](i.canvas[n(379)]()),
                t[n(567)]("extensions:" + i[n(410)]()[n(583)](";")),
                t.push(n(697) + i[n(410)]()[n(583)](";")),
                t[n(567)]("w1" + e(i[n(759)](i[n(922)]))),
                t[n(567)]("w2" + e(i[n(759)](i[n(642)]))),
                t[n(567)]("w3" + i.getParameter(i.ALPHA_BITS)),
                t[n(567)]("w4" + (i.getContextAttributes()[n(690)] ? n(436) : "no")),
                t[n(567)]("w5" + i[n(759)](i[n(499)])),
                t[n(567)]("w6" + i[n(759)](i.DEPTH_BITS)),
                t.push("w7" + i[n(759)](i.GREEN_BITS)),
                t[n(567)]("w8" + ((s = (a = i)[n(435)](n(740)) || a[n(435)](n(729)) || a[n(435)](n(422))) ? a = 0 === (a = a[n(759)](s[n(846)])) ? 2 : a : null)),
                t[n(567)]("w9" + i[n(759)](i[n(895)])),
                t[n(567)](n(866) + i[n(759)](i[n(453)])),
                t.push("w11" + i[n(759)](i[n(867)])),
                t.push("w12" + i[n(759)](i[n(868)])),
                t[n(567)](n(559) + i.getParameter(i[n(772)])),
                t[n(567)]("w14" + i[n(759)](i.MAX_TEXTURE_SIZE)),
                t.push(n(816) + i[n(759)](i[n(407)])),
                t[n(567)](n(701) + i[n(759)](i[n(604)])),
                t.push(n(648) + i[n(759)](i[n(708)])),
                t.push("w18" + i[n(759)](i[n(545)])),
                t[n(567)](n(366) + e(i[n(759)](i[n(745)]))),
                t.push("w20" + i.getParameter(i[n(465)])),
                t.push(n(608) + i[n(759)](i[n(594)])),
                t[n(567)]("w22" + i[n(759)](i.SHADING_LANGUAGE_VERSION)),
                t[n(567)]("w23" + i[n(759)](i.STENCIL_BITS)),
                t[n(567)](n(925) + i[n(759)](i[n(691)])),
                t[n(567)]("w25" + i[n(759)](i[n(730)]));
            try {
                var c = i.getExtension("WEBGL_debug_renderer_info");
                c && (t[n(567)](n(605) + i.getParameter(c[n(676)])),
                    t[n(567)](n(706) + i[n(759)](c[n(568)])))
            } catch (e) {
            }
            return t[n(583)]("�")
        }
        ,
        d.getWebglCanvas = function () {
            var e = u
                , t = document[e(645)](e(849))
                , i = null;
            try {
                var n = navigator.userAgent;
                (0 < (n = n[e(825)]()).indexOf("jdjr-app") || 0 <= n.indexOf(e(432))) && (0 < n[e(489)](e(462)) || 0 < n[e(489)](e(475))) || (i = t[e(721)]("webgl") || t.getContext(e(725)))
            } catch (e) {
            }
            return i || null
        }
        ,
        d);

    function f() {
        var e = u
            , t = document[e(645)](e(849));
        return t[e(721)] && t.getContext("2d")
    }

    return {
        getFp: function (e) {
            var t, i, n, r, o, a, s = u,
                c = (p = p || jdtRiskStorageManager[s(657)](collectConfig[s(795)][_riskFpMode][s(621)], !1),
                +jdtLocalStorageManager[s(395)](collectConfig[s(795)][_riskFpMode][s(801)]) || 0);
            p && 32 == p[s(875)] && c >= (new Date)[s(779)]() || (c = (c = l) || {},
                r = [],
                o = g[(t = u)(775)](t(659)),
                a = g[t(775)](t(774)),
            c[collectConfig.fp[t(679)]] || (i = g[t(775)]("getUserAgent"),
                n = +o[t(511)],
                "ie" == o.browser && 7 <= n ? r.push(i) : (0 <= (n = navigator[t(679)])[t(489)](t(432)) && (n = n[t(587)](0, 90)),
                    r[t(567)](n))),
            c[collectConfig.fp.language] || r[t(567)](g.execute(t(501))),
                r.push(o.browser),
                r[t(567)](o[t(511)]),
                r[t(567)](a.os),
                r[t(567)](a[t(886)]),
            c[collectConfig.fp.colorDepth] || r[t(567)](g[t(775)]("getColorDepth")),
            c[collectConfig.fp[t(838)]] || r.push(g.execute(t(862))),
            c[collectConfig.fp[t(502)]] || r[t(567)](g[t(775)](t(498))),
            c[collectConfig.fp[t(450)]] || g[t(775)]("getSessionStorageSupport") && r[t(567)](t(469)),
            c[collectConfig.fp[t(732)]] || g[t(775)](t(461)) && r[t(567)](t(835)),
            c[collectConfig.fp.indexedDb] || g.execute("getIndexedDBSupport") && r[t(567)](t(719)),
            c[collectConfig.fp[t(539)]] || g[t(775)](t(518)) && r[t(567)](t(804)),
            c[collectConfig.fp.openDatabase] || g[t(775)](t(562)) && r[t(567)](t(531)),
            c[collectConfig.fp[t(711)]] || r[t(567)](g[t(775)]("getNavigatorCpuClass")),
            c[collectConfig.fp[t(741)]] || r[t(567)](g[t(775)](t(418))),
            c[collectConfig.fp[t(506)]] || r[t(567)](g[t(775)]("getHardwareConcurrency")),
            c[collectConfig.fp[t(703)]] || r.push(g[t(775)](t(785))),
            c[collectConfig.fp[t(661)]] || (t(921) === navigator[t(670)] || "Netscape" === navigator[t(670)] && /Trident/[t(617)](navigator[t(679)]) ? r[t(567)](g.execute(t(859))) : r[t(567)](g[t(775)]("getRegularPluginsString"))),
            c[collectConfig.fp[t(849)]] || f() && (i = g[t(775)](t(505)),
                jdtRiskContext[t(457)] = jdtRiskEncryptUtil.MD5.hex_md5(i),
                jdtRiskStorageManager[t(795)](collectConfig[t(795)][t(797)], jdtRiskContext.canvas_fp_md5, !1),
                r[t(567)](i)),
            c[collectConfig.fp[t(743)]] || f() && (n = g.execute(t(364)),
                r.push(n)),
            jdtRiskContext.d && console[t(914)](t(580), r),
                p = jdtRiskEncryptUtil[t(699)][t(578)](r.join(t(577)), 31),
                jdtRiskStorageManager[s(795)](collectConfig.store[_riskFpMode].fpKey, p, !1),
                jdtLocalStorageManager[s(495)](collectConfig.store[_riskFpMode].fpTsKey, (new Date).getTime() + 6e5)),
                e(p)
        }
    }
}
    , jdtRiskCookieManager = {
    setCookie: function (e, t, i) {
        var n, r, o = _0x3f5411;
        try {
            t && (void 0 === i && (i = 31104e3),
                (n = new Date)[o(710)](n[o(779)]() + 1e3 * i),
                r = o(509) + n[o(715)](),
                document[o(536)] = e + "=" + t + "; " + r + "; path=/; domain=" + jdtRiskUtil[o(581)]())
        } catch (e) {
        }
    },
    getCookie: function (e) {
        var t = _0x3f5411;
        try {
            for (var i = e + "=", n = document[t(536)][t(831)](";"), r = 0; r < n[t(875)]; r++) {
                var o = n[r].trim();
                if (0 == o[t(489)](i))
                    return o.substring(i[t(875)], o[t(875)])
            }
        } catch (e) {
        }
        return ""
    }
}
    , jdtLocalStorageManager = {
    set: function (e, t) {
        var i = _0x3f5411;
        try {
            t && window.localStorage && window[i(732)].setItem(e, t)
        } catch (e) {
        }
    },
    get: function (e) {
        var t = _0x3f5411;
        try {
            if (window[t(732)])
                return window[t(732)][t(483)](e)
        } catch (e) {
        }
        return ""
    }
}
    , jdtRiskStorageManager = ((jdtRiskStorageManager || {}).db = void 0,
    {
        store: function (e, t, i, n) {
            var r = _0x3f5411;
            if (i = void 0 === i || i)
                try {
                    jdtRiskCookieManager.setCookie(e, t, n)
                } catch (e) {
                }
            try {
                jdtLocalStorageManager[r(495)](e, t)
            } catch (e) {
            }
            try {
                window[r(450)] && window.sessionStorage[r(548)](e, t)
            } catch (e) {
            }
            try {
                window[r(487)] && window.globalStorage[r(593)][r(548)](e, t)
            } catch (e) {
            }
        },
        load: function (e, t, i) {
            var n = _0x3f5411
                , r = (i = i || function (e) {
                return !!e
            }
                ,
                null);
            if (t = void 0 === t || t)
                try {
                    if (i(r = jdtRiskCookieManager.getCookie(e)))
                        return r
                } catch (e) {
                }
            try {
                if (i(r = jdtLocalStorageManager.get(e)))
                    return r
            } catch (e) {
            }
            try {
                if (window[n(450)] && i(r = window[n(450)][e]))
                    return r
            } catch (e) {
            }
            try {
                window.globalStorage && i(r = window[n(487)][n(593)][e])
            } catch (e) {
            }
            return r
        }
    })
    , TDEnvCollector = function (r) {
    var p = _0x3f5411;

    function g(e) {
        var t = _0x35fb
            , i = {};
        return i.name = e[t(887)],
        void 0 !== e[t(742)] && (i.version = e[t(742)]),
            i
    }

    r = r || {},
        (e = {
            execute: function (e) {
                var t, i, n = _0x35fb;
                try {
                    if (this[e])
                        return t = (new Date).getTime(),
                            i = this[e](),
                        jdtRiskContext.d && console.log("ENV Collector function : [" + e + n(550), (new Date).getTime() - t),
                            i
                } catch (e) {
                    return jdtRiskContext.d && console.log(n(538), e),
                        ""
                }
            },
            getColorRgb: function () {
                var e = _0x35fb
                    , t = {};
                try {
                    var i = document[e(645)](e(756))
                        , n = e(611).split(",");
                    if (window[e(466)])
                        for (var r = 0; r < n.length; r++)
                            document[e(355)].appendChild(i),
                                i[e(667)][e(386)] = n[r],
                                t[n[r]] = window[e(466)](i)[e(781)]("color"),
                                document.body[e(822)](i)
                } catch (e) {
                }
                return t
            }
        })[p(864)] = function () {
            var e = p
                , t = {}
                ,
                i = (t[e(905)] = jdtRiskContext[e(457)] || jdtRiskStorageManager[e(657)](collectConfig[e(795)][e(797)], !1),
                    !1);
            if (window[e(737)] && (!(0 < (c = (c = navigator[e(679)])[e(825)]()).indexOf(e(521)) || 0 <= c[e(489)](e(432))) || !(0 < c[e(489)](e(462)) || 0 < c.indexOf("ipad")))) {
                for (var n, r, o = e(556)[e(831)](","), a = [], s = 0; s < o[e(875)]; s++)
                    try {
                        (r = document[e(645)](e(849))[e(721)](o[s], {
                            stencil: !0
                        })) && (n = r,
                            a[e(567)](o[s]))
                    } catch (e) {
                    }
                a.length && (i = {
                    name: a,
                    gl: n
                })
            }
            if (i) {
                var c = i.gl;
                try {
                    t[e(434)] = i[e(887)][e(583)](),
                        t[e(780)] = String(c[e(759)](c[e(730)])),
                        t[e(478)] = String(c.getParameter(c[e(546)])),
                        t.vendor = String(c[e(759)](c.VENDOR));
                    var l = c[e(759)](c.RENDERER)
                        , d = (t.renderer = e(841) == typeof l ? l : JSON.stringify(l),
                        c[e(410)]());
                    t[e(890)] = d
                } catch (e) {
                }
                try {
                    var u = c[e(435)](e(357));
                    u && (t[e(665)] = c[e(759)](u[e(676)]),
                        t[e(365)] = c[e(759)](u.UNMASKED_RENDERER_WEBGL))
                } catch (e) {
                }
            }
            return t
        }
        ,
        e[p(423)] = function () {
            var e = p;
            return {
                documentMode: document[e(490)],
                compatMode: document[e(687)]
            }
        }
        ,
        e[p(599)] = function () {
            var o = p
                , e = []
                ,
                t = "Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin"[o(831)](";");

            function a(e) {
                var t = o
                    , i = {};
                return n.style[t(770)] = e,
                    document[t(355)][t(871)](n),
                    i[t(619)] = n[t(658)],
                    i[t(547)] = n[t(646)],
                    document[t(355)].removeChild(n),
                    i
            }

            var s = ["monospace", "sans-serif", o(441)]
                , c = []
                , n = document[o(645)](o(902));
            n[o(667)][o(459)] = o(671),
                n[o(667)][o(907)] = o(712),
                n[o(609)] = o(748);
            for (var i = 0; i < s[o(875)]; i++)
                c[i] = a(s[i]);
            for (i = 0; i < t[o(875)]; i++) {
                var r = t[i];
                (e => {
                        for (var t = o, i = 0; i < c[t(875)]; i++) {
                            var n = a(e + "," + s[i])
                                , r = c[i];
                            if (n[t(619)] !== r.height || n[t(547)] !== r[t(547)])
                                return 1
                        }
                    }
                )(r) && e.push(r)
            }
            return e
        }
        ,
        e[p(508)] = function () {
            var e, t = p, i = {}, n = [];
            for (e in navigator)
                "object" != typeof navigator[e] && (i[e] = navigator[e]),
                    n[t(567)](e);
            i.enumerationOrder = n,
                i[t(733)] = navigator[t(733)]();
            try {
                i[t(595)] = navigator[t(595)]()
            } catch (e) {
            }
            return i
        }
        ,
        e.getPlugins = function () {
            var e, t, i = p, n = [], r = i(675)[i(831)](";"), o = navigator[i(679)][i(825)]();
            if ((t = o.match(/rv:([\d.]+)\) like gecko/)) && (e = t[1]),
                e = (t = o.match(/msie ([\d.]+)/)) ? t[1] : e)
                for (var a = i(576).split(","), s = 0; s < a[i(875)]; s++) {
                    var c = a[s];
                    try {
                        var l = new ActiveXObject(c);
                        (d = {})[i(887)] = c;
                        try {
                            d[i(742)] = l.GetVariable("$version")
                        } catch (e) {
                        }
                        try {
                            d[i(742)] = l[i(882)]()
                        } catch (e) {
                        }
                        d[i(742)] && 0 < d[i(742)].length || (d[i(742)] = ""),
                            n[i(567)](d)
                    } catch (e) {
                    }
                }
            else {
                for (var a = navigator[i(661)], d = {}, s = 0; s < a.length; s++)
                    d[(c = a[s])[i(887)]] = 1,
                        n[i(567)](g(c));
                for (s = 0; s < r[i(875)]; s++) {
                    var u = r[s];
                    d[u] || (c = a[u]) && n[i(567)](g(c))
                }
            }
            return n
        }
        ,
        e[p(814)] = function () {
            for (var e = p, t = {}, i = e(778)[e(831)](","), n = 0; i[e(875)] > n; n++) {
                var r = i[n];
                void 0 !== screen[r] && (t[r] = screen[r])
            }
            return t
        }
        ,
        e[p(406)] = function () {
            for (var e = p, t = {}, i = e(480).split(","), n = 0; i[e(875)] > n; n++) {
                var r = i[n];
                void 0 !== window[r] && (t[r] = window[r])
            }
            return t
        }
        ,
        e[p(652)] = function () {
            var e = p
                , t = {};
            try {
                t.cookie = navigator[e(471)],
                    t[e(732)] = !!window[e(732)],
                    t.sessionStorage = !!window.sessionStorage,
                    t.globalStorage = !!window.globalStorage,
                    t.indexedDB = !!window[e(622)]
            } catch (e) {
            }
            return t
        }
    ;
    var e, o = e;
    return {
        getEncryptedCollectInfo: function () {
            var e = p
                , t = (e => {
                    var t = _0x35fb
                        , i = (e = r || {},
                        {})
                        , n = new Date;
                    i.ts = {},
                        i.ts[t(558)] = n[t(779)](),
                    e[collectConfig[t(362)][t(849)]] || (i.ca = o[t(775)](t(864)) || {}),
                    e[collectConfig.env[t(800)]] || (i.m = o.execute(t(423)) || {}),
                    e[collectConfig[t(362)][t(458)]] || (i.fo = o.execute("getSupportFonts") || []),
                    e[collectConfig[t(362)][t(634)]] || (i.n = o[t(775)](t(508)) || {}),
                    e[collectConfig[t(362)].plugins] || (i.p = o[t(775)](t(516)) || []),
                    e[collectConfig[t(362)][t(878)]] || (i.w = o[t(775)](t(406)) || {}),
                    e[collectConfig[t(362)][t(908)]] || (i.s = o[t(775)](t(814)) || {}),
                    e[collectConfig[t(362)][t(386)]] || (i.sc = o[t(775)](t(891)) || {}),
                    e[collectConfig[t(362)][t(872)]] || (i.ss = o[t(775)](t(652)) || {}),
                        i.tz = n[t(498)](),
                        i[t(672)] = "",
                        i.wil = "",
                        i.ts.deviceEndTime = (new Date)[t(779)]();
                    try {
                        i.wi = {},
                            i.wi.ow = window.outerWidth,
                            i.wi.oh = window.outerHeight,
                            i.wi.iw = window[t(720)],
                            i.wi.ih = window[t(392)],
                            i.wi[t(863)] = String(window[t(479)]),
                        (window._phantom || window[t(569)]) && (i.wi.ph = "1"),
                        (window[t(571)] || window[t(566)] || window[t(705)] || document[t(874)] || document[t(860)] || document[t(382)] || document.__fxdriver_evaluate || document[t(909)] || document[t(773)] || document[t(575)] || document[t(507)] || document[t(572)]) && (i.wi.se = "1")
                    } catch (e) {
                    }
                    return i
                }
            )();
            return jdtRiskContext.d && console[e(914)](e(716), t),
                jdtRiskEncryptUtil.TDEncrypt(t)
        }
    }
}
    , SdkCollector = function (e) {
    var t, i, n, a, s, c = _0x3f5411, l = e[c(573)] || c(760), d = e[c(709)] || 2, u = e[c(782)] || 50,
        p = e[c(460)] || "42";

    function g(e, o) {
        var a = c;
        window[a(900)] = function (t) {
            var i = a;
            jdtRiskContext.d && console[i(914)]("JD JS Bridge Result :", t);
            try {
                var e = i(496) == typeof t ? t : JSON.parse(t)
                    , n = e && "0" == e[i(856)]
                    , r = "";
                n && (r = (s ? JSON[i(535)](e[i(771)]) : e[i(771)]).token),
                    o(n, i(660), r)
            } catch (e) {
                jdtRiskContext.d && console[i(914)](i(629), e),
                    r = (e => {
                            try {
                                if (e) {
                                    var t = (e += "").match(/"token":"(.*?)\"/);
                                    if (t && 1 < t.length)
                                        return t[1]
                                }
                            } catch (e) {
                            }
                            return ""
                        }
                    )(t),
                    o(!!r, i(791), r)
            }
        }
        ;
        try {
            window.top == window[a(375)] || window[a(802)]._bioDeviceSdkTokenCb || (window[a(802)][a(900)] = window[a(900)])
        } catch (e) {
        }
        try {
            var t = e ? 5 : 1
                , i = {
                businessType: "bridgeBiologicalProbe",
                callBackName: "_bioDeviceSdkTokenCb",
                params: {
                    pin: "",
                    jsonData: {
                        type: p,
                        operation: t,
                        data: {
                            bizId: l,
                            duraTime: d,
                            interval: u
                        },
                        biometricData: {
                            bizId: l,
                            duraTime: d,
                            interval: u
                        }
                    }
                }
            }
                , n = JSON[a(381)](i);
            navigator[a(679)][a(543)](/supportJDSHWK/i) || 1 == window[a(424)] ? window[a(861)][a(817)][a(584)][a(686)]({
                method: "notifyMessageToNative",
                params: n
            }) : s ? window[a(768)] && window.XWebView.callNative(a(869), a(526), {
                requestData: {
                    operation: t,
                    biometricData: {
                        bizId: l
                    }
                }
            }, a(900), "1") : window[a(584)] && window[a(584)].notifyMessageToNative(n)
        } catch (e) {
            jdtRiskContext.d && console[a(914)]("JD SDK call ERROR", e),
                o(!1, a(582))
        }
    }

    function f(e, n) {
        var t, r = c;
        try {
            r(515) == typeof JrBridge || !JrBridge || !JrBridge[r(385)] || jdtRiskUtil[r(467)](JrBridge._version, r(413)) < 0 ? n(!1, r(734)) : (t = e ? 5 : 1,
                JrBridge[r(638)]({
                    type: p,
                    operation: t,
                    biometricData: {
                        bizId: l,
                        duraTime: d,
                        interval: u
                    }
                }, function (e) {
                    var t = r;
                    jdtRiskContext.d && console[t(914)](t(726), e);
                    try {
                        var i = (t(496) == typeof e ? e : JSON[t(535)](e))[t(626)];
                        n(!!i, t(660), i)
                    } catch (e) {
                        jdtRiskContext.d && console[t(914)]("JR JS SDK Callback ERROR", e),
                            n(!1, t(842))
                    }
                }))
        } catch (e) {
            jdtRiskContext.d && console[r(914)](r(827), e),
                n(!1, r(683))
        }
    }

    return t = !(i = (e = navigator[c(679)][c(825)]())[c(543)](/(iphone|ipad|ipod)/i)) && (-1 < e.indexOf("android") || -1 < e.indexOf("adr")),
        s = !i && !t && -1 < e[c(489)](c(360)),
        n = -1 < e[c(489)]("jdapp"),
        i = navigator.userAgent[c(543)](new RegExp(c(685))),
        a = -1 < e.indexOf(c(485)) && i && 1 < i[c(875)],
        jdtRiskContext.isSupportApp = n || a,
        {
            getSdkToken: function (r) {
                var o = c;
                if (!(e => {
                        var t = _0x35fb;
                        try {
                            var i = jdtRiskStorageManager[t(657)](collectConfig[t(795)][t(454)], !1);
                            if (i) {
                                var n = JSON[t(535)](i)
                                    , r = (new Date)[t(779)]();
                                if (n && n.tk && n.t) {
                                    if (jdtRiskContext[t(655)] = !0,
                                    r - n.t <= 12e5 && n.tk[t(917)]("jdd"))
                                        return e(!0, t(653), n.tk, !0),
                                            1;
                                    jdtRiskContext[t(727)][t(421)] = n.tk
                                }
                            }
                        } catch (e) {
                        }
                    }
                )(r))
                    return n ? (jdtRiskContext[o(727)].clientVersion = navigator[o(679)][o(831)](";")[2],
                        0 < jdtRiskUtil[o(467)](jdtRiskContext.deviceInfo[o(669)], o(477)) ? void g(!0, function (e, t, i) {
                            var n = o;
                            e && i && i[n(917)](n(845)) ? r(e, t, i) : g(!1, function (e, t, i) {
                                r(e, t, i)
                            })
                        }) : void r(!1, o(529))) : a ? (jdtRiskContext[o(727)][o(669)] = navigator[o(679)][o(543)](new RegExp(o(685)))[1],
                        0 < jdtRiskUtil[o(467)](jdtRiskContext[o(727)][o(669)], o(532)) ? void f(!0, function (e, t, i) {
                            e && i && i[o(917)]("jdd") ? r(e, t, i) : f(!1, function (e, t, i) {
                                r(e, t, i)
                            })
                        }) : void r(!1, "JR APP VERSION NOT SUPPORT")) : void (window[o(643)] ? window[o(643)].callAppBridge(navigator.userAgent, {
                        bizId: l
                    }, function (e, t, i) {
                        e ? r(!0, t, i[o(421)]) : r(!1, t)
                    }) : r(!1, o(627)))
            }
        }
};

function doCollectFp() {
    var t = _0x3f5411;

    function e(e, t) {
        var r = _0x35fb;
        jdtRiskContext[r(727)][r(421)] && (e[r(650)] = jdtRiskContext[r(727)][r(421)],
            jdtRiskContext[r(789)] = !0),
            e = "a=" + jdtRiskEncryptUtil[r(484)](e) + r(920) + t,
            t = jdtRiskUtil[r(405)]() + jdtRiskUtil[r(374)]() + r(870),
            jdtRiskUtil[r(409)](t, e, function (e) {
                var t = r;
                try {
                    var i, n = JSON.parse(e);
                    if (n && 0 == n[t(758)] && n.data) {
                        jdtRiskContext.deviceInfo[t(623)] = n[t(771)][t(626)],
                            jdtRiskStorageManager[t(795)](collectConfig[t(795)][_riskFpMode][t(492)], n[t(771)][t(626)]),
                            jdtRiskContext[t(727)][t(839)] = n[t(771)][t(839)],
                            jdtRiskStorageManager.store(collectConfig[t(795)][_riskFpMode][t(881)], n[t(771)][t(839)]);
                        try {
                            n[t(771)].gia_d && 1 == n[t(771)][t(585)] && (i = n[t(771)].ds || 600,
                                jdtRiskCookieManager.setCookie(collectConfig.store[t(512)], n[t(771)][t(585)], i)),
                            n.data[t(631)] && jdtRiskUtil.cleanAndPushDeS(jdtRiskUtil[t(799)](), n[t(771)][t(631)][jdtRiskUtil.getBizId()])
                        } catch (e) {
                        }
                    }
                    jdtRiskContext[t(482)] = !0
                } catch (e) {
                    _globalState[t(858)].push({
                        code: "parseRequest",
                        msg: e[t(598)],
                        stack: e[t(644)]
                    }),
                        console[t(728)](t(525), e)
                }
            })
    }

    try {
        jdtRiskContext.deviceInfo[t(623)] = jdtRiskStorageManager.load(collectConfig[t(795)][_riskFpMode][t(492)]),
            new JdtRiskFingerPrint(collectConfig[t(640)](_riskFpMode)).getFp(function (e) {
                e && (jdtRiskContext[t(727)].fp = e)
            });
        var i, n, r, o = new TDEnvCollector(collectConfig[t(688)](_riskFpMode))[t(880)](),
            a = t(841) == typeof orderId ? orderId : "",
            s = t(515) != typeof jdfp_pinenp_ext && jdfp_pinenp_ext ? 2 : 1, c = {
                pin: jdtRiskUtil[t(898)](s),
                oid: a,
                bizId: jdtRiskUtil.getBizId(),
                fc: jdtRiskStorageManager[t(657)](collectConfig[t(795)][_riskFpMode][t(881)]),
                mode: _riskFpMode,
                p: t(504) == document.location[t(762)] ? "s" : "h",
                fp: jdtRiskContext[t(727)].fp,
                ctype: s,
                v: jdtRiskContext[t(742)],
                pv: t(544),
                f: "3",
                s: jdtRiskEncryptUtil[t(361)].hex_md5(o + t(722)),
                o: jdtRiskUtil[t(821)](),
                qs: jdtRiskUtil.getUrlQueryStr(),
                jsTk: jdtRiskContext[t(727)][t(623)]
            };
        try {
            "undefined" != typeof gia_fp_qd_uuid && 0 <= gia_fp_qd_uuid.length ? c.qi = gia_fp_qd_uuid : (i = jdtRiskCookieManager[t(602)]("qd_uid"),
                c.qi = null == i ? "" : i)
        } catch (e) {
        }
        jdtRiskContext[t(655)] ? (((n = 0) < (r = navigator.userAgent.toLowerCase())[t(489)](t(462)) || 0 < r[t(489)](t(475))) && (n = 20),
            setTimeout(function () {
                e(c, o)
            }, n)) : e(c, o)
    } catch (e) {
        _globalState.errTrace[t(567)]({
            code: t(554),
            msg: e[t(598)],
            stack: e[t(644)]
        }),
            console.error("init func error :", e)
    }
}

function loadScript(e) {
    var t = _0x3f5411;
    try {
        var i = document[t(645)](t(397));
        i[t(460)] = t(510),
            i[t(809)] = e,
            i[t(813)] = !0,
            document[t(355)].appendChild(i)
    } catch (e) {
    }
}

function __getTkResult() {
    var e = _0x3f5411
        , t = {
        jsToken: jdtRiskContext.deviceInfo[e(623)],
        fp: jdtRiskContext[e(727)].fp,
        sdkToken: jdtRiskContext[e(727)][e(421)]
    };
    return t[e(623)] = t[e(623)] || jdtRiskStorageManager[e(657)](collectConfig.store[_riskFpMode][e(492)]) || "",
        t[e(421)] = t[e(421)] || jdtRiskStorageManager[e(657)](collectConfig[e(795)].sdkTokenKey, !1) || "",
        t.fp = t.fp || jdtRiskStorageManager[e(657)](collectConfig[e(795)][_riskFpMode][e(621)], !1) || jdtRiskUtil[e(754)](32),
    jdtRiskUtil[e(681)](t[e(421)]) && (jdtRiskContext.isSdkTokenFinished = !0),
    jdtRiskUtil[e(446)](t[e(623)]) && (jdtRiskContext[e(482)] = !0),
        t
}

function __callbackWrapper(e, t) {
    var i, n = _0x3f5411;
    _globalState[n(438)] = (new Date).getTime(),
    e && e(t),
    t.jsToken || t.eid || reportLog("JS_DEVICE_EMPTY");
    try {
        !jdtRiskContext.isRpTok && !jdtRiskUtil.isDegrade() && t.sdkToken && t.jsToken && (jdtRiskUtil[n(736)](),
            i = jdtRiskEncryptUtil[n(484)]({
                jsTk: t.jsToken,
                stk: t[n(421)],
                v: jdtRiskContext[n(742)]
            }),
            jdtRiskUtil[n(549)](jdtRiskUtil[n(405)]() + jdtRiskUtil.getFpServerDomain() + "/ek.html", "a=" + i),
            jdtRiskContext[n(789)] = !0)
    } catch (e) {
    }
}

function reportLog(e) {
    var t = _0x3f5411;
    try {
        0 == _globalState[t(488)] && (_globalState.uuid = jdtRiskUtil.randomStr(32)),
            _globalState[t(488)] += 1,
            ts = (new Date)[t(779)](),
        _globalState.reportTime && ts - _globalState[t(927)] < 1e3 || (_globalState[t(927)] = ts,
            logData = {
                eventId: e,
                appPackage: window.location.href,
                logId: jdtRiskUtil.getBizId(),
                buildVersion: 0,
                sdkVersion: jdtRiskContext[t(742)],
                appVersion: "2.0",
                deviceId: jdtRiskContext[t(727)].eid,
                deviceInfo: JSON[t(381)]({
                    fp: jdtRiskContext[t(727)].fp,
                    tdHash: jdtRiskContext[t(457)] || jdtRiskStorageManager.load(collectConfig[t(795)][t(797)], !1),
                    stk: jdtRiskContext[t(727)].sdkToken,
                    ua: navigator.userAgent
                }),
                kvs: JSON[t(381)](_globalState),
                time: ts,
                platform: t(524)
            },
            jdtRiskUtil.createWorker(),
            jdtRiskUtil[t(549)](t(464), JSON[t(381)](logData), !0, !0))
    } catch (e) {
        console[t(728)](t(394), e)
    }
}

function getJsToken(e, t) {
    var i = _0x3f5411;
    _globalState[i(851)] = i(401),
        _globalState[i(431)] = (new Date).getTime(),
        t = (_globalState[i(615)] = t) || 3e3;
    var n, r, o, a = __getTkResult();
    t <= 0 || t <= 50 || jdtRiskContext[i(857)]() ? __callbackWrapper(e, a) : (n = Math[i(414)](+t / 50),
        r = 1,
        o = setInterval(function () {
            r++,
            (jdtRiskContext[i(857)]() || n < r) && (a = __getTkResult(),
                clearInterval(o),
                __callbackWrapper(e, a))
        }, 50))
}

function getJdEid(t, e) {
    var i = _0x3f5411;
    _globalState[i(851)] = i(798),
        _globalState[i(431)] = (new Date)[i(779)](),
        e = (_globalState.bizTimeout = e) || 0;
    var n, r, o, a = __getTkResult();
    return e <= 0 || e <= 50 || jdtRiskContext[i(857)]() ? (a[i(623)] = "",
        a.eid = jdtRiskContext[i(727)][i(839)] || jdtRiskStorageManager[i(657)](collectConfig.store[_riskFpMode][i(881)]) || "",
        __callbackWrapper(t, a)) : (n = Math[i(414)](+e / 50),
        r = 1,
        o = setInterval(function () {
            var e = i;
            r++,
            (jdtRiskContext[e(857)]() || n < r) && ((a = __getTkResult()).jsToken = "",
                a.eid = jdtRiskContext[e(727)][e(839)] || jdtRiskStorageManager[e(657)](collectConfig[e(795)][_riskFpMode].eidKey) || "",
                clearInterval(o),
                __callbackWrapper(t, a))
        }, 50)),
        a
}

function _0x35fb(e, t) {
    var i = _0x1f7d();
    return (_0x35fb = function (e, t) {
            return i[e -= 352]
        }
    )(e, t)
}

(() => {
        var o = _0x3f5411;
        if (!window[o(819)]) {
            window[o(819)] = "1";
            try {
                new SdkCollector({
                    sdkBizId: jdtRiskUtil[o(799)]()
                })[o(380)](function (e, t, i, n) {
                    var r = o;
                    jdtRiskContext.d && console.log("sdk token result: ", e, t, i),
                    e && i && (t = {
                        tk: jdtRiskContext.deviceInfo[r(421)] = i,
                        t: (new Date)[r(779)]()
                    },
                    n || jdtRiskStorageManager[r(795)](collectConfig[r(795)].sdkTokenKey, JSON[r(381)](t), !1)),
                        jdtRiskContext[r(476)] = !0
                })
            } catch (e) {
            }
            if (window.bp_bot_detect_enable)
                try {
                    loadScript(o(911) + window[o(877)] + "&pageId=" + window.bp_pageid)
                } catch (e) {
                }
            try {
                if (jdtRiskUtil[o(888)]()) {
                    var e = jdtRiskStorageManager[o(657)](collectConfig[o(795)][_riskFpMode][o(492)])
                        , t = jdtRiskStorageManager.load(collectConfig[o(795)][_riskFpMode][o(621)], !1);
                    if (jdtRiskUtil[o(446)](e))
                        return jdtRiskContext[o(727)][o(623)] = e,
                            jdtRiskContext[o(727)].fp = t,
                            jdtRiskContext[o(482)] = !0
                }
            } catch (e) {
            }
            doCollectFp()
        }
    }
)();

