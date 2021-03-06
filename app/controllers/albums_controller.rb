class AlbumsController < ApplicationController
  before_filter :require_user

  def index
    @albums = Album.order(:position)
    @activities = Activity.order('created_at DESC').take(15)

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def show
    @album = Album.find(params[:id])
    @photos = @album.photos.order(:position)

    respond_to do |format|
      format.html # show.html.erb
    end
  end

  def new
    @album = Album.new

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  def edit
    @album = Album.find(params[:id])
  end

  def create
    @album = Album.new(params[:album])
    @album.user_id = current_user.id if current_user
    respond_to do |format|
      if @album.save
        format.html { redirect_to @album, notice: 'Album was successfully created.' }
      else
        format.html { render action: "new" }
      end
    end
  end

  def update
    @album = Album.find(params[:id])

    respond_to do |format|
      if @album.update_attributes(params[:album])
        format.html { redirect_to @album, notice: 'Album was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end

  def destroy
    @album = Album.find(params[:id])
    @album.destroy

    respond_to do |format|
      format.html { redirect_to albums_url }
    end
  end


  def sort
    params[:AlbumsOrder].each_with_index do |id, index|
      Album.where(:id => id.scan(/\d+/)).update_all(:position => index+1)
    end
    render :nothing => true
  end

  def sort_photos
    params[:PhotosOrder].each_with_index do |id, index|
      Photo.where(:id => id.scan(/\d+/)).update_all(:position => index+1)
    end
    render :nothing => true
  end

end
