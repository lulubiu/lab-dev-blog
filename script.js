// 更新时间函数
function updateTime() {
    const now = new Date();

    // 格式化时间
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('milliseconds').textContent = '.' + milliseconds;

    // 格式化日期
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[now.getDay()];

    document.getElementById('date').textContent = `${year}年${month}月${day}日 ${weekday}`;

    // 根据时间段显示问候语
    const hour = now.getHours();
    let greeting = '';
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning ☀️';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good Afternoon 🌤️';
    } else if (hour >= 18 && hour < 22) {
        greeting = 'Good Evening 🌙';
    } else {
        greeting = 'Good Night ✨';
    }

    document.getElementById('greeting').textContent = greeting;
}

// 页面加载时立即更新一次
updateTime();

// 使用 requestAnimationFrame 实现高精度毫秒级更新
function animateTime() {
    updateTime();
    requestAnimationFrame(animateTime);
}

// 启动动画循环
animateTime();

// 创建动态背景粒子效果
function createParticles() {
    const container = document.querySelector('.gradient-bg');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // 随机大小
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // 随机位置
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // 随机动画延迟
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 15}s`;

        container.appendChild(particle);
    }
}

// 页面加载时创建粒子
window.addEventListener('load', createParticles);

// 动态加载工具列表
async function loadTools() {
    try {
        const response = await fetch('tools.json');
        const tools = await response.json();

        const toolsGrid = document.querySelector('.grid.grid-cols-1');

        // 清空现有的工具卡片模板
        toolsGrid.innerHTML = '';

        // 为每个工具创建卡片
        tools.forEach(tool => {
            const toolCard = createToolCard(tool);
            toolsGrid.appendChild(toolCard);
        });
    } catch (error) {
        console.error('加载工具列表失败:', error);
    }
}

// 创建工具卡片
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card glass-effect rounded-2xl p-6 cursor-pointer';
    card.onclick = () => window.open(tool.url, '_blank');

    // 从URL提取域名用于获取favicon
    const domain = new URL(tool.url).hostname;
    const faviconUrl = `https://favicon.im/${domain}?larger=true`;

    card.innerHTML = `
        <div class="flex items-start gap-4">
            <!-- 左侧：Logo -->
            <div class="icon-wrapper flex-shrink-0 flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl overflow-hidden">
                <img src="${faviconUrl}"
                     alt="${tool.title} 图标"
                     class="w-10 h-10"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <svg class="w-8 h-8 text-white" style="display:none;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
            </div>
            <!-- 右侧：文字信息 -->
            <div class="flex-1 min-w-0">
                <h3 class="text-xl font-semibold text-white mb-2">${tool.title}</h3>
                <p class="text-white/80 text-sm leading-relaxed">${tool.description}</p>
            </div>
        </div>
    `;

    return card;
}

// 页面加载时加载工具列表
window.addEventListener('load', loadTools);

// 赞赏弹窗交互
const donateBtn = document.getElementById('donateBtn');
const donateModal = document.getElementById('donateModal');
const closeModal = document.getElementById('closeModal');

// 打开弹窗
donateBtn.addEventListener('click', () => {
    donateModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
});

// 关闭弹窗
closeModal.addEventListener('click', () => {
    donateModal.classList.remove('show');
    document.body.style.overflow = ''; // 恢复滚动
});

// 点击弹窗背景关闭
donateModal.addEventListener('click', (e) => {
    if (e.target === donateModal) {
        donateModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && donateModal.classList.contains('show')) {
        donateModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});
