const resizeParent = document.querySelector(".container-resize");
const mutationParent = document.querySelector(".container-mutation");
const text = document.querySelector(".text");
const iParent = document.querySelector(".container-intersection");
const lastWords = document.querySelector("h5");

changeShape = (entries) => {
  const sibling = resizeParent.lastElementChild;
  const change = entries[0].contentRect.width < 400;
  sibling.style.borderRadius = change ? 50 + "%" : 0;
};

const resizeObserver = new ResizeObserver(changeShape);

resizeObserver.observe(resizeParent.firstElementChild);

switchToDarkMode = (entries) => {
  if (MutationRecord) {
    text.style.color = "SaddleBrown";
    mutationParent.style.background = "tan";
    mutationParent.style.opacity = 0.8;
  }
};

const mutateObserver = new MutationObserver(switchToDarkMode);

mutateObserver.observe(text.childNodes[0], { characterData: true });

appearOnPage = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      lastWords.classList.add("visible");
    } else {
      lastWords.classList.remove("visible");
    }
  });
};

const iObserver = new IntersectionObserver(appearOnPage);

iObserver.observe(iParent.lastElementChild, {
  root: null,
  threshold: 1,
  rootMargin: "0px",
});
console.log(iParent.lastElementChild);
