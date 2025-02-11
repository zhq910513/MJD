// 引入模型文件
const MJDModule = require('./js_security_20250211');
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
    const seconds = String(date.getSeconds()).padStart(2, '0');

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
    const clt_words = MJDModule.enc.Utf8.parse(input_clt_str);
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
        "5.0",
        encrypt_time,
        clt,
        gsd
    ];
    return h5st_list.join(";");
}

function generate_extend_params(input_extend_str) {
    const extend_words = MJDModule.enc.Latin1.parse(input_extend_str);
    return MJDModule.enc.Base64.encode(extend_words);
}

function generate_webglFp(input_webglFp_str) {
    const webglFp_words = MJDModule.MD5(input_webglFp_str);
    return webglFp_words.toString();
}


// // // 每次源码迭代需要打开测试是否缺参
// const encrypt_time = 1739263353582;
// const fp = "r3dap9xcr33rrr86";
// const ai = "8e94a";
// const tk = "tk03wa0761c8318nLNy015znpr5ZKG8gcK4yCuGn3IcLxgt-chJ6E8qZnOdYVBZWju00g3Hbz3ghnsmYXmQHNo3mqrS_";
//
// const _input_clt_str = '{\n  "sua": "Windows NT 10.0; Win64; x64",\n  "pp": {\n    "p1": "zhq91513"\n  },\n  "extend": {\n    "wd": 0,\n    "l": 0,\n    "ls": 5,\n    "wk": 0,\n    "bu1": "0.1.5",\n    "bu2": 0,\n    "bu3": 54,\n    "bu4": 0,\n    "bu5": 0,\n    "bu6": 4,\n    "bu7": 0,\n    "bu8": 0,\n    "bu10": 5\n  },\n  "pf": "Win32",\n  "random": "PhCXN2SWpJmH",\n  "v": "h5_file_v5.0.6",\n  "canvas": "0fb7f119e21bb6b17b2b0d333a5617bf",\n  "webglFp": "9ef6901beacde53c5b05944cce35c114",\n  "ccn": 20,\n  "fp": "r3dap9xcr33rrr86"\n}';
// const clt = generate_clt(_input_clt_str);
// const _clt = "WNpZcw5Rj529nQiNmRiBh0W94IjNnQXRfRX9zQXR5xZOpRWRfR3_2MzR5Z3XtRXMoVmBkNGA2MTMl1GMpRDM2MGM0IjB4EzBoZGLjBDAgRXRfRX9TojA3Ej83ZXRPp3RzQjMoBGM4MmNmJTN3Q2BiV2BjRzBoRGAgVGNz82BzY2R5x2RmUz8rUjB3ZXRPp3RjhXNrF286ET_wAjCk5zR5x2RjQXR5xZO35F_PYiEGQ2GBMV-JQXRfRH_qIz_4QyR5Z3XtR3NmhD-CQXRfR3ApQXR5xZOcYXRPFWRfRXNoFyB3ZXR5Z3XtZWRfRXLkQzR5ZXR5xZOpZ3L39G83QXR5ZXRPpXM5x2RjFyB3ZXR5Z3XtZWRfRHMkQzR5ZXR5xZOpZ3L3JG83QXR5ZXRPpXMkZ3L3NG83QXR5ZXRPpXN5x2RnFyB3ZXR5Z3XtRHMrV2OpRXRfRHNkQzR5ZXR5xZOpZ3L3tj83ZXR5Z3XtFWRfRn9tQXR5ZXRPpXN5x2RtQXR5ZXRPpXN5x2R18yR5ZXR5xp75x2R1gDAl4CA3ZXRPpH65Z3X3NGNkVGLo4z73Z3L3VW93ZXR5Z3XeY3L3ZS93ZXRPp3RlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jE3Z3L3VD8mQXR5xp7";
// console.log("clt: ", clt===_clt);

// const ms_str = "tk03wa0761c8318nLNy015znpr5ZKG8gcK4yCuGn3IcLxgt-chJ6E8qZnOdYVBZWju00g3Hbz3ghnsmYXmQHNo3mqrS_r3dap9xcr33rrr8620250211164233582228e94aQKHBThU6nsqi";
// const ms_words = MJDModule.MD5(ms_str);
// const ms = ms_words.toString();
// console.log("ms: ", ms);
//
// const gs_str = ms + "appid:tsw-m&body:fd44b1f2d13d1e2bc511dd7ab82c14ce22a7223bd908aaef8606f860c7895417&functionId:getGPOrderDetail&t:1739263349885" + ms;
// // const gs_words = MJDModule.MD5(gs_str);
// const gs_words = MJDModule.SHA256(gs_str);
// const gs = gs_words.toString();
// console.log("gs: ", gs);
//
// const gsd_str = ms + "appid:tsw-m&functionId:getGPOrderDetail" + ms;
// const gsd_words = MJDModule.SHA256(gsd_str);
// const gsd = gsd_words.toString();
// console.log("gsd: ", gsd);
//
// const true_h5st = '20250211164233582;r3dap9xcr33rrr86;8e94a;tk03wa0761c8318nLNy015znpr5ZKG8gcK4yCuGn3IcLxgt-chJ6E8qZnOdYVBZWju00g3Hbz3ghnsmYXmQHNo3mqrS_;2eb39940ea1d21bce71cf7c4eb6ba1db864ded3902cee9b18d44a09b2804455c;5.0;1739263353582;WNpZcw5Rj529nQiNmRiBh0W94IjNnQXRfRX9zQXR5xZOpRWRfR3_2MzR5Z3XtRXMoVmBkNGA2MTMl1GMpRDM2MGM0IjB4EzBoZGLjBDAgRXRfRX9TojA3Ej83ZXRPp3RzQjMoBGM4MmNmJTN3Q2BiV2BjRzBoRGAgVGNz82BzY2R5x2RmUz8rUjB3ZXRPp3RjhXNrF286ET_wAjCk5zR5x2RjQXR5xZO3dDAuw1JDMkNTAV92QXRfRH_qIz_4QyR5Z3XtR3NmhD-CQXRfR3ApQXR5xZOcYXRPFWRfRXNoFyB3ZXR5Z3XtZWRfRXLkQzR5ZXR5xZOpZ3L39G83QXR5ZXRPpXM5x2RjFyB3ZXR5Z3XtZWRfRHMkQzR5ZXR5xZOpZ3L3JG83QXR5ZXRPpXMkZ3L3NG83QXR5ZXRPpXN5x2RnFyB3ZXR5Z3XtRHMrV2OpRXRfRHNkQzR5ZXR5xZOpZ3L3tj83ZXR5Z3XtFWRfRn9tQXR5ZXRPpXN5x2RtQXR5ZXRPpXN5x2R18yR5ZXR5xp75x2R1gDAl4CA3ZXRPpH65Z3X3NGNkVGLo4z73Z3L3VW93ZXR5Z3XeY3L3ZS93ZXRPp3RlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jE3Z3L3VD8mQXR5xp7;c4dc773d2a6b1f90a6d83f682a3985b99af2864879da95505d3ac3afc869e6a4';
// const h5st_list = [
//         format_timestamp(encrypt_time),
//         fp,
//         ai,
//         tk,
//         gs,
//         "5.0",
//         encrypt_time,
//         clt,
//         gsd
//     ];
// const h5st = h5st_list.join(";");
// console.log("h5st: ", h5st);
// console.log("h5st: ", true_h5st)
// console.log(h5st === true_h5st);

// const _wq_dy1_tk_algo = "eyJ0ayI6InRrMDN3OTI2MDFjODYxOG5WcEtWWlQxWkM2QXNROGxyR05aTWwxMVQxd0xsX2dxVnRKQkFIWXhQNGcyLWFVd24tbXJyNlZNVWZmTlNKT2tXVlBvakhwaWVyd2NyIiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSdjNmtwWlpGQ3VBMTEnO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uTUQ1KHN0cik7fSJ9";
// console.log(get_tk_rd(_wq_dy1_tk_algo));
