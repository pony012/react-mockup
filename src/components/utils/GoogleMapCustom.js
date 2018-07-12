import React from 'react';
import { compose } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const GoogleMapCustom = compose(
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    {...props}
  >
    {props.children}
  </GoogleMap>
));

export default GoogleMapCustom;
