module Api::V1
class Api::V1::ContactsController < ActionController::Base
  before_action :set_contact, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token
  def index
    @contacts = Contact.all
    render json: @contacts
  end

  def show
    render json: @contact
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      render json: @contact
    else
      render json: @contact, status: :unprocessable_entity
    end
  end

  def update
    if @contact.update(contact_params)
      render json: @contact
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @contact.destroy
    if @contact.destroy
      head :no_content
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  private

  def set_contact
    @contact = Contact.find(params[:id])
  end

  def contact_params
    binding.pry if $debug
    params.require(:contact).permit(:first_name, :last_name, :email, :phone_number)
  end
end
end



