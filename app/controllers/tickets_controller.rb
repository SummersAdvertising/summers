class TicketsController < ApplicationController

	layout false

  # GET /tickets/new
  # GET /tickets/new.json
  def new
    @ticket = Ticket.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @ticket }
    end
  end

  # POST /tickets
  # POST /tickets.json
  def create
  
    @ticket = Ticket.new( params[:ticket] )
     
    respond_to do |format|
      if @ticket.save
      
        TicketMailer.send_notice(@ticket).deliver
      
        #format.html { redirect_to :action => :new, :anchor => "finished" }
        format.html { redirect_to "/contact.html#finished" }
        format.json { render json: @ticket, status: :created, location: @ticket }
      else
        format.html { render action: "new" }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

end
