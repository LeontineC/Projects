const cube = document.querySelector('.cube');
const button = document.querySelector('.button');
let currentClass = 'active-1';

//generate random number between 1 and 6




rollCube = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    console.log(randomNumber);

    const activeClass = 'active-' + randomNumber;
    console.log(activeClass);

    if(currentClass) {
        cube.classList.remove(currentClass);
        cube.classList.add(activeClass);
        currentClass = activeClass;
    }  
}

rollCube();

button.addEventListener('click', rollCube);