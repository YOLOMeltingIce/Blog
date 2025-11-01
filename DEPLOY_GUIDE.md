# Vercel 部署指南

## 📋 部署前检查

### 1. 确保所有功能正常
- ✅ 本地运行正常 (`npm run dev`)
- ✅ 数据拉取正常 (`npm run fetch-data`)
- ✅ 筛选功能正常
- ✅ 下拉框样式正常

---

## 🚀 部署步骤

### Step 1: 提交代码到Git

```bash
# 添加所有修改的文件
git add .

# 提交
git commit -m "feat: 优化筛选功能和下拉框样式，添加产品体验页面"

# 推送到GitHub
git push origin main
```

### Step 2: Vercel自动部署

推送到GitHub后，Vercel会自动检测并部署：
- 访问 https://vercel.com/dashboard
- 查看项目构建状态
- 等待部署完成（通常2-3分钟）

---

## 🔐 环境变量配置

确保Vercel中已配置以下环境变量：

进入 **Project Settings → Environment Variables**，添加：

```
NOTION_TOKEN=secret_your_actual_token_here
NOTION_PAPERS_DATABASE_ID=your_papers_database_id
NOTION_PROJECTS_DATABASE_ID=your_projects_database_id
NOTION_AI_TIMELINE_DATABASE_ID=your_ai_timeline_database_id
NOTION_PRODUCTS_DATABASE_ID=your_products_database_id
```

> **注意**：这些变量应该在之前部署时已经配置好了。如果没有，需要添加。

---

## 📝 本次更新内容

### 新增功能
- ✅ 产品体验页面 (`/products`)
- ✅ 自定义下拉选择框组件
- ✅ 论文按分类筛选
- ✅ 产品按类别和国家筛选

### 优化改进
- ✅ 论文分类字段显示
- ✅ 下拉框暗色主题
- ✅ 下拉框层级和定位
- ✅ 动画速度优化
- ✅ 数据拉取流程优化

### 样式调整
- ✅ 筛选框渐变背景和毛玻璃效果
- ✅ 发光边框和阴影
- ✅ 自定义下拉选项样式
- ✅ 产品卡片紧凑布局

---

## 🎯 部署后验证

部署完成后，访问您的Vercel域名，检查：

1. **首页** - 正常显示
2. **研读页面** (`/papers`)
   - 分类筛选正常
   - 下拉框样式正确
   - 论文信息完整

3. **产品体验页面** (`/products`) 
   - 类别和国家筛选正常
   - 产品卡片显示正确
   - 固定高度滚动正常

4. **项目页面** (`/projects`) - 正常显示
5. **AI时间轴** (`/ai-timeline`) - 正常显示

---

## 🐛 常见问题

### Q: 构建失败，提示缺少环境变量
**A**: 在Vercel项目设置中添加所有必需的环境变量

### Q: 页面显示"暂无数据"
**A**: 检查构建日志，确保 `npm run build` 成功拉取了数据

### Q: 图片无法显示
**A**: 确保 `next.config.js` 中配置了Notion图片域名

### Q: 样式不正确
**A**: 清除Vercel缓存并重新部署：
```bash
vercel --prod --force
```

---

## 🔄 后续更新

以后更新内容时，只需：

```bash
# 1. 修改代码
# 2. 提交并推送
git add .
git commit -m "描述你的改动"
git push origin main

# 3. Vercel自动部署
```

---

## 📞 需要帮助？

- Vercel文档: https://vercel.com/docs
- Next.js文档: https://nextjs.org/docs
- 项目仓库: https://github.com/YOLOMeltingIce/Blog

