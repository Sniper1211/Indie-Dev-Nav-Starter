const fs = require('fs');
const path = require('path');
const { tools } = require('../js/tools.js');

const BASE_URL = 'https://www.indiestarter.space';
const OUTPUT_FILE = path.join(__dirname, '../sitemap.xml');

// 过滤 AI 工具
const aiTools = tools.filter(t => t.category === 'AI与创新');

// 辅助函数：生成 slug (与 build_ai_pages.js 保持一致)
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

// 静态页面配置
const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/ai/', priority: '0.9', changefreq: 'daily' }
];

// 生成 XML 内容
let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// 1. 添加静态页面
staticPages.forEach(page => {
    sitemapContent += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
});

// 2. 添加 AI 详情页
aiTools.forEach(tool => {
    const slug = tool.id || slugify(tool.name);
    sitemapContent += `  <url>
    <loc>${BASE_URL}/ai/${slug}.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

sitemapContent += `</urlset>`;

// 写入文件
try {
    fs.writeFileSync(OUTPUT_FILE, sitemapContent);
    console.log(`✅ Sitemap successfully generated at: ${OUTPUT_FILE}`);
    console.log(`Total URLs: ${staticPages.length + aiTools.length}`);
} catch (error) {
    console.error('Error writing sitemap:', error);
    process.exit(1);
}
