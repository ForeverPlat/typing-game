export let letterIndex = 0;
let wordIndex = 0;
export let time = 0;
let timeInterval;
let stopTime;
let isRuning = false;

export function getLetterIndex() {
    return letterIndex;
}

export function getTime() {
    return time;
}

function generateText() {

    let text = "lorem ipsum dolor sit amet";

    return text;
}

function formatText(text) {
    let words = text.split(" ");
    let newText = "";

    for (let i = 0; i < words.length; i++) {
        let currWord = words[i];
        newText += `<div id="word">`;

        for (let j = 0; j < currWord.length; j++) {
            let currLetter = currWord[j];
            newText += `<span class="pending" id="letter">${currLetter}</span>`;
        }
        newText += `</div>`;
        newText += `<span class="pending" id="letter">&nbsp;</span>`;

    }
    
    return newText;
}

function getLetters() {
    return document.querySelectorAll("#letter");
}

function isValidLetter(letter, index) {

    let letters = getLetters();
    let currLetter = letters[index].textContent;

    if (currLetter == letter) {
        return true;
    }

    return false;
}


function updateLetter(status, index) {
    let letters = getLetters();
    let currLetter = letters[index];

    if (status == "correct") {
        currLetter.className = "correct";

    } else if (status == "incorrect") {
        currLetter.className = "incorrect";

    } else if (status == "pending") {
        currLetter.className = "pending";

    } 

}


function updateLetterIndex(key) {
    if (key == "Backspace") {
        if (letterIndex > 0) {

            letterIndex--;
        }

    } else if (key == " " || /^[a-zA-Z]$/.test(key)) {
        letterIndex++;

    }

}


function createCursor() {
    let letters = getLetters();
    if (letters.length > 0) {
        letters[0].innerHTML += "<div class='typing-cursor' id='typing-cursor'></div>";
    }
}


function moveCursor(index) {
    let cursor = document.getElementById("typing-cursor");
    let letters = getLetters();
    
    if (index < letters.length) {
        letters[index].prepend(cursor);
    }
}


function updateTime() {
    time += 1000;
}


function pauseTimer() {

}

function stopTimer() {
    clearInterval(timeInterval);
}


function openResults() {
    window.location = "pages/typing-test-results.html";
}

function endGame() {
    stopTimer();
    openResults();
}


function startGame() {
    let text = generateText();
    document.getElementById("typing-test-text").innerHTML = formatText(text);
    createCursor();
    

    document.addEventListener("keydown", event => {        

        if (!isRuning) {
            isRuning = true;
            timeInterval = setInterval(updateTime, 1000);
        }

        if (letterIndex == (text.length - 1)) {
            endGame();
        }

        if (/^[a-zA-Z]$/.test(event.key)){

            if (isValidLetter(event.key, letterIndex)) {
                updateLetter("correct", letterIndex);
                updateLetterIndex(event.key);

            } else {
                updateLetter("incorrect", letterIndex);
                updateLetterIndex(event.key);
    
            }

        } else if (event.key == " ") {
            updateLetter("correct", letterIndex);
            updateLetterIndex(event.key);

        } else if (event.key == "Backspace") {
            updateLetterIndex(event.key);
            updateLetter("pending", letterIndex);

        } 
        moveCursor(letterIndex);

    });

}

document.addEventListener("DOMContentLoaded", function() {
    startGame();
});

//test
function displayTime() {
	console.log(time);

}


setInterval(displayTime, 1000);

//