# SociaLight


## Minimum Viable Product

SociaLight is a web application inspired by Eventbrite built using Ruby on Rails and React/Redux.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data and sufficient CSS styling:

- [ ] Events
- [ ] Registration / Tickets
- [ ] Categories
- [ ] Bookmark Events
- [ ] Bonus:  Google Maps Integration
- [ ] Bonus:  Search

## Design Docs

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

### Venues:

#### Create
- Generated through user purchase from event page

#### Show
- Display on user show page


### BONUS FEATURES:

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

** Objective:  Functioning rails application with front-end authentication **

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
