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

//Hiệu ứng chuyển slide hình ảnh
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 5000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 5000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};

//Tab-slider - Xử lý khi click vào các ngành đào tạo
let navtabs = document.querySelectorAll('.tabs');
navtabs.forEach(item => {
    item.addEventListener('click', function(event){
        if(event.target.classList.contains('tabs-nav-item')){
            let lastActive = item.querySelector('li.active');
            let newActive = event.target;

            // Nếu click vào tab đã active, không làm gì
            if (lastActive === newActive) {
                return;
            }

            // Xóa active class khỏi tab cũ nếu có
            if (lastActive) {
                lastActive.classList.remove('active');
            }
            
            // Thêm active class cho tab mới
            newActive.classList.add('active');

            // Xóa active class khỏi content cũ nếu có
            let lastContentActive = item.querySelector('.tabs-content-items.active');
            if (lastContentActive) {
                lastContentActive.classList.remove('active');
            }
            
            // Hiển thị content mới
            let newContentActive = document.getElementById(newActive.dataset.target);
            newContentActive.classList.add('active');
            
            // Scroll xuống phần content với animation mượt
            setTimeout(() => {
                newContentActive.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest'
                });
            }, 100);
        }
    })
})