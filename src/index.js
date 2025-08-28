import React from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { Spin } from 'antd';

export const loadableWithProps = (loader, props = {}) => {
  const PageComponent = loadable(loader, {
    fallback: <Spin style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
  });

  return <PageComponent {...props} />;
};

const AppChildrenRouter = ({ list, children, ...props }) => {
  return (
    <Routes>
      {list.map(({ loader, elementProps, ...routerProps }, index) => {
        return <Route key={index} {...routerProps} element={loadableWithProps(loader, Object.assign({}, props, elementProps))} />;
      })}
      <Route path="*" element={children} />
    </Routes>
  );
};

export default AppChildrenRouter;
