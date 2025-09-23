
# app-children-router


### 描述

定义应用子路由


### 安装

```shell
npm i --save @kne/app-children-router
```


### 概述

### 项目概述

`app-children-router` 是一个基于 React 和 React Router 的子路由管理组件，主要用于动态加载页面组件和处理路由错误。

#### 核心功能

- **动态路由加载**：支持通过 `loadableWithProps` 方法动态加载页面组件。
- **错误处理**：内置错误页面 (`Error`) 和404页面 (`NotFound`) 支持。
- **全局配置**：通过 `preset` 函数配置全局参数，如加载状态 (`loading`)、错误页面 (`errorPage`) 和404页面 (`notFountPage`)。

#### 主要特性

- 支持动态路由配置列表 (`list`)。
- 支持自定义错误页面和404页面。
- 提供全局加载状态组件 (`Spin`)。

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
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

| 属性名            | 类型          | 默认值     | 描述                                              |
|----------------|-------------|---------|-------------------------------------------------|
| `list`         | `Array`     | `[]`    | 路由配置列表，每个对象包含 `path`、`loader` 和 `elementProps`。 |
| `errorPage`    | `ReactNode` | `false` | 自定义错误页面组件。                                      |
| `notFoundPage` | `ReactNode` | `false` | 自定义404页面组件。                                     |
| `loading`      | `ReactNode` | `Spin`  | 全局加载状态组件。                                       |
| `children`     | `ReactNode` | -       | 默认子组件，用于匹配未定义的路由。                               |

#### `preset` 函数

| 参数名            | 类型          | 默认值     | 描述         |
|----------------|-------------|---------|------------|
| `errorPage`    | `ReactNode` | `false` | 全局错误页面组件。  |
| `notFountPage` | `ReactNode` | `false` | 全局404页面组件。 |
| `loading`      | `ReactNode` | `Spin`  | 全局加载状态组件。  |
