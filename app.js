// Central state of our application
const state = {
    currentRoute: '#/',
    searchQuery: '',
    selectedCategory: '',
    selectedTag: '',
    sortBy: 'date-desc', // 'date-desc' or 'date-asc'
    activeArticleId: null,
    comments: []
};

// SVG visualizer configuration
const VIZ_CONFIG = {
    width: 600,
    height: 180,
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 40,
    paddingRight: 20
};

// DOM Elements
const elements = {
    loader: document.getElementById('loader-overlay'),
    navLinks: document.querySelectorAll('.nav-links li'),
    mobileNavToggle: document.querySelector('.mobile-nav-toggle'),
    navLinksList: document.querySelector('.nav-links'),
    views: document.querySelectorAll('.page-view'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),

    // Typewriter
    typewriterTarget: document.getElementById('typewriter-text'),

    // Home components
    homeLatestGrid: document.getElementById('home-latest-grid'),

    // Blog components
    blogGrid: document.getElementById('blog-grid'),
    searchInput: document.getElementById('blog-search'),
    sortSelect: document.getElementById('blog-sort'),
    categoryFilterContainer: document.getElementById('category-filters'),
    filterStatusBar: document.getElementById('filter-status-bar'),
    filterStatusText: document.getElementById('filter-status-text'),
    clearFilterBtn: document.getElementById('clear-filter-btn'),

    // Detail components
    detailContainer: document.getElementById('blog-detail-view'),
    readingProgressBar: document.getElementById('reading-progress-bar'),

    // Projects components
    projectsGrid: document.getElementById('projects-grid'),

    // Comments components
    commentForm: document.getElementById('comment-form'),
    visitorNickname: document.getElementById('visitor-nickname'),
    visitorMessage: document.getElementById('visitor-message'),
    commentsContainer: document.getElementById('comments-container'),
    commentsCountBadge: document.getElementById('comments-count-badge'),

    // Chart
    chartContainer: document.getElementById('category-chart-container'),

    // Toast and scroll
    toastContainer: document.getElementById('toast-container'),
    backToTopContainer: document.getElementById('back-to-top-container'),
    progressCircleBar: document.querySelector('.progress-circle-bar'),
    backToTopBtn: document.getElementById('back-to-top-btn'),

    // Cursor
    cursorDot: document.querySelector('.custom-cursor'),
    cursorGlow: document.querySelector('.custom-cursor-glow')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initComments();
    initRouter();
    initEventListeners();
    initCursor();

    // Hide loader overlay after window resources load
    window.addEventListener('load', () => {
        setTimeout(() => {
            elements.loader.style.opacity = '0';
            elements.loader.style.visibility = 'hidden';
            // Start landing typewriter effect after loader finishes
            startTypewriter();
        }, 500);
    });
});

// ==================== THEME SYSTEM ====================
function initTheme() {
    // Light theme default (Requirement: 默认是白天模式)
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`已切换至${newTheme === 'dark' ? '深夜' : '白天'}模式`, 'success');
}

function updateThemeIcon(theme) {
    if (!elements.themeToggleBtn) return;
    if (theme === 'dark') {
        elements.themeToggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
        `; // Sun icon
    } else {
        elements.themeToggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
        `; // Moon icon
    }
}

// ==================== ROUTING SYSTEM ====================
function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
}

function handleRoute() {
    const rawHash = window.location.hash || '#/';
    state.currentRoute = rawHash;

    // Toggle Mobile menu if open
    elements.navLinksList.classList.remove('open');
    elements.mobileNavToggle.innerHTML = '&#9776;';

    // Parse sub-routes (e.g. #/blog/1)
    if (rawHash.startsWith('#/blog/')) {
        const idStr = rawHash.replace('#/blog/', '');
        const id = parseInt(idStr, 10);
        if (!isNaN(id) && BLOG_POSTS.some(p => p.id === id)) {
            state.activeArticleId = id;
            renderArticleDetail(id);
            switchView('#/blog-detail');
            return;
        } else {
            window.location.hash = '#/blog';
            return;
        }
    }

    state.activeArticleId = null;
    switchView(rawHash);

    // Trigger render logic based on route
    if (rawHash === '#/' || rawHash === '#') {
        renderHomeLatest();
    } else if (rawHash === '#/blog') {
        renderBlogList();
        renderCategoryFilters();
        renderCategoryChart();
    } else if (rawHash === '#/projects') {
        renderProjects();
    } else if (rawHash === '#/about') {
        renderComments();
    }
}

function switchView(route) {
    elements.readingProgressBar.style.width = '0%';

    let targetViewId = '';
    let navRoute = route;

    if (route === '#/' || route === '#') {
        targetViewId = 'home-view';
        navRoute = '#/';
    } else if (route === '#/blog') {
        targetViewId = 'blog-view';
    } else if (route === '#/blog-detail') {
        targetViewId = 'blog-detail-view';
        navRoute = '#/blog';
    } else if (route === '#/projects') {
        targetViewId = 'projects-view';
    } else if (route === '#/about') {
        targetViewId = 'about-view';
    } else {
        targetViewId = 'home-view';
        navRoute = '#/';
    }

    // Toggle view visibility classes
    elements.views.forEach(view => {
        if (view.id === targetViewId) {
            view.classList.add('active');
            window.scrollTo(0, 0);
        } else {
            view.classList.remove('active');
        }
    });

    // Update active state in Navigation Header
    elements.navLinks.forEach(linkItem => {
        const anchor = linkItem.querySelector('a');
        if (anchor && anchor.getAttribute('href') === navRoute) {
            linkItem.classList.add('active');
        } else {
            linkItem.classList.remove('active');
        }
    });
}

// ==================== EVENT LISTENERS ====================
function initEventListeners() {
    elements.themeToggleBtn.addEventListener('click', toggleTheme);

    elements.mobileNavToggle.addEventListener('click', () => {
        elements.navLinksList.classList.toggle('open');
        if (elements.navLinksList.classList.contains('open')) {
            elements.mobileNavToggle.innerHTML = '&times;';
        } else {
            elements.mobileNavToggle.innerHTML = '&#9776;';
        }
    });

    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderBlogList();
            renderCategoryChart();
        });
    }

    if (elements.sortSelect) {
        elements.sortSelect.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            renderBlogList();
        });
    }

    if (elements.clearFilterBtn) {
        elements.clearFilterBtn.addEventListener('click', () => {
            state.selectedCategory = '';
            state.selectedTag = '';
            state.searchQuery = '';
            if (elements.searchInput) elements.searchInput.value = '';
            renderBlogList();
            renderCategoryFilters();
            renderCategoryChart();
        });
    }

    if (elements.commentForm) {
        elements.commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitComment();
        });
    }

    window.addEventListener('scroll', handleScrollEvents);

    elements.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== RENDERERS ====================

function renderHomeLatest() {
    const sorted = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latest3 = sorted.slice(0, 3);

    elements.homeLatestGrid.innerHTML = '';
    latest3.forEach(post => {
        elements.homeLatestGrid.appendChild(createBlogCard(post));
    });
}

function renderBlogList() {
    let posts = [...BLOG_POSTS];

    if (state.searchQuery.trim() !== '') {
        const query = state.searchQuery.toLowerCase();
        posts = posts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.summary.toLowerCase().includes(query)
        );
    }

    if (state.selectedCategory !== '') {
        posts = posts.filter(post => post.category === state.selectedCategory);
    }

    if (state.selectedTag !== '') {
        posts = posts.filter(post => post.tags.includes(state.selectedTag));
    }

    if (state.sortBy === 'date-desc') {
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (state.sortBy === 'date-asc') {
        posts.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    updateFilterStatusBar(posts.length);

    elements.blogGrid.innerHTML = '';
    if (posts.length === 0) {
        elements.blogGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem 0; color: var(--text-secondary);">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem; color: var(--text-tertiary);">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </svg>
                <p>未找到符合条件的博客文章，尝试清除筛选条件吧。</p>
            </div>
        `;
    } else {
        posts.forEach(post => {
            elements.blogGrid.appendChild(createBlogCard(post));
        });
    }
}

function renderCategoryFilters() {
    const categories = ['全部', ...new Set(BLOG_POSTS.map(post => post.category))];

    elements.categoryFilterContainer.innerHTML = '';
    categories.forEach(cat => {
        const badge = document.createElement('button');
        badge.className = 'category-badge';
        if (cat === '全部' && state.selectedCategory === '') {
            badge.classList.add('active');
        } else if (cat === state.selectedCategory) {
            badge.classList.add('active');
        }

        badge.innerText = cat;
        badge.addEventListener('click', () => {
            state.selectedCategory = cat === '全部' ? '' : cat;
            state.selectedTag = '';
            renderBlogList();
            renderCategoryFilters();
            renderCategoryChart();
        });

        elements.categoryFilterContainer.appendChild(badge);
    });
}

function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'card';

    let emoji = '📂';
    if (post.category === 'CSS') emoji = '🎨';
    else if (post.category === 'JavaScript') emoji = '⚡';
    else if (post.category === 'Tools') emoji = '🛠️';
    else if (post.category === 'Research') emoji = '📖';
    else if (post.category === 'Robotics') emoji = '🤖';
    else if (post.category === 'WebAudio') emoji = '🎵';

    card.innerHTML = `
        <div class="card-image-placeholder">
            <span>${emoji}</span>
            <div class="card-category-badge">${post.category}</div>
        </div>
        <div class="card-body">
            <div class="card-meta">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                <span>${post.date}</span>
            </div>
            <a href="#/blog/${post.id}" class="card-title">${post.title}</a>
            <p class="card-summary">${post.summary}</p>
            <div class="card-tags">
                ${post.tags.map(t => `<span class="tag-badge" data-tag="${t}">#${t}</span>`).join('')}
            </div>
            <a href="#/blog/${post.id}" class="card-read-more">
                阅读全文 
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                </svg>
            </a>
        </div>
    `;

    card.querySelectorAll('.tag-badge').forEach(tagBadge => {
        tagBadge.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            state.selectedTag = e.target.getAttribute('data-tag');
            state.selectedCategory = '';
            renderBlogList();
            renderCategoryFilters();
            renderCategoryChart();
        });
    });

    return card;
}

function updateFilterStatusBar(matchCount) {
    if (state.selectedCategory !== '' || state.selectedTag !== '' || state.searchQuery !== '') {
        elements.filterStatusBar.style.display = 'flex';
        let filterDesc = '当前筛选：';
        if (state.selectedCategory !== '') filterDesc += `分类【${state.selectedCategory}】 `;
        if (state.selectedTag !== '') filterDesc += `标签【#${state.selectedTag}】 `;
        if (state.searchQuery !== '') filterDesc += `关键词【"${state.searchQuery}"】 `;
        filterDesc += `（共找到 ${matchCount} 篇文章）`;

        elements.filterStatusText.innerText = filterDesc;
    } else {
        elements.filterStatusBar.style.display = 'none';
    }
}

function renderArticleDetail(id) {
    const post = BLOG_POSTS.find(p => p.id === id);
    if (!post) return;

    // Chinese characters average reading speed 400 per minute
    const textContent = post.content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.length;
    const estTime = Math.ceil(wordCount / 400);

    elements.detailContainer.innerHTML = `
        <div class="container">
            <div class="detail-layout">
                <a href="#/blog" class="back-to-list-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m12 19-7-7 7-7"></path>
                        <path d="M19 12H5"></path>
                    </svg>
                    返回博客列表
                </a>
                
                <article>
                    <header class="article-header">
                        <div class="article-category">${post.category}</div>
                        <h1 class="article-title">${post.title}</h1>
                        <div class="article-meta-row">
                            <span class="article-meta-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                                    <line x1="16" x2="16" y1="2" y2="6"></line>
                                    <line x1="8" x2="8" y1="2" y2="6"></line>
                                    <line x1="3" x2="21" y1="10" y2="10"></line>
                                </svg>
                                ${post.date}
                            </span>
                            <span class="article-meta-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                预计阅读时间：${estTime} 分钟
                            </span>
                            <span class="article-meta-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                    <line x1="4" x2="4" y1="22" y2="15"></line>
                                </svg>
                                标签：${post.tags.map(t => `#${t}`).join(', ')}
                            </span>
                        </div>
                    </header>
                    
                    <div class="article-body-content">
                        ${post.content}
                    </div>
                    
                    <footer class="article-footer">
                        <div class="card-tags">
                            ${post.tags.map(t => `<span class="tag-badge" data-tag-direct="${t}">#${t}</span>`).join('')}
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    `;

    elements.detailContainer.querySelectorAll('[data-tag-direct]').forEach(el => {
        el.addEventListener('click', () => {
            state.selectedTag = el.getAttribute('data-tag-direct');
            state.selectedCategory = '';
            window.location.hash = '#/blog';
        });
    });

    // Re-render LaTeX math equations dynamically
    if (window.MathJax && typeof MathJax.typesetPromise === 'function') {
        setTimeout(() => {
            MathJax.typesetPromise([elements.detailContainer]).catch(err => console.log('MathJax error:', err));
        }, 50);
    }
}

function renderProjects() {
    elements.projectsGrid.innerHTML = '';
    PROJECT_SHOWCASE.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'project-card';

        let coverContent = '';
        if (proj.color && (proj.color.includes('.png') || proj.color.includes('.jpg') || proj.color.includes('.jpeg'))) {
            coverContent = `<img src="${proj.color}" alt="${proj.title}" class="project-cover-img">`;
        } else {
            coverContent = `<span>${proj.color || '💻'}</span>`;
        }

        let overlayContent = '';
        if (proj.link && proj.link.trim() !== '') {
            overlayContent = `
                <div class="project-card-overlay">
                    <div class="project-overlay-title">${proj.title}</div>
                    <p style="color: #cbd5e1; font-size: 0.8rem; margin-bottom: 0.75rem;">点击前往 GitHub 仓库查看代码</p>
                    <a href="${proj.link}" target="_blank" class="project-overlay-link" rel="noopener">前往浏览</a>
                </div>
            `;
        } else {
            overlayContent = `
                <div class="project-card-overlay">
                    <div class="project-overlay-title">${proj.title}</div>
                    <p style="color: #cbd5e1; font-size: 0.8rem; margin-bottom: 0.5rem;">课程设计 / 科研项目</p>
                    <span style="font-size: 0.75rem; border: 1px solid rgba(255,255,255,0.4); padding: 0.2rem 0.5rem; border-radius: 4px; color: #fff;">暂无跳转链接</span>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="project-cover-placeholder">
                ${coverContent}
                ${overlayContent}
            </div>
            <div class="project-body">
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-description">${proj.summary}</p>
                <div class="project-tags">
                    ${proj.tags.map(t => `<span class="project-tag-badge">${t}</span>`).join('')}
                </div>
            </div>
        `;

        elements.projectsGrid.appendChild(card);
    });
}

// ==================== VISUALIZATION (Minimalist style) ====================
function renderCategoryChart() {
    if (!elements.chartContainer) return;

    let activePosts = [...BLOG_POSTS];
    if (state.searchQuery.trim() !== '') {
        const query = state.searchQuery.toLowerCase();
        activePosts = activePosts.filter(p => p.title.toLowerCase().includes(query) || p.summary.toLowerCase().includes(query));
    }

    const categoryCounts = {};
    activePosts.forEach(post => {
        categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    });

    const categories = Object.keys(categoryCounts);
    const dataCounts = Object.values(categoryCounts);

    if (categories.length === 0) {
        elements.chartContainer.innerHTML = '<p style="color: var(--text-tertiary); font-style: italic; font-size: 0.85rem;">暂无可用统计数据</p>';
        return;
    }

    const maxVal = Math.max(...dataCounts, 1);
    const w = VIZ_CONFIG.width;
    const h = VIZ_CONFIG.height;
    const padT = VIZ_CONFIG.paddingTop;
    const padB = VIZ_CONFIG.paddingBottom;
    const padL = VIZ_CONFIG.paddingLeft;
    const padR = VIZ_CONFIG.paddingRight;

    const chartW = w - padL - padR;
    const chartH = h - padT - padB;
    const barWidth = Math.min(50, chartW / (categories.length * 1.6));
    const spacing = (chartW - (barWidth * categories.length)) / (categories.length + 1);

    let svgMarkup = `
        <svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="max-width: 500px;">
            <!-- Subtle dashed guide lines -->
            <line x1="${padL}" y1="${padT}" x2="${w - padR}" y2="${padT}" stroke="var(--border-color)" stroke-dasharray="2,2" />
            <line x1="${padL}" y1="${padT + chartH / 2}" x2="${w - padR}" y2="${padT + chartH / 2}" stroke="var(--border-color)" stroke-dasharray="2,2" />
            
            <!-- Axis lines -->
            <line x1="${padL}" y1="${h - padB}" x2="${w - padR}" y2="${h - padB}" class="svg-chart-axis" />
            <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${h - padB}" class="svg-chart-axis" />
    `;

    categories.forEach((cat, index) => {
        const val = categoryCounts[cat];
        const barHeight = (val / maxVal) * chartH;
        const x = padL + spacing + index * (barWidth + spacing);
        const y = h - padB - barHeight;

        let barColor = 'var(--primary)';
        if (state.selectedCategory === cat) {
            barColor = 'var(--secondary)'; // Highlight current selection
        }

        svgMarkup += `
            <g class="chart-bar-group" data-category="${cat}" style="cursor: pointer;">
                <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" 
                      fill="${barColor}" rx="3" class="svg-chart-bar">
                      <title>${cat}: ${val} 篇</title>
                </rect>
                <text x="${x + barWidth / 2}" y="${h - padB + 16}" class="svg-chart-text">${cat}</text>
                <text x="${x + barWidth / 2}" y="${y - 5}" class="svg-chart-text" style="font-weight: 500; fill: var(--text-primary); font-size: 9px;">${val}</text>
            </g>
        `;
    });

    svgMarkup += `
        <text x="${padL - 8}" y="${padT + 4}" font-size="9" fill="var(--text-tertiary)" text-anchor="end">${maxVal}</text>
        <text x="${padL - 8}" y="${padT + chartH / 2 + 4}" font-size="9" fill="var(--text-tertiary)" text-anchor="end">${(maxVal / 2).toFixed(1)}</text>
        <text x="${padL - 8}" y="${h - padB + 4}" font-size="9" fill="var(--text-tertiary)" text-anchor="end">0</text>
    `;

    svgMarkup += '</svg>';
    elements.chartContainer.innerHTML = svgMarkup;

    elements.chartContainer.querySelectorAll('.chart-bar-group').forEach(group => {
        group.addEventListener('click', () => {
            const cat = group.getAttribute('data-category');
            state.selectedCategory = state.selectedCategory === cat ? '' : cat;
            state.selectedTag = '';
            renderBlogList();
            renderCategoryFilters();
            renderCategoryChart();
        });
    });
}

// ==================== COMMENT BOARD SYSTEM ====================
function initComments() {
    const saved = localStorage.getItem('visitor_comments');
    let needsReset = false;
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // If they are the old mock comments, reset them
            if (parsed.length > 0 && (parsed.some(c => c.author.includes("王大侠") || c.message.includes("网页设计") || c.message.includes("前端知识")))) {
                needsReset = true;
            }
        } catch (e) {
            needsReset = true;
        }
    } else {
        needsReset = true;
    }

    if (needsReset) {
        state.comments = [
            { id: 1, author: "计科二班小王", date: "2026-06-27 15:30", message: "小熊，你的图像矢量化和 MoveIt2 的仿真分析写得很详实！网页的极简宋体风格看起来很舒服，阅读体验很棒。" },
            { id: 2, author: "创新班张师兄", date: "2026-06-28 09:12", message: "看你微信小程序和 Yolov8 批改作业的项目，感觉好酷啊！那个批改系统开源了吗？—— 期待你的下一篇顶会！" }
        ];
        localStorage.setItem('visitor_comments', JSON.stringify(state.comments));
    } else {
        state.comments = JSON.parse(saved);
    }
}

function renderComments() {
    if (!elements.commentsContainer) return;

    const list = state.comments;
    elements.commentsCountBadge.innerText = list.length;

    elements.commentsContainer.innerHTML = '';

    if (list.length === 0) {
        elements.commentsContainer.innerHTML = `
            <div class="comments-empty-state">
                目前还没有留言，快来留下你的第一条脚印吧！
            </div>
        `;
    } else {
        [...list].reverse().forEach(c => {
            const card = document.createElement('div');
            card.className = 'comment-card';
            card.innerHTML = `
                <div class="comment-header">
                    <span class="comment-nickname">${escapeHTML(c.author)}</span>
                    <span class="comment-date">${c.date}</span>
                </div>
                <p class="comment-content">${escapeHTML(c.message)}</p>
            `;
            elements.commentsContainer.appendChild(card);
        });
    }
}

function submitComment() {
    const name = elements.visitorNickname.value.trim();
    const msg = elements.visitorMessage.value.trim();

    if (!name || !msg) {
        showToast('昵称和留言内容都不能为空哦！', 'error');
        return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newComment = {
        id: Date.now(),
        author: name,
        date: formattedDate,
        message: msg
    };

    state.comments.push(newComment);
    localStorage.setItem('visitor_comments', JSON.stringify(state.comments));

    elements.visitorNickname.value = '';
    elements.visitorMessage.value = '';

    renderComments();
    showToast('提交成功！感谢您的留言。', 'success');
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// ==================== SCROLL MONITOR ====================
function handleScrollEvents() {
    const scrollPos = window.scrollY;

    if (scrollPos > 300) {
        elements.backToTopContainer.classList.add('visible');
    } else {
        elements.backToTopContainer.classList.remove('visible');
    }

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollPercent = 0;
    if (docHeight > 0) {
        scrollPercent = scrollPos / docHeight;
    }

    // Radius of progress circle in style.css is 20.5px, circumference is 128.8px
    const circumference = 128.8;
    const offset = circumference - (scrollPercent * circumference);
    elements.progressCircleBar.style.strokeDashoffset = Math.max(0, offset);

    if (state.activeArticleId && elements.detailContainer.classList.contains('active')) {
        const article = elements.detailContainer.querySelector('article');
        if (article) {
            const artRect = article.getBoundingClientRect();
            const artHeight = article.offsetHeight;
            const startReadingY = article.offsetTop;

            let progress = 0;
            if (scrollPos >= startReadingY) {
                const scrolledDistance = scrollPos - startReadingY;
                const scrollableTextHeight = artHeight - window.innerHeight + 150;
                if (scrollableTextHeight > 0) {
                    progress = Math.min(100, (scrolledDistance / scrollableTextHeight) * 100);
                } else {
                    progress = 100;
                }
            }
            elements.readingProgressBar.style.width = `${progress}%`;
        }
    } else {
        elements.readingProgressBar.style.width = '0%';
    }
}

// ==================== VISUAL MICRO-INTERACTIONS ====================

// Warm typography typing banner
function startTypewriter() {
    if (!elements.typewriterTarget) return;

    // Casual greeting from 小熊
    const textToType = "你好，我是小熊。目前正在学习Web前端开发ing!!!";
    let index = 0;
    elements.typewriterTarget.innerHTML = '';

    const typingInterval = setInterval(() => {
        elements.typewriterTarget.innerHTML = textToType.substring(0, index) + '<span class="typing-cursor"></span>';
        index++;

        if (index > textToType.length) {
            clearInterval(typingInterval);
            elements.typewriterTarget.innerHTML = textToType + '<span class="typing-cursor"></span>';
        }
    }, 70);
}

// Minimal cursor dot hover tracker
function initCursor() {
    if (!elements.cursorDot || !elements.cursorGlow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        elements.cursorDot.style.left = `${mouseX}px`;
        elements.cursorDot.style.top = `${mouseY}px`;
    });

    function animLoop() {
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;

        elements.cursorGlow.style.left = `${glowX}px`;
        elements.cursorGlow.style.top = `${glowY}px`;

        requestAnimationFrame(animLoop);
    }
    requestAnimationFrame(animLoop);

    const interactives = 'a, button, .tag-badge, .category-badge, .svg-chart-bar, input, textarea, .project-card';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactives)) {
            elements.cursorDot.classList.add('custom-cursor-active');
            elements.cursorGlow.classList.add('custom-cursor-glow-active');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactives)) {
            elements.cursorDot.classList.remove('custom-cursor-active');
            elements.cursorGlow.classList.remove('custom-cursor-glow-active');
        }
    });
}

function showToast(message, type = 'success') {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = '💬';
    if (type === 'success') icon = '✓';
    else if (type === 'error') icon = '✗';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <div class="toast-content">${message}</div>
    `;

    elements.toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}
