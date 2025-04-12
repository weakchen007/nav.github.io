// 主要功能脚本
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('image-gallery');
    
    // 加载网站数据
    loadSites();
    
    // 从config.js加载网站数据并渲染到页面
    function loadSites() {
        gallery.innerHTML = '';
        
        siteData.sites.forEach(site => {
            const card = document.createElement('div');
            card.className = 'image-card';
            
            card.innerHTML = `
                <a href="${site.link}" target="_blank">
                    <img src="${site.imageUrl}" alt="${site.title}">
                    <div class="title">${site.title}</div>
                </a>
            `;
            
            gallery.appendChild(card);
        });
    }
});
