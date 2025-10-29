# Notion API 配置指南

## 所需信息

你需要提供以下四个信息来配置环境变量：

### 1. NOTION_TOKEN
- **获取方式**: 访问 [Notion Developers](https://developers.notion.com/)
- **位置**: 创建集成后，在 "Secrets" 标签页中找到 "Internal Integration Token"
- **格式**: 以 `secret_` 开头的字符串

### 2. 数据库 ID
每个数据库的 ID 可以从数据库页面的 URL 中获取：

- **AI 时间轴数据库 ID** (`NOTION_AI_TIMELINE_DATABASE_ID`)
- **论文读后感数据库 ID** (`NOTION_PAPERS_DATABASE_ID`)
- **项目经历数据库 ID** (`NOTION_PROJECTS_DATABASE_ID`)

**获取数据库 ID 的方法：**
1. 打开你的 Notion 数据库页面
2. 查看浏览器地址栏的 URL
3. URL 格式类似：`https://www.notion.so/workspace/数据库ID?v=...`
4. 复制 URL 中 `so/` 和 `?` 之间的部分

**示例：**
```
URL: https://www.notion.so/workspace/12345678-abcd-1234-5678-123456789012?v=...
数据库 ID: 12345678-abcd-1234-5678-123456789012
```

## 配置步骤

### 1. 创建环境变量文件

在项目根目录创建 `.env.local` 文件，并添加以下内容：

```env
# Notion API 配置
NOTION_TOKEN=你的_notion_integration_token

# Notion 数据库 ID
NOTION_AI_TIMELINE_DATABASE_ID=你的_AI时间轴数据库_ID
NOTION_PAPERS_DATABASE_ID=你的_论文数据库_ID
NOTION_PROJECTS_DATABASE_ID=你的_项目数据库_ID
```

### 2. 验证配置

配置完成后，运行以下命令测试：

```bash
npm run build
```

如果看到类似以下输出，说明配置成功：
```
✓ Compiled successfully
✓ Generating static pages (8/8)
```

如果仍有 "not configured" 警告，请检查环境变量值是否正确。

## 数据库结构要求

### AI 时间轴数据库
需要包含以下属性：
- Title (标题) - 标题类型
- Date (日期) - 日期类型
- Description (描述) - 文本类型
- Category (分类) - 选择类型
- Impact (影响) - 文本类型

### 论文读后感数据库
需要包含以下属性：
- Title (标题) - 标题类型
- Authors (作者) - 多选类型
- Journal (期刊) - 文本类型
- Year (年份) - 数字类型
- Review (读后感) - 文本类型
- KeyInsights (关键洞见) - 多选类型
- Rating (评分) - 数字类型
- ReadDate (阅读日期) - 日期类型

### 项目经历数据库
需要包含以下属性：
- Title (标题) - 标题类型
- Description (描述) - 文本类型
- Technologies (技术栈) - 多选类型
- GithubURL (GitHub 链接) - 文本类型
- DemoURL (演示链接) - 文本类型
- StartDate (开始日期) - 日期类型
- EndDate (结束日期) - 日期类型
- Status (状态) - 选择类型 (completed/in-progress/planned)
- Highlights (项目亮点) - 多选类型

## 故障排除

### 常见问题

1. **"NOTION_TOKEN not configured"**
   - 检查 NOTION_TOKEN 是否正确设置
   - 确保集成 token 以 `secret_` 开头

2. **数据库无数据**
   - 检查数据库 ID 是否正确
   - 确保集成已添加到数据库中
   - 验证数据库权限设置

3. **构建失败**
   - 确保所有环境变量都已设置
   - 检查数据库 ID 格式（应该是 36 位 UUID）

### 测试连接

你可以通过以下方式测试 Notion API 连接：

1. 确保集成已添加到所有三个数据库
2. 检查数据库共享设置
3. 运行 `npm run build` 查看是否有错误信息
