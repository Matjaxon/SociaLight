# SociaLight

![](http://res.cloudinary.com/dbwkodu79/image/upload/v1473357986/site_assets/SociaLights3-transaprent.png)

Live Site:  http://www.SociaLight.events

SocialLight is a full-stack web application for easy planning and launching
events for organizers and browsing and purchasing for attendees.
The backend was built with Ruby on Rails and a PostgreSQL database.
The frontend was developed using ReactJS following the Redux design pattern to minimize subsequent re-rendering.

## Features & Implementation

Plan Events<br />
Browse Events<br />
Bookmark Events For Later<br />
Purchase Tickets<br />

## Single-Page Application

All content is delivered on one static page view which the Rails application serves up at the root url. This view contains a `<div>` element with an `id` of `root` and runs a script to bootstrap the current user to the window.  

```
<script type="text/javascript">
  <% if current_user %>
    window.currentUser = <%= render("api/users/user.json.jbuilder",
      user: current_user).html_safe %>
  <% end %>
</script>

<div id="root"></div>
```
The highest level react component will then the passed to this `div` through `ReactDOM.render`.  The Redux Store and the React Router are then mounted before mounting any visual components to make these available to these child components.  React components then mount and dismount depending on the routes that are pushed onto the hash history.


```
<Route path='/' component={ App } >

  <IndexRoute component={ SplashContainer }
    onEnter={this._requestEvents} />

  <Route path="signup" component={ SessionFormContainer }
    onEnter={this._redirectIfLoggedIn} />

  <Route path="login" component={ SessionFormContainer }
    onEnter={this._redirectIfLoggedIn} />

  <Route path="browse" component={ SearchContainer }
    onEnter={this._requestEvents} />

  <Route path="new-event" component={ EventFormContainer }
    onEnter={this._loadNewForm} />

  <Route path="event/:eventId" component={ EventShowContainer }>
    <Route path="order" component={ TicketForm } />
  </Route>

  <Route path="edit-event/:eventId" component={ EventFormContainer }
    onEnter={this._requestEvent} />

  <Route path="profile" component={ UserPageContainer }
    onEnter={this._requestProfile} />
</Route>
```

## Plan Events

Quickly organize an event with a streamlined form, including
easily populating the event's location by using the Google Maps
Geocoding API.  Enter a portion of the address string and then click out of the input and whatever string has been entered so far will be sent passed to the Google API to look up the complete address, including latitude and longitude.

![form-geo](http://res.cloudinary.com/dbwkodu79/image/upload/v1473453398/site_assets/form_geocoding_screen_shot.png)

```
// Called onBlur for input field in render
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

  // Google Geolocation function.  Makes async call to Google API
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
```

Start planning out details and save your event to finish later or launch it right away.

![](http://res.cloudinary.com/dbwkodu79/image/upload/v1473453846/site_assets/Screen_Shot_2016-09-09_at_1.43.00_PM.png)

Preview your event before taking launching it.

![event-preview](http://res.cloudinary.com/dbwkodu79/image/upload/v1473453841/site_assets/Screen_Shot_2016-09-09_at_1.43.13_PM.png)

## Browse Events

Filter events by multiple categories to tailor results to your interests.

![](http://res.cloudinary.com/dbwkodu79/image/upload/v1473454110/site_assets/Screen_Shot_2016-09-09_at_1.47.40_PM.png)

## Bookmark Events For Later

Save events that you're interested in and review them on the user profile page

![](http://res.cloudinary.com/dbwkodu79/image/upload/v1473454400/site_assets/Screen_Shot_2016-09-09_at_1.52.05_PM.png)


## Future Implementations

+ Browsing by featured cities
+ Limit search area with Google Maps
+ Group planning for guests
+ Ticket sharing via SMS
