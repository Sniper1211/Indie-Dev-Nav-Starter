// 工具数据
const tools = [
    {
        category: '云服务',
        name: 'Vercel',
        url: 'https://vercel.com',
        icon: 'https://www.svgrepo.com/show/327408/logo-vercel.svg',
        tags: ['部署', 'Serverless', '全球CDN'],
        desc: '面向现代Web应用的云平台，支持自动Git部署'
    },
    {
        category: '支付',
        name: 'Stripe',
        url: 'https://stripe.com',
        icon: 'https://www.svgrepo.com/show/349540/stripe.svg',
        tags: ['支付网关', '订阅系统', '全球覆盖'],
        desc: '支持135种货币的全球化支付解决方案'
    },
    {
        category: '合规',
        name: 'Termly',
        url: 'https://termly.io',
        icon: 'https://static.termly.io/img/logo-square.png',
        tags: ['GDPR', '隐私政策', '合规'],
        desc: '自动化生成符合各国法律要求的隐私政策'
    }
];

// 分类图标映射
const categoryIcons = {
    '全部': '📚',
    '云服务': '☁️',
    '支付': '💳',
    '合规': '⚖️'
}; 