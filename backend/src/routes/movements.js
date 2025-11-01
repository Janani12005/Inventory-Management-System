import { Router } from 'express';
import { StockMovement, Product } from '../models/index.js';
import { createMovementAndUpdateStock } from '../controllers/helpers.js';

const router = Router();

router.get('/', async (req, res) => {
  const items = await StockMovement.findAll({ include: Product, order: [['createdAt', 'DESC']], limit: 200 });
  res.json(items);
});

router.post('/', async (req, res) => {
  try {
    const { productId, type, quantity, note } = req.body;
    const result = await createMovementAndUpdateStock({ productId, type, quantity, note });
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
