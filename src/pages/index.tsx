import { siteConfig } from "@/config/site";
import { categories } from "@/data/tools";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">{siteConfig.name}</h1>
      
      {categories.map((category) => (
        <section key={category.slug} className="mb-12">
          <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.tools.map((tool) => (
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="font-medium">{tool.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>
      ))}

      {/* AdSense广告单元 */}
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={siteConfig.adsenseId}
        data-ad-slot="xxxxxxxxxx"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </div>
  )
}
