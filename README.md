# DevToolBox - 出海开发者导航

DevToolBox 是一个专为出海开发者打造的精选工具导航网站。我们汇集了从开发、设计、需求调研到 SEO 推广、支付合规等全链路的优质资源，旨在助力开发者更高效地进行全球化产品构建。

<!-- 
待添加项目预览图：
1. 将网页截图保存为 images/preview.png
2. 取消下方注释并提交
![DevToolBox Preview](images/preview.png)
-->

## ✨ 功能特点

- **精选资源**：收录 50+ 个高质量开发与运营工具。
- **分类清晰**：涵盖开发工具、网站建设、AI 创新、支付合规等 10+ 个核心分类。
- **实时搜索**：支持通过关键词、标签快速查找所需工具。
- **极速体验**：纯静态页面，加载速度快，无广告干扰。
- **响应式设计**：完美适配桌面、平板和移动端设备。
- **科技感 UI**：采用现代化的暗色系 Cyberpunk 风格设计。

## 📂 项目结构

```
Indie-Dev-Nav-Starter/
├── css/
│   └── styles.css      # 核心样式文件
├── js/
│   ├── main.js         # 页面交互逻辑 (渲染、搜索、过滤)
│   └── tools.js        # 工具数据源 (JSON 格式配置)
├── index.html          # 网站主入口
├── spider.js           # (开发辅助) 图标抓取脚本
└── package.json        # 项目依赖配置
```

## 🚀 快速开始

本项目是一个静态网站，你可以直接通过任何 Web 服务器运行。

### 本地开发

1. **克隆仓库**
   ```bash
   git clone https://github.com/Sniper1211/Indie-Dev-Nav-Starter.git
   cd Indie-Dev-Nav-Starter
   ```

2. **启动服务**
   
   如果你安装了 Python (Mac/Linux 通常预装)：
   ```bash
   python3 -m http.server 8080
   ```
   
   或者使用 Node.js 的 `http-server`：
   ```bash
   npx http-server
   ```

3. **访问网站**
   打开浏览器访问 `http://localhost:8080` 即可预览。

## 🤝 如何贡献

欢迎提交新的优质工具或改进建议！

### 添加新工具

1. Fork 本仓库。
2. 编辑 `js/tools.js` 文件。
3. 在 `tools` 数组中找到合适的分类，或在末尾添加新的工具对象：
   ```javascript
   {
       category: '分类名称', // 例如：'开发工具', 'AI与创新'
       name: '工具名称',
       url: 'https://example.com',
       tags: ['标签1', '标签2'],
       desc: '一句话描述该工具的主要功能'
   }
   ```
4. 提交 Pull Request。

### 提交 Issue

如果你发现了 Bug 或有功能建议，欢迎在 [Issues](https://github.com/Sniper1211/Indie-Dev-Nav-Starter/issues) 页面提交反馈。

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。
