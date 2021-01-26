class ClothingsController < ApplicationController
    def index
        clothings = Clothing.all 
        render json: clothings
    end

    def create
        new_item = Clothing.create(clothing_params)
        render json: new_item
    end

    def update
        item = Clothing.find(params[:id])
        item.update(clothing_params)
        render json: item
    end

    def delete
        item = Clothing.find_by(id: params[:id])
        item.destroy
    end

    private

    def clothing_params
        params.require(:clothing).permit(:name, :brand, :category, :color, :image, :user_id)
    end
end
