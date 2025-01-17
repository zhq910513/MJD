def checkmweb():
    url = "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb"

    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Referer': 'https://mpay.m.jd.com/',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }

    params = {
        'prepay_id': 'wx151416437472840359b28d0c17c8510000',
        'package': '2562411049',
    }

    ## response
    # /TCaptcha.js

def cap_union_prehandle():
    url = "https://t.captcha.qq.com/cap_union_prehandle"
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Referer': 'https://wx.tenpay.com/',
        'Sec-Fetch-Dest': 'script',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }

    params = {
        'aid': '2093769752',
        'protocol': 'https',
        'accver': '1',
        'showtype': 'embed',
        'ua': 'TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzMS4wLjAuMCBTYWZhcmkvNTM3LjM2',
        'noheader': '1',
        'fb': '0',
        'aged': '0',
        'enableAged': '0',
        'enableDarkMode': 'force',
        'grayscale': '1',
        'dyeid': '0',
        'clientype': '2',
        'cap_cd': '',
        'uid': '',
        'lang': 'zh-cn',
        'entry_url': 'https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb',
        'elder_captcha': '0',
        'js': '/tcaptcha-frame.70f42bb2.js',
        'login_appid': '',
        'wb': '1',
        'version': '1.1.0',
        'subsid': '1',
        'callback': '_aq_332710',
        'sess': '',
    }

    ## response
    # sess
    # prefix

def cap_union_new_verify(sess, prefix):
    url = "https://t.captcha.qq.com/cap_union_new_verify"
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://captcha.gtimg.com',
        'Pragma': 'no-cache',
        'Referer': 'https://captcha.gtimg.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }

    data = {
        "collect": "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",
        "tlg": 2476,
        "eks": "AlcdAHDYnjickO26dR2fMri8c7XxoVW/dD+HoAWj+LxagS8cifXLDmw9+XAv7AVxy9sGNBm0vvvb0bnK+78Ai+FYk3U5yH5s6QCtdd9t0MavSKU4p91PIG5tWcpMyYrMvyA0YbZGZuDt/TopEvz3Tol1xNwXjwCffD060nPK7BpZrWnIz2eQDdtwbpOIzXLDOWXvA8l4vZCzGUqXBqNAe/zzxEsl1pMDgQUoxuZ3xQY=",
        "sess": sess,
        "ans": [
            {
                "elem_id":1,
                "type":"DynAnswerType_POS",
                "data":"410,258"
            }
        ],
        "pow_answer": f"{prefix}267649",   # #号前部分已知
        "pow_calc_time": 3345
    }

    ## response
    # ticket

def checkcaptcha(ticket, prepayid):
    url = "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkcaptcha"
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        # 'Referer': 'https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx151416437472840359b28d0c17c8510000&package=2562411049',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }

    params = {
        'ticket': ticket,
        'randstr': '@fCE',
        'prepayid': prepayid,
        'package': '2562411049',
    }

    ## response
    # deeplink
