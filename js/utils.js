// Hàm tải header và footer động dựa trên đường dẫn trang hiện tại
function loadHeaderAndFooter() {
    const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
    let componentsPath = '../components/'; // Đường dẫn mặc định đến thư mục components
    
    // Điều chỉnh đường dẫn cho các trang trong thư mục con
    if (currentPath.includes('/nhom-nghien-cuu/') || 
        currentPath.includes('/doi-ngu-nhan-su/') || 
        currentPath.includes('/gioi-thieu/') ||
        currentPath.includes('/tin-tuc/')) {
        componentsPath = '../../components/';
    }
    
    // Sử dụng Promise.all để đợi cả header và footer load xong
    const headerPromise = fetch(componentsPath + 'header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = data; // Chèn nội dung header vào container
            }
        })
        .catch(error => console.error('Lỗi khi tải header:', error));

    const footerPromise = fetch(componentsPath + 'footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = data; // Chèn nội dung footer vào container
            }
        })
        .catch(error => console.error('Lỗi khi tải footer:', error));
    
    // Đợi cả header và footer load xong, sau đó hiển thị trang
    Promise.all([headerPromise, footerPromise])
        .then(() => {
            // Thêm class 'loaded' vào body để hiển thị trang với transition mượt
            document.body.classList.add('loaded');
            console.log('Header và Footer đã tải xong, trang đã sẵn sàng hiển thị');
        })
        .catch(error => {
            console.error('Lỗi khi tải components:', error);
            // Vẫn hiển thị trang nếu có lỗi để tránh trang bị trắng vĩnh viễn
            document.body.classList.add('loaded');
        });
}

// Khởi tạo các thành phần chung (header, footer)
function initCommonElements() {
    loadHeaderAndFooter();
}

// Khởi động khi DOM đã sẵn sàng
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommonElements);
} else {
    initCommonElements(); // Chạy ngay nếu DOM đã load xong
}
