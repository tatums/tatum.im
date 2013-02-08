class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.text :body
      t.references :activityable, :polymorphic => true
      t.references :user
      t.timestamps
    end
  end
end
