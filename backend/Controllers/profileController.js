export const getProfile = (req, res) => {
    const {username, userId} = req.userInfo;

    res.json({ 
        success: 'true',
        message: 'profile page',
        user: {
            _id: userId,
            username
        }
    });
}