const { loadableWithProps } = _AppChildrenRouter;
const { Button, Space, Card, Form, Input, Select, DatePicker, InputNumber, Typography, Alert, Spin } = antd;

const { Title, Text, Paragraph } = Typography;

// 动态加载的用户详情卡片组件
const UserDetailCard = ({ userId, username, email, role, department, onRefresh }) => {
  return (
    <Card 
      title={`用户信息 - ${username}`} 
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
        alert(`${activeTab === 'user' ? '用户' : activeTab === 'product' ? '商品' : '订单'}信息已提交`);
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
