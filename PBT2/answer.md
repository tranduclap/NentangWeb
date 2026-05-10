                                 Câu A1 — Input Types (10 loại)
type="email" → Ô nhập văn bản, tự động kiểm tra định dạng có ký tự @ → Dùng cho form đăng ký tài khoản khách hàng.

type="password" → Ô nhập văn bản nhưng ký tự bị ẩn (thành dấu chấm/sao) → Dùng để nhập mật khẩu thanh toán hoặc đăng nhập.

type="number" → Ô nhập kèm nút tăng/giảm, chỉ cho phép nhập số → Dùng để chọn số lượng sản phẩm trong giỏ hàng.

type="date" → Hiển thị bảng chọn lịch (datepicker) → Dùng để chọn ngày giao hàng mong muốn.

type="tel" → Ô nhập văn bản, tối ưu bàn phím số trên di động → Dùng nhập số điện thoại người mua.

type="checkbox" → Ô vuông nhỏ để tích chọn hoặc bỏ chọn → Dùng để đồng ý với điều khoản dịch vụ.

type="radio" → Nút tròn chọn một trong nhiều lựa chọn → Dùng để chọn phương thức thanh toán (COD, Momo, Thẻ tín dụng).

type="file" → Nút bấm mở cửa sổ chọn tệp từ máy tính → Dùng khi khách hàng tải ảnh hóa đơn chuyển khoản.

type="color" → Hộp thoại chọn màu sắc từ bảng màu → Dùng khi tùy chỉnh màu sắc cho các sản phẩm cá nhân hóa.

type="range" → Thanh trượt để chọn giá trị trong khoảng → Dùng cho bộ lọc khoảng giá sản phẩm (Price Range).

                              Câu A2 — Validation Attributes
Dự đoán kết quả:

-Trường hợp 1: Lỗi "Please fill out this field". Vì: Thuộc tính required không cho phép để trống.
-Trường hợp 2: Lỗi định dạng email (thiếu @). Vì: Browser nhận diện giá trị "abc" không khớp với cấu trúc email tiêu chuẩn.
-Trường hợp 3: Lỗi "Value must be less than or equal to 10". Vì: Giá trị 15 vượt quá giới hạn max="10".-
-Trường hợp 4: Lỗi định dạng không khớp pattern. Vì: [0-9]{10} yêu cầu đúng 10 chữ số, trong khi "abc123" chứa chữ cái.
Trường hợp 5: Lỗi "Please lengthen this text to 8 characters or more". Vì: Chuỗi "123" chỉ có 3 ký tự, vi phạm minlength="8".


                                      Câu A3 — Accessibility (Truy cập)
Tầm quan trọng của <label for="email">: Khi screen reader tập trung vào ô input, nó sẽ đọc nội dung của label liên kết với ID đó. Nếu không có, người khiếm thị sẽ không biết ô đó yêu cầu nhập thông tin gì. Ngoài ra, nhấn vào label cũng giúp trỏ chuột tự nhảy vào ô input.

Sử dụng <fieldset> + <legend>: Dùng để nhóm các input có liên quan chặt chẽ với nhau.

Ví dụ: Nhóm các input về "Địa chỉ giao hàng" (Số nhà, Phường, Quận). <legend> sẽ là tiêu đề "Địa chỉ giao hàng".

aria-label: Dùng khi một phần tử không có văn bản hiển thị trên màn hình nhưng cần mô tả cho screen reader (ví dụ: nút đóng "X" chỉ có icon). KHÔNG nên dùng khi đã có <label> vì nó gây dư thừa thông tin và <label> đã là tiêu chuẩn tốt nhất cho khả năng truy cập của form.

                                     Câu A4 — Media
loading="lazy": Giúp trì hoãn việc tải ảnh cho đến khi người dùng cuộn trang gần tới vị trí ảnh đó. Nó giúp cải thiện tốc độ tải trang (LCP) và tiết kiệm băng thông. KHÔNG nên dùng cho ảnh đầu trang (Hero image) vì sẽ làm chậm hiển thị nội dung chính.

Nhiều <source> trong <video>: Để đảm bảo tính tương thích (fallback). Nếu trình duyệt không hỗ trợ định dạng này, nó sẽ thử định dạng tiếp theo.

-3 format phổ biến: MP4, WebM, Ogg.
Thuộc tính alt: Cung cấp văn bản thay thế nếu ảnh lỗi và giúp SEO/Screen reader.
iPhone 16: alt="Điện thoại iPhone 16 màu xanh Titan nhìn từ mặt trước"
Trang trí: alt="" (để trống để screen reader bỏ qua).
Biểu đồ Q1/2026: alt="Biểu đồ cột cho thấy doanh thu Q1 năm 2026 tăng 15% so với cùng kỳ năm ngoái"
                           Câu A5 — So sánh <figure> vs <img>
Cách 1 (<img>): Được dùng khi hình ảnh là một phần không thể tách rời của dòng nội dung (inline content). Nếu xóa bức ảnh này đi, ý nghĩa của đoạn văn hoặc phần nội dung đó có thể bị thay đổi hoặc trở nên khó hiểu.

Cách 2 (<figure>): Được dùng cho nội dung mang tính chất minh họa, tham chiếu. Thẻ này tạo ra một khối độc lập (self-contained). Đặc biệt, khi đi kèm với <figcaption>, nó cung cấp một chú thích tường minh giúp người dùng và công cụ tìm kiếm hiểu rõ hơn về nội dung hình ảnh.                           