class AddSeedIdToVenues < ActiveRecord::Migration
  def change
    add_column :venues, :seed_id, :string
    add_index :venues, :seed_id
  end
end
