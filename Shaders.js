import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertex from './Shaders/vertex.glsl'
import fragement from './Shaders/fragement.glsl'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas = document.querySelector("canvas");

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.innerWidth, window.innerHeight, 2));

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.PlaneGeometry(2, 3, 100, 100);
const material = new THREE.ShaderMaterial({ 
    vertexShader: vertex,
    fragmentShader: fragement,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: { value : 0 }
    }
 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 5;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    material.uniforms.uTime.value += 0.1;

    renderer.render(scene, camera);
}

animate();
