class UsersController < ApplicationController
    def index
        user = User.all 
        render json: user
    end

    def show
        current_user = User.find_by(username: params[:username])
        render json: current_user
    end
end
