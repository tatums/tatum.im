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



  function setMouseOver(){

    $('.controls a').hide()
    $(".thumbnails li").mouseover(function() {
      $(this).find('.controls a').show();
    }).mouseout(function(){
      $(this).find('.controls a').hide();
    });
  }


})
