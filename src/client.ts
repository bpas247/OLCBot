require("dotenv").config();

// Load up the discord.js library
import Discord, { Message } from "discord.js";
const client = new Discord.Client();

// Load up the bot functions
import { onCreate, onMessage } from "./bot";

// Load up the db
import db from "./db";

client.on("ready", async () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(
    `Bot has started, with ${client.users.size} users, in ${
      client.channels.size
    } channels of ${client.guilds.size} guilds.`
  );

  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Type !help for more info`);

  await onCreate(db);
});

client.on("message", async (message: Message) => {
  await onMessage(message, db);
});

client.login(process.env.TOKEN).catch(error => {
  console.log(error);
});
