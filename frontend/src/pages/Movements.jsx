import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Movements() {
  const [list, setList] = useState([])
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ productId:'', type:'IN', quantity:1, note:'' })

  const load = async () => {
    const [m, p] = await Promise.all([api.get('/movements'), api.get('/products')])
    setList(m.data); setProducts(p.data)
  }
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    await api.post('/movements', form)
    setForm({ productId:'', type:'IN', quantity:1, note:'' })
    load()
  }

  return (
    <div>
      <h1>Stock Movements</h1>
      <div className="card">
        <form onSubmit={submit} className="row">
          <div className="col-4">
            <select className="select" value={form.productId} onChange={e=>setForm({...form, productId:e.target.value})} required>
              <option value="">Select Product</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="col-2">
            <select className="select" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
              <option value="IN">IN</option>
              <option value="OUT">OUT</option>
            </select>
          </div>
          <div className="col-2"><input type="number" min="1" className="input" value={form.quantity} onChange={e=>setForm({...form, quantity:parseInt(e.target.value||1)})} /></div>
          <div className="col-3"><input className="input" placeholder="Note" value={form.note} onChange={e=>setForm({...form, note:e.target.value})} /></div>
          <div className="col-1"><button className="btn">Add</button></div>
        </form>
      </div>

      <div className="card">
        <table className="table">
          <thead><tr><th>Time</th><th>Product</th><th>Type</th><th>Qty</th><th>Note</th></tr></thead>
          <tbody>
            {list.map(m => (
              <tr key={m.id}>
                <td>{new Date(m.createdAt).toLocaleString()}</td>
                <td>{m.Product?.name}</td>
                <td>{m.type}</td>
                <td>{m.quantity}</td>
                <td>{m.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
