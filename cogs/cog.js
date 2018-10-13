const birthday = require('./birthday.js').birthday;

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
        return randomGrab([
          "Why doesn't anyone use introductory sentences?",
          "I'm not a style guide!",
          "Just google it!!",
          "TOO MUCH PERSONAL INFORMATION—MY EYES ARE BLEEDING",
          "Why is it so cold in here?",
          "Whyyy is it so hot in here???",
          "Did you remember to sign in?",
          "I rephrased this question 27 times and drew 4 visuals.",
          "Why is there a banana here?",
          "Don't forget the '+ c'."
        ])
      }
    ],
    [
      "do",
      () => {
        return randomGrab([
          "no.",
          "Let me get back to you on that :information_desk_person:",
          "Here's a suggestion: how about you do it?",
          "Could you ask for nothing? I'll be able to do nothing."
        ])
      }
    ],
    [
      "motivate",
      () => {
        return randomGrab([
          "students who visit the Bock Learning Center have improved grades",
          "a student has successfully understood the concept you explained",
          "a student has signed in successfully",
          "a student has pushed in their chair as they left",
          "there are no students left in the center at closing time"
        ])
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
        return "!ping - Tests to see if the bot is working\n" +
          "!say - Tell the bot to say something\n" +
          "!do - Tell the bot to do something\n" +
          "!complain - Generate a random complaint\n" +
          "!motivate - Generate a random motivation\n" +
          "!alive - How long have I been alive for?\n" +
          "!birthday add MM/DD/YYYY - add a birthday to the list\n" +
          "!birthday ls - list everyone's birthday"
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
