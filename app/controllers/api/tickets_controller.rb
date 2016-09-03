class Api::TicketsController < ApplicationController

  def create
    tickets_to_order = params[:num_tickets].to_i
    event = Event.find_by(id: params[:event_id])
    tickets_array = []

    if event.tickets_available?(tickets_to_order)
      Ticket.transaction do
        begin
          tickets_to_order.times do
            @ticket = Ticket.new({guest_id: current_user.id,
              event_id: params[:event_id]})
            @ticket.save!
            tickets_array << @ticket
          end
        rescue ActiveRecord::Rollback => e
          @errors = e.message
        end
      end

      if @errors
        render json: {error: @errors}, status: :unprocessible_entity
      else
        render json: tickets_array.last
      end
    else
      render json: {error: "Tickets unavailable"}, status: :unprocessible_entity
    end
  end

  def show
    @ticket.find(params[:id])
    render json: @ticket, status: 200
  end

  private

  def ticket_params
    params.require(:ticket).permit(:event_id)
  end

end
