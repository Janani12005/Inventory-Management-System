import { Router } from 'express';
import { Product, Supplier } from '../models/index.js';
import { ensureLowStockAlert } from '../controllers/helpers.js';

const router = Router();

router.get('/', async (req, res) => {
  const products = await Product.findAll({ include: Supplier, order: [['createdAt', 'DESC']] });
  res.json(products);
});

router.post('/', async (req, res) => {
  try {
    const p = await Product.create(req.body);
    await ensureLowStockAlert(p.id);
    res.status(201).json(p);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  const p = await Product.findByPk(req.params.id, { include: Supplier });
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

router.put('/:id', async (req, res) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    await p.update(req.body);
    await ensureLowStockAlert(p.id);
    res.json(p);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  await p.destroy();
  res.json({ ok: true });
});

export default router;
