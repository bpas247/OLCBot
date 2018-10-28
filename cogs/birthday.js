const query = require('./Utilities').query;
const queryInsert = require('./Utilities').queryInsert;
const isValidDate = require('./Utilities').isValidDate;

const birthday = (authorId, args, users, db, channel) => {
  if (args.indexOf("add") != -1) {

    var date = undefined;

    args.forEach(arg => {
      if (isValidDate(arg)) {
        date = arg;
      }
    });

    if (date !== undefined) {
      query("SELECT id as name, date as dBirthday FROM birthday",
      db, result => {
        var isValid = true;

        for (let row of result.rows) {
          if (row[0] == authorId) {
            if (row[1] == date) {
              channel.send("Name and date already in the database, so I'm not gonna re-add it.");
            } else {
              queryInsert(
                "UPDATE birthday SET date = $1 WHERE id = $2",
                [date, authorId],
                db,
                channel
              );
            }
            isValid = false;
            break;
          }
        }
        // If the user is valid, insert into the database
        if (isValid) {
          queryInsert(
            "INSERT into birthday (id, date) VALUES($1, $2)",
            [authorId, date],
            db,
            channel
          );
        }
      });
    } else {
      return "You didn't enter a valid date";
    }
  } else if (args.indexOf("ls") != -1) {

    query("SELECT id as name, date as dBirthday FROM birthday", 
    db, result => {
      var out = "List of everyone's birthday goes as follows:";

      for (let row of result.rows) {
        var name = undefined;
        for (let user of users) {
          if (user.id == row[0]) {
            name = user;
          }
        }
        out += "\n" + name + " - " + row[1];
      }

      channel.send(out);
    });
  } else {
    channel.send("Command for birthday could not be found");
  }
}

module.exports = {
  birthday
}
