import Discord from "discord.js";
import { IDatabase } from "pg-promise";
export declare const onCreate: (db: IDatabase<any, import("pg-promise/typescript/pg-subset").IClient>) => Promise<void>;
export declare const onCommand: (message: Discord.Message, db: IDatabase<any, import("pg-promise/typescript/pg-subset").IClient>) => Promise<void>;
export declare const onMessage: (message: Discord.Message, db: IDatabase<any, import("pg-promise/typescript/pg-subset").IClient>) => Promise<void>;
declare const bot: Discord.Client;
export default bot;
