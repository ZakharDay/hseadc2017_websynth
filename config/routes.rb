Rails.application.routes.draw do
  namespace :api, format: :json do
    get 'synthroom/index'
  end

  get 'synthroom/index'
  get 'welcome/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
