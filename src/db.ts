// Load up the database
import pg, { IMain } from 'pg-promise';
const pgp: IMain = pg();
pgp.pg.defaults.ssl = true;
if(process.env.DATABASE_URL === undefined) 
  throw new Error("you need to set the database URL");

export default pgp(process.env.DATABASE_URL);
