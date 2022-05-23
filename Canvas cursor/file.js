const paragraph = document.querySelector('.paragraph');
const text = document.querySelectorAll('.text');
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
console.log(text);

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let mouseX = 100;
let mouseY = 100;

let circle = {
    strokeStyle: "#fff8dc",
    radius: 20,
    startAngle: 0,
    endAngle: 2 * Math.PI,
};

let smallCircle = {
    fillStyle: "#fff8dc",
    radius: 10,
};


let tween = gsap.to(circle, {
    radius: circle.radius * 3,
    ease: "power3:in",
    duration: 0.1,
    paused: true
});

let smallTween = gsap.to(smallCircle, {
   radius: smallCircle.radius / 5,
   ease: "power3:in",
   duration: 0.1,
   paused: true
});

function draw(){

context.clearRect(0, 0, width, height);
context.beginPath();
context.arc(mouseX, mouseY, circle.radius, circle.startAngle, circle.endAngle);
context.strokeStyle = circle.strokeStyle;
context.stroke();
context.closePath();

context.beginPath();
context.arc(mouseX, mouseY, smallCircle.radius, circle.startAngle, circle.endAngle);
context.fillStyle = smallCircle.fillStyle;
context.fill();
context.closePath();
}
//arc(x, y, radius, startAngle, endAngle, counterclockwise)

mouseMoveHandler = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

 draw();
}

resizeHandler = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('mousemove', mouseMoveHandler);
window.addEventListener('resize', resizeHandler);

text.forEach(word => {
    word.addEventListener('mouseover', () => {
        tween.play();
        smallTween.play();
      }, false)
});
  
text.forEach(word => {
    word.addEventListener('mouseleave', () => {
        tween.reverse();
        smallTween.reverse();
    }, false)
});


//requestAnimationFrame ?