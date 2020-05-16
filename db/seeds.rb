@file = File.read(File.join(Rails.root, 'db/seeds/cities_20000.json'))
@cities_hash = JSON.parse(@file)

def seed_data
  reset_db
  # create_cities
  # create_fxes
  create_oscillators
end

def reset_db
  Rake::Task['db:drop'].invoke
  Rake::Task['db:create'].invoke
  Rake::Task['db:migrate'].invoke
end

def create_cities
  @cities_hash.each do |city|
    create_city(city)
  end
end

def create_city(city)
  c = City.create!(
    weatherbit_city_id: city["city_id"],
    name:               city["city_name"],
    state_code:         city["state_code"],
    country_code:       city["country_code"],
    country_full:       city["country_full"],
    lat:                city["lat"],
    lon:                city["lon"]
  )

  puts "City #{c.name} just created"
end

def create_fxes
  fxes = ['reverb', 'delay', 'bitcrusher', 'distortion']

  fxes.each do |fx|
    Fx.create!(name: fx)
  end
end

def create_oscillators
  3.times do
    Oscillator.create!(uuid: SecureRandom.uuid)
  end
end

seed_data
