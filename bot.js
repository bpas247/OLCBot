require("dotenv").config();

// Load up the database
const { Client } = require("pg");

// Import cogs
const cogs = require("./cogs/cog.js").cogs;

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

db.connect(err => {
  if (err) {
    console.log(err);
  }
});

// Load up the discord.js library
const Discord = require("discord.js");

// Prefix
const Prefix = "!";

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

var startDate;

client.on(
  "ready",
  () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(
      `Bot has started, with ${client.users.size} users, in ${
        client.channels.size
      } channels of ${client.guilds.size} guilds.`
    );
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`Type !help for more info`);

    // set the date
    startDate = new Date();

    // create the table (if it doesn't exist)
    db.query(
      "CREATE TABLE IF NOT EXISTS birthday (id text, date text)",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);

client.on(
  "message",
  async message => {
    // This event will run on every single message received, from any channel or DM.

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if (message.content.indexOf(Prefix) !== 0) return;

    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content
      .slice(Prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    let operation = cogs.get(command);

    if(operation !== undefined) {
      if(command == "say") {
        operation(message, args);
      } else if(command == "alive") {
        operation(message, startDate);
      } else if(command == "birthday") {
        operation(message, args, client, db);
      } else {
        operation(message);
      }
    }
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);

client.login(process.env.TOKEN);
