function LongNumToCode(long_num){
    var offsets = [0, 8, 16, 24];
    var codes = [];
    for(var a of offsets){
        codes.push(long_num >> a & 255);
    }
    return String.fromCharCode.apply(String, codes);
}

function StrToLongNum(str){
    var offsets = [0, 8, 16, 24];
    var long_num = 0;
    for (let i = 0; i < str.length; i++){
        long_num = long_num | (str.charCodeAt(i) << offsets[i]);
    }
    return long_num
}



function teaEncryptBlock(num_lis) {
    var num1 = num_lis[0];
    var num2 = num_lis[1];
    var sum = 0;
    key = [1466852942, 1768312662, 1715955288, 1498245202];
    var delta = 2654435769;
    for (var i = 0; i < 32; i++) {
        num1 += (((num2 << 4) ^ (num2 >>> 5)) + num2) ^ (sum + key[sum & 3]);
        sum += delta;
        num2 += (((num1 << 4) ^ (num1 >>> 5)) + num1) ^ (sum + key[(sum >>> 11) & 3]);
    }
    return [num1, num2];
}


function teaEncryptBlock(num_lis, key){
    var num1 = num_lis[0];
    var num2 = num_lis[1];
    var sum = 0;
    // 1194941531 '+' [592134] 'result is' 1195533665
    // 1214603871 '+' [394760] 'result is' 1214998631
    key = [1195533665, 1214998631, 1416189259, 1481725512];
    var delta = 2654435769;
    for (var i = 0; i < 32; i++) {
        num1 += (((num2 << 4) ^ (num2 >>> 5)) + num2) ^ (sum + key[sum & 3]);
        // console.log("num1", num1)
        sum += delta;
        // console.log("sum", sum)
        num2 += (((num1 << 4) ^ (num1 >>> 5)) + num1) ^ (sum + key[(sum >> 11) & 3]);
        // console.log("num2", num2)
    }
    return [num1, num2];
}

