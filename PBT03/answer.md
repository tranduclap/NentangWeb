Câu A1 — 3 Cách nhúng CSS
1. Inline CSS (CSS nội dòng)
Ví dụ: <p style="color: red; font-size: 16px;">Đoạn văn màu đỏ</p>

Ưu điểm: Áp dụng nhanh, có độ ưu tiên (specificity) rất cao, tiện khi cần kiểm tra nhanh hoặc sửa một phần tử duy nhất.

Nhược điểm: Làm code HTML bị rối, không tái sử dụng được code CSS, khó quản lý và bảo trì khi dự án lớn lên.

Khi nào nên dùng: Khi cần áp dụng các thuộc tính động bằng JavaScript hoặc sửa nhanh một phần tử đặc biệt mà không muốn tạo class mới.

2. Internal CSS (CSS nội bộ)
Ví dụ: Đặt trong thẻ <style> ở phần <head> của file HTML.

HTML
<head>
    <style>
        p { color: blue; }
    </style>
</head>
Ưu điểm: Quản lý toàn bộ cấu trúc CSS của một trang tại một nơi duy nhất, không cần tạo thêm file bên ngoài.

Nhược điểm: Chỉ có tác dụng trong đúng file HTML đó, làm tăng dung lượng file HTML, không chia sẻ được CSS cho các trang khác.

Khi nào nên dùng: Khi làm các trang đơn biệt lập (Single-page, landing page quảng cáo) hoặc các trang có giao diện hoàn toàn độc lập.

3. External CSS (CSS bên ngoài)
Ví dụ: Nhúng file .css tách biệt thông qua thẻ <link>.

HTML
  <head>
      <link rel="stylesheet" href="style.css">
  </head>
Ưu điểm: Tái sử dụng code CSS cho hàng trăm trang HTML khác nhau, giúp code sạch sẽ, trình duyệt có thể cache lại file giúp tải trang nhanh hơn ở các lần sau.

Nhược điểm: Tốn thêm một request HTTP để tải file CSS về (tuy nhiên hiện nay đây không còn là vấn đề lớn).

Khi nào nên dùng: Đây là tiêu chuẩn bắt buộc cho mọi dự án website thực tế từ nhỏ đến lớn.

Câu hỏi thêm: Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào "thắng"? Giải thích tại sao.

Trả lời: Inline CSS sẽ thắng.

Giải thích: Theo quy tắc Độ ưu tiên (Specificity), Inline CSS có điểm số cao vượt trội so với Internal và External (được tính ở hàng nghìn). Giữa Internal và External, nếu có cùng điểm độ ưu tiên, cách nào nằm dưới (đọc sau) trong file HTML sẽ thắng theo quy tắc dòng chảy cascaded từ trên xuống.

Câu A2
1.h1
Chọn: <h1>ShopTLU</h1> (Text content: "ShopTLU")

2.price
Chọn: Cả 2 thẻ <p> có class price (Text content: "25.990.000đ" và "45.990.000đ")

3 #app header
Chọn: Toàn bộ khối thẻ <header class="top-bar dark">...</header> bên trong #app.

4 nav a:first-child
Chọn: Thẻ <a> đầu tiên trong nav (Text content: "Home")

5 .product.featured h2
Chọn: Thẻ <h2> nằm trong article có đồng thời cả 2 class product và featured (Text content: "MacBook Pro")

6 article > p
Chọn: Thẻ <p> là con trực tiếp của article. Tổng cộng chọn được 4 thẻ bao gồm 2 thẻ giá tiền và 2 thẻ mô tả (Text content: "25.990.000đ", "Mô tả sản phẩm...", "45.990.000đ", "Mô tả sản phẩm...")

7 a[href="/"]
Chọn: Thẻ <a> có thuộc tính href chính xác là "/" (Text content: "Home")

8.top-bar.dark h1
Chọn: Thẻ <h1> thuộc header có cả 2 class top-bar và dark (Text content: "ShopTLU")

    Bài B3 

1. Bảng điểm trọng số 10 CSS Quy Tắc (Từ thấp đến cao)

Hệ thống tính điểm độ ưu tiên tuân theo quy tắc phân cấp 4 nhóm giá trị: `(Inline, ID, Class/Attribute/Pseudo-class, Element/Pseudo-element)`.

| STT | CSS Selector | Trọng số (Score) | Màu sắc đại diện |
| :--- | :--- | :--- | :--- |
| 1 | `p` | **0, 0, 0, 1** | Gray |
| 2 | `body p` | **0, 0, 0, 2** | Brown |
| 3 | `.text` | **0, 0, 1, 0** | Orange |
| 4 | `p.text` | **0, 0, 1, 1** | Pink |
| 5 | `.text.highlight` | **0, 0, 2, 0** | Purple |
| 6 | `p.text.highlight` | **0, 0, 2, 1** | Yellow |
| 7 | `#demo` | **0, 1, 0, 0** | Red |
| 8 | `#demo.text` | **0, 1, 1, 0** | Blue |
| 9 | `#demo.text.highlight` | **0, 1, 2, 0** | Green |
| 10 | `color: cyan !important;` | **1, 0, 0, 0** (Vượt cấp) | Cyan |

---

## 2. Câu hỏi phân tích lý thuyết

### Câu hỏi 1: Phần tử cuối cùng hiển thị màu gì? Tại sao?
- **Kết quả:** Dòng chữ "Hello World" sẽ hiển thị **màu xanh lục bảo (Cyan)**.
- **Giải thích:** Trình duyệt áp dụng quy tắc có điểm trọng số Specificity cao nhất. Trong bảng trên, cờ hiệu `!important` có quyền năng tối cao phá vỡ luồng tính điểm thông thường. Nếu xét các quy tắc thuần Selector không chứa `!important`, quy tắc số 9 (`#demo.text.highlight`) sẽ thắng với điểm số `(0, 1, 2, 0)` nhờ sở hữu đồng thời 1 ID và 2 Classes, vượt trội hoàn toàn so với các Selector ngắn phía trên.

### Câu hỏi 2: Thay đổi thứ tự các quy tắc trong file CSS thì kết quả có đổi không? Giải thích.
- **Kết quả:** Kết quả hiển thị **KHÔNG ĐỔI**. Dòng chữ vẫn giữ nguyên màu Cyan (hoặc màu Green nếu bỏ `!important`).
- **Giải thích:** Bản chất của cơ chế thiết lập CSS (Cascading Style Sheets) là ưu tiên **Độ mạnh của Selector (Specificity)** trước rồi mới xét đến **Thứ tự xuất hiện (Source Order)**. 
  - Khi các Selector có độ mạnh khác nhau, trình duyệt chỉ quan tâm xem mã lệnh nào có điểm số cao hơn để thực thi, việc đặt nó ở đầu file hay cuối file không làm thay đổi điểm số nội tại của nó.
  - Thứ tự xuất hiện chỉ có tác dụng phân định thắng thua khi và chỉ khi hai quy tắc cấu trúc khác nhau nhưng có **cùng một mức điểm số giống hệt nhau** (ví dụ: `.text` và `.highlight` cùng là 0,0,1,0), lúc đó mã lệnh viết sau sẽ ghi đè lên mã lệnh viết trước.