class AddMainEventImageUrlToEvents < ActiveRecord::Migration
  def change
    add_column :events, :main_event_image_url, :string
  end
end
