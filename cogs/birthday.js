const birthday = (message, args, client, db) => {
    if (args.indexOf("add") != -1) {
        var affectedUser = message.author.id;

        var date = undefined;

        args.forEach(arg => {
          if (isValidDate(arg)) {
            date = arg;
          }
        });

        if (date !== undefined) {
          const querySelect = {
            text: "SELECT id as name, date as dBirthday FROM birthday",
            rowMode: "array"
          };

          // Some really bad code coming up, brace yourselves...
          // Querying to see if the user already exists in the database
          db.query(querySelect, (err, result) => {
            if (err) {
              console.log(err);
            }

            var isValid = true;

            for (let row of result.rows) {
              if (row[0] == affectedUser) {
                if (row[1] == date) {
                  message.channel.send(
                    "Name and date already in the database, so I'm not gonna re-add it."
                  );
                } else {
                  db.query(
                    "UPDATE birthday SET date = $1 WHERE id = $2",
                    [date, affectedUser],
                    err => {
                      if (err) {
                        console.log(err);
                        message.channel.send("Could not update entry.");
                      } else {
                        message.channel.send("Updated entry!");
                      }
                    }
                  );
                }
                isValid = false;
                break;
              }
            }
            // If the user is valid, insert into the database
            if (isValid) {
              db.query(
                "INSERT into birthday (id, date) VALUES($1, $2)",
                [affectedUser, date],
                err => {
                  if (err) {
                    console.log(err);
                    message.channel.send(
                      "Something went wrong! yell at the dev!!!"
                    );
                  } else {
                    message.channel.send("Successfully added birthday!");
                  }
                }
              );
            }
          });
        } else {
          message.channel.send("You didn't enter a valid date");
        }
      } else if (args.indexOf("ls") != -1) {
        const querySelect = {
          text: "SELECT id as name, date as dBirthday FROM birthday",
          rowMode: "array"
        };

        db.query(querySelect, (err, result) => {
          if (err) {
            console.log(err);
          }

          var out = "List of everyone's birthday goes as follows:";

          for (let row of result.rows) {
            var name = undefined;
            for (let user of client.users.array()) {
              if (user.id == row[0]) {
                name = user;
              }
            }
            out += "\n" + name + " - " + row[1];
          }

          message.channel.send(out);
        });
      }
    }

module.exports = {
  birthday
}

// Checks to see if a date follows the following format: mm/dd/yyyy
function isValidDate(text) {
  var t = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (t !== null) {
    var m = +t[1],
      d = +t[2],
      y = +t[3];
    var date = new Date(y, m - 1, d);

    return date.getFullYear() === y && date.getMonth() === m - 1;
  }

  return false;
}