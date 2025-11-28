import type { LeaderboardObject } from '../types'
import '../styles/leaderboard.css'

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return ''
    const month = date.toLocaleString('en-US', { month: 'short' })
    const fmtMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
    return `${fmtMonth} ${date.getDate()} ${date.getFullYear()}`
}

const Leaderboard = ({ leaderboard }: { leaderboard: Array<LeaderboardObject> }) => {
    const withRanks = leaderboard.map((entry, idx) => ({
        ...entry,
        rank: idx + 1,
    }))

    const topThree = withRanks.slice(0, 3)
    const podium = [topThree[1], topThree[0], topThree[2]].filter(Boolean)
    const others = withRanks.slice(3)

    return (
        <div className="lb-container">
        
        {/* TOP THREE */}
        <div className="lb-podiumContainer">
            {podium.map((entry, index) => (
            <div
                key={entry.user._id}
                className={`lb-podiumCard ${index === 1 ? 'lb-middleCard' : ''}`}
            >
                <div
                className={[
                    'lb-circle',
                    entry.rank === 1 && 'lb-firstBorder',
                    entry.rank === 2 && 'lb-secondBorder',
                    entry.rank === 3 && 'lb-thirdBorder',
                    index === 1 && 'lb-circleLarge',
                ]
                    .filter(Boolean)
                    .join(' ')}
                >
                {entry.rank === 1 ? 
                    <svg className='lb-crown' fill="#ffda44" viewBox="0 -64 640 640" xmlns="http://www.w3.org/2000/svg"> <g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g> <g id="SVGRepo_iconCarrier"> <path d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z"></path> </g> </svg>
                 : entry.rank}
                </div>

                <div className="lb-topName">{entry.user.username}</div>
                <div className="lb-topValue">{entry.wpm} WPM</div>
            </div>
            ))}
        </div>

            
        <div className="lb-table">
            <div className="lb-headerRow">
                <div className="lb-headerColRank">#</div>
                <div className="lb-headerColUser">User</div>
                <div className="lb-headerColValue">WPM</div>
                <div className="lb-headerColDate">Date</div>
            </div>

            {others.map((entry) => (
                <div key={entry.user._id} className="lb-row">
                <div className="lb-rank">{entry.rank}</div>
                <div className="lb-name">{entry.user.username}</div>
                <div className="lb-value">{entry.wpm}</div>
                <div className="lb-date">{formatDate(entry.createdAt)}</div>
                </div>
            ))}
            </div>
        </div>
        
    )
}

export default Leaderboard
