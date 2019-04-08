import { Collection, Snowflake, User, Message } from "discord.js";
import { isValidDate } from "./Utilities";
import { IDatabase } from "pg-promise";

// export default async (
//   message: Message,
//   args: Array<string>,
//   db: IDatabase<any>
// ) => {
//   let authorId: number = parseInt(message.author.id);
//   let users: Collection<Snowflake, User> = message.client.users;
//   if (args.indexOf("add") != -1) {
//     const date: string | typeof undefined = getDateFromArgs(args);

//     if (date !== undefined) {
//       const result = await db.any("SELECT id, date FROM birthday");
//       return await updateEntry(authorId, date, result, db);
//     } else {
//       return "You didn't enter a valid date";
//     }
//   } else if (args.indexOf("ls") != -1) {
//     try {
//       const result: object = await db.any("SELECT id, date FROM birthday");
//       return listUsers(result, users);
//     } catch (e) {
//       console.log(e);
//     }
//   } else {
//     return "Command for birthday could not be found";
//   }
// };

export const getDateFromArgs = (args: Array<string>) => {
  var date = undefined;
  for (let i = 0; i < args.length; i++) {
    if (isValidDate(args[i])) {
      date = args[i];
    }
  }

  return date;
};

export const isInDatabase = (authorId: number, result: Array<any>) => {
  var isInDatabase = false;
  for (let row of result) {
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
  var isDuplicate = false;

  for (let row of result)
    if (row.id == authorId && row.date == date) isDuplicate = true;

  return isDuplicate;
};

export const updateEntry = async (
  authorId: number,
  date: string,
  result: Array<Object>,
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
      authorId
    ]);
    return "Updated entry!";
  } else {
    return "Name and date already in the database, so I'm not gonna re-add it.";
  }
};

export const listUsers = (result: any, users: Collection<Snowflake, User>) => {
  var out = "List of everyone's birthday goes as follows:";

  for (let row of result) {
    var name: undefined | User = users.find(user => user.id == row.id);

    if (name !== undefined) {
      var userName: string = name.username;
      out += "\n" + userName + " - " + row.date;
    } else {
      out += "\n" + name + " - " + row.date;
    }
  }

  return out;
};
