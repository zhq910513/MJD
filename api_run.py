# -*- coding: utf-8 -*-

from typing import Dict, Optional

import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from mjd import MJDOrder

app = FastAPI(
    title="MJD Payment API",
    description="MJD 订单支付/订单查询 API",
    version="1.0.0"
)


class OrderRequest(BaseModel):
    account: Dict[str, str] = Field(..., description="账号信息，包含 pt_pin 和 pt_key")
    sku_id: Optional[str] = Field(None, description="商品 ID")
    order_id: Optional[str] = Field(None, description="订单 ID")


@app.post("/select_order")
async def select_order(request: OrderRequest):
    try:
        # 动态创建 MJDOrder 实例
        mjd = MJDOrder(account=request.account, sku_id=request.sku_id, order_id=request.order_id)
        # 调用 run_select 方法
        result = mjd.run_select()
        return {"status": "success", "data": result}
    except Exception as e:
        # 捕获异常并返回 500 错误
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e)})


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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
