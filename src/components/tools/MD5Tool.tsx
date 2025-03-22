import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CryptoJS from 'crypto-js'
import { FaCopy, FaTrash } from 'react-icons/fa'

const MD5Tool = () => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    if (value) {
      setResult(CryptoJS.MD5(value).toString())
    } else {
      setResult('')
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
      <div>
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">
          Input Text
        </label>
        <textarea
          id="input"
          value={input}
          onChange={handleInputChange}
          className="input min-h-[100px]"
          placeholder="Enter text to generate MD5 hash..."
        />
      </div>

      <div>
        <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
          MD5 Hash
        </label>
        <div className="relative">
          <input
            id="result"
            value={result}
            readOnly
            className="input pr-20"
            placeholder="MD5 hash will appear here..."
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
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

export default MD5Tool 