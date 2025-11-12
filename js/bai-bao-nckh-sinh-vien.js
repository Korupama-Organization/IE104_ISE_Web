// Khởi tạo trang khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
    // Tải header và footer nếu hàm có sẵn
    if (typeof loadHeaderAndFooter === 'function') {
        loadHeaderAndFooter();
    }

    // Chức năng accordion cho danh sách bài báo theo năm
    const toggles = document.querySelectorAll('.year-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active'); // Bật/tắt trạng thái active
            const content = this.nextElementSibling; // Lấy panel nội dung
            content.classList.toggle('show'); // Hiển thị/ẩn nội dung
        });
    });
});
