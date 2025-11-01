# 数据获取流程说明

## 📊 数据流程架构

### 1️⃣ 数据获取（仅启动时执行一次）

```
启动项目 → 自动运行 fetch-notion-data.js → 从Notion获取数据 → 保存到 data/*.json
```

### 2️⃣ 页面渲染（从本地JSON读取）

```
页面组件 → getLocalXxxData() → 读取 data/*.json → 显示数据
```

---

## 🚀 启动命令

### 开发环境
```bash
npm run dev
```
- **自动执行**：运行前会先执行 `predev` 钩子
- **数据拉取**：`predev` → `node scripts/fetch-notion-data.js`
- **启动服务**：`next dev`

### 生产构建
```bash
npm run build
```
- **数据拉取**：先执行 `node scripts/fetch-notion-data.js`
- **构建项目**：然后执行 `next build`

### 手动更新数据
```bash
npm run fetch-data
```
- 手动从Notion重新拉取数据，无需重启项目

---

## 📁 数据文件结构

```
data/
├── papers.json          # 论文数据
├── projects.json        # 项目数据
├── ai-timeline.json     # AI时间轴数据
├── products.json        # 产品体验数据
└── summary.json         # 数据摘要
```

---

## 🔄 数据读取逻辑

### 页面组件
```typescript
// src/app/papers/page.tsx
import { getLocalPapersData } from '@/lib/local-data'

async function getPaperReviews() {
  return await getLocalPapersData()  // ✅ 从本地JSON读取
}
```

### 本地数据读取
```typescript
// src/lib/local-data.ts
export async function getLocalPapersData() {
  const fileContent = fs.readFileSync(PAPERS_FILE, 'utf-8')
  const data = JSON.parse(fileContent)
  return data.papers
}
```

---

## ✅ 关键特性

1. **启动时自动拉取**
   - 使用 `predev` 钩子确保开发时数据最新
   - 构建时也会自动拉取数据

2. **运行时不调用API**
   - 所有页面从本地JSON文件读取
   - 不依赖Notion API可用性
   - 页面加载速度快

3. **按需手动更新**
   - 运行 `npm run fetch-data` 手动更新
   - 无需重启开发服务器

---

## 🔐 环境变量

确保 `.env.local` 文件包含：
```env
NOTION_TOKEN=secret_xxx
NOTION_PAPERS_DATABASE_ID=xxx
NOTION_PROJECTS_DATABASE_ID=xxx
NOTION_AI_TIMELINE_DATABASE_ID=xxx
NOTION_PRODUCTS_DATABASE_ID=xxx
```

---

## 🎯 优势

- ✅ **性能优化**：页面加载不需要等待Notion API响应
- ✅ **稳定性**：即使Notion API不可用，网站仍可正常访问
- ✅ **开发体验**：启动时自动拉取最新数据，无需手动操作
- ✅ **灵活性**：支持手动更新数据而无需重启

---

## 📝 注意事项

1. 首次运行前，确保 `.env.local` 配置正确
2. 确保Notion数据库已共享给Integration
3. 数据会在每次 `npm run dev` 或 `npm run build` 时更新
4. 如需在开发过程中更新数据，运行 `npm run fetch-data`

