const refreshBtn = document.getElementById("refreshBtn");
const timeInfo = document.getElementById("timeInfo");
const usersBody = document.getElementById("usersBody");
const countriesBody = document.getElementById("countriesBody");
const dogsBody = document.getElementById("dogsBody");

function renderWidget(body, content, status = "success") {
    body.className = `widget-body ${status}`;
    body.innerHTML = content;
}

async function fetchUsers() {
    const response = await fetch("https://randomuser.me/api/?results=5&nat=us,gb,au");
    if (!response.ok) throw new Error("Không tải được danh sách user.");
    const data = await response.json();
    return data.results;
}

async function fetchCountry() {
    const response = await fetch("https://restcountries.com/v3.1/name/vietnam");
    if (!response.ok) throw new Error("Không tải được thông tin quốc gia.");
    const data = await response.json();
    return data[0];
}

async function fetchDogs() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random/5");
    if (!response.ok) throw new Error("Không tải được ảnh chó.");
    const data = await response.json();
    return data.message;
}

function setLoadingState() {
    renderWidget(usersBody, "Loading...", "loading");
    renderWidget(countriesBody, "Loading...", "loading");
    renderWidget(dogsBody, "Loading...", "loading");
    timeInfo.textContent = "Đang tải dữ liệu...";
}

async function loadDashboard() {
    setLoadingState();
    const startTime = Date.now();

    const results = await Promise.allSettled([fetchUsers(), fetchCountry(), fetchDogs()]);

    results.forEach((result, index) => {
        const body = [usersBody, countriesBody, dogsBody][index];
        if (result.status === "fulfilled") {
            if (index === 0) {
                const users = result.value.map(user => `
                    <p><strong>${user.name.first} ${user.name.last}</strong></p>
                    <p>${user.email}</p>
                    <p>${user.location.country}</p>
                `).join("<hr />");
                renderWidget(body, users, "success");
            }
            if (index === 1) {
                const country = result.value;
                renderWidget(body, `
                    <p><strong>Tên:</strong> ${country.name.common}</p>
                    <p><strong>Thủ đô:</strong> ${country.capital?.[0] || "Không có"}</p>
                    <p><strong>Dân số:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Khu vực:</strong> ${country.region}</p>
                    <p><strong>Tiếng nói chính:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
                `, "success");
            }
            if (index === 2) {
                const images = result.value.map(src => `<img src="${src}" alt="Dog" />`).join("");
                renderWidget(body, images, "success");
            }
        } else {
            renderWidget(body, `Lỗi: ${result.reason.message}`, "error");
        }
    });

    const duration = Date.now() - startTime;
    timeInfo.textContent = `Data loaded in ${duration} ms`;
}

refreshBtn.addEventListener("click", loadDashboard);
loadDashboard();
