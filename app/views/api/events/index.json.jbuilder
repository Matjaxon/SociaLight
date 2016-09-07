json.array! @events do |event|
  json.partial! 'api/events/event', event: event, user: @user

  if @user
    current_user_event = event.organizer == @user
    json.current_user_event current_user_event
  end

end
