json.array! @events do |event|
  json.partial! 'api/events/event', event: event, user: @user

  if @user
    current_user_event = event.organizer == @user
    current_user_tickets = event.tickets.where(guest_id: @user.id).count

    json.current_user_event current_user_event
    json.current_user_tickets current_user_tickets
  end

end
