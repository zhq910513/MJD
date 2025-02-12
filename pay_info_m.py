# encoding: utf-8
"""
@author: The King
@project: MJD
@file: pay_info_m.py
@time: 2025/2/12 2:13
"""
import re
import json
from curl_cffi import requests


headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json;charset=UTF-8",
    "origin": "https://trade.m.jd.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://trade.m.jd.com/",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    "x-referer-page": "https://trade.m.jd.com/order/orderlist_jdm.shtml",
    "x-rp-client": "h5_1.0.0"
}
cookies = {
    "wxa_level": "1",
    "retina": "1",
    "cid": "9",
    "jxsid": "17393680422563350210",
    "appCode": "ms0ca95114",
    "webp": "1",
    "__jda": "122270672.17393680422681965042898.1739368042.1739368042.1739368042.1",
    "__jdv": "122270672%7Cdirect%7C-%7Cnone%7C-%7C1739368042269",
    "__jdc": "122270672",
    "mba_muid": "17393680422681965042898",
    "visitkey": "7293984460220295873",
    "3AB9D23F7A4B3C9B": "RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQ",
    "cd_eid": "jdd03RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQAAAAMU7JVBB5AAAAAADTU6AI4KYC664MX",
    "shshshfpa": "43327346-7e41-4c04-bda9-4fde20f869be-1739368045",
    "shshshfpx": "43327346-7e41-4c04-bda9-4fde20f869be-1739368045",
    "shshshfpb": "BApXSE4hi-fFAxN1WjAaisA9gJqmbPthkBnt3h2po9xJ1MtKdsYG2",
    "jcap_dvzw_fp": "i_GmlavkkU04vfDKHPo63NSVRnejoU6GhX8Xi_onmdZIDBg-XgItSoldHDMwy1PSx70eNl1K92SKb3FN2iFLvw==",
    "TrackerID": "hcwiZ2YqSqtaVEq-3Mp1mcBa5xvM04Ifp9G_MNZSIiuAeydSgqsBIwJxg2UYzTqn1ElrJINv2R9SV28Ij0yRgLIHz3YqzZAgkNSMxR2aA_c",
    "pt_key": "AAJnrKaVADChKF-KgRvGcEk7VPe_YVZhcoNuzwgpeZfRLxz07Tg58KCpxB3WXCBz-T63lC4Oxqk",
    "pt_pin": "zhq91513",
    "pt_token": "kixazaqe",
    "pwdt_id": "zhq91513",
    "sfstoken": "tk01mc2ba1c77a8sM3gzKzErM3gxyHWrZJFIu/jnRZd/fM+S+bziSm8R9x9pIklKx70ApVMEWrfcRuGuS+Ep0p/w1wu6",
    "whwswswws": "",
    "autoOpenApp_downCloseDate_jd_homePage": "1739368086329_1",
    "PPRD_P": "UUID.17393680422681965042898",
    "sc_width": "1440",
    "jxsid_s_u": "https%3A//trade.m.jd.com/order/orderlist_jdm.shtml",
    "pt_st": "1_QToEh_7SiJ-Z8BzXruMjtSbsQxWj4_OEkLNoUhQYuyGRoYHjCAw4F0gu-Q7tf-mh24Vf1vbXPGLI6H1Fz9zK2H-frDG3gnTwIG63uAggOL185_LDdFhbdzAycBro9rwGqnr_nNvnrCZwzGbStPvrZ_Uww_xtmwTYsvODZlcedfLqfXOVZAgSi1DRMaT6-Zn_EpRhhcln4pxGzYXJSheMaIfJiIoqzk**",
    "wqmnx1": "MDEyNjM1MnQvZWQvcmV0LmxuPXM3ODUwYWQwMXJ5YXlnNTJyX3JkZW9kczc4MjVvYSBkTi5pICBlaTcoTGtjQ2UuMGEzMUZmYWFCNFFFUylGKUg%3D",
    "__jdb": "122270672.22.17393680422681965042898|1.1739368042",
    "mba_sid": "17393680422699412713600817968.32",
    "jxsid_s_t": "1739369617983",
    "3AB9D23F7A4B3CSS": "jdd03RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQAAAAMU7KBB7QYAAAAAC5IEWPHR2D5RPEX",
    "_gia_d": "1",
    "__jd_ref_cls": "MOdCenter_OrderList_GoToPay"
}
url = "https://api.m.jd.com/client.action"
systemBaseInfo = {
    "pixelRatio": 1.5,
    "screenWidth": 1440,
    "screenHeight": 960,
    "windowWidth": 1440,
    "windowHeight": 791,
    "statusBarHeight": None,
    "safeArea": {
        "bottom": 0,
        "height": 0,
        "left": 0,
        "right": 0,
        "top": 0,
        "width": 0
    },
    "bluetoothEnabled": False,
    "locationEnabled": False,
    "wifiEnabled": False,
    "deviceOrientation": "landscape",
    "benchmarkLevel": -1,
    "brand": "",
    "model": "",
    "system": None,
    "platform": "Win32",
    "SDKVersion": "",
    "enableDebug": False,
    "language": "zh-CN",
    "version": "",
    "theme": "light",
    "fontSizeSetting": None,
    "albumAuthorized": False,
    "cameraAuthorized": False,
    "locationAuthorized": False,
    "microphoneAuthorized": False,
    "notificationAuthorized": False,
    "notificationAlertAuthorized": False,
    "notificationBadgeAuthorized": False,
    "notificationSoundAuthorized": False,
    "phoneCalendarAuthorized": False,
    "locationReducedAccuracy": False,
    "environment": ""
}
body = {
    "appType": 3,
    "bizType": "2",
    "deviceUUId": "",
    "platform": 3,
    "sceneval": "2",
    "source": "m_inner_myJd.orderFloor_orderlist",
    "systemBaseInfo": json.dumps(systemBaseInfo, separators=(',', ':')),
    "orderId": "310138371238",
    "origin": 10,
    "tenantCode": "jgm",
    "bizModelCode": "2",
    "bizModeClientType": "M",
    "bizModeFramework": "Taro",
    "externalLoginType": 1,
    "token": "3852b12f8c4d869b7ed3e2b3c68c9436",
    "appId": "m91d27dbf599dff74"
}
params = {
    "t": "1739369627990",
    "loginType": "2",
    "loginWQBiz": "golden-trade",
    "appid": "m_core",
    "client": "Win32",
    "clientVersion": "",
    "build": "",
    "osVersion": "null",
    "screen": "1440*960",
    "networkType": "4g",
    "partner": "",
    "forcebot": "",
    "d_brand": "",
    "d_model": "",
    "lang": "zh-CN",
    "scope": "",
    "sdkVersion": "",
    "openudid": "",
    "uuid": "17393680422681965042898",
    "x-api-eid-token": "jdd03RXMLKGZ4YZY6MCUCNJCMGOCDS6JASZZBS2US2EYAQ4EQH6B6NBWQMUWPCSUWITJNVIQMMA52ACFEIRTUO5SUPTTEOQAAAAMU7JVBB5AAAAAADTU6AI4KYC664MX",
    "functionId": "pay_info_m",
    "body": json.dumps(body, separators=(',', ':')),
    "h5st": "20250212221348008;3ag933witmpzwaw3;9b070;tk03w794b1b7218nbfFWG3Za5pxG9C6dzTB4RXcxCO7Jo8wABxX81YJiGl2gI1-wQVIQTr82K_fIlNYFnVj-NfiuTTpy;6db9fabb9b3f7248f0fac71e366507497860b1fc92cbd7bc4c053bc237029a2b;4.2;1739369628008;0aeefaf52c5a7fa31a1ad5e06c8551fda85ad5f4536e7e4aa639c27c742cb035bc404e042da71a6faa85368294121c99af44ce012ae272cc5c3615489cf8a817adeb0930946eeb5f3b94a26dbe58546ff8e1ad867e9dfd03bc978957ee8a10b33eee5356df6f1c5f1c7148c5b2416b5ee5c71795e10b82363fe7837b5626662f187ce8cb84337535d764b2adf8a324707238d3ac9b646ad4dd6198709fa1123aeae5ecfdfbd04c176fbb81e18601264f9c6319ba7aa7be51931af017d53ed7e052ddfb15b2a947c357534b30463fe32391d5df8cf6fe184f4a7270a8efa295e2d6342b8accc37da3ace9708e702368c6d7ffb8ce20605c3270cd52e383349f0e49b55955e3b1ed6eea3f382efb98797cb8a704d5639ef609c22d7b138f58684029e8febfa1ac8a535eced045b476a0fc"
}
# response = requests.get(url, headers=headers, cookies=cookies, params=params)
#
# print(response.json())

print(re.search("appId=(.*?)&", "url=https://mpay.m.jd.com/mpay.dcf1ecf4a58ae843d3e0.html?appId=m_D1vmUq63&payId=d831898557b1448b92de5fb638af4b0b&orderId=310138371238&tId=mpay").group(1))