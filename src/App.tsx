import { useState, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { tools } from './config/tools'

// Import theme configurations
import { themes } from './utils/themes'

type ThemeKey = keyof typeof themes

interface Tool {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  category: string
  component: React.ComponentType
}

function App() {
  const { t, i18n } = useTranslation()
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('blue')
  const [selectedTool, setSelectedTool] = useState('md5')

  // Group tools by category
  const toolCategories = tools.reduce((acc, tool) => {
    const category = tool.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(tool)
    return acc
  }, {} as Record<string, Tool[]>)

  // 获取当前选中的工具
  const getCurrentTool = () => {
    return tools.find(t => t.id === selectedTool) || tools[0]
  }

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
  }

  const currentTool = getCurrentTool()
  const ToolComponent = currentTool.component

  const currentFlag = i18n.language === 'en' ? '🇨🇳' : '🇺🇸'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={themes[currentTheme]}>
        {/* 顶部栏 */}
        <div className="bg-white shadow-sm">
          <div className="h-16 flex items-center justify-between px-8">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent tracking-tight">
                {t('appName')}
              </h1>
            </div>
            <div className="flex gap-4">
              <select
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value as ThemeKey)}
                className="input !w-auto"
              >
                {Object.keys(themes).map((theme) => (
                  <option key={theme} value={theme}>
                    {t(`themes.${theme}`)}
                  </option>
                ))}
              </select>
              <button 
                onClick={toggleLanguage} 
                className="btn btn-secondary flex items-center gap-2"
                title={i18n.language === 'en' ? '切换到中文' : 'Switch to English'}
              >
                <span className="text-lg">{currentFlag}</span>
                {i18n.language === 'en' ? '中文' : 'English'}
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          <div className={themes[currentTheme]}>
            <div className="flex gap-6">
              {/* 侧边栏导航 */}
              <div className="w-52 flex-shrink-0">
                <nav className="space-y-6 bg-white rounded-lg p-4 shadow-sm">
                  {Object.entries(toolCategories).map(([category, categoryTools]) => (
                    <div key={category}>
                      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        {t(`categories.${category}`)}
                      </h2>
                      <div className="space-y-1">
                        {categoryTools.map((tool) => {
                          const Icon = tool.icon
                          return (
                            <button
                              key={tool.id}
                              onClick={() => setSelectedTool(tool.id)}
                              className={clsx(
                                'flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-md',
                                selectedTool === tool.id
                                  ? 'bg-primary-50 text-primary-700'
                                  : 'text-gray-600 hover:bg-gray-50'
                              )}
                            >
                              <Icon className="w-4 h-4" />
                              {tool.name}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>

              {/* 主内容区 */}
              <div className="flex-1">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
                    <ToolComponent />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 