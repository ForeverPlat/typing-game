import '../styles/profile.css'
import type { Profile } from '../types'

const ProfileStats = ({ profile }: { profile: Profile }) => {
    const stats = [
        { label: "highest wpm", value: profile.highestWpm },
        { label: "average wpm", value: profile.averageWpm },
        { label: "last 5 wpm", value: profile.averageWpmLastFive },
        { label: "highest accuracy", value: profile.highestAccuracy },
        { label: "average accuracy", value: profile.averageAccuracy },
        { label: "last 5 accuracy", value: profile.averageAccuracyLastFive }
    ];

    return (
        <div className="stats-grid">
            {stats.map((stat, idx) => (
                <div className="stat-card" key={idx}>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                </div>
            ))}
        </div>
    );
};

export default ProfileStats;
