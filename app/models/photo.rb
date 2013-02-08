class Photo < ActiveRecord::Base
  attr_accessible :album_id, :image, :user_id, :title
  mount_uploader :image, ImageUploader

  belongs_to :album
  belongs_to :user
  has_many :activities, as: :activityable, :dependent => :destroy
  has_many :comments, as: :commentable, :dependent => :destroy

  before_create :default_name
  after_save :default_cover
  after_create :log_activity
  after_destroy :unset_if_cover

  def default_cover
    album.set_cover(self) unless album.cover ## default
  end

  def unset_if_cover
    if album.cover_id == self.id

      if album.photos.any?
        album.set_cover(album.photos.first)
      else
        album.update_attribute('cover_id', nil)
      end
    end
  end

  def belongs_to(current_user)
    true if user == current_user
  end

  def default_name
    self.title ||= File.basename(image.filename, '.*').titleize if image
  end

  def log_activity
    Activity.log(self)
  end

end
