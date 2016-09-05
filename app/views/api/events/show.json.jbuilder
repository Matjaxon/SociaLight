json.partial! "api/events/event", event: @event, user: @user

if @user == @event.organizer
  json.partial! "api/events/ticket_details", event: @event
end
