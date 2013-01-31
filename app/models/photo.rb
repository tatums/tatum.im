class Photo < ActiveRecord::Base
  attr_accessible :album_id, :image, :user_id
  mount_uploader :image, ImageUploader

  belongs_to :album
  belongs_to :user
  has_many :comments, as: :commentable

  def belongs_to(current_user)
    true if user == current_user
  end
end
