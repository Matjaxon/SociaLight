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
#  start_time   :datetime         not null
#  end_time     :datetime         not null
#  live         :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Event < ActiveRecord::Base

  validates :title, :description, :category_id, :organizer_id, :num_tickets,
  :ticket_price, :start_time, :end_time, presence: true

  belongs_to :organizer,
    foreign_key: :organizer_id,
    primary_key: :id,
    class_name: :User

  has_many :tickets

  has_many :guests, -> {distinct},
    class_name: :User

  has_many :bookmarks

  belongs_to :venue

  def tickets_available?(num_tickets)
    self.num_tickets - self.tickets.count > num_tickets
  end

  def user_bookmark(user)
    self.bookmarks.where(user_id: user.id).first
  end

end
