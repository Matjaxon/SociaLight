## Component Hierarchy

**AuthFormContainer**
 - AuthForm

**EventsContainer**
 - EventsHeader
  * EventIndex
    - EventIndexItems

**EventContainer**
 - EventHeader
  + EventDetail

**SearchResultsContainer**
 - Search
 - EventIndex

**CategoryContainer**
 - EventHeader
  + EventIndex

**EventIndex**
 - EventIndexItem
  + EventDetail
    - EventSearch
    - Categories
     + Category
    * Event

**ProfileContainer**
 - EventsContainer
  * EventIndex
  * EventIndexItem
    * TicketsIndex
    * TicketIndexItem
 - BookmarksContainer
  * BookmarksIndex

**NewEventContainer**
 - NewEventForm
  - NewEventButton

**Search**

**EventSearch**
 + AutoSearch
 * AutoSearchResults

**CategoriesSearch**
 + AutoSearch
 * AutoSearchResults

## Routes

|Path   | Component   |
|-------|-------------|
| "/sign-up" | "AuthFormContainer" |
| "/sign-in" | "AuthFormContainer" |
| "/events" | "EventsContainer" |
| "/events/:eventId" | "EventsDetail" |
| "/new-event" | "NewEventContainer" |
| '/profile' | "ProfileContainer"
| "/search" | "Search" |
| "/search-results" | "SearchResultsContainer"
| "/event-search" | "EventSearch" |
| "/category-search" | "CategorySearch" |
