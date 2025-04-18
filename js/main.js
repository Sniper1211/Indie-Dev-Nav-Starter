// 获取分类图标
function getCategoryIcon(category) {
    return `<span class="category-icon">${categoryIcons[category] || '📦'}</span>`;
}

// 工具过滤与渲染逻辑
function filterTools(category) {
    const filtered = category === '全部' ? tools : tools.filter(t => t.category === category);
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
    grid.innerHTML = tools.map(tool => `
        <a href="${tool.url}" target="_blank" class="tool-card">
            <div class="tool-header">
                <div class="tool-title">${highlightText ? tool.name.replace(new RegExp(highlightText, 'gi'), match => `<mark>${match}</mark>`) : tool.name}</div>
                <div class="tool-category">${tool.category}</div>
            </div>
            <p class="tool-description">${tool.desc}</p>
            <div class="tool-tags">
                ${tool.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
            </div>
        </a>
    `).join('');
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