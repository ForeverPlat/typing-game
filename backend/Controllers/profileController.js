export const getProfile = (req, res, next) => {
    try {
        const {username, userId} = req.userInfo;

        res.json({ 
            success: 'true',
            message: 'profile page',
            user: {
                _id: userId,
                username
            }
        });
    } catch (err) {
        next(err);
    }
}