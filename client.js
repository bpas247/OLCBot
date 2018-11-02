"use strict";

var _discord = _interopRequireDefault(require("discord.js"));

var _bot = require("./bot");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config(); // Load up the discord.js library


const client = new _discord.default.Client(); // Load up the bot functions

client.on('ready', async () => {
  await (0, _bot.onCreate)(client);
}, err => {
  if (err) {
    console.log(err);
  }
});
client.on('message', async message => {
  await (0, _bot.onMessage)(client, message);
}, err => {
  if (err) {
    console.log(err);
  }
});
client.login(process.env.TOKEN);