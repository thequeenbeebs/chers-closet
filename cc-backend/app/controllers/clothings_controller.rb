class ClothingsController < ApplicationController
    def index
        clothings = Clothing.all 
        render json: clothings
    end

    def create
        new_item = Clothing.create(clothing_params)
        render json: new_item
    end

    def destroy
        item = Clothing.find_by(id: params(:id))
        
    end

    private

    def clothing_params
        params.require(:clothing).permit(:name, :brand, :category, :color, :image, :user_id)
    end
end
