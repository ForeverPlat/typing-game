import TestResult from "../Models/TestResult.js";

export const addTestResult = async (req, res, next) => {
    try {
        const userId = req.userInfo.userId;
        const { wpm, accuracy, duration } = req.body;

        if (!wpm || !accuracy || !duration) {
            return next(createError('All fields need to be filled', 400));
        }

        const testResult = new TestResult({
            user: userId,
            wpm,
            accuracy,
            duration
        });

        await testResult.save();

        return res.json({
            success: true,
            message: 'Test result saved',
            data: {
                wpm,
                accuracy,
                duration
            }
        });
    } catch (err) {
        next(err);
    }
}

export const getUserResults = async (req, res, next) => {
    try {
        const userId = req.userInfo.userId;

        const results = await TestResult.find({ user: userId }).sort({ createdAt: -1 });

        res.json({
            success: true,
            message: 'Got user result',
            data: {
                results
            }
        });
    } catch (err) {
        next(err);
    }
}