class CreateOscillators < ActiveRecord::Migration[6.0]
  def change
    create_table :oscillators do |t|
      t.string :uuid
      t.float :frequency, default: 440.0

      t.timestamps
    end
  end
end
