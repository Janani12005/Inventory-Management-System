// backend/src/models/index.js
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const USE_SQLITE = (process.env.USE_SQLITE === 'true');

let sequelize;
if (USE_SQLITE) {
  // In-memory SQLite (ephemeral)
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  console.log('[models] Using in-memory SQLite database (ephemeral).');
} else {
  const DB_HOST = process.env.DB_HOST || 'localhost';
  const DB_PORT = process.env.DB_PORT || 3306;
  const DB_NAME = process.env.DB_NAME || 'ims_db';
  const DB_USER = process.env.DB_USER || 'root';
  const DB_PASS = process.env.DB_PASS || '';

  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
  });
  console.log('[models] Using MySQL database at', `${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
}

// Define models
export const Product = sequelize.define('Product', {
  sku: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, defaultValue: 0 },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  reorderLevel: { type: DataTypes.INTEGER, defaultValue: 5 },
  reorderQuantity: { type: DataTypes.INTEGER, defaultValue: 10 },
});

export const Supplier = sequelize.define('Supplier', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
});

export const StockMovement = sequelize.define('StockMovement', {
  type: { type: DataTypes.ENUM('IN','OUT'), allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  note: { type: DataTypes.STRING },
});

export const Alert = sequelize.define('Alert', {
  message: { type: DataTypes.STRING, allowNull: false },
  resolved: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// Associations
Supplier.hasMany(Product, { foreignKey: { allowNull: true } });
Product.belongsTo(Supplier);

Product.hasMany(StockMovement);
StockMovement.belongsTo(Product);

Product.hasMany(Alert);
Alert.belongsTo(Product);

// Export sequelize explicitly (named export)
export { sequelize };
