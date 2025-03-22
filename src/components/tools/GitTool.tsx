import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCopy } from 'react-icons/fa'

interface GitCommand {
  id: string
  command: string
}

interface CommitType {
  type: string
  description: string
  example: string
}

const GitTool = () => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState('')
  const [selectedTab, setSelectedTab] = useState<'commands' | 'commit'>('commands')

  const categories = {
    basic: [
      { id: 'init', command: 'git init' },
      { id: 'clone', command: 'git clone <repository>' },
      { id: 'addAll', command: 'git add .' },
      { id: 'commit', command: 'git commit -m "<message>"' },
      { id: 'push', command: 'git push' },
      { id: 'pull', command: 'git pull' },
      { id: 'status', command: 'git status' },
      { id: 'log', command: 'git log' }
    ],
    branch: [
      { id: 'listBranch', command: 'git branch' },
      { id: 'createBranch', command: 'git branch <branch-name>' },
      { id: 'checkout', command: 'git checkout <branch-name>' },
      { id: 'checkoutNew', command: 'git checkout -b <branch-name>' },
      { id: 'merge', command: 'git merge <branch-name>' },
      { id: 'deleteBranch', command: 'git branch -d <branch-name>' }
    ],
    remote: [
      { id: 'listRemote', command: 'git remote -v' },
      { id: 'addRemote', command: 'git remote add <name> <url>' },
      { id: 'removeRemote', command: 'git remote remove <name>' },
      { id: 'fetch', command: 'git fetch <remote>' },
      { id: 'pullBranch', command: 'git pull <remote> <branch>' },
      { id: 'pushBranch', command: 'git push <remote> <branch>' }
    ],
    advanced: [
      { id: 'resetHard', command: 'git reset --hard HEAD' },
      { id: 'resetSoft', command: 'git reset --soft HEAD^' },
      { id: 'revert', command: 'git revert <commit>' },
      { id: 'stash', command: 'git stash' },
      { id: 'stashPop', command: 'git stash pop' },
      { id: 'cherryPick', command: 'git cherry-pick <commit>' }
    ]
  }

  const commitTypes: CommitType[] = [
    { 
      type: 'feat', 
      description: t('git.commitTypes.feat'),
      example: 'feat: add new user registration feature'
    },
    { 
      type: 'fix', 
      description: t('git.commitTypes.fix'),
      example: 'fix: resolve login page validation issue'
    },
    { 
      type: 'docs', 
      description: t('git.commitTypes.docs'),
      example: 'docs: update API documentation'
    },
    { 
      type: 'style', 
      description: t('git.commitTypes.style'),
      example: 'style: format code according to style guide'
    },
    { 
      type: 'refactor', 
      description: t('git.commitTypes.refactor'),
      example: 'refactor: restructure authentication logic'
    },
    { 
      type: 'perf', 
      description: t('git.commitTypes.perf'),
      example: 'perf: optimize database queries'
    },
    { 
      type: 'test', 
      description: t('git.commitTypes.test'),
      example: 'test: add unit tests for user service'
    },
    { 
      type: 'build', 
      description: t('git.commitTypes.build'),
      example: 'build: update webpack configuration'
    },
    { 
      type: 'ci', 
      description: t('git.commitTypes.ci'),
      example: 'ci: add GitHub Actions workflow'
    },
    { 
      type: 'chore', 
      description: t('git.commitTypes.chore'),
      example: 'chore: update dependencies'
    },
    { 
      type: 'revert', 
      description: t('git.commitTypes.revert'),
      example: 'revert: revert commit abc123'
    }
  ]

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(''), 2000)
  }

  const renderCommandList = (commands: GitCommand[]) => (
    <div className="space-y-2">
      {commands.map(({ id, command }) => (
        <div
          key={id}
          className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100"
        >
          <div>
            <div className="text-sm font-medium text-gray-900">{t(`git.${id}`)}</div>
            <code className="text-sm text-gray-600">{command}</code>
          </div>
          <button
            onClick={() => handleCopy(command, id)}
            className="p-1.5 text-gray-500 hover:text-primary-600 transition-colors"
            title={t('common.copy')}
          >
            <FaCopy className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )

  const renderCommitTypes = () => (
    <div className="space-y-4">
      {commitTypes.map(({ type, description, example }) => (
        <div
          key={type}
          className="p-3 bg-gray-50 rounded hover:bg-gray-100"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                <code className="bg-gray-200 px-2 py-0.5 rounded">{type}</code>
              </div>
              <div className="text-sm text-gray-600 mb-2">{description}</div>
              <code className="text-xs text-gray-500 block">{example}</code>
            </div>
            <button
              onClick={() => handleCopy(`${type}: `, type)}
              className="p-1.5 text-gray-500 hover:text-primary-600 transition-colors"
              title={t('common.copy')}
            >
              <FaCopy className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-gray-200">
        <button
          className={`pb-2 px-1 text-sm font-medium ${
            selectedTab === 'commands'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setSelectedTab('commands')}
        >
          {t('git.category.basic')}
        </button>
        <button
          className={`pb-2 px-1 text-sm font-medium ${
            selectedTab === 'commit'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setSelectedTab('commit')}
        >
          {t('git.category.commit')}
        </button>
      </div>

      {selectedTab === 'commands' ? (
        Object.entries(categories).map(([category, commands]) => (
          <div key={category}>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              {t(`git.category.${category}`)}
            </h3>
            {renderCommandList(commands)}
          </div>
        ))
      ) : (
        renderCommitTypes()
      )}
      
      {copied && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
          {t('common.copied')}
        </div>
      )}
    </div>
  )
}

export default GitTool 