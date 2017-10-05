var upper = $("#keyboard-upper-container");
var lower = $("#keyboard-lower-container");

$(document).ready(function(){
    upper.hide();
    $(document).on("keydown keyup", function(e){
        if (e.type === "keydown" && e.which ===  16){
            lower.hide();
            upper.show();
        }
    });
    $(document).keyup(function(e){
        if(e.type === "keyup" && e.which ===  16){
            upper.hide();
            lower.show()
        }
    });

});

