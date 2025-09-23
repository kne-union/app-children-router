
# app-children-router


### 描述

定义应用子路由


### 安装

```shell
npm i --save @kne/app-children-router
```


### 概述

这是一个轻量级的 React 子路由管理库，专为需要动态路由配置的应用设计。它支持动态加载页面组件，内置错误处理和 404 页面配置，同时提供了国际化支持。通过简单的配置，您可以快速构建一个高效、灵活的路由系统。

### 特点
- **动态路由加载**：支持按需加载页面组件，提升应用性能。
- **内置错误处理**：自动处理错误页面和 404 页面，减少重复代码。
- **国际化支持**：内置多语言配置，轻松适配不同语言环境。
- **高度可定制**：通过全局参数配置，灵活调整加载状态、错误页面等。

适用于需要动态路由管理的 React 应用，尤其是多语言和复杂路由场景。

### 示例

#### 示例代码

- AppChildrenRouter 基础示例
- 展示如何使用 AppChildrenRouter 实现子路由功能
- _AppChildrenRouter(@kne/current-lib_app-children-router)[import * as _AppChildrenRouter from "@kne/app-children-router"],_reactRouterDom(react-router-dom),antd(antd)

```jsx
const { default: AppChildrenRouter } = _AppChildrenRouter;
const { Route, Routes, Link } = _reactRouterDom;
const { Flex, Card } = antd;

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <Flex gap={10}>
        <Link to="/AppChildrenRouter">Home</Link>
        <Link to="/AppChildrenRouter/page1">Page1</Link>
        <Link to="/AppChildrenRouter/page2">Page2</Link>
        <Link to="/AppChildrenRouter/error?msg=错误原因XXXX">Error</Link>
        <Link to="/AppChildrenRouter/404">404</Link>
        <Link to="/AppChildrenRouter/children">ChildrenRouter</Link>
      </Flex>
      <Card>
        <Routes>
          <Route
            path="AppChildrenRouter/*"
            element={
              <AppChildrenRouter
                errorPage
                notFoundPage
                baseUrl="/AppChildrenRouter"
                list={[
                  {
                    index: true,
                    loader: async () => ({ default: () => '首页' })
                  },
                  {
                    path: 'page1',
                    loader: async () => ({ default: () => '页面1' })
                  },
                  {
                    path: 'page2',
                    loader: async () => ({ default: () => '页面2' })
                  }
                ]}>
                AppChildrenRouter
              </AppChildrenRouter>
            }
          />
        </Routes>
      </Card>
    </Flex>
  );
};

render(<BaseExample />);

```


### API

### 核心 API

| 名称 | 类型 | 描述 |
|------|------|------|
| `AppChildrenRouter` | React 组件 | 主路由组件，用于渲染动态路由配置。 |
| `loadableWithProps` | 函数 | 动态加载组件并注入属性。 |
| `preset` | 函数 | 全局参数配置函数，用于设置默认值。 |
| `Error` | React 组件 | 默认错误页面组件。 |
| `NotFound` | React 组件 | 默认 404 页面组件。 |

### 全局参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|------|------|
| `errorPage` | React 组件或元素 | `false` | 自定义错误页面。 |
| `notFountPage` | React 组件或元素 | `false` | 自定义 404 页面。 |
| `loading` | React 组件或元素 | `<Spin />` | 页面加载时的过渡组件。 |

### 组件属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `list` | 数组 | 路由配置列表，包含 `path` 和 `loader` 等属性。 |
| `errorPage` | React 组件或元素 | 覆盖全局错误页面配置。 |
| `notFoundPage` | React 组件或元素 | 覆盖全局 404 页面配置。 |
| `loading` | React 组件或元素 | 覆盖全局加载状态组件。 |
| `children` | React 节点 | 默认渲染内容，通常用于未匹配路由时的回退。 |
| `baseUrl` | 字符串 | 路由基础路径。 |
