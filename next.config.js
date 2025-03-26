/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // 开启静态导出模式
    trailingSlash: true,
    images: {
      unoptimized: true, // Cloudflare Pages需要关闭图片优化
    },
}

module.exports = nextConfig