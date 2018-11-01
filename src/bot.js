require('dotenv').config();

// Load up the database
const pgp = require('pg-promise')();

pgp.pg.defaults.ssl = true;

const db = pgp(process.env.DATABASE_URL);

// Import cogs
const cogs = require('./cogs/cog.js').cogs;

// Load up the discord.js library
const Discord = require('discord.js');

// Prefix
const Prefix = '!';

const client = new Discord.Client();

var startDate;

client.on(
  'ready',
  async () => {
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

    await db.query('CREATE TABLE IF NOT EXISTS birthday (id text, date text)');

    await db.query(
      'CREATE TABLE IF NOT EXISTS meme_last_ran (month text, day text)'
    );

    await db.query(
      'CREATE TABLE IF NOT EXISTS meme_count (id text, count int)'
    );

    console.log('All database tables are ready!');
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);

client.on(
  'message',
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
    const command = args.shift();

    // Default case
    let outMessage = 'Could not recognize command';

    let operation = cogs.get(command);

    if (operation !== undefined) {
      if (command == 'say') {
        outMessage = operation(message, args);
      } else if (command == 'alive') {
        outMessage = operation(startDate);
      } else if (command == 'birthday') {
        outMessage = await operation(
          message.author.id,
          args,
          client.users.array(),
          db
        );
      } else if (command == 'trickOrTreat') {
        //console.log("got here");
        outMessage = await operation(message.guild, message.author);
      }
      // else if (command == 'memes') {
      //   operation(
      //     message.author,
      //     args,
      //     client.users.array(),
      //     db,
      //     message.channel
      //   );
      //   outMessage = undefined;
      // }
      else {
        outMessage = operation();
      }
    } else {
      outMessage = 'Command not recognized.';
    }
    // Send the message
    if (outMessage !== undefined) {
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
