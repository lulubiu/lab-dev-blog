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
