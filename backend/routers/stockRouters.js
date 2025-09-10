import express from 'express';

import { stockOut, getStockLogs, getReports, getStockSummary } from '../controllers/stockController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/out', authMiddleware, roleMiddleware('salesman'), stockOut);

router.get('/logs', authMiddleware, getStockLogs);

router.get('/reports', authMiddleware, roleMiddleware(['admin', 'manager']), getReports);

router.get('/summery', authMiddleware, roleMiddleware(['admin', 'manager']), getStockSummary);

// router.get('/profit-trends', authMiddleware, roleMiddleware(['admin', 'manager']), getProfitGraphData);

export default router;
