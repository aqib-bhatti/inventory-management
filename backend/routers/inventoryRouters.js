import express from 'express';

import { addInventory, getAllInventory, getInventoryById, updateInventory, deleteItem } from '../controllers/inventoryController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/addInventory', authMiddleware, roleMiddleware('manager'), addInventory);

router.get('/getAllInventory', getAllInventory);

router.get('/getInventory/:id', getInventoryById);

router.put('/updateInventory/:id', authMiddleware, roleMiddleware('manager'), updateInventory);

router.delete('/deleteItem/:id', authMiddleware, roleMiddleware('manager'), deleteItem);

export default router;
