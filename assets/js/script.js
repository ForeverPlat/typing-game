var userLetterIndex = 0;
var numCorrectlyTypedChars = 0;
var startTime;
var updatingWPMDisplay;


//later us an api to generate random strings
function generateText() {
    // return "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip exleac sed do eiusmod";
    return "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim";
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
            document.getElementById("typing-test-text").innerHTML += "<span class='letter'>&nbsp;</span>";
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
}



//this should prob not be doing all this
function updateTypingText(typedLetter, letterIndex) {
    if (typedLetter == "Backspace" && letterIndex != 0) {

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

    addTextToPage(generateText());

    for (var i = 0; i < getCurrLetter.length; i++)  {
        getCurrLetterTag(i).dataset.status="pendingText";
    }
}



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

    moveCursor(userLetterIndex);

    console.log(userLetterIndex);
    if ((5 <= userLetterIndex && userLetterIndex <= 10) || Date.now() > startTime + 3000) {
        displayWPM(calculateWPM(numCorrectlyTypedChars, startTime));
    }

    if (userLetterIndex == (getLetters().length)) {
        console.log("opening new page")
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
checkIfTyped();
