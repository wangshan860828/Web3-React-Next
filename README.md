# 企业级 React Next.js 工程架构

这是一个标准化的企业级 React Next.js 应用工程架构模板，遵循最佳实践设计，旨在提供清晰的代码组织、可维护性和可扩展性。

## 📁 项目文件结构

采用 Next.js 13+ 官方推荐结构（无 src/ 根目录）：
```
project-name/
├── app/                # Next.js 13+ App Router 主目录
│   ├── [locale]/       # 国际化多语言支持
│   ├── api/            # API Routes（服务端路由）
│   │   ├── v1/         # API 版本管理
│   │   │   ├── auth/   # 认证相关接口
│   │   │   ├── users/  # 用户管理接口
│   │   │   └── ...
│   │   └── ...
│   ├── dashboard/      # 仪表盘页面
│   ├── settings/       # 设置页面
│   ├── layout.tsx      # 根布局组件
│   ├── page.tsx        # 首页
│   ├── not-found.tsx   # 404 页面
│   └── globals.css     # 全局样式
├── components/         # 组件库
│   ├── layout/         # 布局组件
│   │   ├── Header.tsx  # 页面头部
│   │   ├── Footer.tsx  # 页面底部
│   │   ├── Sidebar.tsx # 侧边栏
│   │   └── ...
│   ├── ui/             # 基础 UI 组件
│   │   ├── Button.tsx  # 按钮组件
│   │   ├── Input.tsx   # 输入框组件
│   │   ├── Card.tsx    # 卡片组件
│   │   └── ...
│   ├── common/         # 通用业务组件
│   │   ├── UserAvatar.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ...
│   └── features/       # 按功能划分的组件
│       ├── auth/       # 认证相关组件
│       ├── dashboard/  # 仪表盘相关组件
│       └── ...
├── lib/                # 工具库和配置
│   ├── types/          # TypeScript 类型定义
│   ├── utils/          # 通用工具函数
│   ├── api/            # API 客户端
│   └── constants.ts    # 常量定义
├── hooks/              # 自定义 React Hooks
│   ├── useAuth.ts      # 认证 Hook
│   ├── useTheme.ts     # 主题 Hook
│   └── useFetch.ts     # 数据请求 Hook
├── services/           # 服务层
│   ├── auth.ts         # 认证服务
│   ├── user.ts         # 用户服务
│   └── ...
├── public/             # 静态资源
│   ├── assets/         # 资源文件
│   │   ├── images/     # 图片资源
│   │   └── styles/     # 样式资源
│   ├── favicon.ico     # 网站图标
│   └── ...
├── tests/              # 测试文件
│   ├── components/     # 组件测试
│   ├── pages/          # 页面测试
│   └── utils/          # 工具函数测试
├── docs/               # 文档
├── __mocks__/          # Mock 数据
├── next.config.ts      # Next.js 配置
├── tsconfig.json       # TypeScript 配置
├── package.json        # 项目配置
└── README.md           # 项目说明
```

## 📂 目录说明

### 📁 app/
Next.js 13+ 引入的 App Router 主要目录，包含了所有的页面和布局。
- `api/`: 服务端 API 路由，用于处理后端请求
- `layout.tsx`: 应用的根布局组件
- `page.tsx`: 应用的首页
- `[locale]/`: 国际化多语言支持
- `dashboard/`: 仪表盘页面目录
- `settings/`: 设置页面目录

### 📁 components/
所有 React 组件的存放位置，按功能和类型组织：
- `layout/`: 布局相关组件（Header、Footer、Sidebar 等）
- `ui/`: 基础 UI 组件（原子组件，如 Button、Input、Card 等）
- `common/`: 通用业务组件（可复用的业务逻辑组件）
- `features/`: 按业务功能分组的组件（如 auth、dashboard 相关组件）

### 📁 lib/
应用的工具库和通用代码：
- `types/`: TypeScript 类型定义文件
- `utils/`: 通用工具函数
- `api/`: API 客户端配置
- `constants.ts`: 常量值定义

### 📁 hooks/
自定义 React Hooks，用于共享状态逻辑和副作用处理：
- `useAuth.ts`: 认证相关 Hook
- `useTheme.ts`: 主题切换 Hook
- `useFetch.ts`: 数据请求 Hook

### 📁 services/
业务服务层，封装与后端 API 的交互和业务逻辑：
- `auth.ts`: 认证服务
- `user.ts`: 用户服务

### 📁 public/
静态资源目录，用于存放图片、样式等资源文件：
- `assets/`: 资源文件子目录
  - `images/`: 图片资源
  - `styles/`: 样式资源

## 🎯 使用指南

### 页面开发
所有页面都放在 `app/` 目录下，使用 Next.js 13+ 的文件系统路由：
- 创建新页面时，在 `app/` 下新建对应目录
- 页面文件名为 `page.tsx`
- 动态路由使用 `[param]` 格式

### 组件开发
- UI 组件放在 `components/ui/`
- 业务组件放在 `components/common/` 或 `components/features/`
- 布局组件放在 `components/layout/`

### 数据请求
- 使用自定义 Hook (`hooks/useFetch.ts`) 或 React Query 管理数据
- API 调用封装在 `services/` 中

## 🔧 技术栈

- **框架**: Next.js 16
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Query / 自定义 Hooks
- **测试**: Jest + React Testing Library
- **HTTP 客户端**: Axios

## 📋 最佳实践

1. **代码组织**: 按功能和类型合理组织文件
2. **类型安全**: 全面使用 TypeScript
3. **组件复用**: 尽量抽象可复用的 UI 组件
4. **测试覆盖**: 关键功能编写单元测试
5. **文档完善**: 关键代码和组件添加注释
6. **性能优化**: 利用 Next.js 的 SSR/SSG 特性