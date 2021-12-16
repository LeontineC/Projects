const wrapper = document.querySelector(".wrapper");

const key = config.NASA_API_KEY;

fetchImage = async () => {
  // try { const response = await fetch(`https://api.nasa.gov/planetary/apod/?api_key=${key}`)
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod/?&count=3&api_key=${key}`
    );
    const data = await response.json();
    console.log(data);
    displayImages(data);
  } catch (error) {
    console.log("something went wrong", error);
  }
};

fetchImage();

displayImages = (data) => {
  data.forEach((picture) => {
    console.log(picture);

    const img = document.createElement("img");
    const explanation = document.createElement("p");
    const date = document.createElement("p");

    img.src = picture.hdurl;
    explanation.textContent = picture.title;
    date.textContent = picture.date;

    wrapper.append(img, explanation, date);
   
  });
};
