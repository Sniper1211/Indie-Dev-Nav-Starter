const fs = require('fs');
const path = require('path');
const { tools } = require('../js/tools.js');

const aiTools = tools.filter(t => t.category === 'AI与创新');
const outputDir = path.join(__dirname, '../ai');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to escape HTML
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe.toString()
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// Helper to slugify name
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

// Helper: Common HTML Head
function getHead(title, stylesPath = '../css/styles.css') {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | DevToolBox AI精选</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${stylesPath}?v=2.0">
    <style>
        .ai-header {
            padding: 4rem 0 2rem;
            text-align: center;
        }
        .ai-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .back-nav {
            padding: 1rem 0;
            color: var(--text-secondary);
        }
        .back-nav a {
            color: var(--text-primary);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .back-nav a:hover {
            color: var(--primary);
        }
        
        /* Detail Page Specific */
        .tool-detail-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 3rem;
            margin-top: 2rem;
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        .tool-detail-logo {
            width: 120px;
            height: 120px;
            object-fit: contain;
            background: #fff;
            border-radius: 20px;
            padding: 10px;
            margin-bottom: 2rem;
            box-shadow: 0 0 30px rgba(0,0,0,0.3);
        }
        .tool-detail-name {
            font-size: 2.5rem;
            font-family: 'Space Grotesk', sans-serif;
            margin-bottom: 1rem;
        }
        .tool-detail-tags {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .tool-detail-tag {
            background: rgba(6, 182, 212, 0.1);
            color: var(--primary);
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.9rem;
            border: 1px solid rgba(6, 182, 212, 0.2);
        }
        .tool-detail-desc {
            font-size: 1.2rem;
            color: var(--text-secondary);
            max-width: 600px;
            margin-bottom: 3rem;
            line-height: 1.8;
        }
        .visit-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: var(--radius-md);
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 0 20px var(--primary-glow);
        }
        .visit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 30px var(--primary-glow);
        }

        /* Grid for Index */
        .ai-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        .ai-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 1.5rem;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            text-decoration: none;
            color: var(--text-primary);
        }
        .ai-card:hover {
            border-color: var(--primary);
            transform: translateY(-4px);
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
        }
        .ai-card-header {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .ai-card-logo {
            width: 48px;
            height: 48px;
            border-radius: 10px;
            background: #fff;
            padding: 4px;
            object-fit: contain;
        }
        .ai-card-name {
            font-weight: 600;
            font-size: 1.1rem;
        }
        .ai-card-desc {
            font-size: 0.9rem;
            color: var(--text-secondary);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    </style>
</head>`;
}

const commonBodyStart = `<body>
    <div class="bg-effects">
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>
        <div class="grid-overlay"></div>
    </div>
    <div class="container">`;

const commonBodyEnd = `    </div>
    <footer class="site-footer" style="margin-left: 0; width: 100%; margin-top: 4rem;">
        <div class="container">
            <div class="footer-copyright" style="text-align: center;">
                <p>© ${new Date().getFullYear()} DevToolBox. Made with ❤️ for AI.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;

// 1. Generate ai/index.html
const indexContent = `
${getHead('AI 工具精选')}
${commonBodyStart}
    <div class="main-content" style="margin-left: 0; width: 100%; position: relative;">
    <div class="back-nav" style="position: absolute; top: 2rem; left: 2rem; padding: 0;">
        <a href="/">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            返回主页
        </a>
    </div>
    <header class="ai-header">
        <h1 class="ai-title">AI 与创新工具库</h1>
        <p style="color: var(--text-secondary)">探索 ${aiTools.length} 款精选 AI 工具，赋能你的开发之旅</p>
    </header>

    <div class="search-box" style="margin: 0 auto 3rem; max-width: 600px;">
        <input type="text" id="aiSearchInput" placeholder="搜索 AI 工具..." autocomplete="off">
        <button class="clear-search" id="clearSearch" style="display: none;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </button>
    </div>

    <div class="tools-grid">
        ${aiTools.map(tool => {
            const slug = tool.id || slugify(tool.name);
            return `
        <a href="/ai/${slug}.html" class="tool-card" data-name="${escapeHtml(tool.name.toLowerCase())}" data-desc="${escapeHtml(tool.desc.toLowerCase())}" data-tags="${escapeHtml(tool.tags.join(',').toLowerCase())}">
            <div class="tool-header">
                <img src="${tool.logo}" alt="${escapeHtml(tool.name)}" class="tool-icon" onerror="this.src='https://via.placeholder.com/48'">
                <div class="tool-info">
                    <div class="tool-title">${escapeHtml(tool.name)}</div>
                    <div class="tool-category-tag">${escapeHtml(tool.category)}</div>
                </div>
            </div>
            <p class="tool-description">${escapeHtml(tool.desc)}</p>
            <div class="tool-footer">
                ${tool.tags.map(tag => `<span class="tool-tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
        </a>
        `}).join('')}
    </div>
    
    <div id="noResults" class="empty-state" style="display: none; grid-column: 1/-1;">
        <span class="empty-icon">🔍</span>
        <h3>未找到相关工具</h3>
        <p>尝试搜索其他关键词</p>
        <button class="reset-search-btn" onclick="document.getElementById('clearSearch').click()">清除搜索</button>
    </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('aiSearchInput');
        const clearBtn = document.getElementById('clearSearch');
        const toolCards = document.querySelectorAll('.tool-card');
        const noResults = document.getElementById('noResults');
        const toolsGrid = document.querySelector('.tools-grid');
        
        function filterTools(query) {
            const term = query.toLowerCase().trim();
            let visibleCount = 0;
            
            toolCards.forEach(card => {
                const name = card.dataset.name;
                const desc = card.dataset.desc;
                const tags = card.dataset.tags;
                
                const match = name.includes(term) || desc.includes(term) || tags.includes(term);
                
                if (match) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Toggle clear button
            clearBtn.style.display = term ? 'flex' : 'none';
            
            // Handle empty state
            if (visibleCount === 0) {
                noResults.style.display = 'block';
                toolsGrid.style.display = 'none';
            } else {
                noResults.style.display = 'none';
                toolsGrid.style.display = 'grid';
            }
        }
        
        searchInput.addEventListener('input', (e) => filterTools(e.target.value));
        
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            filterTools('');
            searchInput.focus();
        });
    });
    </script>
${commonBodyEnd}
`;

fs.writeFileSync(path.join(outputDir, 'index.html'), indexContent);
console.log('Generated ai/index.html');

// 2. Generate Detail Pages
aiTools.forEach(tool => {
    const slug = tool.id || slugify(tool.name);
    const detailContent = `
${getHead(escapeHtml(tool.name))}
${commonBodyStart}
    <div class="back-nav">
        <a href="/ai/">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            返回列表
        </a>
    </div>

    <div class="tool-detail-card">
        <img src="${tool.logo}" alt="${escapeHtml(tool.name)}" class="tool-detail-logo" onerror="this.src='https://via.placeholder.com/120'">
        <h1 class="tool-detail-name">${escapeHtml(tool.name)}</h1>
        
        <div class="tool-detail-tags">
            ${tool.tags.map(tag => `<span class="tool-detail-tag"># ${escapeHtml(tag)}</span>`).join('')}
        </div>

        <p class="tool-detail-desc">${escapeHtml(tool.desc)}</p>

        <a href="${tool.url}" target="_blank" class="visit-btn">
            访问官网
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
        </a>
    </div>
${commonBodyEnd}
    `;
    fs.writeFileSync(path.join(outputDir, `${slug}.html`), detailContent);
    console.log(`Generated ai/${slug}.html`);
});
