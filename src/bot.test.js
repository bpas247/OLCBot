import { onCreate, db } from './bot';
test('should create the databases', async () => {
  await onCreate();

  expect(await checkIfTableExists('birthday')).toBe(true);
  expect(await checkIfTableExists('meme_last_ran')).toBe(true);
  expect(await checkIfTableExists('meme_count')).toBe(true);
});

async function checkIfTableExists(name) {
  try {
    const res = await db.any('SELECT * FROM ' + name);
    return res !== undefined;
  } catch (err) {
    return false;
  }
}
