class CreateArticlephotos < ActiveRecord::Migration
  def change
    create_table :articlephotos do |t|
      t.integer :article_id
      t.string :name
      t.string :img

      t.timestamps
    end
  end
end
