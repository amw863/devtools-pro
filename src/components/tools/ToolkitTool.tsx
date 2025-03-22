import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FaCode,
  FaTerminal,
  FaChrome,
  FaDatabase,
  FaDocker,
  FaCloud,
  FaGitAlt,
  FaRocket,
  FaDownload,
  FaExternalLinkAlt
} from 'react-icons/fa'

const ToolkitTool = () => {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('ide')

  const categories = [
    { id: 'ide', name: t('toolkit.category.ide'), icon: FaCode },
    { id: 'terminal', name: t('toolkit.category.terminal'), icon: FaTerminal },
    { id: 'browser', name: t('toolkit.category.browser'), icon: FaChrome },
    { id: 'database', name: t('toolkit.category.database'), icon: FaDatabase },
    { id: 'container', name: t('toolkit.category.container'), icon: FaDocker },
    { id: 'api', name: t('toolkit.category.api'), icon: FaCloud },
    { id: 'git', name: t('toolkit.category.git'), icon: FaGitAlt },
    { id: 'productivity', name: t('toolkit.category.productivity'), icon: FaRocket }
  ]

  const getToolsByCategory = (category: string) => {
    const tools = Object.entries(t(`toolkit.${category}`, { returnObjects: true }))
    return tools.map(([id, name]) => ({
      id,
      name,
      description: t(`toolkit.description.${id}`)
    }))
  }

  const openDownloadLink = (toolId: string) => {
    let url = ''
    switch (toolId) {
      case 'vscode':
        url = 'https://code.visualstudio.com/download'
        break
      case 'intellij':
        url = 'https://www.jetbrains.com/idea/download/'
        break
      case 'sublime':
        url = 'https://www.sublimetext.com/download'
        break
      case 'cursor':
        url = 'https://cursor.sh'
        break
      case 'iterm':
        url = 'https://iterm2.com/downloads.html'
        break
      case 'warp':
        url = 'https://www.warp.dev'
        break
      case 'dbeaver':
        url = 'https://dbeaver.io/download/'
        break
      case 'datagrip':
        url = 'https://www.jetbrains.com/datagrip/download/'
        break
      case 'docker_desktop':
        url = 'https://www.docker.com/products/docker-desktop'
        break
      case 'postman':
        url = 'https://www.postman.com/downloads/'
        break
      case 'insomnia':
        url = 'https://insomnia.rest/download'
        break
      case 'sourcetree':
        url = 'https://www.sourcetreeapp.com'
        break
      case 'gitkraken':
        url = 'https://www.gitkraken.com/download'
        break
      case 'raycast':
        url = 'https://www.raycast.com'
        break
      case 'alfred':
        url = 'https://www.alfredapp.com'
        break
      case 'rectangle':
        url = 'https://rectangleapp.com'
        break
      default:
        return
    }
    window.open(url, '_blank')
  }

  const renderTools = () => {
    const tools = getToolsByCategory(selectedCategory)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{tool.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openDownloadLink(tool.id)}
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                  title={t('common.download')}
                >
                  <FaDownload className="w-4 h-4" />
                </button>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(tool.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                  title="Learn more"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
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

      {renderTools()}
    </div>
  )
}

export default ToolkitTool 