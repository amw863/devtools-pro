import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPlay, FaStop, FaTrash, FaList, FaDownload, FaUpload, FaSearch } from 'react-icons/fa'

const DockerTool = () => {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('container')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const categories = [
    { id: 'container', name: t('docker.category.container') },
    { id: 'image', name: t('docker.category.image') },
    { id: 'volume', name: t('docker.category.volume') },
    { id: 'network', name: t('docker.category.network') }
  ]

  const executeCommand = async (command: string) => {
    try {
      // Here we would execute the Docker command
      // For now, just show the command that would be executed
      setOutput(`Would execute: docker ${command}`)
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
      case 'container':
        return (
          <div className="space-y-2">
            <button
              onClick={() => executeCommand('ps -a')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaList className="w-4 h-4" />
              {t('docker.container.list')}
            </button>
            <button
              onClick={() => executeCommand('start')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaPlay className="w-4 h-4" />
              {t('docker.container.start')}
            </button>
            <button
              onClick={() => executeCommand('stop')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaStop className="w-4 h-4" />
              {t('docker.container.stop')}
            </button>
            <button
              onClick={() => executeCommand('rm')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaTrash className="w-4 h-4" />
              {t('docker.container.remove')}
            </button>
          </div>
        )
      case 'image':
        return (
          <div className="space-y-2">
            <button
              onClick={() => executeCommand('images')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaList className="w-4 h-4" />
              {t('docker.image.list')}
            </button>
            <button
              onClick={() => executeCommand('pull')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaDownload className="w-4 h-4" />
              {t('docker.image.pull')}
            </button>
            <button
              onClick={() => executeCommand('push')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaUpload className="w-4 h-4" />
              {t('docker.image.push')}
            </button>
          </div>
        )
      case 'volume':
        return (
          <div className="space-y-2">
            <button
              onClick={() => executeCommand('volume ls')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaList className="w-4 h-4" />
              {t('docker.volume.list')}
            </button>
            <button
              onClick={() => executeCommand('volume inspect')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaSearch className="w-4 h-4" />
              {t('docker.volume.inspect')}
            </button>
          </div>
        )
      case 'network':
        return (
          <div className="space-y-2">
            <button
              onClick={() => executeCommand('network ls')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaList className="w-4 h-4" />
              {t('docker.network.list')}
            </button>
            <button
              onClick={() => executeCommand('network inspect')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaSearch className="w-4 h-4" />
              {t('docker.network.inspect')}
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

export default DockerTool 