let rightPressed = false;
let leftPressed = false;

class Game{
    constructor() {
        //to make it easy to switch from screen to screen
        this.startScreen = document.getElementById("startScreen");
        this.gameScreen = document.getElementById("gameScreen");
        this.winnerScreen = document.getElementById("winnerScreen");
        this.loseScreen = document.getElementById("loseScreen");

        //new game = new player, discard the old play, giving it 3 lives and a score of 0 and empty array for the falling objects
        this.lives = 3;
        this.score = 0;
        this.burntPastryCount = 0;
        this.fallingObjects = [];

    }

    //now adding the methods
    startGame(){
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.player = new Player();


        //setting an interval and making an objects fall every 2 seconds
        this.fallingObjectsInterval = setInterval(() => {
            this.createFallingObjects()
        }, 2000)

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
                    this.gameOver();
                }
                else if (currentObject.image === "./assets/enemies/moldyCake.png"){
                    this.lives -= 1;
                    if (this.lives <= 0){
                        this.gameOver();
                    }
                }
                else if(currentObject.image === "./assets/enemies/burntCroissant.png"){
                    this.burntPastryCount += 1;
                    if(this.burntPastryCount >= 5){
                        this.lives = 0;
                        this.gameOver();
                    }
                }
                //now we are doing the goodobjects
                else if (goodObjects.includes(currentObject.image)){
                    if(currentObject.image !== "./assets/pastries/sparklyPastelNata.png"){
                        this.score += 1;
                    } else {
                        this.score += 5;
                }
            }
            //remove the object after the collison
            currentObject.element.remove();
            this.fallingObjects.splice(i,1);
            i--;
        }
    }

}

//define gameOver method

    gameOver(){
        clearInterval(this.fallingObjectsInterval);
        clearInterval(this.gameLoopInterval);
        this.gameScreen.style.display = "none";
        this.loseScreen.style.display = "block";
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
