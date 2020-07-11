"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanup = void 0;
exports.cleanup = async (db) => {
    await db.any("DROP TABLE IF EXISTS birthday");
    await db.any("DROP TABLE IF EXISTS memes");
    await db.any("DROP TABLE IF EXISTS meme_count");
    await db.query("CREATE TABLE IF NOT EXISTS birthday (id text, date text)");
    await db.query("CREATE TABLE IF NOT EXISTS memes(id text, message text, attachment text)");
    await db.query("CREATE TABLE IF NOT EXISTS meme_count (id text, count int)");
};
exports.default = (pgp) => pgp({
    host: "localhost",
    port: 5432,
    database: "test",
    user: "postgres",
    password: process.env.CI ? undefined : "1234"
});
