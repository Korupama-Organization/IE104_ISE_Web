// ===== COMPONENT LOADING FUNCTIONS =====

// Function to load header component
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

// Function to load footer component
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

// ===== PROGRAM DATA AND STATE =====

// Current active program and tab
let currentProgram = 'cntt-bachelor';
let currentTab = 'bachelor';

// Program data for all levels
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

// ===== TAB SWITCHING FUNCTIONALITY =====

// Tab switching functionality
function switchTab(tabType) {
    // Get all tab elements
    const bachelorTab = document.getElementById('tab-bachelor');
    const masterTab = document.getElementById('tab-master');
    const phdTab = document.getElementById('tab-phd');
    
    // Get all content elements
    const bachelorContent = document.getElementById('bachelor-content');
    const masterContent = document.getElementById('master-content');
    const phdContent = document.getElementById('phd-content');
    
    // Get program list elements
    const programListTitle = document.getElementById('program-list-title');
    const bachelorProgramList = document.getElementById('bachelor-program-list');
    const masterProgramList = document.getElementById('master-program-list');
    const phdProgramList = document.getElementById('phd-program-list');
    
    // Update current tab
    currentTab = tabType;
    
    // Remove active class from all tabs
    [bachelorTab, masterTab, phdTab].forEach(tab => {
        if (tab) tab.classList.remove('active');
    });
    
    // Hide all content sections
    [bachelorContent, masterContent, phdContent].forEach(content => {
        if (content) content.style.display = 'none';
    });
    
    // Hide all program lists
    [bachelorProgramList, masterProgramList, phdProgramList].forEach(list => {
        if (list) list.style.display = 'none';
    });
    
    // Get program cards for each level
    const bachelorPrograms = document.querySelectorAll('.bachelor-program');
    const masterPrograms = document.querySelectorAll('.master-program');
    const phdPrograms = document.querySelectorAll('.phd-program');
    
    // Hide all program cards
    [bachelorPrograms, masterPrograms, phdPrograms].forEach(programs => {
        programs.forEach(program => program.style.display = 'none');
    });
    
    // Handle specific tab activation
    switch (tabType) {
        case 'bachelor':
            // Activate bachelor tab
            if (bachelorTab) bachelorTab.classList.add('active');
            if (bachelorContent) bachelorContent.style.display = 'block';
            if (programListTitle) programListTitle.textContent = 'Các chương trình đào tạo Đại học năm 2025';
            if (bachelorProgramList) bachelorProgramList.style.display = 'block';
            
            // Show bachelor program cards
            bachelorPrograms.forEach(program => program.style.display = 'block');
            
            // Set default program if switching to bachelor
            if (!currentProgram.includes('bachelor')) {
                selectProgram('cntt-bachelor');
            }
            break;
            
        case 'master':
            // Activate master tab
            if (masterTab) masterTab.classList.add('active');
            if (masterContent) masterContent.style.display = 'block';
            if (programListTitle) programListTitle.textContent = 'Các chương trình đào tạo Thạc sĩ năm 2025';
            if (masterProgramList) masterProgramList.style.display = 'block';
            
            // Show master program cards
            masterPrograms.forEach(program => program.style.display = 'block');
            
            // Set default program if switching to master
            if (!currentProgram.includes('master')) {
                selectProgram('cntt-master');
            }
            break;
            
        case 'phd':
            // Activate phd tab
            if (phdTab) phdTab.classList.add('active');
            if (phdContent) phdContent.style.display = 'block';
            if (programListTitle) programListTitle.textContent = 'Các chương trình đào tạo Tiến sĩ năm 2025';
            if (phdProgramList) phdProgramList.style.display = 'block';
            
            // Show phd program cards
            phdPrograms.forEach(program => program.style.display = 'block');
            
            // Set default program if switching to phd
            selectProgram('cntt-phd');
            break;
    }
}

// ===== PROGRAM SELECTION FUNCTIONALITY =====

// Program selection functionality
function selectProgram(programType) {
    // Remove active class from all program cards
    const allCards = document.querySelectorAll('.program-card');
    allCards.forEach(card => card.classList.remove('active'));
    
    // Find and activate the clicked card
    const targetCard = document.querySelector(`[onclick="selectProgram('${programType}')"]`);
    if (targetCard) {
        targetCard.classList.add('active');
    }
    
    // Update current program
    currentProgram = programType;
    
    // Update banner title based on selected program
    const programInfo = programData[programType];
    if (programInfo) {
        switch (currentTab) {
            case 'bachelor':
                const bachelorBannerTitle = document.getElementById('bachelor-banner-title');
                if (bachelorBannerTitle) {
                    bachelorBannerTitle.innerHTML = programInfo.title;
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

// ===== UTILITY FUNCTIONS =====

// Smooth scrolling for internal links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Handle responsive behavior
window.addEventListener('resize', function() {
    // Add responsive handling if needed
    console.log('Window resized');
});

// ===== INITIALIZATION =====

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Load components
    loadHeader();
    loadFooter();

    // Set default states - start with bachelor tab
    switchTab('bachelor');
    selectProgram('cntt-bachelor');

    // Add smooth scrolling to navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add navigation logic here if needed
            console.log('Navigation clicked:', this.textContent);
        });
    });
    
    console.log('Page initialized successfully');
});

// ===== GLOBAL FUNCTIONS =====

// Make functions globally available
window.switchTab = switchTab;
window.selectProgram = selectProgram;
window.smoothScroll = smoothScroll;
