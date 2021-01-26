class UsersController < ApplicationController
    # def index
    #     user = User.all 
    #     render json: user
    # end

    def show
        current_user = User.find_or_create_by(username: params[:username])
        render json: current_user, include: [:clothings, :outfits]
    end
end
