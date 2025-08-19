const mainContent = document.getElementById('main-content');
const backendURL = window.BACKEND_URL || 'http://localhost:3000';

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    let month = date.toLocaleString('en-US', { month: 'short' });
    month = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase(); // Capitalize first letter
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
}; 

const getTopWpm = async () => {

    try {
        const res = await fetch(`${backendURL}/api/leaderboard`);

        const data = await res.json();
        return data.data.topResults;

    } catch (err) {
        console.error(err);
        return [];
    }
    
}

const setLeaderboard = async () => {
    const topWpm = await getTopWpm();
    let rank = 1;

    let tableHtml = `
        <div id="leaderboard-container">
            <table id="leaderboard">
                <colgroup>
                <col style="width: 7%;">
                <col style="width: 45%;">
                <col style="width: 18%;">
                <col style="width: 18%;">
                <col style="width: 18%;">
                </colgroup>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>WPM</th>
                    <th>Accuracy</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody id="leaderboard-body">
    `;


    topWpm.forEach(({ user, wpm, accuracy, createdAt }) => {
        tableHtml += `
        <tr>
            <td>${rank}</td>
            <td>${user.username}</td>
            <td>${wpm}</td>
            <td>${accuracy}%</td>
            <td>${formatDate(createdAt.substring(0, 10))}</td>
        </tr>
        `;

        rank++;
    });

    tableHtml += `</tbody></table></div>`;

    mainContent.innerHTML = tableHtml;
}

setLeaderboard();

document.querySelector('#profile-button').addEventListener("click", () => {
    window.location.href='../pages/profile.html';
});

