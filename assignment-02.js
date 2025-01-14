
//keep track of the order of flashed buttons 
let order = [];
//keep track of the order the player is pressing the buttons
let playerOrder = [];
//records the amount of sequences of flashes 
let count=0; 
//Stores random numbers
let circles = 0;
//setting an Interval which will determine how long the game will run
let interval
//the amount of the interval
let length = 800;
//timer
let time;
//Record buttons the player is pressing 
let press;
//for when the game is running
let playing = false;
//stores the score from the previous game 
var prog = 0; 
//Stores the player's highest score
var high = 0
//If the sequence is running player can't press any of the buttons
let sequenceRunning = true;
//
let count2 = 0;

//referencing html elements in the javaScript
var startButton = document.querySelector("#start");
var greenCircle = document.querySelector("#green-circle");
var redCircle = document.querySelector("#red-circle");
var yellowCircle = document.querySelector("#yellow-circle");
var blueCircle = document.querySelector("#blue-circle");
var gameIndicator = document.querySelector("#game-indicator");
var progress = document.querySelector("#progress");
var highscore = document.querySelector("#highscore");

//Start button will turn the game-indicator green
function start(){
    gameIndicator.style.background = "linear-gradient(to top right, #7CFC00 30%, white)";
    // alert("LET'S BEGIN!");

    if(playing == false)//if the game is not turned on 
    {
        playing = true; //turn the game on

        //everything will be empty/restarted
        progress = 0;
        length = 800;
        order = [];

        //The game function is called after 3 seconds
        setTimeout(() =>
        {
            game();
        }
        ,3000)
    }
    else 
    {
        alert("Start was already pressed!")
    }
}

//Game begins
function game()
{
    //Generates a random number from 0 to 3 (java starts from 0)
    circles = Math.floor(Math.random()*4);

    //pushes circles onto the array 'order'
    order.push(circles)

    count = 0;

    sequenceRunning = true; 

    length = 800; 

    //The game speeds up 
    interval = setInterval(() =>
    {
        if(count == 5|count == 9|count == 13)
        {
            length = length - 200;
        }
        flashes(order[count])
        count++;

        if(count >= order.length)
        {
            sequenceRunning = false; 
            //stops the loop
            clearInterval(interval);
            playerOrder = [];//playerOrder resets
            timer();

        }

    }, length);
}

function flashes(circles)
{
    //flashes
    if(circles  == 0)
    {
        greenCircle.style.background  = "linear-gradient(to top right, white 30%, white)";
    }
    else if(circles  == 1)
    {
        redCircle.style.background  = "linear-gradient(to top right, white 30%, white)";
    }
    else if(circles  == 2)
    {
        yellowCircle.style.background  = "linear-gradient(to top right, white 30%, white)";
    }
    else if(circles  == 3)
    {
        blueCircle.style.background  = "linear-gradient(to top right, white 30%, white)";
    }

    //blinks the buttons
    //setTimeout = carries the function after stated time
    setTimeout(() =>
    {
        greenCircle.style.background  = "";
        
        redCircle.style.background  = "";

        yellowCircle.style.background  = "";

        blueCircle.style.background  = "";
    }
    ,250)
}

//Takes into account the buttons the player has pressed
//Taken from html
function input(press)
{   
    if(sequenceRunning == false)
    {
        //press gets added into the array playerOrder
        playerOrder.push(press);

        clearTimeout(time);

        timer();

        if(playerOrder.length == order.length)
        {
            //if the player has all the buttons pressed correctly
            if(JSON.stringify(playerOrder) === JSON.stringify(order))
            {
                //the progress points go up 
                prog = prog + 1;
                game();//game does another round
                playerOrder = [];//player order resets

                clearTimeout(time);

            }
            else
            {
                gameOver();

            }
        }
    }
}

//for when the player loses
function gameOver()
{
    clearTimeout(time);
    alert("GAME OVER!");
    gameIndicator.style.background = "";
    order = [];
    playerOrder = [];
    count=0; 
    circles = 0;
    playing = false;
    
    document.getElementById("progress").innerHTML = "0" + prog;

    if(prog > high)
    {
        high = prog; 
        document.getElementById("highscore").innerHTML = "0" + prog;
    }

    prog = 0;

    count2 = 0;

    //buttons flash 5 times after losing the game 
    let interval2 = setInterval(() =>
    {
        if(count2 >= 5)
        { 
            clearInterval(interval2);

        }

        flashes(0);
        flashes(1);
        flashes(2);
        flashes(3);

        count2++;
    }, 400); 
}

//how long you can take when pressing buttons
function timer()
{
        time = setTimeout(() =>
        {
            gameOver();

        }, 5000)

}

