require('dotenv').config();

// Load up the discord.js library
import Discord from 'discord.js';
const client = new Discord.Client();

// Load up the bot functions
import { onCreate, onMessage } from './bot';

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
