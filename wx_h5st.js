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

function generate_wx_u1(u_1_str, tk) {
    const u_1_words = MJDModule.HmacSHA256(u_1_str, tk);
    return u_1_words.toString();
}

function generate_wx_u2(body_str, u_1) {
    const u_2_str = `appid:mcashier&body:${body_str}&functionId:platPayChannel`;
    const u_2_words = MJDModule.HmacSHA256(u_2_str, u_1);
    return u_2_words.toString(MJDModule.enc.Hex);
}

function generate_wx_u(u_1_str, tk, body_str) {
    const u_1 = generate_wx_u1(u_1_str, tk);
    const u_2_words = generate_wx_u2(body_str, u_1);
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

function h5st(api_query_time, u_1_str, tk, body_str, fp, ai, o) {
    const ts = format_timestamp(api_query_time);
    const u = generate_wx_u(u_1_str, tk, body_str);
    return [
        ts,
        fp,
        ai,
        tk,
        u,
        "3.1",
        api_query_time,
        o
    ].join(";")
}

// 示例调用
const api_query_time = 1739377900099;
const tk = "tk03wa66f1c0218nY5jEJUxn2QpKvcj_gTEjrad0h_9o5RT-K6SKU1NCSQf0gaEyUsl2pQUQlFWtdGUcbZOC0hD1Oejk";
const fp = "0109734912890628";
const ts = format_timestamp(api_query_time);
const ai = "303a7";
const rd = "0bHJG8t6dd6S";

const o_str = JSON.stringify({"sua": "Windows NT 10.0; Win64; x64", "pp": {"p1": "zhq91513"}, "fp": fp}, null, 2);
const o = generate_wx_o(o_str);
console.log("o: ", o);

const u_1_str = "".concat(tk).concat(fp).concat(ts).concat(ai).concat(rd);
const u_1 = generate_wx_u1(u_1_str, tk);
console.log("u_1: ", u_1);

const body_str = "51459acc2c12f75c0c43871cb06f4009f9e5e20aab68e9eb92e22fd3d04539dd";
const u_2 = generate_wx_u2(body_str, u_1)
console.log("u_2: ", u_2);

const u = generate_wx_u(u_1_str, tk, body_str);
console.log("u: ", u);

const _h5st = h5st(api_query_time, u_1_str, tk, body_str, fp, ai, o)
console.log("h5st: ", _h5st);

