function loadComponent(elementId, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Không thể tải ${url}`);
            return response.text();
        })
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => console.error('Lỗi khi tải component:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', '../components/header.html'); 
    loadComponent('footer-placeholder', '../components/footer.html'); 
});