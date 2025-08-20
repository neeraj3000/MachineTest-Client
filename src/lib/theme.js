// Theme utilities for applying/persisting light/dark mode
export function getStoredTheme() {
  try { return localStorage.getItem('theme') } catch (_) { return null }
}

export function getSystemPrefersDark() {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function getInitialTheme() {
  const stored = getStoredTheme()
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

export function applyTheme(theme) {
  const t = theme === 'dark' ? 'dark' : 'light'
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', t)
  }
  try { localStorage.setItem('theme', t) } catch (_) {}
  return t
}

export function toggleTheme() {
  const current = typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') : 'light'
  const next = current === 'dark' ? 'light' : 'dark'
  return applyTheme(next)
}


