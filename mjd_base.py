# -*- coding: utf-8 -*-

import base64
import hashlib
import json
import pprint
import time
from typing import Union

import execjs
from Crypto.Cipher import DES
from Crypto.Util.Padding import unpad
from curl_cffi import requests

from log import log_info, log_error

# 适应版本
# js_security_v3_0.1.5
# h5_file_v5.0.3

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
# pt_token   来源   cookie   验证码登陆时服务器返回的
# WQ_dy1_tk_algo   来源   /request_algo请求结果  保存在localStorage   解析后得到 tk/rd

"""测试值"""
pt_token = "9z7etm7i"  # 更新登录, 更新值
_fingerprint = "rp3rwp3xadcswp82"  # 更新登录, 更新值
webglFp = "9ef6901beacde53c5b05944cce35c114"  # 更新登录, 更新值

tk = "tk03w83c51add18nNU2lohe76y3Bu3PAGifl8BNIzSujy_06yz0neD2AkEfBBEYiKWZ5OQB48L2JHAV6O5VdrWp8-o_j"  # 请求request_algo/写入localStorage, 更新值
rd = "5IuTzxRo1By4"  # 请求request_algo/写入localStorage, 更新值

# 每次请求, 更新值
eid_token = "jdd036GW2Z3HU2M3GXJOWMDRZJG5OASMRDUS3MHOPOX6AIX6N7R2PH4MYVOHA2OK2MS3CDPEWHKTDG6K6Q6TR4IX4PVYMNQAAAAMUNF6SL7IAAAAADOJD53HJ7WRW2AX"


class MJDBase(object):
    def __init__(self, *args, **kwargs):
        self.qq_game_des_key = "2E1ZMAF88CCE5EBE551FR3E9AA6FF322"
        self._app_id = "8e94a"  # 不变
        self._fingerprint = _fingerprint  # 每次登录会变化
        self.webglFp = webglFp  # 每次登录会变化
        self.canvas = "0fb7f119e21bb6b17b2b0d333a5617bf"  # 不变
        self.modules = self.init_modules()
        self.proxies = self.get_proxies()
        self.pt_pin = None
        self.pt_key = None
        self.session = None
        self.device_info = {
            "fp": self._fingerprint,
            "tk": tk,  # 首次生成后可保存一段时间
            "rd": rd,  # 首次生成后可保存一段时间
            "ai": self._app_id,  # appId
            "time_range": "72",  # js版本固定值,跟随版本变化
            "canvas": self.canvas,
            "webglFp": self.webglFp,
            "bu3": 54,
            "ccn": 20,
            "uuid": "1736842420917134647444",  # 任意
            "screen": "1920*1080",
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
        self.session = self.get_session()
        self.get_pt_token()

    def get_pt_token(self):
        self.session.cookies.update({'pt_token': pt_token})
        log_info(f"初始化账号：{self.pt_pin} 成功")

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

    @staticmethod
    def device_fingerprint():
        return eid_token

    def generate_clt_str(self):
        input_clt_dict = {
            "sua": "Windows NT 10.0; Win64; x64",
            "pp": {
                "p1": self.pt_pin,
                "p2": self.pt_pin,
            },
            "extend": {
                "wd": 0,
                "l": 0,
                "ls": 5,
                "wk": 0,
                "bu1": "0.1.5",
                "bu10": 3,
                "bu2": -2,
                "bu3": 54,
                "bu4": 0,
                "bu5": 0,
                "bu6": 4,
                "bu8": 0
            },
            "pf": "Win32",
            "random": "kA5xZLSc8J",
            "v": "h5_file_v5.0.3",
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
            "extend": {
                "wd": 0,
                "l": 0,
                "ls": 5,
                "wk": 0,
                "bu1": "0.1.5",
                "bu10": 3,
                "bu2": 0,
                "bu3": 54,
                "bu4": 0,
                "bu5": 0,
                "bu6": 4,
                "bu8": 0
            },
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
            "v": "h5_file_v5.0.3",
            "bu2": "    at https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.5.js:5:77173",
            "canvas": self.canvas,
            "canvas1": self.canvas,
            "webglFp": self.webglFp,
            "webglFp1": self.webglFp,
            "ccn": 20,
            "ai": self._app_id,
            "fp": self._fingerprint,
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
        headers = {
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://recharge.m.jd.com',
            'Pragma': 'no-cache',
            'Referer': 'https://recharge.m.jd.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'accept': 'application/json',
            'content-type': 'application/json',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }

        expand_params = self.generate_expand_params(self.generate_expand_params_str())
        print(expand_params)

        json_data = {
            'version': '5.0',
            'fp': self._fingerprint,
            'appId': self._app_id,
            'timestamp': int(time.time() * 1000),
            'platform': 'web',
            'expandParams': "YlyXpZ3L3tj83ZXRPp3RjNm8pUDLmYy9mNT710m94QXRfRX9zQXR5xZO3VTMgFTL3Z3L31DB3ZXRPpXNnZ3L3hjB2QXR5xZO3JGNoNDMmFjB2IWMgFWN3EmBmFGA1MDB0QDNp12MzEDL3Z3L3VW9TojA3Ej83ZXRPp3RlVGN2EmN0MjBlJGLkZ2BkNjNkFTA2UDA3UWNgB2A002R5x2RpAV_yQDAiQXR5xZO3BzBiV2MkVjNmNWApRzN38GN3A2B3U2N00GNoBjM3ATN3Z3L3Vm94Ay_4MzR5Z3XtR3A38GNjFGBmNmN1Y2BnRjMoRzM3QDNnFDLoV2AiRzApRXRfRn94Ay_4MzR5Z3XtRnNiVmMixGMfNy-rF2OohXN6M2860S8wQC82Ej96My-qRCAr0DBlgj_2QDAicH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8xYX84YXR5Z3R5x2RnFyB3ZXRPp3RmhXNrF286ET_wAjCk5zR5x2RjQXR5xZO3RXRfR390QCAzEz93ZXRPp3RPAF8gMEInY27iRXRfRH_qIz_4QyR5Z3XtR3R5x2R0QyR5Z3XtF2NrVWRfR39pQXR5xZO3RmNr0jE3Z3L3BT93ZXRPp3RscjBrJz-rlzO08z944jB0QiOqxm9pIS8xQXRfRnAqQXR5xZO3VWMcFjBnEi_mAnNcFT9gIEA20z8nEj9zFmMmN2MhNWMh9WNmlWAQQCA1Qi_apD-4ICAVQCA1Qi_qlj_2gXAvgH_rFjAnUT-2Ez9qd3LmYS8l4zR5x2RtQC83ZXRPp3Mo5WRfRX-qQXR5xZOjNGMoZ3L39i_3ZXRPpXMj5WRfRX-3ZXRPp3MmFGN5x2RiQXR5xZO31nMfFmMkB2LmwzOoJDB28WLlZGOhETAr0jOmICAmMCBqJTMkRWL1QmO08z944jB0QiOl4S_1cH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRu0VRlUTR5ZXRroEPkx2NgF2MfNy-rVWA4MjMhJWNs5CA1gD-qNS80Mi94cXAlF2NhJzNqFjAnUT-2Ez9qJS7tIjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5tTE5JCB5ZXR5hTCwRGNf1GLkB2LmwzOoJDB28WLlZGOhETAr0jOmICAmMCBqJTMkRWL1QmO08z944jB0QiOl4S_1cH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRuEURlUTR5ZXRroEPlV2LmJGLjxm9vgHN1UjBi5WMplX70Iz_wcn9lEj9mUjO1IGMn5WAndHAyQCBxMDAncX8hoTAqlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZn-DYX84YXR5Z3_90XNoxGLmR2LmwzOoJDB28WLlZGOhETAr0jOmICAmMCBqJTMkRWL1QmO08z944jB0QiOl4S_1cH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRoJXE5JCB5ZXR5hTCkJ2LgRGNnV2LmwzOoJDB28WLlZGOhETAr0jOmICAmMCBqJTMkRWL1QmO08z944jB0QiOl4S_1cH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8xYX84YXR5Z3_90nMnxWMhZ2Noxm9vgHN1UjBi5WMplX70Iz_wcn9lEj9mUjO1IGMn5WAndHAyQCBxMDAncX8hoTAqlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZXA4cT_0QS95JCB5ZXR5hTCwhm9kcD_ggj_rUTKxZX94kzOgUz9nUVRlUTR5ZXRroEMnxGLgZ2Noxm9vgHN1UjBi5WMplX70Iz_wcn9lEj9mUjO1IGMn5WAndHAyQCBxMDAncX8hoTAqlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-5JCB5ZXR5hTCwBWMn52Lkxm9vgHMrV2OpdkNjcE7l0z9kMDAmck9vc390gD-4Iy_qMzB08iOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5Ri_lMDAtEjFgQCAkUyOlgDAsEiBqIzOicTAr0j8rdkCLcFHFUlJQoVFJUlCUMEJXcUFJUlCKQkJQklC6gn8qIz_w8yO6ckEKI1GQ8kCA4kGHYkCJYEJ6c1FW0FG6c0OicTAr0j8rdkCFgFIMglGH01ELElCJYEJ6c1FW0FG6c0OicTAr0j8rdkCAQEJHcVFMEVE6I0GUk1GKQEHDgFI6YUFYckGHMFHMckCr9i_1gD-iYX84YXR5Z3_9Qy90YX8mET85x29qQy9UQXRfRHNkQzR5Z3XtR3R5x2RoZS93ZXRPpH65Z3XpZ3L35G83QXR5ZXRPpXM5x2RjFyB3ZXR5Z3XtZWRfRHMkQzR5ZXR5xZOpZ3L3JG83QXR5ZXRPpXMkZ3L3NG83QXR5ZXRPpXN5x2RnFyB3ZXR5Z3XtNWRfRXNoFyB3ZXR5Z3XtRHMrV2OpRXRfRHNkQzR5ZXR5xZOpZ3L3tj83ZXR5Z3XtFWRfRn9tQXR5ZXRPpXN5x2RtQXR5ZXRPpXN5x2R18yR5ZXR5xp75x2R1gDAl4CA3ZXRPpH65Z3X3NGNkVGLo4z73Z3L3VW93ZXR5Z3XeY3L3ZS93ZXRPp3RlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jE3Z3L3VD8mQXR5xZO3BmNr9mNkdH-nUzA4MURphXNrZ2OoNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrFmO4oT_wwi_MQXRfRHBkQXR5xZO3BmNr9mNkdH-nUzA4MURphXNrZ2OoNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrF2R5x2RjUzR5Z3XtFWRfRX_pQXR5xZOnZ3L3pD_3ZXRPp3RqsTOrETOxwSOLMFOxwyR5x2RmozR5Z3XtR3GWkX-fQXRfRX_3ZXRPpXN5x2R18yR5Z3XtZWRfRnBiQXR5xp7",
            'fv': 'h5_file_v5.0.3',
            'localTk': 'tk04w72d1875241lMiszZHhYSnpUXR5Mm9S940m9pQiN24SAgNCBZZJZFLjlr_7Enl1OkY18ws1NxR0_EMDAhN2MmBjN',
        }

        response = requests.post('https://cactus.jd.com/request_algo', headers=headers, json=json_data)
        pprint.pp(response.json())

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
        "eyJ0ayI6InRrMDN3ODNjNTFhZGQxOG5OVTJsb2hlNzZ5M0J1M1BBR2lmbDhCTkl6U3VqeV8wNnl6MG5lRDJBa0VmQkJFWWlLV1o1T1FCNDhMMkpIQVY2TzVWZHJXcDgtb19qIiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSc1SXVUenhSbzFCeTQnO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uTUQ1KHN0cik7fSJ9"))
