// @flow
require('dotenv').config();

// Load up the database
const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);

import { Client, Message } from 'discord.js';

// Import cogs
import cogs from './cogs/cog';

import { updateCount } from './cogs/meme-ruler';

// Prefix
const Prefix = '!';

var startDate;

export const onCreate = async (client: Client) => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(
    `Bot has started, with ${client.users.size} users, in ${
      client.channels.size
    } channels of ${client.guilds.size} guilds.`
  );

  // set the date
  startDate = new Date();

  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Type !help for more info`);

  await db.query('CREATE TABLE IF NOT EXISTS birthday (id text, date text)');

  await db.query(
    'CREATE TABLE IF NOT EXISTS meme_last_ran (month text, day text)'
  );

  await db.query('CREATE TABLE IF NOT EXISTS meme_count (id text, count int)');

  console.log('All database tables are ready!');
};

const onCommand = async (client: Client, message: Message) => {
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
  let outMessage = 'Could not recognize command';

  let operation = cogs.get(command);

  if (operation !== undefined) {
    if (command == 'alive') {
      outMessage = operation(message, args, startDate);
    } else if (command == 'birthday') {
      outMessage = await operation(message, args, client.users.array(), db);
    } else if (command == 'memes') {
      outMessage = await operation(message, args, client.users.array(), db);
    } else {
      outMessage = await operation(message, args);
    }
  } else {
    outMessage = 'Command not recognized.';
  }
  // Send the message
  if (outMessage !== undefined) {
    message.channel.send(outMessage);
  }
};

export const onMessage = async (client: Client, message: Message) => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  if (message.content.indexOf(Prefix) !== 0) {
    // Watchers
    let reactions;
    // Reaction timers
    try {
      reactions = await message.awaitReactions(
        (reaction, user) => true,
        { time: 300000 } // production
        //{time: 3000} // testing
      );
      //message.channel.send("User has over " + reactions.size + " reactions");
      let result = await updateCount(message.author.id, reactions.size, db);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  } else {
    await onCommand(client, message);
  }
};