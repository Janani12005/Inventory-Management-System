// backend/src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './models/index.js';
import productRoutes from './routes/products.js';
import supplierRoutes from './routes/suppliers.js';
import movementRoutes from './routes/movements.js';
import reportRoutes from './routes/reports.js';
import alertRoutes from './routes/alerts.js';
import { startSchedulers } from './tasks/scheduler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.ORIGIN || 'http://localhost:5173';
const USE_SQLITE = (process.env.USE_SQLITE === 'true');

app.use(cors({ origin: ORIGIN }));
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'IMS API running' }));

app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/alerts', alertRoutes);

async function tryBootstrapIfNeeded() {
  if (USE_SQLITE) {
    console.log('[server] USE_SQLITE=true -> skipping bootstrap.');
    return;
  }

  // Only attempt bootstrap if db-init.js exists next to this file
  const bootstrapPath = path.join(__dirname, 'db-init.js');
  if (!fs.existsSync(bootstrapPath)) {
    console.log('[server] db-init.js not found; skipping bootstrap.');
    return;
  }

  try {
    // dynamic import to avoid duplicate top-level imports and to keep ESM semantics
    const mod = await import(bootstrapPath);
    if (mod && typeof mod.default === 'function') {
      console.log('[server] Running DB bootstrap (db-init.js)...');
      await mod.default();
    } else {
      console.log('[server] db-init.js loaded but export default not a function. Skipping.');
    }
  } catch (err) {
    // show clear message but don't crash here — let sequelize attempt to connect afterwards
    console.error('[server] Error running db-init bootstrap:', err && err.message ? err.message : err);
  }
}

(async () => {
  try {
    await tryBootstrapIfNeeded();

    await sequelize.authenticate();
    await sequelize.sync(); // auto-create tables
    console.log('DB connected and synced');
    startSchedulers();
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
