const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

function authHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function api(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers || {})
    }
  })
  if (!res.ok) {
    let msg = 'Request failed'
    try { const j = await res.json(); msg = j.message || msg } catch (_) {}
    throw new Error(msg)
  }
  return res.json()
}

export async function apiForm(path, formData, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    body: formData,
    headers: { ...authHeaders(), ...(options.headers || {}) }
  })
  if (!res.ok) {
    let msg = 'Request failed'
    try { const j = await res.json(); msg = j.message || msg } catch (_) {}
    throw new Error(msg)
  }
  return res.json()
}
