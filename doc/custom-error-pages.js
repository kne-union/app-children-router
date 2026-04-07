const { default: AppChildrenRouter, Error, NotFound } = _AppChildrenRouter;
const { Navigate, Route, Routes, Link, useLocation } = _reactRouterDom;
const { Flex, Card, Result, Button } = antd;

// 自定义错误页面组件
const CustomErrorPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status') || '500';
  const msg = searchParams.get('msg') || '发生了错误';

  return (
    <Result
      status={status}
      title={`自定义错误 ${status}`}
      subTitle={msg}
      extra={
        <Button type="primary" onClick={() => window.history.back()}>
          返回上一页
        </Button>
      }
    />
  );
};

// 自定义 404 页面组件
const CustomNotFoundPage = () => (
  <Result
    status="404"
    title="自定义 404"
    subTitle="抱歉，您访问的页面不存在"
    extra={
      <Button type="primary" onClick={() => window.history.back()}>
        返回上一页
      </Button>
    }
  />
);

const CustomPagesExample = () => {
  return (
    <Flex vertical gap={24}>
      <Flex gap={10}>
        <Link to="/app">首页</Link>
        <Link to="/app/error?status=500&msg=自定义服务器错误">触发自定义 500</Link>
        <Link to="/app/error?status=403&msg=自定义权限错误">触发自定义 403</Link>
        <Link to="/app/404">触发自定义 404</Link>
      </Flex>
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
                    loader: async () => ({ default: () => '首页内容' })
                  },
                  // 自定义错误路由
                  {
                    path: 'error',
                    element: <CustomErrorPage />
                  },
                  // 自定义 404 路由
                  {
                    path: '404',
                    element: <CustomNotFoundPage />
                  }
                ]}>
                {/* 未匹配路由跳转到自定义 404 */}
                <Route path="*" element={<CustomNotFoundPage />} />
              </AppChildrenRouter>
            }
          />
          <Route path="*" element={<Navigate to="/app" />} />
        </Routes>
      </Card>
    </Flex>
  );
};

render(<CustomPagesExample />);
