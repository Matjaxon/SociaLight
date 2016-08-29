# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`
- `GET /api/session`

### Events

- `GET /api/events`
  - Events index/search
  - accepts `category` query param to list events by category
  - accepts pagination params (if I get there)
- `POST /api/events`
- `GET /api/events/:id`
- `PATCH /api/events/:id`
- `DELETE /api/events/:id`

### Tickets

- `POST /api/events/:events_id/tickets`
- `GET /api/events/:events_id/tickets`
- `DELETE /api/events/:event_id/tickets/:id`

### Bookmarks

- `GET /api/users/:user_id/bookmarks`
- `POST /api/users/:user_id/bookmarks`
- `GET /api/users/:user_id/bookmarks/:id`
- `DELETE /api/users/:user_id/bookmarks/:id`
