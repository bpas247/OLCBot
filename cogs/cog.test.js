"use strict";

var _cog = _interopRequireDefault(require("./cog"));

var _messages = require("./messages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('Successfully pings', () => {
  var test = _cog.default.get('ping');

  expect(test()).toBe('Pong!');
});
it('Sucessfully grabs a complaint', () => {
  var test = _cog.default.get('complain');

  var out = test();
  expect(foundInArray(out, _messages.complain)).toBe(true);
});
it('Sucessfully grabs a sass', () => {
  var test = _cog.default.get('do');

  var out = test();
  expect(foundInArray(out, _messages.sassy)).toBe(true);
});
it('Sucessfully grabs a motivation', () => {
  var test = _cog.default.get('motivate');

  var out = test();
  expect(foundInArray(out, _messages.motivate)).toBe(true);
});
it('Successfully returns help', () => {
  var test = _cog.default.get('help');

  expect(test()).toBe(_messages.help);
});

function foundInArray(string, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (string == arr[i]) {
      return true;
    }
  }

  return false;
}