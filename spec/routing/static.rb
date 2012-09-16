require 'spec_helper'
describe "routing to home page" do
  it "routes / to static#home" do
    expect(:get => "/").to route_to(
      :controller => "static",
      :action => "home"
    )
  end

end
