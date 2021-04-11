import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLightHelper } from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'



// Loading
const textureLoader = new THREE.TextureLoader();

// const normalTexture = textureLoader.load('/textures/NormalMap.png');
const normalTexture = textureLoader.load('/textures/mars_1k_normal.jpg');

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64)

const gltbModel = 'textures/Mars/Phobos_1_1000.glb';
const deimosGLTF = 'textures/Mars/Deimos_1_1000.glb';
// const gltbModel = 'src/assets/Ingenuity_v3.glb';

// --- data input ---
let yRotation = 0;
let xPosition = -3.2;
let zPosition = 3.5;

let theta = -10;
let deimosTheta = -10;
// -----         -----

let model = new THREE.Object3D();
let c, size; // model center and size

let deimosModel = new THREE.Object3D();

let x0 = xPosition;
let dx;


// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;

material.color = new THREE.Color(0x292929)

// Mesh
// const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)


// this is the Mars Map
const marsGeom = new THREE.SphereBufferGeometry(0.5, 64, 64);
marsGeom.castShadow = true;
marsGeom.receiveShadow = true;
const marsSphere = createTextureMesh(marsGeom, '/textures/mars_1k_color.jpg', '/textures/mars_1k_normal.jpg')
marsSphere.receiveShadow = true;
marsSphere.castShadow = true;

scene.add(marsSphere);


// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light 2
const pointLight2 = new THREE.PointLight(0xffffff, 2)
// pointLight2.position.set(1,1,1);
pointLight2.position.set(-6, 0.8, 3);
// 0.8
pointLight2.intensity = 1.37;
pointLight2.castShadow = true;
scene.add(pointLight2)

const light1 = gui.addFolder('Light 1');

light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01);
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
scene.add(pointLightHelper)

// // Light 3
// const pointLight3 = new THREE.PointLight(0xe1ff, 2)
// // pointLight2.position.set(1,1,1);
// pointLight3.position.set(2.13, -3, -1.98);
// pointLight3.intensity = 10;
// scene.add(pointLight3)

// const light2 = gui.addFolder('Light 2');

// light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01);
// light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01);
// light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01);

// const light2Color = {
//     color: 0xff0000
// }

// light2.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light2Color.color);
//     });

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper2)

// GLTF Loader for moons of Mars
const phobosShape = new GLTFLoader();
phobosShape.load(gltbModel, (gltf) => {
    gltf.scene.traverse(child => {

        if (child.material) child.material.metalness = 0;
        if (child.isMesh) { child.castShadow = true; }
        if (child.isMesh) { child.receiveShadow = true; }


    });

    gltf.scene.scale.multiplyScalar(0.0005);

    const box = new THREE.Box3().setFromObject(gltf.scene);
    const boxHelper = new THREE.Box3Helper(box, 0xffff00);
    // scene.add( boxHelper );

    c = box.getCenter(new THREE.Vector3());
    size = box.getSize(new THREE.Vector3());

    gltf.scene.position.set(-c.x, size.y / 2 - c.y, -c.z);

    model.add(gltf.scene);

    // model.add(root);
    model.castShadow = true;
    model.receiveShadow = true;

    scene.add(model);
});


const deimosShape = new GLTFLoader();
deimosShape.load(deimosGLTF, (gltf) => {
    gltf.scene.traverse(child => {

        if (child.material) child.material.metalness = 0;
        if (child.isMesh) { child.castShadow = true; }
        if (child.isMesh) { child.receiveShadow = true; }


    });

    gltf.scene.scale.multiplyScalar(0.002);

    const box = new THREE.Box3().setFromObject(gltf.scene);
    const boxHelper = new THREE.Box3Helper(box, 0xffff00);
    // scene.add( boxHelper );

    c = box.getCenter(new THREE.Vector3());
    size = box.getSize(new THREE.Vector3());

    gltf.scene.position.set(-c.x, size.y / 2 - c.y, -c.z);

    deimosModel.add(gltf.scene);

    // model.add(root);
    deimosModel.castShadow = true;
    deimosModel.receiveShadow = true;

    scene.add(deimosModel);
});


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

function createTextureMesh(geometry, image, otherImage) {
    let map = new THREE.TextureLoader().load(image);
    let normalMap = new THREE.TextureLoader().load(otherImage);

    let material = new THREE.MeshPhongMaterial();
    material.map = map;//Bottom mapping
    material.normalMap = normalMap;//normal map
    material.normalScale = new THREE.Vector2(2, 2);//Concavo convex degree

    return new THREE.Mesh(geometry, material);
}



const updateSphere = (event) => {
    marsSphere.position.y = window.scrollY * 0.001;
}



const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    marsSphere.rotation.y = .5 * elapsedTime

    // marsSphere.rotation.y += 0.5 * (targetX - marsSphere.rotation.y);
    // marsSphere.rotation.x += 0.05 * (targetY - marsSphere.rotation.x);
    // marsSphere.position.z += -0.05 * (targetY - marsSphere.rotation.x);

    let modelRadius = 1.25;

    yRotation += 0.01;
    // t += 0.1;
    // dx = Math.sin( t )	
    // xPosition = x0 + dx;	

    model.rotation.y = yRotation;

    // model.position.x = xPosition
    // model.position.z = zPosition

    theta -= 0.005;
    model.position.x = modelRadius * Math.cos(theta);
    // model.position.y = modelRadius * Math.sin(theta);
    // model.position.y = Math.sin(1.042);
    model.position.z = modelRadius * Math.sin(theta);


    let deimosOrbitRadius = 3;
    deimosModel.rotation.y = yRotation;
    deimosTheta -=0.001;
    deimosModel.position.x = deimosOrbitRadius * Math.cos(deimosTheta);
    deimosModel.position.z = deimosOrbitRadius * Math.sin(deimosTheta);


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()