"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// Import cogs
const cogs_1 = __importDefault(require("./cogs/cogs"));
// Prefix
const Prefix = '!';
exports.onCreate = async (db) => {
    await db.query('CREATE TABLE IF NOT EXISTS birthday (id text, date text)');
    // await db.query(
    //   'CREATE TABLE IF NOT EXISTS meme_last_ran (month text, day text)'
    // );
    // await db.query('CREATE TABLE IF NOT EXISTS meme_count (id text, count int)');
    await db.query('CREATE TABLE IF NOT EXISTS memes(id text, message text, attachment text)');
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
    const command = args.shift();
    // Default case
    let outMessage = 'Command not recognized';
    if (command !== undefined) {
        let cog = cogs_1.default.get(command);
        if (cog)
            try {
                let appropriateCog = cog.getAppropriateCog(args);
                let cogFunc = appropriateCog.func;
                if (cogFunc)
                    outMessage = await cogFunc(message, args, db);
                else
                    outMessage += ": Function undefined";
            }
            catch (err) {
                console.error(err);
            }
        else
            outMessage += ": Base Cog undefined";
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
        // If it is identified as a meme
        if (message.content.indexOf(`[MEME]`) === 0) {
            let id = message.author.username;
            let purgedContent = message.content.split(`[MEME]`).pop();
            let content = "";
            if (purgedContent)
                content = purgedContent.trim();
            let attachmentURL = undefined;
            if (message.attachments.size > 0)
                attachmentURL = message.attachments.first().url;
            await db.query("INSERT into memes (id, message, attachment) VALUES($1, $2, $3)", [id, content, attachmentURL]);
            await message.react('🅱');
        }
    }
    else {
        await exports.onCommand(message, db);
    }
};
