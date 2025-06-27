import express from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";
import { getProfile } from "../Controllers/profileController.js";

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);

export default router;