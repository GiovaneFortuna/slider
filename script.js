const track = document.getElementById("sliderTrack");
    const slider = document.querySelector(".slider-track");
    let currentIndex = 0;
    let startX;
    let isDragging = false;
    let currentTranslate = 0;

    function getSlidesPerView() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      return 3;
    }

    function moveSlide(direction) {
      const slidesPerView = getSlidesPerView();
      const totalSlides = track.children.length;
      const maxIndex = totalSlides - slidesPerView;

      currentIndex += direction;
      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex > maxIndex) currentIndex = maxIndex;

      const slideWidth = track.children[0].offsetWidth + 20;
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    window.addEventListener("resize", () => {
      moveSlide(0);
    });

    slider.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - currentTranslate;
      slider.style.cursor = 'grabbing';
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const currentX = e.pageX;
      const diff = currentX - startX;
      track.style.transform = `translateX(${diff}px)`;
    });

    slider.addEventListener("mouseup", () => {
      isDragging = false;
      slider.style.cursor = 'grab';
      const diff = parseInt(track.style.transform.replace('translateX(', '').replace('px)', ''));
      currentIndex = Math.round(diff / (track.children[0].offsetWidth + 20));
      moveSlide(0);
    });

    slider.addEventListener("mouseleave", () => {
      if (isDragging) {
        isDragging = false;
        slider.style.cursor = 'grab';
        const diff = parseInt(track.style.transform.replace('translateX(', '').replace('px)', ''));
        currentIndex = Math.round(diff / (track.children[0].offsetWidth + 20));
        moveSlide(0);
      }
    });

    function currentSlide(index) {
      const slideWidth = track.children[0].offsetWidth + 20;
      currentIndex = index;
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
      updateDots();
    }

    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.addEventListener('click', () => currentSlide(index));
    });