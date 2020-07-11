import bot from "./bot";
import dotenv from "dotenv";
dotenv.config();

bot.login(process.env.TOKEN).catch((error) => {
	console.log(error);
});
