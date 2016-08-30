class Api::UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      errors = @user.errors.full_messages
      render json: {error: error}, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
