// ===== DỮ LIỆU CHƯƠNG TRÌNH VÀ TRẠNG THÁI =====
// Lưu ý: Header và Footer được tải bởi utils.js, không cần tải lại ở đây

// Chương trình và tab đang hoạt động
let currentProgram = 'cntt-bachelor';
let currentTab = 'bachelor';

function applyResponsiveAdjustments() {
    const viewportWidth = window.innerWidth;

    let overlayHeight = 326;
    if (viewportWidth <= 480) {
        overlayHeight = 200;
    } else if (viewportWidth <= 768) {
        overlayHeight = 240;
    } else if (viewportWidth <= 1024) {
        overlayHeight = 280;
    }

    const isMobile = viewportWidth <= 768;

    document.querySelectorAll('.banner-overlay').forEach(overlay => {
        overlay.style.height = `${overlayHeight}px`;
        if (isMobile) {
            overlay.style.width = '100%';
            overlay.style.borderRadius = '16px 16px 0 0';
        } else {
            overlay.style.width = '464px';
            overlay.style.borderRadius = '16px 0 0 0';
        }
    });

    document.querySelectorAll('.tab').forEach(tab => {
        if (isMobile) {
            tab.style.transform = 'none';
        } else {
            tab.style.removeProperty('transform');
        }
    });
}

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

    applyResponsiveAdjustments();
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

    applyResponsiveAdjustments();
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
window.addEventListener('resize', applyResponsiveAdjustments);

// ===== KHỞI TẠO =====

// Hàm khởi tạo tab dựa trên URL parameter
function initializePage() {
    // Kiểm tra URL parameters để xác định tab nào cần hiển thị
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab'); // Lấy giá trị của ?tab=
    const programParam = urlParams.get('program'); // Lấy giá trị của ?program=
    
    // Xác định tab mặc định dựa trên URL parameter
    let initialTab = 'bachelor'; // Mặc định là đại học
    let initialProgram = programParam || 'cntt-bachelor'; // Dùng program param nếu có
    
    if (tabParam) {
        switch(tabParam.toLowerCase()) {
            case 'bachelor':
                initialTab = 'bachelor';
                if (!programParam) initialProgram = 'cntt-bachelor';
                break;
            case 'master':
                initialTab = 'master';
                if (!programParam) initialProgram = 'cntt-master';
                break;
            case 'phd':
                initialTab = 'phd';
                if (!programParam) initialProgram = 'cntt-phd';
                break;
            default:
                // Giữ giá trị mặc định nếu parameter không hợp lệ
                initialTab = 'bachelor';
                if (!programParam) initialProgram = 'cntt-bachelor';
        }
    }
    
    console.log('Initializing page with tab:', initialTab, 'program:', initialProgram);
    
    // Kiểm tra xem các elements đã tồn tại chưa
    const checkAndInit = () => {
        const bachelorTab = document.getElementById('tab-bachelor');
        if (bachelorTab) {
            // Các elements đã sẵn sàng, chuyển tab
            switchTab(initialTab);
            selectProgram(initialProgram);
            applyResponsiveAdjustments();
            console.log('Page initialized successfully with tab:', initialTab, 'program:', initialProgram);
        } else {
            // Chưa sẵn sàng, thử lại sau 100ms
            console.log('Elements not ready, retrying...');
            setTimeout(checkAndInit, 100);
        }
    };
    
    checkAndInit();
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    // Header và Footer được tải bởi utils.js
    // Đợi một chút để đảm bảo DOM đã được render hoàn toàn
    setTimeout(initializePage, 100);
    
    // Thêm scroll mượt cho mục điều hướng
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Thêm logic điều hướng tại đây nếu cần
            console.log('Navigation clicked:', this.textContent);
        });
    });
});

// ===== HÀM TOÀN CỤC =====

// Đưa các hàm ra phạm vi toàn cục
window.switchTab = switchTab;
window.selectProgram = selectProgram;
window.smoothScroll = smoothScroll;
