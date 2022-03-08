feather.replace();

const wrapper = document.querySelector(".wrapper");
const video = document.querySelector(".video");
const toggle = document.querySelector(".toggle-button");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const progress = document.querySelector(".video-progress");

handleToggle = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
};

handleButtonIcon = () => {
  if (video.paused) {
    play.style.opacity = "1";
    pause.style.opacity = "0";
  } else {
    play.style.opacity = "0";
    pause.style.opacity = "1";
  }
};

handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  // `${percent}%`
  const canvas = document.querySelector(".circle");
  const context = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 50;

  context.beginPath();
  // context.moveTo(centerX, centerY);
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
  context.closePath();

  // context.fillStyle = 'pink';
  // context.fill();
  context.strokeStyle = "white";
  context.stroke();

  const startAngle = 1.5 * Math.PI;
  const radial = (Math.PI * 2) / 100;
};

video.addEventListener("click", handleToggle);
video.addEventListener("play", handleButtonIcon);
video.addEventListener("pause", handleButtonIcon);

toggle.addEventListener("click", handleToggle);

video.addEventListener("timeupdate", handleProgress);
