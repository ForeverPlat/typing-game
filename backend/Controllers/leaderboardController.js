import TestResult from "../Models/TestResult.js";
import User from "../Models/User.js";

export const getLeaderBoard = async (req, res, next) => {

    try {
        const topResults = await TestResult.find({})
            .sort({ wpm: -1 })
            .limit(10)
            .populate('user', 'username')
            .select('wpm accuracy user createdAt');

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