Rails.application.routes.draw do
  # root to: 'pages#home'

  # get "/contacts/new", to: 'pages#home'
  # get "/contacts/:id", to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :contacts, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
