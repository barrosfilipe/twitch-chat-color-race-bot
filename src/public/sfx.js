var buttonEnter = new Audio("sfx/button-enter.wav");
var buttonLeave = new Audio("sfx/button-leave.wav");
var buttonClick = new Audio("sfx/button-click.wav");
var countdownSound = new Audio("sfx/countdown.wav");
var music = new Audio("sfx/music.mp3");
var winner = new Audio("sfx/winner.mp3");

var disabledButtonEffects = false;

function clickPlayButton() {
  buttonClick.play();
  disabledButtonEffects = true;
}

function enterPlayButton() {
  if (!disabledButtonEffects) {
    buttonEnter.play();
    buttonLeave.pause();
    buttonLeave.currentTime = 0;
  }
}

function leavePlayButton() {
  if (!disabledButtonEffects) {
    buttonLeave.play();
    buttonEnter.pause();
    buttonEnter.currentTime = 0;
  }
}
