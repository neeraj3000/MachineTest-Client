import { useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Button from '../components/Button'
import Table from '../components/Table'
import { apiForm } from '../lib/api'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const data = await apiForm('/upload', fd)
      setResult(data.distributed || [])
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }

  return (
    <Layout title="Upload List">
      <Card>
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".csv,.xlsx,.xls" onChange={e => setFile(e.target.files[0])} />
          <Button style={{ marginLeft: 8 }} disabled={loading || !file}>{loading ? 'Uploading...' : 'Upload'}</Button>
        </form>
        {error && <div className="field-error" style={{ marginTop: 12 }}>{error}</div>}
      </Card>
      {result.map((r, idx) => (
        <Card key={idx} title={`${r.agent.name} (${r.agent.email})`}>
          <Table
            columns={[
              { header: 'First Name', accessor: 'firstName' },
              { header: 'Phone', accessor: 'phone' },
              { header: 'Notes', accessor: 'notes' }
            ]}
            data={r.tasks}
            pageSize={10}
          />
        </Card>
      ))}
    </Layout>
  )
}
