# 创建订单 API
    功能描述：
        用于创建一个新的订单。
    请求方法: 
        POST
    请求链接: 
        http://127.0.0.1:8000/create_order
    端口:
        8000
    请求头:
        Content-Type: application/json
    请求体 (JSON 格式):
        # account / sku_id 必传
        {
          "account": {
            "pt_pin": "zhq91513",  // 账号的 pt_pin
            "pt_key": "AAJnrKaVADChKF-KgRvGcEk7VPe_YVZhcoNuzwgpeZfRLxz07Tg58KCpxB3WXCBz-T63lC4Oxqk"  // 账号的 pt_key
          },
          "sku_id": "10022039398507",  // 商品 SKU ID
        }


# 查询订单 API
    功能描述：
        用于查询指定订单的详细信息。
    请求方法: 
        POST
    请求链接: 
        http://127.0.0.1:8000/select_order
    端口:
        8000
    请求头:
        Content-Type: application/json
    请求体 (JSON 格式):
        # account / order_id 必传
        {
          "account": {
            "pt_pin": "zhq91513",  // 账号的 pt_pin
            "pt_key": "AAJnrKaVADChKF-KgRvGcEk7VPe_YVZhcoNuzwgpeZfRLxz07Tg58KCpxB3WXCBz-T63lC4Oxqk"  // 账号的 pt_key
          },
          "order_id": "307843863375"   // 订单 ID
        }


# 定义错误码映射
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
    18: "获取微信支付链接失败",
    19: "JS加密版本更新"


# 其他说明
    目前提供6个设备随机请求
    账号缓存时间为一天
    请求失败或者返回给调用者的状态码不为1会删除账号缓存
    代理会自动请求两次，并打印失败原因，最后用本地网络完成整个业务
    设备/账号风控时间大约为一天（如遇到请冷却一天再请求）


# 待验证问题
    设备风控频率
    触发验证码的条件
    设备信息fp的更新周期（猜测为重新登陆或者账号风控时）
    
    


# 建议
    业务方做账号管控，根据我返回的状态码（status:0）