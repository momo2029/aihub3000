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

('秘塔AI搜索', 'AI驱动的智能搜索引擎，支持深度搜索、学术研究。', '', '', 'https://metaso.cn', 'search', ARRAY['AI搜索', '国产', '秘塔'], ARRAY['深度搜索', '学术研究', '信息整合', '无广告'], 'freemium', 5, 14000, 3500, 'active', true, true, NOW(), NOW()),

('DeepSeek', '深度求索推出的AI大模型，支持智能对话、代码生成、文本分析。', '', '', 'https://chat.deepseek.com', 'chat', ARRAY['AI对话', '国产', '深度求索'], ARRAY['智能对话', '代码生成', '文本分析', '开源模型'], 'freemium', 5, 25000, 6000, 'active', true, true, NOW(), NOW());