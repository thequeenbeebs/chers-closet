class CreateOutfitClothings < ActiveRecord::Migration[6.0]
  def change
    create_table :outfit_clothings do |t|
      t.integer :clothing_id
      t.integer :outfit_id
      t.timestamps
    end
  end
end
