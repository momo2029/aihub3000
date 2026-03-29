# AIHub3000 蓝绿部署方案

## 架构设计

```
用户访问 aihub3000.3198.net
    ↓
appcn1 (Nginx 负载均衡 + SSL)
    ↓
┌─────────────────┴─────────────────┐
│                                   │
appcn1 本地                      appcn2 (待定)
├── blue  (8100)               ├── blue  (8100)
└── green (8101)               └── green (8101)
```

## 优势

- **高可用**: 4 个实例，单点故障自动摘除
- **零停机部署**: 滚动更新 green → blue
- **负载均衡**: Nginx 自动分发请求

---

## 部署步骤

### 1. 应用服务器配置 (appcn1 & appcn2)

```bash
# 创建部署目录
mkdir -p /opt/aihub3000
cd /opt/aihub3000

# 上传文件
# - docker-compose.bluegreen.yml
# - .env

# 启动蓝绿实例
docker compose -f docker-compose.bluegreen.yml up -d

# 验证
docker compose ps
curl http://localhost:8100/health
curl http://localhost:8101/health
```

### 2. Nginx 配置 (appcn1)

```bash
# 安装 Nginx (如未安装)
apt install -y nginx

# 复制配置文件
cp docs/nginx.appcn1.conf /etc/nginx/sites-available/aihub3000.3198.net

# 启用配置
ln -sf /etc/nginx/sites-available/aihub3000.3198.net /etc/nginx/sites-enabled/

# 申请 SSL 证书
certbot --nginx -d aihub3000.3198.net

# 测试并重载
nginx -t
systemctl reload nginx
```

### 3. 验证部署

```bash
# 检查负载均衡
curl -I https://aihub3000.3198.net/health

# 多次请求验证分发
for i in {1..10}; do curl -s https://aihub3000.3198.net/health; echo; done
```

---

## 滚动更新流程

```bash
# 在 appcn1 和 appcn2 上执行

# 1. 更新 green 实例
docker compose -f docker-compose.bluegreen.yml pull aihub3000-green
docker compose -f docker-compose.bluegreen.yml up -d aihub3000-green
sleep 15

# 2. 更新 blue 实例
docker compose -f docker-compose.bluegreen.yml pull aihub3000-blue
docker compose -f docker-compose.bluegreen.yml up -d aihub3000-blue
```

---

## 常用命令

```bash
# 查看日志
docker compose logs -f aihub3000-blue
docker compose logs -f aihub3000-green

# 重启单个实例
docker compose restart aihub3000-blue

# 查看 Nginx 日志 (appcn1)
tail -f /var/log/nginx/aihub3000.access.log
```
