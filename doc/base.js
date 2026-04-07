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
          <Link to={`/app/user/${record.id}`}>查看</Link>
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
