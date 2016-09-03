json.partial! "api/users/user", user: @user

if current_user
  json.partial! "api/users/user_events", user: @user
  json.partial! "api/users/user_hosted_events", user: @user
end
