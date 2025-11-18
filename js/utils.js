// Hàm tải header và footer động dựa trên đường dẫn trang hiện tại
function loadHeaderAndFooter() {
    const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
    let componentsPath = '../components/'; // Đường dẫn mặc định đến thư mục components
    
    // Điều chỉnh đường dẫn cho các trang trong thư mục con
    if (currentPath.includes('/nhom-nghien-cuu/') || 
        currentPath.includes('/doi-ngu-nhan-su/') || 
        currentPath.includes('/gioi-thieu/') ||
        currentPath.includes('/tin-tuc/') ||
        currentPath.includes('/tuyen-sinh/')) {
        componentsPath = '../../components/';
    }
    
    // Sử dụng Promise.all để đợi cả header và footer load xong
    const headerPromise = fetch(componentsPath + 'header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = data; // Chèn nội dung header vào container
                initMobileMenu(); // Khởi tạo mobile menu sau khi header load xong
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

// Hàm khởi tạo mobile menu (hamburger menu)
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const rHeader = document.querySelector('.rHeader');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const navigationItems = document.querySelectorAll('.navigation');
    
    if (!hamburger || !rHeader || !overlay) return;
    
    // Toggle menu khi click vào hamburger
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        rHeader.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Update aria-expanded
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
        
        // Ngăn scroll khi menu mở
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Đóng menu khi click vào overlay
    overlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        rHeader.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        // Xóa active class khỏi tất cả navigation items
        navigationItems.forEach(nav => nav.classList.remove('active'));
    });
    
    // Toggle dropdown khi click vào navigation item trên mobile
    navigationItems.forEach(nav => {
        const navName = nav.querySelector('.nav-name');
        const dropdownMenu = nav.querySelector('.dropdown-menu');
        
        if (navName && dropdownMenu) {
            navName.addEventListener('click', function(e) {
                // Chỉ xử lý trên mobile (khi rHeader có class active)
                if (rHeader.classList.contains('active')) {
                    e.preventDefault();
                    nav.classList.toggle('active');
                }
            });
        }
    });
    
    // Đóng menu khi resize về desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            rHeader.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            // Xóa active class khỏi tất cả navigation items
            navigationItems.forEach(nav => nav.classList.remove('active'));
        }
    });
}

// Khởi động khi DOM đã sẵn sàng
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommonElements);
} else {
    initCommonElements(); // Chạy ngay nếu DOM đã load xong
}
