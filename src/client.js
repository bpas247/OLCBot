require('dotenv').config();

// Load up the discord.js library
const Discord = require('discord.js');
const client = new Discord.Client();

// Load up the bot functions
const onCreate = require('./bot').onCreate;
const onMessage = require('./bot').onMessage;

client.on(
  'ready',
  async () => {
    await onCreate(client);
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);

client.on(
  'message',
  async message => {
    await onMessage(client, message);
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);

client.login(process.env.TOKEN);
