"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCount = exports.listCounts = void 0;
const cog_1 = __importDefault(require("./cog"));
exports.listCounts = (result, users) => {
    let out = "List of everyone's scores:";
    for (const row of result) {
        const name = users.find((user) => user.id == row.id);
        if (name) {
            const userName = name.username;
            out += "\n" + userName + " - " + row.count;
        }
        else {
            out += "\n" + name + " - " + row.count;
        }
    }
    return out;
};
exports.updateCount = async (user, newCount, db) => {
    // Get the current count
    let result;
    try {
        result = await db.any("SELECT count FROM meme_count WHERE id = $1", user);
    }
    catch (err) {
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
    }
    else {
        await db.query("UPDATE meme_count SET count = $1 WHERE id = $2", [
            result[0].count + newCount,
            user
        ]);
        return "Updated entry!";
    }
};
const MemeRulerCog = new cog_1.default("memes", () => "Not a meme command", "Meme Commands", [
    // new Cog(
    //   "ls",
    //   async (message: Message, args: Array<string>, db: IDatabase<any>) => {
    //     let result: Array<any> | undefined = undefined;
    //     try {
    //       result = await db.any("SELECT id, count FROM meme_count");
    //     } catch (err) {
    //       console.log(err);
    //       return "Something went wrong, it probably wasn't started";
    //     }
    //     if (result === undefined) return "Could not access database";
    //     if (result.length == 0) return "Nobody has posted any memes yet :(";
    //     let users: Collection<Snowflake, User> = message.client.users;
    //     return listCounts(result, users);
    //   }, "List all of the current scores for every member that's submitted memes"),
    new cog_1.default("random", async (message, args, db) => {
        const returnsFromDb = await db.any("SELECT id, message, attachment from memes");
        const rand = returnsFromDb[Math.floor(Math.random() * returnsFromDb.length)];
        if (!rand)
            return "no memes have been posted yet";
        else
            return (`from **${rand.id}**\n${rand.message}` +
                (rand.attachment ? `\n${rand.attachment}` : ""));
    }, "Grab a random meme from our awesome collection")
]);
exports.default = MemeRulerCog;
