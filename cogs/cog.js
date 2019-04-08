"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const birthday_1 = __importDefault(require("./birthday"));
const messages_1 = require("./messages");
const Utilities_1 = require("./Utilities");
const alive_1 = __importDefault(require("./alive"));
const meme_ruler_1 = __importDefault(require("./meme-ruler"));
exports.default = new Map([
    [
        'ping',
        () => {
            return 'Pong!';
        }
    ],
    [
        'say',
        (message, args) => {
            // makes the bot say something and delete the message. As an example, it's open to anyone to use.
            // To get the "message" itself we join the `args` back into a string with spaces:
            const sayMessage = args.join(' ');
            // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
            message.delete().catch((O_o) => { });
            // And we get the bot to say the thing:
            return sayMessage;
        }
    ],
    [
        'complain',
        () => {
            return Utilities_1.randomGrab(messages_1.complain);
        }
    ],
    [
        'do',
        () => {
            return Utilities_1.randomGrab(messages_1.sassy);
        }
    ],
    [
        'motivate',
        () => {
            return Utilities_1.randomGrab(messages_1.motivate);
        }
    ],
    [
        'alive',
        (message, args, startDate) => {
            return alive_1.default(startDate, new Date());
        }
    ],
    [
        'help',
        () => {
            return messages_1.help;
        }
    ],
    [
        'birthday',
        async (message, args, db) => {
            return await birthday_1.default(message, args, db);
        }
    ],
    [
        'memes',
        async (message, args, db) => {
            if (message.guild !== null) {
                let author = await message.guild.fetchMember(message.author);
                return await meme_ruler_1.default(author, args, message.client.users, db);
            }
            else {
                return "Command does not work in DM";
            }
        }
    ]
]);
