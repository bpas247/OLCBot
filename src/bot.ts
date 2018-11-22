// @flow
require('dotenv').config();

// Load up the database
const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
export const db = pgp(process.env.DATABASE_URL);

import { Client, Message } from 'discord.js';

// Import cogs
import cogs from './cogs/cog';

import { updateCount } from './cogs/meme-ruler';

// Prefix
const Prefix = '!';

let startDate: Date;

export const onCreate = async () => {
  // set the date
  startDate = new Date();

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
      let result = await updateCount(message.author.id, reactions.size, db);
    } catch (err) {
      console.log(err);
    }
  } else {
    await onCommand(client, message);
  }
};
