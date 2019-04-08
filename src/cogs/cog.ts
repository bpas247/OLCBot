import { Collection, Snowflake, User, Message, GuildMember } from "discord.js";
import { listCounts } from './meme-ruler';
import { complain, sassy, motivate, help } from "./messages";
import { randomGrab } from "./Utilities";
import alive from "./alive";
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
  ) { }

  get command() {
    return this._command;
  }

  get func() {
    return this._func;
  }

  public getAppropriateCog = (args?: Array<string>) => {
    if (args === undefined || args.length === 0) return this;
    else if (this._args === undefined) return undefined;
    else {
      // There are args, so find the arg and run that function instead
      let argCog: Cog = this;

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

export const BirthdayCog = new Cog("birthday", () => "", "Birthday commands", [
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

export const MemeRulerCog = new Cog("memes", () => "", "Meme Commands", [
  new Cog(
    "start",
    async (message: Message, args: Array<string>, db: IDatabase<any>) => {
      let author: GuildMember;
      if (message.guild !== null)
        author = await message.guild.fetchMember(message.author);
      else return "Command does not work in DM";

      let isAdmin = author.hasPermission("ADMINISTRATOR");

      if (!isAdmin)
        return "You don't have the permissions for this command.";

      // Continue
      let result = await db.any("SELECT month, day FROM meme_last_ran");

      let out;

      if (result[0] !== undefined) {
        out = "Command has already ran, so nothing else will be done.";
      } else {
        // Time to start it!
        const curDay = new Date();

        try {
          await db.query(
            "INSERT into meme_last_ran (month, day) VALUES($1, $2)",
            [curDay.getMonth(), curDay.getDate()]
          );
        } catch (error) {
          console.log(error);
          out = "Something went wrong! yell at the dev!!!";
        }

        out = "Sucessfully started!";
      }

      return out;
    }, "Start the bot's listening functionality for the memes"),
  new Cog(
    "ls",
    async (message: Message, args: Array<string>, db: IDatabase<any>) => {
      let result: Array<any> | undefined = undefined;
      try {
        result = await db.any("SELECT id, count FROM meme_count");
      } catch (err) {
        console.log(err);
        return "Something went wrong, it probably wasn't started";
      }

      if (result === undefined) return "Could not access database";

      if (result.length == 0) return "Nobody has posted any memes yet :(";

      let users: Collection<Snowflake, User> = message.client.users;

      return listCounts(result, users);
    }, "List all of the current scores for every member that's submitted memes")
])
const cogs: Array<Cog> = [
  new Cog("ping", () => "Pong!", "Tests to see if the bot is working"),
  new Cog(
    "say",
    (message: Message, args: Array<string>) => {
      // makes the bot say something and delete the message. As an example, it's open to anyone to use.
      // To get the "message" itself we join the `args` back into a string with spaces:
      const sayMessage = args.join(" ");
      // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
      message.delete().catch((O_o: any) => { });
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
        if (cog.args && cog.args.length > 0)
          cog.args.forEach(arg => {
            out += `\t\`${arg.command}\` - ${arg.help}\n`;
          });
      }
    });
    return out;
  }),
  BirthdayCog,
  MemeRulerCog
];

const cogsMap: Map<string, Cog> = new Map<string, Cog>();

cogs.forEach(cog => {
  cogsMap.set(cog.command, cog);
});

export default cogsMap;
