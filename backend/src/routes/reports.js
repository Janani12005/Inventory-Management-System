import { Router } from 'express';
import { Product, Supplier, StockMovement } from '../models/index.js';
import { Sequelize } from 'sequelize';

const router = Router();

router.get('/low-stock', async (req, res) => {
  const items = await Product.findAll({
    where: { quantity: { [Sequelize.Op.lte]: Sequelize.col('reorderLevel') } },
    include: Supplier
  });
  res.json(items);
});

router.get('/summary', async (req, res) => {
  const totalProducts = await Product.count();
  const totalSuppliers = await Supplier.count();
  const totalStock = await Product.sum('quantity');
  const totalMovements = await StockMovement.count();
  res.json({ totalProducts, totalSuppliers, totalStock, totalMovements });
});

router.get('/stock-series', async (req, res) => {
  // Series for charts: product name and quantity
  const items = await Product.findAll({ attributes: ['name','quantity'], order: [['name','ASC']] });
  res.json(items);
});

export default router;
