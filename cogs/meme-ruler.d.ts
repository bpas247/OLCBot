import { Collection, User } from "discord.js";
import { IDatabase } from "pg-promise";
import Cog from "./cog";
export declare const listCounts: (result: any[], users: Collection<string, User>) => string;
export declare const updateCount: (user: string, newCount: number, db: IDatabase<any, import("pg-promise/typescript/pg-subset").IClient>) => Promise<"Added new entry!" | "Updated entry!" | "something went wrong">;
declare const MemeRulerCog: Cog;
export default MemeRulerCog;
