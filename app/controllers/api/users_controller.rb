class Api::UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render 'api/users/show', user: @user
    else
      errors = @user.errors.full_messages
      render json: {error: errors}, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    render 'api/users/show', user: @user
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :phone_number)
  end

end
