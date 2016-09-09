class Api::VenuesController < ApplicationController

  def create
    @venue = Venue.new(venue_params)
    if @venue.save
      render json: @venue, status: 200
    else
      errors = @venue.errors.full_messages
      p errors
      render json: {error: errors}, status: :unprocessable_entity
    end
  end

  private

  def venue_params
    params.require(:venue).permit(:name, :latitude, :longitude, :display_address)
  end
end
