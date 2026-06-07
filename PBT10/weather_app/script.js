const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const statusEl = document.getElementById("status");
const weatherCard = document.getElementById("weatherCard");
const cityNameEl = document.getElementById("cityName");
const weatherDescEl = document.getElementById("weatherDesc");
const weatherIconEl = document.getElementById("weatherIcon");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const historyList = document.getElementById("historyList");

const STORAGE_KEY = "weather_app_history";
const MAX_HISTORY = 5;

function showStatus(message, type = "loading") {
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
    statusEl.classList.remove("hidden");
}

function hideStatus() {
    statusEl.classList.add("hidden");
}

function showWeather(data, city) {
    cityNameEl.textContent = city;
    weatherDescEl.textContent = data.weatherDesc[0].value;
    weatherIconEl.src = data.weatherIconUrl[0].value;
    weatherIconEl.alt = data.weatherDesc[0].value;
    temperatureEl.textContent = `${data.temp_C} °C`;
    humidityEl.textContent = `${data.humidity} %`;
    windEl.textContent = `${data.windspeedKmph} km/h`;
    weatherCard.classList.remove("hidden");
}

function setHistory(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    renderHistory(items);
}

function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function renderHistory(items) {
    historyList.innerHTML = items.map(city => `<li data-city="${city}">${city}</li>`).join("");
}

function updateHistory(city) {
    const list = getHistory();
    const normalized = city.trim();
    const existingIndex = list.indexOf(normalized);
    if (existingIndex !== -1) {
        list.splice(existingIndex, 1);
    }
    list.unshift(normalized);
    if (list.length > MAX_HISTORY) list.pop();
    setHistory(list);
}

async function fetchWeather(city) {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    showStatus("Đang tải...", "loading");
    weatherCard.classList.add("hidden");

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const current = data.current_condition?.[0];
        if (!current) {
            throw new Error("Không lấy được dữ liệu thời tiết.");
        }

        showWeather(current, city);
        hideStatus();
        updateHistory(city);
    } catch (error) {
        weatherCard.classList.add("hidden");
        showStatus(`Lỗi: ${error.message}`, "error");
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) {
        showStatus("Vui lòng nhập tên thành phố.", "error");
        return;
    }
    fetchWeather(city);
});

cityInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

historyList.addEventListener("click", event => {
    const city = event.target.dataset.city;
    if (city) {
        cityInput.value = city;
        fetchWeather(city);
    }
});

renderHistory(getHistory());
