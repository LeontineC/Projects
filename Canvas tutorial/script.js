const canvas = document.querySelector("#canvas1");
const context = canvas.getContext("2d");
console.log(context);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // context.fillStyle = "pink";
  // context.fillRect( 10, 10, 100, 50);
});

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  // drawCircle();
});

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  //  drawCircle();
});

drawCircle = () => {
  context.fillStyle = "pink";
  // context.strokeStyle = "fuchsia";
  context.lineWidth = 5;
  context.beginPath();
  context.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
  context.fill();
  // context.stroke();
};

//to make multiple objects  everytime called new object created
class Particle {
  constructor() {
    //    this.x = mouse.x;  // x = undefined
    //    this.y = mouse.y;  //y = undefined
    this.x = Math.random() * canvas.width; //between 0 and canvas width
    this.y = Math.random() * canvas.height; //between 0 and canvas height
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5; //random between 1.5/ -1.5
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw() {
    context.fillStyle = "pink";
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }
}

function init() { //fill array with 100 particles
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle()); //constructor
  }
}

init();

function handleParticles() {  //for loop for array of 100 particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
   handleParticles();
  requestAnimationFrame(animate);
}

animate();

/*function animate() {    how to make 1 interactive circle
    context.clearRect(0, 0, canvas.width, canvas.height); clears entire canvas
    drawCircle();
    requestAnimationFrame(animate);
}

animate(); */
