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
      title={`${config.title} (${status})`}
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
