# Blog 项目

这是一个使用 Next.js 构建的博客项目。该项目旨在提供一个简单的博客平台，用户可以在其中发布和管理文章。

## 项目结构

- `src/pages`：包含应用程序的页面。
  - `_app.tsx`：自定义应用程序的入口点。
  - `_document.tsx`：自定义 HTML 文档的结构。
  - `index.tsx`：应用程序的主页。
  - `api/hello.ts`：定义 API 路由，处理对 `/api/hello` 的请求。

- `src/styles`：包含全局样式。
  - `globals.css`：全局样式文件。

- `src/components`：包含应用程序的组件。
  - `layout.tsx`：定义应用程序的布局组件。

- `public`：存放静态资源，如图像和字体。

## 安装与运行

1. 克隆项目到本地：
   ```bash
   git clone https://github.com/YOLOMeltingIce/Blog.git
   ```

2. 进入项目目录：
   ```bash
   cd Blog
   ```

3. 安装依赖：
   ```bash
   npm install
   ```

4. 运行开发服务器：
   ```bash
   npm run dev
   ```

5. 打开浏览器访问 `http://localhost:3000` 查看应用程序。

## 部署

该项目可以通过 Vercel 进行部署。只需将代码推送到 GitHub 仓库，Vercel 将自动检测并部署您的应用程序。

## 许可证

此项目采用 MIT 许可证。有关更多信息，请参阅 LICENSE 文件。