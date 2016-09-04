json.hosted_events hosted_events do |event|
  json.partial! 'api/events/event', event: event
  json.partial! 'api/events/ticket_details', event: event
end
