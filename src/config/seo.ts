import { NextSeoProps } from 'next-seo'

export const seoConfig: NextSeoProps = {
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultTitle: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://your-domain.com',
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
}