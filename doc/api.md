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
