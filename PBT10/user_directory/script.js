const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error("Không tải được danh sách users.");
        return response.json();
    },
    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) throw new Error("Không tải được user.");
        return response.json();
    },
    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Không thể tạo user.");
        return response.json();
    },
    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Không thể cập nhật user.");
        return response.json();
    },
    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Không thể xóa user.");
        return response.text();
    }
};

const ui = {
    userList: document.getElementById("userList"),
    toast: document.getElementById("toast"),
    formPanel: document.getElementById("userFormPanel"),
    formTitle: document.getElementById("formTitle"),
    userForm: document.getElementById("userForm"),
    nameInput: document.getElementById("nameInput"),
    emailInput: document.getElementById("emailInput"),
    phoneInput: document.getElementById("phoneInput"),
    websiteInput: document.getElementById("websiteInput"),
    searchInput: document.getElementById("searchInput"),
    createBtn: document.getElementById("createBtn"),
    cancelBtn: document.getElementById("cancelBtn")
};

let users = [];
let currentEditId = null;

function showToast(message) {
    ui.toast.textContent = message;
    ui.toast.classList.remove("hidden");
    setTimeout(() => ui.toast.classList.add("hidden"), 2500);
}

function showError(message) {
    alert(message);
}

function showLoadingSkeleton() {
    ui.userList.innerHTML = Array.from({ length: 6 }, () => `<div class="skeleton"></div>`).join("");
}

function renderUsers(list) {
    if (!list.length) {
        ui.userList.innerHTML = `<div class="user-card"><p>Không có user phù hợp.</p></div>`;
        return;
    }

    ui.userList.innerHTML = list.map(user => `
        <div class="user-card">
            <div>
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> ${user.website}</p>
            </div>
            <div class="user-actions">
                <button class="edit" data-id="${user.id}">Edit</button>
                <button class="delete" data-id="${user.id}">Delete</button>
            </div>
        </div>`).join("");
}

function openForm(editMode = false) {
    ui.formPanel.classList.remove("hidden");
    ui.formTitle.textContent = editMode ? "Chỉnh sửa user" : "Tạo user mới";
}

function closeForm() {
    ui.formPanel.classList.add("hidden");
    ui.userForm.reset();
    currentEditId = null;
}

function fillForm(user) {
    ui.nameInput.value = user.name;
    ui.emailInput.value = user.email;
    ui.phoneInput.value = user.phone;
    ui.websiteInput.value = user.website;
}

async function loadUsers() {
    showLoadingSkeleton();
    try {
        users = await api.getUsers();
        renderUsers(users);
    } catch (error) {
        ui.userList.innerHTML = "";
        showError(error.message);
    }
}

function getFilteredUsers() {
    const query = ui.searchInput.value.trim().toLowerCase();
    return users.filter(user => {
        return user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    });
}

ui.searchInput.addEventListener("input", () => {
    renderUsers(getFilteredUsers());
});

ui.createBtn.addEventListener("click", () => {
    openForm(false);
});

ui.cancelBtn.addEventListener("click", closeForm);

ui.userForm.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = {
        name: ui.nameInput.value.trim(),
        email: ui.emailInput.value.trim(),
        phone: ui.phoneInput.value.trim(),
        website: ui.websiteInput.value.trim()
    };

    try {
        if (currentEditId) {
            const updated = await api.updateUser(currentEditId, formData);
            users = users.map(user => user.id === currentEditId ? { ...user, ...updated } : user);
            showToast("Cập nhật user thành công.");
        } else {
            const created = await api.createUser(formData);
            users.unshift(created);
            showToast("Tạo user mới thành công.");
        }
        renderUsers(getFilteredUsers());
        closeForm();
    } catch (error) {
        showError(error.message);
    }
});

ui.userList.addEventListener("click", async event => {
    const id = Number(event.target.dataset.id);
    if (!id) return;

    if (event.target.matches(".edit")) {
        try {
            const user = await api.getUser(id);
            currentEditId = id;
            fillForm(user);
            openForm(true);
        } catch (error) {
            showError(error.message);
        }
    }

    if (event.target.matches(".delete")) {
        const confirmDelete = confirm("Bạn có chắc muốn xóa user này?");
        if (!confirmDelete) return;
        try {
            await api.deleteUser(id);
            users = users.filter(user => user.id !== id);
            renderUsers(getFilteredUsers());
            showToast("Xóa user thành công.");
        } catch (error) {
            showError(error.message);
        }
    }
});

window.addEventListener("click", event => {
    if (event.target === ui.formPanel) {
        closeForm();
    }
});

loadUsers();
