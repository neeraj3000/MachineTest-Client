import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import Table from '../components/Table'
import { api } from '../lib/api'

export default function Agents() {
  const [agents, setAgents] = useState([])
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', email: '', mobile: '', password: '' })
  const [editLoading, setEditLoading] = useState(false)
  const [editErrors, setEditErrors] = useState({})

  async function load() {
    try {
      const data = await api('/agents')
      setAgents(data.agents)
    } catch (e) { setError(e.message) }
  }

  useEffect(() => { load() }, [])

  function validateEmail(email) {
    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(String(email).toLowerCase())
  }

  function validateE164(phone) {
    return /^\+[0-9]{10,15}$/.test(String(phone))
  }

  function validateStrongPassword(pwd) {
    return /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd) && String(pwd).length >= 8
  }

  function validateAgentForm(values, isUpdate = false) {
    const errs = {}
    if (!values.name?.trim()) errs.name = 'Name is required'
    if (values.email && !validateEmail(values.email)) errs.email = 'Invalid email'
    if (!values.email) errs.email = 'Email is required'
    if (!values.mobile) errs.mobile = 'Mobile is required'
    else if (!validateE164(values.mobile)) errs.mobile = 'Use format +15551234567'
    if (!isUpdate) {
      if (!values.password) errs.password = 'Password is required'
      else if (!validateStrongPassword(values.password)) errs.password = 'Min 8 chars incl. Aa1!'
    } else if (values.password) {
      if (!validateStrongPassword(values.password)) errs.password = 'Min 8 chars incl. Aa1!'
    }
    return errs
  }

  async function handleAdd(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const errs = validateAgentForm(form)
    setFormErrors(errs)
    if (Object.keys(errs).length) { setLoading(false); return }
    try {
      await api('/agents', { method: 'POST', body: JSON.stringify(form) })
      setForm({ name: '', email: '', mobile: '', password: '' })
      setFormErrors({})
      load()
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }

  function startEdit(agent) {
    setEditing(agent)
    setEditForm({ name: agent.name || '', email: agent.email || '', mobile: agent.mobile || '', password: '' })
    setEditErrors({})
  }

  async function handleUpdate(e) {
    e.preventDefault()
    if (!editing) return
    setEditLoading(true)
    const errs = validateAgentForm(editForm, true)
    setEditErrors(errs)
    if (Object.keys(errs).length) { setEditLoading(false); return }
    try {
      await api(`/agents/${editing.id || editing._id}`, { method: 'PUT', body: JSON.stringify(editForm) })
      setEditing(null)
      load()
    } catch (e) { setError(e.message) } finally { setEditLoading(false) }
  }

  async function handleDelete(agent) {
    if (!confirm(`Delete agent ${agent.name}? This will remove their tasks too.`)) return
    try {
      await api(`/agents/${agent.id || agent._id}`, { method: 'DELETE' })
      load()
    } catch (e) { setError(e.message) }
  }

  return (
    <Layout title="Agents">
      <Card title="Add Agent">
        <form onSubmit={handleAdd} style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <Input label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} error={formErrors.name} required />
          <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} error={formErrors.email} required />
          <Input label="Mobile" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} placeholder="+15551234567" error={formErrors.mobile} required />
          <Input label="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} error={formErrors.password} required />
          <div style={{ gridColumn: 'span 4' }}>
            {error && <div className="field-error" style={{ marginBottom: 8 }}>{error}</div>}
            <Button disabled={loading}>{loading ? 'Adding...' : 'Add Agent'}</Button>
          </div>
        </form>
      </Card>
      {editing && (
        <Card title={`Edit Agent: ${editing.name}`}>
          <form onSubmit={handleUpdate} style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <Input label="Name" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} error={editErrors.name} required />
            <Input label="Email" type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} error={editErrors.email} required />
            <Input label="Mobile" value={editForm.mobile} onChange={e => setEditForm({ ...editForm, mobile: e.target.value })} placeholder="+15551234567" error={editErrors.mobile} required />
            <Input label="Password (leave blank to keep)" type="password" value={editForm.password} onChange={e => setEditForm({ ...editForm, password: e.target.value })} error={editErrors.password} />
            <div style={{ gridColumn: 'span 4', display: 'flex', gap: 8 }}>
              <Button disabled={editLoading}>{editLoading ? 'Saving...' : 'Save Changes'}</Button>
              <Button type="button" variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}
      <Card title="All Agents">
        <Table
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Mobile', accessor: 'mobile' },
            { header: 'Actions', key: 'actions', render: (row) => (
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="ghost" onClick={() => startEdit(row)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(row)}>Delete</Button>
              </div>
            ) }
          ]}
          data={agents}
          pageSize={8}
        />
      </Card>
    </Layout>
  )
}
