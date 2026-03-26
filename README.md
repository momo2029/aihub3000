# AIHub3000

AI工具导航与聚合平台 - 一站式发现和使用AI工具

## 项目结构

```
aihub3000/
├── backend/                    # 后端服务 (Python FastAPI)
│   ├── app/
│   │   ├── api/v1/            # API路由
│   │   ├── models/            # 数据模型
│   │   ├── schemas/           # Pydantic模型
│   │   ├── services/          # 业务逻辑
│   │   ├── utils/             # 工具函数
│   │   ├── config.py          # 配置
│   │   ├── database.py        # 数据库连接
│   │   └── main.py            # 入口文件
│   ├── requirements.txt       # Python依赖
│   ├── init_db.py             # 数据库初始化脚本
│   └── run.sh                 # 启动脚本
├── apps/
│   ├── wechat-miniprogram/    # 微信小程序
│   │   ├── pages/             # 页面
│   │   ├── components/        # 组件
│   │   ├── utils/             # 工具函数
│   │   ├── images/            # 图片资源
│   │   ├── styles/            # 样式
│   │   ├── app.js             # 小程序入口
│   │   ├── app.json           # 小程序配置
│   │   └── app.wxss           # 全局样式
│   ├── alipay-miniprogram/    # 支付宝小程序 (待开发)
│   ├── douyin-miniprogram/    # 抖音小程序 (待开发)
│   ├── ios-app/               # iOS APP (待开发)
│   └── android-app/           # Android APP (待开发)
├── shared/                      # 共享资源
│   ├── assets/                  # 图标、图片等
│   ├── styles/                  # 共享样式
│   └── config/                  # 共享配置
└── docs/                        # 项目文档
```

## 技术栈

### 后端
- Python 3.11+
- FastAPI
- PostgreSQL
- Redis
- SQLAlchemy

### 前端
- 微信小程序: 原生开发
- 支付宝小程序: 原生开发 (待开发)
- 抖音小程序: 原生开发 (待开发)
- iOS APP: Swift + SwiftUI (待开发)
- Android APP: Kotlin + Jetpack Compose (待开发)

## 功能特性

- AI工具导航与分类
- AI工具集合（绘画、效率、多媒体）
- AI资讯平台
- 用户收藏与浏览历史

## 快速开始

### 后端启动

1. 安装依赖
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，配置数据库连接等
```

3. 初始化数据库
```bash
python init_db.py
```

4. 启动服务
```bash
./run.sh
# 或
uvicorn app.main:app --reload
```

5. 访问API文档
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 微信小程序

1. 使用微信开发者工具打开 `apps/wechat-miniprogram` 目录

2. 在 `utils/api.js` 中设置 `USE_MOCK = true` 使用Mock数据开发

3. 修改 `project.config.json` 中的 `appid` 为你的小程序AppID

4. 点击编译预览

## API 接口

### 工具相关
- `GET /api/v1/tools` - 获取工具列表
- `GET /api/v1/tools/categories` - 获取工具分类
- `GET /api/v1/tools/{id}` - 获取工具详情
- `POST /api/v1/tools` - 创建工具 (管理后台)
- `PUT /api/v1/tools/{id}` - 更新工具 (管理后台)
- `DELETE /api/v1/tools/{id}` - 删除工具 (管理后台)

### 文章相关
- `GET /api/v1/articles` - 获取文章列表
- `GET /api/v1/articles/{id}` - 获取文章详情
- `POST /api/v1/articles` - 创建文章 (管理后台)
- `PUT /api/v1/articles/{id}` - 更新文章 (管理后台)
- `DELETE /api/v1/articles/{id}` - 删除文章 (管理后台)

### 用户相关
- `POST /api/v1/users/login` - 用户登录
- `GET /api/v1/users/me` - 获取当前用户信息
- `GET /api/v1/users/favorites` - 获取收藏列表
- `POST /api/v1/users/favorites/{tool_id}` - 添加收藏
- `DELETE /api/v1/users/favorites/{tool_id}` - 取消收藏
- `GET /api/v1/users/history` - 获取浏览历史

## 部署

### 生产环境

- **域名**: https://aihub3000.3198.net
- **服务器**: appcn1 (123.57.181.97)
- **部署方式**: Docker + GitHub Actions 自动部署

### 部署文档

- [部署指南](docs/deploy.md)
- [GitHub Secrets 配置](docs/github-secrets.md)
- [Nginx 配置](docs/nginx.aihub3000.conf)

### 自动部署流程

1. 代码推送到 `main` 分支
2. GitHub Actions 自动构建 Docker 镜像
3. 推送镜像到阿里云 ACR
4. SSH 连接服务器拉取镜像并重启

### 手动部署

```bash
# SSH 到服务器
ssh root@123.57.181.97

# 进入部署目录
cd /opt/aihub3000

# 拉取镜像并重启
docker compose pull && docker compose up -d
```

## 开发进度

- [x] 后端框架搭建
- [x] 数据库模型设计
- [x] API接口开发
- [x] 微信小程序开发
- [x] GitHub Actions 自动部署
- [ ] 支付宝小程序适配
- [ ] 抖音小程序适配
- [ ] iOS APP开发
- [ ] Android APP开发
- [ ] 管理后台开发

## License

MIT