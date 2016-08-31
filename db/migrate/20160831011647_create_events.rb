class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.text :description
      t.integer :category_id, null: false
      t.integer :organizer_id, null: false
      t.integer :num_tickets, null: false
      t.integer :ticket_price, null: false
      t.integer :venue_id
      t.string :venue_name
      t.string :address
      t.string :city
      t.string :state
      t.string :zip_code
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.boolean :live, null: false, default: false

      t.timestamps null: false
    end
    add_index :events, :category_id
    add_index :events, :organizer_id
    add_index :events, :venue_id
  end
end
