class AddPublishDateToArticles < ActiveRecord::Migration
  def change
  	add_column :articles, :publishDate, :datetime
  end
end
