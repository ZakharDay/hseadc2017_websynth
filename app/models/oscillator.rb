class Oscillator < ApplicationRecord
  validates :uuid, presence: true
  validates :uuid, uniqueness: true
end
