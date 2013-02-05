$(document).ready(function() {

  $('.comment').hide();

  $('.comment-btn').click( function(e) {
    e.preventDefault();
    $(this).siblings('div.comment').slideDown()
  });

  $('#photo_image').hide();

  $('#upload-btn').click( function(e) {
    e.preventDefault();
    $('#photo_image').click();
  });

})
