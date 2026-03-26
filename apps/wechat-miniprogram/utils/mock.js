// Mock Data for Development
const mockTools = [
  {
    id: 1,
    name: "Midjourney",
    description: "AI绘画领域的领导者，通过文字描述生成高质量艺术图像，支持多种风格和艺术效果。",
    icon: "https://via.placeholder.com/100/6366f1/ffffff?text=MJ",
    cover: "https://via.placeholder.com/400x200/6366f1/ffffff?text=Midjourney",
    url: "https://midjourney.com",
    category: "painting",
    tags: ["AI绘画", "图像生成", "艺术创作"],
    features: ["文字生成图像", "多种艺术风格", "高清输出", "风格迁移"],
    pricing: "paid",
    rating: 4.8,
    view_count: 12580,
    favorite_count: 3250,
    status: "active",
    is_featured: true,
    is_hot: true,
    created_at: "2024-01-01T00:00:00",
    updated_at: "2024-01-15T00:00:00"
  },
  {
    id: 2,
    name: "Stable Diffusion",
    description: "开源AI绘画工具，支持本地部署，高度可定制，拥有丰富的模型生态系统。",
    icon: "https://via.placeholder.com/100/ec4899/ffffff?text=SD",
    cover: "https://via.placeholder.com/400x200/ec4899/ffffff?text=Stable+Diffusion",
    url: "https://stability.ai",
    category: "painting",
    tags: ["开源", "AI绘画", "本地部署"],
    features: ["开源免费", "本地运行", "模型丰富", "高度可定制"],
    pricing: "free",
    rating: 4.6,
    view_count: 9870,
    favorite_count: 2180,
    status: "active",
    is_featured: true,
    is_hot: true,
    created_at: "2024-01-02T00:00:00",
    updated_at: "2024-01-16T00:00:00"
  },
  {
    id: 3,
    name: "ChatGPT",
    description: "OpenAI开发的AI对话助手，支持自然语言对话、代码生成、文本分析等多种任务。",
    icon: "https://via.placeholder.com/100/10b981/ffffff?text=GPT",
    cover: "https://via.placeholder.com/400x200/10b981/ffffff?text=ChatGPT",
    url: "https://chat.openai.com",
    category: "efficiency",
    tags: ["AI对话", "文本生成", "代码助手"],
    features: ["智能对话", "代码生成", "文本分析", "多语言支持"],
    pricing: "freemium",
    rating: 4.9,
    view_count: 25680,
    favorite_count: 8950,
    status: "active",
    is_featured: true,
    is_hot: true,
    created_at: "2024-01-03T00:00:00",
    updated_at: "2024-01-17T00:00:00"
  },
  {
    id: 4,
    name: "Claude",
    description: "Anthropic开发的AI助手，擅长长文本处理、代码分析和安全对话。",
    icon: "https://via.placeholder.com/100/f59e0b/ffffff?text=CL",
    cover: "https://via.placeholder.com/400x200/f59e0b/ffffff?text=Claude",
    url: "https://claude.ai",
    category: "efficiency",
    tags: ["AI对话", "长文本", "代码分析"],
    features: ["长文本处理", "代码分析", "安全对话", "文档理解"],
    pricing: "freemium",
    rating: 4.7,
    view_count: 15420,
    favorite_count: 4280,
    status: "active",
    is_featured: true,
    is_hot: false,
    created_at: "2024-01-04T00:00:00",
    updated_at: "2024-01-18T00:00:00"
  },
  {
    id: 5,
    name: "Runway",
    description: "AI视频生成和编辑平台，支持文字生成视频、视频编辑、特效添加等功能。",
    icon: "https://via.placeholder.com/100/8b5cf6/ffffff?text=RW",
    cover: "https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Runway",
    url: "https://runway.ml",
    category: "multimedia",
    tags: ["AI视频", "视频编辑", "特效"],
    features: ["文字生成视频", "视频编辑", "AI特效", "绿幕抠像"],
    pricing: "freemium",
    rating: 4.5,
    view_count: 7890,
    favorite_count: 1560,
    status: "active",
    is_featured: false,
    is_hot: true,
    created_at: "2024-01-05T00:00:00",
    updated_at: "2024-01-19T00:00:00"
  },
  {
    id: 6,
    name: "DALL·E 3",
    description: "OpenAI的图像生成模型，与ChatGPT深度集成，支持精确的图像描述生成。",
    icon: "https://via.placeholder.com/100/06b6d4/ffffff?text=D3",
    cover: "https://via.placeholder.com/400x200/06b6d4/ffffff?text=DALL+E+3",
    url: "https://openai.com/dall-e-3",
    category: "painting",
    tags: ["AI绘画", "OpenAI", "图像生成"],
    features: ["精确图像生成", "ChatGPT集成", "高清输出", "风格多样"],
    pricing: "paid",
    rating: 4.7,
    view_count: 11250,
    favorite_count: 2890,
    status: "active",
    is_featured: false,
    is_hot: true,
    created_at: "2024-01-06T00:00:00",
    updated_at: "2024-01-20T00:00:00"
  }
]

const mockArticles = [
  {
    id: 1,
    title: "2024年最值得关注的10个AI绘画工具",
    summary: "AI绘画技术飞速发展，本文盘点2024年最值得关注的10个AI绘画工具，帮助你选择最适合的创作工具。",
    content: "详细内容...",
    cover: "https://via.placeholder.com/400x200/6366f1/ffffff?text=AI+Painting",
    author: "AIHub编辑部",
    source: "AIHub3000",
    view_count: 3580,
    is_published: true,
    published_at: "2024-01-20T10:00:00",
    created_at: "2024-01-20T08:00:00",
    updated_at: "2024-01-20T10:00:00"
  },
  {
    id: 2,
    title: "ChatGPT vs Claude：哪个AI助手更适合你？",
    summary: "详细对比ChatGPT和Claude的功能特点、使用场景和定价策略，帮助你做出选择。",
    content: "详细内容...",
    cover: "https://via.placeholder.com/400x200/10b981/ffffff?text=GPT+vs+Claude",
    author: "AIHub编辑部",
    source: "AIHub3000",
    view_count: 2890,
    is_published: true,
    published_at: "2024-01-19T14:00:00",
    created_at: "2024-01-19T12:00:00",
    updated_at: "2024-01-19T14:00:00"
  },
  {
    id: 3,
    title: "如何用AI工具提升工作效率？",
    summary: "分享5个实用技巧，教你如何利用AI工具大幅提升日常工作效率。",
    content: "详细内容...",
    cover: "https://via.placeholder.com/400x200/f59e0b/ffffff?text=AI+Efficiency",
    author: "AIHub编辑部",
    source: "AIHub3000",
    view_count: 4120,
    is_published: true,
    published_at: "2024-01-18T09:00:00",
    created_at: "2024-01-18T07:00:00",
    updated_at: "2024-01-18T09:00:00"
  }
]

const mockCategories = {
  categories: [
    { key: "painting", name: "AI绘画", icon: "palette", description: "图像生成、编辑、设计", color: "#ec4899" },
    { key: "efficiency", name: "AI效率", icon: "rocket", description: "写作、翻译、编程", color: "#6366f1" },
    { key: "multimedia", name: "AI多媒体", icon: "video", description: "视频、音频、3D", color: "#f59e0b" }
  ]
}

module.exports = {
  mockTools,
  mockArticles,
  mockCategories
}