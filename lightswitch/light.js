$(document).ready(function() {
    init();
});

var init = function() {
    $("div#art img").css({"border-width": "5px",
        "border-style": "solid",
        "border-color": "white",
        "margin-top": "20px",
        "box-shadow": '2px 2px 9px grey'});
    $("div#lightswitch").click(function() {

        $(this).toggleClass("on");
        $(this).toggleClass("flipped");

        $div = $("div#art");
        if ($(this).hasClass("on")) {
            $div.show();
            $("body").removeClass("dark");
        } else {
            $("body").addClass("dark");
            $div.hide();
        }

    });
}; 