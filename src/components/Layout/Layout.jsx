import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header></Header>
      {children}
    </React.Fragment>
  );
};
Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
