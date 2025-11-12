// Vô hiệu hóa tất cả các tab (bỏ class active)
function disableAllTabs() {
    document.getElementById("tab-data-science").classList.remove("active");
    document.getElementById("tab-mobile-web").classList.remove("active");
}

// Hiển thị tab Bộ môn Khoa học Dữ liệu
function showDataScience() {
    disableAllTabs();
    document.getElementById("mobileWeb").classList.add("hidden"); // Ẩn nội dung tab Mobile Web
    document.getElementById("dataScience").classList.remove("hidden"); // Hiện nội dung tab Data Science
    document.getElementById("tab-data-science").classList.add("active"); // Đánh dấu tab active
}

// Hiển thị tab Bộ môn Thiết bị Di động và Công nghệ Web
function showMobileWeb() {
    disableAllTabs();
    document.getElementById("dataScience").classList.add("hidden"); // Ẩn nội dung tab Data Science
    document.getElementById("mobileWeb").classList.remove("hidden"); // Hiện nội dung tab Mobile Web
    document.getElementById("tab-mobile-web").classList.add("active"); // Đánh dấu tab active
}

// Gắn sự kiện click cho các tab
document.getElementById("tab-data-science").addEventListener("click", showDataScience);
document.getElementById("tab-mobile-web").addEventListener("click", showMobileWeb);

// Xác định tab mặc định dựa trên URL parameter
const params = new URLSearchParams(window.location.search);
const selectedTab = params.get("tab");

if (selectedTab === "mobileWeb") {
    showMobileWeb();
} else {
    showDataScience(); // Mặc định
}
