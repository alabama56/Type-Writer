var key = document.getElementsByClassName("key")
var sentences = [ 'This is my first sentence look at you go',
'wow now you are on sentence two you stud', 'okay three sentences is probably enough', 'you are almost to the finish line you sexy thing'];
var num = 0;
var numberOfWords = 34;
var numberOfMistakes= 0;
var sentenceCounter = 0;
var characterCounter = 0;
var sentenceDiv = $("#sentence");
var targetDiv = $("#target-letter")
var n = sentences[sentenceCounter].charAt(num++);
var span = $("span");
var timestamp = null;

// var sentenceString;
// var sentenceSplit;
// function start(){
//     interval_timer = setInterval(function(){
//       timer ++;
//       wpm = Math.round(numberOfWords / (timer / 60) - (2 * numberOfMistakes));
//     }, 1000)
// }
function calcWPM() {
    
    var endTimestamp = new Date().getTime();

    var elapsedTime = (endTimestamp - timestamp) / 1000;

    var wordsArray = [];

    sentences.forEach(function(s) {
        wordsArray.push(s.split(' '));
    });

    var flattened = [].concat.apply([], wordsArray);

    var numberOfWords = flattened.length;

    return Math.round(numberOfWords / (elapsedTime / 60) - (2 * numberOfMistakes));
}

function correctKey(reset){
    if (reset) {
        characterCounter = 0;
    } else {
        characterCounter++;
    }
    
    n = sentences[sentenceCounter].charAt(characterCounter);
    $(targetDiv).text(n);
    promptHighlight();
}

function promptHighlight(){
    $("#letter-"+characterCounter).css("background-color", "yellow");

    if (characterCounter!=0) {
        $("#letter-"+(characterCounter-1)).css("background-color", "white");
    }
    
}

function setSentence(){
    var sentenceString = sentences[sentenceCounter];
    

    if(sentenceString === undefined){
        var wpm = calcWPM();

        
        var playAgain = confirm("Do you want to play agin? Your WPM is " + wpm);
        if(playAgain === true){
            reset();
            
        }
        return;
    }
    var sentenceSplit = sentenceString.split("");

    for (var i = 0; i<=sentenceString.length-1; i++) {
        $("<span id=letter-"+i+">"+sentenceSplit[i]+"</span>").appendTo(sentenceDiv);
     
    } 
  
   
}

// function endGame(){
//     if(sentenceString === undefined){
//     confirm("Do you want to play agin?")
//     }
// }

function reset(){
    sentenceCounter = 0;
    characterCounter = 0;
    targetDiv.empty();
    sentenceDiv.empty();
    promptHighlight();
    setSentence();
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
   
$(document).ready(function(){
    // var sentenceSplit;
    // var sentenceString;
   
    $("#keyboard-upper-container").hide();
    $("<span class='glyphicon glyphicon-ok'></span>").appendTo("#feedback");
    $("<span class='glyphicon glyphicon-remove'></span>").appendTo("#feedback");
    $(".glyphicon-ok").hide();
    $(".glyphicon-remove").hide();
    setSentence();
    
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
   promptHighlight();
   
   $(document).keypress(function (e){
    if(timestamp === null){
        timestamp = new Date().getTime();
    }
        

        var x = String.fromCharCode(e.which);
            if(x === n){
                glyphOK();

                if(characterCounter===sentences[sentenceCounter].length - 1){
                    noGlyph();
                    sentenceDiv.empty();
                    sentenceCounter++;                   
                    setSentence();
                    correctKey(true); 
                    return;
                }

                correctKey();

            }else if(x != n){
                numberOfMistakes++;
                // console.log(numberOfMistakes);
                glyphRemove();
                
            }  
    });
});
