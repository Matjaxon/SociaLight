json.partial! "api/users/user", user: @user

if current_user

  user_events = @user.events.order(:start_time)
  hosted_events = @user.hosted_events.order(:start_time)
  bookmarked_events = @user.bookmarked_events.order(:start_time)
  json.partial! "api/users/user_events", user_events: user_events, user: @user
  json.partial! "api/users/user_hosted_events", hosted_events: hosted_events, user: @user
  json.partial! "api/users/user_saved_events", saved_events: bookmarked_events, user: @user
end
