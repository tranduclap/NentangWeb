const photoGrid = document.getElementById("photoGrid");
const loader = document.getElementById("loader");
const loadTrigger = document.getElementById("loadTrigger");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

let page = 1;
let loading = false;
const observerOptions = { rootMargin: "200px" };

function setLoading(isLoading) {
    loading = isLoading;
    loader.classList.toggle("hidden", !isLoading);
}

function createPhotoCard(photo) {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.innerHTML = `
        <img data-src="${photo.thumbnailUrl}" alt="${photo.title}" />
        <div class="caption">${photo.title}</div>
    `;

    card.addEventListener("click", () => {
        lightboxImg.src = photo.url;
        lightboxImg.alt = photo.title;
        lightbox.classList.remove("hidden");
    });

    return card;
}

function lazyLoadImages(entries, imgObserver) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.src = img.dataset.src;
        imgObserver.unobserve(img);
    });
}

const imageObserver = new IntersectionObserver(lazyLoadImages, {
    rootMargin: "200px",
    threshold: 0.1
});

async function loadPhotos() {
    if (loading) return;
    setLoading(true);

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`);
        if (!response.ok) throw new Error("Không tải được ảnh.");
        const photos = await response.json();
        photos.forEach(photo => {
            const card = createPhotoCard(photo);
            photoGrid.appendChild(card);
            imageObserver.observe(card.querySelector("img"));
        });
        page += 1;
    } catch (error) {
        loader.textContent = `Lỗi: ${error.message}`;
    } finally {
        setLoading(false);
    }
}

const scrollObserver = new IntersectionObserver(async entries => {
    if (entries[0].isIntersecting) {
        await loadPhotos();
    }
}, observerOptions);

scrollObserver.observe(loadTrigger);

closeLightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
});

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        lightbox.classList.add("hidden");
        lightboxImg.src = "";
    }
});

loadPhotos();
