import express from 'express';
import { getLeaderBoard } from '../Controllers/leaderboardController.js';

const router = express.Router();

router.get('/leaderboard', getLeaderBoard);

export default router;