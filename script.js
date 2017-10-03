var key = document.getElementsByClassName("key")
var sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
var num = 0;

var sentenceCounter = 0;
var characterCounter = 0;
var sentenceDiv = $("#sentence");
var targetDiv = $("#target-letter")
var n = sentences[sentenceCounter].charAt(num++);
var span = $("span")
   
$(document).ready(function(){
    $("#keyboard-upper-container").hide();
    
    $("<span class='glyphicon glyphicon-ok'></span>").appendTo("#feedback");
    $("<span class='glyphicon glyphicon-remove'></span>").appendTo("#feedback");
    $(".glyphicon-ok").hide();
    $(".glyphicon-remove").hide();
    setSentence();
    promptHighlight();
    
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
    $(document).keydown(function (e){
        if(e.keyCode != 16){
            if(e.keyCode >= 65 && e.keyCode <= 90){
                if(e.shiftKey){
                    $('#' + e.which).css("background-color", "teal");
                }else{
                $('#' + (e.which+32)).css("background-color", "teal"); 
                }
            }else {
            $('#' + e.which).css("background-color", "teal");
            }
        }
    });
    $(document).keyup(function (e){
        if(e.keyCode != 16){
           if(e.keyCode >= 65 && e.keyCode <= 90){
               if(e.shiftKey){
                   $('#' + e.which).css("background-color", "#f5f5f5");
               }else{
               $('#' + (e.which+32)).css("background-color", "#f5f5f5"); 
               }
           }else {
           $('#' + e.which).css("background-color", "#f5f5f5");
           }
        }
   });

   $(targetDiv).text(n);
   
   $(document).keypress(function (e){
      
      var x = String.fromCharCode(e.which);
        if(x === n){
            n = sentences[0].charAt(num++);
            $(targetDiv).text(n);
            characterCounter++;
            promptHighlight();
            
           
            
            glyphOK();
          
        }else if(x != n){
            glyphRemove();
        }
        if($("#sentence, span").is(":last-child")){
            alert("hell");
            // sentenceCounter = 1;
            // setSentence();
        }
       

        
   
   });
});



function promptHighlight(){
    $("#letter-"+characterCounter).css("background-color", "yellow");
    if (characterCounter!=0) {
        $("#letter-"+(characterCounter-1)).css("background-color", "white");
    }
}

function setSentence(){
    var sentenceString = sentences[sentenceCounter];
    var sentenceSplit = sentenceString.split("");
    for (var i = 0; i<=sentenceString.length-1; i++) {
        $("<span id=letter-"+i+">"+sentenceSplit[i]+"</span>").appendTo(sentenceDiv);
        
    }
}

function glyphOK(){
    $(".glyphicon-ok").show();
    $(".glyphicon-remove").hide();
}

function glyphRemove(){
    $(".glyphicon-remove").show();
    $(".glyphicon-ok").hide();
}

function noGlyph() {
    $(".glyphicon-ok").hide();
    $(".glyphicon-remove").hide();
}

