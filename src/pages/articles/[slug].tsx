import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { siteConfig } from '@/config/site'

const mockArticle = {
  slug: 'vercel-review',
  title: 'Vercel 部署服务深度评测',
  content: `
    <h2>一、核心功能</h2>
    <p>Vercel 提供全球CDN加速...</p>
    <!-- 更多内容 -->
  `,
  date: '2024-03-20'
}

export default function ArticlePage() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <NextSeo
        title={`${mockArticle.title} - ${siteConfig.name}`}
        description="深度解析Vercel部署服务的优缺点"
      />
      
      <article className="prose lg:prose-xl">
        <h1 className="text-3xl font-bold mb-4">{mockArticle.title}</h1>
        <div 
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: mockArticle.content }}
        />
      </article>

      {/* 相关文章推荐 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">更多推荐阅读</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              AWS Lambda 成本优化指南
            </a>
          </li>
          {/* 更多链接 */}
        </ul>
      </div>
    </div>
  )
}