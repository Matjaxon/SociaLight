json.extract! user, :id, :username

bookmarks = user.bookmarks

json.bookmarked_event_ids Hash[bookmarks.map { |bookmark| [bookmark.event.id, bookmark.event.id] }]

ticket_counts = user.tickets.group(:event_id).count
json.ticket_counts ticket_counts
