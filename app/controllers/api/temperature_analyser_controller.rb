class Api::TemperatureAnalyserController < Api::ApplicationController

  def analyse
    city = params[:city]
    uri = URI("http://api.weatherbit.io/v2.0/current/?key=cced9dfcd32446e694eba98b7a58527d&lang=en&units=m&city=#{ city }&country=US")
    data = Net::HTTP.get(uri)

    render json: data
  end

end
