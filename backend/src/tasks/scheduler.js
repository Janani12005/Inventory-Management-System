import cron from 'node-cron';
import { Product } from '../models/index.js';
import { ensureLowStockAlert } from '../controllers/helpers.js';

export function startSchedulers() {
  // Every 5 minutes, scan for low stock and raise alerts.
  cron.schedule('*/5 * * * *', async () => {
    try {
      const products = await Product.findAll();
      await Promise.all(products.map(p => ensureLowStockAlert(p.id)));
      console.log('[cron] Low-stock scan complete');
    } catch (e) {
      console.error('[cron] scan error', e);
    }
  });
}
