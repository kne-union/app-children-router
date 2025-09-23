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