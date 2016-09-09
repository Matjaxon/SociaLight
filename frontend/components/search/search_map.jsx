import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import MarkerManager from '../../util/marker_manager';

let _mapOptions = {
  center: {lat: 37.773972, lng: -122.431297}, //San Francisco
  zoom: 10
};

class SearchMap extends React.Component {
  constructor(props) {
    super(props);
    this._registerListeners = this._registerListeners.bind(this);
    this._handleMarkerClick = this._handleMarkerClick.bind(this);
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, _mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this._handleMarkerClick.bind(this));
    this._registerListeners();
    this.MarkerManager.updateMarkers(this.props.eventsList);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidUpdate(){
    this.MarkerManager.updateMarkers(this.props.eventsList);
  }

  _registerListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat:north, lng: east },
        southWest: { lat: south, lng: west } };
      console.log(bounds);
    //   this.props.updateFilter('bounds', bounds);
    });
  }
    // google.maps.event.addListener(this.map, 'click', event => {
    //   const coords = _getCoordsObj(event.latLng);
    //   console.log(coords);
    //   this._handleClick(coords);

  _handleMarkerClick(eventItem){
  //   this.props.router.push("event/" + eventItem.id );
  }

  // _handleClick(coords) {
  //   con
  // }

  render() {
    return (
      <div>
        <div className="map" ref="map" id="map">Map</div>
      </div>
    );
  }
}

export default withRouter(SearchMap);
