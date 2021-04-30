// import * as THREE from '../three';
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as THREE from './node_modules/three/src/Three.js';
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://threejs.org/examples/jsm/loaders/OBJLoader.js";
function main() {
  // seleziono canvas
  const canvas = document.querySelector('#c');
  // attribuisco renderer a canvas
  const renderer = new THREE.WebGLRenderer({canvas});
  // creo camera
  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // orbit control
  const controls = new OrbitControls( camera, renderer.domElement );
  camera.position.z = 50;
  camera.position.y = 20;
  controls.update();
  // creo scena
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );
  // creo geometria cubo
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  // creo materiale
  const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue
  // creo mash
  const cube = new THREE.Mesh(geometry, material);
  // aggiungo cubo alla scena
  scene.add(cube);



  // add obj
  const loader = new OBJLoader();
  loader.load(
	// resource URL
	'/models/rtptfmbvknb4-Muhammer/monster.obj',
	// called when resource is loaded
	function ( object ) {
    object.scale.set(10,10,10);
    object.position.set(0,-15,0)
		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);




  var radius = 30;
  var turns = 4;
  var objPerTurn = 10;

  var angleStep = (Math.PI * 1) / objPerTurn;
  var heightStep = 0.5;

  var geom = new THREE.BoxBufferGeometry(5, 3, 0.1);
  const cardGroup = new THREE.Group();
  for (let i = 0; i < turns * objPerTurn; i++) {
    let plane = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
      color: Math.random() * 0x888888 + 0x888888
    }));

    // position
    plane.position.set(
      Math.cos(angleStep * i) * radius,
      heightStep * i,
      Math.sin(angleStep * i) * radius
    );

    // rotation
    plane.rotation.y = - (angleStep * i)- 1.5;

    cardGroup.add(plane);
  }
scene.add(cardGroup);







  // aggiungo luce direzionale
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  // resize pixel function
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }


  // funzione renderizzazione animazione
  function render(time) {
    time *= 0.001;  // convert time to seconds
    // responsive
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }


    cube.rotation.x = time;
    cube.rotation.y = time;
    // camera.position.x = -time*4;
    // camera.position.z = time*8;
    // camera.position.y = time*6;
    cardGroup.rotation.y = -(time/3);
     // renderizzo scena
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  function updateCamera(ev) {
    let div1 = document.getElementById("scroll");
    camera.position.x = 0 +  window.scrollY/100;

    console.log('scroll');
  }
  window.addEventListener("scroll", updateCamera);
}

main();
