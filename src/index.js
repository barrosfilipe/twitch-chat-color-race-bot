const express = require("express"),
  app = express(),
  http = require("http").createServer(app),
  io = require("socket.io")(http),
  twitchUsersColorVotes = [],
  port = process.env.PORT || 3000;

/* Twitch Bot */
require("./twitch.js");

/* Serve public folder */
app.use("/", express.static(__dirname + "/public"));

/* Countdown clock manage variable */
let countdownClock;
let stopTimerSocketRefresh;

/* Start countdown clock to enable vote */
function startCountdown(time) {
  if (!stopTimerSocketRefresh) {
    io.emit("countdown", time);
    if (time > 0) {
      setTimeout(_ => startCountdown(--time), 1000);
    } else {
      io.emit("go");
    }
    countdownClock = time;
  } else {
    countdownClock = null;
  }
}

/* Check if twitch user have already voted */
const userAlreadyVoted = user =>
  twitchUsersColorVotes.some(votes => votes.user === user);

io.on("connection", socket => {
  socket.on("vote", chatMessage => {
    /* Only enable vote while countdown clock time is greater than (0) */
    if (countdownClock > 0) {
      if (!userAlreadyVoted(chatMessage.user)) {
        twitchUsersColorVotes.push(chatMessage);
        io.emit("vote", twitchUsersColorVotes);
      }
    }
  });

  socket.on("say-winner", winner => {
    switch (winner) {
      case "hare":
        io.emit("say-winner", "white");
        break;
      case "tortoise":
        io.emit("say-winner", "green");
        break;
      case "corgi":
        io.emit("say-winner", "yellow");
        break;
      case "cockatiel":
        io.emit("say-winner", "blue");
        break;
      case "pig":
        io.emit("say-winner", "red");
        break;
    }
  });

  /* Listen to Start Vote button from public/index.html over Socket.io */
  socket.on("start-vote", _ => {
    io.emit("say-go");
    twitchUsersColorVotes.length = 0;
    stopTimerSocketRefresh = false;
    startCountdown(5);
  });

  socket.on("disconnect", _ => (stopTimerSocketRefresh = true));
});

/* Start express + socket.io server */
http.listen(port, _ => {
  console.log("Game is running on http://localhost:" + port);
});
