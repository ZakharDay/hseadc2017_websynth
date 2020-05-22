class Api::OscillatorsController < Api::ApplicationController
  def index
    oscillators = Oscillator.all
    oscillators_array = []

    oscillators.each do |oscillator|
      oscillators_array << oscillator.as_json
    end

    puts oscillators_array

    render json: oscillators_array
  end

  def create
    oscillator = Oscillator.new(frequency: params[:oscillator][:frequency], uuid: params[:oscillator][:uuid])

    # sleep 20

    if oscillator.save
      ActionCable.server.broadcast 'oscillators_channel', oscillator.as_json.to_json
      render json: oscillator
    else
      render json: oscillator.errors
    end
  end

  def destroy
    oscillator = Oscillator.find(params[:id])
    uuid = oscillator.uuid
    oscillator.destroy

    ActionCable.server.broadcast 'oscillators_channel', { uuid: uuid }.to_json
    render json: {}
  end
end
