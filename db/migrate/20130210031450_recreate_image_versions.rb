class RecreateImageVersions < ActiveRecord::Migration
  def up
    Photo.all.each do |p|
      puts "Recreating image versions for photo id: #{p.id}"
      p.image.recreate_versions!
    end
  end

  def down
  end
end
