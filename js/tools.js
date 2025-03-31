// 工具数据
const tools = [
    {
        category: '云服务',
        name: 'Vercel',
        url: 'https://vercel.com',
        icon: 'https://api.iconify.design/simple-icons/vercel.svg?color=%23000000',
        tags: ['部署', 'Serverless', '全球CDN'],
        desc: '面向现代Web应用的云平台，支持自动Git部署'
    },
    {
        category: '支付',
        name: 'Stripe',
        url: 'https://stripe.com',
        icon: 'https://icons.duckduckgo.com/ip3/stripe.com.ico',
        tags: ['支付网关', '订阅系统', '全球覆盖'],
        desc: '支持135种货币的全球化支付解决方案'
    },
    {
        category: '合规',
        name: 'Termly',
        url: 'https://termly.io',
        icon: 'https://icons.duckduckgo.com/ip3/termly.io.ico',
        tags: ['GDPR', '隐私政策', '合规'],
        desc: '自动化生成符合各国法律要求的隐私政策'
    },
    {
        category: '云服务',
        name: 'AWS',
        url: 'https://aws.amazon.com',
        icon: 'https://icons.duckduckgo.com/ip3/aws.amazon.com.ico',
        tags: ['云计算', '全球部署', '企业级'],
        desc: '全球领先的云计算平台，提供全面的云服务解决方案'
    },
    {
        category: '支付',
        name: 'PayPal',
        url: 'https://www.paypal.com',
        icon: 'https://www.svgrepo.com/show/448234/paypal.svg',
        tags: ['跨境支付', '安全可靠', '全球覆盖'],
        desc: '全球最大的在线支付平台之一，支持200多个国家和地区'
    },
    {
        category: '合规',
        name: 'OneTrust',
        url: 'https://www.onetrust.com',
        icon: 'https://www.onetrust.com/wp-content/themes/onetrust/assets/images/logo.svg',
        tags: ['隐私管理', '合规自动化', '数据保护'],
        desc: '企业级隐私管理和数据治理平台'
    },
    {
        category: '云服务',
        name: 'Cloudflare',
        url: 'https://www.cloudflare.com',
        icon: 'https://www.svgrepo.com/show/448234/cloudflare.svg',
        tags: ['CDN', 'DDoS防护', 'SSL证书'],
        desc: '全球领先的CDN和安全服务提供商'
    },
    {
        category: '支付',
        name: 'Square',
        url: 'https://squareup.com',
        icon: 'https://www.svgrepo.com/show/448234/square.svg',
        tags: ['移动支付', 'POS系统', '电商集成'],
        desc: '创新的支付和商业解决方案提供商'
    },
    {
        category: '合规',
        name: 'TrustArc',
        url: 'https://www.trustarc.com',
        icon: 'https://www.trustarc.com/wp-content/themes/trustarc/assets/images/logo.svg',
        tags: ['隐私认证', '合规评估', '风险管理'],
        desc: '全球领先的隐私管理和合规解决方案'
    },
    {
        category: '云服务',
        name: 'DigitalOcean',
        url: 'https://www.digitalocean.com',
        icon: 'https://www.svgrepo.com/show/448234/digitalocean.svg',
        tags: ['VPS', '对象存储', '开发者友好'],
        desc: '简单易用的云计算平台，专注于开发者体验'
    }
];

// 分类图标映射
const categoryIcons = {
    '全部': '📚',
    '云服务': '☁️',
    '支付': '💳',
    '合规': '⚖️'
};