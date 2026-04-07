const { default: AppChildrenRouter, loadableWithProps } = _AppChildrenRouter;
const { Route, Routes, Link, useNavigate, Navigate } = _reactRouterDom;
const { Flex, Card, Button } = antd;

// 模拟页面组件
const HomePage = () => <div style={{ padding: 20 }}>这是首页内容</div>;
const Page1 = () => <div style={{ padding: 20 }}>这是页面1的内容</div>;
const Page2 = () => <div style={{ padding: 20 }}>这是页面2的内容</div>;

// 带导航的布局组件
const LayoutWithNav = () => {
  const navigate = useNavigate();
  return (
    <Flex vertical gap={24}>
      <Flex gap={10} wrap="wrap">
        <Link to="/app">首页</Link>
        <Link to="/app/page1">页面1</Link>
        <Link to="/app/page2">页面2</Link>
        <Link to="/app/error?status=500&msg=服务器错误示例">错误页面</Link>
        <Link to="/app/error?status=403&msg=无权限访问">403错误</Link>
        <Link to="/app/unknown-path">不存在的页面(404)</Link>
      </Flex>
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
                    path: 'page1',
                    loader: async () => ({ default: Page1 })
                  },
                  {
                    path: 'page2',
                    loader: async () => ({ default: Page2 })
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
