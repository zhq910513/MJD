import json

from curl_cffi import requests

def get_distance(x, y):
    return f"{x},{y}"


def get_cap_union_new_verify(sess, distace):
    headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://captcha.gtimg.com",
        "Pragma": "no-cache",
        "Referer": "https://captcha.gtimg.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }
    url = "https://t.captcha.qq.com/cap_union_new_verify"
    data = {
        "collect": "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",
        "tlg": "3212",
        "eks": "ERjp0RbWY2Vo5LSlFd1DiLpzyXNdjlRFNlnVPekgJ8rnoeFz88uoyT/ecmoUZhmlIM0HbCmJDpM5ZPaw5hLHqsK644IGFFrF/zVoG1ZfEH3HwPe/fsa0wSXG/V6eKi6WM2Z9jR0lXJSCRO58COgcwDkAEaKwpdJs+dsg4rC598JKbQ0JpWgVpfepvmt9yp+DEJ12yZ9MjoMZnrO6mkVzBN3Cu+g3kAAeCprZDMTYSVQ=",
        "sess": sess,
        "ans": json.dumps([{"elem_id":1,"type":"DynAnswerType_POS","data":distace}], separators=(',', ':')),
        "pow_answer": "99d1e633df7b905a#245224",
        "pow_calc_time": "2483"
    }
    resp = requests.post(url, headers=headers, data=data)
    resp_json = resp.json()

    if resp_json.get("ticket") and resp_json.get("errorCode") == "0":
        return resp_json["ticket"]


if __name__ == '__main__':
    _sess = ""
    _distace = 366





# 移动数据  t.prototype.verify = function(t, e)
# t = [
#     {
#         "elem_id": 1,
#         "type": "DynAnswerType_POS",
#         "data": "398,216"
#     }
# ]   # 位置: i = this.dataManager.getData();

# s = decodeURIComponent(o.getTdcData())

# ERjp0RbWY2Vo5LSlFd1DiLpzyXNdjlRFNlnVPekgJ8rnoeFz88uoyT/ecmoUZhmlIM0HbCmJDpM5ZPaw5hLHqsK644IGFFrF/zVoG1ZfEH3HwPe/fsa0wSXG/V6eKi6WM2Z9jR0lXJSCRO58COgcwDkAEaKwpdJs+dsg4rC598JKbQ0JpWgVpfepvmt9yp+DEJ12yZ9MjoMZnrO6mkVzBN3Cu+g3kAAeCprZDMTYSVQ=