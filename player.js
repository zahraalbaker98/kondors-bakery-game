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


    }
