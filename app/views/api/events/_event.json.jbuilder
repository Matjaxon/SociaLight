wanted_event_fields = event.attributes.keys.map(&:to_sym) - [:created_at, :updated_at]

is_bookmarked = event.user_bookmark(current_user) ? true : false

if event.venue_id
  venue = event.venue
  wanted_venue_fields = venue.attributes.keys.map(&:to_sym) - [:created_at, :updated_at]
  json.venue do
    json.extract! venue, *wanted_venue_fields
  end
end

json.extract! event, *wanted_event_fields
json.is_bookmarked is_bookmarked
