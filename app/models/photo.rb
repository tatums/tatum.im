class Photo < ActiveRecord::Base
  attr_accessible :album_id, :image
  mount_uploader :image, ImageUploader

  belongs_to :album
  has_many :comments, as: :commentable
end
