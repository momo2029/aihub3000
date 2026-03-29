from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
from app.database import get_db
from app.models import Tool
from app.schemas import ToolResponse, ToolListResponse, ToolCreate, ToolUpdate

router = APIRouter(prefix="/tools", tags=["tools"])


@router.get("", response_model=ToolListResponse)
async def get_tools(
    category: Optional[str] = None,
    is_featured: Optional[bool] = None,
    is_hot: Optional[bool] = None,
    keyword: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    """获取工具列表"""
    query = select(Tool).where(Tool.status == "active")

    if category:
        query = query.where(Tool.category == category)
    if is_featured is not None:
        query = query.where(Tool.is_featured == is_featured)
    if is_hot is not None:
        query = query.where(Tool.is_hot == is_hot)
    if keyword:
        query = query.where(Tool.name.ilike(f"%{keyword}%"))

    # Count total
    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)

    # Pagination
    query = query.order_by(Tool.is_featured.desc(), Tool.view_count.desc())
    query = query.offset((page - 1) * page_size).limit(page_size)

    result = await db.execute(query)
    tools = result.scalars().all()

    return ToolListResponse(
        items=[ToolResponse.model_validate(t) for t in tools],
        total=total or 0,
        page=page,
        page_size=page_size,
        has_more=(page * page_size) < (total or 0)
    )


@router.get("/categories", response_model=dict)
async def get_categories():
    """获取工具分类"""
    return {
        "categories": [
            {"key": "painting", "name": "AI绘画", "icon": "palette", "description": "图像生成、编辑、设计"},
            {"key": "chat", "name": "AI对话", "icon": "chat", "description": "智能对话、问答助手"},
            {"key": "multimedia", "name": "AI多媒体", "icon": "video", "description": "视频、音频、3D"},
        ]
    }


@router.get("/{tool_id}", response_model=ToolResponse)
async def get_tool(tool_id: int, db: AsyncSession = Depends(get_db)):
    """获取工具详情"""
    query = select(Tool).where(Tool.id == tool_id, Tool.status == "active")
    result = await db.execute(query)
    tool = result.scalar_one_or_none()

    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    # Increment view count
    tool.view_count += 1
    await db.commit()

    return ToolResponse.model_validate(tool)


@router.post("", response_model=ToolResponse)
async def create_tool(tool_data: ToolCreate, db: AsyncSession = Depends(get_db)):
    """创建工具（管理后台使用）"""
    tool = Tool(**tool_data.model_dump())
    db.add(tool)
    await db.commit()
    await db.refresh(tool)
    return ToolResponse.model_validate(tool)


@router.put("/{tool_id}", response_model=ToolResponse)
async def update_tool(tool_id: int, tool_data: ToolUpdate, db: AsyncSession = Depends(get_db)):
    """更新工具（管理后台使用）"""
    query = select(Tool).where(Tool.id == tool_id)
    result = await db.execute(query)
    tool = result.scalar_one_or_none()

    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    for key, value in tool_data.model_dump(exclude_unset=True).items():
        setattr(tool, key, value)

    await db.commit()
    await db.refresh(tool)
    return ToolResponse.model_validate(tool)


@router.delete("/{tool_id}")
async def delete_tool(tool_id: int, db: AsyncSession = Depends(get_db)):
    """删除工具（管理后台使用）"""
    query = select(Tool).where(Tool.id == tool_id)
    result = await db.execute(query)
    tool = result.scalar_one_or_none()

    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    await db.delete(tool)
    await db.commit()
    return {"message": "Tool deleted successfully"}