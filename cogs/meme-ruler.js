"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cog_1 = __importDefault(require("./cog"));
exports.listCounts = (result, users) => {
    let out = "List of everyone's scores:";
    for (let row of result) {
        let name = users.find(user => user.id == row.id);
        if (name !== undefined) {
            var userName = name.username;
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
const MemeRulerCog = new cog_1.default("memes", () => "", "Meme Commands", [
    new cog_1.default("start", async (message, args, db) => {
        let author;
        if (message.guild !== null)
            author = await message.guild.fetchMember(message.author);
        else
            return "Command does not work in DM";
        let isAdmin = author.hasPermission("ADMINISTRATOR");
        if (!isAdmin)
            return "You don't have the permissions for this command.";
        // Continue
        let result = await db.any("SELECT month, day FROM meme_last_ran");
        let out;
        if (result[0] !== undefined) {
            out = "Command has already ran, so nothing else will be done.";
        }
        else {
            // Time to start it!
            const curDay = new Date();
            try {
                await db.query("INSERT into meme_last_ran (month, day) VALUES($1, $2)", [curDay.getMonth(), curDay.getDate()]);
            }
            catch (error) {
                console.log(error);
                out = "Something went wrong! yell at the dev!!!";
            }
            out = "Sucessfully started!";
        }
        return out;
    }, "Start the bot's listening functionality for the memes"),
    new cog_1.default("ls", async (message, args, db) => {
        let result = undefined;
        try {
            result = await db.any("SELECT id, count FROM meme_count");
        }
        catch (err) {
            console.log(err);
            return "Something went wrong, it probably wasn't started";
        }
        if (result === undefined)
            return "Could not access database";
        if (result.length == 0)
            return "Nobody has posted any memes yet :(";
        let users = message.client.users;
        return exports.listCounts(result, users);
    }, "List all of the current scores for every member that's submitted memes")
]);
exports.default = MemeRulerCog;
