wanted = event.attributes.keys.map(&:to_sym) - [:created_at, :updated_at]

is_bookmarked = event.user_bookmark(current_user) ? true : false

json.extract! event, *wanted
json.is_bookmarked is_bookmarked
