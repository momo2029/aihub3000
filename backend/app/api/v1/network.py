from fastapi import APIRouter, Request
from fastapi.responses import Response
import httpx
import time

router = APIRouter(prefix="/network", tags=["network"])


@router.get("/ip")
async def get_ip_info(request: Request):
    """获取客户端IP信息"""
    # 获取客户端IP
    client_ip = request.client.host if request.client else None
    
    # 尝试从X-Forwarded-For获取真实IP（适用于代理场景）
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        client_ip = forwarded_for.split(",")[0].strip()
    
    # 尝试从X-Real-IP获取
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        client_ip = real_ip
    
    # 获取IP归属地信息
    location_info = await get_ip_location(client_ip)
    
    return {
        "ip": client_ip,
        "ipv6": None,  # IPv6需要特殊处理
        "location": location_info.get("location", ""),
        "isp": location_info.get("isp", ""),
        "country": location_info.get("country", ""),
        "region": location_info.get("region", ""),
        "city": location_info.get("city", "")
    }


async def get_ip_location(ip: str) -> dict:
    """通过第三方API获取IP归属地"""
    if not ip:
        return {}
    
    try:
        # 使用ip-api.com免费API
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(f"http://ip-api.com/json/{ip}?lang=zh-CN")
            if resp.status_code == 200:
                data = resp.json()
                if data.get("status") == "success":
                    return {
                        "country": data.get("country", ""),
                        "region": data.get("regionName", ""),
                        "city": data.get("city", ""),
                        "isp": data.get("isp", ""),
                        "location": f"{data.get('country', '')} {data.get('regionName', '')} {data.get('city', '')}"
                    }
    except Exception as e:
        print(f"Get IP location failed: {e}")
    
    return {}


@router.get("/ping")
async def ping():
    """Ping测试接口，用于测试延迟"""
    return {"time": time.time() * 1000}


@router.get("/speed-test-file")
async def speed_test_file(size: int = 102400):
    """生成测试文件用于测速"""
    # 生成指定大小的随机数据
    data = b"0" * min(size, 1024 * 1024)  # 最大1MB
    return Response(
        content=data,
        media_type="application/octet-stream",
        headers={
            "Content-Length": str(len(data)),
            "Cache-Control": "no-cache"
        }
    )