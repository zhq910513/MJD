// 引入模型文件
const MJDModule = require('./js_security_v3015_20250307');
// console.log(MJDModule);

// 外部函数
function format_timestamp(api_query_time) {
    // 将时间戳转换为毫秒并创建 Date 对象
    const date = new Date(api_query_time); // 乘以 1000 转换为毫秒

    // 获取各个部分
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds() + 2).padStart(2, '0');   // 注意:比请求时间增加了2秒，可能跟随版本变化

    // 获取时间戳的最后三位
    const milliseconds = String(api_query_time).slice(-3).padStart(3, '0'); // 确保是三位数

    // 返回格式化后的时间字符串
    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
}

// 提取 tk/rd  由登陆界面cookie WQ_dy1_tk_algo解密返回
function get_tk_rd(wq_dy1_tk_algo) {
    const wq_dy1_tk_algo_words = MJDModule.enc.Base64.parse(wq_dy1_tk_algo);
    return MJDModule.enc.Utf8.stringify(wq_dy1_tk_algo_words);
}

// 加密函数
function generate_clt(input_clt_str) {
    const clt_words = MJDModule.enc.Latin1.parse(input_clt_str);
    return MJDModule.enc.Base64.encode(clt_words);
}

function generate_ms(device_info, encrypt_time) {
    const query_time_str = format_timestamp(encrypt_time);
    const _input_ms_str = `${device_info.tk}${device_info.fp}${query_time_str + device_info.time_range}${device_info.ai}${device_info.rd}`;
    const ms_words = MJDModule.MD5(_input_ms_str);
    return ms_words.toString();
}

function generate_gs(body_str, func_api, ms, api_query_time) {
    const input_gs_str = `${ms}appid:tsw-m&body:${body_str}&functionId:${func_api}&t:${api_query_time}${ms}`;
    // const gs_words = MJDModule.MD5(input_gs_str);
    const gs_words = MJDModule.SHA256(input_gs_str);
    return gs_words.toString();
}

function generate_gsd(func_api, ms) {
    const input_gsd_str = `${ms}appid:tsw-m&functionId:${func_api}${ms}`;
    // const gsd_words = MJDModule.MD5(input_gsd_str);
    const gsd_words = MJDModule.SHA256(input_gsd_str);
    return gsd_words.toString();
}

function generate_h5st(device_info, func_api, input_clt_str, api_query_time, body_str) {
    const encrypt_time = Date.now();

    const clt = generate_clt(input_clt_str);

    const ms = generate_ms(device_info, encrypt_time);

    const gs = generate_gs(body_str, func_api, ms, api_query_time);

    const gsd = generate_gsd(func_api, ms);

    const h5st_list = [
        format_timestamp(encrypt_time),
        device_info.fp,
        device_info.ai,
        device_info.tk,
        gs,
        device_info.h5_version.match(/v(\d+\.\d+)/)[1],
        encrypt_time,
        clt,
        gsd
    ];
    return h5st_list.join(";");
}

function generate_expand_params(input_expand_str) {
    const expand_words = MJDModule.enc.Utf8.parse(input_expand_str);
    return MJDModule.enc.Base64.encode(expand_words);
}

function generate_webglFp(input_webglFp_str) {
    const webglFp_words = MJDModule.MD5(input_webglFp_str);
    // return webglFp_words.toString();
    return MJDModule.enc.Hex.format(webglFp_words);
}

function generate_local_tk(input_local_tk_str) {
    const local_tk_words = MJDModule.enc.Utf8.parse(local_tk_str);
    return MJDModule.enc.Base64.stringify(local_tk_words);
}


// // // 每次源码迭代需要打开测试是否缺参
const encrypt_time = 1741337781675;
const fp = "gix9pd3wdqmqp306";
const ai = "8e94a";
const tk = "tk03wac5a1c1a18nWxE3lxj69nAWCiLx-3rhET2wW0KbxzkgeVV7dHrwTWsyCoKe84iA525_KLhL2bpfA6qVuBZ-rAke";
const rd = "rAB0pML41TB0";
const body_str = "fd44b1f2d13d1e2bc511dd7ab82c14ce22a7223bd908aaef8606f860c7895417";

const ts = format_timestamp(encrypt_time) + "03";
const true_ts = "2025030716401719803";
// console.log("ts: ", ts);
// console.log("ts: ", true_ts);
// console.log("ts: ", ts===true_ts);

const input_clt_json = {
    'sua': 'Windows NT 10.0; Win64; x64',
    'pp': {'p1': 'zhq91513'},
    'extend': {
        'wd': 0,
        'l': 0,
        'ls': 5,
        'wk': 0,
        'bu1': '0.1.5',
        'bu3': 54,
        'bu4': 0,
        'bu5': 0,
        'bu6': 4,
        'bu7': 0,
        'bu8': 0,
        'random': 'WwUuu1zbAd',
        'bu10': 7,
        'bu11': 1
    },
    'pf': 'Win32',
    'random': '0bA001xhR7t02',
    'v': 'h5_file_v5.1.0',
    'canvas': '0fb7f119e21bb6b17b2b0d333a5617bf',
    'webglFp': '3ce5cdea1b90f69e5b05944cce35c114',
    'ccn': 20,
    'fp': 'gix9pd3wdqmqp306'
};
const input_clt_str = JSON.stringify(input_clt_json, null, 2);
const true_input_clt_str = '{\n  "sua": "Windows NT 10.0; Win64; x64",\n  "pp": {\n    "p1": "zhq91513"\n  },\n  "extend": {\n    "wd": 0,\n    "l": 0,\n    "ls": 5,\n    "wk": 0,\n    "bu1": "0.1.5",\n    "bu3": 54,\n    "bu4": 0,\n    "bu5": 0,\n    "bu6": 4,\n    "bu7": 0,\n    "bu8": 0,\n    "random": "WwUuu1zbAd",\n    "bu10": 7,\n    "bu11": 1\n  },\n  "pf": "Win32",\n  "random": "0bA001xhR7t02",\n  "v": "h5_file_v5.1.0",\n  "canvas": "0fb7f119e21bb6b17b2b0d333a5617bf",\n  "webglFp": "9ef6901beacde53c5b05944cce35c114",\n  "ccn": 20,\n  "fp": "gix9pd3wdqmqp306"\n}';
// console.log(input_clt_str === true_input_clt_str);
// console.log(input_clt_str);
// console.log(true_input_clt_str);
const clt = generate_clt(true_input_clt_str);
const true_clt = "ri_uxFOm4u7i_pXT9d4R7eoS1OXUHlsm0msSIlsmOGuj_mrm0mMTLhImOuMsCmsh9q7W5ibVLhoh6Kbh_mYhLhbhJd4WNZIW9ubg4WYV1msm0msSo94VMZ4RMusmk_MmIl4h9WbhNh7i7eoiMlLW3qLW4mIW9mbV1qbiIRLWItLmOGLm7pIRAp4WMusmk_Mm_2ciAaLRPZoTFV4X5OImOGLm4lsmOGujMmri6RLaGNXi_ubeMtLmOGLmBxoVApISMusmk_Mm8iLTFRJmOGLmItHmOuMsC6nmOGeiOGLm9qbRMlsmOusmk_8hOGLm_qbRMlsmOusmk_MmKpKW0pbR5Z5RXlsm0mcT-dITNlHmOusmOGuj_uMgMObRMlsmOusmk_siOGLm3aHWMusmOuMsCerm0mMh5lImOusmOGuj_uMgMabRMlsmOusmk_siOGLm6aHWMusmOuMsCebhOGLm7aHWMusmOuMsCmchAqLj_msm0mci5lImOusmOGuj_uMgMC4RMusmOuMsCarm0m8SClsmOusmk_siOGLmClsmOusmk_siOGLmKRHmOusmOG_QOGLmK1YV6NXVMusmk_cPOuMsMibi5qbg9NIQMuMgMqrSMusmOuMsztMgMunSMusmk_Mm6WrQOCrh42YUXt8g_2si9usZgt8S3xoVAJ4ZMuMgMqYR7lsmOG_Q";
// console.log("clt: ", clt.length===true_clt.length);

const true_ms_str = "tk03w026a1e7918nkctGt3Cjqeavf3sAyysyF2Vnt_o2QgpYIrXKWaaxVP-xjUdRhfhO6DNMDzviTMtxDkhzypSagXl63a939wxz9hamwwa120250307165623675038e94a9rDCCm6tzlZv";
const ms_str = "".concat(tk).concat(fp).concat(ts).concat(ai).concat(rd);
const ms_words = MJDModule.MD5(true_ms_str);
const ms = ms_words.toString();
const true_ms = "512c832f9022255136c746a48538c385";
// console.log("ms: ", ms);
// console.log(ms === true_ms);

const gs_str = ms + `appid:tsw-m&body:${body_str}&functionId:getGPOrderDetail&t:1740994537017` + ms;
const true_gs_str = "512c832f9022255136c746a48538c385appid:tsw-m&body:fd44b1f2d13d1e2bc511dd7ab82c14ce22a7223bd908aaef8606f860c7895417&functionId:getGPOrderDetail&t:1741337777698512c832f9022255136c746a48538c385";
// const gs_words = MJDModule.MD5(gs_str);
const gs_words = MJDModule.SHA256(true_gs_str);
const gs = gs_words.toString();
const true_gs = "7c7aca641f47e931963ccd892a5d8e3b1be4807983721fe7117dc48ceeb01715";
// console.log("gs: ", gs);
// console.log(gs === true_gs);

const gsd_str = ms + "appid:tsw-m&functionId:getGPOrderDetail" + ms;
const true_gsd_str = "512c832f9022255136c746a48538c385appid:tsw-m&functionId:getGPOrderDetail512c832f9022255136c746a48538c385";
const gsd_words = MJDModule.SHA256(true_gsd_str);
const gsd = gsd_words.toString();
const true_gsd = "25ec241fe9a83f5d2a0a394cd5b385028bb180ddd482e7842474b8e005a95e62";
// console.log("gsd: ", gsd);
// console.log(gsd === true_gsd);

const true_h5st = '20250307165623675;3a939wxz9hamwwa1;8e94a;tk03w026a1e7918nkctGt3Cjqeavf3sAyysyF2Vnt_o2QgpYIrXKWaaxVP-xjUdRhfhO6DNMDzviTMtxDkhzypSagXl6;7c7aca641f47e931963ccd892a5d8e3b1be4807983721fe7117dc48ceeb01715;5.1;1741337781675;ri_uxFOm9q4R35YWGJLQ2RXg7KbW7msm0msSIlsmOGuj_mrm0mMTLhImOuMsCmsh9q7W5ibVLhoh6Kbh_mYhLhbhJd4WNZIW9ubg4WYV1msm0msSo94VMZ4RMusmk_MmIl4h9WbhNh7i7eoiMlLW3qLW4mIW9mbV1qbiIRLWItLmOGLm7pIRAp4WMusmk_Mm_2ciAaLRPZoTFV4X5OImOGLm4lsmOGujMKZSZpHS9abiYFJT5pHmOGLmBxoVApISMusmk_Mm8iLTFRJmOGLmItHmOuMsC6nmOGeiOGLm9qbRMlsmOusmk_8hOGLm_qbRMlsmOusmk_MmEhqi7p7T5JbQVlsm0mcT-dITNlHmOusmOGuj_uMgMObRMlsmOusmk_siOGLm3aHWMusmOuMsCerm0mMh5lImOusmOGuj_uMgMabRMlsmOusmk_siOGLm6aHWMusmOuMsCebhOGLm7aHWMusmOuMsCmchAqLj_msm0mci5lImOusmOGuj_uMgMC4RMusmOuMsCarm0m8SClsmOusmk_siOGLmClsmOusmk_siOGLmKRHmOusmOG_QOGLmK1YV6NXVMusmk_cPOuMsMibi5qbg9NIQMuMgMqrSMusmOuMsztMgMunSMusmk_Mm6WrQOCrh42YUXt8g_2si9usZgt8S3xoVAJ4ZMuMgMqYR7lsmOG_Q;25ec241fe9a83f5d2a0a394cd5b385028bb180ddd482e7842474b8e005a95e62';
const h5st_list = [
    format_timestamp(encrypt_time),
    fp,
    ai,
    tk,
    gs,
    "5.1",
    encrypt_time,
    clt,
    gsd
];
const h5st = h5st_list.join(";");
// console.log("h5st: ", h5st);
// console.log("h5st: ", true_h5st)
// console.log(h5st.length === true_h5st.length);

const _wq_dy1_tk_algo = "eyJ0ayI6InRrMDN3ODZmMzFhZGExOG5PY3BPSzF2RTZlRnhTRmg5WU9OSjhHbEI5bW91aTlFTXFGVjAyZEo1Rl94ZnFYVTNxU0k4ZG56dzZFR2c5RG1XOGFBbzM5cTE2RkYyIiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSc4bzNxVmlMVzJjSjEnO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uTUQ1KHN0cik7fSJ9";
// console.log(get_tk_rd(_wq_dy1_tk_algo));

const webglFp_str = "envCollectdata:image/png;base64,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§extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode§extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode§w1[1, 1]§w2[1, 1024]§w38§w4yes§w58§w624§w78§w816§w932§w1016384§w111024§w1216384§w1316§w1416384§w1530§w1616§w1716§w184096§w19[32767, 32767]§w208§w21WebKit WebGL§w22WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)§w230§w24WebKit§w25WebGL 1.0 (OpenGL ES 2.0 Chromium)§wuv:Google Inc. (Intel)§wur:ANGLE (Intel, Intel(R) UHD Graphics (0x00004626) Direct3D11 vs_5_0 ps_5_0, D3D11)";
const webglFp = generate_webglFp(webglFp_str);
const true_webglFp = "9ef6901beacde53c5b05944cce35c114";
// console.log("webglFp: ", webglFp === true_webglFp);

const local_tk_str = "1+2+2x27_";
const local_tk_words = MJDModule.enc.Utf8.parse(local_tk_str);
// console.log(MJDModule.enc.Base64.stringify(local_tk_words));

const input_expand_str = '{\n  "wc": 0,\n  "wd": 0,\n  "l": "zh-CN",\n  "ls": "zh-CN,zh,en,ko",\n  "ml": 2,\n  "pl": 5,\n  "av": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",\n  "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",\n  "sua": "Windows NT 10.0; Win64; x64",\n  "pp": {\n    "p1": "zhq91513"\n  },\n  "extend": {\n    "wd": 0,\n    "l": 0,\n    "ls": 5,\n    "wk": 0,\n    "bu1": "0.1.5",\n    "bu2": 0,\n    "bu3": 38,\n    "bu4": 0,\n    "bu5": 0,\n    "bu6": 4,\n    "bu7": 0,\n    "bu8": 0,\n    "bu10": 6\n  },\n  "pp1": "",\n  "bu1": "Error: test err\\n    at HTMLDocument._$Be [as querySelector] (https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.5.js:5:8455)\\n    at https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:12099:25\\n    at Array.map (<anonymous>)\\n    at preload (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:12084:27)\\n    at https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:12129:45\\n    at T$1 (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:239:10)\\n    at Vk (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:6943:14)\\n    at Uk (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:6599:12)\\n    at Tk (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:6592:5)\\n    at Ik (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:6575:7)",\n  "w": 1536,\n  "h": 864,\n  "ow": 1536,\n  "oh": 816,\n  "url": "https://recharge.m.jd.com/orderDetail?orderId=307843863375&serviceType=3&source=41",\n  "og": "https://recharge.m.jd.com",\n  "pf": "Win32",\n  "pr": 1.25,\n  "re": "",\n  "random": "iash4NOlGtq",\n  "referer": "",\n  "v": "h5_file_v5.0.8",\n  "bu2": "    at https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.5.js:5:77867",\n  "bu3": "function Window() { [native code] }$function toString() { [native code] }",\n  "canvas": "0fb7f119e21bb6b17b2b0d333a5617bf",\n  "canvas1": "0fb7f119e21bb6b17b2b0d333a5617bf",\n  "webglFp": "9ef6901beacde53c5b05944cce35c114",\n  "webglFp1": "9ef6901beacde53c5b05944cce35c114",\n  "ccn": 20,\n  "ai": "73806",\n  "fp": "pawcrd9pss9p9s28",\n  "wk": -1\n}';
const expand_words = MJDModule.enc.Utf8.parse(input_expand_str);
// console.log(MJDModule.enc.Base64.encode(expand_words));
