// DỮ LIỆU ĐỊNH NGHĨA SẴN
const imagesData = [
    { name: "Thiên nhiên số 1", src: "https://picsum.photos/800/500?random=101" },
    { name: "Thiên nhiên số 2", src: "https://picsum.photos/800/500?random=102" },
    { name: "Thiên nhiên số 3", src: "https://picsum.photos/800/500?random=103" },
    { name: "Thiên nhiên số 4", src: "https://picsum.photos/800/500?random=104" }
];

const commandsData = [
    { id: "next-img", title: "Chuyển sang ảnh kế tiếp", hint: "→" },
    { id: "prev-img", title: "Quay lại ảnh phía trước", hint: "←" },
    { id: "play-slideshow", title: "Bật tự động chạy Slideshow", hint: "Space" },
    { id: "stop-slideshow", title: "Tạm dừng Slideshow", hint: "Space" },
    { id: "view-img-1", title: "Xem hình ảnh số 1", hint: "1" },
    { id: "view-img-2", title: "Xem hình ảnh số 2", hint: "2" },
    { id: "view-img-3", title: "Xem hình ảnh số 3", hint: "3" },
    { id: "view-img-4", title: "Xem hình ảnh số 4", hint: "4" }
];

// STATE MANAGEMENT (Trạng thái ứng dụng)
let activeIndex = 0;
let slideshowIntervalId = null;
let selectedCommandIndex = 0;
let filteredCommands = [...commandsData];

// Các phần tử DOM cần tương tác
const activeImg = document.getElementById("activeImg");
const thumbButtons = document.querySelectorAll(".thumb-btn");
const mainViewer = document.getElementById("mainViewer");
const slideshowIndicator = document.getElementById("slideshowIndicator");

const paletteOverlay = document.getElementById("paletteOverlay");
const paletteInput = document.getElementById("paletteInput");
const commandList = document.getElementById("commandList");

// ==========================================================================
// 1. CHỨC NĂNG GALLERY ĐIỀU HƯỚNG BÀN PHÍM
// ==========================================================================

/**
 * Hàm cập nhật hình ảnh hiển thị dựa trên Index truyền vào
 */
function updateGalleryView(index) {
    // Đảm bảo index xoay vòng trong phạm vi mảng
    if (index >= imagesData.length) index = 0;
    if (index < 0) index = imagesData.length - 1;

    activeIndex = index;
    const currentData = imagesData[activeIndex];

    // Cập nhật thuộc tính của ảnh lớn chính
    activeImg.src = currentData.src;
    activeImg.alt = currentData.name;

    // Cập nhật trạng thái Active trên cụm nút tab Thumbnail
    thumbButtons.forEach((btn, idx) => {
        if (idx === activeIndex) {
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");
        } else {
            btn.classList.remove("active");
            btn.setAttribute("aria-selected", "false");
        }
    });
}

/**
 * Hàm điều khiển bật tắt chế độ tự động chạy Slideshow
 */
function toggleSlideshow() {
    if (slideshowIntervalId) {
        // Nếu đang chạy -> tiến hành Dừng
        clearInterval(slideshowIntervalId);
        slideshowIntervalId = null;
        slideshowIndicator.textContent = "⏸️ Slideshow đang dừng";
    } else {
        // Nếu đang dừng -> tiến hành Bật tự động chuyển ảnh sau mỗi 2.5 giây
        slideshowIndicator.textContent = "▶️ Đang chạy tự động...";
        slideshowIntervalId = setInterval(() => {
            updateGalleryView(activeIndex + 1);
        }, 2500);
    }
}

// Bắt sự kiện bàn phím trên toàn cục trang web phục vụ Gallery
window.addEventListener("keydown", (e) => {
    // Nếu ô tìm kiếm Command Palette đang mở, bỏ qua các phím tắt của Gallery
    if (paletteOverlay.classList.contains("open")) return;

    const key = e.key;

    if (key === "ArrowRight") {
        e.preventDefault();
        updateGalleryView(activeIndex + 1);
    } else if (key === "ArrowLeft") {
        e.preventDefault();
        updateGalleryView(activeIndex - 1);
    } else if (key === " ") {
        // Phím cách (Space)
        e.preventDefault(); // Chặn hành vi cuộn trang mặc định của phím Space
        toggleSlideshow();
    } else if (key >= "1" && key <= "4") {
        // Ép ký tự số về index dạng mảng (bắt đầu từ số 0)
        const targetIdx = parseInt(key, 10) - 1;
        updateGalleryView(targetIdx);
    }
});

// Cho phép người dùng click trực tiếp chuột vào Thumbnail để đổi ảnh
thumbButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        updateGalleryView(idx);
    });
});

// ==========================================================================
// 2. CHỨC NĂNG COMMAND PALETTE OVERLAY (CTRL + K)
// ==========================================================================

function openCommandPalette() {
    paletteOverlay.classList.add("open");
    paletteOverlay.setAttribute("aria-hidden", "false");
    paletteInput.value = "";
    selectedCommandIndex = 0;
    filterCommands(""); // Hiển thị toàn bộ lệnh lúc ban đầu
    paletteInput.focus(); // DI CHUYỂN TIÊU ĐIỂM FOCUS VÀO Ô NHẬP LỆNH
}

function closeCommandPalette() {
    paletteOverlay.classList.remove("open");
    paletteOverlay.setAttribute("aria-hidden", "true");
    mainViewer.focus(); // Đẩy tiêu điểm focus trả lại màn hình chính sau khi đóng
}

/**
 * Tạo danh sách lệnh HTML dựa trên từ khóa tìm kiếm
 */
function filterCommands(keyword) {
    const lowerKey = keyword.toLowerCase().trim();
    filteredCommands = commandsData.filter(cmd => cmd.title.toLowerCase().includes(lowerKey));
    
    // Đảm bảo chỉ mục lựa chọn không vượt quá số lượng mảng đã lọc mới
    if (selectedCommandIndex >= filteredCommands.length) {
        selectedCommandIndex = 0;
    }

    renderCommandList();
}

function renderCommandList() {
    commandList.innerHTML = "";

    if (filteredCommands.length === 0) {
        const noResult = document.createElement("li");
        noResult.style.padding = "12px";
        noResult.style.color = "#7c7c8a";
        noResult.textContent = "Không tìm thấy lệnh nào phù hợp.";
        commandList.appendChild(noResult);
        return;
    }

    filteredCommands.forEach((cmd, idx) => {
        const li = document.createElement("li");
        li.classList.add("command-item");
        li.setAttribute("role", "option");
        li.id = `cmd-opt-${idx}`;

        if (idx === selectedCommandIndex) {
            li.classList.add("selected");
            li.setAttribute("aria-selected", "true");
            // Đồng bộ thanh cuộn scroll tự động chạy theo phím bấm mũi tên lên xuống
            li.scrollIntoView({ block: "nearest" });
        } else {
            li.setAttribute("aria-selected", "false");
        }

        const titleSpan = document.createElement("span");
        titleSpan.textContent = cmd.title;

        const hintKbd = document.createElement("kbd");
        hintKbd.classList.add("shortcut-hint");
        hintKbd.textContent = cmd.hint;

        li.append(titleSpan, hintKbd);
        
        // Sự kiện click chuột trực tiếp chọn lệnh trong bảng
        li.addEventListener("click", () => {
            executeCommandAction(cmd.id);
        });

        commandList.appendChild(li);
    });
}

/**
 * Trình biên dịch thực thi hành động tương ứng sau khi nhấn Enter chọn lệnh
 */
function executeCommandAction(commandId) {
    closeCommandPalette();
    
    switch (commandId) {
        case "next-img": updateGalleryView(activeIndex + 1); break;
        case "prev-img": updateGalleryView(activeIndex - 1); break;
        case "play-slideshow": if (!slideshowIntervalId) toggleSlideshow(); break;
        case "stop-slideshow": if (slideshowIntervalId) toggleSlideshow(); break;
        case "view-img-1": updateGalleryView(0); break;
        case "view-img-2": updateGalleryView(1); break;
        case "view-img-3": updateGalleryView(2); break;
        case "view-img-4": updateGalleryView(3); break;
    }
}

// Bắt sự kiện bàn phím nâng cao điều khiển việc bật đóng palette và di chuyển mũi tên
window.addEventListener("keydown", (e) => {
    // Tổ hợp phím Ctrl + K để mở Command Palette nhanh
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openCommandPalette();
        return;
    }

    // Nếu bảng lệnh đang mở, chặn các phím tắt mặc định và xử lý logic riêng biệt
    if (paletteOverlay.classList.contains("open")) {
        const key = e.key;

        if (key === "Escape") {
            e.preventDefault();
            closeCommandPalette();
        } else if (key === "ArrowDown") {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
            renderCommandList();
        } else if (key === "ArrowUp") {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
            renderCommandList();
        } else if (key === "Enter") {
            e.preventDefault();
            if (filteredCommands[selectedCommandIndex]) {
                executeCommandAction(filteredCommands[selectedCommandIndex].id);
            }
        }
    }
});

// Sự kiện gõ từ khóa vào ô input lọc lệnh realtime
paletteInput.addEventListener("input", (e) => {
    filterCommands(e.target.value);
});