import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FaFile,
  FaFolder,
  FaSearch,
  FaNetworkWired,
  FaServer,
  FaPlay
} from 'react-icons/fa'

const ShellTool = () => {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('file')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [path, setPath] = useState('')
  const [pattern, setPattern] = useState('')
  const [command, setCommand] = useState('')

  const categories = [
    { id: 'file', name: t('shell.category.file'), icon: FaFile },
    { id: 'directory', name: t('shell.category.directory'), icon: FaFolder },
    { id: 'search', name: t('shell.category.search'), icon: FaSearch },
    { id: 'network', name: t('shell.category.network'), icon: FaNetworkWired },
    { id: 'system', name: t('shell.category.system'), icon: FaServer }
  ]

  const executeCommand = (command: string) => {
    setError('')
    // 在实际应用中，这里会执行 shell 命令
    // 这里我们只是模拟显示将要执行的命令
    setOutput(`Shell Command: ${command}`)
  }

  const renderCommands = () => {
    switch (selectedCategory) {
      case 'file':
        return (
          <div className="space-y-2">
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">File Path</label>
              <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="input w-full"
                placeholder="Enter file path"
              />
            </div>
            <button
              onClick={() => executeCommand(`ls -l ${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.file.list')}
            </button>
            <button
              onClick={() => executeCommand(`cat ${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.file.view')}
            </button>
            <button
              onClick={() => executeCommand(`rm ${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.file.delete')}
            </button>
            <button
              onClick={() => executeCommand(`chmod +x ${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.file.executable')}
            </button>
          </div>
        )
      case 'directory':
        return (
          <div className="space-y-2">
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Directory Path</label>
              <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="input w-full"
                placeholder="Enter directory path"
              />
            </div>
            <button
              onClick={() => executeCommand(`mkdir -p ${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.directory.create')}
            </button>
            <button
              onClick={() => executeCommand(`rm -rf ${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.directory.delete')}
            </button>
            <button
              onClick={() => executeCommand(`ls -la ${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.directory.list')}
            </button>
            <button
              onClick={() => executeCommand(`du -sh ${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.directory.size')}
            </button>
          </div>
        )
      case 'search':
        return (
          <div className="space-y-2">
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Search Pattern</label>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="input w-full"
                placeholder="Enter search pattern"
              />
            </div>
            <button
              onClick={() => executeCommand(`find . -name "${pattern}"`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.search.find')}
            </button>
            <button
              onClick={() => executeCommand(`grep -r "${pattern}" .`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.search.grep')}
            </button>
            <button
              onClick={() => executeCommand(`locate "${pattern}"`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.search.locate')}
            </button>
            <button
              onClick={() => executeCommand(`which "${pattern}"`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.search.which')}
            </button>
          </div>
        )
      case 'network':
        return (
          <div className="space-y-2">
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Host/Port</label>
              <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="input w-full"
                placeholder="Enter host:port"
              />
            </div>
            <button
              onClick={() => executeCommand(`ping ${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.network.ping')}
            </button>
            <button
              onClick={() => executeCommand(`curl -I ${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.network.curl')}
            </button>
            <button
              onClick={() => executeCommand(`netstat -an | grep ${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.network.netstat')}
            </button>
            <button
              onClick={() => executeCommand(`lsof -i :${path}`)}
              className="btn btn-secondary w-full"
            >
              {t('shell.network.lsof')}
            </button>
          </div>
        )
      case 'system':
        return (
          <div className="space-y-2">
            <button
              onClick={() => executeCommand('top -b -n 1')}
              className="btn btn-secondary w-full"
            >
              {t('shell.system.processes')}
            </button>
            <button
              onClick={() => executeCommand('df -h')}
              className="btn btn-secondary w-full"
            >
              {t('shell.system.disk')}
            </button>
            <button
              onClick={() => executeCommand('free -h')}
              className="btn btn-secondary w-full"
            >
              {t('shell.system.memory')}
            </button>
            <button
              onClick={() => executeCommand('uname -a')}
              className="btn btn-secondary w-full"
            >
              {t('shell.system.info')}
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`btn flex items-center gap-2 ${
                selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          )
        })}
      </div>

      {/* Commands */}
      {renderCommands()}

      {/* Custom Command */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Custom Command</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="input flex-1"
            placeholder="Enter custom command"
          />
          <button
            onClick={() => executeCommand(command)}
            className="btn btn-primary flex items-center gap-2"
          >
            <FaPlay className="w-4 h-4" />
            {t('shell.execute')}
          </button>
        </div>
      </div>

      {/* Output */}
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}
      {output && (
        <div className="bg-gray-50 text-gray-700 p-4 rounded-lg font-mono text-sm">
          {output}
        </div>
      )}
    </div>
  )
}

export default ShellTool 