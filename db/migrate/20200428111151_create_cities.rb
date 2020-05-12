class CreateCities < ActiveRecord::Migration[6.0]
  def change
    create_table :cities do |t|
      t.integer :weatherbit_city_id
      t.string :name
      t.string :state_code
      t.string :country_code
      t.string :country_full
      t.float :lat
      t.float :lon

      t.timestamps
    end
  end
end
