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

const AppChildrenRouter = ({ element, list = [], errorPage = globalParams.errorPage, notFoundPage = globalParams.notFountPage, loading, children, ...props }) => {
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
  const childrenList = targetList.map(({ loader, element, elementProps, ...routerProps }, index) => {
    return <Route key={routerProps.path || index} {...routerProps} element={element || loadableWithProps(loader, Object.assign({}, props, elementProps), loading)} />;
  });

  childrenList.push(<Route path="*" key={childrenList.length} element={children || <Navigate to={`${props.baseUrl || ''}/404`} />} />);
  return (
    <Routes>
      {element ? (
        <Route path="*" element={element}>
          {childrenList}
        </Route>
      ) : (
        childrenList
      )}
    </Routes>
  );
};

export default AppChildrenRouter;
