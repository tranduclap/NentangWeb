Câu A1: HTTP & Browser
1. 5 bước khi gõ URL và nhấn Enter:
DNS Lookup (Truy vấn DNS): Trình duyệt gửi yêu cầu đến máy chủ DNS để chuyển đổi tên miền shopee.vn thành địa chỉ IP của máy chủ.

TCP Handshake: Trình duyệt thiết lập kết nối TCP với máy chủ thông qua quy trình "bắt tay 3 bước" để đảm bảo đường truyền ổn định.

TLS/SSL Handshake: Vì là https, trình duyệt và máy chủ sẽ trao đổi khóa mã hóa để bảo mật dữ liệu.

HTTP Request: Trình duyệt gửi một HTTP Request (thường là phương thức GET) đến máy chủ để yêu cầu nội dung trang web.

HTTP Response & Rendering: Máy chủ trả về file HTML. Trình duyệt nhận dữ liệu, phân tích (parse) HTML/CSS/JS và tiến hành vẽ (render) giao diện lên màn hình.

2. Thông tin trong tab Network:
Tab Network hiển thị tất cả các tài nguyên mà trang web đã tải về (hình ảnh, scripts, CSS, dữ liệu API...).

Status Code: Trạng thái của request (Ví dụ: 200 OK là thành công, 404 là không tìm thấy).

Tổng thời gian load: Hiển thị ở dưới cùng (Finish, DOMContentLoaded, Load).

File CSS: Thường có cột "Type" là stylesheet.

Câu A2: Semantic HTML
Lý do SEO thấp: Trang web sử dụng toàn bộ thẻ <div> vô nghĩa. Các công cụ tìm kiếm không thể phân biệt được đâu là phần quan trọng, đâu là menu điều hướng hay thông tin bản quyền, dẫn đến việc xếp hạng thấp.

4 lỗi Semantic và cách sửa:

Lỗi dùng <div class="header">: Nên thay bằng thẻ <header>.

Lỗi dùng <div class="menu">: Nên thay bằng thẻ <nav>.

Lỗi dùng <div class="main">: Nên thay bằng thẻ <main>.

Lỗi dùng <div class="footer">: Nên thay bằng thẻ <footer>.

Câu A3: Block vs Inline 
Kết quả hiển thị:
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3
Giải thích:
<div> là phần tử Block: Nó luôn chiếm trọn một hàng, ép các phần tử sau nó xuống dòng mới. Do đó "Hộp 1", "Hộp 2" và "Hộp 3" nằm trên 3 dòng riêng biệt.

<span> và <strong> là phần tử Inline: Chúng chỉ chiếm không gian vừa đủ theo chiều ngang của nội dung và không tạo dòng mới. Vì vậy "Text A" đứng cạnh "Text B", và "Text C" đứng cạnh "Text D".


Câu A4: Table
1. Khác nhau giữa thead, tbody, tfoot:
<thead>: Chứa các dòng tiêu đề của bảng (thường là tên cột).

<tbody>: Chứa dữ liệu chính của bảng.

<tfoot>: Chứa dòng tổng kết hoặc chú thích ở cuối bảng.

2. Tại sao KHÔNG dùng table để tạo layout (3 lý do):
Sai ngữ nghĩa (Semantic): Table dùng để hiển thị dữ liệu bảng biểu, không phải để dàn trang. Điều này gây hại cho SEO và các thiết bị đọc màn hình cho người khiếm thị.

Khó phản hồi (Responsive): Cấu trúc bảng rất cứng nhắc, cực kỳ khó để sắp xếp lại các thành phần khi xem trên màn hình điện thoại di động nhỏ.

Tốc độ xử lý: Trình duyệt phải nhận được toàn bộ dữ liệu của bảng mới bắt đầu tính toán kích thước hiển thị, làm chậm quá trình hiển thị trang web ban đầu.