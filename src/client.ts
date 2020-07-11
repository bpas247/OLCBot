require("dotenv").config();

import bot from "./bot";

bot.login(process.env.TOKEN).catch((error) => {
	console.log(error);
});
