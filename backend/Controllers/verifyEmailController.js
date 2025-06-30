import User from "../Models/User.js";

export const verifyEmailController = async (req, res) => {
    const { userId, verificationToken } = req.query;

    const user = await User.findOne({ 
        _id: userId,
        verificationToken
    });

    if (!user) {
        return res.status(400).json({ msg: 'Invalid or expired verification link.' });
    }

    //  verification token expired
    if (user.verificationTokenExpires && user.verificationTokenExpires < Date.now()) {
        return res.status(400).json({ msg: 'Verification link has expired '});
    }

    // already verified
    if (user.verified) {
        return res.status(200).json({ msg: 'Email already verified.' });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ msg: 'Email verified successfully!' });
}