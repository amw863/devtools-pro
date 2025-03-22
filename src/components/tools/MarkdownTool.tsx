import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import html2canvas from 'html2canvas'
import { FaDownload, FaTrash } from 'react-icons/fa'

const MarkdownTool = () => {
  const { t } = useTranslation()
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleClear = () => {
    setMarkdown('')
  }

  const handleConvert = async () => {
    if (!previewRef.current) return

    setLoading(true)
    try {
      // Create a temporary div for rendering
      const tempDiv = document.createElement('div')
      tempDiv.style.padding = '20px'
      tempDiv.style.backgroundColor = '#ffffff'
      tempDiv.style.width = '800px' // Fixed width for better rendering
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.top = '-9999px'
      document.body.appendChild(tempDiv)
      
      // Clone the content
      const content = previewRef.current.cloneNode(true) as HTMLElement
      content.style.width = '100%'
      content.style.height = 'auto'
      content.style.overflow = 'visible'
      content.style.border = 'none'
      content.style.borderRadius = '0'
      tempDiv.appendChild(content)

      // Generate image
      const canvas = await html2canvas(tempDiv, {
        background: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 800,
        height: tempDiv.offsetHeight,
        windowWidth: 800,
        windowHeight: tempDiv.offsetHeight
      } as any)

      // Clean up
      document.body.removeChild(tempDiv)

      // Convert to PNG
      const pngUrl = canvas.toDataURL('image/png')
      
      // Create download link
      const link = document.createElement('a')
      link.download = 'markdown-image.png'
      link.href = pngUrl
      link.click()
    } catch (error) {
      console.error('Error converting markdown to image:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">{t('markdown.title')}</h2>
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            disabled={!markdown.trim()}
            className="btn btn-secondary flex items-center gap-2"
          >
            <FaTrash className="w-4 h-4" />
            {t('markdown.clear')}
          </button>
          <button
            onClick={handleConvert}
            disabled={loading || !markdown.trim()}
            className="btn btn-primary flex items-center gap-2"
          >
            <FaDownload className="w-4 h-4" />
            {loading ? t('markdown.converting') : t('markdown.convert')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Markdown Editor */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t('markdown.input')}
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="input h-[500px] font-mono"
            placeholder={t('markdown.placeholder')}
          />
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t('markdown.preview')}
          </label>
          <div
            ref={previewRef}
            className="prose prose-sm max-w-none p-4 border rounded-lg h-[500px] overflow-auto bg-white"
          >
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarkdownTool 