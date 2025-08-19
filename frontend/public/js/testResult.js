const { BACKEND_URL } = process.env;

const storeTestResult = async (wpm, accuracy, duration) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BACKEND_URL}/api/test-result`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ wpm, accuracy, duration })
    });

    const data = await res.json();
    console.log(data);

}

export const openResultsPage = async (wpm, accuracy, charCount, duration, openTypingTest) => {

    await storeTestResult(wpm, accuracy, duration);

    let mainContent = document.getElementById("main-content");

    mainContent.classList.remove("main-content");
    mainContent.classList.add("main-results");


    mainContent.innerHTML = `<div class='main-top'> <!-- wpm --> <div class='wpm-container'> <div class='main-num' id='wpm-num'>${wpm}</div> <div class='main-text' id='wpm-text'> WPM </div> </div> </div> <!-- stats bottom half --> <div class='main-bottom'> <div class='secondary-stats-container'> <div class='secondary-container'> <div class='secondary-num' id='accuracy-num'> ${accuracy}% </div> <div class='secondary-text'> Accuracy </div> </div> <div class='secondary-container'> <div class='secondary-num' id='characters-num'>${charCount}</div> <div class='secondary-text'> Characters </div> </div> <div class='secondary-container'> <div class='secondary-num' id='time-num'>${Math.round(duration/1000)}s</div> <div class='secondary-text'> Time </div> </div> </div> <svg class='next-button' id='next-button' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' > <g id='SVGRepo_bgCarrier' stroke-width='0'></g> <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g> <g id='SVGRepo_iconCarrier'> <path d='M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z' fill='currentColor'></path> </g> </svg> </div>`;
    // make this instead be something that changes all the elements back to the original then starts game again
    document.getElementById('next-button').addEventListener('click', openTypingTest);

    // window.location = "pages/typing-test-results.html";
}