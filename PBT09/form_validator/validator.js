// Chọn toàn bộ các phần tử DOM phục vụ cho việc bắt sự kiện và hiển thị lỗi
const form = document.getElementById("registerForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const phone = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");

// Biến cờ kiểm soát trạng thái hợp lệ của từng ô (Validation State)
let validFields = { name: false, email: false, pass: false, confirm: false, phone: false };

// ==========================================================================
// 1. CÁC HÀM XỬ LÝ LOGIC VALIDATE THÀNH PHẦN (REAL-TIME ENGINE)
// ==========================================================================

// Trợ giúp đổi UI nhanh chóng khi phát hiện trạng thái Valid/Invalid
function setStatusUI(inputEl, iconEl, errorEl, isValid) {
    if (isValid) {
        inputEl.classList.remove("invalid");
        inputEl.classList.add("valid");
        iconEl.textContent = "✅";
        if (errorEl) errorEl.style.display = "none";
    } else {
        inputEl.classList.remove("valid");
        inputEl.classList.add("invalid");
        iconEl.textContent = "❌";
        if (errorEl) errorEl.style.display = "block";
    }
}

// Hàm 1: Kiểm tra Tên (2 - 50 ký tự)
function validateName() {
    const val = fullName.value.trim();
    const isValid = val.length >= 2 && val.length <= 50;
    setStatusUI(fullName, document.getElementById("nameIcon"), document.getElementById("nameError"), isValid);
    validFields.name = isValid;
    checkFormValidity();
}

// Hàm 2: Kiểm tra định dạng Email qua mã Regex chuẩn
function validateEmail() {
    const val = email.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(val);
    setStatusUI(email, document.getElementById("emailIcon"), document.getElementById("emailError"), isValid);
    validFields.email = isValid;
    checkFormValidity();
}

// Hàm 3: Password Strength Meter & Progress Bar Logic
function validatePassword() {
    const val = password.value;
    const bar = document.getElementById("progressBar");
    const txt = document.getElementById("strengthText");
    const icon = document.getElementById("passIcon");
    
    // Đặt lại các lớp trạng thái màu sắc cũ
    bar.className = "progress-bar";
    txt.className = "strength-text";

    if (val.length < 8) {
        bar.style.width = "30%";
        bar.classList.add("strength-weak");
        txt.classList.add("strength-weak");
        txt.textContent = "Mật khẩu yếu: Cần tối thiểu 8 ký tự.";
        password.classList.remove("valid");
        password.classList.add("invalid");
        icon.textContent = "❌";
        validFields.pass = false;
    } else {
        // Phân tích thành phần ký tự bằng Regex để tính điểm độ mạnh
        const hasLower = /[a-z]/.test(val);
        const hasUpper = /[A-Z]/.test(val);
        const hasNumber = /[0-9]/.test(val);
        const hasSpecial = /[^A-Za-z0-9]/.test(val);

        // Trường hợp MẠNH: Đủ chữ hoa, chữ thường, số và ký tự đặc biệt
        if (hasLower && hasUpper && hasNumber && hasSpecial) {
            bar.style.width = "100%";
            bar.classList.add("strength-strong");
            txt.classList.add("strength-strong");
            txt.textContent = "Mật khẩu Mạnh (Hợp lệ) 💪";
            password.classList.remove("invalid");
            password.classList.add("valid");
            icon.textContent = "✅";
            validFields.pass = true;
        } else if ((hasLower || hasUpper) && hasNumber) {
            // Trường hợp TRUNG BÌNH: Có cả chữ và số
            bar.style.width = "65%";
            bar.classList.add("strength-medium");
            txt.classList.add("strength-medium");
            txt.textContent = "Mật khẩu Trung bình (Hợp lệ) 👍";
            password.classList.remove("invalid");
            password.classList.add("valid");
            icon.textContent = "✅";
            validFields.pass = true;
        } else {
            // Trường hợp có 8 ký tự nhưng chỉ toàn chữ hoặc toàn số (Vẫn tính là yếu)
            bar.style.width = "30%";
            bar.classList.add("strength-weak");
            txt.classList.add("strength-weak");
            txt.textContent = "Mật khẩu yếu: Phải bao gồm cả chữ và số.";
            password.classList.remove("valid");
            password.classList.add("invalid");
            icon.textContent = "❌";
            validFields.pass = false;
        }
    }
    
    // Mỗi khi mật khẩu chính thay đổi, cần ép ô xác thực mật khẩu chạy lại để kiểm tra khớp
    validateConfirmPassword(); 
}

// Hàm 4: Xác thực trùng khớp mật khẩu (Confirm Password)
function validateConfirmPassword() {
    const isValid = confirmPassword.value === password.value && confirmPassword.value.length > 0;
    setStatusUI(confirmPassword, document.getElementById("confirmIcon"), document.getElementById("confirmError"), isValid);
    validFields.confirm = isValid;
    checkFormValidity();
}

// Hàm 5: Kiểm tra số điện thoại (10 chữ số) và TỰ ĐỘNG THÊM DẤU GẠCH NGANG KHI GÕ
function handlePhoneInput(e) {
    let input = e.target.value;
    
    // Loại bỏ toàn bộ các ký tự không phải là số ra khỏi chuỗi
    let numOnly = input.replace(/\D/g, "");
    
    // Thực hiện chèn dấu gạch ngang (-) tại mốc vị trí chữ số thứ 4 và chữ số thứ 7
    let formatted = "";
    if (numOnly.length > 0) {
        if (numOnly.length <= 4) {
            formatted = numOnly;
        } else if (numOnly.length <= 7) {
            formatted = `${numOnly.slice(0, 4)}-${numOnly.slice(4)}`;
        } else {
            formatted = `${numOnly.slice(0, 4)}-${numOnly.slice(4, 7)}-${numOnly.slice(7, 10)}`;
        }
    }
    
    // Gán lại chuỗi đã định dạng đẹp mắt vào ô nhập liệu
    e.target.value = formatted;

    // Tiến hành validate độ dài thực tế của số điện thoại (đủ 10 số gốc)
    const isValid = numOnly.length === 10;
    setStatusUI(phone, document.getElementById("phoneIcon"), document.getElementById("phoneError"), isValid);
    validFields.phone = isValid;
    checkFormValidity();
}

// ==========================================================================
// 2. ĐIỀU KHIỂN NÚT SUBMIT & HIỂN THỊ HỘP THOẠI MODAL KẾT QUẢ
// ==========================================================================

// Kiểm tra trạng thái cờ, nếu tất cả các trường đều True thì mở khóa nút Submit
function checkFormValidity() {
    const isFormValid = validFields.name && validFields.email && validFields.pass && validFields.confirm && validFields.phone;
    submitBtn.disabled = !isFormValid;
}

// Lắng nghe sự kiện Submit Form chính thức
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Chặn hành vi tải lại trang (reload) mặc định của Form

    const modal = document.getElementById("successModal");
    const modalData = document.getElementById("modalData");

    // Biên tập nội dung thông tin sạch dạng danh sách text gán vào Modal
    modalData.innerHTML = `
        <p><b>👤 Họ và tên:</b> ${fullName.value.trim()}</p>
        <p><b>✉️ Email:</b> ${email.value.trim()}</p>
        <p><b>📞 Số điện thoại:</b> ${phone.value}</p>
        <p><b>🔒 Mật khẩu:</b> •••••••• (Đã mã hóa bảo mật)</p>
    `;

    // Hiển thị Modal ra màn hình bằng cách thêm class CSS
    modal.classList.add("open");
});

// Sự kiện bấm nút đóng Modal hệ thống và dọn sạch Form về trạng thái ban đầu
document.getElementById("modalCloseBtn").addEventListener("click", () => {
    document.getElementById("successModal").classList.remove("open");
    form.reset();
    
    // Xóa sạch các class định dạng valid/invalid cũ và khóa lại nút bấm
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => input.className = "");
    const icons = form.querySelectorAll(".status-icon");
    icons.forEach(icon => icon.textContent = "");
    document.getElementById("progressBar").className = "progress-bar";
    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("strengthText").className = "strength-text";
    document.getElementById("strengthText").textContent = "Mật khẩu quá ngắn (Yêu cầu ≥ 8 ký tự).";
    
    validFields = { name: false, email: false, pass: false, confirm: false, phone: false };
    submitBtn.disabled = true;
});

// GẮN CÁC BỘ LẮNG NGHE SỰ KIỆN CHO CÁC TRƯỜNG DỮ LIỆU
fullName.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);
phone.addEventListener("input", handlePhoneInput);