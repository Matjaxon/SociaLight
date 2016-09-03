json.hosted_events user.hosted_events do |event|
  json.partial! 'api/events/ticket_details', event: event
end
