class User < ApplicationRecord
    has_many :clothings 
    has_many :outfits 
end
