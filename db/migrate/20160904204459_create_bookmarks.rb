class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.string :user_id
      t.string :integer
      t.string :event_id
      t.string :integer

      t.timestamps null: false
    end

    add_index :bookmarks, :user_id
    add_index :bookmarks, :event_id
    add_index :bookmarks, [:user_id, :event_id], unique: true
  end
end
