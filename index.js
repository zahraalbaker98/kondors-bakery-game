//defining the variables and selecting for all screens
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const winnerScreen = document.getElementById("winnerScreen");
const loseScreen = document.getElementById("loseScreen");

//defining the variables and select all the buttons

const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");

//defining but not assigning any value to the variable = global scope, i want to use this variable in other functions

let game;

//adding functionality to the Start Game button, I want it to take me to the Game Screen
startBtn.onclick = function(){
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
}

