$(document).ready(function() {
    //a selector that will tell me if I've hovered over 
    //over the top level menu - the first function is executed when I nouseover and drops the submenu
    //The second function is for the opposite action
    $("ul.menu > li").hover(
        function(){
            $(this).find('ul.submenu').stop().css({visibility: "visible",display: "none"}).show(400);
        },
        function(){
            $(this).find('ul.submenu').stop().css({visibility: "hidden"});
        });
    //This is a click handler on the submenu
    $("ul.submenu").click(changeDivCSS);
});

function changeDivCSS(e) {
//this is the click handler for when a submenu is clicked
    //get me some text
    targetText =  $(e.target).text()
    
    //if this is the color menu then I can just apply the
    //targetText variable to the div since I know it's a color
    if (this.id == "color") {
        $('div').css({"backgroundColor":targetText});
    }
    else {
    //if it's not a colr then it's a shape so test for Circle
    // and apply the border-radius accordingly
        if (targetText === "Circle") {
            size = $('div').width() / 2;
            $('div').css({"border-radius":size + 'px'});
        } else {
            $('div').css({"border-radius":"0px"});
        }
    }
}