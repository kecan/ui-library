# 🚀 CI/CD 配置指南

本项目已配置完整的 CI/CD 流程，包含代码质量检查、自动化测试、构建部署和包发布功能。

## 📋 工作流概览

### 🔍 CI 工作流 (`.github/workflows/ci.yml`)

- **触发时机**: 每次 push 到 main/develop 分支或创建 PR
- **包含内容**:
  - 代码质量检查 (ESLint, Prettier, TypeScript)
  - 多版本 Node.js 测试 (16, 18, 20)
  - 单元测试和覆盖率报告
  - 组件构建验证
  - 安全依赖扫描

### 📖 Storybook 部署 (`.github/workflows/deploy-storybook.yml`)

- **触发时机**: push 到 main 分支
- **部署目标**: GitHub Pages
- **访问地址**: `https://your-username.github.io/kc-ui-library`

### 🎭 预览部署 (`.github/workflows/preview.yml`)

- **触发时机**: 创建或更新 PR
- **部署目标**: Netlify (需配置)
- **功能**: 自动在 PR 中评论预览链接

### 🚀 发布流程 (`.github/workflows/release.yml`)

- **触发时机**: push 到 main 分支
- **自动化内容**:
  - 语义化版本管理
  - NPM 包发布
  - GitHub Release 创建
  - Changelog 生成

## ⚙️ 必需配置

### 1. GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets:

```
NPM_TOKEN          # NPM 发布令牌
NETLIFY_AUTH_TOKEN # Netlify 认证令牌 (可选)
NETLIFY_SITE_ID    # Netlify 站点 ID (可选)
CODECOV_TOKEN      # 代码覆盖率令牌 (可选)
```

### 2. GitHub Pages

1. 进入仓库 Settings → Pages
2. 选择 Source: "GitHub Actions"
3. 工作流将自动部署 Storybook

### 3. NPM 包发布配置

1. 在 NPM 上创建组织或使用个人账号
2. 生成 Access Token (Classic Token with Publish permission)
3. 将 Token 添加到 GitHub Secrets 中的 `NPM_TOKEN`

## 📦 提交规范

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范:

```bash
feat: add new component        # 新功能 (minor version)
fix: resolve button bug        # 修复 (patch version)
docs: update readme           # 文档更新
style: format code            # 代码格式化
refactor: restructure code    # 重构
test: add unit tests         # 测试
chore: update dependencies   # 杂项

# Breaking Changes (major version)
feat!: remove deprecated API
```

## 🎯 使用流程

### 开发流程

1. 创建功能分支: `git checkout -b feature/new-component`
2. 开发和测试
3. 提交代码: `git commit -m "feat: add AutoComplete component"`
4. 推送分支: `git push origin feature/new-component`
5. 创建 PR → 自动触发 CI 和预览部署
6. 代码审查通过后合并到 main

### 发布流程

1. 合并 PR 到 main 分支
2. GitHub Actions 自动:
   - 分析提交信息
   - 计算新版本号
   - 构建和测试
   - 发布 NPM 包
   - 创建 GitHub Release
   - 部署 Storybook

## 🛠 本地开发命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm storybook

# 代码检查
pnpm lint
pnpm format:check

# 运行测试
pnpm test
pnpm test Button

# 构建
pnpm --filter @kc-ui/components build
pnpm build-storybook
```

## 📊 部署地址

- **Storybook 文档**: GitHub Pages / Vercel 自动部署
- **NPM 包**: `npm install @kc-ui/components`
- **PR 预览**: 自动在 PR 评论中提供链接

## 🔧 故障排除

### CI 失败常见原因

1. **代码规范检查失败**: 运行 `pnpm lint:fix` 修复
2. **测试失败**: 检查测试用例，运行 `pnpm test` 本地验证
3. **构建失败**: 检查 TypeScript 类型错误
4. **依赖问题**: 确保 `pnpm-lock.yaml` 已提交

### 发布失败排查

1. 检查 `NPM_TOKEN` 是否正确设置
2. 确保包名在 NPM 上可用
3. 检查提交信息是否符合 conventional commits 规范

## 📈 监控和维护

- **构建状态**: GitHub Actions 标签页
- **包下载量**: NPM 包页面统计
- **测试覆盖率**: Codecov 报告 (如已配置)
- **依赖更新**: 定期运行 `pnpm update`
