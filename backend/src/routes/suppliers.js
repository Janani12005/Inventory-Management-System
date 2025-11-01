import { Router } from 'express';
import { Supplier, Product } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const items = await Supplier.findAll({ include: Product, order: [['createdAt', 'DESC']] });
  res.json(items);
});

router.post('/', async (req, res) => {
  try {
    const s = await Supplier.create(req.body);
    res.status(201).json(s);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const s = await Supplier.findByPk(req.params.id);
    if (!s) return res.status(404).json({ error: 'Not found' });
    await s.update(req.body);
    res.json(s);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  const s = await Supplier.findByPk(req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  await s.destroy();
  res.json({ ok: true });
});

export default router;
