Câu A1
Dự đoán
Đoạn	Dự đoán
1	In undefined, sau đó x = 5
2	ReferenceError — không truy cập y trước khi khai báo (TDZ)
3	TypeError — không gán lại const
4	[1, 2, 3, 4] — push hợp lệ, chỉ cấm gán lại biến arr
5	Trong block: 2 rồi Ngoài block: 1
Sau khi chạy node var_let_const.js
Kết quả khớp dự đoán. Đoạn 2 và 3 được bọc try/catch trong file kiểm chứng để script không dừng giữa chừng.

Giải thích kết quả
var hoisting: var x được đưa lên đầu scope; console.log(x) chạy khi x đã được khai báo nhưng chưa gán → undefined.
let TDZ: let y không hoist như var để dùng trước dòng khai báo → ReferenceError.
const: Cấm gán lại binding (z = 20), không cấm đột biến nội dung object/array (arr.push).
Block scope: let a trong {} là biến riêng, không ảnh hưởng a ngoài block.
Câu A2
Dự đoán & kết quả thực tế
Biểu thức	Dự đoán	Thực tế
typeof null	"object" (bug lịch sử)	"object"
typeof undefined	"undefined"	"undefined"
typeof NaN	"number"	"number"
"5" + 3	"53"	"53"
"5" - 3	2	2
"5" * "3"	15	15
true + true	2	2
[] + []	""	""
[] + {}	"[object Object]"	"[object Object]"
{} + []	"[object Object]" (trong console.log)	"[object Object]"
Lưu ý: Ở đầu dòng trong Console, {} + [] đôi khi bị parse thành block {} + +[] → 0. Trong file .js dùng console.log({} + []) thì {} là object literal.

Tại sao "5" + 3 ≠ "5" - 3?
Toán tử +: nếu một toán hạng là string → nối chuỗi ("5" + "3" → "53").
Toán tử -, *, /: ưu tiên ép kiểu số (ToNumber) → "5" - 3 → 5 - 3 = 2.
Câu A3 (5đ) — == vs ===
Biểu thức	Kết quả
5 == "5"	true (ép kiểu)
5 === "5"	false (khác kiểu)
null == undefined	true
null === undefined	false
NaN == NaN	false
0 == false	true
0 === false	false
"" == false	true
Nên dùng === (và !==) — so sánh không ép kiểu, tránh bug khó đoán. Chỉ dùng == khi bạn cố ý muốn coercion

Câu A4
Tất cả giá trị Falsy (8 giá trị)
false, 0, -0, 0n, "", null, undefined, NaN

Dự đoán in / không in
Code	In?	Lý do
if ("0") → A	Có	Chuỗi không rỗng → truthy
if ("") → B	Không	Falsy
if ([]) → C	Có	Mảng rỗng vẫn là object → truthy
if ({}) → D	Có	Object rỗng → truthy
if (null) → E	Không	Falsy
if (0) → F	Không	Falsy
if (-1) → G	Có	Số khác 0 → truthy
if (" ") → H	Có	Chuỗi có khoảng trắng → truthy
Kết quả in: A, C, D, G, H

Câu A5
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
PHẦN C — SUY LUẬN
Câu C1 (10đ) — Debug JavaScript
#	Lỗi	Giải thích	Cách sửa
1	if (giaSauGiam = 0)	Dùng = gán thay vì so sánh → luôn gán 0 và điều kiện falsy	if (giaSauGiam === 0)
2	Thiếu ; / style	Không crash nhưng nên nhất quán	Thêm ; cuối câu lệnh
3	tinhGiaGiamGia("100000", 20)	String "100000" có thể tính nhờ coercion nhưng dễ lỗi	Number(giaBan) hoặc truyền 100000
4	Không validate giaBan	Giá âm / không phải số	Kiểm tra typeof và >= 0
5	return "..." thiếu ;	Tùy chọn	Thêm ;
6	var i trong setTimeout	Closure cùng tham chiếu i → sau vòng lặp i = 5 → in 5 lần "Item 5"	Đổi for (let i = 0; ...)
7	setTimeout không await	In sau 1s, không phải bug logic chính	Dùng let hoặc IIFE (function(j){...})(i)
Code đã sửa
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (typeof giaBan !== "number" || isNaN(giaBan) || giaBan < 0) {
        return "Giá bán không hợp lệ";
    }
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }

    const giamGia = giaBan * phanTramGiam / 100;
    const giaSauGiam = giaBan - giamGia;

    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }

    return giaSauGiam;
}

const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log("Item " + i);
    }, 1000);
}
Lỗi ẩn var: Tất cả callback chia sẻ một biến i; khi timeout chạy, vòng lặp đã kết thúc và i === 5. let tạo binding mới mỗi vòng lặp → in 0, 1, 2, 3, 4.

Câu C2 (10đ) — Hóa đơn nhà hàng
Đã triển khai trong file restaurant_bill.js.

Quy tắc áp dụng:

Tổng > 1.000.000đ → giảm 15%; else tổng > 500.000đ → giảm 10%
Thứ Tư → cộng thêm 5% giảm (ví dụ: 10% + 5% = 15%)
VAT 8% trên số tiền sau giảm giá
Tip 5% (tùy chọn) trên số tiền sau giảm giá
Chạy: node restaurant_bill.js