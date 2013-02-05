# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

jQuery ->
  $('#photo_image').fileupload
    dataType: "script"
    done: (e, data) ->
      id = data.files[0].name
      $('#'+id).hide()
    add: (e, data) ->
      id = data.files[0].name
      data.context = $('<div id="'+id+'" class="progress progress-striped"><div class="bar"></div></div>')
      $('#target').prepend(data.context)
      data.submit()
    progress: (e, data) ->
      if data.context
        progress = parseInt(data.loaded / data.total * 100, 10)
        data.context.find('.bar').css('width', progress + '%')

