for (const slideshow of document.querySelectorAll(".project-slideshow[data-image-viewer]")) {
    const frame = slideshow.querySelector(".project-slideshow-frame");
    const slides = [...frame.querySelectorAll("img")];
    const viewer = document.getElementById(slideshow.dataset.imageViewer);
    const expandedImage = viewer.querySelector("img");
    let current = 0;

    const dots = [
        slideshow.querySelector(".project-slideshow-controls"),
        viewer.querySelector(".project-slideshow-controls")
    ].map(controls => {
        const [previous, next] = controls.querySelectorAll("button");
        const dotGroup = controls.querySelector(".project-slideshow-dots");
        const indicators = slides.map((slide, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.setAttribute("aria-label", "Show " + slide.alt);
            dot.addEventListener("click", () => showSlide(index));
            dotGroup.append(dot);
            return dot;
        });

        previous.addEventListener("click", () => showSlide(current - 1));
        next.addEventListener("click", () => showSlide(current + 1));
        controls.hidden = false;
        return indicators;
    });

    function updateExpandedImage() {
        expandedImage.src = slides[current].src;
        expandedImage.alt = slides[current].alt;
    }

    function showSlide(index) {
        slides[current].hidden = true;
        current = (index + slides.length) % slides.length;
        slides[current].hidden = false;

        for (const indicators of dots) {
            indicators.forEach((dot, i) => dot.setAttribute("aria-pressed", String(i === current)));
        }

        if (viewer.open) {
            updateExpandedImage();
        }
    }

    frame.addEventListener("click", () => {
        updateExpandedImage();
        viewer.showModal();
    });

    viewer.addEventListener("click", event => {
        if (event.target === viewer || event.target === expandedImage) {
            viewer.close();
        }
    });

    showSlide(0);
}
