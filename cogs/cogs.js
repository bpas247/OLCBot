"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./messages");
const Utilities_1 = require("./Utilities");
const alive_1 = __importDefault(require("./alive"));
const bot_1 = require("../bot");
const cog_1 = __importDefault(require("./cog"));
const birthday_1 = __importDefault(require("./birthday"));
const meme_ruler_1 = __importDefault(require("./meme-ruler"));
const cogs = [
    new cog_1.default("ping", () => "Pong!", "Tests to see if the bot is working"),
    new cog_1.default("say", (message, args) => {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use.
        // To get the "message" itself we join the `args` back into a string with spaces:
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch((O_o) => { });
        // And we get the bot to say the thing:
        return sayMessage;
    }, "Tell the bot to say something"),
    new cog_1.default("complain", () => Utilities_1.randomGrab(messages_1.complain), "Generate a random complaint"),
    new cog_1.default("do", () => Utilities_1.randomGrab(messages_1.sassy), "Tell the bot to do something"),
    new cog_1.default("motivate", () => Utilities_1.randomGrab(messages_1.motivate), "Generate a random motivation"),
    new cog_1.default("alive", () => alive_1.default(bot_1.startDate, new Date()), "How long have I been alive for?"),
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
    birthday_1.default,
    meme_ruler_1.default
];
const cogsMap = new Map();
cogs.forEach(cog => {
    cogsMap.set(cog.command, cog);
});
exports.default = cogsMap;
