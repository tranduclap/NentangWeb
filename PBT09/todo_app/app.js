// ==========================================================================
// ĐỊNH NGHĨA TRẠNG THÁI CORE STATE & LOCALSTORAGE PERSISTENCE
// ==========================================================================

// Tải danh sách todos từ kho lưu trữ LocalStorage, nếu chưa có thì khởi tạo mảng rỗng
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all"; // Trạng thái bộ lọc hiện tại: 'all' | 'active' | 'completed'

// Chọn các phần tử DOM cố định trên trang
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const todoFilters = document.getElementById("todoFilters");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

/**
 * Lưu trạng thái mảng hiện tại vào LocalStorage và vẽ lại màn hình UI
 */
function saveAndRender() {
    localStorage.setItem("todos", JSON.stringify(todos));
    render();
}

// ==========================================================================
// CƠ CHẾ RENDER MÀN HÌNH (Sử dụng 100% createElement an toàn)
// ==========================================================================
function render() {
    // Xóa sạch các phần tử cũ bên trong danh sách trước khi vẽ lại
    todoList.innerHTML = "";

    // Lọc mảng dữ liệu dựa trên trạng thái bộ lọc currentFilter
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true; // Bộ lọc 'all'
    });

    // Duyệt mảng dữ liệu đã lọc để xây dựng cây DOM bằng createElement
    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.dataset.id = todo.id; // Lưu ID vào dataset của thẻ li để phục vụ Event Delegation
        
        if (todo.completed) {
            li.classList.add("completed");
        }

        // Tạo nhãn text hiển thị nội dung công việc
        const span = document.createElement("span");
        span.classList.add("todo-text");
        span.textContent = todo.name;

        // Tạo nút xóa hình dấu chéo ❌
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "❌";

        // Đóng gói các thành phần nhỏ vào thẻ li cha
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    // Cập nhật số liệu đếm số công việc chưa hoàn thành (Active items left)
    const activeItemsCount = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeItemsCount} item${activeItemsCount !== 1 ? 's' : ''} left`;
}

// ==========================================================================
// CHỨC NĂNG THÊM MỚI (ADD TODO)
// ==========================================================================
function handleAddTodo() {
    const text = todoInput.value.trim();
    if (text === "") return; // Chặn hành vi để trống text

    // Khởi tạo một đối tượng dữ liệu Todo mới
    const newTodo = {
        id: Date.now().toString(), // Tạo ID duy nhất bằng dấu mốc thời gian timestamp
        name: text,
        completed: false
    };

    todos.push(newTodo);
    todoInput.value = ""; // Clear hộp thoại input
    todoInput.focus();
    saveAndRender();
}

// Lắng nghe sự kiện click nút Thêm hoặc bấm phím Enter trong ô nhập
addBtn.addEventListener("click", handleAddTodo);
todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAddTodo();
});

// ==========================================================================
// KỸ THUẬT EVENT DELEGATION (Ủy quyền sự kiện lên cây mẹ #todoList)
// ==========================================================================
todoList.addEventListener("click", (e) => {
    const target = e.target;
    const li = target.closest("li");
    if (!li) return;
    const todoId = li.dataset.id;

    // A. Xử lý click vào Text công việc -> Đổi trạng thái Toggle Completed
    if (target.classList.contains("todo-text")) {
        const todo = todos.find(t => t.id === todoId);
        if (todo) {
            todo.completed = !todo.completed;
            saveAndRender();
        }
    }

    // B. Xử lý click vào nút dấu chéo ❌ -> Tiến hành Xóa Todo (Delete)
    if (target.classList.contains("delete-btn")) {
        todos = todos.filter(t => t.id !== todoId);
        saveAndRender();
    }
});

// ==========================================================================
// TÍNH NĂNG CHỈNH SỬA (EDIT TODO VIA DOUBLE CLICK)
// ==========================================================================
todoList.addEventListener("dblclick", (e) => {
    const target = e.target;
    if (!target.classList.contains("todo-text")) return;

    const li = target.closest("li");
    const todoId = li.dataset.id;
    const todo = todos.find(t => t.id === todoId);

    // Tạo một thẻ ô nhập input tạm thời để thay thế vị trí của text hiển thị
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("edit-input");
    editInput.value = todo.name;

    // Ẩn tạm thời nhãn chữ và nút xóa
    li.innerHTML = "";
    li.appendChild(editInput);
    editInput.focus();

    // Hàm lưu lại nội dung mới sau khi sửa đổi xong
    function saveEdit() {
        const updatedText = editInput.value.trim();
        if (updatedText !== "") {
            todo.name = updatedText;
            saveAndRender();
        } else {
            // Nếu người dùng xóa sạch chữ, hiểu là hành động xóa hẳn Todo đó ra khỏi giỏ
            todos = todos.filter(t => t.id !== todoId);
            saveAndRender();
        }
    }

    // Lắng nghe hành vi nhấn Enter để Lưu hoặc Blur (khi click ra ngoài khung) để tự lưu
    editInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") saveEdit();
        if (event.key === "Escape") render(); // Bấm Esc để hủy bỏ chỉnh sửa không lưu
    });
    editInput.addEventListener("blur", saveEdit);
});

// ==========================================================================
// BỘ LỌC (FILTER) & XOÁ HẾT CÔNG VIỆC ĐÃ HOÀN THÀNH (CLEAR COMPLETED)
// ==========================================================================

// Xử lý chuyển đổi màu sắc và lọc dữ liệu của 3 nút bộ lọc
todoFilters.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;

    // Xóa class active trên các nút cũ và gán lên nút vừa chọn
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    currentFilter = e.target.dataset.filter;
    render();
});

// Xử lý nút Clear Completed -> Giữ lại các công việc chưa làm (completed === false)
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    saveAndRender();
});

// Khởi động chạy lần đầu tiên khi vừa tải/refresh trang web
render();