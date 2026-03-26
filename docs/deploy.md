# AIHub3000 部署文档

## 服务器信息

- **服务器**: appcn1 (阿里云国内应用服务器)
- **IP**: 123.57.181.97
- **域名**: aihub3000.3198.net
- **部署目录**: /opt/aihub3000
- **端口**: 8100 (内部), 443 (外部)

## 数据库配置

需要在 jdyun 数据库服务器上创建数据库和用户：

```sql
-- 连接 PostgreSQL
psql -h b1t6k4nmxw1dbv.28920.com -p 8899 -U postgres

-- 创建数据库
CREATE DATABASE aihub3000_db;

-- 创建用户
CREATE USER aihub3000_user WITH ENCRYPTED PASSWORD 'your_password';

-- 授权
GRANT ALL PRIVILEGES ON DATABASE aihub3000_db TO aihub3000_user;

-- 连接到新数据库
\c aihub3000_db

-- 授权 schema
GRANT ALL ON SCHEMA public TO aihub3000_user;
```

## 白名单配置

需要在 jdyun 上添加 appcn1 服务器的白名单：

```bash
# iptables 放行 (在 jdyun 上执行)
iptables -I INPUT 9 -p tcp --dport 8899 -s 123.57.181.97 -j ACCEPT
iptables -I INPUT 10 -p tcp --dport 8900 -s 123.57.181.97 -j ACCEPT
netfilter-persistent save
```

编辑 `/etc/postgresql/16/main/pg_hba.conf`：

```
hostssl all             all             123.57.181.97/32        scram-sha-256  # aihub3000 appcn1
```

重载配置：

```bash
systemctl reload postgresql
```

## 服务器初始化

在 appcn1 服务器上执行：

```bash
# 创建部署目录
mkdir -p /opt/aihub3000

# 安装 Docker (如果未安装)
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker

# 安装 Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 登录阿里云 ACR
docker login --username=your_username crpi-1e1v7t6udr8xqx6k.cn-beijing.personal.cr.aliyuncs.com
```

## SSL 证书配置

使用 certbot 申请 Let's Encrypt 证书：

```bash
# 安装 certbot
apt update
apt install certbot python3-certbot-nginx

# 申请证书
certbot --nginx -d aihub3000.3198.net

# 或者手动申请
certbot certonly --nginx -d aihub3000.3198.net
```

证书文件位置：
- `/etc/letsencrypt/live/aihub3000.3198.net/fullchain.pem`
- `/etc/letsencrypt/live/aihub3000.3198.net/privkey.pem`

## Nginx 配置

```bash
# 复制 Nginx 配置
cp docs/nginx.aihub3000.conf /etc/nginx/sites-available/aihub3000.3198.net
ln -s /etc/nginx/sites-available/aihub3000.3198.net /etc/nginx/sites-enabled/

# 测试配置
nginx -t

# 重载 Nginx
systemctl reload nginx
```

## GitHub Actions Secrets

在 GitHub 仓库设置中添加以下 Secrets：

| Secret Name | Description |
|-------------|-------------|
| `SSH_PRIVATE_KEY` | SSH 私钥 (用于连接服务器) |
| `SSH_HOST` | 服务器 IP: `123.57.181.97` |
| `SSH_USER` | SSH 用户: `root` |
| `ALIYUN_USERNAME` | 阿里云 ACR 用户名 |
| `ALIYUN_PASSWORD` | 阿里云 ACR 密码 |
| `ENV_FILE` | 生产环境 .env 文件内容 |

## 部署流程

1. 代码推送到 `main` 分支
2. GitHub Actions 自动构建 Docker 镜像
3. 推送镜像到阿里云 ACR
4. SSH 连接到服务器
5. 拉取最新镜像
6. 重启容器

## 手动部署

```bash
# SSH 到服务器
ssh root@123.57.181.97

# 进入部署目录
cd /opt/aihub3000

# 拉取最新镜像
docker compose pull

# 重启服务
docker compose up -d

# 查看日志
docker compose logs -f
```

## 常用命令

```bash
# 查看容器状态
docker compose ps

# 查看日志
docker compose logs -f

# 重启服务
docker compose restart

# 停止服务
docker compose down

# 进入容器
docker compose exec aihub3000-api bash
```

## 健康检查

```bash
# 本地检查
curl http://localhost:8100/health

# 外部检查
curl https://aihub3000.3198.net/health
```

## 监控和日志

- 访问日志: `/var/log/nginx/aihub3000.access.log`
- 错误日志: `/var/log/nginx/aihub3000.error.log`
- 容器日志: `docker compose logs`