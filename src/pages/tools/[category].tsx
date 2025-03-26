import { useRouter } from 'next/router'
import { categories } from '@/data/tools'
import { NextSeo } from 'next-seo'
import { siteConfig } from '@/config/site'
import Link from 'next/link'

export default function CategoryPage() {
  const router = useRouter()
  const { category: categorySlug } = router.query
  const currentCategory = categories.find(c => c.slug === categorySlug)

  if (!currentCategory) return <div>Category not found</div>

  return (
    <div className="container mx-auto p-4">
      <NextSeo
        title={`${currentCategory.name} - ${siteConfig.name}`}
        description={`精选${currentCategory.name}工具，助力出海开发`}
      />
      
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">← 返回首页</Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">{currentCategory.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCategory.tools.map((tool, index) => (
          <a
            key={index}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white"
          >
            <h3 className="font-medium text-lg">{tool.name}</h3>
            {tool.price && (
              <span className="text-sm text-green-600 mt-1 block">{tool.price}</span>
            )}
            <p className="text-gray-600 mt-2 text-sm">{tool.description}</p>
            {tool.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tool.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>

      {/* AdSense广告单元 */}
      <div className="mt-8">
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={siteConfig.adsenseId}
          data-ad-slot="xxxxxxxxxx"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = categories.map((category) => ({
    params: { category: category.slug },
  }))
  return { 
    paths, 
    fallback: false 
  }
}

export async function getStaticProps({ params }) {
  return { 
    props: {} 
  }
}