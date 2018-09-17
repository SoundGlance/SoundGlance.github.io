let state = "start"

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 25; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

console.log(makeid());

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function sendMessage(text){
  console.log(text)
  url = "/record?data=" + text
  httpGetAsync(url, function(){})
}

let play_audio = undefined;
function play(soundName){
  if(play_audio) play_audio.pause()
  play_audio = new Audio('audio/' + soundName)
  play_audio.play()
}

function playAndState(soundName, stateName){
  play(soundName)
  state = stateName
}

function stringEqual(a, b){return a.localeCompare(b) === 0;}

let ENTER = 13;
let SPACE = 32;

let ID = makeid()
sendMessage("Experiment has start: " + ID)

function bindEvent(element, eventName, eventHandler) {
  if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
  } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, eventHandler);
  }
};

function startSession(session_no){
  play('script_session_intro_' + session_no + '.mp3')
}

bindEvent(document, 'keydown', function(e){
  e.stopPropagation();
  let obj = window.event? event : e;
  console.log(obj.keyCode + " pressed");

  if(stringEqual(state, "start")){
    if(obj.keyCode == ENTER) playAndState('script_1.mp3', 'script_1');
  }
  else if(stringEqual(state, "script_1")){
    if(obj.keyCode == ENTER) playAndState('script_2.mp3', 'script_2');
    else if(obj.keyCode == SPACE) play('script_1.mp3');
  }
  else if(stringEqual(state, "script_2")){
    if(obj.keyCode == ENTER) playAndState('script_3.mp3', 'script_3');
    else if(obj.keyCode == SPACE) play('script_2.mp3');
  }
  else if(stringEqual(state, "script_3")){
    if(obj.keyCode == ENTER) playAndState('script_4.mp3', 'script_4');
    else if(obj.keyCode == SPACE) play('script_3.mp3');
  }
  else if(stringEqual(state, "script_4")){
    if(obj.keyCode == ENTER) playAndState('script_5.mp3', 'script_5');
    else if(obj.keyCode == SPACE) play('script_4.mp3');
  }
  else if(stringEqual(state, "script_5")){
    if(obj.keyCode == ENTER) playAndState('script_6.mp3', 'script_6');
    else if(obj.keyCode == SPACE) play('script_5.mp3');
  }
  else if(stringEqual(state, "script_6")){
    if(obj.keyCode == ENTER) playAndState('script_7.mp3', 'script_7');
    else if(obj.keyCode == SPACE) play('script_6.mp3');
  }
  else if(stringEqual(state, "script_7")){
    if(obj.keyCode == ENTER) playAndState('script_8.mp3', 'script_8');
    else if(obj.keyCode == SPACE) play('script_7.mp3');
  }
  else if(stringEqual(state, "script_8")){
    if(obj.keyCode == ENTER) startSession(1)
    else if(obj.keyCode == SPACE) play('script_8.mp3');
  }
})


/*
const expiredDate = new Date();
expiredDate.setHours(expiredDate.getHours() + 3);

window.onload = function() {
  // save index as cookie
  updateCookie(0);
}

function updateCookie(i) {
    document.cookie = "current=" + i + ";expires=" + expiredDate.toUTCString(); + "domain=soundglance.github.io;path=/";
}
*/
