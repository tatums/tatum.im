require 'spec_helper'

describe "Albums" do
  describe "GET /albums" do

    before(:each) do
      @user = Fabricate :user
    end


    it "should show index page" do
      get albums_path
      response.status.should be(200)
    end

    it "should display new album page" do
      get new_album_path
      response.should render_template(:new)
      response.status.should be(200)
    end

  end
end
