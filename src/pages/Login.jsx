import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <Card title="Welcome back">
        <form onSubmit={handleSubmit}>
          <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
          <Input label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" required />
          {error && <div className="field-error" style={{ marginBottom: 8 }}>{error}</div>}
          <Button disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
        </form>
      </Card>
      <p className="muted">Use admin@example.com / Admin@123</p>
    </div>
  )
}
