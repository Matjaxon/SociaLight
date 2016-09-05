class AddSeedIdToEvents < ActiveRecord::Migration
  def change
    add_column :events, :seed_id, :string
    add_index :events, :seed_id
  end
end
