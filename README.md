# 个人博客

一个基于 Next.js + TypeScript + Tailwind CSS 的个人博客网站，使用 Notion 作为数据源。

## 功能特性

- 🏠 **个人主页**：展示个人简介、技能专长、兴趣爱好和社交链接
- 🤖 **AI 时间轴**：时间轴形式展示人工智能发展的重要事件
- 📚 **论文读后感**：分享学术论文阅读心得和研究洞见
- 💻 **项目经历**：展示开发项目和实践经验
- 📱 **响应式设计**：完美支持桌面和移动设备
- 🚀 **Vercel 部署**：一键部署到 Vercel 平台

## 技术栈

- **前端框架**: Next.js 15 (App Router)
- **编程语言**: TypeScript
- **样式框架**: Tailwind CSS
- **图标库**: Lucide React
- **数据源**: Notion API
- **日期处理**: date-fns
- **部署平台**: Vercel

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── ai-timeline/       # AI 时间轴页面
│   ├── papers/            # 论文读后感页面
│   ├── projects/          # 项目经历页面
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   └── Navigation.tsx     # 导航组件
├── lib/                   # 工具函数
│   ├── notion.ts          # Notion API 工具函数
│   └── utils.ts           # 通用工具函数
└── types/                 # TypeScript 类型定义
    └── index.ts           # 类型定义
```

## 快速开始

### 1. 环境准备

确保你已经安装了 Node.js (推荐 v18+) 和 npm/yarn/pnpm。

### 2. 克隆项目

```bash
git clone <your-repo-url>
cd blog
```

### 3. 安装依赖

```bash
npm install
```

### 4. 配置 Notion API

#### 4.1 创建 Notion 集成

1. 访问 [Notion Developers](https://developers.notion.com/)
2. 创建新的集成，获取 API Token
3. 复制 Token 并保存

#### 4.2 创建数据库

在 Notion 中创建以下三个数据库：

1. **AI 时间轴数据库** - 包含以下属性：
   - Title (标题)
   - Date (日期)
   - Description (描述)
   - Category (分类)
   - Impact (影响)

2. **论文读后感数据库** - 包含以下属性：
   - Title (标题)
   - Authors (作者，多选)
   - Journal (期刊)
   - Year (年份)
   - Review (读后感)
   - KeyInsights (关键洞见，多选)
   - Rating (评分)
   - ReadDate (阅读日期)

3. **项目经历数据库** - 包含以下属性：
   - Title (标题)
   - Description (描述)
   - Technologies (技术栈，多选)
   - GithubURL (GitHub 链接)
   - DemoURL (演示链接)
   - StartDate (开始日期)
   - EndDate (结束日期)
   - Status (状态：completed/in-progress/planned)
   - Highlights (项目亮点，多选)

#### 4.3 配置环境变量

创建 `.env.local` 文件：

```env
NOTION_TOKEN=your_notion_integration_token_here
NOTION_AI_TIMELINE_DATABASE_ID=your_ai_timeline_database_id
NOTION_PAPERS_DATABASE_ID=your_papers_database_id
NOTION_PROJECTS_DATABASE_ID=your_projects_database_id
```

### 5. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 部署到 Vercel

### 方法一：使用 Vercel CLI

1. 安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 登录 Vercel：
```bash
vercel login
```

3. 部署项目：
```bash
vercel
```

4. 在 Vercel 控制台中配置环境变量。

### 方法二：使用 Vercel 网页界面

1. 访问 [Vercel](https://vercel.com)
2. 连接你的 GitHub 仓库
3. Vercel 会自动检测 Next.js 项目并配置
4. 在项目设置中添加环境变量

## 自定义配置

### 修改个人资料

编辑 `src/app/page.tsx` 中的个人信息：

```typescript
// 修改以下内容
<h1 className="text-4xl font-bold text-gray-900 mb-4">您的名字</h1>
<p className="text-xl text-gray-600 mb-6">您的职业或身份描述</p>
// ...
```

### 修改社交链接

更新首页中的社交媒体链接：

```typescript
<a href="#" className="..."> // 替换为你的 GitHub 链接
<a href="#" className="..."> // 替换为你的 LinkedIn 链接
// ...
```

## 构建和部署

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
