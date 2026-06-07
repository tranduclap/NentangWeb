Câu A1
Bảng layout 3 kích thước
Kích thước	< 768px (xs)	768px – 991px (md)	≥ 992px (lg)
Số cột mỗi hàng	1	2	4
Box layout	Box 1 → Box 2 → Box 3 → Box 4 (xếp dọc, mỗi box full width)	Hàng 1: Box 1 | Box 2 — Hàng 2: Box 3 | Box 4	Một hàng: Box 1 | Box 2 | Box 3 | Box 4
Sơ đồ ASCII
< 768px (mỗi box col-12 = 100%):

┌──────────────────┐
│      Box 1       │
├──────────────────┤
│      Box 2       │
├──────────────────┤
│      Box 3       │
├──────────────────┤
│      Box 4       │
└──────────────────┘
768px – 991px (mỗi box col-md-6 = 50%):

┌─────────┬─────────┐
│  Box 1  │  Box 2  │
├─────────┼─────────┤
│  Box 3  │  Box 4  │
└─────────┴─────────┘
≥ 992px (mỗi box col-lg-3 = 25%):

┌──────┬──────┬──────┬──────┐
│Box 1 │Box 2 │Box 3 │Box 4 │
└──────┴──────┴──────┴──────┘
Câu hỏi thêm
col-md-6 nghĩa là gì?
Từ breakpoint md (≥ 768px) trở lên, phần tử chiếm 6/12 cột (50% chiều rộng hàng). Dưới 768px, class này chưa áp dụng — layout vẫn theo class nhỏ hơn (col-12).

Tại sao không cần viết col-sm-12?
Bootstrap dùng mobile-first: col-12 áp dụng từ màn hình nhỏ nhất trở lên cho đến khi breakpoint lớn hơn ghi đè. col-sm-12 cũng = full width → trùng với col-12, không cần khai báo thêm.

Câu A2
1. d-none d-md-block
Class	Ý nghĩa
d-none	display: none — ẩn mặc định (mobile)
d-md-block	Từ md (≥768px) → display: block — hiện
Ẩn: viewport < 768px
Hiện: viewport ≥ 768px
2. Năm spacing utilities
Class	Ý nghĩa
mt-3	margin-top: spacing scale 3 (1rem trong BS5)
px-4	padding-left + padding-right: scale 4
mb-auto	margin-bottom: auto — đẩy phần tử xuống trong flex/grid
py-2	padding-top + padding-bottom: scale 2
ms-lg-5	margin-inline-start (trái LTR): scale 5, chỉ từ lg trở lên
Scale: 0, 1, 2, 3, 4, 5 tương ứng 0, .25rem, .5rem, 1rem, 1.5rem, 3rem (có thể tùy theme).

3. .container vs .container-fluid vs .container-md
Class	Hành vi
.container	Max-width responsive + căn giữa; có padding ngang; không full width
.container-fluid	100% chiều rộng viewport mọi breakpoint
.container-md	Full width đến md, từ md trở lên hành xử như .container (max-width cố định)
PHẦN C — PHÂN TÍCH
Câu C1
1. Đổi $primary sang #E63946
Công cụ: Node.js, npm, Sass compiler (dart-sass), tùy chọn bundler (Vite/Webpack) hoặc CLI Bootstrap.
Tạo project custom:
npm install bootstrap sass
Tạo file SCSS riêng, ví dụ scss/custom.scss:
$primary: #E63946;
@import "bootstrap/scss/bootstrap";
Biên dịch SCSS → CSS (sass scss/custom.scss dist/css/bootstrap-custom.css).
HTML link file CSS đã build thay vì CDN Bootstrap mặc định.
Tùy chọn: dùng _variables.scss override trước khi @import Bootstrap, hoặc bootstrap.scss chỉ import các module cần để giảm dung lượng.
File cần sửa: file SCSS custom của bạn (không sửa trực tiếp trong node_modules).

2. Tại sao không override .btn-primary { background: red; }?
Specificity / !important: dễ phải !important, khó bảo trì.
Mất đồng bộ theme: $primary còn dùng cho bg-primary, text-primary, alert, link, form focus — override một class không đổi hết.
Cập nhật Bootstrap: upgrade version dễ vỡ override tay.
SASS variables sinh ra toàn bộ utility/component nhất quán từ một nguồn màu.
Câu C2
Ví dụ: Navbar responsive + Product card
Tiêu chí	CSS thuần (ước lượng)	Bootstrap
Số dòng CSS	Navbar ~80–150 dòng + card ~40–60 dòng ≈ 120–210 dòng	0–10 dòng CSS tùy chỉnh (chủ yếu class HTML)
Thời gian phát triển	2–4 giờ (menu mobile, breakpoint, hover)	30–60 phút nếu đã quen docs
Tùy biến	Cao — thiết kế độc quyền, không bị “nhìn Bootstrap”	Trung bình — cần override/SASS; nhanh prototype
Khi NÊN dùng Bootstrap	Admin/dashboard, MVP, team junior, deadline gấp, cần component sẵn (modal, dropdown)	
Khi KHÔNG NÊN	Brand design system riêng, cần bundle CSS cực nhỏ, UI highly custom / animation phức tạp	
Kết luận: Bootstrap đổi tốc độ lấy đồng nhất và giảm CSS tự viết; CSS thuần phù hợp khi kiểm soát từng pixel và performance/CSS size là ưu tiên số một.