import { useEffect, useState } from "react"
import ProfileStat from "../components/ProfileStats"
import { useNavigate } from "react-router-dom";
import type { Profile, Result } from "../types";
import ProfileHeader from "../components/ProfileHeader";
import API_URL from '../config';

const ProfilePage = () => {
    const [profile, setProfile] = useState<Profile>({
        username: "",
        highestWpm: 0,
        averageWpm: 0,
        averageWpmLastFive: 0,
        highestAccuracy: 0,
        averageAccuracy: 0,
        averageAccuracyLastFive: 0,
        timeTyping: ""
        });
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const getAccess = async () => {
            const res = await fetch(`${API_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await res.json();

            if (!result.success) {
                navigate('/auth');
                return;
            }

            setProfile(prev => ({
                ...prev,
                username: result.user.username
            }));

        }
        getAccess();
    }, [])

    const setHighestWPM = (results: Result[]) => {
        let highestWpm = 0;
        
        results.forEach(result => {

            let currentWpm = result.wpm;

            if (currentWpm > highestWpm) {
                highestWpm = currentWpm;
            }
        }); 

        setProfile(prev => ({
            ...prev,
            highestWpm
        }));
        // !highestWPM ? document.getElementById('highest-wpm-num').textContent = '-' : document.getElementById('highest-wpm-num').textContent = highestWPM;
    }

    const setAverageWPM = (results: Result[]) => {
        let total = 0;
        let count = 0;

        results.forEach(result => {

            total += result.wpm;
            count++;
        });

        const average = Math.floor(total / count);
        setProfile(prev => ({
            ...prev,
            averageWpm: average
        }));

        // !average ? document.getElementById('average-wpm-num').textContent = '-' : document.getElementById('average-wpm-num').textContent = average;
    }

    const setAverageWPMLastFive = (results: Result[]) => {
        let total = 0;
        const limit = Math.min(results.length, 5);

        for (let i = 0; i < limit; i++) {
            total += results[i].wpm;
        }

        
        const average = Math.floor(total / limit);
        setProfile(prev => ({
            ...prev,
            averageWpmLastFive: average
        }));

        // !average ? document.getElementById('last-5-average-wpm-num').textContent = '-' : document.getElementById('last-5-average-wpm-num').textContent = average;
    }

    //  accuracy stats

    const setHighestAccuracy = (results: Result[]) => {
        let highestAccuracy = 0;
        
        results.forEach(result => {

            let currentAccuracy = result.accuracy;

            if (currentAccuracy > highestAccuracy) {
                highestAccuracy = currentAccuracy;
            }
        }); 

        setProfile(prev => ({
            ...prev,
            highestAccuracy 
        }));
        // highestAccuracy === 0 ? document.getElementById('highest-accuracy-num').textContent = '-' : document.getElementById('highest-accuracy-num').textContent = highestAccuracy;
    }

    const setAverageAccuracy = (results: Result[]) => {
        let total = 0;
        let count = 0;

        results.forEach(result => {

            total += result.accuracy;
            count++;
        });

        const average = Math.floor(total / count);

        setProfile(prev => ({
            ...prev,
            averageAccuracy: average
        }));
        // !average ? document.getElementById('average-accuracy-num').textContent = '-' : document.getElementById('average-accuracy-num').textContent = average;
    }

    const setAverageAccuracyLastFive = (results: Result[]) => {
        let total = 0;
        const limit = Math.min(results.length, 5);

        for (let i = 0; i < limit; i++) {
            total += results[i].accuracy;
        }

        const average = Math.floor(total / limit);
        setProfile(prev => ({
            ...prev,
            averageAccuracyLastFive: average
        }));

        // !average ? document.getElementById('last-5-average-accuracy-num').textContent = '-' : document.getElementById('last-5-average-accuracy-num').textContent = average;
    }


    const setTimeTyping = (results: Result[]) => {
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

        setProfile(prev => ({
            ...prev,
            timeTyping: formattedTime
        }));
    }

    useEffect(() => {
        console.log("stats function");
        
        const getStats = async () => {

            const res = await fetch(`${API_URL}/test-result`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await res.json();
            const results = result.data.results;
            // console.log(results);

            setHighestWPM(results);
            setAverageWPM(results);
            setAverageWPMLastFive(results);

            setHighestAccuracy(results);
            setAverageAccuracy(results);
            setAverageAccuracyLastFive(results);

            setTimeTyping(results);
        }

        getStats();

        console.log(profile);
        
    }, [])


  return (
    <div className="profile-page">
        <ProfileHeader profile={profile} />
        <ProfileStat profile={profile} />
    </div>
  )
}

export default ProfilePage