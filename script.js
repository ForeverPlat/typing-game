// var typingText = document.getElementById("typing-test-text").textContent;

//later us an api to generate random strings
var typingText = "lorem ipsum dolor sit ame";

var wordList = typingText.split(" ");
console.log(wordList);

for (var i = 0; i < wordList.length; i++) {

    console.log(wordList[i]);

    document.getElementById("typing-test-text").innerHTML += "<span class='word'></span>";

    var words = document.querySelectorAll(".word")
    var currWord = words[words.length - 1];

    var letterList = wordList[i].split("");

    for (var j = 0; j < letterList.length; j++) {

        console.log(letterList[j])
        currWord.innerHTML += "<span class='letter'>" + letterList[j] + "</span>";
    }

    if (i < wordList.length - 1) {
        document.getElementById("typing-test-text").innerHTML += "<span class='letter'>&nbsp;</span>";
    }

}

console.log(document.querySelectorAll(".letter"))

var letters = document.querySelectorAll(".letter");

// for (i; i < length; i++) {
//     typingText.innerHTML += "<span>" + splitText[i] + "</span>";
// }


var count = 0;

function resetTypeTest() {
    count = 0;
    console.log("count: " + count)
    var letter = document.querySelectorAll(".letter");

    // change to for each later

    for (var letter of letters) {
        letter.style="color: #363a43;"
    }

}

//each key stroke movest the index by one
// if the keystroke does not match the previous letter turn that letter red

//might need a wrong counter


document.addEventListener("keydown", event => {

    console.log(typingText.charAt(count));
    console.log(event.key);

    var currChar = typingText.charAt(count);
    var typedChar = event.key;

    if (typedChar == "Backspace") {

        count--;

        letters[count].style="color: #363a43;"


    } else if (currChar == typedChar) {

        letters[count].style="color:rgb(209, 209, 202);"
        count++;

    } else {

        if (letters[count] == "&nbsp;") {
            letters[count].style="background-color:rgb(219, 108, 108);"

        } else {
            letters[count].style="color:rgb(219, 108, 108);"

        }


        count++;
        
    }
    


});


