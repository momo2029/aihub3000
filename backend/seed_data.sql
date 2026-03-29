-- 插入工具数据
INSERT INTO tools (name, description, icon, cover, url, category, tags, features, pricing, rating, view_count, favorite_count, status, is_featured, is_hot, created_at, updated_at) VALUES
('文心一格', '百度推出的AI绘画工具，一语成画，支持国风、油画、水彩等多种艺术风格。', '', '', 'https://yige.baidu.com', 'PAINTING', '["AI绘画", "国产", "百度"]', '["一语成画", "多种风格", "零门槛创作", "高清输出"]', 'freemium', 4.7, 18500, 4200, 'ACTIVE', true, true, NOW(), NOW()),
('通义万相', '阿里云推出的AI视觉生成平台，支持图像生成、视频生成、3D内容创作。', '', '', 'https://tongyi.aliyun.com/wanxiang', 'MULTIMEDIA', '["AI视频", "图像生成", "阿里云"]', '["文生图", "文生视频", "图像编辑", "3D生成"]', 'freemium', 4.8, 22000, 5100, 'ACTIVE', true, true, NOW(), NOW()),
('豆包', '字节跳动推出的AI助手，日活极高，支持智能对话、内容创作、生活助手等功能。', '', '', 'https://www.doubao.com', 'EFFICIENCY', '["AI对话", "国产", "字节跳动"]', '["智能对话", "内容创作", "生活助手", "多场景应用"]', 'free', 4.6, 35000, 8900, 'ACTIVE', true, true, NOW(), NOW()),
('通义千问', '阿里云大模型，深度整合阿里生态，支持淘宝、飞猪、高德等服务闭环。', '', '', 'https://tongyi.aliyun.com', 'EFFICIENCY', '["AI对话", "阿里云", "生态整合"]', '["智能对话", "生态闭环", "办事能力", "多模态"]', 'freemium', 4.7, 28000, 6500, 'ACTIVE', true, true, NOW(), NOW());
