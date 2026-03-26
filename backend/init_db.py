"""
Database initialization script
Run this script to create tables and add sample data
"""
import asyncio
from app.database import async_session_maker, init_db
from app.models import User, Tool, Article, ToolCategory, ToolStatus
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def create_sample_data():
    """Create sample data for testing"""
    async with async_session_maker() as session:
        # Create sample tools
        tools = [
            Tool(
                name="Midjourney",
                description="AI绘画领域的领导者，通过文字描述生成高质量艺术图像，支持多种风格和艺术效果。",
                icon="https://via.placeholder.com/100/6366f1/ffffff?text=MJ",
                cover="https://via.placeholder.com/400x200/6366f1/ffffff?text=Midjourney",
                url="https://midjourney.com",
                category=ToolCategory.PAINTING,
                tags='["AI绘画", "图像生成", "艺术创作"]',
                features='["文字生成图像", "多种艺术风格", "高清输出", "风格迁移"]',
                pricing="paid",
                rating=4.8,
                view_count=12580,
                favorite_count=3250,
                status=ToolStatus.ACTIVE,
                is_featured=True,
                is_hot=True
            ),
            Tool(
                name="Stable Diffusion",
                description="开源AI绘画工具，支持本地部署，高度可定制，拥有丰富的模型生态系统。",
                icon="https://via.placeholder.com/100/ec4899/ffffff?text=SD",
                cover="https://via.placeholder.com/400x200/ec4899/ffffff?text=Stable+Diffusion",
                url="https://stability.ai",
                category=ToolCategory.PAINTING,
                tags='["开源", "AI绘画", "本地部署"]',
                features='["开源免费", "本地运行", "模型丰富", "高度可定制"]',
                pricing="free",
                rating=4.6,
                view_count=9870,
                favorite_count=2180,
                status=ToolStatus.ACTIVE,
                is_featured=True,
                is_hot=True
            ),
            Tool(
                name="ChatGPT",
                description="OpenAI开发的AI对话助手，支持自然语言对话、代码生成、文本分析等多种任务。",
                icon="https://via.placeholder.com/100/10b981/ffffff?text=GPT",
                cover="https://via.placeholder.com/400x200/10b981/ffffff?text=ChatGPT",
                url="https://chat.openai.com",
                category=ToolCategory.EFFICIENCY,
                tags='["AI对话", "文本生成", "代码助手"]',
                features='["智能对话", "代码生成", "文本分析", "多语言支持"]',
                pricing="freemium",
                rating=4.9,
                view_count=25680,
                favorite_count=8950,
                status=ToolStatus.ACTIVE,
                is_featured=True,
                is_hot=True
            ),
            Tool(
                name="Claude",
                description="Anthropic开发的AI助手，擅长长文本处理、代码分析和安全对话。",
                icon="https://via.placeholder.com/100/f59e0b/ffffff?text=CL",
                cover="https://via.placeholder.com/400x200/f59e0b/ffffff?text=Claude",
                url="https://claude.ai",
                category=ToolCategory.EFFICIENCY,
                tags='["AI对话", "长文本", "代码分析"]',
                features='["长文本处理", "代码分析", "安全对话", "文档理解"]',
                pricing="freemium",
                rating=4.7,
                view_count=15420,
                favorite_count=4280,
                status=ToolStatus.ACTIVE,
                is_featured=True,
                is_hot=False
            ),
            Tool(
                name="Runway",
                description="AI视频生成和编辑平台，支持文字生成视频、视频编辑、特效添加等功能。",
                icon="https://via.placeholder.com/100/8b5cf6/ffffff?text=RW",
                cover="https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Runway",
                url="https://runway.ml",
                category=ToolCategory.MULTIMEDIA,
                tags='["AI视频", "视频编辑", "特效"]',
                features='["文字生成视频", "视频编辑", "AI特效", "绿幕抠像"]',
                pricing="freemium",
                rating=4.5,
                view_count=7890,
                favorite_count=1560,
                status=ToolStatus.ACTIVE,
                is_featured=False,
                is_hot=True
            ),
            Tool(
                name="DALL·E 3",
                description="OpenAI的图像生成模型，与ChatGPT深度集成，支持精确的图像描述生成。",
                icon="https://via.placeholder.com/100/06b6d4/ffffff?text=D3",
                cover="https://via.placeholder.com/400x200/06b6d4/ffffff?text=DALL+E+3",
                url="https://openai.com/dall-e-3",
                category=ToolCategory.PAINTING,
                tags='["AI绘画", "OpenAI", "图像生成"]',
                features='["精确图像生成", "ChatGPT集成", "高清输出", "风格多样"]',
                pricing="paid",
                rating=4.7,
                view_count=11250,
                favorite_count=2890,
                status=ToolStatus.ACTIVE,
                is_featured=False,
                is_hot=True
            )
        ]

        # Create sample articles
        articles = [
            Article(
                title="2024年最值得关注的10个AI绘画工具",
                summary="AI绘画技术飞速发展，本文盘点2024年最值得关注的10个AI绘画工具，帮助你选择最适合的创作工具。",
                content="详细内容...",
                cover="https://via.placeholder.com/400x200/6366f1/ffffff?text=AI+Painting",
                author="AIHub编辑部",
                source="AIHub3000",
                view_count=3580,
                is_published=True
            ),
            Article(
                title="ChatGPT vs Claude：哪个AI助手更适合你？",
                summary="详细对比ChatGPT和Claude的功能特点、使用场景和定价策略，帮助你做出选择。",
                content="详细内容...",
                cover="https://via.placeholder.com/400x200/10b981/ffffff?text=GPT+vs+Claude",
                author="AIHub编辑部",
                source="AIHub3000",
                view_count=2890,
                is_published=True
            ),
            Article(
                title="如何用AI工具提升工作效率？",
                summary="分享5个实用技巧，教你如何利用AI工具大幅提升日常工作效率。",
                content="详细内容...",
                cover="https://via.placeholder.com/400x200/f59e0b/ffffff?text=AI+Efficiency",
                author="AIHub编辑部",
                source="AIHub3000",
                view_count=4120,
                is_published=True
            )
        ]

        session.add_all(tools)
        session.add_all(articles)
        await session.commit()
        print("Sample data created successfully!")


async def main():
    print("Initializing database...")
    await init_db()
    print("Creating sample data...")
    await create_sample_data()
    print("Done!")


if __name__ == "__main__":
    asyncio.run(main())