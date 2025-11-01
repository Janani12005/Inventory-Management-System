import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Suppliers() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name:'', email:'', phone:'' })
  const [editing, setEditing] = useState(null)

  const load = async () => {
    const res = await api.get('/suppliers')
    setItems(res.data)
  }
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (editing) await api.put(`/suppliers/${editing.id}`, form)
    else await api.post('/suppliers', form)
    setForm({ name:'', email:'', phone:'' })
    setEditing(null)
    load()
  }

  return (
    <div>
      <h1>Suppliers</h1>
      <div className="card">
        <form onSubmit={submit} className="row">
          <div className="col-4"><input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required /></div>
          <div className="col-4"><input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
          <div className="col-3"><input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} /></div>
          <div className="col-1"><button className="btn">{editing?'Update':'Add'}</button></div>
        </form>
      </div>

      <div className="card">
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Products</th><th></th></tr></thead>
          <tbody>
            {items.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email || '—'}</td>
                <td>{s.phone || '—'}</td>
                <td>{s.Products?.length ?? 0}</td>
                <td className="flex">
                  <button className="btn" onClick={()=>{setEditing(s); setForm({ name:s.name, email:s.email||'', phone:s.phone||'' })}}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
