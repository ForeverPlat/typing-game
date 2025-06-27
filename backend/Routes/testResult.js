import express from 'express';
import { addTestResult, getUserResults } from '../Controllers/testResultController.js';
import authMiddleware from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/test-result', authMiddleware, addTestResult);

router.get('/test-result', authMiddleware, getUserResults);

export default router;