class OutfitClothingsController < ApplicationController
    
    def create
        outfit_clothing = OutfitClothing.create(outfit_clothing_params)
        render json: outfit_clothing
    end

    private

    def outfit_clothing_params
        params.require(:outfit_clothing).permit(:clothing_id, :outfit_id)
    end
end
