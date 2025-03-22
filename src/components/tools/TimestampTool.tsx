import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCopy, FaTrash, FaExchangeAlt } from 'react-icons/fa'
import dayjs from 'dayjs'

const TimestampTool = () => {
  const { t } = useTranslation()
  const [timestamp, setTimestamp] = useState('')
  const [datetime, setDatetime] = useState('')
  const [copied, setCopied] = useState(false)
  const [timestampType, setTimestampType] = useState<'second' | 'millisecond'>('second')

  useEffect(() => {
    // 设置默认时间为当前时间
    const now = dayjs()
    setDatetime(now.format('YYYY-MM-DD HH:mm:ss'))
    setTimestamp(Math.floor(now.valueOf() / 1000).toString())
  }, [])

  const handleTimestampChange = (value: string) => {
    setTimestamp(value)
    if (value) {
      try {
        const timestampNum = parseInt(value, 10)
        // 根据时间戳类型处理转换
        const multiplier = timestampType === 'second' ? 1000 : 1
        const dateObj = dayjs(timestampNum * multiplier)
        if (dateObj.isValid()) {
          setDatetime(dateObj.format('YYYY-MM-DD HH:mm:ss'))
        } else {
          setDatetime('')
        }
      } catch (error) {
        setDatetime('')
      }
    } else {
      setDatetime('')
    }
  }

  const handleDatetimeChange = (value: string) => {
    setDatetime(value)
    const dateObj = dayjs(value)
    if (dateObj.isValid()) {
      const timestampValue = dateObj.valueOf()
      setTimestamp(
        timestampType === 'second'
          ? Math.floor(timestampValue / 1000).toString()
          : timestampValue.toString()
      )
    } else {
      setTimestamp('')
    }
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'second' | 'millisecond'
    setTimestampType(newType)
    
    // 转换当前时间戳
    if (timestamp && !isNaN(parseInt(timestamp, 10))) {
      const timestampNum = parseInt(timestamp, 10)
      if (newType === 'millisecond' && timestampType === 'second') {
        setTimestamp((timestampNum * 1000).toString())
      } else if (newType === 'second' && timestampType === 'millisecond') {
        setTimestamp(Math.floor(timestampNum / 1000).toString())
      }
    }
  }

  const handleNow = () => {
    const now = dayjs()
    setDatetime(now.format('YYYY-MM-DD HH:mm:ss'))
    setTimestamp(
      timestampType === 'second'
        ? Math.floor(now.valueOf() / 1000).toString()
        : now.valueOf().toString()
    )
  }

  const handleClear = () => {
    setTimestamp('')
    setDatetime('')
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="timestampType" className="block text-sm font-medium text-gray-700">
          {t('timestamp.type')}
        </label>
        <select
          id="timestampType"
          value={timestampType}
          onChange={handleTypeChange}
          className="input !w-40"
        >
          <option value="second">{t('timestamp.second')}</option>
          <option value="millisecond">{t('timestamp.millisecond')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700 mb-1">
          {t('timestamp.unix')}
        </label>
        <div className="relative">
          <input
            id="timestamp"
            type="text"
            value={timestamp}
            onChange={(e) => handleTimestampChange(e.target.value)}
            className="input pr-20"
            placeholder={t('placeholder.timestampInput')}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            {timestamp && (
              <>
                <button
                  onClick={() => handleCopy(timestamp)}
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

      <div className="flex justify-center">
        <FaExchangeAlt className="text-gray-400 text-xl" />
      </div>

      <div>
        <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 mb-1">
          {t('timestamp.datetime')}
        </label>
        <div className="relative">
          <input
            id="datetime"
            type="text"
            value={datetime}
            onChange={(e) => handleDatetimeChange(e.target.value)}
            className="input pr-20"
            placeholder="YYYY-MM-DD HH:mm:ss"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            {datetime && (
              <>
                <button
                  onClick={() => handleCopy(datetime)}
                  className="p-1.5 text-gray-500 hover:text-primary-600 transition-colors"
                  title={t('common.copy')}
                >
                  <FaCopy className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNow}
          className="btn btn-primary"
        >
          {t('timestamp.now')}
        </button>
      </div>

      {copied && (
        <div className="text-sm text-green-600 animate-fade-in">
          {t('common.copied')}
        </div>
      )}
    </div>
  )
}

export default TimestampTool 