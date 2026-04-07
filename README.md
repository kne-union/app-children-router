# app-children-router

### 描述

定义应用子路由.

### 安装

```shell
npm i --save @kne/app-children-router
```

### 概述

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


### 示例(全屏)

#### 示例代码

- 基础用法
- 展示 AppChildrenRouter 的基本使用方法，包括路由配置、错误页面和 404 页面
- _AppChildrenRouter(@kne/current-lib_app-children-router)[import * as _AppChildrenRouter from "@kne/app-children-router"],_reactRouterDom(react-router-dom),antd(antd)

```jsx
const { default: AppChildrenRouter, loadableWithProps } = _AppChildrenRouter;
const { Route, Routes, Link, useNavigate, Navigate } = _reactRouterDom;
const { Flex, Card, Button } = antd;

// 模拟页面组件
const HomePage = () => <div style={{ padding: 20 }}>这是首页内容</div>;
const Page1 = () => <div style={{ padding: 20 }}>这是页面1的内容</div>;
const Page2 = () => <div style={{ padding: 20 }}>这是页面2的内容</div>;

// 带导航的布局组件
const LayoutWithNav = () => {
  const navigate = useNavigate();
  return (
    <Flex vertical gap={24}>
      <Flex gap={10} wrap="wrap">
        <Link to="/app">首页</Link>
        <Link to="/app/page1">页面1</Link>
        <Link to="/app/page2">页面2</Link>
        <Link to="/app/error?status=500&msg=服务器错误示例">错误页面</Link>
        <Link to="/app/error?status=403&msg=无权限访问">403错误</Link>
        <Link to="/app/unknown-path">不存在的页面(404)</Link>
      </Flex>
      <Card>
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
                    loader: async () => ({ default: HomePage })
                  },
                  {
                    path: 'page1',
                    loader: async () => ({ default: Page1 })
                  },
                  {
                    path: 'page2',
                    loader: async () => ({ default: Page2 })
                  }
                ]}
              />
            }
          />
          <Route path="*" element={<Navigate to="/app" />} />
        </Routes>
      </Card>
    </Flex>
  );
};

const BaseExample = () => {
  return <LayoutWithNav />;
};

render(<BaseExample />);

```

- loadableWithProps 工具函数
- 演示如何使用 loadableWithProps 动态加载组件并传递 props
- _AppChildrenRouter(@kne/current-lib_app-children-router)[import * as _AppChildrenRouter from "@kne/app-children-router"],antd(antd)

```jsx
const { loadableWithProps } = _AppChildrenRouter;
const { Button, Space } = antd;

// 演示 loadableWithProps 的使用
const LoadableExample = () => {
  const [count, setCount] = React.useState(0);

  // 动态加载组件并传递 props
  const DynamicComponent = loadableWithProps(
    async () => {
      // 模拟异步加载
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        default: ({ count, message }) => (
          <div style={{ padding: 20, background: '#f5f5f5', borderRadius: 4 }}>
            <p>计数器: {count}</p>
            <p>消息: {message}</p>
          </div>
        )
      };
    },
    { count, message: 'Hello from props' },
    <div style={{ padding: 20 }}>加载中...</div>
  );

  return (
    <Space direction="vertical" size={16}>
      <Space>
        <Button onClick={() => setCount(c => c + 1)}>增加计数: {count}</Button>
        <Button onClick={() => setCount(0)}>重置</Button>
      </Space>
      {DynamicComponent}
    </Space>
  );
};

render(<LoadableExample />);

```

- 自定义错误页面
- 展示如何自定义 Error 和 NotFound 页面
- _AppChildrenRouter(@kne/current-lib_app-children-router)[import * as _AppChildrenRouter from "@kne/app-children-router"],_reactRouterDom(react-router-dom),antd(antd)

```jsx
const { default: AppChildrenRouter, Error, NotFound } = _AppChildrenRouter;
const { Navigate, Route, Routes, Link, useLocation } = _reactRouterDom;
const { Flex, Card, Result, Button } = antd;

// 自定义错误页面组件
const CustomErrorPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status') || '500';
  const msg = searchParams.get('msg') || '发生了错误';

  return (
    <Result
      status={status}
      title={&#96;自定义错误 ${status}&#96;}
      subTitle={msg}
      extra={
        <Button type="primary" onClick={() => window.history.back()}>
          返回上一页
        </Button>
      }
    />
  );
};

// 自定义 404 页面组件
const CustomNotFoundPage = () => (
  <Result
    status="404"
    title="自定义 404"
    subTitle="抱歉，您访问的页面不存在"
    extra={
      <Button type="primary" onClick={() => window.history.back()}>
        返回上一页
      </Button>
    }
  />
);

const CustomPagesExample = () => {
  return (
    <Flex vertical gap={24}>
      <Flex gap={10}>
        <Link to="/app">首页</Link>
        <Link to="/app/error?status=500&msg=自定义服务器错误">触发自定义 500</Link>
        <Link to="/app/error?status=403&msg=自定义权限错误">触发自定义 403</Link>
        <Link to="/app/404">触发自定义 404</Link>
      </Flex>
      <Card>
        <Routes>
          <Route
            path="app/*"
            element={
              <AppChildrenRouter
                baseUrl="/app"
                list={[
                  {
                    index: true,
                    loader: async () => ({ default: () => '首页内容' })
                  },
                  // 自定义错误路由
                  {
                    path: 'error',
                    element: <CustomErrorPage />
                  },
                  // 自定义 404 路由
                  {
                    path: '404',
                    element: <CustomNotFoundPage />
                  }
                ]}>
                {/* 未匹配路由跳转到自定义 404 */}
                <Route path="*" element={<CustomNotFoundPage />} />
              </AppChildrenRouter>
            }
          />
          <Route path="*" element={<Navigate to="/app" />} />
        </Routes>
      </Card>
    </Flex>
  );
};

render(<CustomPagesExample />);

```

- 嵌套路由
- 展示如何在布局中使用嵌套路由，结合 element 属性实现复杂的路由结构
- _AppChildrenRouter(@kne/current-lib_app-children-router)[import * as _AppChildrenRouter from "@kne/app-children-router"],_reactRouterDom(react-router-dom),antd(antd)

```jsx
const { default: AppChildrenRouter } = _AppChildrenRouter;
const { Route, Routes, Link, Outlet, Navigate } = _reactRouterDom;
const { Flex, Card, Menu } = antd;

// 嵌套路由示例
const Layout = () => {
  return (
    <Flex gap={16}>
      <div style={{ width: 200 }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['home']}
          items={[
            { key: 'home', label: <Link to="/app">首页</Link> },
            { key: 'dashboard', label: <Link to="/app/dashboard">仪表盘</Link> },
            { key: 'settings', label: <Link to="/app/settings">设置</Link> },
            { key: 'profile', label: <Link to="/app/profile">个人中心</Link> }
          ]}
        />
      </div>
      <Card style={{ flex: 1 }}>
        <Outlet />
      </Card>
    </Flex>
  );
};

const NestedRoutesExample = () => {
  return (
    <Routes>
      <Route path="app/*" element={<Layout />}>
        <Route index element={<div style={{ padding: 20 }}>欢迎来到首页</div>} />
        <Route
          path="*"
          element={
            <AppChildrenRouter
              notFoundPage
              baseUrl="/app"
              list={[
                {
                  path: 'dashboard',
                  element: <div style={{ padding: 20 }}>仪表盘页面</div>
                },
                {
                  path: 'settings',
                  loader: async () => ({
                    default: () => <div style={{ padding: 20 }}>设置页面</div>
                  })
                },
                {
                  path: 'profile',
                  loader: async () => ({
                    default: () => <div style={{ padding: 20 }}>个人中心页面</div>
                  })
                }
              ]}
            />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/app" />} />
    </Routes>
  );
};

render(<NestedRoutesExample />);

```

### API

# API 文档

## 核心组件

### AppChildrenRouter

主路由组件，用于渲染动态路由配置。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|-------|------|
| `list` | `Array<RouteConfig>` | `[]` | 路由配置列表，每项包含 path、loader、element、elementProps 等属性 |
| `element` | `ReactNode` | - | 父路由元素，用于嵌套路由场景，配合 `children` 使用 |
| `errorPage` | `ReactNode \| boolean` | - | 自定义错误页面，传入 `true` 使用默认 Error 组件 |
| `notFoundPage` | `ReactNode \| boolean` | - | 自定义 404 页面，传入 `true` 使用默认 NotFound 组件 |
| `loading` | `ReactNode` | - | 页面加载时的过渡组件，覆盖全局配置 |
| `children` | `ReactNode` | - | 未匹配路由时的回退内容，通常配合 `notFoundPage` 使用 |
| `baseUrl` | `string` | - | 路由基础路径，用于错误页面返回首页导航 |

#### RouteConfig 配置项

| 属性 | 类型 | 描述 |
|------|------|------|
| `path` | `string` | 路由路径 |
| `index` | `boolean` | 是否为索引路由 |
| `loader` | `() => Promise<{ default: Component }>` | 动态加载组件的函数 |
| `element` | `ReactNode` | 直接指定路由元素，与 loader 二选一 |
| `elementProps` | `object` | 传递给加载组件的额外属性 |

---

### Error

默认错误页面组件，支持国际化。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|-------|------|
| `status` | `number` | `500` | HTTP 错误状态码，支持 404、403、500 |
| `msg` | `string` | - | 错误描述信息 |
| `baseUrl` | `string` | - | 返回首页的基础路径 |

---

### NotFound

默认 404 页面组件，支持国际化。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|-------|------|
| `baseUrl` | `string` | - | 返回首页的基础路径 |

---

## 工具函数

### loadableWithProps

动态加载组件并注入属性。

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `loader` | `() => Promise<{ default: Component }>` | 动态加载函数 |
| `props` | `object` | 传递给组件的属性 |
| `loading` | `ReactNode` | 加载中的过渡组件 |

#### 返回值

`ReactNode` - 加载完成的组件

#### 示例

```javascript
const PageComponent = loadableWithProps(
  async () => import('./Page'),
  { title: '页面标题' },
  <Spin />
);
```

---

### preset

全局参数配置函数，用于设置默认值。

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `options` | `object` | 配置项 |

#### 配置项

| 属性 | 类型 | 默认值 | 描述 |
|------|------|-------|------|
| `errorPage` | `ReactNode` | - | 默认错误页面 |
| `notFoundPage` | `ReactNode` | - | 默认 404 页面 |
| `loading` | `ReactNode` | `<Spin />` | 默认加载状态组件 |

#### 示例

```javascript
import { preset } from '@kne/app-children-router';

preset({
  loading: <CustomLoading />,
  errorPage: <CustomError />,
  notFoundPage: <CustomNotFound />
});
```
