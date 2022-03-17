//Variables

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");

  scene = new THREE.Scene();

  const fov = 145;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 10000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-500, 350, 950); //x, y, z

  const ambient = new THREE.AmbientLight(0xDCDCDC, 0.5); //hexcolor with 0x no # and amount of light
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xfdfbd3, 3);
  light.position.set(5, 5, 10);
  scene.add(light);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //antia adds blur to edges alpha can add any background
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model

  let loader = new THREE.GLTFLoader();
  loader.load("./house/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    // renderer.render(scene, camera);
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  house.rotation.z += 0.001;
  renderer.render(scene, camera);
}

init();

function resizeWindow() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth / container.clientHeight);
};

window.addEventListener('resize', resizeWindow);

