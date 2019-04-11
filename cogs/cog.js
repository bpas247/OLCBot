"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cog {
    constructor(_command, _func, _help, _args, _isAdmin = false) {
        this._command = _command;
        this._func = _func;
        this._help = _help;
        this._args = _args;
        this._isAdmin = _isAdmin;
        this.run = async (message, args, db) => {
            if (this._isAdmin) {
                let author;
                if (message.guild)
                    author = await message.guild.fetchMember(message.author);
                else
                    return "Command does not work in DM";
                let isAdmin = author.hasPermission("ADMINISTRATOR");
                if (!isAdmin)
                    return "You don't have the permissions for this command.";
            }
            let cogToRun = this;
            if (args)
                cogToRun = this.getAppropriateCog(args);
            return await cogToRun._func(message, args, db);
        };
        this.getAppropriateCog = (args) => {
            if (args === undefined || args.length === 0)
                return this;
            else if (this._args === undefined)
                return this;
            else {
                // There are args, so find the arg and run that function instead
                let argCog = this;
                this._args.forEach((arg) => {
                    if (arg.command === args[0])
                        argCog = arg;
                });
                return argCog;
            }
        };
    }
    get command() {
        return this._command;
    }
    get help() {
        return this._help;
    }
    get args() {
        return this._args;
    }
}
exports.default = Cog;
