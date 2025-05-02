// 从localStorage获取网站数据
function getSites() {
    const sites = localStorage.getItem('sites');
    return sites ? JSON.parse(sites) : [];
}

// 显示网站卡片
function displaySites() {
    const sites = getSites();
    const container = document.getElementById('sites-container');
    
    container.innerHTML = '';
    
    sites.forEach(site => {
        const card = document.createElement('a');
        card.href = site.url;
        card.target = '_blank';
        card.className = 'site-card';
        
        const img = document.createElement('img');
        img.src = site.image || 'images/default.png';
        img.alt = site.name;
        
        const name = document.createElement('p');
        name.textContent = site.name;
        
        card.appendChild(img);
        card.appendChild(name);
        container.appendChild(card);
    });
}

// 页面加载时显示网站
document.addEventListener('DOMContentLoaded', displaySites);
