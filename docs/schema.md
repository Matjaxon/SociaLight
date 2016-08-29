# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
phone_number    | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | text      | not null
category_id | integer   | not null, foreign key (references categories), indexed
organizer_id | integer  | not null, foreign key (references users), indexed
num_tickets | integer   | not null
ticket_price| integer   | not null
venue_id    | integer   | foreign key (references venues), indexed
venue_name  | string    | not null
address     | string    | not null
city        | string    | not null
state       | string    | not null
zip_code    | integer   | not null
start       | date      | not null
end         | date      | not null
live        | boolean   | not null, default: false

## tickets
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
guest_id    | integer   | not null, foreign key (references users), indexed
event_id    | integer   | not null, foreign key (references events), index, unique [guest_id]

## categories
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name       | string    | not null

## bookmarks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
guest_id    | integer   | not null, foreign key (references notes), indexed, unique [event_id]
event_id    | integer   | not null, foreign key (references tags), indexed

## venues
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
venue_name  | string    | not null
address     | string    | not null
city        | string    | not null
state       | string    | not null
zip_code    | integer   | not null

## group_events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
organizer_id| integer   | not null, foreign key (references users), indexed, unique [event_id]
event_id    | integer   | not null, foreign key (references events), indexed
min_num_guests | integer | not null

## event_invitations
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
guest_id    | integer   | not null, foreign key (references users), indexed, unique [group_event_id]
group_event_id | integer | not null, foreign key (references group_events), indexed
accepted | boolean | not null, default: false
