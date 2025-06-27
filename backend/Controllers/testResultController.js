import TestResult from "../Models/TestResult.js";

export const addTestResult = async (req, res) => {
    const userId = req.userInfo.userId;
    const { wpm, accuracy, duration } = req.body;

    if (!wpm || !accuracy || !duration) {
        return res.status(404).json({ msg: `All fields need to be filled` });
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
}

export const getUserResults = async (req, res) => {
    const userId = req.userInfo.userId;

    const results = await TestResult.find({ user: userId }).sort({ createdAt: -1});

    // results.forEach(result => {
    //     console.log(result.wpm);
    // });

    res.json({
        success: true,
        message: 'Got user result',
        data: {
            results
        }
    });
}