Câu C1 — Debug Form

-Lỗi 1: Dòng 2 — Input "Tên" không có <label for="..."> và thiếu name, vi phạm accessibility và khiến dữ liệu không gửi đi được.

Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="fullname" required>

-Lỗi 2: Dòng 4 — Input "Email" thiếu <label> và thuộc tính required.

Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" required placeholder="Email của bạn">

-Lỗi 3: Dòng 6 — Input "Mật khẩu" thiếu thuộc tính minlength, dễ dẫn đến mật khẩu yếu.

Sửa: <input type="password" id="pw" name="password" minlength="8" required placeholder="Mật khẩu">

-Lỗi 4: Dòng 7 — Hai ô mật khẩu có ID/Name giống nhau hoặc không được định danh rõ ràng để xử lý logic so sánh sau này.

Sửa: <input type="password" id="re-pw" name="re-password" required placeholder="Nhập lại mật khẩu">

-Lỗi 5: Dòng 9 — Input "Phone" dùng type="text" thay vì type="tel" và thiếu thuộc tính pattern để kiểm soát định dạng số.

Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="[0-9]{10}">

-Lỗi 6: Dòng 11 — Thẻ <select> không có name và các <option> thiếu thuộc tính value, dẫn đến server không nhận được giá trị cụ thể.

Sửa: <select name="city" id="city"><option value="hn">Hà Nội</option>...</select>

-Lỗi 7: Dòng 16 — Thẻ <label> bao quanh văn bản nhưng không chứa hoặc không liên kết với thẻ <input type="checkbox">.

Sửa: <input type="checkbox" id="terms" name="terms" required> <label for="terms">Tôi đồng ý điều khoản</label>

-Lỗi 8: Dòng 20 — Sử dụng <input type="submit"> là kiểu cũ, thiếu tính linh hoạt và không tốt cho accessibility bằng thẻ <button>.

Sửa: <button type="submit">Gửi</button>

Câu C2 — Thiết kế chiến lược Validation
1. Regex cho ngân hàng số
CMND/CCCD (12 chữ số): pattern="[0-9]{12}"

Số tài khoản (10-15 chữ số): pattern="[0-9]{10,15}"

2. HTML5 Validation có đủ an toàn cho ngân hàng không?
Trả lời: KHÔNG.

Tại sao: HTML5 validation chỉ là lớp bảo vệ đầu tiên mang tính hỗ trợ trải nghiệm người dùng (UX). Người dùng có thể dễ dàng vượt qua bằng cách:

Mở Developer Tools (F12) và xóa bỏ thuộc tính required hoặc pattern.

Sử dụng các công cụ như Postman để gửi dữ liệu trực tiếp lên server mà không thông qua trình duyệt.

Vô hiệu hóa JavaScript hoặc dùng các trình duyệt cũ không hỗ trợ HTML5.

3. 3 loại validation HTML5 KHÔNG THỂ làm được (Cần JavaScript)
So sánh dữ liệu giữa các trường: Kiểm tra "Mật khẩu" và "Nhập lại mật khẩu" có khớp nhau không.

Kiểm tra tính duy nhất (Real-time availability): Kiểm tra xem Email hoặc Username đã tồn tại trong cơ sở dữ liệu chưa ngay khi người dùng đang gõ.

Logic phụ thuộc (Conditional Validation): Ví dụ: Nếu chọn phương thức "Chuyển khoản" thì mới bắt buộc nhập "Số tài khoản ngân hàng".

4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend
Tấn công SQL Injection / XSS: Nếu không validate và lọc dữ liệu ở Backend, kẻ tấn công có thể gửi các đoạn mã độc hại vào form để phá hủy cơ sở dữ liệu hoặc đánh cắp thông tin người dùng khác.

Sai lệch logic nghiệp vụ (Business Logic Bypass): Kẻ xấu có thể sửa đổi giá trị tiền (ví dụ: chuyển số tiền âm) hoặc thay đổi mã giảm giá để nhận ưu đãi bất hợp lệ, gây thiệt hại trực tiếp về tài chính cho ngân hàng.