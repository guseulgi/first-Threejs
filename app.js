import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Scene
let scene = new THREE.Scene();

// Camera
let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 4);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);

let light = new THREE.DirectionalLight(0xffffff, 10);
scene.add(light);
scene.background = new THREE.Color("white");

// Cube 그리기
// const geometry = new THREE.BoxGeometry( 1, 1.5, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// function animate() {
// 	requestAnimationFrame( animate );

// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );
// }

// animate();

// 3D 개체 불러오기
let loader = new GLTFLoader();
loader.load("./sources/models/shiba/scene.gltf", function (gltf) {
  scene.add(gltf.scene);
  // renderer.render(scene, camera);

  // 움직이는 애니메이션
  function animate() {
    requestAnimationFrame(animate);

    gltf.scene.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
});
