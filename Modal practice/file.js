const cardButtons = document.querySelectorAll(".card button");
const outer = document.querySelector(".modal-background");
const inner = document.querySelector(".modal");

handleButtonClick = (e) => {
  //which button
  const theButtonClicked = e.currentTarget;
  //which card
  const theCard = theButtonClicked.closest(".card");
  //what to display in modal
  const img = theCard.querySelector(".card img").src;
  const text = theCard.dataset.description;
  const title = theCard.querySelector(".card h2").textContent;
  //show modal
  outer.classList.add("open");
  inner.innerHTML = `<img src="${img}"/>
   <h2>${title}</h2>
   <p>${text}</p>
   `;
};

handleModalCloseClick = (e) => {
  outer.classList.remove("open");
};

cardButtons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

outer.addEventListener("click", (e) => {
  const theArea = e.target.closest(".modal");
  console.log(theArea);
  if (!theArea) {
    handleModalCloseClick();
  }
});
