// userRoutes.js

import express from 'express';
import { signup, login, getProfile, resetPassword, getAllUsers, deleteUser } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
const router = express.Router();

router.get('/getprofile', authMiddleware, getProfile);

router.get('/allusers', authMiddleware, roleMiddleware(['admin']), getAllUsers);

router.delete('/deleteuser/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);


export default router;
