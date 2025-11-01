import { Router } from 'express';
import { Alert, Product } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const items = await Alert.findAll({ include: Product, order: [['createdAt','DESC']], limit: 100 });
  res.json(items);
});

router.post('/:id/resolve', async (req, res) => {
  const a = await Alert.findByPk(req.params.id);
  if (!a) return res.status(404).json({ error: 'Not found' });
  a.resolved = true;
  await a.save();
  res.json(a);
});

export default router;
