class Blog
  require 'rss'

  def items
    atom_feed.items.map do |item|
      OpenStruct.new(title: item.title.content,
                     link: item.link.href,
                     content: item.content.content,
                     updated_at: item.updated.content)
    end
  end

#  private

  def atom_feed
    @atom_feed ||= RSS::Parser.parse("http://tatums.github.io/atom.xml")
  end

end
