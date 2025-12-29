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


你好，你提到的 **App Router** 是 Next.js 13 及更高版本中引入的**新一代路由系统**，它旨在提供更强大、更灵活且与现代 React 特性（如 **React Server Components, RSC**）深度集成的开发体验。

可以将其视为对旧版 **Pages Router** 的一次重大升级和重构。

---

### App Router vs. Pages Router：核心区别

| 特性 | **App Router** (新) | **Pages Router** (旧) |
| :--- | :--- | :--- |
| **路由定义** | **基于文件夹和特殊文件** (如 `page.tsx`, `layout.tsx`) | 基于 `pages` 目录下的**文件和文件夹** |
| **组件类型** | **React Server Components (RSC) 优先**，也支持客户端组件 | 默认是**客户端组件** (CSR) |
| **数据获取** | 使用顶层 `async/await` 和 React Server Components | 使用特殊的**数据获取函数** (`getServerSideProps`, `getStaticProps` 等) |
| **嵌套布局** | **原生、强大且灵活**，通过 `layout.tsx` 文件实现 | 有限，通常需要在组件内部手动组合 |
| **加载UI** | **原生支持**，通过 `loading.tsx` 文件实现流式加载UI | 无原生支持，需使用 `SWR` 或 `React Query` 等第三方库 |
| **错误UI** | **原生支持**，通过 `error.tsx` 文件实现边界捕获 | 无原生支持，需使用 `ErrorBoundary` 组件 |
| **API 路由** | 使用 `route.ts` 文件，与页面路由结构一致 | 使用 `pages/api` 目录下的文件 |
| **中间件** | 功能更强大，可拦截请求并流式传输数据 | 功能相对基础 |

---

### App Router 的核心概念

#### 1. 基于文件系统的约定

路由结构由 `app` 目录下的文件夹层级决定。

```
app/
├── layout.tsx        # 根布局，会包裹所有页面
├── page.tsx          # 应用的首页 (/)
├── loading.tsx       # 根加载UI
├── error.tsx         # 根错误UI
├── about/
│   └── page.tsx      # 关于页面 (/about)
└── blog/
    ├── layout.tsx    # blog 分组的布局
    ├── page.tsx      # blog 列表页 (/blog)
    └── [slug]/
        └── page.tsx  # blog 详情页 (/blog/:slug)
```

#### 2. 关键的特殊文件

*   **`page.tsx`**:
    *   定义一个路由的**主要内容**。
    *   只有包含 `page.tsx` 的文件夹才会成为一个可访问的路由。
    *   默认是 **React Server Component**。

*   **`layout.tsx`**:
    *   定义一个**共享布局**，会包裹其所有子路由的 `page.tsx`。
    *   你可以在布局中放置导航栏、页脚等通用UI。
    *   布局组件接收一个 `children` prop，子页面的内容会被渲染在这里。
    *   默认是 **React Server Component**。

*   **`loading.tsx`**:
    *   在数据获取期间，为用户提供一个**即时的加载UI**。
    *   这利用了 React 的 **Suspense** 功能，实现了流式渲染，用户无需等待所有数据加载完才能看到页面。

*   **`error.tsx`**:
    *   定义一个**错误边界**，当其子路由发生错误时，会显示这个UI，而不是让整个应用崩溃。

*   **`route.ts`**:
    *   定义**服务器 API 端点**，用于处理 `GET`, `POST`, `PUT`, `DELETE` 等请求。

#### 3. React Server Components (RSC) - App Router 的基石

这是 App Router 最重要的特性。

*   **是什么？** RSC 允许你编写在**服务器上运行**的 React 组件。
*   **有什么好处？**
    1.  **零 JavaScript 发送到客户端**：如果一个组件只负责渲染数据（没有交互逻辑），它的代码将完全在服务器上执行，浏览器只会收到最终的 HTML。这极大地减少了客户端的 JavaScript 包体积，提升了首屏加载速度。
    2.  **直接在组件中获取数据**：你可以在 Server Component 的顶层使用 `async/await` 来直接从数据库、API 或文件系统获取数据，无需像 Pages Router 那样使用特殊的 `getServerSideProps` 函数。这让数据获取逻辑更靠近使用它的组件，代码更简洁。
    3.  **安全**：可以安全地在 Server Component 中处理敏感数据（如 API 密钥），因为这些代码永远不会暴露给客户端。

#### 4. 客户端组件 (Client Components)

并非所有组件都能在服务器上运行。当你的组件需要使用浏览器特有的 API 或 React 的 `useState`, `useEffect`, `useRouter` 等客户端 Hooks 时，你需要将其声明为客户端组件。

只需在文件顶部添加一个指令即可：

```tsx
// app/components/MyInteractiveComponent.tsx
'use client' // <--- 关键指令

import { useState } from 'react'

export default function MyInteractiveComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
```

**最佳实践**：将你的应用拆分为“数据获取和静态内容”的 Server Components 和“交互逻辑”的 Client Components，以获得最佳性能。

---

### 何时使用 App Router？

*   **新项目**：**强烈推荐**使用 App Router。它代表了 Next.js 的未来，提供了更好的性能、更优雅的开发体验。
*   **现有项目**：如果你的项目还在使用 Pages Router，并且运行良好，不一定需要立即迁移。但如果你计划进行大规模重构或希望利用 RSC 等现代特性，那么迁移到 App Router 是值得的。Next.js 提供了良好的向后兼容性，你可以逐步迁移。

### 总结

**App Router** 是 Next.js 的一次巨大飞跃。它通过引入 **React Server Components** 和一套新的基于文件的约定，重新定义了构建 React 应用的方式。它让服务端渲染变得更简单，数据获取更直观，应用性能更出色。对于任何新的 Next.js 项目，App Router 都是不二之选。