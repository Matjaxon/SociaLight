json.ticket_details do
  json.sold event.tickets.count
  json.last_sale_at (event.tickets.last ? event.tickets.last.created_at : nil)
end
