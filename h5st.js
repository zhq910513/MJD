// 引入模型文件
const MJDModule = require('./mjd_modules_v5_20250131');
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
    return h5st_list.join(";")
}


// // 每次源码迭代需要打开测试是否缺参
// const _device_info = {
//     "fp": "cxrwspdpaaapd3a9",
//     "tk": "tk03w99101bcd18npK0aXAlMfO0e4UdVNktyDktaw507Jbd4f8PmCu-0n6D7j4Km__zCbEvwKbUiLS5XqNHbpAV6FTxM",
//     "rd": "VHDPvCbwZ1yv",
//     "ai": "8e94a",
//     "time_range": "60",
//     "canvas": "0fb7f119e21bb6b17b2b0d333a5617bf",
//     "webglFp": "9ef6901beacde53c5b05944cce35c114",
//     "ccn": 20,
//     "uuid": "1736842420917134647444",
//     "screen": "1920*1080"
// };
// const _api_query_time = 1737440700888;
// const _encrypt_time = 1738296938010;
// const _input_clt_str = '{\n  "sua": "Windows NT 10.0; Win64; x64",\n  "pp": {\n    "p1": "zhq91513"\n  },\n  "extend": {\n    "wd": 0,\n    "l": 0,\n    "ls": 5,\n    "wk": 0,\n    "bu1": "0.1.5",\n    "bu2": -2,\n    "bu3": 54,\n    "bu4": 0,\n    "bu5": 0,\n    "bu6": 4,\n    "bu7": 0,\n    "bu8": 0,\n    "bu10": 5\n  },\n  "pf": "Win32",\n  "random": "0uzSnHX_UVx",\n  "v": "h5_file_v5.0.4",\n  "canvas": "0fb7f119e21bb6b17b2b0d333a5617bf",\n  "webglFp": "9ef6901beacde53c5b05944cce35c114",\n  "ccn": 20,\n  "fp": "rp3rwp3xadcswp82"\n}';
// const _body_str = "fd44b1f2d13d1e2bc511dd7ab82c14ce22a7223bd908aaef8606f860c7895417";
// const _func_api = "getGPOrderDetail";
//
// const _clt = generate_clt(_input_clt_str);
// console.log("_clt: ", _clt);
// const _ms = generate_ms(_device_info, _encrypt_time);
// console.log("_ms: ", _ms);
// const _gs = generate_gs(_body_str, _func_api, _ms, _api_query_time);
// console.log("_gs: ", _gs);
// const _gsd = generate_gsd(_func_api, _ms);
// console.log("_gsd: ", _gsd);
//
// console.log(generate_h5st(_device_info, _func_api, _input_clt_str, _api_query_time, _body_str));
//
// const _wq_dy1_tk_algo = "eyJ0ayI6InRrMDN3OTI2MDFjODYxOG5WcEtWWlQxWkM2QXNROGxyR05aTWwxMVQxd0xsX2dxVnRKQkFIWXhQNGcyLWFVd24tbXJyNlZNVWZmTlNKT2tXVlBvakhwaWVyd2NyIiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSdjNmtwWlpGQ3VBMTEnO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uTUQ1KHN0cik7fSJ9";
// console.log(get_tk_rd(_wq_dy1_tk_algo));

