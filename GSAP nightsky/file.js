gsap.to(".dot", {
  duration: 3,
  ease: "bounce",
  opacity: 0.2,
  stagger: { each: 1, repeat: -1 },
});

gsap.to(".star", {
  duration: 4,
  ease: "slow",
  opacity: 0.2,
  stagger: { each: 1, repeat: -1 },
});

gsap.to(".fallingstar", {
  duration: 2,
  ease: "sine",
  y: 1200,
  x: -1200,
  stagger: {
    each: 1,
    repeat: -1,
    repeatDelay: 10,
  },
});
