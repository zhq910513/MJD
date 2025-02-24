import json

from curl_cffi import requests
from urllib.parse import urlencode, unquote


def handle_post_data(post_data):
    return urlencode(post_data).replace("%2A", "*").replace("%27", "%22").replace("+", "")


cookies = {
    'pt_key': 'AAJnpJozADAjZd8TJAQjJAk4hJDaveKHCIU3lN7FHKi8s0AFdjFBr_ax9PcAs9AcRK8xVg1plSw',
    'pt_pin': 'zhq91513',
}

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
    'cache-control': 'no-cache',
    'origin': 'https://recharge.m.jd.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://recharge.m.jd.com/',
    'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    'x-referer-page': 'https://recharge.m.jd.com/cardSettlement',
    'x-rp-client': 'h5_1.0.0',
    # 'cookie': 'mba_muid=17388405838361203117691; shshshfpa=9ee2cd02-57f9-72c5-f778-0351f1e1997b-1735542848; shshshfpx=9ee2cd02-57f9-72c5-f778-0351f1e1997b-1735542848; jcap_dvzw_fp=BBa_tQvhLIA1_N6io9arxprmrEgwD4yO3js6hJx_BwYhiKMLmUQGL48plfjERVlfbko3rOnLW4KZd2LmUAmdpQ==; TrackerID=j6Y1xjLelmeAYTWyVhfOmwoTBWNJiGcOiYeqGh3jC5-hDZ-uGogPTYRJXtBKFae8lIwR4DiVxw48dXzRf0ROSNwZmaxnSsPPHo-wfMRL2ig; pt_key=AAJnpJozADAjZd8TJAQjJAk4hJDaveKHCIU3lN7FHKi8s0AFdjFBr_ax9PcAs9AcRK8xVg1plSw; pt_pin=zhq91513; pt_token=yo4fvkms; pwdt_id=zhq91513; whwswswws=; retina=0; webp=1; visitkey=8719492081381946543; 3AB9D23F7A4B3C9B=6GW2Z3HU2M3GXJOWMDRZJG5OASMRDUS3MHOPOX6AIX6N7R2PH4MYVOHA2OK2MS3CDPEWHKTDG6K6Q6TR4IX4PVYMNQ; sc_width=1536; cid=9; wxa_level=1; jxsid=17403791741774565469; __jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1740379174272; __jdc=122270672; appCode=ms0ca95114; autoOpenApp_downCloseDate_jd_homePage=1740391715652_1; cd_eid=jdd036GW2Z3HU2M3GXJOWMDRZJG5OASMRDUS3MHOPOX6AIX6N7R2PH4MYVOHA2OK2MS3CDPEWHKTDG6K6Q6TR4IX4PVYMNQAAAAMVG5WLUYQAAAAACQJBBANWH3FFEAX; __jda=122270672.17388405838361203117691.1738840583.1740383523.1740394437.32; jxsid_s_u=https%3A//trade.m.jd.com/order/orderlist_jdm.shtml; jxsid_s_t=1740394620354; warehistory="10022039398507,10022039398507,10022039398507,10022039398507,10022039398507,10022039398507,10022039398507,10022039398507,10022039398507,10022039398507,10022039398507,"; wqmnx1=MDEyNjM2MnRpLm0vYT9kMjg4MjEzbCBvICA7IFcvNk1ra3IzLmE3MXNkYTIyT0QpJkg%3D; autoOpenApp_downCloseDate_autoOpenApp_autoPromptly=1740394658805_1; __wga=1740394659729.1740394659729.1740391208372.1739326616108.1.7; PPRD_P=UUID.17388405838361203117691-LOGID.1740394659743.1552446414; shshshfpb=BApXSppWTNPBAFGMSpb6ccUWxaiZKJyihBncVL2dj9xJ1OsZTbN-Hx0u4ZQPoNOY; __jdb=122270672.10.17388405838361203117691|32.1740394437; 3AB9D23F7A4B3CSS=jdd036GW2Z3HU2M3GXJOWMDRZJG5OASMRDUS3MHOPOX6AIX6N7R2PH4MYVOHA2OK2MS3CDPEWHKTDG6K6Q6TR4IX4PVYMNQAAAAMVG6UQZ6IAAAAADXT2P3ENS52H64X; _gia_d=1; pt_st=1_bY4sZfXxGlc0XvY-d0pCQ_GB9XOj9gUsNjWIGL4MTAh_3A4W1VpT8VKO0vMqMVksHzv1vSNl5WlCzWu0WAMofcXaeEJ2-9oeE0NyNWzWcOKEO6pjacshHbWxFaISXFNuYk3_jVaUT4E-Fcd_Xm5_gSVX1wVt-pUS52l-z8KvvNrkZ91E0tfx6jNL7T56if8qIW0trVPAlLUWcDTfE7oc1DPje8fqvq**; mba_sid=1740394437375203116020341365.16',
}

response = requests.post('https://api.m.jd.com/api', cookies=cookies, headers=headers, data=handle_post_data(data_json))
# print(response.json())
