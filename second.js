var sentences = [ "sentence one", "two sentence", "sentence three"];

var upper = $("#keyboard-upper-container");
var lower = $("#keyboard-lower-container");
var target = $("#target-letter");
var sentenceCounter = 0;
var characterCounter = 0;

$(document).ready(function(){
    $("#feedback").append("<span class='glyphicon glyphicon-ok' id=ok></span>");
    $("#feedback").append("<span class='glyphicon glyphicon-remove' id=remove></span>");

    $("#ok").hide();
    $("#remove").hide();
    upper.hide();
    setSentence();
    setPrompt();
    setTarget();
    $(document).on("keydown keyup", function(e){
        if (e.type === "keydown" && e.which ===  16){
            lower.hide();
            upper.show();
        }   
        if(e.type === "keyup" && e.which ===  16){
            upper.hide();
            lower.show()
        }
        var realCode = e.which;

        if(!e.shiftKey && (e.keyCode <= 65 || e.keyCode >= 90) ) {
            realCode = e.which;
        }else if(!e.shiftKey && e.which !== 32){
            realCode = e.which + 32;
        }else if (e.shift){
            realCode = e.which;
        }

        if (e.type === "keydown"){
            $("#"+realCode).css("background-color", "lavender");
        }
        if (e.type === "keyup"){
            $("#"+realCode).css("background-color", "#f5f5f5");                        
        }

        if (e.type === "keydown" && realCode !== 16){
            if(realCode === currentSentence.charCodeAt(characterCounter)){
                characterCounter++;
                glyphSet("ok");
                setPrompt();
                setTarget();

                if(characterCounter === currentSentence.length){
                    console.log(characterCounter);
                    sentenceCounter++;
                    setSentence();
                    // setPrompt();
                    // setTarget();
                    glyphSet("clear");
                    return;
                }

            }else{
                glyphSet("remove");
            }
        }

        
    });
    

});

function setTarget (){
    $(target).empty().append(currentSentence.charAt(characterCounter));
}

function setPrompt(){
    $("#letter-" + characterCounter).css("background-color", "cornflowerblue" );

    if (characterCounter!=0) {
        $("#letter-"+(characterCounter-1)).css("background-color", "white");
    }
}

function setSentence (){
    currentSentence = sentences[sentenceCounter];
    $("#sentence").empty();
    var splitSentence = currentSentence.split("");
    splitSentence.forEach(function(c, i){
        $("#sentence").append("<span id=letter-"+i+">"+c+"</span>");
    })
}

function glyphSet(answer){
    if(answer === "ok"){
        $("#ok").show();
        $("#remove").hide();
    }else if(answer === "remove"){
        $("#ok").hide();
        $("#remove").show();
    }else if(answer === "clear"){
        $("#ok").hide();
        $("#remove").hide();
    }
}