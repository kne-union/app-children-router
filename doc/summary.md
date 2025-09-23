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