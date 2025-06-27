import { openResultsPage } from "./testResult.js";

export let letterIndex = 0;
let wordIndex = 0;
let time = 0;
let text;
let timeInterval;
let stopTime;
let isRunning = false;

const getLetterIndex = () => letterIndex;


const getTime = () => time;

const generateText = () => {
    const numTestWords = 5;

    let textPool = "the and have that for you with not this but his from they say her she one all would there their what about which when make can like time just him know take into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us";

    let poolList = textPool.split(" ");

    let text = "";

    for (let i = 0; i <= numTestWords; i++) {

        let randTextIndex = Math.floor(Math.random() * poolList.length);

        text += poolList[randTextIndex];

        if (i < numTestWords) {
            text += " ";
        }

        poolList.splice(randTextIndex, 1);
    }


    // let text = "lorem ipsum dolor sit amet";

    return text;
}

const formatText = (text) => {
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

        if (i < words.length - 1) {
            newText += `<span class="pending" id="letter">&nbsp;</span>`;
        }

    }
    
    return newText;
}

const getLetters = () => {
    return document.querySelectorAll("#letter");
}

const isValidLetter = (letter, index) => {

    let letters = getLetters();
    let currLetter = letters[index].textContent;

    if (currLetter == letter) {
        return true;
    }

    return false;
}


const updateLetter = (status, index) => {
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


const updateLetterIndex = (key) => {
    if (key == "Backspace") {
        if (letterIndex > 0) {

            letterIndex--;
        }

    } else if (key == " " || /^[a-zA-Z]$/.test(key)) {
        letterIndex++;

    }

}


const createCursor = () => {
    let letters = getLetters();
    if (letters.length > 0) {
        letters[0].innerHTML += "<div class='typing-cursor' id='typing-cursor'></div>";
    }
}


const moveCursor = (index) => {
    let cursor = document.getElementById("typing-cursor");
    let letters = getLetters();
    
    if (index < letters.length) {
        letters[index].prepend(cursor);
    }
}

const startTimer = () => {
    if (!isRunning) {
        time = 0;
    }
    isRunning = true;
    timeInterval = setInterval(updateTime, 1000);
}

const updateTime = () => {
    time += 1000;
}


const pauseTimer = () => {

}

const stopTimer = () => {
    clearInterval(timeInterval);
    isRunning = false;
}

const getWpm = () => {

    const letterIndex = getLetterIndex();
    const time = getTime()/60000;

    return Math.round((letterIndex * (getAccuracy() / 100) / 5) / time);
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



const keyDownHandler = (event) => {

    if (letterIndex != (text.length)) {

        if (!isRunning) {
            startTimer();
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

            if (isValidLetter(event.key, letterIndex)) {
                updateLetter("correct", letterIndex);
                updateLetterIndex(event.key);
    
            } else {
                updateLetter("incorrect", letterIndex);
                updateLetterIndex(event.key);
    
            }
    
        } else if (event.key == "Backspace") {
            updateLetterIndex(event.key);
            updateLetter("pending", letterIndex);
    
        } 
        moveCursor(letterIndex);

    } if (letterIndex == text.length) {
        endGame();
    }



}

const startGame = () => {
    letterIndex = 0;
    document.getElementById('reset-button').addEventListener('click', event => {
        stopTimer();
        startGame();
    });
    text = generateText();
    document.getElementById("typing-test-text").innerHTML = formatText(text);
    createCursor();

    document.addEventListener("keydown", keyDownHandler);

}

const openTypingTest = () => {

    let mainContent = document.getElementById("main-content");

    mainContent.classList.remove("main-results");
    mainContent.classList.add("main-content");
    mainContent.innerHTML = `<div class="typing-test" id="typing-test-text"></div>
                
                <svg class="reset-button" id="reset-button" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M18.2577 3.50828C18.538 3.62437 18.7207 3.89785 18.7207 4.20119V8.44383C18.7207 8.85805 18.3849 9.19383 17.9707 9.19383H13.728C13.4247 9.19383 13.1512 9.0111 13.0351 8.73085C12.9191 8.45059 12.9832 8.128 13.1977 7.9135L14.8007 6.3105C12.1674 5.20912 9.01606 5.7309 6.87348 7.87348C4.04217 10.7048 4.04217 15.2952 6.87348 18.1265C9.70478 20.9578 14.2952 20.9578 17.1265 18.1265C18.7727 16.4803 19.4622 14.2401 19.1935 12.0937C19.142 11.6827 19.4335 11.3078 19.8445 11.2563C20.2555 11.2049 20.6304 11.4963 20.6819 11.9073C21.0057 14.4934 20.1746 17.1997 18.1872 19.1872C14.7701 22.6043 9.2299 22.6043 5.81282 19.1872C2.39573 15.7701 2.39573 10.2299 5.81282 6.81282C8.55119 4.07444 12.6515 3.5312 15.9309 5.18028L17.4404 3.67086C17.6549 3.45637 17.9774 3.3922 18.2577 3.50828Z" fill="currentColor"></path> 
                    </g>
                </svg>`;

    startGame();

}


// need to make actually terminate the game
const endGame = async () => {
    document.removeEventListener("keydown", keyDownHandler);
    stopTimer();
    console.log('time', getTime());
    console.log('wpm', getWpm());

    await openResultsPage(getWpm(), getAccuracy(), getCharCount(), getTime(), openTypingTest);
}

document.addEventListener("DOMContentLoaded", function() {
    startGame();
});

document.querySelector('#profile-button').addEventListener("click", () => {
    window.location.href='../pages/profile.html';
});

const displayTime = () => console.log(time);

setInterval(displayTime, 1000);