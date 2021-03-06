import { Message, GuildMember } from "discord.js";
import { complain, sassy, motivate } from "../util/messages";
import { randomGrab } from "../util/Utilities";
import Cog from "./cog";
import AdminCog from "./admin/cog-admin";
import BirthdayCog from "./birthday";
import MemeRulerCog from "./meme-ruler";
import { IDatabase } from "pg-promise";
import AliveCog from "./alive";

const cogs: Array<Cog> = [
	new Cog("ping", () => "Pong!", "Tests to see if the bot is working"),
	new Cog(
		"say",
		(message: Message, args: Array<string>) => {
			// makes the bot say something and delete the message. As an example, it's open to anyone to use.
			// To get the "message" itself we join the `args` back into a string with spaces:
			const sayMessage = args.join(" ");
			// Then we delete the command message (sneaky, right?).
			message.delete().catch();
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
	new Cog("help", () => {
		let out = "Here are the list of commands that are available:\n\n";
		cogs.forEach((cog) => {
			if (cog.help) {
				out += `\`!${cog.command}\` - ${cog.help}\n`;
				if (cog.args && cog.args.length > 0)
					cog.args.forEach((arg) => {
						out += `\t\`${arg.command}\` - ${arg.help}\n`;
					});
			}
		});
		return out;
	}),
	new AdminCog(
		"clearTable",
		async (message: Message, args: string[], db: IDatabase<any>) => {
			try {
				await db.query(`DELETE from ${args[0]}`);
			} catch (error) {
				return `Could not clear the database table ${args[0]}`;
			}
			return `Successfuly cleared ${args[0]}`;
		},
		"Clears the selected table out of the database"
	),
	AliveCog,
	BirthdayCog,
	MemeRulerCog
];

const cogsMap: Map<string, Cog> = new Map<string, Cog>();

cogs.forEach((cog) => {
	cogsMap.set(cog.command, cog);
});

export default cogsMap;
