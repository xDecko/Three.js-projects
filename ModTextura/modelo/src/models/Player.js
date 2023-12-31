class Player {

    constructor(name,element,control,ap = {}){
        this.name = name;
        this.control = control;
        this.element = element;
        this.label = this.getLabel();

        if("label" in ap){
            if(ap.label){
                this.showLabel();
            }
        }
    }

    set element(mesh){
        if(mesh instanceof THREE.Mesh){
            this._element = mesh;
        }else{
            let geometry = new THREE.SphereGeometry( 10, 10, 10 );
            let material = new THREE.MeshPhongMaterial( {color: Utilities.randomHexColor()} );
            this._element = new THREE.Mesh( geometry, material );
            this._element.castShadow=true;
        }
        this.control.element = this._element;
    }

    get element(){
        return this._element;
    }

    getLabel(){
        return Utilities.label(
            this.element.position,
            Utilities.textTure(this.name, 128, "Bold", "10px", "Arial", "0,0,0,1", 64, 50)
        )
    }

    showLabel(){
        this.element.add(this.label);
    }

    play(scene){
        scene.add(this.element);
    }
}