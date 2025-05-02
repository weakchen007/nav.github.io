// 检查密码（简单示例，实际应用中应更安全）
function checkPassword() {
    const password = document.getElementById('password').value;
    // 默认密码是"admin123"，你可以修改
    if (password === 'admin123') {
        document.getElementById('password-section').style.display = 'none';
        document.getElementById('management-section').style.display = 'block';
        displaySiteList();
    } else {
        alert('密码错误！');
    }
}

// 获取网站数据
function getSites() {
    const sites = localStorage.getItem('sites');
    return sites ? JSON.parse(sites) : [];
}

// 保存网站数据
function saveSites(sites) {
    localStorage.setItem('sites', JSON.stringify(sites));
}

// 添加新网站
function addSite() {
    const name = document.getElementById('site-name').value;
    const url = document.getElementById('site-url').value;
    const image = document.getElementById('site-image').value;
    
    if (!name || !url) {
        alert('请填写网站名称和URL！');
        return;
    }
    
    const sites = getSites();
    sites.push({
        name,
        url: url.startsWith('http') ? url : 'https://' + url,
        image: image || 'images/default.png'
    });
    
    saveSites(sites);
    displaySiteList();
    
    // 清空表单
    document.getElementById('site-name').value = '';
    document.getElementById('site-url').value = '';
    document.getElementById('site-image').value = '';
}

// 删除网站
function deleteSite(index) {
    const sites = getSites();
    sites.splice(index, 1);
    saveSites(sites);
    displaySiteList();
}

// 显示网站列表
function displaySiteList() {
    const sites = getSites();
    const container = document.getElementById('sites-list');
    
    container.innerHTML = '';
    
    sites.forEach((site, index) => {
        const item = document.createElement('div');
        item.className = 'site-item';
        
        const info = document.createElement('div');
        info.innerHTML = `<strong>${site.name}</strong>: ${site.url}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '删除';
        deleteBtn.onclick = () => deleteSite(index);
        
        item.appendChild(info);
        item.appendChild(deleteBtn);
        container.appendChild(item);
    });
}
