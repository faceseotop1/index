FACESEO – LANDING PAGE ĐÀO TẠO SEO

1. CÁCH MỞ WEBSITE
- Giải nén thư mục.
- Bấm đúp file index.html để mở trực tiếp bằng trình duyệt.
- Website không cần framework, không cần cài đặt và không cần chạy lệnh build.

2. CÁCH ĐỔI SỐ ĐIỆN THOẠI
- Mở index.html bằng trình soạn thảo văn bản.
- Tìm toàn bộ: 0922 396 033 và thay bằng số hiển thị mới.
- Tìm toàn bộ: 0922396033 và thay bằng số chỉ gồm chữ số dùng cho liên kết tel:.

3. CÁCH ĐỔI ĐỊA CHỈ
- Mở index.html, tìm: 36A Đường Số 4, TP.HCM
- Thay cả phần hiển thị và dữ liệu Schema trong thẻ application/ld+json.

4. CÁCH THAY LOGO VÀ ẢNH
- Logo: thay assets/images/logo.webp bằng file mới cùng tên.
- Ảnh hero: thay assets/images/hero-seo.webp bằng file mới cùng tên.
- Nên giữ đúng tỷ lệ gần giống ảnh cũ và dùng WebP để website tải nhanh.

5. CÁCH CẬP NHẬT TÊN MIỀN VÀ CHIA SẺ
- Trong index.html, thay https://ten-mien-cua-ban.vn/ bằng tên miền thật ở canonical, Open Graph và Schema.
- Ảnh chia sẻ hiện dùng assets/images/hero-seo.webp.

6. CÁCH ĐƯA LÊN HOSTING
- GitHub Pages: tải toàn bộ nội dung trong thư mục landing-page lên repository, bật Pages từ nhánh main.
- Netlify/Vercel: kéo thả cả thư mục landing-page hoặc kết nối repository.
- Hosting thường: tải index.html và thư mục assets vào thư mục public_html.

7. CÁCH KẾT NỐI FORM VỚI GOOGLE SHEETS/API
- Tạo hoặc mở Google Sheet muốn nhận đăng ký.
- Chọn Tiện ích mở rộng > Apps Script.
- Xóa mã mẫu và dán toàn bộ nội dung file GOOGLE-APPS-SCRIPT.gs.
- Nhấn Lưu, sau đó chọn Triển khai > Lần triển khai mới > Ứng dụng web.
- Mục "Thực thi dưới dạng" chọn "Tôi".
- Mục "Ai có quyền truy cập" chọn "Bất kỳ ai".
- Nhấn Triển khai, cấp quyền và sao chép URL kết thúc bằng /exec.
- Mở assets/js/main.js, tìm: const FORM_ENDPOINT = '';
- Dán URL vào giữa hai dấu nháy, ví dụ: const FORM_ENDPOINT = 'https://script.google.com/macros/s/XXXXX/exec';
- Không dùng URL kết thúc bằng /dev và không dùng URL trên thanh địa chỉ của Google Sheet.
- Sheet "Đăng ký" cùng hàng tiêu đề sẽ tự được tạo khi có lượt gửi đầu tiên.
- Khi chưa có endpoint, form chủ động báo chế độ demo và không giả vờ rằng dữ liệu đã được lưu.

8. LƯU Ý TRƯỚC KHI XUẤT BẢN
- Xác nhận lịch học, học phí, chương trình và chính sách hỗ trợ với FACESEO.
- Thay URL placeholder bằng tên miền thật.
- Kiểm tra lại số điện thoại và địa chỉ.
- Các con số trong dashboard hero chỉ là dữ liệu giao diện minh họa.
