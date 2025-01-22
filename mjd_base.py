# -*- coding: utf-8 -*-

import base64
import hashlib
import json
import random
from typing import Union

import execjs
from Crypto.Cipher import DES
from Crypto.Util.Padding import unpad
from curl_cffi import requests

from plugins.redis_ctl import RedisCtrl


# 适应版本
# js_security_v3_0.1.5
# h5_file_v5.0.2   2024.12.28
# h5_file_v5.0.3   2025.01.10
# h5_file_v5.0.4   2025.01.20

# 基类执行逻辑
# - ? 初始化设备信息
# - 初始化加密模型
# - 初始化代理
# - 初始化入参账号/session
# - 获取pt_token/更新session
# - 初始化请求体

# 必须参数
# pt_pin   来源   cookie
# pt_key   来源   cookie
# pt_token   来源   cookie   验证码登陆时服务器返回的/风控账号必须带
# WQ_dy1_tk_algo   来源   /request_algo请求结果  保存在localStorage   解析后得到 tk/rd

# redis 账号状态status  初始状态 None, 0 不可用, 1 可用

# TODO
# 破解滑块验证
# 自动创建设备指纹
# 自动更新tk/rd
# 摸清 eid_token 变化


class MJDBase(object):
    def __init__(self, *args, **kwargs):
        self.redis = RedisCtrl()
        self.redis_key = None

        # 版本变化数据
        self.h5_version = "h5_file_v5.0.4"  # 每次10天左右会变化版本，modules源码也会跟着变

        self.qq_game_des_key = "2E1ZMAF88CCE5EBE551FR3E9AA6FF322"  # 不变

        self.modules = self.init_modules()
        self.proxies = self.get_proxies()
        self.pt_pin = None
        self.pt_key = None
        self.session = None
        self.result = None
        self.device_info = None
        self.body_info = {
            "version": "1.10",
            "rechargeversion": "12.8",
            "source": 41,
            "orderSource": 41
        }
        self.extend_info = None

    @staticmethod
    def generate_device():
        device_list = [
            ({
                 "fp": "rp3rwp3xadcswp82",
                 "tk": "tk03wbaec1bec18nxgtFBtl5SefPWIfzafzFnR0Ow6pV5oBhoZL3v3bUv820BaLFJaaCBUYr1I-dJ4PhDIAZvc_wXY6Y",
                 # 首次生成后可保存一段时间
                 "rd": "AZragq46so1R",  # 首次生成后可保存一段时间
                 "ai": "8e94a",  # appId
                 "time_range": "69",  # js版本固定值,跟随版本变化
                 "canvas": "0fb7f119e21bb6b17b2b0d333a5617bf",
                 "webglFp": "9ef6901beacde53c5b05944cce35c114",
                 "ccn": 20,  # 待确认, 可能跟JS版本变化
                 "uuid": "1736842420917134647434",  # 任意
                 "screen": "1920*1080",
                 "eid": "6GW2Z3HU2M3GXJOWMDRZJG5OASMRDUS3MHOPOX6AIX6N7R2PH4MYVOHA2OK2MS3CDPEWHKTDG6K6Q6TR4IX4PVYMNQ",
                 "eid_token": "jdd036GW2Z3HU2M3GXJOWMDRZJG5OASMRDUS3MHOPOX6AIX6N7R2PH4MYVOHA2OK2MS3CDPEWHKTDG6K6Q6TR4IX4PVYMNQAAAAMURT5GIVAAAAAACOEXE3EX444P5AX",
             },
             {
                 "wd": 0,
                 "l": 0,
                 "ls": 5,
                 "wk": 0,
                 "bu1": "0.1.5",
                 "bu2": -2,
                 "bu3": 54,
                 "bu4": 0,
                 "bu6": 4,
                 "bu7": 0,
                 "bu8": 0,
                 "bu10": 5,
             }),
            # ({
            #      "fp": "pssrxw3cas9ppdp6",
            #      "tk": "tk03w47721a5f18nD3W1N7q3j75HS-W671Vb8eEGmKv88EmOb_ai-xKQksOwetT4Rb9HB-l1w3k52vATm5H_2VeiSjGW",
            #      # 首次生成后可保存一段时间
            #      "rd": "YFUCksVCWZCy",  # 首次生成后可保存一段时间
            #      "ai": "8e94a",  # appId
            #      "time_range": "69",  # js版本固定值,跟随版本变化
            #      "canvas": "266177719f89196f322a77fd545a27b4",
            #      "webglFp": "7629c8bf40a41d50c3d885757469e120",
            #      "ccn": 8,  # 待确认, 可能跟JS版本变化
            #      "uuid": "17373966696341707200910",  # 任意
            #      "screen": "1920*1080",
            #      "eid": "4GXYWFHAME4QBRPEKUTD4O2FO5DZGN7KNP2RQ7YFGHUAGCSK4VQBLHKOM3WZGHA4LLHFPCHGC6LQIP5P3QJ6UNP6VQ",
            #      "eid_token": "jdd034GXYWFHAME4QBRPEKUTD4O2FO5DZGN7KNP2RQ7YFGHUAGCSK4VQBLHKOM3WZGHA4LLHFPCHGC6LQIP5P3QJ6UNP6VQAAAAMURGQNFAIAAAAAD7MGIYXKUNTAAQX",
            #  },
            #  {
            #      "wd": 0,
            #      "l": 0,
            #      "ls": 5,
            #      "wk": 0,
            #      "bu1": "0.1.5",
            #      "bu2": 0,
            #      "bu3": 54,
            #      "bu4": 0,
            #      "bu6": 4,
            #      "bu7": 0,
            #      "bu8": 0,
            #      "bu10": 5,
            #  })
        ]
        return random.choice(device_list)

    def redis_initial_account(self):
        # 检查账号是否存在
        if not self.redis.exists(self.redis_key):
            device = self.generate_device()
            self.device_info = device[0]
            self.extend_info = device[1]
            initial_data = {
                "status": None,  # 初始状态 None, 0 不可用, 1 可用
                "device_info": self.device_info,
                "extend_info": self.extend_info,
            }
            self.redis.set(self.redis_key, json.dumps(initial_data))
        else:
            account_cache = json.loads(self.redis.get(self.redis_key))
            self.device_info = account_cache["device_info"]
            self.extend_info = account_cache["extend_info"]

    def redis_update_account(self, field, value):
        _cache = json.loads(self.redis.get(self.redis_key))
        if _cache:
            _cache[field] = value

            # 将更新后的字典写回 Redis
            self.redis.set(self.redis_key, json.dumps(_cache))

    def return_info(self, code, **kwargs):
        # 定义错误码映射
        error_code_mapping = {
            0: "账号不可用",
            1: "成功",
            2: "SKU详情问题/SKU失效/SKU不可下单",
            3: "初始化订单失败",
            4: "获取支付信息失败",
            5: "获取支付链接失败",
            6: "获取订单详情失败",
            7: "获取卡密失败",
            8: "出现风控",
            9: "redis缓存错误",
            10: "代理出错",
            11: "未知错误",
            12: "验证码校验失败",
            13: "账号与订单号不匹配",
            14: "获取微信支付信息失败",
            15: "微信支付参数缺失",
            16: "提取支付信息失败",
            17: "获取验证码信息失败",

        }

        # 确保 code 是整数，避免因字符串 key 导致的 KeyError
        code = int(code)

        # 更新 Redis 中的账号状态，如果 code 为 0
        if code == 0:
            self.redis_update_account("status", 0)
        if code == 1:
            self.redis_update_account("status", 1)

        # 组装返回结果
        self.result = {
            "code": code,
            "msg": error_code_mapping.get(code, "未知错误代码"),  # 增加默认错误信息，避免未定义的 code 抛出 KeyError
            "sku_id": getattr(self, "sku_id", None),  # 使用 getattr 避免属性不存在时抛出异常
            "order_id": getattr(self, "order_id", None),
            "payment_link": kwargs.get("payment_link", None),
            "order_time": kwargs.get("order_time", None),
            "order_status": kwargs.get("order_status", None),
            "card_account": kwargs.get("card_account", None),
            "card_password": kwargs.get("card_password", None),
        }

    @staticmethod
    def init_modules():
        # 读取本地 JavaScript 文件内容
        with open('h5st.js', 'r', encoding='utf-8') as file:
            js_code = file.read()
        return execjs.compile(js_code)

    def get_proxies(self):
        return None

    def get_account_setting(self, account):
        self.pt_pin = account["pt_pin"]
        self.pt_key = account["pt_key"]
        self.redis_key = f"mjd_{self.pt_pin}"
        self.redis_initial_account()
        self.session = self.get_session()

    def generate_cookies(self):
        cookie_dict = {
            'pt_pin': self.pt_pin,
            'pt_key': self.pt_key,
        }
        return cookie_dict, self.generate_headers()

    @staticmethod
    def generate_headers():
        return {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9',
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

    def get_session(self):
        session = requests.Session()
        cookies, headers = self.generate_cookies()
        session.cookies.update(cookies)
        session.headers.update(headers)
        return session

    def get_response(self, url, params=None, json_data=None, data=None, allow_redirects=False):
        try:
            if not json_data and not data:
                if self.proxies:
                    response = self.session.get(url=url, params=params, proxies=self.proxies,
                                                allow_redirects=allow_redirects)
                else:
                    response = self.session.get(url=url, params=params, allow_redirects=allow_redirects)
            else:
                if self.proxies:
                    response = self.session.post(url=url, params=params, json=json_data, data=data,
                                                 proxies=self.proxies, allow_redirects=allow_redirects)
                else:
                    response = self.session.post(url=url, params=params, json=json_data, data=data,
                                                 allow_redirects=allow_redirects)
            response.raise_for_status()
            return response
        except Exception as e:
            print(e)

    def device_eid_token(self):
        return self.device_info["eid_token"]

    def generate_clt_str(self):
        input_clt_dict = {
            "sua": "Windows NT 10.0; Win64; x64",
            "pp": {
                "p1": self.pt_pin,
            },
            "extend": self.extend_info,
            "pf": "Win32",
            "random": "lWSQofglt7E",
            "v": self.h5_version,
            "canvas": self.device_info["canvas"],
            "webglFp": self.device_info["webglFp"],
            "ccn": self.device_info["ccn"],
            "fp": self.device_info["fp"]
        }
        return json.dumps(input_clt_dict, indent=2, ensure_ascii=False)

    def generate_expand_params_str(self):
        input_expand_params_dict = {
            "wc": 0,
            "wd": 0,
            "l": "zh-CN",
            "ls": "zh-CN,zh,en,ko",
            "ml": 2,
            "pl": 5,
            "av": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "sua": "Windows NT 10.0; Win64; x64",
            "pp": {
                "p1": self.pt_pin
            },
            "extend": self.extend_info,
            "pp1": "",
            "bu1": "Error: test err\n    at window.__MICRO_APP_ENVIRONMENT_TEMPORARY__.window.__MICRO_APP_ENVIRONMENT__.window.__MICRO_APP_PROXY_WINDOW__.window.__MICRO_APP_BASE_APPLICATION__.window.document.querySelector (https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.5.js:5:8246)\n    at https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:12099:25\n    at Array.map (<anonymous>)\n    at preload (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:12084:27)\n    at https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:12129:45\n    at T$1 (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:239:10)\n    at Vk (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:6943:14)\n    at Uk (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:6599:12)\n    at Tk (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:6592:5)\n    at Ik (https://storage.360buyimg.com/dlxt/recharge/2d8254d/assets/index-0487cad1.js:6575:7)",
            "w": 1536,
            "h": 864,
            "ow": 1536,
            "oh": 816,
            "url": "https://recharge.m.jd.com/orderDetail?orderId=307843863375&serviceType=3&source=41",
            "og": "https://recharge.m.jd.com",
            "pf": "Win32",
            "pr": 1.25,
            "re": "https://trade.m.jd.com/",
            "random": "E569gDVdRr",
            "referer": "https://trade.m.jd.com/",
            "v": self.h5_version,
            "bu2": "    at https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.5.js:5:77173",
            "canvas": self.device_info["canvas"],
            "canvas1": self.device_info["canvas"],
            "webglFp": self.device_info["webglFp"],
            "webglFp1": self.device_info["webglFp"],
            "ccn": self.device_info["ccn"],
            "ai": "8e94a",
            "fp": self.device_info["fp"],
            "wk": 0
        }
        return json.dumps(input_expand_params_dict, indent=2, ensure_ascii=False)

    def generate_expand_params(self, input_expand_params_str):
        return self.modules.call("generate_clt", input_expand_params_str)

    @staticmethod
    def generate_body_str(data):
        # 如果body是字典，先转换成字符串
        if isinstance(data, dict):
            data = json.dumps(data, separators=(',', ':'))
        # 计算SHA256
        data = hashlib.sha256(data.encode()).hexdigest()
        return data

    def generate_h5st(self, device_info, func_api, input_clt_str, api_query_time, body_str):
        return self.modules.call("generate_h5st", device_info, func_api, input_clt_str, api_query_time, body_str)

    def generate_tk_rd(self, wq_dy1_tk_algo):
        return self.modules.call("get_tk_rd", wq_dy1_tk_algo)

    def get_tk_rd(self):
        ...

    @staticmethod
    def decrypt_des(encrypted_data: str, key: str, mode: str = 'ECB') -> Union[dict, None]:
        """
        DES解密并解析JSON，支持多种模式

        Args:
            encrypted_data: 加密的数据
            key: 解密密钥
            mode: 加密模式 ('ECB', 'CBC', 等)

        Returns:
            解密并解析后的字典数据，如果失败返回None
        """
        try:
            # 确保key长度为8字节
            key = key.encode('utf-8')[:8].ljust(8, b'\0')

            # base64解码
            encrypted_bytes = base64.b64decode(encrypted_data)

            if mode == 'ECB':
                cipher = DES.new(key, DES.MODE_ECB)
            elif mode == 'CBC':
                # 如果使用CBC模式，需要IV
                iv = b'\0' * 8  # 替换为实际的IV
                cipher = DES.new(key, DES.MODE_CBC, iv)
            else:
                raise ValueError(f"Unsupported mode: {mode}")

            # 解密数据
            decrypted_data = cipher.decrypt(encrypted_bytes)

            # 使用PKCS7 unpadding
            decrypted_data = unpad(decrypted_data, DES.block_size)

            # 转换为文本
            decrypted_text = decrypted_data.decode('utf-8')

            # 解析JSON
            return json.loads(decrypted_text)
        except Exception as e:
            print(f"Decryption error: {str(e)}")
            return None


if __name__ == '__main__':
    mj = MJDBase()
    print(mj.generate_tk_rd(
        ""))
