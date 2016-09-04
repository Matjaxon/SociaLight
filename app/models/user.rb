# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  phone_number    :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base

  validates :username, :password_digest, :session_token, :email, :phone_number, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :username, uniqueness: true

  attr_reader :password

  after_initialize :ensure_session_token

  has_many :tickets,
    foreign_key: :guest_id,
    primary_key: :id,
    class_name: :Ticket

  has_many :events, -> {distinct}, through: :tickets, source: :event

  has_many :hosted_events,
    foreign_key: :organizer_id,
    class_name: :Event

  has_many :bookmarks

  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    return nil if @user.nil?
    @user.is_password?(password) ? @user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(32)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

end
