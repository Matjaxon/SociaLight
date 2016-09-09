import React from 'react';
import ReactDOM from 'react-dom';

class EventShowMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.venue && this.props.venue.latitude && this.props.venue.longitude) {
      const map = this.refs.map;
      let _mapOptions = {
        center: {
          lat: this.props.venue.latitude,
          lng: this.props.venue.longitude,
        },
        zoom: 15
      };
      this.map = new google.maps.Map(map, _mapOptions);
      const pos = new google.maps.LatLng(this.props.venue.latitude,
        this.props.venue.longitude);
      const marker = new google.maps.Marker({
        position: pos,
        map: this.map
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.venue && nextProps.venue.latitude && nextProps.venue.longitude) {
      const map = this.refs.map;
      let _mapOptions = {
        center: {
          lat: nextProps.venue.latitude,
          lng: nextProps.venue.longitude,
        },
        zoom: 13
      };
      this.map = new google.maps.Map(map, _mapOptions);
      const pos = new google.maps.LatLng(nextProps.venue.latitude,
        nextProps.venue.longitude);
      const marker = new google.maps.Marker({
        position: pos,
        map: this.map
      });
    }
  }

  render() {
    return (
      <div className="show-map-container">
        <div className="show-map" ref="map" id="show-map">Map</div>
      </div>
    );
  }
}

export default EventShowMap;
