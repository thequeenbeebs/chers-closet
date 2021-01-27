class OutfitsController < ApplicationController
    def index
        outfits = Outfit.all
        render json: outfits, include: [:clothings]
    end

    def create
        new_item = Outfit.create(outfit_params)
        render json: new_item
    end

    def update
        outfit = Outfit.find(params[:id])
        outfit.update(outfit_params)
        render json: outfit
    end

    def delete
        outfit = Outfit.find_by(id: params[:id])
        outfit.destroy
    end

    private

    def outfit_params
        params.require(:outfit).permit(:name, :season, :occasion, :user_id)
    end
end


