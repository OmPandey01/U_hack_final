document.addEventListener("DOMContentLoaded", () => {
    const slide = document.getElementById("gallerySlide") || document.querySelector(".slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const tabs = document.querySelectorAll(".gallery-version-tab");

    if (!slide || !nextBtn || !prevBtn || !tabs.length) {
        return;
    }

    const gallerySources = {
        uhack1: [
            "img/gallery/Gallery_Uhack_1/IMG_2453.JPG",
            "img/gallery/Gallery_Uhack_1/IMG_2495.jpg",
            "img/gallery/Gallery_Uhack_1/IMG_2523.jpg",
            "img/gallery/Gallery_Uhack_1/IMG_2541.jpg",
            "img/gallery/Gallery_Uhack_1/IMG_2597.jpg",
            "img/gallery/Gallery_Uhack_1/IMG_2718.jpg",
            "img/gallery/Gallery_Uhack_1/IMG_2750.jpg",
            "img/gallery/Gallery_Uhack_1/IMG_2755.jpg",
            "img/gallery/Gallery_Uhack_1/IMG_7823.jpg",
        ],
        uhack2: [
            "img/gallery/Gallery_Uhack_2/one.jpg",
            "img/gallery/Gallery_Uhack_2/two.jpg",
            "img/gallery/Gallery_Uhack_2/three.jpeg",
            "img/gallery/Gallery_Uhack_2/four.jpg",
            "img/gallery/Gallery_Uhack_2/four.jpeg",
            "img/gallery/Gallery_Uhack_2/five.jpg",
            "img/gallery/Gallery_Uhack_2/six.jpeg",
            "img/gallery/Gallery_Uhack_2/seven.jpeg",
            "img/gallery/Gallery_Uhack_2/nine.jpeg",
            "img/gallery/Gallery_Uhack_2/ten.jpg",
            "img/gallery/Gallery_Uhack_2/eleven2.jpeg",
            "img/gallery/Gallery_Uhack_2/twelve.jpeg",
            "img/gallery/Gallery_Uhack_2/thirteen.jpg",
            "img/gallery/Gallery_Uhack_2/fifteen.jpeg",
            "img/gallery/Gallery_Uhack_2/sixteen.jpeg",
            "img/gallery/Gallery_Uhack_2/eighteen.jpeg",
            "img/gallery/Gallery_Uhack_2/nineteen.jpg",
            "img/gallery/Gallery_Uhack_2/twenty2.jpeg",
            "img/gallery/Gallery_Uhack_2/twentyone2.jpg",
            "img/gallery/Gallery_Uhack_2/twentythree.jpeg",
            "img/gallery/Gallery_Uhack_2/twentyfour2.jpeg",
            "img/gallery/Gallery_Uhack_2/twentyfive.jpg",
        ],
        uhack3: [
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135404.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135411.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135418.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135426.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135433.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135455.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135501.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135506.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135757.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135842.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135918.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135924.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 135954.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 140106.png",
            "img/gallery/Gallery_uhack_3/Screenshot 2025-11-05 140146.png",
        ],
    };

    let currentGallery = "uhack3";
    let autoSlideTimer = null;

    const createGalleryItem = (src) => {
        const item = document.createElement("div");
        item.className = "item";
        item.style.backgroundImage = `url("${src}")`;
        item.setAttribute("role", "img");
        item.setAttribute("aria-label", src.split("/").pop() || "Gallery image");
        return item;
    };

    const updateNavState = (count) => {
        const disableNav = count <= 1;
        nextBtn.disabled = disableNav;
        prevBtn.disabled = disableNav;
    };

    const moveNext = () => {
        const items = slide.querySelectorAll(".item");
        if (items.length > 1) {
            slide.appendChild(items[0]);
        }
    };

    const movePrev = () => {
        const items = slide.querySelectorAll(".item");
        if (items.length > 1) {
            slide.prepend(items[items.length - 1]);
        }
    };

    const restartAutoSlide = () => {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
        }

        autoSlideTimer = setInterval(() => {
            if (slide.querySelectorAll(".item").length > 1) {
                moveNext();
            }
        }, 3000);
    };

    const renderGallery = (version) => {
        const images = gallerySources[version] || [];

        slide.innerHTML = "";

        // Preload each image and only append items that load successfully.
        // This prevents broken/unavailable images from being shown as empty
        // background images.
        const loadPromises = images.map((src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve({ src, ok: true });
                img.onerror = () => resolve({ src, ok: false });
                img.src = src;
            });
        });

        Promise.all(loadPromises).then((results) => {
            // Keep original order but only include successfully loaded images
            const successful = results.filter((r) => r.ok).map((r) => r.src);

            if (successful.length === 0) {
                // No images loaded — leave slide empty or show a simple message.
                slide.innerHTML = '<div class="no-images">No images available</div>';
            } else {
                successful.forEach((src) => {
                    slide.appendChild(createGalleryItem(src));
                });
            }

            currentGallery = version;
            updateNavState(successful.length);
            restartAutoSlide();
        }).catch(() => {
            // On unexpected error, fall back to rendering all entries (best-effort)
            images.forEach((src) => slide.appendChild(createGalleryItem(src)));
            currentGallery = version;
            updateNavState(images.length);
            restartAutoSlide();
        });
    };

    const setActiveTab = (version) => {
        tabs.forEach((tab) => {
            tab.classList.toggle("is-active", tab.dataset.gallery === version);
        });
    };

    nextBtn.addEventListener("click", () => {
        moveNext();
        restartAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        movePrev();
        restartAutoSlide();
    });

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const version = tab.dataset.gallery;
            if (!version || version === currentGallery) {
                return;
            }
            setActiveTab(version);
            renderGallery(version);
        });
    });

    setActiveTab(currentGallery);
    renderGallery(currentGallery);
});
