import React from 'react';
import PropTypes from 'prop-types';

const Container = ({
  style, children
}) => (
  <div
    className="container"
    style={{
      ...style
    }}
  >
    {children}
  </div>);

Container.defaultProps = {
  style: {},
  children: <div />
};

Container.propTypes = {
  style: PropTypes.shape(),
  children: PropTypes.node
};

export default Container;
