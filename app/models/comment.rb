class Comment < ActiveRecord::Base
  attr_accessible :body, :user_id

  belongs_to :user
  has_many :activities, as: :activityable
  belongs_to :commentable, :polymorphic => true

  after_create :log_activity

  def log_activity
    Activity.log(self)
  end

  def preview
    body.split(' ').take(7).join(' ') + '...'
  end

end
