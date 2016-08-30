# SociaLight


## Minimum Viable Product

SociaLight is a web application inspired by Eventbrite built using Ruby on Rails and React/Redux.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data and sufficient CSS styling:

- [ ] New Account Creation & Authentication
- [ ] Production grade README
- [ ] Hosting on Heroku
- [ ] Events
- [ ] Registration / Tickets
- [ ] Categories
- [ ] Bookmark Events
- [ ] Bonus:  Google Maps Integration
- [ ] Bonus:  Search


## Design Docs

* [Wireframes][wireframes]
* [DB Schema][schema]
* [Redux Structure][redux_structure]
* [API Endpoints][api]
* [React Components][react_components]
* [Sample-State][sample_state]

[schema]: schema.md
[wireframes]: wireframes
[redux_structure]: redux_structure.md
[api]: api_endpoints.md
[react_components]: react_components.md
[sample_state]: sample_state.md


## CRUD Overview

### Users:

#### Create
- Sign up form

#### Show
- Show user profile
- Registered Events
- Hosted Events
- Saved Events
- Groups

### Events:

#### Create, Update, Delete
- Event creation/edit form

#### Show
- Index view for browsing
  - Category and date filtering
  - Show title, location, and price
- Detailed event page
  - Event details
  - Bookmark event
  - Buy tickets

### Tickets:

#### Create
- Generated through user purchase from event page

#### Show
- Display on user show page

### Bookmarks:

#### Create
- Generated through user purchase from event page

#### Show
- Display on user show page

### Categories:

#### Create, Update, Destroy
- Created ahead of time
- Added to events through drop down on event form

### Show
- Filter events by category on index page
- Indicated on event detail pages

### BONUS FEATURES:

### Venues:

#### Create
- Generated through form for organizers

#### Show
- Show details about venue
- Show upcoming events at venue

### Group Event:

#### Create
- Initiated by user rather than purchasing tickets immediately
- Invite other users
- Add invite message
- Set minimum number of members needed to go
- Set date of expiration

#### Update
- Invite additional users
- Edit update message

#### Show
- Accessed from user page
- Show invited users
- Show confirmed users
- Show remaining number of needed acceptances

### Map Integration:
- Add to event show page
- Add to event index view

### Search:
- Search by event names
- Search by venue

### Calendar Integration:
- Add events to google calendar

## Implementation Timeline

### Phase 1:  Backend Setup and Front End User Authentication (2 days)

** Objective:**  Functioning rails application with front-end authentication

- [ ] New Rails project
- [ ] `User` model/migration
- [ ] Back end authentication (session/password)
- [ ] `StaticPages` controller and root view
- [ ] Webpack & react/redux modules
- [ ] `APIUtil` to interact with the API
- [ ] Redux cycle for frontend authentication
- [ ] User signup/signin components
- [ ] Blank landing component after signup/signin
- [ ] Style signup/signin components
- [ ] Seed users
- [ ] Review phase 1

### Phase 2: Events Model, API, and components (2 days)

**Objective:** Events can be created, read, edited and destroyed through the API.

- [ ] `Event` model
- [ ] Seed database with a small amount of test data
- [ ] CRUD API for events (`EventsController`)
- [ ] JBuilder views for events
- Event components and respective Redux loops
  - [ ] `EventsIndex`
  - [ ] `EventIndexItem`
  - [ ] `EventForm`
- [ ] Style events components
- [ ] Seed events

### Phase 3: Tickets (2 days)

**Objective:** Tickets belong to Event that can be created, read, and destroyed through the API.

- [ ] `Ticket` model
- [ ] Seed database with a small amount of test data
- [ ] CRUD API for tickets (`TicketsController`)
- [ ] JBuilder views for tickets
- [ ] Adding tickets requires an event and a user
- [ ] View events and tickets on user show page
- [ ] Viewing tickets by event for event organizers
- [ ] Style ticket components
- [ ] Seed events with tickets

### Phase 4: Bookmarks (1 day)

**Objective:** Bookmarks can be added for events to allow the user to return to buy tickets later.

- [ ] `Bookmark` model
- [ ] Adding bookmarks to events
- [ ] View bookmarked events on user page
- [ ] View bookmarked events on event index sidebar
- [ ] Style bookmark components
- [ ] Seed tags with seed data

### Phase 5: Category filtering (1 day)

**Objective:** Filter results by category.
- [ ] `Category` model
- [ ] Filter index views by category.
- [ ] Show related events on event detailed show pages.

### Bonus Features (TBD)

### Venue

- [ ] `Venue` model
- [ ] Venue form
- [ ] Venue show page showing upcoming events

### Group Events

**Objective:** Allow users to invite other users to do events together.  Only complete transaction once minimum number of guests has accepted.

- [ ] Set up group invite form
- [ ] Show group invites on user show page
- [ ] Only allow a user to be invited to an event by one group
- [ ] Automatically register users who have accepted for event once minimum number of acceptances is reached

### Other Bonus Features
- [ ] Event reminders (SMS)
- [ ] Group invite acceptance (SMS)
- [ ] Tickets sent to user (SMS)
- [ ] Multiple sessions
