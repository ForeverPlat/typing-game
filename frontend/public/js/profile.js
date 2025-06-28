const token = localStorage.getItem('token');

const setHighestWPM = (results) => {
    let highestWPM = 0;
    
    results.forEach(result => {

        let currentWPM = result.wpm;

        if (currentWPM > highestWPM) {
            highestWPM = currentWPM;
        }
    }); 

    document.getElementById('highest-wpm-num').textContent = highestWPM;
    console.log(highestWPM);
}

const setAverageWPM = (results) => {
    let total = 0;
    let count = 0;

    results.forEach(result => {

        total += result.wpm;
        count++;
    });

    const average = Math.floor(total / count);

    document.getElementById('average-wpm-num').textContent = average;
}

const setAverageWPMLastFive = (results) => {
    let total = 0;
    const limit = Math.min(results.length, 5);

    for (let i = 0; i < limit; i++) {
        total += results[i].wpm;
    }

    
    const average = Math.floor(total / limit);

    document.getElementById('last-5-average-wpm-num').textContent = average;
}

//  accuracy stats

const setHighestAccuracy = (results) => {
    let highestAccuracy = 0;
    
    results.forEach(result => {

        let currentAccuracy = result.accuracy;

        if (currentAccuracy > highestAccuracy) {
            highestAccuracy = currentAccuracy;
        }
    }); 

    document.getElementById('highest-accuracy-num').textContent = highestAccuracy;
    console.log(highestAccuracy); 
}

const setAverageAccuracy = (results) => {
    let total = 0;
    let count = 0;

    results.forEach(result => {

        total += result.accuracy;
        count++;
    });

    const average = Math.floor(total / count);

    document.getElementById('average-accuracy-num').textContent = average;
}

const setAverageAccuracyLastFive = (results) => {
    let total = 0;
    const limit = Math.min(results.length, 5);

    for (let i = 0; i < limit; i++) {
        total += results[i].accuracy;
    }

    const average = Math.floor(total / limit);

    document.getElementById('last-5-average-accuracy-num').textContent = average;
}


const setTimeTyping = (results) => {
    let totalTime = 0;

    results.forEach(result => {
        totalTime += result.duration;
    });

    const totalSeconds = Math.floor(totalTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':');

    document.getElementById('time-typing').textContent = formattedTime;
}

//  --------------------------------------------    //

const getStats = async () => {
    const res = await fetch('http://localhost:3000/api/test-result', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();
    const results = data.data.results;
    console.log(results);

    setHighestWPM(results);
    setAverageWPM(results);
    setAverageWPMLastFive(results);

    setHighestAccuracy(results);
    setAverageAccuracy(results);
    setAverageAccuracyLastFive(results);

    setTimeTyping(results);
}

document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();
    console.log(data);

    if (!data.success) {
        window.location.href='../pages/auth.html';
        return;
    }

    document.getElementById("username").textContent = data.user.username;
    await getStats();


    
});
