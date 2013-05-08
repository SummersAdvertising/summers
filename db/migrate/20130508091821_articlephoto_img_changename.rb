class ArticlephotoImgChangename < ActiveRecord::Migration
  def change
  	rename_column :articlephotos, :img, :image
  end
end
