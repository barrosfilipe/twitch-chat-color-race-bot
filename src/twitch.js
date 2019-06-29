require("dotenv").config();
require("./requirements");

const TwitchBot = require("twitch-bot"),
  port = process.env.PORT || 3000,
  socket = require("socket.io-client")("http://localhost:" + port);

/* .env data to AUTH Bot on Twitch */
const Bot = new TwitchBot({
  username: process.env.TWITCH_USER,
  oauth: process.env.TWITCH_OAUTH_TOKEN,
  channels: [process.env.TWITCH_USER]
});

/* Join to desired channel */
Bot.on("join", channel =>
  console.log(
    "Twitch bot joined channel: https://www.twitch.tv/" +
      process.env.TWITCH_USER
  )
);

/* If error! No idea what kinda of errors does it print out ¯\_(ツ)_/¯ */
Bot.on("error", err => console.error(err));

/*  Create command color vote object and send to Socket.io server */
const sendUserColorVote = (user, color) => socket.emit("vote", { user, color });

/* Bot says commands to vote */
socket.on("say-go", _ =>
  Bot.say(
    "Race ready to vote PogChamp Type !white, !green, !yellow, !blue or !red to chose your team."
  )
);

socket.on("say-winner", winner => Bot.say(`Team ${winner} is the winner!`));

/* Check for messages containing desired commands */
Bot.on("message", chatter => {
  if (chatter.message.match(/!white|!green|!yellow|!blue|!red/g)) {
    sendUserColorVote(chatter.username, chatter.message);
  }
});
