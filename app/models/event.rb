# == Schema Information
#
# Table name: events
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  description  :text
#  category_id  :integer          not null
#  organizer_id :integer          not null
#  num_tickets  :integer          not null
#  ticket_price :integer          not null
#  venue_id     :integer
#  venue_name   :string
#  address      :string
#  city         :string
#  state        :string
#  zip_code     :string
#  start_time   :time             not null
#  end_time     :time             not null
#  live         :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Event < ActiveRecord::Base

  validates :title, :description, :category_id, :organizer_id, :num_tickets,
  :ticket_price, :start_time, :end_time, presence: true

  belongs_to :organizer,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: :User

end
