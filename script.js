var typingText = document.getElementById("typing-test-text").textContent;

var count = 0;

//each key stroke movest the index by one
// if the keystroke does not match the previous letter turn that letter red

document.addEventListener("keydown", event => {

    console.log(typingText.charAt(count));
    console.log(event.key);

    var currChar = typingText.charAt(count);
    var typedChar = event.key;

    if (typedChar == "Backspace") {

        count--;

    } else if (currChar == typedChar) {



        console.log("white")
        count++;

    } else {

        console.log("red")
        count++;
        
    }
    


});

//split each character into a value in an array
//every time the keystroke equals the value the index goes up by one