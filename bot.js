require("dotenv").config();

// Load up the database
const { Client } = require("pg");

// Import cogs
const cogs = require("./cogs/cog").cogs;

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

    // create the table for storing the last time it has ran
    db.query(
      "CREATE TABLE IF NOT EXISTS meme_last_ran (month text, day text)",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );

    // create the table for storing the last time it has ran
    db.query(
      "CREATE TABLE IF NOT EXISTS meme_count (id text, count int)",
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

    // Default case
    let outMessage = "Could not recognize command";

    let operation = cogs.get(command);

    if(operation !== undefined) {
      if(command == "say") {
        outMessage = operation(message, args);
      } else if(command == "alive") {
        outMessage = operation(startDate);
      } else if(command == "birthday") {
        operation(message.author.id, args, client.users.array(), db, message.channel);
        outMessage = undefined;
      } else if(command == "memes") {
        operation(message.author, args, client.users.array(), db, message.channel);
        outMessage = undefined;
      } else {
        outMessage = operation();
      }
    } else {
      message.channel.send("Command not recognized.");
    } 
    // Send the message
    if(outMessage !== undefined) {
      message.channel.send(outMessage);
    }
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);

client.login(process.env.TOKEN);
