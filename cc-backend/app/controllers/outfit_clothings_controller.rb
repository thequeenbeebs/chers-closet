class OutfitClothingsController < ApplicationController
    def index
        all = OutfitClothing.all
        render json: all
    end

    def create
        outfit_clothing = OutfitClothing.create(outfit_clothing_params)
        render json: outfit_clothing
    end

    def delete
        joiner = OutfitClothing.find_by(id: params[:id])
        joiner.destroy
    end

    private

    def outfit_clothing_params
        params.require(:outfit_clothing).permit(:clothing_id, :outfit_id)
    end
end
