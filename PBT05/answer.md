PHẦN A
Câu A1
1. Thẻ <meta viewport> chuẩn và giải thích các thuộc tính
Cú pháp chính xác của thẻ là:
<meta name="viewport" content="width=device-width, initial-scale=1.0">

Giải thích các thuộc tính bên trong:

width=device-width: Thuộc tính này đặt chiều rộng của viewport (vùng hiển thị của trình duyệt) bằng đúng với chiều rộng màn hình của thiết bị thực tế tính theo pixel logic (CSS pixel). Điều này ngăn không cho trang web tự hiểu theo kích thước màn hình máy tính khi chạy trên điện thoại.

initial-scale=1.0: Thuộc tính này thiết lập mức độ thu phóng (zoom) ban đầu là 100% ngay khi trang web vừa được tải xong, giúp giao diện hiển thị đúng tỉ lệ chuẩn, không tự động phóng to hay thu nhỏ.

2. Cách iPhone hiển thị khi thiếu thẻ viewport
Khi trang web hoàn toàn thiếu thẻ viewport, các trình duyệt di động như Safari trên iPhone sẽ mặc định hiểu rằng trang web này chỉ được thiết kế dành cho máy tính (desktop).

Do đó, iPhone sẽ giả lập một vùng hiển thị ảo có chiều rộng khoảng 980px để chứa toàn bộ trang web. Sau đó, nó sẽ tự động thu nhỏ (zoom out) toàn bộ trang web lại cho vừa vặn với màn hình điện thoại nhỏ bé. Kết quả là toàn bộ chữ nghĩa, hình ảnh, các nút bấm sẽ trở nên tí hon, người dùng buộc phải dùng hai ngón tay phóng to thủ công để đọc hoặc bấm link.

3. Phân biệt Mobile-First và Desktop-First
Sự khác nhau cơ bản giữa hai phương pháp:

Mobile-First: Là cách tiếp cận viết CSS cho màn hình nhỏ (điện thoại) trước làm mặc định. Sau đó, người lập trình sẽ sử dụng các câu lệnh Media Queries dạng "min-width" (chiều rộng tối thiểu) để bổ sung hoặc thay đổi các thuộc tính CSS khi màn hình lớn dần lên (máy tính bảng, máy tính để bàn).

Desktop-First: Là cách tiếp cận ngược lại, viết CSS cho màn hình lớn (máy tính để bàn) trước làm mặc định. Sau đó, sử dụng các câu lệnh Media Queries dạng "max-width" (chiều rộng tối đa) để bóp nhỏ, sắp xếp lại hoặc ẩn bớt các thành phần khi màn hình bị thu hẹp dần về kích thước điện thoại.

Câu A2
Breakpoint xs (Extra small)
-Kích thước pixel: Nhỏ hơn 576px
-Thiết bị đại diện: Các loại điện thoại di động thông minh khi xoay dọc.
-Hiển thị lưới sản phẩm: Nên hiển thị thành 1 cột duy nhất (hoặc tối đa là 2 cột nếu hình ảnh sản phẩm nhỏ và ít thông tin).