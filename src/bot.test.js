import { onCreate, db } from './bot';

test('Test to make sure it creates the databases', async () => {
  await onCreate();
  expect(await doesExist('birthday')).toBe(true);
  expect(await doesExist('meme_count')).toBe(true);
  expect(await doesExist('meme_last_ran')).toBe(true);
});

async function doesExist(name) {
  try {
    return (await db.any('SELECT * FROM ' + name)) !== undefined;
  } catch (error) {
    return false;
  }
}
