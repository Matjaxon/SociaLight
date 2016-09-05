
#  ============= FAKER USERNAME GENERATION ================

# 50.times do
#   username = Faker::Internet.user_name
#   password = Faker::Internet.password(8)
#   email = Faker::Internet.safe_email
#   phone_number = Faker::PhoneNumber.phone_number
#   User.create!(username: username, password: password, email: email, phone_number: phone_number)
# end
#

#  ============= FAKER EVENT GENERATION ================

# 10.times do
#   title = Faker::Hipster.sentence(3)
#   description = Faker::Hipster.sentence(5)
#   num_tickets = rand(300) + 100
#   ticket_price = 0
#   category_id = 1
#   start_time = Faker::Time.between(4.days.from_now, 4.months.from_now)
#   event_hours = rand(10) + 1
#   end_time = start_time.to_time + event_hours.hours
#   live = true
#   organizer_id = rand(30) + 1
#
#   Event.create!(title: title, description: description,
#     num_tickets: num_tickets, ticket_price: ticket_price,
#     start_time: start_time, end_time: end_time, live: live,
#     category_id: category_id, organizer_id: organizer_id)
# end

# =============== CATEGORY SEEDING ======================

# NOT A COMPLETE LIST

EVENTBRITE_CATEGORY_MAPPING = {
  103 => "music",
  101 => "business",
  110 => "food & drink",
  113 => "community",
  105 => "arts",
  104 => "film & media",
  108 => "sports & fitness",
  107 => "health & wellness",
  102 =>"science & technology",
  109 => "travel",
  106 => "fashion",
  119 => "hobbies"
}

# EventBrite: SociaLight
SOCIALITE_CATEGORY_BRIDGE = {
  103 => 1,
  101 => 2,
  110 => 3,
  113 => 4,
  105 => 5,
  104 => 6,
  108 => 7,
  107 => 8,
  102 => 9,
  109 => 10,
  106 => 11,
  119 => 12
}

#
EVENTBRITE_CATEGORY_MAPPING.each do | _, category|
  unless Category.find_by_name(category)
    Category.create!({name: category})
  end
end

# =============== EVENTBRITE EVENT SEEDING ==============

Eventbrite.token = 'H5YYFUXDC3LC5PFS4N3B'

EVENTBRITE_EVENT_MAPPING = {
  'title': ['name', 'text'],
  'description': ['description', 'text'],
  'start_time': ['start', 'local'],
  'end_time': ['end', 'local'],
  'category_id': ['category_id'],
  "main_event_image_url": ['logo', "url"],
  "seed_id": ["id"]
}

EVENTBRITE_VENUE_MAPPING = {
  "name": ["name"],
  "latitude": ["address", "latitude"],
  "longitude": ["address", "longitude"],
  "address": ["address", "address_1"],
  "city": ["address", "city"],
  "region": ["address", "region"],
  "display_address": ["address", "localized_address_display"],
  "seed_id": ["id"]
}

ALL_USERS = User.all

paid_events = Eventbrite::Event.search({'location.latitude': 37.7749,
  'location.longitude': -122.4194, categories: '103,101,110,104,108,102,109',
  'location.within': '10mi', price: 'paid'})

seed_events = paid_events.events

seed_events.each do |event|
  eb_venue_id = event['venue_id']
  venue = Venue.find_by_seed_id(eb_venue_id)

  unless venue
    new_venue = Venue.new

    request_url = "https://www.eventbriteapi.com/v3/venues/#{eb_venue_id}"
    response = RestClient.get request_url,
      {params: {token: 'H5YYFUXDC3LC5PFS4N3B'}}
    parsed_response = JSON.parse(response)

    EVENTBRITE_VENUE_MAPPING.each do |key, val|
      if val.length == 1 && parsed_response[val.first]
        new_venue[key] = parsed_response[val.first]
      elsif parsed_response[val.first] && parsed_response[val.first][val[1]]
        new_venue[key] = parsed_response[val.first][val[1]]
      end
    end

    new_venue.save!
    venue = new_venue
  end

  # p "VENUE CHECK:"
  # p venue
  # p venue.valid?
  # p venue.errors.full_messages

  venue_id = venue.id


  unless Event.find_by_seed_id(event.id)
    new_event = Event.new

    EVENTBRITE_EVENT_MAPPING.each do |key, val|
      if key == "category_id"
        new_event[key] = SOCIALITE_CATEGORY_BRIDGE[event[val.first]]
      if val.length == 1 && event[val.first]
        new_event[key] = event[val.first]
      elsif event[val.first] && event[val.first][val[1]]
        new_event[key] = event[val.first][val[1]]
      end
    end

    new_event.num_tickets = (rand(30) + 1) * 10
    new_event.ticket_price = (rand(25) + 1) * 5
    new_event.live = true
    new_event.organizer_id = ALL_USERS.sample.id

    new_event.venue_id = venue_id

    # p "EVENT CHECK:"
    # p new_event
    # p new_event.valid?
    # p new_event.errors.full_messages
    new_event.save!
  end
end
