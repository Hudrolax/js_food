function slider() {
  const slides = document.querySelectorAll(".offer__slide");
  const prev = document.querySelector(".offer__slider-prev");
  const next = document.querySelector(".offer__slider-next");
  const slidesWrapper = document.querySelector(".offer__slider-wrapper");
  const slidesField = document.querySelector(".offer__slider-inner");
  const width = window.getComputedStyle(slidesWrapper).width;
  const slider = document.querySelector(".offer__slider");

  let slideIndex = 1;
  let offset = 0;

  const currentSlides = document.querySelector("#current");
  document.querySelector("#total").textContent = textIndex(slides.length);

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol");
  let dots = [];

  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  dots.forEach((item, i) =>
    item.addEventListener("click", () => {
      setSlide(i + 1);
    })
  );

  next.addEventListener("click", () => setSlide(slideIndex + 1));
  prev.addEventListener("click", () => setSlide(slideIndex - 1));

  function setSlide(n) {
    slideIndex = n;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    } else if (slideIndex < 1) {
      slideIndex = slides.length;
    }
    currentSlides.textContent = textIndex();
    dots.forEach((item) => (item.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;

    offset = +width.replace(/\D/g, "") * (slideIndex - 1);
    slidesField.style.transform = `translateX(-${offset}px)`;
  }

  function textIndex(index = slideIndex) {
    if (index < 10) {
      return `0${index}`;
    }
    return index;
  }

  // showSlides();

  // function showSlides() {
  //   if (slideIndex > slides.length) { slideIndex = 1; }
  //   if (slideIndex < 1) { slideIndex = slides.length; }

  //   slides.forEach(item => item.style.display = 'none');
  //   slides[slideIndex - 1].style.display = 'block';
  //   currentSlides.textContent = textIndex();
  // }

  // prev.addEventListener('click', () => {
  //   slideIndex--;
  //   showSlides();
  // });

  // next.addEventListener('click', () => {
  //   slideIndex++;
  //   showSlides();
  // });
}

export default slider;
