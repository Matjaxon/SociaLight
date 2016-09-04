json.array! @events do |event|
  json.partial! 'api/events/event', event: event

  current_user_event = event.organizer == current_user
  current_user_tickets = event.tickets.where(guest_id: current_user.id).count
  bookmarked = false

  if current_user
    json.current_user_event current_user_event
    json.current_user_tickets current_user_tickets
    json.bookmarked bookmarked
  end

end
