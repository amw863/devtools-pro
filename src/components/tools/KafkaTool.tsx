import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FaStream,
  FaUsers,
  FaPaperPlane,
  FaCog,
  FaPlay
} from 'react-icons/fa'

const KafkaTool = () => {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('topic')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [brokers, setBrokers] = useState('localhost:9092')
  const [topic, setTopic] = useState('')
  const [group, setGroup] = useState('')
  const [partitions, setPartitions] = useState('1')
  const [replication, setReplication] = useState('1')
  const [message, setMessage] = useState('')

  const categories = [
    { id: 'topic', name: t('kafka.category.topic'), icon: FaStream },
    { id: 'consumer', name: t('kafka.category.consumer'), icon: FaUsers },
    { id: 'producer', name: t('kafka.category.producer'), icon: FaPaperPlane },
    { id: 'config', name: t('kafka.category.config'), icon: FaCog }
  ]

  const executeCommand = (command: string) => {
    setError('')
    // 在实际应用中，这里会执行 Kafka 命令
    // 这里我们只是模拟显示将要执行的命令
    setOutput(`Kafka Command: ${command}`)
  }

  const renderCommands = () => {
    switch (selectedCategory) {
      case 'topic':
        return (
          <div className="space-y-2">
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Topic Name</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input w-full"
                placeholder="Enter topic name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Partitions</label>
                <input
                  type="text"
                  value={partitions}
                  onChange={(e) => setPartitions(e.target.value)}
                  className="input w-full"
                  placeholder="Number of partitions"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Replication</label>
                <input
                  type="text"
                  value={replication}
                  onChange={(e) => setReplication(e.target.value)}
                  className="input w-full"
                  placeholder="Replication factor"
                />
              </div>
            </div>
            <button
              onClick={() => executeCommand(`kafka-topics.sh --list --bootstrap-server ${brokers}`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.topic.list')}
            </button>
            <button
              onClick={() => executeCommand(`kafka-topics.sh --create --topic ${topic} --bootstrap-server ${brokers} --partitions ${partitions} --replication-factor ${replication}`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.topic.create')}
            </button>
            <button
              onClick={() => executeCommand(`kafka-topics.sh --delete --topic ${topic} --bootstrap-server ${brokers}`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.topic.delete')}
            </button>
            <button
              onClick={() => executeCommand(`kafka-topics.sh --describe --topic ${topic} --bootstrap-server ${brokers}`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.topic.describe')}
            </button>
          </div>
        )
      case 'consumer':
        return (
          <div className="space-y-2">
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Consumer Group</label>
              <input
                type="text"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="input w-full"
                placeholder="Enter consumer group"
              />
            </div>
            <button
              onClick={() => executeCommand(`kafka-consumer-groups.sh --list --bootstrap-server ${brokers}`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.consumer.groups')}
            </button>
            <button
              onClick={() => executeCommand(`kafka-consumer-groups.sh --describe --group ${group} --bootstrap-server ${brokers}`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.consumer.describe')}
            </button>
            <button
              onClick={() => executeCommand(`kafka-consumer-groups.sh --bootstrap-server ${brokers} --group ${group} --topic ${topic} --reset-offsets --to-earliest --execute`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.consumer.reset')}
            </button>
            <button
              onClick={() => executeCommand(`kafka-consumer-groups.sh --bootstrap-server ${brokers} --group ${group} --topic ${topic} --describe`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.consumer.lag')}
            </button>
          </div>
        )
      case 'producer':
        return (
          <div className="space-y-2">
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input w-full h-32"
                placeholder="Enter message"
              />
            </div>
            <button
              onClick={() => executeCommand(`echo "${message}" | kafka-console-producer.sh --broker-list ${brokers} --topic ${topic}`)}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <FaPlay className="w-4 h-4" />
              {t('kafka.producer.send')}
            </button>
            <button
              onClick={() => executeCommand(`kafka-console-producer.sh --broker-list ${brokers} --topic ${topic} --producer-property batch.size=16384`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.producer.batch')}
            </button>
            <button
              onClick={() => executeCommand(`kafka-producer-perf-test.sh --topic ${topic} --num-records 1000 --record-size 100 --throughput 1000 --producer-props bootstrap.servers=${brokers}`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.producer.performance')}
            </button>
          </div>
        )
      case 'config':
        return (
          <div className="space-y-2">
            <button
              onClick={() => executeCommand(`kafka-configs.sh --bootstrap-server ${brokers} --entity-type brokers --entity-name 0 --describe`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.config.brokers')}
            </button>
            <button
              onClick={() => executeCommand(`kafka-broker-api-versions.sh --bootstrap-server ${brokers}`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.config.cluster')}
            </button>
            <button
              onClick={() => executeCommand(`kafka-acls.sh --list --bootstrap-server ${brokers}`)}
              className="btn btn-secondary w-full"
            >
              {t('kafka.config.acls')}
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Connection Settings */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Brokers</label>
        <input
          type="text"
          value={brokers}
          onChange={(e) => setBrokers(e.target.value)}
          className="input w-full"
          placeholder="localhost:9092"
        />
      </div>

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

export default KafkaTool 