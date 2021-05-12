var carlingue = document.getElementById("carlingue");
var recognizing;

// do not forget to change carlingue.ontouchend or onclicked accordingly
var testingOnPC = false;

// initialize speech SpeechRecognition
var sr = new webkitSpeechRecognition();
sr.lang = 'de-DE';
sr.maxAlternatives = 1;
sr.continuous = true;
reset();
sr.onend = reset();

sr.onresult = function (event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
        if(testingOnPC){
            console.log(event.results[i][0].transcript);
          }else{
            alert(event.results[i][0].transcript);
          }
    }
  }
}

function reset() {
    recognizing = false;
}

function toggleStartStop() {
  if (recognizing) {
      if(testingOnPC){
        console.log("stop listening");
      }else{
        alert("stop listening");
      }
    
    sr.stop();
    reset();
  } else {
    if(testingOnPC){
        console.log("start listening");
      }else{
        alert("start listening");
      }
    sr.start();
    recognizing = true;
  }
}

// for smart phone
carlingue.ontouchend = function () {
// for pc
//carlingue.onclick = function () {
  toggleStartStop();
}