class Album < ActiveRecord::Base
  attr_accessible :name, :user_id, :position
  has_many :photos, :dependent => :destroy
  belongs_to :user

  after_create :set_init_position

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

  private

  def set_init_position
    update_attributes(:position => 1)
    Album.order(:position) - [self].to_enum.with_index(2) do |album, index|
      album.update_attributes(:position => index)
    end
  end

end
