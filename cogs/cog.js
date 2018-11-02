"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _birthday = _interopRequireDefault(require("./birthday"));

var _messages = require("./messages");

var _Utilities = require("./Utilities");

var _alive = _interopRequireDefault(require("./alive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new Map([['ping', () => {
  return 'Pong!';
}], ['say', (message, args) => {
  // makes the bot say something and delete the message. As an example, it's open to anyone to use.
  // To get the "message" itself we join the `args` back into a string with spaces:
  const sayMessage = args.join(' '); // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.

  message.delete().catch(O_o => {}); // And we get the bot to say the thing:

  return sayMessage;
}], ['complain', () => {
  return (0, _Utilities.randomGrab)(_messages.complain);
}], ['do', () => {
  return (0, _Utilities.randomGrab)(_messages.sassy);
}], ['motivate', () => {
  return (0, _Utilities.randomGrab)(_messages.motivate);
}], ['alive', (message, args, startDate) => {
  return (0, _alive.default)(startDate, new Date());
}], ['help', () => {
  return _messages.help;
}], ['birthday', async (message, args, users, db) => {
  return await (0, _birthday.default)(message.author.id, args, users, db);
}] // [
//   "memes",
//   (author, args, users, db, channel) => {
//     memeRuler(author, args, users, db, channel);
//   }
// ]
]);

exports.default = _default;