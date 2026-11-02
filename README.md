# Phúc Portfolio

Portfolio song ngữ, triển khai tĩnh trên GitHub Pages. Tiếng Anh mặc định; lựa chọn ngôn ngữ được lưu trong trình duyệt.

## Chạy local

```bash
python -m http.server 8765
```

Mở http://localhost:8765/. `index.html`, `style.css` và `script.js` chứa giao diện và nội dung; `motion.js` quản lý hiệu ứng. Các thư viện GSAP 3.15.0, ScrollTrigger và Three.js 0.187.0 được lưu trong `vendor/` để trang chạy không phụ thuộc CDN. Có phương án đồ họa tĩnh khi WebGL không khả dụng và hỗ trợ reduced motion.

Hai bản PDF: `portfolio-vi.pdf` và `portfolio-en.pdf`. Ảnh dự án nằm trong `assets/`.

## Tạo lại PDF

Trên Windows, cài Python và ReportLab, sau đó chạy `python scripts/generate_portfolio_pdf.py`. Script dùng font Arial trong `C:/Windows/Fonts` và tạo lại cả hai bản PDF từ nội dung, ảnh trong repo.
