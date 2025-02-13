# -*- coding: utf-8 -*-
import json
import re
import time
from urllib.parse import urlencode

from mjd_base import MJDBase
from plugins.log import log_error


# 查询链接   https://recharge.m.jd.com/orderDetail?orderId=307843863375&serviceType=3&source=41


class MJDOrder(MJDBase):
    def __init__(self, account, sku_id, order_id=None):
        super().__init__(account=account, order_id=order_id)
        self.get_account_setting()
        self.sku_id = sku_id
        self.brand_id = None
        self.sku_price = None
        self.sku_type = None
        self.wx_appid = None
        self.wx_payid = None
        self.wx_package = None
        self.wx_prepay_id = None
        self.sess = None

    @staticmethod
    def handle_post_data(post_data):
        return urlencode(post_data).replace("%2A", "*").replace("%27", "%22").replace("+", "")

    # 获取SKU详情
    def get_sku_info(self):
        self.order_id = None
        func_api = "getGameDetailBySkuId"

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

        params = {
            'appid': 'tsw-m',
            'functionId': func_api,
            't': str(api_query_time),
            'body': json.dumps(body, separators=(',', ':')),
            'uuid': self.device_info["uuid"],
            'screen': self.device_info["screen"],
            'x-api-eid-token': self.device_info["eid_token"]
        }

        # 合成clt的设备参数
        input_clt_str = self.generate_clt_str()

        # 签名
        h5st = self.generate_h5st(device_info=self.device_info, func_api=func_api, input_clt_str=input_clt_str,
                                  api_query_time=api_query_time, body_str=body_str)
        params.update({
            'h5st': h5st
        })

        resp = self.get_response('https://api.m.jd.com/api', params=params)
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
            'uuid': self.device_info["uuid"],
            'screen': self.device_info["screen"],
            'x-api-eid-token': self.device_info["eid_token"]
        }

        # 合成clt的设备参数
        input_clt_str = self.generate_clt_str()

        # 签名
        h5st = self.generate_h5st(device_info=self.device_info, func_api=func_api, input_clt_str=input_clt_str,
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
            return self.return_info(code=19)

        self.order_id = resp_json["result"]["orderId"]
        self.get_pay_info_m()

    # 生成订单
    def get_pay_info_m(self):
        func_api = "pay_info_m"

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
            "x-api-eid-token": self.device_info["eid_token"],
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
        resp = self.get_response('https://mpay.m.jd.com/mpay.dcf1ecf4a58ae843d3e0.html', params=params)
        print(resp.status_code)

    def get_platPayChannel(self):
        func_api = "platPayChannel"
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
            'x-api-eid-token': self.device_info["eid_token"],
            'h5st': h5st
        }

        resp = self.get_response('https://api.m.jd.com/client.action', params=params, data=data)
        print(resp.status_code)

    # 获取支付链接
    def get_platWapWXPay(self):
        url = "https://api.m.jd.com/client.action"
        func_api = "platWapWXPay"

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
            "eid": self.device_info["eid"],
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
            'x-api-eid-token': self.device_info["eid_token"],
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

    # 获取微信支付链接
    def get_checkmweb(self):
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
                captcha_id = \
                    re.findall(r"TencentCaptcha\(document.getElementById\('captcha-view'\),'(\d+)'", resp_text)[0]
                print(captcha_id)

                # cap_union_prehandle
                # cap_union_new_verify
                # checkcaptcha

    # 查询
    def get_order_detail(self):
        func_api = "getGPOrderDetail"

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

        post_data = {
            'appid': 'tsw-m',
            'functionId': func_api,
            't': str(api_query_time),
            'body': json.dumps(body, separators=(',', ':')),
            'uuid': self.device_info["uuid"],
            'screen': self.device_info["screen"],
            'x-api-eid-token': self.device_info["eid_token"]
        }

        # 合成clt的设备参数
        input_clt_str = self.generate_clt_str()

        # 签名
        h5st = self.generate_h5st(device_info=self.device_info, func_api=func_api, input_clt_str=input_clt_str,
                                  api_query_time=api_query_time, body_str=body_str)

        post_data.update({
            'h5st': h5st
        })
        post_data = self.handle_post_data(post_data)

        resp = self.get_response('https://api.m.jd.com/api', data=post_data)
        resp_json = resp.json()

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
            log_error(f"订单 {self.order_id} 获取账号密码失败, 返回数据：{resp_json}, 订单查询链接：https://recharge.m.jd.com/orderDetail?orderId={self.order_id}&serviceType=3&source=41")
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
        # "pt_key": "AAJnpCesADAxbvctVtaJQCr6aM0FUC1rYjxpt6aTC-5HxhmU4L7qKEg8_sK2ivOwbyXa69uQecs",   # edge
        # dd
        "pt_pin": "jd_LpHciKLtISJq",
        "pt_key": "AAJnq3jyADDAhz0RzzMqk9LLGx3yIkDeyBCDXF1eerGEnVF8gSD7zdyT0epX6es_HhuXXk36CEg",
        # 不可用
        # "pt_pin": "jd_COXQQFzqpVtW",
        # "pt_key": "AAJnizbmADBmgx2zKBZzOQiDzfAc_w1YKJLckIau5lN_X04_CKVIbVL8_ap-mR-B4Ua92l02SHY",
        # "pt_pin": "jd_gAUwsCxtALiG",
        # "pt_key": "AAJniTWmADDf4Ar2uJqYIJfqWfwv6xzHI6mZSX-Fp3B1dsBsTwlSoRf49JBzaUFINvCeSRN9xI8",
        # 可用批量
        # "pt_pin": "jd_qUJbtnjwQSWs",
        # "pt_key": "AAJnqIOxADBpd0N6wfgyDZG-YB7EENeOzKBu6zcY0WFZTIw02_2Q9XH_jKIjqbP5z27fsWlNI9w",
        # "pt_pin": "jd_TjWNdaxBXkMw",
        # "pt_key": "AAJnqIOxADBwwHNjWLxHiCnfwL4FR5C9z0AN6bi0ITiyIdQosATybvZoZ1qoYI0GMP-QvXX4vmI",
    }
    _sku_id = "10022039398507"
    # _order_id = "307843863375"
    # _order_id = "310160410437"   # 最新
    _order_id = "310180189766"  # dd
    mo = MJDOrder(account=_account, sku_id=_sku_id, order_id=_order_id)
    # mo.run_create()
    # mo.run_select()
    # mo.get_sku_info()
    # mo.get_init_order()
    mo.get_pay_info_m()
    # mo.get_platWapWXPay()
    # mo.get_checkmweb()
    # mo.generate_device()
