-- 插入工具数据
INSERT INTO tools (name, description, icon, cover, url, category, tags, features, pricing, rating, view_count, favorite_count, status, is_featured, is_hot, created_at, updated_at) VALUES
('文心一格', '百度推出的AI绘画工具，一语成画，支持国风、油画、水彩等多种艺术风格。', '', '', 'https://yige.baidu.com', 'PAINTING', '["AI绘画", "国产", "百度"]', '["一语成画", "多种风格", "零门槛创作", "高清输出"]', 'freemium', 4.7, 18500, 4200, 'ACTIVE', true, true, NOW(), NOW()),
('通义万相', '阿里云推出的AI视觉生成平台，支持图像生成、视频生成、3D内容创作。', '', '', 'https://tongyi.aliyun.com/wanxiang', 'MULTIMEDIA', '["AI视频", "图像生成", "阿里云"]', '["文生图", "文生视频", "图像编辑", "3D生成"]', 'freemium', 4.8, 22000, 5100, 'ACTIVE', true, true, NOW(), NOW()),
('豆包', '字节跳动推出的AI助手，日活极高，支持智能对话、内容创作、生活助手等功能。', '', '', 'https://www.doubao.com', 'EFFICIENCY', '["AI对话", "国产", "字节跳动"]', '["智能对话", "内容创作", "生活助手", "多场景应用"]', 'free', 4.6, 35000, 8900, 'ACTIVE', true, true, NOW(), NOW()),
('通义千问', '阿里云大模型，深度整合阿里生态，支持淘宝、飞猪、高德等服务闭环。', '', '', 'https://tongyi.aliyun.com', 'EFFICIENCY', '["AI对话", "阿里云", "生态整合"]', '["智能对话", "生态闭环", "办事能力", "多模态"]', 'freemium', 4.7, 28000, 6500, 'ACTIVE', true, true, NOW(), NOW()),
('智谱清言', '智谱AI推出的对话助手，基于ChatGLM模型，擅长学术写作和复杂逻辑推理。', '', '', 'https://chatglm.cn', 'EFFICIENCY', '["AI对话", "学术写作", "国产"]', '["逻辑推理", "学术写作", "多轮对话", "指令遵循"]', 'freemium', 4.6, 16000, 3800, 'ACTIVE', true, false, NOW(), NOW()),
('即梦AI', '国产AI视频生成工具，支持多模态输入，文生视频效果出色。', '', '', 'https://jimeng.jianying.com', 'MULTIMEDIA', '["AI视频", "国产", "多模态"]', '["文生视频", "多模态输入", "高质量生成", "快速渲染"]', 'freemium', 4.5, 12000, 2900, 'ACTIVE', false, true, NOW(), NOW()),
('可灵AI', '快手推出的AI视频生成工具，支持数字人生成、运镜控制，视频生成能力领先。', '', '', 'https://klingai.kuaishou.com', 'MULTIMEDIA', '["AI视频", "数字人", "快手"]', '["文生视频", "数字人", "运镜控制", "长视频"]', 'freemium', 4.7, 19000, 4500, 'ACTIVE', true, true, NOW(), NOW()),
('DeepSeek', '国产AI大模型，擅长复杂逻辑推理、深度阅读和代码任务，专业人士首选。', '', '', 'https://www.deepseek.com', 'EFFICIENCY', '["AI对话", "代码", "逻辑推理"]', '["逻辑推理", "代码生成", "深度阅读", "报告撰写"]', 'freemium', 4.8, 21000, 5600, 'ACTIVE', true, true, NOW(), NOW()),
('腾讯元宝', '腾讯推出的AI助手，深度绑定微信生态，适合办公纪要、日程管理等场景。', '', '', 'https://yuanbao.tencent.com', 'EFFICIENCY', '["AI对话", "微信生态", "腾讯"]', '["办公助手", "微信集成", "日程管理", "会议纪要"]', 'free', 4.5, 14000, 3200, 'ACTIVE', false, false, NOW(), NOW()),
('Midjourney', 'AI绘画领域的领导者，通过文字描述生成高质量艺术图像。', '', '', 'https://midjourney.com', 'PAINTING', '["AI绘画", "图像生成", "艺术创作"]', '["文字生成图像", "多种艺术风格", "高清输出", "风格迁移"]', 'paid', 4.8, 12580, 3250, 'ACTIVE', false, true, NOW(), NOW()),
('ChatGPT', 'OpenAI开发的AI对话助手，支持自然语言对话、代码生成、文本分析。', '', '', 'https://chat.openai.com', 'EFFICIENCY', '["AI对话", "文本生成", "代码助手"]', '["智能对话", "代码生成", "文本分析", "多语言支持"]', 'freemium', 4.9, 25680, 8950, 'ACTIVE', false, true, NOW(), NOW()),
('Runway', 'AI视频生成和编辑平台，支持文字生成视频、视频编辑、特效添加。', '', '', 'https://runway.ml', 'MULTIMEDIA', '["AI视频", "视频编辑", "特效"]', '["文字生成视频", "视频编辑", "AI特效", "绿幕抠像"]', 'freemium', 4.5, 7890, 1560, 'ACTIVE', false, false, NOW(), NOW());

-- 插入资讯数据
INSERT INTO articles (title, summary, content, cover, author, source, view_count, is_published, published_at, created_at, updated_at) VALUES
('2026年最值得关注的国内AI工具', 'AI技术飞速发展，本文盘点2026年最值得关注的国内AI工具，帮助你选择最适合的创作工具。', '详细内容...', '', 'AIHub编辑部', 'AIHub3000', 3580, true, NOW(), NOW(), NOW()),
('豆包 vs 通义千问：哪个AI助手更适合你？', '详细对比豆包和通义千问的功能特点、使用场景和定价策略，帮助你做出选择。', '详细内容...', '', 'AIHub编辑部', 'AIHub3000', 2890, true, NOW(), NOW(), NOW()),
('如何用AI工具提升工作效率？', '分享5个实用技巧，教你如何利用AI工具大幅提升日常工作效率。', '详细内容...', '', 'AIHub编辑部', 'AIHub3000', 4120, true, NOW(), NOW(), NOW()),
('文心一格 vs 通义万相：AI绘画工具对比', '深度对比两款国内主流AI绘画工具的功能、效果和使用场景。', '详细内容...', '', 'AIHub编辑部', 'AIHub3000', 3200, true, NOW(), NOW(), NOW()),
('可灵AI视频生成完全指南', '从入门到精通，教你如何使用可灵AI创作高质量视频内容。', '详细内容...', '', 'AIHub编辑部', 'AIHub3000', 2750, true, NOW(), NOW(), NOW()),
('DeepSeek：程序员的AI编程助手', '详细介绍DeepSeek在代码生成、调试和优化方面的强大能力。', '详细内容...', '', 'AIHub编辑部', 'AIHub3000', 3890, true, NOW(), NOW(), NOW()),
('2026年AI行业发展趋势报告', '分析AI技术的最新发展方向和未来应用场景。', '详细内容...', '', 'AIHub编辑部', 'AIHub3000', 5200, true, NOW(), NOW(), NOW()),
('智谱清言：学术写作的AI利器', '探索智谱清言在学术论文写作和研究中的应用技巧。', '详细内容...', '', 'AIHub编辑部', 'AIHub3000', 2980, true, NOW(), NOW(), NOW());
