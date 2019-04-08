import { Collection, User, Message } from 'discord.js';
import { IDatabase } from 'pg-promise';
declare const _default: (message: Message, args: string[], db: IDatabase<any>) => Promise<string | undefined>;
export default _default;
export declare const getDateFromArgs: (args: string[]) => string | undefined;
export declare const isInDatabase: (authorId: number, result: any[]) => boolean;
export declare const isDuplicateEntry: (authorId: number, date: string, result: any[]) => boolean;
export declare const updateEntry: (authorId: number, date: string, result: Object[], db: IDatabase<any>) => Promise<"Added new entry!" | "Updated entry!" | "Name and date already in the database, so I'm not gonna re-add it.">;
export declare const listUsers: (result: any, users: Collection<string, User>) => string;
