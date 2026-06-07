// 1. KHAI BÁO MẢNG DỮ LIỆU GỐC (Ít nhất 12 sản phẩm đủ 4 categories)
const products = [
    { id: 1, name: "iPhone 16 Pro", price: 25990000, category: "phone", image: "https://picsum.photos/300/300?random=1", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 29990000, category: "phone", image: "https://picsum.photos/300/300?random=2", rating: 4.7, inStock: true },
    { id: 3, name: "Google Pixel 9 Pro", price: 22490000, category: "phone", image: "https://picsum.photos/300/300?random=3", rating: 4.6, inStock: true },
    { id: 4, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://picsum.photos/300/300?random=4", rating: 4.9, inStock: true },
    { id: 5, name: "Dell XPS 13 Plus", price: 34500000, category: "laptop", image: "https://picsum.photos/300/300?random=5", rating: 4.4, inStock: false },
    { id: 6, name: "ASUS ROG Zephyrus", price: 42990000, category: "laptop", image: "https://picsum.photos/300/300?random=6", rating: 4.8, inStock: true },
    { id: 7, name: "iPad Pro M2", price: 20990000, category: "tablet", image: "https://picsum.photos/300/300?random=7", rating: 4.7, inStock: true },
    { id: 8, name: "Samsung Galaxy Tab S9", price: 18490000, category: "tablet", image: "https://picsum.photos/300/300?random=8", rating: 4.5, inStock: true },
    { id: 9, name: "Lenovo Tab P12", price: 8990000, category: "tablet", image: "https://picsum.photos/300/300?random=9", rating: 4.2, inStock: true },
    { id: 10, name: "AirPods Pro Gen 2", price: 5990000, category: "accessory", image: "https://picsum.photos/300/300?random=10", rating: 4.6, inStock: true },
    { id: 11, name: "Sony WH-1000XM5", price: 6850000, category: "accessory", image: "https://picsum.photos/300/300?random=11", rating: 4.7, inStock: true },
    { id: 12, name: "Logitech MX Master 3S", price: 2490000, category: "accessory", image: "https://picsum.photos/300/300?random=12", rating: 4.5, inStock: true }
];

// Biến quản lý trạng thái bộ lọc (State Management)
let currentFilterCategory = "all";
let currentSearchKeyword = "";
let currentSortRule = "default";
let cartCount = 0;

// Các biến đại diện cho các DOM element ảo sau khi khởi tạo
let productGridContainer;
let cartBadge;

// ==========================================================================
// 2. KHỞI TẠO DỰNG KHUNG GIAO DIỆN CHÍNH (100% DOM CREATION)
// ==========================================================================
function initAppLayout() {
    const app = document.getElementById("app");
    const container = document.createElement("div");
    container.classList.add("container");

    // a. Xây dựng cấu trúc Header
    const header = document.createElement("header");
    header.classList.add("catalog-header");
    
    const title = document.createElement("h1");
    title.textContent = "Tech Catalog";
    
    const headerRight = document.createElement("div");
    headerRight.classList.add("header-right");

    // Nút Bật/Tắt Dark Mode
    const modeBtn = document.createElement("button");
    modeBtn.classList.add("btn");
    modeBtn.textContent = "🌓 Chế độ";
    modeBtn.addEventListener("click", () => document.body.classList.toggle("dark-mode"));

    // Icon Giỏ hàng kèm Badge số lượng
    const cartWrapper = document.createElement("div");
    cartWrapper.classList.add("cart-icon-wrapper");
    cartWrapper.textContent = "🛒";
    cartBadge = document.createElement("span");
    cartBadge.classList.add("cart-badge");
    cartBadge.textContent = "0";
    cartWrapper.appendChild(cartBadge);

    headerRight.append(modeBtn, cartWrapper);
    header.append(title, headerRight);

    // b. Xây dựng bảng điều khiển điều hướng (Controls Panel)
    const controlsPanel = document.createElement("div");
    controlsPanel.classList.add("controls-panel");

    // Thanh Tìm kiếm Realtime
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Tìm kiếm sản phẩm nhanh...";
    searchInput.classList.add("search-input");
    searchInput.addEventListener("input", (e) => searchProducts(e.target.value));

    // Cụm nút bấm lọc Danh mục (Category buttons)
    const categories = ["all", "phone", "laptop", "tablet", "accessory"];
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("category-buttons");
    
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.classList.add("btn");
        if (cat === "all") btn.classList.add("active");
        btn.textContent = cat.toUpperCase();
        btn.dataset.category = cat;
        btn.addEventListener("click", (e) => filterByCategory(e.target));
        btnGroup.appendChild(btn);
    });

    // Ô lựa chọn Sắp xếp (Sort Selector)
    const sortSelect = document.createElement("select");
    sortSelect.classList.add("sort-select");
    const sortOptions = [
        { value: "default", text: "Sắp xếp theo" },
        { value: "price-asc", text: "Giá tăng dần 📈" },
        { value: "price-desc", text: "Giá giảm dần 📉" },
        { value: "name-az", text: "Tên từ A-Z" },
        { value: "rating-high", text: "Đánh giá cao nhất ⭐" }
    ];
    sortOptions.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        sortSelect.appendChild(option);
    });
    sortSelect.addEventListener("change", (e) => sortProducts(e.target.value));

    controlsPanel.append(searchInput, btnGroup, sortSelect);

    // c. Khối lưới chứa sản phẩm
    productGridContainer = document.createElement("main");
    productGridContainer.classList.add("product-grid");

    // Lắp ghép hoàn chỉnh vào khối #app
    container.append(header, controlsPanel, productGridContainer);
    app.appendChild(container);
}

// ==========================================================================
// 3. CÁC HÀM XỬ LÝ LOGIC DỮ LIỆU VÀ VẼ LẠI SẢN PHẨM (CORE FUNCTIONS)
// ==========================================================================

/**
 * Hàm 1: Đọc mảng dữ liệu đã qua xử lý và kết xuất ra thẻ giao diện HTML Cards
 */
function renderProducts(dataArray) {
    productGridContainer.innerHTML = ""; // Làm sạch lưới cũ

    if (dataArray.length === 0) {
        const notify = document.createElement("p");
        notify.textContent = "Không tìm thấy sản phẩm nào phù hợp với bộ lọc.";
        notify.style.gridColumn = "1/-1";
        notify.style.textAlign = "center";
        productGridContainer.appendChild(notify);
        return;
    }

    dataArray.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        
        // Bắt sự kiện Click vào Card để hiển thị hộp thoại Modal chi tiết
        card.addEventListener("click", (e) => {
            // Chặn không mở modal nếu người dùng click trúng nút "Thêm vào giỏ"
            if (e.target.tagName !== "BUTTON") {
                openProductModal(p);
            }
        });

        const img = document.createElement("img");
        img.src = p.image;
        img.alt = p.name;
        img.classList.add("product-img");

        const body = document.createElement("div");
        body.classList.add("card-body");

        const title = document.createElement("h3");
        title.classList.add("card-title");
        title.textContent = p.name;

        const meta = document.createElement("p");
        meta.classList.add("card-meta");
        meta.textContent = `Danh mục: ${p.category} | ⭐ ${p.rating}`;

        const price = document.createElement("p");
        price.classList.add("card-price");
        price.textContent = p.price.toLocaleString("vi-VN") + "đ";

        const btnCart = document.createElement("button");
        btnCart.classList.add("btn-add-cart");
        btnCart.textContent = p.inStock ? "Thêm vào giỏ" : "Hết hàng";
        btnCart.disabled = !p.inStock;
        if (!p.inStock) btnCart.style.backgroundColor = "#bdc3c7";

        // Tăng số lượng Badge giỏ hàng khi click mua
        btnCart.addEventListener("click", () => {
            cartCount++;
            cartBadge.textContent = cartCount;
        });

        body.append(title, meta, price, btnCart);
        card.append(img, body);
        productGridContainer.appendChild(card);
    });
}

/**
 * Hàm tổng hợp điều phối luồng dữ liệu (Pipeline Filter & Sort)
 */
function executeCatalogPipeline() {
    // Bước A: Lọc theo Danh mục
    let result = products.filter(p => currentFilterCategory === "all" || p.category === currentFilterCategory);

    // Bước B: Lọc theo Từ khóa tìm kiếm Realtime
    if (currentSearchKeyword !== "") {
        const keyword = currentSearchKeyword.toLowerCase();
        result = result.filter(p => p.name.toLowerCase().includes(keyword));
    }

    // Bước C: Xử lý Sắp xếp dữ liệu
    if (currentSortRule === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (currentSortRule === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (currentSortRule === "name-az") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (currentSortRule === "rating-high") result.sort((a, b) => b.rating - a.rating);

    // Vẽ lại mảng dữ liệu đã hoàn tất tính toán lên màn hình
    renderProducts(result);
}

/**
 * Hàm 2: Lọc theo Category khi nhấn cụm nút điều hướng
 */
function filterByCategory(clickedButton) {
    document.querySelectorAll(".category-buttons .btn").forEach(btn => btn.classList.remove("active"));
    clickedButton.classList.add("active");
    
    currentFilterCategory = clickedButton.dataset.category;
    executeCatalogPipeline();
}

/**
 * Hàm 3: Tìm kiếm Realtime thông qua sự kiện input
 */
function searchProducts(keyword) {
    currentSearchKeyword = keyword.trim();
    executeCatalogPipeline();
}

/**
 * Hàm 4: Thay đổi quy luật sắp xếp khi chọn Dropdown
 */
function sortProducts(rule) {
    currentSortRule = rule;
    executeCatalogPipeline();
}

// ==========================================================================
// 4. CHỨC NĂNG TẠO MODAL CHI TIẾT SẢN PHẨM (DOM DYNAMIC MODAL)
// ==========================================================================
function openProductModal(product) {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");
    
    // Tự động đóng modal khi người dùng click vào vùng mờ bên ngoài hộp thoại
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });

    const box = document.createElement("div");
    box.classList.add("modal-box");

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("modal-close");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => overlay.remove());

    const mTitle = document.createElement("h2");
    mTitle.style.marginBottom = "15px";
    mTitle.textContent = product.name;

    const mImg = document.createElement("img");
    mImg.src = product.image;
    mImg.style.width = "100%";
    mImg.style.maxHeight = "250px";
    mImg.style.objectFit = "contain";
    mImg.style.marginBottom = "15px";

    const mDesc = document.createElement("p");
    mDesc.style.color = "var(--text-muted)";
    mDesc.style.lineHeight = "1.6";
    mDesc.textContent = `Mô tả chi tiết: Đây là dòng sản phẩm ${product.name} cao cấp chính hãng thuộc phân khúc ngành hàng ${product.category}. Thiết bị sở hữu điểm đánh giá chất lượng cao ⭐ ${product.rating}/5 từ cộng đồng người tiêu dùng toàn cầu.`;

    box.append(closeBtn, mTitle, mImg, mDesc);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

// ==========================================================================
// Khởi chạy hệ thống khi tải trang lần đầu
// ==========================================================================
initAppLayout();
renderProducts(products);