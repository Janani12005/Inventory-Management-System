import { sequelize, Supplier, Product, StockMovement } from './models/index.js';

async function seed() {
  await sequelize.sync({ force: true });
  const s1 = await Supplier.create({ name: 'Acme Supplies', email: 'contact@acme.test', phone: '1234567890' });
  const s2 = await Supplier.create({ name: 'Global Traders', email: 'hello@global.test', phone: '9876543210' });

  const p1 = await Product.create({ sku: 'SKU-1001', name: 'Blue Widget', description: 'Standard blue widget', price: 19.99, quantity: 12, reorderLevel: 5, reorderQuantity: 20, SupplierId: s1.id });
  const p2 = await Product.create({ sku: 'SKU-1002', name: 'Red Widget', description: 'Premium red widget', price: 29.99, quantity: 4, reorderLevel: 6, reorderQuantity: 15, SupplierId: s2.id });
  const p3 = await Product.create({ sku: 'SKU-1003', name: 'Green Widget', description: 'Eco-friendly widget', price: 24.99, quantity: 8, reorderLevel: 5, reorderQuantity: 10, SupplierId: s1.id });

  await StockMovement.bulkCreate([
    { ProductId: p1.id, type: 'IN', quantity: 12, note: 'Initial stock' },
    { ProductId: p2.id, type: 'IN', quantity: 4, note: 'Initial stock' },
    { ProductId: p3.id, type: 'IN', quantity: 8, note: 'Initial stock' },
  ]);

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
