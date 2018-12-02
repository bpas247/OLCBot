import cogs from './cog';
import { complain, sassy, motivate, help } from './messages';

it('Successfully pings', () => {
  var test:Function | undefined = cogs.get('ping');
  expect(test).toBeDefined();
  if(test !== undefined)
    expect(test()).toBe('Pong!');
});

it('Sucessfully grabs a complaint', () => {
  var test = cogs.get('complain');
  expect(test).toBeDefined();
  if(test !==undefined) {
    var out:string = test();
    expect(foundInArray(out, complain)).toBe(true);
  }
});

it('Sucessfully grabs a sass', () => {
  var test = cogs.get('do');
  expect(test).toBeDefined();
  if(test !== undefined) {
    var out = test();
    expect(foundInArray(out, sassy)).toBe(true);
  }
});

it('Sucessfully grabs a motivation', () => {
  var test = cogs.get('motivate');
  expect(test).toBeDefined();
  if(test !== undefined) {
    var out = test();
    expect(foundInArray(out, motivate)).toBe(true);
  }
});

it('Successfully returns help', () => {
  var test = cogs.get('help');
  expect(test).toBeDefined();
  if(test !== undefined) {
    expect(test()).toBe(help);
  }
});

it('Successfully returns the correct time', () => {
  let test = cogs.get('alive');
  expect(test).toBeDefined();

  if(test !== undefined) {
    expect(test("", [], new Date())).toBeDefined();
  }
});

function foundInArray(string:string, arr:Array<string>) {
  for (var i = 0; i < arr.length; i++) {
    if (string == arr[i]) {
      return true;
    }
  }
  return false;
}
