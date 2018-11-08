require('dotenv').config();

// Load up the discord.js library
import Discord from 'discord.js';
const client = new Discord.Client();

// Load up the bot functions
import { onCreate, onMessage } from './bot';

client.on(
  'ready',
  async () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(
      `Bot has started, with ${client.users.size} users, in ${
        client.channels.size
      } channels of ${client.guilds.size} guilds.`
    );

    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`Type !help for more info`);

    await onCreate();
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

client.login(process.env.TOKEN).catch(error => {
  console.log(error);
});
