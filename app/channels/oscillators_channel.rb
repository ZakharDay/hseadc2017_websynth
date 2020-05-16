class OscillatorsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "oscillators_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
