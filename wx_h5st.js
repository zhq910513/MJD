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
const MJDModule = require('./mjd_wx_modules_v5_20250131');
// console.log(MJDModule);

function generate_wx_h5st(input_str) {
    const encrypted_str = MJDModule.AES.encrypt(
        input_str,
        MJDModule.enc.Utf8.parse('wm0!@w_s#ll1flo('), // 密钥
        {
            iv: MJDModule.enc.Utf8.parse('0102030405060708'), // 初始化向量
            mode: MJDModule.mode.CBC, // 加密模式
            padding: MJDModule.pad.Pkcs7 // 填充方式
        }
    );

    // 将密文转换为Base64编码的字符串
    return encrypted_str.ciphertext.toString();
}

// // 示例调用
// const input_str = JSON.stringify({"sua": "Windows NT 10.0; Win64; x64", "pp": {"p1": "zhq91513"}, "fp": "5931396482503861"}, null, 2);
// const h5st = generate_wx_h5st(input_str);
// console.log(h5st);