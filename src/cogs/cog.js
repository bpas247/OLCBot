const birthday = require('./birthday').birthday;
const complain = require('./messages').complain;
const sass = require('./messages').sassy;
const motivate = require('./messages').motivate;
const help = require('./messages').help;
// const memeRuler = require('./meme-ruler').memeRuler;
const randomGrab = require('./Utilities').randomGrab;
const alive = require('./alive').alive;
const trickOrTreat = require('./trick-or-treat').trickOrTreat;

const cogs = new Map([
  [
    'ping',
    () => {
      return 'Pong!';
    }
  ],
  [
    'say',
    (message, args) => {
      // makes the bot say something and delete the message. As an example, it's open to anyone to use.
      // To get the "message" itself we join the `args` back into a string with spaces:
      const sayMessage = args.join(' ');
      // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
      message.delete().catch(O_o => {});
      // And we get the bot to say the thing:
      return sayMessage;
    }
  ],
  [
    'complain',
    () => {
      return randomGrab(complain);
    }
  ],
  [
    'do',
    () => {
      return randomGrab(sass);
    }
  ],
  [
    'motivate',
    () => {
      return randomGrab(motivate);
    }
  ],
  [
    'alive',
    startDate => {
      return alive(startDate, new Date());
    }
  ],
  [
    'help',
    () => {
      return help;
    }
  ],
  [
    'birthday',
    async (authorId, args, users, db) => {
      return await birthday(authorId, args, users, db);
    }
  ],
  [
    'trickOrTreat',
    async (guild, author) => {
      return await trickOrTreat(guild, author);
    }
  ]
  // [
  //   "memes",
  //   (author, args, users, db, channel) => {
  //     memeRuler(author, args, users, db, channel);
  //   }
  // ]
]);

module.exports = {
  cogs
};
