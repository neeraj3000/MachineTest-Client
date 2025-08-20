import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Table from '../components/Table'
import { api } from '../lib/api'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const data = await api('/tasks/me')
        setTasks(data.tasks)
      } catch (e) {
        setError(e.message)
      }
    })()
  }, [])

  return (
    <Layout title="Dashboard">
      {error && <div className="field-error" style={{ marginBottom: 12 }}>{error}</div>}
      <Card>
        <Table
          columns={[
            { header: 'First Name', accessor: 'firstName' },
            { header: 'Phone', accessor: 'phone' },
            { header: 'Notes', accessor: 'notes' }
          ]}
          data={tasks}
          pageSize={10}
        />
      </Card>
    </Layout>
  )
}
