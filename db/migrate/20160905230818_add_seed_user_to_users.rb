class AddSeedUserToUsers < ActiveRecord::Migration
  def change
    add_column :users, :seed_user, :boolean, default: false
  end
end
