class Api::EventsController < ApplicationController

  def index
    @events = Event.all.order(:start_time)
    render json: @events
  end

  def create
  end

  def show
  end

end
