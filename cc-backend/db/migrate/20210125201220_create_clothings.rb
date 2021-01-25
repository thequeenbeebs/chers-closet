class CreateClothings < ActiveRecord::Migration[6.0]
  def change
    create_table :clothings do |t|
      t.string :name
      t.string :brand
      t.string :category
      t.string :color
      t.string :image
      t.integer :user_id
      t.timestamps
    end
  end
end
