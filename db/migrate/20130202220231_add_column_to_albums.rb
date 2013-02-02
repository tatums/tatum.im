class AddColumnToAlbums < ActiveRecord::Migration
  def change
    add_column :users, :site_owner, :boolean
    add_column :albums, :hidden, :boolean
    add_column :photos, :featured, :boolean
  end
end
