import express from 'express';
import {
  stockOut,
  getStockLogs,
  getReports,
  getStockSummary,
  getProfitGraphData,
  // getFruitStockReports
} from '../controllers/stockController.js';

import { authMiddleware , roleMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/out', authMiddleware, roleMiddleware('salesman'), stockOut);

router.get('/logs', authMiddleware, getStockLogs);

router.get('/reports', authMiddleware, roleMiddleware(['admin', 'manager']), getReports);

router.get('/summery', authMiddleware, roleMiddleware(['admin', 'manager']), getStockSummary);
router.get('/profit-trends',authMiddleware,roleMiddleware(['admin','manager']), getProfitGraphData);
// router.get('/inventory-report', getFruitStockReports);

export default router;
