# IE104
(English below)
# Website Khoa Khoa học và Kỹ Thuật Thông tin (ISE) - Trường Đại học Công nghệ thông tin

## 📖 Giới thiệu dự án

Dự án này là website thông tin chính thức cho **Khoa Khoa học và Kỹ thuật Thông tin (ISE)** của **Trường Đại học Công nghệ thông tin**. Mục tiêu là xây dựng một cổng thông tin kỹ thuật số hiện đại, chuyên nghiệp và dễ sử dụng, phục vụ cho sinh viên, giảng viên và các đối tác bên ngoài.

## ✨ Các tính năng chính

* **Cấu trúc trang:** Bao gồm đầy đủ các trang thông tin cần thiết:
    * `index.html`: Trang chủ, tổng quan và tin tức mới nhất.
    * `pages/gioi-thieu/`: Giới thiệu chi tiết về lịch sử, sứ mệnh của khoa.
    * `pages/dao-tao.html`: Thông tin các chương trình đào tạo, chuyên ngành.
    * `pages/doi-ngu-nhan-su/`: Giới thiệu đội ngũ giảng viên, nhân viên.
    * `pages/tuyen-sinh/`: Cập nhật thông tin tuyển sinh hàng năm.
    * `pages/tin-tuc/`: Kênh tin tức, sự kiện và thông báo.
    * `pages/nhom-nghien-cuu/`, `bai-bao-nckh...`: Chuyên trang về nghiên cứu khoa học.
    * `pages/lien-he.html`: Thông tin liên hệ
* **Thiết kế Tái sử dụng:** Sử dụng thư mục `components/` để quản lý các thành phần chung (Header, Footer), giúp dễ dàng bảo trì và đồng bộ giao diện.
* **Tự động hóa (CI/CD):** Cấu hình sẵn sàng cho GitHub Actions (trong `.github/workflows`) để tự động kiểm tra hoặc triển khai (deploy) dự án.

## 🚀 Công nghệ sử dụng

* **Frontend:**
    * HTML5
    * CSS3 (Quản lý trong thư mục `/styles`)
    * JavaScript (ES6+) (Quản lý trong thư mục `/js`)
* **Hệ thống quản lý phiên bản:**
    * Git & GitHub
* **Triển khai & Tự động hóa (DevOps):**
    * GitHub Actions (CI/CD)

## 📂 Cấu trúc thư mục
```
/
├── .github/workflows/   (GitHub Actions CI/CD config)
├── assets/              (Chứa images, logos, fonts)
├── components/          (Chứa các file html for header, footer, etc.)
├── js/                  (Chứa các file JavaScript)
├── pages/               (Chứa website subpages)
│   ├── doi-ngu-nhan-su/
│   ├── gioi-thieu/
│   ├── ... (and other pages)
│   └── lien-he.html
├── styles/              (Chứa các file CSS)
├── .gitignore           (File cho Git để bỏ qua)
├── 404.html             (404 lỗi page)
├── index.html           (Trang chủ)
├── README.md            (File Hướng dẫn này)
└── server.py            (File Python backend server, chạy trên local)
```
## 💡 Hướng phát triển tương lai

* Tích hợp một hệ thống quản lý nội dung (CMS) đơn giản để dễ dàng cập nhật tin tức, sự kiện.
* Tối ưu hóa SEO (Search Engine Optimization) để tăng khả năng hiển thị trên Google.
* Cải thiện giao diện và trải nghiệm người dùng (UI/UX) dựa trên phản hồi thực tế.
* Xây dựng và backend để xử lý form liên hệ và các nghiệp vụ phức tạp hơn.

## 👥 Đội ngũ phát triển

| Tên | MSSV | 
| :--- | :--- | 
| Mạc Nguyễn Gia Huy| 23520620 | 
| Huỳnh Hoàng Hưng| 23520560 | 
| Trần Ngọc Khả Hân| 23520438 | 
| Võ Tấn Đạt| 23520278 | 
## 🙏 Lời cảm ơn

Để hoàn thành dự án này, nhóm chúng em xin gửi lời cảm ơn chân thành đến:

* Giảng viên hướng dẫn **Võ Tấn Khoa**, người đã tận tình chỉ bảo, định hướng và giúp đỡ chúng em giải quyết các vướng mắc trong suốt quá trình thực hiện đồ án.

Mặc dù đã rất cố gắng, nhưng dự án không thể tránh khỏi những thiếu sót. Chúng em rất mong nhận được sự góp ý từ thầy cô và các bạn để dự án được hoàn thiện hơn.

Chúng em xin chân thành cảm ơn!

---

# (English Version)

# Website for the Faculty of Information Technology (ISE) - The University of Information Technology

## 📖 Project Introduction

This project is the official information website for the **Faculty of Information Technology (ISE)** at **The University of Information Technology**. The goal is to build a modern, professional, and user-friendly digital portal to serve students, faculty, and external partners.


## ✨ Key Features

* **Rich Page Structure:** Includes a comprehensive set of informational pages:
    * `index.html`: Homepage with overview and latest news.
    * `pages/gioi-thieu/`: Detailed information on the faculty's history and mission.
    * `pages/dao-tao.html`: Information on academic programs and majors.
    * `pages/doi-ngu-nhan-su/`: Faculty and staff profiles.
    * `pages/tuyen-sinh/`: Annual admission information.
    * `pages/tin-tuc/`: News, events, and announcements channel.
    * `pages/nhom-nghien-cuu/`, `bai-bao-nckh...`: Dedicated section for scientific research.
    * `pages/lien-he.html`: Contact information.
* **Reusable Design:** Utilizes a `components/` directory to manage shared elements (Header, Footer), ensuring easy maintenance and UI consistency.
* **Automation (CI/CD):** Pre-configured for GitHub Actions (in `.github/workflows`) to automatically test or deploy the project.

## 🚀 Technologies Used

* **Frontend:**
    * HTML5
    * CSS3 (Managed in `/styles` directory)
    * JavaScript (ES6+) (Managed in `/js` directory)
* **Version Control System:**
    * Git & GitHub
* **Deployment & Automation (DevOps):**
    * GitHub Actions (CI/CD)

## 📂 File Structure
```
/
├── .github/workflows/   (GitHub Actions CI/CD config)
├── assets/              (Contains images, logos, fonts)
├── components/          (Contains .html files for header, footer, etc.)
├── js/                  (Contains JavaScript files)
├── pages/               (Contains website subpages)
│   ├── doi-ngu-nhan-su/
│   ├── gioi-thieu/
│   ├── ... (and other pages)
│   └── lien-he.html
├── styles/              (Contains CSS files)
├── .gitignore           (Files for Git to ignore)
├── 404.html             (Custom 404 error page)
├── index.html           (Homepage)
├── README.md            (This guide)
└── server.py            (Python backend server file, for local deploy)
```
## 💡 Future Development

* Integrate a simple Content Management System (CMS) for easier news and event updates.
* Optimize SEO (Search Engine Optimization) to improve Google search visibility.
* Improve UI/UX based on real user feedback.
* Design and develop backend to handle contact forms and more complex logic.

## 👥 Development Team

| Name | Student ID | 
| :--- | :--- | 
| Mac Nguyen Gia Huy| 23520620 | 
| Huynh Hoang Hung| 23520560 | 
| Tran Ngoc Kha Han| 23520438 | 
| Vo Tan Dat| 23520278 | 

## 🙏 Acknowledgements

To complete this project, we would like to express our sincere gratitude to:

* Our advisor, **Khoa Vo Tan**, who provided dedicated guidance, direction, and support in helping us overcome challenges throughout the implementation of this thesis/project.

Although we have tried our best, the project is inevitably not without its shortcomings. We look forward to receiving feedback from our instructors and peers to further improve this project.

We sincerely thank you!
