const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const IMAGE_DIR = path.join(__dirname, 'images');
const TOOLS_PATH = path.join(__dirname, 'js', 'tools.js');

// 创建图片目录
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// 解析工具数据
const toolsContent = fs.readFileSync(TOOLS_PATH, 'utf8');
const toolsMatch = toolsContent.match(/const\s+tools\s*=\s*(\[[\s\S]*?\]\s*);\s*\/\/\s*分类图标映射/);
const tools = eval(toolsMatch[1]);

// 获取网站图标URL
async function getIconUrl(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    // 精确匹配标准尺寸图标
    const iconPath = $('link[rel="icon"][sizes="32x32"], link[rel="icon"][sizes="16x16"]').attr('href')
                   || $('link[rel="apple-touch-icon"][sizes="180x180"]').attr('href')
                   || $('link[rel="mask-icon"]').attr('href')
                   || $('link[rel="shortcut icon"]').attr('href')
                   || $('link[rel="icon"]').attr('href')
                   || new URL('/favicon.ico', url).href;

    // 清理图片URL中的尺寸参数
    return iconPath.replace(/\?(w=|h=|size=).*$/, '');
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

// 下载并保存图标
async function saveIcon(iconUrl, toolName) {
  try {
    const response = await axios.get(iconUrl, { responseType: 'arraybuffer' });
    
    // 使用Sharp验证图像尺寸
    const image = sharp(response.data);
    const metadata = await image.metadata();
    
    // 允许常见苹果图标尺寸（180x180）
    const allowedSizes = [[32,32], [16,16], [180,180], [192,192], [512,512]];
    if (!allowedSizes.some(([w,h]) => metadata.width === w && metadata.height === h)) {
      console.log(`跳过非标准尺寸图片: ${metadata.width}x${metadata.height}`);
      return null;
    }

    // 从URL提取域名作为文件名
    const parsedUrl = new URL(iconUrl);
    const baseName = path.basename(parsedUrl.pathname.split('?')[0]);
    const sanitizedName = baseName.replace(/[^a-zA-Z0-9-]/g, '_');
    const fileExt = parsedUrl.pathname.split('.').pop().toLowerCase();
    const validExt = ['svg', 'png', 'ico'].includes(fileExt) ? fileExt : 'svg';
    const filename = `${parsedUrl.hostname.replace('www.', '')}_${sanitizedName}.${validExt}`.toLowerCase().replace(/[^a-z0-9._-]/g, '_');
    const filePath = path.join(IMAGE_DIR, filename);
    
    // 根据实际文件类型保存
    fs.writeFileSync(filePath, response.data);
    return `images/${filename}`;
  } catch (error) {
    console.error(`Error saving icon for ${toolName}:`, error.message);
    return null;
  }
}

// 主执行函数
async function main() {
  // 测试时处理前三个工具
  for (const tool of tools.slice(0, 3)) {
    console.log('正在处理:', tool.name);
    console.log('目标URL:', tool.url);
    try {
      const iconUrl = await getIconUrl(tool.url);
      if (!iconUrl) continue;

      const localPath = await saveIcon(iconUrl, tool.name);
      if (localPath) {
        tool.localIcon = localPath;
        console.log(`图标已保存到: ${localPath}`);
        console.log('更新后的工具数据:', JSON.stringify(tool, null, 2));
      }
    } catch (error) {
      console.error(`Failed to process ${tool.name}:`, error.message);
    }
  }

  // 更新tools.js文件
  console.log('\n最终更新内容预览:');
  const updatedContent = toolsContent.replace(
    /const tools = [\s\S]*?;\n\nconst categoryIcons/,
    `const tools = ${JSON.stringify(tools, null, 2)};\n\nconst categoryIcons`
  );
  console.log(updatedContent.slice(0, 500) + '...');
  
  fs.writeFileSync(TOOLS_PATH, updatedContent);
  console.log('工具数据更新完成！');
}

main();