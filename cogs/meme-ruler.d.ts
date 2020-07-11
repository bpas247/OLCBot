import { Collection, User } from "discord.js";
import { IDatabase } from "pg-promise";
import Cog from "./cog";
export declare const listCounts: (result: Array<any>, users: Collection<string, User>) => string;
export declare const updateCount: (user: string, newCount: number, db: IDatabase<any>) => Promise<"Added new entry!" | "Updated entry!" | "something went wrong">;
declare const MemeRulerCog: Cog;
export default MemeRulerCog;
