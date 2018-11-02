// const randomGrab = require('./Utilities').randomGrab;
// const trickOrTreat = async (guild, author) => {
//   // Trick
//   if (getRandomBool() == 1) {
//     var trickName = randomGrab(trick);
//     var out =
//       'You have been tricked! You will now be known as:```' +
//       trickName +
//       '``\nMuahahahaha';
//     var guildMember = await guild.fetchMember(author);
//     try {
//       await guildMember.setNickname(trickName);
//     } catch (e) {
//       console.log(e);
//       out =
//         "You probably have a higher role than me, so you're not so easily tricked";
//     }
//     return out;
//   }
//   // Treat
//   else {
//     return 'Congrats! you have received:```' + randomGrab(treat) + '```';
//   }
// };
// const treat = [
//   'Candy!',
//   'A day off from work!',
//   'Costumes!',
//   'Pumpkin Spiced Latte!',
//   'Pumpkins!'
// ];
// const trick = [
//   'Student not signed in',
//   'Monday',
//   'Unprepared for exam',
//   'Basic grammar issues',
//   'Feedback',
//   'Shift Coverage'
// ];
// module.exports = {
//   trickOrTreat
// };
// function getRandomBool() {
//   return Math.floor(Math.random() * 2);
// }
"use strict";