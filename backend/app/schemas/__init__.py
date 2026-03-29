from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List


# ============ User Schemas ============
class UserBase(BaseModel):
    nickname: Optional[str] = None
    avatar: Optional[str] = None


class UserCreate(BaseModel):
    openid: str
    nickname: Optional[str] = None
    avatar: Optional[str] = None


class UserResponse(UserBase):
    id: int
    openid: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ============ Tool Schemas ============
class ToolBase(BaseModel):
    name: str
    description: Optional[str] = None
    icon: Optional[str] = None
    cover: Optional[str] = None
    url: Optional[str] = None
    category: str
    tags: Optional[List[str]] = None
    features: Optional[List[str]] = None
    pricing: Optional[str] = None


class ToolCreate(ToolBase):
    pass


class ToolUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    cover: Optional[str] = None
    url: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    features: Optional[List[str]] = None
    pricing: Optional[str] = None
    status: Optional[str] = None
    is_featured: Optional[bool] = None
    is_hot: Optional[bool] = None


class ToolResponse(ToolBase):
    id: int
    rating: float
    view_count: int
    favorite_count: int
    status: str
    is_featured: bool
    is_hot: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ToolListResponse(BaseModel):
    items: List[ToolResponse]
    total: int
    page: int
    page_size: int
    has_more: bool


# ============ Common Schemas ============
class Response(BaseModel):
    code: int = 0
    message: str = "success"
    data: Optional[dict] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int