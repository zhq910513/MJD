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

function generate_wx_u(u_1_str, tk, body_str) {
    const u_1_words = MJDModule.HmacSHA512(u_1_str, tk);
    const u_1 = u_1_words.toString();

    const func_str = `appid:mcashier&body:${body_str}&functionId:platPayChannel`
    const u_2_words = MJDModule.HmacSHA256(func_str, u_1);
    return  u_2_words.toString(MJDModule.enc.Hex);
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

// // 示例调用
// const o_str = JSON.stringify({"sua": "Windows NT 10.0; Win64; x64", "pp": {"p1": "zhq91513"}, "fp": "5931396482503861"}, null, 2);
// const o = generate_wx_o(o_str);
// console.log("o: ", o);
//
const u_1_str = "b04b849964a7b8f9cf1b543597570aa489b04c84a46a8df3be820b8a0cbfea3154c7ff707a600b64ea89b4e034074b25862f48f6469b163531160f36ed647672";
const body_str = "ac27f5f110a85498b4ebe2dc03beeb29e4e6166046adee07f7f0f81d5c1b5582";
const func_str = `appid:mcashier&body:${body_str}&functionId:platPayChannel`
const u_2_words = MJDModule.HmacSHA256(func_str, u_1_str);
const u = u_2_words.toString(MJDModule.enc.Hex);
console.log("u: ", u);