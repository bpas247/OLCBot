import { Collection, User, GuildMember } from 'discord.js';
import { IDatabase } from 'pg-promise';
declare const _default: (author: GuildMember, args: string[], users: Collection<string, User>, db: IDatabase<any>) => Promise<string | undefined>;
export default _default;
export declare const listCounts: (result: any[], users: Collection<string, User>) => string;
export declare const updateCount: (user: string, newCount: number, db: IDatabase<any>) => Promise<"Added new entry!" | "Updated entry!" | "something went wrong">;
