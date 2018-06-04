$('body').mouseover(function(){
  $(this).css({cursor: 'none'});
});

$(document).on('mousemove', function(e){
  $('#cursor').css({
    left:  e.pageX,
    top:   e.pageY
  });
});

var whichStamp = true;
var soTrue = function(){
  whichStamp = true;
  $('#cursor-text').html('so</br>true');
  $('#so-true').css('opacity', '1');
  $('#nah').css('opacity', '0.3');
};

var nah = function(){
  whichStamp = false;
  $('#cursor-text').html('nah');
  $('#so-true').css('opacity', '0.3');
  $('#nah').css('opacity', '1');
}