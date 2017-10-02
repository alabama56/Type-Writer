var key = document.getElementsByClassName("key")
var myId = $(key).attr('id');
var id = Number(myId);
// var keyId = span.id;
// // var id = Number(keyId)

$(document).ready(function(){
    $("#keyboard-upper-container").hide();
    $(document).keydown(function(e){
        if(e.which === 16) {
            $("#keyboard-upper-container").show();
            $("#keyboard-lower-container").hide();
        }
    });
    $(document).keyup(function (e){
        if(e.which === 16) {
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();
        }
    });
    $(document).keypress(function (e){
       $('#' + e.which).css("background-color", "teal");
       
    });
    // $(document).keyup(function (e){
    //     $('#' + e.which).css("background-color", "#f5f5f5");
    // });

});