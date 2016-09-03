Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :events do
      resources :tickets, only: [:create, :show]
    end
  end

  root to: 'static_pages#root'

end
