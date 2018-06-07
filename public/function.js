var is_touch_device = function() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
};

var desktopCursor = function(){
  if (!is_touch_device()) {
    $('body').mouseover(function(){
      $(this).css({cursor: 'none'});
    });

    $(document).on('mousemove', function(e){
      $('#cursor').css({
        left:  e.pageX,
        top:   e.pageY
      });
    });
  } else {
    $('#cursor').css('display', 'none');
  }
};
/*
$('body').mouseover(function(){
  $(this).css({cursor: 'none'});
});

$(document).on('mousemove', function(e){
  $('#cursor').css({
    left:  e.pageX,
    top:   e.pageY
  });
});
*/
var whichStamp = true;
var soTrue = function(){
  whichStamp = true;
  if (!is_touch_device()){
    $('#cursor-text').html('so</br>true');
  }
  $('#so-true').css('opacity', '1');
  $('#nah').css('opacity', '0.3');
};

var nah = function(){
  whichStamp = false;
  if (!is_touch_device()) {
    $('#cursor-text').html('nah');
  }
  $('#so-true').css('opacity', '0.3');
  $('#nah').css('opacity', '1');
};

// reload when changed orientation or resized

window.addEventListener('orientationchange', function(){
  location.reload();
});
window.addEventListener('resize', function(){
  location.reload();
});

//

$(document).ready(function(){
    is_touch_device();
    desktopCursor();
});