为了帮助您在 GSC 上提交站点地图，我将为您创建一个自动生成 `sitemap.xml` 的脚本。

### 实施计划

1.  **创建生成脚本**
    *   创建新文件：`scripts/generate_sitemap.js`
    *   该脚本将读取 `js/tools.js` 中的数据，并结合静态页面生成标准的 XML 格式。
    *   **Base URL**: `https://www.indiestarter.space`
    *   **包含页面**:
        *   首页 (`/`) - 优先级 1.0
        *   AI 列表页 (`/ai/`) - 优先级 0.9
        *   所有 AI 详情页 (`/ai/xx.html`) - 优先级 0.8

2.  **生成站点地图**
    *   运行脚本生成 `sitemap.xml` 文件到项目根目录。

3.  **提交代码**
    *   将新脚本和生成的 `sitemap.xml` 提交到 Git 仓库。

### 您的后续操作
待我完成后，您只需：
1.  等待代码推送成功。
2.  登录 Google Search Console。
3.  在左侧菜单点击“站点地图 (Sitemaps)”。
4.  输入 `sitemap.xml` 并点击提交。
