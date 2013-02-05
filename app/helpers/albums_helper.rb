module AlbumsHelper

  def image_or_placeholder(album)
    if album.cover
      link_to image_tag(album.cover, class: "img-polaroid img-rounded"), album
    else
      link_to(image_tag("http://placehold.it/300x150", alt: album.name, class: "img-polaroid img-rounded placeholder" ), album)
    end
  end

end
