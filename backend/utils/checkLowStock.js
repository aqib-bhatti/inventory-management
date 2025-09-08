import { collections } from '../db.js';
import { sendLowStockEmail } from './emailAutomation.js';

const LOWSTOCKTHRESHOLD = 5;

export const checkAndAlertLowStock = async () => {
    try {
        const inventory = await collections.inventory().find({}).toArray();
        const lowStockItems = inventory.filter(item => Number(item.quantity) <= LOWSTOCKTHRESHOLD);

        if (lowStockItems.length > 0) {
            await sendLowStockEmail(lowStockItems);
        } else {
            console.log('No low stock items found.');
        }
    } catch (error) {
        console.error('Error during low stock check:', error);
    }
};