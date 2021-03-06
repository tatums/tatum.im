class User < ActiveRecord::Base
  attr_accessible :name, :provider, :uid, :site_owner
  has_many :albums, :dependent => :destroy
  has_many :comments, as: :commentable
  has_many :photos, :dependent => :destroy
  has_many :activities

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.avatar = auth.info.image
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.now+15.days
      #user.oauth_expires_at = Time.at(auth.credentials.expires_at)
    end
  end

  def facebook
    @facebook ||= Koala::Facebook::API.new(oauth_token)
  end

end
