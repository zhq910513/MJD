// 定位点  'tk': _$gE(this._fingerprint)

// {
//     "magic": "tk",
//     "version": "04",
//     "platform": "w",
//     "expires": "41",
//     "producer": "l"
// }


// 头部
// tk04w41l

// 短
// generate_local_tk

// 长
function _$g8(_$Bk) {
    for (var _$BL = '', _$Bx = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-"; _$Bk--;)
        _$BL += _$Bx[64 * Math.random() | 0];
    return _$BL;
}
console.log(_$g8(32));