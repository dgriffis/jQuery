
function startButtonClicked() {

  //find the current text of the button and set the new display
  newText = $(this).val() === 'start' ? 'stop' : 'start';
  $(this).prop('value', newText);
  //call loop function that will check the value of the button text
  loopImgs()
}

function loopImgs() {
  //get the text on the button
  bText =  $(":button").val();
  //if the text is now start then we do not
  //want to continue since the text was just changed from stop
  if (bText === 'start'){
    return;
  } else {
    //else set a timeout callback
    setTimeout(loopImgs, 1500);
    //and in the interim change the image
    changeDiv();
  };
}

function changeDiv() {
  //this is the fadein/fadeout of images in the container
  //the changeImg() function will reorder the z index
  $("#container").fadeOut("fast", function() {
    changeImg();
    $("#container").fadeIn("slow");
  });
};

function changeImg() {
  //get the images div
  $imgs = $("#images")
  //which photo is at the top?
  var top = $imgs.children(".top").index();
  //how many images are there?
  var totImages=$imgs.children().length;
  //make the top hidden
  $imgs.children().eq(top).removeClass("top");
  $imgs.children().eq(top).addClass("hidden");
  //make the next(or first) image top
  top = top+1 == totImages ? 0 : top+=1
  $imgs.children().eq(top).addClass("top");
  $imgs.children().eq(top).removeClass("hidden");
  //get the caption of the image and set into caption div
  var textCaption = $imgs.children().eq(top).attr('alt');
  $("#caption").html(textCaption);
};


$(document).ready(function() {

  //set a click handler for "start" button
  $(":button").click(startButtonClicked);

});
