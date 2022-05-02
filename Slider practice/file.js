const prev = document.querySelector(".previous");
const next = document.querySelector(".next");
const sliderList = document.querySelector(".slider-list");
const slides = Array.from(sliderList.children);
const indicatorButtons = document.querySelector('.button-list');
const indicators = Array.from(indicatorButtons.children);
const indicatorButton = document.querySelectorAll('.button-item');


let currentSlideIndex = 0;
let currentSlide = 0;
let nextSlide = 0;
let prevSlide = 0;

setSlides = () => {
  currentSlide = slides[currentSlideIndex];
  nextSlide = currentSlide.nextElementSibling || sliderList.firstElementChild;
  prevSlide =
    currentSlide.previousElementSibling || sliderList.lastElementChild;
  currentSlide.classList.add("active");
  nextSlide.classList.add("active-next");
  prevSlide.classList.add("active-previous");


};

moveSlides = (newSlideIndex) => {

  currentSlide.classList.remove("active");
  currentSlide = slides[newSlideIndex];
  nextSlide.classList.remove("active-next");
  prevSlide.classList.remove("active-previous");
  currentSlide.classList.add("active");
  nextSlide = currentSlide.nextElementSibling || sliderList.firstElementChild;
  prevSlide =
    currentSlide.previousElementSibling || sliderList.lastElementChild;
  nextSlide.classList.add("active-next");
  prevSlide.classList.add("active-previous");
 
 
  
};

handlePrevButton = (e) => {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  let prevSlideIndex = currentSlideIndex;
  moveSlides(prevSlideIndex);
};

handleNextButton = (e) => {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  let nextSlideIndex = currentSlideIndex;
  moveSlides(nextSlideIndex);
};



prev.addEventListener("click", handlePrevButton);
next.addEventListener("click", handleNextButton);

setSlides();

