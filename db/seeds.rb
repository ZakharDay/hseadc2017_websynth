fxes = ['reverb', 'delay', 'bitcrusher', 'distortion']

fxes.each do |fx|
  Fx.create!(name: fx)
end
