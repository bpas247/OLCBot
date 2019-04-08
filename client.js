"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// Load up the discord.js library
const discord_js_1 = __importDefault(require("discord.js"));
const client = new discord_js_1.default.Client();
// Load up the bot functions
const bot_1 = require("./bot");
// Load up the db
const db_1 = __importDefault(require("./db"));
client.on('ready', async () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`Type !help for more info`);
    await bot_1.onCreate(db_1.default);
});
client.on('message', async (message) => {
    await bot_1.onMessage(message, db_1.default);
});
client.login(process.env.TOKEN).catch(error => {
    console.log(error);
});
