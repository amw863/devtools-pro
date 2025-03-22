import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PostgreSQLTool() {
  const { t } = useTranslation()
  const [connectionString, setConnectionString] = useState('')
  const [query, setQuery] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleExecute = async () => {
    try {
      // TODO: Implement PostgreSQL connection and query execution
      setError('Not implemented yet')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('postgres.connectionString')}
        </label>
        <input
          type="text"
          value={connectionString}
          onChange={(e) => setConnectionString(e.target.value)}
          className="input w-full"
          placeholder="postgresql://user:password@localhost:5432/database"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('postgres.query')}
        </label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input w-full h-32"
          placeholder="SELECT * FROM table"
        />
      </div>

      <button
        onClick={handleExecute}
        className="btn btn-primary"
      >
        {t('postgres.execute')}
      </button>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  )
} 