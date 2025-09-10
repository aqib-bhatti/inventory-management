import express from 'express';
import { signup, login, resetPassword } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.put('/resetpassword', authMiddleware, resetPassword);

export default router;
