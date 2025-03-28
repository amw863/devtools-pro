# Changelog

## [1.0.2] - 2024-03-22

### 功能改进
- 🔧 修复 JSON 工具的转义功能
- 🌐 完善中文翻译
- 🚀 优化 GitHub Actions 工作流配置

## [1.0.1] - 2024-03-22

### 功能改进
- 🎨 优化扩展图标，提供多种尺寸（16x16, 32x32, 48x48, 128x128）
- 🔧 修复 Markdown 预览样式问题
- 🚀 移除新标签页自动打开功能，提升用户体验

## [1.0.0] - 2024-03-22

### 新增功能
- 🎨 支持浅色/深色主题切换
- 🌐 支持中英文双语界面
- 🛠️ 集成多种开发工具：
  - MD5 加密
  - URL 编码/解码
  - JSON 格式化
  - 时间戳转换
  - 二维码生成
  - 图片转 Base64
  - 正则表达式测试
  - 颜色选择器
  - 代码格式化
  - 数据库连接测试（MySQL, Redis, PostgreSQL, Kafka, NSQ）

### 技术改进
- 使用 React 18 + TypeScript 开发
- 采用 Vite 构建工具
- 使用 TailwindCSS 构建界面
- 集成 ESLint, Prettier, StyleLint 确保代码质量
- 配置 Husky 进行 Git 提交前检查 