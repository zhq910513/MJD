import json
import random

from curl_cffi import requests


def get_cap_union_new_verify(_prepayid, _package):
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
    collect = "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"
    eks = "PCtqmROzsHFvH/zU1Oo5nZectsgNBOOcvyZB+9dEj2uL9cyxMklv2Xq2A11QEzfIvT0EayAX0PDm+gF0g7gW3MN8KcoR+ggPw7NilCBJne6yARTlHviEJwcZ38tSWoUx4DMJi7riAnfDlHwovhktqNVWESYIyMSenDhkNxc3+qFq1WvfSNWiUGkmAbvL0TBYf0NEh9Dd0xkLc9oMsSNdD65GJPbGBzo6XdlNpElwQpg="
    data = {
        "collect": collect,
        "tlg": len(collect),
        "eks": eks,
        "sess": "s0pZg0tLhNBvEtrg-Q71h71W97SyNQhxJxGsl8g3d_uROGp23n-QilLQ72eKA47iwc0JhqtXjt5jSiQLJHqfd_7HmHMi5hltxlkD0y-ijPvSt0SStJuEPxGR-S1A4XcbC9WNJ4aFZSg1Oh9YCjaHsu2EOiHtmjg-L1ZRVulq3Fg8Qcycy65XdfL6xDWaLf83a4LbT9lavoTAjebNW5dzoHEq592dHbC5XL7W0VxHgFUpGkdyITAEHvlBlgYyoQ57Y_XxGbbMd_4XEw-OawHZS_zK72oRcHTazpU1cEFm9M1FFtPSKXQr2mLY3E1Vv0P3tWWXLM2N2Ci-zjOAe3Q1kG4IlSiS9YyDG-8-7Y3xSge3GfvdjxFJWV_5nF8P5thoM9K94UqNisq4_MWJm-NHpxYgasSkHRmYOf58c2FMVHUfcw-2aVDa_dF9NOZ2TavC45-gVyx2ghLqsnekPHOd_N3J5EoZ0j1J7wD0kJviIcm05mArWPPXFCS45ErLD_p3YaNQ0RYbq4E1GrU7fJIlEsKZxHxGSDjeOR9WY57n4tCyI*",
        "ans": "[{\"elem_id\":1,\"type\":\"DynAnswerType_POS\",\"data\":\"299,55\"}]",
        "pow_answer": "a022ca9517bb7f84#355680",
        "pow_calc_time": random.randint(500, 3000)
    }
    resp = requests.post(url, headers=headers, data=data)
    resp_json = resp.json()
    if resp_json.get("randstr") and resp_json.get("ticket") and resp_json.get("errorCode") == "0":
        checkcaptcha(_prepayid, _package, resp_json["randstr"], resp_json["ticket"])
    else:
        print(f"滑块验证失败, 错误码：{resp_json['errorCode']}")


def checkcaptcha(prepayid, package, randstr, ticket):
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Referer': 'https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx12151955947010f9b10b7503b254e50001&package=3362677959',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }

    url = "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkcaptcha"
    params = {
        "ticket": ticket,
        "randstr": randstr,
        "prepayid": prepayid,
        "package": package
    }

    response = requests.get(url, headers=headers, params=params)
    print(response.text)


if __name__ == '__main__':
    _prepayid = "wx28184146643824e809ecc8ee5f503d0001"
    _package = "3774060387"
    get_cap_union_new_verify(_prepayid, _package)

    # dy-ele.63dc61be.js
    # 移动数据  t.prototype.verify = function(t, e)

    # 断点一：
    # l = this.workLoadData
    # t = [{"elem_id":1,"type":"DynAnswerType_POS","data":"126,72"}]
    # s = decodeURIComponent(o.getTdcData())
    # c = o.getKeyInfo()
    # u = {
    #     collect: s,
    #     tlg: s.length,
    #     eks: c,
    #     sess: this.sess,
    #     ans: JSON.stringify(t)
    # }

    # 断点二：var v = window.TCaptchaApiDomain + "/cap_union_new_verify"

    uuu = {
        "collect": "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",
        "tlg": 2296,
        "eks": "u6kD8SaItdqM1n28Wv3340AlQ+IjdKkS2O69vRL3T7nHP2OiuMldABtW1z+rs4kFQxp96QcT3R/VTPg4gsfsGGiI3AA7Lul2EVsq3lHmMRWjIQ0k8OQvKRGFFaR6ADb7tEDYYIgImR7Q1n4YpwxC4b61pb+tX+VvQ/dlf4KQ7KURl6Q4jK5nKwEYazclnErl548m4qg4dUUtxCnH6zvzD6oF1F1MyAVhVEMwQNMnbDw=",
        "sess": "s0s0R_BdtPDNLKWCF1M7XE78JxNFSbBvW967Zr24kbiofVOgDgRw13XUQ4luE9Bq5_cksKfRF1bRindee1U4Sh997Epjkfax4aP05yDkkR1slzn7VxhW1yQt7wZrhfUu-cZXX4i1M-VgUIs6IHjn0d5K5tt_YD1tZYJCT7nZawzkT1H0MOu4mRtZy00OHdVzp5g2J3YfQbEfI21ySjpjDk2SrGz2tNwoVi7BbXXNAc7XJ2w78rCqr0EAGTgL5T1MgL1UTIgVq6EN7Ow0LPTZIgNen11VJ48xHcvF6D2STKxivQJ_CMkHkKTU-WhXKdjfbIG1kFT6ZKjnmbB4wBlTzMKi1lj6nWz9ZxeRDAV3dT7KpMRq_EMNPhEf42H_fEgd2_kOXyuxqVFd9BM_5P9tGMYzsppxbp2Yanay5MCDS80HSrYEv9ZCcF9hu7C2BWWzbFk8fp7L-kPvjGt_t8L8FVITMSwLdW6ByyeCgIh3GyQx5NhtYnvm_T2jIghhR-7Hx_PYCIj9yIvSmyTTgRfISiGxfWDLoarNlHdQa3RJ_N3oQI5Rb7W7lGDQ**",
        "ans": "[{\"elem_id\":1,\"type\":\"DynAnswerType_POS\",\"data\":\"246,250\"}]",
        "pow_answer": "f7b080c86aefa3a8#464879",
        "pow_calc_time": 1632
    }
