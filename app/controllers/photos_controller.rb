class PhotosController < ApplicationController
  def index
    @photos = Photo.all
  end
  def show
    @photo = Photo.find(params[:id])
  end
  def new
   # binding.pry
    @album = Album.find(params[:album_id])
    @photo = @album.photos.build
    # @photo = Photo.new
  end

  def create
    @album = Album.find(params[:album_id])
    @photo = @album.photos.build(params[:photo])
    respond_to do |format|
      if @photo.save
        format.html { redirect_to @album, notice: 'Photo was successfully created.' }
        format.json { render :json => { :image_url => @photo.image_url(:small) }, :content_type => 'text/html'}
      else
        format.html { render action: "new" }
      end
    end
  end

  def edit
  end

  def update
  end
  
  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    respond_to do |format|
      format.html { redirect_to @photo.album }
    end
  end
  
end
