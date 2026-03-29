-- AI工具数据导入脚本

TRUNCATE TABLE tools CASCADE;

INSERT INTO tools (name, description, icon, cover, url, category, tags, features, pricing, rating, view_count, favorite_count, status, is_featured, is_hot, created_at, updated_at) VALUES
('文心一格', '百度推出的AI绘画工具，支持文生图、图生图等多种创作模式。', '', '', 'https://yige.baidu.com', 'painting', ARRAY['AI绘画', '国产', '百度'], ARRAY['一语成画', '多种风格', '零门槛创作', '高清输出'], 'freemium', 5, 18500, 4200, 'active', true, true, NOW(), NOW()),

('通义万相', '阿里云推出的AI视频和图像生成平台，支持文生图、图生视频等功能。', '', '', 'https://tongyi.aliyun.com/wanxiang', 'multimedia', ARRAY['AI视频', '图像生成', '阿里云'], ARRAY['文生图', '文生视频', '图像编辑', '3D生成'], 'freemium', 5, 12000, 3100, 'active', true, true, NOW(), NOW()),

('豆包', '字节跳动推出的AI助手，支持智能对话、内容创作、生活助手等功能。', '', '', 'https://www.doubao.com', 'chat', ARRAY['AI对话', '国产', '字节跳动'], ARRAY['智能对话', '内容创作', '生活助手', '多场景应用'], 'freemium', 5, 28000, 6500, 'active', true, true, NOW(), NOW()),

('通义千问', '阿里云大模型，深度整合阿里生态，支持淘宝、飞猪、高德等服务闭环。', '', '', 'https://tongyi.aliyun.com/qianwen', 'chat', ARRAY['AI对话', '国产', '阿里云'], ARRAY['深度问答', '生态整合', '多模态', '服务闭环'], 'freemium', 5, 22000, 5800, 'active', true, true, NOW(), NOW()),

('智谱清言', '智谱AI推出的AI助手，支持智能对话、文本分析、代码生成等功能。', '', '', 'https://chatglm.cn', 'chat', ARRAY['AI对话', '国产', '智谱AI'], ARRAY['智能对话', '文本分析', '代码生成', '学术支持'], 'freemium', 4, 8500, 2100, 'active', true, false, NOW(), NOW()),

('Kimi', '月之暗面推出的AI助手，支持超长文本处理、智能对话、文件分析。', '', '', 'https://kimi.moonshot.cn', 'chat', ARRAY['AI对话', '国产', '月之暗面'], ARRAY['超长文本', '智能对话', '文件分析', '联网搜索'], 'freemium', 5, 15000, 3800, 'active', true, true, NOW(), NOW()),

('即梦AI', '字节跳动推出的AI绘画工具，支持数字人生成、视频创作。', '', '', 'https://jimeng.jianying.com', 'painting', ARRAY['AI绘画', '国产', '字节跳动'], ARRAY['数字人生成', '视频创作', '图像生成', '风格多样'], 'freemium', 4, 9200, 2400, 'active', true, false, NOW(), NOW()),

('可灵AI', '快手推出的AI视频生成工具，支持文生视频、图生视频。', '', '', 'https://klingai.kuaishou.com', 'multimedia', ARRAY['AI视频', '国产', '快手'], ARRAY['文生视频', '图生视频', '视频编辑', '特效生成'], 'freemium', 4, 7800, 1900, 'active', true, false, NOW(), NOW()),

('腾讯元宝', '腾讯推出的AI助手，深度绑定微信生态，支持智能对话、内容创作。', '', '', 'https://yuanbao.tencent.com', 'chat', ARRAY['AI对话', '国产', '腾讯'], ARRAY['智能对话', '微信集成', '内容创作', '生活助手'], 'freemium', 4, 11000, 2800, 'active', true, false, NOW(), NOW()),

('讯飞星火', '科大讯飞推出的AI助手，支持智能对话、文本分析、代码生成。', '', '', 'https://xinghuo.xfyun.cn', 'chat', ARRAY['AI对话', '国产', '科大讯飞'], ARRAY['智能对话', '文本分析', '代码生成', '语音交互'], 'freemium', 4, 6800, 1700, 'active', true, false, NOW(), NOW()),

('秘塔AI搜索', 'AI驱动的智能搜索引擎，支持深度搜索、学术研究。', '', '', 'https://metaso.cn', 'efficiency', ARRAY['AI搜索', '国产', '秘塔'], ARRAY['深度搜索', '学术研究', '信息整合', '无广告'], 'freemium', 5, 14000, 3500, 'active', true, true, NOW(), NOW()),

('DeepSeek', '深度求索推出的AI大模型，支持智能对话、代码生成、文本分析。', '', '', 'https://chat.deepseek.com', 'chat', ARRAY['AI对话', '国产', '深度求索'], ARRAY['智能对话', '代码生成', '文本分析', '开源模型'], 'freemium', 5, 25000, 6000, 'active', true, true, NOW(), NOW());
-- 插入资讯数据
TRUNCATE TABLE articles CASCADE;

INSERT INTO articles (title, summary, content, cover, author, source, view_count, is_published, published_at, created_at, updated_at) VALUES
('2026年最值得关注的国内AI工具', 'AI技术飞速发展，本文盘点2026年最值得关注的国内AI工具，帮助你选择最适合的创作工具。', '随着AI技术的快速发展，国内涌现出众多优秀的AI工具。本文将为您详细介绍2026年最值得关注的国内AI工具，包括豆包、通义千问、文心一格等，帮助您在工作和生活中更好地利用AI技术提升效率。', '', 'AIHub编辑部', 'AIHub3000', 3580, true, NOW(), NOW(), NOW()),

('豆包 vs 通义千问：哪个AI助手更适合你？', '详细对比豆包和通义千问的功能特点、使用场景和定价策略，帮助你做出选择。', '豆包和通义千问都是国内领先的AI对话助手，但它们各有特色。豆包由字节跳动推出，日活用户极高，主打轻量化和易用性；通义千问则深度整合阿里生态，在电商、出行等场景有独特优势。本文将从多个维度对比两者，帮助您选择最适合的AI助手。', '', 'AIHub编辑部', 'AIHub3000', 2890, true, NOW(), NOW(), NOW()),

('如何用AI工具提升工作效率？', '分享5个实用技巧，教你如何利用AI工具大幅提升日常工作效率。', 'AI工具正在改变我们的工作方式。本文分享5个实用技巧：1. 使用AI助手处理日常邮件；2. 利用AI绘画工具快速制作设计素材；3. 借助AI视频工具提升内容创作效率；4. 使用AI搜索工具快速获取信息；5. 利用AI代码助手提升开发效率。掌握这些技巧，让AI成为您的得力助手。', '', 'AIHub编辑部', 'AIHub3000', 4120, true, NOW(), NOW(), NOW()),

('文心一格 vs 通义万相：AI绘画工具对比', '深度对比两款国内主流AI绘画工具的功能、效果和使用场景。', '文心一格和通义万相是国内最受欢迎的两款AI绘画工具。文心一格主打"一语成画"，操作简单，适合快速创作；通义万相则功能更全面，支持图像、视频、3D等多种创作形式。本文将详细对比两者的优劣势，帮助您根据需求选择合适的工具。', '', 'AIHub编辑部', 'AIHub3000', 3200, true, NOW(), NOW(), NOW()),

('可灵AI视频生成完全指南', '从入门到精通，教你如何使用可灵AI创作高质量视频内容。', '可灵AI是快手推出的AI视频生成工具，支持文生视频、图生视频等功能。本文将从注册账号开始，详细介绍可灵AI的各项功能，包括如何撰写有效的提示词、如何控制视频时长和风格、如何添加特效等，帮助您快速掌握AI视频创作技能。', '', 'AIHub编辑部', 'AIHub3000', 2750, true, NOW(), NOW(), NOW()),

('DeepSeek：程序员的AI编程助手', '详细介绍DeepSeek在代码生成、调试和优化方面的强大能力。', 'DeepSeek是深度求索推出的AI大模型，在代码生成方面表现尤为出色。本文将介绍DeepSeek在编程领域的应用，包括代码补全、Bug修复、代码重构、技术文档生成等功能，并分享一些使用技巧，帮助程序员提升开发效率。', '', 'AIHub编辑部', 'AIHub3000', 3890, true, NOW(), NOW(), NOW()),

('2026年AI行业发展趋势报告', '分析AI技术的最新发展方向和未来应用场景。', '2026年AI行业迎来新的发展浪潮。本文将从技术、应用、市场三个维度分析AI发展趋势：多模态AI成为主流、AI Agent能力大幅提升、垂直领域AI应用加速落地、开源模型与闭源模型竞争加剧等，帮助您把握AI行业脉搏。', '', 'AIHub编辑部', 'AIHub3000', 5200, true, NOW(), NOW(), NOW()),

('智谱清言：学术写作的AI利器', '探索智谱清言在学术论文写作和研究中的应用技巧。', '智谱清言基于ChatGLM模型，在学术写作领域有独特优势。本文将介绍如何使用智谱清言辅助论文写作，包括文献综述、论文框架构建、学术语言润色、参考文献格式化等功能，帮助科研人员和学生提升学术写作效率。', '', 'AIHub编辑部', 'AIHub3000', 2980, true, NOW(), NOW(), NOW()),

('Kimi的超长文本处理能力详解', '深入了解Kimi在处理长文档、多文件分析方面的独特优势。', 'Kimi是月之暗面推出的AI助手，最大特点是支持超长文本处理，可一次性处理20万字以上的内容。本文将详细介绍Kimi的长文本处理能力，包括PDF文档分析、多文件对比、长文章摘要等应用场景，帮助您充分利用这一独特功能。', '', 'AIHub编辑部', 'AIHub3000', 3150, true, NOW(), NOW(), NOW()),

('秘塔AI搜索：无广告的智能搜索体验', '体验秘塔AI搜索带来的全新信息获取方式。', '秘塔AI搜索是一款主打"无广告、深度搜索"的AI搜索引擎。本文将介绍秘塔AI搜索的核心功能，包括智能问答、学术搜索、信息整合等，并与传统搜索引擎对比，展示AI搜索的独特优势。', '', 'AIHub编辑部', 'AIHub3000', 2450, true, NOW(), NOW(), NOW()),

('即梦AI：数字人创作新选择', '探索即梦AI在数字人生成和视频创作方面的创新功能。', '即梦AI是字节跳动推出的AI绘画和视频创作工具，特别擅长数字人生成。本文将介绍即梦AI的数字人创作功能，包括如何生成个性化数字人、如何让数字人说话和动作、如何应用于短视频创作等，帮助内容创作者开拓新的创作方向。', '', 'AIHub编辑部', 'AIHub3000', 2100, true, NOW(), NOW(), NOW());
