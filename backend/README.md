# IMS Backend (Node.js/Express + Sequelize + MySQL)

## Quick Start

1. `cp .env.example .env` and fill DB credentials.
2. `npm install`
3. (Optional) `npm run seed` to create schema and sample data.
4. `npm run dev`

### API Summary

- `GET /api/products` list
- `POST /api/products` create
- `GET /api/products/:id` read
- `PUT /api/products/:id` update
- `DELETE /api/products/:id` delete

- `GET /api/suppliers` list, `POST /api/suppliers`, `PUT/DELETE /api/suppliers/:id`

- `GET /api/movements` recent stock movements
- `POST /api/movements` body: { productId, type: 'IN'|'OUT', quantity, note }

- `GET /api/reports/low-stock` products at/below reorder level
- `GET /api/reports/summary` quick KPIs
- `GET /api/reports/stock-series` name/quantity for charts

- `GET /api/alerts` list alerts
- `POST /api/alerts/:id/resolve` mark alert as resolved

A cron task runs every 5 minutes to scan for low stock and raise alerts.
