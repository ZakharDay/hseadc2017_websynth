class Api::TemperatureAnalyserController < Api::ApplicationController

  def find_cities
    search_length = params[:search].length
    cities = City.where("substr(search_name, 1, #{search_length}) = ?", params[:search].downcase)
    render json: cities
  end

  def analyse
    # Нужно найти город в базе, достать страну, вставить страну
    # и город в адресную строку

    # Решить проблему поиска в разном регистре
    
    city = URI.escape(params[:city])
    uri = URI("http://api.weatherbit.io/v2.0/current/?key=cced9dfcd32446e694eba98b7a58527d&lang=en&units=m&city=#{ city }&country=US")
    data = Net::HTTP.get(uri)

    unless data
      data = { error: "Wrong city" }
    end

    render json: data
  end

end
