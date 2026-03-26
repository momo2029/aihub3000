# GitHub Actions Secrets 配置指南

## 必需的 Secrets

在 GitHub 仓库的 Settings -> Secrets and variables -> Actions 中添加以下 secrets：

### 1. SSH_PRIVATE_KEY
SSH 私钥，用于连接部署服务器。

```bash
# 生成 SSH 密钥对（如果没有）
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_key

# 查看私钥内容
cat ~/.ssh/github_actions_key
```

将私钥内容复制到 `SSH_PRIVATE_KEY`。

然后将公钥添加到服务器的 `~/.ssh/authorized_keys`：
```bash
# 在服务器上执行
echo "ssh-ed25519 AAAA... github-actions" >> ~/.ssh/authorized_keys
```

### 2. SSH_HOST
服务器 IP 地址：`123.57.181.97`

### 3. SSH_USER
SSH 用户名：`root`

### 4. ALIYUN_USERNAME
阿里云容器镜像服务用户名

### 5. ALIYUN_PASSWORD
阿里云容器镜像服务密码

### 6. ENV_FILE
生产环境变量文件内容，格式如下：

```
APP_NAME=AIHub3000
APP_ENV=production
DEBUG=false
SECRET_KEY=<your-secret-key>
DATABASE_URL=postgresql+asyncpg://aihub3000_user:<password>@b1t6k4nmxw1dbv.28920.com:8899/aihub3000_db
REDIS_URL=redis://:2sK7pR9dG3mQ6zW8bN5@b1t6k4nmxw1dbv.28920.com:8900/0
JWT_SECRET_KEY=<your-jwt-secret>
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=1440
WECHAT_APPID=<your-wechat-appid>
WECHAT_SECRET=<your-wechat-secret>
```

## 配置步骤

1. 进入 GitHub 仓库
2. 点击 Settings 标签
3. 在左侧菜单选择 Secrets and variables -> Actions
4. 点击 "New repository secret"
5. 输入 Name 和 Value
6. 点击 "Add secret"
7. 重复以上步骤添加所有 secrets

## 验证配置

推送代码到 main 分支后，在 Actions 标签页查看工作流运行状态。