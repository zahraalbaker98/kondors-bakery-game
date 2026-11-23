let rightPressed = false;
let leftPressed = false;

class Game{
    constructor() {
        //to make it easy to switch from screen to screen
        this.startScreen = document.getElementById("startScreen");
        this.gameScreen = document.getElementById("gameScreen");
        this.winnerScreen = document.getElementById("winnerScreen");
        this.loseScreen = document.getElementById("loseScreen");

        //selecting the score display
        this.scoreDisplay = document.getElementById("scoreDisplay");

        //now onto selecting the burnt pastry count display
        this.burntPastryCountDisplay = document.getElementById("burntPastryCountDisplay");
        
        //selecting the lives display div 
        this.livesDisplay = document.getElementById("livesDisplay");

        //selecting the hearts class
        this.hearts = document.getElementsByClassName("heart"),

        //selecting the timer display div from html
        this.timerDisplay = document.getElementById("timerDisplay");

        //selecting the loser screen image from html, because i want different scenarios to have different game over screen images
        this.loseScreenImage = document.getElementById("loseScreenImage")

        //selecting the winner final score display from html
        this.winnerFinalScoreDisplay = document.getElementById("winnerFinalScoreDisplay");

        //selecting the loser final score display from html
        this.loseFinalScoreDisplay = document.getElementById("loseFinalScoreDisplay");


        //giving it 3 lives, adding a timer,  a score of 0, 0 for burnt pastries and empty array for the falling objects
        this.lives = 3;
        this.timeRemaining = 60;
        this.score = 0;
        this.burntPastryCount = 0;
        this.fallingObjects = [];

    }

    //now adding the methods
    startGame(){
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.loseScreen.style.display = "none";
        this.winnerScreen.style.display = "none";

        Array.from(this.hearts).forEach(heart => {
            heart.style.visibility = "visible";
        });

        this.player = new Player();

         this.updateScore();
         this.updateBurntPastryCount();
         this.updateTimer();

        //adding a countdown timer, so it goes from 01:00 to 00:00
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            if(this.timeRemaining === 0){
                this.gameWon()
            }
            this.updateTimer();
        }, 1000);


        //setting an interval and making an objects fall every 1.5 seconds
        this.fallingObjectsInterval = setInterval(() => {
            this.createFallingObjects()
        }, 1500)

        //another interval to make the objects move down, calling the method of moveObjects() and setting the speed at which the objects fall
        //also adding the player movement, this makes the movement for smooth
        //added the verify collision method
        this.gameLoopInterval = setInterval(() => {
            this.moveObjects();
            this.playerMovement();
            this.verifyCollision()

        }, 30);

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

    //creating a variable for a new falling object, the constructor of the class FallingObjects runs -> selects a random image and puts it on the game screen
    //all the objects are added to the end of the new variable
    createFallingObjects(){
        const newObject =  new FallingObjects();
        this.fallingObjects.push(newObject);
    }

    //calling the method+ accessing every object in the the fallingobjects array
    moveObjects(){
        this.fallingObjects.forEach((object) => {
            object.moveObjects()
        });
    }

    //verify the collisions with badObjects and goodObjects
    //first open a general loop that goes over every pastry and enemy and see if the current one has collided with the player

    verifyCollision(){
        for (let i = 0; i < this.fallingObjects.length; i++) {
            let currentObject = this.fallingObjects[i];

            if(this.player.didCollide(currentObject)){

                if(currentObject.image === "./assets/enemies/knife.png"){
                    this.lives = 0;
                    this.gameOver("knife");
                }
                else if (currentObject.image === "./assets/enemies/moldyCake.png"){
                    this.lives -= 1;
                    //make the heart in the right hidden
                    this.hearts[this.lives].style.visibility = "hidden";

                    if (this.lives <= 0){
                        this.gameOver("moldyCake");
                    }
                }
                else if(currentObject.image === "./assets/enemies/burntCroissant.png"){
                    this.burntPastryCount += 1;

                    //calling the method to update the burnt pastry count

                    this.updateBurntPastryCount();

                    if(this.burntPastryCount >= 5){
                        this.lives = 0;
                        this.gameOver("burntPastry");
                    }
                }
                //now we are doing the goodobjects
                else if (goodObjects.includes(currentObject.image)){
                    if(currentObject.image !== "./assets/pastries/sparklyPastelNata.png"){
                        this.score += 1;
                    } else {
                        this.score += 5;
                }
                //calling the method to update the score
                this.updateScore();
            }
            //remove the object after the collison
            currentObject.element.remove();
            this.fallingObjects.splice(i,1);
            i--;
        }
    }

}

//defining the method that will update the score in html

    updateScore(){
        this.scoreDisplay.innerText = `Score: ${this.score}`
    }


//defining a method that will do a countdown for our method
    updateTimer(){
        const minutes = Math.floor(this.timeRemaining / 60)
            .toString()
            .padStart(2, "0");

        const seconds = (this.timeRemaining % 60) // using the modulos operator to get the remaining seconds
            .toString()
            .padStart(2, "0");


        this.timerDisplay.innerText = `${minutes}:${seconds}`;
    }
//defining the method that will update the burnt pastry count in html

    updateBurntPastryCount(){
        this.burntPastryCountDisplay.innerText = `Burnt Pastries: ${this.burntPastryCount} out of 5`;
    }


//define gameOver method

    gameOver(reason){

        if (reason === "knife") {
            this.loseScreenImage.src = "./assets/background/gameOverKnife.jpeg";
            this.loseScreenImage.style.display = "block";
        } 
        else if (reason === "moldyCake"){
            this.loseScreenImage.src = "./assets/background/gameOverScreenMoldyCake.png";
            this.loseScreenImage.style.display = "block";
        }
        else {
            this.loseScreenImage.src = "./assets/background/gameOverBurntPastries.png";
            this.loseScreenImage.style.display = "block";
        }

        clearInterval(this.fallingObjectsInterval);
        clearInterval(this.gameLoopInterval);
        clearInterval(this.timerInterval);

        //adding the final lose score
        this.loseFinalScoreDisplay.innerText = `Final Score: ${this.score}`;

        this.gameScreen.style.display = "none";
        this.loseScreen.style.display = "block";
    }

    //define method for when the player wins

    gameWon() {
        clearInterval(this.fallingObjectsInterval);
        clearInterval(this.gameLoopInterval);
        clearInterval(this.timerInterval);

        //adding the final winner score
         this.winnerFinalScoreDisplay.innerText = `Final Score: ${this.score}`;

        this.gameScreen.style.display = "none";
        this.winnerScreen.style.display = "block";
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

//when you click on the playAgain button, it will start a new game
playAgainBtn.onclick = function (){
    game = new Game();
    game.startGame();
}

//when you click on the try again button, it will start a new game
tryAgainBtn. onclick = function (){
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
