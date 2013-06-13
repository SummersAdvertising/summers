class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content
      t.string :namehash
      t.string :metakw
      t.integer :count

      t.timestamps
    end
  end
end
