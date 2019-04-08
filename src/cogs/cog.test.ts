import cogs from "./cog";
import { complain, sassy, motivate, help } from "./messages";

it("Successfully pings", () => {
  var test = cogs.get("ping");
  expect(test).toBeDefined();
  if (test) {
    let returnFunc: any = test.func;
    expect(returnFunc()).toBe("Pong!");
  }
});

it("Successfully says what was given", () => {
  let says: string = "This is what I'm saying";

  let toArray: Array<string> = says.split(" ");

  let call: string = "say ";

  toArray.forEach((element, i) => {
    call += element;
    if (i < toArray.length - 1) call += " ";
  });

  let returnCog = cogs.get("say");
  expect(returnCog).toBeDefined();
  if (returnCog) {
    let returnFunc = returnCog.func;
    let msg: any = { delete: () => Promise.resolve() };
    let db: any = {};

    if (returnFunc) expect(returnFunc(msg, toArray, db)).toBe(says);
  }
});

describe("random message commands", () => {
  let msg: any = {};
  let args: any = {};
  let db: any = {};
  let runTest = (cmd: string, arr: Array<string>) => {
    let test = cogs.get(cmd);
    expect(test).toBeDefined();
    if (test !== undefined) {
      let returnFunc: any = test.func;
      if (returnFunc) {
        let out: any = returnFunc(msg, args, db);
        expect(foundInArray(out, arr)).toBe(true);
      }
    }
  };

  it("Sucessfully grabs a complaint", () => runTest("complain", complain));
  it("Sucessfully grabs a sass", () => runTest("do", sassy));
  it("Sucessfully grabs a motivation", () => runTest("motivate", motivate));
});

it("Successfully returns a help message", () => {
  let returnCog = cogs.get("help");
  expect(returnCog).toBeDefined();
  if (returnCog) {
    let returnFunc: any = returnCog.func;
    expect(returnFunc()).toBeDefined();
  }
});

it("Successfully returns the correct time", () => {
  let test = cogs.get("alive");
  expect(test).toBeDefined();

  if (test) {
    let msg: any = {};
    let args: any = {};
    let db: any = {};
    let returnFunc: any = test.func;
    expect(returnFunc(msg, args, db)).toBeDefined();
  }
});

function foundInArray(toFind: string, arr: Array<string>) {
  let out = false;
  arr.forEach(element => {
    if (toFind === element) out = true;
  });

  return out;
}
