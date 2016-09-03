wanted = event.attributes.keys.map(&:to_sym) - [:created_at, :updated_at]

json.extract! event, *wanted
