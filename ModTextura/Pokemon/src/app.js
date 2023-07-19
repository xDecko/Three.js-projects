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
    cameras.default = new THREE.PerspectiveCamera(1, canvas.container.clientWidth / canvas.container.clientHeight, 0.1, 100000);
    cameras.default.position.set(0, 0, 60000);
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
	//plano (La que vamos a mapear)
	var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('assets/textures/tileexample.png'),
        //color: 0xc0e847,
        //wireframe: true
	});

    //Arreglo de coordenadas para mapeado UV
    var UV = {//480*256
        lago: [
            new THREE.Vector2(48/480,112/256),
            new THREE.Vector2(48/480,64/256),
            new THREE.Vector2(96/480,64/256),
            new THREE.Vector2(96/480,112/256)

        ],
        flores: [
            new THREE.Vector2(96/480,112/256),
            new THREE.Vector2(96/480,64/256),
            new THREE.Vector2(143/480,64/256),
            new THREE.Vector2(143/480,112/256)

        ],
        tronco: [
            new THREE.Vector2(368/480,128/256),
            new THREE.Vector2(368/480,96/256),
            new THREE.Vector2(416/480,96/256),
            new THREE.Vector2(416/480,128/256)

        ],
        arbol1: [
            new THREE.Vector2(417/480,193/256),
            new THREE.Vector2(417/480,129/256),
            new THREE.Vector2(480/480,129/256),
            new THREE.Vector2(480/480,193/256)

        ],
        arbol2: [
            new THREE.Vector2(417/480,256/256),
            new THREE.Vector2(417/480,193/256),
            new THREE.Vector2(480/480,193/256),
            new THREE.Vector2(480/480,256/256)

        ],
        baseCasa: [
            new THREE.Vector2(192/480,32/256),
            new THREE.Vector2(192/480,0/256),
            new THREE.Vector2(272/480,0/256),
            new THREE.Vector2(272/480,32/256)

        ],
        casaAzul: [
            new THREE.Vector2(192/480,79/256),
            new THREE.Vector2(192/480,32/256),
            new THREE.Vector2(272/480,32/256),
            new THREE.Vector2(272/480,79/256)

        ],
        techoAzul: [
            new THREE.Vector2(400/480,31/512),
            new THREE.Vector2(400/480,0/256),
            new THREE.Vector2(480/480,0/256),
            new THREE.Vector2(480/480,31/512)

        ],
        casaRojo: [
            new THREE.Vector2(224/480,383/512),
            new THREE.Vector2(224/480,145/256),
            new THREE.Vector2(304/480,145/256),
            new THREE.Vector2(304/480,383/512)

        ],
        techoRojo: [
            new THREE.Vector2(400/480,63/512),
            new THREE.Vector2(400/480,33/512),
            new THREE.Vector2(480/480,33/512),
            new THREE.Vector2(480/480,63/512)

        ],
        muro: [
            new THREE.Vector2(194/480,287/512),
            new THREE.Vector2(194/480,113/256),
            new THREE.Vector2(221/480,113/256),
            new THREE.Vector2(221/480,287/512)

        ],
        cueva1: [
            new THREE.Vector2(290/480,32/256),
            new THREE.Vector2(290/480,0/256),
            new THREE.Vector2(336/480,0/256),
            new THREE.Vector2(336/480,32/256)

        ],
        cueva2: [
            new THREE.Vector2(336/480,32/256),
            new THREE.Vector2(336/480,0/256),
            new THREE.Vector2(384/480,0/256),
            new THREE.Vector2(384/480,32/256)

        ],
        cueva3: [
            new THREE.Vector2(290/480,64/256),
            new THREE.Vector2(290/480,32/256),
            new THREE.Vector2(336/480,32/256),
            new THREE.Vector2(336/480,64/256)

        ],
        cueva4: [
            new THREE.Vector2(336/480,64/256),
            new THREE.Vector2(336/480,32/256),
            new THREE.Vector2(384/480,32/256),
            new THREE.Vector2(384/480,64/256)

        ],
        vallaPiedra: [
            new THREE.Vector2(440/480,96/256),
            new THREE.Vector2(440/480,80/256),
            new THREE.Vector2(456/480,80/256),
            new THREE.Vector2(456/480,96/256)

        ],
        puertaPiedra: [
            new THREE.Vector2(400/480,80/256),
            new THREE.Vector2(400/480,65/256),
            new THREE.Vector2(432/480,65/256),
            new THREE.Vector2(432/480,80/256)

        ],
        puertaMadera: [
            new THREE.Vector2(400/480,96/256),
            new THREE.Vector2(400/480,80/256),
            new THREE.Vector2(432/480,80/256),
            new THREE.Vector2(432/480,96/256)

        ],
        letrero: [
            new THREE.Vector2(400/480,64/256),
            new THREE.Vector2(400/480,49/256),
            new THREE.Vector2(416/480,49/256),
            new THREE.Vector2(416/480,64/256)

        ],
        valla1: [
            new THREE.Vector2(385/480,48/256),
            new THREE.Vector2(385/480,32/256),
            new THREE.Vector2(400/480,32/256),
            new THREE.Vector2(400/480,48/256)

        ],
        valla2: [
            new THREE.Vector2(385/480,32/256),
            new THREE.Vector2(385/480,16/256),
            new THREE.Vector2(400/480,16/256),
            new THREE.Vector2(400/480,32/256)

        ],
        valla3: [
            new THREE.Vector2(385/480,16/256),
            new THREE.Vector2(385/480,0/256),
            new THREE.Vector2(400/480,0/256),
            new THREE.Vector2(400/480,16/256)

        ],
        campo: [
            new THREE.Vector2(336/480,239/256),
            new THREE.Vector2(336/480,193/256),
            new THREE.Vector2(384/480,193/256),
            new THREE.Vector2(384/480,239/256)

        ],
        rocas: [
            new THREE.Vector2(273/480,79/256),
            new THREE.Vector2(273/480,0/256),
            new THREE.Vector2(288/480,0/256),
            new THREE.Vector2(288/480,79/256)

        ],
        planta: [
            new THREE.Vector2(256/480,209/256),
            new THREE.Vector2(256/480,193/256),
            new THREE.Vector2(272/480,193/256),
            new THREE.Vector2(272/480,209/256)

        ],
        camino: [
            new THREE.Vector2(289/480,143/256),
            new THREE.Vector2(289/480,129/256),
            new THREE.Vector2(384/480,129/256),
            new THREE.Vector2(384/480,143/256)

        ]
    }

	var geometria = new THREE.PlaneGeometry(240,80);
    //Mapeo de las texturas sobre las caras
	geometria.faceVertexUvs[0] = [];
	geometria.faceVertexUvs[0][0] = [
		UV.lago[0],
		UV.lago[1],
		UV.lago[3]
	]
	geometria.faceVertexUvs[0][1] = [
		UV.lago[1],
		UV.lago[2],
		UV.lago[3]
	]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(-350,-460,0);
    scene.add(plano);

    for (i=0;i<4;i++){
        var geometria = new THREE.PlaneGeometry(190,40);
        //Mapeo de las texturas sobre las caras
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.camino[0],
            UV.camino[1],
            UV.camino[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.camino[1],
            UV.camino[2],
            UV.camino[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set((i*190)-135,-480,0);
        scene.add(plano);
    }

    for (i=0;i<3;i++){
        var geometria = new THREE.PlaneGeometry(80,40);
        //Mapeo de las texturas sobre las caras
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.puertaPiedra[0],
            UV.puertaPiedra[1],
            UV.puertaPiedra[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.puertaPiedra[1],
            UV.puertaPiedra[2],
            UV.puertaPiedra[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set((i*120)-430,-400,0);
        scene.add(plano);
    }

    var geometria = new THREE.PlaneGeometry(40,40);
    //Mapeo de las texturas sobre las caras
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.vallaPiedra[0],
        UV.vallaPiedra[1],
        UV.vallaPiedra[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.vallaPiedra[1],
        UV.vallaPiedra[2],
        UV.vallaPiedra[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(-170,-440,0);
    scene.add(plano);

    var geometria = new THREE.PlaneGeometry(40,40);
    //valla mad
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.valla2[0],
        UV.valla2[1],
        UV.valla2[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.valla2[1],
        UV.valla2[2],
        UV.valla2[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(-130,-440,0);
    scene.add(plano);

    


    var geometria = new THREE.PlaneGeometry(40,40);
    //letrero
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.letrero[0],
        UV.letrero[1],
        UV.letrero[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.letrero[1],
        UV.letrero[2],
        UV.letrero[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(430,-360,0);
    scene.add(plano);

    

    var geometria = new THREE.PlaneGeometry(40,240);
    //rocas
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.rocas[0],
        UV.rocas[1],
        UV.rocas[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.rocas[1],
        UV.rocas[2],
        UV.rocas[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(-410,-100,0);
    scene.add(plano);


    var geometria = new THREE.PlaneGeometry(160,160);
    //flores
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.flores[0],
        UV.flores[1],
        UV.flores[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.flores[1],
        UV.flores[2],
        UV.flores[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(-30,-220,0);
    scene.add(plano);

    var geometria = new THREE.PlaneGeometry(160,160);
    //arbol 2
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.arbol2[0],
        UV.arbol2[1],
        UV.arbol2[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.arbol2[1],
        UV.arbol2[2],
        UV.arbol2[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(-270,-140,0);
    scene.add(plano);


    for (i=0;i<4;i++){
        var geometria = new THREE.PlaneGeometry(80,80);
        //muro
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.muro[0],
            UV.muro[1],
            UV.muro[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.muro[1],
            UV.muro[2],
            UV.muro[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set((i*80)-270,420,0);
        scene.add(plano);
    }

    for (i=0;i<2;i++){
        var geometria = new THREE.PlaneGeometry(80,80);
        //muro
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.muro[0],
            UV.muro[1],
            UV.muro[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.muro[1],
            UV.muro[2],
            UV.muro[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set((i*80)+170,420,0);
        scene.add(plano);
        
    }

    var geometria = new THREE.PlaneGeometry(120,80);
    //cueva 4
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.cueva4[0],
        UV.cueva4[1],
        UV.cueva4[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.cueva4[1],
        UV.cueva4[2],
        UV.cueva4[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(70,420,0);
    scene.add(plano);

    var geometria = new THREE.PlaneGeometry(120,80);
    //cueva 3
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.cueva3[0],
        UV.cueva3[1],
        UV.cueva3[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.cueva3[1],
        UV.cueva3[2],
        UV.cueva3[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(-370,420,0);
    scene.add(plano);


    var geometria = new THREE.PlaneGeometry(120,80);
    //cueva 2
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.cueva2[0],
        UV.cueva2[1],
        UV.cueva2[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.cueva2[1],
        UV.cueva2[2],
        UV.cueva2[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(350,420,0);
    scene.add(plano);

    var geometria = new THREE.PlaneGeometry(120,80);
    //cueva 1
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.cueva1[0],
        UV.cueva1[1],
        UV.cueva1[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.cueva1[1],
        UV.cueva1[2],
        UV.cueva1[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(470,420,0);
    scene.add(plano);

    var geometria = new THREE.PlaneGeometry(120,80);
    //tronco
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.tronco[0],
        UV.tronco[1],
        UV.tronco[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.tronco[1],
        UV.tronco[2],
        UV.tronco[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(230,220,0);
    scene.add(plano);

    for (i=0;i<2;i++){
        var geometria = new THREE.PlaneGeometry(160,160);
        //arbol 1
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.arbol1[0],
            UV.arbol1[1],
            UV.arbol1[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.arbol1[1],
            UV.arbol1[2],
            UV.arbol1[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set((i*360)+50,220,0);
        scene.add(plano);
    }

    for (i=0;i<5;i++){
        var geometria = new THREE.PlaneGeometry(40,40);
        //valla madera basica izq
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.valla1[0],
            UV.valla1[1],
            UV.valla1[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.valla1[1],
            UV.valla1[2],
            UV.valla1[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set((i*40)+30,-440,0);
        scene.add(plano);
    }
    for (i=0;i<4;i++){
        var geometria = new THREE.PlaneGeometry(40,40);
        //planta arriba iz
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.planta[0],
            UV.planta[1],
            UV.planta[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.planta[1],
            UV.planta[2],
            UV.planta[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set(-410,(i*80)+80,0);
        scene.add(plano);
    }

    for (i=0;i<4;i++){
        var geometria = new THREE.PlaneGeometry(40,40);
        //planta arriba der
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.planta[0],
            UV.planta[1],
            UV.planta[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.planta[1],
            UV.planta[2],
            UV.planta[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set(-50,(i*80)+80,0);
        scene.add(plano);
    }
    
    for (i=0;i<4;i++){
        var geometria = new THREE.PlaneGeometry(40,40);
        //planta
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.planta[0],
            UV.planta[1],
            UV.planta[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.planta[1],
            UV.planta[2],
            UV.planta[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set(110,(i*80)-400,0);
        scene.add(plano);
    }
    for (i=0;i<4;i++){
        var geometria = new THREE.PlaneGeometry(40,40);
        //planta derecha abajo
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.planta[0],
            UV.planta[1],
            UV.planta[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.planta[1],
            UV.planta[2],
            UV.planta[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set(470,(i*80)-400,0);
        scene.add(plano);
    }

    for (i=0;i<2;i++){
        var geometria = new THREE.PlaneGeometry(40,40);
        //vaya piedra rz
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.vallaPiedra[0],
            UV.vallaPiedra[1],
            UV.vallaPiedra[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.vallaPiedra[1],
            UV.vallaPiedra[2],
            UV.vallaPiedra[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set(110,(i*160)-120,0);
        scene.add(plano);
    }

    for (i=0;i<2;i++){
        var geometria = new THREE.PlaneGeometry(40,40);
        //vaya piedra de
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.vallaPiedra[0],
            UV.vallaPiedra[1],
            UV.vallaPiedra[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.vallaPiedra[1],
            UV.vallaPiedra[2],
            UV.vallaPiedra[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set(470,(i*160)-120,0);
        scene.add(plano);
    }


    for (i=0;i<2;i++){
        var geometria = new THREE.PlaneGeometry(80,40);
        //vaya metal
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.puertaPiedra[0],
            UV.puertaPiedra[1],
            UV.puertaPiedra[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.puertaPiedra[1],
            UV.puertaPiedra[2],
            UV.puertaPiedra[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set((i*160)+210,40,0);
        scene.add(plano);
    }

    for (i=0;i<2;i++){
        var geometria = new THREE.PlaneGeometry(40,40);
        //valla puerta casa
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.valla3[0],
            UV.valla3[1],
            UV.valla3[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.valla3[1],
            UV.valla3[2],
            UV.valla3[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set((i*120)+230,-440,0);
        scene.add(plano);
    }

    for (i=0;i<4;i++){
        var geometria = new THREE.PlaneGeometry(40,40);
        //valla madera basica
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.valla1[0],
            UV.valla1[1],
            UV.valla1[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.valla1[1],
            UV.valla1[2],
            UV.valla1[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set((i*40)+390,-440,0);
        scene.add(plano);
    }

    var geometria = new THREE.PlaneGeometry(240,120);
    //casa base red
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.baseCasa[0],
        UV.baseCasa[1],
        UV.baseCasa[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.baseCasa[1],
        UV.baseCasa[2],
        UV.baseCasa[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(-230,120,0);
    scene.add(plano);

    var geometria = new THREE.PlaneGeometry(240,120);
    //casa media rd
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.casaRojo[0],
        UV.casaRojo[1],
        UV.casaRojo[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.casaRojo[1],
        UV.casaRojo[2],
        UV.casaRojo[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(-230,240,0);
    scene.add(plano);

    var geometria = new THREE.PlaneGeometry(240,40);
    //casa top rj
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.techoRojo[0],
        UV.techoRojo[1],
        UV.techoRojo[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.techoRojo[1],
        UV.techoRojo[2],
        UV.techoRojo[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(-230,320,0);
    scene.add(plano);

    var geometria = new THREE.PlaneGeometry(240,120);
    //casa base az
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.baseCasa[0],
        UV.baseCasa[1],
        UV.baseCasa[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.baseCasa[1],
        UV.baseCasa[2],
        UV.baseCasa[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(290,-360,0);
    scene.add(plano);

    var geometria = new THREE.PlaneGeometry(240,120);
    //casa media az
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.casaAzul[0],
        UV.casaAzul[1],
        UV.casaAzul[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.casaAzul[1],
        UV.casaAzul[2],
        UV.casaAzul[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(290,-240,0);
    scene.add(plano);

    var geometria = new THREE.PlaneGeometry(240,40);
    //casa top az
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.techoAzul[0],
        UV.techoAzul[1],
        UV.techoAzul[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.techoAzul[1],
        UV.techoAzul[2],
        UV.techoAzul[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(290,-160,0);
    scene.add(plano);

    for (i=0;i<2;i++){
        var geometria = new THREE.PlaneGeometry(120,120);
        //granja
        geometria.faceVertexUvs[0] = [];
        geometria.faceVertexUvs[0][0] = [
            UV.campo[0],
            UV.campo[1],
            UV.campo[3]
        ]
        geometria.faceVertexUvs[0][1] = [
            UV.campo[1],
            UV.campo[2],
            UV.campo[3]
        ]
        plano = new THREE.Mesh( geometria, material );
        plano.position.set((i*200)+190,-40,0);
        scene.add(plano);
    }


    var geometria = new THREE.PlaneGeometry(80,40);
    //puerta madera
    geometria.faceVertexUvs[0] = [];
    geometria.faceVertexUvs[0][0] = [
        UV.puertaMadera[0],
        UV.puertaMadera[1],
        UV.puertaMadera[3]
    ]
    geometria.faceVertexUvs[0][1] = [
        UV.puertaMadera[1],
        UV.puertaMadera[2],
        UV.puertaMadera[3]
    ]
    plano = new THREE.Mesh( geometria, material );
    plano.position.set(-30,-440,0);
    scene.add(plano);

    var geometry = new THREE.PlaneGeometry( 40, 40 );
    var material = new THREE.MeshBasicMaterial( {color: 0xc0e847} );
    var fondo = new THREE.Mesh( geometry, material );
    fondo.position.set(-370,-400,0);
    scene.add(fondo);
    var fondo = new THREE.Mesh( geometry, material );
    fondo.position.set(-250,-400,0);
    scene.add(fondo);
    var fondo = new THREE.Mesh( geometry, material );
    fondo.position.set(-130,-400,0);
    scene.add(fondo);

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