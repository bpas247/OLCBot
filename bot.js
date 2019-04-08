"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// Import cogs
const cogs_1 = __importDefault(require("./cogs/cogs"));
const meme_ruler_1 = require("./cogs/meme-ruler");
// Prefix
const Prefix = '!';
exports.onCreate = async (db) => {
    // set the date
    exports.startDate = new Date();
    await db.query('CREATE TABLE IF NOT EXISTS birthday (id text, date text)');
    await db.query('CREATE TABLE IF NOT EXISTS meme_last_ran (month text, day text)');
    await db.query('CREATE TABLE IF NOT EXISTS meme_count (id text, count int)');
    console.log('All database tables are ready!');
};
exports.onCommand = async (message, db) => {
    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if (message.content.indexOf(Prefix) !== 0)
        return;
    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content
        .slice(Prefix.length)
        .trim()
        .split(/ +/g);
    const testCommand = args.shift();
    let command;
    if (testCommand !== undefined)
        command = testCommand.toLowerCase();
    else
        command = undefined;
    // Default case
    let outMessage = 'Command not recognized.';
    if (command !== undefined) {
        let cog = cogs_1.default.get(command);
        if (cog !== undefined)
            try {
                let appropriateCog = cog.getAppropriateCog(args);
                if (appropriateCog) {
                    let cogFunc = appropriateCog.func;
                    if (cogFunc)
                        outMessage = await cogFunc(message, args, db);
                }
            }
            catch (err) {
                console.error(err);
            }
    }
    // Send the message
    message.channel.send(outMessage);
};
exports.onMessage = async (message, db) => {
    // This event will run on every single message received, from any channel or DM.
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot)
        return;
    if (message.content.indexOf(Prefix) !== 0) {
        // Watchers
        let reactions;
        // Reaction timers
        try {
            reactions = await message.awaitReactions((reaction, user) => true, { time: 300000 } // production
            //{time: 3000} // testing
            );
            let result = await meme_ruler_1.updateCount(message.author.id, reactions.size, db);
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        await exports.onCommand(message, db);
    }
};
