//creating the player by selecting the screen and creating an element to store it
class Player {
    constructor(){
        this.gameScreen = document.getElementById("gameScreen");
        this.element = document.createElement("div");
       
        this.width = 230;
        this.height = 300;

        this.x = (this.gameScreen.offsetWidth - this.width) / 2;
        this.y = this.gameScreen.offsetHeight - this.height;
        this.image = "./assets/player/playerForGameScreen_transparent.png";

        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.top = `${this.y}px`
        this.element.style.left = `${this.x}px`
        this.element.style.backgroundImage = `url("${this.image}")`
        this.element.style.backgroundPosition = `center`
        this.element.style.backgroundSize = `cover`
    
        this.gameScreen.appendChild(this.element)

    
    }
    //adding methods so that our player can move left and right
    //in this case we use the x axis (horizontal line)
    //but i don't want them to go outside of the gameScreen
    moveLeft(){
        const minLeftGameScreen = 0;
        if(this.x > minLeftGameScreen){
            this.x -= 15;
            this.element.style.left = `${this.x}px`;
        }
    }
    
    moveRight(){
        const maxRightGameScreen = this.gameScreen.offsetWidth - this.width;
        if(this.x < maxRightGameScreen){
            this.x += 15;
            this.element.style.left = `${this.x}px`;

        }
    }
    //need to add the did collide method in the player
    didCollide(object){
        //create a variable to store the size and position of the player and object, use the getBoundingClientRect to the size and the position of the element relative to the viewport
        const playerRectangle = this.element.getBoundingClientRect();
        const objectRectangle = object.element.getBoundingClientRect();

        //checking if all of following are true - our first rectangle (A) is colliding with our second rectangle (B). 
        if (
              this.x < object.x + object.width &&    
              this.x + this.width > object.x &&     
              this.y < object.y + object.height &&   
              this.y + this.height > object.y 
        ){
            //connects to my game class, where i mention the player and the didCollide method
            //true - it runs all the coditions
            //false - it doesn't because there's no need
            return true;
        }
        else{
            return false;
        }

    }


    }
