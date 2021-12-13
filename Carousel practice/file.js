const prevArrow = document.querySelector('.arrow-left');
const nextArrow = document.querySelector('.arrow-right');

const indicators = document.querySelector('.indicator-wrapper');
const buttons = Array.from(indicators.children);
const button = document.querySelectorAll('.indicator-btn');


const carousel = document.querySelector('.carousel-list');
const slides = Array.from(carousel.children);
const slide = document.querySelectorAll('carousel-item');
const slideWidth = slides[1].getBoundingClientRect().width;
console.log(slideWidth);


//setting slides in row and //
slides.forEach((slide, index) => {
      slide.style.left = slideWidth * index + "px";
});



moveSlides = (carousel, currentSlide, targetSlide) => {
        carousel.style.transform = 'translateX(-'+ targetSlide.style.left +')';

        currentSlide.classList.remove('active-item');
        targetSlide.classList.add('active-item');

        console.log(currentSlide)
        console.log(targetSlide)
};

switchIndicators = (currentButton, targetButton) => {
    currentButton.classList.remove('active-btn');
    targetButton.classList.add('active-btn');
};

removeAddArrows = (prevArrow, nextArrow, slides, targetIndex) => {
      if (targetIndex === 0) {
          prevArrow.classList.add('not-displayed');
          nextArrow.classList.remove('not-displayed');
      }  else if (targetIndex === slides.length-1) {
        prevArrow.classList.remove('not-displayed');
        nextArrow.classList.add('not-displayed');
      } else {
        prevArrow.classList.remove('not-displayed');
        nextArrow.classList.remove('not-displayed');
      }
};

prevArrow.addEventListener('click', (e) => {
    const currentSlide = carousel.querySelector('.active-item');
    const previousSlide = currentSlide.previousElementSibling;
     
    prevIndex = slides.findIndex(slide => slide === previousSlide);
    currIndex = slides.findIndex(slide => slide === currentSlide);
    console.log(prevIndex);
    console.log(currIndex);

    const currentButton = indicators.querySelector('.active-btn');
    const prevButton = currentButton.previousElementSibling;

    moveSlides(carousel, currentSlide, previousSlide);
    removeAddArrows(prevArrow, nextArrow, slides, prevIndex);
    switchIndicators(currentButton, prevButton);
});

nextArrow.addEventListener('click', (e) => {
    const currentSlide = carousel.querySelector('.active-item');
    const nextSlide = currentSlide.nextElementSibling;

    nextIndex = slides.findIndex(slide => slide === nextSlide);
    currIndex = slides.findIndex(slide => slide === currentSlide);
    console.log(nextIndex);
    console.log(currIndex);

    const currentButton = indicators.querySelector('.active-btn');
    const nextButton = currentButton.nextElementSibling;

    moveSlides(carousel, currentSlide, nextSlide);
    removeAddArrows(prevArrow, nextArrow, slides, nextIndex);
    switchIndicators(currentButton, nextButton);
});

indicators.addEventListener('click', (e) => {
    const targetButton = e.target.closest('button');       //eventListener on entire div / e.target is a thing in js
    if (!targetButton) {                                     //event  click now on buttons inside div or any other element indicated in brackets
      return;         //prevents event triggering on any click besides buttons in div
    }

    const currentSlide = carousel.querySelector('.active-item');
    const currentButton = indicators.querySelector('.active-btn');

    const btnIndex = buttons.findIndex(btn => btn === targetButton);   // finds index of button clicked on
    const targetSlide = slides[btnIndex];
    console.log(targetSlide);

    switchIndicators(currentButton, targetButton);
    moveSlides(carousel, currentSlide, targetSlide);
    removeAddArrows(prevArrow, nextArrow, slides, btnIndex);
});