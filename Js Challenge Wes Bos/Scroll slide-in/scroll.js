function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
} ////??????

const scrollImages = document.querySelectorAll(".imageScroll");

function checkSlide(e) {
//   console.log(window.scrollY); //shows how many px from top of current view
  scrollImages.forEach(scrollImage => {
    const slideInAt = (window.scrollY + window.innerHeight) - //px current view from bottom of screen
       scrollImage.height / 3 ;  // to scroll in when scrolled 1/3 way past the image place
    console.log(scrollImage.height);
       const scrollImageBottom = scrollImage.offsetTop + scrollImage.height; 
    //to scroll back up offSetTop tells px level from top of page + image height gives px at bottom of image not the top
    const isHalfShown = slideInAt > scrollImage.offsetTop;
    const isNotScrolledPast = window.scrollY < scrollImageBottom;
    if(isHalfShown && isNotScrolledPast) {
        scrollImage.classList.add('active');
    } else {
        scrollImage.classList.remove('active');
    }
});
}

window.addEventListener("scroll", debounce(checkSlide));
