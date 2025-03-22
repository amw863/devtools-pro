import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCopy, FaDice } from 'react-icons/fa'

const RandomTool = () => {
  const { t } = useTranslation()
  const [type, setType] = useState<'number' | 'string' | 'uuid'>('number')
  const [length, setLength] = useState(8)
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSpecial, setIncludeSpecial] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * (max - min + 1) + min).toString()
  }

  const generateRandomString = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSpecial) chars += special

    if (!chars) return ''

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const handleGenerate = () => {
    switch (type) {
      case 'number':
        setResult(generateRandomNumber())
        break
      case 'string':
        setResult(generateRandomString())
        break
      case 'uuid':
        setResult(generateUUID())
        break
    }
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
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          {t('random.type')}
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as 'number' | 'string' | 'uuid')}
          className="input"
        >
          <option value="number">{t('random.number')}</option>
          <option value="string">{t('random.string')}</option>
          <option value="uuid">UUID</option>
        </select>
      </div>

      {type === 'number' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="min" className="block text-sm font-medium text-gray-700 mb-1">
              {t('random.min')}
            </label>
            <input
              id="min"
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="max" className="block text-sm font-medium text-gray-700 mb-1">
              {t('random.max')}
            </label>
            <input
              id="max"
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="input"
            />
          </div>
        </div>
      )}

      {type === 'string' && (
        <>
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
              {t('random.length')}
            </label>
            <input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="input"
              min="1"
              max="100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {t('random.include')}:
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{t('random.uppercase')}</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{t('random.lowercase')}</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{t('random.numbers')}</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={includeSpecial}
                  onChange={(e) => setIncludeSpecial(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{t('random.special')}</span>
              </label>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-between items-center">
        <button onClick={handleGenerate} className="btn btn-primary flex items-center gap-2">
          <FaDice className="w-4 h-4" />
          {t('random.generate')}
        </button>
      </div>

      <div>
        <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
          {t('random.result')}
        </label>
        <div className="relative">
          <input
            id="result"
            type="text"
            value={result}
            readOnly
            className="input pr-10"
            placeholder={t('random.result')}
          />
          {result && (
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-primary-600 transition-colors"
              title={t('common.copy')}
            >
              <FaCopy className="w-4 h-4" />
            </button>
          )}
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

export default RandomTool 