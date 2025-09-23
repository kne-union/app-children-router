const { default: AppChildrenRouter } = _AppChildrenRouter;
const { Route, Routes, Link } = _reactRouterDom;
const { Flex, Card } = antd;

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <Flex gap={10}>
        <Link to="/AppChildrenRouter">Home</Link>
        <Link to="/AppChildrenRouter/page1">Page1</Link>
        <Link to="/AppChildrenRouter/page2">Page2</Link>
        <Link to="/AppChildrenRouter/error?msg=错误原因XXXX">Error</Link>
        <Link to="/AppChildrenRouter/404">404</Link>
        <Link to="/AppChildrenRouter/children">ChildrenRouter</Link>
      </Flex>
      <Card>
        <Routes>
          <Route
            path="AppChildrenRouter/*"
            element={
              <AppChildrenRouter
                errorPage
                notFoundPage
                baseUrl="/AppChildrenRouter"
                list={[
                  {
                    index: true,
                    loader: async () => ({ default: () => '首页' })
                  },
                  {
                    path: 'page1',
                    loader: async () => ({ default: () => '页面1' })
                  },
                  {
                    path: 'page2',
                    loader: async () => ({ default: () => '页面2' })
                  }
                ]}>
                AppChildrenRouter
              </AppChildrenRouter>
            }
          />
        </Routes>
      </Card>
    </Flex>
  );
};

render(<BaseExample />);
