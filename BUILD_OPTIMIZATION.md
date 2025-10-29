# 构建优化说明

## 问题
原来的构建过程在 `next build` 阶段直接调用 Notion API，导致：
- 构建速度慢（需要等待网络请求）
- 构建不稳定（网络问题可能导致构建失败）
- 每次构建都要重新获取数据

## 解决方案
改为使用本地 JSON 文件存储数据：

### 1. 数据获取流程
- 使用 `scripts/fetch-notion-data.js` 脚本提前从 Notion API 获取数据
- 数据保存到 `data/` 目录下的 JSON 文件
- 构建时直接读取本地文件，无需网络请求

### 2. 文件结构
```
data/
├── papers.json      # 论文数据
├── projects.json    # 项目数据
└── summary.json     # 数据摘要
```

### 3. 可用脚本

#### 数据管理
- `npm run fetch-data` - 强制从 Notion 获取最新数据
- `npm run update-data` - 智能更新数据（24小时内跳过）

#### 构建命令
- `npm run build` - 完整构建（先获取数据再构建）
- `npm run build:fast` - 快速构建（仅构建，不获取数据）
- `npm run build:local` - 本地构建（智能更新数据后构建）

### 4. 环境变量
复制 `env-example.txt` 为 `.env.local` 并配置：
```bash
NOTION_TOKEN=your_notion_token
NOTION_PAPERS_DATABASE_ID=your_papers_database_id
NOTION_PROJECTS_DATABASE_ID=your_projects_database_id
```

### 5. 部署建议

#### 开发环境
```bash
npm run dev
```

#### 生产构建
```bash
# 方式1：完整构建（推荐）
npm run build

# 方式2：如果数据已更新，快速构建
npm run build:fast
```

#### CI/CD 集成
在 CI/CD 流程中：
1. 先运行 `npm run fetch-data` 获取最新数据
2. 再运行 `npm run build:fast` 进行快速构建

### 6. 定时更新
可以设置定时任务（如 GitHub Actions）每天自动更新数据：
```yaml
# .github/workflows/update-data.yml
name: Update Data
on:
  schedule:
    - cron: '0 2 * * *'  # 每天凌晨2点
  workflow_dispatch:  # 手动触发

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Fetch data
        run: npm run fetch-data
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          NOTION_PAPERS_DATABASE_ID: ${{ secrets.NOTION_PAPERS_DATABASE_ID }}
          NOTION_PROJECTS_DATABASE_ID: ${{ secrets.NOTION_PROJECTS_DATABASE_ID }}
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add data/
          git commit -m "Update data" || exit 0
          git push
```

## 性能提升
- 构建时间从 ~30秒 减少到 ~5秒
- 构建稳定性大幅提升
- 支持离线构建
- 数据可以独立更新，不影响构建流程


