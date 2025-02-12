from curl_cffi import requests

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
    "ticket": "t03sNToyjpkpCAEpgxDbNpL1ZnI1QU6lWOkVHM1WoJIQCh1S6e-3Y0RLA_IZINdaLmCtHkddUk93pMy_xqjlgcCkRcKdnuhuwWzCDro6yS8jmpXwHvz5oE0sZgDJz1NITWxRNNMxQpx6zCaJjgVvuN7xxpKzyoAtdjUIUruh4ZLuvXY16iVc8ONJoMCisxsU2PgQvW0N1_kCYoSVxmjUqkF7i7UnrJBRy3TEXo3uKb6_OEmnR6qIX2YqnxWM7QggqRLTS7IL-q17ODzQNJhRNDqBA-GiGj7XLHo-Y7r7uinRDiZ6P8ZGGb69w**",
    "randstr": "@HQy",
    "prepayid": "wx12154243865021ba0ef0b8b6a242870000",
    "package": "3207963381"
}

response = requests.get(url,headers=headers)
print(response.text)