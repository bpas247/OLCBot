"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../util/messages");
const Utilities_1 = require("../util/Utilities");
const cog_1 = __importDefault(require("./cog"));
const cog_admin_1 = __importDefault(require("./admin/cog-admin"));
const birthday_1 = __importDefault(require("./birthday"));
const meme_ruler_1 = __importDefault(require("./meme-ruler"));
const alive_1 = __importDefault(require("./alive"));
const cogs = [
    new cog_1.default("ping", () => "Pong!", "Tests to see if the bot is working"),
    new cog_1.default("say", (message, args) => {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use.
        // To get the "message" itself we join the `args` back into a string with spaces:
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?).
        message.delete().catch(() => { });
        // And we get the bot to say the thing:
        return sayMessage;
    }, "Tell the bot to say something"),
    new cog_1.default("complain", () => Utilities_1.randomGrab(messages_1.complain), "Generate a random complaint"),
    new cog_1.default("do", () => Utilities_1.randomGrab(messages_1.sassy), "Tell the bot to do something"),
    new cog_1.default("motivate", () => Utilities_1.randomGrab(messages_1.motivate), "Generate a random motivation"),
    new cog_1.default("help", () => {
        let out = "Here are the list of commands that are available:\n\n";
        cogs.forEach(cog => {
            if (cog.help) {
                out += `\`!${cog.command}\` - ${cog.help}\n`;
                if (cog.args && cog.args.length > 0)
                    cog.args.forEach(arg => {
                        out += `\t\`${arg.command}\` - ${arg.help}\n`;
                    });
            }
        });
        return out;
    }),
    new cog_admin_1.default("clearTable", async (message, args, db) => {
        try {
            await db.query(`DELETE from ${args[0]}`);
        }
        catch (error) {
            return `Could not clear the database table ${args[0]}`;
        }
        return `Successfuly cleared ${args[0]}`;
    }, "Clears the selected table out of the database"),
    alive_1.default,
    birthday_1.default,
    meme_ruler_1.default
];
const cogsMap = new Map();
cogs.forEach(cog => {
    cogsMap.set(cog.command, cog);
});
exports.default = cogsMap;
