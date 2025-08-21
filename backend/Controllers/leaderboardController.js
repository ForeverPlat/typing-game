import TestResult from "../Models/TestResult.js";
import User from "../Models/User.js";

export const getLeaderBoard = async (req, res, next) => {

    try {
        const results = await TestResult.find({})
            .sort({ wpm: -1 })
            // .limit(10)
            .populate('user', 'username')
            .select('wpm accuracy user createdAt');

            //  unique users on board
            const topResults  = [];
            const seenUsers = new Set();

            for (const result of results) {
                if (!seenUsers.has(result.user._id.toString())) {
                    topResults.push(result);
                    seenUsers.add(result.user._id.toString());
                }
                if (topResults.length === 10) break;
            }

        res.json({
            success: true,
            message: 'Leaderboard sent',
            data: {
                topResults
            }
        });
    } catch (err) {
        next(err);
    }
}