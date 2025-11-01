import { Product, Supplier, StockMovement, Alert, sequelize } from '../models/index.js';

export async function ensureLowStockAlert(productId) {
  const product = await Product.findByPk(productId);
  if (!product) return;
  if (product.quantity <= product.reorderLevel) {
    const existing = await Alert.findOne({
      where: { ProductId: product.id, resolved: false }
    });
    if (!existing) {
      await Alert.create({
        ProductId: product.id,
        message: `Low stock for ${product.name} (qty: ${product.quantity}, reorder at ${product.reorderLevel})`
      });
    }
  } else {
    // Resolve open alerts if stock recovered
    await Alert.update({ resolved: true }, { where: { ProductId: product.id, resolved: false } });
  }
}

export async function createMovementAndUpdateStock({ productId, type, quantity, note }) {
  return await sequelize.transaction(async (t) => {
    const product = await Product.findByPk(productId, { transaction: t, lock: t.LOCK.UPDATE });
    if (!product) throw new Error('Product not found');
    const q = parseInt(quantity, 10);
    if (type === 'OUT' && product.quantity < q) {
      throw new Error('Insufficient stock');
    }
    const delta = type === 'IN' ? q : -q;
    product.quantity += delta;
    await product.save({ transaction: t });
    const movement = await StockMovement.create({ ProductId: product.id, type, quantity: q, note }, { transaction: t });
    await ensureLowStockAlert(product.id);
    return { product, movement };
  });
}
