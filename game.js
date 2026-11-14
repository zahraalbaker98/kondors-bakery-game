let rightPressed = false;
let leftPressed = false;

class Game{
    constructor() {
        //to make it easy to switch from screen to screen
        this.startScreen = document.getElementById("startScreen");
        this.gameScreen = document.getElementById("gameScreen");
        this.winnerScreen = document.getElementById("winnerScreen");
        this.loseScreen = document.getElementById("loseScreen");

        //new game = new player, discard the old play, giving it 3 lives and a score of 0
        this.player = new Player();
        this.lives = 3;
        this.score = 0;
    }

    //now adding the methods
    startGame(){
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
    }

    //moves the player, calling the variables, the player and the method
    playerMovement(){
        if(rightPressed){
            this.player.moveRight();
        }
        if(leftPressed){
            this.player.moveLeft();
        }
    }
}




//button controls

const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");

let game;

//when you click on the start btn (which has an event listener),
//it will create a new game and start a game ->its using the class and the method 

startBtn.onclick = function (){
    game = new Game();
    game.startGame();
}

//adding event listeners when the key is pressed down vs when it's not pressed
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

//now adding the functionality 

function keyDownHandler(event){
    if(!game) return; //stops the function if the game hasn't started
    if (event.key === "ArrowRight"){
        rightPressed = true;  
    }
    else if (event.key === "ArrowLeft"){
        leftPressed = true;
    }
    game.playerMovement();
}

function keyUpHandler (event){
    if(event.key === "ArrowRight"){
        rightPressed = false;
    }
    else if(event.key === "ArrowLeft"){
        leftPressed = false;
    }
}

//after this, i will add on top variables for rightPressend and leftPressed
//so that the functions can use them
//thus, making it a global scope