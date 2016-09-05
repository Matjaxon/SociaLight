json.saved_events saved_events do |event|
  json.partial! "api/events/event", event: event, user: user
  user_tickets = event.tickets.where(guest_id: user.id)
  json.tickets user_tickets do |ticket|
    ticket_code = "#{event.id}-#{ticket.id}"

    json.id ticket.id
    json.ticket_code ticket_code
  end
end
