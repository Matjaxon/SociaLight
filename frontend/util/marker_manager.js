class MarkerManager {
  constructor(map, handleClick) {
    this.map = map;
    this.markers = [];
    this._createMarkerFromEvent = this._createMarkerFromEvent.bind(this);
    this._removeMarker = this._removeMarker.bind(this);
  }

  updateMarkers(events){
    this.events = events;
    this._eventsToAdd().forEach(this._createMarkerFromEvent);
    // this._markersToRemove().forEach(this._removeMarker);
  }

  _eventsToAdd(){
    const currentEventIds = this.markers.map( marker => marker.eventId );
    const newEvents = this.events;
    const newEventIds = Object.keys(newEvents);

    return newEventIds.reduce( (collection, eventId) => {
      if (!currentEventIds.includes(eventId)) {
        return ( collection.concat( [newEvents[eventId]] ));
      }
    }, [] );
  }

  _markersToRemove(){
    return this.markers.filter( marker => {
      return !this.events.hasOwnProperty(marker.eventId);
    });
  }

  _createMarkerFromEvent(eventItem) {
    let that = this;
    let map = this.map;
    let markers = this.markers;
    if(eventItem.venue && Math.abs(eventItem.venue.latitude) && Math.abs(eventItem.venue.longitude)) {
      const pos = new google.maps.LatLng(eventItem.venue.latitude, eventItem.venue.longitude);
      const marker = new google.maps.Marker({
        position: pos,
        map,
        eventId: eventItem.id
      });
      marker.addListener('click', () => console.log((eventItem)));
      markers.push(marker);
    }
  }

  _removeMarker(marker) {
  //   const idx = this.markers.indexOf( marker );
  //   this.markers[idx].setMap(null);
  //   this.markers.splice(idx, 1);
  }
}

export default MarkerManager;
