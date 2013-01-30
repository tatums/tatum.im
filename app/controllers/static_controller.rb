class StaticController < ApplicationController
  def home
  end

  def portfolio
  end

  def me
    @person = GooglePlus::Person.get(100854934228440516707)
    @items = @person.list_activities.items
    @urls = @items.collect{ |i| { :url => i.url, :published => i.published} }
  end
end
