class Album < ActiveRecord::Base
  attr_accessible :name, :user_id
  has_many :photos, :dependent => :destroy
  belongs_to :user

  def owner
    user.name if user
  end

  def cover_photo
    Photo.find(cover_id) if cover_id
  end

  def cover
    Photo.find(cover_id).image_url(:small) if cover_id
  end

  def set_cover(photo)
    self.cover_id = photo.id
    self.save
  end

end
