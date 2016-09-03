class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.integer :guest_id, null: false
      t.integer :event_id, null: false

      t.timestamps null: false
    end
    add_index :tickets, :guest_id
    add_index :tickets, :event_id
  end
end
