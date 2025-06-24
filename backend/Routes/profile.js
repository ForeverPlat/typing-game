import express from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'profile page' });
});

export default router;