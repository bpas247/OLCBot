import { Collection, Snowflake, User, GuildMember, Message } from "discord.js";
import { IDatabase } from "pg-promise";
import Cog from './cog';

export const listCounts = (
  result: Array<any>,
  users: Collection<string, User>
) => {
  let out = "List of everyone's scores:";

  for (let row of result) {
    let name: User | undefined = users.find(user => user.id == row.id);

    if (name !== undefined) {
      var userName: string = name.username;
      out += "\n" + userName + " - " + row.count;
    } else {
      out += "\n" + name + " - " + row.count;
    }
  }

  return out;
};

export const updateCount = async (
  user: string,
  newCount: number,
  db: IDatabase<any>
) => {
  // Get the current count
  let result;
  try {
    result = await db.any("SELECT count FROM meme_count WHERE id = $1", user);
  } catch (err) {
    console.log(err);
    return "something went wrong";
  }
  if (result.length === 0) {
    // Create a new entry
    await db.query("INSERT into meme_count (id, count) VALUES($1, $2)", [
      user,
      newCount
    ]);
    return "Added new entry!";
  } else {
    await db.query("UPDATE meme_count SET count = $1 WHERE id = $2", [
      result[0].count + newCount,
      user
    ]);
    return "Updated entry!";
  }
};

const MemeRulerCog = new Cog("memes", () => "", "Meme Commands", [
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
]);

export default MemeRulerCog;
