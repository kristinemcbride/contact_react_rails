require 'rails_helper'

RSpec.describe Contact, type: :model do
  # Validation tests
  # ensure columns title and created_by are present before saving
  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:phone_number) }
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }
  it { should allow_value("email@addresse.com").for(:email) }
  it { should_not allow_value("foo").for(:email) }
  it { should_not allow_value("foo@email").for(:email) }

end
