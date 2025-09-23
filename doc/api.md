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