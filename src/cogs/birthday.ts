import { Collection, Snowflake, User, Message } from "discord.js";
import { isValidDate } from "../util/Utilities";
import { IDatabase } from "pg-promise";
import Cog from "./cog";

export const getDateFromArgs = (args: Array<string>) => {
	let date = undefined;
	for (let i = 0; i < args.length; i++) {
		if (isValidDate(args[i])) {
			date = args[i];
		}
	}

	return date;
};

export const isInDatabase = (authorId: number, result: Array<any>) => {
	let isInDatabase = false;
	for (const row of result) {
		if (row.id == authorId) {
			isInDatabase = true;
		}
	}
	return isInDatabase;
};

export const isDuplicateEntry = (
	authorId: number,
	date: string,
	result: Array<any>
) => {
	let isDuplicate = false;

	for (const row of result)
		if (row.id == authorId && row.date == date) isDuplicate = true;

	return isDuplicate;
};

export const updateEntry = async (
	authorId: number,
	date: string,
	result: Array<Record<string, any>>,
	db: IDatabase<any>
) => {
	if (!isInDatabase(authorId, result)) {
		await db.query("INSERT into birthday (id, date) VALUES($1, $2)", [
			authorId,
			date
		]);
		return "Added new entry!";
	} else if (!isDuplicateEntry(authorId, date, result)) {
		await db.query("UPDATE birthday SET date = $1 WHERE id = $2", [
			date,
			`${authorId}`
		]);
		return "Updated entry!";
	} else {
		return "Name and date already in the database, so I'm not gonna re-add it.";
	}
};

export const listUsers = (result: any, users: Collection<Snowflake, User>) => {
	let out = "List of everyone's birthday goes as follows:";

	for (const row of result) {
		const name: undefined | User = users.find((user) => user.id == row.id);

		if (name) {
			const userName: string = name.username;
			out += `\n${userName} - ${row.date}`;
		}
	}

	return out;
};

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
				const result: any = await db.any("SELECT id, date FROM birthday");
				return listUsers(result, users);
			} catch (e) {
				console.log(e);
			}
		},
		"lists all of the current birthdays"
	)
]);

export default BirthdayCog;
