import base64
import numpy as np
import cv2
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
    with open('captcha.png', 'wb') as f:
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


def download_sprite_image(resp):
    _url = "https://t.captcha.qq.com" + resp["data"]["dyn_show_info"]["sprite_url"]
    print(_url)
    load(_url)


def get_distance(original, jigsaw):
    def base64_to_image(base64_str):
        img_data = base64.b64decode(base64_str)
        nparr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        return img, img_rgb

    # 转换图片
    background, background_rgb = base64_to_image(original)
    slider, slider_rgb = base64_to_image(jigsaw)

    def preprocess_image(image):
        # 灰度化
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # 高斯模糊
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)

        # 边缘检测
        edges = cv2.Canny(blurred, 50, 150)

        # 形态学操作(开运算去除小干扰点)
        kernel = np.ones((3, 3), np.uint8)
        processed = cv2.morphologyEx(edges, cv2.MORPH_OPEN, kernel)

        return processed

    def find_shapes(image):
        # 预处理图像
        processed = preprocess_image(image)

        # 查找轮廓
        contours, _ = cv2.findContours(processed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        # 提取形状
        shapes = []
        for contour in contours:
            x, y, w, h = cv2.boundingRect(contour)
            shapes.append((x, y, w, h))

        return shapes

    def match_shape(background, slider):
        # 预处理背景图和滑块图
        background_processed = preprocess_image(background)
        slider_processed = preprocess_image(slider)

        # 多尺度匹配
        scales = [0.8, 1.0, 1.2, 1.5, 2.0]
        best_match = None
        best_confidence = 0

        for scale in scales:
            # 缩放滑块图
            scaled_slider = cv2.resize(slider_processed, None, fx=scale, fy=scale)
            h, w = scaled_slider.shape

            # 模板匹配
            result = cv2.matchTemplate(background_processed, scaled_slider, cv2.TM_CCOEFF_NORMED)

            # 获取匹配结果
            _, max_val, _, max_loc = cv2.minMaxLoc(result)

            # 更新最佳匹配
            if max_val > best_confidence:
                best_confidence = max_val
                best_match = (max_loc[0], max_loc[1], w, h, scale)

        return best_match, best_confidence

    # 1. 识别滑块图中的所有图形,并用轮廓标记
    slider_shapes = find_shapes(slider)
    slider_marked = slider_rgb.copy()
    for (x, y, w, h) in slider_shapes:
        cv2.rectangle(slider_marked, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # 显示滑块图中的图形
    cv2.imshow("Shapes in Slider Image", slider_marked)
    cv2.waitKey(0)

    # 2. 在背景图上找到缺口,并标记
    best_match, best_confidence = match_shape(background, slider)
    if best_match and best_confidence > 0.5:  # 置信度阈值
        match_x, match_y, w, h, scale = best_match

        # 在背景图上绘制缺口轮廓
        background_marked = background_rgb.copy()
        cv2.rectangle(background_marked, (match_x, match_y), (match_x + w, match_y + h), (0, 255, 0), 2)

        # 显示背景图上的缺口
        cv2.imshow("Gap in Background Image", background_marked)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

        # 3. 返回距离
        distance = match_x
        return distance
    else:
        print("未找到匹配的缺口位置")
        return None


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


# response = requests.get('https://t.captcha.qq.com/cap_union_prehandle', params=params, headers=headers)
# resp_json = json.loads(response.text[1:-1])
# pprint.pp(resp_json)

# download_bg_image(resp_json)
# download_sprite_image(resp_json)
# sess = resp_json["sess"]
# init_pos = get_init_pos(resp_json)

bg_base64 = image_to_base64("image_1.png")
jg_base64 = image_to_base64("image_0.png")

print(get_distance(bg_base64, jg_base64))

# load("https://t.captcha.qq.com/cap_union_new_getcapbysig?img_index=1&image=02bd270000fb883f0000000bb5d1ac9e32bb&sess=s0WQX03uQUOxrHUH4MRNzpiJdI4Jqi_vdpydFnYPmvZHx7X3lNPHfoV1tStDwnBvXaJyNd_hFyDVmzO6hekaHe8QCUw3cMq7lGHXl5h9-qZQfRarAd9z17Yytp3sdlfHs8OU_ea_lJOdsKP3oNxdvj-ti6oHKgZ71xm2j3AD5j9BT0ja-ivt33aKubUIn2DmRzlG1WkDrETC_Epq_IvNJ67CyfYv0M_Fb2OBNGOiFCXaVegHU3drbNE47PgaPXCwkTclxJkO2vd1IkG_rxb_WH0Esu_OLhMA6iOkQqbeULOEGc1yhdEyxPVzPxmspnxdquxAAjSb2Ig2S9tQeESZagiQPl3wfw4qBzXrCjnGirmvK4rR7VmKZZ2-3r4pKOCr_ZvyOF2V20uxRd5HnrGkehmE2C1tsodMS-7B2MVKfQDK8cmXohlcmCGixV3E6eqEbmoTKgxOBjnDsGome-S8yB9Pz2hp-owlqTNANtyNsw3g2QxwLOIZWpFax7Skm0XK2ViNwo4N2_szDSgd1uJB84D7kBtGSdlDOS8qc1qzzrrHU*")

