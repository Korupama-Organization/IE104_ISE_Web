#!/usr/bin/env python3
"""
Server HTTP tùy chỉnh cho IE104_ISE_Web
Cung cấp URL sạch không có /pages/ và đuôi .html
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse, unquote

PORT = 3000  # Cổng chạy server

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler tùy chỉnh để định tuyến URL sạch đến file HTML thực tế"""
    
    def do_GET(self):
        """Xử lý GET request với routing tùy chỉnh"""
        # Phân tích URL
        parsed_path = urlparse(self.path)
        url_path = unquote(parsed_path.path)
        
        # Bản đồ routing: URL sạch -> đường dẫn file thực tế
        routes = {
            '/': 'pages/home.html',
            '/home': 'pages/home.html',
            '/dao-tao': 'pages/dao-tao.html',
            '/lien-he': 'pages/lien-he.html',
            '/tin-tuc': 'pages/tin-tuc.html',
            '/cac-nhom-nghien-cuu': 'pages/cac-nhom-nghien-cuu.html',
            '/cong-bo-khoa-hoc': 'pages/cong-bo-khoa-hoc.html',
            '/bai-bao-nckh-sinh-vien': 'pages/bai-bao-nckh-sinh-vien.html',
            
            # Giới thiệu
            '/gioi-thieu': 'pages/gioi-thieu/gioi-thieu-chung.html',
            '/gioi-thieu-chung': 'pages/gioi-thieu/gioi-thieu-chung.html',
            '/doi-ngu-nhan-su': 'pages/gioi-thieu/doi-ngu-nhan-su.html',
            
            # Nhóm nghiên cứu
            '/nhom-nghien-cuu/bao-mat-blockchain-iot': 'pages/nhom-nghien-cuu/bao-mat-blockchain-iot.html',
            '/nhom-nghien-cuu/khoa-hoc-du-lieu': 'pages/nhom-nghien-cuu/khoa-hoc-du-lieu.html',
            '/nhom-nghien-cuu/khoa-hoc-thong-tin-dia-ly': 'pages/nhom-nghien-cuu/khoa-hoc-thong-tin-dia-ly.html',
            '/nhom-nghien-cuu/phat-trien-he-thong': 'pages/nhom-nghien-cuu/phat-trien-he-thong.html',
            '/nhom-nghien-cuu/tinh-toan-ky-thuat-nang-cao': 'pages/nhom-nghien-cuu/tinh-toan-ky-thuat-nang-cao.html',
            '/nhom-nghien-cuu/xu-ly-du-lieu': 'pages/nhom-nghien-cuu/xu-ly-du-lieu.html',
            '/nhom-nghien-cuu/xu-ly-ngon-ngu': 'pages/nhom-nghien-cuu/xu-ly-ngon-ngu.html',
            
            # Đội ngũ nhân sự
            '/giang-vien/camnt': 'pages/doi-ngu-nhan-su/doi-ngu-nhan-su_camnt.html',
            '/giang-vien/khoavt': 'pages/doi-ngu-nhan-su/doi-ngu-nhan-su_khoavt.html',
            '/giang-vien/kietnv': 'pages/doi-ngu-nhan-su/doi-ngu-nhan-su_kietnv.html',
            '/giang-vien/thunta': 'pages/doi-ngu-nhan-su/doi-ngu-nhan-su_thunta.html',
        }
        
        # Kiểm tra xem URL có khớp với route nào không
        if url_path in routes:
            # Viết lại đường dẫn đến file thực tế
            self.path = '/' + routes[url_path]
        
        # Nếu đường dẫn kết thúc bằng / và không phải root, thử thêm index.html
        elif url_path.endswith('/') and url_path != '/':
            possible_index = url_path.rstrip('/') + '/index.html'
            if os.path.exists('.' + possible_index):
                self.path = possible_index
        
        # Gọi phương thức của class cha để phục vụ file
        return super().do_GET()
    
    def end_headers(self):
        """Thêm custom headers"""
        # Thiết lập encoding UTF-8 cho file HTML
        if self.path.endswith('.html'):
            self.send_header('Content-Type', 'text/html; charset=utf-8')
        super().end_headers()

def run_server():
    """Khởi động HTTP server"""
    Handler = CustomHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"╔══════════════════════════════════════════════════════╗")
            print(f"║  IE104 ISE Web Server                                ║")
            print(f"╠══════════════════════════════════════════════════════╣")
            print(f"║  Server running at: http://localhost:{PORT}            ║")
            print(f"║  Press Ctrl+C to stop the server                     ║")
            print(f"╚══════════════════════════════════════════════════════╝")
            print(f"\n📄 Available routes:")
            print(f"  Home page:        http://localhost:{PORT}/")
            print(f"  Đào tạo:          http://localhost:{PORT}/dao-tao")
            print(f"  Liên hệ:          http://localhost:{PORT}/lien-he")
            print(f"  Tin tức:          http://localhost:{PORT}/tin-tuc")
            print(f"  Giới thiệu:       http://localhost:{PORT}/gioi-thieu")
            print(f"  Nhóm nghiên cứu:  http://localhost:{PORT}/cac-nhom-nghien-cuu")
            print(f"  Công bố KH:       http://localhost:{PORT}/cong-bo-khoa-hoc")
            print(f"  Bài báo NCKH SV:  http://localhost:{PORT}/bai-bao-nckh-sinh-vien")
            print(f"\n")
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print(f"\n\n🛑 Server stopped.")
    except OSError as e:
        if e.errno == 10048:  # Port already in use on Windows
            print(f"\n❌ Error: Port {PORT} is already in use.")
            print(f"   Please close the other application or change the PORT in server.py")
        else:
            print(f"\n❌ Error: {e}")

if __name__ == "__main__":
    run_server()
