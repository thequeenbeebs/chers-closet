class Clothing < ApplicationRecord
    belongs_to :user 
    has_many :outfit_clothings
    has_many :outfits, through: :outfit_clothings
end
