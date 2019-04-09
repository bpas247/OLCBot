require('dotenv').config();

import { Message } from 'discord.js';

// Import cogs
import cogs from './cogs/cogs';
import Cog from './cogs/cog';
// import { updateCount } from './cogs/meme-ruler';
import { IDatabase } from 'pg-promise';

// Prefix
const Prefix = '!';

export let startDate: Date;

export const onCreate = async (db: IDatabase<any>) => {
  // set the date
  startDate = new Date();

  await db.query('CREATE TABLE IF NOT EXISTS birthday (id text, date text)');

  // await db.query(
  //   'CREATE TABLE IF NOT EXISTS meme_last_ran (month text, day text)'
  // );

  // await db.query('CREATE TABLE IF NOT EXISTS meme_count (id text, count int)');

  await db.query('CREATE TABLE IF NOT EXISTS memes(id text, message text, attachment text)');

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
  let outMessage: string | undefined = 'Command not recognized.';

  if (command !== undefined) {
    let cog: Cog | undefined = cogs.get(command);

    if (cog !== undefined)
      try {
        let appropriateCog = cog.getAppropriateCog(args);
        if (appropriateCog) {
          let cogFunc = appropriateCog.func;
          if (cogFunc) outMessage = await cogFunc(message, args, db);
        }
      } catch (err) { console.error(err); }
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
    // If it is identified as a meme
    if (message.content.indexOf(`[MEME]`) === 0) {
      let id = message.author.username;
      let purgedContent = message.content.split(`[MEME]`).pop(); 
      let content = "";
      if(purgedContent) content = purgedContent.trim();
      let attachmentURL: string | undefined = undefined;
      if (message.attachments.size > 0)
        attachmentURL = message.attachments.first().url;

      await db.query("INSERT into memes (id, message, attachment) VALUES($1, $2, $3)", [id, content, attachmentURL]);

      await message.react('🅱');
    }
} else {
  await onCommand(message, db);
  }
};
