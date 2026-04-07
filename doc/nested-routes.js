const { default: AppChildrenRouter } = _AppChildrenRouter;
const { Route, Routes, Link, Outlet, Navigate } = _reactRouterDom;
const { Flex, Card, Menu } = antd;

// 嵌套路由示例
const Layout = () => {
  return (
    <Flex gap={16}>
      <div style={{ width: 200 }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['home']}
          items={[
            { key: 'home', label: <Link to="/app">首页</Link> },
            { key: 'dashboard', label: <Link to="/app/dashboard">仪表盘</Link> },
            { key: 'settings', label: <Link to="/app/settings">设置</Link> },
            { key: 'profile', label: <Link to="/app/profile">个人中心</Link> }
          ]}
        />
      </div>
      <Card style={{ flex: 1 }}>
        <Outlet />
      </Card>
    </Flex>
  );
};

const NestedRoutesExample = () => {
  return (
    <Routes>
      <Route path="app/*" element={<Layout />}>
        <Route index element={<div style={{ padding: 20 }}>欢迎来到首页</div>} />
        <Route
          path="*"
          element={
            <AppChildrenRouter
              notFoundPage
              baseUrl="/app"
              list={[
                {
                  path: 'dashboard',
                  element: <div style={{ padding: 20 }}>仪表盘页面</div>
                },
                {
                  path: 'settings',
                  loader: async () => ({
                    default: () => <div style={{ padding: 20 }}>设置页面</div>
                  })
                },
                {
                  path: 'profile',
                  loader: async () => ({
                    default: () => <div style={{ padding: 20 }}>个人中心页面</div>
                  })
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
