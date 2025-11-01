import React, { useEffect, useState } from 'react'
import api from '../api'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [series, setSeries] = useState([])

  useEffect(() => {
    api.get('/reports/summary').then(res => setSummary(res.data))
    api.get('/reports/stock-series').then(res => setSeries(res.data))
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-3"><div className="card"><strong>Products</strong><div>{summary?.totalProducts ?? '—'}</div></div></div>
        <div className="col-3"><div className="card"><strong>Suppliers</strong><div>{summary?.totalSuppliers ?? '—'}</div></div></div>
        <div className="col-3"><div className="card"><strong>Total Stock</strong><div>{summary?.totalStock ?? '—'}</div></div></div>
        <div className="col-3"><div className="card"><strong>Movements</strong><div>{summary?.totalMovements ?? '—'}</div></div></div>
      </div>

      <div className="card">
        <h3>Stock by Product</h3>
        <Bar data={{
          labels: series.map(s => s.name),
          datasets: [{
            label: 'Quantity',
            data: series.map(s => s.quantity)
          }]
        }} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: false }}}} />
      </div>
    </div>
  )
}
