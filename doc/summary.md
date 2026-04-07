# App Children Router

一个轻量级的 React 子路由管理库，专为需要动态路由配置的应用设计。支持动态加载页面组件、内置错误处理和 404 页面配置，并提供国际化支持。

## 核心特性

- **动态路由加载**：基于 `@loadable/component` 实现按需加载，提升应用性能
- **内置错误处理**：自动处理错误页面（403、404、500）和 404 页面，减少重复代码
- **国际化支持**：内置中英文语言包，轻松适配多语言环境
- **高度可定制**：支持自定义错误页面、加载状态、全局配置
- **嵌套路由支持**：配合 React Router v6 实现复杂的嵌套路由结构
- **TypeScript 支持**：提供完整的类型声明

## 安装

```bash
npm install @kne/app-children-router
# 或
yarn add @kne/app-children-router
```

## 快速开始

```jsx
import AppChildrenRouter from '@kne/app-children-router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="app/*"
          element={
            <AppChildrenRouter
              errorPage
              notFoundPage
              baseUrl="/app"
              list={[
                {
                  index: true,
                  loader: async () => import('./pages/Home')
                },
                {
                  path: 'dashboard',
                  loader: async () => import('./pages/Dashboard')
                }
              ]}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

## 适用场景

- 需要动态路由管理的 React 应用
- 多语言和国际化应用
- 复杂路由结构和嵌套路由场景
- 需要统一错误处理的应用
