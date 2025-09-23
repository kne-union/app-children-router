import merge from 'lodash/merge';
import { Spin } from 'antd';
import React from 'react';

export const globalParams = {
  errorPage: false,
  notFountPage: false,
  loading: <Spin style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
};

export default props => {
  merge(globalParams, props);
};
