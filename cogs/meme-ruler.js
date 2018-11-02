// const memeRuler = (author, args, users, db, channel) => {
//   if (args.indexOf('start') !== -1) {
//     let isAdmin = author.permissions.has('ADMINISTRATOR');
//     if (isAdmin) {
//       // Continue
//       const querySelect = {
//         text: 'SELECT date as currentDate FROM meme_last_ran',
//         rowMode: 'array'
//       };
//       db.query(querySelect, (err, result) => {
//         var out;
//         if (err) {
//           console.log(err);
//           out = 'Something went wrong trying to access the database';
//         } else {
//           if (result[0] !== undefined) {
//             out = 'Command has already ran, so nothing else will be done.';
//           } else {
//             // Time to start it!
//             const curDay = new Date();
//             db.query(
//               'INSERT into meme_last_ran (month, day) VALUES($1, $2)',
//               [curDay.getMonth(), curDay.getDay()],
//               err => {
//                 if (err) {
//                   console.log(err);
//                   channel.send('Something went wrong! yell at the dev!!!');
//                 } else {
//                   channel.send('Successfully started the memes!');
//                 }
//               }
//             );
//           }
//         }
//         channel.send(out);
//       });
//     } else {
//       channel.send("You don't have the permissions for this command.");
//     }
//   } else if (args.indexOf('ls') !== -1) {
//     const querySelect = {
//       text: 'SELECT id as name, count as counting FROM meme_count',
//       rowMode: 'array'
//     };
//     db.query(querySelect, (err, result) => {
//       var out;
//       if (err) {
//         console.log(err);
//         out = 'Something went wrong trying to access the database';
//       } else {
//         out = "List of everyone's scores:";
//         for (let row of result.rows) {
//           var name = undefined;
//           for (let user of users) {
//             if (user.id == row[0]) {
//               name = user;
//             }
//           }
//           out += '\n' + name + ' - ' + row[1];
//         }
//       }
//       channel.send(out);
//     });
//   } else if (args.indexOf('lastRan') !== -1) {
//     const querySelect = {
//       text: 'SELECT month as month, day as day FROM meme_last_ran',
//       rowMode: 'array'
//     };
//     db.query(querySelect, (err, result) => {
//       var out;
//       if (err) {
//         console.log(err);
//         out = 'Something went wrong trying to access the database';
//       } else {
//         out =
//           'Last ran on ' +
//           result.rows[0][0] +
//           '/' +
//           result.rows[0][1] +
//           '/2018';
//       }
//       channel.send(out);
//     });
//   }
// };
// module.exports = {
//   memeRuler
// };
"use strict";