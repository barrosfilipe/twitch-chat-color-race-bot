<p align="center"><img src="https://i.imgur.com/PnVUfJM.png"></p>
<h1 align="center">A Twitch.tv Chat Bot Racing Game</h1>

<p align="center">You click <b>Start Vote</b> and your audience can use a command to vote in wich color to win.</p>

<h3 align="center">It uses <i>Express</i>, <i>Socket.io</i> and <i>Twitch API</i></h3>

## Usage

Clone this repository `git clone https://github.com/barrosfilipe/twitch-chat-color-race-bot.git`

Access the project directory `cd twitch-chat-color-race-bot`

Install dependencies running `yarn` or `npm install`

Configure your `Twitch.tv` **OAUTH** `user` and `token`. Follow the instructions on file `.env.example`

Run the project running `yarn start` or `npm start`

Access `http://localhost:3000`

## Playing the game

You click `Start Vote` and your audience have a `30 seconds` countdown to `pick/vote` a color `!white`, `!green`, `!yellow`, `!blue` or `!red`.

**When there's no time remaining `0 seconds` the race starts!**

## Plans for the future

Package the project into an `Electron Application` for `Windows`, `Mac` and `Linux` and create an interface for
`end users` put their `Twitch.tv OAUTH credentials` more easily.

## Project Diagram

<p align="center"><img src="https://i.imgur.com/avH78E7.png"></p>

## We need your help!

Feel free to contribute and add `new features` to the game as well as do `code refactoring`
