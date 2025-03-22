import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCopy, FaTrash, FaExchangeAlt } from 'react-icons/fa'

const Base64Tool = () => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    if (value) {
      try {
        if (mode === 'encode') {
          setResult(btoa(value))
        } else {
          setResult(atob(value))
        }
      } catch (error) {
        setResult(t('error.invalidInput'))
      }
    } else {
      setResult('')
    }
  }

  const handleModeToggle = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode')
    // Swap input and result when toggling mode
    if (input) {
      setInput(result)
      try {
        if (mode === 'decode') {
          setResult(btoa(input))
        } else {
          setResult(atob(input))
        }
      } catch (error) {
        setResult(t('error.invalidInput'))
      }
    }
  }

  const handleClear = () => {
    setInput('')
    setResult('')
  }

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700">
          {mode === 'encode' ? t('base64.input') : t('base64.encoded')}
        </label>
        <button
          onClick={handleModeToggle}
          className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
        >
          <FaExchangeAlt className="w-4 h-4" />
          {mode === 'encode' ? t('common.encode') : t('common.decode')}
        </button>
      </div>

      <div>
        <textarea
          id="input"
          value={input}
          onChange={handleInputChange}
          className="input min-h-[100px]"
          placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter Base64 text to decode..."}
        />
      </div>

      <div>
        <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
          {mode === 'encode' ? t('base64.encoded') : t('base64.decoded')}
        </label>
        <div className="relative">
          <textarea
            id="result"
            value={result}
            readOnly
            className="input min-h-[100px] pr-20"
            placeholder={mode === 'encode' ? "Base64 encoded text will appear here..." : "Decoded text will appear here..."}
          />
          <div className="absolute right-2 top-2 flex gap-2">
            {result && (
              <>
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-gray-500 hover:text-primary-600 transition-colors"
                  title={t('common.copy')}
                >
                  <FaCopy className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClear}
                  className="p-1.5 text-gray-500 hover:text-red-600 transition-colors"
                  title={t('common.clear')}
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {copied && (
        <div className="text-sm text-green-600 animate-fade-in">
          {t('common.copied')}
        </div>
      )}
    </div>
  )
}

export default Base64Tool 