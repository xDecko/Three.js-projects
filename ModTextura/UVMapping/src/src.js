var escena,camara,renderer;
var ultiTiempo;
var appW = window.innerWidth;
var appH = window.innerHeight;
var object;

function webGLStart(){
	iniciarEscena();
	$( window ).resize(onWindowResize);
	ultiTiempo = Date.now();
	animarEscena();
}

function iniciarEscena(){
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xBFBFBF, 1);
	renderer.setSize(appW, appH);
	document.body.appendChild(renderer.domElement);

	camara = new THREE.PerspectiveCamera(45, appW / appH, 1, 10000);
	camara.position.set(2500,2500,-2500);
	camara.lookAt(new THREE.Vector3(0,0,0));

	escena = new THREE.Scene();

	//Iniciar controles de la camara
	controlCamara = new THREE.OrbitControls( camara , renderer.domElement );

	//estadisticas
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '10px';
	stats.domElement.style.left = '10px';
	stats.domElement.style.zIndex = '100';
	document.body.appendChild(stats.domElement);

	//Luz AMbiente
	var lambiente = new THREE.AmbientLight(0xFFFFFF);
	escena.add(lambiente);

	//caja
	var material = new THREE.MeshPhongMaterial({
		map: THREE.ImageUtils.loadTexture('textures/texture-atlas.jpg')
	});
	var geometria = new THREE.BoxGeometry(1000,1000,1000);

	//Arreglo de coordenadas para mapeado UV

	var bricks = [
		new THREE.Vector2(0.0,0.66),
		new THREE.Vector2(0.5,0.66),
		new THREE.Vector2(0.5,1.0),
		new THREE.Vector2(0.0,1.0)
	];

	//Mapeo de las texturas sobre las caras
	geometria.faceVertexUvs[0] = [];

	geometria.faceVertexUvs[0][0] = [
		bricks[0],
		bricks[1],
		bricks[3]
	];
	geometria.faceVertexUvs[0][1] = [
		bricks[1],
		bricks[2],
		bricks[3]
	];



	object = new THREE.Mesh( geometria, material );
	escena.add(object);

	}

	function animarEscena(){
		requestAnimationFrame( animarEscena );
		renderEscena();
		actualizarEscena();
	}

	function renderEscena(){
		renderer.render( escena, camara );
	}

	function actualizarEscena(){
		var delta = (Date.now() - ultiTiempo)/1000;
		ultiTiempo = Date.now();
		stats.update();
		controlCamara.update();


	}
