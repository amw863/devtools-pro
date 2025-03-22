import { lazy } from 'react'
import {
  FaLock,
  FaLink,
  FaCode,
  FaClock,
  FaCode as FaJson,
  FaImage,
  FaRandom,
  FaGitAlt,
  FaDocker,
  FaNetworkWired,
  FaTools,
  FaDatabase,
  FaDatabase as FaPostgres,
  FaStream,
  FaStream as FaNsq,
  FaTerminal,
  FaMarkdown
} from 'react-icons/fa'

export const tools = [
  {
    id: 'md5',
    name: 'MD5 加密',
    icon: FaLock,
    category: 'encode',
    component: lazy(() => import('../components/tools/MD5Tool'))
  },
  {
    id: 'url',
    name: 'URL 编码',
    icon: FaLink,
    category: 'encode',
    component: lazy(() => import('../components/tools/URLTool'))
  },
  {
    id: 'base64',
    name: 'Base64 编码',
    icon: FaCode,
    category: 'encode',
    component: lazy(() => import('../components/tools/Base64Tool'))
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    icon: FaClock,
    category: 'convert',
    component: lazy(() => import('../components/tools/TimestampTool'))
  },
  {
    id: 'json',
    name: 'JSON 格式化',
    icon: FaJson,
    category: 'convert',
    component: lazy(() => import('../components/tools/JSONTool'))
  },
  {
    id: 'placeholder',
    name: '占位图生成',
    icon: FaImage,
    category: 'generate',
    component: lazy(() => import('../components/tools/PlaceholderTool'))
  },
  {
    id: 'random',
    name: '随机生成器',
    icon: FaRandom,
    category: 'generate',
    component: lazy(() => import('../components/tools/RandomTool'))
  },
  {
    id: 'git',
    name: 'Git 工具',
    icon: FaGitAlt,
    category: 'dev',
    component: lazy(() => import('../components/tools/GitTool'))
  },
  {
    id: 'docker',
    name: 'Docker 工具',
    icon: FaDocker,
    category: 'dev',
    component: lazy(() => import('../components/tools/DockerTool'))
  },
  {
    id: 'network',
    name: '网络工具',
    icon: FaNetworkWired,
    category: 'dev',
    component: lazy(() => import('../components/tools/NetworkTool'))
  },
  {
    id: 'mysql',
    name: 'MySQL 工具',
    icon: FaDatabase,
    category: 'dev',
    component: lazy(() => import('../components/tools/MySQLTool'))
  },
  {
    id: 'redis',
    name: 'Redis 工具',
    icon: FaDatabase,
    category: 'dev',
    component: lazy(() => import('../components/tools/RedisTool'))
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL 工具',
    icon: FaPostgres,
    category: 'dev',
    component: lazy(() => import('../components/tools/PostgreSQLTool'))
  },
  {
    id: 'kafka',
    name: 'Kafka 工具',
    icon: FaStream,
    category: 'dev',
    component: lazy(() => import('../components/tools/KafkaTool'))
  },
  {
    id: 'nsq',
    name: 'NSQ 工具',
    icon: FaNsq,
    category: 'dev',
    component: lazy(() => import('../components/tools/NSQTool'))
  },
  {
    id: 'toolkit',
    name: '开发工具箱',
    icon: FaTools,
    category: 'dev',
    component: lazy(() => import('../components/tools/ToolkitTool'))
  },
  {
    id: 'shell',
    name: 'Shell 工具',
    icon: FaTerminal,
    category: 'dev',
    component: lazy(() => import('../components/tools/ShellTool'))
  },
  {
    id: 'markdown',
    name: 'Markdown 转图片',
    icon: FaMarkdown,
    category: 'convert',
    component: lazy(() => import('../components/tools/MarkdownTool'))
  }
] 