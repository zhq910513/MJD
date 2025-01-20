# -*- coding: utf-8 -*-
import json
import pprint
import time
from urllib.parse import urlencode

from log import log_error
from mjd_base import MJDBase

# 查询链接   https://recharge.m.jd.com/orderDetail?orderId=307843863375&serviceType=3&source=41


class MJDOrder(MJDBase):
    def __init__(self, account, sku_id, order_id=None, *args, **kwargs):
        self.sku_id = sku_id
        self.brand_id = None
        self.sku_price = None
        self.sku_type = None
        self.order_id = order_id
        self.result = None
        super().__init__(*args, **kwargs)
        self.get_account_setting(account=account)

    def return_info(self, code, payment_link=None, order_time=None, order_status=None, card_account=None, card_password=None):
        error_code_mapping = {
            "0": "账号不可用",
            "1": "成功",
            "2": "SKU详情问题/SKU失效/SKU不可下单",
            "3": "初始化订单失败",
            "4": "获取支付信息失败",
            "5": "获取支付链接失败",
            "6": "获取订单详情失败",
            "7": "获取卡密失败",
            "8": "出现风控",
            "9": "redis缓存错误",
            "10": "代理出错",
            "11": "未知错误",
            "12": "验证码校验失败"
        }
        self.result = {
            "code": code,
            "msg": error_code_mapping[str(code)],
            "sku_id": self.sku_id,
            "order_id": self.order_id,
            "payment_link": payment_link,
            "order_time": order_time,
            "order_status": order_status,
            "card_account": card_account,
            "card_password": card_password,
        }

    @staticmethod
    def handle_post_data(post_data):
        return urlencode(post_data).replace("%2A", "*").replace("%27", "%22").replace("+", "")

    # 获取SKU详情
    def get_sku_info(self):
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
        eid_token = self.device_fingerprint()
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
        eid_token = self.device_fingerprint()
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
        eid_token = self.device_fingerprint()
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
        print(resp_json)
        if resp_json["msg"] != "成功":
            log_error(f"获取支付信息失败：{resp_json}")
            return self.return_info(code=4)
        return self.return_info(code=1)

    # 获取支付链接
    def get_payment_link(self):
        ...

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

        # 设备指纹信息
        eid_token = self.device_fingerprint()
        post_data = {
            'appid': 'tsw-m',
            'functionId': func_api,
            't': str(api_query_time),
            'body': str(body),
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
        encode_data = self.handle_post_data(post_data=post_data)

        resp = self.get_response('https://api.m.jd.com/api', data=encode_data)
        resp_json = resp.json()
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
        ## 自己的
        # "pt_pin": "zhq91513",
        # "pt_key": "AAJnhh0eADBEwGwoFKU_L3A6W0jtMPQsGmYAFoVbP5bkNmpOgX26we0e3q3b0sGmp-aPTHv0v5Y"
        ## 不可用
        # "pt_pin": "jd_COXQQFzqpVtW",
        # "pt_key": "AAJnizbmADBmgx2zKBZzOQiDzfAc_w1YKJLckIau5lN_X04_CKVIbVL8_ap-mR-B4Ua92l02SHY"
        ## 可用批量
        "pt_pin": "jd_gAUwsCxtALiG",
        "pt_key": "AAJniTWmADDf4Ar2uJqYIJfqWfwv6xzHI6mZSX-Fp3B1dsBsTwlSoRf49JBzaUFINvCeSRN9xI8"
    }
    _sku_id = "10022039398507"
    # _order_id = "307843863375"
    _order_id = "309093899439"
    mo = MJDOrder(account=_account, sku_id=_sku_id, order_id=_order_id)
    # mo.run_create()
    pprint.pp(mo.run_select())
