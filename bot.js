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
      } else {
        operation(message);
      }
    } else if (command == "birthday") {
      if (args.indexOf("add") != -1) {
        var affectedUser = message.author.id;

        var date = undefined;

        args.forEach(arg => {
          if (isValidDate(arg)) {
            date = arg;
          }
        });

        if (date !== undefined) {
          const querySelect = {
            text: "SELECT id as name, date as dBirthday FROM birthday",
            rowMode: "array"
          };

          // Some really bad code coming up, brace yourselves...
          // Querying to see if the user already exists in the database
          db.query(querySelect, (err, result) => {
            if (err) {
              console.log(err);
            }

            var isValid = true;

            for (let row of result.rows) {
              if (row[0] == affectedUser) {
                if (row[1] == date) {
                  message.channel.send(
                    "Name and date already in the database, so I'm not gonna re-add it."
                  );
                } else {
                  db.query(
                    "UPDATE birthday SET date = $1 WHERE id = $2",
                    [date, affectedUser],
                    err => {
                      if (err) {
                        console.log(err);
                        message.channel.send("Could not update entry.");
                      } else {
                        message.channel.send("Updated entry!");
                      }
                    }
                  );
                }
                isValid = false;
                break;
              }
            }
            // If the user is valid, insert into the database
            if (isValid) {
              db.query(
                "INSERT into birthday (id, date) VALUES($1, $2)",
                [affectedUser, date],
                err => {
                  if (err) {
                    console.log(err);
                    message.channel.send(
                      "Something went wrong! yell at the dev!!!"
                    );
                  } else {
                    message.channel.send("Successfully added birthday!");
                  }
                }
              );
            }
          });
        } else {
          message.channel.send("You didn't enter a valid date");
        }
      }

      if (args.indexOf("ls") != -1) {
        const querySelect = {
          text: "SELECT id as name, date as dBirthday FROM birthday",
          rowMode: "array"
        };

        db.query(querySelect, (err, result) => {
          if (err) {
            console.log(err);
          }

          var out = "List of everyone's birthday goes as follows:";

          for (let row of result.rows) {
            var name = undefined;
            for (let user of client.users.array()) {
              if (user.id == row[0]) {
                name = user;
              }
            }
            out += "\n" + name + " - " + row[1];
          }

          message.channel.send(out);
        });
      }
    }
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);

// Checks to see if a date follows the following format: mm/dd/yyyy
function isValidDate(text) {
  var t = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (t !== null) {
    var m = +t[1],
      d = +t[2],
      y = +t[3];
    var date = new Date(y, m - 1, d);

    return date.getFullYear() === y && date.getMonth() === m - 1;
  }

  return false;
}

client.login(process.env.TOKEN);
