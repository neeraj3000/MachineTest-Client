import { NavLink, useNavigate } from 'react-router-dom'
import { toggleTheme } from '../lib/theme'
import { useMemo, useState } from 'react'

export default function Nav() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(
    typeof document !== 'undefined' ? (document.documentElement.getAttribute('data-theme') || 'light') : 'light'
  )

  const initials = useMemo(() => {
    const name = user.name || user.email || 'U'
    const parts = String(name).trim().split(/\s+/)
    const s = parts.length > 1 ? (parts[0][0] + parts[1][0]) : parts[0][0]
    return s?.toUpperCase() || 'U'
  }, [user])

  function handleToggleTheme() {
    const next = toggleTheme()
    setTheme(next)
  }
  return (
    <nav style={{ marginBottom: 16 }}>
      <button
        className="btn btn-ghost nav-toggle"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(v => !v)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <div className={`nav-left ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 6 }}>
            <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          Dashboard
        </NavLink>
        {user.role === 'ADMIN' && <>
          <NavLink to="/agents" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 6 }}>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M17 11a3 3 0 1 0 0-6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M21 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Agents
          </NavLink>
          <NavLink to="/upload" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 6 }}>
              <path d="M12 16V4m0 0 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <rect x="3" y="16" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Upload
          </NavLink>
        </>}
      </div>
      <div className="nav-right">
        <button className="btn btn-ghost icon-btn" aria-label="Toggle theme" title="Toggle theme" onClick={handleToggleTheme}>
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41m0-14.14-1.41 1.41M6.34 17.66 4.93 19.07" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          )}
        </button>
        <div className="avatar" title={user.name || user.email || 'User'}>{initials}</div>
        <button className="btn btn-danger" onClick={() => { if (!confirm('Are you sure you want to logout?')) return; localStorage.clear(); navigate('/login') }}>
          Logout
        </button>
      </div>
    </nav>
  )
}
