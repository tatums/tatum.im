class Activity < ActiveRecord::Base
  belongs_to :activityable, :polymorphic => true
  belongs_to :user
  attr_accessible :body, :user

  def self.log(object)
    if object.class.name == 'Comment'
      object.commentable.activities.create(user: object.user, body: message_for(object) )
    else
      object.activities.create(user: object.user, body: message_for(object) )
    end
  end


  def self.group
    Activity.order('created_at DESC').group_by{|a| a.created_at.strftime("%m/%d/%Y %H:%M") }
  end

  def message
    if activityable.class == Photo
      'created'
    elsif activityable.class == Album
      'created'
    elsif activityable.class == Comment
      'commented'
    else
      '.....'
    end
  end

  def self.message_for(object)
    if object.class == Photo
      'uploaded'
    elsif object.class == Album
      'created'
    elsif object.class == Comment
      'commented'
    else
      'did something.'
    end
  end

  def object_name
    activityable.class.name.downcase
  end

end
