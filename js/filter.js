document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const splideElement = document.querySelector('#portfolio-slider');
    const splideList = splideElement.querySelector('.splide__list');
    const allSlides = Array.from(splideList.children);

    // Splide settings
    const splideOptions = {
        type: 'loop',
        perPage: 2,
        perMove: 1,
        padding: "5rem",
        gap: '5rem',  // 👈 Ensures proper spacing!
        focus: "center",
        autoplay: true,
        interval: 5000,
        breakpoints: {
            1024: { perPage: 1, gap: '1rem' },
            768: { perPage: 1, gap: '0.5rem' }
        }
    };

    let splideInstance = new Splide(splideElement, splideOptions).mount();

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Update active button styling
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Destroy Splide before modifying slides
            splideInstance.destroy();

            // Clear current slides
            splideList.innerHTML = '';

            // Append filtered slides
            allSlides.forEach(slide => {
                if (filter === 'all' || slide.getAttribute('data-category') === filter) {
                    const clonedSlide = slide.cloneNode(true);
                    clonedSlide.classList.add('splide__slide'); // 👈 Ensures Splide treats it correctly
                    splideList.appendChild(clonedSlide);
                }
            });

            // Reinitialize Splide after filtering
            splideInstance = new Splide(splideElement, splideOptions).mount();
        });
    });
});
