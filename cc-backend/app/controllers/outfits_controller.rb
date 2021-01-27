class OutfitsController < ApplicationController
    def index
        outfits = Outfit.all
        render json: outfits, include: [:clothings]
    end

    def create
        new_item = Outfit.create(outfit_params)
        render json: new_item
    end

    def outfit_params
        params.require(:outfit).permit(:name, :season, :occasion, :user_id)
    end

        
end


