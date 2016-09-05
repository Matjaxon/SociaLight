class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.integer :user_id, null: false
      t.integer :event_id, null: false

      t.timestamps null: false
    end
    add_index :bookmarks, :user_id
    add_index :bookmarks, :event_id
    add_index :bookmarks, [:user_id, :event_id], unique: true
  end
end
