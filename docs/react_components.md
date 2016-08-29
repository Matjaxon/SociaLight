## Component Hierarchy

**AuthFormContainer**
 - AuthForm

**HomeContainer**
 - Home
 - Sidebar

**EventsContainer**
 - EventsHeader
  * EventIndex

**EventContainer**
 - EventHeader
  + EventIndex

**SearchResultsContainer**
 - Search
 - EventIndex

**CategoryContainer**
 - EventHeader
  + EventIndex

**EventIndex**
 - EventIndexItem
  + EventDetail
   * EventTools
    - EventSearch
    - Categories
     + Category
    * Event

**NewEventContainer**
 - NewEvent
  - RTETools
  - NewEventButton

**Search**

**NewEvent**
 - NewEvent

**NewCategory**
 - NewCategory

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
| "/home" | "HomeContainer" |
| "/home/event/:eventId" | "EventsContainer" |
| "/home/event/:eventId/event/:eventId" | "EventContainer" |
| "/home/category/:categoryId/event/:eventId" | "CategoryContainer" |
| "/home/search-results" | "SearchResultsContainer"
| "/new-event" | "NewEventContainer" |
| "/search" | "Search" |
| "/new-event" | "NewEvent" |
| "/new-category" | "NewCategory" |
| "/category-search" | "CategorySearch" |
| "/event-search" | "EventSearch" |
