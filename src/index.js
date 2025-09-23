import React, { isValidElement, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import Error from './Error';
import NotFound from './NotFound';
import preset, { globalParams } from './preset';

export const loadableWithProps = (loader, props = {}, loading) => {
  const PageComponent = loadable(loader, {
    fallback: loading || globalParams.loading
  });

  return <PageComponent {...props} />;
};

export { preset, Error, NotFound };

const AppChildrenRouter = ({ list, errorPage = globalParams.errorPage, notFoundPage = globalParams.notFountPage, loading, children, ...props }) => {
  const targetList = useMemo(() => {
    const output = list.slice(0);
    const defaultPageList = [Error, NotFound];
    const defaultPathList = ['error', '404'];
    [errorPage, notFoundPage].forEach((currenPage, index) => {
      if (currenPage) {
        output.push({
          path: defaultPathList[index],
          loader: async () => ({ default: isValidElement(currenPage) ? currenPage : defaultPageList[index] })
        });
      }
    });
    return output;
  }, [list, errorPage, notFoundPage]);
  return (
    <Routes>
      {targetList.map(({ loader, elementProps, ...routerProps }, index) => {
        return <Route key={routerProps.path || index} {...routerProps} element={loadableWithProps(loader, Object.assign({}, props, elementProps), loading)} />;
      })}
      <Route path="*" element={children || <Navigate to={`${props.baseUrl || ''}/404`} />} />
    </Routes>
  );
};

export default AppChildrenRouter;
