"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cog {
    constructor(_command, _func, _help, _args) {
        this._command = _command;
        this._func = _func;
        this._help = _help;
        this._args = _args;
        this.run = async (message, args, db) => {
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
