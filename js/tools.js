// 工具数据
const tools = [
    // 开发工具
    {
        category: '开发工具',
        name: 'Visual Studio Code',
        url: 'https://code.visualstudio.com',
        tags: ['编辑器', '开源', '跨平台'],
        desc: '微软开发的轻量级但功能强大的代码编辑器，支持多种编程语言和扩展'  
    },
    {
        category: '开发工具',
        name: 'GitHub',
        url: 'https://github.com',
        tags: ['代码托管', '版本控制', '协作'],
        desc: '全球最大的代码托管平台，提供Git仓库托管服务'  
    },
    {
        category: '开发工具',
        name: 'GitLab',
        url: 'https://gitlab.com',
        tags: ['DevOps', 'CI/CD', '项目管理'],
        desc: '完整的DevOps平台，提供从规划到监控的全流程工具'  
    },
    {
        category: '开发工具',
        name: 'Postman',
        url: 'https://www.postman.com',
        tags: ['API测试', '协作', '文档'],
        desc: 'API开发协作平台，简化API的构建、测试和文档编写'  
    },
    {
        category: '开发工具',
        name: 'Docker',
        url: 'https://www.docker.com',
        tags: ['容器化', '部署', '微服务'],
        desc: '开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中'  
    },
    {
        category: '开发工具',
        name: 'Figma',
        url: 'https://www.figma.com',
        tags: ['设计', 'UI/UX', '协作'],
        desc: '基于浏览器的协作式UI设计工具，支持实时协作'  
    },
    
    // 需求与调研
    {
        category: '需求与调研',
        name: 'SurveyMonkey',
        url: 'https://www.surveymonkey.com',
        tags: ['问卷调查', '数据分析', '用户反馈'],
        desc: '在线问卷调查平台，帮助收集和分析用户反馈'  
    },
    {
        category: '需求与调研',
        name: 'UserTesting',
        url: 'https://www.usertesting.com',
        tags: ['用户测试', '用户体验', '反馈'],
        desc: '快速获取真实用户对你的网站或应用的反馈'  
    },
    {
        category: '需求与调研',
        name: 'Hotjar',
        url: 'https://www.hotjar.com',
        tags: ['热图', '用户行为', '分析'],
        desc: '通过热图、会话录制等方式分析用户行为'  
    },
    {
        category: '需求与调研',
        name: 'Google Trends',
        url: 'https://trends.google.com',
        tags: ['趋势分析', '市场研究', '免费'],
        desc: '了解全球搜索趋势，发现新兴市场和用户需求'  
    },
    {
        category: '需求与调研',
        name: 'Typeform',
        url: 'https://www.typeform.com',
        tags: ['表单', '调查', '用户体验'],
        desc: '创建美观的在线表单和调查，提高用户参与度'  
    },
    {
        category: '需求与调研',
        name: 'Maze',
        url: 'https://maze.co',
        tags: ['原型测试', '用户体验', '数据驱动'],
        desc: '快速测试原型和概念，获取可量化的用户体验数据'  
    },
    
    // 网站建设
    {
        category: '网站建设',
        name: 'WordPress',
        url: 'https://wordpress.org',
        tags: ['CMS', '博客', '插件生态'],
        desc: '全球最流行的内容管理系统，拥有丰富的主题和插件'  
    },
    {
        category: '网站建设',
        name: 'Webflow',
        url: 'https://webflow.com',
        tags: ['可视化编辑', '响应式', '无代码'],
        desc: '可视化网站设计工具，无需编码即可创建专业网站'  
    },
    {
        category: '网站建设',
        name: 'Netlify',
        url: 'https://www.netlify.com',
        tags: ['静态网站', '部署', 'CI/CD'],
        desc: '现代网站部署平台，支持自动化构建和部署'  
    },
    {
        category: '网站建设',
        name: 'Vercel',
        url: 'https://vercel.com',
        tags: ['部署', 'Serverless', '全球CDN'],
        desc: '面向现代Web应用的云平台，支持自动Git部署'  
    },
    {
        category: '网站建设',
        name: 'Wix',
        url: 'https://www.wix.com',
        tags: ['拖拽式编辑', '模板', '电商'],
        desc: '直观的拖拽式网站构建器，适合初学者快速创建网站'  
    },
    {
        category: '网站建设',
        name: 'Shopify',
        url: 'https://www.shopify.com',
        tags: ['电商', '在线商店', '支付集成'],
        desc: '一站式电商平台，轻松创建和管理在线商店'  
    },
    
    // SEO与推广
    {
        category: 'SEO与推广',
        name: 'Ahrefs',
        url: 'https://ahrefs.com',
        tags: ['SEO', '关键词研究', '竞争分析'],
        desc: '全面的SEO工具套件，帮助提升网站排名和流量'  
    },
    {
        category: 'SEO与推广',
        name: 'SEMrush',
        url: 'https://www.semrush.com',
        tags: ['竞争分析', '关键词', '内容营销'],
        desc: '全方位的数字营销工具，提供竞争情报和营销洞察'  
    },
    {
        category: 'SEO与推广',
        name: 'Google Search Console',
        url: 'https://search.google.com/search-console',
        tags: ['网站监控', '性能分析', '免费'],
        desc: '监控和维护网站在Google搜索结果中的表现'  
    },
    {
        category: 'SEO与推广',
        name: 'Mailchimp',
        url: 'https://mailchimp.com',
        tags: ['邮件营销', '自动化', '分析'],
        desc: '全功能邮件营销平台，帮助企业与客户建立联系'  
    },
    {
        category: 'SEO与推广',
        name: 'Buffer',
        url: 'https://buffer.com',
        tags: ['社交媒体', '内容计划', '分析'],
        desc: '社交媒体管理工具，帮助规划和发布内容'  
    },
    {
        category: 'SEO与推广',
        name: 'Ubersuggest',
        url: 'https://neilpatel.com/ubersuggest',
        tags: ['关键词研究', 'SEO', '内容创意'],
        desc: '关键词研究和内容创意工具，提供竞争对手分析'  
    },
    
    // AI与创新
    {
        category: 'AI与创新',
        name: 'ChatGPT',
        url: 'https://chat.openai.com',
        tags: ['AI对话', '内容创作', '问答'],
        desc: 'OpenAI开发的大型语言模型，可用于内容创作、编程辅助等'  
    },
    {
        category: 'AI与创新',
        name: 'Midjourney',
        url: 'https://www.midjourney.com',
        tags: ['AI绘画', '图像生成', '创意设计'],
        desc: '人工智能图像生成工具，通过文本描述创建高质量图像'  
    },
    {
        category: 'AI与创新',
        name: 'Hugging Face',
        url: 'https://huggingface.co',
        tags: ['AI模型', '机器学习', '开源'],
        desc: 'AI社区和模型库，提供开源模型和工具'  
    },
    {
        category: 'AI与创新',
        name: 'Jasper',
        url: 'https://www.jasper.ai',
        tags: ['AI写作', '内容生成', '营销'],
        desc: 'AI内容创作平台，帮助快速生成高质量营销文案'  
    },
    {
        category: 'AI与创新',
        name: 'Runway',
        url: 'https://runwayml.com',
        tags: ['视频编辑', 'AI创意', '内容生成'],
        desc: '创意AI工具，用于视频编辑和内容创作'  
    },
    {
        category: 'AI与创新',
        name: 'Anthropic Claude',
        url: 'https://www.anthropic.com/claude',
        tags: ['AI助手', '对话', '内容生成'],
        desc: '先进的AI助手，专注于有用、无害和诚实的对话'  
    },
    {
        category: 'AI与创新',
        name: 'Gemini',
        url: 'https://gemini.google.com',
        tags: ['AI对话', '多模态', 'Google'],
        desc: 'Google 开发的最强多模态 AI 模型，支持文本、代码、图片等多种输入'  
    },
    {
        category: 'AI与创新',
        name: 'DeepSeek',
        url: 'https://www.deepseek.com',
        tags: ['AI对话', '代码生成', '开源'],
        desc: '深度求索开发的国产 AI 模型，代码能力出色，提供高性价比 API'  
    },
    {
        category: 'AI与创新',
        name: 'Kimi',
        url: 'https://kimi.moonshot.cn',
        tags: ['AI助手', '长文本', '文件分析'],
        desc: '月之暗面开发的智能助手，支持超长上下文阅读和文件解析'  
    },
    {
        category: 'AI与创新',
        name: '通义千问',
        url: 'https://tongyi.aliyun.com',
        tags: ['AI对话', '效率工具', '文档处理'],
        desc: '阿里云推出的大语言模型，集成通义听悟等多种效率工具'  
    },
    {
        category: 'AI与创新',
        name: '即梦',
        url: 'https://jimeng.jianying.com',
        tags: ['AI绘画', '视频生成', '创意'],
        desc: '字节跳动推出的 AI 创作平台，支持高质量的图像和视频生成'  
    },
    
    // 社区资源
    {
        category: '社区资源',
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        tags: ['问答', '编程', '技术社区'],
        desc: '全球最大的程序员问答社区，解决编程问题的宝库'  
    },
    {
        category: '社区资源',
        name: 'Product Hunt',
        url: 'https://www.producthunt.com',
        tags: ['产品发布', '创新', '反馈'],
        desc: '发现和分享新产品的平台，获取早期用户和反馈'  
    },
    {
        category: '社区资源',
        name: 'Indie Hackers',
        url: 'https://www.indiehackers.com',
        tags: ['独立开发', '创业', '社区'],
        desc: '独立开发者和创业者社区，分享经验和故事'  
    },
    {
        category: '社区资源',
        name: 'Dev.to',
        url: 'https://dev.to',
        tags: ['博客', '技术文章', '开发者社区'],
        desc: '开发者分享知识和经验的开放社区'  
    },
    {
        category: '社区资源',
        name: 'Hacker News',
        url: 'https://news.ycombinator.com',
        tags: ['科技新闻', '讨论', '创业'],
        desc: 'Y Combinator创建的科技和创业新闻聚合平台'  
    },
    {
        category: '社区资源',
        name: 'Reddit r/programming',
        url: 'https://www.reddit.com/r/programming',
        tags: ['编程', '讨论', '社区'],
        desc: 'Reddit上关于编程的大型社区，分享资源和讨论'  
    },
    
    // 网站模板
    {
        category: '网站模板',
        name: 'ThemeForest',
        url: 'https://themeforest.net',
        tags: ['WordPress主题', '模板', '前端'],
        desc: '最大的WordPress主题和网站模板市场之一'  
    },
    {
        category: '网站模板',
        name: 'Creative Market',
        url: 'https://creativemarket.com',
        tags: ['设计资源', '模板', '图形'],
        desc: '设计师资源市场，提供网站模板、字体和图形'  
    },
    {
        category: '网站模板',
        name: 'HTML5 UP',
        url: 'https://html5up.net',
        tags: ['响应式', '免费', 'HTML5'],
        desc: '提供免费的响应式HTML5网站模板'  
    },
    {
        category: '网站模板',
        name: 'TemplateMonster',
        url: 'https://www.templatemonster.com',
        tags: ['网站模板', 'CMS主题', '电商'],
        desc: '提供各种CMS平台的网站模板和主题'  
    },
    {
        category: '网站模板',
        name: 'Bootstrap Themes',
        url: 'https://themes.getbootstrap.com',
        tags: ['Bootstrap', '响应式', '前端框架'],
        desc: 'Bootstrap官方主题市场，提供高质量响应式模板'  
    },
    {
        category: '网站模板',
        name: 'Colorlib',
        url: 'https://colorlib.com/wp/templates',
        tags: ['免费模板', 'WordPress', '响应式'],
        desc: '提供免费和高质量的网站模板和WordPress主题'  
    },
    
    // 浏览器插件
    {
        category: '浏览器插件',
        name: 'Wappalyzer',
        url: 'https://www.wappalyzer.com',
        tags: ['技术栈检测', '分析', '开发工具'],
        desc: '识别网站使用的技术和工具的浏览器扩展'  
    },
    {
        category: '浏览器插件',
        name: 'Grammarly',
        url: 'https://www.grammarly.com',
        tags: ['语法检查', '写作', '英语'],
        desc: '英语写作助手，提供语法和拼写检查'  
    },
    {
        category: '浏览器插件',
        name: 'LastPass',
        url: 'https://www.lastpass.com',
        tags: ['密码管理', '安全', '自动填充'],
        desc: '安全的密码管理器，自动填充登录信息'  
    },
    {
        category: '浏览器插件',
        name: 'uBlock Origin',
        url: 'https://github.com/gorhill/uBlock',
        tags: ['广告拦截', '隐私', '开源'],
        desc: '高效的广告拦截器，提升浏览体验和保护隐私'  
    },
    {
        category: '浏览器插件',
        name: 'Lighthouse',
        url: 'https://developers.google.com/web/tools/lighthouse',
        tags: ['性能分析', 'SEO', '可访问性'],
        desc: 'Google开发的网站性能、SEO和可访问性分析工具'  
    },
    {
        category: '浏览器插件',
        name: 'JSON Formatter',
        url: 'https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa',
        tags: ['开发工具', 'JSON', '格式化'],
        desc: '格式化和高亮显示JSON数据的浏览器扩展'  
    },
    {
        category: '浏览器插件',
        name: 'PubSpy',
        url: 'https://chromewebstore.google.com/detail/pubspyio/foknhhcbfhdhocmbapkphabgjbikofeb',
        tags: ['Chrome扩展', 'AdSense反查', '站群分析'],
        desc: '一键反查 AdSense 发布商ID，发现关联域名并查看 ads.txt 状态'  
    },
    
    // 支付
    {
        category: '支付',
        name: 'Stripe',
        url: 'https://stripe.com',
        tags: ['支付网关', '订阅系统', '全球覆盖'],
        desc: '支持135种货币的全球化支付解决方案'  
    },
    {
        category: '支付',
        name: 'PayPal',
        url: 'https://www.paypal.com',
        tags: ['跨境支付', '安全可靠', '全球覆盖'],
        desc: '全球最大的在线支付平台之一，支持200多个国家和地区'  
    },
    {
        category: '支付',
        name: 'Square',
        url: 'https://squareup.com',
        tags: ['移动支付', 'POS系统', '电商集成'],
        desc: '创新的支付和商业解决方案提供商'  
    },
    
    // 合规
    {
        category: '合规',
        name: 'Termly',
        url: 'https://termly.io',
        tags: ['GDPR', '隐私政策', '合规'],
        desc: '自动化生成符合各国法律要求的隐私政策'  
    },
    {
        category: '合规',
        name: 'OneTrust',
        url: 'https://www.onetrust.com',
        tags: ['隐私管理', '合规自动化', '数据保护'],
        desc: '企业级隐私管理和数据治理平台'  
    },
    {
        category: '合规',
        name: 'TrustArc',
        url: 'https://www.trustarc.com',
        tags: ['隐私认证', '合规评估', '风险管理'],
        desc: '全球领先的隐私管理和合规解决方案'  
    },
    
    // 在线数据库
    {
        category: '在线数据库',
        name: 'Supabase',
        url: 'https://supabase.com',
        tags: ['PostgreSQL', 'BaaS', '开源'],
        desc: '开源的 Firebase 替代品，提供 PostgreSQL 数据库、认证、即时 API 等功能'  
    },
    {
        category: '在线数据库',
        name: 'MongoDB Atlas',
        url: 'https://www.mongodb.com/atlas',
        tags: ['NoSQL', '文档数据库', '云服务'],
        desc: 'MongoDB 官方提供的全托管云数据库服务，支持多云部署'  
    },
    {
        category: '在线数据库',
        name: 'PlanetScale',
        url: 'https://planetscale.com',
        tags: ['MySQL', 'Serverless', '分支管理'],
        desc: '基于 Vitess 的无服务器 MySQL 数据库平台，支持像 Git 一样的数据库分支管理'  
    },
    {
        category: '在线数据库',
        name: 'Neon',
        url: 'https://neon.tech',
        tags: ['PostgreSQL', 'Serverless', '云原生'],
        desc: '新一代无服务器 PostgreSQL，计算与存储分离，支持快速自动扩缩容'  
    },
    {
        category: '在线数据库',
        name: 'Upstash',
        url: 'https://upstash.com',
        tags: ['Redis', 'Kafka', 'Serverless'],
        desc: '专为无服务器应用设计的 Redis 和 Kafka 数据平台'  
    },
    {
        category: '在线数据库',
        name: 'Turso',
        url: 'https://turso.tech',
        tags: ['SQLite', 'Edge', '低延迟'],
        desc: '基于 libSQL 的边缘数据库，让数据更靠近用户，适合全球化应用'  
    }
];

// 分类图标映射
const categoryIcons = {
    '全部': '📚',
    '开发工具': '🛠️',
    '需求与调研': '🔍',
    '网站建设': '🏗️',
    'SEO与推广': '📈',
    'AI与创新': '🤖',
    '社区资源': '👥',
    '网站模板': '🎨',
    '浏览器插件': '🧩',
    '支付': '💳',
    '合规': '⚖️',
    '在线数据库': '🗄️'
};