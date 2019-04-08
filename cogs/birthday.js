"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utilities_1 = require("./Utilities");
exports.default = async (message, args, db) => {
    let authorId = parseInt(message.author.id);
    let users = message.client.users;
    if (args.indexOf('add') != -1) {
        const date = exports.getDateFromArgs(args);
        if (date !== undefined) {
            const result = await db.any('SELECT id, date FROM birthday');
            return await exports.updateEntry(authorId, date, result, db);
        }
        else {
            return "You didn't enter a valid date";
        }
    }
    else if (args.indexOf('ls') != -1) {
        try {
            const result = await db.any('SELECT id, date FROM birthday');
            return exports.listUsers(result, users);
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        return 'Command for birthday could not be found';
    }
};
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
        await db.query('INSERT into birthday (id, date) VALUES($1, $2)', [
            authorId,
            date
        ]);
        return 'Added new entry!';
    }
    else if (!exports.isDuplicateEntry(authorId, date, result)) {
        await db.query('UPDATE birthday SET date = $1 WHERE id = $2', [
            date,
            authorId
        ]);
        return 'Updated entry!';
    }
    else {
        return "Name and date already in the database, so I'm not gonna re-add it.";
    }
};
exports.listUsers = (result, users) => {
    var out = "List of everyone's birthday goes as follows:";
    for (let row of result) {
        var name = users.find(user => user.id == row.id);
        if (name !== undefined) {
            var userName = name.username;
            out += '\n' + userName + ' - ' + row.date;
        }
        else {
            out += '\n' + name + ' - ' + row.date;
        }
    }
    return out;
};
