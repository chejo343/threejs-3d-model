import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  15,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)
camera.position.set(200, 200, 200)
camera.lookAt(0, 0, 0)
// controls.update()
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
});
// Luz ambiental
const ambient_light = new THREE.AmbientLight('#FFF', 0.5)
scene.add(ambient_light)
// Punto de luz
const light = new THREE.PointLight('#FFF', 1, 100)
light.position.set(15, 15, 15)
scene.add(light)

// Permite mover la camara al rededor de un objeto
const controls = new OrbitControls(camera, renderer.domElement)

const loader = new GLTFLoader()
// Carga de modelo en formato GLB
loader.load('models/Flamingo.glb', (gltf) => {
  const model = gltf.scene

  model.scale.set(0.3, 0.3, 0.3)
  model.position.set(0, 0, 0)
  scene.add(model)
  // const mixer = new THREE.AnimationMixer(model);
  // const clips = gltf.animations;
  // clips.forEach((clip) => {
  //   mixer.clipAction(clip).play();
  // });
  // const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    model.rotation.y += 0.01
    // if (mixer) {
    //   mixer.update(clock.getDelta());
    // }
  }
  animate();
}, undefined, (error) => {
  console.error(error)
})
