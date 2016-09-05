class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :name
      t.float :latitude
      t.float :longitude
      t.string :address
      t.string :city
      t.integer :zip_code
      t.string :region
      t.string :display_address

      t.timestamps null: false
    end

    add_index :venues, :name
  end
end
