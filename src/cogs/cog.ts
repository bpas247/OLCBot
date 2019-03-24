import { Message } from 'discord.js';
import birthday from './birthday';
import { complain, sassy, motivate, help } from './messages';
import { randomGrab } from './Utilities';
import alive from './alive';
import memeRuler from './meme-ruler';
import { IDatabase } from 'pg-promise';
import { startDate } from '../bot';

class Cog {
  public constructor(
    private _command: string,
    private _func: (message: Message, args: Array<string>, db: IDatabase<any>) => Promise<string | undefined> | string
  ) {}

  get command() { return this._command; }
  get func() { return this._func; }
}

const cogs: Array<Cog> = [
  new Cog('ping', () => 'Pong!'),
  new Cog('say', (message: Message, args: Array<string>) => {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(' ');
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch((O_o: any) => { });
    // And we get the bot to say the thing:
    return sayMessage;
  }),
  new Cog('complain', () => randomGrab(complain)),
  new Cog('do', () => randomGrab(sassy)),
  new Cog('motivate', () => randomGrab(motivate)),
  new Cog('alive', () => alive(startDate, new Date())),
  new Cog('help', () => help),
  new Cog('birthday', birthday),
  new Cog('memes', memeRuler)
]

const cogsMap: Map<string, Function> = new Map<string, Function>();

cogs.forEach(cog => {
  cogsMap.set(cog.command, cog.func);
});

export default cogsMap;
