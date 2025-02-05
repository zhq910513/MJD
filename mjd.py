# -*- coding: utf-8 -*-
import json
import pprint
import re
import time
from urllib.parse import urlencode

from mjd_base import MJDBase
from plugins.log import log_error


# 查询链接   https://recharge.m.jd.com/orderDetail?orderId=307843863375&serviceType=3&source=41


class MJDOrder(MJDBase):
    def __init__(self, account, sku_id, order_id=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.account = account
        self.sku_id = sku_id
        self.brand_id = None
        self.sku_price = None
        self.sku_type = None
        self.order_id = order_id
        self.wx_appid = None
        self.wx_payid = None
        self.wx_package = None
        self.wx_pay_enum = None
        self.wx_prepay_id = None
        self.sess = None
        self.get_account_setting(account=account)

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

        # 设备指纹信息
        eid_token = self.device_eid_token()
        params = {
            'appid': 'tsw-m',
            'functionId': func_api,
            't': str(api_query_time),
            'body': json.dumps(body, separators=(',', ':')),
            'uuid': self.device_info["uuid"],
            'screen': self.device_info["screen"],
            'x-api-eid-token': eid_token
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
        if resp_json["code"] == "3":
            log_error(f"查询SKU详情失败 账号不可用：{self.pt_pin}")
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

        # 设备指纹信息
        eid_token = self.device_eid_token()
        post_data = {
            'appid': 'tsw-m',
            'functionId': func_api,
            't': str(api_query_time),
            'body': json.dumps(body, separators=(',', ':')),
            'uuid': self.device_info["uuid"],
            'screen': self.device_info["screen"],
            'x-api-eid-token': eid_token
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
        if not resp_json.get("result"):
            log_error(f"获取初始化订单ID失败：{resp_json}")
            return self.return_info(code=3)

        self.order_id = resp_json["result"]["orderId"]
        self.get_payinfo()

    # 生成订单
    def get_payinfo(self):
        func_api = "getPayChannel"

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
        body = {
            "orderId": self.order_id,
            "appKey": "android",
            "source": self.body_info["source"],
            "version": self.body_info["version"],
            "orderSource": self.body_info["orderSource"],
        }
        body_str = self.generate_body_str(body)

        # 设备指纹信息
        eid_token = self.device_eid_token()
        params = {
            'appid': 'tsw-m',
            'functionId': func_api,
            't': str(api_query_time),
            'body': json.dumps(body, separators=(',', ':')),
            'uuid': self.device_info["uuid"],
            'screen': self.device_info["screen"],
            'x-api-eid-token': eid_token
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
        if resp_json["msg"] != "成功":
            log_error(f"获取支付信息失败：{resp_json}")
            return self.return_info(code=4)

        result_data = resp_json["data"]
        matchs = re.search(r"appId=([^&]+)&payId=([^&]+)", result_data)
        if matchs:
            self.wx_appid, self.wx_payid = matchs.group(1), matchs.group(2)

            # 获取支付链接
            # self.get_wx_payid()
            return self.return_info(code=1, payment_link=result_data)
        else:
            log_error(f"提取支付信息失败：{resp_json}")
            return self.return_info(code=16)

    # 获取支付链接
    def get_wx_payid(self):
        url = "https://api.m.jd.com/client.action"
        func_api = "platWapWXPay"

        headers = {
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
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
            'x-referer-page': 'https://mpay.m.jd.com/mpay.a3bd3c3aaedaa050f2ae.html',
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

        # 合成clt的设备参数
        input_clt_str = self.generate_clt_str()

        # 签名
        h5st = self.generate_h5st(device_info=self.device_info, func_api=func_api, input_clt_str=input_clt_str,
                                  api_query_time=api_query_time, body_str=body_str)
        data = {
            'body': json.dumps(body, separators=(',', ':')),
            'x-api-eid-token': self.device_info["eid_token"],
            'h5st': h5st,
        }

        resp = self.get_response(url=url, params=params, data=data)
        resp_json = resp.json()
        if not resp_json.get("payInfo"):
            log_error(f"获取微信支付信息失败：{resp_json}")
            return self.return_info(code=14)

        pay_info = resp_json["payInfo"]
        mweb_url = pay_info.get("mweb_url", "")
        self.wx_package = mweb_url.split("package=")[1]
        self.wx_pay_enum = pay_info.get("payEnum", None)
        self.wx_prepay_id = pay_info.get("prepayId", None)
        if not self.wx_package or not self.wx_pay_enum or not self.wx_prepay_id:
            log_error(f"微信支付参数缺失：{resp_json}")
            return self.return_info(code=15)

        # 获取验证码
        self.get_cap_union()

    # 获取验证码信息
    def get_cap_union(self):
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
        resp = self.get_response(url=url, params=params)
        resp_json = json.loads(re.match(r"\((.*?)\)", resp.text).group(1))
        if not resp_json:
            log_error(f"获取验证码信息失败：{resp_json}")
            return self.return_info(code=17)

        self.sess = resp_json["sess"]

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
        if resp_json["code"] == "3":
            log_error(f"查询订单详情失败 账号不可用：{self.pt_pin}")
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
                code=7,
                order_time=order_time,
                order_status=order_status,
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
        "pt_pin": "zhq91513",
        # "pt_key": "AAJnjAKLADAKXpZFQ2cmqFTN-XbDpDXuJzhfycVFhniv-UGwHhtR8dnOXpv4PVD4Q_iQBVG3bTo",
        "pt_key": "AAJnhh0eADBEwGwoFKU_L3A6W0jtMPQsGmYAFoVbP5bkNmpOgX26we0e3q3b0sGmp-aPTHv0v5Y",
        # dd
        # "pt_pin": "jd_LpHciKLtISJq",
        # "pt_key": "AAJnjpH2ADBFK9fUR_2ngUZBXT16TxqjqmLRBq3X7vNnil1BakPA3YosSI9e9ueGsqYPkFuH7VI",
        # 不可用
        # "pt_pin": "jd_COXQQFzqpVtW",
        # "pt_key": "AAJnizbmADBmgx2zKBZzOQiDzfAc_w1YKJLckIau5lN_X04_CKVIbVL8_ap-mR-B4Ua92l02SHY",
        # 可用批量
        # "pt_pin": "jd_gAUwsCxtALiG",
        # "pt_key": "AAJniTWmADDf4Ar2uJqYIJfqWfwv6xzHI6mZSX-Fp3B1dsBsTwlSoRf49JBzaUFINvCeSRN9xI8",
    }
    _sku_id = "10022039398507"
    _order_id = "307843863375"
    # _order_id = "309610598434"
    _app_id = "m_D1vmUq63"
    _pay_id = "be51da95e038455f9f0b3f4ac4ec5c6f"
    mo = MJDOrder(account=_account, sku_id=_sku_id, order_id=_order_id)
    # pprint.pp(mo.run_create())
    # pprint.pp(mo.run_select())
    # pprint.pp(mo.get_wx_payid())
    # pprint.pp(mo.get_cap_union())
    mo.generate_device()
