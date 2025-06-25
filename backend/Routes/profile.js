import express from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
    const {username, userId} = req.userInfo;

    res.json({ 
        message: 'profile page',
        user: {
            _id: userId,
            username,
        }
    });

});

export default router;