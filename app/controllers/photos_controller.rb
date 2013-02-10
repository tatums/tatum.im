class PhotosController < ApplicationController
  before_filter :require_user

  def index
    @photos = Photo.all
  end

  def show
    @photo = Photo.find(params[:id])
  end

  def new
    @album = Album.find(params[:album_id])
    @photo = @album.photos.build
  end

  def create
    @album = Album.find(params[:album_id])
    @photo = @album.photos.build(params[:photo])
    @photo.user = current_user
    respond_to do |format|
      if @photo.save
        format.html { redirect_to @album, notice: 'Photo was successfully created.' }
        format.js
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

  def set_cover
    @album = Album.find(params[:album_id])
    @photo = Photo.find(params[:id])
    @album.set_cover(@photo)
    respond_to do |format|
      format.html { redirect_to @album, notice: 'Photo cover was successfully saved.'  }
    end
  end


end
