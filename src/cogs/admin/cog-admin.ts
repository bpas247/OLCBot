import Cog from "../cog";
import { GuildMember, Message } from "discord.js";
import { IDatabase } from "pg-promise";

class CogAdmin extends Cog {
	public constructor(
		_command: string,
		_func: (
			message: Message,
			args: Array<string>,
			db: IDatabase<any>
		) => Promise<string | undefined> | string,
		_help?: string,
		_args?: Array<Cog>
	) {
		super(_command, _func, _help, _args);
	}

	public async run(message: Message, args: Array<string>, db: IDatabase<any>) {
		let author: GuildMember | undefined = undefined;
		if (message.guild) author = await message.guild.fetchMember(message.author);
		else return "Command does not work in DM";

		if (!author) return "Could not find the user in the server to authenticate";

		let isAdmin = author.hasPermission("ADMINISTRATOR");

		if (!isAdmin) return "You don't have the permissions for this command.";

		return super.run(message, args, db);
	}
}

export default CogAdmin;
