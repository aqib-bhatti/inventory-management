// userRoutes.js

import express from 'express';
import { signup, login, getProfile, resetPassword, getAllUsers, deleteUser } from '../controllers/userController.js';
import { authMiddleware , roleMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/getprofile', authMiddleware, getProfile);

router.put('/resetpassword', authMiddleware, resetPassword);

router.get('/allusers', authMiddleware, roleMiddleware(['admin']), getAllUsers);

router.delete('/deleteuser/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

export default router;
