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
    renderer.setClearColor(0x2c3e50, 1);

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

    //Plano de muestra de textura
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(2000,3000),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('assets/textures/texture-atlas.jpg'),
            side: THREE.DoubleSide
        })
    );
    //plane.rotation.y = 0.785398;//45 grados en radianes
    plane.position.x += 1000;
    scene.add(plane);

    //UV Test Box
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(1000,1000,1000),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('assets/textures/uv_test_bw_1024.png')
        })
    );
    box.position.x -= 2500;
    scene.add(box);

	//Box (La que vamos a mapear)
	var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('assets/textures/texture-atlas.jpg'),
        //wireframe: true
	});
	var geometria = new THREE.BoxGeometry(1000,1000,1000);

    //Arreglo de coordenadas para mapeado UV
    var UV = {
        bricks: [
            new THREE.Vector2(0.0,1.0),
            new THREE.Vector2(0.0,0.66),
            new THREE.Vector2(0.5,0.66),
            new THREE.Vector2(0.5,1.0)

        ],
        clouds: [
            new THREE.Vector2(1.0,1.0),
            new THREE.Vector2(1.0,0.66),
            new THREE.Vector2(0.5,0.66),
            new THREE.Vector2(0.5,1.0)
        ],
        woodCrate: [
            new THREE.Vector2(0.0,0.66),
            new THREE.Vector2(0.0,0.33),
            new THREE.Vector2(0.5,0.33),
            new THREE.Vector2(0.5,0.66)

        ],
        stoneWall: [
            new THREE.Vector2(0.5,0.66),
            new THREE.Vector2(0.5,0.33),
            new THREE.Vector2(1.0,0.33),
            new THREE.Vector2(1.0,0.66)
        ],
        superFakeWater: [
            new THREE.Vector2(0.0,0.33),
            new THREE.Vector2(0.0,0.0),
            new THREE.Vector2(0.5,0.0),
            new THREE.Vector2(0.5,0.33)

        ],
        woodFloor: [
            new THREE.Vector2(0.5,0.33),
            new THREE.Vector2(0.5,0.0),
            new THREE.Vector2(1.0,0.0),
            new THREE.Vector2(1.0,0.33)
        ]
    }

    //Mapeo de las texturas sobre las caras
	geometria.faceVertexUvs[0] = [];
	geometria.faceVertexUvs[0][0] = [
		UV.bricks[0],
		UV.bricks[1],
		UV.bricks[3]
	];
	geometria.faceVertexUvs[0][1] = [
		UV.bricks[1],
		UV.bricks[2],
		UV.bricks[3]
	];
	geometria.faceVertexUvs[0][2] = [
		UV.stoneWall[0],
		UV.stoneWall[1],
		UV.stoneWall[3]
	];
	geometria.faceVertexUvs[0][3] = [
		UV.stoneWall[1],
		UV.stoneWall[2],
		UV.stoneWall[3]
	];
	geometria.faceVertexUvs[0][4] = [
		UV.woodFloor[0],
		UV.woodFloor[1],
		UV.woodFloor[3]
	];
	geometria.faceVertexUvs[0][5] = [
		UV.woodFloor[1],
		UV.woodFloor[2],
		UV.woodFloor[3]
	];
	geometria.faceVertexUvs[0][6] = [
		UV.superFakeWater[0],
		UV.superFakeWater[1],
		UV.superFakeWater[3]
	];
	geometria.faceVertexUvs[0][7] = [
		UV.superFakeWater[1],
		UV.superFakeWater[2],
		UV.superFakeWater[3]
	];
	geometria.faceVertexUvs[0][8] = [
		UV.clouds[0],
		UV.clouds[1],
		UV.clouds[3]
	];
	geometria.faceVertexUvs[0][9] = [
		UV.clouds[1],
		UV.clouds[2],
		UV.clouds[3]
	];
	geometria.faceVertexUvs[0][10] = [
		UV.woodCrate[0],
		UV.woodCrate[1],
		UV.woodCrate[3]
	];
	geometria.faceVertexUvs[0][11] = [
		UV.woodCrate[1],
		UV.woodCrate[2],
		UV.woodCrate[3]
	];

    box = new THREE.Mesh( geometria, material );
    box.position.x -= 1000;
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