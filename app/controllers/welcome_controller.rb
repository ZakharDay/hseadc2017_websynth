class WelcomeController < ApplicationController

  def index
    uri = URI('http://api.weatherbit.io/v2.0/current/?key=cced9dfcd32446e694eba98b7a58527d&lang=en&units=m&city=moscow&country=ru')
    @data = Net::HTTP.get(uri)
  end

end
