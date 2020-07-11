import { IDatabase, IMain } from "pg-promise";

export const cleanup = async (db: IDatabase<any>) => {
	await db.any("DROP TABLE IF EXISTS birthday");
	await db.any("DROP TABLE IF EXISTS memes");
	await db.any("DROP TABLE IF EXISTS meme_count");

	await db.query("CREATE TABLE IF NOT EXISTS birthday (id text, date text)");
	await db.query(
		"CREATE TABLE IF NOT EXISTS memes(id text, message text, attachment text)"
	);
	await db.query("CREATE TABLE IF NOT EXISTS meme_count (id text, count int)");
};

export default (pgp: IMain) => {
	pgp.pg.defaults.ssl = false;
	return pgp(process.env.DATABASE_URL as string);
};
