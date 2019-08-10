const pgPromise = require('pg-promise');

const pgp = pgPromise();

module.exports = {
  pgp,
  close: () => pgp.end()
};
