class AddSearchNameToCity < ActiveRecord::Migration[6.0]
  def up
    add_column :cities, :search_name, :string

    City.all.each do |city|
      city.update_attribute(:search_name, city.name.downcase)
      puts "City #{city.search_name} just updated"
    end
  end

  def down
    remove_column :cities, :search_name
  end
end
