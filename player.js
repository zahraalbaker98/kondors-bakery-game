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

        //removing the previous player, before the new player is added (like when you start a new gane when you click on the try again button)

        const oldPlayer = this.gameScreen.querySelector(".player");
        if (oldPlayer) oldPlayer.remove();
        this.element.classList.add("player");
    
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
        //trying to make the objects actually hit the drawing of the baker and not just the border
        const topPaddingPlayer = 80;

        //checking if all of following are true - our first rectangle (A) is colliding with our second rectangle (B).
        //  But I don't want the objects to be accessed through the sides that's why i added +40 and -40
        if (
            this.x + 40 < object.x + object.width &&
            this.x + this.width - 40 > object.x &&
            this.y + topPaddingPlayer < object.y + object.height &&
            this.y + topPaddingPlayer + 15 > object.y + object.height
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
