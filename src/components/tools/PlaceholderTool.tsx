import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaDownload } from 'react-icons/fa'

const PlaceholderTool = () => {
  const { t } = useTranslation()
  const [width, setWidth] = useState('300')
  const [height, setHeight] = useState('200')
  const [text, setText] = useState('')
  const [bgColor, setBgColor] = useState('#cccccc')
  const [textColor, setTextColor] = useState('#333333')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generatePlaceholder = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    canvas.width = parseInt(width)
    canvas.height = parseInt(height)

    // 绘制背景
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 绘制文字
    const displayText = text || `${width}x${height}`
    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // 自动调整字体大小
    let fontSize = Math.min(canvas.width, canvas.height) / 10
    ctx.font = `${fontSize}px Arial`
    let textWidth = ctx.measureText(displayText).width
    
    // 如果文字太大，逐步减小字体大小
    while (textWidth > canvas.width * 0.8 && fontSize > 10) {
      fontSize--
      ctx.font = `${fontSize}px Arial`
      textWidth = ctx.measureText(displayText).width
    }

    ctx.fillText(displayText, canvas.width / 2, canvas.height / 2)
  }

  useEffect(() => {
    generatePlaceholder()
  }, [width, height, text, bgColor, textColor])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // 创建下载链接
    const link = document.createElement('a')
    link.download = `placeholder-${width}x${height}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
            {t('placeholder.width')}
          </label>
          <input
            id="width"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="input"
            min="1"
            max="2000"
          />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            {t('placeholder.height')}
          </label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="input"
            min="1"
            max="2000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
          {t('placeholder.text')}
        </label>
        <input
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input"
          placeholder={`${width}x${height}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700 mb-1">
            {t('placeholder.bgColor')}
          </label>
          <div className="flex gap-2">
            <input
              id="bgColor"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 rounded-md cursor-pointer"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="input"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </div>
        <div>
          <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-1">
            {t('placeholder.textColor')}
          </label>
          <div className="flex gap-2">
            <input
              id="textColor"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 rounded-md cursor-pointer"
            />
            <input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="input"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{t('placeholder.preview')}</span>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
          >
            <FaDownload className="w-4 h-4" />
            {t('common.download')}
          </button>
        </div>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto shadow-md rounded"
          />
        </div>
      </div>
    </div>
  )
}

export default PlaceholderTool 