class Album < ActiveRecord::Base
  attr_accessible :name, :user_id, :position
  has_many :photos, :dependent => :destroy
  belongs_to :user
  has_many :activities, as: :activityable, :dependent => :destroy

  after_create :set_init_position, :log_activity

  def owner
    user.name if user
  end

  # def cover_photo
  #   Photo.find(cover_id) if cover_id
  # end

  def cover
    photos.detect{ |p| p.id == cover_id } if cover_id
  end

  def set_cover(photo)
    self.cover_id = photo.id
    self.save
  end


  private

  def log_activity
    Activity.log(self)
  end

  def set_init_position
    update_attributes(:position => 1)
    Album.order(:position) - [self].to_enum.with_index(2) do |album, index|
      album.update_attributes(:position => index)
    end
  end

end
