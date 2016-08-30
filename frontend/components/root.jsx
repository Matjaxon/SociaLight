import React from 'react';
import { Provider } from 'react-redux';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <div>UP AND RUNNING!</div>
    </Provider>
  );
};

export default Root;
