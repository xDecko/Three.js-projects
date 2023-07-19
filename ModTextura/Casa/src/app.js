/**
 * GLOBAL VARS
 */
lastTime = Date.now();
cameras = {
    default: null,
    current: null
};
canvas = {
    element: null,
    container: null
}
labels = {}
cameraControl = null;
stats = null;
scene = null;
renderer = null

/**
 * Function to start program running a
 * WebGL Application trouhg ThreeJS
 */
let webGLStart = () => {
    initScene();
    window.onresize = onWindowResize;
    lastTime = Date.now();
    animateScene();
};

/**
 * Here we can setup all our scene noobsters
 */
function initScene() {
    //Selecting DOM Elements, the canvas and the parent element.
    canvas.container = document.querySelector("#app");
    canvas.element = canvas.container.querySelector("#appCanvas");

    /**
     * SETTING UP CORE THREEJS APP ELEMENTS (Scene, Cameras, Renderer)
     * */
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ canvas: canvas.element });
    renderer.setSize(canvas.container.clientWidth, canvas.container.clientHeight);
    renderer.setClearColor(0xffffff, 1);

    canvas.container.appendChild(renderer.domElement);

    //positioning cameras
    cameras.default = new THREE.PerspectiveCamera(45, canvas.container.clientWidth / canvas.container.clientHeight, 0.1, 100000);
    cameras.default.position.set(0, 2000, 4000);
    cameras.default.lookAt(new THREE.Vector3(0, 0, 0));
    //Setting up current default camera as current camera
    cameras.current = cameras.default;
    //Camera control Plugin
    cameraControl = new THREE.OrbitControls(cameras.current, renderer.domElement);

    //estadisticas
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '10px';
	stats.domElement.style.left = '10px';
	stats.domElement.style.zIndex = '100';
	document.body.appendChild(stats.domElement);

    /*****
     * CONFIGURACIÓN DE ELEMENTOS DE LA ESCENA FUERA DE LAS COSAS DE SIEMPRE...
     * (CAMARA, ESCENA, ESTADÍSTICAS). ACÁ VA LO NUEVO!
     */
    //Luz AMbiente
	var lambiente = new THREE.AmbientLight(0xFFFFFF);
	scene.add(lambiente);


    

    //SUELOS
    var geometry = new THREE.PlaneGeometry( 15000, 15000 );
    var material = new THREE.MeshBasicMaterial( {
        map: THREE.ImageUtils.loadTexture('assets/textures/pi.png'),
        side: THREE.DoubleSide
    } );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotation.set(-Math.PI/2,0,0)
    plane.position.set(0,-600,0)
    plane.receiveShadow=true;
    scene.add( plane );

    //CAJAS

    var thegeometryBox = new THREE.BoxGeometry(1000,1000,1000);
    var boxmaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('assets/textures/box.png') 
    });
    var boxdesmaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('assets/textures/box1.png') 
    });

//Destruibles 

    //Fila 2
    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 6000;
    box.position.z += 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 6000;
    box.position.z -= 1000;
    scene.add(box);

    //Fila 4
    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 4000;
    box.position.z += 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 4000;
    box.position.z += 4000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 4000;
    box.position.z -= 4000;
    scene.add(box);

    //Fila 5
    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 3000;
    box.position.z -= 4000;
    scene.add(box);
    
    //Fila 6
    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 2000;
    box.position.z += 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 2000;
    box.position.z -= 1000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 2000;
    box.position.z -= 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 2000;
    box.position.z -= 7000;
    scene.add(box);

    //fila 7

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 1000;
    box.position.z += 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x += 1000;
    box.position.z -= 6000;
    scene.add(box);

    //fila 8

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.z += 6000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.z += 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.z += 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.z -= 6000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.z -= 4000;
    scene.add(box);

    //fila 9    

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 1000;
    box.position.z -= 1000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 1000;
    box.position.z -= 3000;
    scene.add(box);

    //fila 10 

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 2000;
    box.position.z += 6000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 2000;
    box.position.z += 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 2000;
    box.position.z += 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 2000;
    box.position.z += 1000;
    scene.add(box);

    //fila 11 

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 3000;
    box.position.z -= 2000;
    scene.add(box);

    
    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 3000;
    box.position.z -= 6000;
    scene.add(box);

    //fila 12

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 4000;
    box.position.z += 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 4000;
    box.position.z -= 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 4000;
    box.position.z -= 4000;
    scene.add(box);

    //fila 13

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 5000;
    box.position.z += 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 5000;
    box.position.z -= 4000;
    scene.add(box);

    //fila 14

    var box = new THREE.Mesh(thegeometryBox,boxdesmaterial);
    box.position.x -= 6000;
    box.position.z -= 2000;
    scene.add(box);





//Paredes

    //Fila 1
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 7000;
    box.position.z += 7000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 7000;
    box.position.z += 5000;
    scene.add(box);
    
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 7000;
    box.position.z += 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 7000;
    box.position.z += 1000;
    scene.add(box);
    
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 7000;
    scene.add(box);
    
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 7000;
    box.position.z -= 1000;
    scene.add(box);
    
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 7000;
    box.position.z -= 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 7000;
    box.position.z -= 7000;
    scene.add(box);

    //Fila 2 
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 6000;
    box.position.z += 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 6000;
    box.position.z -= 5000;
    scene.add(box);

    //Fila 3 
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 5000;
    box.position.z += 7000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 5000;
    box.position.z += 6000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 5000;
    box.position.z += 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 5000;
    box.position.z += 1000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 5000;
    box.position.z -= 1000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 5000;
    box.position.z -= 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 5000;
    box.position.z -= 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 5000;
    box.position.z -= 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 5000;
    box.position.z -= 7000;
    scene.add(box);

    //fila4

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 4000;
    box.position.z += 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 4000;
    box.position.z += 1000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 4000;
    box.position.z -= 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 4000;
    box.position.z -= 7000;
    scene.add(box);

    //fila5

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 3000;
    box.position.z += 6000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 3000;
    box.position.z += 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 3000;
    box.position.z += 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 3000;
    box.position.z += 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 3000;
    box.position.z += 1000;
    scene.add(box);


    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 3000;
    scene.add(box);


    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 3000;
    box.position.z -= 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 3000;
    box.position.z -= 3000;
    scene.add(box);

    //fila6

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 2000;
    box.position.z += 6000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 2000;
    box.position.z -= 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 2000;
    box.position.z -= 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 2000;
    box.position.z -= 6000;
    scene.add(box);

    //fila7

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 1000;
    box.position.z += 7000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 1000;
    box.position.z += 6000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 1000;
    box.position.z += 4000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 1000;
    box.position.z += 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 1000;
    box.position.z += 1000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 1000;
    box.position.z -= 1000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x += 1000;
    box.position.z -= 3000;
    scene.add(box);

    //fila8

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.z += 1000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.z -= 1000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.z -= 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.z -= 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.z -= 7000;
    scene.add(box);

    //fila9

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 1000;
    box.position.z += 6000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 1000;
    box.position.z += 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 1000;
    box.position.z += 4000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 1000;
    box.position.z += 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 1000;
    box.position.z += 1000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 1000;
    box.position.z -= 5000;
    scene.add(box);

    //fila10

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 2000;
    box.position.z -= 1000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 2000;
    box.position.z -= 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 2000;
    box.position.z -= 4000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 2000;
    box.position.z -= 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 2000;
    box.position.z -= 7000;
    scene.add(box);

    //fila11

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 3000;
    box.position.z += 7000;
    scene.add(box);

    
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 3000;
    box.position.z += 5000;
    scene.add(box);

    
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 3000;
    box.position.z += 4000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 3000;
    box.position.z += 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 3000;
    box.position.z -= 1000;
    scene.add(box);
    
    //fila12

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 4000;
    box.position.z += 7000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 4000;
    box.position.z += 2000;
    scene.add(box);
    
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 4000;
    box.position.z -= 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 4000;
    box.position.z -= 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 4000;
    box.position.z -= 6000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 4000;
    box.position.z -= 7000;
    scene.add(box);

    //fila13

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 5000;
    box.position.z += 7000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 5000;
    box.position.z += 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 5000;
    box.position.z += 4000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 5000;
    box.position.z -= 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 5000;
    box.position.z -= 3000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 5000;
    box.position.z -= 7000;
    scene.add(box);

    //fila14

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 6000;
    box.position.z += 4000;
    scene.add(box);
    
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 6000;
    box.position.z += 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 6000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 6000;
    box.position.z -= 5000;
    scene.add(box);

    //fila15

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 7000;
    box.position.z += 6000;
    scene.add(box);
    
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 7000;
    box.position.z += 4000;
    scene.add(box);

    
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 7000;
    box.position.z += 3000;
    scene.add(box);

    
    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 7000;
    box.position.z += 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 7000;
    box.position.z -= 2000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 7000;
    box.position.z -= 4000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 7000;
    box.position.z -= 5000;
    scene.add(box);

    var box = new THREE.Mesh(thegeometryBox,boxmaterial);
    box.position.x -= 7000;
    box.position.z -= 7000;
    scene.add(box);


    
    
    








    





















}

/**
 * Function to render application over
 * and over.
 */
function animateScene() {
    requestAnimationFrame(animateScene);
    renderer.render(scene, cameras.current);
    updateScene();
}

/**
 * Function to evaluate logic over and
 * over again.
 */
function updateScene() {
    lastTime = Date.now();

    //Updating camera view by control inputs
    cameraControl.update();
    //Updating stats
    stats.update();

    //Updating labels in scene to look at selected camera
    for (const label of Object.keys(labels)) {
        labels[label].lookAt(cameras.current.position);
    }

}

function onWindowResize() {
    cameras.current.aspect = window.innerWidth / window.innerHeight;
    cameras.current.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}