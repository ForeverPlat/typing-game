import React from 'react'
import type { LeaderboardObject } from '../types'

const Leaderboard = ({ leaderboard } : { leaderboard: Array<LeaderboardObject> }) => {
  return (
    <div>
        {leaderboard.map(({ wpm, user, accuracy }) => (
            <div key={user._id}>{wpm} {user.username} {accuracy}</div>
        ))}
        
    </div>
  )
}

export default Leaderboard