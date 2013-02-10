module AlbumsHelper

  def image_or_placeholder(album)
    if album.cover
      link_to image_tag(album.cover.image_url(:cover), class: ""), album
    else
      link_to(image_tag("http://placehold.it/300x150", alt: album.name, class: "placeholder" ), album)
    end
  end

end
