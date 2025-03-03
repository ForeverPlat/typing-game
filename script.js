var userLetterIndex = 0;
var totalErrors = 0;
var startTime;


// create a function to generate the text
//later us an api to generate random strings
function generateText() {
    return "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip exleac sed do eiusmod";
}

// create a function to add the text to the webpage
function addTextToPage(generatedText) {

    var wordList = generatedText.split(" ")

    for (var i = 0; i < wordList.length; i++) {
        // creating the word span
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

function getLetters() {
    return document.querySelectorAll(".letter");
}

// get letter
function getCurrLetter(userLetterIndex) {
    return getLetters()[userLetterIndex].textContent;
}

// get letter span tag
function getCurrLetterTag(userLetterIndex) {
    return getLetters()[userLetterIndex];
}

// set letters status
function setLetterStatus(userLetterIndex, letterStatus){
    getCurrLetterTag(userLetterIndex).dataset.status = letterStatus;
}

// get letter status
function getLetterStatus(userLetterIndex) {
    return getCurrLetterTag(userLetterIndex).dataset.status;
}

// create a function that tracks the users typing
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
        userLetterIndex++;

    } else if (typedLetter == getCurrLetter(letterIndex)) {
        setLetterStatus(userLetterIndex, "correctLetter")
        userLetterIndex++;

    } else {
        setLetterStatus(userLetterIndex, "incorrectLetter")
        totalErrors++;
        userLetterIndex++;
    }
}

// create a function for the wpm
// https://stackoverflow.com/questions/52819891/how-do-i-make-a-keydown-event-that-only-works-the-first-time-it-is-pressed

// need to turn this into a function
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
    document.getElementById("typing-test-text").innerHTML = "";

    var eventHandler = function(event){
        startTime = Date.now();
        document.removeEventListener('keydown', eventHandler);
    }
    document.addEventListener('keydown', eventHandler);

    userLetterIndex = 0;
    totalErrors = 0;
    addTextToPage(generateText());

    getLetters().dataset.status="pendingText"
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




// may be create a start game function
var typingText = generateText();
addTextToPage(typingText);


document.addEventListener("keydown", event => {
    var typedLetter = event.key;
    updateTypingText(typedLetter, userLetterIndex)

    console.log(userLetterIndex);
    if ((5 <= userLetterIndex && userLetterIndex <= 10) || Date.now() > startTime + 3000) {
        displayWPM(calculateWPM(userLetterIndex, startTime));
    }
});

// using recursion to check if user typed then updating wpm display by set value
function checkIfTyped() {
    // add a condition for and key is not pressed
    if(userLetterIndex != 0) {
        console.log(userLetterIndex)
        setInterval(() => {
            displayWPM(calculateWPM(userLetterIndex, startTime));
        }, 1000);
    } else {
        console.log("checking");
        setTimeout(checkIfTyped, 1000);
    }
}

checkIfTyped();



// make it so that wpm will decrease if you don't type


// var letters = document.querySelectorAll(".letter");


// var count = 0;

// function resetTypeTest() {
//     count = 0;
//     console.log("count: " + count)
//     var letter = document.querySelectorAll(".letter");

//     // change to for each later

//     for (var letter of letters) {
//         letter.style="color: #363a43;"
//     }

// }



//might need a wrong counter


// var start = Date.now();

// console.log("start timer")

// document.addEventListener("keydown", event => {

//     console.log(typingText.charAt(count));
//     console.log(event.key);

//     var currChar = typingText.charAt(count);
//     var typedChar = event.key;

//     if (typedChar == "Backspace") {

//         count--;

//         letters[count].style="color: #363a43;"


//     } else if (currChar == typedChar) {

//         letters[count].style="color:rgb(209, 209, 202);"
//         count++;

//     } else {

//         if (letters[count] == "&nbsp;") {
//             letters[count].style="background-color:rgb(219, 108, 108);"

//         } else {
//             letters[count].style="color:rgb(219, 108, 108);"

//         }

//         count++;
        
        
//     }

//     console.log("timer for each keypress")
//     var end = Date.now();

//     var elapsed = (end - start)/60000;

//     var wpm = calcWPM(count, elapsed);
//     console.log(wpm)


//     document.getElementById("wpm-count").innerHTML = wpm;

// });


