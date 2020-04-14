class CreateFxes < ActiveRecord::Migration[6.0]
  def change
    create_table :fxes do |t|
      t.string :name
      t.integer :volume, default: 0

      t.timestamps
    end
  end
end
