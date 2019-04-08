import { Message } from 'discord.js';
import { IDatabase } from 'pg-promise';
export declare const onCreate: (db: IDatabase<any>) => Promise<void>;
export declare const onCommand: (message: Message, db: IDatabase<any>) => Promise<void>;
export declare const onMessage: (message: Message, db: IDatabase<any>) => Promise<void>;
