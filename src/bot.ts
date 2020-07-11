import Discord, { Message } from "discord.js";

// Import cogs
import cogs from "./cogs/cogs";
import Cog from "./cogs/cog";
// import { updateCount } from './cogs/meme-ruler';
import { IDatabase } from "pg-promise";
import dotenv from "dotenv";
dotenv.config();

// Prefix
const Prefix = "!";

// Load up the db
import db from "./db";

export const onCreate = async (db: IDatabase<any>) => {
	await db.query("CREATE TABLE IF NOT EXISTS birthday (id text, date text)");
	await db.query(
		"CREATE TABLE IF NOT EXISTS memes(id text, message text, attachment text)"
	);

	console.log("All database tables are ready!");
};

export const onCommand = async (message: Message, db: IDatabase<any>) => {
	// Also good practice to ignore any message that does not start with our prefix,
	// which is set in the configuration file.
	if (message.content.indexOf(Prefix) !== 0) return;

	// Here we separate our "command" name, and our "arguments" for the command.
	// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	// command = say
	// args = ["Is", "this", "the", "real", "life?"]
	const args = message.content.slice(Prefix.length).trim().split(/ +/g);

	const command: string | undefined = args.shift();

	// Default case
	let outMessage: string | undefined = "Command not recognized";

	if (command) {
		const cog: Cog | undefined = cogs.get(command);

		if (cog)
			try {
				outMessage = await cog.run(message, args, db);
			} catch (err) {
				console.error(err);
			}
		else outMessage += ": Base Cog undefined";
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
		if (message.content.indexOf("[MEME]") === 0) {
			const id = message.author.username;
			const purgedContent = message.content.split("[MEME]").pop();
			let content = "";
			if (purgedContent) content = purgedContent.trim();
			let attachmentURL: string | undefined = undefined;
			if (message.attachments.size > 0)
				attachmentURL = message.attachments.first().url;

			await db.query(
				"INSERT into memes (id, message, attachment) VALUES($1, $2, $3)",
				[id, content, attachmentURL]
			);

			await message.react("🅱");
		}
	} else {
		await onCommand(message, db);
	}
};

const bot = new Discord.Client();

bot.on("ready", () => {
	// This event will run if the bot starts, and logs in, successfully.
	console.log(
		`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`
	);

	// Example of changing the bot's playing game to something useful. `client.user` is what the
	// docs refer to as the "ClientUser".
	bot.user.setActivity("Type !help for more info");

	onCreate(db);
});

bot.on("message", (message: Message) => {
	onMessage(message, db);
});

export default bot;
