Rails.application.routes.draw do
  namespace :api, format: :json do
    get 'synthroom/index'
    resources :fxes
    get 'temperature_analyser/analyse/:city', controller: 'temperature_analyser', action: 'analyse'
    get 'temperature_analyser/find_cities', controller: 'temperature_analyser', action: 'find_cities'
  end

  get 'synthroom/index'
  get 'welcome/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
