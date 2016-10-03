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

Events do not need to be made and launched at once.  Changes can be saved and the event will be considered in "draft" mode until launched.

![](http://res.cloudinary.com/dbwkodu79/image/upload/v1473453846/site_assets/Screen_Shot_2016-09-09_at_1.43.00_PM.png)

![event-preview](http://res.cloudinary.com/dbwkodu79/image/upload/v1473453841/site_assets/Screen_Shot_2016-09-09_at_1.43.13_PM.png)

Event results for other users will only show events that are "live".  As a logged in user, all live events and all events created by the user will be shown.  

The code below shows how the results for the index views are determined.  By chaining Active Record methods and using includes to join tables before the query is executed I have avoided the N+1 query problem.

```
# Events Controller
def index
  if current_user
    @events = Event.where("live = true OR organizer_id = ?", current_user.id)
      .order(:start_time)
      .where("start_time >= ?", Time.now)
      .includes(:venue)
      .includes(:category)
      .includes(:organizer)
    @events = Event.filter_events(@events, params[:filters])
  else
    @events = Event.all
      .where(live: true)
      .where("start_time >= ?", Time.now)
      .order(:start_time)
      .includes(:venue)
      .includes(:category)
      .includes(:organizer)
    @events = Event.filter_events(@events, params[:filters])
  end
  @user = current_user
  render 'api/events/index'
end
```

## Browse Events

![](http://res.cloudinary.com/dbwkodu79/image/upload/v1473454110/site_assets/Screen_Shot_2016-09-09_at_1.47.40_PM.png)

Events can be filtered by multiple categories.  When no category is selected, all are shown.  Users may then select 1 or as many categories as they like. Each category name
is a React component.  When clicked, an action is dispatched to add that category name to the search parameters.

```
class CategoryFilterItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.props.fetchFilteredEvents(nextProps.allFilters);
  }

  render() {
    const category = this.props.category;
    return(
      <div className={`category-filter-item` +
          ((this.props.isFiltered) ? " active-filter" : "")}
          onClick={() => this.props.toggleCategoryFilter(category.name)} >
          {category.name}
      </div>
    );
  }
}
```

## Bookmark Events For Later

Save events that you're interested in and review them on the user profile page

![](http://res.cloudinary.com/dbwkodu79/image/upload/v1473454400/site_assets/Screen_Shot_2016-09-09_at_1.52.05_PM.png)


## Future Implementations

+ Browsing by featured cities
+ Limit search area with Google Maps
+ Group planning for guests
+ Ticket sharing via SMS
