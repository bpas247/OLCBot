//const isValidDate = require('./Utilities').isValidDate;
import { isValidDate } from './Utilities';

export default async (authorId, args, users, db) => {
  if (args.indexOf('add') != -1) {
    var date = undefined;

    args.forEach(arg => {
      if (isValidDate(arg)) {
        date = arg;
      }
    });

    if (date !== undefined) {
      const result = await db.any('SELECT id, date FROM birthday');
      var isValid = true;

      for (let row of result) {
        if (row.id == authorId) {
          isValid = false;
          if (row.date == date) {
            return "Name and date already in the database, so I'm not gonna re-add it.";
          } else {
            await db.query('UPDATE birthday SET date = $1 WHERE id = $2', [
              date,
              authorId
            ]);
            return 'Updated entry!';
          }
        }
      }
      // If the user is valid, insert into the database
      if (isValid) {
        await db.query('INSERT into birthday (id, date) VALUES($1, $2)', [
          date,
          authorId
        ]);
        return 'Added new entry!';
      }
    } else {
      return "You didn't enter a valid date";
    }
  } else if (args.indexOf('ls') != -1) {
    const result = await db.any('SELECT id, date FROM birthday');
    var out = "List of everyone's birthday goes as follows:";

    for (let row of result) {
      var name = undefined;
      for (let user of users) {
        if (user.id == row.id) {
          name = user;
        }
      }
      out += '\n' + name + ' - ' + row.date;
    }

    return out;
  } else {
    return 'Command for birthday could not be found';
  }
};
