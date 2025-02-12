# encoding: utf-8
"""
@author: The King
@project: MJD
@file: platWapWXPay.py
@time: 2025/2/12 23:00
"""


import requests

cookies = {
    'wxa_level': '1',
    'retina': '1',
    'cid': '9',
    'jxsid': '17393680422563350210',
    'appCode': 'ms0ca95114',
    'webp': '1',
    '__jdv': '122270672%7Cdirect%7C-%7Cnone%7C-%7C1739368042269',
    '__jdc': '122270672',
    'mba_muid': '17393680422681965042898',
    'visitkey': '7293984460220295873',
    '3AB9D23F7A4B3C9B': 'RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQ',
    'cd_eid': 'jdd03RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQAAAAMU7JVBB5AAAAAADTU6AI4KYC664MX',
    'shshshfpa': '43327346-7e41-4c04-bda9-4fde20f869be-1739368045',
    'shshshfpx': '43327346-7e41-4c04-bda9-4fde20f869be-1739368045',
    'shshshfpb': 'BApXSE4hi-fFAxN1WjAaisA9gJqmbPthkBnt3h2po9xJ1MtKdsYG2',
    'jcap_dvzw_fp': 'i_GmlavkkU04vfDKHPo63NSVRnejoU6GhX8Xi_onmdZIDBg-XgItSoldHDMwy1PSx70eNl1K92SKb3FN2iFLvw==',
    'TrackerID': 'hcwiZ2YqSqtaVEq-3Mp1mcBa5xvM04Ifp9G_MNZSIiuAeydSgqsBIwJxg2UYzTqn1ElrJINv2R9SV28Ij0yRgLIHz3YqzZAgkNSMxR2aA_c',
    'pt_key': 'AAJnrKaVADChKF-KgRvGcEk7VPe_YVZhcoNuzwgpeZfRLxz07Tg58KCpxB3WXCBz-T63lC4Oxqk',
    'pt_pin': 'zhq91513',
    'pt_token': 'kixazaqe',
    'pwdt_id': 'zhq91513',
    'sfstoken': 'tk01mc2ba1c77a8sM3gzKzErM3gxyHWrZJFIu/jnRZd/fM+S+bziSm8R9x9pIklKx70ApVMEWrfcRuGuS+Ep0p/w1wu6',
    'whwswswws': '',
    'autoOpenApp_downCloseDate_jd_homePage': '1739368086329_1',
    'PPRD_P': 'UUID.17393680422681965042898',
    'sc_width': '1440',
    'jxsid_s_u': 'https%3A//trade.m.jd.com/order/orderlist_jdm.shtml',
    'wqmnx1': 'MDEyNjM1MXQvZGptZWRzbW1lbHgxNjI1Jm9zNW9Ud2FhNTF1bWVKZG9yaTk5MDlNbDBuIDBXOylsSzMgTWllIG0yLmY1NjNZZGY0M1ZSREZIJlI%3D',
    '__jda': '122270672.17393680422681965042898.1739368042.1739368042.1739372503.2',
    '3AB9D23F7A4B3CSS': 'jdd03RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQAAAAMU7KXCFSIAAAAACE6WWC4IHWNFY4X',
    '_gia_d': '1',
    'jxsid_s_t': '1739372504117',
    '__jdb': '122270672.2.17393680422681965042898|2.1739372503',
    'mba_sid': '17393725031997546062357739667.3',
    'pt_st': '1_GSW-Mppm933hJqEMRp81hR0tPlMvtyB4epcqi_ROOwz4fN3lPi9-S4PDB41iL7FaYMY64nO6-zbOTKn-vDr9kCrgqEoD5sFyJAsGbHAsTuL3EpotHJXqjUSEwDjJy4tfV8xYQTecaJmPYwRKrO1NuY0c41r6IAZCPXQP7cG49B1wJ6ragw4b-4iqQvrVY6LHzVXKkrrct1fVtNSG38QaMTqWcCWmwV**',
    '__jd_ref_cls': 'MCashierNew_ConfirmPayment',
}

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded',
    # 'cookie': 'wxa_level=1; retina=1; cid=9; jxsid=17393680422563350210; appCode=ms0ca95114; webp=1; __jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1739368042269; __jdc=122270672; mba_muid=17393680422681965042898; visitkey=7293984460220295873; 3AB9D23F7A4B3C9B=RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQ; cd_eid=jdd03RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQAAAAMU7JVBB5AAAAAADTU6AI4KYC664MX; shshshfpa=43327346-7e41-4c04-bda9-4fde20f869be-1739368045; shshshfpx=43327346-7e41-4c04-bda9-4fde20f869be-1739368045; shshshfpb=BApXSE4hi-fFAxN1WjAaisA9gJqmbPthkBnt3h2po9xJ1MtKdsYG2; jcap_dvzw_fp=i_GmlavkkU04vfDKHPo63NSVRnejoU6GhX8Xi_onmdZIDBg-XgItSoldHDMwy1PSx70eNl1K92SKb3FN2iFLvw==; TrackerID=hcwiZ2YqSqtaVEq-3Mp1mcBa5xvM04Ifp9G_MNZSIiuAeydSgqsBIwJxg2UYzTqn1ElrJINv2R9SV28Ij0yRgLIHz3YqzZAgkNSMxR2aA_c; pt_key=AAJnrKaVADChKF-KgRvGcEk7VPe_YVZhcoNuzwgpeZfRLxz07Tg58KCpxB3WXCBz-T63lC4Oxqk; pt_pin=zhq91513; pt_token=kixazaqe; pwdt_id=zhq91513; sfstoken=tk01mc2ba1c77a8sM3gzKzErM3gxyHWrZJFIu/jnRZd/fM+S+bziSm8R9x9pIklKx70ApVMEWrfcRuGuS+Ep0p/w1wu6; whwswswws=; autoOpenApp_downCloseDate_jd_homePage=1739368086329_1; PPRD_P=UUID.17393680422681965042898; sc_width=1440; jxsid_s_u=https%3A//trade.m.jd.com/order/orderlist_jdm.shtml; wqmnx1=MDEyNjM1MXQvZGptZWRzbW1lbHgxNjI1Jm9zNW9Ud2FhNTF1bWVKZG9yaTk5MDlNbDBuIDBXOylsSzMgTWllIG0yLmY1NjNZZGY0M1ZSREZIJlI%3D; __jda=122270672.17393680422681965042898.1739368042.1739368042.1739372503.2; 3AB9D23F7A4B3CSS=jdd03RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQAAAAMU7KXCFSIAAAAACE6WWC4IHWNFY4X; _gia_d=1; jxsid_s_t=1739372504117; __jdb=122270672.2.17393680422681965042898|2.1739372503; mba_sid=17393725031997546062357739667.3; pt_st=1_GSW-Mppm933hJqEMRp81hR0tPlMvtyB4epcqi_ROOwz4fN3lPi9-S4PDB41iL7FaYMY64nO6-zbOTKn-vDr9kCrgqEoD5sFyJAsGbHAsTuL3EpotHJXqjUSEwDjJy4tfV8xYQTecaJmPYwRKrO1NuY0c41r6IAZCPXQP7cG49B1wJ6ragw4b-4iqQvrVY6LHzVXKkrrct1fVtNSG38QaMTqWcCWmwV**; __jd_ref_cls=MCashierNew_ConfirmPayment',
    'origin': 'https://mpay.m.jd.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://mpay.m.jd.com/',
    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    'x-referer-page': 'https://mpay.m.jd.com/mpay.dcf1ecf4a58ae843d3e0.html',
    'x-rp-client': 'h5_1.0.0',
}

params = {
    'functionId': 'platWapWXPay',
    'appid': 'mcashier',
    'scval': 'mpay',
}

data = {
    'body': '{"appId":"m_D1vmUq63","payId":"ce7748a70e60404fab97aefcab2de8b1","eid":"RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQ","source":"mcashier","origin":"h5","mcashierTraceId":1739372511721}',
    'x-api-eid-token': 'jdd03RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQAAAAMU7M3PQIIAAAAADRW3LPSZKOPWZEX',
    'h5st': '20250213013248240;0109734912890628;303a7;tk03wa66f1c0218nY5jEJUxn2QpKvcj_gTEjrad0h_9o5RT-K6SKU1NCSQf0gaEyUsl2pQUQlFWtdGUcbZOC0hD1Oejk;cfa74fff2b66c2e252b4ada436639785835982381dda4dd6ab07f6a2ebdf3084;3.1;1739381568240;24c9ee85e67cf80746dd82817ecbeafc7a829b35c7f446a4c7d476cc9faa1d8834a93323ad7bce9bef1bba682b93d2e3fd2f0ccc417e4cc7c023fe82837aea5b156a49d62104be664a06bb4c6c4780df57c64fea10acb2546c2f2e1fa8497c6602d7b4dcc47737d6375a298525e58620',
}

response = requests.post('https://api.m.jd.com/client.action', params=params, cookies=cookies, headers=headers, data=data)
print(response.json())
