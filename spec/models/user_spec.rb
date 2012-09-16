require 'spec_helper.rb'

describe "User" do

  before do
    @user = Fabricate :user
  end

  it "name shouldn't be nil" do
    @user.name.should_not eql nil
  end

end
