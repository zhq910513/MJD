# -*- coding: utf-8 -*-

from typing import Dict, Optional

import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from mjd import MJDOrder

app = FastAPI(
    title="MJD Payment API",
    description="MJD 订单支付/订单查询 API",
    version="1.0.0"
)


# 定义请求模型
class OrderRequest(BaseModel):
    account: Dict[str, str]  # account 是一个键值对字符串字典
    sku_id: str
    order_id: Optional[str] = None  # order_id 可选


@app.post("/create_order")
async def create_order(request: OrderRequest):
    try:
        # 动态创建 MJDOrder 实例
        mjd = MJDOrder(account=request.account, sku_id=request.sku_id, order_id=request.order_id)
        # 调用 run_create 方法
        return mjd.run_create()
    except Exception as e:
        # 捕获异常并返回 500 错误
        raise HTTPException(status_code=500, detail=f"处理失败: {str(e)}")


@app.post("/select_order")
async def create_order(request: OrderRequest):
    try:
        # 动态创建 MJDOrder 实例
        mjd = MJDOrder(account=request.account, sku_id=request.sku_id, order_id=request.order_id)
        # 调用 run_select 方法
        return mjd.run_select()
    except Exception as e:
        # 捕获异常并返回 500 错误
        raise HTTPException(status_code=500, detail=f"处理失败: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
