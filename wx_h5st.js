// const o = '{\n  "sua": "Windows NT 10.0; Win64; x64",\n  "pp": {\n    "p1": "zhq91513"\n  },\n  "fp": "5931396482503861"\n}';

// const i = Gh['AES']['encrypt'](
//         o,
//         Gh['enc']['Utf8']['parse']('wm0!@w_s#ll1flo('),
//         {
//             iv: Gh['enc']['Utf8']['parse']('0102030405060708'),
//             mode: Gh['mode'].CBC,
//             padding: Gh['pad']['Pkcs7']
//         }
//         );
// const t = i['ciphertext']['toString']();
// console.log(t);

// 引入模型文件
const MJDModule = require('./wx_modules_20250131');

// console.log(MJDModule);
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

function generate_wx_u1(u_1_str) {
    const u_1_words = MJDModule.SHA512(u_1_str);
    return u_1_words.toString();
}

function generate_wx_u2(body_str, u_1) {
    const u_2_str = `appid:mcashier&body:${body_str}&functionId:platPayChannel`;
    const u_2_words = MJDModule.HmacSHA256(u_2_str, u_1);
    return u_2_words.toString(MJDModule.enc.Hex);
}

function generate_wx_u(u_1_str, tk, body_str) {
    const u_1 = generate_wx_u1(u_1_str);

    const u_2_str = `appid:mcashier&body:${body_str}&functionId:platPayChannel`;
    const u_2_words = MJDModule.HmacSHA256(u_2_str, u_1);
    return u_2_words.toString(MJDModule.enc.Hex);
}

function generate_wx_o(o_str) {
    const encrypted_str = MJDModule.AES.encrypt(
        o_str,
        MJDModule.enc.Utf8.parse('wm0!@w_s#ll1flo('), // 密钥
        {
            iv: MJDModule.enc.Utf8.parse('0102030405060708'), // 初始化向量
            mode: MJDModule.mode.CBC, // 加密模式
            padding: MJDModule.pad.Pkcs7 // 填充方式
        }
    );
    return encrypted_str.ciphertext.toString();
}

function h5st(api_query_time) {
    const ts = format_timestamp(api_query_time);
    // "appid:mcashier&body:08ce40492d04da2ab9c8d90388216d9fe59fa5b27eb7f209eb4c63e102724d1f&functionId:platPayChannel"
    const body_str = "08ce40492d04da2ab9c8d90388216d9fe59fa5b27eb7f209eb4c63e102724d1f";
    const func_str = `appid:mcashier&body:${body_str}&functionId:platPayChannel`
    const u_2_words = MJDModule.HmacSHA256(func_str, u_1);
    const u = u_2_words.toString(MJDModule.enc.Hex);
    return [
        ts,
        "3606331785990409",
        "303a7",
        "tk03wc2e41cdf18n3Xw4nbiSLojdUyR8b6GBtsW42WjlibMGtDhoISkmjXE_uCzLNP0KY35xSlk7EreUvOlkPXjT4s1u",
        u,
        "3.1",
        api_query_time,
        "24c9ee85e67cf80746dd82817ecbeafc7a829b35c7f446a4c7d476cc9faa1d8834a93323ad7bce9bef1bba682b93d2e3fd2f0ccc417e4cc7c023fe82837aea5b156a49d62104be664a06bb4c6c4780df3d2a5f6549b4854bd6c1e8342fa8be7958aee95d9dbadef944c9a1ba6826c8b0"
    ].join(";")
}

// // 示例调用
// // 24c9ee85e67cf80746dd82817ecbeafc7a829b35c7f446a4c7d476cc9faa1d8834a93323ad7bce9bef1bba682b93d2e3fd2f0ccc417e4cc7c023fe82837aea5b156a49d62104be664a06bb4c6c4780df3d2a5f6549b4854bd6c1e8342fa8be7958aee95d9dbadef944c9a1ba6826c8b0
// const o_str = JSON.stringify({"sua": "Windows NT 10.0; Win64; x64", "pp": {"p1": "zhq91513"}, "fp": "3606331785990409"}, null, 2);
// const o = generate_wx_o(o_str);
// console.log("o: ", o);
//
// const api_query_time = 1739343914747;
// const tk = "tk03wc2e41cdf18n3Xw4nbiSLojdUyR8b6GBtsW42WjlibMGtDhoISkmjXE_uCzLNP0KY35xSlk7EreUvOlkPXjT4s1u";
// const fp = "3606331785990409";
// const ts = format_timestamp(api_query_time);
// const ai = "303a7";
// const rd = "01KedVEPCUiE";
// const u_1_str = "".concat(tk).concat(fp).concat(ts).concat(ai).concat(rd);
// const u_1 = generate_wx_u1(u_1_str);
// console.log("u_1: ", u_1);
//
// const body_str = "59aa0f087fd7a53ac105ec079e356e42975b99678cdbf0a9fb7deaa93254d7dc";
// const u_2_str = `appid:mcashier&body:${body_str}&functionId:platPayChannel`;
// const u_2 = generate_wx_u2(u_2_str, u_1)
// console.log("u_2: ", u_2);
//
// const _h5st = [
//         ts,
//         fp,
//         ai,
//         tk,
//         u_2,
//         "3.1",
//         api_query_time,
//         o
//     ].join(";")
// console.log("h5st: ", _h5st);

