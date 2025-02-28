from curl_cffi import requests


def checkcaptcha(randstr, ticket):
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
        "prepayid": "wx12154243865021ba0ef0b8b6a242870000",
        "package": "3207963381"
    }

    response = requests.get(url, headers=headers, params=params)
    print(response.text)