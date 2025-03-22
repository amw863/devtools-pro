import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function NSQTool() {
  const { t } = useTranslation()
  const [nsqdAddress, setNsqdAddress] = useState('')
  const [topic, setTopic] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handlePublish = async () => {
    try {
      // TODO: Implement NSQ message publishing
      setError('Not implemented yet')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('nsq.nsqdAddress')}
        </label>
        <input
          type="text"
          value={nsqdAddress}
          onChange={(e) => setNsqdAddress(e.target.value)}
          className="input w-full"
          placeholder="localhost:4150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('nsq.topic')}
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input w-full"
          placeholder="my-topic"
        />
      </div>

      <button
        onClick={handlePublish}
        className="btn btn-primary"
      >
        {t('nsq.publish')}
      </button>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  )
} 