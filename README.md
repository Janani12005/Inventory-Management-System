# Inventory-Management-System

A full-stack **Inventory Management System** web application to track products, suppliers, stock levels, generate low-stock alerts, and visualize reports — built with **React**, **Node.js**, **Express**, and **Sequelize (SQLite in-memory)**.

> ⚡️ The system uses an **ephemeral in-memory SQLite database**, meaning the database resets each time the server restarts — perfect for testing, demos, and development without installing MySQL.

---

## 🚀 Features

✅ **Product Management**
- Add, edit, delete, and view products  
- Track stock levels and pricing  
- Auto low-stock alerts based on reorder level  

✅ **Supplier Management**
- Manage supplier details  
- Link products with suppliers  

✅ **Stock Movements**
- Record stock-in and stock-out transactions  
- Maintain stock movement history  

✅ **Low-Stock Alerts**
- Auto-generate alerts when quantity ≤ reorder level  
- Resolve alerts once replenished  

✅ **Reports & Dashboard**
- Dynamic analytics dashboard using **Chart.js**  
- Visualize stock summaries and low-stock data  

✅ **Fully Functional API + Frontend**
- RESTful APIs using Express  
- Modern React frontend (Vite + Axios)  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite) + Axios + Chart.js |
| **Backend** | Node.js + Express.js |
| **ORM** | Sequelize |
| **Database** | SQLite (in-memory) |
| **Styling** | CSS / Tailwind (optional) |
| **Tools** | Concurrently, Cross-Env |

---

## ⚙️ Project Structure

```

inventory-management-system/
│
├── backend/                # Express backend (API + ORM)
│   ├── src/
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # REST API routes
│   │   ├── controllers/    # Business logic
│   │   ├── tasks/          # Scheduler for low-stock checks
│   │   └── server.js       # Backend entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/               # React frontend (Vite)
│   ├── src/
│   │   ├── pages/          # UI components (Dashboard, Products, etc.)
│   │   ├── api.js          # Axios setup
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── package.json            # Root orchestrator (runs both servers)
└── README.md               # Project documentation

````

---

## 🪄 Quick Start (Single Command Setup)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Janani12005/Inventory-Management-System.git
cd Inventory-Management-System
````

### 2️⃣ Run everything with one command

```bash
npm run start
```

This will automatically:

* Install backend & frontend dependencies
* Install `sqlite3` for the in-memory DB
* Create `.env` if missing
* Launch backend ([http://localhost:4000](http://localhost:4000))
* Launch frontend ([http://localhost:5173](http://localhost:5173))

🟢 Example logs:

```
[models] Using in-memory SQLite database (ephemeral).
DB connected and synced
API listening on http://localhost:4000
```

---

## 🧩 Environment Variables

You don’t need to configure MySQL — SQLite runs automatically.
However, these are supported if you later switch to MySQL:

| Variable     | Description                    | Default                 |
| ------------ | ------------------------------ | ----------------------- |
| `DB_HOST`    | Database host                  | `localhost`             |
| `DB_PORT`    | Database port                  | `3306`                  |
| `DB_NAME`    | Database name                  | `ims_db`                |
| `DB_USER`    | Database user                  | `root`                  |
| `DB_PASS`    | Database password              | —                       |
| `USE_SQLITE` | Use in-memory SQLite if `true` | `true`                  |
| `PORT`       | Backend API port               | `4000`                  |
| `ORIGIN`     | Allowed frontend URL           | `http://localhost:5173` |

---

## 🧮 Available Scripts

| Command            | Description                                   |
| ------------------ | --------------------------------------------- |
| `npm run start`    | Installs everything & runs frontend + backend |
| `npm run backend`  | Runs backend only (with SQLite)               |
| `npm run frontend` | Runs frontend only                            |

---

## 🧠 Example Workflow

1. Open `http://localhost:5173` in your browser.
2. Add suppliers and products.
3. Adjust stock levels using the “Stock Movements” section.
4. See live updates in the dashboard with charts.
5. Check the “Alerts” page for low-stock notifications.

All data is stored in-memory and resets when the server restarts.

---

## 📊 Example Screens (Optional)

| Page          | Description                                   |
| ------------- | --------------------------------------------- |
| **Dashboard** | Displays key stats & charts                   |
| **Products**  | Manage all products with low-stock indicators |
| **Suppliers** | Add and link supplier details                 |
| **Movements** | Track IN/OUT stock transactions               |
| **Alerts**    | View or resolve low-stock alerts              |


---

## 🧠 Future Enhancements

* 🔐 Add user authentication (JWT)
* 💾 Switch to persistent MySQL/PostgreSQL
* 📊 Export reports (CSV / PDF)
* 🔎 Add pagination and search
* ☁️ Deploy using Docker + Nginx

---

## 🧑‍💻 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to modify.

1. Fork the project
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---


## ⭐ Acknowledgements

Special thanks to:

* **Sequelize** for ORM
* **Chart.js** for visual analytics
* **Vite + React** for a blazing fast frontend dev experience
* **Concurrently** and **Cross-Env** for single-command project orchestration

---

### 💻 Developer Quick Commands

For convenience:

```bash
# Run the whole project (frontend + backend + sqlite)
npm run start

# Run backend only
npm run backend

# Run frontend only
npm run frontend

# Clean install
npm install
```

---

### 📘 Summary

| Aspect               | Description                                           |
| -------------------- | ----------------------------------------------------- |
| **Project Type**     | Full-stack Web Application                            |
| **Goal**             | Inventory Tracking, Stock Alerts, Supplier Management |
| **Frontend Port**    | 5173                                                  |
| **Backend Port**     | 4000                                                  |
| **Database**         | SQLite (in-memory, resets on restart)                 |
| **Command to Start** | `npm run start`                                       |

---

> 🧡 **Tip:**
> If you ever switch to a persistent database (like MySQL or Postgres), just set `USE_SQLITE=false` and update your `.env` with DB credentials — everything else will work seamlessly!

---
