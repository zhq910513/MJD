from curl_cffi import requests

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx21170546993305dcf3c8bb8c05d0310001&package=1643033090",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkcaptcha"
params = {
    "ticket": "t03c7Qme_JQsnvr8ODjYCGvicHI0d71AKI79ff_K5p1Cq4ofVqWBJ9iWuqcGEJdpy9bMoOp2d2sNHd_fEaTstyX_7Vj8DO1_aGt6WeL3xIEOVPdt_i4TMNo4z3hOtZR7PXEj28C0HrIT0bftaqOteTXCYLfJG-WlBXEfw-Wddw-nVrCRttFdXx1dBSH3PEDzO0KrBavhOJGKdx5I9yt1AiU5zhBvBC5Qk-WLiM9v_blmkO9wLFVBv8-fi8XmZmO-2m-OooWzsXTECHcBWmKGWuPzldIPqEBmyVVgU6Av19p2BFdrUl36B4FsQ**",
    "randstr": "@x2f",
    "prepayid": "wx21170546993305dcf3c8bb8c05d0310001",
    "package": "1643033090"
}
response = requests.get(url, headers=headers, params=params)

print(response.json())
