// 获取分类图标
function getCategoryIcon(category) {
    return `<span class="category-icon">${categoryIcons[category] || '📦'}</span>`;
}

// 工具过滤与渲染逻辑
function filterTools(category) {
    let filtered = category === '全部' ? tools : tools.filter(t => t.category === category);
    
    // 如果是"全部"分类，则随机排序
    if (category === '全部') {
        // 使用Fisher-Yates洗牌算法进行随机排序
        filtered = [...filtered]; // 创建副本以避免修改原数组
        for (let i = filtered.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }
    }
    
    renderTools(filtered);
}

function searchTools(e) {
    const keyword = e.target.value.toLowerCase();
    const results = tools.filter(t => 
        t.name.toLowerCase().includes(keyword) ||
        t.category.toLowerCase().includes(keyword) ||
        t.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
    renderTools(results, keyword); // 添加关键字参数
}

function renderTools(tools, highlightText = '') {
    const grid = document.getElementById('toolsGrid');
    grid.innerHTML = tools.map(tool => {
        // 构造 favicon 路径与回退
        let originIcon = '';
        let duckIcon = '';
        let googleIcon = '';
        let fallbackSvg = '';
        try {
            const u = new URL(tool.url);
            originIcon = new URL('/favicon.ico', u.origin).href;
            duckIcon = `https://icons.duckduckgo.com/ip3/${u.hostname}.ico`;
            googleIcon = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(u.origin)}`;
            fallbackSvg = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n` +
                `<rect width="24" height="24" rx="4" fill="#E9EEF9"/>\n` +
                `<text x="12" y="16" font-size="12" text-anchor="middle" fill="#3B82F6">★</text>\n` +
                `</svg>`
            );
        } catch (e) {
            // 忽略解析错误，使用占位
        }

        const titleHtml = highlightText 
            ? tool.name.replace(new RegExp(highlightText, 'gi'), match => `<mark>${match}</mark>`) 
            : tool.name;

        // 采用聚合优先的加载顺序：DuckDuckGo -> Google -> Origin -> SVG占位
        const initialSrc = duckIcon || googleIcon || originIcon || fallbackSvg;
        const onErrorChain = `this.onerror=function(){this.onerror=function(){this.onerror=function(){this.onerror=null; this.src='${fallbackSvg}'}; this.src='${originIcon}'}; this.src='${googleIcon}'};`;

        return `
        <a href="${tool.url}" target="_blank" class="tool-card">
            <div class="tool-header">
                <div class="tool-title-row">
                    <img class="tool-icon" src="${initialSrc}" alt="${tool.name} logo" decoding="async" loading="lazy" referrerpolicy="no-referrer" onerror="${onErrorChain} this.src='${googleIcon}';" />
                    <div class="tool-title">${titleHtml}</div>
                </div>
                <div class="tool-category">${tool.category}</div>
            </div>
            <p class="tool-description">${tool.desc}</p>
            <div class="tool-tags">
                ${tool.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
            </div>
        </a>`;
    }).join('');
    // 渲染完成后派发事件，便于页面重新应用链接策略
    document.dispatchEvent(new Event('tools-rendered'));
}

// 初始化逻辑
function init() {
    // 生成分类导航
    const categories = ['全部', ...new Set(tools.map(t => t.category))];
    const nav = document.getElementById('categoryNav');
    nav.innerHTML = categories.map(cat => `
        <button class="category-btn" data-category="${cat}">
            ${getCategoryIcon(cat)}
            ${cat}
        </button>
    `).join('');

    // 默认显示"全部"分类
    document.querySelector('.category-btn').classList.add('active');
    filterTools('全部');
    
    // 事件绑定
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterTools(btn.dataset.category);
        });
    });

    // 添加防抖函数
    function debounce(func, delay = 300) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    // 修改事件监听
    document.getElementById('searchInput').addEventListener('input', debounce(searchTools));
}

// 启动应用
document.addEventListener('DOMContentLoaded', init);