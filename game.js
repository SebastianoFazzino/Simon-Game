// empty array list representing the game's pattern
var gamePattern = [];
// empty array list representing the player's pattern
var userClickedPattern = [];

// array of four elements representing the four game's buttons
var buttonColours = ["red", "blue", "green", "yellow"];

// keeps track wheter or not the game has started
var gameStarted = false;

// keeps track of the level
var level = 0;

// on the first keypress, the game starts
$(document).keydown(function () {
    if (!gameStarted) {
        setTimeout(function () {
            nextSequence();
            gameStarted = true;
        }, 700);
    }
})

// function called to start the game
function nextSequence() {
    userClickedPattern = [];
    //we increase the level everytime nextSequence is called
    level++;
    // we update the level shown
    $("#level-title").text("Level: " + level);
    // generates a random number between 0 and 3
    randomNumber = Math.floor(Math.random() * 4);
    // we pick a colour and we add it to gamePattern array
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // we add animation and sound to the selected button
    $("." + randomChosenColour).hide();
    $("." + randomChosenColour).fadeIn();
    playSoud(randomChosenColour);
    animatePress(randomChosenColour);
}

// every time the user clicks a button, we add that button to his pattern

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSoud(userChosenColour);
    animatePress(userChosenColour);
    if (level > 0) {
        checkAnswer(userClickedPattern.length - 1);
    }
});

// *** helper functions ***

function playSoud(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// check if every button clicked by the user correnspond to the gamePattern
// sequence if not, the game is over
function checkAnswer(currentLevel) {
    user = userClickedPattern[currentLevel];
    game = gamePattern[currentLevel];
    if (user === game) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// reset game parameters
function startOver() {
    gamePattern = []
    gameStarted = false;
    level = 0;
}