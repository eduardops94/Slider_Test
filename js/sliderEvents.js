var mouseIsOver = null;
var startPositionX;
var finalPositionX = null;

// Add index elements in slider-index
$(".slider").each(function(index, slider){
  var images = $(slider).find(".div-img");
  var element;
  for(var i = 0; i < images.length;i++){
    if($(images).eq(i).hasClass("showing")){
      element = {
        id: slider.id+"-"+(index)+"-"+i,
        "class": 'circle-index circle-active'
      }
    }else{
      element = {
        id: slider.id+"-"+(index)+"-"+i,
        "class": 'circle-index'
      }
    }
    $('<div/>', element).appendTo($(slider).find('.slider-index'));
  }
})

// Listen the mousedown event and mouseup event in slider to create the slider effect using the mouse
$(".slider").on('mousedown touchstart', function(e){
  startPositionX = e.pageX;
  $(".slider").mousemove(function(event){
    finalPositionX = event.pageX;
  })
}).bind('mouseup touchend', function(e){
  $(".slider").off("mousemove");
  if ((startPositionX - (startPositionX / 4)) > finalPositionX && finalPositionX != null) {
    nextSlid(e.currentTarget);
  }else if((startPositionX + (startPositionX / 4)) < finalPositionX && finalPositionX != null){
    backSlid(e.currentTarget);
  }
  finalPositionX = null;
})

// Listen the click event in slider index to move to the respective slide
$(".slider").click(function(e){
  if($(e.target).hasClass("circle-index")){
    var controlerId = e.target.id;
    var index = parseInt(controlerId[controlerId.length-1]);
    goToSlide(e.currentTarget, index);
  } else if($(e.target).hasClass("slider-control")){
    if (e.offsetX < ($(e.target).width()/2)) {
      backSlid(e.currentTarget);
    } else {
      nextSlid(e.currentTarget);
    }
  }
});

// Create an interval to autoplay the slide
setInterval(function(){
  $(".slider").each(function(index, slider){
    if(!$(slider).is($(mouseIsOver))){
      nextSlid(slider);
    }
  })
}, 5000);

// Listen if the mouse is hover the slider to stop the autoplay
$(".slider").mouseenter(function(e){
  mouseIsOver = e.currentTarget;
}).mouseleave(function(){
  mouseIsOver = null;
})
