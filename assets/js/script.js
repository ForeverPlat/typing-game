export let letterIndex = 0;
let wordIndex = 0;
export let time = 0;
let timeInterval;
let stopTime;
let isRuning = false;

function getLetterIndex() {
    return letterIndex;
}

function getTime() {
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

const getWpm = () => {

    const letterIndex = getLetterIndex();
    const time = getTime()/60000;

    return Math.round((letterIndex/5)/ time);
}

const getAccuracy = () => {

    let letters = document.querySelectorAll("#letter");
    let incorrect = 0;

    for (let letter of letters) {
        
        if (letter.className == "incorrect") {
            incorrect++;
        }
    }

    return Math.round((letters.length - incorrect)/(letters.length) * 100);
}

const getCharCount = () => {

    let letters = document.querySelectorAll("#letter");
    let charCount = 0;

    for (let letter of letters) {
        
        if (letter.textContent != " ") {
            charCount++;
        }
    }

    return charCount;
}

function openResults() {

    let mainContent = document.getElementById("main-content");

    mainContent.classList.remove("main-content");
    mainContent.classList.add("main-results");
    mainContent.innerHTML = `<div class='main-top'> <!-- wpm --> <div class='wpm-container'> <div class='main-num' id='wpm-num'>${getWpm()}</div> <div class='main-text' id='wpm-text'> WPM </div> </div> </div> <!-- stats bottom half --> <div class='main-bottom'> <div class='secondary-stats-container'> <div class='secondary-container'> <div class='secondary-num' id='accuracy-num'> ${getAccuracy()}% </div> <div class='secondary-text'> Accuracy </div> </div> <div class='secondary-container'> <div class='secondary-num' id='characters-num'>${getCharCount()}</div> <div class='secondary-text'> Characters </div> </div> <div class='secondary-container'> <div class='secondary-num' id='time-num'>${Math.round(getTime()/1000)}s</div> <div class='secondary-text'> Time </div> </div> </div> <svg class='next-button' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' onclick='window.location.href='../index.html';'> <g id='SVGRepo_bgCarrier' stroke-width='0'></g> <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g> <g id='SVGRepo_iconCarrier'> <path d='M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z' fill='currentColor'></path> </g> </svg> </div>`;

    // window.location = "pages/typing-test-results.html";
}

// need to make actually terminate the game
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