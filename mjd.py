# -*- coding: utf-8 -*-

import time
from urllib.parse import urlencode

from log import log_info, log_error
from mjd_base import MJDBase


# 查询链接   https://recharge.m.jd.com/orderDetail?orderId=307843863375&serviceType=3&source=41


class MJDOrder(MJDBase):
    def __init__(self, account, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.get_account_setting(account=account)

    @staticmethod
    def handle_post_data(post_data):
        return urlencode(post_data).replace("%2A", "*").replace("%27", "%22").replace("+", "")

    # 订单
    def create_new_order(self, sku_id):
        ...

    # 链接
    def get_payment_link(self):
        headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        params = "ticket=t03lrRZlXMVbb_95PW_tvAzEh9__sb3RRgNBqYalXWqDZQiwL5MR52_xvoSdeR7jv8D6lZP3VLP0DD0SMNUSgnAF6QT-R96ccBCkKtiEn1160U89Tyz3m0vPF10eNFuVYx3EEdNdDjZYa9QKCGGE_7a12Vie2uPzdqoPn2JAkFpoXzbRsc4nTZIXbXFwJmsR1rlhk49aY1a_Xj5td2M27BNktzTVZkEoVLrMRJSKXOgTLeCMCe0h6C3GUeX5B5aipVJ_BB7-aQCtaK9PH5-erxR-gPYC9gBevCZG21BhJDw7MFhtQ5LmnY4dQ**&randstr=@we4&prepayid=wx151147311743109a352c1ee801b0c40000&package=2680933601"
        response = self.get_response(
            'https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkcaptcha?ticket=t03lrRZlXMVbb_95PW_tvAzEh9__sb3RRgNBqYalXWqDZQiwL5MR52_xvoSdeR7jv8D6lZP3VLP0DD0SMNUSgnAF6QT-R96ccBCkKtiEn1160U89Tyz3m0vPF10eNFuVYx3EEdNdDjZYa9QKCGGE_7a12Vie2uPzdqoPn2JAkFpoXzbRsc4nTZIXbXFwJmsR1rlhk49aY1a_Xj5td2M27BNktzTVZkEoVLrMRJSKXOgTLeCMCe0h6C3GUeX5B5aipVJ_BB7-aQCtaK9PH5-erxR-gPYC9gBevCZG21BhJDw7MFhtQ5LmnY4dQ**&randstr=@we4&prepayid=wx151147311743109a352c1ee801b0c40000&package=2680933601')

    # 查询
    def get_order_detail(self, order_info):
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
            "source": 41,
            "orderId": order_info["orderId"],
            "version": "1.10",
            "rechargeversion": "12.8",
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
            log_error(f"查询订单详情失败 订单ID：{order_info['orderId']} 返回数据：{resp_json}")
            raise ValueError

        card_infos = resp_json["result"].get("cardInfos")
        if not card_infos:
            log_error(
                f"订单 {order_info['orderId']} 获取账号密码失败, 返回数据：{resp_json}, 订单查询链接：https://recharge.m.jd.com/orderDetail?orderId={order_info['orderId']}&serviceType=3&source=41")
            raise ValueError

        card_dict = self.decrypt_des(encrypted_data=card_infos, key=self.qq_game_des_key)
        print(card_dict[0])
        return card_dict[0]


if __name__ == '__main__':
    account = {
        "pt_pin": "zhq91513",
        "pt_key": "AAJnhh0eADBEwGwoFKU_L3A6W0jtMPQsGmYAFoVbP5bkNmpOgX26we0e3q3b0sGmp-aPTHv0v5Y"
    }
    mo = MJDOrder(account)
    # mo.get_tk_rd()
    mo.get_order_detail({"orderId": "307843863375"})
