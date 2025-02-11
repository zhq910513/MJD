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

function generate_wx_u(u_str, tk) {
    const u_words = MJDModule.HmacSHA512(u_str, tk);
    return u_words.toString();
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
// const u_str = "tk03web551db418nOSwvWbTgSyhY_fCJ-TUkzskQKtxe84sSsspgQPfLs47RjW0SKZlggkxq-D4t55bz9QhGrwggM_in593139648250386120250211231516891303a7JwOaxuWL5Y7g";
// const u_words = MJDModule.HmacSHA512(u_str, "tk03web551db418nOSwvWbTgSyhY_fCJ-TUkzskQKtxe84sSsspgQPfLs47RjW0SKZlggkxq-D4t55bz9QhGrwggM_in");
// const u = u_words.toString();
// console.log("u: ", u);