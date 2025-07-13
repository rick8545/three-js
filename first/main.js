import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w=innerWidth;
const h=innerHeight;
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const fov=75;
const aspect=w/h;
const near=0.1;
const far=10;
const camera=new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.z=2;
const scene=new THREE.Scene();

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping=true;
controls.dampingFactor=0.03;

const geo=new THREE.IcosahedronGeometry(1.0,2);
const mat=new THREE.MeshStandardMaterial({
    color:'#8da9bbff',
    flatShading:true
});

const mesh=new THREE.Mesh(geo,mat);
scene.add(mesh);

const wiremat=new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe:true
});

const wireMesh=new THREE.Mesh(geo,wiremat);
wireMesh.scale.setScalar(0.001);
mesh.add(wireMesh);

const light=new THREE.HemisphereLight(0xffffff,0x000000);
scene.add(light);

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    controls.update();
}
animate();