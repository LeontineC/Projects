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

handleTexture = (texture) => {
  texture.repeat.set(4, 1);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
};

const texture = new THREE.TextureLoader();

const baseColor = texture.load(
  "floor/Wood_Herringbone_Tiles_003_basecolor.jpg",
  handleTexture
);
const floorNormalMap = texture.load(
  "floor/Wood_Herringbone_Tiles_003_normal.jpg",
  handleTexture
);
const heightMap = texture.load(
  "floor/Wood_Herringbone_Tiles_003_height.png",
  handleTexture
);
const ambientOcclusionMap = texture.load(
  "floor/Wood_Herringbone_Tiles_003_ambientOcclusion.jpg",
  handleTexture
);
const floorRoughnessMap = texture.load(
  "floor/Wood_Herringbone_Tiles_003_roughness.jpg",
  handleTexture
);

// scene.background = new THREE.Color(0x010000);

//GEOMETRY FLOOR

const geometryPlane = new THREE.PlaneGeometry(150, 50, 512, 512);
const materialPlane = new THREE.MeshStandardMaterial({
  map: baseColor,
  normalMap: floorNormalMap,
  displacementMap: heightMap,
  displacementScale: 0.5,
  roughnessMap: floorRoughnessMap,
  roughness: 5,
  aoMap: ambientOcclusionMap,
});
console.log(materialPlane);
const plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.rotation.x = -45;
plane.position.y = -25;
plane.geometry.attributes.uv2 = plane.geometry.attributes.uv;
plane.receiveShadow = true;

scene.add(plane);

//GEOMETRY WALL
const geometryPlaneTwo = new THREE.PlaneGeometry(150, 100, 1, 1);
const materialPlaneTwo = new THREE.MeshStandardMaterial({ color: 0x800000 });
const planeTwo = new THREE.Mesh(geometryPlaneTwo, materialPlaneTwo);
planeTwo.receiveShadow = true;
scene.add(planeTwo);
planeTwo.position.z = -20;

//LIGHT

const light = new THREE.AmbientLight(0xdcdcdc, 1.5);
scene.add(light);

const lightTwo = new THREE.DirectionalLight(0xdcdcdc, 0.2);
lightTwo.position.y = 5;
lightTwo.position.x = 20;
lightTwo.position.z = 40;
lightTwo.castShadow = true;
scene.add(lightTwo);

lightTwo.shadow.camera.top = 30;
lightTwo.shadow.camera.bottom = -30;
lightTwo.shadow.camera.left = -30;
lightTwo.shadow.camera.right = 30;

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
  bird.position.x = -15;
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
