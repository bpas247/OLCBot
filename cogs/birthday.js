"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utilities_1 = require("../util/Utilities");
const cog_1 = __importDefault(require("./cog"));
exports.getDateFromArgs = (args) => {
    var date = undefined;
    for (let i = 0; i < args.length; i++) {
        if (Utilities_1.isValidDate(args[i])) {
            date = args[i];
        }
    }
    return date;
};
exports.isInDatabase = (authorId, result) => {
    var isInDatabase = false;
    for (let row of result) {
        if (row.id == authorId) {
            isInDatabase = true;
        }
    }
    return isInDatabase;
};
exports.isDuplicateEntry = (authorId, date, result) => {
    var isDuplicate = false;
    for (let row of result)
        if (row.id == authorId && row.date == date)
            isDuplicate = true;
    return isDuplicate;
};
exports.updateEntry = async (authorId, date, result, db) => {
    if (!exports.isInDatabase(authorId, result)) {
        await db.query("INSERT into birthday (id, date) VALUES($1, $2)", [
            authorId,
            date
        ]);
        return "Added new entry!";
    }
    else if (!exports.isDuplicateEntry(authorId, date, result)) {
        await db.query("UPDATE birthday SET date = $1 WHERE id = $2", [
            date,
            authorId
        ]);
        return "Updated entry!";
    }
    else {
        return "Name and date already in the database, so I'm not gonna re-add it.";
    }
};
exports.listUsers = (result, users) => {
    var out = "List of everyone's birthday goes as follows:";
    for (let row of result) {
        var name = users.find(user => user.id == row.id);
        if (name) {
            var userName = name.username;
            out += `\n${userName} - ${row.date}`;
        }
    }
    return out;
};
const BirthdayCog = new cog_1.default("birthday", () => "", "Birthday commands", [
    new cog_1.default("add", async (message, args, db) => {
        const authorId = parseInt(message.author.id);
        const date = exports.getDateFromArgs(args);
        if (date !== undefined) {
            const result = await db.any("SELECT id, date FROM birthday");
            return await exports.updateEntry(authorId, date, result, db);
        }
        else {
            return "You didn't enter a valid date";
        }
    }, "adds a new birthday"),
    new cog_1.default("ls", async (message, args, db) => {
        const users = message.client.users;
        try {
            const result = await db.any("SELECT id, date FROM birthday");
            return exports.listUsers(result, users);
        }
        catch (e) {
            console.log(e);
        }
    }, "lists all of the current birthdays")
]);
exports.default = BirthdayCog;
