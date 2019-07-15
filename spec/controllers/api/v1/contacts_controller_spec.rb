require 'rails_helper'
require 'pry-byebug'
require "json"

RSpec.describe Api::V1::ContactsController do
  let!(:contacts) { create_list(:contact, 10) }
  let(:contact_id) { contacts.first.id }

  # PARSING DATA
  def json
    JSON.parse(response.body)
  end

  # TESTING INDEX
  describe "GET #index" do
    before { get :index }

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns right number of contacts' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end
  end

  # TESTING SHOW
  describe "GET #show" do
    before do
      get :show, params: { id: contacts.first.id }
      assert_routing api_v1_contact_path(contacts.first.id), controller: 'api/v1/contacts', action: 'show', format: :json, id: contacts.first.id.to_s
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns the contact' do
      expect(json).not_to be_empty
      expect(json['id']).to eq(contact_id)
    end
  end

  # TESTING CREATE
  describe 'POST #create' do
    context 'when the request is valid' do
      before do
        post :create, params: { contact: { first_name: 'Shahyn', last_name: 'Kamali', email: 'shahyn@gmail.com', phone_number: '652123119' }}
      end

      it 'creates a contact' do
        expect(json.with_indifferent_access[:first_name]).to eq('Shahyn')
        expect(json.with_indifferent_access[:last_name]).to eq('Kamali')
        expect(json.with_indifferent_access[:email]).to eq('shahyn@gmail.com')
        expect(json.with_indifferent_access[:phone_number]).to eq('652123119')
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the request is invalid' do
      before { post :create, params: { contact:{ first_name: 'Foobar' } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end
    end
  end

  # TESTING UPDATE
  describe 'PATCH #update' do
      before { put :update, params: { id: contacts.first.id, contact: { first_name: 'NewName' } } }

      it 'updates the record' do
        expect(json.with_indifferent_access[:first_name]).to eq('NewName')
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end

  # TESTING DELETE
  describe 'DELETE #destroy' do
    before { delete :destroy, params: { id: contacts.first.id } }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
