require 'spec_helper'

describe "Albums" do
  describe "GET /albums" do
    it "should show index page" do
      get albums_path
      response.status.should be(200)

    end

    it "should display new album page" do
      get new_album_path
      response.should render_template(:new)
    end

    it "should create an Album" do
      post "/albums", :album => {:name => "My Widget"}
      response.should redirect_to(assigns(:album))
      follow_redirect!

      response.should render_template(:show)
      response.body.should include("Album was successfully created.")
    end

  end
end
