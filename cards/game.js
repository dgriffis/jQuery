//this is my hash of images
myImages={'cheese':'//localhost:31338/cards/images/cheese.gif',
          'eggs':'//localhost:31338/cards/images/eggs.gif',
          'blender':'//localhost:31338/cards/images/kitchen_blender.gif',
          'tea':'//localhost:31338/cards/images/tea.gif',
          'colander':'//localhost:31338/cards/images/kitchen_collander.gif',
          'teapot':'//localhost:31338/cards/images/kitchen_teapot.gif'};
//array of numbers that represent the slots
var index = [0,1,2,3,4,5,6,7,8,9,10,11];
var indexImg = [];
//sort function for the array found out on the internet
Array.prototype.sortShuffle = function() {
    this.sort(function(){
        return Math.round(Math.random()) - 0.5;
    });
};

//Game score
totalScore=0;

//function to assign an image to a slot
function initRows() {
  //shuffle the slots
  index.sortShuffle();
  //reset score
  totalScore=0;
  // assign a slot an image - each image will have two slots
  i=0;
  for (var k in myImages) {
    //assign a single image to two slots in th indexImg array
    console.log('The image to be displayed in slot ' + index[i] + " is " + myImages[k]);
    indexImg[index[i]]=myImages[k];
    i++;
    console.log('The image to be displayed in slot ' + index[i] + " is " + myImages[k]);
    indexImg[index[i]]=myImages[k];
    i++;
  };
  i=0;
  //append an image to a row div
  $(".row").each(function(){
    $(this).children().each(function() {
       //build an id for the img element
       imgSlot = 'imgSlot' + i;
       //get an image reference
       imgVal = indexImg[i];
       //remove anything that may be there from a previous game
       $(this).children().remove();
       //append a new  image
       $(this).append("<img id="+imgSlot + " src=" + imgVal + " />");
       //hide the images
       $("#"+imgSlot).addClass('hidden');
       //bump the index within this loop
       i++;
    });
  });
};


function playGame(e) {

  //check the case of clicking on a visible image that is 'done'
  if ( $(this).find('img').hasClass( "done" ) ) {
    return;
  };

  //get the img element as a jQuery var
  $img = $(this).find('img');

  //Make the image visible
  $img.removeClass('hidden');
  $img.addClass('visible');

  //get it's src attr
  selectedImg = $img.attr("src");

  //see if there is another img element - look for class visible
  var $imgs = $('img.visible' );
  arr = [];
  foundImg = "";
  $imgs.each(function () {
   foundImg = $(this).attr('src');
   arr.push(foundImg);
  });

  if (arr.length == 1 ){
    //if there is just one img with class visible - then we need go no further
    return;
  }else if (arr.length == 2 ){
    //check to see if we have a match
    if (arr[0] === arr[1]){
      //bump the score
      totalScore+=2;
      //these images are the same so mark them as done
      $imgs.each(function() {
        $(this).removeClass("visible");
        $(this).addClass("done");
      });
    } else{
      //not a match so decrement the score
      totalScore-=1;
    }
  } else if ( arr.length == 3 ){
    //hide all but the selected
    $imgs.each(function() {
    if ($(this).attr('id') != $img.attr('id')) {
      $(this).removeClass("visible");
      $(this).addClass("hidden");
      }
    });
  };

  //see if the game is over and display score if so
  var count = $('.done').length;
  if (count == 12){
    alert('The game is over and your score is ' + totalScore.toString() );
  };
};

$(document).ready(function() {
  //set the images to the 3x4 rows
  initRows();

  //set a click handler for "Play Again" button
  $(":button").click(initRows);

  //set a click handler for clicking on a div that contains an img
  $("div.row > div").click(playGame);

});
