// backend/src/db-init.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_NAME = 'ims_db',
  DB_USER = 'ims_user',
  DB_PASS = 'examplepass',
  DB_ROOT_USER,
  DB_ROOT_PASS
} = process.env;

async function bootstrap() {
  // If no root creds provided, skip bootstrap and let sequelize try to connect
  if (!DB_ROOT_USER || !DB_ROOT_PASS) {
    console.log('[db-init] No root credentials provided (DB_ROOT_USER/DB_ROOT_PASS). Skipping bootstrap.');
    return;
  }

  // Connect as root (no database specified)
  const connConfig = {
    host: DB_HOST,
    port: Number(DB_PORT || 3306),
    user: DB_ROOT_USER,
    password: DB_ROOT_PASS,
    multipleStatements: true,
  };

  let connection;
  try {
    connection = await mysql.createConnection(connConfig);
    console.log('[db-init] Connected to MySQL as root/admin, checking/creating database and user...');

    // Create database if not exists, create user if not exists and grant privileges
    // Use parameterized queries carefully (we use escaped identifiers via backticks).
    const createDbSql = `
      CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `;

    // Using placeholders for password is not possible for identifiers, so we safely escape via mysql2 formatting
    const createUserSql = `
      CREATE USER IF NOT EXISTS ?@'localhost' IDENTIFIED BY ?;
    `;

    const grantSql = `
      GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO ?@'localhost';
      FLUSH PRIVILEGES;
    `;

    // run the database creation first
    await connection.query(createDbSql);
    // create user and grant (use connection.format to safely interpolate username/password)
    const createUserQuery = connection.format(createUserSql, [DB_USER, DB_PASS]);
    await connection.query(createUserQuery);

    const grantQuery = connection.format(grantSql, [DB_USER]);
    await connection.query(grantQuery);

    console.log(`[db-init] Ensured database "${DB_NAME}" and user "${DB_USER}" exist and have privileges.`);
  } catch (err) {
    console.error('[db-init] Bootstrap failed:', err.message || err);
    // Do not throw here — let calling code handle whether to continue or not.
  } finally {
    if (connection) await connection.end();
  }
}

export default bootstrap;
