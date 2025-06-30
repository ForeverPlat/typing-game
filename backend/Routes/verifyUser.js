import express from 'express';
import authMiddleware from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.get('/verify-user', authMiddleware, (req, res) => {

    res.status(200).json({
        success: true,
        message: 'verified user'
    });
});

export default router;