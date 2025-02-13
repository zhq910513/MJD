#!/usr/bin/python3
# -*- coding: utf-8 -*-

import time

from curl_cffi import requests

from settings import PROXY_API, PROXY_USR, PROXY_PWD

# API链接    后台获取链接地址
proxyAPI = PROXY_API
proxyusernm = PROXY_USR
proxypasswd = PROXY_PWD


def get_proxies(retry=1):
    try:
        # 获取IP
        resp = requests.get(proxyAPI)
        time.sleep(3)
        if resp.status_code == 200 and resp.json().get("success"):
            for info in resp.json().get("result"):
                ip_info = {
                    "proxies": {
                        'http': "http://" + proxyusernm + ":" + proxypasswd + "@" + info["ip"] + ":" + "%d" % info[
                            "port"],
                        'https': "http://" + proxyusernm + ":" + proxypasswd + "@" + info["ip"] + ":" + "%d" % info[
                            "port"]
                    },
                    "end_time": info.get("ltime")
                }
                if check_proxies(ip_info):
                    print(f"代理可用,剩余时长 {ip_info['end_time'] - int(time.time())} 秒   {ip_info['proxies']}")
                    return ip_info["proxies"]
                else:
                    if retry < 3:
                        return get_proxies(retry=retry + 1)
                    else:
                        return None
        else:
            if "访问频率过快惩罚截止时间" in resp.json().get("message"):
                print(resp.json().get("message"))
            else:
                print(resp.json())
            return None
    except Exception as error:
        print(error)


def check_proxies(ip_info):
    check_url = "https://m.jd.com"
    response = requests.get(check_url, proxies=ip_info["proxies"], timeout=5)
    if response.status_code == 200:
        return True
    return False
