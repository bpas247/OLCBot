import { Collection, Snowflake, User, Message } from "discord.js";
import birthday from "./birthday";
import { complain, sassy, motivate, help } from "./messages";
import { randomGrab } from "./Utilities";
import alive from "./alive";
import memeRuler from "./meme-ruler";
import { IDatabase } from "pg-promise";
import { startDate } from "../bot";
import { getDateFromArgs, updateEntry, listUsers } from "./birthday";

export class Cog {
  public constructor(
    private _command: string,
    private _func: (
      message: Message,
      args: Array<string>,
      db: IDatabase<any>
    ) => Promise<string | undefined> | string,
    private _help?: string,
    private _args?: Array<Cog>
  ) {}

  get command() {
    return this._command;
  }

  public getFunc = (args?: Array<string>) => {
    if (args === undefined || args.length === 0) return this._func;
    else if (this._args === undefined) return undefined;
    else {
      // There are args, so find the arg and run that function instead
      let argCog: Cog | undefined = undefined;

      this._args.forEach((arg: Cog) => {
        if (arg.command === args[0]) argCog = arg;
      });

      return argCog;
    }
  };

  get help() {
    return this._help;
  }
  get args() {
    return this._args;
  }
}

const BirthdayCog = new Cog("birthday", () => "", "Birthday commands", [
  new Cog(
    "add",
    async (message: Message, args: Array<string>, db: IDatabase<any>) => {
      const authorId: number = parseInt(message.author.id);
      const date: string | typeof undefined = getDateFromArgs(args);

      if (date !== undefined) {
        const result = await db.any("SELECT id, date FROM birthday");
        return await updateEntry(authorId, date, result, db);
      } else {
        return "You didn't enter a valid date";
      }
    },
    "adds a new birthday"
  ),
  new Cog(
    "ls",
    async (message: Message, args: Array<string>, db: IDatabase<any>) => {
      const users: Collection<Snowflake, User> = message.client.users;
      try {
        const result: object = await db.any("SELECT id, date FROM birthday");
        return listUsers(result, users);
      } catch (e) {
        console.log(e);
      }
    },
    "lists all of the current birthdays"
  )
]);

const cogs: Array<Cog> = [
  new Cog("ping", () => "Pong!", "Tests to see if the bot is working"),
  new Cog(
    "say",
    (message: Message, args: Array<string>) => {
      // makes the bot say something and delete the message. As an example, it's open to anyone to use.
      // To get the "message" itself we join the `args` back into a string with spaces:
      const sayMessage = args.join(" ");
      // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
      message.delete().catch((O_o: any) => {});
      // And we get the bot to say the thing:
      return sayMessage;
    },
    "Tell the bot to say something"
  ),
  new Cog(
    "complain",
    () => randomGrab(complain),
    "Generate a random complaint"
  ),
  new Cog("do", () => randomGrab(sassy), "Tell the bot to do something"),
  new Cog(
    "motivate",
    () => randomGrab(motivate),
    "Generate a random motivation"
  ),
  new Cog(
    "alive",
    () => alive(startDate, new Date()),
    "How long have I been alive for?"
  ),
  new Cog("help", () => {
    let out: string = "Here are the list of commands that are available:\n\n";
    cogs.forEach(cog => {
      if (cog.help) {
        out += `\`!${cog.command}\` - ${cog.help}\n`;
        if(cog.args && cog.args.length > 0 )
          cog.args.forEach(arg => {
            out += `\t\`${arg.command}\` - ${arg.help}\n`;
          });
      }
    });
    return out;
  }),
  BirthdayCog,
  new Cog("memes", memeRuler, "Meme commands")
];

const cogsMap: Map<string, Cog> = new Map<string, Cog>();

cogs.forEach(cog => {
  cogsMap.set(cog.command, cog);
});

export default cogsMap;
