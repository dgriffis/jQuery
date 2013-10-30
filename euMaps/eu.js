function setMapPoints(data){
  //slider globals
  var currentSlide = 0; var nextSlide = 1;
  //add data points to the map div
  $.each(data, function(i, row){
    var rate = row['rate'];

    //values for rate below 5
    var sizeWidth = 20;
    var halfSizeWidth = sizeWidth / 2; //border-radius value for circle
    var color = '#ccffff'; //baby blue

    if ( rate >= 5 && rate < 10 ){
      //navy blue
      color = '#000084';
      sizeWidth += 10;
      halfSizeWidth = sizeWidth/2;
    } else if ( rate >= 10 && rate < 15 ){
      //purple
      color = '#663399';
      sizeWidth += 20;
      halfSizeWidth = sizeWidth/2;
    } else if ( rate >= 15 ){
      //orange
      color = '#ffa500';
      sizeWidth += 30;
      halfSizeWidth = sizeWidth/2;
    }

    //now set the data points
    $this = $("<a class='dataPt'><span class='dataDetail'></span><span class='rate'></span></a>")
      .appendTo('#map')
      .css({ width:sizeWidth + 'px',
             height:sizeWidth + 'px',
             left:row['x'],
             top:row['y'],
             "border-radius":halfSizeWidth + 'px',
             "background-color":color});
    $this.find('.dataDetail').text(row['country']+' ('+ row['year'] +')');
    $this.find('.rate').text(rate);
  });
}

function resizeDataPts() {
  $(".dataPt").each(function() {
    var id = $(this).attr("id");
    var newSize = data[id].rate * multiplier;
    $(this).animate({
      width: newSize,
      height: newSize
    }, "fast");
  });

}

function updateValues(event,ui){
  //get current values of slider
  currentSlide = $("#slider").slider("value");
  nextSlide = ui.value;
  //save off current
  var val = currentSlide;

  //determine if we want the circles larger or smaller
  if ( currentSlide > nextSlide) {
    val = -Math.abs(val)
  }

  $(".dataPt").each(function( index ) {
    //reset width-height-border-radius of each point
    var curWidth = $(this).width();
    var newWidth = curWidth + val;
    var newHalfWidth = newWidth / 2;
    $(this).css("width", newWidth);
    $(this).css("height", newWidth);
    $(this).css("border-radius", newHalfWidth)
  });

}


$(document).ready(function() {

  $.ajaxSetup({ cache: false });
  $.getJSON("http://localhost:31338/eu.json")
    .success(function(data) {
      setMapPoints(data);
    })
    .error(function() {
      alert("Couldn't load json data");
    })
    .complete(function(xhr, status) {
      // run after success or error
      console.log("Status: " + status);
    });

  //add hover functions for data points
  $('#map').on('mouseenter','.dataPt',function() {

    var x=$(this).offset();
;
    //get the detail class and fade it in
    $detail = $(this).find('.dataDetail').fadeIn();

    $detail.offset(function(n,c){
      newPos=new Object();
      newPos.left=c.left+20;
      newPos.top=c.top+20;
      return newPos;
    });

    //add the border class
    $(this).addClass('dataPtHover');
    //get the rate from the rate class
    $rate = $(this).find('.rate')
    //update the slider div span
    $('#detail').find('span').text('Unemployment rate: ' + $rate.text());
  });

  $('#map').on('mouseleave','.dataPt',function() {
    //remove the border class
    $(this).removeClass('dataPtHover');
    //fade out the div class
    $(this).find('.dataDetail').fadeOut();
  });

  //initialize the slider

  $("#slider").slider({
    max: 7,
    min: 1,
    range: "min",
    value: multiplier,
    slide: function(evt, ui) {
      if (multiplier != ui.value) {
        multiplier = ui.value;
        resizeDataPts();
      }
    }
  });




});
