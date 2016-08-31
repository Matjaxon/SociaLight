# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# 50.times do
#   username = Faker::Internet.user_name
#   password = Faker::Internet.password(8)
#   email = Faker::Internet.safe_email
#   phone_number = Faker::PhoneNumber.phone_number
#   User.create!(username: username, password: password, email: email, phone_number: phone_number)
# end
#

# 10.times do
#   title = Faker::Hipster.sentence(3)
#   description = Faker::Hipster.sentence(5)
#   num_tickets = rand(300) + 100
#   ticket_price = 0
#   category_id = 1
#   start_time = Faker::Time.between(4.days.from_now, 4.months.from_now)
#   event_hours = rand(10) + 1
#   end_time = start_time.to_time + event_hours.hours
#   live = true
#   organizer_id = rand(30) + 1
#
#   Event.create!(title: title, description: description,
#     num_tickets: num_tickets, ticket_price: ticket_price,
#     start_time: start_time, end_time: end_time, live: live,
#     category_id: category_id, organizer_id: organizer_id)
# end
