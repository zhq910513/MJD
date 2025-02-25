# encoding: utf-8

from curl_cffi import requests


def test_create():
    # 定义 API URL
    url = "http://127.0.0.1:8000/create_order"

    # 发送 POST 请求
    response = requests.post(url, json=payload)

    # 打印响应
    if response.status_code == 200:
        print(response.json())
    else:
        print(f"请求失败，状态码: {response.status_code}, 错误信息: {response.text}")


if __name__ == '__main__':
    # 定义请求数据
    payload = {
        "account": {
            "pt_pin": "zhq91513",  # 替换你的账号
            "pt_key": "AAJnrKaVADChKF-KgRvGcEk7VPe_YVZhcoNuzwgpeZfRLxz07Tg58KCpxB3WXCBz-T63lC4Oxqk"  # 替换你的账号
        },
        "sku_id": "10022039398507",
    }
    test_create()
