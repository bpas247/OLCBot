import { Message } from "discord.js";
import { IDatabase } from "pg-promise";
declare class Cog {
    private _command;
    private _func;
    private _help?;
    private _args?;
    private _isAdmin;
    constructor(_command: string, _func: (message: Message, args: Array<string>, db: IDatabase<any>) => Promise<string | undefined> | string, _help?: string | undefined, _args?: Cog[] | undefined, _isAdmin?: boolean);
    readonly command: string;
    run: (message: Message, args: string[], db: IDatabase<any>) => Promise<string | undefined>;
    protected getAppropriateCog: (args?: string[] | undefined) => Cog;
    readonly help: string | undefined;
    readonly args: Cog[] | undefined;
}
export default Cog;
