$(document).ready(function() {

  $('.comment').hide();

  $('.comment-btn').click( function(e) { 
    e.preventDefault();
    $(this).siblings('div.comment').slideDown()
  });

})
