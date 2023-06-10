import * as THREE from 'three';
// import { GLTFLoader } from 'GLTFLoader';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const canvas = document.getElementById('canvas');
// canvas.width = 600;
// canvas.height = 600;

// Scene
let scene = new THREE.Scene();
scene.backgorund = new THREE.Color('#ccc');

// Camera
let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.set(0, 0, 5);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();