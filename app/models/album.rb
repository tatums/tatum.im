class Album < ActiveRecord::Base
  attr_accessible :name, :user_id
  has_many :photos, :dependent => :destroy
  belongs_to :user

  def owner
    user.name if user
  end

  def cover
    unless photos.empty?
      photos.first.image_url(:small)
    end
  end
end
