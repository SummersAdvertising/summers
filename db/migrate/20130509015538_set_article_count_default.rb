class SetArticleCountDefault < ActiveRecord::Migration
  def change
  	change_column :articles, :count, :integer, :default => 0
  end
end
