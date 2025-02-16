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


def get_distance(image_path):
    """
    计算验证码图片中缺口到左侧边缘的距离,并绘制缺口轮廓
    :param image_path:
    图片路径 :
    return: 缺口到左侧边缘的距离
    """
    # 1. 加载图片
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("图片加载失败,请检查路径是否正确")

    # 2. 灰度化
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 3. 高斯模糊,减少噪声
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # 4. 边缘检测
    edges = cv2.Canny(blurred, threshold1=50, threshold2=150)

    # 5. 轮廓检测
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # 6. 过滤轮廓,找到缺口
    gap_contour = None
    max_area = 0
    for contour in contours:
        # 计算轮廓面积
        area = cv2.contourArea(contour)
        # 过滤掉面积过小的轮廓
        if area < 100:
            continue
        # 找到面积最大的轮廓
        if area > max_area:
            max_area = area
            gap_contour = contour

    if gap_contour is None:
        raise ValueError("未检测到缺口")

    # 7. 计算缺口的最左侧点
    leftmost_point = tuple(gap_contour[gap_contour[:, :, 0].argmin()][0])

    # 8. 计算距离
    gap_distance = leftmost_point[0]

    # 9. 绘制缺口轮廓
    cv2.drawContours(image, [gap_contour], -1, (0, 255, 0), 1)  # 绿色轮廓,线宽为2

    # 10. 标记最左侧点
    cv2.circle(image, leftmost_point, 5, (0, 0, 255), -1)  # 红色圆点标记最左侧点

    # 11. 显示结果图片
    cv2.imshow("Result", image)
    cv2.waitKey(0)  # 等待按键
    cv2.destroyAllWindows()  # 关闭所有窗口

    return gap_distance


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

print(get_distance("image_1.png"))

# load("https://t.captcha.qq.com/cap_union_new_getcapbysig?img_index=1&image=02bd270000fb883f0000000bb5d1ac9e32bb&sess=s0WQX03uQUOxrHUH4MRNzpiJdI4Jqi_vdpydFnYPmvZHx7X3lNPHfoV1tStDwnBvXaJyNd_hFyDVmzO6hekaHe8QCUw3cMq7lGHXl5h9-qZQfRarAd9z17Yytp3sdlfHs8OU_ea_lJOdsKP3oNxdvj-ti6oHKgZ71xm2j3AD5j9BT0ja-ivt33aKubUIn2DmRzlG1WkDrETC_Epq_IvNJ67CyfYv0M_Fb2OBNGOiFCXaVegHU3drbNE47PgaPXCwkTclxJkO2vd1IkG_rxb_WH0Esu_OLhMA6iOkQqbeULOEGc1yhdEyxPVzPxmspnxdquxAAjSb2Ig2S9tQeESZagiQPl3wfw4qBzXrCjnGirmvK4rR7VmKZZ2-3r4pKOCr_ZvyOF2V20uxRd5HnrGkehmE2C1tsodMS-7B2MVKfQDK8cmXohlcmCGixV3E6eqEbmoTKgxOBjnDsGome-S8yB9Pz2hp-owlqTNANtyNsw3g2QxwLOIZWpFax7Skm0XK2ViNwo4N2_szDSgd1uJB84D7kBtGSdlDOS8qc1qzzrrHU*")

