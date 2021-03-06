class Api::EventsController < ApplicationController
  before_action :verify_owner, only: [:update, :destroy]
  before_action :enforce_login, only: [:create, :update, :destroy]

  def index
    if current_user
      @events = Event.where("live = true OR organizer_id = ?", current_user.id)
        .order(:start_time)
        .where("start_time >= ?", Time.now)
        .includes(:venue)
        .includes(:category)
        .includes(:organizer)
      @events = Event.filter_events(@events, params[:filters])
    else
      @events = Event.all
        .where(live: true)
        .where("start_time >= ?", Time.now)
        .order(:start_time)
        .includes(:venue)
        .includes(:category)
        .includes(:organizer)
      @events = Event.filter_events(@events, params[:filters])
    end
    @user = current_user
    render 'api/events/index'
  end

  def create
    @event = Event.new(event_params)
    @event["organizer_id"] = current_user.id

    if @event.save
      render json: @event, status: 201
    else
      errors = @event.errors.full_messages
      render json: {error: errors}, status: :unprocessable_entity
    end
  end

  def show
    @event = Event.find_by(id: params[:id])
    if @event
      @user = current_user
      render 'api/events/show'
    else
      render json: {error: "Event not found"}, status: 404
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.update_attributes(event_params)
      render json: @event
    else
      errors = @event.errors.full_messages
      render json: {error: errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @event = Event.find(params[:id])
    if @event.destroy
      render json: @event
    else
      errors = @event.errors.full_messages
      render json: {error: errors}, status: :unprocessible_entity
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :category_id,
      :num_tickets, :ticket_price, :start_time, :end_time,
      :live, :address, :city, :state, :main_event_image_url, :venue_id)
  end

  def verify_owner
    event = Event.find(params[:id])
    unless event.organizer == current_user
      render json: {error: "Not authorized"}, status: 401
    end
  end
end
