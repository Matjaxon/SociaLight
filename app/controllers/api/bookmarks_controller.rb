class Api::BookmarksController < ApplicationController

  def create
    @event = Event.find(params[:event_id])
    @user_bookmark = @event.user_bookmark(current_user)

    if @user_bookmark
      @user_bookmark.destroy
      render json: @event, status: 200
    else
      @bookmark = Bookmark.new(bookmark_params)
      @bookmark.user_id = current_user.id
      if @bookmark.save
        @event = @bookmark.event
        render json: @event, status: 200
      else
        @errors = @bookmark.errors.full_messages
        render json: {error: @errors}, status: :unprocessible_entity
      end
    end
  end

  private

  def bookmark_params
    params.require(:bookmark).permit(:event_id)
  end

  def enforce_login
    unless current_user
      render json: {error: "Login required"}, status: 401
    end
  end
end
