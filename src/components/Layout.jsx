import Nav from './Nav'
import { useEffect } from 'react'
import { applyTheme, getInitialTheme } from '../lib/theme'

// App shell with sticky header, global theme initialization, and main content container
export default function Layout({ title, actions, children }) {
  useEffect(() => {
    applyTheme(getInitialTheme())
  }, [])
  return (
    <div>
      <header className="app-header">
        <div className="app-header-inner">
          <div className="brand" style={{ paddingLeft: 8 }}>List Manager</div>
          <Nav />
        </div>
      </header>
      <main className="container">
        {title && (
          <div className="page-header">
            <h2>{title}</h2>
            <div className="page-actions">{actions}</div>
          </div>
        )}
        {children}
      </main>
    </div>
  )
}
