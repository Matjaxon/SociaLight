```json
{
  currentUser: {
    id: 1,
    username: "app-academy"
  },
  forms: {
    signUp: {errors: []},
    logIn: {errors: []},
    createEvent: {errors: ["body can't be blank"]}
  },
  events: {
    1: {
      title: "Cool Concert",
      description: "see an awesome band",
      organizer_id: 1,
      category_id: 1,
      start: "2016-09-23T18:25:43.511Z",
      end: "2016-09-24T18:25:43.511Z",
      available_tickets: 100,
      ticket_price: 50,
      venue_name: "Some Place",
      address: "1111 Example Street",
      city: "San Francisco",
      state: "CA",
      zip_code: 94103
    }
  },
  tickets: {
    1: {
      event_id: 1,
      guest_id: 1
    }
  },
  categories {
    1: {
      name: "Concert"
    }
  },
  bookmarks: {
    1: {
      event_id: 2,
      guest_id: 1
    }
  }
}
```
