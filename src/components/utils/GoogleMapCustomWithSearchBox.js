import React from 'react';
import { compose, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import get from 'lodash/get';

const { SearchBox } = require('react-google-maps/lib/components/places/SearchBox');

const GoogleMapCustomWithSearchBox = compose(
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.unmounted = false;
      this.setState({
        bounds: null,
        center: this.props.defaultCenter,
        markers: [{
          position: this.props.defaultCenter
        }],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          // this.setState({
          //   bounds: refs.map.getBounds(),
          //   center: refs.map.getCenter()
          // });
        },
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onInputSearchBoxMounted: (ref) => {
          if (!this.unmounted) {
            this.inputSearch = ref;
            window.google.maps.event.addDomListener(ref, 'keydown', (e) => {
              if (e.keyCode === 13) {
                // Select all Google's dropdown DOM nodes (can be multiple)
                const googleDOMNodes = document.getElementsByClassName('pac-container');

                // Check if any of them are visible (using ES6 here for conciseness)
                const googleDOMNodeIsVisible = (
                  Array.from(googleDOMNodes).some(node => node.offsetParent !== null)
                );
                // If one is visible - preventDefault
                if (googleDOMNodeIsVisible) e.preventDefault();
              }
            });
            refs.inputSearchBox = ref;
          }
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach((place) => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
          this.props.onMarkerChanged({
            lat: nextCenter.lat(),
            lng: nextCenter.lng()
          });
          // refs.map.fitBounds(bounds);
        }
      });
    },

    componentWillUnmount() {
      this.unmounted = true;
      window.google.maps.event.clearListeners(this.inputSearch, 'keydown');
    }
  })
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    {...props}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Ingresa la dirección del desarrollo"
        ref={props.onInputSearchBoxMounted}
        style={{
          boxSizing: 'border-box',
          border: '1px solid transparent',
          width: '240px',
          height: '32px',
          marginTop: '10px',
          padding: '0 12px',
          left: 0,
          right: 0,
          margin: 'auto',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          outline: 'none',
          textOverflow: 'ellipses'
        }}
      />
    </SearchBox>
    {props.markers.map(marker =>
      (<Marker
        key={JSON.stringify(marker.position)}
        position={marker.position}
        onDragEnd={(position) => {
          props.onMarkerChanged({
            lat: position.latLng.lat(),
            lng: position.latLng.lng()
          });
        }}
        draggable
      />))}
  </GoogleMap>
));

export default GoogleMapCustomWithSearchBox;
