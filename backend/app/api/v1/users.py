from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from app.database import get_db
from app.models import User, Favorite, BrowseHistory, Tool
from app.schemas import UserResponse, UserCreate, ToolResponse
from app.utils.auth import create_token, verify_token

router = APIRouter(prefix="/users", tags=["users"])


async def get_current_user(
    authorization: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db)
) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.replace("Bearer ", "")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    query = select(User).where(User.id == int(user_id))
    result = await db.execute(query)
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


@router.post("/login", response_model=dict)
async def login(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    """用户登录/注册"""
    query = select(User).where(User.openid == user_data.openid)
    result = await db.execute(query)
    user = result.scalar_one_or_none()

    if not user:
        user = User(**user_data.model_dump())
        db.add(user)
        await db.commit()
        await db.refresh(user)

    token = create_token({"sub": str(user.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": UserResponse.model_validate(user)
    }


@router.get("/me", response_model=UserResponse)
async def get_me(user: User = Depends(get_current_user)):
    """获取当前用户信息"""
    return UserResponse.model_validate(user)


@router.get("/favorites", response_model=list[ToolResponse])
async def get_favorites(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """获取收藏列表"""
    query = select(Tool).join(Favorite).where(Favorite.user_id == user.id)
    result = await db.execute(query)
    tools = result.scalars().all()
    return [ToolResponse.model_validate(t) for t in tools]


@router.post("/favorites/{tool_id}")
async def add_favorite(
    tool_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """添加收藏"""
    # Check tool exists
    tool_query = select(Tool).where(Tool.id == tool_id)
    tool_result = await db.execute(tool_query)
    if not tool_result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Tool not found")

    # Check if already favorited
    fav_query = select(Favorite).where(
        Favorite.user_id == user.id,
        Favorite.tool_id == tool_id
    )
    fav_result = await db.execute(fav_query)
    if fav_result.scalar_one_or_none():
        return {"message": "Already favorited"}

    favorite = Favorite(user_id=user.id, tool_id=tool_id)
    db.add(favorite)

    # Update favorite count
    await db.execute(tool_query)
    tool = tool_result.scalar_one()
    tool.favorite_count += 1

    await db.commit()
    return {"message": "Added to favorites"}


@router.delete("/favorites/{tool_id}")
async def remove_favorite(
    tool_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """取消收藏"""
    query = select(Favorite).where(
        Favorite.user_id == user.id,
        Favorite.tool_id == tool_id
    )
    result = await db.execute(query)
    favorite = result.scalar_one_or_none()

    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")

    await db.delete(favorite)

    # Update favorite count
    tool_query = select(Tool).where(Tool.id == tool_id)
    tool_result = await db.execute(tool_query)
    tool = tool_result.scalar_one_or_none()
    if tool:
        tool.favorite_count -= 1

    await db.commit()
    return {"message": "Removed from favorites"}


@router.get("/history", response_model=list[ToolResponse])
async def get_browse_history(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """获取浏览历史"""
    query = select(Tool).join(BrowseHistory).where(
        BrowseHistory.user_id == user.id
    ).order_by(BrowseHistory.created_at.desc()).limit(50)
    result = await db.execute(query)
    tools = result.scalars().all()
    return [ToolResponse.model_validate(t) for t in tools]