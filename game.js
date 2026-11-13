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
        this.gameScreen.style.display = "block"
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