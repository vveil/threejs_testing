import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const light = new THREE.AmbientLight(0x404040, 50);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.set(0, 0, 1); // Move the camera back along the Z axis

loader.load(
	'models/t_shirt/scene.gltf',
	function(gltf) {
		// gltf.scene.scale.set(0, 0, 1);
		scene.add(gltf.scene);
		gltf.scene.position.y -= 1; // Adjust this value as needed
	},
	function(xhr) {
		let status = Math.floor(xhr.loaded / xhr.total * 100)
		if (status % 5 === 0) { console.log(status + '% loaded'); }
	},
	function(error) {
		console.log('An error happened', error);
	}
);

function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}

animate();
