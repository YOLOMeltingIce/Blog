# 博客部署指南

## 方案：GitHub + Vercel 持续部署

本指南将帮助您将博客部署到 GitHub 并通过 Vercel 实现持续部署，这样每次更新代码后都会自动重新部署。

## 第一步：准备工作

### 1. 安装 Git（如果尚未安装）
1. 访问 https://git-scm.com/downloads
2. 下载 Windows 版本的 Git
3. 运行安装程序并按照默认设置进行安装

### 2. 配置 Git
打开命令提示符或 PowerShell，运行以下命令：
```bash
git config --global user.name "您的用户名"
git config --global user.email "您的邮箱@example.com"
```

## 第二步：创建 GitHub 仓库

1. 访问 https://github.com 并登录您的账户
2. 点击右上角的 "+" 号，选择 "New repository"
3. 输入仓库名称（例如：`my-ai-blog`）
4. 选择公开（Public）或私有（Private）
5. 不要初始化 README、.gitignore 或许可证
6. 点击 "Create repository"

## 第三步：将代码推送到 GitHub

在项目根目录下打开命令提示符或 PowerShell，执行以下命令：

```bash
# 初始化本地仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 添加远程仓库（使用您在 GitHub 上创建的仓库 URL）
git remote add origin https://github.com/您的用户名/仓库名.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 第四步：连接到 Vercel

1. 访问 https://vercel.com 并使用 GitHub 账户登录
2. 点击 "Add New Project"
3. 选择您刚刚创建的仓库
4. 在项目设置中配置环境变量：

从您的 `environment-setup.txt` 文件中，您需要配置以下环境变量（使用你自己的值）：
   - NOTION_TOKEN = your_notion_integration_token
   - NOTION_AI_TIMELINE_DATABASE_ID = your_ai_timeline_database_id
   - NOTION_PAPERS_DATABASE_ID = your_papers_database_id
   - NOTION_PROJECTS_DATABASE_ID = your_projects_database_id

5. 点击 "Deploy"

## 第五步：配置自动部署

连接到 Vercel 后，每次您向 GitHub 仓库推送代码时，Vercel 都会自动重新部署您的网站。

## 部署后访问

部署完成后，Vercel 会为您提供一个网址，类似：`my-ai-blog.vercel.app`
这就是您的博客地址，可以分享给面试官查看。

## 更新内容流程

当您需要更新博客内容时：

1. 更新 Notion 中的数据
2. 在本地运行 `npm run fetch-data` 获取最新数据
3. 提交并推送到 GitHub
4. Vercel 会自动重新部署

这样就实现了持续集成和持续部署（CI/CD）。

## 常见问题和解决方案

### 1. 部署时出现构建错误
如果部署时出现构建错误，可能是因为环境变量未正确配置。请确保在 Vercel 项目设置中正确设置了所有 Notion 相关的环境变量。

### 2. 内容更新后没有显示最新数据
如果您更新了 Notion 中的内容但网站未显示最新数据，请确保：
1. 在本地运行 `npm run fetch-data` 命令获取最新数据
2. 将更新后的数据文件提交到 GitHub
3. 等待 Vercel 完成自动部署

### 3. 网站访问速度慢
如果网站访问速度较慢，可以考虑：
1. 检查 Notion API 的响应速度
2. 确保网络连接正常
3. 如有需要，可联系 Vercel 支持团队

## 定制化建议

### 1. 个性化域名
您可以在 Vercel 中配置自定义域名，将博客绑定到您自己的域名上。

### 2. SEO 优化
考虑添加页面元数据（meta tags）和站点地图（sitemap）以提高搜索引擎可见性。

### 3. 分析工具
可以集成 Google Analytics 或其他分析工具来跟踪访问者行为。