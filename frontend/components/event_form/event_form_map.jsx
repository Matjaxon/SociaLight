import React from 'react';
import ReactDOM from 'react-dom';

let _defaultMapOptions = {
  center: {lat: 37.773972, lng: -122.431297}, //San Francisco
  zoom: 13
};

class EventFormMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const map = this.refs.map;
    let _mapOptions;
    if (nextProps.latitude && nextProps.longitude) {
      _mapOptions = {
        center: {
          lat: nextProps.latitude,
          lng: nextProps.longitude,
        },
        zoom: 13
      };
    } else {
      _mapOptions = _defaultMapOptions;
    }
    this.map = new google.maps.Map(map, _mapOptions);
    const pos = new google.maps.LatLng(nextProps.latitude, nextProps.longitude);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map
    });
  }

  render() {
    return (
      <div className="form-map-container">
        <div className="map" ref="map" id="form-map">Map</div>
      </div>
    );
  }
}

export default EventFormMap;
