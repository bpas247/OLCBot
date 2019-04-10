import cogs from "./cogs";
import { complain, sassy, motivate } from "../util/messages";

let msg: any = { delete: () => Promise.resolve() };

let args: Array<string> = [];

let db: any = {};

it("Successfully pings", async () => {
  let test = cogs.get("ping");
  expect(test).toBeDefined();
  if (test) {
    expect(await test.run(msg, args, db)).toBe("Pong!");
  }
});

it("Successfully says what was given", async () => {
  let says: string = "This is what I'm saying";

  let toArray: Array<string> = says.split(" ");

  let call: string = "say ";

  toArray.forEach((element, i) => {
    call += element;
    if (i < toArray.length - 1) call += " ";
  });

  let returnCog = cogs.get("say");
  expect(returnCog).toBeDefined();
  if (returnCog)
    expect(await returnCog.run(msg, toArray, db)).toBe(says);
});

describe("random message commands", () => {
  let runTest = async (cmd: string, arr: Array<string>) => {
    let test = cogs.get(cmd);
    expect(test).toBeDefined();
    if (test !== undefined) {
      let out: any = await test.run(msg, args, db);
      expect(foundInArray(out, arr)).toBe(true);
    }
  };

  it("Sucessfully grabs a complaint", async () => await runTest("complain", complain));
  it("Sucessfully grabs a sass", async () => await runTest("do", sassy));
  it("Sucessfully grabs a motivation", async () => await runTest("motivate", motivate));
});

it("Successfully returns a help message", () => {
  let returnCog = cogs.get("help");
  expect(returnCog).toBeDefined();
  if (returnCog)
    expect(returnCog.run(msg, args, db)).toBeDefined();
});

it("Successfully returns the correct time", () => {
  let test = cogs.get("alive");
  expect(test).toBeDefined();

  if (test) {
    expect(test.run(msg, args, db)).toBeDefined();
  }
});

function foundInArray(toFind: string, arr: Array<string>) {
  let out = false;
  arr.forEach(element => {
    if (toFind === element) out = true;
  });

  return out;
}
