import Cog from "../cog";
import { Message } from "discord.js";
import { IDatabase } from "pg-promise";
declare class CogAdmin extends Cog {
    constructor(_command: string, _func: (message: Message, args: Array<string>, db: IDatabase<any>) => Promise<string | undefined> | string, _help?: string, _args?: Array<Cog>);
    run(message: Message, args: Array<string>, db: IDatabase<any>): Promise<string | undefined>;
}
export default CogAdmin;
