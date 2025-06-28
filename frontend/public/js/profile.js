const token = localStorage.getItem('token');

const setHighestWPM = async (results) => {
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

const setAverageWPM = async (results) => {
    let total = 0;
    let count = 0;

    results.forEach(result => {

        total += result.wpm;
        count++;
    });

    const average = total / count;

    document.getElementById('average-wpm-num').textContent = average;
}

const setAverageWPMLastFive = async (results) => {
    let total = 0;
    const limit = Math.min(results.length, 5);

    for (let i = 0; i < limit; i++) {
        total += results[i].wpm;
    }

    

    const average = total / limit;

    document.getElementById('last-5-average-wpm-num').textContent = average;
}

//  accuracy stats

const setHighestAccuracy = async (results) => {
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

const setAverageAccuracy = async (results) => {
    let total = 0;
    let count = 0;

    results.forEach(result => {

        total += result.accuracy;
        count++;
    });

    const average = total / count;

    document.getElementById('average-accuracy-num').textContent = average;
}

const setAverageAccuracyLastFive = async (results) => {
    let total = 0;
    const limit = Math.min(results.length, 5);

    for (let i = 0; i < limit; i++) {
        total += results[i].accuracy;
    }

    const average = total / limit;

    document.getElementById('last-5-average-accuracy-num').textContent = average;
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
