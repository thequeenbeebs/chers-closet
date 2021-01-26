class OutfitsController < ApplicationController
    def index
        outfits = Outfit.all
        render json: outfits, include: [:clothings]
    end
end
