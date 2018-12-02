import { onCreate, db } from './bot';

test('Test to make sure it creates the databases', async () => {
  await onCreate();
  let dbNames:Array<string> = ['birthday', 'meme_count', 'meme_last_ran'];

  for(let name of dbNames) {
    let returns = await doesExist(name);
    expect(returns).toBeTruthy();
  }
});

async function doesExist(name:string) {
  try {
    return (await db.any('SELECT * FROM ' + name)) !== undefined;
  } catch (error) {
    return false;
  }
}
