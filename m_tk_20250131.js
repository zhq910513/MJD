// 给wx_modlues用的
function format_timestamp(api_query_time) {
    // 将时间戳转换为毫秒并创建 Date 对象
    const date = new Date(api_query_time); // 乘以 1000 转换为毫秒

    // 获取各个部分
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 获取时间戳的最后三位
    const milliseconds = String(api_query_time).slice(-3).padStart(3, '0'); // 确保是三位数

    // 返回格式化后的时间字符串
    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
}

var _0x3f5411 = _0x35fb;

function _0x35fb(e, t) {
    var i = _0x1f7d();
    return (_0x35fb = function (e, t) {
            return i[e -= 352]
        }
    )(e, t)
}

// 需要注意定住列表值，获取当前位置的列表
function _0x1f7d() {
    return [
        "3AB9D23F7A4B3CSS",
        "append",
        "FreeBSD",
        "body",
        "jsToIOS",
        "WEBGL_debug_renderer_info",
        "AcroPDF.PDF",
        "vertexPosAttrib",
        "harmony",
        "MD5",
        "env",
        "4.90",
        "getWebglFp",
        "wur",
        "w19",
        "TSA9D23F7A4B3CFF",
        "shadowColor",
        "FRAGMENT_SHADER",
        "xhr",
        "rgba(0, 0, 200, 0.5)",
        "parseUa",
        "enableVertexAttribArray",
        "getFpServerDomain",
        "self",
        "powerPC",
        "26112069mFthDf",
        "stroke",
        "toDataURL",
        "getSdkToken",
        "stringify",
        "__selenium_evaluate",
        "ucbrowser",
        "Msxml3.XMLHTTP",
        "_version",
        "color",
        "application/x-www-form-urlencoded;charset=UTF-8",
        "sendRequest error : ",
        "jdhapp",
        "jdd01",
        "alphabetic",
        "innerHeight",
        "attachShader",
        "report log error :",
        "get",
        "DeviceFingerprintBridge",
        "script",
        "font",
        "TDCCtl.TDCCtl",
        "freshApp",
        "getJsToken",
        "PR flacks quiz gym: TV DJ box when? ☠",
        "freebsd",
        "2712095FEPJlV",
        "getCurrentPageProtocol",
        "getPositionInfo",
        "MAX_VARYING_VECTORS",
        "SymbianOS",
        "sendRequest",
        "getSupportedExtensions",
        "href",
        "getHardwareConcurrency",
        "2.0.0",
        "ceil",
        "windows",
        "isIos",
        "powerpc",
        "getNavigatorPlatform",
        "the world",
        "FFA9D23F7A4B3CSS",
        "sdkToken",
        "MOZ_EXT_texture_filter_anisotropic",
        "getBrowserMode",
        "_is_jdsh_wkwebview",
        "yjcapp",
        "isIOS",
        "DEPTH_TEST",
        "jra.jd.com",
        "nativeMap",
        "JDDoctor App Bridge CALL ERROR",
        "callTime",
        "jdapp",
        "IvepNative",
        "contextName",
        "getExtension",
        "yes",
        "charCodeAt",
        "responseTime",
        "14vPZEal",
        "apply",
        "serif",
        "timeout",
        "sun",
        "safari",
        "SWCtl.SWCtl",
        "isValidJsToken",
        "_AppBridgeCallback",
        "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
        "yhdapp",
        "sessionStorage",
        "Adodb.Stream",
        "Worker",
        "MAX_CUBE_MAP_TEXTURE_SIZE",
        "sdkTokenKey",
        "getAttribLocation",
        "callBridge",
        "canvas_fp_md5",
        "fonts",
        "fontSize",
        "type",
        "getLocalStorageSupport",
        "iphone",
        "withCredentials",
        "https://mllog.jd.com/mlog/unite.do",
        "RED_BITS",
        "getComputedStyle",
        "compareVersion",
        "strokeStyle",
        "sessionStorageKey",
        "white",
        "cookieEnabled",
        "strict",
        "https://",
        "trim",
        "ipad",
        "isSdkTokenFinished",
        "7.0.2",
        "shadingLV",
        "external",
        "devicePixelRatio,screenTop,screenLeft",
        "DJ App Bridge CALL ERROR",
        "isJsTokenFinished",
        "getItem",
        "TDEncrypt",
        "jdjr",
        "SymbianOS/",
        "globalStorage",
        "reportCnt",
        "indexOf",
        "documentMode",
        "each",
        "jsTokenKey",
        "WebKitBlobBuilder",
        "suffixes",
        "set",
        "object",
        "YHD App Bridge CALL ERROR",
        "getTimezoneOffset",
        "BLUE_BITS",
        "navigator",
        "getLanguage",
        "timezoneOffset",
        "unix",
        "https:",
        "getCanvasFp",
        "hardwareConcurrency",
        "__fxdriver_unwrapped",
        "getFeature",
        "expires=",
        "text/javascript",
        "browserVersion",
        "giaDKey",
        "createObjectURL",
        "TRIANGLE_STRIP",
        "undefined",
        "getPlugins",
        "send",
        "getAddBehaviorSupport",
        "osf1",
        "compileShader",
        "jdjr-app",
        "getWebglCanvas",
        "shadowOffsetX",
        "JS-M",
        "resp parse error",
        "biometricForJS",
        "getCallbackName",
        "NetBSD",
        "JD APP VERSION NOT SUPPORT",
        "appBridgeMap",
        "openDatabase",
        "4.6.0",
        "Opera",
        "firefox",
        "parse",
        "cookie",
        "navigator/",
        "env collect error",
        "addBehavior",
        "depthFunc",
        "floor",
        "enable",
        "match",
        "02_mt_5LXK_60653970589",
        "MAX_VERTEX_UNIFORM_VECTORS",
        "SHADING_LANGUAGE_VERSION",
        "width",
        "setItem",
        "reportWorker",
        "] Cost time :",
        "iapDeviceCallback",
        "createShader",
        "IRIX",
        "initFunc",
        "TSA9D23F7A4B3CSS",
        "webgl,experimental-webgl,moz-webgl,webkit-3d",
        "yhd",
        "deviceTime",
        "w13",
        "getUserAgent",
        "appversion/",
        "getOpenDatabaseSupport",
        "6.0",
        "YJC App Bridge CALL ERROR",
        "language",
        "_selenium",
        "push",
        "UNMASKED_RENDERER_WEBGL",
        "callPhantom",
        "Msxml2.DOMDocument",
        "callSelenium",
        "__webdriver_script_func",
        "sdkBizId",
        "onBiometricFinish",
        "__selenium_unwrapped",
        "AcroPDF.PDF,Adodb.Stream,AgControl.AgControl,DevalVRXCtrl.DevalVRXCtrl.1,MacromediaFlashPaper.MacromediaFlashPaper,Msxml2.DOMDocument,Msxml2.XMLHTTP,PDF.PdfCtrl,QuickTime.QuickTime,QuickTimeCheckObject.QuickTimeCheck.1,RealPlayer,RealPlayer.RealPlayer(tm) ActiveX Control (32-bit),RealVideo.RealVideo(tm) ActiveX Control (32-bit),rmocx.RealPlayer G2 Control,Scripting.Dictionary,Shell.UIHelper,ShockwaveFlash.ShockwaveFlash,SWCtl.SWCtl,TDCCtl.TDCCtl,WMPlayer.OCX",
        "~~~",
        "hash128",
        "tencenttraveler",
        "fp keys:",
        "getCurrentRootDomain",
        "JS BRIDGE CALL ERROR",
        "join",
        "JDAppUnite",
        "gia_d",
        "COLOR_BUFFER_BIT",
        "substring",
        "safari/",
        "shaderSource",
        "map",
        "useProgram",
        "endsWith",
        ".localdomain",
        "RENDERER",
        "taintEnabled",
        "STATIC_DRAW",
        "QQ???",
        "message",
        "getSupportFonts",
        "FLOAT",
        "fp collect error",
        "getCookie",
        "open",
        "MAX_VERTEX_ATTRIBS",
        "wuv:",
        "OSF1",
        "statusText",
        "w21",
        "innerHTML",
        "djJava",
        "ActiveBorder,ActiveCaption,AppWorkspace,Background,ButtonFace,ButtonHighlight,ButtonShadow,ButtonText,CaptionText,GrayText,Highlight,HighlightText,InactiveBorder,InactiveCaption,InactiveCaptionText,InfoBackground,InfoText,Menu,MenuText,Scrollbar,ThreeDDarkShadow,ThreeDFace,ThreeDHighlight,ThreeDLightShadow,ThreeDShadow,Window,WindowFrame,WindowText",
        "nativeForEach",
        "924232QdonJN",
        "XMLHttpRequest",
        "bizTimeout",
        "indexedDb",
        "test",
        "UC???",
        "height",
        "01234567",
        "fpKey",
        "indexedDB",
        "jsToken",
        "QuickTimeCheckObject.QuickTimeCheck.1",
        "60px 'Not a real font'",
        "token",
        "UNSUPPORTED APP",
        "forEach",
        "JD JS SDK Callback ERROR",
        "responseText",
        "deMap",
        "notifyMessageToNative",
        "netbsd",
        "feature",
        "onreadystatechange",
        "BlobBuilder",
        "worker",
        "callNative",
        "round",
        "getFpExcludeOptions",
        "nt 6.0",
        "ALIASED_POINT_SIZE_RANGE",
        "JDTRiskBridgeUtil",
        "stack",
        "createElement",
        "offsetWidth",
        "linkProgram",
        "w17",
        "uniformOffset",
        "stk",
        "msie ",
        "getStoreCheck",
        "FROM LOCAL CACHE",
        "jdd03",
        "isSupportApp",
        "Content-Type",
        "load",
        "offsetHeight",
        "getBrowserInfo",
        "FINISHED",
        "plugins",
        "respText",
        "timeout_",
        "mac",
        "wuv",
        "offsetUniform",
        "style",
        "uniform2f",
        "clientVersion",
        "appName",
        "72px",
        "lil",
        "callAppBridge",
        "bsd",
        "4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako",
        "UNMASKED_VENDOR_WEBGL",
        "success",
        "3.1.2",
        "userAgent",
        "function",
        "isValidSdkToken",
        "LEQUAL",
        "JR BRIDGE CALL ERROR",
        "cleanAndPushDeS",
        "clientVersion=([^&]*)(&|$)",
        "postMessage",
        "compatMode",
        "getEnvExcludeOptions",
        "Microsoft.XMLHTTP",
        "antialias",
        "VENDOR",
        "7freshapp",
        "clearColor",
        "5.0.1",
        "startTime",
        "lineCap",
        "extensions:",
        "http://",
        "HASH",
        "toString",
        "w16",
        "MozBlobBuilder",
        "doNotTrack",
        "MobileNavi",
        "_Selenium_IDE_Recorder",
        "wur:",
        "10yRIYMu",
        "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
        "duraTime",
        "setTime",
        "cpuClass",
        "hidden",
        "JDH App Bridge CALL ERROR",
        "attrVertex",
        "toUTCString",
        "collect env data :",
        "ontimeout",
        "6.5.0",
        "indexedDbKey",
        "innerWidth",
        "getContext",
        "_*_UYBN6YGTNO6DHPVB",
        "app",
        "5FkNzFH",
        "experimental-webgl",
        "JR JS Bridge Result :",
        "deviceInfo",
        "error",
        "WEBKIT_EXT_texture_filter_anisotropic",
        "VERSION",
        "jdltapp",
        "localStorage",
        "javaEnabled",
        "JR BRIDGE NOT SUPPORT",
        "rmocx.RealPlayer G2 Control.1",
        "createWorker",
        "WebGLRenderingContext",
        "createBuffer",
        "sogoumobilebrowser",
        "EXT_texture_filter_anisotropic",
        "platform",
        "version",
        "webgl",
        "fast",
        "MAX_VIEWPORT_DIMS",
        "call",
        "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
        "mmmmmmmmmmlli",
        "Skype.Detection",
        "#42e1a2",
        "BATQW722QTLYVCRD",
        "9539760GLukeg",
        "__fp_domain",
        "randomStr",
        "JXTJ App Bridge CALL ERROR",
        "div",
        "colorDepth",
        "code",
        "getParameter",
        "jsDefault",
        "nt 6.1",
        "protocol",
        "vertexAttribPointer",
        "subVers",
        "red",
        "setRequestHeader",
        "location",
        "XWebView",
        "ActiveXObject",
        "fontFamily",
        "data",
        "MAX_TEXTURE_IMAGE_UNITS",
        "__webdriver_unwrapped",
        "getOsInfo",
        "execute",
        "fillRect",
        "MacromediaFlashPaper.MacromediaFlashPaper",
        "availHeight,availWidth,colorDepth,bufferDepth,deviceXDPI,deviceYDPI,height,width,logicalXDPI,logicalYDPI,pixelDepth,updateInterval",
        "getTime",
        "webglversion",
        "getPropertyValue",
        "interval",
        "getBlob",
        "GIA_LDE_MAP_KEY",
        "getDoNotTrack",
        "onerror",
        "getSessionStorageSupport",
        "getSupportApp",
        "isRpTok",
        "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-",
        "FROM REGX",
        "registerAppBridge",
        "6186664UtTfbI",
        "msie",
        "store",
        "CA1AN5BV0CA8DS2E3F",
        "canvasFpKey",
        "getJdEid",
        "getBizId",
        "browserMode",
        "fpTsKey",
        "top",
        "getUrlQueryStr",
        "addBehaviorKey",
        "sun os",
        "opera",
        "irix",
        "numItems",
        "src",
        "2165043hiuUKV",
        "nt 5.1",
        "linux",
        "async",
        "getScreenInfo",
        "WMPlayer.OCX",
        "w15",
        "messageHandlers",
        "jddoctor",
        "__global_jdt_risk_fp_exec",
        "global_",
        "getCurrentPageUrl",
        "removeChild",
        "???????",
        "hasOwnProperty",
        "toLowerCase",
        "ShockwaveFlash.ShockwaveFlash",
        "JR SDK call ERROR",
        "#1a3bc1",
        "00000000",
        "FP function : [",
        "split",
        "supportVersion",
        "bufferData",
        "drawArrays",
        "localStorageKey",
        "fillStyle",
        "SUCCESS",
        "screenResolution",
        "eid",
        "bizId",
        "string",
        "JR CALLBACK ERROR",
        "_gia_d",
        "ibm os/2",
        "jdd",
        "MAX_TEXTURE_MAX_ANISOTROPY_EXT",
        "win",
        "applewebkit_chrome",
        "canvas",
        "isSupportBioBridge",
        "callMethod",
        "itemSize",
        "onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, data.async);\n            httpRequest['withCredentials'] = true;\n            httpRequest['setRequestHeader']('Content-Type', data.isJson ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};",
        "jmapp",
        "?????",
        "status",
        "isReady",
        "errTrace",
        "getIEPluginsString",
        "__webdriver_evaluate",
        "webkit",
        "getScreenResolution",
        "etn",
        "getCanvasInfo",
        "UNSUPPORTED APP.",
        "w10",
        "MAX_FRAGMENT_UNIFORM_VECTORS",
        "MAX_RENDERBUFFER_SIZE",
        "BiometricApi",
        "/jsTk.do",
        "appendChild",
        "storeCheck",
        "Scripting.Dictionary",
        "__driver_evaluate",
        "length",
        "183422cJwBpE",
        "bp_bizid",
        "position",
        "callBiological",
        "getEncryptedCollectInfo",
        "eidKey",
        "GetVersions",
        "charAt",
        "ibm",
        "onabort",
        "osVersion",
        "name",
        "isDegrade",
        "doCallBridge",
        "extensions",
        "getColorRgb",
        "prototype",
        "DevalVRXCtrl.DevalVRXCtrl.1",
        " Bridge Method not implemented",
        "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
        "bridgeBiologicalProbe",
        "nt 5.0",
        "obtainPin",
        "aix",
        "_bioDeviceSdkTokenCb",
        "ldeKey",
        "span",
        "QuickTime.QuickTime",
        "slice",
        "tdHash",
        "fillText",
        "visibility",
        "screen",
        "__driver_unwrapped",
        "4.2.8.0",
        "//gias.jd.com/dy/js/mom.js?bizId=",
        "jdbmall",
        "ARRAY_BUFFER",
        "log",
        "abort_",
        "applewebkit/",
        "startsWith",
        "4.1.8",
        "getRegularPluginsString",
        "&d=",
        "Microsoft Internet Explorer",
        "ALIASED_LINE_WIDTH_RANGE",
        "metasr",
        "createProgram",
        "w24",
        "chrome/",
        "reportTime",
        "Msxml2.XMLHTTP"
    ];
}

var jdtRiskEncryptUtil = (e => {
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
})(jdtRiskEncryptUtil || {});


// 源码位置：p = jdtRiskEncryptUtil[t(699)][t(578)](r.join(t(577)), 31),
function generate_FFA9D23F7A4B3CSS(r) {
    return jdtRiskEncryptUtil['HASH']['hash128'](r.join('~~~'), 31);
}

// const rr = [
//                     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
//                     "zh-CN",
//                     "applewebkit_chrome",
//                     "537.36",
//                     "windows",
//                     "NT",
//                     24,
//                     "864x1536",
//                     -480,
//                     "sessionStorageKey",
//                     "localStorageKey",
//                     "indexedDbKey",
//                     "NA",
//                     "Win32",
//                     20,
//                     "NA",
//                     "PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf;Chrome PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf;Chromium PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf;Microsoft Edge PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf;WebKit built-in PDF::Portable Document Format::application/pdf~pdf,text/pdf~pdf",
//                     "data:image/png;base64,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",
//                     "data:image/png;base64,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�extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode�extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode�w1[1, 1]�w2[1, 1024]�w38�w4yes�w58�w624�w78�w816�w932�w1016384�w111024�w1216384�w1316�w1416384�w1530�w1616�w1716�w184096�w19[32767, 32767]�w208�w21WebKit WebGL�w22WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)�w230�w24WebKit�w25WebGL 1.0 (OpenGL ES 2.0 Chromium)�wuv:Google Inc. (Intel)�wur:ANGLE (Intel, Intel(R) UHD Graphics (0x00004626) Direct3D11 vs_5_0 ps_5_0, D3D11)"
//                 ];
// const FFA9D23F7A4B3CSS = generate_FFA9D23F7A4B3CSS(rr);
// console.log("FFA9D23F7A4B3CSS: ", FFA9D23F7A4B3CSS)