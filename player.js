//creating the player by selecting the screen and creating an element to store it
class Player {
    constructor(){
        this.gameScreen = document.getElementById("gameScreen");
        this.element = document.createElement("div");
        this.x = 0;
        this.y = 50;
        this.width = 60;
        this.height = 80;
        this.image = "./assets/playerForGameScreen.png";

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
}