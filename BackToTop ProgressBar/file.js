const sectionOne = document.querySelector(".sectionOne");
const sectionArrow = document.querySelector(".sectionArrow");
const arrow = document.querySelector(".arrow");
const progressBar = document.querySelector(".progressBar");
const container = document.body;
const doc = document.documentElement;

//hide and reveal backToTop section
const navOptions = {
  root: null,
  threshold: 1.0,
  rootMargin: "400px",
};

const sectionObserver = new IntersectionObserver(function (
  entries,
  sectionObserver
) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      sectionArrow.classList.add("hidden");
    } else {
      sectionArrow.classList.remove("hidden");
    }
  });
},
navOptions);

sectionObserver.observe(sectionOne);

// function to go back to top of page

backToTop = () => {
  document.body.scrollIntoView({
    behavior: "smooth",
  });
};

//fire off function on arrow click

arrow.addEventListener("click", backToTop);

//set width of scroll progress bar

document.addEventListener("scroll", () => {
  const calculatePercentage =
    ((container.scrollTop || doc.scrollTop) /
      ((container.scrollHeight || doc.scrollHeight) - doc.clientHeight)) *
    100;

  progressBar.style.width = `${calculatePercentage}%`;
});
