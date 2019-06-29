const fs = require("fs");

/* Check if .env file exists */
if (!fs.existsSync(".env")) {
  console.error(
    "File .env not found! Create a .env file following the .env.example file."
  );
  process.exit();
}

/* Check if .env contains all required variables */
if (!process.env.TWITCH_USER || !process.env.TWITCH_OAUTH_TOKEN) {
  console.error("Check your .env file, something is missing!");
  process.exit();
}
