import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Alerts() {
  const [items, setItems] = useState([])

  const load = async () => {
    const res = await api.get('/alerts')
    setItems(res.data)
  }
  useEffect(() => { load() }, [])

  const resolve = async (id) => {
    await api.post(`/alerts/${id}/resolve`)
    load()
  }

  return (
    <div>
      <h1>Alerts</h1>
      <div className="card">
        <table className="table">
          <thead><tr><th>Time</th><th>Product</th><th>Message</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {items.map(a => (
              <tr key={a.id}>
                <td>{new Date(a.createdAt).toLocaleString()}</td>
                <td>{a.Product?.name}</td>
                <td>{a.message}</td>
                <td>{a.resolved ? 'Resolved' : 'Open'}</td>
                <td>{!a.resolved && <button className="btn" onClick={()=>resolve(a.id)}>Resolve</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
