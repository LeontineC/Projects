feather.replace();

const buttonR = document.querySelector(".button-right");
const buttonL = document.querySelector(".button-left");

const pieces = document.querySelector(".pieces");
const piece = document.querySelectorAll(".piece");
const allPieces = Array.from(pieces.children);
const totalLength = allPieces.length;

// const piecesLeft = allPieces[1].getBoundingClientRect().left;
const piecesLeft = 100;
console.log(piecesLeft);
console.log(totalLength);

allPieces.forEach((slide, index) => {
  slide.style.left = piecesLeft * index + "vw";
});

// allPieces.forEach((slide, index) => {
  // slide.style.left = piecesLeft * index + "px";
// });

handleSlides = (currentPiece, targetPiece) => {
  pieces.style.transform = "translateX(-" + targetPiece.style.left + ")";

  currentPiece.classList.remove("current-piece");
  targetPiece.classList.add("current-piece");
};

handleLeftRightBtns = (buttonR, buttonL, targetIndex) => {
  console.log(targetIndex);
  if (targetIndex === 0) {
    buttonL.classList.add("hide");
    buttonR.classList.remove("hide");
  } else if (targetIndex === 3) {
    buttonR.classList.add("hide");
    buttonL.classList.remove("hide");
  } else {
    buttonL.classList.remove("hide");
    buttonR.classList.remove("hide");
  }
};

buttonR.addEventListener("click", (e) => {
  const currentPiece = pieces.querySelector(".current-piece");
  const nextPiece = currentPiece.nextElementSibling;

  nextIndex = allPieces.findIndex((slide) => slide === nextPiece);

  handleSlides(currentPiece, nextPiece);
  handleLeftRightBtns(buttonR, buttonL, nextIndex);
});

buttonL.addEventListener("click", (e) => {
  const currentPiece = pieces.querySelector(".current-piece");
  const previousPiece = currentPiece.previousElementSibling;

  previousIndex = allPieces.findIndex((slide) => slide === previousPiece);

  handleSlides(currentPiece, previousPiece);
  handleLeftRightBtns(buttonR, buttonL, previousIndex);
});

