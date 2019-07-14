class Contact < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/ }
  validates :phone_number, presence: true
end
