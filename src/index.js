import React, { isValidElement, useMemo, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import Error from './Error';
import NotFound from './NotFound';
import preset, { globalParams } from './preset';

const LoadableWithProps = ({ loader, loading, ...props }) => {
  const ref = useRef({ loader, loading });
  const PageComponent = useMemo(() => {
    return loadable(ref.current.loader, {
      fallback: ref.current.loading || globalParams.loading
    });
  }, []);

  return <PageComponent {...props} />;
};

/** @deprecated Prefer <LoadableWithProps />; kept for existing call sites. */
export const loadableWithProps = (loader, props = {}, loading) => {
  return <LoadableWithProps loader={loader} loading={loading} {...props} />;
};

export { preset, Error, NotFound, LoadableWithProps };

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
    return (
      <Route
        key={routerProps.path || index}
        {...routerProps}
        element={element || <LoadableWithProps key={routerProps.path || index} loader={loader} loading={loading} {...props} {...elementProps} />}
      />
    );
  });

  if (children || notFoundPage) {
    childrenList.push(<Route path="*" key={childrenList.length} element={children || <Navigate to={`${props.baseUrl || ''}/404`} />} />);
  }
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
