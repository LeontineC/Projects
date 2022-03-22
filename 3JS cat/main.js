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
  cat,
  catMixer,
  bird,
  birdMixer,
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
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

//TEXTURES

// const background = new THREE.TextureLoader().load("textures/bg.jpg");
const texture = new THREE.TextureLoader();
const baseColor = texture.load("floor/Wood_Floor_011_basecolor.jpg");
const floorNormalMap = texture.load("floor/Wood_Floor_011_normal.jpg");
const heightMap = texture.load("floor/Wood_Floor_011_height.png");
const ambientOcclusionMap = texture.load(
  "floor/Wood_Floor_011_ambientOcclusion.jpg"
);
const floorRoughnessMap = texture.load("floor/Wood_Floor_011_roughness.jpg");

// scene.background = new THREE.Color(0x010000);

//GEOMETRY

const geometryPlane = new THREE.PlaneGeometry(150, 55, 512, 512);
const materialPlane = new THREE.MeshStandardMaterial({
  map: baseColor,
  normalMap: floorNormalMap,
  displacementMap: heightMap,
  displacementScale: 0.02,
  roughnessMap: floorRoughnessMap,
  roughness: 0.02,
  aoMap: ambientOcclusionMap,
});

console.log(materialPlane);
const plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.rotation.x = -45;
plane.position.y = -25;
plane.geometry.attributes.uv2 = plane.geometry.attributes.uv;
plane.receiveShadow = true;
scene.add(plane);

//LIGHT

const light = new THREE.AmbientLight(0xdcdcdc, 1.5);
scene.add(light);

const lightTwo = new THREE.DirectionalLight(0xdcdcdc, 0.5);
lightTwo.position.y = 10;
lightTwo.position.x = 20;
lightTwo.position.z = 20;
lightTwo.castShadow = true;
scene.add(lightTwo);

lightTwo.shadow.camera.top = 20;
lightTwo.shadow.camera.bottom = -20;
lightTwo.shadow.camera.left = -20;
lightTwo.shadow.camera.right = 20;

// scene.add( new THREE.CameraHelper(lightTwo.shadow.camera));
//LOADER

handleCat = (gltf) => {
  cat = gltf.scene;
  cat.position.y = -15;
  cat.position.x = 10;
  cat.rotation.y = -100;
  scene.add(cat);
  cat.traverse((cats) => {
  cats.castShadow = true;
  cats.receiveShadow = true;
  });
  catMixer = new THREE.AnimationMixer(cat);
  const catClips = gltf.animations;
  const catClip = THREE.AnimationClip.findByName(catClips, "Take 001");
  const catAction = catMixer.clipAction(catClip);
  console.log(catClip);
  catAction.play();
};

const catLoader = new THREE.GLTFLoader();
catLoader.load("./animated_cat/scene.gltf", handleCat);

handleRobin = (gltf) => {
  bird = gltf.scene;
  bird.scale.multiplyScalar(1 / 90);
  bird.position.x = -20;
  bird.position.y = -10;
  bird.rotation.y = 180;
  scene.add(bird);
  bird.traverse((birds) => {
    birds.castShadow = true;
    birds.receiveShadow = true;
  });
  birdMixer = new THREE.AnimationMixer(bird);
  const birdClips = gltf.animations;
  const birdClip = THREE.AnimationClip.findByName(birdClips, "LookAround");
  const birdAction = birdMixer.clipAction(birdClip);
  birdAction.play();
};

const robinLoader = new THREE.GLTFLoader();
robinLoader.load("./redcoat_robin/scene.gltf", handleRobin);

const catClock = new THREE.Clock();
const birdClock = new THREE.Clock();

//LIGHT ON

//ORBITCONTROLS

// controls = new THREE.OrbitControls(camera, canvas);
// controls.minDistance = 1;
// controls.maxDistance = 900;

// ANIMATE

animate = () => {
  requestAnimationFrame(animate);
  // controls.update();
  birdMixer.update(birdClock.getDelta());
  catMixer.update(catClock.getDelta());
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
