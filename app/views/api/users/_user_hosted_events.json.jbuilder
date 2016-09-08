json.hosted_events hosted_events do |event|
  current_user_event = event.organizer == user
  json.current_user_event current_user_event
  json.partial! 'api/events/event', event: event, user: user
  json.partial! 'api/events/ticket_details', event: event
end
