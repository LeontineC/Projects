const cube = document.querySelector(".cube");

const key = config.NASA_API_KEY;

fetchImage = async () => {
 
  try {
    const response = await fetch(
      // `https://api.nasa.gov/planetary/apod/?&count=6&api_key=${key}`
      `https://api.nasa.gov/planetary/apod/?end_date=2021-07-27&start_date=2021-07-21&api_key=${key}`
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
    // const explanation = document.createElement("p");
    // const date = document.createElement("p");

    img.src = picture.hdurl;
    // explanation.textContent = picture.title;
    // date.textContent = picture.date;

    // wrapper.append(img, explanation, date);
    cube.append(img);
    img.classList.add("cube-face");
   
   
  });

  //add different class to each photo

 const photos = Array.from(cube.children);
  
 const photoOne = photos[0].classList.add('top');
 const photoTwo = photos[1].classList.add('bottom');
 const photoThree = photos[2].classList.add('left');
 const photoFour = photos[3].classList.add('right');
 const photoFive = photos[4].classList.add('front');
 const photoSix = photos[5].classList.add('back');

};
