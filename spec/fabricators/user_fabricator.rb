Fabricator(:user) do
  provider{ %w(facebook twitter).sample }
  uid '728730625'
  name 'Blah Blahhhhahhaha'
end
