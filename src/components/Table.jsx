import { useMemo, useState } from 'react'

// Simple table with client-side search and pagination; accepts columns and data
export default function Table({ columns = [], data = [], rowKey, pageSize = 10, searchable = true }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return data
    const q = query.toLowerCase()
    return data.filter((row) => {
      return columns.some((c) => {
        if (c.key === 'actions') return false
        const val = c.render ? '' : row[c.accessor]
        return String(val ?? '').toLowerCase().includes(q)
      })
    })
  }, [data, columns, query, searchable])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const visible = filtered.slice(start, start + pageSize)

  return (
    <div>
      <div className="table-controls">
        {searchable && (
          <input
            placeholder="Search..."
            value={query}
            onChange={(e) => { setPage(1); setQuery(e.target.value) }}
            style={{ maxWidth: 260 }}
          />
        )}
        <div className="spacer" />
        <div className="pagination">
          <button className="btn btn-ghost" onClick={() => setPage(1)} disabled={currentPage === 1}>«</button>
          <button className="btn btn-ghost" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</button>
          <span className="muted">Page {currentPage} / {totalPages}</span>
          <button className="btn btn-ghost" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
          <button className="btn btn-ghost" onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}>»</button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((c) => (<th key={c.key || c.accessor}>{c.header}</th>))}
          </tr>
        </thead>
        <tbody>
          {visible.map((row, i) => (
            <tr key={rowKey ? row[rowKey] : i}>
              {columns.map((c) => (
                <td key={c.key || c.accessor}>{c.render ? c.render(row) : row[c.accessor]}</td>
              ))}
            </tr>
          ))}
          {visible.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="muted">No results</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
