//Remove all class used to control the slider and make all slides be hidded
function removeControlClass(images){
  $(images).removeClass("back").removeClass("next").removeClass("showing").addClass("hidded");
}

//Switch off the last active index and set the new active index in the slider index
function setActiveSlide(slider, sliderIndex, newIndex){
  $($(slider).find(".slider-index")).find(".circle-active").removeClass("circle-active");
  $("#"+slider.id+"-"+(sliderIndex)+"-"+newIndex).addClass("circle-active");
}

//Check if is a position valid in the images array, if is invalid return a right position
function checkPosition(images, position){
  if(position < 0){
    return images.length - 1
  }
  if(position == images.length){
    return 0
  }
  return position;
}

//Set the slide control class used to control which slide is showing and the next and the back slides
function setPosition(images, backIndex, showIndex, nextIndex){
  // Set the showing position
  $(images.eq(showIndex)).removeClass("hidded").addClass("showing");
  // Set the back position
  $(images.eq(backIndex)).addClass("hidded").addClass("back");
  // Set the next position
  $(images.eq(nextIndex)).addClass("hidded").addClass("next");
}

//Return the element position in an array
function getElementPosition(array, element){
  return $(array).index(element);
}

//Change the showing slide
function changeSlide(images, backIndex, showIndex, nextIndex){
  // Check if the future positions exist
  backIndex = checkPosition(images, backIndex);
  showIndex = checkPosition(images, showIndex);
  nextIndex = checkPosition(images, nextIndex);

  removeControlClass(images);

  setPosition(images, backIndex, showIndex, nextIndex);
}

//Go to the back slide
function backSlid(currentSlider){
  var sliders;
  if(currentSlider.id == null || currentSlider.id == undefined || currentSlider.id == ""){
    sliders = $(currentSlider);
  }else{
    sliders = $("div[id='"+currentSlider.id+"']");
  }
  sliders.each(function(index, slider){
    var images = $(slider).find(".div-img");

    // Get future positions
    var backIndex = getElementPosition(images, $(slider).find(".back")) - 1;
    var showIndex = getElementPosition(images, $(slider).find(".showing")) - 1;
    var nextIndex = getElementPosition(images, $(slider).find(".next")) - 1;

    setActiveSlide(slider, index, checkPosition(images, showIndex));
    changeSlide(images, backIndex, showIndex, nextIndex);
  })
}

//Go to the next slide
function nextSlid(currentSlider){
  var sliders;
  if(currentSlider.id == null || currentSlider.id == undefined || currentSlider.id == ""){
    sliders = $(currentSlider);
  }else{
    sliders = $("div[id='"+currentSlider.id+"']");
  }
  sliders.each(function(index, slider){
    var images = $(slider).find(".div-img");

    // Get future positions
    var backIndex = getElementPosition(images, $(slider).find(".back")) + 1;
    var showIndex = getElementPosition(images, $(slider).find(".showing")) + 1;
    var nextIndex = getElementPosition(images, $(slider).find(".next")) + 1;

    setActiveSlide(slider, index, checkPosition(images, showIndex));
    changeSlide(images, backIndex, showIndex, nextIndex);
  })
}

//Go to an specific slide
function goToSlide(currentSlider, newIndex){
  var sliders;
  if(currentSlider.id == null || currentSlider.id == undefined || currentSlider.id == ""){
    sliders = $(currentSlider);
  }else{
    sliders = $("div[id='"+currentSlider.id+"']");
  }
  sliders.each(function(index, slider){
    var images = $(slider).find(".div-img");
    removeControlClass(images);
    setActiveSlide(slider, index, newIndex);
    setPosition(images, checkPosition(images, (newIndex - 1)), checkPosition(images, newIndex), checkPosition(images, (newIndex + 1)));
  })
}
