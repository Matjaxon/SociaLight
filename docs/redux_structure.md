# Redux Structure

The application's state is organized by data type. Under each data type, there
may be sub-states. Each action is listed with the sequence of events that
results from its invocation, ending with the API or a reducer. Subscribed
components, i.e. containers, are listed at the end.

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. the `SessionReducer` stores `currentUser` in the application's state.
* `removeCurrentUser`
  0. invoked from an API callback
  0. the `SessionReducer` removes `currentUser` from the application's state.

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. the `ErrorReducer` stores the `form` in the application's state; `errors` are mapped to their respective forms
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. the `ErrorReducer` removes `errors` for a given `form` in the application's state.

## Event Cycles

### Events API Request Actions

* `fetchAllEvents`
  0. invoked from `EventsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/events` is called.
  0. `receiveAllEvents` is set as the success callback.

* `createEvent`
  0. invoked from "Create Event" button `onClick`
  0. `POST /api/events` is called.
  0. `receiveSingleEvent` is set as the success callback.

* `fetchSingleEvent`
  0. invoked from `EventDetail` `didMount`/`willReceiveProps`
  0. `GET /api/event/:id` is called.
  0. `receiveSingleEvent` is set as the success callback.

* `updateEvent`
  0. invoked from `EventForm` `onSubmit`
  0. `POST /api/events` is called.
  0. `receiveSingleEvent` is set as the success callback.

* `destroyEvent`
  0. invoked from delete event button `onClick`
  0. `DELETE /api/events/:id` is called.
  0. `removeEvent` is set as the success callback.

### Events API Response Actions

* `receiveAllEvents`
  0. invoked from an API callback
  0. the `EventReducer` updates `events` in the application's state.

* `receiveSingleEvent`
  0. invoked from an API callback
  0. the `EventReducer` updates `events[id]` in the application's state.

* `removeEvent`
  0. invoked from an API callback
  0. the `EventReducer` removes `events[id]` from the application's state.

## Event Cycles

### Events API Request Actions

* `fetchAllEvents`
  0. invoked from `EventsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/events` is called.
  0. `receiveAllEvents` is set as the success callback.

* `createEvent`
  0. invoked from new event button `onClick`
  0. `POST /api/events` is called.
  0. `receiveSingleEvent` is set as the callback.

* `fetchSingleEvent`
  0. invoked from `EventDetail` `didMount`/`willReceiveProps`
  0. `GET /api/events/:id` is called.
  0. `receiveSingleEvent` is set as the success callback.

* `updateEvent`
  0. invoked from `EventForm` `onSubmit`
  0. `POST /api/events` is called.
  0. `receiveSingleEvent` is set as the success callback.

* `destroyEvent`
  0. invoked from delete event button `onClick`
  0. `DELETE /api/events/:id` is called.
  0. `removeEvent` is set as the success callback.

### Events API Response Actions

* `receiveAllEvents`
  0. invoked from an API callback.
  0. The `Event` reducer updates `events` in the application's state.

* `receiveSingleEvent`
  0. invoked from an API callback.
  0. The `Event` reducer updates `events[id]` in the application's state.

* `removeEvent`
  0. invoked from an API callback.
  0. The `Event` reducer removes `events[id]` from the application's state.

## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `EventSearchBar` `onChange` when there is text
  0. `GET /api/events` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the success callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. The `SearchSuggestion` reducer updates `suggestions` in the application's state.

* `removeSearchSuggestions`
  0. invoked from `EventSearchBar` `onChange` when empty
  0. The `SearchSuggestion` reducer resets `suggestions` in the application's state.
