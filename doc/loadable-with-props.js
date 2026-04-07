const { loadableWithProps } = _AppChildrenRouter;
const { Button, Space } = antd;

// 演示 loadableWithProps 的使用
const LoadableExample = () => {
  const [count, setCount] = React.useState(0);

  // 动态加载组件并传递 props
  const DynamicComponent = loadableWithProps(
    async () => {
      // 模拟异步加载
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        default: ({ count, message }) => (
          <div style={{ padding: 20, background: '#f5f5f5', borderRadius: 4 }}>
            <p>计数器: {count}</p>
            <p>消息: {message}</p>
          </div>
        )
      };
    },
    { count, message: 'Hello from props' },
    <div style={{ padding: 20 }}>加载中...</div>
  );

  return (
    <Space direction="vertical" size={16}>
      <Space>
        <Button onClick={() => setCount(c => c + 1)}>增加计数: {count}</Button>
        <Button onClick={() => setCount(0)}>重置</Button>
      </Space>
      {DynamicComponent}
    </Space>
  );
};

render(<LoadableExample />);
