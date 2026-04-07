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
                render={(val) => `¥${val.toFixed(2)}`}
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
      render: (val) => `¥${val.toFixed(2)}`
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
