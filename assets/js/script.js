var userLetterIndex = 0;
var numCorrectlyTypedChars = 0;
var startTime;
var updatingWPMDisplay;


//later us an api to generate random strings
function generateText() {
    // return "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip exleac sed do eiusmod";
    return "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim";
    // return "lorem";
}

function addTextToPage(generatedText) {

    var wordList = generatedText.split(" ")

    for (var i = 0; i < wordList.length; i++) {

        document.getElementById("typing-test-text").innerHTML += "<span class='word'></span>";

        var words = document.querySelectorAll(".word")
        var currWord = words[words.length - 1];
        var letterList = wordList[i].split("");

        for (var j = 0; j < letterList.length; j++) {
            // creating the letter span
            currWord.innerHTML += "<span class='letter' data-status='pendingText'>" + letterList[j] + "</span>";
        }
        // adding spaces
        if (i < wordList.length - 1) {
            document.getElementById("typing-test-text").innerHTML += "<span data-status='pendingText' class='letter'>&nbsp;</span>";
        }
    }

}

function getWords() {
    return document.querySelectorAll(".word");
}

function getCurrWord(userLetterIndex) {
    return getWords()[userLetterIndex].textContent;
}

function getCurrWordTag(userLetterIndex) {
    return getWords()[userLetterIndex];
}

function getLetters() {
    return document.querySelectorAll(".letter");
}

function getCurrLetter(userLetterIndex) {
    return getLetters()[userLetterIndex].textContent;
}

function getCurrLetterTag(userLetterIndex) {
    return getLetters()[userLetterIndex];
}

function setLetterStatus(userLetterIndex, letterStatus){
    getCurrLetterTag(userLetterIndex).dataset.status = letterStatus;
}

function getLetterStatus(userLetterIndex) {
    return getCurrLetterTag(userLetterIndex).dataset.status;
}



function typingCursor() {
    getCurrLetterTag(0).innerHTML += "<div class='typing-cursor' id='typing-cursor'></div>"
}

function moveCursor(userLetterIndex) {
    var cursor = document.getElementById("typing-cursor");
    getCurrLetterTag(userLetterIndex).prepend(cursor);


    //> WORK ON THIS
    // pausing animation when cursor moves
    if (userLetterIndex != 0) {
        getCurrLetterTag(userLetterIndex).style.animationPlayState = 'paused';
    }
}


const statuses = ["pausedCorrectLetter", "pausedIncorrectLetter", "pausedCorrectedLetter", "pausedIncorrectLetter", "pausedPendingIncorrectLetter", "pausedPendingText"];

//this should prob not be doing all this
// make functions that break these into like seperate backspace
function updateTypingText(typedLetter, letterIndex) {
    if (statuses.includes(getLetterStatus(userLetterIndex))) {

    } else if (typedLetter == "Backspace" && letterIndex != 0) {

        userLetterIndex--;

        if (getLetterStatus(userLetterIndex) == "correctLetter") {
            
            setLetterStatus(userLetterIndex, "pendingText");

        } else if (getLetterStatus(userLetterIndex) == "incorrectLetter") {

            setLetterStatus(userLetterIndex, "pendingIncorrectLetter");

        }  

    } else if (typedLetter == getCurrLetter(userLetterIndex) && getLetterStatus(userLetterIndex) == "pendingIncorrectLetter") {

        setLetterStatus(userLetterIndex, "correctedLetter");
        
        numCorrectlyTypedChars++;
        userLetterIndex++;

    } else if (typedLetter == getCurrLetter(letterIndex)) {

        setLetterStatus(userLetterIndex, "correctLetter");

        numCorrectlyTypedChars++;
        userLetterIndex++;

    } else {

        setLetterStatus(userLetterIndex, "incorrectLetter");

        userLetterIndex++;
    }
}



// https://stackoverflow.com/questions/52819891/how-do-i-make-a-keydown-event-that-only-works-the-first-time-it-is-pressed
//> need to turn this into a function
var eventHandler = function(event){
    startTime = Date.now();
    document.removeEventListener('keydown', eventHandler);
}
document.addEventListener('keydown', eventHandler);


function calculateWPM(totalCharactersTyped, startTime) {
    var endTime = Date.now();
    var elapsedTime = (endTime-startTime)/60000;

    //> need to take errors into account later
    var wpm = Math.round((totalCharactersTyped/5)/ elapsedTime);
    return wpm;
}

function displayWPM(wpm) {
    document.getElementById("wpm-count").innerHTML = wpm;
}


// create a function to pause the test if user does not type for a set amount of time

// create a function for reseting
// should also generate new text
function resetTypeTest() {
    userLetterIndex = 0;
    totalErrors = 0;
    clearInterval(updatingWPMDisplay);

    document.getElementById("typing-test-text").innerHTML = "";
    document.getElementById("wpm-count").innerHTML = "";


    var eventHandler = function(event){
        startTime = Date.now();
        document.removeEventListener('keydown', eventHandler);
    }
    document.addEventListener('keydown', eventHandler);

    // has to be in this order (props to adrii for the solution)
    addTextToPage(generateText());
    typingCursor();
    moveCursor(userLetterIndex);


    for (var i = 0; i < getCurrLetter.length; i++)  {
        getCurrLetterTag(i).dataset.status="pendingText";
    }
}

function unpauseTypingTest() {
    document.getElementById("paused-test-overlay").remove();

    for (var letterTag of getLetters()) {
        console.log(letterTag);
    
        if (letterTag.dataset.status == "pausedCorrectLetter") {
    
            letterTag.dataset.status = "correctLetter";
    
        } else if (letterTag.dataset.status == "pausedIncorrectLetter") {
    
            letterTag.dataset.status = "incorrectLetter";
    
        } else if (letterTag.dataset.status == "pausedCorrectedLetter") {
    
            letterTag.dataset.status = "correctedLetter";
    
        } else if (letterTag.dataset.status == "pausedPendingIncorrectLetter") {
    
            letterTag.dataset.status = "pendingIncorrectLetter";
    
        } else if (letterTag.dataset.status == "pausedPendingText") {
    
            letterTag.dataset.status = "pendingText";
    
        } else {
            console.log("unexpected status");
        }

        document.getElementById("typing-cursor").style = "background-color: yellow;";
    }    

}

// pause the typing 
// this cannot stay like this
function pauseTypingTest() {
    for (var letterTag of getLetters()) {

        
        if (letterTag.dataset.status == "correctLetter") {

            letterTag.dataset.status = "pausedCorrectLetter";

        } else if (letterTag.dataset.status == "incorrectLetter") {

            letterTag.dataset.status = "pausedIncorrectLetter";

        }  else if (letterTag.dataset.status == "correctedLetter") {
            
            letterTag.dataset.status = "pausedCorrectedLetter";

        } else if (letterTag.dataset.status == "pendingIncorrectLetter") {
            
            letterTag.dataset.status = "pausedPendingIncorrectLetter";

        } else if (letterTag.dataset.status == "pendingText") {

            letterTag.dataset.status = "pausedPendingText";

        } else {
            console.log("unexpexted status")
        }
    }
    document.getElementById("typing-cursor").style = "background-color: transparent;";
    //still need to pause the letter index from moving

    document.getElementById("typing-test-text").innerHTML += "<div class='paused-test-overlay' id='paused-test-overlay'>Click here or any key</div>"
    document.getElementById("paused-test-overlay").onclick = unpauseTypingTest;

    //> Pause wpm counting
}



// document.addEventListener("keydown", unpauseTypingTest);
// document.addEventListener("click", unpauseTypingTest);


// create a function for the word count

// create a function for character count

// create  a function for user accuracy

function calculateAccuracy() {

    var numCorrectedLetter = 0;

    var letters = getLetters();

    for (var i = 0; i < letters.length; i++) {

        var letter = letters[i];

        if (getLetterStatus(letter) == "correctedLetter") {
            numCorrectedLetter++;
        }
    }

    return numCorrectedLetter/(letters.length) * 100;
}

function calculateRealAccuracy() {

    var numIncorrectLetter = 0;

    var letters = getLetters();

    for (var i = 0; i < letters.length; i++) {

        var letter = letters[i];

        if (getLetterStatus(letter) == "incorrectLetter") {
            numIncorrectLetter++;
        } 
    }

    return numIncorrectLetter/(letters.length) * 100;
}




// maybe create a start game function
var typingText = generateText();
addTextToPage(typingText);


document.addEventListener("keydown", event => {
    var typedLetter = event.key;
    updateTypingText(typedLetter, userLetterIndex);


    console.log(userLetterIndex);
    if ((5 <= userLetterIndex && userLetterIndex <= 10) || Date.now() > startTime + 3000) {
        displayWPM(calculateWPM(numCorrectlyTypedChars, startTime));
    }

    if ((getLetters().length) != userLetterIndex) {

        moveCursor(userLetterIndex); 
    }

    if ((getLetters().length) == userLetterIndex) {
        document.getElementById("typing-cursor").style = "background-color: transparent;";
        
        console.log("opening new page");
        window.location = "/pages/typing-test-results.html";
    }


});

// using recursion to check if user typed then updating wpm display by set value
function checkIfTyped() {
    // add a condition for and key is not pressed
    if(userLetterIndex != 0) {
        console.log(userLetterIndex);
        updatingWPMDisplay = setInterval(() => {
            displayWPM(calculateWPM(numCorrectlyTypedChars, startTime));
        }, 1000);
    } else {
        console.log("checking");
        setTimeout(checkIfTyped, 1000);
    }
}

typingCursor();
// think about where to put this later
checkIfTyped();
pauseTypingTest();


