class Light {

    constructor( radius, scene, aditionalParams) {

        this.radius = radius;
        this.scene = scene;
        this.light = new THREE.SpotLight( 0xffffff, 0.5 );

        //Additional params 
        let ap = aditionalParams;
        if("intensity" in ap){
            this.intensity = (ap.intensity <= 10) ? ap.intensity : 1;
        }else{
            this.intensity = 1;
        }

        if("color" in ap){
            this.color = new THREE.Color(ap.color);
        }else{
            this.color = new THREE.Color(0xffffff);
        }

        if("castShadow" in ap){
            this.castShadow = (ap.castShadow == true) ? ap.castShadow : false;
        }else{
            this.castShadow = false;
        }

        if("distance" in ap){
            this.distance = (ap.distance <= 1000) ? ap.distance : 100;
        }else{
            this.distance = 100;
        }

        if("decay" in ap){
            this.decay = (ap.decay <= 1) ? ap.decay : 1;
        }else{
            this.decay = 1;
        }

        this.position = ("position" in ap) ?
            new THREE.Vector3(ap.position.x, ap.position.y, ap.position.z) :
            new THREE.Vector3(0, 0, 0);

        if ("debug" in ap) {
            if (ap.debug) {
                this.debugMode();
            }
        }

        this.light.position.set(this.position.x, 100+this.position.y, this.position.z);
        this.light.distance=this.distance;
        this.light.castShadow=this.castShadow;
        this.light.intensity=this.intensity;
        this.light.decay=this.decay;
        this.light.color=this.color;
    }

    debugMode = function () {
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(2, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                wireframe: true
            })
        );
        this.mesh.position.set(this.position.x, this.position.y, this.position.z)
        this.scene.add(this.mesh);
        this.scene.add( this.light );
    }

    play(){
        /*this.audio.play().catch(function(e) {
            console.log(e);
        });*/
    }

    update (element) {
        var distance = this.position.distanceTo(element.position);

        let intesidad = (distance <= this.radius) ? this.intensity * (1 - distance / this.radius) : 0;
        if (intesidad>0){
            this.light.intensity = this.intensity;
        }else{
            this.light.intensity = 0;
        }
        this.light.target=this.mesh;
    }
}