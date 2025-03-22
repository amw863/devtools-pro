import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaGlobe, FaSearch, FaNetworkWired, FaTachometerAlt } from 'react-icons/fa'

const NetworkTool = () => {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('basic')
  const [host, setHost] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const categories = [
    { id: 'basic', name: t('network.category.basic') },
    { id: 'dns', name: t('network.category.dns') },
    { id: 'port', name: t('network.category.port') }
  ]

  const executeCommand = async (command: string) => {
    try {
      // Here we would execute the network command
      // For now, just show the command that would be executed
      setOutput(`Would execute: ${command} ${host}`)
      setError('')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An error occurred')
      }
      setOutput('')
    }
  }

  const renderCommands = () => {
    switch (selectedCategory) {
      case 'basic':
        return (
          <div className="space-y-2">
            <button
              onClick={() => executeCommand('ping')}
              className="btn btn-primary flex items-center gap-2"
              disabled={!host}
            >
              <FaGlobe className="w-4 h-4" />
              {t('network.ping')}
            </button>
            <button
              onClick={() => executeCommand('traceroute')}
              className="btn btn-primary flex items-center gap-2"
              disabled={!host}
            >
              <FaNetworkWired className="w-4 h-4" />
              {t('network.traceroute')}
            </button>
            <button
              onClick={() => executeCommand('speedtest')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaTachometerAlt className="w-4 h-4" />
              {t('network.speedTest')}
            </button>
          </div>
        )
      case 'dns':
        return (
          <div className="space-y-2">
            <button
              onClick={() => executeCommand('nslookup')}
              className="btn btn-primary flex items-center gap-2"
              disabled={!host}
            >
              <FaSearch className="w-4 h-4" />
              {t('network.nslookup')}
            </button>
            <button
              onClick={() => executeCommand('whois')}
              className="btn btn-primary flex items-center gap-2"
              disabled={!host}
            >
              <FaGlobe className="w-4 h-4" />
              {t('network.whois')}
            </button>
          </div>
        )
      case 'port':
        return (
          <div className="space-y-2">
            <button
              onClick={() => executeCommand('nmap')}
              className="btn btn-primary flex items-center gap-2"
              disabled={!host}
            >
              <FaSearch className="w-4 h-4" />
              {t('network.portScan')}
            </button>
            <button
              onClick={() => executeCommand('nc')}
              className="btn btn-primary flex items-center gap-2"
              disabled={!host}
            >
              <FaNetworkWired className="w-4 h-4" />
              {t('network.checkPort')}
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`btn ${
              selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-2">
          Host
        </label>
        <input
          type="text"
          id="host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          className="input"
          placeholder="example.com or IP address"
        />
      </div>

      <div className="space-y-4">
        {renderCommands()}
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {output && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Output
          </label>
          <pre className="bg-gray-50 p-4 rounded-lg text-sm font-mono overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}

export default NetworkTool 