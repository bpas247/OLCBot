require('dotenv').config();

// Load up the database
const { Client } = require('pg');

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

db.connect((err) => {
    if(err) {
        console.log(err);
    }
});

// Load up the discord.js library
const Discord = require("discord.js");

// Prefix
const Prefix = '!';

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

var startDate;

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Type !help for more info`);

  // set the date
  startDate = new Date();

  // create the table (if it doesn't exist)
  db.query('CREATE TABLE IF NOT EXISTS birthday (id text, date text)', (err) => {
      if(err) {
          console.log(err);
      }
  });
}, (err) => {
    if(err) {
        console.log(err);
    }
})

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(Prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(Prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command == "complain") {
      message.channel.send(randomGrab(complaints));
  }

  if(command == "do") {
      message.channel.send(randomGrab(sass));
  }

  if(command == "motivate") {
    message.channel.send(randomGrab(motivation));
  }

  if(command == "alive") {
      const currentTime = new Date();

      var difference = Math.abs(startDate - currentTime);

      var out = "I have been alive for: \n";

      out += Math.floor(difference / (1000*60*60*24)) + " days, ";

      difference -= days * 100 * 60 * 60 * 24;

      out += Math.floor(difference / (1000*60*60)) + " hours, ";

      difference -= hours * 1000 * 60 * 60;

      out += Math.floor(difference / (1000*60)) + " minutes, ";
      
      difference -= minutes * 1000 * 60;

      out += Math.floor(difference / (1000)) + " seconds.\n";

      out += "Please don't reset me!";

      message.channel.send(out);
  }

  if(command == "birthday") {
      if(args.indexOf("add") != -1) {
          var affectedUser = message.author.id;

          var date = undefined;

          args.forEach(arg => {
              if(isValidDate(arg)) {
                  date = arg;
              }
          });

          if(date !== undefined) {
            const querySelect = {
                text:'SELECT id as name FROM birthday',
                rowMode: 'array' 
            };
  
            // Some really bad code coming up, brace yourselves...
            // Querying to see if the user already exists in the database
            db.query(querySelect, (err, result) => {
                if(err) {
                  console.log(err);
                }

                var isValid = true;
    
                for(let row of result.rows) {
                    if(row[0] == affectedUser) {
                        message.channel.send("Name already in the database, so I'm not gonna re-add it.");
                        isValid = false;   
                        break;       
                    }
                }
                // If the user is valid, insert into the database
                if(isValid) {
                    db.query('INSERT into birthday (id, date) VALUES($1, $2)', [affectedUser, date], (err) => {
                        if (err) {
                            console.log(err);
                            message.channel.send("Something went wrong! yell at the dev!!!");
                        } else {
                            message.channel.send("Successfully added birthday!");
                        }
                    });        
                }          
            });  
          } else {
              message.channel.send("You didn't enter a valid date");
          }
      }

      if(args.indexOf("ls") != -1) {
          const querySelect = {
              text:'SELECT id as name, date as dBirthday FROM birthday',
              rowMode: 'array' 
          };

          db.query(querySelect, (err, result) => {
              if(err) {
                  console.log(err);
              }

              var out = "List of everyone's birthday goes as follows:";

              for(let row of result.rows) {
                  var name = undefined;
                  for(let user of client.users.array()) {
                      if(user.id == row[0]) {
                          name = user;
                      }
                  }
                  out += "\n" + name + " - " + row[1];
              }

              message.channel.send(out);
          });
      }
  }

  if(command == "help") {
      message.channel.send(
          "!ping - Tests to see if the bot is working\n"
          + "!say - Tell the bot to say something\n"
          + "!do - Tell the bot to do something\n"
          + "!complain - Generate a random complaint\n"
          + "!motivate - Generate a random motivation\n"
          + "!alive - How long have I been alive for?\n"
          + "!birthday add MM/DD/YYYY - add a birthday to the list\n"
          + "!birthday ls - list everyone's birthday"
        );
  }
}, (err) => {
    if(err) {
        console.log(err);
    }
});

const sass = [
    "no.",
    "Let me get back to you on that :information_desk_person:",
    "Here's a suggestion: how about you do it?",
    "Could you ask for nothing? I'll be able to do nothing."
];

const complaints = [
    "Why doesn't anyone use introductory sentences?",
    "I'm not a style guide!",
    "Just google it!!",
    "TOO MUCH PERSONAL INFORMATION—MY EYES ARE BLEEDING",
    "Why is it so cold in here?",
    "Whyyy is it so hot in here???",
    "Did you remember to sign in?",
    "I rephrased this question 27 times and drew 4 visuals.",
    "Why is there a banana here?",
    "Don't forget the '+ c'."
];

const motivation = [
    "students who visit the Bock Learning Center have improved grades",
    "a student has successfully understood the concept you explained",
    "a student has signed in successfully",
    "a student has pushed in their chair as they left",
    "there are no students left in the center at closing time"
];

function randomGrab(array) {
    return array[Math.floor(Math.random() * array.length)];
};

// Checks to see if a date follows the following format: mm/dd/yyyy
function isValidDate(text) {
    var t = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (t !== null) {
        var m = +t[1], d = +t[2], y = +t[3];
        var date = new Date(y, m - 1, d);

        return date.getFullYear() === y 
            && date.getMonth() === m - 1;
    }

    return false;
}

client.login(process.env.TOKEN);
