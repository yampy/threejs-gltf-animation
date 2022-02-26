import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import 'normalize.css';

// Setup Renderer 
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webGLContainer').appendChild(renderer.domElement);

const scene = new THREE.Scene();

// Setup Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 35);
camera.lookAt(0, 0, 0);


// Add GLTF Model
let originalMesh;
let groupMesh = new THREE.Group();
const modelLoader = new GLTFLoader();
modelLoader.load('./models/SquareFrame.glb', glb => {
    glb.scene.traverse(child => {
        if( child instanceof THREE.Mesh){
            originalMesh = child;
            originalMesh.material = new THREE.MeshNormalMaterial();
            
            for (let i = 0; i < 20; i++) {
                const clone = originalMesh.clone();
                clone.rotation.y = Math.PI /2;
                clone.scale.set(0.1, i, i);
                groupMesh.add(clone);            
            }
            scene.add(groupMesh);
        }
    })
});


// Render & Animation
function render() {
    let i = 0;
    while(i < groupMesh.children.length){
        groupMesh.children[i].rotation.x += 0.001 * i;
        groupMesh.children[i].rotation.y += 0.001 * i;
        groupMesh.children[i].rotation.z += 0.001 * i;
        i++;
    }
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();
