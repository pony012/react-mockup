import React from 'react';
import Container from './Container';

function containerHOC(Component, style) {
  return ({ ...props }) => (<Container style={style}><Component {...props} /></Container>);
}

export default containerHOC;
