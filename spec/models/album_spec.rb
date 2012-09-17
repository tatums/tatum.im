require 'spec_helper.rb'
describe "Album" do

  before do
    @album = Fabricate :album
  end

  it "shouln't have a nil name" do
    @album.name.should_not eql nil
  end

  it "Should have a user" do 
    @album.user.should_not eql nil
  end

  it "Should have an owner" do 
    @album.owner.should_not eql nil
  end

  it "Should return photos as an Array" do 
    @album.photos.should be_a(Array)
  end

  it "Should have a cover photo" do
    @album.cover.should be_a(Photo)
  end
end
