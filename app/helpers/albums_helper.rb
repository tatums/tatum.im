module AlbumsHelper


  def image_or_placeholder(album)
    if album.cover
      link_to image_tag(album.cover, class: "img-polaroid img-rounded"), album
    end
  end

end
