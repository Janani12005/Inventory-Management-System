import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Products() {
  const [items, setItems] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [form, setForm] = useState({ sku:'', name:'', description:'', price:0, quantity:0, reorderLevel:5, reorderQuantity:10, SupplierId: '' })
  const [editing, setEditing] = useState(null)

  const load = async () => {
    const [p,s] = await Promise.all([api.get('/products'), api.get('/suppliers')])
    setItems(p.data); setSuppliers(s.data)
  }
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (editing) {
      await api.put(`/products/${editing.id}`, form)
    } else {
      await api.post('/products', form)
    }
    setForm({ sku:'', name:'', description:'', price:0, quantity:0, reorderLevel:5, reorderQuantity:10, SupplierId: '' })
    setEditing(null)
    load()
  }

  const edit = (p) => {
    setEditing(p)
    setForm({ ...p, SupplierId: p.SupplierId })
  }

  const del = async (id) => {
    if (!confirm('Delete this product?')) return
    await api.delete(`/products/${id}`)
    load()
  }

  return (
    <div>
      <h1>Products</h1>
      <div className="card">
        <form onSubmit={submit} className="row">
          <div className="col-4"><input className="input" placeholder="SKU" value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})} required /></div>
          <div className="col-4"><input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required /></div>
          <div className="col-4">
            <select className="select" value={form.SupplierId} onChange={e=>setForm({...form, SupplierId:e.target.value})}>
              <option value="">Supplier (optional)</option>
              {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="col-6"><input className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} /></div>
          <div className="col-3"><input type="number" step="0.01" className="input" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:parseFloat(e.target.value)})} /></div>
          <div className="col-3"><input type="number" className="input" placeholder="Qty" value={form.quantity} onChange={e=>setForm({...form, quantity:parseInt(e.target.value||0)})} /></div>
          <div className="col-3"><input type="number" className="input" placeholder="Reorder Level" value={form.reorderLevel} onChange={e=>setForm({...form, reorderLevel:parseInt(e.target.value||0)})} /></div>
          <div className="col-3"><input type="number" className="input" placeholder="Reorder Qty" value={form.reorderQuantity} onChange={e=>setForm({...form, reorderQuantity:parseInt(e.target.value||0)})} /></div>
          <div className="col-3"><button className="btn">{editing ? 'Update' : 'Add'}</button></div>
          {editing && <div className="col-3"><button type="button" className="btn secondary" onClick={()=>{setEditing(null); setForm({ sku:'', name:'', description:'', price:0, quantity:0, reorderLevel:5, reorderQuantity:10, SupplierId: '' })}}>Cancel</button></div>}
        </form>
      </div>

      <div className="card">
        <table className="table">
          <thead><tr>
            <th>SKU</th><th>Name</th><th>Supplier</th><th>Price</th><th>Qty</th><th>Reorder</th><th></th>
          </tr></thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id}>
                <td>{p.sku}</td>
                <td>{p.name} {p.quantity <= p.reorderLevel && <span className="badge low">Low</span>}</td>
                <td>{p.Supplier?.name || '—'}</td>
                <td>₹{p.price?.toFixed(2)}</td>
                <td>{p.quantity}</td>
                <td>{p.reorderLevel}</td>
                <td className="flex">
                  <button className="btn" onClick={()=>edit(p)}>Edit</button>
                  <button className="btn secondary" onClick={()=>del(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
