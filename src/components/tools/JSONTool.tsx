import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCopy, FaTrash, FaCompress, FaExpand, FaQuoteRight } from 'react-icons/fa'

const JSONTool = () => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)

  const formatJSON = (json: string, compact = false) => {
    try {
      const parsed = JSON.parse(json)
      return JSON.stringify(parsed, null, compact ? 0 : indentSize)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      throw new Error('Invalid JSON')
    }
  }

  const unescapeJSON = (json: string) => {
    try {
      // 先尝试解析，确保是有效的 JSON
      JSON.parse(json)
      // 移除转义字符
      return json.replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\b/g, '\b')
        .replace(/\\f/g, '\f')
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      throw new Error('Invalid JSON')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    if (value) {
      try {
        const formatted = formatJSON(value)
        setResult(formatted)
        setError('')
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(t('error.invalidJSON'))
        }
        setResult('')
      }
    } else {
      setResult('')
      setError('')
    }
  }

  const handleCompact = () => {
    if (input) {
      try {
        const formatted = formatJSON(input, true)
        setResult(formatted)
        setError('')
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(t('error.invalidJSON'))
        }
      }
    }
  }

  const handleFormat = () => {
    if (input) {
      try {
        const formatted = formatJSON(input, false)
        setResult(formatted)
        setError('')
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(t('error.invalidJSON'))
        }
      }
    }
  }

  const handleUnescape = () => {
    if (input) {
      try {
        const unescaped = unescapeJSON(input)
        setResult(unescaped)
        setError('')
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(t('error.invalidJSON'))
        }
      }
    }
  }

  const handleClear = () => {
    setInput('')
    setResult('')
    setError('')
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
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="input" className="block text-sm font-medium text-gray-700">
            {t('json.input')}
          </label>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">
              {t('json.indent')}:
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="ml-2 input !w-20"
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
              </select>
            </label>
          </div>
        </div>
        <textarea
          id="input"
          value={input}
          onChange={handleInputChange}
          className="input min-h-[200px]"
          placeholder="Enter JSON to format..."
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={handleFormat}
            className="btn btn-primary flex items-center gap-2"
            disabled={!input}
          >
            <FaExpand className="w-4 h-4" />
            {t('json.format')}
          </button>
          <button
            onClick={handleCompact}
            className="btn btn-primary flex items-center gap-2"
            disabled={!input}
          >
            <FaCompress className="w-4 h-4" />
            {t('json.compact')}
          </button>
          <button
            onClick={handleUnescape}
            className="btn btn-primary flex items-center gap-2"
            disabled={!input}
          >
            <FaQuoteRight className="w-4 h-4" />
            {t('json.unescape')}
          </button>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>

      <div>
        <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
          {t('json.result')}
        </label>
        <div className="relative">
          <textarea
            id="result"
            value={result}
            readOnly
            className="input min-h-[200px] font-mono text-sm"
            placeholder="Formatted JSON will appear here..."
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

export default JSONTool 