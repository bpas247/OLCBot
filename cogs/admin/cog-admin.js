"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cog_1 = __importDefault(require("../cog"));
class CogAdmin extends cog_1.default {
    constructor(_command, _func, _help, _args) {
        super(_command, _func, _help, _args);
    }
    async run(message, args, db) {
        let author = undefined;
        if (message.guild)
            author = await message.guild.fetchMember(message.author);
        else
            return "Command does not work in DM";
        if (!author)
            return "Could not find the user in the server to authenticate";
        const isAdmin = author.hasPermission("ADMINISTRATOR");
        if (!isAdmin)
            return "You don't have the permissions for this command.";
        return super.run(message, args, db);
    }
}
exports.default = CogAdmin;
