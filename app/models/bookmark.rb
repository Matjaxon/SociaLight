class Bookmark < ActiveRecord::Base
  validates :event, :user, presence: true

  belongs_to :user
  belongs_to :event

end
