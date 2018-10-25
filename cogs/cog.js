const birthday = require('./birthday.js').birthday;
const complain = require('./messages.js').complain;
const sass = require('./messages.js').sassy;
const motivate = require('./messages.js').motivate;
const help = require('./messages.js').help;

const cogs = new Map
  ([
    [
      "ping",
      () => {
        return "Pong!";
      }
    ],
    [
      "say",
      (message, args) => {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use.
        // To get the "message" itself we join the `args` back into a string with spaces:
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o => { });
        // And we get the bot to say the thing:
        return sayMessage;
        //message.channel.send(sayMessage);
      }
    ],
    [
      "complain",
      () => {
        return randomGrab(complain);
       }
    ],
    [
      "do",
      () => {
        return randomGrab(sass);
      }
    ],
    [
      "motivate",
      () => {
        return randomGrab(motivate);
      }
    ],
    [
      "alive",
      (startDate) => {
        const currentTime = new Date();

        var difference = Math.abs(startDate - currentTime);

        var out = "I have been alive for: \n";

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        out += days + " days, ";

        difference -= days * 100 * 60 * 60 * 24;

        const hours = Math.floor(difference / (1000 * 60 * 60));

        out += hours + " hours, ";

        difference -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(difference / (1000 * 60));

        out += minutes + " minutes, ";

        difference -= minutes * 1000 * 60;

        const seconds = Math.floor(difference / 1000);

        out += seconds + " seconds.\n";

        out += "Please don't reset me!";

        return out;
      }
    ],
    [
      "help",
      () => {
        return help;
      }
    ],
    [
      "birthday",
      (authorId, args, users, db, channel) => {
        birthday(authorId, args, users, db, channel);
      }
    ]
  ]);

function randomGrab(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
  cogs
}
