class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.string :name
      t.string :phone
      t.string :email
      t.text :issue
      t.text :content

      t.timestamps
    end
  end
end
