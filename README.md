# Reown AppKit Example using wagmi (next.js with App Router)

This is a Next.js project.

## Usage

1. Go to [Reown Dashboard](https://dashboard.reown.com) and create a new project.
2. Copy your `Project ID`
3. Rename `.env.example` to `.env` and paste your `Project ID` as the value for `NEXT_PUBLIC_PROJECT_ID`
4. Run `pnpm install` to install dependencies
5. Run `pnpm run dev` to start the development server

## Resources

- [Reown — Docs](https://docs.reown.com)
- [Next.js — Docs](https://nextjs.org/docs)

## 本项目主要完成的功能

本项目是一个基于 Next.js、Reown AppKit 和 wagmi 构建的完整 Web3 DApp 应用，主要实现了以下功能：

### 1. 钱包连接与管理
- 使用 Reown AppKit 实现钱包连接功能
- 支持多种钱包（MetaMask、WalletConnect 等）
- 自动切换到自定义网络（Ganache Local）
- 显示钱包地址和连接状态
- 支持断开钱包连接

### 2. 网络配置与切换
- 配置了自定义本地网络（Ganache Local）
- 支持在多个网络之间切换（Ganache Local、Mainnet、Arbitrum）
- 自动处理网络授权流程

### 3. NFT 市场功能
- **浏览市场**：展示所有在售的 NFT，包括图片、名称、描述、价格和卖家信息
- **NFT 详情**：点击 NFT 可查看详细信息
- **上传 NFT**：用户可以上传自己的 NFT 到市场
  - 支持上传 NFT 图片
  - 填写 NFT 名称和描述
  - 设置 NFT 价格
  - 自动生成元数据并上传到 IPFS
- **个人资产**：查看用户拥有的所有 NFT 资产
  - 显示钱包地址
  - 统计 NFT 数量
  - 计算总资产价值

### 4. 智能合约交互
- 使用 wagmi 的 `useReadContract` 读取合约数据
- 使用 `useWriteContract` 写入合约数据
- 支持交易确认和错误处理
- 实时获取 NFT 元数据（tokenURI）

### 5. 后端 API
- **上传图片 API**：`/api/upload-image` - 上传 NFT 图片
- **上传元数据 API**：`/api/upload-metadata` - 上传 NFT 元数据到 IPFS

### 6. UI 组件与用户体验
- 响应式设计，支持多种屏幕尺寸
- 使用 Tailwind CSS 实现现代化 UI
- 加载状态和错误处理
- 图片懒加载和占位符显示

### 7. 开发者工具
- 显示 AppKit 状态信息（地址、主题、网络等）
- 显示钱包信息
- 事件监听和日志输出

### 技术栈
- **前端框架**：Next.js 16.1.1 (App Router)
- **Web3 库**：wagmi 3.1.3、viem 2.43.3
- **钱包 SDK**：Reown AppKit 1.8.15
- **UI 库**：Tailwind CSS、shadcn/ui
- **表单处理**：react-hook-form、zod
- **智能合约**：Solidity NFTMarketPlace 合约