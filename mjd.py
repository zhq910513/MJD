# -*- coding: utf-8 -*-
import json
import random
import re
import time
from urllib.parse import urlencode

from mjd_base import MJDBase
from plugins.log import log_error
import cv2
import numpy as np
import base64
from PIL import Image
# 列表   https://trade.m.jd.com/order/orderlist_jdm.shtml?sceneval=2&jxsid=17405644484247143825&appCode=ms0ca95114&orderType=all&ptag=7155.1.11&source=m_inner_myJd.orderFloor_orderlist
# 查询链接   https://recharge.m.jd.com/orderDetail?orderId=307843863375&serviceType=3&source=41


class MJDOrder(MJDBase):
    def __init__(self, account, sku_id=None, order_id=None):
        super().__init__(account=account, order_id=order_id)
        self.get_account_setting()
        self.sku_id = sku_id
        self.brand_id = None
        self.sku_price = None
        self.sku_type = None
        self.wx_appid = None
        self.wx_payid = None
        self.mpay_uid = None
        self.wx_package = None
        self.wx_prepay_id = None
        self.captcha_id = "2093769752"
        self.prefix = None
        self.sess = None
        self.distance = 0
        self.init_y = 0
        self.captcha_retry = 1

    @staticmethod
    def handle_post_data(post_data):
        return urlencode(post_data).replace("%2A", "*").replace("%27", "%22").replace("+", "")

    @staticmethod
    def handle_get_data(post_data):
        return urlencode(post_data).replace("%2A", "*").replace("%27", "%22").replace("+", "").replace("%3A",
                                                                                                       ":").replace(
            "%2C", ",")

    # 获取SKU详情
    def get_sku_info(self):
        self.order_id = None
        func_api = "getGameDetailBySkuId"
        js_v = "3015"
        print(func_api)

        headers = {
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://recharge.m.jd.com',
            'Pragma': 'no-cache',
            'Referer': 'https://recharge.m.jd.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'accept': 'application/json, text/plain, */*',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'x-referer-page': 'https://recharge.m.jd.com/cardSettlement',
            'x-rp-client': 'h5_1.0.0',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        # 请求时间
        api_query_time = int(time.time() * 1000)

        # 请求体
        body = {
            "skuId": self.sku_id,
            "appKey": "android",
            "source": self.body_info["source"]
        }
        body_str = self.generate_body_str(body)

        # 合成clt的设备参数
        input_clt_str = self.generate_clt_str()

        # 签名
        h5st = self.generate_h5st(js_v, func_api=func_api, input_clt_str=input_clt_str, api_query_time=api_query_time,
                                  body_str=body_str)
        params = {
            'appid': 'tsw-m',
            'functionId': func_api,
            't': str(api_query_time),
            'body': json.dumps(body, separators=(',', ':')),
            'uuid': self.device["uuid"],
            'screen': self.device["base"]["screen"]["screen"],
            'h5st': h5st,
            'x-api-eid-token': self.device["eid_token"]
        }

        resp = self.get_response(url='https://api.m.jd.com/api', params=params)
        resp_json = resp.json()
        print(resp_json)

        if resp_json["code"] == "3":
            log_error(f"查询SKU详情失败 账号不可用：{self.account['pt_pin']}")
            return self.return_info(code=0)

        if not resp_json.get("result"):
            log_error(f"获取SKU {self.sku_id} 详情失败：{resp_json}")
            return self.return_info(code=2)

        self.brand_id = resp_json["result"]["brandId"]
        self.sku_price = resp_json["result"]["skuPrice"]
        self.sku_type = resp_json["result"]["type"]
        self.get_init_order()

    # 初始化订单
    def get_init_order(self):
        func_api = "submitGPOrder"
        print(func_api)
        js_v = "3015"

        headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://recharge.m.jd.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://recharge.m.jd.com/',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'x-referer-page': 'https://recharge.m.jd.com/cardSettlement',
            'x-rp-client': 'h5_1.0.0',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        # 请求时间
        api_query_time = int(time.time() * 1000)

        # 请求体
        body = {
            "skuId": self.sku_id,
            "brandId": str(self.brand_id),
            "type": self.sku_type,
            "buyNum": 1,
            "payMode": "0",
            "totalPrice": str(self.sku_price),
            "appKey": "android",
            "source": self.body_info["source"],
            "version": self.body_info["version"],
            "orderSource": self.body_info["orderSource"]
        }
        body_str = self.generate_body_str(body)

        post_data = {
            'appid': 'tsw-m',
            'functionId': func_api,
            't': str(api_query_time),
            'body': json.dumps(body, separators=(',', ':')),
            'uuid': self.device["uuid"],
            'screen': self.device["base"]["screen"]["screen"],
            'x-api-eid-token': self.device["eid_token"]
        }

        # 合成clt的设备参数
        input_clt_str = self.generate_clt_str()

        # 签名
        h5st = self.generate_h5st(js_v, func_api=func_api, input_clt_str=input_clt_str,
                                  api_query_time=api_query_time, body_str=body_str)
        post_data.update({
            'h5st': h5st
        })
        post_data = self.handle_post_data(post_data)

        resp = self.get_response('https://api.m.jd.com/api', data=post_data)
        resp_json = resp.json()
        print(resp_json)

        if not resp_json.get("result"):
            log_error(f"获取初始化订单ID失败：{resp_json}")
            return self.return_info(code=3)

        if resp_json.get("errorCode") == "31":
            log_error(f"获取初始化订单ID被风控：{resp_json}")
            return self.return_info(code=19)

        self.order_id = resp_json["result"]["orderId"]

        # 缓存该账号最新订单id
        self.redis_order_cache()

        self.get_pay_info_m()

    # 生成订单
    def get_pay_info_m(self):
        func_api = "pay_info_m"
        print(func_api)

        headers = {
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://recharge.m.jd.com',
            'Pragma': 'no-cache',
            'Referer': 'https://recharge.m.jd.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'accept': 'application/json, text/plain, */*',
            'content-type': 'application/x-www-form-urlencoded',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'x-referer-page': 'https://recharge.m.jd.com/cardSettlement',
            'x-rp-client': 'h5_1.0.0',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        # 请求时间
        api_query_time = int(time.time() * 1000)

        # 请求体
        systemBaseInfo = {
            "pixelRatio": self.device["base"]["devicePixelRatio"],
            "screenWidth": self.device["base"]["screen"]["width"],
            "screenHeight": self.device["base"]["screen"]["height"],
            "windowWidth": self.device["base"]["screen"]["windowWidth"],
            "windowHeight": self.device["base"]["screen"]["windowHeight"],
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
            "orderId": self.order_id,
            "origin": 10,
            "tenantCode": "jgm",
            "bizModelCode": "2",
            "bizModeClientType": "M",
            "bizModeFramework": "Taro",
            "externalLoginType": 1,
            "token": "3852b12f8c4d869b7ed3e2b3c68c9436",
            "appId": "m91d27dbf599dff74"
        }
        body_str = self.generate_body_str(body)

        # 签名
        h5st = self.generate_wx_h5st(api_query_time=api_query_time, body_str=body_str)

        params = {
            "t": str(api_query_time),
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
            "x-api-eid-token": self.device["eid_token"],
            "functionId": func_api,
            "body": json.dumps(body, separators=(',', ':')),
            "h5st": h5st
        }

        resp = self.get_response('https://api.m.jd.com/api', params=params)
        resp_json = resp.json()
        print(resp_json)

        if resp_json["code"] != "0":
            log_error(f"获取支付信息失败：{resp_json}")
            return self.return_info(code=4)

        resp_body = resp_json["body"]
        if resp_body:
            self.wx_appid = re.search("appId=(.*?)&", resp_body["url"]).group(1)
            self.wx_payid = resp_body["payId"]
            self.mpay_uid = re.search(r"mpay\.(.*?)\.html", resp_body["url"]).group(1)

            # 请求支付页面
            self.get_m_pay()

            # 是否还需要请求其他
            self.get_platPayChannel()

            # 获取支付链接
            self.get_platWapWXPay()
        else:
            log_error(f"提取支付信息失败：{resp_json}")
            return self.return_info(code=16)

    def get_m_pay(self):
        func_api = "m_pay"
        print(func_api)

        headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Referer': 'https://trade.m.jd.com/',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        params = {
            'appId': self.wx_appid,
            'payId': self.wx_payid,
            'orderId': self.order_id,
            'tId': func_api,
        }
        resp = self.get_response(f'https://mpay.m.jd.com/mpay.{self.mpay_uid}.html', params=params)
        # 这里开始转成 js_security_v3_0.1.4.js
        print(resp.status_code)

    def get_platPayChannel(self):
        func_api = "platPayChannel"
        print(func_api)

        headers = {
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://mpay.m.jd.com',
            'Pragma': 'no-cache',
            'Referer': 'https://mpay.m.jd.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
            'accept': 'application/json, text/plain, */*',
            'content-type': 'application/x-www-form-urlencoded',
            'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'x-referer-page': 'https://mpay.m.jd.com/mpay.dcf1ecf4a58ae843d3e0.html',
            'x-rp-client': 'h5_1.0.0',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        # 请求时间
        api_query_time = int(time.time() * 1000)

        params = {
            'functionId': func_api,
            'appid': 'mcashier',
            'scval': 'mpay',
        }

        body = {
            "appId": self.wx_appid,
            "payId": self.wx_payid,
            "source": "mcashier",
            "origin": "h5",
            "mcashierTraceId": api_query_time
        }
        body_str = self.generate_body_str(body)

        # 签名
        h5st = self.generate_wx_h5st(api_query_time=api_query_time, body_str=body_str)

        data = {
            'body': json.dumps(body, separators=(',', ':')),
            'x-api-eid-token': self.device["eid_token"],
            'h5st': h5st
        }

        resp = self.get_response('https://api.m.jd.com/client.action', params=params, data=data)
        print(resp.status_code)

    # 获取支付链接
    def get_platWapWXPay(self):
        url = "https://api.m.jd.com/client.action"
        func_api = "platWapWXPay"
        print(func_api)

        headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
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
        self.session.headers.clear()
        self.session.headers.update(headers)

        # 请求时间
        api_query_time = int(time.time() * 1000)

        # 请求体
        body = {
            "appId": self.wx_appid,
            "payId": self.wx_payid,
            "eid": self.device["eid"],
            "source": "mcashier",
            "origin": "h5",
            "mcashierTraceId": api_query_time
        }
        body_str = self.generate_body_str(body)

        params = {
            'functionId': func_api,
            'appid': 'mcashier',
            'scval': 'mpay',
        }

        # 签名
        h5st = self.generate_wx_h5st(api_query_time=api_query_time, body_str=body_str)

        data = {
            'body': json.dumps(body, separators=(',', ':')),
            'x-api-eid-token': self.device["eid_token"],
            'h5st': h5st
        }

        resp = self.get_response(url=url, params=params, data=data)
        resp_json = resp.json()
        print(resp_json)

        if not resp_json.get("payInfo"):
            log_error(f"获取微信支付信息失败：{resp_json}")
            return self.return_info(code=14)

        pay_info = resp_json["payInfo"]
        mweb_url = pay_info.get("mweb_url", "")
        self.wx_package = mweb_url.split("package=")[1]
        self.wx_prepay_id = pay_info.get("prepayId", None)
        if not self.wx_package or not self.wx_prepay_id:
            log_error(f"微信支付参数缺失：{resp_json}")
            return self.return_info(code=15)

        # 获取微信支付链接
        self.get_checkmweb()

    # 获取微信支付链接   可能遇到验证码
    def get_checkmweb(self):
        print("checkmweb")
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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        params = {
            'prepay_id': self.wx_prepay_id,
            'package': self.wx_package,
        }
        resp = self.get_response(url=url, params=params)
        print(resp.status_code)

        resp_text = resp.text.replace('\n', '').replace('\t', '').replace('\r', '').replace(' ', '')
        if not resp_text:
            log_error(f"获取微信支付链接失败：{resp_text}")
            return self.return_info(code=18)
        else:
            for payment_link in re.findall('deeplink:"(.*?)"', resp_text):
                if payment_link and "weixin://wap/pay?" in payment_link:
                    return self.return_info(code=1, payment_link=payment_link)

            for error_msg in re.findall('error_msg:"(.*?)"', resp_text):
                if error_msg:
                    log_error(f"获取微信支付链接失败：{error_msg}")
                    return self.return_info(code=18, error_msg=error_msg)

            if "验证码加载失败，请稍后重试" in resp_text:
                print("--- 遇到验证码 ---")
                self.captcha_id = re.findall(r"TencentCaptcha\(document.getElementById\('captcha-view'\),'(\d+)'", resp_text)[0]
                self.cap_union_prehandle()
                self.get_cap_union_new_verify()

    def load_image(self, img_name, url):
        headers = {
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Referer': 'https://captcha.gtimg.com/',
            'Sec-Fetch-Dest': 'image',
            'Sec-Fetch-Mode': 'no-cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.session.headers.update(headers)

        response = self.get_response(url=url)
        with open(img_name, 'wb') as f:
            f.write(response.content)

    # 请求/刷新验证码
    def cap_union_prehandle(self):
        print("请求/刷新验证码")
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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        def get_prefix(resp):
            self.prefix = resp["data"]["comm_captcha_cfg"]["pow_cfg"]["prefix"]

        def get_init_y(resp):
            for item in resp["data"]["dyn_show_info"]["fg_elem_list"]:
                if item["id"] == 1:
                    self.init_y = item["init_pos"][1]

        def download_bg_image(resp):
            _url = "https://t.captcha.qq.com" + resp["data"]["dyn_show_info"]["bg_elem_cfg"]["img_url"]
            self.load_image("image_bg.png", _url)

        def download_sg_image(resp):
            _url = "https://t.captcha.qq.com" + resp["data"]["dyn_show_info"]["sprite_url"]
            self.load_image("image_sg_full.png", _url)
            # 裁剪出合适的滑块
            cut_image()

        def image_to_base64(image_path):
            """
            将本地图片转换为 Base64 编码的字符串
            :param image_path: 图片的本地路径
            :return: Base64 编码的字符串
            """
            # 打开图片文件
            with open(image_path, "rb") as image_file:
                # 读取图片的二进制数据
                image_data = image_file.read()

            # 将二进制数据编码为 Base64 字符串
            base64_str = base64.b64encode(image_data).decode("utf-8")

            return base64_str

        def cut_image():
            """
            裁剪图片的某个正方形位置。

            参数:
                image_path (str): 输入图片的路径。
                output_path (str): 裁剪后图片的保存路径。
                x (int): 正方形左上角的横坐标。
                y (int): 正方形左上角的纵坐标。
                size (int): 正方形的边长。
            """
            x = 142
            y = 490
            size = 120

            # 打开图片
            image = Image.open("image_sg_full.png")

            # 检查裁剪区域是否超出图片范围
            if x + size > image.width or y + size > image.height:
                raise ValueError("裁剪区域超出图片范围！")

            # 裁剪图片
            cropped_image = image.crop((x, y, x + size, y + size))

            # 保存裁剪后的图片
            cropped_image.save("image_sg.png")

        params = {
            'aid': '2093769752',
            'protocol': 'https',
            'accver': '1',
            'showtype': 'embed',
            'ua': 'TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzMi4wLjAuMCBTYWZhcmkvNTM3LjM2',
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
            'callback': '',
            'sess': '',
        }

        response = self.get_response(url=url, params=params)
        resp_json = json.loads(response.text[1:-1])

        # 获取验证码初始数据
        self.sess = resp_json["sess"]
        get_prefix(resp_json)
        get_init_y(resp_json)

        # 下载图片并转码
        download_bg_image(resp_json)
        bg_base64 = image_to_base64("image_bg.png")
        download_sg_image(resp_json)
        sg_base64 = image_to_base64("image_sg.png")

        # 计算距离
        self.get_distance(bg_base64, sg_base64)
        print(f"识别到滑块距离: {self.distance}")

    # 滑动验证码
    def get_cap_union_new_verify(self):
        print("滑动验证码/验证中...")
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
        self.session.headers.update(headers)

        url = "https://t.captcha.qq.com/cap_union_new_verify"
        collect = "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"
        eks = "u6kD8SaItdqM1n28Wv3340AlQ+IjdKkS2O69vRL3T7nHP2OiuMldABtW1z+rs4kFQxp96QcT3R/VTPg4gsfsGGiI3AA7Lul2EVsq3lHmMRWjIQ0k8OQvKRGFFaR6ADb7tEDYYIgImR7Q1n4YpwxC4b61pb+tX+VvQ/dlf4KQ7KURl6Q4jK5nKwEYazclnErl548m4qg4dUUtxCnH6zvzD6oF1F1MyAVhVEMwQNMnbDw="
        ans_data = [{"elem_id": 1, "type": "DynAnswerType_POS", "data": f"{self.distance},{self.init_y}"}]
        data = {
            "collect": collect,
            "tlg": len(collect),
            "eks": eks,
            "sess": self.sess,
            "ans": json.dumps(ans_data, separators=(',', ':')),
            "pow_answer": f"{self.prefix}{random.randint(3000, 464879)}",
            "pow_calc_time": random.randint(500, 3000)
        }
        print(data)
        resp = self.get_response(url, data=data)
        resp_json = resp.json()
        print(resp_json)

        if resp_json.get("randstr") and resp_json.get("ticket") and resp_json.get("errorCode") == "0":
            self.checkcaptcha(resp_json["randstr"], resp_json["ticket"])
        else:
            if self.captcha_retry < 1:
                print("刷新验证码...")
                self.captcha_retry += 1
                self.cap_union_prehandle()
                self.get_cap_union_new_verify()
            else:
                return self.return_info(code=12, error_msg=f"滑块验证刷新失败,错误码:{resp_json['errorCode']}")

    # 计算滑块距离
    def get_distance(self, bg, sg):
        def base64_to_image(base64_str):
            img_data = base64.b64decode(base64_str)
            nparr = np.frombuffer(img_data, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            return img, img_rgb

        # 转换图片
        background, background_rgb = base64_to_image(bg)
        slider, slider_rgb = base64_to_image(sg)

        def get_position_at_scale(background, slider, scale):
            # 放大图片
            scaled_background = cv2.resize(background, None, fx=scale, fy=scale)
            scaled_slider = cv2.resize(slider, None, fx=scale, fy=scale)

            # 图片预处理
            background_blur = cv2.GaussianBlur(scaled_background, (3, 3), 0)
            slider_blur = cv2.GaussianBlur(scaled_slider, (3, 3), 0)

            # 转换为灰度图
            background_gray = cv2.cvtColor(background_blur, cv2.COLOR_BGR2GRAY)
            slider_gray = cv2.cvtColor(slider_blur, cv2.COLOR_BGR2GRAY)

            # 边缘检测
            background_edges = cv2.Canny(background_gray, 100, 200)
            slider_edges = cv2.Canny(slider_gray, 100, 200)

            # 模板匹配
            result = cv2.matchTemplate(background_edges, slider_edges, cv2.TM_CCOEFF_NORMED)

            # 使用亚像素级别的匹配
            _, max_val, _, max_loc = cv2.minMaxLoc(result)

            # 在最大值周围进行插值，获取更精确的位置
            if 0 < max_loc[0] < result.shape[1] - 1:
                # 获取最大值左右的点
                left_val = result[max_loc[1]][max_loc[0] - 1]
                center_val = result[max_loc[1]][max_loc[0]]
                right_val = result[max_loc[1]][max_loc[0] + 1]

                # 使用抛物线插值计算亚像素级别的位置
                delta = 0.5 * (left_val - right_val) / (left_val - 2 * center_val + right_val)
                target_x = max_loc[0] + delta
            else:
                target_x = max_loc[0]

            # 将结果缩放回原始尺寸
            return target_x / scale, max_val

        # 使用多个缩放尺度进行匹配
        scales = [1.0, 1.5, 2.0]  # 可以调整缩放倍数
        positions = []
        confidences = []

        for scale in scales:
            pos, conf = get_position_at_scale(background, slider, scale)
            positions.append(pos)
            confidences.append(conf)

        # 使用置信度作为权重计算加权平均位置
        weighted_sum = sum(p * c for p, c in zip(positions, confidences))
        weight_sum = sum(confidences)
        final_x = weighted_sum / weight_sum if weight_sum > 0 else positions[0]

        # 在原图上标记匹配位置（用于调试）
        slider_height, slider_width = slider.shape[:2]
        result_img = background_rgb.copy()
        cv2.rectangle(result_img,
                      (int(final_x), self.init_y),  # Y 轴起始位置为 self.init_y
                      (int(final_x + slider_width), self.init_y + slider_height),
                      # Y 轴结束位置为 self.init_y + slider_height
                      (0, 255, 0), 2)  # 绿色矩形框，线宽为 2

        # 保存标记后的图片
        cv2.imwrite("image_mark.png", cv2.cvtColor(result_img, cv2.COLOR_RGB2BGR))

        self.distance = int(final_x - 0.5) - 2  # 保留3位小数

    # 校验验证结果
    def checkcaptcha(self, randstr, ticket):
        print("校验验证结果")
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
        self.session.headers.update(headers)

        url = "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkcaptcha"
        params = {
            "ticket": ticket,
            "randstr": randstr,
            "prepayid": self.wx_prepay_id,
            "package": self.wx_package
        }

        resp = self.get_response(url, params=params)
        resp_json = resp.json()
        print(resp_json)

        if resp_json.get("retcode") == 1:
            return self.return_info(code=1, payment_link=resp_json["deeplink"])
        else:
            if self.captcha_retry < 1:
                print("刷新验证码...")
                self.captcha_retry += 1
                self.cap_union_prehandle()
                self.get_cap_union_new_verify()
            else:
                return self.return_info(code=12)

    # 查询
    def get_order_detail(self):
        func_api = "getGPOrderDetail"
        js_v = "3015"

        headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://recharge.m.jd.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://recharge.m.jd.com/',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'x-referer-page': 'https://recharge.m.jd.com/orderDetail',
            'x-rp-client': 'h5_1.0.0',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        # 请求时间
        api_query_time = int(time.time() * 1000)

        # 请求体
        body = {
            "appKey": "android",
            "source": self.body_info["source"],
            "orderId": self.order_id,
            "version": self.body_info["version"],
            "rechargeversion": self.body_info["rechargeversion"],
            "moduleName": "JDReactVirtualRecharge",
            "apiVersion": "new"
        }
        body_str = self.generate_body_str(body)

        # 合成clt的设备参数
        input_clt_str = self.generate_clt_str()

        # 签名
        h5st = self.generate_h5st(js_v, func_api=func_api, input_clt_str=input_clt_str,
                                  api_query_time=api_query_time, body_str=body_str)

        post_data = {
            'appid': 'tsw-m',
            'functionId': func_api,
            't': str(api_query_time),
            'body': json.dumps(body, separators=(',', ':')),
            'uuid': self.device["uuid"],
            'screen': self.device["base"]["screen"]["screen"],
            'h5st': h5st,
            'x-api-eid-token': self.device["eid_token"],
        }
        post_data = self.handle_post_data(post_data)

        resp = self.get_response('https://api.m.jd.com/api', data=post_data)
        resp_json = resp.json()
        print(resp_json)

        if resp_json.get("errorCode") == "31":
            return self.return_info(code=19)

        if resp_json["code"] == "3":
            log_error(f"查询订单详情失败 账号不可用：{self.account['pt_pin']}")
            return self.return_info(code=0)
        if not resp_json.get("result"):
            log_error(f"查询订单详情失败 订单ID：{self.order_id} 返回数据：{resp_json}")
            return self.return_info(code=6)

        order_time = resp_json["result"].get("created")
        order_status = resp_json["result"].get("orderStatusName")
        card_infos = resp_json["result"].get("cardInfos")
        if not card_infos:
            log_error(
                f"订单 {self.order_id} 获取账号密码失败, 返回数据：{resp_json}, 订单查询链接：https://recharge.m.jd.com/orderDetail?orderId={self.order_id}&serviceType=3&source=41")
            return self.return_info(
                code=1,
                order_time=order_time,
                order_status=order_status,
                error_msg=f"获取卡密失败,订单{order_status}"
            )

        card_dict = self.decrypt_des(encrypted_data=card_infos, key=self.qq_game_des_key)
        return self.return_info(
            code=1,
            order_time=order_time,
            order_status=order_status,
            card_account=card_dict[0]["cardNo"],
            card_password=card_dict[0]["cardPass"]
        )

    def run_create(self):
        self.get_sku_info()
        return self.result

    def run_select(self):
        self.get_order_detail()
        return self.result


if __name__ == '__main__':
    _account = {
        # 自己的
        # "pt_pin": "zhq91513",
        # "pt_key": "AAJnrKaVADChKF-KgRvGcEk7VPe_YVZhcoNuzwgpeZfRLxz07Tg58KCpxB3WXCBz-T63lC4Oxqk",
        # dd
        # "pt_pin": "jd_LpHciKLtISJq",
        # "pt_key": "AAJnq3jyADDAhz0RzzMqk9LLGx3yIkDeyBCDXF1eerGEnVF8gSD7zdyT0epX6es_HhuXXk36CEg",
        # 新号
        "pt_pin": "jd_5b204cf6a28eb",
        "pt_key": "AAJnsyNnADC8QWPgMFGP4Vp4_H-WXKXal6QV7iYB7HSDil-kvFYr2Oq2J0zu_KLgYhss1GfNZSA",
    }
    _sku_id = "10022039398507"
    # _order_id = "307843863375"
    # _order_id = "310961315560"  # 最新
    # _order_id = "309756850294"  # dd
    _order_id = "310170016279"   # 新号
    mo = MJDOrder(account=_account, sku_id=_sku_id, order_id=_order_id)
    # print(mo.generate_device())
    # mo.run_create()
    # mo.run_select()
    # mo.get_sku_info()
    # mo.get_init_order()
    mo.get_pay_info_m()
    # mo.get_platWapWXPay()
    # mo.get_checkmweb()
    # mo.generate_device()
    # print(mo.generate_expand_params(mo.device_info) == "XRJ6PVGO5x2Ru8yR5Z3XtRXLpM29nMDB4MjN1MS9h8y93Z3L3ZyA3ZXRPp3R4IGL042R5x2RwUzR5Z3XtZ2N5x2RrMjB3ZXRPp3RlVGN2EmN0MjBlJGLkZ2BkNjNkFTA2UDA3UWNgB2A002R5x2RoZyIt8zB08yR5Z3XtRXMoVmBkNGA2MTMl1GMpRDM2MGM0IjB4EzBoZGLjBDAgRXRfRX9TojA3Ej83ZXRPp3RzQjMoBGM4MmNmJTN3Q2BiV2BjRzBoRGAgVGNz82BzY2R5x2RoNCBjgDB2QXR5xZO3BzBiV2MkVjNmNWApRzN38GN3A2B3U2N00GNoBjM3ATN3Z3L3NCBjgDB2QXR5xZO3lSR8ETAqMTR0AC-lUz__Yn751XPygD-nIiFqISRrcD-lMz_kATQcYHC0Ij_2YHAj0T84gjD5tSRw5n8qIz_w8URrcD-lMz_kAzR5x2RmFyB3ZXRPp3RiBWLi92Lkxm9vgHMrV2OpdkNjcE7l0z9kMDAmck9vc390gD-4Iy_qMzB08iOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TRlUTR5ZXR3Z3L3RG83QXR5xZO352OphHMjcEAt0zA6EW-3Z3L3ByR5Z3XtR3R5x2RnEz90ADAnQXR5xZO3tVMhESFqEiJDEm-3Z3L3lj_1gDBnQXR5xZO3RXRfRHAnQXR5xZOkR2OoZ3L3RS93ZXRPp3RnN2_w80R5x2RzYyR5Z3XtRH_qMzO1wzOsgHAyQCBxMDAncnOfNS9lIS-3Z3L39j_3ZXRPp3RoJGK0Mz9kcj9zNGK0YC7FEjBwAy90MyQk9mNmBWLmJWLiZmNcJDHnETAncjKt0DBlETInETAncjOscjBrJz-rlzO08z944jB0QiOqxm9pIS8xQXRfRX_nEyR5Z3XtBGNhZ3L35j_3ZXRPp3MmFGN5x2RiczR5Z3XtJ2MhZ3L35zR5Z3XtBmNkVWRfRn83ZXRPp3RwB2NmxGNfNy-rhD-sgHNrkj_kVyOoRmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cnNrR2OoBiOrcD-mQCAjcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5hTRlUTR5ZXRroEPhVmNjFGNf5WMfNy-rhD-sgHNrkj_kVyOoRmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cnNrR2OoBiOrcD-mQCAjcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP51WM1MzO0oD81cDG5JCB5ZXR5hTCwB2NmxGNfNy-rhD-sgHNrkj_kVyOoRmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cnNrR2OoBiOrcD-mQCAjcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5hTRlUTR5ZXRroEPhVGMoN2LgR2LmwzOr0D_rV2_scDMogHNnd0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqN2OnhHNjc3_q0j9nEz8qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XR1E2M2gX82Ez-3cVRlUTR5ZXRroEPjRmNfV2LmwzOr0D_rV2_scDMogHNnd0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqN2OnhHNjc3_q0j9nEz8qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRrYX84YXR5Z3_90XMpBGMox2Nnxm9vg3_wkzOohD_qEG9rV2N6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOmh3NrV28qhj_wMy90AiOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZnMoVGBrJiB0wzBKYX84YXR5Z3_90HMp9WNixWNnxm9vg3_wkzOohD_qEG9rV2N6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOmh3NrV28qhj_wMy90AiOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZX95JCB5ZXR5hTCwN2NnVmMfZ2NfNy-rhD-sgHNrkj_kVyOoRmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cnNrR2OoBiOrcD-mQCAjcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5BSRlUTR5ZXRroEPoZWMo92LpR2LmwzOr0D_rV2_scDMogHNnd0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqN2OnhHNjc3_q0j9nEz8qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRgYX84YXR5Z3_90HMkJWLfF2LmwzOkhHNrZmCmBiCgIC-nEiB0MiCmwjOnEz_wUT8rcjB3Ej8qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZHCncT82ET_0ME7nED8oYn94sUR0QVQ6gX8rED_kMj_VoFGF4VRlUTR5ZXRro09nETRlMCAlY3Lncz9nE1R5x2RoFyB3ZXRPp3R3Z3L3VW9pQXR5xZOcYXRPBWRfRXNoFyB3ZXR5Z3XtZWRfRXLkQzR5ZXR5xZOpZ3L39G83QXR5ZXRPpXM5x2RjFyB3ZXR5Z3XtZWRfRHMkQzR5ZXR5xZOpZ3L3JG83QXR5ZXRPpXMkZ3L3NG83QXR5ZXRPpXN5x2RnFyB3ZXR5Z3XtRHMrV2OpRXRfRHNkQzR5ZXR5xZOpZ3L3tj83ZXR5Z3XtFWRfRn9tQXR5ZXRPpXN5x2RtQXR5ZXRPpXN5x2R18yR5ZXR5xp75x2R1gDAl4CA3ZXRPpH65Z3X3NGNkVGLo4z73Z3L3VW93ZXR5Z3XeY3L3ZS93ZXRPp3RlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jE3Z3L3VD8mQXR5xZO3BmNr9mNkdH-nUzA4MURphXNrZ2OmNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrFmO4oT_wwi_MQXRfRHBkQXR5xZO3BmNr9mNkdH-nUzA4MURphXNrZ2OmNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrF2R5x2RjUzR5Z3XtFWRfRX_pQXR5xZOnZ3L3pD_3ZXRPp3RqsTOrETOxwSOLMFOxwyR5x2RmozR5Z3XtR3GWkX-fQXRfRX_3ZXRPpXN5x2R18yR5Z3XtZWRfRnBiQXR5xp7")
