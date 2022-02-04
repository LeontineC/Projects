const hamburger = document.querySelector(".hamburger");
const linksContainer = document.querySelector(".nav-list");
const lines = document.querySelectorAll(".line");
const links = document.querySelectorAll(".nav-list li");

handleHamburgerClick = (e) => {
  linksContainer.classList.toggle("active");
  lines.forEach((line) => {
    line.classList.toggle("clicked");
  });
  links.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `fadeInOut 0.5s ease-in-out forwards ${
        index / 5 + 2
      }s`;
    }
  });
};

hamburger.addEventListener("click", handleHamburgerClick);
