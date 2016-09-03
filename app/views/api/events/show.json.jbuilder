json.partial! "api/events/event", event: @event

if current_user == @event.organizer
  json.partial! "api/events/ticket_details", event: @event
end
