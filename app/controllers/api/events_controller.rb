class Api::EventsController < ApplicationController

  def index
    if current_user
      @events = Event.all.where(live: true).order(:start_time)
    else
      @events = Event.where("live = true OR organizer_id = ?", current_user.id)
        .order(:start_time)
    end
    render json: @events
  end

  def create
    @event = Event.new(event_params)
    @event["organizer_id"] = current_user.id

    if @event.save
      render json: @event, status: 201
    else
      errors = @event.errors.full_messages
      render json: {error: errors}, status: :unprocessible_entity
    end
  end

  def show
    @event = Event.find_by(id: params[:id])
    if @event
      render json: @event
    else
      render json: {error: "Event not found"}, status: 404
    end
  end

  def update
    @event = Event.find(params[:id])
    p event_params
    if @event.update_attributes(event_params)
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
      :live)
  end
end
