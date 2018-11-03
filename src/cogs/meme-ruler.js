// @flow
import { Collection, Snowflake, User, GuildMember } from 'discord.js';
import { Database } from 'pg-promise';

export default async (
  author: GuildMember,
  args: Array<string>,
  users: Collection<Snowflake, User>,
  db: Database
) => {
  if (args.indexOf('start') !== -1) {
    let isAdmin = author.hasPermission('ADMINISTRATOR');

    if (!isAdmin) {
      return "You don't have the permissions for this command.";
    }
    // Continue
    let result = await db.any('SELECT month, day FROM meme_last_ran');

    let out;

    if (result[0] !== undefined) {
      out = 'Command has already ran, so nothing else will be done.';
    } else {
      // Time to start it!
      const curDay = new Date();

      try {
        await db.query(
          'INSERT into meme_last_ran (month, day) VALUES($1, $2)',
          [curDay.getMonth(), curDay.getDate()]
        );
      } catch (error) {
        console.log(error);
        out = 'Something went wrong! yell at the dev!!!';
      }

      out = 'Sucessfully started!';
    }

    return out;
  } else if (args.indexOf('ls') !== -1) {
    let result;
    try {
      result = await db.any('SELECT id, count FROM meme_count');
    } catch (err) {
      console.log(err);
      return "Something went wrong, it probably wasn't started";
    }

    if (result.length == 0) {
      return 'Nobodye has posted any memes yet :(';
    }

    let out = "List of everyone's scores:";

    for (let row of result) {
      var name: 'undefined' | User = 'undefined';
      for (let user of users) {
        if (user.id == row.id) {
          name = user;
        }
      }

      if (name !== 'undefined') {
        var userName: string = name.username;
        out += '\n' + userName + ' - ' + row.count;
      } else {
        out += '\n' + name + ' - ' + row.count;
      }
    }

    return out;
  } else if (args.indexOf('lastRan') !== -1) {
    let result = await db.any('SELECT month, day FROM meme_last_ran');
    if (result[0] == undefined) {
      return "hasn't been ran before";
    }

    let out =
      'Last ran on ' +
      (parseInt(result[0].month) + 1) +
      '/' +
      result[0].day +
      '/2018';

    return out;
  } else if (args.indexOf('resetTime') !== -1) {
    let isAdmin = author.hasPermission('ADMINISTRATOR');

    if (!isAdmin) {
      return "You don't have the permissions for this command.";
    }

    await db.query('DELETE FROM meme_last_ran');

    return 'Successfully reset the time';
  } else if (args.indexOf('resetCount') !== -1) {
    let isAdmin = author.hasPermission('ADMINISTRATOR');

    if (!isAdmin) {
      return "You don't have the permissions for this command.";
    }

    await db.query('DELETE FROM meme_count');

    return 'Successfully reset the count';
  }
};

export const updateCount = async (
  user: number,
  newCount: number,
  db: Database
) => {
  // await db.query("DROP TABLE meme_count");
  // return "dropped it";
  // Get the current count
  let result;
  try {
    result = await db.any('SELECT count FROM meme_count WHERE id = $1', user);
  } catch (err) {
    console.log(err);
    return 'something went wrong';
  }
  //console.log(result[0].count);
  if (result.length === 0) {
    // Create a new entry
    await db.query('INSERT into meme_count (id, count) VALUES($1, $2)', [
      user,
      newCount
    ]);
    return 'Added new entry!';
  } else {
    await db.query('UPDATE meme_count SET count = $1 WHERE id = $2', [
      result[0].count + newCount,
      user
    ]);
    return 'Updated entry!';
  }
};
