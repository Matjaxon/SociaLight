# == Schema Information
#
# Table name: tickets
#
#  id         :integer          not null, primary key
#  guest_id   :integer          not null
#  event_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Ticket < ActiveRecord::Base
  validates :guest, :event, presence: true

  belongs_to :event

  belongs_to :guest,
    foreign_key: :guest_id,
    primary_key: :id,
    class_name: :User

end
