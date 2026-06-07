PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)Câu A1 (5đ) — DOM Tree1. Sơ đồ cây DOM Tree (Dạng văn bản phân cấp)Khi trình duyệt đọc đoạn mã HTML của bạn, nó sẽ chuyển đổi các thẻ thành các nút (Node) lồng nhau theo cấu trúc hình cây như sau:PlaintextDocument
 └── div#app
      ├── header
      │    ├── h1
      │    │    └── text: "Todo App"
      │    └── nav
      │         ├── a.active
      │         │    └── text: "All"
      │         ├── a
      │         │    └── text: "Active"
      │         └── a
      │              └── text: "Completed"
      └── main
           ├── form#todoForm
           │    ├── input#todoInput
           │    └── button
           │         └── text: "Add"
           └── ul#todoList
                ├── li.todo-item
                │    └── text: "Learn HTML"
                └── li.todo-item.completed
                     └── text: "Learn CSS"
2. Các câu lệnh querySelector / querySelectorAll tương ứngChọn thẻ <h1>:JavaScriptdocument.querySelector("h1");
Chọn input trong form:JavaScriptdocument.querySelector("#todoForm input"); // Hoặc document.querySelector("#todoInput");
Chọn tất cả .todo-item:JavaScriptdocument.querySelectorAll(".todo-item");
Chọn link đang active:JavaScriptdocument.querySelector("nav a.active"); // Hoặc document.querySelector(".active");
Chọn <li> đầu tiên trong #todoList:JavaScriptdocument.querySelector("#todoList li"); // querySelector mặc định lấy phần tử đầu tiên thỏa mãn
Chọn tất cả <a> bên trong <nav> :JavaScriptdocument.querySelectorAll("nav a");
Câu A2 (5đ) — innerHTML vs textContent1. Phân biệt innerHTML và textContentTiêu chíinnerHTMLtextContentBản chấtTrả về hoặc thiết lập toàn bộ mã HTML (bao gồm cả các thẻ tag) bên trong phần tử.Trả về hoặc thiết lập chỉ nội dung văn bản thuần túy (plain text) bên trong phần tử, tự động loại bỏ các thẻ HTML.Cách xử lýTrình duyệt sẽ biên dịch (parse) chuỗi truyền vào thành các thẻ DOM thật.Trình duyệt xem chuỗi truyền vào là text thô và hiển thị nguyên văn lên màn hình.Khi nào dùng?Khi bạn thực sự muốn chèn một cấu trúc HTML mới (như thêm thẻ <strong>, <span>, <div>) vào trang web.Khi bạn chỉ muốn cập nhật chữ (ví dụ: đổi tên user, đổi số lượng, hiển thị thông báo text thuần).2. Câu hỏi bảo mật: Tại sao innerHTML gây lỗ hổng XSS?innerHTML gây lỗ hổng XSS (Cross-Site Scripting) vì nó tin tưởng tuyệt đối vào chuỗi dữ liệu truyền vào. Nếu chuỗi đó chứa mã độc (như thẻ <script> hoặc các thẻ đi kèm thuộc tính bắt sự kiện lỗi như onerror, onload), trình duyệt sẽ tự động thực thi đoạn mã JavaScript độc hại đó. Kẻ tấn công có thể lợi dụng điều này để lấy cắp Cookie, Token, hoặc điều hướng người dùng sang trang web lừa đảo.Khắc phục đoạn code minh họa:Để sửa lỗi này, chúng ta thay thế innerHTML bằng textContent (hoặc innerText). Lúc này, trình duyệt sẽ coi toàn bộ đoạn mã độc của hacker chỉ là một chuỗi chữ bình thường và in nguyên văn chuỗi <img src=x onerror="..."> ra màn hình chứ không kích hoạt nó.Đoạn code đã sửa an toàn:JavaScriptconst userInput = document.querySelector("#search").value;

// SỬA TẠI ĐÂY: Thay innerHTML bằng textContent để ngăn chặn XSS
document.querySelector("#result").textContent = userInput; 
Câu A3 (5đ) — Event Bubbling (Sự kiện nổi bọt)Cơ chế sự kiện mặc định trong JavaScript là Event Bubbling. Khi bạn tương tác (click) vào một phần tử nằm sâu bên trong, sự kiện đó sẽ tự động "nổi bọt" chạy ngược lên các phần tử cha bao bọc nó bên ngoài.1. Trường hợp mặc định (Khi CHƯA bỏ comment e.stopPropagation())Khi click vào button #btn, sự kiện sẽ nổ ra tại button, sau đó nổi bọt lên #inner và cuối cùng là #outer.Output in ra console:PlaintextBUTTON
INNER
OUTER
2. Trường hợp ĐÃ bỏ comment (Khi sử dụng e.stopPropagation())Hàm e.stopPropagation() có nhiệm vụ ngăn chặn hành vi nổi bọt của sự kiện. Ngay khi sự kiện chạy đến và xử lý xong ở #btn, nó sẽ bị chặn đứng lại hoàn toàn và không thể lan truyền lên các tầng cha bên trên được nữa.Output in ra console:PlaintextBUTTON

Dưới đây là lời giải chi tiết cho Câu C1 (Debug DOM Code) và Câu C2 (Performance), vạch rõ các lỗi sai kinh điển trong lập trình DOM và cách tối ưu hiệu năng ứng dụng.

PHẦN C — NÂNG CAO & TỐI ƯU (15 điểm)
Câu C1 (8đ) — Debug DOM Code
Đoạn code ban đầu chứa rất nhiều lỗi logic, cú pháp và sai biệt kiểu dữ liệu khiến ứng dụng bị sập hoặc chạy sai tính năng. Dưới đây là danh sách chi tiết 8 lỗi được tìm thấy và cách khắc phục:

1. Phân tích chỉ diện các lỗi sai (8 lỗi)
Lỗi 1 (Sai tên sự kiện trong addEventListener): .addEventListener("onclick", ...) là sai cú pháp. Đối với phương thức addEventListener, tên sự kiện phải bỏ tiền tố "on", sửa thành "click".

Lỗi 2 (Ghi đè sai kiểu dữ liệu cho biến hằng): Ở nút reset, countDisplay = count; cố tình gán lại giá trị số cho một đối tượng phần tử DOM (được khai báo bằng const). Điều này sẽ gây ra lỗi TypeError phá hỏng ứng dụng. Sửa thành countDisplay.textContent = count;.

Lỗi 3 (Gán giá trị sai quy chuẩn cho DOM): historyList.innerHTML = null; sử dụng giá trị null để xóa phần tử là không đúng chuẩn ngữ nghĩa. Để làm trống nội dung một cách chuẩn xác, cần gán bằng chuỗi rỗng "".

Lỗi 4 (Gọi phương thức thiếu cặp dấu ngoặc): Ở tính năng xóa lịch sử, câu lệnh item.remove; chỉ đang tham chiếu tới hàm chứ chưa thực thi hành động. Phải sửa thành item.remove();.

Lỗi 5 (Lỗi ép kiểu dữ liệu từ Storage): Khi tải trang (window.load), localStorage.getItem("count") luôn trả về một chuỗi văn bản (String). Nếu ta lấy chuỗi này rồi thực hiện phép toán count++ ở nút tăng, JavaScript sẽ nối chuỗi (ví dụ "0" + 1 = "01"). Phải dùng parseInt() để ép về kiểu số.

Lỗi 6 (Lỗi rỗng/Null khi localStorage chưa có dữ liệu): Trong lần đầu tiên người dùng truy cập trang, localStorage.getItem("count") sẽ trả về null. Gán trực tiếp null lên màn hình giao diện trông rất mất thẩm mỹ. Cần cơ chế dự phòng toán tử || 0.

Lỗi 7 (Không đồng bộ khôi phục cây giao diện): Khi tải trang, code có lấy chuỗi HTML lịch sử cũ ra nhưng chưa hề gán lại vào historyList, khiến danh sách hiển thị bị mất trắng mặc dù có lưu trong Storage. Cần bổ sung historyList.innerHTML = localStorage.getItem("history") || "";.

Lỗi 8 (Mất liên kết sự kiện click của các thẻ <li> cũ): Khi khôi phục danh sách bằng cách gán innerHTML, các sự kiện click xóa từng mục deleteHistory gắn trên thẻ <li> cũ sẽ bị bốc hơi hoàn toàn (vì chuỗi HTML thô từ Storage không thể lưu giữ sự kiện). Cách xử lý tốt nhất ở đây là sử dụng kỹ thuật Event Delegation (ủy quyền sự kiện) lên thẻ cha #history.

2. Đoạn code hoàn chỉnh sau khi đã được sửa sạch lỗi (Refactored)
JavaScript
// Khởi tạo và chọn các phần tử DOM
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

// Nút tăng giá trị (Increment)
document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count; // Dùng textContent an toàn hơn innerHTML
    
    // Tạo và lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    historyList.append(li);
});

// Nút giảm giá trị (Decrement) - SỬA LỖI 1: "onclick" chuyển thành "click"
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

// Nút đặt lại (Reset) - SỬA LỖI 2 & 3: Sửa lỗi gán countDisplay và dùng chuỗi rỗng
document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = ""; 
});

// SỬA LỖI 8: Thay vì gắn sự kiện lên từng li, gắn duy nhất 1 sự kiện lên thẻ cha #history (Event Delegation)
historyList.addEventListener("click", function(e) {
    if (e.target && e.target.nodeName === "LI") {
        deleteHistory(e.target);
    }
});

function deleteHistory(element) {
    element.remove(); // Cú pháp hiện đại, ngắn gọn hơn removeChild
}

// Xóa toàn bộ lịch sử - SỬA LỖI 4: Thêm dấu ngoặc tròn () vào sau hàm remove
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); 
    });
});

// Lưu dữ liệu vào localStorage khi đóng/rời trang
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Tải dữ liệu từ localStorage khi load trang
window.addEventListener("load", () => {
    // SỬA LỖI 5 & 6: Ép kiểu chuỗi về số bằng parseInt và đặt giá trị dự phòng là 0
    count = parseInt(localStorage.getItem("count"), 10) || 0;
    countDisplay.textContent = count;
    
    // SỬA LỖI 7: Đồng bộ khôi phục hiển thị danh sách lịch sử lên màn hình
    historyList.innerHTML = localStorage.getItem("history") || "";
});
Câu C2 (7đ) — Performance (Tối ưu hiệu năng)
1. Tại sao gắn sự kiện lên 1000 phần tử riêng lẻ là BAD PRACTICE?
Lãng phí bộ nhớ (Memory Consumption): Trình duyệt phải tạo ra 1,000 đối tượng lắng nghe sự kiện (Event Listener) độc lập trong bộ nhớ RAM. Khi số lượng phần tử tăng lên, ứng dụng sẽ trở nên nặng nề, tốn tài nguyên thiết bị và dễ dẫn đến tình trạng rò rỉ bộ nhớ (Memory Leak).

Khó quản lý dữ liệu động: Nếu sau đó bạn thêm mới phần tử thứ 1,001 vào trang web, phần tử mới này sẽ không có sự kiện, bạn lại phải viết code gắn thủ công cho nó, làm mã nguồn trở nên chắp vá và phức tạp.

Giải pháp từ Event Delegation (Ủy quyền sự kiện):
Thay vì gắn sự kiện lên 1,000 phần tử con, ta chỉ gắn duy nhất 1 sự kiện lên phần tử CHA bao bọc bên ngoài. Khi người dùng click vào bất kỳ phần tử con nào, nhờ cơ chế Event Bubbling (Nổi bọt sự kiện), tín hiệu click sẽ chạy ngược lên phần tử cha. Tại đây, ta chỉ cần dùng thuộc tính e.target để kiểm tra chính xác thẻ con nào vừa bị click để xử lý logic tương ứng.

2. Kỹ thuật Refactor tối ưu hóa dòng quét Layout sử dụng DocumentFragment
Đoạn code đã được tối ưu:

JavaScript
// Bước 1: Tạo ra một "khung xương" DocumentFragment ảo nằm hoàn toàn trong bộ nhớ RAM
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // Bước 2: Chỉ đính kèm phần tử mới vào khung xương ảo, CHƯA đụng chạm gì tới giao diện thật
    fragment.appendChild(div); 
}

// Bước 3: Đẩy toàn bộ 1,000 phần tử ra ngoài màn hình THẬT một lần duy nhất
document.body.appendChild(fragment); 
3. Tại sao cách này lại giúp trang web chạy nhanh hơn gấp nhiều lần?
Cơ chế hoạt động cũ (Tồi): Việc gọi document.body.appendChild(div) liên tục 1,000 lần bên trong vòng lặp sẽ ép trình duyệt phải tính toán lại kích thước hình học, tọa độ, và vẽ lại giao diện 1,000 lần liên tiếp trên màn hình hiển thị (Hiện tượng này gọi là Reflow và Repaint liên tục). Đây là tác vụ đắt đỏ và nặng nề nhất đối với một bộ máy render của trình duyệt.

Cơ chế hoạt động mới với DocumentFragment (Tối ưu): DocumentFragment hoạt động độc lập như một vùng nháp ảo trong bộ nhớ RAM, hoàn toàn tách biệt khỏi cây DOM hiển thị. Do đó, việc lặp 1,000 lần đính kèm phần tử vào mảnh fragment này diễn ra cực kỳ nhanh vì không kích hoạt bất kỳ một hành vi tính toán đồ họa nào. Khi kết thúc vòng lặp, việc đẩy toàn bộ cấu trúc hoàn thiện ra màn hình ở dòng lệnh cuối cùng chỉ ép trình duyệt làm việc đúng 1 lần duy nhất, giảm thiểu tối đa hiện tượng giật lag khung hình (UI Jank).