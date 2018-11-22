import { Message } from 'discord.js';
import birthday from './birthday';
import { complain, sassy, motivate, help } from './messages';
import { randomGrab } from './Utilities';
import alive from './alive';
import memeRuler from './meme-ruler';

export default new Map<string, Function>([
  [
    'ping',
    () => {
      return 'Pong!';
    }
  ],
  [
    'say',
    (message:any, args:Array<string>) => {
      // makes the bot say something and delete the message. As an example, it's open to anyone to use.
      // To get the "message" itself we join the `args` back into a string with spaces:
      const sayMessage = args.join(' ');
      // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
      message.delete().catch((O_o:any) => {});
      // And we get the bot to say the thing:
      return sayMessage;
    }
  ],
  [
    'complain',
    () => {
      return randomGrab(complain);
    }
  ],
  [
    'do',
    () => {
      return randomGrab(sassy);
    }
  ],
  [
    'motivate',
    () => {
      return randomGrab(motivate);
    }
  ],
  [
    'alive',
    (message:any, args:Array<string>, startDate:Date) => {
      return alive(startDate, new Date());
    }
  ],
  [
    'help',
    () => {
      return help;
    }
  ],
  [
    'birthday',
    async (message:any, args:Array<string>, users:any, db:any) => {
      return await birthday(message.author.id, args, users, db);
    }
  ],
  [
    'memes',
    async (message:Message, args:Array<string>, users:any, db:any) => {
      if(message.guild !== null) {
        let author = await message.guild.fetchMember(message.author);
        return await memeRuler(author, args, users, db);
      } else {
        return "Command does not work in DM";
      }
    }
  ]
]);
