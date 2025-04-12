document.addEventListener('DOMContentLoaded', () => {
    const siteForm = document.getElementById('site-form');
    const configOutput = document.getElementById('config-output');
    const copyBtn = document.getElementById('copy-btn');
    const siteList = document.getElementById('admin-site-list');
    
    let sites = [...siteData.sites];
    
    // 初始化
    renderSiteList();
    updateConfigOutput();
    
    // 添加网站
    siteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const titleInput = document.getElementById('site-title');
        const imageInput = document.getElementById('site-image');
        const linkInput = document.getElementById('site-link');
        
        const newSite = {
            title: titleInput.value,
            imageUrl: imageInput.value,
            link: linkInput.value
        };
        
        sites.push(newSite);
        renderSiteList();
        updateConfigOutput();
        
        // 重置表单
        siteForm.reset();
    });
    
    // 复制配置
    copyBtn.addEventListener('click', () => {
        configOutput.select();
        document.execCommand('copy');
        alert('配置已复制到剪贴板');
    });
    
    // 渲染网站列表
    function renderSiteList() {
        siteList.innerHTML = '';
        
        sites.forEach((site, index) => {
            const li = document.createElement('li');
            
            li.innerHTML = `
                <div class="site-info">
                    <strong>${site.title}</strong>
                    <small>${site.link}</small>
                </div>
                <div class="site-controls">
                    <button class="delete-btn" data-index="${index}">删除</button>
                </div>
            `;
            
            siteList.appendChild(li);
        });
        
        // 添加删除事件
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                sites.splice(index, 1);
                renderSiteList();
                updateConfigOutput();
            });
        });
    }
    
    // 更新配置输出
    function updateConfigOutput() {
        const config = `// 网站配置和数据
const siteData = {
    sites: ${JSON.stringify(sites, null, 4)}
};`;
        
        configOutput.value = config;
    }
});
