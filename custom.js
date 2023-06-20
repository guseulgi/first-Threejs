import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';

// 씬
let scene = new THREE.Scene();

// 카메라
let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  700,
);

// 렌더러
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true,
})
renderer.setSize(window.innerWidth, window.innerHeight);

// OrbitControls 를 사용한 카메라 제어
const controls = new OrbitControls(camera, renderer.domElement)

camera.position.set(0, 5, 5)

// OrbitControls 설정 추가
// controls.enableDamping = true; // 카메라 조작 시 부드럽게 
// controls.rotateSpeed = 0.8; // 카메라 회전 속도
// controls.zoomSpeed = 1.2; // 카메라를 줌 할 때의 속도
controls.update();

let light = new THREE.DirectionalLight(0xfff, 10)
scene.add(light)
scene.background = new THREE.Color('white')

// 모델링 불러오기
let birdLoader = new GLTFLoader();
let mixer = null;
birdLoader.load('./sources/models/bird_orange/scene.gltf', function (gltf) {
  scene.add(gltf.scene);

  function animate() {
    // 회전 애니메이션
    // gltf.scene.rotation.y += 0.010

    mixer = new THREE.AnimationMixer(gltf.scene)
    const action = mixer.clipAction(gltf.animations[0])
    console.log(action)
    action.play()

    // OrbitControls는 update를 해줘야 변경사항이 적용된다.
    controls.update();
  }

  animate();

  function update() {
    // let clock = new Clock();
    // mixer.update(clock.getDelta()); // 애니메이션이 실행 안됨
  }

  function renderLoop() {
    requestAnimationFrame(renderLoop);
    update();
    renderer.render(scene, camera);
  }
  renderLoop();
})



// let dogLoader = new GLTFLoader();
// dogLoader.load('./sources/models/shiba/scene.gltf', function(gltf) {
//   scene.add(gltf.scene);

//   // function animate() {
//   //   requestAnimationFrame(animate);
//   //   renderer.render(scene, camera);
//   // }

//   // animate();
// })

// let objects = []
// objects.push(birdLoader)
// objects.push(dogLoader)

// DragControls
// const controls = new DragControls(objects, camera, renderer.domElement)

// function animate() {
//   requestAnimationFrame(animate);
//   controls.addEventListener( 'dragstart', function ( event ) {
//     event.object.material.emissive.set( 0xaaaaaa );
//   } );
  
//   controls.addEventListener( 'dragend', function ( event ) {
//     event.object.material.emissive.set( 0x000000 );
//   } );
//   renderer.render(scene, camera);
// }
