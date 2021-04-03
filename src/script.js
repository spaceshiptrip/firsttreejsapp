import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLightHelper } from 'three';


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
const geometry = new THREE.SphereBufferGeometry( 0.5, 64, 64)

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
const marsGeom = new THREE.SphereBufferGeometry( 0.5, 64, 64);
const marsSphere = createTextureMesh(marsGeom, '/textures/mars_1k_color.jpg', '/textures/mars_1k_normal.jpg')

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




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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

function onDocumentMouseMove (event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

function createTextureMesh(geometry, image, otherImage) {
    let map = new THREE.TextureLoader().load(image);
    let normalMap = new THREE.TextureLoader().load(otherImage);

    let material = new THREE.MeshPhongMaterial();
        material.map = map;//Bottom mapping
        material.normalMap = normalMap;//normal map
        material.normalScale = new THREE.Vector2(0.3, 0.3);//Concavo convex degree

    return new THREE.Mesh(geometry, material);
}



const updateSphere = (event) => {
    marsSphere.position.y = window.scrollY * 0.001;
}



const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    marsSphere.rotation.y = .5 * elapsedTime

    marsSphere.rotation.y += 0.5 * (targetX - marsSphere.rotation.y);
    marsSphere.rotation.x += 0.05 * (targetY - marsSphere.rotation.x);
    marsSphere.position.z += -0.05 * (targetY - marsSphere.rotation.x);

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()