import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Products from './pages/Products.jsx'
import Suppliers from './pages/Suppliers.jsx'
import Movements from './pages/Movements.jsx'
import Alerts from './pages/Alerts.jsx'
import './styles.css'

function Layout({ children }) {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>IMS</h2>
        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/suppliers">Suppliers</NavLink>
          <NavLink to="/movements">Stock</NavLink>
          <NavLink to="/alerts">Alerts</NavLink>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/movements" element={<Movements />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
