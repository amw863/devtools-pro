# DevTools Pro Chrome Extension

一个为开发者提供的多功能开发工具集合，支持多主题和双语（中文/英文）界面。

## 功能特点

- 🌈 多主题支持：浅色/深色主题
- 🌐 双语支持：中文/英文界面
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
  - 数据库连接测试
  - 等等...

## 安装方法

### 开发环境安装

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/devtools-pro.git
cd devtools-pro
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 在 Chrome 浏览器中加载扩展：
   - 打开 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择 `tools-extension/dist` 目录

### Chrome 网上应用店安装

1. 访问 [Chrome 网上应用店](https://chrome.google.com/webstore/detail/devtools-pro)
2. 点击"添加至 Chrome"
3. 确认安装

## 使用方法

1. 点击 Chrome 工具栏中的扩展图标
2. 选择需要的工具
3. 开始使用

## 技术栈

- React 18
- TypeScript
- Vite
- TailwindCSS
- i18next

## 代码质量保证

本项目使用了一系列工具来确保代码质量：

- **ESLint**: JavaScript/TypeScript 代码检查
- **Prettier**: 代码格式化
- **StyleLint**: CSS/SCSS 代码检查
- **Husky**: Git Hooks 管理
- **lint-staged**: 暂存文件检查

### 代码检查命令

```bash
# 运行所有检查
npm run check

# 运行 ESLint 检查
npm run lint
npm run lint:fix  # 自动修复 ESLint 问题

# 运行 StyleLint 检查
npm run stylelint
npm run stylelint:fix  # 自动修复 StyleLint 问题

# 格式化代码
npm run format
```

### Git 提交前检查

每次提交代码时，会自动运行以下检查：
1. ESLint 检查
2. StyleLint 检查
3. Prettier 格式化

如果需要跳过检查（不推荐），可以使用：
```bash
git commit -m "message" --no-verify
```

## 开发计划

- [ ] 添加更多开发工具
- [ ] 支持自定义主题
- [ ] 添加更多语言支持
- [ ] 优化性能
- [ ] 添加单元测试

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 致谢

感谢所有为本项目做出贡献的开发者们！特别感谢：

- [@typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) - TypeScript ESLint 规则
- [@prettier](https://github.com/prettier/prettier) - 代码格式化工具
- [@stylelint](https://github.com/stylelint/stylelint) - CSS 代码检查工具
- [@husky](https://github.com/typicode/husky) - Git Hooks 管理工具
- [@lint-staged](https://github.com/okonet/lint-staged) - 暂存文件检查工具
- [Cursor](https://cursor.sh) - 强大的 AI 编程助手，为本项目的开发提供了极大的帮助 