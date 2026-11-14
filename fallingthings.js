//defining a constant variable of the bad objects with the path to each image
//makinng these variables accessible to every function
const badObjects = [
    "./assets/enemies/burntCroissant.png", "./assets/enemies/knife.png", "./assets/enemies/moldyCake.png"
];

//defining a constant variable of the good objects with the path to each image

const goodObjects = [
    "./assets/pastries/bolaBerlim.png",  "./assets/pastries/boloArroz.png", "./assets/pastries/milFolhas.png", 
    "./assets/pastries/salameChocolate.png", "./assets/pastries/sparklyPastelNata.png", "./assets/pastries/tarteAmendoa.png",
    "./assets/pastries/travesseiroSintra.png"
];




//will create a parent class of the falling objects

class FallingObjects{
    constructor(){
        //which screen these objects will appear, create a div element, set the direction where the objects will appear from, the dimensions of the objs
        this.gameScreen = document.getElementById("gameScreen");
        this.element = document.createElement("div");
        this.width = 80;
        this.height = 200;
        this.x = Math.floor(Math.random()*(this.gameScreen.offsetWidth - this.width));
        this.y = 0;
     

        //randomly selecting the type of object and the image
        
        const randomObjType = Math.round(Math.random());

        if(randomObjType === 0){
        const randomBadObjIndex = Math.floor(Math.random() * badObjects.length);
        this.image = badObjects[randomBadObjIndex];
    
        }else{
        const randomGoodObjIndex = Math.floor(Math.random() * goodObjects.length);
        this.image = goodObjects[randomGoodObjIndex];
        }

        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.backgroundImage = `url("${this.image}")`;
        this.element.style.backgroundPosition = "center";
        this.element.style.backgroundSize = "contain";
        this.element.style.backgroundRepeat = "no-repeat";

        // 7. Add the object to the game screen
        this.gameScreen.appendChild(this.element);

    }


    moveObjects(){
        this.y +=10;
        this.element.style.top = `${this.y}px`;
    }
}