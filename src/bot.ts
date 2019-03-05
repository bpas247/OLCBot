require('dotenv').config();

import { Message } from 'discord.js';

// Import cogs
import cogs from './cogs/cog';

import { updateCount } from './cogs/meme-ruler';
import { IDatabase } from 'pg-promise';

// Prefix
const Prefix = '!';

export let startDate: Date;

export const onCreate = async (db: IDatabase<any>) => {
  // set the date
  startDate = new Date();

  await db.query('CREATE TABLE IF NOT EXISTS birthday (id text, date text)');

  await db.query(
    'CREATE TABLE IF NOT EXISTS meme_last_ran (month text, day text)'
  );

  await db.query('CREATE TABLE IF NOT EXISTS meme_count (id text, count int)');

  console.log('All database tables are ready!');
};

export const onCommand = async (message: Message, db: IDatabase<any>) => {
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

  const testCommand: string | undefined = args.shift();

  let command: string | undefined;
  if (testCommand !== undefined)
    command = testCommand.toLowerCase();
  else
    command = undefined;

  // Default case
  let outMessage = 'Command not recognized.';

  if (command !== undefined) {
    let operation = cogs.get(command);

    if (operation !== undefined)
    try {
      outMessage = await operation(message, args, db); 
    } catch(err) { console.error(err); }
  }
  // Send the message
  message.channel.send(outMessage);
};

export const onMessage = async (message: Message, db: IDatabase<any>) => {
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
    await onCommand(message, db);
  }
};
