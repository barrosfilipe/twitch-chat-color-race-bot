/*
  [Note]: This whole file needs code refactoring, feel free to contribute!
  I didn't want to spend so much time doing that so I did as fast as I could, just to get it working.
  (Please, do code refactoring! *VueJS* Would be a good fit, becuase it's simple and easy)
*/

/* Connect to socket.io server */
var socket = io();

/* Add DOM elements to variables */
var countdownClock = document.querySelector("#countdown");
var startVote = document.querySelector("#start-vote");

/* Listen to click event on "Start Vote" button */
startVote.addEventListener("click", function() {
  if (!startVote.classList.contains("disabled")) {
    music.pause();
    music.currentTime = 0;

    socket.emit("start-vote");
    startVote.classList.add("disabled");
    document.querySelector("#hare").style.width = "125px";
    document.querySelector("#tortoise").style.width = "125px";
    document.querySelector("#corgi").style.width = "125px";
    document.querySelector("#cockatiel").style.width = "125px";
    document.querySelector("#pig").style.width = "125px";
    document.querySelector("#hare_px").textContent = "125px";
    document.querySelector("#tortoise_px").textContent = "125px";
    document.querySelector("#corgi_px").textContent = "125px";
    document.querySelector("#cockatiel_px").textContent = "125px";
    document.querySelector("#pig_px").textContent = "125px";
    document.querySelector("#white_count").textContent = "0";
    document.querySelector("#green_count").textContent = "0";
    document.querySelector("#yellow_count").textContent = "0";
    document.querySelector("#blue_count").textContent = "0";
    document.querySelector("#red_count").textContent = "0";
    document.querySelector("#list").innerHTML = "";
    document.querySelector("#winner").textContent = "";
  }
});

/* (Socket.io) Get all votes while countdown time is running */
var list = document.querySelector("#list");

socket.on("vote", function(vote) {
  var index = vote.length - 1;

  list.insertAdjacentHTML(
    "afterbegin",
    `
    <li class="twitch-name">
      <span class="${vote[index].color.replace(
        "!",
        ""
      )}" style="border: 1px solid #d0d3cf">
        &nbsp;&nbsp;&nbsp; </span
      >&nbsp;${vote[index].user}
    </li>
  `
  );

  var count = document.querySelector(
    "#" + vote[index].color.replace("!", "") + "_count"
  );
  count.textContent = parseInt(count.textContent) + 1;
});

/* (Socket.io) Get countdown time and display on screen */
socket.on("countdown", function(counter) {
  countdownClock.textContent = counter;

  if (counter === 3) {
    countdownSound.volume = 0.1;
    countdownSound.play();
  }
});

function raceManager(animal_id) {
  var animalElement = document.querySelector("#" + animal_id);
  var calcPixelSpeed = Math.floor(Math.random() * 10) + 10;
  var speed = animalElement.offsetWidth + calcPixelSpeed;
  var animalElementPixels = document.querySelector("#" + animal_id + "_px");

  if (!document.querySelector("#winner").textContent) {
    if (animalElement.offsetWidth < 600) {
      if (speed >= 600) {
        speed = 600;
        document.querySelector("#winner").textContent = "Wins!";
        animalElement.style.width = `${speed}px`;
        animalElementPixels.textContent = "WINNER !";
        socket.emit("say-winner", animal_id);

        setTimeout(function() {
          startVote.classList.remove("disabled");
          disabledButtonEffects = false;
          winner.play();
        }, 300);
      } else {
        animalElement.style.width = `${speed}px`;
        animalElementPixels.textContent = `${speed}px`;
        var addSpeedTimeout = Math.floor(Math.random() * 2000);
        setTimeout(function() {
          raceManager(animal_id);
        }, addSpeedTimeout);
      }
    }
  }
}

function start() {
  raceManager("hare");
  raceManager("tortoise");
  raceManager("corgi");
  raceManager("cockatiel");
  raceManager("pig");
}

socket.on("go", function() {
  start();
  music.play();
});
