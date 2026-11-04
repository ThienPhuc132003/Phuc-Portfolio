# Portfolio của Thiên Phúc — kế hoạch triển khai

Cập nhật: 05/11/2026. Tài liệu này ghi lại hướng hiện tại để tiếp tục công việc; các quyết định mới của chủ portfolio có ưu tiên cao hơn.

## Mục tiêu và định hướng

Website portfolio song ngữ phục vụ khách hàng freelance, nhà tuyển dụng và người tuyển dụng kỹ thuật. Tiếng Anh mặc định, có chuyển sang tiếng Việt. Thiên Phúc định hướng ý tưởng, UX/UI và trải nghiệm, có nền tảng frontend và dùng AI hỗ trợ phù hợp.

Hướng thị giác editorial sáng tạo, có cá tính; các dự án có không gian màu và nhịp riêng. Dùng ảnh thật của Thiên Phúc ở hero. Mỗi dự án trên trang chủ chỉ dùng một ảnh đại diện, trình bày trong khung như `concept-preview/index.html`, không phóng ảnh website làm nền chuyển cảnh toàn màn hình. Thứ tự: **SLTech → Elysian Wedding → GiaSuVLU**.

Dùng CSS và GSAP/ScrollTrigger cho motion; cuộn tự do, chữ và liên kết luôn dùng được. Không dùng mascot hay asset 3D từ Blender. Bỏ hướng cổng 3D phóng toàn màn hình. Chỉ cân nhắc Three.js cho nhu cầu cụ thể khác nếu chủ portfolio chọn sau.

## Trạng thái và điểm cần xác nhận

- Bản được duyệt và phát hành là website ở gốc repo, tại https://thienphuc132003.github.io/Phuc-Portfolio/. `concept-preview/digital-worlds-v2/` là bản thử cũ; `new_site/` là bản riêng chưa được theo dõi trong Git, không tự coi là bản phát hành.
- Bản tham khảo bố cục ảnh: `concept-preview/index.html`. Ảnh dự án hiện có trong `assets/`. Bản concept cũ có mascot và các quyết định đã lỗi thời; chỉ tham khảo cách đặt ảnh.
- Chủ portfolio đã chọn **hero A, nền xanh lá nổi bật**, dùng ảnh thật. Tiếp tục tinh chỉnh hướng này khi cần.
- Các file trong `concept-preview/` đang untracked; kiểm tra `git status` trước khi sửa, giữ lại công việc hiện có. Figma Portfolio2 chứa các hướng cũ có mascot, không xem đó là thiết kế cuối.
- Chủ portfolio đã duyệt website và PDF để phát hành. GitHub Pages là nơi triển khai; không dùng hosting Codex GPT.
- Website đã có ba trang case study, About và form mở email; ngôn ngữ được giữ trong cùng phiên trình duyệt. Đã kiểm tra chuyển ngôn ngữ, điều hướng bàn phím cơ bản và bố cục desktop/mobile.
- Hai PDF phát hành trong `downloads/`; đã xem bốn trang mỗi bản, kiểm tra trích xuất chữ và liên kết. Script tạo lại: `scripts/generate_portfolio_review_pdf.py` bằng Python có ReportLab.

## Công việc theo thứ tự

1. **Hero → SLTech:** bản mẫu đã được trình bày và chủ portfolio chọn hero A. Tiếp tục tinh chỉnh layout và motion theo phản hồi; giữ một ảnh SLTech, chuyển cảnh không che chữ và cuộn tự do.
2. **Elysian và GiaSuVLU:** sau khi chọn hướng, phát triển hai không gian riêng có nhịp chuyển phù hợp; giữ một ảnh đại diện cho mỗi dự án và điều hướng thống nhất. Kiểm tra cả ba phần ở desktop và mobile.
3. **Case study riêng:** trang chủ giới thiệu ngắn; mỗi dự án có trang chi tiết về bối cảnh, vai trò, quyết định thiết kế, quy trình và bằng chứng thực tế. Dùng link dự án hoặc repo thật; không tạo số liệu, kết quả hay khách hàng chưa được xác nhận.
4. **About và liên hệ:** giới thiệu ngắn về sở thích game dẫn đến CNTT, sự tò mò, thích khám phá nhiều phương án; có thể nhắc gym, đạp xe và thiên nhiên. Không công khai thông tin nhận dạng gia đình. Liên hệ đơn giản: tên, thông tin liên lạc và lời nhắn, phù hợp GitHub Pages tĩnh.
5. **Nghiệm thu và phát hành:** kiểm tra nội dung Anh–Việt tương đương, điều hướng/bàn phím/focus, link, viewport desktop/mobile, giảm chuyển động và trường hợp JavaScript hoặc asset lỗi. Đo tải và xem trực quan thực tế. Cho chủ portfolio duyệt local; sau khi duyệt bản đầy đủ, cập nhật GitHub Pages và kiểm tra URL công khai.
6. **PDF:** sau khi nhận diện website được duyệt, thiết kế lại hai bản PDF Anh và Việt, tĩnh nhưng cùng nhận diện, đọc nhanh, đúng dấu, sao chép chữ được và có liên kết hoạt động.

## Dữ kiện nội dung đã xác nhận

- **SLTech:** công ty chủ yếu làm việc với đối tác và chủ đầu tư lớn. Thiên Phúc định hướng ý tưởng, UX/UI, hình ảnh và bố cục; AI agents hỗ trợ triển khai và kiểm thử. https://sltech.vn/
- **Elysian Wedding:** bắt đầu từ ý tưởng khách hàng, dùng AI tạo mẫu, Thiên Phúc lựa chọn, rà soát và điều chỉnh qua phản hồi khách hàng. https://elysian-wedding.ely-wedding.workers.dev/
- **GiaSuVLU:** đồ án nhóm; Thiên Phúc quyết định UX/UI và luồng giao diện, phát triển frontend và kết nối API; thành viên còn lại chủ yếu phụ trách database và API. Đăng nhập email trường qua Microsoft từng hoạt động; Zoom và thanh toán mới ở mức demo/test API, chưa hoàn chỉnh do điều kiện pháp lý và chi phí. Backend hiện không còn hoạt động và dự án dự định được làm lại. https://github.com/ThienPhuc132003/TotNghiep

## Công cụ và cách phối hợp

Ưu tiên tài nguyên miễn phí và thư viện đã có trong repo; không tự mua plugin hoặc credit. Có thể dùng Figma MCP để thử và duyệt layout; Figma AI chỉ là công cụ hỗ trợ, không thay cho đánh giá thiết kế. Khi có nhiều lựa chọn mang tính thẩm mỹ quan trọng, trình bày phương án cụ thể để chủ portfolio chọn. Dùng agent theo vai trò thiết kế, nội dung, motion và QA để rà soát chéo khi phù hợp; báo trung thực những kiểm tra chưa thực hiện.


## Cập nhật sau đánh giá độc lập

- Chủ portfolio đã duyệt website và hai PDF để chuẩn bị phát hành. Bản hiện tại tiếp tục sửa theo đánh giá: font tiếng Việt, điều hướng mobile, nhãn link case study, nhịp motion và nội dung dự án dựa trên thông tin đã xác nhận.
- Hai PDF bốn trang dùng nhận diện xanh của website; font được nhúng, có chữ trích xuất và liên kết. Source tạo PDF: `scripts/generate_portfolio_review_pdf.py`.
- Bản đóng gói dùng các đường dẫn tương đối cho GitHub Pages. Cần tiếp tục kiểm tra thực tế sau triển khai và ghi nhận các giới hạn kiểm thử.

- Kiểm tra lại ngày 05/11/2026 trên bản công khai: mô phỏng reduced motion trong Chromium cho thấy không có ScrollTrigger đang chạy, cả ba dự án vẫn hiển thị; không tràn ngang tại 320, 390, 768 và 1440px. Tab qua điều hướng đầu trang có focus; tắt JavaScript vẫn đọc được nội dung và thấy liên kết đến các case study. Các kiểm tra này không thay thế kiểm thử thực tế trên mọi thiết bị.
