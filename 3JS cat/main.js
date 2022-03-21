// canvas scene camera renderer
//plane with texture
//lighting
//import cat
//access animations of cat model
//import bird
//access animations of bird model
//shadows

let renderer,
  scene,
  camera,
  controls,
  canvas = document.querySelector(".canvas");

//SCENE
scene = new THREE.Scene();

//CAMERA
camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 35;

//RENDERER
renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//TEXTURES

// const background = new THREE.TextureLoader().load("textures/clouds.jpg");
const texture = new THREE.TextureLoader().load("textures/tiles.jpg");

// scene.background = background;

//GEOMETRY

const geometryPlane = new THREE.PlaneGeometry(100, 30, 1, 1);
const materialPlane = new THREE.MeshBasicMaterial({ map: texture });
const plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.position.set(0, -20, -3);
plane.receiveShadow = true;
scene.add(plane);

//LIGHT

const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

const lightTwo = new THREE.DirectionalLight(0xdcdcdc, 5);
lightTwo.position.set = (500, 1, 500);
lightTwo.castShadow = true;
scene.add(lightTwo);

//LOADER
let cat, bird, catMixer, birdMixer;

handleCat = (gltf) => {
  cat = gltf.scene;
  scene.add(cat);
  cat.position.y = -12;
  cat.rotation.y = 200;
}

const catLoader = new THREE.GLTFLoader();
catLoader.load("./animated_cat/scene.gltf", handleCat);
 

handleRobin = (gltf, birdMixer) => {
  bird = gltf.scene;
  bird.scale.multiplyScalar(1 / 70);
  bird.position.x = -20;
  bird.position.y = -7;
  bird.rotation.y = 180;
  scene.add(bird);
  birdMixer = new THREE.AnimationMixer(bird);
  console.log(birdMixer);
  const birdClips = gltf.animations;
  const birdClip = THREE.AnimationClip.findByName(birdClips, 'LookAround');
  const birdAction = birdMixer.clipAction(birdClip);
  birdAction.play();
};

const robinLoader = new THREE.GLTFLoader();
robinLoader.load("./redcoat_robin/scene.gltf", handleRobin);




//ORBITCONTROLS

controls = new THREE.OrbitControls(camera, canvas);
controls.minDistance = 1;
controls.maxDistance = 900;

// ANIMATE

  animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  // birdMixer.update();    ///////////
  renderer.render(scene, camera);
};

animate();

//RESPONSIVENESS

handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", handleResize);
