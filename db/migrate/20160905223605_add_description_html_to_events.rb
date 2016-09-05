class AddDescriptionHtmlToEvents < ActiveRecord::Migration
  def change
    add_column :events, :description_html, :text
  end
end
