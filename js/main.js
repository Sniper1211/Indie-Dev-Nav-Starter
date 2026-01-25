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

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function renderTools(tools, highlightText = '') {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return; // Guard clause for pages without tool grid

    // 空状态处理
    if (tools.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">🔍</span>
                <h3>未找到相关工具</h3>
                <p>尝试搜索其他关键词，或浏览分类查找</p>
                <button class="reset-search-btn" onclick="document.getElementById('clearSearch').click()">清除搜索</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = tools.map(tool => {
        // 构造 favicon 路径与回退
        let originIcon = '';
        let duckIcon = '';
        let googleIcon = '';
        let fallbackSvg = '';
        let finalUrl = tool.url;
        let customLogo = tool.logo; // 获取自定义 logo

        try {
            const u = new URL(tool.url);
            
            // 添加 UTM 参数
            u.searchParams.set('utm_source', 'indiestarter.space');
            finalUrl = u.href;

            // 使用 DuckDuckGo 的 ip3 服务（通常质量较好）
            duckIcon = `https://icons.duckduckgo.com/ip3/${u.hostname}.ico`;
            // Google Favicon 服务，强制请求 128px 高清图标
            googleIcon = `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(u.origin)}`;
            
            fallbackSvg = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n` +
                `<rect width="48" height="48" rx="8" fill="#1e293b"/>\n` +
                `<text x="24" y="30" font-size="20" text-anchor="middle" fill="#06b6d4">★</text>\n` +
                `</svg>`
            );
        } catch (e) {
            // 忽略解析错误，使用占位
        }

        const safeName = escapeHtml(tool.name);
        const titleHtml = highlightText 
            ? safeName.replace(new RegExp(escapeHtml(highlightText), 'gi'), match => `<mark>${match}</mark>`) 
            : safeName;

        // 调整加载顺序：优先使用自定义 Logo -> Google 高清图标 -> DuckDuckGo -> Fallback
        const initialSrc = customLogo || googleIcon;
        const onErrorChain = customLogo 
            ? `this.onerror=function(){this.src='${googleIcon}'; this.onerror=function(){this.src='${duckIcon}'; this.onerror=function(){this.src='${fallbackSvg}'; this.onerror=null;}}}`
            : `this.onerror=function(){this.src='${duckIcon}'; this.onerror=function(){this.src='${fallbackSvg}'; this.onerror=null;}}`;

        return `
        <a href="${finalUrl}" target="_blank" class="tool-card">
            <div class="tool-header">
                <img class="tool-icon" src="${initialSrc}" alt="${safeName} logo" decoding="async" loading="lazy" referrerpolicy="no-referrer" onerror="${onErrorChain}" />
                <div class="tool-info">
                    <div class="tool-title">${titleHtml}</div>
                    <div class="tool-category-tag">${escapeHtml(tool.category)}</div>
                </div>
            </div>
            <p class="tool-description">${escapeHtml(tool.desc)}</p>
            <div class="tool-footer">
                ${tool.tags.map(tag => `<span class="tool-tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
        </a>`;
    }).join('');
    // 渲染完成后派发事件，便于页面重新应用链接策略
    document.dispatchEvent(new Event('tools-rendered'));
}

// 初始化逻辑
function init() {
    // 生成分类导航
    const nav = document.getElementById('categoryNav');
    if (nav) {
        const categories = ['全部', ...new Set(tools.map(t => t.category))];
        nav.innerHTML = categories.map(cat => `
            <button class="category-btn" data-category="${cat}">
                ${getCategoryIcon(cat)}
                ${cat}
            </button>
        `).join('') + `
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border);">
                <a href="/ai/" class="category-btn" style="text-decoration: none; color: inherit; width: 100%;">
                    <span class="category-icon">✨</span>
                    AI专区
                </a>
            </div>
        `;

        // 默认显示"全部"分类
        const firstBtn = document.querySelector('.category-btn');
        if (firstBtn) firstBtn.classList.add('active');
        filterTools('全部');
        
        // 事件绑定
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterTools(btn.dataset.category);
            });
        });
    }

    // 添加防抖函数
    function debounce(func, delay = 300) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    // 修改事件监听
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value;
            if (clearBtn) clearBtn.style.display = val ? 'flex' : 'none';
            debounce(searchTools)(e);
        });
    }

    if (clearBtn && searchInput) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            searchInput.focus();
            searchTools({ target: { value: '' } });
        });
    }

    // 移动端菜单逻辑
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        mobileMenuClose.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        // 点击分类后自动关闭
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMenu();
                }
            });
        });
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', init);