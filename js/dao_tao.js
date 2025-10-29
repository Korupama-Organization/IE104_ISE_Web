// ===== HÀM TẢI THÀNH PHẦN =====

// Hàm tải thành phần header
async function loadHeader() {
    try {
        const response = await fetch('../components/header.html');
        const html = await response.text();
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Hàm tải thành phần footer
async function loadFooter() {
    try {
        const response = await fetch('../components/footer.html');
        const html = await response.text();
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// ===== DỮ LIỆU CHƯƠNG TRÌNH VÀ TRẠNG THÁI =====

// Chương trình và tab đang hoạt động
let currentProgram = 'cntt-bachelor';
let currentTab = 'bachelor';

// Dữ liệu chương trình cho tất cả các cấp
const programData = {
    // Bachelor programs
    'cntt-bachelor': {
        title: 'Cử nhân<br>Công nghệ Thông tin',
        code: '7480201',
        level: 'bachelor'
    },
    'cnnb-bachelor': {
        title: 'Cử nhân<br>Công nghệ Thông tin - Việt Nhật',
        code: '7480201_VN',
        level: 'bachelor'
    },
    'khdl-bachelor': {
        title: 'Cử nhân<br>Khoa học Dữ liệu',
        code: '7460108',
        level: 'bachelor'
    },
    // Master programs
    'cntt-master': {
        title: 'Thạc sĩ<br>Công nghệ Thông tin',
        code: '8480201',
        level: 'master'
    },
    'khmt-master': {
        title: 'Thạc sĩ<br>Khoa học Máy tính',
        code: '8480101',
        level: 'master'
    },
    'httt-master': {
        title: 'Thạc sĩ<br>Hệ thống Thông tin',
        code: '8480104',
        level: 'master'
    },
    // PhD programs
    'cntt-phd': {
        title: 'Tiến sĩ<br>Công nghệ Thông tin',
        code: '9480201',
        level: 'phd'
    }
};

// ===== CHỨC NĂNG CHUYỂN TAB =====

// Chức năng chuyển tab
function switchTab(tabType) {
    // Lấy tất cả phần tử tab
    const bachelorTab = document.getElementById('tab-bachelor');
    const masterTab = document.getElementById('tab-master');
    const phdTab = document.getElementById('tab-phd');
    
    // Lấy tất cả phần tử nội dung
    const bachelorContent = document.getElementById('bachelor-content');
    const masterContent = document.getElementById('master-content');
    const phdContent = document.getElementById('phd-content');
    
    // Lấy phần tử danh sách chương trình
    const programListTitle = document.getElementById('program-list-title');
    const bachelorProgramList = document.getElementById('bachelor-program-list');
    const masterProgramList = document.getElementById('master-program-list');
    const phdProgramList = document.getElementById('phd-program-list');
    
    // Cập nhật tab hiện tại
    currentTab = tabType;
    
    // Xóa lớp 'active' khỏi tất cả tab
    [bachelorTab, masterTab, phdTab].forEach(tab => {
        if (tab) tab.classList.remove('active');
    });
    
    // Ẩn tất cả mục nội dung
    [bachelorContent, masterContent, phdContent].forEach(content => {
        if (content) content.style.display = 'none';
    });
    
    // Ẩn tất cả danh sách chương trình
    [bachelorProgramList, masterProgramList, phdProgramList].forEach(list => {
        if (list) list.style.display = 'none';
    });
    
    // Lấy các thẻ chương trình cho mỗi cấp
    const bachelorPrograms = document.querySelectorAll('.bachelor-program');
    const masterPrograms = document.querySelectorAll('.master-program');
    const phdPrograms = document.querySelectorAll('.phd-program');
    
    // Ẩn tất cả thẻ chương trình
    [bachelorPrograms, masterPrograms, phdPrograms].forEach(programs => {
        programs.forEach(program => program.style.display = 'none');
    });
    
    // Xử lý kích hoạt tab cụ thể
    switch (tabType) {
        case 'bachelor':
            // Kích hoạt tab đại học
            if (bachelorTab) bachelorTab.classList.add('active');
            if (bachelorContent) bachelorContent.style.display = 'block';
            if (programListTitle) programListTitle.textContent = 'Các chương trình đào tạo Đại học năm 2025';
            if (bachelorProgramList) bachelorProgramList.style.display = 'block';
            
            // Hiển thị các thẻ chương trình đại học
            bachelorPrograms.forEach(program => program.style.display = 'block');
            
            // Đặt chương trình mặc định khi chuyển sang đại học
            if (!currentProgram.includes('bachelor')) {
                selectProgram('cntt-bachelor');
            }
            break;
            
        case 'master':
            // Kích hoạt tab Thạc sĩ
            if (masterTab) masterTab.classList.add('active');
            if (masterContent) masterContent.style.display = 'block';
            if (programListTitle) programListTitle.textContent = 'Các chương trình đào tạo Thạc sĩ năm 2025';
            if (masterProgramList) masterProgramList.style.display = 'block';
            
            // Hiển thị các thẻ chương trình Thạc sĩ
            masterPrograms.forEach(program => program.style.display = 'block');
            
            // Đặt chương trình mặc định khi chuyển sang Thạc sĩ
            if (!currentProgram.includes('master')) {
                selectProgram('cntt-master');
            }
            break;
            
        case 'phd':
            // Kích hoạt tab Tiến sĩ
            if (phdTab) phdTab.classList.add('active');
            if (phdContent) phdContent.style.display = 'block';
            if (programListTitle) programListTitle.textContent = 'Các chương trình đào tạo Tiến sĩ năm 2025';
            if (phdProgramList) phdProgramList.style.display = 'block';
            
            // Hiển thị các thẻ chương trình Tiến sĩ
            phdPrograms.forEach(program => program.style.display = 'block');
            
            // Đặt chương trình mặc định khi chuyển sang Tiến sĩ
            selectProgram('cntt-phd');
            break;
    }
}

// ===== CHỨC NĂNG CHỌN CHƯƠNG TRÌNH =====

// Chức năng chọn chương trình
function selectProgram(programType) {
    // Xóa lớp 'active' khỏi tất cả thẻ chương trình
    const allCards = document.querySelectorAll('.program-card');
    allCards.forEach(card => card.classList.remove('active'));
    
    // Tìm và kích hoạt thẻ được click
    const targetCard = document.querySelector(`[onclick="selectProgram('${programType}')"]`);
    if (targetCard) {
        targetCard.classList.add('active');
    }
    
    // Cập nhật chương trình hiện tại
    currentProgram = programType;
    
    // Cập nhật tiêu đề banner theo chương trình đã chọn
    const programInfo = programData[programType];
    if (programInfo) {
        switch (currentTab) {
            case 'bachelor':
                const bachelorSubPrograms = document.querySelectorAll('#bachelor-content .sub-program-content');
                bachelorSubPrograms.forEach(content => {
                    content.style.display = 'none';
                });
                
                const selectedBachelorContent = document.getElementById(programType);
                if (selectedBachelorContent) {
                    selectedBachelorContent.style.display = 'block';
                }
                break;
                
            case 'master':
                const masterBannerTitle = document.getElementById('master-banner-title');
                if (masterBannerTitle) {
                    masterBannerTitle.innerHTML = programInfo.title;
                }
                break;
                
            case 'phd':
                const phdBannerTitle = document.getElementById('phd-banner-title');
                if (phdBannerTitle) {
                    phdBannerTitle.innerHTML = programInfo.title;
                }
                break;
        }
    }
    
    console.log(`Selected program: ${programType} in ${currentTab} tab`);
}

// ===== HÀM TIỆN ÍCH =====

// Cuộn mượt cho liên kết nội bộ
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Xử lý phản hồi (responsive)
window.addEventListener('resize', function() {
    // Add responsive handling if needed
    console.log('Window resized');
});

// ===== KHỞI TẠO =====

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    // Tải các thành phần
    loadHeader();
    loadFooter();

    // Đặt trạng thái mặc định - bắt đầu với tab đại học
    switchTab('bachelor');
    selectProgram('cntt-bachelor');

    // Thêm scroll mượt cho mục điều hướng
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Thêm logic điều hướng tại đây nếu cần
            console.log('Navigation clicked:', this.textContent);
        });
    });
    
    console.log('Page initialized successfully');
});

// ===== HÀM TOÀN CỤC =====

// Đưa các hàm ra phạm vi toàn cục
window.switchTab = switchTab;
window.selectProgram = selectProgram;
window.smoothScroll = smoothScroll;
