import React from 'react';
import { searchLocation } from '../../util/form_api_util';

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      formattedAddress: "",
      lat: "",
      lng: ""
    };
    this._requestLocation = this._requestLocation.bind(this);
    this._handleLocationChange = this._handleLocationChange.bind(this);
  }

  _handleLocationChange(key) {
    event.stopPropagation();
    event.preventDefault();
    return (event) => this.setState({[key]: event.target.value});
  }

  _requestLocation(event) {
    event.stopPropagation();
    event.preventDefault();
    let successCallback = (data) => {
      if (data.status === "ZERO_RESULTS") {
        this.setState({formattedAddress: "LOCATION NOT FOUND"});
      } else {
        this.setState({
          formattedAddress: data.results[0].formatted_address,
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng
        }, () => this.props.setLocation({
          venue_displayLocation: this.state.formattedAddress,
          venue_latitude: this.state.lat,
          venue_longitude: this.state.lng}));
        }
      };
    let errorCallback = () => this.setState({formattedAddress: "Something went wrong. Try again"});
    searchLocation(this.state.searchString, successCallback, errorCallback);
  }

  render() {
    return (
      <div>
        <div>
          {this.props.displayLocation}
        </div>
        <label className="event-form-input">
          <h3>Location Search <span className="label-note"> -enter address</span></h3>
          <input
            type="text"
            className="event-form-input middle-length"
            onChange={this._handleLocationChange("searchString")}
            onBlur={() => this._requestLocation(event)}
          />
        </label>

        <div>
          <div className="location-results">{this.state.formattedAddress}</div>
        </div>
      </div>
    );
  }
}

export default LocationForm;
