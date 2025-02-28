import base64

import cv2
import numpy as np
from PIL import Image
from curl_cffi import requests

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


def load(url):
    _headers = {
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
    response = requests.get(url=url, headers=_headers)
    with open('image_sg_full.png', 'wb') as f:
        f.write(response.content)


def get_init_pos(resp):
    for item in resp["data"]["dyn_show_info"]["fg_elem_list"]:
        if item["id"] == 1:
            return item["init_pos"]


def get_bg_image(resp):
    return "https://t.captcha.qq.com" + resp["data"]["dyn_show_info"]["bg_elem_cfg"]


def download_bg_image(resp):
    _url = "https://t.captcha.qq.com" + resp["data"]["dyn_show_info"]["bg_elem_cfg"]["img_url"]
    print(_url)
    load(_url)


def download_sg_image(resp):
    _url = "https://t.captcha.qq.com" + resp["data"]["dyn_show_info"]["sprite_url"]
    print(_url)
    load(_url)


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


def get_distance(bg, sg):
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
                  (int(final_x), 0),  # Y 轴起始位置为 self.init_y
                  (int(final_x + slider_width), 0 + slider_height),
                  # Y 轴结束位置为 self.init_y + slider_height
                  (0, 255, 0), 2)  # 绿色矩形框，线宽为 2

    # 保存标记后的图片
    cv2.imwrite("image_mark.png", cv2.cvtColor(result_img, cv2.COLOR_RGB2BGR))

    return int(final_x - 0.5) - 2  # 保留3位小数


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


# load("https://t.captcha.qq.com/cap_union_new_getcapbysig?img_index=0&image=02bd27000000000e0000000bb9ec09cf3836&sess=s0HEW_1vV7hPOcxEGv55jnGGXJHhRv7lUgpmE79TncviPnNTDM7bIZ8fd8xWOyNHpSzaRJvjZhIOiWlorI0fFtNbJSDpuzMiwMgGbOkJq3mO6LUYGVh3O-oY3YQn7XmIwUYXJot2YpHqxhdrnBAHXrm0hPiqzBwlAjeDhEEwjpFIgiDJ-hQ0qbHFOHJAJMtgsSJYhUHu_tOagX0VmB2H0LD2dkeKec2wmdTD8X7C2jgkTmUhFKCdbPAXC6rC8drM1SkNqstd9MFUSZOYRNQX09euOTdhnRIUKr0TwqDNsSkhTmdcVxUzMXgzptZkz5HgX0cyZaXvlq3RBzUnIrPH5RrgvooRcxMjMQWcCrD3GMawy77n3WxhDxW9nrj8xkW1TnKiroCrf6nTeinD0Jiv1ICrnD6XK4uMD4Y40zV1H9xnY9Lq3PwKfVV-b9Q67qQSMN_gPhp53khlH3QrXOmyW9dBL9PT3_iTNNfN3szzH-iZls1Q_RInxcd16XePi1ULUk4MhH56FvXEvIF-gOAYwoEyVizC2MhnmHKcJubEJFLOh7jjEvHYDKIQ**")

# cut_image()
_bg = image_to_base64("image_bg.png")
_sg = image_to_base64("image_sg.png")
print(get_distance(_bg, _sg))
