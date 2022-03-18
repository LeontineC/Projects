//need CANVAS SCENE CAMERA RENDERER

//SCENE
const scene = new THREE.Scene();

//CAMERA
// camera takes 4 attributes
//fov field of view, aspect ratio(width/height),near clipping plane, far clipping plane
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//RENDERER
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); //adds the canvas

//ICOSAHEDRON
const geometryIco = new THREE.IcosahedronGeometry(8, 1);
const materialIco = new THREE.MeshNormalMaterial({ wireframe: true });
const ico = new THREE.Mesh(geometryIco, materialIco);
ico.position.x = 40;
scene.add(ico);

//SPHERE
const geometrySphere = new THREE.SphereGeometry(10, 10, 10);
const materialSphere = new THREE.MeshNormalMaterial({ wireframe: true });
const sphere = new THREE.Mesh(geometrySphere, materialSphere);
scene.add(sphere);
sphere.position.x = -40;

//OCTAHEDRON
const geometryOcta = new THREE.OctahedronGeometry(1, 0);
const materialOcta = new THREE.MeshNormalMaterial({wireframe: true});
const octa = new THREE.Mesh(geometryOcta, materialOcta);
scene.add(octa);
octa.position.y = 25;

//TORUSKNOT
const geometryKnot = new THREE.TorusKnotGeometry(10, 4, 64, 8);
const materialKnot = new THREE.MeshNormalMaterial({wireframe: true});
const knot = new THREE.Mesh(geometryKnot, materialKnot);
scene.add(knot);
knot.position.y = -7;

//to remove camera coordinates 0,0,0
camera.position.z = 50;

//ORBITCONTROLS
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 900;

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  
  sphere.rotation.y += 0.01;
  ico.rotation.z += -0.01;
  octa.rotation.y += 0.05;
  knot.rotation.z += 0.02;

  controls.update();
};

animate();
 
//to fix responsiveness
handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', handleResize);
