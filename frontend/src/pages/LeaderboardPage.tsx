import { useEffect, useState } from "react"
import Leaderboard from "../components/Leaderboard"
import { type LeaderboardObject, type LeaderboardResponse } from "../types";
import API_URL from '../config';

const LeaderboardPage = () => {
    const [leaders, setLeaders] = useState<LeaderboardObject[]>([]);
    // const backendURL = 'http://localhost:3000';

    useEffect(() => {
        const getLeaderboard = async () => {
            const res = await fetch(`${API_URL}/leaderboard`);
            const result: LeaderboardResponse = await res.json();

            setLeaders(result.data.topResults)
        }

        getLeaderboard();
    }, [])

  return (
    <div>
        <Leaderboard leaderboard={leaders} />
    </div>
  )
}

export default LeaderboardPage