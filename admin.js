async function hash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
async function checkPassword() {
    const password = document.getElementById('password').value;
    // 计算哈希后的密码 "minabc" -> "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"
    const hashedPassword = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"; 
    if (await hash(password) === hashedPassword) {
        document.getElementById('password-section').style.display = 'none';
        document.getElementById('management-section').style.display = 'block';
        displaySiteList();
    } else {
        alert('密码错误！');
    }
}
