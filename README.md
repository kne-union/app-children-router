# app-children-router

### 描述

定义应用子路由

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
const { Flex, Card, Button, Table, Descriptions, Statistic, Row, Col, Typography, Space } = antd;

const { Title, Text } = Typography;

// 用户管理首页 - 展示数据概览
const HomePage = () => {
  const stats = [
    { title: '总用户数', value: 12580 },
    { title: '今日新增', value: 128 },
    { title: '活跃用户', value: 3560 },
    { title: '待审核', value: 23 }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>数据概览</Title>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {stats.map((item, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic title={item.title} value={item.value} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

// 用户列表页面 - 展示列表数据
const UserListPage = () => {
  const columns = [
    { title: '用户ID', dataIndex: 'id', key: 'id' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '注册时间', dataIndex: 'registerTime', key: 'registerTime' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => (
        <span style={{ color: status === 'active' ? '#52c41a' : '#ff4d4f' }}>
          {status === 'active' ? '正常' : '已禁用'}
        </span>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Link to={&#96;/app/user/${record.id}&#96;}>查看</Link>
          <a>编辑</a>
        </Space>
      )
    }
  ];

  const mockData = [
    { id: 'U001', username: '张三', email: 'zhangsan@example.com', registerTime: '2024-01-15', status: 'active' },
    { id: 'U002', username: '李四', email: 'lisi@example.com', registerTime: '2024-02-20', status: 'active' },
    { id: 'U003', username: '王五', email: 'wangwu@example.com', registerTime: '2024-03-10', status: 'inactive' }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>用户列表</Title>
      <Table columns={columns} dataSource={mockData} rowKey="id" pagination={{ pageSize: 10 }} />
    </div>
  );
};

// 用户详情页面 - 展示详细信息
const UserDetailPage = () => {
  const mockUser = {
    id: 'U001',
    username: '张三',
    email: 'zhangsan@example.com',
    phone: '138****8888',
    registerTime: '2024-01-15 10:30:00',
    lastLoginTime: '2024-03-20 15:45:00',
    status: 'active',
    vipLevel: '黄金会员'
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>用户详情</Title>
      <Card>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="用户ID">{mockUser.id}</Descriptions.Item>
          <Descriptions.Item label="用户名">{mockUser.username}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{mockUser.email}</Descriptions.Item>
          <Descriptions.Item label="手机号">{mockUser.phone}</Descriptions.Item>
          <Descriptions.Item label="注册时间">{mockUser.registerTime}</Descriptions.Item>
          <Descriptions.Item label="最后登录">{mockUser.lastLoginTime}</Descriptions.Item>
          <Descriptions.Item label="会员等级">{mockUser.vipLevel}</Descriptions.Item>
          <Descriptions.Item label="状态">{mockUser.status === 'active' ? '正常' : '已禁用'}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

// 系统设置页面
const SettingsPage = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>系统设置</Title>
      <Card>
        <Descriptions column={1}>
          <Descriptions.Item label="系统名称">用户管理系统 v2.0</Descriptions.Item>
          <Descriptions.Item label="运行环境">生产环境</Descriptions.Item>
          <Descriptions.Item label="数据库版本">MySQL 8.0</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

// 主布局组件
const LayoutWithNav = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { key: 'home', label: <Link to="/app">首页概览</Link> },
    { key: 'users', label: <Link to="/app/users">用户列表</Link> },
    { key: 'detail', label: <Link to="/app/user/U001">用户详情</Link> },
    { key: 'settings', label: <Link to="/app/settings">系统设置</Link> },
    { 
      key: 'error-500', 
      label: <Link to="/app/error?status=500&msg=服务器内部错误，请稍后重试">触发500错误</Link> 
    },
    { 
      key: 'error-403', 
      label: <Link to="/app/error?status=403&msg=您没有权限访问此页面">触发403错误</Link> 
    },
    { 
      key: '404', 
      label: <Link to="/app/unknown-page">触发404页面</Link> 
    }
  ];

  return (
    <Flex vertical gap={24}>
      <Card>
        <Flex gap={16} wrap="wrap">
          {menuItems.map(item => (
            <Button key={item.key} type="link" style={{ padding: 0 }}>
              {item.label}
            </Button>
          ))}
        </Flex>
      </Card>
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
                    path: 'users',
                    loader: async () => ({ default: UserListPage })
                  },
                  {
                    path: 'user/:id',
                    loader: async () => ({ default: UserDetailPage })
                  },
                  {
                    path: 'settings',
                    loader: async () => ({ default: SettingsPage })
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
const { Button, Space, Card, Form, Input, Select, DatePicker, InputNumber, Typography, Alert, Spin } = antd;

const { Title, Text, Paragraph } = Typography;

// 动态加载的用户详情卡片组件
const UserDetailCard = ({ userId, username, email, role, department, onRefresh }) => {
  return (
    <Card 
      title={&#96;用户信息 - ${username}&#96;} 
      extra={<Button type="link" onClick={onRefresh}>刷新</Button>}
      style={{ marginTop: 16 }}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Text><strong>用户ID：</strong>{userId}</Text>
        <Text><strong>邮箱：</strong>{email}</Text>
        <Text><strong>角色：</strong>{role}</Text>
        <Text><strong>部门：</strong>{department}</Text>
      </Space>
    </Card>
  );
};

// 动态加载的权限配置组件
const PermissionConfig = ({ permissions, onPermissionChange }) => {
  const permissionOptions = [
    { label: '查看数据', value: 'view' },
    { label: '编辑数据', value: 'edit' },
    { label: '删除数据', value: 'delete' },
    { label: '管理用户', value: 'manage_users' },
    { label: '系统配置', value: 'system_config' }
  ];

  return (
    <Card title="权限配置" style={{ marginTop: 16 }}>
      <Alert
        message="权限说明"
        description="请根据用户角色配置相应的权限，权限变更将立即生效"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Select
        mode="multiple"
        placeholder="请选择权限"
        value={permissions}
        onChange={onPermissionChange}
        options={permissionOptions}
        style={{ width: '100%' }}
      />
    </Card>
  );
};

// 动态加载的表单组件 - 根据配置生成不同的表单字段
const DynamicForm = ({ formType, initialData, onSubmit }) => {
  const [form] = Form.useForm();

  const formConfigs = {
    user: {
      title: '用户信息表单',
      fields: [
        { name: 'username', label: '用户名', type: 'input', rules: [{ required: true }] },
        { name: 'email', label: '邮箱', type: 'input', rules: [{ required: true, type: 'email' }] },
        { name: 'role', label: '角色', type: 'select', options: [
          { label: '管理员', value: 'admin' },
          { label: '普通用户', value: 'user' },
          { label: '访客', value: 'guest' }
        ]}
      ]
    },
    product: {
      title: '商品信息表单',
      fields: [
        { name: 'productName', label: '商品名称', type: 'input', rules: [{ required: true }] },
        { name: 'price', label: '价格', type: 'number', rules: [{ required: true }] },
        { name: 'stock', label: '库存', type: 'number', rules: [{ required: true }] },
        { name: 'category', label: '分类', type: 'select', options: [
          { label: '电子产品', value: 'electronics' },
          { label: '服装', value: 'clothing' },
          { label: '食品', value: 'food' }
        ]}
      ]
    },
    order: {
      title: '订单信息表单',
      fields: [
        { name: 'orderNo', label: '订单号', type: 'input', rules: [{ required: true }] },
        { name: 'customerName', label: '客户姓名', type: 'input', rules: [{ required: true }] },
        { name: 'deliveryDate', label: '交付日期', type: 'date', rules: [{ required: true }] },
        { name: 'amount', label: '金额', type: 'number', rules: [{ required: true }] }
      ]
    }
  };

  const config = formConfigs[formType] || formConfigs.user;

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      label: field.label,
      rules: field.rules
    };

    switch (field.type) {
      case 'input':
        return <Form.Item key={field.name} {...commonProps}><Input /></Form.Item>;
      case 'number':
        return <Form.Item key={field.name} {...commonProps}><InputNumber style={{ width: '100%' }} /></Form.Item>;
      case 'select':
        return (
          <Form.Item key={field.name} {...commonProps}>
            <Select options={field.options} />
          </Form.Item>
        );
      case 'date':
        return <Form.Item key={field.name} {...commonProps}><DatePicker style={{ width: '100%' }} /></Form.Item>;
      default:
        return <Form.Item key={field.name} {...commonProps}><Input /></Form.Item>;
    }
  };

  return (
    <Card title={config.title} style={{ marginTop: 16 }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
        onFinish={onSubmit}
      >
        {config.fields.map(renderField)}
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

// 演示 loadableWithProps 的使用
const LoadableExample = () => {
  const [activeTab, setActiveTab] = React.useState('user');
  const [userData, setUserData] = React.useState({
    userId: 'U20240001',
    username: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    department: '技术部'
  });
  const [permissions, setPermissions] = React.useState(['view', 'edit']);

  // 模拟异步加载用户详情卡片
  const UserCard = loadableWithProps(
    async () => {
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      return { default: UserDetailCard };
    },
    {
      ...userData,
      onRefresh: () => {
        setUserData(prev => ({ ...prev, username: prev.username + ' (已刷新)' }));
      }
    },
    <Card style={{ marginTop: 16 }}>
      <Spin tip="加载用户信息中..." />
    </Card>
  );

  // 模拟异步加载权限配置
  const PermissionPanel = loadableWithProps(
    async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return { default: PermissionConfig };
    },
    {
      permissions,
      onPermissionChange: (newPermissions) => setPermissions(newPermissions)
    },
    <Card style={{ marginTop: 16 }}>
      <Spin tip="加载权限配置中..." />
    </Card>
  );

  // 模拟异步加载动态表单
  const ActiveForm = loadableWithProps(
    async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { default: DynamicForm };
    },
    {
      formType: activeTab,
      initialData: activeTab === 'user' ? { username: '新用户', role: 'user' } : 
                   activeTab === 'product' ? { productName: '新商品', price: 0 } :
                   { orderNo: 'ORD' + Date.now() },
      onSubmit: (values) => {
        console.log('表单提交:', values);
        alert(&#96;${activeTab === 'user' ? '用户' : activeTab === 'product' ? '商品' : '订单'}信息已提交&#96;);
      }
    },
    <Card style={{ marginTop: 16 }}>
      <Spin tip="加载表单中..." />
    </Card>
  );

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>动态组件加载示例</Title>
      <Paragraph>
        本示例演示如何使用 loadableWithProps 动态加载组件并传递业务数据。在实际应用中，可以根据不同的业务场景动态加载对应的表单或组件。
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Space direction="vertical" size="middle">
            <div>
              <Text strong>选择表单类型：</Text>
              <Space style={{ marginLeft: 16 }}>
                <Button 
                  type={activeTab === 'user' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('user')}
                >
                  用户表单
                </Button>
                <Button 
                  type={activeTab === 'product' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('product')}
                >
                  商品表单
                </Button>
                <Button 
                  type={activeTab === 'order' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('order')}
                >
                  订单表单
                </Button>
              </Space>
            </div>

            <Alert
              message="业务场景说明"
              description="在后台管理系统中，不同类型的数据需要不同的表单配置。通过动态加载，可以按需加载对应的表单组件，提升页面性能。"
              type="info"
              showIcon
            />
          </Space>
        </Card>

        {UserCard}
        {PermissionPanel}
        {ActiveForm}
      </Space>
    </div>
  );
};

render(<LoadableExample />);

```

- 自定义错误页面
- 展示如何自定义 Error 和 NotFound 页面
- _AppChildrenRouter(@kne/current-lib_app-children-router)[import * as _AppChildrenRouter from "@kne/app-children-router"],_reactRouterDom(react-router-dom),antd(antd)

```jsx
const { default: AppChildrenRouter, Error, NotFound } = _AppChildrenRouter;
const { Navigate, Route, Routes, Link, useLocation, useNavigate } = _reactRouterDom;
const { Flex, Card, Result, Button, Typography, Space, Alert } = antd;

const { Title, Text, Paragraph } = Typography;

// 订单系统 - 自定义服务器错误页面
const OrderErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status') || '500';
  const msg = searchParams.get('msg') || '系统繁忙，请稍后重试';

  const errorConfig = {
    500: {
      title: '订单处理失败',
      icon: 'error',
      suggestions: [
        '请检查网络连接是否正常',
        '订单数据可能正在处理中，请稍后刷新页面',
        '如问题持续，请联系客服：400-123-4567'
      ]
    },
    403: {
      title: '无权限访问订单',
      icon: 'warning',
      suggestions: [
        '您可能没有查看此订单的权限',
        '请确认订单是否属于当前账户',
        '如需帮助，请联系订单管理员'
      ]
    },
    404: {
      title: '订单不存在',
      icon: 'info',
      suggestions: [
        '订单可能已被删除或取消',
        '请检查订单号是否正确',
        '返回订单列表重新查找'
      ]
    }
  };

  const config = errorConfig[status] || errorConfig[500];

  return (
    <Result
      status={status === '404' ? '404' : (status === '403' ? '403' : '500')}
      title={&#96;${config.title} (${status})&#96;}
      subTitle={msg}
      extra={
        <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: 400 }}>
          <Alert
            message="建议操作"
            description={
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {config.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            }
            type="info"
            showIcon
          />
          <Space>
            <Button type="primary" onClick={() => navigate('/app/orders')}>
              返回订单列表
            </Button>
            <Button onClick={() => window.location.reload()}>
              刷新页面
            </Button>
            <Button onClick={() => navigate('/app')}>
              返回首页
            </Button>
          </Space>
        </Space>
      }
    />
  );
};

// 商品系统 - 自定义 404 页面
const ProductNotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <Result
      status="404"
      title="商品不存在或已下架"
      subTitle="抱歉，您访问的商品可能已被删除、下架或从未存在"
      extra={
        <Space direction="vertical" size="middle">
          <Alert
            message="可能的原因"
            description={
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>商品已售罄并下架</li>
                <li>商品链接输入错误</li>
                <li>商品因违规被平台下架</li>
                <li>商品已过期或活动已结束</li>
              </ul>
            }
            type="warning"
            showIcon
          />
          <Space>
            <Button type="primary" onClick={() => navigate('/app/products')}>
              浏览商品列表
            </Button>
            <Button onClick={() => navigate('/app')}>
              返回首页
            </Button>
            <Button onClick={() => window.history.back()}>
              返回上一页
            </Button>
          </Space>
        </Space>
      }
    />
  );
};

// 首页
const HomePage = () => (
  <div style={{ padding: 24 }}>
    <Title level={4}>电商后台管理系统</Title>
    <Paragraph>
      本示例演示如何在电商系统中自定义错误页面。通过自定义错误页面，可以为用户提供更友好的提示和引导。
    </Paragraph>
    <Alert
      message="业务场景说明"
      description="在实际业务中，不同的错误状态可能需要不同的处理方式和提示信息。例如订单错误、商品不存在、权限不足等场景，都可以通过自定义页面来提升用户体验。"
      type="info"
      showIcon
    />
  </div>
);

// 订单列表页
const OrdersPage = () => (
  <div style={{ padding: 24 }}>
    <Title level={4}>订单列表</Title>
    <Text>订单数据加载中...</Text>
  </div>
);

// 商品列表页
const ProductsPage = () => (
  <div style={{ padding: 24 }}>
    <Title level={4}>商品管理</Title>
    <Text>商品数据加载中...</Text>
  </div>
);

const CustomPagesExample = () => {
  const menuItems = [
    { key: 'home', label: <Link to="/app">系统首页</Link> },
    { key: 'orders', label: <Link to="/app/orders">订单管理</Link> },
    { key: 'products', label: <Link to="/app/products">商品管理</Link> },
    { 
      key: 'error-500', 
      label: <Link to="/app/error?status=500&msg=订单支付处理失败，银行系统返回超时">模拟订单500错误</Link> 
    },
    { 
      key: 'error-403', 
      label: <Link to="/app/error?status=403&msg=您没有权限查看此订单的详细信息">模拟订单403错误</Link> 
    },
    { 
      key: 'error-404', 
      label: <Link to="/app/error?status=404&msg=订单号 ORD202403150001 不存在">模拟订单404错误</Link> 
    },
    { 
      key: 'notfound', 
      label: <Link to="/app/404">商品不存在页面</Link> 
    },
    { 
      key: 'unknown', 
      label: <Link to="/app/unknown-product">触发系统404</Link> 
    }
  ];

  return (
    <Flex vertical gap={24}>
      <Card>
        <Flex gap={16} wrap="wrap">
          {menuItems.map(item => (
            <Button key={item.key} type="link" style={{ padding: 0 }}>
              {item.label}
            </Button>
          ))}
        </Flex>
      </Card>
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
                    loader: async () => ({ default: HomePage })
                  },
                  {
                    path: 'orders',
                    loader: async () => ({ default: OrdersPage })
                  },
                  {
                    path: 'products',
                    loader: async () => ({ default: ProductsPage })
                  },
                  {
                    path: 'error',
                    element: <OrderErrorPage />
                  },
                  {
                    path: '404',
                    element: <ProductNotFoundPage />
                  }
                ]}
                children={<ProductNotFoundPage />}
              />
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
const { Route, Routes, Link, Outlet, Navigate, useLocation } = _reactRouterDom;
const { Flex, Card, Menu, Typography, Table, Descriptions, Statistic, Row, Col, Button, Space, Tag, Avatar, Form, Input, Switch, Divider } = antd;

const { Title, Text, Paragraph } = Typography;

// 后台管理布局组件
const AdminLayout = () => {
  const location = useLocation();
  const selectedKey = location.pathname.split('/')[2] || 'home';

  const menuItems = [
    {
      key: 'home',
      icon: '📊',
      label: <Link to="/app">首页概览</Link>
    },
    {
      key: 'users',
      icon: '👥',
      label: <Link to="/app/users">用户管理</Link>
    },
    {
      key: 'products',
      icon: '📦',
      label: <Link to="/app/products">商品管理</Link>
    },
    {
      key: 'orders',
      icon: '🛒',
      label: <Link to="/app/orders">订单管理</Link>
    },
    {
      key: 'reports',
      icon: '📈',
      label: <Link to="/app/reports">数据报表</Link>
    },
    {
      key: 'settings',
      icon: '⚙️',
      label: <Link to="/app/settings">系统设置</Link>
    },
    {
      key: 'profile',
      icon: '👤',
      label: <Link to="/app/profile">个人中心</Link>
    }
  ];

  return (
    <Flex style={{ minHeight: '100vh' }}>
      {/* 左侧菜单 */}
      <div style={{ width: 240, background: '#001529', color: '#fff' }}>
        <div style={{ height: 64, padding: 16, borderBottom: '1px solid #002140' }}>
          <Title level={4} style={{ color: '#fff', margin: 0 }}>
            管理后台
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </div>

      {/* 右侧内容 */}
      <div style={{ flex: 1, background: '#f0f2f5', padding: 24 }}>
        <Outlet />
      </div>
    </Flex>
  );
};

// 首页概览
const HomePage = () => {
  const stats = [
    { title: '今日订单', value: 1234, prefix: '📦', suffix: '单' },
    { title: '今日销售额', value: 56890, prefix: '¥', precision: 2 },
    { title: '新增用户', value: 89, prefix: '👥', suffix: '人' },
    { title: '待处理工单', value: 23, prefix: '⏰', suffix: '个' }
  ];

  const recentOrders = [
    { id: 'ORD001', customer: '张三', amount: 299.00, status: 'completed', time: '10:30' },
    { id: 'ORD002', customer: '李四', amount: 599.00, status: 'pending', time: '10:45' },
    { id: 'ORD003', customer: '王五', amount: 1299.00, status: 'processing', time: '11:00' }
  ];

  const statusMap = {
    completed: { text: '已完成', color: 'success' },
    pending: { text: '待处理', color: 'warning' },
    processing: { text: '处理中', color: 'processing' }
  };

  return (
    <div>
      <Title level={4}>首页概览</Title>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {stats.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                precision={stat.precision}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="最近订单">
            <Table
              dataSource={recentOrders}
              rowKey="id"
              pagination={false}
              size="small"
            >
              <Table.Column title="订单号" dataIndex="id" key="id" />
              <Table.Column title="客户" dataIndex="customer" key="customer" />
              <Table.Column 
                title="金额" 
                dataIndex="amount" 
                key="amount"
                render={(val) => &#96;¥${val.toFixed(2)}&#96;}
              />
              <Table.Column 
                title="状态" 
                dataIndex="status" 
                key="status"
                render={(status) => (
                  <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>
                )}
              />
            </Table>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="快捷操作">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" block>创建新订单</Button>
              <Button block>添加商品</Button>
              <Button block>用户管理</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// 用户管理页面
const UsersPage = () => {
  const columns = [
    { title: '用户ID', dataIndex: 'id', key: 'id' },
    { 
      title: '用户信息', 
      key: 'userInfo',
      render: (_, record) => (
        <Space>
          <Avatar>{record.username[0]}</Avatar>
          <span>{record.username}</span>
        </Space>
      )
    },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { 
      title: '角色', 
      dataIndex: 'role', 
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role === 'admin' ? '管理员' : '普通用户'}
        </Tag>
      )
    },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '正常' : '禁用'}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <a>编辑</a>
          <a>查看</a>
          <a>删除</a>
        </Space>
      )
    }
  ];

  const mockData = [
    { id: 'U001', username: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active' },
    { id: 'U002', username: '李四', email: 'lisi@example.com', role: 'user', status: 'active' },
    { id: 'U003', username: '王五', email: 'wangwu@example.com', role: 'user', status: 'inactive' }
  ];

  return (
    <div>
      <Title level={4}>用户管理</Title>
      <Card>
        <Table columns={columns} dataSource={mockData} rowKey="id" />
      </Card>
    </div>
  );
};

// 商品管理页面
const ProductsPage = () => {
  const columns = [
    { title: '商品ID', dataIndex: 'id', key: 'id' },
    { title: '商品名称', dataIndex: 'name', key: 'name' },
    { title: '分类', dataIndex: 'category', key: 'category' },
    { 
      title: '价格', 
      dataIndex: 'price', 
      key: 'price',
      render: (val) => &#96;¥${val.toFixed(2)}&#96;
    },
    { title: '库存', dataIndex: 'stock', key: 'stock' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'on_sale' ? 'success' : 'default'}>
          {status === 'on_sale' ? '在售' : '下架'}
        </Tag>
      )
    }
  ];

  const mockData = [
    { id: 'P001', name: 'iPhone 15 Pro', category: '电子产品', price: 8999, stock: 156, status: 'on_sale' },
    { id: 'P002', name: 'MacBook Pro', category: '电子产品', price: 14999, stock: 89, status: 'on_sale' },
    { id: 'P003', name: 'AirPods Pro', category: '电子产品', price: 1999, stock: 0, status: 'off_shelf' }
  ];

  return (
    <div>
      <Title level={4}>商品管理</Title>
      <Card>
        <Table columns={columns} dataSource={mockData} rowKey="id" />
      </Card>
    </div>
  );
};

// 订单管理页面
const OrdersPage = () => {
  return (
    <div>
      <Title level={4}>订单管理</Title>
      <Card>
        <Paragraph>订单管理页面，用于查看和处理所有订单。</Paragraph>
      </Card>
    </div>
  );
};

// 数据报表页面
const ReportsPage = () => {
  return (
    <div>
      <Title level={4}>数据报表</Title>
      <Card>
        <Paragraph>数据报表页面，用于查看各类统计报表。</Paragraph>
      </Card>
    </div>
  );
};

// 系统设置页面
const SettingsPage = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Title level={4}>系统设置</Title>
      <Card>
        <Form form={form} layout="vertical" style={{ maxWidth: 600 }}>
          <Form.Item label="系统名称" name="systemName" initialValue="后台管理系统">
            <Input />
          </Form.Item>
          <Form.Item label="系统描述" name="systemDesc" initialValue="这是一个功能强大的后台管理系统">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Divider />
          <Form.Item label="开启用户注册" name="enableRegister" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
          <Form.Item label="开启邮箱验证" name="enableEmailVerify" valuePropName="checked" initialValue={false}>
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary">保存设置</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

// 个人中心页面
const ProfilePage = () => {
  return (
    <div>
      <Title level={4}>个人中心</Title>
      <Card>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="用户名">admin</Descriptions.Item>
          <Descriptions.Item label="邮箱">admin@example.com</Descriptions.Item>
          <Descriptions.Item label="角色">管理员</Descriptions.Item>
          <Descriptions.Item label="部门">技术部</Descriptions.Item>
          <Descriptions.Item label="注册时间">2024-01-01</Descriptions.Item>
          <Descriptions.Item label="最后登录">2024-03-20 15:30</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

// 嵌套路由示例
const NestedRoutesExample = () => {
  return (
    <Routes>
      <Route path="app/*" element={<AdminLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="*"
          element={
            <AppChildrenRouter
              notFoundPage
              baseUrl="/app"
              list={[
                {
                  path: 'users',
                  element: <UsersPage />
                },
                {
                  path: 'products',
                  loader: async () => ({ default: ProductsPage })
                },
                {
                  path: 'orders',
                  loader: async () => ({ default: OrdersPage })
                },
                {
                  path: 'reports',
                  loader: async () => ({ default: ReportsPage })
                },
                {
                  path: 'settings',
                  loader: async () => ({ default: SettingsPage })
                },
                {
                  path: 'profile',
                  loader: async () => ({ default: ProfilePage })
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
