"""
初始化数据库并导入工具数据
"""
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import async_session_maker
from app.models import Tool, Article, ToolCategory, ToolStatus
import json


# 工具数据
TOOLS_DATA = [
    {
        "name": "文心一格",
        "description": "百度推出的AI绘画工具，一语成画，支持国风、油画、水彩等多种艺术风格。",
        "icon": "",
        "cover": "",
        "url": "https://yige.baidu.com",
        "category": ToolCategory.PAINTING,
        "tags": json.dumps(["AI绘画", "国产", "百度"]),
        "features": json.dumps(["一语成画", "多种风格", "零门槛创作", "高清输出"]),
        "pricing": "freemium",
        "rating": 4.7,
        "view_count": 18500,
        "favorite_count": 4200,
        "status": ToolStatus.ACTIVE,
        "is_featured": True,
        "is_hot": True,
    },
    {
        "name": "通义万相",
        "description": "阿里云推出的AI视觉生成平台，支持图像生成、视频生成、3D内容创作。",
        "icon": "",
        "cover": "",
        "url": "https://tongyi.aliyun.com/wanxiang",
        "category": ToolCategory.MULTIMEDIA,
        "tags": json.dumps(["AI视频", "图像生成", "阿里云"]),
        "features": json.dumps(["文生图", "文生视频", "图像编辑", "3D生成"]),
        "pricing": "freemium",
        "rating": 4.8,
        "view_count": 22000,
        "favorite_count": 5100,
        "status": ToolStatus.ACTIVE,
        "is_featured": True,
        "is_hot": True,
    },
    {
        "name": "豆包",
        "description": "字节跳动推出的AI助手，日活极高，支持智能对话、内容创作、生活助手等功能。",
        "icon": "",
        "cover": "",
        "url": "https://www.doubao.com",
        "category": ToolCategory.EFFICIENCY,
        "tags": json.dumps(["AI对话", "国产", "字节跳动"]),
        "features": json.dumps(["智能对话", "内容创作", "生活助手", "多场景应用"]),
        "pricing": "free",
        "rating": 4.6,
        "view_count": 35000,
        "favorite_count": 8900,
        "status": ToolStatus.ACTIVE,
        "is_featured": True,
        "is_hot": True,
    },
    {
        "name": "通义千问",
        "description": "阿里云大模型，深度整合阿里生态，支持淘宝、飞猪、高德等服务闭环。",
        "icon": "",
        "cover": "",
        "url": "https://tongyi.aliyun.com",
        "category": ToolCategory.EFFICIENCY,
        "tags": json.dumps(["AI对话", "阿里云", "生态整合"]),
        "features": json.dumps(["智能对话", "生态闭环", "办事能力", "多模态"]),
        "pricing": "freemium",
        "rating": 4.7,
        "view_count": 28000,
        "favorite_count": 6500,
        "status": ToolStatus.ACTIVE,
        "is_featured": True,
        "is_hot": True,
    },
]


async def seed_tools(session: AsyncSession):
    """导入工具数据"""
    for tool_data in TOOLS_DATA:
        tool = Tool(**tool_data)
        session.add(tool)
    await session.commit()
    print(f"✅ 已导入 {len(TOOLS_DATA)} 个工具")


async def main():
    async with async_session_maker() as session:
        await seed_tools(session)
    print("✅ 数据导入完成")


if __name__ == "__main__":
    asyncio.run(main())
