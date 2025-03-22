import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function RedisTool() {
  const { t } = useTranslation()
  const [host, setHost] = useState('')
  const [port, setPort] = useState('')
  const [password, setPassword] = useState('')
  const [command, setCommand] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleExecute = async () => {
    try {
      // TODO: Implement Redis command execution
      setError('Not implemented yet')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('redis.host')}
        </label>
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          className="input w-full"
          placeholder="localhost"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('redis.port')}
        </label>
        <input
          type="text"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          className="input w-full"
          placeholder="6379"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('redis.password')}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input w-full"
          placeholder="Password (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('redis.command')}
        </label>
        <textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="input w-full h-32"
          placeholder="GET key"
        />
      </div>

      <button
        onClick={handleExecute}
        className="btn btn-primary"
      >
        {t('redis.execute')}
      </button>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  )
} 