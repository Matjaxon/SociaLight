class Api::EventsController < ApplicationController

  def index
    @events = Event.all.order(:start_time)
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
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :category_id,
      :num_tickets, :ticket_price, :start_time, :end_time,
      :live)
  end
end
