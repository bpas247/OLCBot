import { GuildMember, Message } from "discord.js";
import { IDatabase } from "pg-promise";

class Cog {
  public constructor(
    private _command: string,
    private _func: (
      message: Message,
      args: Array<string>,
      db: IDatabase<any>
    ) => Promise<string | undefined> | string,
    private _help?: string,
    private _args?: Array<Cog>,
    private _isAdmin: boolean = false
  ) { }

  get command() {
    return this._command;
  }

  public run = async (message: Message, args: Array<string>, db: IDatabase<any>) => {
    if (this._isAdmin) {
      let author: GuildMember;
      if (message.guild)
        author = await message.guild.fetchMember(message.author);
      else return "Command does not work in DM";

      let isAdmin = author.hasPermission("ADMINISTRATOR");

      if (!isAdmin)
        return "You don't have the permissions for this command.";

    }

    let cogToRun: Cog = this;
    if (args) cogToRun = this.getAppropriateCog(args);

    return await cogToRun._func(message, args, db);
  }

  protected getAppropriateCog = (args?: Array<string>) => {
    if (args === undefined || args.length === 0) return this;
    else if (this._args === undefined) return this;
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

export default Cog;
