"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = exports.complain = exports.sassy = exports.motivate = void 0;
const motivate = ['students who visit the Bock Learning Center have improved grades', 'a student has successfully understood the concept you explained', 'a student has signed in successfully', 'a student has pushed in their chair as they left', 'there are no students left in the center at closing time'];
exports.motivate = motivate;
const sassy = ['no.', 'Let me get back to you on that :information_desk_person:', "Here's a suggestion: how about you do it?", "Could you ask for nothing? I'll be able to do nothing."];
exports.sassy = sassy;
const complain = ["Why doesn't anyone use introductory sentences?", "I'm not a style guide!", 'Just google it!!', 'TOO MUCH PERSONAL INFORMATION—MY EYES ARE BLEEDING', 'Why is it so cold in here?', 'Whyyy is it so hot in here???', 'Did you remember to sign in?', 'I rephrased this question 27 times and drew 4 visuals.', 'Why is there a banana here?', "Don't forget the '+ c'."];
exports.complain = complain;
const help = '!ping - Tests to see if the bot is working\n' + '!say - Tell the bot to say something\n' + '!do - Tell the bot to do something\n' + '!complain - Generate a random complaint\n' + '!motivate - Generate a random motivation\n' + '!alive - How long have I been alive for?\n' + '!birthday add MM/DD/YYYY - add a birthday to the list\n' + "!birthday ls - list everyone's birthday\n" + "!memes ls - list the scoreboard for everyone's meme count";
exports.help = help;