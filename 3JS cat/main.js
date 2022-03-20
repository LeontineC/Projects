// canvas scene camera renderer
//plane with texture
//lighting
//import cat
//access animations of cat model
//import bird
//access animations of bird model
//shadows

let renderer, scene, camera, controls, canvas = document.querySelector(".canvas");

init = () => {

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const background = new THREE.TextureLoader().load('textures/clouds.jpg');
const texture = new THREE.TextureLoader().load('textures/tiles.jpg');

scene.background = background;

/*const geometryPlane = new THREE.PlaneGeometry(100, 20, 1, 1);
const materialPlane = new THREE.MeshBasicMaterial({map: texture});
const plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.position.y = -20;

scene.add(plane);
*/

// plane.position.set(0,0,-3);
camera.position.z = 35;



const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

let loader = new THREE.GLTFLoader();
loader.load('./animated_cat/scene.gltf', function(gltf) {
  scene.add(gltf.scene);
  cat = gltf.scene.children[0];
  cat.position.y = -15;
  // const animations = gltf.animations;
  // movement = new THREE.AnimationMixer(cat);
  // console.log(movement)
  // const action = movement.clipAction( animations[0] ); 
  // console.log(action)
    // action.play();
});

controls = new THREE.OrbitControls(camera, canvas);
controls.minDistance = 1;
controls.maxDistance = 900;

    animate();
};

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};


init();

  

handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  
  window.addEventListener('resize', handleResize);